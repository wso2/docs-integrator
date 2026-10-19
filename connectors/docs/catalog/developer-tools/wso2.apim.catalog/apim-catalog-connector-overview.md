---
title: Overview
---

# Overview

WSO2 API Manager's Service Catalog is a registry for backend service metadata that enables API-first development by allowing teams to publish and discover services before exposing them as managed APIs. The Ballerina `ballerinax/wso2.apim.catalog` connector (v1.2.2) provides programmatic access to the WSO2 APIM Service Catalog REST API, enabling you to create, retrieve, update, delete, import, and export service definitions: OpenAPI, WSDL, GraphQL SDL, and AsyncAPI from your Ballerina integration flows.

## Key features

- Full CRUD operations on Service Catalog entries: create, retrieve, update, and delete backend service definitions
- Support for multiple API definition types: OAS2, OAS3, WSDL1, WSDL2, GraphQL SDL, and AsyncAPI
- List and filter services by name, version, definition type, or service key with offset/limit pagination
- Retrieve raw API definition content (OpenAPI spec, WSDL, etc.) directly from the catalog for a given service
- Query which APIs are consuming a registered service to understand service usage and dependencies
- Bulk import services from a ZIP archive and export service definitions as downloadable binary artifacts
- Retrieve Service Catalog settings including the list of supported OAuth2 scopes
- OAuth 2.0 Password Grant authentication with a configurable token endpoint, scopes, and optional client credentials

## Actions

Actions are operations you invoke on the WSO2 APIM Service Catalog from your integration, including registering backend services, retrieving definitions, checking API usage, and managing the full service lifecycle. All actions are exposed through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Service CRUD, definition retrieval, usage lookup, bulk import/export, settings |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through identifying the Service Catalog API endpoint and obtaining the OAuth 2.0 credentials required to connect the Ballerina connector to your WSO2 API Manager instance.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **WSO2 APIM Catalog** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [WSO2 APIM Catalog Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-wso2.apim.catalog)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
