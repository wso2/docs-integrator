---
sidebar_position: 1
title: FAQ
description: Frequently asked questions about Choreo Integration.
keywords: [choreo integrator, faq, frequently asked questions, troubleshooting]
slug: /reference/faq
---

# Frequently Asked Questions

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

## General

### Q: What is Choreo Integration?
Choreo Integration is a powerful IPaaS with first-class AI support. Incorporate AI agents into the integrations you build in low-code and pro-code, and move away from siloed systems to intelligent digital experiences with Choreo Cloud—the AI iPaaS that your AI Agents can call “home”.

### Q: What is an organization in Choreo Cloud?
An organization is a logical grouping of users and their resources. It may represent a company, community, or a single user. Each organization can have different roles assigned to its users to control access to Choreo Cloud features.

### Q: What is a project in Choreo Cloud?
A project is a logical grouping of related integrations to help you organize your work. Each project provides runtime isolation through namespaces when you deploy integrations.

### Q: What is an integration in Choreo Cloud?
An integration in Choreo Cloud is a solution that connects systems, automates processes, or exposes functionality. Integrations can take many forms, such as automations, AI agents, APIs, event-driven flows, or file-based processes.

### Q: What is the difference between an internal and external API?
In Choreo Cloud, you can publish an API as an internal or an external API. A user or an application can access an external API publicly over the internet, whereas an internal API is only accessible through other integrations within the same organization.

### Q: What is a connector in Choreo Cloud?
A connector is a reusable Choreo Integrator package that simplifies connecting to external or internal systems and APIs, such as Salesforce, SAP, GitHub, and Twilio. You can use the available connectors to implement your integration use cases. Connectors can be created and published by both WSO2 and Choreo Cloud users.

### Q: What is a trigger in Choreo Cloud?
A trigger is a construct that enables users to receive known event payloads from external systems, facilitating event-driven programming.

### Q: What is a sample/template in Choreo Cloud?
A sample or template is a prebuilt Choreo Integrator program that covers a popular integration use case or pattern. Examples include connecting Salesforce to Slack or implementing content-based routing.

### Q: What are the support options in Choreo Cloud?
You can find information about our support plans, including `free`, `basic`, and `enterprise` options at https://wso2.com/saas-support-plans/.

### Q: How can I perform log monitoring or analytics for the Azure environment?
If you have a log monitoring product or service, such as Azure Monitor, you can use it together with Choreo Cloud. Note: The log monitoring tool is not included in the infrastructure cost.

### Q: What is the maximum request payload size supported by Choreo Cloud?
Choreo Cloud allows a maximum request payload size of 50 MB.

### Q: What source control software does Choreo Cloud support?
Choreo Cloud supports GitHub and Azure DevOps.

### Q: Why don't I see the undeployed builds for my integration in Choreo Cloud?
You are allowed to build your integration any number of times. However, Choreo Cloud has a limit on retaining undeployed builds. For users on the Free Trial plan, Choreo Cloud will retain **only one** undeployed build. For those on any other plan, Choreo Cloud will retain the **latest five** undeployed builds.

### Q: What is Choreo Integrator?
Choreo Integrator is a 100% open-source, AI-native integration platform built for the cloud. It helps you connect any system across your business and tackle integration challenges with ease. By using integration platform on Choreo Cloud, you can accelerate delivery—often 2–3x faster. Learn more at https://wso2.com/integrator/.

### Q: What is Choreo Identity?
Choreo Identity is an identity provider (IdP) that allows developers to secure access for consumers, business partners, employees, and APIs. Choreo Identity is Choreo Cloud’s default IDP. To learn more, visit https://wso2.com/identity-platform/.

### Q: As a Cloud Data Plane user, how can I create integrations in multiple data planes?
When an organization admin onboards a new organization in Choreo Cloud, they can choose the preferred data plane. Choreo Cloud then sets the selected data plane as the default for the entire organization. Subsequently, users on the Free Trial plan can create integrations only in the set default data plane. If a Free Trial user needs to create integrations in a different data plane, the user must get a paid subscription.

### Q: Can Choreo Cloud automatically identify my endpoints?
Yes. Choreo Cloud uses underlying buildpack technology to scan your source code and configuration files for standard web framework patterns and port declarations.
However, if an endpoint cannot be automatically identified, you must manually define it in your component.yaml file. Automatic identification may not work if:
- Your service uses a non-standard port that is not commonly recognized.
- The port is assigned dynamically at runtime.
- The `.choreo/component.yaml` file is missing or contains formatting errors.

How to manually define an endpoint: If automatic detection fails, add an endpoints section to your `component.yaml` as shown below:
```yaml
endpoints:
  - name: "Greeter API"
    port: 9090
    type: "REST"
    scheme: "http"
    context: "/"
    visibility: "Public"
```
By explicitly defining these attributes, you provide a "source of truth" that ensures your service is correctly exposed regardless of the automatic detection outcome.

### Q: How can I find my Organization ID and Organization Handle?
To find your Organization ID and Organization Handle, follow these steps:
- Navigate to your organization.
- Open **Settings**. The **General** page opens.

You can view and copy the **Organization handle** and **Organization unit ID** from the **General** page using the copy icon next to each value.

<ThemedImage
  alt="Organization General settings page showing the organization name, handle, and unit ID with copy icons"
  sources={{
    light: useBaseUrl('/img/reference/ai-usage/organiztion-id.png'),
    dark: useBaseUrl('/img/reference/ai-usage/organiztion-id.png'),
  }}
/>

## Security and data protection

