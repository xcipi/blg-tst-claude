globalThis.process ??= {}; globalThis.process.env ??= {};
const id = "kubernetes-production-checklist.md";
						const collection = "blog";
						const slug = "kubernetes-production-checklist";
						const body = "\n## Resource Limits a Requests\n\nPrvá vec, ktorú musíš nastaviť pred produkciou, sú resource limits. Bez nich môže jeden pod zožrať všetky zdroje nodu.\n\n```yaml\nresources:\n  requests:\n    memory: \"256Mi\"\n    cpu: \"100m\"\n  limits:\n    memory: \"512Mi\"\n    cpu: \"500m\"\n```\n\n## Network Policies\n\nDefault allow všetko je security nightmare. Použi Network Policies na whitelistovanie komunikácie medzi podmi.\n\n- Izoluj namespaces\n- Povol len potrebnú komunikáciu\n- Loguj denied connections\n\n## Health Checks\n\nLiveness a readiness probes sú must-have. Bez nich Kubernetes nevie, či je tvoj pod healthy.\n\n```yaml\nlivenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 30\n  periodSeconds: 10\n\nreadinessProbe:\n  httpGet:\n    path: /ready\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 5\n```\n\n**Tip:** Readiness probe by mala checkovat dependencies (DB, cache), liveness len základnú funkcionalitu.\n\n## Image Pull Policy\n\nVždy použi konkrétne tagy, nie `latest`. Pomôže to pri rollbackoch a debugovaní.\n\n```yaml\nimage: myapp:v1.2.3\nimagePullPolicy: IfNotPresent\n```\n\n## Pod Disruption Budgets\n\nPre high-availability appky nastav PDB, aby si zabezpečil minimálny počet replík počas údržby.\n\n```yaml\napiVersion: policy/v1\nkind: PodDisruptionBudget\nmetadata:\n  name: myapp-pdb\nspec:\n  minAvailable: 2\n  selector:\n    matchLabels:\n      app: myapp\n```\n";
						const data = {title:"Kubernetes Production Checklist",excerpt:"Veci, na ktoré si dať pozor pred nasadením do produkcie. Od resource limitov po network policies.",date:"2026-02-01",readTime:"8 min",tags:["kubernetes","devops","infrastructure"]};
						const _internal = {
							type: 'content',
							filePath: "/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
