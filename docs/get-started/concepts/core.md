---
title: Core Concepts
---

# Core Concepts

This page introduces every major building block you work with when designing and building integrations in the WSO2 Integrator IDE. Use it as a vocabulary reference before diving into the [Develop](../../develop/integration-artifacts/integration-artifacts.md) section, where each concept is covered in full detail.

## Organization

An organization is the top-level boundary that owns all integration-related resources and the users who work with them. Every project, integration, and deployment belongs to exactly one organization.

In the WSO2 Integrator IDE, the organization is declared as the `org` field in your project's package descriptor (`Ballerina.toml`). It identifies who owns the source code and forms part of the fully qualified name of every artifact you build, for example `acme/payments:1.0.0`, where `acme` is the organization, `payments` is the package, and `1.0.0` is the version. The organization name acts as a namespace for source artifacts, disambiguating packages, libraries, and integrations across the wider ecosystem.

When you push code to WSO2 Integration Cloud, the organization name in your `Ballerina.toml` must correspond to an organization you are a member of in the cloud.

## Project

A project is a workspace that groups related integrations together. It is the unit of co-development: the integrations inside a project are designed, versioned in Git, and pushed to WSO2 Integration Cloud together, even though each one remains independently buildable and deployable.

A project is not itself a package. It is a container for packages: each integration inside a project is its own package with its own `Ballerina.toml`, its own version, and its own deployment lifecycle. The project provides the shared boundary; the integrations provide the deployable units.

A project typically contains:

- One or more integrations, each in its own directory with its own `Ballerina.toml`
- Shared configuration that applies across the integrations
- Any project-level metadata used by the IDE and WSO2 Integration Cloud

Projects can be organized in two common ways. In a monorepo layout, a single Git repository holds one project with each integration under a different path. In a polyrepo layout, each integration lives in its own repository.

## Integration

An integration is a single unit of work that connects systems, transforms data, or orchestrates a workflow. It is the core building block of the platform and, at the source level, the unit of distribution.

Each integration is its own package: a self-contained directory with its own `Ballerina.toml` file, its own dependencies, and its own version. The package is identified by the combination of its organization name, package name, and version, for example `acme/payments:1.0.0`. Here, `acme` names the owning organization, `payments` names the integration package, and `1.0.0` is the semantic version. This fully qualified name is how the integration is referenced for distribution, deployment, and dependency resolution.

In the IDE, you compose an integration from one of the integration types: Automations, AI Agents, Services, Event handlers, or File processors. Each integration has a specific type that determines how it is triggered and how it runs.

When you push an integration to WSO2 Integration Cloud, the same integration becomes a unit of deployment: a single pod in the data plane that can be scaled and managed independently.

## Endpoint

An endpoint is a network-exposed entry point within an integration.

You declare endpoints in integrations of type Integration as API. Each endpoint defines a path, the HTTP verbs (or equivalent for GraphQL/TCP) it accepts, an optional service contract (OpenAPI or GraphQL SDL), and the handler logic that runs when it is invoked.

A single integration can expose multiple endpoints. When deployed to WSO2 Cloud, each endpoint is treated as an independently manageable API. Lifecycle, security, and exposure settings can differ from one endpoint to the next within the same integration.

## Connection

A connection represents an integration's link to an external system: an HTTP client, database client, message broker subscription, or SaaS service client configured through a connector. The integration then uses that connection to make individual calls or exchange messages.

You declare connections in source code, specifying the target, the protocol, and any required configuration, usually through a connector or a typed client. By externalizing configuration values through configurables, a single connection definition at design time can resolve to different systems at runtime, depending on the environment.

At runtime, WSO2 Integration Cloud configures connections per environment, manages credentials centrally, and provides observability over outbound traffic.

## Package and package name

A package is the unit of distribution and versioning in the platform. Every project is a package, identified by the combination of its organization name, package name, and version, for example `acme/payments:1.0.0`. The package name is declared in `Ballerina.toml` and must be unique within the organization.

## Library

A library is a reusable package consumed by other projects as a dependency. Connectors and shared utility functions are typically distributed as libraries. You add a library to your project by adding an import statement to the source code, after which its functions, types, and clients are available to import in your integration code.

