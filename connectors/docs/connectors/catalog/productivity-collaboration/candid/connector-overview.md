---
title: Overview
---

# Overview

Candid (formerly GuideStar) is a nonprofit data platform that provides comprehensive information on U.S. nonprofits, including financials, people, DEI data, and IRS compliance validation. The Ballerina `ballerinax/candid` connector (v0.2.0) provides programmatic access to Candid's Essentials search API, Premier profile API, and Charity Check PDF API, enabling you to integrate nonprofit data into your Ballerina integration flows.

## Key features

- Search for nonprofits using keywords, geographic filters, financial filters, and organization filters via the Essentials API
- Retrieve comprehensive nonprofit profiles including financials, people, DEI data, and program descriptions via the Premier API
- Download Charity Check PDF reports for IRS compliance verification
- Download Pro PDF and Financial Trends Analysis (FTA) PDF reports for detailed nonprofit analysis
- Lookup available search filter names and filterable values for dynamic search construction
- Support for multiple API versions (v1, v2, v3) with the latest v3 endpoints recommended

## Actions

Actions are operations you invoke on Candid from your integration. Use these actions for searching nonprofits, retrieving profiles, and downloading PDF reports. The Candid connector exposes actions across three clients:

| Client | Actions |
|--------|---------|
| `Essentials Client` | Nonprofit search, filter lookups |
| `Premier Client` | Nonprofit profile retrieval, Pro PDF, FTA PDF downloads |
| `Charity Check PDF Client` | Charity Check PDF report downloads |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through obtaining API credentials from Candid to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Candid Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-candid)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
