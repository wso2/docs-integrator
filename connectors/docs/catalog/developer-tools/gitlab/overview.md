---
title: Gitlab
---

# Gitlab

The Gitlab connector integrates with [GitLab](https://about.gitlab.com/), a comprehensive DevSecOps platform for source control, CI/CD, issue tracking, and package management. It supports version 4 of the GitLab REST API, working with both gitlab.com and self-managed GitLab installations. Using this connector, teams can automate project management, code review workflows, pipeline execution, and package registry operations directly from their integrations.

## Key Features

- Manage projects, groups, members, and access tokens
- Track and triage work using issues, epics, milestones, labels, and boards
- Automate code review workflows with merge requests, discussions, and approvals
- Interact with repositories, branches, tags, commits, and releases
- Trigger and monitor CI/CD pipelines, jobs, runners, and environments
- Publish and consume packages via the GitLab package, container, and model registries
- Support for personal, project, and group access tokens as well as OAuth 2.0

## Actions

The Gitlab connector exposes a single client that covers the full breadth of the GitLab REST API v4.

| Client | Actions |
|--------|---------|
| `Client` | Projects, Groups, Users, Issues, Merge Requests, Repositories, CI/CD Pipelines, Runners, Package Registries |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create a GitLab personal access token and configure the API base URL for self-managed instances.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Gitlab** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Gitlab Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-gitlab)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
