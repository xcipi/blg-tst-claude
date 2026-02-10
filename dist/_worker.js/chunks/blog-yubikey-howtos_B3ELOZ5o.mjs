globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "blog-yubikey-howtos.md";
						const collection = "blog";
						const slug = "blog-yubikey-howtos";
						const body = "\nZbierka užitočných návodov na prácu s YubiKey v rôznych scenároch.\n\n## FortiAuthenticator Integration\n\nAko importovať YubiKey do FortiAuthenticator:\n\n[Technical Tip: How to import YubiKey to FortiAuthenticator](https://community.fortinet.com/t5/FortiAuthenticator/Technical-Tip-How-to-import-YubiKey-to-FortiAuthenticator/ta-p/192277)\n\nTento návod od Fortinet Community vysvetľuje proces importu YubiKey do FortiAuthenticator systému pre enterprise multi-faktor autentifikáciu.\n\n## BitLocker s YubiKey\n\nNastavenie BitLocker s YubiKey ako Smart Card:\n\n[Setting Up BitLocker with YubiKey as Smart Card](https://nathanaelfrey.com/2021/01/09/setting-up-bitlocker-with-yubikey-as-smart-card/)\n\nDetailný postup ako použiť YubiKey namiesto TPM čipu pre BitLocker šifrovanie disku. Umožňuje prenosné a bezpečné šifrovanie bez hardvérovej závislosti na TPM.\n\n## Zdroje\n\n- [YubiKey Documentation](https://support.yubico.com/)\n- [Fortinet Community](https://community.fortinet.com/)\n- [BitLocker Documentation](https://docs.microsoft.com/en-us/windows/security/information-protection/bitlocker/)\n";
						const data = {title:"HOWTOs for Yubikey",excerpt:"Užitočné návody na integráciu YubiKey s FortiAuthenticator a BitLocker. Technické tutoriály pre pokročilé použitie YubiKey v enterprise prostredí.",date:"2023-08-08",readTime:"2 min",tags:["cybersecurity","yubikey","authentication","howto"]};
						const _internal = {
							type: 'content',
							filePath: "/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/blog-yubikey-howtos.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
