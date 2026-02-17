---
title: 'Ubuntu Upgrade z End-of-Life Verzií'
excerpt: 'Komplexný návod na upgrade Ubuntu distribúcií, ktoré už nie sú oficiálne supportované. Od EOL verzií až po aktuálne supportované releasy.'
date: '2022-09-05'
readTime: '8 min'
tags: ['linux', 'ubuntu', 'sysadmin', 'howto']
---
Tento text vychádza z oficiálneho návodu Ubuntu: https://help.ubuntu.com/community/EOLUpgrades

## Časť 0: Je moja distro End Of Life?

Zisti inštalovanú ditribúciu:

```bash
# cat /etc/os-release
```

Overenie stavu konkrétnej distro:

https://wiki.ubuntu.com/Releases
https://ubuntu.com/about/release-cycle

podstatné je označenie "End of Life".

Detailný postup upgrade Ubuntu distribúcie, ktorá už nie je supportovaná (end-of-life), na aktuálnu verziu.

## Časť I: Upgrade z EOL na EOL Distro (pokiaľ je potrebné prejsť cez viacero EOL distros)

### Príprava

Oprav PPA repozitáre:

Uprav /etc/apt/sources.list.d 
```bash
# update-manager - uncheck every ppa
```

Stiahni upgrade balík pre tvoju distro (napr. `zesty.tar.gz`) a over autenticitu cez GPG súbory.

```bash
# curl https://old-releases.ubuntu.com/releases/*distroname*

```

### Modifikácia Upgrade Skriptov

Rozbaľ archív a uprav nasledujúce súbory:

**DistUpgradeController.py:**
```python
# vi ./DistUpgradeController.py
# Zmeň všetky "archive.ubuntu.com" => "old-releases.ubuntu.com"
# Zmeň všetky "security.ubuntu.com" => "old-releases.ubuntu.com"
```

**mirrors.cfg:**
```bash
# vi ./mirrors.cfg
# Pridaj "ubuntu/" za každé "old-releases.ubuntu.com/"
```

**/etc/apt/sources.list:**
```bash
# vi /etc/apt/sources.list
# Zmeň všetky "*.archive.ubuntu.com" => "old-releases.ubuntu.com"
# Zmeň všetky "security.ubuntu.com" => "old-releases.ubuntu.com"
```

### Upgrade Proces

```bash
apt-get update
apt-get upgrade
apt-get dist-upgrade
./zesty --mode=server --frontend=DistUpgradeViewText
reboot
apt-get update  # Môžu sa vyskytnúť problémy - pokračuj ďalej
```

### Cleanup Duplikátov

Vymaž duplikáty v `/etc/apt/sources.list`, potom:

```bash
apt-get update
apt-get upgrade
apt-get dist-upgrade
apt-get autoremove
apt-get autoclean
reboot
```

## Časť II: Upgrade z EOL na Supportovanú Verziu

Keď máš najnovšiu EOL verziu, môžeš upgradovať na aktuálne supportovaný release:

```bash
do-release-upgrade
reboot
apt-get update
apt-get upgrade
apt-get dist-upgrade
apt-get autoremove
apt-get autoclean
reboot
```

## Dôležité Poznámky

⚠️ **Backup:** Pred upgrade procesom vždy vytvor kompletný backup systému

⚠️ **Testing:** Odskúšaj proces najprv na testovacom prostredí

⚠️ **Downtime:** Počítaj s dlhším downtimom, proces môže trvať hodiny

## Zdroje

- [Ubuntu Old Releases](https://old-releases.ubuntu.com/)
- [Ubuntu Release Upgrade Guide](https://help.ubuntu.com/community/EOLUpgrades)
