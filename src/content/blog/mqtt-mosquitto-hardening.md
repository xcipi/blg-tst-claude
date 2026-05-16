---
title: 'Hardening MQTT brokera (Mosquitto) alebo Ako nezomrieť na otvorenom porte 1883'
excerpt: 'Kompletný sprievodca zabezpečením Mosquitto MQTT brokera. TLS šifrovanie, autentifikácia, ACL, firewall a najčastejšie chyby z praxe.'
date: '2026-02-17'
readTime: '12 min'
tags: ['security', 'mqtt', 'mosquitto', 'hardening', 'iot']
---

# Hardening MQTT brokera (Mosquitto) alebo Ako nezomrieť na otvorenom porte 1883

Mosquitto je jeden z najpoužívanejších MQTT brokerov pre IoT a senzorové siete. V defaultnej konfigurácii však povoľuje komunikáciu všetkým – bez hesla, bez šifrovania, bez kontroly prístupu. Ak prevádzkuješ MQTT broker v produkcii, toto je tvoj checklist na jeho zabezpečenie.

## Prečo vôbec hardenovať MQTT?

MQTT protokol bol navrhnutý na jednoduchosť a nízku latenciu. Bezpečnosť nebola priorita. V defaultnom nastavení:

- **Bez TLS**: Dáta tečú po sieti ako plaintext – heslá, senzorové dáta, všetko ...
- **Anonymous prístup**: V defaulte sa pripojí ktokoľvek bez mena a hesla
- **Žiadne ACL**: Každý klient vidí a zapisuje do každého topicu
- **Žiadne limity**: Útočník môže zaplaviť broker tisícami správ

Ak ti na dátach záleží, musíš Mosquitto nakonfigurovať poriadne.

## Štruktúra konfigurácie

Mosquitto podporuje dva prístupy ku konfigurácii. Na základe skúseností odporúčam modulárny prístup s `conf.d`:

```
/etc/mosquitto/
├── mosquitto.conf          # Hlavný config (minimálny)
├── conf.d/
│   ├── auth.conf           # Autentifikácia a ACL
│   ├── listeners.conf      # Listenery + TLS
│   └── logging.conf        # Logovanie
├── certs/
│   ├── ca.crt              # CA certifikát
│   ├── server.crt          # Server certifikát
│   └── server.key          # Privátny kľúč
├── passwd                  # Password file
└── acl.conf                # Access Control List
```

Hlavný `mosquitto.conf` by mal byť minimálny:

```conf
# /etc/mosquitto/mosquitto.conf
pid_file /run/mosquitto/mosquitto.pid
persistence true
persistence_location /var/lib/mosquitto/

# Limity pripojení
max_connections 100
max_inflight_messages 20
max_queued_messages 100
max_keepalive 65535

# Include modulárne konfiguračné súbory
include_dir /etc/mosquitto/conf.d
```

⚠️ **Dôležité**: Nedefinuj `listener` ani `allow_anonymous` v hlavnom `mosquitto.conf`, ak používaš `include_dir`. Mosquitto vytvorí default listener na porte 1883 ak žiadny listener nie je explicitne definovaný – a potom keď `conf.d` pridá ďalší, máš duplicitu.

## Krok 1: Vypni anonymous prístup

Prvá vec – žiadne anonymné pripojenia v produkcii:

```conf
# /etc/mosquitto/conf.d/auth.conf
allow_anonymous false
password_file /etc/mosquitto/passwd
acl_file /etc/mosquitto/acl.conf
sys_interval 10
```

Vytvor password file s používateľmi:

```bash
# Vytvorenie nového password súboru s prvým užívateľom
sudo mosquitto_passwd -c /etc/mosquitto/passwd admin

# Pridanie ďalších užívateľov (bez -c, inak prepíše celý súbor!)
sudo mosquitto_passwd -b /etc/mosquitto/passwd sensor_publisher sensor_pass
sudo mosquitto_passwd -b /etc/mosquitto/passwd sensor_reader reader_pass

# Nastavenie práv – len mosquitto smie čítať
sudo chown mosquitto:mosquitto /etc/mosquitto/passwd
sudo chmod 600 /etc/mosquitto/passwd
```

