---
title: 'Bezpečné používanie URL shortenerov: Ako zistiť, čo je za linkou'
excerpt: 'Sprievodca bezpečným používaním URL shortenerov. Ako odhaliť phishing linky, preview služby a best practices.'
date: '2026-02-08'
readTime: '7 min'
tags: ['security', 'web', 'best-practices', 'tools']
---

# Bezpečné používanie URL shortenerov: Ako zistiť, čo je za linkou

URL shortenerů (bit.ly, tinyurl, short.link) sú neoddeliteľnou súčasťou dnešného internetu. Ale ako vieš, kam skutočne vedú? A ako sa chrániť pred phishingom a malwárom?

## Prečo sú URL shortenerů nebezpečné?

Skrátené URL skrývajú pôvodnú adresu. To je ideálne pre útočníkov:

- **Phishing**: `https://bit.ly/secure-login-123` môže viesť na falošnú prihlasovaciu stránku
- **Malware**: Nič ťa nebráni v tom, aby za linkou bola škodlivá stránka
- **Sledovanie**: Autor linky vidí, kto a kedy ju klikol
- **URL jacking**: Ak sa doména shortenerů predá, všetky staré linky môžu viesť do nikud

Nedôveruj linkom od neznámych zdrojov. Punkt.

## Ako zistiť, čo je za linkou?

### 1. Preview služby (najbezpečnejšie)

Najjednoduchšie riešenie – existujú weby, ktoré ti zobrazia cieľ bez nutnosti klikať:

```
https://www.expandurl.com/
https://urlex.org/
https://wheregoes.com/
https://checkshorturl.com/
```

Stačí vložiť skrátený link a vidíš, kam vedie. Funguje s väčšinou shortenerov.

### 2. Inspekcia v prehliadači

Väčšina moderných prehliadačov (Chrome, Firefox, Safari) umožňuje zobraziť preview pri najití myšou na link. Pozri sa do stavového riadku dole – niekedy tam vidíš cieľovú URL.

```
💡 Tip: Najdi myšou na skrátenom linku a drž ju. 
Stavový riadok prehliadača by mal zobraziť úplnú adresu.
```

### 3. Programový prístup (pre vývojárov)

Niektoré shortenerů majú verejné API alebo štandardný spôsob expanzie:

```bash
# Všeobecný HEAD request (nefunguje vždy)
curl -I -L "https://bit.ly/example"

# bit.ly s API
curl "https://api.bit.ly/v3/expand?short_url=bit.ly/xyz&access_token=YOUR_TOKEN"

# PowerShell verzua
Invoke-WebRequest -Uri "https://bit.ly/example" -MaximumRedirection 0 -ErrorAction SilentlyContinue | 
Select-Object -ExpandProperty Location
```

### 4. Jednoduchý trik s `+` alebo `?`

Viacero shortenerov (bit.ly, tinyurl, short.link) podporuje tento trik – pridaj na koniec URL `+` alebo `?`:

```
bit.ly/xyz+
tinyurl.com/abc?
short.link/example+
```

Zobrazí ti info o linke bez presmeróvania. Skús to!

### 5. WHOIS a DNS lookups

Pre podozrivé domény:

```bash
# Kto vlastní doménu?
whois example-shortener.com

# Kde smeruje doména?
nslookup short.url
dig short.url +short
```

## Praktický príklad: Podozrivá linke

Dostaneš email s linkou: `https://bit.ly/secure-update-2026`

**Kroky na verifikáciu:**

1. **Neurob hneď:** Neklikaj na ňu
2. **Skopíruj URL** do preview služby (urlex.org)
3. **Pozri sa:** Kam skutočne vedie?
4. **Ověř odesielateľa:** Je email od dôveryhodného zdroja?
5. **Ak je podozrivá:** Navštív stránku priamo bez linky (napríklad google.com a vyhľadaj)

## Best practices