### Q: How is data managed in Choreo Cloud?
Choreo Cloud manages data using WSO2 containers and Kubernetes clusters, which provide scalability, resilience, and security. Find out more [here](https://wso2.cachefly.net/wso2/sites/all/trust/wso2-public-cloud-data-protection-faq.pdf).

### Q: What is the WSO2 Subprocessor list?
This is a detailed list of all subprocessors used by WSO2, including their name, location, and purpose. This information is updated frequently to ensure compliance with data protection regulations and is found [here](https://wso2.cachefly.net/wso2/sites/all/trust/wso2-public-cloud-subprocessor-list.pdf).

### Q: How do we secure WSO2 Private and Public Clouds?
WSO2 uses a range of security controls and design patterns to protect against several threats, including internal attacks, software supply chain attacks, service and platform attacks, and more. For more details, see [Cloud Security Process](https://security.docs.wso2.com/en/latest/security-processes/cloud-security-process/).

### Q: How can I connect a Choreo Cloud integration with a protected third-party application?
To connect a Choreo Cloud integration with a third-party application, it is necessary to establish seamless communication between the integration and the protected third-party application, especially when connecting to external databases like MySQL, MSSQL, PGSQL, Oracle DB, etc.
To ensure this, the requests coming from the Choreo Cloud data plane must be allowed by adding the specific data plane IP ranges to your allowlist.

**If your primary region is US:**

- Choreo Cloud US data plane: `20.22.170.144/28`
- Choreo Cloud EU data plane: `20.166.183.112/28`

**If your primary region is EU:**

- Choreo Cloud EU data plane: `54.170.135.118, 52.215.28.29`

## Data planes

### Q: What is a Choreo Cloud control plane?
The Choreo Cloud control plane is a centralized management component that oversees and coordinates the workloads deployed by customers. It provides a unified point of control and visibility for the organization, allowing administrators to manage, monitor, and orchestrate the organization’s resources efficiently.

### Q: What is a data plane?
A data plane in Choreo Cloud is a computing environment designed for running customer workloads. It is hosted on public cloud infrastructure owned by WSO2, known as the Choreo Cloud data plane.

### Q: Which regions support the Choreo Cloud data plane(CDP)?
The Choreo Cloud data plane is currently supported in the US East 2 and North Europe. However, WSO2 is planning to add support for additional regions as needed.

### Q: Are the Choreo Cloud control plane and data planes highly available? Are they running on multiple clusters?
The Choreo Cloud control plane and data plane are designed for high availability using Azure components like AKS, MSSQL, ACR, KV, Service Bus, and so on, with a high availability of 99.99%, which allows at least three workload nodes. In the event of a node failure or upgrade, this setup provides reliable failover. WSO2 also has a backup and recovery strategy in place, including continuous restore drills. If you require AKS cluster-level redundancy, we can consider multiple zones. In this case, the cost will include an additional infrastructure cost.

## Environments

### Q: As a Choreo Cloud data plane user, why can't I create environments?
You can create environments only if you have a paid subscription in Choreo Cloud. It can be either a Growth or an Enterprise plan.

### Q: I am a Growth plan customer using the Choreo Cloud data plane. How many environments can I create?
The Growth plan includes 2 environments at the organization level, which the default Development and Production environments already use. See the [Acceptable Usage Policy](../manage/billing/acceptable-usage-policy.md) for the environment entitlement on each plan.

### Q: As a Choreo Cloud data plane user, why don’t I see both US & EU data planes in the data plane selector when creating an environment?
You will see both US & EU data planes only if you have a paid subscription and have created projects in both US & EU data planes.

## Billing and support

For the full list of entitlements and usage limits on each plan, see the [Acceptable Usage Policy](../manage/billing/acceptable-usage-policy.md).

### Q: Whom do I reach out to if I have a billing question?
You can reach out to cloud-billing-support@wso2.com or create a support ticket via our support portal.

### Q: What's the Free Trial plan?
The Free Trial plan allows you to try out Choreo Cloud’s capabilities at no cost. It’s ideal for proof of concept (PoC) tasks or workloads with limited transactions. This plan allows you to experiment with up to 5 integrations and provides US$1,000/year of Choreo Cloud data plane (CDP) credits.

### Q: How do I calculate the infrastructure costs?
Calculating infrastructure costs depends on the type of workload you want to manage. Here are a few examples:

- **Example 1**: Creating, deploying, and managing a new Integration as an API within Choreo Cloud; pay for 1 x integration + infrastructure cost. Each container deployed will be approximately US$57.25 per month on the default configuration provided by Choreo Cloud. Additional resources will be charged based on the type of resource required.
- **Example 2**: Creating, deploying, and managing a microservice; the same approach as example 1.

### Q: What are the integration limitations?

- **Free Trial plan**: Allows up to a maximum of five free integrations and unlimited paid integrations.
- **Growth plan**: Allows unlimited paid integrations.
- **Enterprise plan**: Allows unlimited paid integrations.

### Q: How do I read the bill?
Your bill will detail the number of integrations used, infrastructure consumed, support plans used, and any additional services you may have purchased. If you are unsure about any charges on your bill, reach out to us at [support@wso2.com](mailto:support@wso2.com) for clarification.

### Q: Is support included in the Choreo Cloud Enterprise plan?
The Choreo Cloud Enterprise plan does not automatically include support; however, you can purchase support plans in addition to the Enterprise plan at any time. Find out more at https://wso2.com/saas-support-plans/.

### Q: I want to upgrade from Growth to an Enterprise subscription. Will there be an outage during the upgrade?
No, there are no outages when upgrading a plan.
