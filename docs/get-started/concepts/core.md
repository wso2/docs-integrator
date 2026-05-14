---
title: Core Concepts
---

# Core Concepts

This page introduces every major building block you work with when designing and building integrations in the WSO2 Integrator IDE. Use it as a vocabulary reference before diving into the [Develop](/docs/develop/integration-artifacts/integration-artifacts) section, where each concept is covered in full detail.

## Organization

An organization is the top-level boundary that owns all integration-related resources and the users who work with them. Every project, integration, and deployment belongs to exactly one organization.

In the WSO2 Integrator IDE, the organization is declared as the `org` field in your project's package descriptor (`Ballerina.toml`). It identifies who owns the source code and forms part of the fully qualified name of every artifact you build, for example `acme/payments:1.0.0`. The organization name acts as a namespace for source artifacts, disambiguating packages, libraries, and integrations across the wider ecosystem.

When you push code to WSO2 Integration Cloud, the organization name in your `Ballerina.toml` must correspond to an organization you are a member of in the cloud.

## Project

A project is a workspace that groups related integrations together. It is the unit of co-development: the integrations inside a project are designed, versioned in Git, and pushed to WSO2 Integration Cloud together, even though each one remains independently buildable and deployable.

A project is not itself a package. It is a container for packages: each integration inside a project is its own package with its own `Ballerina.toml`, its own version, and its own deployment lifecycle. The project provides the shared boundary; the integrations provide the deployable units.

A project typically contains:

- One or more integrations, each in its own directory with its own `Ballerina.toml`
- Shared configuration that applies across the integrations
- Any project-level metadata used by the IDE and WSO2 Integration Cloud

A single Git repository commonly holds one project, with each integration under a different path within the repository (a monorepo layout).

## Integration

An integration is a single unit of work that connects systems, transforms data, or orchestrates a workflow. It is the core building block of the platform and, at the source level, the unit of distribution.

Each integration is its own package: a self-contained directory with its own `Ballerina.toml` file, its own dependencies, and its own version. The package is identified by the combination of its organization name, package name, and version, for example `acme/payments:1.0.0`. This fully qualified name is how the integration is referenced for distribution, deployment, and dependency resolution.

In the IDE, you compose an integration from constructs such as automations, AI agents, services, event handlers, and file processors. Each integration has a specific type that determines how it is triggered and how it runs.

When you push an integration to WSO2 Integration Cloud, the same integration becomes a unit of deployment: a single pod in the data plane that can be scaled and managed independently.

## Endpoint

An endpoint is a network-exposed function within an integration.

You declare endpoints in integrations of type Integration as API. Each endpoint defines a path, the HTTP verbs (or equivalent for GraphQL/TCP) it accepts, an optional service contract (OpenAPI or GraphQL SDL), and the handler logic that runs when it is invoked.

A single integration can expose multiple endpoints. When deployed to WSO2 Integration Cloud, each endpoint is treated as an independently manageable API: lifecycle, security, and exposure settings can differ from one endpoint to the next within the same integration.

## Connection

A connection is an outbound interaction with an external system from within an integration. Connections include HTTP calls, database connections, message broker subscriptions, and SaaS service clients accessed through connectors.

You declare connections in source: specify the target, the protocol, and any required configuration, usually through a connector or a typed client. Configuration values are commonly externalized through `Config.toml` or configurables so that the same connection can target different systems in different environments.

At runtime, WSO2 Integration Cloud governs connections through environment-level configuration, central credential management, and outbound traffic observability.

## Package and package name

A package is the unit of distribution and versioning in the platform. Every integration is a package, identified by the combination of its organization name, package name, and version — for example, `acme/payments:1.0.0`. The package name is declared in `Ballerina.toml` and must be unique within the organization.

## Library

A library is a reusable package consumed by other projects as a dependency. Connectors, clients, and shared utilities are typically distributed as libraries. You add a library to your project by declaring it in `Ballerina.toml`, after which its functions, types, and clients are available to import in your integration code.

## Config.toml

`Config.toml` is the file that holds environment-specific configuration values for your project: credentials, URLs, feature flags, and any other value that varies between local development and deployed environments. Values declared in `Config.toml` are bound to configurables in your integration code at runtime, which lets you change configuration without changing source.

## Configurables

A configurable is a variable in your integration code whose value is supplied at runtime rather than hardcoded. You declare a configurable in source with a type and optional default, and the actual value comes from `Config.toml` locally or from environment configuration when deployed. Configurables are how you keep secrets, endpoints, and tunable parameters out of source.

