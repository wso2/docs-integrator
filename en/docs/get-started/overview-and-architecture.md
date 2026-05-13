---
sidebar_position: 1
title: Overview and Architecture
description: Introduction to WSO2 Integrator, how it works.
---

# Overview and Architecture

WSO2 Integrator is a 100% open-source integration solution that allows you to connect AI agents, APIs, data, and events across cloud, on-prem, and hybrid environments, and build any type of integration and AI agent. The AI-assisted development experience provides 100% low-code and pro-code parity, enabling you to combine low-code simplicity with pro-code power.

## High-level architecture

![WSO2 Integrator architecture diagram](@site/src/assets/img/get-started/overview-and-architecture/ArchitectureImage.png)

The platform follows a three-layer architecture:

1. Design time: The WSO2 Integrator IDE with a visual designer and a code editor (both enhanced by AI assistance).
2. Runtime: A Ballerina-powered execution engine with built-in networking, concurrency, and type safety.
3. Deployment: Available as self-hosted software that can be deployed on Docker, Kubernetes, cloud, and VMs, or as a fully-managed SaaS.

## Run it your way

WSO2 Integrator is available as 100% open-source self-hostable software or as a SaaS.

### Self-hosted
Full control over your stack. Deploy directly to your own servers, bare metal, or a private cloud environment. Your data never leaves your perimeter.
- Complete data sovereignty
- Air-gapped environment support
- Kubernetes, Docker, VM, or bare metal
- Bring your own CI/CD pipeline

### SaaS
Zero infrastructure to manage. WSO2 handles provisioning, upgrades, scaling, and availability. Get started in minutes.
- Data plane anywhere you want
- Centralized control and observability
- Continuous updates, zero downtime
- Multi-region availability

## 100% low-code and pro-code parity

This is the key differentiator. Every integration can be built two ways, and both stay in sync:

- Low-code (Graphical designer): Add components through a graphical interface, configure properties visually, and see the flow as a diagram
- Pro-code (Ballerina editor): Write code directly with full IDE support, auto-complete, and type checking

Changes in one view are instantly reflected in the other. There's no "export" step and no loss of fidelity. Both experiences are further enhanced by AI assistance to speed up development.

## Powered by Ballerina

Under the hood, every integration is a Ballerina program. This means:

- Cloud-native by design: Built-in support for HTTP, gRPC, GraphQL, WebSocket, Kafka, and more
- Type-safe data handling: Catch data mapping errors at compile time, not in production
- Sequence diagrams as code: Ballerina's unique sequence diagram view shows exactly how your integration communicates with external systems
- Standard library: Rich set of packages for data formats (JSON, XML, CSV, EDI), protocols, and connectors

## Next steps

- [Why WSO2 Integrator](why.md) : How it compares to alternatives
- [Key Concepts](key-concepts.md) : Learn the vocabulary
- [Install WSO2 Integrator](install.md) : Get set up
