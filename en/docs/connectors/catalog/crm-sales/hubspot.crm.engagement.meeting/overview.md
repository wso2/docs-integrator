---
connector: true
connector_name: "hubspot.crm.engagement.meeting"
title: "hubspot.crm.engagement.meeting"
description: "Overview of the ballerinax/hubspot.crm.engagement.meeting connector for WSO2 Integrator."
---

The `hubspot.crm.engagement.meeting` connector enables Ballerina applications to interact with the [HubSpot Meetings API](https://developers.hubspot.com/docs/guides/api/crm/engagements/meetings), allowing you to create, retrieve, update, and delete meeting engagement records within HubSpot CRM. It supports both individual and batch operations, making it straightforward to manage large volumes of meeting data. The connector authenticates via OAuth 2.0 or a private app API key.

## Key Features

- Create, retrieve, update, and delete individual HubSpot meeting records
- Perform batch operations to read, create, update, archive, and upsert multiple meetings in a single call
- Search meetings using flexible filter groups and sort criteria
- Associate meetings with contacts and other HubSpot CRM objects
- Paginate through meeting lists with customizable property and association selection
- Support for both OAuth 2.0 and private app API key authentication

## Actions

The connector exposes a single `Client` that covers all meeting engagement operations, including individual CRUD, batch processing, and search.

| Client | Actions |
|--------|---------|
| `Client` | List meetings, Create meeting, Retrieve meeting, Update meeting, Delete meeting, Batch read, Batch create, Batch update, Batch archive, Batch upsert, Search meetings |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: Step-by-step instructions for creating a HubSpot developer app and obtaining the OAuth 2.0 credentials required to authenticate the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [hubspot.crm.engagement.meeting Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.engagement.meeting)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.