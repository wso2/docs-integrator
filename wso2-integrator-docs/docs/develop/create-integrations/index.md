---
sidebar_position: 1
title: Create Integrations
description: "Create new integration projects, open existing ones, explore samples, and import external integrations."
---

# Create Integrations

Get started by creating a new integration project, opening an existing one, or exploring the built-in samples. WSO2 Integrator provides multiple ways to bootstrap your work so you can focus on building integration logic rather than project scaffolding.

## Project Types

WSO2 Integrator supports several project types, each tailored to a specific integration scenario:

| Project Type | Description | Use Case |
|---|---|---|
| **Service** | Exposes an HTTP, GraphQL, gRPC, or WebSocket endpoint | API backends, data services, webhooks |
| **Event Handler** | Reacts to messages from a broker or external system | Stream processing, event-driven workflows |
| **Automation** | Runs on a schedule or manual trigger | Batch jobs, periodic sync, reports |
| **File Handler** | Processes files from FTP, SFTP, or local directories | ETL pipelines, file-based integrations |
| **AI Agent** | Orchestrates LLM calls with tool functions | Intelligent assistants, RAG applications |

## Creating Your First Project

The fastest way to start is through the **New Integration** wizard in VS Code:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Select **WSO2 Integrator: New Integration**.
3. Choose a project type and template.
4. Specify the project name and location.

<!-- TODO: Screenshot of the New Integration wizard -->

The wizard generates a complete Ballerina project with the correct directory structure, dependencies, and a starter template.

## Project Structure

Every integration project follows the standard Ballerina project layout:

```
my-integration/
├── Ballerina.toml          # Project metadata and dependencies
├── Config.toml             # Runtime configuration
├── main.bal                # Entry point / service definition
├── types.bal               # Shared type definitions
├── connections.bal          # Connection configurations
└── tests/
    └── main_test.bal       # Unit tests
```

The `Ballerina.toml` file identifies the project and declares its dependencies. The `Config.toml` file holds environment-specific configuration values such as endpoints, credentials, and feature flags.

## Guides

- [Create a New Integration](create-new-integration.md) -- Start a new project from scratch or from a template
- [Open an Existing Integration](open-integration.md) -- Open and work with projects on disk or from version control
- [Explore Sample Integrations](explore-samples.md) -- Browse and learn from built-in examples
- [Import External Integrations](import-external.md) -- Import projects from other tools or formats

## What's Next

- [Integration Artifacts](/docs/develop/integration-artifacts) -- Learn about the different artifact types you can create
- [Design Logic](/docs/develop/design-logic) -- Build your integration logic visually or in code
