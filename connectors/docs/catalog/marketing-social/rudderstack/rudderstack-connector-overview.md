---
title: Overview
---

# Overview

RudderStack is a customer data platform that collects customer events from websites, apps and servers, routes them to warehouses and business tools, and builds unified customer profiles from them. The WSO2 RudderStack Connector enables you to send customer events through the RudderStack Event Stream (HTTP) API, read and delete the profiles that RudderStack Profiles materializes in a Redis destination through the Activation API, and start and monitor Profiles runs through the Profiles API, directly from your integration flows.

## Key features

- Send `identify`, `track`, `page`, `screen`, `group` and `alias` events, one at a time or several in a single batch
- Route each operation to the right RudderStack host with the right credential from a single client: the source write key for the Event Stream API and a Service Access Token for the Activation and Profiles APIs
- Preserve per-user event ordering with the `AnonymousId` header, which the client fills in from each event's `anonymousId`
- Read one profile or up to 100 profiles from the Redis destination of a RudderStack Profiles project
- Delete one or several profiles from the Redis destination
- Start a Profiles project run and poll its status until it finishes
- Select the US or EU region for the Activation and Profiles APIs with a single setting

## Actions

Actions are operations you invoke on RudderStack from your Ballerina integration. Use them to stream customer events from any system into RudderStack, look up a customer's computed traits during a flow, honor data deletion requests, and refresh profiles on a schedule.

| Client | Actions |
|--------|---------|
| `Client` | Event Stream (identify, track, page, screen, group, alias, batch), Activation (get and delete profiles), Profiles (start a run, get run status) |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an HTTP source to get the write key and the data plane URL, and generating the access token for the Activation and Profiles APIs.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **RudderStack** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [RudderStack Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-rudderstack)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
