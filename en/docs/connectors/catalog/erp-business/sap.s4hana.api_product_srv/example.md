---
connector: true
connector_name: "sap.s4hana.api_product_srv"
title: "Example"
description: "Build an automation that connects to SAP S/4HANA and lists product master records with the ballerinax/sap.s4hana.api_product_srv connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Example

## What you'll build

Build an integration workflow that connects to an SAP S/4HANA system and retrieves product master records. The workflow calls the Product Master (A2X) API and logs the result as JSON.

**Operations used:**
- **listA_Products** : Reads product master records from the SAP S/4HANA system, returning the first 10 results

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[listA_Products Operation]
    B --> C[SAP Product Master Connector]
    C --> D((SAP S/4HANA))
```

## Prerequisites

- Access to an SAP S/4HANA Cloud system with a communication user assigned to the communication arrangement this connector needs (see the [Setup Guide](setup-guide.md))

## Setting up the SAP Product Master integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the SAP Product Master connector

### Step 1: Open the connector palette and search for the connector

Select **Add Artifact**, then select **Connection** to open the connector palette. Search for `api_product_srv` and select the **Api_product_srv** connector card.

<ThemedImage
    alt="Add Connection palette open with the search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_01_palette.png'),
    }}
/>

## Configuring the SAP Product Master connection

### Step 2: Fill in the connection parameters

Enter the connection parameters, binding each field to a configurable variable:

- **Config** : `ConnectionConfig` record with Basic Authentication credentials; switch to **Expression** and enter `{auth: {username: sapS4HanaUsername, password: sapS4HanaPassword}}`
- **Hostname** : SAP S/4HANA API hostname; bind to the `sapS4HanaHostname` configurable variable
- **Port** : Leave empty to use the default port `443`
- **Connection Name** : Keep the default `apiProductSrvClient`

<ThemedImage
    alt="SAP Product Master connection form filled with configurable variables before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection**. The connection appears under **Connections** in the project tree and on the design canvas.

<ThemedImage
    alt="Design canvas showing the saved apiProductSrvClient connection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_03_connection_saved.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_03_connection_saved.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below:

- **sapS4HanaHostname** (string) : The API hostname of your SAP S/4HANA Cloud system, for example, `my123456-api.s4hana.cloud.sap`
- **sapS4HanaUsername** (string) : The communication user name
- **sapS4HanaPassword** (string) : The communication user password

## Configuring the SAP Product Master listA_Products operation

### Step 5: Add an automation entry point

Select **Add Artifact**, then select **Automation** and select **Create** to add the automation entry point to the canvas.

### Step 6: Select and configure the listA_Products operation

1. On the automation canvas, select the **+** button to add a step.
2. Expand the **apiProductSrvClient** connection under **Connections**.

<ThemedImage
    alt="apiProductSrvClient connection expanded in the node panel showing the available operations"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_04_operations.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_04_operations.png'),
    }}
/>

3. Select **List A Products** (`listA_Products`) and configure it:

- **$top** : Under **Advanced Configurations**, set to `10` to limit the results to the first 10 records
- **Result** : Set the result variable name to `result`

<ThemedImage
    alt="listA_Products operation form with $top set to 10"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_05_operation_form.png'),
    }}
/>

4. Select **Save** to add the operation to the flow, then add a **Log Info** step after it that logs `result.toJsonString()` in **Expression** mode.

<ThemedImage
    alt="Completed automation flow with the listA_Products operation and a log step"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_product_srv/sap_s4hana_apiproductsrv_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.api_product_srv_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.api_product_srv_connector_sample)
