---
title: "Bezpečné používanie AI vo firme"
excerpt: "Ako zaviesť AI do firmy bez toho, aby ti unikli dáta alebo aby si dal agentovi kľúče od celého kráľovstva. Hrozby (OWASP a MITRE ATLAS), identita ľudí aj agentov, vrstvy obrany a stack postavený na open-source nástrojoch."
tags: ["cybersecurity", "ai", "llm", "enterprise", "owasp", "mitre-atlas", "agent-identity", "guardrails", "open-source", "compliance", "ai-assisted"]
date: "2026-10-13"
readTime: "18 min"
slug: "bezpecne-pouzivanie-ai-vo-firme"
---

# Bezpečné používanie AI vo firme

## Úvod

Zamestnanci už AI používajú. Otázka nie je, *či* ju vo firme máš, ale či o nej vieš. Ak im nedáš schválený nástroj, ktorý je aspoň taký pohodlný ako súkromný účet v prehliadači, vložia firemné dáta tam, kde ich nikto nevidí. Tomuto javu sa hovorí *shadow AI* a je to dnes najčastejší spôsob, ako citlivé dáta unikajú k tretím stranám.

Tento článok nie je návod na zákaz AI. Je o tom, ako ju používať kontrolovane: aké hrozby sú reálne, ktoré vrstvy obrany dávajú zmysel a ako poskladať funkčný základ len z open-source nástrojov, ktorý si môžeš postaviť doma v labe.

Nadväzuje na článok [Free Cyber Security Tools a Vrstvy Obrany](/blog/free-cyber-security-tools-vrstvy-obrany). Princíp je rovnaký: **žiadna vrstva nie je dokonalá, preto ich potrebuješ viac.**

> 🤖 **Vytvorené s pomocou AI.** Tento článok vznikol v spolupráci s AI asistentom Claude (Anthropic). Koncept, výber tém a editorské rozhodnutia sú autorove, rešerš zdrojov a prvý návrh textu pripravila AI. Zdroje sú nalinkované, no príkazy a konfigurácie si pred použitím over a otestuj sám.

---

## Hrozby: OWASP Top 10 pre LLM aplikácie

