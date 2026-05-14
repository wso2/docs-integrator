---
title: Private Data Plane Overview
---

# Private Data Plane Overview

A private data plane (PDP) provides dedicated infrastructure for a single organization to run its integrations. Unlike a cloud data plane which runs on shared multi-tenant infrastructure managed by WSO2, a private data plane gives your organization full isolation at the runtime level. This makes it the right choice when you have strict data residency requirements, need to meet compliance standards like GDPR or HIPAA, or want runtime traffic to stay within your own network boundary. Private data planes can be deployed on Azure, AWS, GCP, or on-premises infrastructure.

## Infrastructure requirements

- An upstream-compatible Kubernetes cluster
- A container registry
- A key vault (secret store)
- A logging service or log storage

## System components

Setting up a private data plane involves a Helm installation on your Kubernetes infrastructure. The following components are installed:

- Cilium CNI and service mesh
- WSO2 Cloud API gateways and related components
- WSO2 Cloud PDP agent
- Observability and logging APIs, along with observability agents
- Flux controller

All components receive automatic updates through the Flux controller connected to the WSO2 Cloud Update Management System.

## Connectivity with the control plane

All communication from the private data plane to the control plane is outbound, so you do not need to open any inbound `IP:Port`. If your organization restricts outbound traffic, you must permit access to the public IP range of the WSO2 Cloud control plane.

| Data plane component | Endpoint | Direction | Protocol |
|---|---|---|---|
| PDP agent | WSO2 Cloud control plane (mizzen server) | Outbound | WSS |
| PDP agent | Kubernetes API server | Outbound (cluster internal) | HTTPS, WS |
| APIM / local adaptor | Global adaptor | Outbound | HTTPS |
| APIM / local adaptor | Azure Service Bus (control plane) | Outbound | AMQP |
| APIM / enforcer | Event hub (control plane) | Outbound | AMQP |
| Secret resolver | Cloud secret store | Outbound (VPC internal) | HTTPS |
| Container registry | Container registry (public) | Inbound | HTTPS |
| Container registry | Container registry | Outbound (VPC internal) | HTTPS |
| Certificate manager | Azure DNS service | Outbound | HTTPS |
| Certificate manager | Let's Encrypt | Outbound | HTTPS |
| Flux source controller | GitHub | Outbound | HTTPS |
| Flux Helm controller | WSO2 Integration Platform container registry | Outbound | HTTPS |

All communication is secured using TLS.

## What's next

- [Private data plane management models](./management-models.md) — Understand the shared responsibility options for infrastructure and platform management
- [Private data plane security levels](./security-levels.md) — Compare the basic, standard, and premium security tiers
