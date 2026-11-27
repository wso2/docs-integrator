---
title: "Overview"
description: Manage repositories, issues, pull requests, and more using the Ballerina ballerinax/github connector for GitHub's REST API.
keywords: [wso2 integrator, github connector, ballerinax github, rest api, repositories, issues, pull requests]
---

# Overview

GitHub is a widely used platform for version control and collaboration, allowing developers to work together on projects from anywhere. The Ballerina `ballerinax/github` connector (v6.1.0) provides programmatic access to GitHub through its REST API (version 2022-11-28), enabling you to automate tasks, manage repositories, issues, pull requests, and more directly from Ballerina integration flows.

## Key features

- Authentication using either a Personal Access Token or the OAuth2 refresh token grant, with automatic renewal of expiring GitHub App user access tokens
- Full repository management: create, update, delete, list, and fork repositories
- Issue tracking: create, update, list, and comment on issues with label and assignee management
- Pull request management: create, update, list, merge, and review pull requests
- Branch and release management: list branches, create releases, manage tags
- Organization and team management: list orgs, teams, and members
- Gist management: create, update, list, star, fork, and comment on gists
- Security advisory access: query global and repository-specific security advisories
- GitHub Actions and workflow management: list and trigger workflow runs
- Dependabot, code scanning, and secret scanning alert access
- Event-driven webhook handling for GitHub issues, pull requests, releases, pushes, and repository activity through the companion `ballerinax/trigger.github` package
- Resource-based API design using Ballerina resource functions for intuitive path-based access to GitHub REST endpoints

## Actions

Actions are operations you invoke on GitHub from your integration, including managing repositories, creating issues, handling pull requests, and more. The GitHub connector exposes 903 resource functions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Repository and file management, issues, pull requests, branches, releases, organizations, teams, users, gists, security advisories, notifications, GitHub Actions and workflows, Dependabot alerts, code scanning, secret scanning, packages, deployments, and more |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Event-driven integration

To receive GitHub webhook events (pushes, pull requests, issues, releases, workflow runs and more), use the separate [`ballerinax/github.trigger`](https://central.ballerina.io/ballerinax/github.trigger) package. It provides a `Listener` and a service type per GitHub event (`PushService`, `PullRequestService`, `IssuesService` and others) that route each webhook to a typed event handler.

See the [GitHub Webhooks](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/github-webhooks) guide for configuration and usage.

## Triggers

Triggers allow your integration to react to GitHub repository and organization activity in real time. The separate `ballerinax/github.trigger` package provides a webhook listener that verifies each delivery from GitHub and invokes your service callbacks when pushes, pull requests, issues, releases, workflow runs and other events occur. It covers 75 GitHub events through 265 callbacks.

Commonly used trigger events:

| Event | Service type | Callback | Description |
|-------|--------------|----------|-------------|
| Push | `PushService` | `onPush` | Fired when commits or tags are pushed to a repository. |
| Pull request opened | `PullRequestService` | `onPullRequestOpened` | Fired when a pull request is opened. |
| Pull request review submitted | `PullRequestReviewService` | `onPullRequestReviewSubmitted` | Fired when a pull request review is submitted. |
| Issue opened | `IssuesService` | `onIssuesOpened` | Fired when an issue is opened. |
| Issue comment created | `IssueCommentService` | `onIssueCommentCreated` | Fired when a comment is added to an issue or pull request. |
| Release published | `ReleaseService` | `onReleasePublished` | Fired when a release is published. |
| Workflow run completed | `WorkflowRunService` | `onWorkflowRunCompleted` | Fired when a GitHub Actions workflow run completes. |

See the **[Trigger Reference](triggers.md)** for listener configuration, every service type and callback, and the event payload structure.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a GitHub Personal Access Token (PAT), or registering a GitHub App for the OAuth2 refresh token grant, to authenticate with the GitHub connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Trigger Reference](triggers.md)**: Reference for event-driven integration using the GitHub webhook listener and service model.

* **[Example](example.md)**: Learn how to build and configure an integration using the **GitHub** connector, including connection setup, operation configuration, execution flow, and event-driven trigger setup.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [GitHub Connector repository](https://github.com/ballerina-platform/module-ballerinax-github)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): create a Personal Access Token, or register a GitHub App for the OAuth2 refresh token grant
- [Action Reference](actions.md): full list of operations, parameters, and sample code
- [Example](example.md): step-by-step integration walkthroughs
- [GitHub Webhooks](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/github-webhooks): listen for GitHub events using webhooks
