---
title: Publish Connector
---

# Publish Connector

Whether you built your connector from scratch ([Build from Scratch](custom-development.md)) or generated it from an OpenAPI specification ([Build from OpenAPI Spec](create-from-openapi-spec.md)), you can publish it to [Ballerina Central](https://central.ballerina.io/) to share it with your team or the broader community.

If you generated your connector from an OpenAPI specification directly in a project, package it as a standalone Ballerina project first — see [Step 1: Set up the project structure](custom-development.md#step-1-set-up-the-project-structure) for the expected layout — then continue below.

## Update the package metadata

Update `Ballerina.toml` with your connector metadata:

```toml
[package]
org = "your_org"
name = "myconnector"
version = "1.0.0"
license = ["Apache-2.0"]
authors = ["Your Name"]
keywords = ["integration", "myservice", "Vendor/MyService", "Area/Communication", "Type/Connector"]
repository = "https://github.com/your-username/module-ballerinax-myconnector"
icon = "icon.png"
```

### Keywords for the WSO2 Integration Platform

The `Vendor/`, `Area/`, and `Type/` keywords classify your connector in the WSO2 Integration Platform connector catalog. Use the following format:

| Keyword | Purpose | Example |
|---|---|---|
| `Vendor/<name>` | The service or company the connector targets | `Vendor/Salesforce` |
| `Area/<category>` | The functional category of the connector | `Area/CRM & Sales` |
| `Type/Connector` | Marks the package as a connector (use this fixed value) | `Type/Connector` |
| `Name/<display name>` | Optional. Use when the display name should differ from the package name | `Name/Salesforce CRM` |

The WSO2 Integration Platform connector catalog currently lists pre-built WSO2 connectors. Support for community-published connectors is planned, and adding these keywords now ensures your connector is ready when that support rolls out.

## Publish to Ballerina Central

Follow the [package publishing guide](https://ballerina.io/learn/publish-packages-to-ballerina-central/) to publish to Ballerina Central.

## What's next

- [Build your own connector](build-own.md): Compare approaches for creating custom connectors
- [Build from OpenAPI Spec](create-from-openapi-spec.md): Generate a connector automatically from an OpenAPI definition
- [Build from Scratch](custom-development.md): Write a connector from scratch
- [Connector catalog](../catalog/index.mdx): Browse all available pre-built connectors