## Types

A type is a named data shape used in your integration: a record, a union, an enum, or an alias. Types let you describe the data flowing through your integration explicitly, which the IDE uses to provide validation, autocomplete, and visual data mapping. You can declare types inline in an integration or as standalone artifacts so they can be reused across multiple integrations.

## Expressions

An expression is a snippet of logic that computes a value: a transformation, a conditional, a string interpolation, or a function call. The IDE's visual editor lets you build expressions through guided UI, and the underlying language gives you the full power of typed expression syntax when you need it. Expressions appear wherever your integration needs to compute, decide, or transform.

## Automation

An automation is an integration that runs periodically on a schedule or is invoked manually. Use it for batch jobs, scheduled syncs, cleanup tasks, and any work that is not driven by an inbound request or event.

## AI Integration

An AI Integration connects your system to AI capabilities. Two sub-types are available:

- **AI Chat Agent**: an integration that exposes a conversational agent backed by an LLM, with tools, memory, and prompts you configure.
- **MCP Service**: an integration that exposes capabilities to AI agents via the Model Context Protocol, letting an external agent invoke your integration as a tool.

## Integration as API

An Integration as API exposes one or more network endpoints that external systems or consumers invoke directly. It is the most common integration type and supports multiple protocols, each suited to different communication patterns.

- **HTTP Service**: expose REST or HTTP-based endpoints. Use for synchronous request-response integrations, webhooks, and backend-for-frontend patterns.
- **GraphQL Service**: expose a typed GraphQL schema. Use when consumers need flexible, self-describing queries over a single endpoint.
- **TCP Service**: expose raw TCP endpoints. Use for low-level socket communication and custom binary protocols.

## Event Integration

An Event Integration is triggered when an event arrives from an external system. The IDE includes pre-built connectors for common event sources, including Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, Shopify, and Change Data Capture (CDC) for Microsoft SQL Server and PostgreSQL.

Under the hood, an Event Integration uses a listener: a long-running component that watches for events from the source and dispatches them to your integration's handler logic.

## File Integration

A File Integration is triggered when files appear in a watched location. The listener polls the source and dispatches each new file to your handler logic for processing. Two sub-types are available:

- **FTP / SFTP**: connect to remote FTP, SFTP, or FTPS servers. Use for B2B file exchange, ETL pipelines, and partner integrations where data arrives as CSV, XML, JSON, or binary files.
- **Local Files**: monitor a local or mounted filesystem directory. Use for processing files dropped by on-premises systems or other local workflows.

## Function

A function is a named, reusable unit of logic. You define a function once and call it from any integration in the project. Functions are how you factor out shared logic such as validation, formatting, and computation, so it is not duplicated across integrations.

## Data Mapper

A Data Mapper is a visual transformation between two data shapes. You define input and output types, then map fields and apply transformations through the visual designer. The IDE compiles the mapping into executable code. Use Data Mappers wherever you need to translate between formats: request to response, source system to target system, or external schema to internal model.

## Type

A standalone Type artifact declares a data shape that can be reused across the project. The Type artifact is the same concept as [Types](#types) above, exposed as a first-class file you can edit and share independently of any single integration.

## Configuration

A Configuration artifact groups related configurables into a named, reusable unit. Use it when several integrations share the same configuration surface, such as the same database credentials or the same set of feature flags.

## Artifacts

"Artifacts" is the umbrella term the IDE uses for all integration types plus Function, Data Mapper, Type, Connection, and Configuration. When the IDE says "Add a new artifact to your integration", it means: add an integration of some type, or add a supporting artifact such as a Function, Data Mapper, Type, Connection, or Configuration.

## ICP

ICP (Integration Control Plane) is the local runtime that executes your integrations during development. When you run an integration from the IDE, ICP hosts it, providing the HTTP listeners, schedulers, event connectors, and observability you need to test the integration before deploying it.

ICP runs on your machine and mirrors enough of the production runtime that an integration that works locally on ICP behaves the same way when deployed. Use it for fast iteration, debugging, and local testing.

## What's next

- [WSO2 Integration Cloud concepts](integration-cloud-concepts.md) — data planes, environments, and deployment tracks
- [Integration artifacts](/docs/develop/integration-artifacts/integration-artifacts) — choose the right artifact for your use case
- [Introduction](../introduction.md) — platform overview and architecture
