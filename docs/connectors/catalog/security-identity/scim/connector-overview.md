---
title: Overview
---

# Overview

SCIM (System for Cross-domain Identity Management) is a widely-adopted standard protocol for automating the exchange of user identity information between identity domains or IT systems. The Ballerina `ballerinax/scim` connector (v1.0.1) provides programmatic access to SCIM 2.0 compliant identity providers and services, enabling you to manage users, groups, and bulk provisioning operations through the SCIM 2.0 REST API.

## Key features

- Full CRUD operations on SCIM User resources — create, get, update (PUT/PATCH), and delete users by ID
- Full CRUD operations on SCIM Group resources — create, get, update (PUT/PATCH), and delete groups by ID
- Filtering and searching users and groups using SCIM filter expressions (Eq, Co, Sw, Ew, Ne, and)
- Bulk provisioning of users and groups through the SCIM /Bulk endpoint for large-scale operations
- Service Provider Configuration and Resource Types discovery endpoints
- OAuth 2.0 Client Credentials authentication for secure M2M access
- SCIM schema records modeled as Ballerina types for type-safe identity data handling

## Actions

Actions are operations you invoke on a SCIM 2.0 compliant identity provider from your integration — listing users, creating groups, running bulk provisioning, and more. The SCIM connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | User CRUD, Group CRUD, User/Group search, Bulk operations, Service Provider Config, Resource Types |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up an Asgardeo Machine-to-Machine (M2M) application and obtaining the OAuth 2.0 client credentials required to use the SCIM connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SCIM** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SCIM Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-scim)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
