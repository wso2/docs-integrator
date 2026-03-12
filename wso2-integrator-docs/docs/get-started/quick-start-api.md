---
sidebar_position: 7
title: "Quick Start: Integration as API"
description: Build an HTTP service that calls an external API and returns a greeting.
---

# Quick Start: Integration as API

**Time:** Under 10 minutes | **What you'll build:** An HTTP service that receives requests, calls an external API, and returns the response.

## Prerequisites

- [WSO2 Integrator extension installed](install.md)

## Architecture

```
Client                    Your Service               External API
  │                      /hello:9090              apis.wso2.com
  │  GET /greeting            │                        │
  │──────────────────────────►│   GET /mi-qsg/v1.0     │
  │                           │───────────────────────►│
  │                           │◄───────────────────────│
  │◄──────────────────────────│   {"message":"Hello"}  │
  │  {"message":"Hello!!!"}   │                        │
```

## Step 1: Create the Project

1. Open the WSO2 Integrator sidebar in VS Code.
2. Click **Create New Integration**.
3. Enter the integration name (e.g., `HelloWorld`).
4. Click **Create Integration**.

## Step 2: Add an HTTP Service

1. In the design view, add an **HTTP Service** artifact.
2. Set the base path to `/hello` and port to `9090`.
3. Add a **GET** resource at the path `/greeting`.

## Step 3: Connect to an External API

1. Add an HTTP connection to `https://apis.wso2.com/zvdz/mi-qsg/v1.0`.
2. In the GET resource, invoke the external API and return its response.

In code, this looks like:

```ballerina
import ballerina/http;

final http:Client externalApi = check new ("https://apis.wso2.com/zvdz/mi-qsg/v1.0");

service /hello on new http:Listener(9090) {
    resource function get greeting() returns json|error {
        json response = check externalApi->get("/");
        return response;
    }
}
```

## Step 4: Run and Test

1. Click **Run** in the toolbar (top-right corner).
2. Once the service starts, test with curl:

```bash
curl http://localhost:9090/hello/greeting
```

Expected response:

```json
{"message": "Hello World!!!"}
```

You can also use the built-in **Try It** panel in VS Code to test the endpoint interactively.

## What's Next

- [Quick Start: Automation](quick-start-automation.md) -- Build a scheduled job
- [Quick Start: AI Agent](quick-start-ai-agent.md) -- Build an intelligent agent
- [Quick Start: Event Integration](quick-start-event.md) -- React to messages from Kafka or RabbitMQ
- [Tutorials](/docs/tutorials) -- End-to-end walkthroughs and patterns
