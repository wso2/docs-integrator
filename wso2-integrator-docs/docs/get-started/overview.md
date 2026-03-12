---
sidebar_position: 1
title: Overview & Architecture
description: What WSO2 Integrator is and how it works at a high level.
---

# Overview & Architecture

WSO2 Integrator is a Ballerina-powered integration platform that combines low-code simplicity with pro-code power. You design integrations visually in VS Code, and the platform generates production-ready Ballerina code — or you write code directly and see it reflected in the visual designer.

## High-Level Architecture

<!-- TODO: Add architecture diagram: Visual Designer → Ballerina Runtime → Deployment Targets -->

The platform follows a three-layer architecture:

1. **Design time** — VS Code extension with visual designer, code editor, and AI assistance
2. **Runtime** — Ballerina-powered execution engine with built-in networking, concurrency, and type safety
3. **Deployment** — Deploy anywhere: Docker, Kubernetes, cloud providers, or WSO2 Devant (iPaaS)

## Low-Code / Pro-Code Duality

This is the key differentiator. Every integration can be built two ways, and both stay in sync:

- **Low-code (visual designer)** — Drag-and-drop components, configure properties visually, see the flow as a diagram
- **Pro-code (Ballerina editor)** — Write code directly with full IDE support, auto-complete, and type checking

Changes in one view are instantly reflected in the other. There's no "export" step and no loss of fidelity.

## Powered by Ballerina

Under the hood, every integration is a Ballerina program. This means:

- **Cloud-native by design** — Built-in support for HTTP, gRPC, GraphQL, WebSocket, Kafka, and more
- **Type-safe data handling** — Catch data mapping errors at compile time, not in production
- **Sequence diagrams as code** — Ballerina's unique sequence diagram view shows exactly how your integration communicates with external systems
- **Standard library** — Rich set of packages for data formats (JSON, XML, CSV, EDI), protocols, and connectors

## What's Next

- [Why WSO2 Integrator](why-wso2-integrator.md) — How it compares to alternatives
- [Key Concepts](key-concepts.md) — Learn the vocabulary
- [Install VS Code Extension](install.md) — Get set up
