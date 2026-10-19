---
title: Platform overview
---

# WSO2 Integration Platform: Overview

Welcome. This guide introduces WSO2 Integration Platform from the ground up, with no prior integration experience required, using one running example throughout to show how each part of the platform fits together.

---

## Introduction

Consider a typical integration task: connecting an order system to a shipping partner's API, and reporting back if anything fails. On the surface, this looks like a straightforward connectivity problem. In practice, it involves several concerns at once: calling an external API, transforming data into a format the partner expects, handling cases where the partner's service is slow or unavailable, and providing visibility into whether the integration is working correctly once it is live.

This is the nature of integration work. It is not just about connecting two systems, but about engineering that connection so it continues to work reliably. WSO2 Integration Platform is designed to support this work end to end, from initial development through to running in production. This document uses that same example throughout, to show concretely where each part of the platform fits.

---

## 1. What Is WSO2 Integration Platform?

WSO2 Integration Platform is a 100% open-source platform for building and running integrations that connect AI agents, APIs, data, events, applications, and services across cloud, on-premises, and hybrid environments. It covers the full lifecycle of an integration: building it, running it, managing it, and understanding its behavior once it is live.

As an integration developer, you use the platform to:

- Build integrations and workflows
- Connect with enterprise and SaaS systems
- Expose business capabilities as APIs
- Process events, messages, and files
- Transform data between systems
- Build AI-powered integrations and agents
- Deploy integrations to managed or self-managed environments
- Manage and observe integrations throughout their lifecycle

These tasks look different on the surface, but they share the same underlying requirements: connectivity to other systems, data transformation, handling of failure conditions, security, and visibility into runtime behavior. WSO2 Integration Platform brings these capabilities together, so that developers can address all of them using one consistent development experience, rather than moving between separate, disconnected tools.

One principle shapes how the platform is organized.

:::info Core principle
WSO2 Integration Platform separates **how you develop** an integration from **where it runs** and **how it is operated**.

:::tip How to think about the platform
WSO2 Integration Platform is best understood not as a collection of individual components, but as **one engineering environment** that supports an integration from its initial design through to production operation.

---

## 2. The Integration Lifecycle: A Mental Model

Before looking at each part of WSO2 Integration Platform individually, it helps to see the overall path an integration takes, from initial idea to production and eventually retirement. This lifecycle covers every stage an integration passes through, regardless of which tools are used to build it.

An integration does not simply get written and then exist. It is agreed on, built, packaged, moved through a series of environments, released, operated, refined, and eventually decommissioned. Understanding that path first makes it much easier to see where each part of the platform fits:

<ThemedImage
    alt="Integration lifecycle from Design through Develop and Test, Build, Deploy, Validate, Promote, Manage and Observe, to Improve or Retire"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-lifecycle.png'),
        dark: useBaseUrl('/img/platform-overview/integration-lifecycle.png'),
    }}
/>

The table below walks through each stage, using the order-system-to-shipping-partner example from the introduction. ("Artifact" here means the packaged, deployable version of the integration, the output of the Build stage.)

| Stage | What it means | In this example | Environment |
|---|---|---|---|
| **Design** | Agree what to build and define the contract the integration will honor, meaning the agreed shape of the data exchanged and what the two sides expect of each other. Typically handled with an API specification editor or a shared specification document. | Agree on the request/response shape the shipping partner's API expects, and what counts as success or failure. | Planning |
| **Develop and Test** | Write the integration logic, including the calls to external systems, the data transformations, and the error handling, then test it as it takes shape. | Build the flow using a connector to the partner's API, transform order data into the partner's format, add handling for slow or failed responses, and test it. | Dev |
| **Build** | Package the integration into a deployable artifact and run automated checks. | Package the integration artifact and run automated checks in CI. | Build tools / CI |
| **Deploy** | Push the packaged artifact into an environment tier. | Push the artifact into an environment tier, for example Staging/UAT. | *Varies:* target tier |
| **Validate** | Confirm the artifact works correctly in that tier. | Test the flow against the partner's test endpoint in that tier. | Same tier as Deploy |
| **Promote** | Move the validated artifact into the next environment tier. | Move the artifact into the next tier, eventually reaching production. | Target tier, up to Production |
| **Manage and Observe** | Once live, operate and govern the integration centrally (**Manage**), and understand its runtime behavior using logs, metrics, and traces (**Observe**). Both run continuously. | The team has one place to operate this integration alongside every other one; runtime data shows what's happening if the partner's API slows down. | Production |
| **Improve (or Retire)** | Feed production learnings back into development, or decommission the integration once it is no longer needed. | Add a retry policy after learning the partner's API times out during peak hours, or eventually retire the integration if the partnership ends. | Loops to Dev, or Production (decommissioned) |

