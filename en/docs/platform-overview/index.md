---
id: platform-overview
title: Platform overview
sidebar_label: Platform Overview
sidebar_position: 1
description: Understand the WSO2 Integration Platform, its development model, integration styles, deployment architecture, and operational lifecycle.
keywords:
  - WSO2 Integration Platform
  - WSO2 Integrator
  - integration development
  - integrations as APIs
  - event-driven integration
  - file-driven integration
  - AI agents
  - connectors
  - control plane
  - data plane
slug: /platform-overview
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Overview

## What is WSO2 Integration Platform?

WSO2 Integration Platform is an open-source platform for building, running, and managing integrations that connect applications, APIs, data, events, and AI agents across cloud, on-premises, and hybrid environments.

It supports the integration lifecycle, from development and testing through deployment, management, and observability. Visual design, source code, AI assistance, and enterprise connectivity work together in a consistent development experience.

The platform separates how you develop an integration from where it runs and how it is operated, giving you flexibility to choose the deployment model that fits your organization.

<ThemedImage
    alt="WSO2 Integration Platform is an open-source platform for building, running, and managing integrations"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-platform-overview.png'),
        dark: useBaseUrl('/img/platform-overview/integration-platform-overview.png'),
    }}
/>

## What can you build?

WSO2 Integration Platform supports several integration styles using shared capabilities for connectivity, data transformation, orchestration, security, and error handling.

| Integration Style | What you can do | 
|---|---|
| Integration APIs | Expose business capabilities as APIs and connect multiple backend systems behind a single service. |
| Automations | Run scheduled or triggered tasks, such as synchronizing data between SaaS applications. |
| Event-driven integrations | Publish, consume, and react to events and messages from applications and message brokers. | 
| File-driven integrations | Receive, transform, and exchange files across systems.| 
| Workflows | Coordinate multi-step business processes, including long-running processes that wait for events, timers, or human decisions. | 
| AI Agents | Combine integration logic with AI reasoning, and enable agents to access enterprise data and take action through tools. | 

AI serves two roles in the platform: it assists developers in building integrations, and it can participate in execution through AI services and agents.

<ThemedImage
    alt="AI assists developers in building integrations, and it can participate in execution through AI services and agents"
    sources={{
        light: useBaseUrl('/img/platform-overview/role-of-AI.png'),
        dark: useBaseUrl('/img/platform-overview/role-of-AI.png'),
    }}
/>

## Platform components

The platform brings together following core components.

### WSO2 Integrator

WSO2 Integrator is the editor where integrations are built and tested. It is available as an installable desktop application and a browser-based editor through WSO2 Integration Cloud.

It combines:

- Visual development to design and refine integration flows.
- AI assistance to generate integrations, create data mappings, and explain or troubleshoot integration logic.
- Source code editing for custom logic and precise control.
- Testing and debugging to validate behavior before deployment.
- Visual and code representations remain synchronized, allowing you to move between them as you develop.

WSO2 Integrator is powered by [Ballerina](https://ballerina.io/), a programming language designed for integration. Prior knowledge of Ballerina is **not required** to begin: you can start with APIs, connectors, mappings, and workflows, then use the underlying code when needed.

### WSO2 Integration Cloud (WSO2 iPaaS)

[WSO2 Integration Cloud](https://console.devant.dev/) is a managed environment for building and running integrations. WSO2 operates the underlying infrastructure, allowing your team to focus on integration development.

You can develop in the cloud editor, import an existing integration from a source repository, or start with a pre-built sample. The managed service provides deployment, scaling, availability, management, and observability capabilities.

### WSO2 Integration Control Plane (ICP)

WSO2 Integration Control Plane is a centralized place to manage self-hosted integrations.

It provides visibility across projects and environments, helping teams deploy integrations, check their status, and manage ongoing operations from one console.

ICP also surfaces health information, metrics, and aggregated logs. But for self-hosted deployments, you aren't limited to ICP, WSO2 Intgerator is designed to integrate seamlessly with your organization's existing observability stack.


### Connectors

Connectors provide pre-built, typed connectivity to external systems, including SaaS applications, databases, APIs, cloud services, and message brokers.

They simplify authentication, requests, and data handling, reducing the need to implement connectivity from scratch. Typed operations and data models help you work with external services consistently within your integration.

You can choose connectors from the WSO2 Connector Store or generate connectors from API descriptions such as OpenAPI specifications and WSDL files.

## Choose your deployment model

Integrations developed in WSO2 Integrator can run in managed or self-hosted environments. The development experience remains consistent; the deployment model determines where integrations execute and who operates the infrastructure.

| Deployment model | Where integrations run | Management and observability | Infrastructure responsibility |
|---|---|---|---|
| Fully managed iPaaS | WSO2-managed cloud infrastructure | Provided through WSO2 Integration Cloud | WSO2 operates the platform and runtime infrastructure.|
| Fully self-hosted | Your infrastructure, including Kubernetes, OpenShift, containers, virtual machines, bare metal, or public/private cloud | Your team operates ICP and the observability infrastructure | Your organization operates the entire environment.| 
| Private or hybrid | A private data plane or dedicated infrastructure | WSO2 manages control and observability capabilities centrally | Runtime infrastructure responsibility depends on the selected arrangement. |

<ThemedImage
    alt="Integration lifecycle from Design through Develop and Test, Build, Deploy, Validate, Promote, Manage and Observe, to Improve or Retire"
    sources={{
        light: useBaseUrl('/img/platform-overview/deployment-model.png'),
        dark: useBaseUrl('/img/platform-overview/deployment-model.png'),
    }}
/>

You can select a model based on your requirements for infrastructure control, data residency, operational ownership, and managed services.

##  From development to production

The platform supports a continuous integration lifecycle:

| Phase | What happens | 
|---|---|
| Develop and test | Build integration logic in WSO2 Integrator using connectors, visual design, code, and AI assistance. Test and debug it before release. | 
| Build and deploy | Package the integration, run automated checks, and deploy it through your delivery pipeline. Validate and promote it across environments. | 
| Manage | Operate integrations centrally through ICP or the managed cloud experience. | 
| Observe | Use health information, logs, metrics, and distributed traces to monitor behavior and investigate failures. | 

<ThemedImage
    alt="Integration lifecycle with WSO2 Integration Platform"
    sources={{
        light: useBaseUrl('/img/platform-overview/integration-lifecycle.png'),
        dark: useBaseUrl('/img/platform-overview/integration-lifecycle.png'),
    }}
/>

## How the platform fits together 

The architecture separates three responsibilities: 

- Data plane: Executes integrations and processes requests, events, messages, and data.
- Control plane: Provides centralized deployment, management, and operational controls.
- Observability plane: Collects and presents information about integration health and runtime behavior.

In a managed deployment, WSO2 operates these capabilities as part of the service. In a self-hosted deployment, your organization operates them using ICP and your chosen infrastructure and observability tools.

The platform supports OpenTelemetry, allowing logs, metrics, and traces to feed into compatible observability systems.

# Where to go next

- [Concepts](../get-started/concepts/concepts.mdx): Learn the vocabulary used across WSO2 Integration Platform, from organizations and projects to deployment and observability.
- [Local setup](../get-started/setup/setup.md): Install WSO2 Integrator and set up your local development environment.
- [Quickstarts](../get-started/quickstarts/build-integration-api.md): Build your first integration in under 10 minutes: an API, automation, AI agent, event-driven, or file-driven integration.
- [Choosing a control plane](../manage.md): Compare WSO2 Cloud and the self-hosted Integration Control Plane (ICP) to pick the one that fits your deployment.
