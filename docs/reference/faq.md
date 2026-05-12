---
title: FAQ
---

# FAQ

## About WSO2 Integrator

### What is WSO2 Integrator?

WSO2 Integrator is a Ballerina-powered integration platform that combines low-code visual design and pro-code development. It allows developers to build, test, and deploy integrations that connect APIs, databases, messaging systems, SaaS applications, and AI services. The WSO2 Integrator IDE offers a visual designer and a code editor with full bidirectional sync, alongside a comprehensive connector library and built-in observability.

### How can integrations be triggered?

WSO2 Integrator supports several entry points for kicking off an integration:

- **Services:** Network-accessible endpoints (HTTP, GraphQL, gRPC, WebSocket) that respond to incoming requests
- **Automations:** Scheduled or manually triggered jobs that run without an external request (cron-based, interval-based, or one-time)
- **Event handlers:** Reactive integrations triggered by messages from Kafka, RabbitMQ, NATS, MQTT, or other event sources
- **File-driven flows:** Integrations triggered by changes on a local file system or an SFTP/FTP location

Any of these entry points can use AI agents, data transformations, and connectors to build any integration pattern.

### What protocols and standards does WSO2 Integrator support?

WSO2 Integrator supports a wide range of protocols and data formats through Ballerina's standard and extended libraries:

- **API protocols:** HTTP/REST, GraphQL, gRPC, WebSocket, SOAP
- **Messaging:** Kafka, RabbitMQ, NATS, MQTT, JMS
- **Data access:** MySQL, PostgreSQL, MSSQL, Oracle, MongoDB, Redis
- **File transfer:** FTP, SFTP, local file system
- **Email:** SMTP, IMAP, POP3
- **Data formats:** JSON, XML, CSV, YAML, TOML, EDI, HL7/FHIR
- **Security:** OAuth 2.0, JWT, Basic Auth, mutual TLS

### What version of Ballerina does WSO2 Integrator use?

WSO2 Integrator is built on the Ballerina Swan Lake distribution. The exact distribution version is specified in each project's `Ballerina.toml` file under the `[package].distribution` field. See the [Release Notes](/docs/reference/release-notes) for the version shipped with your installer.

### Is WSO2 Integrator open source?

WSO2 Integrator builds on Ballerina, which is open source under the Apache 2.0 license. The WSO2 Integrator IDE and tooling are provided by WSO2. Check the WSO2 licensing page for specific license details.

## Development

### Do I need to know Ballerina to use WSO2 Integrator?

Not to get started. WSO2 Integrator offers full parity between the visual designer and the code editor, so any integration can be built end-to-end in low-code. Developers already comfortable with Ballerina may find pro-code more familiar for complex flows, but neither mode locks you out of any capability. Changes in one view are instantly reflected in the other.

### Can I use existing Ballerina packages?

