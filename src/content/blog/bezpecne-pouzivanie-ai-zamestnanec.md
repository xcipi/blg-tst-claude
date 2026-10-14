---
title: "Bezpečné používanie AI: príručka pre zamestnanca"
excerpt: "Firma môže mať akékoľvek politiky, ale posledné slovo má človek pri klávesnici. Praktický návod, čo nevkladať, ako dáta očistiť, ako rozpoznať podvod a komu veriť (a komu nie)."
tags: ["cybersecurity", "ai", "llm", "human-layer", "privacy", "deepfake", "open-source", "awareness", "ai-agents", "mitre-atlas", "ai-assisted"]
date: "2026-10-13"
readTime: "15 min"
slug: "bezpecne-pouzivanie-ai-zamestnanec"
---

# Bezpečné používanie AI: príručka pre zamestnanca

## Úvod

V [predchádzajúcom článku](/blog/bezpecne-pouzivanie-ai-vo-firme) som písal o tom, ako AI zabezpečiť na strane firmy: gateway, redakcia osobných údajov, monitorovanie. Všetko to má jednu slabinu. Technika sa dá obísť a politika sa dá ignorovať. Posledná vrstva obrany sedí pri klávesnici a je ňou **zamestnanec**.

Rozhodnutie "čo vložím do promptu" je bezpečnostné rozhodnutie, aj keď sa tak necíti. Je rýchle, pohodlné a nevratné: text, ktorý odošleš, už späť nezoberieš. Klasickým príkladom je prípad zo Samsungu v roku 2023, keď inžinieri [vložili do ChatGPT interný zdrojový kód](https://www.forbes.com.au/news/innovation/samsung-bans-chatgpt-among-employees-after-sensitive-code-leak/) a firma následne AI nástroje pre zamestnancov zakázala. Nebol to útok. Bola to snaha urobiť si prácu rýchlejšie.

Tento článok nie je návod, ako AI nepoužívať. Je o tom, ako ju používať tak, aby si nikomu (ani sebe) nespôsobil problém. Nástroje sú výlučne open-source a pri každom uvádzam, ak má nejaký háčik.

> **Poznámka:** článok je písaný pre zamestnanca, ktorý nie je nutne bezpečnostný profesionál. Technické bloky s príkazmi sú voliteľné. Ak ťa zaujímajú len pravidlá, môžeš ich preskočiť.

> 🤖 **Vytvorené s pomocou AI.** Tento článok vznikol v spolupráci s AI asistentom Claude (Anthropic). Koncept, výber tém a editorské rozhodnutia sú autorove, rešerš zdrojov a prvý návrh textu pripravila AI. Zdroje sú nalinkované, no príkazy a konfigurácie si pred použitím over a otestuj sám.

---

## 1. Semafor dát: čo kam smie

Najjednoduchšie pravidlo, ktoré si zapamätáš a použiješ bez premýšľania. Presné rozdelenie ti určí politika tvojej firmy. Toto je východisková kostra.

| Farba | Čo to je | Kam smie |
|---|---|---|
| 🔴 **Červená** | heslá, kľúče a tokeny, rodné čísla, čísla kariet, zdravotné údaje, zmluvy s klientmi, nezverejnené finančné výsledky, zdrojový kód klienta | **nikam** mimo schválenej interne prevádzkovanej služby |
| 🟠 **Oranžová** | interné dokumenty, e-maily s kolegami, zákaznícke dáta bez identifikácie, vlastný (nie klientsky) kód | len **schválený firemný nástroj** |
| 🟢 **Zelená** | verejné informácie, všeobecné otázky, texty, ktoré by si zverejnil aj tak | akýkoľvek povolený nástroj |

Jednoduchý test pred odoslaním:

> *Mohol by som tento text vytlačiť a nechať ho ležať na stole v kaviarni?*

Ak nie, nepatrí do verejného nástroja. A pozor: **to platí aj pre prílohy a screenshoty**, nielen pre text. Na snímke obrazovky sú často vidieť mená, e-maily a čísla, ktoré si pri písaní textu bez problémov odstrániš.

---

## 2. Účty a nastavenia: oddeľ prácu od súkromia

### Pracovný a osobný účet

Najčastejšia chyba: pracovná otázka v osobnom účte, pretože "je to rýchlejšie" alebo "firemný nástroj je pomalý". Dôsledok je, že firma stráca prehľad a ty stráca ochranu, ktorú firemná zmluva s poskytovateľom zvyčajne obsahuje (obmedzenie použitia dát na trénovanie, retencia, audit).

- Na pracovné veci **používaj len pracovný účet**.
- Na súkromné veci **nepoužívaj pracovný účet**. Firma ho môže monitorovať a archivovať.
- Ak je firemný nástroj nepoužiteľný, **povedz to** IT alebo bezpečnosti. Tak vzniká lepší nástroj. Obchádzanie vzniká tak, že sa o ňom nikto nedozvie.

### Nastavenia, ktoré treba raz skontrolovať

Každý nástroj má trochu iné názvy, ale hľadaj tieto veci:

- **história konverzácií** a ako dlho sa uchováva,
- či sa konverzácie **používajú na trénovanie** modelov,
- **pamäť** (nástroj si zapamätá údaje o tebe a použije ich v ďalších rozhovoroch),
- **zdieľanie konverzácií cez odkaz** (odkaz môže byť verejne dostupný každému, kto ho má),
- **pripojené aplikácie** (pošta, kalendár, disk): každé pripojenie je ďalšia cesta, ktorou môžu dáta odísť.

Nastavenia sa menia aj bez upozornenia, preto ich skontroluj aj po veľkej aktualizácii nástroja.

### Firefox Multi-Account Containers

Ak používaš viac účtov (pracovný, osobný, klientsky) v jednom prehliadači, hrozí zámena. [Multi-Account Containers](https://github.com/mozilla/multi-account-containers) od Mozilly (MPL-2.0) oddeľujú **cookies** podľa farebných kontajnerov, takže môžeš byť prihlásený na rôzne účty súčasne a vidíš na prvý pohľad, kde si.

**Čo to nerobí:** dokumentácia hovorí len o oddelení cookies. Neslúži na ochranu pred sledovaním podľa IP adresy ani podľa odtlačku prehliadača a nie je náhradou za oddelené zariadenie pre citlivú prácu. Ber to ako pomôcku proti zámene, nie ako bezpečnostnú hranicu.

**Alternatívy k Firefox Containers:** FOSS: [Temporary Containers](https://github.com/stoically/temporary-containers) alebo samostatné profily prehliadača. Komerčné riešenia nie sú potrebné.

---

## 3. Očisti pred odoslaním

Ak už musíš do nástroja poslať text či súbor, najprv z neho odstráň všetko, čo tam nepatrí. Tri veci, ktoré ľudia prehliadajú: osobné údaje v texte, **metadáta v súboroch** a **tajomstvá v kóde**.

### Osobné údaje: Presidio

[Presidio](https://github.com/data-privacy-stack/presidio) (MIT) rozpoznáva osobné údaje v texte a nahrádza ich zástupnými značkami. Projekt prechádza pod [komunitné vlastníctvo](https://devtoollab.com/blog/best-llm-guardrails-tools). O minulom článku som písal, ako ho nasadiť na firemnej gateway. Tu je verzia pre jednotlivca: malý skript, ktorý očistí text z rúry skôr, než ho vložíš do nástroja.

```bash
python3 -m venv ~/.venvs/ocisti
source ~/.venvs/ocisti/bin/activate
pip install presidio-analyzer presidio-anonymizer
python -m spacy download en_core_web_lg
```

```python
#!/usr/bin/env python3
# ocisti.py: nahradí rozpoznané osobné údaje značkami typu <EMAIL_ADDRESS>
import sys
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

text = sys.stdin.read()
vysledky = AnalyzerEngine().analyze(text=text, language="en")
print(AnonymizerEngine().anonymize(text=text, analyzer_results=vysledky).text)
```

```bash
# Použitie
cat odpoved-klientovi.txt | python ocisti.py
```

**Dôležité obmedzenia:**

- Presidio **nemá hotovú podporu slovenčiny**. E-maily, telefónne čísla, čísla kariet a IBAN zachytí (tie sa riadia vzormi), ale mená a adresy v slovenskom texte často prehliadne.
- Microsoft [nezaručuje nájdenie všetkých citlivých údajov](https://infrabase.ai/blog/llm-guardrails-compared). Výstup si **vždy prečítaj očami**, skôr než ho odošleš.
- Slovenské identifikátory (rodné číslo, IČO) vyžadujú vlastné rozpoznávače, ako som ukázal v [minulom článku](/blog/bezpecne-pouzivanie-ai-vo-firme).

**Alternatívy:** FOSS: [scrubadub](https://github.com/LeapBeyond/scrubadub) · [GLiNER](https://github.com/urchade/GLiNER). Komerčné: [Private AI](https://www.private-ai.com) · [Nightfall](https://www.nightfall.ai)

### Metadáta v súboroch: mat2 a ExifTool

Dokument či obrázok nesie okrem obsahu aj skryté údaje: meno autora, názov počítača, dátum, cestu k súboru, v obrázkoch často aj GPS súradnice. Pri odoslaní do AI nástroja ich odošleš spolu so súborom.

[mat2](https://reclaimthenet.org/recommended-tool/mat2) (Metadata Anonymisation Toolkit, LGPL-3.0) je nástroj, o ktorý sa opiera aj projekt Tails. Podporuje obrázky, PDF, dokumenty Office, zvuk a video. Plná funkčnosť je zameraná na Linux. Pre Windows a macOS sa odporúča [ExifTool](https://exiftool.org).

```bash
# Linux: zobraz skryté metadáta
mat2 --show prezentacia.pdf

# Vytvorí očistenú kópiu (prezentacia.cleaned.pdf)
mat2 prezentacia.pdf

# Windows a macOS: ExifTool odstráni všetky štítky do novej kópie
exiftool -all= -o cista-fotka.jpg povodna-fotka.jpg
```

Po očistení si výsledok skontroluj: `mat2 --show` alebo `exiftool` na novom súbore by mal ukázať prázdny výpis.

**Alternatívy:** FOSS: [Metadata Cleaner](https://metadatacleaner.romainvigier.fr) (GUI nad mat2). Komerčné riešenia pre bežného používateľa nepoznám, ExifTool a mat2 sú de facto štandard.

### Tajomstvá: gitleaks

Do promptu s fragmentom kódu sa pomerne ľahko dostane aj API kľúč či heslo z konfigurácie. Nástroj [gitleaks](https://github.com/gitleaks/gitleaks) (MIT) hľadá takéto tajomstvá v kóde, adresároch aj vstupe z rúry.

**Aktuálny stav:** projekt sám uvádza, že je "feature complete" a budúce vydania budú len bezpečnostné záplaty. Autor sa presunul na nástroj [Betterleaks](https://github.com/betterleaks/betterleaks) (MIT, rovnaký autor). Gitleaks je stále použiteľný a stabilný, len sa už nebude rozširovať. Ak začínaš odznova, pozri sa aj na Betterleaks.

```bash
# Skontroluj text pred vložením do AI nástroja
cat uryvok-kodu.txt | gitleaks -v stdin

# Skontroluj celý adresár projektu
gitleaks dir -v ~/projekt

# Skontroluj históriu git repozitára
gitleaks git -v ~/projekt
```

Pre vývojárov: gitleaks funguje aj ako pre-commit hook, takže tajomstvo sa do repozitára vôbec nedostane:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.2   # pripni na aktuálnu verziu
    hooks:
      - id: gitleaks
```

**Ak sa ti tajomstvo predsa len dostalo do AI nástroja alebo repozitára, považuj ho za uniknuté.** Zmaž ho, ale hlavne **zmeň** (zneplatni kľúč, vygeneruj nový) a nahlás to.

**Alternatívy:** FOSS: [TruffleHog](https://github.com/trufflesecurity/trufflehog) · [detect-secrets](https://github.com/Yelp/detect-secrets) · [Betterleaks](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/). Komerčné: [GitGuardian](https://www.gitguardian.com) · [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning)

---

## 4. Lokálne namiesto cloudu

Najspoľahlivejší spôsob, ako dáta neprezradiť, je nikam ich neposielať. Moderné modely bežia aj na bežnom notebooku a pre mnohé úlohy (prepis, sumarizácia, preformulovanie) stačia.

### Prepis nahrávok: whisper.cpp

Zápis zo schôdzky alebo hlasová poznámka sú typické citlivé dáta, ktoré ľudia posielajú do cloudových služieb "len na prepis". [whisper.cpp](https://github.com/ggml-org/whisper.cpp) (MIT) prepisuje reč **úplne offline** na tvojom počítači.

```bash
git clone https://github.com/ggml-org/whisper.cpp.git
cd whisper.cpp

# Viacjazyčný model (modely s koncovkou .en rozumejú len angličtine)
sh ./models/download-ggml-model.sh small

cmake -B build
cmake --build build -j --config Release

# Nástroj prijíma len 16-bitové WAV súbory; iné formáty najprv skonvertuj
ffmpeg -i nahravka.mp3 -ar 16000 -ac 1 -c:a pcm_s16le nahravka.wav

./build/bin/whisper-cli -m models/ggml-small.bin -l sk -f nahravka.wav
```

Kvalita slovenčiny rastie s veľkosťou modelu (`base`, `small`, `medium`). Vyskúšaj na krátkej vzorke, čo ti stačí. Sťahovanie modelu vyžaduje internet, samotný prepis už nie.

**Alternatívy:** FOSS: [faster-whisper](https://github.com/SYSTRAN/faster-whisper) · [Vosk](https://alphacephei.com/vosk/). Komerčné (cloud, pozor na dáta): [Deepgram](https://deepgram.com)

### Lokálny jazykový model: Ollama a llama.cpp

[Ollama](https://github.com/ollama/ollama) (MIT) spustí jazykový model lokálne jedným príkazom. Pod kapotou používa knižnice rodiny ggml. Tím za [llama.cpp sa vo februári 2026 pripojil k Hugging Face](https://gihyo.jp/article/2026/02/ggml-join-hugging-face), pričom projekt má zostať open-source a komunitne vedený.

```bash
# Inštalácia na Linuxe (skript si pred spustením prečítaj, ak ti na tom záleží)
curl -fsSL https://ollama.com/install.sh | sh

# Spustenie modelu: vyber podľa pamäte svojho počítača
ollama run gemma3:4b
```

**Dve poznámky:**

- Inštalačný príkaz stiahne a spustí skript z internetu. Ak je to pre teba problém, nainštaluj z balíčka tvojej distribúcie alebo si skript najprv prečítaj.
- Ollama počúva na `localhost:11434` **bez autentifikácie**. Neotváraj ten port do siete. Nešpecifikuj `OLLAMA_HOST=0.0.0.0`, pokiaľ nevieš, čo robíš.

**Realisticky:** malý lokálny model nie je rovnocenný veľkým cloudovým modelom. Na citlivé, rutinné úlohy stačí. Na náročné uvažovanie ho nečakaj.

**Alternatívy:** FOSS: [llama.cpp](https://github.com/ggml-org/llama.cpp) · [vLLM](https://github.com/vllm-project/vllm) · [LocalAI](https://github.com/mudler/LocalAI). Komerčné: [LM Studio](https://lmstudio.ai)

---

## 5. Neveri výstupu

AI píše sebavedomo aj vtedy, keď sa mýli. Chyba nie je výnimka, je to vlastnosť technológie. Pravidlo: **čím viac zaváži následok, tým dôkladnejšie overuj.**

### Fakty a čísla

- Čísla, citáty, názvy zákonov a odkazy **vždy over v pôvodnom zdroji**. Model si vie vymyslieť podobne znejúci paragraf či štúdiu.
- Ak ti odpoveď príde "príliš dokonalá", je to dôvod na kontrolu, nie na dôveru.
- Nikdy neodošli AI výstup klientovi či nadriadenému neprečítaný.

### Kód a balíčky: slopsquatting

Model môže navrhnúť inštaláciu balíčka, ktorý **neexistuje**. Útočník si takýto názov zaregistruje a vloží do neho škodlivý kód. Tomuto sa hovorí *slopsquatting*.

Čerstvá [predtlač z augusta 2026](https://www.alphaxiv.org/abs/2605.17062) preskúmala päť aktuálnych modelov na takmer 200-tisíc požiadavkách. Podiel vymyslených balíčkov bol **4,62 % až 6,10 %**, čo je menej než v staršej štúdii (5,2 % pri komerčných a 21,7 % pri open-source modeloch), ale riziko nezmizlo. Navyše **127 názvov vymysleli všetky modely zhodne** a 53 z nich bolo stále voľných na registráciu. Čiže ide o riziko nezávislé od konkrétneho modelu.

Čo urobiť pred `pip install` alebo `npm install` s názvom od AI:

1. **Vyhľadaj balíček** v registri (PyPI, npm). Pozri sa na vek, počet stiahnutí, repozitár a autora.
2. Over, či názov zodpovedá známemu projektu a či sa nepíše o malý znak inak.
3. Inštaluj do **izolovaného prostredia** (virtuálne prostredie), nie do systému.
4. V projektoch používaj **zámok verzií** (lockfile) a neinštaluj naslepo.

---

## 6. Prompt injection: keď dokument "rozkazuje" asistentovi

Toto je téma, ktorú väčšina zamestnancov nepozná, a pritom sa ich týka čoraz viac. **Prompt injection** je situácia, keď v obsahu, ktorý AI číta (e-mail, webová stránka, PDF, pozvánka v kalendári), je ukrytý pokyn, a asistent ho vykoná, akoby prišiel od teba.

Konkrétne príklady z výskumu, ktoré uvádza [prehľad rizík AI prehliadačov](https://dev.to/mr_manushukla/agentic-browsers-in-the-enterprise-7-controls-for-prompt-injection-and-dlp-2026-2hb8):

- Výskumníci Zenity Labs ukázali, že **jediná pozvánka v kalendári** dokázala prinútiť AI prehliadač Comet prečítať lokálne súbory a odoslať dáta. Súvisiaca chyba umožňovala prevziať aj správcu hesiel. Výrobca ju opravil vo februári 2026.
- Cyberhaven Labs ukázali, že AI prehliadač pri zhrnutí stránky s ukrytým pokynom **splnil pokyn zo stránky** namiesto požiadavky používateľa.
- Podľa toho istého prehľadu OpenAI uvádza, že tento typ útoku sa nemusí dať **nikdy úplne vyriešiť**.

Prečo je to nebezpečné: agent v prehliadači pracuje **v tvojich prihlásených reláciách**. Jeden podstrčený pokyn tak môže siahnuť na poštu, banku či firemné aplikácie.

### Pravidlá pre teba

1. **Nedávaj AI agentom prístup k citlivým účtom.** Agentný prehliadač nepoužívaj, keď si prihlásený do banky, firemnej pošty alebo správcu hesiel.
2. **Každú akciu s následkom potvrdzuj sám**: odoslanie správy, platba, mazanie, export dát. Nenechaj agenta konať bez dozoru.
3. **Všímaj si podozrivé správanie**: ak asistent po prečítaní e-mailu alebo dokumentu zrazu otvára stránku, o ktorú si nežiadal, **zastav ho**.
4. **Nesumarizuj nedôveryhodný obsah** v nástroji, ktorý má prístup k tvojim dátam. Cudzí e-mail a vnútorný dokument spolu v jednom kontexte sú rizikové.
5. **Pri pochybnostiach použi nástroj bez pripojení**: obyčajný chat bez prístupu k pošte a súborom nemá čo ukradnúť.

---

## 7. Pluginy, rozšírenia a skills

Každé rozšírenie, ktoré asistentovi pridáš, mu dáva ďalšiu schopnosť a zároveň ďalšiu cestu pre útočníka. Týka sa to rozšírení prehliadača, pluginov, MCP serverov aj tzv. *skills*.

Zásady:

- **Čo nepotrebuješ, nepridávaj.** Každé rozšírenie je plocha na útok.
- **Preferuj overených vydavateľov** a čítaj, aké oprávnenia požaduje. Rozšírenie na úpravu textu nepotrebuje prístup ku všetkým stránkam.
- **Pozor na zmenu správania po schválení.** Server, ktorý bol pri pridaní v poriadku, môže neskôr zmeniť svoje popisy a pokyny (tzv. *rug pull*).
- **Pravidelne si zoznam prejdi** a vyhoď to, čo nepoužívaš.

### Snyk Agent Scan (pôvodne mcp-scan)

Ak si technicky zdatný a máš na počítači MCP servery alebo skills, [Snyk Agent Scan](https://github.com/snyk/agent-scan) ich skontroluje na prompt injection, *tool poisoning* a ďalšie problémy. Nástroj pôvodne vyvinuli Invariant Labs a Snyk ich [kúpil v júni 2025](https://guptadeepak.com/agent-security/vendor/invariant-labs/).

```bash
# Skenovanie všetkých známych konfigurácií agentov na tomto počítači
uvx snyk-agent-scan@latest

# Skenovanie skills
uvx snyk-agent-scan@latest --skills ~/.claude/skills
```

**Upozornenie:** kód je open-source, ale podľa [jedného porovnania](https://dev.to/ventrova/sentinel-scan-cli-vs-cisco-mcp-scanner-vs-snyk-agent-scan-comparing-open-source-mcp-security-f5a) beh vyžaduje bezplatný účet Snyk a API token. Skener navyše nenahrádza opatrnosť: [problémy môžu vzniknúť až za behu](https://rubinlake.com/en/technology-radar/ai-security-and-governance/agent-scan) zo kombinácie nástrojov a dát. Pred skenovaním tiež zváž, že niektoré režimy môžu servery aj spúšťať. Čítaj dokumentáciu.

**Alternatívy:** FOSS: [Cisco mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner). Komerčné: [Zenity](https://zenity.io) · [Lakera](https://www.lakera.ai)

Ak v práci riešiš firemné zariadenie, **pridávanie vlastných rozšírení s IT konzultuj**. Môžu byť zakázané z dobrého dôvodu.


### Agenti, ktorým dávaš svoju identitu

Moderný asistent už nielen odpovedá: číta tvoju poštu, kalendár a súbory a koná **v tvojom mene** (cez prihlásenie, ktoré mu dáš). Pre ostatné systémy si to potom ty. Preto:

- **Daj mu čo najmenej.** Pri povolení typu "prístup k celej schránke a všetkým súborom" sa pýtaj, či to naozaj potrebuje. Radšej jeden priečinok než celý disk.
- **Používaj schválené agenty s vlastnou identitou,** nie osobné tokeny či API kľúče vložené do nástrojov. Ak agent pracuje pod tvojím prihlásením, jeho chyba alebo zneužitie je pre firmu tvoja chyba. Správne nastavená firma mu pridelí samostatnú identitu a práva obmedzí na prienik jeho a tvojich práv.
- **Nikdy nevkladaj heslá, kľúče ani tokeny do promptu.** Prompt sa dá vytiahnuť a uložiť v logoch.
- **Nevratné akcie schvaľuj ručne** (odoslanie e-mailu, mazanie, platba). Nepovoľuj "vždy povoliť" naslepo.
- **Pravidelne skontroluj, čo si povolil,** v nastaveniach účtu (pripojené aplikácie a oprávnenia) a nepotrebné odober.
- **Strata alebo podozrenie:** ak agent urobil niečo nečakané, odober mu oprávnenia a nahlás to (pozri sekciu 9).

Útoky na agentov sú zachytené v katalógu [MITRE ATLAS](https://atlas.mitre.org), ktorý obsahuje aj reálne prípadové štúdie. Pre teba stačí jedno poučenie: **čo agent prečíta, to môže ovplyvniť, čo urobí**, preto mu nedávaj prístup k veciam, ktoré by si nechcel, aby niekto cudzí ovládol. Firemnú stranu (identita agentov, threat model) rozoberá [predchádzajúci článok](/blog/bezpecne-pouzivanie-ai-vo-firme).

---

## 8. Podvody poháňané AI

AI zlacnila a zjednodušila podvody, ktoré boli predtým drahé. Falošný hlas šéfa či falošný videohovor už nie je scenár z filmu.

Zdokumentované prípady z [prehľadu Bitdefenderu](https://www.bitdefender.com/en-au/blog/hotforsecurity/deepfake-boss-scam-ceo-impersonation-bec):

- **2019, Veľká Británia:** hlasový klon generálneho riaditeľa materskej firmy presvedčil kolegu na prevod **220 000 €**.
- **2024, Singapur:** zamestnanec financií prijal správu od "finančného riaditeľa" a zúčastnil sa video hovoru. Všetci účastníci boli deepfake. Prevod: približne **670 000 SGD**. Peniaze sa podarilo čiastočne získať späť.
- **Hongkong:** zamestnanec, ktorý spočiatku tušil phishing, bol presvedčený videokonferenciou, kde **všetci kolegovia boli deepfake**. Prevod: **200 miliónov HK$** (okolo 25 miliónov USD).

Podobne sa dajú sofistikovať aj bežné phishingové správy: perfektná slovenčina, odkaz na skutočné okolnosti, tón presne ako kolega.

### Obrana je procesná, nie technická

Žiadny detektor deepfake nie je spoľahlivý. Preto platí:

1. **Overuj nezávislým kanálom.** Ak ti žiadosť o peniaze, zmenu čísla účtu či citlivé dáta príde cez videohovor, správu alebo e-mail, **zavolaj späť na číslo, ktoré poznáš** (nie na to, ktoré ti dal žiadateľ), alebo použi schválený firemný proces.
2. **Pozor na tlak a tajomstvo.** "Je to urgentné", "nikomu to nehovor", "obíď obvyklý postup": to sú signály podvodu bez ohľadu na to, ako dobre vyzerá hlas či tvár.
3. **Veľké a nezvyčajné platby vždy cez viac osôb.**
4. **Pýtaj sa.** Overenie požiadavky od nadriadeného nie je neposlušnosť. Dobrá firma to vníma ako správne správanie, nie ako problém.
5. **Nahlás podozrenie**, aj keď si sa nenechal oklamať. Iný kolega mohol.
6. Dohodnite si v tíme **overovacie heslo** pre naliehavé žiadosti, ktoré nie je zverejnené nikde online.

### Pôvod obrázkov a videí: C2PA (s rezervou)

Technická pomôcka pre overovanie pôvodu médií je štandard **C2PA (Content Credentials)**. Podpisuje súbor kryptograficky a zaznamenáva, kto a čím ho vytvoril či upravil. Overuješ ho nástrojom [c2patool](https://www.softwareseni.com/how-c2pa-content-credentials-work-and-what-their-limits-are/) od Content Authenticity Initiative, ktorý je postavený na knižnici c2pa-rs (MIT), alebo v prehliadači na stránke Content Credentials Verify, ktorá beží lokálne a súbor neopustí tvoje zariadenie.

```bash
# Zobraz podpísaný záznam o pôvode súboru (ak existuje)
c2patool obrazok.jpg
```

**Čo C2PA nevie, a toto je kľúčové:**

- **Chýbanie podpisu nič nedokazuje.** Väčšina obsahu ho dnes nemá. Chýbajúce poverenia nie sú dôkaz manipulácie.
- **Platný podpis nedokazuje pravdivosť.** Overuje len to, čo podpisovateľ tvrdí.
- **Poverenia sa stratia pri prekódovaní.** Aplikácie ako WhatsApp, iMessage či Facebook ich pri nahraní odstránia.
- **Nejde o detektor deepfake.** Zaznamenáva len deklarované informácie.
- Existujú **doložené falzifikáty** platných podpisov.

Ber C2PA ako **jeden doplnkový signál** pri overovaní, nie ako rozhodcu. Pri podozrivej žiadosti ti nepomôže viac než telefonát.

**Alternatívy:** FOSS: [Content Credentials Verify](https://contentcredentials.org/verify) · [c2pa-rs](https://github.com/contentauth/c2pa-rs). Komerčné (detekcia deepfake, nie dôkaz pôvodu): [Reality Defender](https://www.realitydefender.com) · [Truepic](https://www.truepic.com)

---

## 9. Tvoje práva a povinnosti

### Pravidlá firmy

- **Prečítaj si politiku používania AI** a opýtaj sa, ak ti niečo nie je jasné. "Nevedel som" je slabá výhovorka, ale "nikto mi to nepovedal" je zlyhanie firmy.
- Ak nejaká politika neexistuje, **povedz to** zodpovednej osobe. Ty nie si ten, kto má riešiť zákaz či povolenie, ale máš právo vedieť.

### Keď sa niečo pokazí

Zlé rozhodnutie sa stane: vložil si citlivé údaje, kliknul si na podozrivý odkaz, asistent urobil nečakanú vec. Najdôležitejšie je **nahlásiť to hneď**. Rýchle nahlásenie umožní zmeniť kľúče, upozorniť klienta či zablokovať účet, než sa škoda rozšíri. Firma, ktorá za nahlásenie trestá, sa učí, že incidenty sa skrývajú.

### GDPR a cudzie údaje

Údaje kolegov, klientov či dodávateľov **nie sú tvoje**. Vložiť ich do externého nástroja znamená ich poskytnúť tretej strane, na čo zvyčajne nemáš právny základ. [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) požaduje minimalizáciu údajov: spracuj len to, čo naozaj potrebuješ.

To platí aj naopak: **tvoje vlastné osobné údaje** (zdravie, financie, súkromné veci) nepatria do pracovného nástroja, ktorý môže byť archivovaný a monitorovaný.

### AI Act v skratke

Pre zamestnanca sú relevantné dve veci:

- **Gramotnosť v oblasti AI (článok 4):** firmy majú podporovať, aby ľudia pracujúci s AI vedeli, čo robia. Podľa [jedného z rozborov](https://www.haqq.ai/blog/eu-ai-act-amendments-2026) novela z leta 2026 túto povinnosť zmäkčila na podporu rozvoja gramotnosti namiesto zaručenia jej úrovne. Pre teba to znamená: máš nárok na školenie, ale zodpovednosť za zdravý rozum ti nikto neodoberie.
- **Transparentnosť (článok 50):** [platí od 2. augusta 2026](https://www.cpduk.co.uk/news/deadline-moved-and-duty-did-not-ai-act-transparency-obligations-after-digital-omnibus). Týka sa najmä poskytovateľov a prevádzkovateľov niektorých systémov. Ak vo firme zverejňuješ AI generovaný obsah, spýtaj sa, aké pravidlá označovania platia.

Podrobnosti si over v texte nariadenia alebo u právnika. Tento článok nie je právne poradenstvo.

---

## Checklist na jednu stranu

**Pred každým vložením**
- [ ] Mohol by som tento text vytlačiť a nechať ho v kaviarni? Ak nie, nevkladám.
- [ ] Je to pracovný účet a schválený nástroj?
- [ ] Nie sú v texte či súbore mená, e-maily, čísla, kľúče?
- [ ] Neobsahuje súbor metadáta (autor, GPS, cesta)?
- [ ] Nie je to snímka obrazovky s viditeľnými údajmi?

**Pri čítaní výstupu**
- [ ] Overil som fakty, čísla a odkazy v pôvodnom zdroji?
- [ ] Kontrolujem názvy balíčkov v registri pred inštaláciou?
- [ ] Prečítal som celý výstup skôr, než som ho odoslal?

**Pri agentoch a rozšíreniach**
- [ ] Agent nemá prístup k bankovým, mailovým a firemným účtom, ktoré nepotrebuje
- [ ] Každú akciu s následkom potvrdzujem sám
- [ ] Rozšírenia som si prešiel a nepotrebné odstránil

**Pri podozrivej žiadosti**
- [ ] Overil som ju nezávislým kanálom (spätný hovor na známe číslo)?
- [ ] Je tam tlak, tajomstvo, obchádzanie postupu? Zastavím sa.
- [ ] Nahlásil som podozrenie?

**Ak sa niečo pokazilo**
- [ ] Nahlásil som to hneď
- [ ] Uniknuté kľúče a heslá som zmenil (nielen zmazal)

---

## Záver

Technika ťa nezachráni vždy: filtre sa dajú obísť, agenti sa dajú oklamať a deepfake sa dá vyrobiť lacno. Zostáva **úsudok**: zastaviť sa pred odoslaním, overiť pred dôverou, nahlásiť pred skrývaním.

Dobrá správa je, že väčšinu rizík pokrývajú tri návyky: **nevkladaj, čo by si nepovedal nahlas v kaviarni**, **neveri výstupu bez overenia** a **žiadosť o peniaze či údaje over druhým kanálom**. Všetko ostatné v tomto článku sú pomôcky, ktoré tieto návyky uľahčujú.

A ak firemný nástroj nie je dosť dobrý, nedeľ sa s tým potichu cez osobný účet. Povedz to nahlas. Zlepšovať sa dá len to, o čom sa vie.

---

## Referencie a ďalšie čítanie

**Prípady a výskum**
- [Samsung zakázal ChatGPT po úniku kódu (Forbes)](https://www.forbes.com.au/news/innovation/samsung-bans-chatgpt-among-employees-after-sensitive-code-leak/)
- [Slopsquatting: halucinácie balíčkov v roku 2026 (predtlač)](https://www.alphaxiv.org/abs/2605.17062)
- [Agentné prehliadače: riziká prompt injection a úniku dát](https://dev.to/mr_manushukla/agentic-browsers-in-the-enterprise-7-controls-for-prompt-injection-and-dlp-2026-2hb8)
- [Deepfake podvody s „šéfom" (Bitdefender)](https://www.bitdefender.com/en-au/blog/hotforsecurity/deepfake-boss-scam-ceo-impersonation-bec)
- [C2PA: ako fungujú Content Credentials a aké majú limity](https://www.softwareseni.com/how-c2pa-content-credentials-work-and-what-their-limits-are/)

**Nástroje**
- [Presidio](https://github.com/data-privacy-stack/presidio)
- [mat2](https://reclaimthenet.org/recommended-tool/mat2) a [ExifTool](https://exiftool.org)
- [gitleaks](https://github.com/gitleaks/gitleaks) a [Betterleaks](https://github.com/betterleaks/betterleaks)
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp)
- [Ollama](https://github.com/ollama/ollama) a [ggml pri Hugging Face](https://gihyo.jp/article/2026/02/ggml-join-hugging-face)
- [Firefox Multi-Account Containers](https://github.com/mozilla/multi-account-containers)
- [Snyk Agent Scan](https://github.com/snyk/agent-scan)
- [MITRE ATLAS](https://atlas.mitre.org)

**Regulácia**
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [AI Act po Digital Omnibus: rozbor](https://www.haqq.ai/blog/eu-ai-act-amendments-2026)
- [Transparentnosť podľa článku 50](https://www.cpduk.co.uk/news/deadline-moved-and-duty-did-not-ai-act-transparency-obligations-after-digital-omnibus)

**Predchádzajúce články v sérii**
- [Free Cyber Security Tools a Vrstvy Obrany](/blog/free-cyber-security-tools-vrstvy-obrany)
- [Bezpečné používanie AI vo firme](/blog/bezpecne-pouzivanie-ai-vo-firme)

---

**Autor:** IT profesionál, nadšenec kybernetickej bezpečnosti  
**Publikované:** 13. októbra 2026  
**Aktualizované:** 14. októbra 2026  
**Vytvorené s pomocou AI:** Claude (Anthropic), editorské rozhodnutia autor  
**Tagy:** #cybersecurity #ai #privacy #deepfake #human-layer #awareness #open-source #ai-agents #mitre-atlas #ai-assisted
