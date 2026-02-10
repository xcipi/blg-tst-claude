---
title: 'PowerShell a VMware PowerCLI na Linuxe'
excerpt: 'Návod na inštaláciu Microsoft PowerShell CLI v7 a VMware PowerCLI tools na Ubuntu/Linux. Rýchly setup pre VMware administrátorov na Linux platforme.'
date: '2020-05-04'
readTime: '3 min'
tags: ['vmware', 'powershell', 'linux', 'powercli', 'automation']
---

Krátky How-To na inštaláciu Microsoft PowerShell CLI v7.0.0 a VMware.PowerCLI tools na Linux (Ubuntu).

## Príprava: Proxy Settings

Ak pracuješ za corporate proxy, nastav environment variables:

```bash
export http_proxy=http://your.pro.xy:xyzw/
export https_proxy=http://your.pro.xy:xyzw/
```

## Inštalácia PowerShell

PowerShell na Linuxe inštalujeme cez Snap:

```bash
sudo snap install powershell --classic
```

Snap balík obsahuje najnovšiu stabilnú verziu PowerShell pre Linux.

### Verifikácia

Spusti PowerShell:
```bash
pwsh
```

Mali by si vidieť PowerShell prompt:
```
PowerShell 7.0.0
Copyright (c) Microsoft Corporation. All rights reserved.

PS /home/user>
```

## Inštalácia VMware PowerCLI

V PowerShell prostredí nainštaluj PowerCLI module:

### Vyhľadanie Modulu

```powershell
Find-Module -Name VMware.PowerCLI
```

Output ukáže dostupné verzie a metadata PowerCLI modulu.

### Inštalácia

```powershell
Install-Module -Name VMware.PowerCLI
```

PowerShell ti môže položiť otázky:
- **Untrusted repository:** Potvr ď inštaláciu z PSGallery
- **NuGet provider:** Potvrd inštaláciu NuGet providera ak je potrebné

### Verifikácia

Zoznam nainštalovaných modulov:
```powershell
Get-Module -ListAvailable VMware*
```

## Prvé Použitie

### Pripojenie na vCenter

```powershell
Connect-VIServer -Server vcenter.domain.com
```

### Základné Príkazy

Zoznam VM:
```powershell
Get-VM
```

Zoznam ESXi hostov:
```powershell
Get-VMHost
```

Informácie o datastore:
```powershell
Get-Datastore
```

## Užitočné Tipy

### Ignorovanie SSL Certifikátov

Pre lab prostredie (nie produkciu!):
```powershell
Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Confirm:$false
```

### Uloženie Credentials

```powershell
$cred = Get-Credential
Connect-VIServer -Server vcenter.domain.com -Credential $cred
```

### PowerCLI Configuration

Zoznam aktuálnej konfigurácie:
```powershell
Get-PowerCLIConfiguration
```

## Hotovo!

Máš funkčný PowerShell s VMware PowerCLI na Linuxe. Môžeš začať automatizovať vSphere infraštruktúru pomocou PowerShell skriptov.

## Zdroje

- [PowerShell on Linux](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux)
- [VMware PowerCLI Documentation](https://developer.vmware.com/powercli)
- [PowerCLI Examples](https://www.vmware.com/support/developer/PowerCLI/)
