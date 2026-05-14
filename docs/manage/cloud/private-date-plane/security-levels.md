---
title: Private Data Plane Security Levels
---

# Private Data Plane Security Levels

The WSO2 Integration Platform private data plane supports three security tiers: basic, standard, and premium. Each tier adds capabilities on top of the previous one, so you can choose the level of protection that matches your compliance requirements and risk profile.

Features marked with an asterisk (\*) are not available in on-premises private data planes.

| Security feature | Basic | Standard | Premium |
|---|---|---|---|
| DDoS protection \* | Basic | Basic | Premium |
| Controlled admin access \* | Yes | Yes | Yes |
| End-to-end data encryption in transit | Yes | Yes | Yes |
| Data encryption at rest \* | Yes | Yes | Yes |
| Secret management | Yes | Yes | Yes |
| Cloud security posture management (CSPM) \* | Foundational | Foundational | Premium |
| Static application security testing (SAST) | Yes | Yes | Yes |
| Infrastructure as code (IaC) scanning | Yes | Yes | Yes |
| Software composition analysis | Yes | Yes | Yes |
| Docker image security scanning | Yes | Yes | Yes |
| Kubernetes runtime protection \* | No | Yes | Yes |
| Web application firewall (WAF) \* | No | Yes | Yes |
| Network firewall \* | No | No | Yes |

:::tip Available add-ons
The following capabilities are available as add-ons regardless of security tier:

- Security incident and event management (SIEM)
- 24/7 security operations center

## What's next

- [Private data plane management models](./management-models.md) — Understand the shared responsibility options for infrastructure and platform management
