---
title: "Free Cyber Security Tools a Vrstvy Obrany"
excerpt: "Komplexný prehľad bezplatných bezpečnostných nástrojov a modernej viacvrstvovej obrany pre rok 2026. Od Zero Trust až po AI-powered hrozby."
tags: ["cybersecurity", "tools", "defense-in-depth", "free-tools", "security"]
date: "2026-02-11"
readTime: "15 min"
slug: "free-cyber-security-tools-vrstvy-obrany"
---

# Free Cyber Security Tools a Vrstvy Obrany

## Úvod: Kybernetická bezpečnosť v roku 2026

Rok 2026 prináša bezprecedentnú vlnu sofistikovaných kybernetických hrozieb. Útočníci už nie sú len hackeri s klávesnicou - [dnes používajú umelú inteligenciu na napodobňovanie správania používateľov](https://medium.com/infosecmatrix/cybersecurity-layers-explained-defense-in-depth-done-right-97bccd0d92ec) a obchádzanie základnej detekcie. Stretávame sa s:

- **AI-powered útoky** - automatizované škálovateľné kampane
- **Deepfake social engineering** - falošné video hovory s CEO
- **Ransomware-as-a-Service** - kyberzločin ako biznis model
- **Supply chain attacks** - kompromitácia cez dodávateľov
- **Fileless malware** - bezstopové útoky priamo v pamäti
- **Zero-day exploity** - zneužívanie neznámych zraniteľností

Odpoveďou nie je jeden "super nástroj", ale **Defense in Depth** - viacvrstvová obrana, kde každá vrstva kompenzuje slabiny tej predchádzajúcej.

> **Štatistika:** [Organizácie používajúce vrstvovú obranu majú 3,5-krát menej úspešných breachov](https://www.micromindercs.com/blog/defense-in-depth) ako tie s jednou vrstvou bezpečnosti.

---

## 🛠️ Bezplatné Kybernetické Nástroje (Free Tier 2025)

Kvalitná kybernetická bezpečnosť nemusí stáť tisíce eur. Open-source komunita vytvorila nástroje, ktoré konkurujú enterprise riešeniam.

### Network Security & Monitoring

#### 1. **Wireshark** - Deep Packet Inspection
- **Čo robí:** Zachytáva a analyzuje sieťovú komunikáciu v reálnom čase
- **Prečo je top:** Vidiš každý byte prechádzajúci sieťou
- **Use case:** Troubleshooting, detekcia malicious traffic, forenzná analýza
- **Link:** [wireshark.org](https://www.wireshark.org)

```bash
# Príklad: Zachyť HTTP traffic na porte 80
sudo wireshark -i eth0 -f "port 80"
```

#### 2. **Snort / Suricata** - IDS/IPS Systémy
- **Čo robí:** Real-time traffic analysis a packet logging
- **Prečo je top:** Signature-based detekcia + anomaly detection
- **Use case:** Detekcia network attacks, suspicious activities
- **Link:** [snort.org](https://www.snort.org) | [suricata.io](https://suricata.io)

#### 3. **Zeek (Bro)** - Network Security Monitor
- **Čo robí:** Pasívne monitoruje network pre bezpečnostné incidenty
- **Prečo je top:** Vytvára high-level security insights z network traffic
- **Link:** [zeek.org](https://zeek.org)

---

### Vulnerability Scanning & Penetration Testing

#### 4. **Kali Linux 2026.1** - Kompletná Security Distribúcia
- **Čo robí:** 300+ nástrojov pre pentesting a ethical hacking
- **Prečo je top:** Všetko na jednom mieste - od recon až po exploitation
- **Obsahuje:** Metasploit, Nmap, Hydra, Aircrack-ng, Burp Suite Community
- **Link:** [kali.org](https://www.kali.org)

```bash
# Quick network scan
nmap -sV -sC -oA scan_results target.com
```

#### 5. **OWASP ZAP** - Web Application Scanner
- **Čo robí:** Automatizované testovanie webových aplikácií
- **Prečo je top:** Odhaľuje OWASP Top 10 zraniteľnosti
- **Use case:** Spidering, fuzzing, active/passive scanning
- **Link:** [zaproxy.org](https://www.zaproxy.org)

#### 6. **Metasploit Framework** - Exploitation Platform
- **Čo robí:** Penetration testing a vulnerability validation
- **Prečo je top:** Obrovská databáza exploitov a payloadov
- **Link:** [metasploit.com](https://www.metasploit.com)

```bash
# Spustenie Metasploit konzoly
msfconsole
# Vyhľadanie exploitu
search type:exploit platform:windows smb
```

---

### SIEM & Threat Detection

#### 7. **Wazuh** - Open Source XDR Platform
- **Čo robí:** Komplexné threat detection, monitoring a response
- **Prečo je top:** SIEM + EDR + vulnerability detection v jednom
- **Features:** Log analysis, file integrity monitoring, incident response
- **Link:** [wazuh.com](https://wazuh.com)

#### 8. **Splunk Free** - Log Management (limit 500MB/deň)
- **Čo robí:** Real-time data analysis a vizualizácia
- **Prečo je top:** Powerful search a alerting capabilities
- **Link:** [splunk.com](https://www.splunk.com/en_us/download/splunk-enterprise.html)

---

### DevSecOps & Code Security

#### 9. **Snyk** - Open Source Dependency Scanner
- **Čo robí:** Skenuje open-source dependencies a container images
- **Prečo je top:** Odhaľuje known vulnerabilities v third-party balíčkoch
- **Integrácie:** GitHub, GitLab, Docker, Kubernetes
- **Link:** [snyk.io](https://snyk.io)

```bash
# Test projektu na zraniteľnosti
snyk test
# Monitor projektu
snyk monitor
```

#### 10. **Checkov** - Infrastructure as Code Security
- **Čo robí:** Static code analysis pre IaC (Terraform, CloudFormation, Kubernetes)
- **Prečo je top:** Odhalí misconfigurations pred deploymentom
- **Link:** [checkov.io](https://www.checkov.io)

```bash
# Scan Terraform súborov
checkov -d /path/to/terraform
```

#### 11. **DefectDojo** - Vulnerability Management
- **Čo robí:** DevSecOps platform pre tracking a remediation
- **Prečo je top:** Centralizuje výsledky z viacerých security tools
- **Features:** Deduplication, reporting, remediation workflow
- **Link:** [defectdojo.org](https://www.defectdojo.org)

---

### Supply Chain Security

#### 12. **Heisenberg** - Software Supply Chain Health
- **Čo robí:** Analyzuje dependencies pomocí SBOM (Software Bill of Materials)
- **Prečo je top:** Identifikuje risky v supply chain pred incidentom
- **Use case:** Package health scoring, risk detection
- **Link:** [github.com/Checkmarx/heisenberg](https://github.com/Checkmarx/heisenberg)

#### 13. **VulnRisk** - Context-Aware Vulnerability Assessment
- **Čo robí:** Hodnotenie zraniteľností nad rámec CVSS skóre
- **Prečo je top:** Redukuje noise, zvýrazňuje čo naozaj záleží
- **Link:** [github.com/cyal1/VulnRisk](https://github.com/cyal1/VulnRisk)

---

### Endpoint & Malware Protection

#### 14. **ClamAV** - Open Source Antivirus
- **Čo robí:** Detekcia malware, vírusov, trojanov
- **Prečo je top:** Command-line friendly, integrovateľný do automation
- **Link:** [clamav.net](https://www.clamav.net)

```bash
# Scan adresára
clamscan -r /home/user/downloads
# Update databázy
freshclam
```

---

## 🛡️ Vrstvy Obrany (Defense in Depth)

Moderná kybernetická obrana nie je jednorazový firewall. Je to orchestrovaný systém prekrývajúcich sa kontrol. Ak jedna vrstva zlyhá, ďalšie zachytia útok.

> **Štatistika:** [Organizácie s layered security redukujú náklady na breach o 45%](https://www.micromindercs.com/blog/defense-in-depth) oproti perimeter-only obranám.

### 7 Vrstiev Modernej Obrany

```
┌─────────────────────────────────────┐
│   7. ĽUDSKÁ VRSTVA (Human Layer)    │  ← Security awareness
├─────────────────────────────────────┤
│   6. IDENTITA (Identity Layer)      │  ← Zero Trust, MFA
├─────────────────────────────────────┤
│   5. DÁTA (Data Layer)              │  ← Encryption, Backup
├─────────────────────────────────────┤
│   4. APLIKÁCIE (Application Layer)  │  ← WAF, SAST/DAST
├─────────────────────────────────────┤
│   3. ENDPOINTY (Endpoint Layer)     │  ← EDR, Antimalware
├─────────────────────────────────────┤
│   2. SIEŤ (Network Layer)           │  ← Firewall, IDS/IPS
├─────────────────────────────────────┤
│   1. FYZICKÁ (Physical Layer)       │  ← Datacenter access
└─────────────────────────────────────┘
```

---

### Vrstva 1: Fyzická bezpečnosť (Physical Layer)

**Čo chráni:** Fyzický prístup k hardware, serverovniam, datacentrám

**Kontroly:**
- Biometrické systémy (fingerprint, iris scan)
- Prístupové karty a badge readers
- Security guards, CCTV monitoring
- Locked server racks, cable locks

**Prečo záleží:** Fyzický prístup = game over. Útočník pri konzole obchádza všetko.

---

### Vrstva 2: Sieťová bezpečnosť (Network Layer)

**Čo chráni:** Sieťový traffic medzi systémami a z/do internetu

**Kontroly:**
- **Firewally** - kontrolujú prichádzajúcu/odchádzajúcu komunikáciu
- **IDS/IPS** - Snort, Suricata pre detekciu a blokovanie útokov
- **Network Segmentation** - VLAN, DMZ, micro-segmentation
- **VPN** - šifrované vzdialené pripojenia
- **Network Monitoring** - Wireshark, Zeek pre traffic analysis

**Best practices:**
```bash
# Príklad: UFW firewall konfigurácia
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 443/tcp
sudo ufw enable
```

**Nástroje:**
- pfSense, OPNsense (firewall distribúcie)
- Snort, Suricata (IDS/IPS)
- Wireshark, tcpdump (packet analysis)

---

### Vrstva 3: Koncové zariadenia (Endpoint Layer)

**Čo chráni:** Laptopy, desktopy, servery, mobile devices

**Kontroly:**
- **EDR (Endpoint Detection & Response)** - real-time monitoring
- **Antimalware s AI detekciou** - behaviorálna analýza
- **Host-based Firewall** - kontrola na úrovni zariadenia
- **Device encryption** - full disk encryption (LUKS, BitLocker)
- **Patch management** - pravidelné updates

**Nástroje:**
- Wazuh Agent (EDR capabilities)
- ClamAV (antivirus)
- OSSEC (host intrusion detection)
- Fail2ban (brute-force protection)

**Prečo záleží:** [62% nových nasadení odhalí minimálne jednu latentnú hrozbu](https://arcticwolf.com/resources/glossary/defense-in-depth), ktorú existujúce bezpečnostné opatrenia nezachytili.

---

### Vrstva 4: Aplikačná bezpečnosť (Application Layer)

**Čo chráni:** Webové aplikácie, API, custom software

**Kontroly:**
- **WAF (Web Application Firewall)** - ochrana pred OWASP Top 10
- **SAST** (Static Application Security Testing) - analýza source code
- **DAST** (Dynamic Application Security Testing) - runtime testing
- **API Security** - rate limiting, authentication, input validation
- **Dependency scanning** - Snyk, OWASP Dependency-Check

**Nástroje:**
- OWASP ZAP (web app scanner)
- ModSecurity (open-source WAF)
- SonarQube (SAST)
- Snyk, Dependabot (dependency scanning)

**Príklad WAF rule:**
```nginx
# ModSecurity rule - block SQL injection
SecRule ARGS "@detectSQLi" \
    "id:1001,phase:2,block,log,msg:'SQL Injection attempt detected'"
```

---

### Vrstva 5: Dátová bezpečnosť (Data Layer)

**Čo chráni:** Samotné dáta - najcennejší asset organizácie

**Kontroly:**

#### 🔐 Šifrovanie (Encryption)
- **At rest** - šifrovanie diskov (LUKS, dm-crypt, BitLocker)
- **In transit** - TLS/SSL pre sieťovú komunikáciu
- **End-to-end** - šifrovanie pred odoslaním

```bash
# LUKS disk encryption
sudo cryptsetup luksFormat /dev/sdb
sudo cryptsetup open /dev/sdb encrypted_disk
```

#### 💾 ZÁLOHOVANIE - Kľúčová ochrana pred Ransomware

> **Kritické:** V roku 2025 [viac ako 56% ransomware útokov použilo PowerShell](https://www.blackfog.com/layered-security-a-defense-in-depth-approach/). Jediná efektívna obrana? Izolovované zálohy.

**3-2-1 Pravidlo zálohovania:**
- **3 kópie** dát (produkčné + 2 zálohy)
- **2 rôzne médiá** (napr. disk + cloud)
- **1 off-site** kópia (mimo dosahu ransomware)

**Top Open-Source Zálohovacie Nástroje:**

##### **Restic** - Moderné, rýchle zálohovanie
```bash
# Inicializácia repository
restic init -r /backup/repo

# Zálohovanie
restic -r /backup/repo backup /home/user/documents

# Kontrola integrity
restic -r /backup/repo check

# Restore
restic -r /backup/repo restore latest --target /restore/path
```
- **Features:** Deduplikácia, šifrovanie, incremental backups
- **Link:** [restic.net](https://restic.net)

##### **BorgBackup** - Deduplikujúce šifrované zálohy
```bash
# Vytvorenie repository
borg init --encryption=repokey /path/to/repo

# Backup
borg create /path/to/repo::archive-name /home/user

# List archives
borg list /path/to/repo

# Restore
borg extract /path/to/repo::archive-name
```
- **Features:** Komprimácia, šifrovanie, deduplikácia na úrovni chunkov
- **Link:** [borgbackup.org](https://www.borgbackup.org)

##### **Duplicati** - Cloud-ready s GUI
- **Features:** Zálohy do cloud (AWS S3, Google Drive, OneDrive, Dropbox)
- **Šifrovanie:** AES-256 pred uploadom
- **Scheduling:** Automatické inkrementálne zálohy
- **Link:** [duplicati.com](https://www.duplicati.com)

##### **UrBackup** - Client/Server pre Enterprise
- **Features:** Image backups celých systémov, file backups
- **Use case:** Centralizované zálohovanie viacerých workstations
- **Link:** [urbackup.org](https://www.urbackup.org)

##### **Bacula** - Enterprise-grade Backup System
- **Features:** Komplexný backup, restore a verify pre datacentrá
- **Architektúra:** Director, Storage Daemon, File Daemon
- **Link:** [bacula.org](https://www.bacula.org)

**Zálohovacia stratégia:**
```yaml
Daily:
  - Incremental backups (zmeny od posledného full)
  - Retention: 7 dní

Weekly:
  - Differential backups (zmeny od posledného full)
  - Retention: 4 týždne

Monthly:
  - Full backups
  - Retention: 12 mesiacov

Yearly:
  - Archive backups
  - Retention: 7 rokov (compliance)
```

#### 🔍 Data Loss Prevention (DLP)
- Monitoring citlivých dát
- Blokovanie neoprávneného exportu

**Best practices:**
- Pravidelné testovanie restore procedúr
- Air-gapped backup kópie (offline, mimo dosahu malware)
- Immutable backups (nelze prepísať ani delete)

---

### Vrstva 6: Identita a prístup (Identity Layer)

**Čo chráni:** Používateľské identity a autentizáciu

#### Zero Trust Architecture
**Princíp:** "Never trust, always verify" - nedôveruj nikomu defaultne, ani internal users

```
Traditional:           Zero Trust:
┌─────────────┐       ┌─────────────┐
│   Trusted   │       │   Verify    │
│   Internal  │  →    │   Every     │
│   Network   │       │   Request   │
└─────────────┘       └─────────────┘
```

**Kontroly:**
- **Multi-Factor Authentication (MFA)** - viac ako len heslo
  - TOTP (Time-based One-Time Password) - Google Authenticator, Authy
  - Hardware tokens - YubiKey, Titan Security Key
  - Biometrika - fingerprint, face recognition
  
- **Single Sign-On (SSO)** - centralizovaná autentizácia
  - SAML, OAuth 2.0, OpenID Connect
  - Tools: Keycloak, Authelia, Authentik

- **Privileged Access Management (PAM)** - kontrola admin prístupov
  - Just-in-time access
  - Session recording
  - Password vaulting

- **Identity Governance** - kto má prístup kam
  - Regular access reviews
  - Least privilege principle
  - Role-based access control (RBAC)

**Open-source nástroje:**
- **Keycloak** - IAM a SSO platforma [keycloak.org](https://www.keycloak.org)
- **Authelia** - authentication a authorization server [authelia.com](https://www.authelia.com)
- **Vault** - secrets management od HashiCorp [vaultproject.io](https://www.vaultproject.io)

```bash
# Príklad: Konfigurácia MFA pre SSH
# V /etc/ssh/sshd_config
AuthenticationMethods publickey,keyboard-interactive
```

---

### Vrstva 7: Ľudská vrstva (Human Layer)

**Čo chráni:** Proti najslabšiemu článku - ľudskej chybe

> **Fakt:** Väčšina úspešných útokov začína social engineeringom alebo phishingom.

**Kontroly:**
- **Security Awareness Training** - pravidelné školenia
  - Rozpoznávanie phishingu
  - Bezpečné heslovanie
  - Hlásenie incidentov
  
- **Phishing simulácie** - testovanie zamestnancov
  - Tools: Gophish (open-source phishing framework)
  
- **Security policies** - jasné pravidlá správania
  - Acceptable Use Policy
  - Incident Response Policy
  - Clean desk policy

- **Kultúra bezpečnosti** - security ako súčasť DNA
  - "See something, say something"
  - Reward reporting
  - No blame culture pre chyby

**Príklad phishing simulácie (Gophish):**
```bash
# Inštalácia Gophish
wget https://github.com/gophish/gophish/releases/latest
tar -xzf gophish*.tar.gz
./gophish
# Navigate to https://localhost:3333
```

**Best practices:**
- [Pravidelne audituj svoje vrstvy - chybné konfigurácie často vytvárajú slabé miesta](https://medium.com/infosecmatrix/cybersecurity-layers-explained-defense-in-depth-done-right-97bccd0d92ec)
- Train your team - ľudská chyba je stále #1 vstupný bod
- Simuluj útoky pomocou red teaming

---

## 🤖 AI a Automatizácia v Bezpečnosti

Rok 2026 je o boji AI proti AI. Útočníci používajú machine learning, ty tiež musíš.

### SIEM s AI/ML Capabilities

**Wazuh XDR Platform:**
- Machine learning pre anomaly detection
- Automatic correlation pravidiel
- Threat intelligence integration

**Splunk Enterprise Security:**
- Behavioral analytics
- Risk-based alerting
- ML-powered threat detection

### SOAR (Security Orchestration, Automation & Response)

**Shuffle** - Open-source SOAR [shuffler.io](https://shuffler.io)
- Workflow automation
- Integration s viac ako 200 security tools
- Playbooks pre incident response

**TheHive** - Incident Response Platform [thehive-project.org](https://thehive-project.org)
- Case management
- Observable analysis
- Integration s MISP, Cortex

### Behaviorálna Analýza

Machine learning odhaľuje anomálie v správaní:
- Nezvyčajné login times
- Abnormálny data transfer volume
- Lateral movement patterns
- Privilege escalation attempts

---

## 🎯 Praktické Scenáre Útokov

### Scenár 1: Ransomware Útok

**Útočný vektor:**
1. Phishing email s malicious attachment
2. User otvorí, payload sa executes
3. Malware začne šifrovať súbory
4. Lateral movement do network shares
5. Požiadavka na výkupné v BTC

**Ako Defense in Depth zastaví útok:**

```
Vrstva 7 (Human):    🛑 Security training - user reportne suspicious email
                     ↓ (Ak prejde)
Vrstva 3 (Endpoint): 🛑 EDR zachytí abnormal file encryption activity
                     ↓ (Ak prejde)
Vrstva 2 (Network):  🛑 IDS detekuje communication s C&C server
                     ↓ (Ak prejde)
Vrstva 5 (Data):     🛑 Immutable backups umožnia recovery
                     💾 3-2-1 zálohy - restore bez platenia
```

**Výsledok:** Útok zastavený na viacerých úrovniach. Aj keby sa dostal k dátam, zálohy zachránia situáciu.

### Scenár 2: Supply Chain Attack

**Útočný vektor:**
1. Kompromitácia npm package
2. Malicious code v dependency
3. Pull do produkcie pri `npm install`
4. Exfiltrácia secrets/ENV variables

**Obrana:**
```
DevSecOps Tools:
  Snyk           → 🛑 Detekuje known vulnerabilities v packages
  Checkov        → 🛑 IaC misconfigurations
  Heisenberg     → 🛑 SBOM analýza - identifikuje supply chain risk
  DefectDojo     → 📊 Centralizované tracking a remediation
```

### Scenár 3: Phishing Kampaň

**Útočný vektor:**
1. Spear-phishing s deepfake CEO voice message
2. Link na fake login page
3. Credential harvesting
4. Lateral movement s ukradnutými credentials

**Obrana:**
```
Vrstva 7 (Human):    Training + phishing simulácie
                     ↓
Vrstva 6 (Identity): 🛑 MFA - ukradnuté heslo nestačí
                     🛑 Impossible travel detection
                     🛑 Device fingerprinting
```

---

## 📚 Rámce a Štandardy

### NIST Cybersecurity Framework
- **Identify** - asset management, risk assessment
- **Protect** - access control, data security
- **Detect** - anomaly detection, continuous monitoring
- **Respond** - incident response planning
- **Recover** - backup a disaster recovery

🔗 [nist.gov/cyberframework](https://www.nist.gov/cyberframework)

### CISA Free Cybersecurity Services
US Government poskytuje bezplatné security nástroje a služby:
- Vulnerability scanning
- Phishing campaign assessment
- Risk and vulnerability assessments

🔗 [cisa.gov/free-cybersecurity-services](https://www.cisa.gov/resources-tools/resources/free-cybersecurity-services-and-tools)

### OWASP Top 10
Must-know webové zraniteľnosti:
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software & Data Integrity Failures
9. Security Logging Failures
10. Server-Side Request Forgery

🔗 [owasp.org/Top10](https://owasp.org/www-project-top-ten/)

---

## ✅ Praktické Implementačné Tipy

### 1. Začni s Inventory
```bash
# Čo všetko máš?
- Assets (servers, workstations, IoT)
- Data (kde sú citlivé dáta?)
- Users (kto má aké prístupy?)
- Applications (čo beží v produkcii?)
```

### 2. Risk Assessment
- Identifikuj crown jewels (najcennejšie assety)
- Threat modeling - čo sa môže pokaziť?
- Vulnerability scanning - kde sú slabiny?

### 3. Implementuj Layer-by-Layer
```
Sprint 1: Basic hygiene
  - Patch management
  - Basic firewall
  - Antivirus

Sprint 2: Identity controls
  - MFA enforcement
  - Password policy
  - SSO implementation

Sprint 3: Detection & Response
  - SIEM deployment (Wazuh)
  - Log aggregation
  - Alerting rules

Sprint 4: Advanced controls
  - EDR rollout
  - Network segmentation
  - Backup testing
```

### 4. Continuous Improvement
- **Quartly** security assessments
- **Monthly** vulnerability scans
- **Weekly** patch cycles
- **Daily** log review

### 5. Test, Test, Test
```bash
# Red Team exercises
- Penetration testing
- Social engineering tests
- Disaster recovery drills

# Blue Team validation
- Backup restore tests
- Incident response tabletops
- Alert tuning
```

---

## 🚨 Red Flags - Čo Opraviť Okamžite

### Critical Issues:
- ❌ **No MFA** - okamžite zapni multi-factor authentication
- ❌ **No backups** - jeden ransomware a si finished
- ❌ **Unpatched systems** - known vulnerabilities sú low-hanging fruit
- ❌ **No monitoring** - ak nevidíš incident, nevieš reagovať
- ❌ **Shared admin passwords** - receptúra na katastrofu

### Quick Wins:
- ✅ Zapni automatic updates
- ✅ Deploy Wazuh agent na kritické servery
- ✅ Nastav UFW firewall s default deny
- ✅ Implementuj Restic backups s 3-2-1 stratégiou
- ✅ Force MFA pre všetky admin účty

---

## 📊 Zhrnutie: Checklist

### Network Layer
- [ ] Firewall s default deny policy
- [ ] IDS/IPS nasadené (Snort/Suricata)
- [ ] Network segmentation (VLANs)
- [ ] VPN pre remote access
- [ ] Regular port scans

### Endpoint Layer
- [ ] EDR agent na všetkých zariadeniach
- [ ] Antivirus s real-time protection
- [ ] Full disk encryption
- [ ] Host-based firewall
- [ ] Auto-patching enabled

### Application Layer
- [ ] WAF pre web applications
- [ ] SAST/DAST v CI/CD pipeline
- [ ] Dependency scanning (Snyk)
- [ ] API authentication
- [ ] Input validation

### Data Layer
- [ ] Encryption at rest
- [ ] TLS/SSL pre transit
- [ ] 3-2-1 backup stratégia
- [ ] Regular restore testing
- [ ] Immutable/air-gapped backups

### Identity Layer
- [ ] MFA na všetky účty
- [ ] SSO implementované
- [ ] Password policy (min 12 chars, complexity)
- [ ] Regular access reviews
- [ ] Privileged access monitoring

### Human Layer
- [ ] Quarterly security training
- [ ] Phishing simulácie
- [ ] Incident reporting process
- [ ] Security policies documented
- [ ] Security champions program

### Detection & Response
- [ ] SIEM deployed (Wazuh)
- [ ] Log retention 90+ dní
- [ ] Incident response playbooks
- [ ] 24/7 monitoring (or outsourced SOC)
- [ ] Regular threat hunting

---

## 🎓 Ďalšie Zdroje

### Online Kurzy
- **TryHackMe** - hands-on cybersecurity training [tryhackme.com](https://tryhackme.com)
- **HackTheBox** - penetration testing labs [hackthebox.com](https://www.hackthebox.com)
- **SANS Cyber Aces** - free tutorials [cyberaces.org](https://www.cyberaces.org)

### Certifikácie (Worth It)
- **CEH** (Certified Ethical Hacker)
- **OSCP** (Offensive Security Certified Professional)
- **CISSP** (Certified Information Systems Security Professional)
- **Security+** (CompTIA)

### Komunity
- **r/netsec** - Reddit community
- **OWASP Slack** - web application security
- **Blue Team Labs** - defensive security [blueteamlabs.online](https://blueteamlabs.online)

### Blogs & News
- **Krebs on Security** - [krebsonsecurity.com](https://krebsonsecurity.com)
- **Schneier on Security** - [schneier.com](https://www.schneier.com)
- **The Hacker News** - [thehackernews.com](https://thehackernews.com)

---

## 💭 Finálne Myšlienky

Kybernetická bezpečnosť nie je sprint, je to maratón. Nie je to produkt, je to proces. Nie je to IT problém, je to business risk.

**Kľúčové takeaways:**

1. **Žiadny single point of defense nestačí** - vrstvená obrana je must
2. **Free ≠ Weak** - open-source nástroje sú enterprise-ready
3. **Zálohy sú poistka** - 3-2-1 pravidlo ti zachráni život pri ransomware
4. **Zero Trust je nová norma** - never trust, always verify
5. **Ľudia sú vrstva #1** - investuj do trainingu
6. **Continuous improvement** - threat landscape sa vyvíja, ty tiež musíš

> "Security is a journey, not a destination. The threats evolve, your defenses must too."

**Next steps:**
1. Sprav inventory svojich assets
2. Implementuj MFA všade
3. Nastav monitoring (Wazuh je good start)
4. Otestuj svoje zálohy
5. Train your team

Stay paranoid. Stay updated. Stay secure. 🔒

---

**Pôvodná publikácia:** 11. februára 2026  
**Posledná aktualizácia:** 11. februára 2026  
**Autor:** IT profesionál, cyber security enthusiast

**Tags:** #cybersecurity #defense-in-depth #free-tools #open-source #security-layers #zero-trust #ransomware #backup #wazuh #kali-linux

---

## 📖 Referencie

1. [Medium - Cybersecurity Layers Explained](https://medium.com/infosecmatrix/cybersecurity-layers-explained-defense-in-depth-done-right-97bccd0d92ec)
2. [Microminder - Defense in Depth](https://www.micromindercs.com/blog/defense-in-depth)
3. [Arctic Wolf - Defense in Depth Guide](https://arcticwolf.com/resources/glossary/defense-in-depth/)
4. [BlackFog - Layered Security Approach](https://www.blackfog.com/layered-security-a-defense-in-depth-approach/)
5. [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
6. [CISA Free Cybersecurity Services](https://www.cisa.gov/resources-tools/resources/free-cybersecurity-services-and-tools)
7. [OWASP Top 10](https://owasp.org/www-project-top-ten/)
8. [Techwrix - Top 15 Open Source Cyber Security Tools](https://www.techwrix.com/top-15-essential-open-source-cyber-security-tools-for-2025/)
9. [Help Net Security - October 2025 Tools](https://www.helpnetsecurity.com/2025/10/30/hottest-cybersecurity-open-source-tools-of-the-month-october-2025/)
10. [Help Net Security - November 2025 Tools](https://www.helpnetsecurity.com/2025/11/27/hottest-cybersecurity-open-source-tools-of-the-month-november-2025/)
