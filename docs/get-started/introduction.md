---
title: Introduction
---

# Introduction

The WSO2 Integration Platform is a 100% open-source integration solution for connecting AI agents, APIs, data, and events across cloud, on-prem, and hybrid environments. It combines low-code simplicity with pro-code power through an AI-assisted development experience, and it is designed to take you from a first integration on your laptop to a managed, observable deployment at scale.

## Design and run

Working with the WSO2 Integration Platform breaks down into two activities. You design integrations in the IDE, and you run and manage them on the runtime of your choice.

### WSO2 Integrator IDE

The **WSO2 Integrator IDE** is where you design, build, and test integrations. It offers:

- A visual designer and a code editor in full parity. Every change in one view appears instantly in the other, with no export step and no loss of fidelity.
- AI-assisted development across both views, so you can move from intent to working integration quickly.

### Run and manage

Integrations built in the IDE can run in two ways, and you can pick the one that fits your operational model.

**WSO2 Integration Cloud (SaaS).** A fully-managed iPaaS, operated by WSO2. WSO2 Integration Cloud handles build pipelines, environments, deployment tracks, observability, and zero-downtime promotion across development, staging, and production.

**Self-hosted (open source).** Run the platform on your own Kubernetes, Docker, VMs, or bare metal. You retain full control over data sovereignty, infrastructure choices, and your own CI/CD and observability stack. Your integrations never leave your perimeter, and the platform supports air-gapped environments.

## Architecture

![WSO2 Integrator architecture diagram](@site/src/assets/img/get-started/overview-and-architecture/integrator_diagram.webp)

The platform is organized into a small number of clearly separated planes, each with a focused responsibility. The diagram above shows the architecture as it appears in WSO2 Integration Cloud. Self-hosted deployments use a simpler topology that maps to the same essential planes.

### Development tools

The **WSO2 Integrator IDE** is the entry point for developers. It produces the source artifacts that the rest of the platform deploys, runs, and observes.

### Control plane

The control plane is the operations brain of the platform. It is where admins and DevOps users perform the three core lifecycle actions: deploy, manage, and observe.

The control plane does not run your integrations. Its job is to orchestrate the data plane and interpret the observability plane. The control plane shown in the diagram is the one provided by WSO2 Integration Cloud. In self-hosted deployments, these actions can be managed by the Integration Control Plane or through your own tooling and pipelines.

### Data plane

The data plane is the infrastructure on which your integrations actually run. The data plane can be:

- **WSO2-managed**: provisioned and operated by WSO2 as part of WSO2 Integration Cloud.
- **Private (cloud)**: running in your own AWS, Azure, GCP, OpenShift, or Kubernetes environment, but still managed through WSO2 Integration Cloud's control plane.
- **Self-hosted**: running entirely on your own infrastructure, managed end-to-end by you.

### Observability plane

The observability plane integrates with the tools you already use: ELK, Grafana, Zipkin, Prometheus, Jenkins, and others. Your existing operational dashboards, alerting, and incident workflows continue to work without changes.

### External systems

Integrations connect to external systems and services such as SAP, Salesforce, Snowflake, Twilio, OpenAI, and HubSpot through typed connectors and connections defined at design time.

## What makes it different

### 100% low-code and pro-code parity

Every integration can be built two ways, and both stay in sync. Add components through a graphical interface, configure properties visually, and see the flow as a diagram. Or write code directly with full IDE support, auto-complete, and type checking.

### Powered by Ballerina

Under the hood, every integration is a Ballerina program. This gives you cloud-native primitives (HTTP, gRPC, GraphQL, WebSocket, Kafka, and more) built into the language, type-safe data handling that catches mapping errors at compile time, and a rich standard library for data formats, protocols, and connectors.

### AI-assisted, AI-ready

The platform ships with **WSO2 Integrator Copilot** to assist during design and development. On the runtime side, the platform first-classes AI workloads. You can build AI agents, MCP servers, and RAG workflows as native integration types alongside APIs, automations, and event handlers.

## What's next

- [Concepts](concepts/overview.md) — learn the vocabulary used across the platform
- [Install WSO2 Integrator](setup/install.md) — set up the IDE and create your first integration
- [Integration artifacts](/docs/develop/integration-artifacts/integration-artifacts) — choose the right artifact for your use case
