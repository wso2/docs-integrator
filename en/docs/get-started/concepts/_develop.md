## Develop and Test

The concepts you work with while building an integration in the Choreo Integrator editor. These are covered in depth in [Develop](../../develop-and-test/develop-and-test.md).

### Integration

An integration is a single unit of work that connects systems, transforms data, or orchestrates a workflow. It is the core building block of the platform and, at the source level, the unit of distribution.

Each integration is its own package: a self-contained directory with its own `Ballerina.toml`, its own dependencies, and its own version. Every integration has a type, which determines how it is triggered and how it runs.

When you push an integration to Choreo Cloud, it becomes a unit of deployment: a single pod in the data plane that can be scaled and managed independently.

### Integration types

Every integration you build is one of the following types:

- **Automation**: runs periodically on a schedule or is invoked manually. Use it for batch jobs, scheduled syncs, cleanup tasks, and any work not driven by an inbound request or event.
- **Integration as API**: exposes one or more endpoints that consumers invoke over the network. The protocol determines the sub-type: HTTP services for REST, GraphQL services with typed schemas, or raw TCP services.
- **Event integration**: triggered when an event arrives from an external system. Pre-built connectors are available for common sources including Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, Shopify, and Change Data Capture (CDC) for Microsoft SQL Server and PostgreSQL. Under the hood it uses a listener: a long-running component that listens for events and dispatches them to your handler logic.
- **File integration**: triggered when files appear, change, or are removed in a watched location, such as a remote FTP or SFTP server, or a local or mounted filesystem.
- **AI integration**: either an **AI Agent**, which exposes AI-powered functionality backed by an LLM including conversational agents with tools, memory, and prompts, and direct LLM calls; or an **MCP Server**, which exposes your integration as a tool that an external agent can invoke via the Model Context Protocol.

### Endpoint

An endpoint is a network-exposed entry point within an integration. You declare endpoints in integrations of type Integration as API. Each endpoint defines a path, the HTTP verbs (or equivalent for GraphQL and TCP) it accepts, an optional service contract such as OpenAPI or GraphQL SDL, and the handler logic that runs when it is invoked.

A single integration can expose multiple endpoints. When deployed to Choreo Cloud, each endpoint is treated as an independently manageable API, so lifecycle, security, and exposure settings can differ from one endpoint to the next within the same integration.

### Connection

A connection represents an integration's link to an external system: an HTTP client, database client, message broker subscription, or SaaS service client configured through a connector. The integration then uses that connection to make individual calls or exchange messages.

You declare connections in source code, specifying the target, the protocol, and any required configuration, usually through a connector or a typed client. By externalizing configuration values through configurables, a single connection definition at design time can resolve to different systems at runtime, depending on the environment.

At runtime, Choreo Cloud configures connections per environment, manages credentials centrally, and provides observability over outbound traffic.

### Types

A type is a named data shape used in your integration: a record, a union, an enum, or an alias. Types let you describe the data flowing through your integration explicitly, which the editor uses to provide validation, autocomplete, and visual data mapping. You can declare types inline in an integration, or as a standalone Type artifact so they can be reused and edited across multiple integrations.

### Configurables and Config.toml

A **configurable** is a variable in your integration code whose value is supplied at runtime rather than hardcoded. You declare it in source with a type and an optional default.

**`Config.toml`** holds those values for local development: credentials, URLs, feature flags, and any other value that varies between environments. When the integration is deployed, values come from environment configuration instead. Together, these keep secrets and environment-specific values out of source.

### Data mapper

A data mapper defines a transformation between two data shapes. You declare input and output types, then specify how fields map and what transformations apply. Mappings can be authored visually in the editor, connecting fields through the mapping editor, or written directly in code; the editor generates the underlying mapping code as part of your integration.

Use data mappers wherever you need to translate data: mapping a request to a response, a source system's schema to a target system's, or an external schema to an internal model.

### Function

A function is a named, reusable unit of logic. You define a function once and call it from any integration in the project. Functions are how you factor out shared logic such as validation, formatting, and computation so it is not duplicated across integrations.

### Expressions

An expression is a snippet of logic that computes a value: a transformation, a conditional, a string interpolation, or a function call. The visual designer lets you build expressions through a guided UI, and the underlying language gives you the full power of typed expression syntax when you need it. Expressions appear wherever your integration needs to compute, decide, or transform.

### Artifacts

Artifacts is the umbrella term for the things you add to an integration project: integrations themselves, plus supporting pieces such as functions, data mappers, types, connections, and configurations.
