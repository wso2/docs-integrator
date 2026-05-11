---
title: Overview
---

# Overview

Elastic Cloud is a cloud-hosted Elasticsearch service provided by Elastic, offering scalable search and analytics capabilities with enterprise-grade security and management features. The Ballerina `ballerinax/elastic.elasticcloud` connector (v1.0.0) provides programmatic access to the Elastic Cloud REST API, enabling you to manage deployments, extensions, traffic filters, organizations, API keys, and stack versions from your Ballerina integration flows.

## Key features

- Full deployment lifecycle management: create, list, search, update, shutdown, and restore deployments
- Elasticsearch resource operations including password resets, keystore management, ILM/SLM/CCR enablement, and remote cluster configuration
- Extension management for uploading and managing custom Elasticsearch plugins and bundles
- Traffic filter ruleset CRUD with association management for IP filtering and Private Link
- Organization administration including member management, invitations, domain claims, SSO/IdP configuration, and role mappings
- API key lifecycle management: create, list, get, and delete API keys
- Stack version discovery to query available Elastic Stack versions and deployment templates
- Account and trusted environment management for cross-account trust relationships

## Actions

Actions are operations you invoke on Elastic Cloud from your integration: managing deployments, configuring traffic filters, administering organizations, and more. The connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Deployment CRUD, Elasticsearch resource operations, extensions, traffic filters, organizations, API keys, stack versions, account management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an Elastic Cloud account and generating the API key required to authenticate the Elastic Cloud connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Elastic Cloud** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Elastic Cloud Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-elastic.elasticcloud)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
