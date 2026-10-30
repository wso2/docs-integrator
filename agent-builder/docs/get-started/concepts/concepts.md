---
title: Concepts
---

# Concepts

This page defines the vocabulary used across the WSO2 Agent Builder docs, grouped by the phase of the agent lifecycle where you first encounter each term. Each section links to the documentation that covers these topics in depth.

  <PaletteIcon name="foundations" />
  <h3 class="palette-card-title">Foundations</h3>
  <p class="palette-card-desc">Concepts that apply at every phase, independent of how or where an agent runs.</p>
  <div class="palette-chip-row">
    <PaletteChip href="#organization">Organization
    <PaletteChip href="#project">Project
    <PaletteChip href="#agentic-integration">Agentic integration
    <PaletteChip href="#library">Library

</div>

  <PaletteIcon name="develop-test" />
  <h3 class="palette-card-title">Build and Test</h3>
  <p class="palette-card-desc">What you compose an agent from in WSO2 Agent Builder, and how you try it out.</p>
  <div class="palette-chip-row">
    <PaletteChip href="#agent">Agent
    <PaletteChip href="#agent-definition">Agent definition
    <PaletteChip href="#durable-agent">Durable agent
    <PaletteChip href="#trigger">Trigger
    <PaletteChip href="#model-provider">Model provider
    <PaletteChip href="#tool">Tool
    <PaletteChip href="#mcp-server">MCP server
    <PaletteChip href="#memory">Memory
    <PaletteChip href="#knowledge-base">Knowledge base
    <PaletteChip href="#connection">Connection
    <PaletteChip href="#types">Types
    <PaletteChip href="#function">Function
    <PaletteChip href="#configurables-and-configtoml">Configurables and Config.toml
    <PaletteChip href="#copilot">Copilot
    <PaletteChip href="#agent-chat">Agent Chat
    <PaletteChip href="#tracing">Tracing
    <PaletteChip href="#evaluations">Evaluations

</div>

  <PaletteIcon name="deploy-run" />
  <h3 class="palette-card-title">Deploy and Run</h3>
  <p class="palette-card-desc">Getting an agent running outside WSO2 Agent Builder, and moving it between environments.</p>
  <div class="palette-chip-row">
    <PaletteChip href="#deployment-options">Deployment options
    <PaletteChip href="#environment">Environment
    <PaletteChip href="#promotion">Promotion
    <PaletteChip href="#configurations-and-secrets">Configurations and secrets

</div>

  <PaletteIcon name="manage-observe" />
  <h3 class="palette-card-title">Manage and Observe</h3>
  <p class="palette-card-desc">Keeping an agent healthy and understandable once it is live.</p>
  <div class="palette-chip-row">
    <PaletteChip href="#integration-control-plane-icp">Integration Control Plane (ICP)
    <PaletteChip href="#observability">Observability

</div>

## Foundations

These concepts apply at every phase of the lifecycle, independent of how or where an agent runs.

### Organization

An organization is the top-level boundary that owns your projects and the users who work with them.

In WSO2 Agent Builder, the organization is declared as the `org` field in each agentic integration's package descriptor (`Ballerina.toml`). You set it in **Organization Name** under **Advanced Configurations** when you create an agentic integration. It forms part of the fully qualified name of everything you build, for example `acme/support_agent:0.1.0`, where `acme` is the organization, `support_agent` is the package, and `0.1.0` is the version.

When you deploy to WSO2 Cloud, the organization name must correspond to an organization you are a member of in WSO2 Cloud.

### Project

A project helps you organize your agentic integrations and libraries. It is a folder with its own `Ballerina.toml`, and each agentic integration or library inside it lives in its own subfolder.

The integrations inside a project are versioned and developed together, but each one remains independently buildable and deployable. When you open a project, the **WSO2 Agent Builder** sidebar lists every agentic integration in it.

### Agentic integration