## Krok 2: Nastav ACL (Access Control List)

ACL definuje kto čo smie čítať a zapisovať. Princíp najnižších oprávnení (least priviledge):

```conf
# /etc/mosquitto/acl.conf

# Admin – plný prístup
user admin
topic readwrite #

# Senzory / IoT zariadenia / publishers – len publish do sensors/*
user sensor_publisher
topic write sensors/#

# Čitatelia / subscribers – len subscribe na sensors/* a systémové štatistiky
user sensor_reader
topic read sensors/#
topic read $SYS/#

# Pattern s placeholderom – každý autentifikovaný user
# vidí len svoj topic
pattern readwrite sensors/%u/#
```

```bash
sudo chown mosquitto:mosquitto /etc/mosquitto/acl.conf
sudo chmod 644 /etc/mosquitto/acl.conf
```

### Časté chyby v ACL

Z praxe – tieto veci Mosquitto netoleruje:

```conf
# ❌ NESPRÁVNE – $SYS s %u placeholderom nefunguje
pattern read $SYS/#/%u

# ✅ SPRÁVNE – $SYS bez placeholdera
topic read $SYS/#

# ❌ NESPRÁVNE – pattern a topic sú rôzne direktívy
pattern read sensors/#        # pattern vyžaduje %u alebo %c

# ✅ SPRÁVNE
topic read sensors/#          # pre konkrétneho usera
pattern readwrite sensors/%u/#  # s placeholderom
```

Neplatný ACL súbor = Mosquitto nenaštartuje. Vždy testuj:

```bash
sudo mosquitto -c /etc/mosquitto/mosquitto.conf -v
```

## Krok 3: Zapni TLS šifrovanie

TLS je základ – bez neho sú MQTT credentials aj dáta čitateľné komukoľvek na sieti.

### Príprava certifikátov

Ak máš vlastnú CA (napríklad internú CA), vygeneruj server certifikát. Napríklad takto:

```bash
# Na CA serveri
openssl genrsa -out server.key 2048

openssl req -new -key server.key -out server.csr \
    -subj "/C=SK/ST=Slovakia/L=BA/O=MojaOrg/CN=mqtt-broker"

openssl x509 -req -in server.csr \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out server.crt -days 365 -sha256
```

Skopíruj certifikáty na broker:

```bash
sudo mkdir -p /etc/mosquitto/certs
sudo cp ca.crt server.crt server.key /etc/mosquitto/certs/
sudo chown mosquitto:mosquitto /etc/mosquitto/certs/*
sudo chmod 600 /etc/mosquitto/certs/server.key
sudo chmod 644 /etc/mosquitto/certs/ca.crt /etc/mosquitto/certs/server.crt
```

### Konfigurácia listenerov

```conf
# /etc/mosquitto/conf.d/listeners.conf

# Port 1883 – interný MQTT (povoľ len z dôveryhodnej siete!)
listener 1883 10.10.10.0/24
protocol mqtt

# Port 8883 – MQTT s TLS
listener 8883 0.0.0.0
protocol mqtt
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/server.crt
keyfile /etc/mosquitto/certs/server.key
tls_version tlsv1.2
```

💡 **Tip**: V plne hardenovanom prostredí zruš listener na porte 1883 úplne a použi iba 8883 s TLS.

### Test TLS pripojenia

```bash
# Bez TLS (port 1883)
mosquitto_pub -h 172.25.16.55 -p 1883 -t 'test' -m 'hello' \
    -u admin -P heslo

# S TLS (port 8883)
mosquitto_pub -h 172.25.16.55 -p 8883 -t 'test' -m 'hello' \
    -u admin -P heslo \
    --cafile /etc/mosquitto/certs/ca.crt

# S TLS bez validácie certifikátu (testing)
mosquitto_sub -h 172.25.16.55 -p 8883 -t '#' -v \
    -u admin -P heslo --insecure
```

