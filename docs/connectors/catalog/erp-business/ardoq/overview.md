---
title: Ardoq
---

[Ardoq](https://www.ardoq.com/) is a data-driven enterprise architecture platform that helps organizations model, analyze, and visualize their business and IT landscapes as connected data. The `ballerinax/ardoq` connector offers APIs to connect to the [Ardoq Public API](https://developer.ardoq.com/public-api/), enabling operations on components, references, workspaces, reports, attachments, and transactional batch requests.

## Key Features

- Create, update, and delete individual components and references that model your business and IT landscape
- Discover a workspace's component types, reference types, and custom fields through its workspace context
- List workspaces and retrieve a single workspace by its identifier
- List and retrieve attachments associated with your organization's workspaces
- Run report definitions and pull the results as tabular data or structured objects
- Execute or dry-run (expand) bulk batch requests that create, update, or delete many components and references in a single call, with alias support for referencing not-yet-created entities
- Automatically scopes requests to your organization on the shared `app.ardoq.com` host via an `orgLabel` configuration

## Actions

The connector exposes a single client for interacting with the Ardoq Public API.

| Client | Actions |
|---|---|
| [`Client`](action-reference.md#client) | Manages Ardoq components, references, workspaces, reports, attachments, and batch operations. |

## Documentation

- [Setup Guide](setup-guide.md) - Generate an Ardoq API token
- [Example](example.md) - Build an automation that lists Ardoq workspaces
- [Action Reference](action-reference.md) - Available operations

## How to contribute

Contribute to the connector's development on GitHub: [module-ballerinax-ardoq](https://github.com/ballerina-platform/module-ballerinax-ardoq).