**✅ Dělaj:**
- Použi preview služby pre podozrivé linky
- Klikaj len na linky od dôveryhodných zdrojov
- Najdi myšou a pozri sa do stavového riadku
- Ak linke pochádza z emailu, overi si odesieľateľa (skontroluj e-mailovú adresu!)
- Buď skeptický voči linkám z sociálnych sietí od neznámych ľudí

**❌ Nedělaj:**
- Neklikaj na náhodné skrátené linky na sociálnych sieťach
- Nezdieľaj skrátené linky s citlivými informáciami (hesla, tokeny, interné URLs)
- Nepoužívaj URL shortenerů na phishing (samozrejmosť, ale hovorím si to)
- Nepredpokladaj, že skrátená linke od "veriahodného" servisu je bezpečná (aj bit.ly môže hostiť malware)

## 🛠️ Nástroje a zdroje

| Nástroj | Popis | Bezpečnosť |
|---------|-------|-----------|
| expandurl.com | Expanzia a preview | ✅ Odporúčané |
| urlex.org | Rýchla expanzia | ✅ Odporúčané |
| wheregoes.com | Detailný report | ✅ Odporúčané |
| bit.ly | Preview s `+` | ⚠️ Štandardný shortener |
| Malwarebytes | Scanning liniek | ✅ Skenovanie URL |
| URLhaus | Databáza škodlivých URL | ✅ Informácie |

## 💡 Tip pre vývojárov

Ak v kóde spracovávaš používateľské linky, vždy ich **expanduj** pred analýzou:

```javascript
// Expanzia skrátených URL
async function expandUrl(shortUrl) {
  try {
    const response = await fetch(shortUrl, { 
      method: 'HEAD',
      redirect: 'follow'
    });
    return response.url; // Expandovaná URL
  } catch (error) {
    console.error('Chyba pri expanzii URL:', error);
    return null;
  }
}

// Použitie
const realUrl = await expandUrl('https://bit.ly/example');
console.log('Skutočná URL:', realUrl);
```

```python
# Python verzua
import requests
from urllib.parse import urlparse

def expand_url(short_url):
    try:
        response = requests.head(short_url, allow_redirects=True, timeout=5)
        return response.url
    except requests.RequestException as e:
        print(f'Chyba: {e}')
        return None

# Použitie
real_url = expand_url('https://bit.ly/example')
print(f'Skutočná URL: {real_url}')
```

## Bezpečnosť domén shortenerov

Aj sami shortenerů môžu byť hacovaní. Historické incidenty:

- **Bit.ly kompromitácia (2011)**: Útočníci mohli vidieť analytiku liniek
- **TinyURL zneužitie**: Jednotlivé linky viedli na malware
- **Short.link phishing**: Boli tam falošné domény podobné pôvodnému

**Záver:** Bezpečnosť skrátnej linky závisí aj od bezpečnosti samotného shortenerů.

## Červené vlajeky

Buď opatrný, ak vidíš:

🚩 Linke z emailu od "banky" – bank nikdy neposiela linky na prihlášenie  
🚩 Skrátená linke v SMS správe  
🚩 Ponuka "klikni tu pre výhra" alebo "tvoje konto je zablokované"  
🚩 Linke z neznámych zdrojov na sociálnych sieťach  
🚩 Neustála ponuka inštalácie čohokoľvek  

Ak máš pochybnosti – neotvárais ju.

## Záver

URL shortenerů nie sú sami o sebe nebezpečné – problém je, že môžu skrývať čokoľvek. Buď skeptický, použi preview nástroje a pamätaj si, že najlepšia ochrana je zdravý rozum.

Dostaneš email s podozrivou linkou? Prostá ju neotvárais. 🔒

---

## Súvisiace články
- Phishing: Ako rozpoznať podvod
- Bezpečné hesla v roku 2026
- VPN a HTTPS: Čo je naozaj bezpečné