## Krok 4: Nastav logovanie

Bez logov neexistuje forensics. Správne logovanie:

```conf
# /etc/mosquitto/conf.d/logging.conf

# Kam logovať
log_dest syslog
log_dest file /var/log/mosquitto/mosquitto.log

# Čo logovať
log_type error
log_type warning
log_type notice
log_type information

# Pripojenia a odpojenia klientov
connection_messages true

# Timestamp formát
log_timestamp true
log_timestamp_format %Y-%m-%d %H:%M:%S
```

⚠️ **Pozor na deprecated direktívy**: `log_location` a `retry_interval` v Mosquitto 2.x neexistujú. Ak ich máš v configu, broker nenaštartuje.

### Rotácia logov

Mosquitto sám nerotuje logy. Nastav logrotate:

```bash
# /etc/logrotate.d/mosquitto
/var/log/mosquitto/mosquitto.log {
    size 1G
    rotate 5
    compress
    delaycompress
    missingok
    notifempty
    create 0640 mosquitto mosquitto
    postrotate
        systemctl reload mosquitto > /dev/null 2>&1 || true
    endscript
}
```

## Krok 5: Firewall (UFW)

Obmedz prístup k MQTT portom len na dôveryhodné siete:

```bash
# Povoliť TLS MQTT port
sudo ufw allow 8883/tcp

# Obmedziť plaintext MQTT na internú sieť
sudo ufw allow from 10.10.10.0/24 to any port 1883

# Ak používaš mosquitto v LXD kontajnery – povoliť traffic z hostu na bridge
sudo ufw allow in on lxdbr1
sudo ufw allow out on lxdbr1

# Reload
sudo ufw reload
```

```bash
# Overenie
sudo ufw status verbose | grep -E "1883|8883"
sudo ss -tlnp | grep mosquitto
```

💡 **Tip**: Ak máš MQTT v LXD kontajneri za proxy deviceom, nezabudni povoliť aj OUTPUT chain na bridge interface. UFW defaultne neblokuje outgoing, ale explicitné pravidlá môžu blokovať OUTPUT do LXD bridge.

## Krok 6: Overenie celej konfigurácie

Pred reštartom služby vždy testuj:

```bash
# 1. Test konfigurácie
sudo mosquitto -c /etc/mosquitto/mosquitto.conf -v

# Mal by si vidieť:
# Opening ipv4 listen socket on port 1883.  <- iba raz!
# Opening ipv4 listen socket on port 8883.  <- iba raz!

# CTRL+C

# 2. Reštart služby
sudo systemctl restart mosquitto
sudo systemctl status mosquitto

# 3. Overenie portov
sudo ss -tlnp | grep mosquitto

# 4. Test autentifikácie
mosquitto_pub -h localhost -p 1883 -t 'test' -m 'hello'
# → Malo by zlyhať (anonymous disabled)

mosquitto_pub -h localhost -p 1883 -t 'test' -m 'hello' -u admin -P heslo
# → Malo by fungovať

# 5. Test ACL
mosquitto_pub -h localhost -p 1883 -t 'restricted/topic' -m 'test' \
    -u sensor_reader -P reader_pass
# → Malo by zlyhať (sensor_reader nemá write oprávnenie)

# 6. Logy
sudo journalctl -u mosquitto -n 30
```

## Best practices

**✅ Ako na to:**
- Použi modulárnu konfiguráciu s `conf.d` pre prehľadnosť
- Vždy testuj config cez `mosquitto -c ... -v` pred reštartom
- Zálohuj konfiguráciu pred zmenami: `cp -r /etc/mosquitto /etc/mosquitto.backup.$(date +%Y%m%d)`
- Rotuj logy, inak ti Mosquitto zaplní disk
- Použi per-listener `allow_anonymous` namiesto globálneho nastavenia
- Certifikáty obnov pred expiráciou (nastav si reminder)

