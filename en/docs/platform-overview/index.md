---
id: platform-overview
title: Platform Overview
sidebar_label: Platform Overview
sidebar_position: 1
description: Understand the Choreo Integration, its development model, integration styles, deployment architecture, and operational lifecycle.
keywords:
  - Choreo Integration
  - Choreo Integrator
  - Choreo Agent Builder
  - Choreo Agent Manager
  - integration development
  - integrations as APIs
  - event-driven integration
  - file-driven integration
  - AI agents
  - connectors
  - control plane
  - data plane
slug: /platform-overview
pagination_next: null
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Overview

## What is Choreo Integration?

Choreo Integration is a platform for building, running, and managing integrations that connect applications, APIs, data, events, and AI agents across cloud, on-premises, and hybrid environments. It is built on open-source foundations and open standards, and is available both as a fully managed service and as a self-hosted deployment.

It supports the integration lifecycle, from development and testing through deployment, management, and observability. Visual design, source code, AI assistance, and enterprise connectivity work together in a consistent development experience.

The platform separates how you develop an integration from where it runs and how it is operated, giving you flexibility to choose the deployment model that fits your organization.

<ThemedImage
    alt="Choreo Integration architecture: development tools, control plane, data plane and observability plane, connecting developers, operators, consumers and enterprise systems"
    sources={{
        light: useBaseUrl('/img/platform-overview/choreo-platform-architecture-v1.0.png'),
        dark: useBaseUrl('/img/platform-overview/choreo-platform-architecture-v1.0.png'),
    }}
/>

## What can you build?

Choreo Integration supports several integration styles using shared capabilities for connectivity, data transformation, orchestration, security, and error handling.

| Integration Style | What you can do | 
|---|---|
| Integrations as APIs | Expose business capabilities as APIs and connect multiple backend systems behind a single service. |
| Automations | Run scheduled or triggered tasks, such as synchronizing data between SaaS applications. |
| Event-driven integrations | Publish, consume, and react to events and messages from applications and message brokers. | 
| File-driven integrations | Receive, transform, and exchange files across systems.| 
| Workflows | Coordinate multi-step business processes, including long-running processes that wait for events, timers, or human decisions. | 
| AI Agents | Combine integration logic with AI reasoning, and enable agents to access enterprise data and take action through tools. | 
| MCP servers | Expose integrations as Model Context Protocol (MCP) tools, so AI assistants and agents can discover and call your enterprise capabilities through a governed boundary. | 

AI serves two roles in the platform: it assists developers in building integrations, and it can participate in execution through AI services and agents.

<ThemedImage
    alt="AI assists developers in building integrations, and it can participate in execution through AI services and agents"
    sources={{
        light: useBaseUrl('/img/platform-overview/choreo-ai-in-integration-v1.0.png'),
        dark: useBaseUrl('/img/platform-overview/choreo-ai-in-integration-v1.0.png'),
    }}
/>

## Platform components

The platform brings together following core components.

### Choreo Integrator

Choreo Integrator is the editor where integrations are built and tested. It is available as an installable desktop application and a browser-based editor through Choreo Cloud.

It combines:

- Visual development to design and refine integration flows.
- AI assistance to generate integrations, create data mappings, and explain or troubleshoot integration logic.
- Source code editing for custom logic and precise control.
- Testing and debugging to validate behavior before deployment.
- Visual and code representations remain synchronized, allowing you to move between them as you develop.

