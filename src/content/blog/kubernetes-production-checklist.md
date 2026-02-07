---
title: 'Kubernetes Production Checklist'
excerpt: 'Veci, na ktoré si dať pozor pred nasadením do produkcie. Od resource limitov po network policies.'
date: '2026-02-01'
readTime: '8 min'
tags: ['kubernetes', 'devops', 'infrastructure']
---

## Resource Limits a Requests

Prvá vec, ktorú musíš nastaviť pred produkciou, sú resource limits. Bez nich môže jeden pod zožrať všetky zdroje nodu.

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

## Network Policies

Default allow všetko je security nightmare. Použi Network Policies na whitelistovanie komunikácie medzi podmi.

- Izoluj namespaces
- Povol len potrebnú komunikáciu
- Loguj denied connections

## Health Checks

Liveness a readiness probes sú must-have. Bez nich Kubernetes nevie, či je tvoj pod healthy.

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

**Tip:** Readiness probe by mala checkovat dependencies (DB, cache), liveness len základnú funkcionalitu.

## Image Pull Policy

Vždy použi konkrétne tagy, nie `latest`. Pomôže to pri rollbackoch a debugovaní.

```yaml
image: myapp:v1.2.3
imagePullPolicy: IfNotPresent
```

## Pod Disruption Budgets

Pre high-availability appky nastav PDB, aby si zabezpečil minimálny počet replík počas údržby.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp
```