## Configurables

A configurable is a variable in your integration code whose value is supplied at runtime rather than hardcoded. You declare a configurable in source with a type and optional default, and the actual value comes from `Config.toml` locally or from environment configuration when deployed. Configurables are how you keep secrets, endpoints, and tunable parameters out of source.

## Config.toml

`Config.toml` is the file that holds environment-specific configuration values for your project: credentials, URLs, feature flags, and any other value that varies between local development and deployed environments. Values declared in `Config.toml` are bound to configurables in your integration code at runtime, which lets you change configuration without changing source.

## Types

A type is a named data shape used in your integration: a record, a union, an enum, or an alias. Types let you describe the data flowing through your integration explicitly, which the IDE uses to provide validation, autocomplete, and visual data mapping. You can declare types inline in an integration or as standalone artifacts so they can be reused across multiple integrations.

## Automation

An automation is an integration that runs periodically on a schedule or is invoked manually. Use it for batch jobs, scheduled syncs, cleanup tasks, and any work that is not driven by an inbound request or event.

## AI integration

An AI Integration connects your system to AI capabilities. You can implement:

- **AI Agents**: an integration that exposes AI-powered functionality backed by an LLM, including conversational agents with tools, memory, and prompts, RAG pipelines, and direct LLM calls.
- **MCP Service**: an integration that exposes capabilities to AI agents via the Model Context Protocol, letting an external agent invoke your integration as a tool.

## Integration as API

An Integration as API exposes one or more endpoints that consumers invoke over the network. The protocol determines the sub-type. Common examples include:

- **HTTP Service**: REST or HTTP-based APIs
- **GraphQL Service**: GraphQL APIs with typed schemas
- **TCP Service**: raw TCP endpoints

## Event integration

An Event Integration is triggered when an event arrives from an external system. Pre-built connectors are available for common event sources, including Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, Shopify, and Change Data Capture (CDC) for Microsoft SQL Server and PostgreSQL.

Under the hood, an Event Integration uses a listener: a long-running component that listens for events from the source and dispatches them to your integration's handler logic.

## File integration

A File Integration is triggered when files appear, change, or are removed in a watched location. Common sub-types include:

- **FTP / SFTP**: watches a remote FTP or SFTP server
- **Local files**: watches a local or mounted filesystem

## Data mapper

A Data mapper defines a transformation between two data shapes. You declare input and output types, then specify how fields map and what transformations apply. Mappings can be authored visually in the IDE, connecting fields and configuring transformations through the mapping editor, or written directly in code. The IDE generates the underlying mapping code as part of your integration. Use Data Mappers wherever you need to translate data: mapping a request to a response, a source system's schema to a target system's, or an external schema to an internal model.

## Function

A function is a named, reusable unit of logic. You define a function once and call it from any integration in the project. Functions are how you factor out shared logic such as validation, formatting, and computation so it is not duplicated across integrations.

## Type

A standalone Type artifact declares a data shape that can be reused across the project. See [Types](#types) for the language-level concept; the Type artifact is the same idea exposed as a first-class file you can edit and share.

## Artifacts

Artifacts is the WSO2 Integrator IDE umbrella term for the things you add to an integration project: integrations themselves, plus supporting pieces like Functions, Data Mappers, Types, Connections, and Configurations.

## Expressions

An expression is a snippet of logic that computes a value: a transformation, a conditional, a string interpolation, or a function call. The visual designer lets you build expressions through a guided UI, and the underlying language gives you the full power of typed expression syntax when you need it. Expressions appear wherever your integration needs to compute, decide, or transform.

## ICP

The Integration Control Plane (ICP) is a centralized monitoring and management server for WSO2 Integrator deployments. It provides a web dashboard and APIs for real-time visibility into running integrations.

## What's next

- [WSO2 Cloud concepts](integration-cloud-concepts.md) — data planes, environments, and deployment tracks
- [Local setup](../setup/local-setup.md) — install the WSO2 Integrator IDE and create your first project
- [Build an automation](../build-automation.md) — schedule tasks and run background jobs
- [Build an Integration as API](../build-integration-api.md) — expose an HTTP service and handle requests
