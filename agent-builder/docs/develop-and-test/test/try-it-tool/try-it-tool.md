---
title: Try-It Tool
---

# Try-It Tool

The Try-It tool is a built-in development-time testing interface that lets you send requests to your service and inspect responses without leaving WSO2 Agent Builder. Use it as you write code to verify behavior immediately, before committing to automated tests. The tool starts your service automatically when you select **Try It**, so there is no separate run step required.

## Try-It experiences

Different integration types open a different Try-It interface. Select the one that matches your integration:

| Integration type | Try-It experience | Page |
|---|---|---|
| **Chat agent** | Conversational chat panel for sending messages and validating agent responses | [Test Chat agent](try-it-chat.md) |
| **HTTP service** | Request builder with method, URL editor, headers, request body, and response viewer | [Test HTTP service](try-it-http.md) |
| **MCP server** | MCP Inspector for listing tools and invoking them with input parameters | [Test MCP server](try-it-mcp.md) |

## What's next

- [Agent evaluations](../../test/evaluations/evaluations.md) — score agent responses with evalsets and LLM-as-judge
- [Test Explorer](../test-explorer/test-explorer.md) — run automated test suites from the editor
