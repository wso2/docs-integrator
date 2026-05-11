---
title: HubSpot CRM Extensions Videoconferencing
---

HubSpot CRM Extensions Videoconferencing is an API that lets you register and manage external video conferencing application settings within HubSpot. The Ballerina `ballerinax/hubspot.crm.extensions.videoconferencing` connector (v2.0.0) provides programmatic access to these settings through the HubSpot REST API, enabling you to create, retrieve, update, and delete videoconferencing webhook URLs for your HubSpot app.

## Key features

- Save video conferencing application settings (webhook URLs) to a HubSpot app
- Retrieve the current video conferencing settings for a HubSpot app
- Update existing video conferencing settings when endpoints change
- Delete all video conferencing settings when decommissioning an app
- Configure webhook URLs for meeting creation, update, deletion, and user verification

## Actions

Actions are operations you invoke on HubSpot from your integration: saving, retrieving, updating, or deleting video conferencing application settings. The connector exposes a single client:

| Client | Actions |
|--------|---------|
| `Client` | Video conferencing settings CRUD: save, retrieve, update, and delete webhook URLs |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a HubSpot developer app and obtaining the API key required to use the HubSpot CRM Extensions Videoconferencing connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **HubSpot CRM Extensions Videoconferencing** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [HubSpot CRM Extensions Videoconferencing Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.extensions.videoconferencing)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