**❌ Nikdy nerob:**
- Nepoužívaj `allow_anonymous true` v produkcii
- Nepoužívaj `auth_opt_*` direktívy bez definovaného `auth_plugin`
- Nepoužívaj deprecated direktívy (`retry_interval`, `log_location`)
- Nekombinuj TLS nastavenia v separátnom `tls.conf` a zároveň v `listeners.conf` – vznikne duplicitný listener
- Nedefinuj listener v hlavnom `mosquitto.conf` aj v `conf.d` – duplikácia portov
- Nepoužívaj `password_file` s `-c` flagom (create) pri pridávaní ďalšieho usera – prepíše celý súbor

## 🛠️ Troubleshooting

| Problém | Príčina | Riešenie |
|---------|---------|----------|
| `Error: auth_opt_ without auth_plugin` | `auth_opt_*` v configu bez pluginu | Odstráň `auth_opt_*` riadky, použi `password_file` |
| `Invalid ACL topic "$SYS/#/%u"` | Pattern s `$SYS` a `%u` nie je platný | Použi `topic read $SYS/#` bez `pattern` |
| Duplicitný listener (port 2x) | Listener v hlavnom config aj v conf.d | Definuj listenery len na jednom mieste |
| `Error: listener with port 0` | Pokus o `listener 0` bez Unix socket | Nepoužívaj `listener 0`, použi explicitný port |
| `Unknown variable "log_location"` | Deprecated direktíva v Mosquitto 2.x | Použi `log_dest file /path/to/log` |
| Klient vidí len `$SYS` topicy | ACL nepovoľuje prístup k topicom | Pridaj `topic readwrite #` pre admin alebo správne ACL pravidlá |
| `retry_interval` warning | Zastaralá direktíva | Odstráň z configu |

## 💡 Tip pre IoT senzory

Ak pripájaš senzory cez Python (napr. s `paho-mqtt`), nezabudni na TLS:

```python
import ssl
import paho.mqtt.client as mqtt

client = mqtt.Client()

# Autentifikácia
client.username_pw_set("sensor_publisher", "sensor_pass")

# TLS s CA certifikátom
client.tls_set(
    ca_certs="/path/to/ca.crt",
    cert_reqs=ssl.CERT_REQUIRED,
    tls_version=ssl.PROTOCOL_TLSv1_2
)

# Pripojenie na TLS port
client.connect("mqtt-broker.example.com", 8883, 60)
client.publish("sensors/DS001", '{"status": "ok"}')
```

Pre testovanie s self-signed certifikátom:

```python
# TLS bez validácie (len pre testing!)
client.tls_set(cert_reqs=ssl.CERT_NONE, tls_version=ssl.PROTOCOL_TLSv1_2)
client.tls_insecure_set(True)
```

## Hardening checklist

🔲 `allow_anonymous false` – žiadny prístup bez hesla  
🔲 `password_file` – autentifikácia cez hashované heslá  
🔲 `acl_file` – Access Control List pre fine-grained oprávnenia  
🔲 TLS na porte 8883 s validnými certifikátmi  
🔲 Firewall pravidlá – obmedziť prístup k portom  
🔲 Logovanie s rotáciou – `log_dest file` + logrotate  
🔲 Connection limity – `max_connections`, `max_inflight_messages`  
🔲 Súborové práva – `chmod 600` na `passwd` a `server.key`  
🔲 Testovanie configu pred deployom – `mosquitto -c ... -v`  
🔲 Záloha konfigurácie pred každou zmenou  

## Záver

Mosquitto v defaulte dôveruje všetkým. To je fajn na testovanie, ale v produkcii je to recept na katastrofu. Hardening nie je jednorazová akcia – je to proces. Začni s autentifikáciou, pridaj TLS, nastav ACL a pravidelne kontroluj logy. Ideálne je mať logy pozbierané v centrálnom log manažmente a 

Máš MQTT broker na internete bez TLS a hesla? Zavrieť tab a ísť to fixnúť. Teraz. 🔒