The sections that follow look at each part of this path in more detail: the core components used to build and run integrations ([Core Components](#3-core-components)), this same lifecycle viewed through WSO2's own components ([WSO2 Integration Platform Across the Lifecycle](#4-wso2-integration-platform-across-the-lifecycle)), the broader set of integration styles this pattern generalizes to ([Integration Styles Supported](#5-integration-styles-supported)), the platform's underlying architecture ([Architecture: Data, Control, and Observability Planes](#6-architecture-data-control-and-observability-planes)), where integrations can be deployed ([Deployment Models](#7-deployment-models)), and how they are managed and observed once in production ([Management and Observability](#8-management-and-observability)).

---

## 3. Core Components

The platform consists of four core components:

- **WSO2 Integrator:** the editor where integrations are built and tested
- **Connectors:** pre-built, typed connectivity to external systems
- **WSO2 Integration Cloud (WSO2 iPaaS):** a managed environment for running integrations
- **WSO2 Integration Control Plane (ICP):** a centralized place to manage self-hosted integrations

### 3.1 WSO2 Integrator

WSO2 Integrator is the primary environment for developing integrations. It's available both as an **installable desktop application** and as a **browser-based cloud editor** provided as SaaS through WSO2 Integration Cloud, so you can start without installing anything if you prefer. Either way, it supports both visual design and direct code editing, and the two representations remain synchronized, so a developer can construct a flow visually and then refine it in code without the two views falling out of step.

<ThemedImage
    alt="WSO2 Integrator editor"
    sources={{
        light: useBaseUrl('/img/platform-overview/wso2-integrator.png'),
        dark: useBaseUrl('/img/platform-overview/wso2-integrator.png'),
    }}
/>

The underlying programming foundation is **Ballerina**, a language designed specifically for integration work. **Prior knowledge of Ballerina is not required** to begin using WSO2 Integrator. Developers can start with familiar integration concepts such as APIs, connectors, data mappings, conditions, events, and workflows, then move into the underlying source code only when more precise control is needed.

<ThemedImage
    alt="You build the integration, WSO2 Integrator handles the underlying Ballerina representation"
    sources={{
        light: useBaseUrl('/img/platform-overview/do-i-need-ballerina.png'),
        dark: useBaseUrl('/img/platform-overview/do-i-need-ballerina.png'),
    }}
/>

WSO2 Integrator also provides **AI-assisted development** alongside access to pre-built connectors. You can describe an integration in natural language and have it generate parts of the flow, create data mappings, or help troubleshoot an error.

If you're just getting started, a good way to build is to work through these in order:

1. **Start with AI assistance.** Describe what you're trying to build and let it generate a first working version of the flow.
2. **Review and refine on the visual canvas.** Seeing the integration laid out as a flow makes it easier to understand what's happening and adjust it before moving further.
3. **Drop into code only when you need to.** Use the underlying source when you need more precise control than the visual view or the AI assistant can offer, such as custom logic or handling specific to your use case.

Because the visual and code representations stay in sync, you can move between these at any point without losing your work.

### 3.2 Connectors

Connectors are pre-built, typed components that handle connectivity to a specific external system, such as an API, database, message broker, or SaaS application. They exist so you don't have to work out an external system's authentication, request format, and data model every time you want to use it.

Rather than building this connectivity from scratch, you typically start from an existing library of pre-built connectors covering common systems such as CRMs, databases, cloud services, and message brokers like Kafka and RabbitMQ. For REST or SOAP APIs specifically, a connector can also be generated automatically from that system's own published interface description, such as an OpenAPI specification or a WSDL file, so it reflects exactly what that system expects.

Once a connector is in place, calling an external service behaves similarly to calling local code. For the shipping partner integration from the introduction, this means calling the partner's API through a connector rather than hand-writing HTTP requests and parsing responses yourself.

<ThemedImage
    alt="Integration Store showing available connectors"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-store.png'),
        dark: useBaseUrl('/img/platform-overview/integration-store.png'),
    }}
/>

WSO2 Connector Store : https://wso2.com/integration-platform/connectors/.

### 3.3 WSO2 Integration Cloud (WSO2 iPaaS)

WSO2 Integration Cloud is WSO2's fully managed integration platform as a service (iPaaS). WSO2 hosts and operates the underlying infrastructure, so you can build and run integrations without provisioning or maintaining servers yourself.

