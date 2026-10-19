---
title: Overview
---

# Overview

SAP is a global leader in enterprise resource planning (ERP) software, offering solutions spanning HCM, CRM, SCM, PLM, and more. The Ballerina `ballerinax/sap` connector (v1.3.0) provides an HTTP client for interfacing with APIs across SAP's product suite, with built-in SAP system-compliant CSRF token authentication for seamless integration with services like S/4HANA OData APIs.

## Key features

- HTTP client with built-in CSRF token handling compliant with SAP system requirements
- Support for all standard HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
- Both remote functions and resource functions for flexible API invocation styles
- Automatic CSRF token fetching and injection for mutating requests (POST, PUT, PATCH, DELETE)
- Configurable authentication including Basic Auth, OAuth 2.0, and Bearer Token
- Compatible with SAP S/4HANA, SAP BTP, and other SAP product APIs exposed over HTTP/OData
- Flexible target type binding: responses can be bound to `json`, `xml`, `record {}`, or `http:Response`

## Actions

Actions are HTTP operations you invoke against SAP API endpoints. Use these actions for reading sales orders, creating business partners, updating materials, and more. The SAP connector exposes a single client with full HTTP method support:

| Client | Actions |
|--------|---------|
| `Client` | HTTP GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS with automatic CSRF token handling |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through setting up your SAP S/4HANA system to allow API access by creating a Communication System and Communication Arrangement.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
