---
title: Example
---

# Example

## What you'll build

Build an integration workflow that connects to an SAP S/4HANA system and retrieves reservation documents. The workflow calls the Reservation Document OData V4 API and logs the result as JSON.

**Operations used:**
- **listReservationDocuments** : Reads reservation documents from the SAP S/4HANA system, returning the first 10 results

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[listReservationDocuments Operation]
    B --> C[SAP Reservation Document (A2X) Connector]
    C --> D((SAP S/4HANA))
```

## Prerequisites

- Access to an SAP S/4HANA Cloud system with a communication user assigned to the communication arrangement this connector needs (see the [Setup Guide](setup-guide.md))

## Setting up the SAP Reservation Document (A2X) integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the SAP Reservation Document (A2X) connector

### Step 1: Open the connector palette and search for the connector

Select **Add Artifact**, then select **Connection** to open the connector palette. Search for `ce_apireservationdocument_0001` and select the **Ce_apireservationdocument_0001** connector card.

<ThemedImage
    alt="Add Connection palette open with the search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_01_palette.png'),
    }}
/>

## Configuring the SAP Reservation Document (A2X) connection

### Step 2: Fill in the connection parameters

Enter the connection parameters, binding each field to a configurable variable:

- **Config** : `ConnectionConfig` record with Basic Authentication credentials; switch to **Expression** and enter `{auth: {username: sapS4HanaUsername, password: sapS4HanaPassword}}`
- **Hostname** : SAP S/4HANA API hostname; bind to the `sapS4HanaHostname` configurable variable
- **Connection Name** : Keep the default `ceApireservationdocument0001Client`

<ThemedImage
    alt="SAP Reservation Document (A2X) connection form filled with configurable variables before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection**. The connection appears under **Connections** in the project tree and on the design canvas.

<ThemedImage
    alt="Design canvas showing the saved ceApireservationdocument0001Client connection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_03_connection_saved.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_03_connection_saved.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below:

- **sapS4HanaHostname** (string) : The API hostname of your SAP S/4HANA Cloud system, for example, `my123456-api.s4hana.cloud.sap`
- **sapS4HanaUsername** (string) : The communication user name
- **sapS4HanaPassword** (string) : The communication user password

## Configuring the SAP Reservation Document (A2X) listReservationDocuments operation

### Step 5: Add an automation entry point

Select **Add Artifact**, then select **Automation** and select **Create** to add the automation entry point to the canvas.

### Step 6: Select and configure the listReservationDocuments operation

1. On the automation canvas, select the **+** button to add a step.
2. Expand the **ceApireservationdocument0001Client** connection under **Connections**.

<ThemedImage
    alt="ceApireservationdocument0001Client connection expanded in the node panel showing the available operations"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_04_operations.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_04_operations.png'),
    }}
/>

3. Select **List Reservation Documents** (`listReservationDocuments`) and configure it:

- **$top** : Under **Advanced Configurations**, set to `10` to limit the results to the first 10 records
- **Result** : Set the result variable name to `result`

<ThemedImage
    alt="listReservationDocuments operation form with $top set to 10"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_05_operation_form.png'),
    }}
/>

4. Select **Save** to add the operation to the flow, then add a **Log Info** step after it that logs `result.toJsonString()` in **Expression** mode.

<ThemedImage
    alt="Completed automation flow with the listReservationDocuments operation and a log step"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.ce_apireservationdocument_0001/sap_s4hana_ceapireservationdocument0001_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.ce_apireservationdocument_0001_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.ce_apireservationdocument_0001_connector_sample)

## More code examples

The SAP S/4HANA Inventory Ballerina connectors provide practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory/tree/main/examples), covering use cases like point-of-sale stock reservations and warehouse document automation.

1. [POS Integration with S/4HANA](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory/tree/main/examples/pos-to-s4hana) - Check real-time material stock and create reservation documents in S/4HANA from point-of-sale orders.

2. [Warehouse Automation through S/4HANA Integration](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.inventory/tree/main/examples/warehouse-to-s4hana) - Digitize paper delivery notes with OCR and create material documents in S/4HANA from the extracted data.