Rather than setting up infrastructure before you can start, you sign in and begin developing directly in a browser-based version of WSO2 Integrator (cloud editor): create a new integration, import one from an existing code repository, or start from a prebuilt sample. Deployment, scaling, and availability from there are handled by WSO2 as part of the service.

For the shipping partner integration from the introduction, this means the same flow built in WSO2 Integrator can run entirely on WSO2 Cloud, with WSO2 responsible for keeping the environment it runs in available and up to date, rather than your own team operating that infrastructure.

<ThemedImage
    alt="WSO2 Integration Cloud (iPaaS)"
    sources={{
        light: useBaseUrl('/img/platform-overview/ipaas.png'),
        dark: useBaseUrl('/img/platform-overview/ipaas.png'),
    }}
/>

### 3.4 WSO2 Integration Control Plane (ICP)

WSO2 Integration Control Plane (ICP) is the centralized console for managing integrations that run on infrastructure your organization hosts itself (self-hosted). It exists so you have one place to deploy, manage, and monitor integrations across environments, rather than relying on separate, disconnected tools for each one.

From ICP, you can see every integration running across your projects, deploy new versions, and check their status, alongside health information, metrics, and aggregated logs, without needing a separate tool for observability on top of it.

For the shipping partner integration, this means that once it's deployed to your own infrastructure, ICP is where you'd go to check whether it's running, redeploy it after a change, and see whether the partner's API has been responding slowly, all from a single dashboard.

<ThemedImage
    alt="WSO2 Integration Control Plane (ICP)"
    sources={{
        light: useBaseUrl('/img/platform-overview/icp.png'),
        dark: useBaseUrl('/img/platform-overview/icp.png'),
    }}
/>

---

## 4. WSO2 Integration Platform Across the Lifecycle

[Integration Lifecycle](#2-the-integration-lifecycle-a-mental-model) walked through everything you do when building an integration, step by step. What matters most as a developer: once the design is agreed, WSO2 Integration Platform covers everything from there onward, building, testing, deploying, managing, and understanding how your integration behaves once it's live. You don't need to bring in separate tools for each of these steps.

To show where each platform component fits, let's look at this same integration journey at a higher level, in five broader phases. This view sets aside the distinction between test environments such as Staging and UAT: you build once, then promote that same artifact through whichever tiers your pipeline uses, so the same components apply no matter which tier you're in.

**Develop and Test → Deploy and Run → Manage → Observe → Improve**

<ThemedImage
    alt="WSO2 Integration Engineering Lifecycle"
    sources={{
        light: useBaseUrl('/img/platform-overview/Integration-engineering-lifecycle.png'),
        dark: useBaseUrl('/img/platform-overview/Integration-engineering-lifecycle.png'),
    }}
/>

The table below shows where each WSO2 Integration Platform component fits in these phases. It is a simplified view rather than a catalogue of everything the platform does, and the **toolset you use depends on where the integration runs and who operates it**:

- **Fully self-hosted:** the organization runs and operates everything itself
- **Fully managed iPaaS:** WSO2 runs and operates everything instead
- **Private or hybrid:** WSO2 operates things centrally, while the organization runs the integrations on its own infrastructure; covered in [Deployment Models](#7-deployment-models)

<table>
  <thead>
    <tr>
      <th>Phase</th>
      <th>Self-Hosted</th>
      <th>Fully Managed iPaaS (WSO2 Integration Cloud)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Develop and Test</strong></td>
      <td colspan="2">WSO2 Integrator. The development experience does not change based on where the integration will eventually run.</td>
    </tr>
    <tr>
      <td><strong>Deploy and Run</strong></td>
      <td>Runs on infrastructure the organization manages: Kubernetes, OpenShift, Docker, virtual machines, bare metal, or public/private cloud.</td>
      <td>Runs on a cloud environment hosted and managed by WSO2.</td>
    </tr>
    <tr>
      <td><strong>Manage</strong></td>
      <td>WSO2 Integration Control Plane (ICP), self-hosted by the organization.</td>
      <td>Centralized management hosted and operated by WSO2, as part of WSO2 Integration Cloud.</td>
    </tr>
    <tr>
      <td><strong>Observe</strong></td>
      <td>ICP surfaces health information, metrics, and aggregated logs directly, and can also integrate with an organization's existing or third-party observability tools rather than requiring everything to go through ICP.</td>
      <td>Provided as part of the managed cloud experience.</td>
    </tr>
  </tbody>
</table>

Once Observe reveals how the integration is behaving in production, that feedback loops back into Develop and Test, using the same tooling. This **Improve** phase is what closes the lifecycle into a continuous cycle rather than a one-time delivery.

Together, these capabilities form WSO2 Integration Platform, providing **one engineering foundation** from initial **design through to production** operations.

---

## 5. Integration Styles Supported

Integration used to mean something fairly narrow: getting one enterprise application talking to another. That picture is far too small today. A capability might need to be exposed as an API for outside systems to call. A process might need to react the instant something changes elsewhere. A SaaS application might need syncing on a recurring schedule without anyone triggering it manually. A partner might drop off a file that needs to be picked up and processed automatically. Or an AI agent might need to reason about a request, retrieve relevant context, and decide what action to take next.

On the surface, these look like different kinds of work. Underneath, they rely on the same set of engineering concerns: connectivity, data transformation, sequencing, security, failure handling, and visibility into runtime behavior. WSO2 Integration Platform treats these as different forms of the same underlying problem rather than separate disciplines, with WSO2 Integrator providing one consistent development experience across all of them. In practice, that shows up as a handful of recurring styles:

- **Integration as API:** exposing a business capability for other systems or consumers to call
- **Automations:** scheduled or triggered tasks, such as periodically synchronizing SaaS applications
- **Event-driven integrations:** reacting immediately when something changes elsewhere
- **File-driven integrations:** processing a file as soon as it is received
- **Workflows:** orchestrating multi-step business processes
- **AI agents:** enabling an AI agent to securely access and act on enterprise systems

The shipping partner integration from the introduction is itself an example of Integration as API: it calls the partner's API directly and handles the response, including what happens if the call fails.

<ThemedImage
    alt="Integration styles supported by WSO2 Integration Platform"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-styles.png'),
        dark: useBaseUrl('/img/platform-overview/integration-styles.png'),
    }}