An agentic integration is the unit you build and deploy in WSO2 Agent Builder. It holds one or more [agents](#agent), the [triggers](#trigger) that call them, and supporting pieces such as model providers, connections, types, functions, and configurations.

Each agentic integration is a Ballerina package: a self-contained folder with its own `Ballerina.toml`, its own dependencies, and its own version.

### Library

A library holds reusable components and utilities, such as functions, types, and connections, that can be shared across agentic integrations. You create a library from the same **Create a Project** wizard by choosing **Library** instead of **Agentic Integration**.

## Build and Test

The concepts you work with while building an agent in WSO2 Agent Builder. These are covered in depth in [AI Agents](../../develop-and-test/integration-artifacts/ai-integrations/agents/agents.md).

### Agent

An agent uses a large language model (LLM) to understand a request, reason about it, and call [tools](#tool) to retrieve information or perform actions. You define an agent with a **Role**, **Instructions**, and a **Model**, and you can give it tools, [memory](#memory), and [knowledge bases](#knowledge-base).

You add an agent from the agentic integration overview with **Add Agent** > **Create Agent**. See [Create an Agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md).

### Agent definition

An agent definition is a reusable agent configuration that can be shared and used to create agents with the same configuration. You create one with **Add Agent** > **Create Agent Definition**. See [Agent Definitions](../../develop-and-test/integration-artifacts/ai-integrations/agents/definitions/definitions.md).

### Durable agent

A durable agent runs as a workflow. It can wait days for a person or an event, and it resumes where it left off after a restart. Use a durable agent when a step must wait for human approval before it runs. You create one with **Add Agent** > **Create Durable Agent**. See [Gated Tools vs Durable Agentic Workflow](../../develop-and-test/integration-artifacts/ai-integrations/agents/human-in-the-loop/gated-tools-vs-durable-agentic-workflow.md).

### Trigger

A trigger connects an agent to the channel or event source that calls it. You add one with **Add Trigger** on the agent canvas. Triggers come in four groups:

- **Chat Channels**: incoming messages are passed to the agent and its reply is sent back, for example **Agent Chat**, Google Chat, Telegram, or WhatsApp Business.
- **API Endpoints**: expose the agent at a URL. A caller sends an HTTP request and gets the agent's answer back.
- **Event Sources**: the agent runs when something happens in another system, for example a Kafka, RabbitMQ, or MQTT message, a GitHub or Salesforce event, or a database change (CDC).
- **File Sources**: the agent runs when a file becomes available in a location, such as an FTP or SFTP server, Azure Files, an SMB share, or a local folder.

### Model provider

A model provider connects an agent to an LLM. Each agent uses one model provider. New agents use the **Default WSO2 Model Provider**, which works after you [sign in](../setup.md#step-4-sign-in-to-wso2-agent-builder). You can also connect providers such as Anthropic, OpenAI, Azure OpenAI, AWS Bedrock, Google Vertex, Mistral, DeepSeek, OpenRouter, or Ollama. See [Model Providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md).

### Tool

A tool is an action an agent can choose to call while it works on a request. You add one with **Add Tool** on the agent canvas, from a connection, a function, another agent, a knowledge base, or an MCP server, or by creating a custom tool. A tool can require human approval before it runs. See [Give Tools to Agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md).

### MCP server

The Model Context Protocol (MCP) is an open standard that lets agents discover and call tools over the network. An agent can use the tools of an external MCP server, and an agentic integration can expose its own functionality as an MCP server for other agents to call. See [MCP Integration](../../develop-and-test/integration-artifacts/ai-integrations/mcp/mcp.md).

### Memory

Memory lets an agent remember earlier messages in a conversation, so it can answer follow-up questions in context. You configure it with **+ Add Memory** on the agent node, and choose where the messages are stored. See [Configure Agent Memory](../../develop-and-test/integration-artifacts/ai-integrations/agents/memory.md).

### Knowledge base

A knowledge base lets an agent answer from your own documents. Documents are split into chunks, turned into embeddings by an embedding provider, and stored in a vector store. At query time, the agent retrieves the most relevant chunks and uses them in its answer. See [Knowledge Bases](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases.md).

### Connection

A connection represents an agentic integration's link to an external system: an HTTP API, a database, a message broker, or a SaaS service configured through a connector. Agents can call connections through tools, and flows can call them directly.

By externalizing connection settings through [configurables](#configurables-and-configtoml), a single connection definition can point at different systems in different environments.

### Types

A type is a named data shape used in your agentic integration: a record, a union, an enum, or an alias. Types describe the data flowing through your agents and tools explicitly, which WSO2 Agent Builder uses to provide validation, autocomplete, and visual data mapping.

### Function

A function is a named, reusable unit of logic. You define a function once and call it from flows, or give it to an agent as a tool. Functions are how you factor out shared logic such as validation, formatting, and computation.

### Configurables and Config.toml

A **configurable** is a variable whose value is supplied at runtime rather than hardcoded, such as an API key or a service URL.

**`Config.toml`** holds those values for local development. For example, when you create an agent that uses the Default WSO2 Model Provider, WSO2 Agent Builder adds that provider's configuration values to `Config.toml`. When the agentic integration is deployed, values come from the environment's configuration instead. Together, these keep secrets and environment-specific values out of source code, so don't commit `Config.toml` to version control.

### Copilot

WSO2 Agent Builder Copilot is an AI assistant built into WSO2 Agent Builder. Describe what your agent should do, and Copilot can create the agent, add tools, knowledge, evaluations, human approval, and triggers, refine the instructions, or explain how an agentic integration works. See [Copilot](../../editor/copilot/copilot.md).

### Agent Chat

Agent Chat is the built-in chat panel you use to try an agent while you build it. Add an **Agent Chat** trigger to the agent, open the trigger, and click **Chat**. WSO2 Agent Builder runs the agentic integration and opens the chat panel next to the canvas.

### Tracing

Tracing records each step an agent takes to answer a request: the LLM calls it makes, the tools it calls, and the inputs and outputs of each. Turn it on with **Tracing: Off** in the canvas header, then click **View Trace** under a reply in Agent Chat to see what happened. See [Observe Agent Behavior](../../develop-and-test/integration-artifacts/ai-integrations/agents/observability.md).

### Evaluations

Evaluations check that an agent behaves as expected, by running it against a set of recorded conversations (an evalset) and scoring its answers. Use them to catch regressions when you change the instructions, the model, or the tools. See [Evaluate Agent Behavior](../../develop-and-test/integration-artifacts/ai-integrations/agents/evaluations/evaluations.md).

## Deploy and Run

The concepts that apply once an agent leaves WSO2 Agent Builder. These are covered in [Deploy and Run](../../deploy-and-run/deploy-and-run.md).

### Deployment options

You can run an agentic integration in one of the following ways:

- **Deploy to WSO2 Cloud**: push directly from WSO2 Agent Builder to the managed platform, with no infrastructure setup required.
- **Build Docker Image**: package the agentic integration as a container image and run it on Docker, Kubernetes, or Red Hat OpenShift.
- **Build Executable**: build a standalone JAR file and run it on a virtual machine or bare metal.

### Environment

An environment is an isolated deployment area, such as development or production, with restricted network and resource access. Agents deployed in one environment cannot communicate with those in another.

### Promotion

Promotion is the act of moving a built agentic integration from one environment to the next, for example from development to production.

WSO2 Cloud follows a **build once, deploy many** model: an agentic integration is built once and then promoted to higher environments unchanged. Because configuration is injected at runtime rather than baked in, values such as model provider keys can differ per environment while the build itself stays identical.

### Configurations and secrets

Configurations and secrets are maintained per environment and injected into an agentic integration at runtime, keeping environment-specific values, such as LLM API keys and database credentials, separate from source code. They are the deployed counterpart of the values you keep in `Config.toml` while you build.

## Manage and Observe

The concepts that apply once an agent is live and handling real traffic. These are covered in [Manage](../../manage/manage.md) and [Observe](../../observe/observe.md).

### Integration Control Plane (ICP)

The Integration Control Plane (ICP) is a self-hosted server that provides deployment, management, and observability for agentic integrations you run on your own infrastructure. It provides a web dashboard and APIs for real-time visibility into running agentic integrations. See [Integration Control Plane (ICP) Support in Editor](../../editor/integration-control-plane.md).

For agents deployed to WSO2 Cloud, equivalent capabilities are provided as part of the managed cloud experience.

### Observability

Observability is how you understand an agent's runtime behavior, using logs, metrics, and distributed traces. For agents, traces matter most: an agent decides at runtime which tools to call and in what order, so a trace is often the only way to see why it gave a particular answer.

Two distinct activities sit under this heading:

- **Monitoring** answers *"is it behaving as expected?"* It watches known indicators, such as error rates and response times, and alerts when they fall outside expected ranges.
- **Diagnosis** answers *"why is it behaving this way?"* It uses logs, metrics, and traces to explain what is actually happening inside an agent and the systems it calls.

WSO2 Agent Builder emits telemetry through OpenTelemetry and integrates with established observability stacks, such as Prometheus and Grafana for metrics, Jaeger and Zipkin for distributed tracing, and Elastic Stack (ELK), OpenSearch, and Grafana Loki for logging.

## What's next

- [Setup](../setup.md): install WSO2 Agent Builder and sign in
- [Build an AI agent](../quickstarts/build-ai-agent.md): build your first AI agent in under 10 minutes
- [Build a durable agent](../quickstarts/build-durable-agent.md): build an agent that waits for human approval
- [AI Agents](../../develop-and-test/integration-artifacts/ai-integrations/agents/agents.md): agents, tools, memory, and evaluations in depth
