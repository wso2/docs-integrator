---
title: FAQ
---

# FAQ

## About WSO2 Agent Builder

### What is WSO2 Agent Builder?

WSO2 Agent Builder is a Ballerina-powered platform for building AI agents. It combines low-code visual design and pro-code development, and allows developers to build, test, evaluate, and deploy agents that connect to APIs, databases, messaging systems, SaaS applications, and AI services. WSO2 Agent Builder offers a visual designer and a code editor with full bidirectional sync, alongside a comprehensive connector library and built-in observability.

### How can agents be triggered?

Add a trigger to an agent with **Add Trigger** in the agent view. WSO2 Agent Builder supports these kinds of triggers:

- **Chat Channels:** Incoming messages are passed to the agent, and its reply is sent back, such as Agent Chat, Google Chat, Telegram, or WhatsApp Business
- **API Endpoints:** The agent is exposed at a URL over HTTP. A caller sends a request and gets the agent's answer back
- **Event Sources:** The agent runs when something happens in another system, such as a message on Kafka, RabbitMQ, or MQTT, or a database change captured by CDC
- **File Sources:** The agent runs when a file becomes available in a location, such as an FTP/SFTP server, a local folder, or Azure Files

### What protocols and standards does WSO2 Agent Builder support?

WSO2 Agent Builder supports a wide range of protocols and data formats through Ballerina's standard and extended libraries:

- **API protocols:** HTTP/REST, GraphQL, gRPC, WebSocket, SOAP
- **Messaging:** Kafka, RabbitMQ, NATS, MQTT, JMS
- **Data access:** MySQL, PostgreSQL, MSSQL, Oracle, MongoDB, Redis
- **File transfer:** FTP, SFTP, local file system
- **Email:** SMTP, IMAP, POP3
- **Data formats:** JSON, XML, CSV, YAML, TOML, EDI, HL7/FHIR
- **Security:** OAuth 2.0, JWT, Basic Auth, mutual TLS

### What version of Ballerina does WSO2 Agent Builder use?

WSO2 Agent Builder is built on the Ballerina Swan Lake distribution. The exact distribution version is specified in each agentic integration's `Ballerina.toml` file under the `[package].distribution` field.

### Is WSO2 Agent Builder open source?

WSO2 Agent Builder builds on Ballerina, which is open source under the Apache 2.0 license. WSO2 provides WSO2 Agent Builder and its tooling. Check the WSO2 licensing page for specific license details.

## Development

### Do I need to know Ballerina to use WSO2 Agent Builder?

Not to get started. WSO2 Agent Builder offers full parity between the visual designer and the code editor, so any agent can be built end-to-end in low-code. Developers already comfortable with Ballerina may find pro-code more familiar for complex flows, but neither mode locks you out of any capability. Changes in one view are instantly reflected in the other.

### Can I use existing Ballerina packages?