Yes. Any package published on [Ballerina Central](https://central.ballerina.io) can be imported and used in your integration projects. Add packages by importing them in your Ballerina source code, and they will be resolved automatically during `bal build`.

### What IDE support is available?

The WSO2 Integrator IDE includes:

- Visual designer
- Sequence diagram view
- Pro-code editor with IntelliSense and type checking
- Integrated debugger with breakpoints and variable inspection
- Try It tool for testing services
- Visual data mapper for transformations
- Project scaffolding and templates

### How do I debug my integrations?

WSO2 Integrator supports standard breakpoint-based debugging. Set breakpoints in either the visual designer or the code editor, then launch the debugger from the IDE. You can also use remote debugging by running `bal run --debug <port>` and attaching the IDE's debugger to the specified port.

### Can I write tests for my integrations?

Yes. Ballerina has a built-in test framework (`ballerina/test`) that supports:

- Unit tests with assertions
- Service-level integration tests with mock servers
- Data-driven tests with data providers
- Test groups and selective execution
- Code coverage reports
- Mocking of clients and external dependencies

Run tests with `bal test` and generate reports with `bal test --test-report --code-coverage`.

## AI integrations

### Does WSO2 Integrator support building AI agents and RAG?

Yes. WSO2 Integrator includes first-class support for AI agents, retrieval-augmented generation (RAG), Model Context Protocol (MCP) servers, and direct LLM calls. See [AI Integrations](/docs/genai/overview) for the full set of building blocks.

### Which LLM and vector store providers are supported?

WSO2 Integrator ships connectors for major LLM providers and vector stores. See the [Connectors catalog](/docs/connectors/catalog/ai-ml/ai-machine-learning) for the current list.

## Deploy and operate

### Where can I deploy WSO2 Integrator applications?

WSO2 Integrator supports multiple deployment targets:

- **Docker containers:** Generate Dockerfiles and images with `bal build --cloud=docker`
- **Kubernetes:** Generate K8s manifests with `bal build --cloud=k8s` and configure via `Cloud.toml`
- **WSO2 Integration Platform:** Deploy to WSO2's managed platform
- **Bare metal / VM:** Run the executable JAR directly with `bal run` or `java -jar`
- **GraalVM native:** Build native executables with `bal build --graalvm` for fast startup
- **Serverless:** Deploy to AWS Lambda or Azure Functions

See [Deploy and Operate](/docs/deploy-operate/deploy/docker-kubernetes) for detailed deployment guides.

### How do I configure my application for different environments?

Use `Config.toml` for environment-specific values and provide them at deployment time. The configuration precedence (highest to lowest) is:

1. `BAL_CONFIG_VAR_*` environment variables
2. Command-line arguments (`-Ckey=value`)
3. `BAL_CONFIG_DATA` environment variable
4. Config files (via `BAL_CONFIG_FILES` or default `Config.toml`)
5. Default values in source code

This allows you to use the same built artifact across development, staging, and production by varying only the configuration.

### How do I handle secrets and sensitive configuration?

WSO2 Integrator uses `Config.toml` files for runtime configuration. For secrets, keep them in a separate `Config.toml` (or another file referenced via the `BAL_CONFIG_FILES` environment variable) that is not checked into version control. Never commit secret values to git, whether they sit in `Config.toml` or anywhere else. In Kubernetes, mount the secret file from a `Secret`, or inject individual values as environment variables using `BAL_CONFIG_VAR_*` prefixes. See the [Environment Variables](/docs/reference/config/environment-variables) reference for details.

### Does WSO2 Integrator support horizontal scaling?

Yes. Ballerina services are stateless by default, making them suitable for horizontal scaling. Configure autoscaling in `Cloud.toml` with `[cloud.deployment.autoscaling]` settings, or use your Kubernetes cluster's HPA (Horizontal Pod Autoscaler) directly.

### How do I monitor my integrations in production?

WSO2 Integrator supports observability through:

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

See the [ICP API Reference](/docs/reference/api/icp-api) for programmatic access.

## Migration

### Can I migrate from MuleSoft or TIBCO?

Yes. WSO2 provides migration guides and tooling to help transition from other integration platforms. See [Coming from MuleSoft](/docs/tutorials/migration/coming-from-mulesoft) and [Coming from TIBCO](/docs/tutorials/migration/coming-from-tibco) for platform-specific guidance. For migrating third-party integrations programmatically, see [Migrate third-party integrations](/docs/develop/create-integrations/migrate-third-party-integrations).

### Can I run WSO2 MI and WSO2 Integrator side by side?

Yes. The two products use different runtimes and can coexist in the same environment. This allows you to adopt WSO2 Integrator for new projects while continuing to run your existing MI deployments. You can also migrate MI integrations incrementally using [Migrate third-party integrations](/docs/develop/create-integrations/migrate-third-party-integrations). For MI-specific guidance, refer to the [MI documentation](https://mi.docs.wso2.com).

## What's next

- [Get Started](/docs/get-started/install) — Install and set up WSO2 Integrator
- [Build an API Integration](/docs/get-started/build-api-integration) — Build your first integration
- [Glossary](/docs/reference/glossary) — Definitions of key terms
