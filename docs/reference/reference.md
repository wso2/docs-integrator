---
title: Reference
---

# Reference

Pure lookup material — syntax, configuration keys, CLI commands, API docs, and specifications. No tutorials, no narrative — just the facts.

## Language

Ballerina language reference for integration developers:

- **[Syntax Quick Reference](language/ballerina-syntax-quick-reference.md)** — Core language constructs at a glance
- **[Type System](language/type-system.md)** — Structural types, unions, optional, any, stream, never
- **[Query Expressions](language/query-expressions.md)** — SQL-like data processing
- **[Concurrency](language/concurrency.md)** — Workers, strands, locks, transactions
- **[Error Handling](language/error-handling.md)** — Error types and handling patterns

## Configuration

Project and deployment configuration files:

| File                                                         | Purpose                           |
| ------------------------------------------------------------ | --------------------------------- |
| **[Ballerina.toml](config/ballerinatoml-reference.md)**               | Project metadata and dependencies |
| **[Config.toml](config/configtoml-reference.md)**                     | Runtime configuration values      |
| **[Cloud.toml](config/cloudtoml-reference.md)**                       | Cloud deployment settings         |
| **[Dependencies.toml](config/dependenciestoml-reference.md)**         | Locked dependency versions        |
| **[Environment Variables](config/environment-variables.md)** | Runtime environment configuration |

## CLI

Command-line tools reference:

| Command                                    | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| **[bal commands](cli/bal-command-reference.md)** | Core build, run, test, and package commands  |
| **[bal persist](../develop/tools/integration-tools/persist-tool.md)** | Data persistence code generation |
| **[bal openapi](../develop/tools/integration-tools/openapi-tool.md)** | Generate services/clients from OpenAPI specs |
| **[bal graphql](../develop/tools/integration-tools/graphql-tool.md)** | GraphQL schema generation |
| **[bal grpc](../develop/tools/integration-tools/grpc-tool.md)** | Generate code from .proto files |
| **[bal edi](../develop/tools/integration-tools/edi-tool.md)** | EDI schema processing |
| **[bal health](../develop/tools/integration-tools/health-tool.md)** | FHIR/HL7 health tool |
| **[Scan Tool](cli/bal-scan.md)** | Static analysis rules |

## APIs

- **[Management API](api/management.md)** — Runtime management endpoints
- **[ICP API](api/icp.md)** — Integration Control Plane API
- **[Ballerina API Docs](api/ballerina-documentation.md)** — Standard library API documentation

## WSO2 Integration Control Plane

- **[Install ICP](../manage/icp/install-icp.md)** — Install the ICP server and sign in for the first time
- **[Overview](../manage/icp/integration-control-plane.md)** — Components, default ports, and endpoints
- **[Access Control](../manage/icp/access-control.md)** — Control who can do what across organizations, projects, and integrations
- **[Manage Projects](../manage/icp/manage-projects.md)** — Create, edit, and delete projects
- **[Manage Environments](../manage/icp/manage-environments.md)** — Create, edit, and delete environments
- **[Manage Integrations](../manage/icp/manage-integrations.md)** — Create and manage BI integrations
- **[Manage Runtimes](../manage/icp/manage-runtimes.md)** — View runtimes, generate secrets, and manage connections
- **[Server Configuration](icp/server-configuration.md)** — Server settings and authentication token keys
- **[Database Configuration](icp/database-configuration.md)** — Main database and credentials database setup
- **[Authentication Configuration](icp/authentication-config.md)** — Authentication backends and LDAP configuration
- **[Connect an Integration to ICP](../manage/icp/connect-runtime.md)** — Register an integration runtime with ICP
- **[Connect MI Integration to ICP](../manage/icp/mi-profile/connect-runtime-mi.md)** — Register a Micro Integrator runtime with ICP
- **[Install ICP : Observability](../manage/icp/observability-setup.md)** — Set up centralized logs and metrics monitoring with Fluent Bit and OpenSearch
- **[Install ICP : MI Observability](../manage/icp/mi-profile/observability-setup-mi.md)** — Set up centralized logs and metrics monitoring for MI runtimes

## Specifications & formats

- **[Supported protocols](supported-protocols.md)** — Complete protocol support table
- **[Supported data formats](data-formats.md)** — Complete data format support table
- **[Ballerina by Example](ballerina-by-example.md)** — 200+ runnable examples
- **[Ballerina Specifications](ballerina-specifications.md)** — Language, library, and platform specs

## Appendix

- **[System Requirements](appendix/system-requirements.md)** — Supported platforms and versions
- **[Error Codes](error-code.md)** — Error code reference
- **[Glossary](glossary.md)** — Terminology definitions
- **[FAQ](faq.md)** — Frequently asked questions
- **[Troubleshooting](appendix/troubleshooting.md)** — Common issues and solutions
- **[Release Notes](release-notes.md)** — What's new in each release

## Miscellaneous

- **[Configure a Network Proxy for WSO2 Integrator](miscellaneous/configure-a-network-proxy.md)** — Set up proxy access in corporate environments
- **[Proxy Ballerina Central with Maven Repository](miscellaneous/proxy-ballerina-central-with-maven-repository.md)** — Set up Maven repository proxy for Ballerina Central
