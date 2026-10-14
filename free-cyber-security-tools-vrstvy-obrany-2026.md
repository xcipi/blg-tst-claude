---
title: "Free Cyber Security Tools a Vrstvy Obrany"
excerpt: "Prehľad menej známych, ale výkonných open-source nástrojov pre kybernetickú bezpečnosť v roku 2026. Nástroje, ktoré skutočne používajú bezpečnostní profesionáli."
tags: ["cybersecurity", "tools", "defense-in-depth", "free-tools", "security", "open-source", "ai-assisted"]
date: "2026-02-16"
readTime: "14 min"
slug: "free-cyber-security-tools-vrstvy-obrany"
---

# Free Cyber Security Tools a Vrstvy Obrany

## Úvod

Kybernetická bezpečnosť nemusí stáť tisíce eur. Existuje ekosystém kvalitných open-source nástrojov, ktoré skutočne používajú bezpečnostní profesionáli — nie tie, čo sa objavujú na každom druhom "Top 10" zozname, ale nástroje, ktoré riešia konkrétne problémy a ktoré oceníš až keď ich naozaj potrebuješ.

Tento článok mapuje menej známe, ale o to zaujímavejšie nástroje podľa vrstiev bezpečnostného modelu **Defense in Depth** — filozofie, ktorá hovorí, že žiadna vrstva nie je nepreniknuteľná, preto ich musíš mať viacero. [Organizácie s viacvrstvovou obranou majú 3,5-krát menej úspešných prienikov](https://www.micromindercs.com/blog/defense-in-depth) ako tie, čo spoliehajú na jednu líniu obrany.

Inšpirácia pôvodného zoznamu pochádza z projektu [The Free Cyber Security Layers](https://www.peerlyst.com/posts/the-free-cyber-security-layers-john-k-1) — odporúčam si ho pozrieť.

> 🤖 **Vytvorené s pomocou AI.** Tento článok vznikol v spolupráci s AI asistentom Claude (Anthropic). Koncept, výber tém a editorské rozhodnutia sú autorove, rešerš zdrojov a prvý návrh textu pripravila AI. Zdroje sú nalinkované, no príkazy a konfigurácie si pred použitím over a otestuj sám.

---

## Vrstvy Obrany

```
┌──────────────────────────────────────────┐
│  6. THREAT INTELLIGENCE & REAKCIA       │
├──────────────────────────────────────────┤
│  5. APLIKAČNÁ VRSTVA                    │
├──────────────────────────────────────────┤
│  4. CLOUD A KONTAJNERY                  │
├──────────────────────────────────────────┤
│  3. ENDPOINT A FORENZIKA                │
├──────────────────────────────────────────┤
│  2. SIEŤOVÁ VRSTVA                      │
├──────────────────────────────────────────┤
│  1. DÁTOVÁ VRSTVA (Zálohovanie)         │
└──────────────────────────────────────────┘
```

---

## 1. Dátová vrstva — Zálohovanie

Zálohovanie je posledná línia obrany pred ransomware. Keď všetko ostatné zlyhá, záloha ťa zachráni. Kľúčová je **3-2-1 stratégia**: 3 kópie, 2 rôzne médiá, 1 mimo lokality.

### Restic — Moderné šifrované zálohovanie

Restic je to, čo by mal byť každý zálohovací nástroj: rýchly, bezpečný a jednoduchý na pochopenie. Zálohy sú automaticky šifrované (AES-256) a deduplikované — platíš len za skutočne nové dáta.

🔗 [restic.net](https://restic.net)

```bash
# Inicializácia úložiska (napríklad na externom disku)
restic init -r /mnt/backup/repo

# Zálohovanie domovského adresára
restic -r /mnt/backup/repo backup ~/documents

# Zálohovanie priamo do S3-kompatibilného cloudu
restic -r s3:s3.amazonaws.com/moje-zalohy backup ~/documents

# Overenie integrity zálohy
restic -r /mnt/backup/repo check

# Obnova na konkrétny bod v čase
restic -r /mnt/backup/repo restore latest --target /tmp/obnova
```

**Prečo nie BorgBackup alebo Duplicati?** Restic má jednoduchšiu syntax, natívnu podporu cloudových úložísk (S3, B2, SFTP, Azure...) a je napísaný v Go — jediný binárny súbor bez závislostí.

---

### Rclone — Synchronizácia a záloha do 70+ cloudov

Rclone je švajčiarsky nôž pre cloudové úložiská. Synchronizuje, zrkadlí a zálohuje kamkoľvek — Google Drive, S3, Dropbox, OneDrive, Backblaze B2, SFTP a desiatky ďalších. Kľúčová funkcia pre bezpečnosť: **crypt backend** šifruje dáta na klientovi ešte pred uploadom, cloud provider teda nevidí čo ukladáš.

🔗 [rclone.org](https://rclone.org)

```bash
# Konfigurácia nového cloudu (interaktívny sprievodca)
rclone config

# Synchronizácia lokálneho adresára do cloudu
rclone sync ~/documents remote:zalohy/documents

# Pripojenie cloudu ako lokálny disk
rclone mount remote:zalohy /mnt/cloud --daemon

# Šifrovaná záloha (crypt backend skryje aj názvy súborov)
rclone copy ~/tajne-dokumenty encrypted-remote:
```

Kombinácia **Restic + Rclone** pokryje prakticky akúkoľvek zálohovaciu stratégiu — Restic deduplikuje a šifruje, Rclone distribuuje zálohy medzi viacero cloudov.

---

## 2. Sieťová vrstva

### CrowdSec — Komunitná ochrana pred hrozbami

CrowdSec je evolúcia Fail2ban. Nielen že blokuje útočníkov na základe správania, ale **zdieľa informácie o útočníkoch medzi všetkými používateľmi** — ak niekto útočí na server vo Frankfurte, tvoj server v Bratislave sa dozvie o tom útočníkovi skôr, ako sa k nemu dostane. Komunitná inteligencia v praxi.

🔗 [crowdsec.net](https://www.crowdsec.net)

```bash
# Inštalácia na Debian/Ubuntu
curl -s https://install.crowdsec.net | sudo sh

# Zobrazenie aktívnych rozhodnutí (zablokovaných IP)
sudo cscli decisions list

# Zobrazenie alertov
sudo cscli alerts list

# Inštalácia blokovača pre Nginx
sudo apt install crowdsec-nginx-bouncer

# Štatistiky z komunity
sudo cscli hub list
```

Architektúra je rozdelená na **agent** (detekcia, lokálna) a **bouncer** (blokovanie, pre každú službu zvlášť) — môžeš blokovať na úrovni firewallu, Nginxu, HAProxy alebo čohokoľvek iného.

---

### RITA — Detekcia C2 komunikácie v sieťových logoch

RITA (Real Intelligence Threat Analytics) robí niečo, čo väčšina nástrojov nerobí: hľadá v sieťových logoch **vzory, ktoré naznačujú kompromitáciu** — pravidelné "beaconing" (malware sa hlási domov), DNS tunelovanie, exfiltrácia dát a komunikácia s riadiacim serverom útočníka. Vstupom sú logy zo Zeek.

🔗 [github.com/activecm/rita](https://github.com/activecm/rita)

```bash
# Inštalácia
git clone https://github.com/activecm/rita
cd rita && ./install.sh

# Import Zeek logov
rita import /cesta/k/zeek/logom/ nazov-datasetu

# Analýza beaconingu (pravidelná C2 komunikácia)
rita show-beacons nazov-datasetu

# Analýza DNS tunelovania
rita show-dns-fqdns nazov-datasetu

# Hľadanie dlhých spojení (potenciálna exfiltrácia)
rita show-long-connections nazov-datasetu
```

RITA je skvelý príklad **threat huntingu** — nečakáš na alert, aktívne hľadáš príznaky kompromitácie v historických dátach.

---

### Arkime — Kompletné zachytávanie sieťovej prevádzky

Arkime (pôvodne Moloch) rieši problém, ktorý väčšina organizácií ignoruje: **čo sa dialo v sieti pred incidentom?** Zachytáva všetku sieťovú prevádzku (full packet capture), indexuje ju a sprístupňuje cez webové rozhranie s fulltextovým vyhľadávaním. Keď príde incident, máš kompletný záznam.

🔗 [arkime.com](https://arkime.com)

```bash
# Zachytávanie prevádzky na rozhraní
arkime-capture -i eth0 -c /etc/arkime/config.ini

# Vyhľadávanie v zachytených dátach cez REST API
curl "http://localhost:8005/api/sessions?expression=ip.dst==1.2.3.4"
```

Webové rozhranie umožňuje filtrovať záznamy podľa IP, protokolu, user-agenta, krajiny pôvodu a ďalších atribútov. Ideálne pre SOC tímy a forenziku po incidente.

---

## 3. Endpoint a Digitálna forenzika

### Velociraptor — Viditeľnosť na koncových zariadeniach

Velociraptor ti dáva schopnosť **pýtať sa na stav tisícok zariadení naraz** pomocou jednoduchých dotazov v jazyku VQL (Velociraptor Query Language). Chceš vedieť, ktoré zariadenia majú spustenú konkrétnu službu? Kde bol na ktorom počítači modifikovaný určitý súbor? Velociraptor odpovie za sekundy.

🔗 [velociraptor.app](https://velociraptor.app)

```sql
-- Vyhľadanie všetkých spustených procesov s podozrivým názvom
SELECT * FROM pslist() WHERE Name =~ "suspicious"

-- Kontrola perzistencie (položky pri spustení)
SELECT * FROM Artifact.Windows.Sys.StartupItems()

-- Vyhľadanie súborov modifikovaných v posledných 24 hodinách
SELECT * FROM glob(globs="C:/Users/**")
WHERE Mtime > now() - 86400

-- Zber forenzických artefaktov z celej skupiny zariadení
SELECT * FROM Artifact.Windows.Forensics.Prefetch()
```

Pre reakciu na incidenty je Velociraptor nenahraditeľný — zbieraš dôkazy zo živých systémov bez ich vypnutia, v reálnom čase.

---

### OSQuery — Operačný systém ako databáza

OSQuery premieňa operačný systém na relačnú databázu. Všetko — procesy, sieťové spojenia, nainštalované balíčky, plánované úlohy, záznamy v registri — je dostupné cez SQL dotazy. Funguje na Linuxe, macOS aj Windows.

🔗 [osquery.io](https://osquery.io)

```sql
-- Všetky aktívne sieťové spojenia
SELECT pid, fd, family, remote_address, remote_port
FROM process_open_sockets
WHERE state = 'ESTABLISHED';

-- Procesy, ktoré počúvajú na portoch
SELECT processes.name, listening_ports.port, listening_ports.address
FROM listening_ports
JOIN processes USING (pid);

-- Plánované úlohy (možná perzistencia malware)
SELECT * FROM scheduled_tasks WHERE enabled = 1;
```

V kombinácii so SIEM nástrojom (napr. Wazuh) môžeš kontinuálne monitorovať stav systémov a upozorňovať na podozrivé zmeny.

---

### Lynis — Bezpečnostný audit Linuxu

Lynis je hĺbkový bezpečnostný skener pre Linux a macOS. Prechádza stovky kontrol — konfigurácie SSH, súborové oprávnenia, nainštalované balíčky, firewall, šifrovanie diskov, logovanie — a generuje konkrétne odporúčania, ako hardeniť systém.

🔗 [cisofy.com/lynis](https://cisofy.com/lynis)

```bash
# Základný audit systému
sudo lynis audit system

# Audit so zameraním na konkrétnu oblasť
sudo lynis audit system --tests-from-group authentication

# Tiché spustenie (vhodné pre automatizáciu)
sudo lynis audit system --quiet --log-file /var/log/lynis.log
```

Výstupom je hardening index (skóre 0–100) a zoznam konkrétnych nálezov s odkazmi na dokumentáciu. Lynis je vhodný aj do CI/CD pipeline ako kontrola pred produkčným nasadením.

---

## 4. Cloud a kontajnery

### Trivy — Univerzálny skener zraniteľností

Trivy skenuje takmer všetko: kontajnerové obrazy, Git repozitáre, Terraform a Kubernetes manifesty, filesystémy, virtuálne stroje. Hľadá CVE zraniteľnosti, chybné konfigurácie, odhalené tajomstvá (API kľúče, heslá) a problémy s licenciami. Jeden nástroj namiesto piatich.

🔗 [trivy.dev](https://trivy.dev)

```bash
# Skenovanie Docker obrazu
trivy image nginx:latest

# Skenovanie lokálneho repozitára (kód + závislosti + IaC)
trivy fs ./moj-projekt

# Skenovanie Kubernetes klastra
trivy k8s --report summary cluster

# Hľadanie odhalených tajomstiev v Git histórii
trivy repo https://github.com/moja-org/moj-repo --scanners secret

# Export výsledkov pre CI/CD
trivy image --format json --output report.json myapp:latest
```

Trivy je jednoduchý na integráciu do GitHub Actions alebo GitLab CI — pri každom commite automaticky skontrolouješ bezpečnosť.

---

### Falco — Runtime bezpečnosť pre Linux a Kubernetes

Falco monitoruje správanie systému na úrovni systémových volaní — teda toho, čo procesy naozaj robia, nie len čo by mali robiť. Ak sa PHP-FPM pokúsi spustiť shell, ak kontajner začne čítať `/etc/passwd`, ak sa objaví nový privilegovaný proces — Falco to zachytí a zahlási.

🔗 [falco.org](https://falco.org)

```yaml
# Príklad vlastného pravidla Falco
- rule: Spustenie shellu v kontajneri
  desc: Detekcia spustenia shellu v bežiacom kontajneri (možná kompromitácia)
  condition: >
    container and
    proc.name in (shell_binaries) and
    not proc.pname in (allowed_k8s_users)
  output: >
    Shell spustený v kontajneri
    (user=%user.name container=%container.name image=%container.image.repository)
  priority: WARNING
```

```bash
# Inštalácia cez Helm do Kubernetes
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm install falco falcosecurity/falco

# Sledovanie alertov v reálnom čase
kubectl logs -l app=falco -f
```

Falco je obzvlášť cenný v Kubernetes prostredí, kde je ťažké sledovať čo sa deje vo vnútri stoviek kontajnerov.

---

## 5. Aplikačná vrstva

### Semgrep — Statická analýza kódu s vlastnými pravidlami

Semgrep je nástroj pre statickú analýzu kódu, ktorý myslí ako bezpečnostný inžinier. Rozumie sémantike kódu — vie, že `exec(user_input)` je problém bez ohľadu na to, ako sú premenné pomenované. Pravidlá sa píšu v YAML a vyzerajú podobne ako samotný kód, čo ich robí ľahko čitateľnými a upraviteľnými.

🔗 [semgrep.dev](https://semgrep.dev)

```bash
# Skenovanie s predpripravenými bezpečnostnými pravidlami
semgrep --config p/security-audit .

# OWASP Top 10 pravidlá
semgrep --config p/owasp-top-ten .

# Vlastné pravidlo
cat > moje-pravidlo.yaml << 'EOF'
rules:
  - id: sql-injection-riziko
    pattern: execute($INPUT)
    message: Možná SQL injection — použi parametrizované dotazy
    languages: [python]
    severity: ERROR
EOF

semgrep --config moje-pravidlo.yaml ./src
```

Semgrep má verejný register tisícok pravidiel od komunity a bezpečnostných firiem — od detekcie hardcoded hesiel až po framework-špecifické zraniteľnosti.

---

### Nuclei — Rýchle skenovanie s komunitnými šablónami

Nuclei nie je generický skener — je to engine pre cielené skenovanie na základe **šablón** (templates). Komunita vytvára šablóny pre CVE, chybné konfigurácie, odhalené administrátorské panely, citlivé súbory a stovky ďalších scenárov. Výsledok: rýchle a presné skenovanie s minimom falošných poplachov.

🔗 [nuclei.sh](https://nuclei.sh)

```bash
# Aktualizácia šablón z komunity
nuclei -update-templates

# Skenovanie cieľovej domény so všetkými šablónami
nuclei -u https://example.com

# Skenovanie len na CVE zraniteľnosti
nuclei -u https://example.com -tags cve

# Skenovanie viacerých cieľov zo súboru
nuclei -l zoznam-cielov.txt -tags exposure,misconfig

# Hľadanie odhalených administrátorských panelov
nuclei -u https://example.com -tags panel

# Tichý režim, výstup do JSON
nuclei -u https://example.com -json -o report.json -silent
```

Nuclei je vhodný ako súčasť pravidelného externého skenovania vlastnej infraštruktúry — objavíš problémy skôr, ako ich nájdu útočníci.

---

### Caido — Moderný web proxy pre bezpečnostné testovanie

Caido je moderná alternatíva k Burp Suite Community Edition, písaná v Rust. Rýchlejšia, s čistejším rozhraním a bez obmedzení bezplatnej verzie Burpu. Umožňuje zachytávanie, modifikáciu a opätovné odosielanie HTTP/S požiadaviek, automatizované testovanie a tvorbu workflow.

🔗 [caido.io](https://caido.io)

Základné možnosti:
- Zachytí HTTP/S komunikáciu medzi prehliadačom a serverom
- Umožní manuálnu modifikáciu požiadaviek a odpovedí
- **Replay** — pošleš zachytenú požiadavku znovu s upraveným parametrom
- **Automate** — automatizácia opakovaného testovania (napr. overovanie vstupov)
- **Workflow** — reťazenie požiadaviek do komplexných testovacích scenárov

Pre kohokoľvek, kto testuje webové aplikácie, je web proxy nevyhnutný nástroj. Caido ponúka to, čo Burp Suite v platenej verzii — zadarmo.

---

## 6. Threat Intelligence a Reakcia na Incidenty

### MISP — Platforma pre zdieľanie informácií o hrozbách

MISP (Malware Information Sharing Platform) je otvorená platforma pre zbieranie, zdieľanie a koreláciu indikátorov kompromitácie (IOC) — IP adresy, domény, hashe súborov, vzory správania. Organizácie a CERT tímy po celom svete zdieľajú informácie o hrozbách prostredníctvom MISP inštancií.

🔗 [misp-project.org](https://www.misp-project.org)

Čo ti MISP umožňuje:
- Prijímať a exportovať IOC z globálnej komunity (viac ako 6 000 organizácií)
- Korelovať vlastné nálezy s globálnou threat intelligence
- Automaticky blokovať známe škodlivé IP a domény (integrácia s firewallmi)
- Exportovať do formátov STIX, OpenIOC, pravidlá pre Snort
- Integrovať sa s Wazuh, TheHive, Suricata a ďalšími nástrojmi

```bash
# Príklad: Export IOC pre Suricata
curl -H "Authorization: <API_KEY>" \
  https://misp.moja-org.sk/events/nids/suricata/download \
  -o /etc/suricata/rules/misp.rules
```

---

### Shuffle — Open-source SOAR automatizácia

Shuffle rieši problém, s ktorým sa stretávajú všetky bezpečnostné tímy: **príliš veľa alertov, príliš málo ľudí**. Je to open-source SOAR platforma — vizuálny editor pracovných postupov, kde prepájaš bezpečnostné nástroje a automatizuješ reakciu na incidenty.

🔗 [shuffler.io](https://shuffler.io)

Príklady automatizovaných pracovných postupov:
- Alert z Wazuh → obohatiť IOC cez VirusTotal → ak je škodlivý, zablokovať IP vo firewalle → vytvoriť lístok v Jira
- Phishingový email → extrahovať URL → skontrolovať v MISP → notifikovať v Slacku
- CVE alert → skontrolovať, či je dotknutý systém v produkcii → eskalovať ak áno

```bash
# Spustenie Shuffle cez Docker Compose
git clone https://github.com/Shuffle/Shuffle
cd Shuffle && docker-compose up -d
# Dostupné na http://localhost:3001
```

Shuffle má viac ako 200 integrácií a pracovné postupy sa exportujú ako JSON — zdieľaš ich medzi inštanciami alebo s komunitou.

---

### YARA — Odtlačky prstov pre malware

YARA je jazyk pre popis malware na základe vzorov — binárnych reťazcov, regulárnych výrazov, podmienok. Výsledkom sú pravidlá, ktoré slúžia ako odtlačky prstov pre identifikáciu hrozieb. Je to štandard v analýze malware a threat huntingu.

🔗 [virustotal.github.io/yara](https://virustotal.github.io/yara/)

```bash
# Inštalácia
sudo apt install yara

# Základné pravidlo
cat > ransomware.yar << 'EOF'
rule Potencialny_Ransomware
{
    meta:
        description = "Detekcia potenciálneho ransomware podľa reťazcov"
        author = "sec.blog"

    strings:
        $r1 = "your files have been encrypted" nocase
        $r2 = "bitcoin" nocase
        $r3 = "decrypt" nocase
        $e1 = ".locked"
        $e2 = ".encrypted"

    condition:
        2 of ($r*) or any of ($e*)
}
EOF

# Skenovanie adresára pravidlom
yara ransomware.yar /podozrivy/adresar/ -r

# Použitie komunitných pravidiel (YARA-Rules projekt)
git clone https://github.com/Yara-Rules/rules
yara -r rules/malware/ /karantejna/
```

YARA pravidlá môžeš integrovať do ClamAV, Wazuh, Velociraptor, CrowdSec a ďalších nástrojov — raz napíšeš pravidlo, používaš ho všade.

---

## Ako poskladať celok

Nástroje spolu fungujú ako vrstvený systém. Tu je príklad reálneho stacku pre malú až strednú organizáciu:

```
Zálohy:      Restic + Rclone (3-2-1 stratégia)
              │
Sieť:        CrowdSec (blokovanie) + Arkime (zachytávanie)
              │        RITA (analýza C2 komunikácie)
              │
Endpoint:    OSQuery (viditeľnosť) + Lynis (hardening)
              │         Velociraptor (reakcia na incidenty)
              │
Cloud/K8s:   Trivy (skenovanie obrazov) + Falco (runtime)
              │
Aplikácie:   Semgrep (statická analýza) + Nuclei (externé skenovanie)
              │         Caido (manuálne testovanie)
              │
Reakcia:     MISP (threat intel) + Shuffle (automatizácia)
              │         YARA (detekcia malware)
```

**Žiadny z týchto nástrojov nestojí peniaze.** Cena je čas na naučenie a konfiguráciu — čo je investícia, ktorá sa vráti pri prvom skutočnom incidente.

---

## Záver

[Krajina hrozieb v roku 2026 si vyžaduje viacvrstvovú obranu](https://www.huntress.com/cybersecurity-101/topic/what-is-defense-in-depth) — nie preto, že by jeden nástroj nestačil, ale preto, že žiadny nástroj nie je dokonalý. CrowdSec nezachytí to, čo zachytí Falco. YARA nenahradí Velociraptor. Spolu ale vytvárajú sieť, cez ktorú sa ťažko prekĺzne.

Odporúčam začať s jednou vrstvou, zvládnuť ju dobre a potom pridávať ďalšie. Lepší je jeden nástroj, ktorý naozaj používaš, ako päť, čo len bežia na pozadí bez dozoru.

---

## Referencie a ďalšie čítanie

- [The Free Cyber Security Layers — Peerlyst](https://www.peerlyst.com/posts/the-free-cyber-security-layers-john-k-1)
- [Defense in Depth — Microminder](https://www.micromindercs.com/blog/defense-in-depth)
- [Defense in Depth — Huntress (2025)](https://www.huntress.com/cybersecurity-101/topic/what-is-defense-in-depth)
- [Cybersecurity Layers Explained — Medium/Infosec Matrix](https://medium.com/infosecmatrix/cybersecurity-layers-explained-defense-in-depth-done-right-97bccd0d92ec)
- [RITA — Active Countermeasures](https://www.activecountermeasures.com/free-tools/rita/)
- [Velociraptor Documentation](https://docs.velociraptor.app/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [MISP Project](https://www.misp-project.org/features.html)
- [YARA Rules Community](https://github.com/Yara-Rules/rules)

---

**Autor:** IT profesionál, nadšenec kybernetickej bezpečnosti  
**Publikované:** 16. februára 2026  
**Aktualizované:** 14. októbra 2026  
**Vytvorené s pomocou AI:** Claude (Anthropic), editorské rozhodnutia autor  
**Tagy:** #cybersecurity #defense-in-depth #open-source #free-tools #threat-hunting #incident-response #ai-assisted
