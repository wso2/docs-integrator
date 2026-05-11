---
title: Build your own connector
---

# Build your own connector

When no pre-built connector exists for your target service, you can build one yourself. WSO2 Integrator supports two approaches: generating a connector automatically from an OpenAPI specification, or writing one from scratch in Ballerina for full control over authentication, error handling, and data transformation.

## When to build a custom connector

Consider building a custom connector when:

- No pre-built connector exists for your target service or API in the [Connector Catalog](../catalog/)
- You need custom logic beyond what a standard connector provides, such as specialized authentication flows, data transformations, or retry strategies
- You're integrating with an internal API that is private to your organization
- You want to publish and share a reusable connector with your team or the broader community via [Ballerina Central](https://central.ballerina.io/)

## Choose your approach

WSO2 Integrator offers two ways to build custom connectors:

| Approach | Best For | Effort |
|---|---|---|
| [**Create from OpenAPI Spec**](create-from-openapi-spec.md) | Quick integration with any REST API that has an OpenAPI definition | Low (no coding required) |
| [**Custom Development**](custom-development.md) | Full control over connector implementation, advanced logic, or publishing to Ballerina Central | Medium (requires Ballerina knowledge) |

### Create from OpenAPI spec

The fastest way to connect to a new API. Simply import an OpenAPI specification file directly in the WSO2 Integrator IDE, and a fully functional connector is generated automatically. No coding required.

**Best for:** Rapid prototyping, standard REST APIs, internal APIs with OpenAPI specs.

[Create a connector from an OpenAPI spec](create-from-openapi-spec.md)

### Custom development

Build a connector from scratch using Ballerina. This approach gives you full control over the connector architecture, including custom authentication, error handling, and data transformation logic. You can also publish your connector to Ballerina Central for others to use.

**Best for:** Complex integrations, reusable organizational connectors, community contributions.

[Build a connector with custom development](custom-development.md)

## What's next

- [Create from OpenAPI spec](create-from-openapi-spec.md): Generate a connector automatically from an OpenAPI definition
- [Custom development](custom-development.md): Write a connector from scratch and optionally publish it to Ballerina Central
- [Connector catalog](../catalog/index.mdx): Browse all available pre-built connectors
