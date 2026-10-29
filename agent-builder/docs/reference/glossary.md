---
title: Glossary
---

# Glossary

| Term | Definition |
|------|-----------|
| **Agent** | An AI integration artifact backed by a large language model (LLM). Agents can reason, call tools, and maintain conversation memory. |
| **Agent Manager** | WSO2 Agent Manager, the console where you deploy, run, and observe your agents. WSO2 Agent Builder Copilot can connect to it through the **Agents & Deployments** and **Observability** MCP servers. |
| **Agentic Integration** | The top-level unit of work in WSO2 Agent Builder. A Ballerina package that holds your AI agents with their tools, memory, and the triggers that invoke them. |
| **any** | A Ballerina type that represents any value except `error`. Used when the specific type is not known at compile time. |
| **anydata** | A Ballerina type that represents any pure data value (no behavioral types). Includes `nil`, `boolean`, `int`, `float`, `decimal`, `string`, `xml`, and structured values composed of `anydata`. Fundamental for serialization. |
| **Ballerina** | The cloud-native programming language powering WSO2 Agent Builder. Designed for network-distributed applications with built-in support for HTTP, data types, and concurrency. |
| **Ballerina Central** | The package registry at [central.ballerina.io](https://central.ballerina.io) where connectors and libraries are published and discovered. |
| **Ballerina.toml** | The package manifest file that declares metadata, dependencies, and build options for a Ballerina package (an agentic integration or library). |
| **CDC** | Change Data Capture. A pattern for streaming database changes (inserts, updates, deletes) in real time. Supported by MySQL, PostgreSQL, and MS SQL connectors. |
| **check** | A Ballerina keyword that propagates errors. If the expression evaluates to an error, the enclosing function returns it immediately. Eliminates the need for verbose try-catch blocks. |
| **Client** | A Ballerina object that provides remote method calls to external systems such as databases, APIs, and message brokers. Remote methods are invoked using the `->` operator. |
| **Cloud.toml** | Configuration file for cloud deployment settings including Docker image details, Kubernetes resource limits, autoscaling, and health probes. |
| **Config.toml** | Environment-specific runtime configuration file. Provides values for `configurable` variables. Should not be committed to version control when it contains secrets. |
| **configurable** | A Ballerina keyword that marks a variable as externally configurable via `Config.toml`, environment variables, or CLI arguments. Use `= ?` for required values with no default. |
| **Connector** | A pre-built `ballerinax` package for connecting to an external system (Salesforce, Kafka, MySQL, etc.). Handles authentication, serialization, and error mapping. |
| **Data Mapper** | A visual data transformation tool in the WSO2 Agent Builder design view. Maps fields between source and target schemas, with AI-assisted suggestions. |
| **Dependencies.toml** | Auto-generated lock file that records the exact resolved versions of all package dependencies. Should be committed to version control. |
| **distinct error** | A Ballerina error type with a unique identity, allowing pattern matching on specific error categories. Used to define application-specific error hierarchies. |
| **do/on fail** | Ballerina's error handling block. Code in `do` runs normally; `on fail` catches errors from `check` expressions. Also supported on `while`, `foreach`, `lock`, `transaction`, and `retry` blocks. |
| **Durable Agent** | An agent that runs as a workflow. It can wait days for a person or an event, and resumes after a restart. Also called a durable agentic workflow. |
| **Error** | A Ballerina basic type representing an error condition. Carries a message (`string`), optional cause (`error?`), and optional detail record. Errors are values, not exceptions. |
| **Evalset** | A set of sample conversations with your agent that you have reviewed and approved. Evaluations replay them to check the agent's behavior. |
| **Evaluation** | A function that scores your agent's behavior, created from a prebuilt template or built in the visual designer, with or without an evalset. |
| **Event Source** | A trigger that runs an agent when something happens in another system, such as a message on Kafka, RabbitMQ, or MQTT, or a database change captured by CDC. |
| **File Source** | A trigger that runs an agent when a file becomes available in a location, such as an FTP/SFTP server or a local folder. |
| **Guardrail** | A safety mechanism that constrains what an AI agent can take as input or produce as output. Used to enforce content policies and prevent unsafe responses. |
| **ICP** | Integration Control Plane. A dashboard for monitoring, managing, and troubleshooting running integrations in production. Provides metrics, logs, and artifact discovery. |
| **json** | A Ballerina union type: `()\|boolean\|int\|float\|decimal\|string\|json[]\|map<json>`. Represents any value serializable to JSON format. |
| **Library** | A shareable collection of reusable components, functions, or connectors packaged for distribution. Used across multiple agentic integrations or shared with a team. |
| **Listener** | A Ballerina construct that binds to a network port or event source and dispatches incoming requests/messages to services. Examples: `http:Listener`, `kafka:Listener`, `task:Listener`. |
| **LLM** | Large language model. The foundation model that backs an agent or natural function call. |
| **MCP** | Model Context Protocol. An open standard that lets AI agents discover and call integration functions as tools. |
| **Module** | A sub-unit of a Ballerina package. A package has a default module (root) and can contain multiple named modules under the `modules/` directory. |
| **Natural Function** | An LLM call treated as a typed function call in Ballerina. You define input/output types and the platform handles the prompt, API call, and response parsing. |
| **Package** | The unit of code distribution in Ballerina. Defined by `Ballerina.toml` and publishable to Ballerina Central. Contains one or more modules. At the product level, users typically speak of agentic integrations or libraries rather than packages. |
| **Pro-code** | The Ballerina source-editing mode in WSO2 Agent Builder. Stays in sync with the visual designer, with full auto-complete, type checking, and debugging. |
| **Project** | A workspace that organizes your agentic integrations and libraries, with their dependencies, configuration, and deployment artifacts. Defined by `Ballerina.toml`. |
| **Query Expression** | Ballerina's SQL-like syntax for filtering, transforming, and aggregating data within code. Supports `from`, `where`, `let`, `select`, `order by`, `limit`, and `join` clauses. |
| **RAG** | Retrieval-Augmented Generation. A pattern that combines document retrieval from a vector database with LLM generation for knowledge-grounded AI responses. |
| **Record** | A Ballerina structural type with named fields. The primary data structure for representing JSON-like data with compile-time type safety. Can be open (allows extra fields) or closed. |
| **Resource Function** | A function in a Ballerina service that maps to an HTTP method and path. Example: `resource function get customers()` handles `GET /customers`. |
| **Service** | A Ballerina construct that exposes endpoints over HTTP, GraphQL, gRPC, WebSocket, or TCP. |
| **Strand** | Ballerina's lightweight execution unit (similar to a green thread or goroutine). Workers and async calls execute on strands managed by the Ballerina scheduler. |
| **Structural Typing** | Ballerina's type compatibility model. Types are compatible based on their structure (shape of values) rather than their declared names. |
| **Tool calling** | The mechanism by which an LLM-backed agent invokes typed functions, including MCP tools, to act on external systems. |
| **Transaction** | A Ballerina language construct for coordinating atomic operations across multiple resources. Supports distributed transactions with automatic rollback on failure. |
| **Try It** | A built-in tool in WSO2 Agent Builder for sending test requests to running services and viewing responses inline. |
| **Union Type** | A Ballerina type that can hold values of multiple types. Written as `TypeA\|TypeB`. Used extensively for error handling (`string\|error`) and optional values (`T?` is `T\|()`). |
| **Visual Designer** | The visual editor in WSO2 Agent Builder for building agents and their logic. Stays in sync with the Ballerina source. |
| **Worker** | A Ballerina concurrency primitive. Workers execute code in parallel within a function and can communicate via message passing using the `->` and `<-` operators. |
| **WSO2 Agent Builder** | The editor for building AI agents. It provides a visual designer and a Ballerina source editor that stay in sync. |
| **WSO2 Agent Builder Copilot** | The AI assistant built into WSO2 Agent Builder. It builds, changes, runs, tests, and evaluates your agents in a chat. |
| **WSO2 Cloud** | The WSO2 cloud platform for deploying and managing your agents and MCP servers without managing infrastructure. |
| **xml** | A Ballerina built-in sequence type for XML data. Supports elements, text, comments, and processing instructions with XPath-like navigation syntax. |
