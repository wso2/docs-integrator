---
title: SAP Business One Service
---

[SAP Business One](https://www.sap.com/products/erp/business-one.html) is an enterprise resource planning (ERP) solution designed for small and midsize businesses by SAP SE. The `ballerinax/sap.businessone.service` connector provides access to the service module objects of SAP Business One — service calls, contracts, customer equipment cards, and the knowledge base — exposed through the [SAP Business One Service Layer](https://help.sap.com/doc/056f69366b5345a386bb8149f1700c19/10.0/en-US/Service%20Layer%20API%20Reference.html) (OData). It handles the Service Layer's session-based authentication transparently, so you can create, query, update, and process service objects directly from your integration.

## Key Features

- Create and process service calls with activities, scheduling, and resolutions
- Manage service contracts and contract templates, including cancel and close actions
- Maintain customer equipment cards
- Query and extend the solutions knowledge base
- Administer service call reference data — origins, problem types and sub-types, statuses, and call types
- Session-based authentication with automatic re-login on session expiry
- OData V3 query support with paging and total-count controls

## Actions

The connector exposes a single client that groups operations for every service module object.

| Client | Actions |
|--------|---------|
| `Client` | Service calls, Service contracts, Contract templates, Customer equipment cards, Knowledge base solutions, Queues, Service call origins, Problem types & sub-types, Solution statuses, Service call statuses, Service call types |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to enable the SAP Business One Service Layer and obtain the connection values required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Business One Service** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP Business One Service Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.businessone)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
