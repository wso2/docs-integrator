# HTTP Module Overview

The `ballerina/http` module (v2.16.0) provides APIs for connecting and interacting with HTTP and HTTP2 endpoints. It supports both outbound HTTP requests through clients and inbound request handling through listeners and services, making it the foundation for building REST APIs, service integrations, and HTTP-based workflows in WSO2 Integrator.

## Key features

- HTTP/1.1 and HTTP/2 protocol support with automatic version negotiation
- Multiple client types: standard, status-code-bound, failover, and load-balanced
- Built-in resilience with circuit breaker, retry policies, and failover strategies
- Connection pooling, keep-alive, and chunked transfer encoding
- Request/response payload binding to Ballerina types (JSON, XML, text, binary, streams)
- TLS/SSL with mutual authentication, SNI, CRL, and OCSP support
- Client and listener authentication (Basic, Bearer, JWT, OAuth2, LDAP)
- HTTP caching, compression, cookie management, and proxy support
- Request/response interceptor pipeline for cross-cutting concerns
- Resource-based service dispatching with path and query parameter binding

## Clients

The HTTP module provides four client types for different use cases:

| Client | Purpose |
|--------|---------|
| [`Client`](#) | Standard HTTP client for making outbound requests with full protocol support. |
| [`StatusCodeClient`](#) | HTTP client with status-code-based response binding for typed responses per HTTP status. |
| [`FailoverClient`](#) | Attempts subsequent endpoints on failure for high availability. |
| [`LoadBalanceClient`](#) | Round-robin load balancing across multiple endpoints. |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Listeners and services

The HTTP module provides a listener for accepting inbound HTTP requests. The `http:Listener` binds to a network port and dispatches incoming requests to service resources that you define: no polling required.

Supported service resource methods:

| HTTP Method | Resource Accessor | Description |
|-------------|-------------------|-------------|
| GET | `resource function get` | Handle GET requests: retrieve data. |
| POST | `resource function post` | Handle POST requests: create resources. |
| PUT | `resource function put` | Handle PUT requests: replace resources. |
| PATCH | `resource function patch` | Handle PATCH requests: partial updates. |
| DELETE | `resource function delete` | Handle DELETE requests: remove resources. |
| HEAD | `resource function head` | Handle HEAD requests: headers only. |
| OPTIONS | `resource function options` | Handle OPTIONS requests: discover methods. |
| Any | `resource function default` | Catch-all for any HTTP method not explicitly handled. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service resource methods, parameter binding, and interceptors.

## Documentation

* **[Action Reference](action-reference.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](trigger-reference.md)**: Listener configuration, service resource methods, parameter binding, and interceptors.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HTTP** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this module, please create a pull request in the following repository.

* [HTTP Module GitHub repository](https://github.com/ballerina-platform/module-ballerina-http)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
