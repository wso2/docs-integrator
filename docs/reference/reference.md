---
title: Reference
---

# Reference

Pure lookup material - syntax, configuration keys, CLI commands, API docs, and specifications. No tutorials, no narrative - just the facts.

## Language

Ballerina language reference for integration developers:

- **[Type System](language/type-system.md)** - Structural types, unions, optional, any, stream, never
- **[Error Handling](language/error-handling.md)** - Error types and handling patterns
- **[Query Expressions](language/query-expressions.md)** - SQL-like data processing
- **[Concurrency](language/concurrency.md)** - Workers, strands, locks, transactions

## Configuration

Project and deployment configuration files:

| File                                                         | Purpose                           |
| ------------------------------------------------------------ | --------------------------------- |
| **[Configuration management](config/configuration-management.md)**    | Configurable variables, value sources, and environment variables |
| **[Ballerina.toml](project/ballerinatoml-reference.md)**              | Project metadata and dependencies |
| **[Config.toml](config/configtoml-reference.md)**                     | Runtime configuration values      |
| **[Cloud.toml](project/cloudtoml-reference.md)**                      | Cloud deployment settings         |

## APIs

- **[Management API](api/management.md)** - Runtime management endpoints
- **[Auth API](api/auth-api.md)** - Authentication and authorization endpoints
- **[ICP API](api/icp.md)** - Integration Control Plane API
- **[Ballerina API Docs](api/ballerina-documentation.md)** - Standard library API documentation

## ICP Configuration

Server and deployment configuration for WSO2 Integration Control Plane:

- **[Server Configuration](icp/server-configuration.md)** - Server settings and authentication token keys
- **[Database Configuration](icp/database-configuration.md)** - Main database and credentials database setup
- **[Authentication Configuration](icp/authentication-config.md)** - Authentication backends and LDAP configuration

## Specifications & formats

- **[Supported protocols](supported-protocols.md)** - Complete protocol support table
- **[Supported data formats](data-formats/supported-data-formats.md)** - Complete data format support table
- **[Ballerina by Example](ballerina-by-example.md)** - 200+ runnable examples
- **[Ballerina Specifications](ballerina-specifications.md)** - Language, library, and platform specs

## Miscellaneous

- **[Configure a Network Proxy for WSO2 Integrator](miscellaneous/configure-a-network-proxy.md)** - Set up proxy access in corporate environments
- **[Proxy Ballerina Central with Maven Repository](miscellaneous/proxy-ballerina-central-with-maven-repository.md)** - Set up Maven repository proxy for Ballerina Central

## Appendix

- **[Error Codes](appendix/error-code.md)** - Error code reference
- **[Glossary](appendix/glossary.md)** - Terminology definitions
- **[FAQ](appendix/faq.md)** - Frequently asked questions
- **[Release Notes](appendix/release-notes.md)** - What's new in each release

For troubleshooting and debugging, see [Debugging](../develop/debugging/editor.md).
