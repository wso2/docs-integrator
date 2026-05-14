---
title: Private Data Plane Management Models
---

# Private Data Plane Management Models

WSO2 Cloud - Integration Platform manages the full lifecycle of your integrations, from development through deployment. The data plane is the runtime environment where those integrations run. When you use a private data plane, you own and control that environment, which introduces a choice: how much of the infrastructure and platform management do you want to own?

WSO2 supports three management models for private data planes, ranging from fully WSO2-managed to fully customer-managed. Each model defines a shared responsibility boundary across infrastructure provisioning, Kubernetes management, platform component operations, and security monitoring.

## WSO2 fully managed (infrastructure and PDP in WSO2 subscription)

In this model, WSO2 owns the cloud subscription and manages all infrastructure and platform components on your behalf. You are responsible only for creating and managing your integrations. WSO2 fully managed private data planes are supported on Azure, AWS, and GCP.

| Task | Task description | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| Subscription prerequisites | Create subscriptions, check quota and service limits, run the compatibility prerequisite script | WSO2 | WSO2 | Customer (if required) | Customer (if required) |
| Remote access for installation | Provide owner access | WSO2 | WSO2 | WSO2 | WSO2 |
| Network management | Obtain customer backend CIDR for VPN/peering, check end-to-end connectivity | WSO2/Customer | WSO2/Customer | Customer | Customer |
| Firewall rules and access control | Set up firewall and required rules depending on the security tier | WSO2 | WSO2 | Customer | Customer |
| Infrastructure provisioning | Provision bastion and Kubernetes clusters | WSO2 | WSO2 | — | Customer (if required) |
| Kubernetes cluster management | Manage Kubernetes versions, increase node pool size | WSO2 | WSO2 | Customer | Customer |
| Infrastructure monitoring | Set up alerts | WSO2 | WSO2 | — | Customer (if required) |
| DNS management for platform system | Manage DNS infrastructure and SSL certificates for platform system components | WSO2/Customer | WSO2/Customer | Customer | Customer |
| Platform system components deployment | Set up PDP agents via Helm | WSO2 | WSO2 | — | — |
| Platform system components management | Upgrade, patch, and debug versions | WSO2 | WSO2 | — | Customer (if required) |
| Platform system components monitoring | Set up continuous 24x7 monitoring and provide monthly uptime reports | WSO2 | WSO2 | — | Customer |
| Platform system security monitoring | Basic tier: CSPM, security patches, supply chain security, security incident management. Standard/premium tier: adds runtime security alerts, SIEM alerts, compliance adherence | WSO2/Customer | WSO2/Customer | WSO2/Customer | WSO2/Customer |
| Integration creation and deployment | | Customer | Customer | Customer | Customer |
| Integration management | | Customer | Customer | Customer | Customer |
| Integration monitoring | | Customer | Customer | Customer | Customer |
| Integration logs | | Customer | Customer | Customer | Customer |

## WSO2 fully managed (infrastructure and PDP in customer subscription)

In this model, the customer owns the cloud subscription, but WSO2 still manages infrastructure provisioning and all platform operations. You provide access to your subscription and own the integrations that run on it.

| Task | Task description | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| Subscription prerequisites | Create subscriptions, check quota and service limits, run the compatibility prerequisite script | Customer | Customer | WSO2 | — |
| Remote access for installation | Provide access | Customer | Customer | WSO2 | WSO2 |
| Network management | Obtain customer backend CIDR for VPN/peering, check end-to-end connectivity | WSO2/Customer | WSO2/Customer | Customer | Customer |
| Firewall rules and access control | Set up firewall and required rules depending on the security tier | WSO2/Customer | WSO2/Customer | Customer | Customer |
| Infrastructure provisioning | Provision bastion and Kubernetes clusters | WSO2 | WSO2 | Customer | Customer |
| Kubernetes cluster management | Manage Kubernetes versions, increase node pool size | WSO2 | WSO2 | Customer | Customer |
| Infrastructure monitoring | Set up alerts | WSO2 | WSO2 | — | Customer (if required) |
| DNS management for platform system | Manage DNS infrastructure and SSL certificates for platform system components | WSO2/Customer | WSO2/Customer | Customer | Customer |
| Platform system components deployment | Set up PDP agents via Helm | WSO2 | WSO2 | Customer | — |
| Platform system components management | Upgrade, patch, and debug versions | WSO2 | WSO2 | — | Customer (if required) |
| Platform system components monitoring | Set up continuous 24x7 monitoring and provide monthly uptime reports | WSO2 | WSO2 | — | Customer |
| Platform system security monitoring | Basic tier: CSPM, security patches, supply chain security, security incident management. Standard/premium tier: adds runtime security alerts, SIEM alerts, compliance adherence | WSO2/Customer | WSO2/Customer | WSO2/Customer | WSO2/Customer |
| Integration creation and deployment | | Customer | Customer | Customer | Customer |
| Integration management | | Customer | Customer | Customer | Customer |
| Integration monitoring | | Customer | Customer | Customer | Customer |
| Integration logs | | Customer | Customer | Customer | Customer |

## Customer self-managed (WSO2 provides installation script and updates)

In this model, the customer owns the subscription and manages all infrastructure and platform operations. WSO2 provides the installation script, Helm charts, and ongoing updates, and is available for consultation. This model offers the highest level of customer control.

| Task | Task description | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| Subscription prerequisites | Create subscriptions, check quota and service limits, run the compatibility prerequisite script | Customer | Customer | WSO2 | WSO2 |
| Remote access for installation | Provide owner access | Customer | Customer | WSO2 | — |
| Network management | Obtain customer backend CIDR for VPN/peering, check end-to-end connectivity | Customer | Customer | WSO2 | WSO2 |
| Firewall rules and access control | Set up firewall and required rules depending on the security tier | Customer | Customer | WSO2 | WSO2 |
| Infrastructure provisioning | Provision bastion and Kubernetes clusters | Customer | Customer | WSO2 | WSO2 (if required) |
| Kubernetes cluster management | Manage Kubernetes versions, increase node pool size | Customer | Customer | WSO2 | WSO2 (if required) |
| Infrastructure monitoring | Set up alerts | Customer | Customer | WSO2 | — |
| DNS management for platform system | Manage DNS infrastructure and SSL certificates for platform system components | Customer | Customer | WSO2 | — |
| Platform system components deployment | Set up PDP agents via Helm | Customer | Customer | WSO2 | — |
| Platform system components management | Upgrade, patch, and debug versions | Customer | Customer | WSO2 | — |
| Platform system components monitoring | Set up continuous 24x7 monitoring and provide monthly uptime reports | Customer | Customer | WSO2 | — |
| Platform system security monitoring | Basic tier: CSPM, security patches, supply chain security, security incident management. Standard/premium tier: adds runtime security alerts, SIEM alerts, compliance adherence | WSO2/Customer | WSO2/Customer | WSO2/Customer | WSO2/Customer |
| Integration creation and deployment | | Customer | Customer | Customer | Customer |
| Integration management | | Customer | Customer | Customer | Customer |
| Integration monitoring | | Customer | Customer | Customer | Customer |
| Integration logs | | Customer | Customer | Customer | Customer |

## What's next

- [Private data plane security levels](./security-levels.md) — Compare the basic, standard, and premium security tiers