/>

The clearest force reshaping this picture right now is AI, though not in the way it's often framed: **AI does not reduce the need for integration, it depends on it**. An agent can only act on what it can reach, and reaching enterprise systems, whether that's an API, a database, an application, a knowledge base, or a running business process, is exactly what integration provides. WSO2 Integration Platform treats AI as part of the same integration landscape rather than a separate concern, so deterministic logic (validation, transformation, routing) can coexist with non-deterministic AI reasoning inside the same integration flow.

<ThemedImage
    alt="AI in integration: AI assists development and AI participates in execution"
    sources={{
        light: useBaseUrl('/img/platform-overview/ai-in-integration.png'),
        dark: useBaseUrl('/img/platform-overview/ai-in-integration.png'),
    }}
/>

---

## 6. Architecture: Data, Control, and Observability Planes

Once an integration is built, its architecture spans three planes, each responsible for a different concern:

- The **data plane** is where the integration actually executes and processes traffic.
- The **control plane** provides the capabilities to deploy, manage, and operate integrations running in the data plane.
- The **observability plane** provides visibility into integration health and behavior once integrations are running.

For the shipping partner integration from the introduction, this means the flow itself executes in the data plane, gets deployed and operated through the control plane, and its behavior, including whether the partner's API is responding slowly, becomes visible through the observability plane.

<ThemedImage
    alt="WSO2 Integration Platform architecture: data, control, and observability planes"
    sources={{
        light: useBaseUrl('/img/platform-overview/platform-architecture.png'),
        dark: useBaseUrl('/img/platform-overview/platform-architecture.png'),
    }}
/>

