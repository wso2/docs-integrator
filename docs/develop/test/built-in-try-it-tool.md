---
title: Try-It tool
---

# Try-It tool

The Try-It tool is a built-in development-time testing interface that lets you send requests to your service and inspect responses without leaving WSO2 Integrator. Use it as you write code to verify behavior immediately, before committing to automated tests. The tool starts your service automatically when you select **Try It**, so there is no separate run step required.

## Try-It experiences

Different integration types open a different Try-It interface. Select the one that matches your integration:

| Integration type | Try-It experience | Page |
|---|---|---|
| **HTTP service** | Request builder with method, URL editor, headers, request body, and response viewer | [Test HTTP service](try-it-http.md) |
| **GraphQL service** | Built-in GraphiQL editor with schema explorer, query editor, and response panel | [Test GraphQL service](try-it-graphql.md) |
| **Chat agent** | Conversational chat panel for sending messages and validating agent responses | [Test Chat agent](try-it-chat.md) |
| **MCP server** | MCP Inspector for listing tools and invoking them with input parameters | [Test MCP server](try-it-mcp.md) |

## What's next

- [Test Explorer](test-explorer.md) — run automated test suites from the IDE
- [Generate tests with AI](ai-generated-cases.md) — generate test code automatically
