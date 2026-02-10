---
title: 'SIGRed: Kritická Zraniteľnosť v Windows DNS'
excerpt: 'CVE-2020-1350 je wormable kritická zraniteľnosť s CVSS 10.0 vo Windows DNS serveri. Postihuje Windows Server 2003-2019 a umožňuje získať Domain Admin práva.'
date: '2020-07-14'
readTime: '4 min'
tags: ['cybersecurity', 'vulnerability', 'windows', 'dns', 'cve']
---

SIGRed (CVE-2020-1350) je jedna z najkritickejších zraniteľností v histórii Windows serverov.

## Základné Informácie

**CVE-2020-1350** je wormable, kritická zraniteľnosť s **CVSS base score 10.0** (maximálne kritická) vo Windows DNS serveri.

### Postihnuté Verzie

Zraniteľnosť postihuje všetky Windows Server verzie:
- Windows Server 2003
- Windows Server 2008
- Windows Server 2012
- Windows Server 2016
- Windows Server 2019

## Dopad Zraniteľnosti

### Mechanizmus Útoku

Zraniteľnosť môže byť spustená **malicious DNS response** (odpoveďou). Útočník nemusí mať priamy prístup k serveru.

### Privileges

Keďže DNS služba beží s **SYSTEM privilégiami**, úspešný exploit poskytuje útočníkovi:

✅ **Domain Administrator práva**  
✅ **Kompletný control nad doménou**  
✅ **Kompromitácia celej corporate infraštruktúry**

### Wormable

Zraniteľnosť je **wormable**, čo znamená že sa môže šíriť automaticky medzi servermi bez ľudskej interakcie - podobne ako WannaCry alebo NotPetya.

## Technické Detaily

Detailný technický rozbor od Check Point Research:

[Resolving Your Way Into Domain Admin: Exploiting a 17-Year-Old Bug in Windows DNS Servers](https://research.checkpoint.com/2020/resolving-your-way-into-domain-admin:-exploiting-a-17-year-old-bug-in-windows-dns-servers/)

Check Point výskumníci objavili 17-ročný bug v spracovaní DNS SIG resource records.

## Ochrana a Mitigation

### Okamžité Kroky

1. **Patch immediately:** Inštaluj Microsoft security update
2. **Registry workaround:** Ak nemôžeš patchovať, použi registry fix
3. **Monitor DNS traffic:** Sleduj nezvyčajnú DNS aktivitu
4. **Segment network:** Izoluj kritické DNS servery

### Microsoft Patch

Microsoft vydal patch v July 2020 Patch Tuesday. **Okamžitá inštalácia je kritická.**

### Registry Workaround

Ak nemôžeš okamžite patchovať, nastav:
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\DNS\Parameters
TcpReceivePacketSize = 0xFF00 (DWORD)
```

## Dôležité Poznámky

⚠️ **Critical Priority:** CVSS 10.0 znamená maximálnu prioritu  
⚠️ **No User Interaction:** Exploit nevyžaduje user akciu  
⚠️ **Remote Exploitation:** Útok možný cez sieť  
⚠️ **Wormable:** Možnosť automatického šírenia

## Zdroje

- [Microsoft Security Advisory](https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2020-1350)
- [Check Point Research](https://research.checkpoint.com/2020/resolving-your-way-into-domain-admin:-exploiting-a-17-year-old-bug-in-windows-dns-servers/)
- [NIST CVE Database](https://nvd.nist.gov/vuln/detail/CVE-2020-1350)
