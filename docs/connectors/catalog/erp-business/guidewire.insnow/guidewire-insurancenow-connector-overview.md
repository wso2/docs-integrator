---
title: Overview
---

# Overview

Guidewire InsuranceNow is a cloud-based insurance platform that provides core systems for policy administration, billing, and claims management. The Ballerina `ballerinax/guidewire.insnow` connector provides programmatic access to the InsuranceNow REST API (v5.0.0), enabling you to manage applications, policies, claims, drivers, documents, and addresses within your Ballerina integration flows.

## Key features

- Application lifecycle management; create quotes, convert to policies, and bind applications
- Policy retrieval and updates with optional field expansion
- Driver management: add, update, patch, delete, and list drivers on applications
- Document and attachment operations for applications and claims
- Claims note creation and retrieval for adjuster workflows
- Address verification and Google Places autofill support
- Pagination support via continuation IDs for large result sets

## Actions

Actions are operations you invoke on Guidewire InsuranceNow from your integration. Use these actions for creating quotes, managing drivers, attaching documents, and more. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Applications, policies, claims, drivers, documents, addresses |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining the credentials required to connect to the Guidewire InsuranceNow REST API.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Guidewire InsuranceNow** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Guidewire InsuranceNow Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-guidewire.insnow)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
