---
sidebar_position: 1
title: Design Logic
description: "Design your integration logic using the visual flow designer, code editor, or a combination of both."
---

# Design Logic

Design the behavior of your integrations -- the logic that runs when a request arrives, an event fires, or a schedule triggers. WSO2 Integrator gives you two complementary approaches: a visual flow designer for rapid development and a full code editor for advanced scenarios. Both views stay synchronized, so you can switch freely between them.

## Approaches to Designing Logic

| Approach | Best For | Entry Point |
|---|---|---|
| **[Visual Flow Designer](flow-designer.md)** | Most integration scenarios, visual thinkers, rapid prototyping | Click on any `.bal` file |
| **[Ballerina Pro-Code](ballerina-pro-code.md)** | Complex algorithms, advanced concurrency, custom protocols | Edit `.bal` files directly |
| **Hybrid** | Start visual, switch to code for specific blocks | Use both views side-by-side |

## Core Concepts

Every integration follows a similar pattern: receive input, process it through a series of steps, and produce output. The design logic tools help you define those steps.

```
Input → [Validate] → [Transform] → [Route] → [Call External] → [Respond]
```

The building blocks of integration logic include:

- **[Connections](connections.md)** -- Connect to databases, APIs, brokers, and cloud services
- **[Control Flow](control-flow.md)** -- Branch, loop, and match on conditions
- **[Error Handling](error-handling.md)** -- Handle failures with try/catch, retry, and fallback
- **[Expressions](expressions.md)** -- Transform data inline with the Ballerina expression language
- **[Query Expressions](query-expressions.md)** -- Filter, transform, and aggregate collections with SQL-like syntax
- **[Configuration](configuration-management.md)** -- Externalize settings for different environments
- **[Functions](functions.md)** -- Extract and reuse common logic
- **[Java Interoperability](java-interoperability.md)** -- Call Java libraries from your integrations

## Quick Example

Here is a complete integration that receives an HTTP request, validates the payload, calls an external API, transforms the result, and returns a response:

```ballerina
import ballerina/http;

configurable string crmEndpoint = ?;
final http:Client crmClient = check new (crmEndpoint);

type ContactRequest record {|
    string firstName;
    string lastName;
    string email;
|};

type ContactResponse record {|
    string id;
    string fullName;
    string email;
    string createdAt;
|};

service /api on new http:Listener(8090) {

    resource function post contacts(ContactRequest req)
            returns ContactResponse|http:BadRequest|error {
        // 1. Validate
        if req.email == "" || !req.email.includes("@") {
            return <http:BadRequest>{body: {message: "Invalid email address"}};
        }

        // 2. Transform for external API
        json crmPayload = {
            first_name: req.firstName,
            last_name: req.lastName,
            email_address: req.email
        };

        // 3. Call external system
        json crmResponse = check crmClient->post("/contacts", crmPayload);

        // 4. Transform response
        return {
            id: check crmResponse.id,
            fullName: req.firstName + " " + req.lastName,
            email: req.email,
            createdAt: check crmResponse.created_at
        };
    }
}
```

In the visual flow designer, this same logic appears as a sequence of connected nodes that you can inspect, rearrange, and modify without writing code.

<!-- TODO: Screenshot of the visual flow designer showing the above logic as a flow diagram -->

## Guides

- [Visual Flow Designer](flow-designer.md) -- Build logic with drag-and-drop nodes
- [Managing Connections](connections.md) -- Configure and test external connections
- [Control Flow](control-flow.md) -- If/else, match, foreach, while, and more
- [Error Handling](error-handling.md) -- Try/catch, retry, circuit breaker, fallback
- [Expressions](expressions.md) -- Inline data transformation expressions
- [Query Expressions](query-expressions.md) -- SQL-like queries over collections
- [Configuration Management](configuration-management.md) -- Config.toml and configurable variables
- [Functions](functions.md) -- Reusable logic blocks
- [Ballerina Pro-Code](ballerina-pro-code.md) -- Full code editing with IDE support
- [Java Interoperability](java-interoperability.md) -- Call Java libraries via FFI

## What's Next

- [Integration Artifacts](/docs/develop/integration-artifacts) -- Understand the artifact types that contain your logic
- [Test](/docs/develop/test/try-it) -- Validate your logic with the built-in Try-It tool
