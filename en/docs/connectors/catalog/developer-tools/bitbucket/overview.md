---
connector: true
connector_name: "bitbucket"
title: "Bitbucket"
description: "Overview of the ballerinax/bitbucket connector for WSO2 Integrator."
---

# Bitbucket

The Bitbucket connector lets applications work with [Bitbucket Cloud](https://bitbucket.org/), Atlassian's Git repository hosting and collaboration platform, through version 2.0 of its REST API. It covers the full operation surface of the API, including repositories, branches, tags, commits, pull requests, pipelines, snippets, projects, workspaces, and permissions, so source-control and CI/CD workflows can be automated from an integration.

## Key Features

- Create, update, and delete repositories, branches, tags, and branch restriction rules
- Open, review, approve, and merge pull requests, and retrieve their activity and comments
- Browse commits, diffs, source files, and commit statuses
- Manage Bitbucket Pipelines, including variables, schedules, runners, and caches
- Administer workspaces, projects, members, and permissions
- Share code using snippets and manage SSH and GPG keys
- Authenticate using OAuth 2.0, Bearer tokens, API keys, or Basic Auth

## Actions

The connector exposes a single `Client` that covers all Bitbucket Cloud REST API operations.

| Client | Actions |
|--------|---------|
| `Client` | Repositories, Branches & Tags, Pull Requests, Commits, Pipelines, Workspaces, Projects, Snippets, SSH & GPG Keys, Permissions |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a Bitbucket access token or OAuth 2.0 consumer to authenticate with the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Bitbucket** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Bitbucket Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-bitbucket)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