Dobrým východiskom je [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/). Aktuálna edícia 2025 (v2.0) vyšla [18. novembra 2024](https://docs.modulos.ai/frameworks/owasp-top-10-llm) a označuje riziká ako LLM01 až LLM10:

- **LLM01 · Prompt injection**: Cudzie pokyny prebijú tvoje (priamo alebo cez dokument či web)
- **LLM02 · Sensitive information disclosure**: Model vyzradí dáta, ktoré nemal
- **LLM03 · Dodávateľský reťazec**: Škodlivý model, knižnica alebo plugin
- **LLM04 · Data and model poisoning**: Otrávené trénovacie či RAG dáta
- **LLM05 · Improper output handling**: Výstup modelu sa slepo vykoná alebo vykreslí
- **LLM06 · Excessive agency**: Agent má viac oprávnení, než potrebuje
- **LLM07 · System prompt leakage**: V systémovom prompte nemajú byť tajomstvá
- **LLM08 · Vector and embedding weaknesses**: RAG obchádza prístupové práva
- **LLM09 · Misinformation**: Model si istým tónom vymýšľa
- **LLM10 · Unbounded consumption**: Zneužitie na vyčerpanie rozpočtu alebo kapacity

OWASP samo uvádza, že pri [viackrokových autonómnych agentoch](https://docs.modulos.ai/frameworks/owasp-top-10-llm) treba navyše použiť samostatný zoznam *OWASP Top 10 for Agentic Applications*. Edícia 2025 zároveň [rozšírila Excessive Agency](https://opensourcesecurity.substack.com/p/a-deep-dive-into-the-owasp-top-10), lebo agentické architektúry dávajú modelu viac autonómie.

Vo firme sa najčastejšie bolí na štyroch miestach:

1. **Únik dát** (LLM02): zamestnanec vloží zmluvu, zdrojový kód alebo zákaznícke dáta do verejného nástroja.
2. **Prompt injection** (LLM01): asistent číta e-mail alebo web a vykoná pokyn, ktorý tam podstrčil útočník.
3. **Agent s príliš veľkými právami** (LLM06): z chatbota sa stane automat, ktorý mení dáta a posiela správy.
4. **Rozpočet** (LLM10): jeden uniknutý kľúč alebo cyklus v skripte a faktúra letí hore.

---

## Hrozby: MITRE ATLAS

OWASP ti povie, *čo* sa môže pokaziť. [MITRE ATLAS](https://atlas.mitre.org) ti povie, *ako* to útočník robí, krok za krokom. Je to analógia známeho ATT&CK, ale pre systémy s AI: matica taktík a techník, mitigácie a **reálne prípadové štúdie** útokov. Podľa [rozboru Cloud Security Alliance](https://labs.cloudsecurityalliance.org/agentic/csa-research-note-atlas-agentic-gap-analysis-20260327/) mala verzia 5.0 zo septembra 2025 15 taktík, 66 techník a 46 sub-techník a v októbri 2025 pribudlo ďalších 14 techník zameraných na agentov (spolupráca MITRE a Zenity Labs). Presné čísla v aktuálnej verzii si over priamo v katalógu.

**Prečo ho potrebuješ popri OWASP:**

- **Čo to je**
  - OWASP: Zoznam kategórií rizík
  - ATLAS: Matica taktík a techník útočníka
- **Na čo sa hodí**
  - OWASP: Awareness, priority, kontrolný zoznam
  - ATLAS: Threat modeling, detekcie, red team plány
- **Spoločný jazyk s SOC**
  - OWASP: Slabý
  - ATLAS: Silný (rovnaká logika ako ATT&CK)
- **Prípadové štúdie**
  - OWASP: Nie
  - ATLAS: Áno, reálne incidenty

**Ako ho v praxi použiť:**

1. **Threat modeling.** Pre každý AI systém (chatbot, RAG, agent) prejdi taktiky ATLAS a zapíš, ktoré techniky sa ho reálne týkajú. Výstupom je zoznam scenárov, nie všeobecné "bojíme sa prompt injection".
2. **Mapovanie kontrol.** Ku každej technike priraď kontrolu z tohto článku (gateway, guardrails, oprávnenia agenta, monitoring). Nepokryté techniky sú tvoje medzery.
3. **Red team.** Nálezy z garak, promptfoo či PyRIT označ ID techniky ATLAS. Správa potom hovorí jazykom, ktorému rozumie aj SOC a manažment.
4. **Detekcie a incident response.** Pravidlá vo SIEM a runbooky taguj rovnako ako pri ATT&CK. Z prípadových štúdií ATLAS si vezmi hotové scenáre na tabletop cvičenia.
5. **Agenti.** Rozšírenia z roku 2025 pokrývajú napríklad otrávenie kontextu agenta (`AML.T0080`), zmenu jeho konfigurácie (`AML.T0081`), zber prístupových údajov cez RAG (`AML.T0082`) a exfiltráciu cez volanie nástrojov (`AML.T0086`). Presné ID a názvy si over v katalógu, lebo ich preberám zo sekundárneho zdroja. Ten navyše uvádza, že ATLAS zatiaľ nepokrýva dobre napríklad laterálny pohyb medzi agentmi alebo kompromitáciu MCP servera, takže sa nespoliehaj na úplnosť matice.

Dáta ATLAS sú dostupné aj strojovo čitateľne ([atlas-data na GitHube](https://github.com/mitre-atlas/atlas-data)), takže ich vieš zapojiť do vlastných nástrojov na threat modeling.

**Alternatívy a doplnky:** [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) · [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [MITRE ATT&CK](https://attack.mitre.org) (pre klasické časti systému) · [Google SAIF](https://saif.google)

---

## Vrstvy obrany

```
┌────────────────────────────────────────────┐
│  9. ĽUDIA A ŠKOLENIE                       │
├────────────────────────────────────────────┤
│  8. RED TEAMING (testovanie útokmi)        │
├────────────────────────────────────────────┤
│  7. MONITOROVANIE A AUDIT                  │
├────────────────────────────────────────────┤
│  6. AGENTI A MCP                           │
├────────────────────────────────────────────┤
│  5. MODELY A DODÁVATEĽSKÝ REŤAZEC          │
├────────────────────────────────────────────┤
│  4. GATEWAY (jedno miesto kontroly)        │
├────────────────────────────────────────────┤
│  3. DÁTA (klasifikácia, redakcia PII)      │
├────────────────────────────────────────────┤
│  2. IDENTITA (ĽUDIA AJ AGENTI), PRÍSTUP    │
├────────────────────────────────────────────┤
│  1. GOVERNANCE (pravidlá a inventár)       │
└────────────────────────────────────────────┘
```

---

## 1. Governance: pravidlá a inventár

Najlacnejšia vrstva a zároveň tá, ktorú firmy najčastejšie preskočia. Bez nej ostatné vrstvy nemajú čo vynucovať.

- **Inventár AI:** ktoré nástroje, modely a integrácie vo firme bežia a kto za ne zodpovedá. Zoznam komponentov (modely, knižnice, MCP servery) si veď podobne ako SBOM.
- **Klasifikácia dát:** jasne napísané, čo smie ísť do externého modelu, čo len do lokálneho a čo nikdy.
- **Schválený zoznam:** radšej tri dobré nástroje, ktoré ľudia skutočne používajú, než zákaz, ktorý obchádzajú.
- **Vlastník rizika:** konkrétny človek, nie "IT".

Rámce, o ktoré sa oplatí oprieť:

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) pre riadenie rizík
- [ISO/IEC 42001](https://www.iso.org/standard/81230.html) pre systém riadenia AI (certifikovateľný štandard)
- [MITRE ATLAS](https://atlas.mitre.org) pre katalóg taktík a techník útokov na AI systémy (viac v sekcii vyššie)

---

## 2. Identita a prístup

Pravidlá sú rovnaké ako všade inde, len sa na ne pri AI často zabúda. A pribudla nová otázka: **kto vlastne koná, keď koná agent?**

### Identita ľudí

- **SSO namiesto zdieľaných účtov.** Každá požiadavka na model musí byť priraziteľná konkrétnemu používateľovi.
- **Kľúče na používateľa alebo tím**, s rozpočtom a obmedzením modelov. Jeden zdieľaný API kľúč v konfiguračnom súbore je presne ten scenár z LLM10.
- **Prístupové práva v RAG:** dokument, ktorý používateľ nesmie vidieť, sa nesmie dostať ani do kontextu modelu. Model nevie "zabudnúť", čo mu dáš (LLM08). Filtrovanie musí prebehnúť pri vyhľadávaní, nie v odpovedi.
- **Oddelené prostredia:** experimenty s citlivými dátami patria do lokálnych modelov, nie do verejného API.

### Identita agentov

Agent nie je používateľ a nie je ani obyčajná aplikácia. Je to **nehumánna identita** (NHI), ktorá sa rozhoduje sama, číta nedôveryhodný obsah a môže byť zmanipulovaná. Preto potrebuje vlastný životný cyklus identity, nie požičané heslo kolegu. Najčastejšie chyby sú tieto: agent beží pod osobným tokenom zamestnanca, viac agentov zdieľa jeden servisný účet, kľúč je natvrdo v konfigurácii alebo v systémovom prompte. Výsledok? Po incidente nevieš povedať, *ktorý* agent a v *čijom mene* konal. Katalóg typických rizík nájdeš v [OWASP Non-Human Identities Top 10](https://owasp.org/www-project-non-human-identities-top-10/).

Zásady:

1. **Každý agent má vlastnú identitu.** Samostatný účet či kľúč na agenta (a ideálne na prostredie), nikdy nie zdieľaný. V gateway je to virtuálny kľúč na agenta s vlastným rozpočtom a zoznamom modelov.
2. **Dve identity v každej akcii: kto a čím.** Pri konaní v mene používateľa nesie požiadavka aj identitu používateľa, aj identitu agenta (delegovanie cez OAuth, napríklad výmena tokenov). Efektívne práva sú **prienik** práv agenta a používateľa, nie ich súčet. Inak sa agent stane cestou na obídenie prístupových práv.
3. **Krátkodobé a úzko ohraničené poverenia.** Tokeny s krátkou platnosťou, viazané na konkrétnu službu a rozsah (scope). Dlhodobé kľúče len tam, kde sa inak nedá, a s rotáciou.
4. **Tajomstvá mimo promptu a mimo kódu.** Do trezoru, nie do systémového promptu (LLM07 hovorí, že prompt sa dá vytiahnuť). Agent dostane poverenie až pri volaní nástroja, nie navždy do kontextu.
5. **MCP a OAuth.** [Špecifikácia MCP pre autorizáciu](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) stavia na OAuth. Dbaj na tokeny viazané na konkrétny server (audience) a nepodsúvaj cez MCP server ďalej cudzie tokeny. Špecifikácia sa vyvíja, čítaj verziu zodpovedajúcu tvojmu klientovi a serveru.
6. **Identita workloadu.** Pre agentov v kontajneroch či Kubernetes zváž kryptografickú identitu ([SPIFFE/SPIRE](https://spiffe.io)) namiesto statických tajomstiev.
7. **Životný cyklus.** Každý agent je v inventári (sekcia Governance) s vlastníkom, účelom a dátumom expirácie. Musíš ho vedieť **okamžite odpojiť** (zrušiť kľúč) a pravidelne vyradiť nepoužívané.
8. **Audit.** Do každého záznamu patrí identita agenta, identita používateľa, nástroj a argumenty (viac v sekcii Monitorovanie).

**Alternatívy a súvisiace nástroje:** FOSS: [Keycloak](https://www.keycloak.org) (IdP/OAuth) · [SPIFFE/SPIRE](https://spiffe.io) (identita workloadov) · [OpenBao](https://openbao.org) (trezor tajomstiev). Komerčné: [Microsoft Entra Agent ID](https://learn.microsoft.com/entra/agent-id) · [Okta](https://www.okta.com) · [HashiCorp Vault](https://www.vaultproject.io)

---

## 3. Dáta: klasifikácia a redakcia PII

Najspoľahlivejší spôsob, ako zabrániť úniku, je nedať dátam odísť. Ak musia ísť k externému modelu, osobné údaje sa maskujú ešte predtým.

### Microsoft Presidio: detekcia a maskovanie PII

Presidio rozpoznáva osobné údaje v texte pomocou regulárnych výrazov, NLP, pravidiel a kontrolných súčtov a vie ich anonymizovať. Projekt prechádza pod [komunitné vlastníctvo](https://devtoollab.com/blog/best-llm-guardrails-tools) (repozitár sa presunul do organizácie `data-privacy-stack`, licencia MIT).

🔗 [github.com/data-privacy-stack/presidio](https://github.com/data-privacy-stack/presidio)

**Dôležité obmedzenia:**

- Microsoft [nezaručuje nájdenie všetkých citlivých dát](https://infrabase.ai/blog/llm-guardrails-compared). Je to jedna vrstva, nie celá obrana.
- Presidio nemá hotovú podporu slovenčiny. Slovenské identifikátory (rodné číslo, IČO, IBAN) si musíš doplniť vlastnými rozpoznávačmi.

**Alternatívy:** FOSS: [scrubadub](https://github.com/LeapBeyond/scrubadub) · [GLiNER](https://github.com/urchade/GLiNER) (NER model, vhodný aj na vlastné entity). Komerčné: [Private AI](https://www.private-ai.com) · [Google Sensitive Data Protection](https://cloud.google.com/sensitive-data-protection) · [Nightfall](https://www.nightfall.ai)

Príklad vlastného rozpoznávača slovenského rodného čísla vrátane kontroly deliteľnosti jedenástimi:

```python
from presidio_analyzer import AnalyzerEngine, Pattern, PatternRecognizer


class SkRodneCislo(PatternRecognizer):
    def __init__(self):
        super().__init__(
            supported_entity="SK_RODNE_CISLO",
            patterns=[Pattern("rc", r"\b\d{6}/?\d{3,4}\b", 0.3)],
            context=["rodné číslo", "rc", "narodený", "nar."],
            supported_language="en",
        )

    def validate_result(self, pattern_text: str):
        c = pattern_text.replace("/", "")
        if len(c) == 10:
            zvysok = int(c[:9]) % 11
            # výnimka: zvyšok 10 sa zapisuje ako kontrolná číslica 0
            return int(c) % 11 == 0 or (zvysok == 10 and c[9] == "0")
        return None  # 9-ciferné (pred rokom 1954) nemajú kontrolnú číslicu


engine = AnalyzerEngine()
engine.registry.add_recognizer(SkRodneCislo())

text = "Zákazník s rodným číslom 800101/1238 reklamuje faktúru."
for r in engine.analyze(text=text, language="en"):
    print(r.entity_type, r.start, r.end, round(r.score, 2))
```

Kontrolný súčet výrazne znižuje počet falošných poplachov: náhodné číslo tvaru `NNNNNN/NNNN` je deliteľné jedenástimi len v približne jednom prípade z jedenástich.

**Poznámka k aktuálnemu stavu:** populárny nástroj LLM Guard od Protect AI bol [9. júla 2026 archivovaný](https://github.com/protectai/llm-guard) a už sa nevyvíja. Kód je stále použiteľný, ale ako bezpečnostná závislosť pre nové nasadenie sa neodporúča. Namiesto neho kombinuj Presidio (PII) a NeMo Guardrails (pravidlá správania), ako ukazuje ďalšia časť.

---

## 4. Gateway: jedno miesto kontroly

Najdôležitejšie architektonické rozhodnutie: **všetka komunikácia s modelmi ide cez jeden bod.** Aplikácie, chatovacie rozhranie aj agenti volajú gateway, nie modely priamo. Dostaneš tak na jednom mieste:

- autentifikáciu a kľúče s rozpočtami,
- guardrails (redakcia PII, filtre),
- logovanie a sledovanie nákladov,
- možnosť prepnúť model alebo poskytovateľa bez zmeny aplikácií.

### LiteLLM Proxy

[LiteLLM](https://github.com/BerriAI/litellm) je open-source proxy s API kompatibilným s OpenAI. Spravuje autentifikáciu, vyvažovanie záťaže a [sledovanie nákladov](https://langfuse.com/integrations/gateways/litellm.md) pre viac než sto modelov. Presidio je v ňom zabudované ako [guardrail](https://docs.litellm.ai/docs/proxy/guardrails/pii_masking_v2) s režimami `pre_call`, `during_call`, `post_call` a `logging_only`.

🔗 [litellm.ai](https://litellm.ai)

**Pozor na licenciu:** jadro je open-source, ale niektoré pokročilé funkcie (typicky SSO pre väčší počet používateľov alebo audit logy) bývajú v platenej enterprise vrstve. Pred nasadením si v dokumentácii over, čo reálne potrebuješ.

Ukážku kompletného nasadenia nájdeš v sekcii *Praktický stack* nižšie.

**Alternatívy:** FOSS: [Portkey Gateway](https://github.com/Portkey-AI/gateway) · [Envoy AI Gateway](https://github.com/envoyproxy/ai-gateway) · [Kong Gateway (AI plugins)](https://github.com/Kong/kong). Komerčné: [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) · [Kong AI Gateway](https://konghq.com/products/kong-ai-gateway) · [OpenRouter](https://openrouter.ai)

### NeMo Guardrails: pravidlá správania

[NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) (Apache 2.0) vkladá medzi aplikáciu a model [päť typov rails](https://oecd.ai/en/catalogue/tools/nvidia-nemoguardrails): vstupné, dialógové, pre vyhľadávanie (RAG), pre vykonávanie akcií a výstupné. Hodí sa tam, kde potrebuješ, aby asistent riešil len určité témy, alebo kde chceš overiť volania nástrojov pred ich vykonaním. Repozitár sa presunul na novú adresu a [v lete 2026 vyšla verzia 0.23.0](https://devtoollab.com/blog/best-llm-guardrails-tools).

**Alternatívy:** FOSS: [Guardrails AI](https://github.com/guardrails-ai/guardrails) · [LlamaFirewall](https://github.com/meta-llama/PurpleLlama/tree/main/LlamaFirewall) · [Llama Guard](https://github.com/meta-llama/PurpleLlama). Komerčné: [Lakera Guard](https://www.lakera.ai) · [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) · [Amazon Bedrock Guardrails](https://aws.amazon.com/bedrock/guardrails/)

---

## 5. Modely a dodávateľský reťazec

Stiahnutý model je spustiteľný kód, nie len dáta. Staršie formáty (najmä Python `pickle`) môžu pri načítaní vykonať ľubovoľný príkaz.

- **Uprednostni formát `safetensors`** (neumožňuje spustenie kódu) alebo GGUF z dôveryhodného zdroja.
- **Pripni verzie a kontrolné súčty** modelov aj kontajnerových obrazov. Nepoužívaj `:latest` v produkcii.
- **Zdroj:** modely len od overených publikovateľov, nie z náhodných repozitárov.
- **Skenuj pred nasadením.**

### ModelScan: kontrola serializovaných modelov

[ModelScan](https://github.com/protectai/modelscan) hľadá nebezpečný kód v modeloch bez ich spustenia. Podporuje [formáty H5, Pickle a SavedModel](https://github.com/protectai/modelscan) a dá sa vložiť do CI/CD ako brána pred nasadením.

```bash
pip install modelscan

# Naskenuj stiahnutý model
modelscan -p ./stiahnuty-model.pkl

# Výstup do JSON pre CI/CD
modelscan -p ./stiahnuty-model.pkl -r json -o scan.json
```

Návratový kód 2 znamená, že samotné skenovanie zlyhalo. V CI/CD to ošetri ako **zablokovanie**, nie ako úspech.

**Alternatívy:** FOSS: [Fickling](https://github.com/trailofbits/fickling) · [picklescan](https://github.com/mmaitre314/picklescan). Komerčné: [HiddenLayer](https://hiddenlayer.com) · [Palo Alto Prisma AIRS](https://www.paloaltonetworks.com/prisma/prisma-ai-runtime-security)

Projekt vlastní Protect AI (dnes súčasť Palo Alto Networks). Archivovanie LLM Guard je pripomienka, že aj tu platí pravidlo: sleduj, či je projekt živý.

---

## 6. Agenti a MCP

Tu je dnes najväčšie riziko. Chatbot len odpovedá. Agent **koná**: číta dokumenty, volá API, píše súbory a posiela správy. Spojenie prompt injection (LLM01) a príliš širokých oprávnení (LLM06) je presne ten scenár, pri ktorom stačí jeden podstrčený e-mail.

Základné pravidlá:

- **Najmenšie možné oprávnenia** pre každý nástroj. Agent, ktorý číta kalendár, nepotrebuje právo zapisovať do súborov.
- **Schválenie človekom** pre akcie, ktoré sa nedajú vrátiť späť (odoslanie správy, mazanie, platby).
- **Oddelenie nedôveryhodného obsahu:** agent, ktorý spracúva cudzie e-maily, nesmie mať súčasne prístup k interným dátam aj von do internetu.
- **Zoznam povolených MCP serverov**, nie "pridaj hocijaký".
- **Sandbox** pre vykonávanie kódu.

### Snyk Agent Scan (pôvodne mcp-scan)

Nástroj [mcp-scan](https://appsecsanta.com/mcp-scan) od Invariant Labs, ktorý vo firme Snyk [kúpili v júni 2025](https://guptadeepak.com/agent-security/vendor/invariant-labs/), sa dnes volá **Snyk Agent Scan** (`snyk-agent-scan`). Skenuje konfigurácie MCP serverov, nástroje a skills na prompt injection, *tool poisoning* (škodlivé pokyny ukryté v popise nástroja), *rug pull* (server po schválení zmení správanie) a tzv. toxic flows.

🔗 [github.com/snyk/agent-scan](https://github.com/snyk/agent-scan)

```bash
# Skenovanie všetkých známych konfigurácií agentov na tomto počítači
uvx snyk-agent-scan@latest

# Skenovanie konkrétneho súboru MCP konfigurácie
uvx snyk-agent-scan@latest ~/.vscode/mcp.json

# Skenovanie skills
uvx snyk-agent-scan@latest --skills ~/.claude/skills
```

**Upozornenie:** kód je open-source, ale podľa [jedného porovnania](https://dev.to/ventrova/sentinel-scan-cli-vs-cisco-mcp-scanner-vs-snyk-agent-scan-comparing-open-source-mcp-security-f5a) dnes beh vyžaduje bezplatný účet Snyk a API token. Ak je pre teba zásadná čistá nezávislosť od tretej strany, hľadaj alternatívy (porovnanie spomína napríklad Cisco mcp-scanner). Skener navyše nenahrádza ochranu za behu: [toxic flows môžu vzniknúť až dynamicky](https://rubinlake.com/en/technology-radar/ai-security-and-governance/agent-scan) z kombinácie nástrojov a dát.

**Alternatívy:** FOSS: [Cisco mcp-scanner](https://github.com/cisco-ai-defense/mcp-scanner) · [Docker MCP Gateway](https://github.com/docker/mcp-gateway). Komerčné: [Zenity](https://zenity.io) · [Lakera](https://www.lakera.ai)

---

## 7. Monitorovanie a audit

Čo nevidíš, to nevieš vyšetriť. Pri AI platí dvojnásobne, lebo model je nedeterministický a "prečo to urobil" sa dá spätne zistiť len z logov.

Loguj:

- kto, kedy, ktorý model a koľko tokenov,
- rozhodnutia guardrails (čo bolo zamaskované alebo zablokované),
- volania nástrojov agentmi vrátane argumentov a **identity agenta aj používateľa, v mene ktorého konal**,
- anomálie: náhly nárast spotreby, nové modely, neobvyklý čas,
- detekčné pravidlá označ technikami [MITRE ATLAS](https://atlas.mitre.org), nech sa SOC vie orientovať ako pri ATT&CK.

**Nelogu surový obsah bez rozmyslu.** Logy s plným textom promptov sú sami o sebe zásobáreň citlivých dát. Maskuj ich ešte pred zápisom a nastav retenciu.

### Langfuse: trasovanie volaní

[Langfuse](https://langfuse.com) je open-source platforma na sledovanie LLM volaní: stopy, náklady, latencia a hodnotenie kvality. Zapája sa priamo do LiteLLM a [guardrail rozhodnutia sa zobrazia v stope](https://docs.litellm.ai/docs/proxy/guardrails/pii_masking_v2).

🔗 [langfuse.com](https://langfuse.com)

**Licencia:** všetky produktové funkcie sú pod [MIT](https://langfuse.com/handbook/chapters/open-source.md), ale moduly ako SCIM, **audit logy** a politiky uchovávania dát sú pri vlastnom hostovaní pod komerčnou licenciou a vyžadujú licenčný kľúč. Ak potrebuješ nemenný audit v rámci čistého open-source, riešiš ho vlastným logovaním (napríklad logy gateway do centrálneho úložiska).

**Alternatívy:** FOSS: [Arize Phoenix](https://github.com/Arize-ai/phoenix) · [OpenLIT](https://github.com/openlit/openlit) · [Opik](https://github.com/comet-ml/opik). Komerčné: [LangSmith](https://smith.langchain.com) · [Datadog LLM Observability](https://www.datadoghq.com/product/llm-observability/)

---

## 8. Red teaming: testuj to, čo si postavil

Guardrails, ktoré si nikdy neskúsil obísť, ti poskytujú len pocit bezpečia. Útoky na vlastný systém treba automatizovať a spúšťať opakovane (po každej zmene modelu, promptu či guardrails).

### garak: skener zraniteľností LLM

[garak](https://github.com/NVIDIA/garak) od NVIDIA (Apache 2.0) je pre jazykové modely to, čím je nmap pre siete. Posiela modelu útočné prompty, vyhodnocuje odpovede a generuje správu. Pokrýva prompt injection, jailbreaky, únik trénovacích dát, škodlivé výstupy a halucinované balíčky. Aktuálna verzia je [0.17.0 zo septembra 2026](https://letsdatascience.com/news/nvidia-garak-adds-modular-llm-vulnerability-scanning-2d001928).

```bash
python -m pip install -U garak

# Zoznam dostupných testov (probes)
python -m garak --list_probes

# Test proti OpenAI-kompatibilnému koncovému bodu (napr. tvoj gateway)
python -m garak --target_type openai.OpenAICompatible \
  --target_name lokalny-model \
  --generator_option_file gen.json \
  --probes promptinject
```

Súbor `gen.json` obsahuje adresu tvojho gateway a kľúč. Presnú štruktúru a názvy prepínačov (v starších verziách `--model_type`) si over v dokumentácii zodpovedajúcej tvojej verzii. Počty testov sa medzi verziami [líšia](https://app.stationx.net/articles/garak-llm-scanner), preto si ich vypíš sám.

**Alternatívy:** FOSS: [PyRIT](https://github.com/Azure/PyRIT) · [DeepTeam](https://github.com/confident-ai/deepteam) · [Giskard](https://github.com/Giskard-AI/giskard). Komerčné: [Mindgard](https://mindgard.ai) · [HiddenLayer](https://hiddenlayer.com) · [Lakera Red](https://www.lakera.ai)

**Tip:** testy sú anglocentrické. Pre slovenský jazyk si pridaj vlastné útočné prompty, lebo filtre často zlyhávajú práve pri iných jazykoch.

### promptfoo: testy a red teaming v YAML

[promptfoo](https://www.promptfoo.dev) je CLI nástroj pod licenciou MIT na hodnotenie a útočné testovanie aplikácií s LLM, vrátane integrácie do CI/CD. Beží lokálne a nepotrebuje účet. V marci 2026 ho [kúpil OpenAI](https://www.dsebastien.net/promptfoo/), projekt zostáva open-source, ale pri nástroji na testovanie je dobré sledovať, ako neutrálny zostane.

```bash
# Inicializácia red team konfigurácie
npx promptfoo@latest redteam init

# Spustenie útokov a zobrazenie správy
npx promptfoo@latest redteam run
npx promptfoo@latest view
```

**Alternatívy:** FOSS: [DeepEval](https://github.com/confident-ai/deepeval) · [Inspect AI](https://github.com/UKGovernmentBEIS/inspect_ai) · [PyRIT](https://github.com/Azure/PyRIT). Komerčné: [Confident AI](https://www.confident-ai.com) · [Mindgard](https://mindgard.ai)

**Tip k ATLAS:** nálezy z garak či promptfoo spáruj s technikami [MITRE ATLAS](https://atlas.mitre.org) a z prípadových štúdií si vezmi scenáre, ktoré tvoje testy ešte nepokrývajú.

---

## 9. Ľudia a školenie

Najlepšia technická obrana zlyhá, ak zamestnanec vloží databázu zákazníkov do osobného účtu, lebo "je to rýchlejšie". Preto:

- **Krátke, konkrétne pravidlá:** "Toto sem nikdy: rodné čísla, heslá, zmluvy, zdrojový kód klienta."
- **Ukáž dôvod**, nielen zákaz. Jedna reálna ukážka prompt injection presvedčí viac ako desať strán politiky.
- **Zjednoduš správnu cestu:** schválený nástroj musí byť jednoduchší na použitie než obchádzka.
- **Hlásenie bez trestu:** kto si všimne, že omylom vložil citlivé dáta, to má nahlásiť hneď.

Povinnosť zvyšovať gramotnosť v oblasti AI vyplýva aj z AI Act (článok 4). Podľa [jedného z rozborov](https://www.haqq.ai/blog/eu-ai-act-amendments-2026) ju novela zmäkčila na povinnosť podporovať rozvoj gramotnosti namiesto zaručenia jej úrovne.

---

## Regulácia: stručne a bez paniky

Tri veci, ktoré sa týkajú väčšiny firiem v EÚ:

**EU AI Act.** Nariadenie [2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) bolo v roku 2026 prvýkrát podstatne zmenené nariadením [2026/1744 (Digital Omnibus on AI)](https://www.haqq.ai/blog/eu-ai-act-amendments-2026), ktoré bolo vyhlásené 24. júla a platí od 27. júla 2026. Podľa dostupných rozborov:

- Povinnosti pre **vysokorizikové systémy** sa [posunuli](https://www.processexcellencenetwork.com/ai/articles/eu-ai-act-2026-what-actually-changed-and-what-deployers-still-must-do) na 2. decembra 2027 (samostatné systémy podľa prílohy III) a 2. augusta 2028 (systémy zabudované vo výrobkoch podľa prílohy I).
- **Transparentnosť (článok 50)** sa **neposunula** a [platí od 2. augusta 2026](https://www.cpduk.co.uk/news/deadline-moved-and-duty-did-not-ai-act-transparency-obligations-after-digital-omnibus). Označovanie syntetického obsahu strojovo čitateľným spôsobom má pre systémy uvedené na trh pred týmto dátumom prechodné obdobie [do 2. decembra 2026](https://www.haqq.ai/blog/eu-ai-act-amendments-2026).

Detaily (najmä prechodné obdobia) si pred právnym záväzným rozhodnutím over priamo v texte nariadenia a so svojím právnikom. Tento článok nie je právne poradenstvo.

**GDPR.** Osobné údaje v promptoch sú stále osobné údaje. Platí minimalizácia, účel spracovania aj zmluva so sprostredkovateľom. Redakcia PII na gateway je priamo technické opatrenie na minimalizáciu. [Text nariadenia](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

**NIS2.** Smernica [2022/2555](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) vyžaduje riadenie rizík vrátane dodávateľského reťazca. Externý poskytovateľ AI je z tohto pohľadu dodávateľ ako každý iný: potrebuješ zmluvu, hodnotenie rizika a plán, čo ak vypadne alebo je kompromitovaný.

---

## Praktický stack: len open-source

Poskladajme základ, ktorý zvládne malá firma alebo domáci lab: lokálne modely, gateway s maskovaním PII, trasovanie a chatovacie rozhranie.

```
Používateľ ──► Chatovacie rozhranie ──► LiteLLM Proxy ──► Ollama (lokálne modely)
                                             │
                                             ├──► Presidio (maskovanie PII)
                                             └──► Langfuse (trasovanie)
```

**Licenčná poznámka k rozhraniu:** Open WebUI má od verzie 0.6.6 [licenciu BSD-3 s doložkou o zachovaní značky](https://docs.openwebui.com/license/), čo nie je klasická open-source licencia v zmysle OSI. Pre bežné nasadenie bez zmeny značky to nie je problém. Ak potrebuješ striktne OSI-open-source, ako alternatívu zváž [LibreChat](https://github.com/danny-avila/LibreChat) (MIT).

**Alternatívy k rozhraniu:** FOSS: [LibreChat](https://github.com/danny-avila/LibreChat) · [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) · [Onyx](https://github.com/onyx-dot-app/onyx). Komerčné: [ChatGPT Enterprise](https://openai.com/chatgpt/enterprise/) · [Claude Enterprise](https://www.anthropic.com/enterprise) · [Microsoft 365 Copilot](https://www.microsoft.com/microsoft-365/copilot)

**Alternatívy k Ollama:** FOSS: [llama.cpp](https://github.com/ggml-org/llama.cpp) · [vLLM](https://github.com/vllm-project/vllm) · [LocalAI](https://github.com/mudler/LocalAI). Komerčné: [LM Studio](https://lmstudio.ai)

### docker-compose.yml

```yaml
# Verzie obrazov pripni na konkrétny tag alebo digest, nie :latest.
services:
  ollama:
    image: ollama/ollama:<pripnutá-verzia>
    volumes:
      - ollama:/root/.ollama
    networks: [ai-vnutorna]

  presidio-analyzer:
    image: mcr.microsoft.com/presidio-analyzer:<pripnutá-verzia>
    networks: [ai-vnutorna]

  presidio-anonymizer:
    image: mcr.microsoft.com/presidio-anonymizer:<pripnutá-verzia>
    networks: [ai-vnutorna]

  litellm:
    image: ghcr.io/berriai/litellm:<pripnutá-verzia>
    command: ["--config", "/app/config.yaml"]
    volumes:
      - ./litellm-config.yaml:/app/config.yaml:ro
    environment:
      LITELLM_MASTER_KEY: ${LITELLM_MASTER_KEY}
      PRESIDIO_ANALYZER_API_BASE: http://presidio-analyzer:3000
      PRESIDIO_ANONYMIZER_API_BASE: http://presidio-anonymizer:3000
      LANGFUSE_PUBLIC_KEY: ${LANGFUSE_PUBLIC_KEY}
      LANGFUSE_SECRET_KEY: ${LANGFUSE_SECRET_KEY}
      LANGFUSE_HOST: ${LANGFUSE_HOST}
    networks: [ai-vnutorna]

  open-webui:
    image: ghcr.io/open-webui/open-webui:<pripnutá-verzia>
    environment:
      OPENAI_API_BASE_URL: http://litellm:4000/v1
      OPENAI_API_KEY: ${WEBUI_LITELLM_KEY}
      ENABLE_OLLAMA_API: "false"   # všetko ide cez gateway
    ports:
      - "127.0.0.1:8080:8080"      # von len cez reverzné proxy s TLS a SSO
    networks: [ai-vnutorna]

networks:
  ai-vnutorna:
    internal: false   # modely sú lokálne; pre striktnú izoláciu zváž internal: true

volumes:
  ollama:
```

Tajomstvá patria do súboru `.env` mimo repozitára (a do `.gitignore`). Na kontrolu, či sa tam omylom nedostali, použi napríklad [gitleaks](https://github.com/gitleaks/gitleaks) ako pre-commit kontrolu. Gitleaks je podľa autora "feature complete" (len bezpečnostné záplaty), nástupcom je [Betterleaks](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/).

**Alternatívy:** FOSS: [TruffleHog](https://github.com/trufflesecurity/trufflehog) · [detect-secrets](https://github.com/Yelp/detect-secrets) · Betterleaks. Komerčné: [GitGuardian](https://www.gitguardian.com) · [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning)

### litellm-config.yaml

```yaml
model_list:
  - model_name: lokalny-model
    litellm_params:
      model: ollama/gemma3:12b
      api_base: http://ollama:11434

guardrails:
  # Maskovanie PII pred odoslaním modelu
  - guardrail_name: "presidio-maskovanie"
    litellm_params:
      guardrail: presidio
      mode: "pre_call"
      default_on: true
      pii_entities_config:
        EMAIL_ADDRESS: "MASK"
        PHONE_NUMBER: "MASK"
        CREDIT_CARD: "BLOCK"
        IBAN_CODE: "BLOCK"

  # Maskovanie len v logoch (aby sa PII nedostalo do trasovania)
  - guardrail_name: "presidio-logy"
    litellm_params:
      guardrail: presidio
      mode: "logging_only"
      default_on: true

litellm_settings:
  success_callback: ["langfuse"]
  failure_callback: ["langfuse"]

general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
```

Všimni si druhý guardrail v režime `logging_only`. Bez neho by sa pôvodný text s osobnými údajmi mohol dostať do trasovania, aj keď model dostal maskovaný vstup. Tento detail sa v praxi ľahko prehliadne, a presne tak vzniká únik cez logy.

Presné názvy kľúčov (`pii_entities_config`, `default_on`) a podporované režimy sa menia medzi verziami. Over si ich v [aktuálnej dokumentácii](https://docs.litellm.ai/docs/proxy/guardrails/pii_masking_v2) a **otestuj**, či maskovanie skutočne funguje, napríklad zaslaním testovacej správy s e-mailom a kontrolou v Langfuse.

### Overenie funkčnosti

```bash
# Vytvor kľúč pre konkrétneho používateľa s rozpočtom
curl -X POST http://localhost:4000/key/generate \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"models": ["lokalny-model"], "max_budget": 5, "metadata": {"user": "jana", "agent": "asistent-faktury"}}'

# Test: e-mail v prompte by mal odísť k modelu zamaskovaný
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <vygenerovaný-kľúč>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "lokalny-model",
    "messages": [{"role": "user", "content": "Napíš odpoveď pre jana.novak@example.com"}],
    "guardrails": ["presidio-maskovanie"]
  }'
```

---

## Checklist

### Governance
- [ ] Inventár AI nástrojov, modelov a integrácií
- [ ] Klasifikácia dát: čo smie ísť von
- [ ] Schválený zoznam nástrojov a vlastník rizika

### Identita a dáta
- [ ] SSO a kľúče na používateľa s rozpočtom
- [ ] Každý agent má vlastnú identitu, krátkodobé poverenia a vlastníka
- [ ] Delegované práva agenta = prienik práv agenta a používateľa
- [ ] Agenta viem okamžite odpojiť (kill switch)
- [ ] Prístupové práva uplatnené pri vyhľadávaní v RAG
- [ ] Redakcia PII vrátane slovenských identifikátorov

### Gateway a modely
- [ ] Všetka komunikácia s modelmi ide cez gateway
- [ ] Obrazy a modely pripnuté na verziu, modely naskenované
- [ ] Rozpočty a limity (ochrana pred LLM10)

### Agenti
- [ ] Najmenšie oprávnenia pre každý nástroj
- [ ] Schválenie človekom pre nevratné akcie
- [ ] Zoznam povolených MCP serverov, pravidelný sken

### Monitorovanie a testovanie
- [ ] Threat model AI systémov zmapovaný na MITRE ATLAS
- [ ] V logoch je identita agenta aj používateľa
- [ ] Logy bez surového obsahu, s retenciou
- [ ] Upozornenia na anomálie v spotrebe
- [ ] Red team testy pri každej zmene modelu či promptu

### Ľudia
- [ ] Krátke pravidlá "toto nikdy do AI"
- [ ] Schválený nástroj je pohodlnejší než obchádzka
- [ ] Hlásenie incidentov bez trestu

---

## Záver

Bezpečná AI nie je o jednom nástroji ani o zákaze. Je o tom, že všetka komunikácia ide jednou kontrolovanou cestou, dáta sa minimalizujú pred odoslaním, agenti majú len nevyhnutné oprávnenia a celé to pravidelne napádaš vlastnými testami.

Dve poučenia z príprav tohto článku stoja za zapamätanie. Po prvé, **ekosystém sa mení rýchlo**: LLM Guard bol archivovaný, mcp-scan zmenil majiteľa a názov, promptfoo prešiel pod OpenAI. Pri každom nástroji sleduj, kto ho vlastní a či je živý. Po druhé, **licencie nie sú detail**: Langfuse má audit logy v komerčnej vrstve, Open WebUI má doložku o značke a niektoré funkcie LiteLLM sú platené. Overuj, čo skutočne dostaneš zadarmo.

Pridaj k tomu identitu agentov a threat model v jazyku MITRE ATLAS. Začni jednou vrstvou: gateway s maskovaním PII a rozpočtami. Už tá ti dá viditeľnosť a kontrolu, ktoré predtým úplne chýbali.

---

## Referencie a ďalšie čítanie

**Rámce a štandardy**
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [OWASP Top 10 LLM 2025 — prehľad](https://docs.modulos.ai/frameworks/owasp-top-10-llm)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [ISO/IEC 42001](https://www.iso.org/standard/81230.html)
- [MITRE ATLAS](https://atlas.mitre.org) a [ATLAS v kontexte agentov — CSA](https://labs.cloudsecurityalliance.org/agentic/csa-research-note-atlas-agentic-gap-analysis-20260327/)
- [OWASP Non-Human Identities Top 10](https://owasp.org/www-project-non-human-identities-top-10/)
- [MCP — autorizácia](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)

**Regulácia**
- [EU AI Act — nariadenie 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [Digital Omnibus on AI (2026/1744) — rozbor](https://www.haqq.ai/blog/eu-ai-act-amendments-2026)
- [Transparentnosť po Digital Omnibus — CPD UK](https://www.cpduk.co.uk/news/deadline-moved-and-duty-did-not-ai-act-transparency-obligations-after-digital-omnibus)
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) a [NIS2](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)

**Nástroje**
- [Presidio](https://github.com/data-privacy-stack/presidio) a [LiteLLM + Presidio guardrail](https://docs.litellm.ai/docs/proxy/guardrails/pii_masking_v2)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails)
- [ModelScan](https://github.com/protectai/modelscan)
- [Snyk Agent Scan](https://github.com/snyk/agent-scan)
- [Langfuse](https://langfuse.com) a [licencia](https://langfuse.com/handbook/chapters/open-source.md)
- [garak](https://github.com/NVIDIA/garak)
- [promptfoo](https://www.promptfoo.dev)
- [gitleaks](https://github.com/gitleaks/gitleaks)

**Stav ekosystému**
- [LLM Guard archivovaný — alternatívy](https://devtoollab.com/blog/best-llm-guardrails-tools)
- [Open WebUI — licencia](https://docs.openwebui.com/license/)

---

**Autor:** IT profesionál, nadšenec kybernetickej bezpečnosti  
**Publikované:** 13. októbra 2026  
**Aktualizované:** 14. októbra 2026  
**Vytvorené s pomocou AI:** Claude (Anthropic), editorské rozhodnutia autor  
**Tagy:** #cybersecurity #ai #llm #owasp #mitre-atlas #agent-identity #guardrails #open-source #compliance #ai-assisted
