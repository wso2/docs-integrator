---
title: Overview
---

# Overview

GitHub is a widely used platform for version control and collaboration, allowing developers to work together on projects from anywhere. The Ballerina `ballerinax/github` connector (v5.1.0) provides programmatic access to GitHub through its REST API (version 2022-11-28), enabling you to automate tasks, manage repositories, issues, pull requests, and more directly from Ballerina integration flows.

## Key features

- Full repository management: create, update, delete, list, and fork repositories
- Issue tracking: create, update, list, and comment on issues with label and assignee management
- Pull request management: create, update, list, merge, and review pull requests
- Branch and release management: list branches, create releases, manage tags
- Organization and team management: list orgs, teams, and members
- Gist management: create, update, list, star, fork, and comment on gists
- Security advisory access: query global and repository-specific security advisories
- GitHub Actions and workflow management: list and trigger workflow runs
- Dependabot, code scanning, and secret scanning alert access
- Event-driven webhook handling for GitHub issues, pull requests, releases, pushes, and repository activity
- Resource-based API design using Ballerina resource functions for intuitive path-based access to GitHub REST endpoints

## Actions

Actions are operations you invoke on GitHub from your integration, including managing repositories, creating issues, handling pull requests, and more. The GitHub connector exposes 903 resource functions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Repository and file management, issues, pull requests, branches, releases, organizations, teams, users, gists, security advisories, notifications, GitHub Actions and workflows, Dependabot alerts, code scanning, secret scanning, packages, deployments, and more |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Event-driven integration

To receive GitHub webhook events (issues, pull requests, releases, pushes, and more), use the separate [`ballerinax/trigger.github`](https://github.com/ballerina-platform/module-ballerinax-trigger.github) package. It provides a `Listener` and service types (`IssuesService`, `PullRequestService`, and others) that route incoming GitHub webhook callbacks to typed event handlers.

See the [GitHub Webhooks](../../../develop/integration-artifacts/event/github-webhooks.md) guide for configuration and usage.

## Triggers

Triggers allow your integration to react to GitHub repository activity in real time. The connector provides a webhook listener that receives GitHub events and invokes your service callbacks automatically when issues, pull requests, releases, pushes, and other repository events occur.

Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| Issue opened | `onOpened` | Fired when a GitHub issue is opened. |
| Issue closed | `onClosed` | Fired when a GitHub issue is closed. |
| Issue comment created | `onCreated` | Fired when a comment is added to an issue or pull request. |
| Pull request opened | `onOpened` | Fired when a pull request is opened. |
| Pull request review submitted | `onSubmitted` | Fired when a pull request review is submitted. |
| Release published | `onPublished` | Fired when a repository release is published. |
| Push received | `onPush` | Fired when commits are pushed to a repository. |

See the **[Trigger Reference](triggers.md)** for listener configuration, service callbacks, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a GitHub Personal Access Token (PAT) required to authenticate with the GitHub connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the GitHub webhook listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **GitHub** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [GitHub Connector repository](https://github.com/ballerina-platform/module-ballerinax-github)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): create a GitHub Personal Access Token for authentication
- [Action Reference](actions.md): full list of operations, parameters, and sample code
- [Example](example.md): step-by-step integration walkthroughs
- [GitHub Webhooks](../../../develop/integration-artifacts/event/github-webhooks.md): listen for GitHub events using webhooks
