---
title: Example
---

# Example

## What you'll build

Build an integration workflow that connects to an SAP S/4HANA system and retrieves outbound deliveries. The workflow calls the Outbound Delivery (A2X) API and logs the result as JSON.

**Operations used:**
- **listA_OutbDeliveryHeaders** : Reads outbound delivery headers (shipping point, ship-to party and status) from the SAP S/4HANA system, returning the first 10 results

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[listA_OutbDeliveryHeaders Operation]
    B --> C[SAP Outbound Delivery Connector]
    C --> D((SAP S/4HANA))
```

## Prerequisites

- Access to an SAP S/4HANA Cloud system with a communication user assigned to the communication arrangement this connector needs (see the [Setup Guide](setup-guide.md))

## Setting up the SAP Outbound Delivery integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the SAP Outbound Delivery connector

### Step 1: Open the connector palette and search for the connector

Select **Add Artifact**, then select **Connection** to open the connector palette. Search for `api_outbound_delivery_srv_0002` and select the **Api_outbound_delivery_srv_0002** connector card.

<ThemedImage
    alt="Add Connection palette open with the search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_01_palette.png'),
    }}
/>

## Configuring the SAP Outbound Delivery connection

### Step 2: Fill in the connection parameters

Enter the connection parameters, binding each field to a configurable variable:

- **Config** : `ConnectionConfig` record with Basic Authentication credentials; switch to **Expression** and enter `{auth: {username: sapS4HanaUsername, password: sapS4HanaPassword}}`
- **Hostname** : SAP S/4HANA API hostname; bind to the `sapS4HanaHostname` configurable variable
- **Connection Name** : Keep the default `apiOutboundDeliverySrv0002Client`

<ThemedImage
    alt="SAP Outbound Delivery connection form filled with configurable variables before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection**. The connection appears under **Connections** in the project tree and on the design canvas.

<ThemedImage
    alt="Design canvas showing the saved apiOutboundDeliverySrv0002Client connection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_03_connection_saved.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_03_connection_saved.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below:

- **sapS4HanaHostname** (string) : The API hostname of your SAP S/4HANA Cloud system, for example, `my123456-api.s4hana.cloud.sap`
- **sapS4HanaUsername** (string) : The communication user name
- **sapS4HanaPassword** (string) : The communication user password

## Configuring the SAP Outbound Delivery listA_OutbDeliveryHeaders operation

### Step 5: Add an automation entry point

Select **Add Artifact**, then select **Automation** and select **Create** to add the automation entry point to the canvas.

### Step 6: Select and configure the listA_OutbDeliveryHeaders operation

1. On the automation canvas, select the **+** button to add a step.
2. Expand the **apiOutboundDeliverySrv0002Client** connection under **Connections**.

<ThemedImage
    alt="apiOutboundDeliverySrv0002Client connection expanded in the node panel showing the available operations"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_04_operations.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_04_operations.png'),
    }}
/>

3. Select **List A Outb Delivery Headers** (`listA_OutbDeliveryHeaders`) and configure it:

- **$top** : Under **Advanced Configurations**, set to `10` to limit the results to the first 10 records
- **Result** : Set the result variable name to `result`

<ThemedImage
    alt="listA_OutbDeliveryHeaders operation form with $top set to 10"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_05_operation_form.png'),
    }}
/>

4. Select **Save** to add the operation to the flow, then add a **Log Info** step after it that logs `result.toJsonString()` in **Expression** mode.

<ThemedImage
    alt="Completed automation flow with the listA_OutbDeliveryHeaders operation and a log step"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_outbound_delivery_srv_0002/sap_s4hana_apioutbounddeliverysrv0002_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.api_outbound_delivery_srv_0002_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/sap.s4hana.api_outbound_delivery_srv_0002_connector_sample)

## More code examples

The SAP S/4HANA Delivery Ballerina connectors provide practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery/tree/main/examples), covering use cases like automated reporting on customer returns and warehouse system integration.

1. [Weekly Report Generation](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery/tree/main/examples/generate-report) - Read customer returns delivery items from S/4HANA and email a weekly report.

2. [Warehouse System Integration with S/4HANA](https://github.com/ballerina-platform/module-ballerinax-sap.s4hana.delivery/tree/main/examples/warehouse-to-s4hana) - Process daily delivery files from a warehouse system and confirm the receipts on S/4HANA inbound deliveries.