Yes. Any package published on [Ballerina Central](https://central.ballerina.io) can be imported and used in your agentic integrations. Add packages by importing them in your Ballerina source code, and they will be resolved automatically during `bal build`.

### What editor features are available?

WSO2 Agent Builder includes:

- Visual designer
- Sequence diagram view
- Pro-code editor with IntelliSense and type checking
- Integrated debugger with breakpoints and variable inspection
- Try It tool for testing API endpoints, and a chat panel for talking to your agent
- Visual data mapper for transformations
- Project scaffolding and pre-built samples

### How do I debug my agents?

WSO2 Agent Builder supports standard breakpoint-based debugging. Set breakpoints in either the visual designer or the code editor, then launch the debugger from the editor. You can also use remote debugging by running `bal run --debug <port>` and attaching the editor's debugger to the specified port.

### Where can I find troubleshooting help for common issues?

See [Diagnose Issues](../editor/troubleshooting/troubleshooting.md) to capture the editor's logs and report an issue.

### Can I write tests for my agents?

Yes. Ballerina has a built-in test framework (`ballerina/test`) that supports:

- Unit tests with assertions
- Service-level integration tests with mock servers
- Data-driven tests with data providers
- Test groups and selective execution
- Code coverage reports
- Mocking of clients and external dependencies

Run tests with `bal test` and generate reports with `bal test --test-report --code-coverage`.

## AI integrations

### Does WSO2 Agent Builder support RAG and MCP as well as agents?

Yes. WSO2 Agent Builder includes first-class support for AI agents, retrieval-augmented generation (RAG), Model Context Protocol (MCP) servers, and direct LLM calls. See [AI Integrations](../develop-and-test/integration-artifacts/ai-integrations/ai-integrations.md) for the full set of building blocks.

### Which LLM and vector store providers are supported?

WSO2 Agent Builder ships connectors for major LLM providers and vector stores. See the [Connectors catalog](product://connectors/catalog) for the current list.

## Deploy and operate

### Where can I deploy my agents?

WSO2 Agent Builder supports multiple deployment targets:

- **WSO2 Agent Manager:** Deploy your agent on WSO2 Agent Manager and observe it there
- **Docker containers:** Generate Dockerfiles and images with `bal build --cloud=docker`
- **Kubernetes:** Generate K8s manifests with `bal build --cloud=k8s` and configure via `Cloud.toml`
- **WSO2 Cloud:** Deploy to WSO2's managed platform
- **Bare metal / VM:** Run the executable JAR directly with `bal run` or `java -jar`
- **GraalVM native:** Build native executables with `bal build --graalvm` for fast startup
- **Serverless:** Deploy to AWS Lambda or Azure Functions

See [Deploy and Run](../deploy-and-run/deploy-and-run.md) for detailed deployment guides.

### How do I configure my application for different environments?

Use `Config.toml` for environment-specific values and provide them at deployment time. The configuration precedence (highest to lowest) is:

1. `BAL_CONFIG_VAR_*` environment variables
2. Command-line arguments (`-Ckey=value`)
3. `BAL_CONFIG_DATA` environment variable
4. Config files (via `BAL_CONFIG_FILES` or default `Config.toml`)
5. Default values in source code

This allows you to use the same built artifact across development, staging, and production by varying only the configuration.

### How do I handle secrets and sensitive configuration?

WSO2 Agent Builder uses `Config.toml` files for runtime configuration. For secrets, keep them in a separate `Config.toml` (or another file referenced via the `BAL_CONFIG_FILES` environment variable) that is not checked into version control. Never commit secret values to git, whether they sit in `Config.toml` or anywhere else. In Kubernetes, mount the secret file from a `Secret`, or inject individual values as environment variables using `BAL_CONFIG_VAR_*` prefixes.

### Does WSO2 Agent Builder support horizontal scaling?

Yes. Ballerina services are stateless by default, making them suitable for horizontal scaling. Configure autoscaling in `Cloud.toml` with `[cloud.deployment.autoscaling]` settings, or use your Kubernetes cluster's HPA (Horizontal Pod Autoscaler) directly.

### How do I monitor my agents in production?

WSO2 Agent Builder supports observability through:

- **Agent Manager Observability:** Traces of your agents, sent to WSO2 Agent Manager
- **Metrics:** Prometheus-compatible metrics exposed at a configurable endpoint
- **Distributed tracing:** Jaeger-compatible traces for request flow analysis
- **Logging:** Structured logging via `ballerina/log` with configurable levels
- **ICP Dashboard:** Built-in monitoring UI for integration health and performance

Enable observability by setting `observabilityIncluded = true` in `Ballerina.toml` under `[build-options]`.

### What is the Integration Control Plane (ICP)?

The ICP is a monitoring and management dashboard for deployed integrations. It provides:

- Real-time metrics (request count, error rate, latency percentiles)
- Log aggregation and search
- Artifact discovery (services, listeners, connectors)
- Integration lifecycle management (activate, deactivate, restart)

See [Integration Control Plane](../editor/integration-control-plane.md) for details.

## See also

- [Get Started](../get-started/get-started.md) — Install and set up WSO2 Agent Builder
- [Build an AI Agent](../get-started/quickstarts/build-ai-agent.md) — Build your first agent
- [Glossary](glossary.md) — Definitions of key terms
