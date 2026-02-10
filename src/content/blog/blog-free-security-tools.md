---
title: 'Free Cyber Security Tools a Vrstvy Obrany'
excerpt: 'Komplexný zoznam bezplatných cyber security nástrojov organizovaných podľa vrstiev obrany. Od DLP cez firewall až po monitoring - všetko zadarmo.'
date: '2020-05-04'
readTime: '5 min'
tags: ['cybersecurity', 'tools', 'opensource', 'defense-in-depth']
---

Bezplatné nástroje pre kybernetickú bezpečnosť organizované podľa vrstiev Defense-in-Depth modelu.

## Úvod

Kybernetická bezpečnosť nemusí byť drahá. Existuje množstvo kvalitných open-source a free nástrojov, ktoré poskytujú enterprise-level ochranu.

Tento článok mapuje free security tools podľa vrstiev bezpečnostného modelu.

## Zdroj

Kompletný zoznam a detaily nájdeš na Peerlyst:

[The Free Cyber Security Layers](https://www.peerlyst.com/posts/the-free-cyber-security-layers-john-k-1)

## Vrstvy Bezpečnosti (Layers of Security)

### 1. Data Security

**DLP (Data Loss Prevention):**
- [OpenDLP](https://github.com/ezaspy/OpenDLP) - Open source DLP agent-less, centralized
- [MyDLP](https://www.mydlp.com/) - Data Loss Prevention

**Encryption:**
- [VeraCrypt](https://www.veracrypt.fr/) - Disk encryption
- [GnuPG](https://gnupg.org/) - Email a file encryption
- [Cryptomator](https://cryptomator.org/) - Cloud storage encryption

### 2. Application Security

**Web Application Firewall (WAF):**
- [ModSecurity](https://www.modsecurity.org/) - Open source WAF
- [NAXSI](https://github.com/nbs-system/naxsi) - Nginx WAF

**SAST (Static Analysis):**
- [SonarQube](https://www.sonarqube.org/) - Code quality a security
- [Bandit](https://github.com/PyCQA/bandit) - Python security linter

### 3. Endpoint Security

**Antivirus/EDR:**
- [ClamAV](https://www.clamav.net/) - Open source antivirus
- [Wazuh](https://wazuh.com/) - Host-based intrusion detection

**Host Firewall:**
- [UFW](https://help.ubuntu.com/community/UFW) - Uncomplicated Firewall (Linux)
- Windows Firewall (built-in)

### 4. Network Security

**Firewall/IDS:**
- [pfSense](https://www.pfsense.org/) - Open source firewall
- [Suricata](https://suricata.io/) - IDS/IPS engine
- [Snort](https://www.snort.org/) - Network intrusion detection

**VPN:**
- [OpenVPN](https://openvpn.net/) - VPN riešenie
- [WireGuard](https://www.wireguard.com/) - Modern VPN protocol

### 5. Identity & Access Management

**Authentication:**
- [FreeIPA](https://www.freeipa.org/) - Identity management
- [Keycloak](https://www.keycloak.org/) - SSO a identity management
- [Authelia](https://www.authelia.com/) - 2FA a SSO

**Password Management:**
- [Bitwarden](https://bitwarden.com/) - Password manager (self-hosted free)
- [KeePass](https://keepass.info/) - Offline password database

### 6. Security Monitoring

**SIEM:**
- [Wazuh](https://wazuh.com/) - SIEM a XDR platform
- [ELK Stack](https://www.elastic.co/elastic-stack) - Log management
- [Graylog](https://www.graylog.org/) - Log management

**Vulnerability Scanning:**
- [OpenVAS](https://www.openvas.org/) - Vulnerability scanner
- [Nmap](https://nmap.org/) - Network discovery a auditing
- [OWASP ZAP](https://www.zaproxy.org/) - Web app security scanner

### 7. Incident Response

**Forensics:**
- [Autopsy](https://www.autopsy.com/) - Digital forensics platform
- [Volatility](https://www.volatilityfoundation.org/) - Memory forensics

**Threat Intelligence:**
- [MISP](https://www.misp-project.org/) - Threat intelligence platform
- [TheHive](https://thehive-project.org/) - Incident response platform

## Implementácia

### Defense in Depth

Použi viacero vrstiev:
1. Perimeter (firewall, IDS)
2. Network (segmentation, monitoring)
3. Endpoint (AV, EDR, hardening)
4. Application (WAF, secure coding)
5. Data (encryption, DLP)

### Začni Tu

Pre malé organizácie začni s:
- ✅ pfSense firewall
- ✅ Wazuh SIEM + EDR
- ✅ OpenVAS vulnerability scanning
- ✅ ClamAV antivirus
- ✅ Bitwarden password manager

## Poznámky

⚠️ **Free ≠ Easy:** Implementácia vyžaduje technické znalosti  
⚠️ **Support:** Community support, nie enterprise SLA  
⚠️ **Testing:** Vždy testuj v lab prostredí prvé

## Zdroje

- [Peerlyst: Free Cyber Security Layers](https://www.peerlyst.com/posts/the-free-cyber-security-layers-john-k-1)
- [Awesome Security](https://github.com/sbilly/awesome-security)
- [OWASP Projects](https://owasp.org/projects/)
