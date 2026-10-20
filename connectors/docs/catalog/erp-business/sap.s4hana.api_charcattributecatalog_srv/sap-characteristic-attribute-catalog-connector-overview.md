---
title: Overview
---

# Overview

SAP Characteristic Attribute Catalog is an SAP S/4HANA OData V2 API (`API_CHARCATTRIBUTECATALOG_SRV`) that exposes the quality management catalog used to record inspection results for qualitative characteristics. The catalog is organized in plant-specific selected sets, each of which groups the allowed codes (for example, `01` Smooth and `02` Rough for the characteristic Surface) together with their valuation and defect class. The Ballerina `ballerinax/sap.s4hana.api_charcattributecatalog_srv` connector enables you to read selected sets, their codes and their language-dependent texts directly from your Ballerina integration flows.

## Key features

- Read the selected sets of the characteristic attribute catalog for a plant, including their status and change information
- Read the codes and code groups in a selected set, with the valuation (accepted or rejected) and defect class of each code
- Read the language-dependent texts of selected sets and of individual codes
- Look up a single selected set, code or text by its key, for example to validate an inspection result before posting it
- List and filter catalog data using OData query parameters (`$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`)
- Combine multiple read requests in a single OData `$batch` call

## Actions

Actions are operations you invoke on SAP S/4HANA from your Ballerina integration. The Characteristic Attribute Catalog API is read-only, so use these actions to replicate the allowed inspection codes to laboratory, shop floor or supplier quality systems, show the code texts in the user's language, and check whether a recorded code leads to acceptance or rejection.

| Client | Actions |
|--------|---------|
| `Client` | Selected sets, selected set codes, selected set texts, code texts, batch operations |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating the SAP S/4HANA Cloud communication user, the communication system and the Inspection Master Data Integration (`SAP_COM_0110`) communication arrangement, and obtaining the credentials required to use the connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **SAP Characteristic Attribute Catalog** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [SAP S/4HANA Quality Management Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.qm)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
