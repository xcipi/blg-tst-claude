globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_DjvQ9r3T.mjs';

const html = "<p>Zbierka užitočných návodov na prácu s YubiKey v rôznych scenároch.</p>\n<h2 id=\"fortiauthenticator-integration\">FortiAuthenticator Integration</h2>\n<p>Ako importovať YubiKey do FortiAuthenticator:</p>\n<p><a href=\"https://community.fortinet.com/t5/FortiAuthenticator/Technical-Tip-How-to-import-YubiKey-to-FortiAuthenticator/ta-p/192277\">Technical Tip: How to import YubiKey to FortiAuthenticator</a></p>\n<p>Tento návod od Fortinet Community vysvetľuje proces importu YubiKey do FortiAuthenticator systému pre enterprise multi-faktor autentifikáciu.</p>\n<h2 id=\"bitlocker-s-yubikey\">BitLocker s YubiKey</h2>\n<p>Nastavenie BitLocker s YubiKey ako Smart Card:</p>\n<p><a href=\"https://nathanaelfrey.com/2021/01/09/setting-up-bitlocker-with-yubikey-as-smart-card/\">Setting Up BitLocker with YubiKey as Smart Card</a></p>\n<p>Detailný postup ako použiť YubiKey namiesto TPM čipu pre BitLocker šifrovanie disku. Umožňuje prenosné a bezpečné šifrovanie bez hardvérovej závislosti na TPM.</p>\n<h2 id=\"zdroje\">Zdroje</h2>\n<ul>\n<li><a href=\"https://support.yubico.com/\">YubiKey Documentation</a></li>\n<li><a href=\"https://community.fortinet.com/\">Fortinet Community</a></li>\n<li><a href=\"https://docs.microsoft.com/en-us/windows/security/information-protection/bitlocker/\">BitLocker Documentation</a></li>\n</ul>";

				const frontmatter = {"title":"HOWTOs for Yubikey","excerpt":"Užitočné návody na integráciu YubiKey s FortiAuthenticator a BitLocker. Technické tutoriály pre pokročilé použitie YubiKey v enterprise prostredí.","date":"2023-08-08","readTime":"2 min","tags":["cybersecurity","yubikey","authentication","howto"]};
				const file = "/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/blog-yubikey-howtos.md";
				const url = undefined;
				function rawContent() {
					return "\nZbierka užitočných návodov na prácu s YubiKey v rôznych scenároch.\n\n## FortiAuthenticator Integration\n\nAko importovať YubiKey do FortiAuthenticator:\n\n[Technical Tip: How to import YubiKey to FortiAuthenticator](https://community.fortinet.com/t5/FortiAuthenticator/Technical-Tip-How-to-import-YubiKey-to-FortiAuthenticator/ta-p/192277)\n\nTento návod od Fortinet Community vysvetľuje proces importu YubiKey do FortiAuthenticator systému pre enterprise multi-faktor autentifikáciu.\n\n## BitLocker s YubiKey\n\nNastavenie BitLocker s YubiKey ako Smart Card:\n\n[Setting Up BitLocker with YubiKey as Smart Card](https://nathanaelfrey.com/2021/01/09/setting-up-bitlocker-with-yubikey-as-smart-card/)\n\nDetailný postup ako použiť YubiKey namiesto TPM čipu pre BitLocker šifrovanie disku. Umožňuje prenosné a bezpečné šifrovanie bez hardvérovej závislosti na TPM.\n\n## Zdroje\n\n- [YubiKey Documentation](https://support.yubico.com/)\n- [Fortinet Community](https://community.fortinet.com/)\n- [BitLocker Documentation](https://docs.microsoft.com/en-us/windows/security/information-protection/bitlocker/)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"fortiauthenticator-integration","text":"FortiAuthenticator Integration"},{"depth":2,"slug":"bitlocker-s-yubikey","text":"BitLocker s YubiKey"},{"depth":2,"slug":"zdroje","text":"Zdroje"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