Choreo Integrator is powered by [Ballerina](https://ballerina.io/), a programming language designed for integration. Prior knowledge of Ballerina is **not required** to begin: you can start with APIs, connectors, mappings, and workflows, then use the underlying code when needed.

### Choreo Agent Builder

Choreo Agent Builder is the editor where AI agents are built, tested, and evaluated. It is available as an installable desktop application.

It combines:

- Visual development to design agents, their tools, knowledge, memory, and the triggers that invoke them.
- AI assistance from Choreo Agent Builder Copilot to build, change, run, test, and evaluate agents in a chat.
- Source code editing for custom logic and precise control.
- Testing and evaluations to check how an agent behaves before deployment.

Like Choreo Integrator, Choreo Agent Builder is powered by [Ballerina](https://ballerina.io/), and prior knowledge of Ballerina is **not required** to begin.

### Choreo Agent Manager

Choreo Agent Manager is where you deploy, run, and observe your agents. Agents built in Choreo Agent Builder can be deployed on Choreo Agent Manager, or registered there when they run on your own infrastructure, so their traces appear in one place.

### Choreo Cloud

[Choreo Cloud](https://console.cloud.choreolabs.com/) is a managed environment for building and running integrations. Choreo Labs operates the underlying infrastructure, allowing your team to focus on integration development.

You can develop in the cloud editor, import an existing integration from a source repository, or start with a pre-built sample. The managed service provides deployment, scaling, availability, management, and observability capabilities.

### Choreo Integration Control Plane (ICP)

Choreo Integration Control Plane is a centralized place to manage self-hosted integrations.

It provides visibility across projects and environments, helping teams deploy integrations, check their status, and manage ongoing operations from one console.

ICP also surfaces health information, metrics, and aggregated logs. But for self-hosted deployments, you aren't limited to ICP, Choreo Integrator is designed to integrate seamlessly with your organization's existing observability stack.

### Connectors

Connectors provide pre-built, typed connectivity to external systems, including SaaS applications, databases, APIs, cloud services, and message brokers.

They simplify authentication, requests, and data handling, reducing the need to implement connectivity from scratch. Typed operations and data models help you work with external services consistently within your integration.

You can choose connectors from the Choreo Connector Store or generate connectors from API descriptions such as OpenAPI specifications and WSDL files.

## Choose your deployment model

Integrations developed in Choreo Integrator, and agents developed in Choreo Agent Builder, can run in managed or self-hosted environments. The development experience remains consistent; the deployment model determines where integrations execute and who operates the infrastructure.

| Deployment model | Where integrations run | Management and observability | Infrastructure responsibility |
|---|---|---|---|
| Fully managed iPaaS | Choreo-managed cloud infrastructure | Provided through Choreo Cloud | Choreo Labs operates the platform and runtime infrastructure.|
| Fully self-hosted | Your infrastructure, including Kubernetes, OpenShift, containers, virtual machines, bare metal, or public/private cloud | Your team operates ICP (or Choreo Agent Manager for agents) and the observability infrastructure | Your organization operates the entire environment.| 

{/* TODO(v3): this diagram still shows a private data plane, which is not in v3. Needs redrawing. */}

<ThemedImage
    alt="Deployment models: self-hosted, where you run both the control plane (ICP) and the data plane, and Choreo Cloud (iPaaS), where Choreo manages the control plane and the cloud data plane"
    sources={{
        light: useBaseUrl('/img/platform-overview/choreo-deployment-options-v1.0.png'),
        dark: useBaseUrl('/img/platform-overview/choreo-deployment-options-v1.0.png'),
    }}
/>

You can select a model based on your requirements for infrastructure control, data residency, operational ownership, and managed services.

##  From development to production

The platform supports a continuous integration lifecycle:

| Phase | What happens | 
|---|---|
| Develop and test | Build integration logic in Choreo Integrator, or agents in Choreo Agent Builder, using connectors, visual design, code, and AI assistance. Test and debug before release; for agents, run evaluations too. | 
| Build and deploy | Package the integration, run automated checks, and deploy it through your delivery pipeline. Validate and promote it across environments. | 
| Manage | Operate integrations centrally through ICP or the managed cloud experience, and agents through Choreo Agent Manager. | 
| Observe | Use health information, logs, metrics, and distributed traces to monitor behavior and investigate failures. | 

<ThemedImage
    alt="Integration lifecycle with Choreo Integration"
    sources={{
        light: useBaseUrl('/img/platform-overview/choreo-integration-lifecycle-v1.0.png'),
        dark: useBaseUrl('/img/platform-overview/choreo-integration-lifecycle-v1.0.png'),
    }}
/>

## How the platform fits together 

The architecture separates three responsibilities: 

- Data plane: Executes integrations and processes requests, events, messages, and data.
- Control plane: Provides centralized deployment, management, and operational controls.
- Observability plane: Collects and presents information about integration health and runtime behavior.

In a managed deployment, Choreo Labs operates these capabilities as part of the service. In a self-hosted deployment, your organization operates them using ICP or Choreo Agent Manager, and your chosen infrastructure and observability tools.

The platform supports OpenTelemetry, allowing logs, metrics, and traces to feed into compatible observability systems.

# Where to go next

- [Concepts](../get-started/concepts/concepts.mdx): Learn the vocabulary used across Choreo Integration, from organizations and projects to deployment and observability.
- [Setup](../get-started/setup/setup.md): Set up your development environment.
- [Quickstarts](../get-started/quickstarts/build-integration-api.md): Build your first integration in under 10 minutes: an API, automation, AI agent, event-driven, or file-driven integration.