The specific responsibilities of the control plane and observability plane are described in detail in [Management and Observability](#8-management-and-observability). The physical location in which these planes run is addressed in [Deployment Models](#7-deployment-models).

---

## 7. Deployment Models

WSO2 Integration Platform lets organizations choose where the control plane, observability plane, and data plane run, without changing how integrations are built. An integration developed in WSO2 Integrator does not need to be modified based on its eventual deployment target.

In practice, this results in three deployment models:

1. **Fully self-hosted:** The control plane (via ICP), the observability plane, and the data plane all run on infrastructure managed by the organization: Kubernetes, OpenShift, Docker, virtual machines, bare metal, or public/private cloud.
2. **Fully managed iPaaS:** WSO2 manages the control plane, the observability plane, and the data plane, all as part of the same managed cloud experience.
3. **Private or hybrid:** WSO2 manages the control plane and observability plane centrally, while integrations run on a private data plane on dedicated infrastructure.

<ThemedImage
    alt="WSO2 Integration Platform deployment models: fully self-hosted, fully managed iPaaS, and private/hybrid"
    sources={{
        light: useBaseUrl('/img/platform-overview/deployment-models.png'),
        dark: useBaseUrl('/img/platform-overview/deployment-models.png'),
    }}
/>

In summary: **the control plane determines how integrations are managed, the observability plane determines how their behavior is understood, and the data plane determines where they run.** Regardless of which deployment model is used, the development process remains the same, and integrations can follow a standard delivery lifecycle: build, test, commit to source control, deploy through CI/CD, validate, and promote toward production.

---

## 8. Management and Observability

Deployment is not the end of an integration's lifecycle. Once integrations are handling live traffic, an organization needs two related but distinct capabilities: a way to manage them centrally, and a way to understand what they are actually doing at runtime.

### 8.1 Management

Management is the responsibility of the control plane. It covers the centralized deployment, operation, and governance of integrations across an organization's entire integration landscape, rather than treating each integration as something administered on its own. This is what allows a team running many integrations, across many environments, to deploy, control, and govern them consistently instead of managing each one individually.

For self-hosted deployments, this is provided by the WSO2 Integration Control Plane (ICP), which gives teams a centralized place to deploy, manage, and operate their integrations. For managed cloud deployments, equivalent management capabilities are provided as part of the cloud experience.

:::info Beyond management
ICP is not limited to management actions alone. It also surfaces health information, metrics, and aggregated logs alongside its deployment and operational controls, giving self-hosted teams a single place where centralized management and a first layer of observability data come together, rather than requiring a separate tool for each.

### 8.2 Observability

Observability addresses a different question: not "can we control this centrally," but "can we understand what it is doing, and why." Once an integration is handling live traffic, it becomes necessary to determine whether it is functioning correctly, which dependencies are underperforming, and where failures are occurring.

With a single integration, reviewing a log file may be sufficient. As the number of integrations in production grows, this approach becomes impractical, because failures can appear disconnected from their actual cause when information is spread across many systems. Observability addresses this using logs, metrics, and distributed traces.

Two distinct activities sit under **observability**, and it is worth keeping them apart:

- **Monitoring** answers *"is it behaving as expected?"* It watches known indicators and alerts when they fall outside expected ranges. Useful for problems you anticipated.
- **Diagnosis** answers *"why is it behaving this way?"* It uses logs, metrics, and distributed traces to explain what is actually happening inside a distributed system. Useful for problems you did not anticipate.

Monitoring tells a team that the shipping partner integration has slowed down. Diagnosis tells them the delay is coming from the partner's API rather than from their own transformation logic. WSO2 supports both, and can feed this data into an organization's existing or third-party observability tools rather than requiring a separate stack.

<ThemedImage
    alt="Observability: logs, metrics, and distributed traces feeding monitoring and diagnosis"
    sources={{
        light: useBaseUrl('/img/platform-overview/observability.png'),
        dark: useBaseUrl('/img/platform-overview/observability.png'),
    }}
/>

---

## 9. Summary

<ThemedImage
    alt="WSO2 Integration Platform at a glance: develop, build, deploy and run, manage and observe"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-paltform-glance.png'),
        dark: useBaseUrl('/img/platform-overview/integration-paltform-glance.png'),
    }}
/>

Viewed individually, the capabilities of WSO2 Integration Platform, including a visual designer, an AI assistant, a programming language, connectors, deployment options, a control plane, and observability tooling, each address a specific concern. Their combined value lies in how they work together, allowing a developer to start from a business requirement, such as connecting two systems, exposing a capability as an API, or enabling an AI agent to act on enterprise data, and carry it through design, development, deployment, and production operation within a single, consistent platform.

Returning to the example that opened this document: connecting an order system to a shipping partner's API is not just a connectivity task. It moves through the full [integration lifecycle](#2-the-integration-lifecycle-a-mental-model), built and tested in WSO2 Integrator, deployed and validated through staging before reaching production, managed centrally through the control plane, and observed continuously so the team understands its behavior over time.

The objective of WSO2 Integration Platform is not only to make integration code easier to write, but to make **integration engineering easier from initial concept through to production.**

---

# Where to go next

- [Concepts](../get-started/concepts/concepts.mdx): Learn the vocabulary used across WSO2 Integration Platform, from organizations and projects to deployment and observability.
- [Local setup](../get-started/setup/setup.md): Install WSO2 Integrator and set up your local development environment.
- [Quickstarts](../get-started/quickstarts/build-integration-api.md): Build your first integration in under 10 minutes: an API, automation, AI agent, event-driven, or file-driven integration.
- [Choosing a control plane](../manage.md): Compare WSO2 Cloud and the self-hosted Integration Control Plane (ICP) to pick the one that fits your deployment.

---
