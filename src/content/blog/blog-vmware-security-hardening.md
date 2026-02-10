---
title: 'VMware Security Hardening Guides'
excerpt: 'Oficiálne VMware security hardening guides pre vSphere, NSX a ďalšie produkty. Prescriptive guidance pre secure deployment a operations VMware infraštruktúry.'
date: '2020-04-27'
readTime: '5 min'
tags: ['vmware', 'security', 'hardening', 'vsphere', 'compliance']
---

Komplexný prehľad VMware Security Hardening Guides - oficiálnej dokumentácie pre bezpečné nasadenie VMware produktov.

## Úvod

Security Hardening Guides poskytujú prescriptive guidance pre zákazníkov ako nasadiť a prevádzkovať VMware produkty bezpečným způsobom.

[VMware Security Hardening Guides](https://www.vmware.com/security/hardening-guides.html)

## Formát a Obsah

### vSphere Guides

Guides pre vSphere sú poskytované v **spreadsheet formáte** (.xlsx) s:

- **Rich metadata** pre klasifikáciu guidelines
- **Risk assessment** metriky
- **Script examples** pre security automation
- **Comparison documents** medzi verziami

### Ostatné Produkty

Guides pre ostatné produkty v PDF alebo online formáte podľa produktu.

## vSphere Security Configuration Guides

### vSphere 6.7 Update 1

Najnovšia verzia pre vSphere 6.7:

[vSphere 6.7 Update 1 Security Configuration Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/files/xls/vsphere-6.7-update-1-security-configuration-guide.xlsx)

**Obsah:**
- ESXi host hardening
- vCenter hardening
- VM security settings
- Network security
- Storage security

### vSphere 6.5 Update 1

Pre staršie prostredia:

[vSphere 6.5 Update 1 Security Configuration Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/files/xls/vmware-6-5-update-1-security-configuration-guide.xlsx)

### vSphere 6.5 GA

[vSphere 6.5 Security Configuration Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/files/xls/vmware-6.5-security-configuration-guide-ga-13-apr-17.xlsx)

### vSphere 6.0

Legacy verzia:

[vSphere 6.0 Security Hardening Guide](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/files/xls/vSphere_6_0_Hardening_Guide_GA_15_Jun_2015.xls)

## NSX Security Guide

### NSX Security Configuration Guide

[NSX Security Configuration Guide](https://communities.vmware.com/docs/DOC-37726)

**Pokrýva:**
- NSX Manager security
- NSX Controllers hardening
- NSX Edge security
- Distributed firewall best practices
- Micro-segmentation guidelines

## Ostatné VMware Produkty

### vRealize Suite

**vRealize Configuration Manager 5.5:**
[Security Guide (PDF)](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/vcenter-configuration-manager-55-security-guide.pdf)

**vRealize Automation:**
[Documentation Portal](http://pubs.vmware.com/vra-62/index.jsp#com.vmware.ICbase/PDF/ic_pdf.html)

**vRealize Operations Manager:**
[Security Documentation](https://www.vmware.com/support/pubs/vrealize-operations-manager-pubs.html)

### Cloud Director

**Cloud Director Security:**
[Security Guide (PDF)](https://docs.vmware.com/en/vCloud-Director/9.1/vcd_sec.pdf?src=vmw_so_vex_mande_12)

## Hlavné Oblasti Hardening

### ESXi Host Security

- Lockdown mode configuration
- SSH/Shell access control
- DCUI access restrictions
- Syslog configuration
- NTP synchronization
- Certificate management

### vCenter Security

- Role-based access control (RBAC)
- SSO configuration
- Certificate management
- Database security
- Backup encryption
- Audit logging

### VM Security

- VM encryption
- vTPM configuration
- Secure boot
- VM-VM anti-affinity rules
- Resource limitations
- Device restrictions

### Network Security

- Private VLANs
- Port security
- MAC address changes prevention
- Promiscuous mode control
- Forged transmits blocking
- Network policies enforcement

### Storage Security

- Datastore permissions
- Encryption at rest
- vSAN encryption
- iSCSI CHAP authentication
- FC zoning

## Compliance Frameworks

Guides mapujú na compliance štandardy:
- **DISA STIG** (Defense Information Systems Agency)
- **PCI-DSS** (Payment Card Industry)
- **HIPAA** (Healthcare)
- **NIST** (National Institute of Standards)

## Implementácia

### Assessment

1. Download relevantný guide
2. Review current configuration
3. Gap analysis
4. Prioritize findings (High/Medium/Low)

### Remediation

```powershell
# Príklad: PowerCLI script pre mass config
Get-VMHost | Get-AdvancedSetting -Name "UserVars.ESXiShellTimeOut" | 
  Set-AdvancedSetting -Value 600
```

### Validation

- Re-scan s guide
- Compliance reporting
- Continuous monitoring

## Automation

### PowerCLI Scripts

Guides obsahujú PowerCLI examples:
```powershell
# Enable lockdown mode
Get-VMHost | ForEach-Object {
  ($_ | Get-View).EnterLockdownMode()
}
```

### vRealize Automation

- Configuration profiles
- Compliance policies
- Auto-remediation workflows

## Best Practices

### Regular Updates

✅ Update guides pri každom upgrade  
✅ Monitor VMware security advisories  
✅ Subscribe to security bulletins

### Baseline Configuration

✅ Create security baseline templates  
✅ Enforce via Host Profiles  
✅ Regular compliance checks

### Documentation

✅ Document deviations  
✅ Maintain change log  
✅ Risk acceptance process

## Zdroje

### VMware Security

- [VMware Security Advisories](https://www.vmware.com/security/advisories.html)
- [VMware Security Response Center](https://www.vmware.com/security.html)
- [VMware Hardening Guides Portal](https://www.vmware.com/security/hardening-guides.html)

### Community

- [VMTN Security Community](https://communities.vmware.com/community/vmtn/security)
- [VMware Security Blog](https://blogs.vmware.com/security/)

### Training

- [VMware Security Training](https://www.vmware.com/education-services/certification.html)
- [SANS VMware Security](https://www.sans.org/cyber-security-courses/securing-vmware/)

## Poznámky

⚠️ **Testing Required:** Vždy testuj v non-prod prostredí  
⚠️ **Application Impact:** Niektoré settings môžu ovplyvniť aplikácie  
⚠️ **Performance:** Security môže mať performance dopad  
⚠️ **Documentation:** Dokumentuj všetky zmeny
