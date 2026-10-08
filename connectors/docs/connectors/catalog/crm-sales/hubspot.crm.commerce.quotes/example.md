# Example

## What you'll build

Build a WSO2 Integrator automation that connects to the HubSpot CRM Commerce Quotes API and retrieves a list of quotes from HubSpot. The integration logs the retrieved quotes as a JSON string for review.

**Operations used:**
- **get** : Retrieves a page of quotes from HubSpot CRM and stores the result in a configurable variable

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Get Operation]
    B --> C[HubSpot CRM Commerce Quotes Connector]
    C --> D((HubSpot CRM API))
```

## Prerequisites

- A HubSpot account with API access
- A HubSpot API token with CRM quotes permissions

## Setting up the HubSpot CRM Commerce Quotes integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the HubSpot CRM Commerce Quotes connector

### Step 1: Open the flow canvas and search for the connector

Select **Entry Points > main** to open the low-code flow canvas, then select the **+** button below the **Start** node to open the node panel. Select **Show More Functions** and search for `hubspot.crm.commerce.quotes` to locate the **ballerinax/hubspot.crm.commerce.quotes** connector.

<ThemedImage
    alt="HubSpot CRM Commerce Quotes connector visible in the connector palette before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_01_palette.png'),
    }}
/>

## Configuring the HubSpot CRM Commerce Quotes connection

### Step 2: Fill in connection parameters

After selecting the connector, a **New Connection** form appears. Bind each field to a configurable variable:

- **Connection Name** : Enter `quotesClient` as the connection name
- **Service Url** : Bind to a new configurable variable `hubspotQuotesServiceUrl` of type `string`
- **Config** : Switch to **Expression** mode and enter `{auth: {token: hubspotQuotesToken}}`, binding `hubspotQuotesToken` as a new `string` configurable variable

<ThemedImage
    alt="HubSpot CRM Commerce Quotes connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save** to create the connection. The `quotesClient` connection now appears in the **Connections** section of the sidebar and as a badge on the canvas.

<ThemedImage
    alt="HubSpot CRM Commerce Quotes Connections panel showing quotesClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_03_connection_saved.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_03_connection_saved.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below.

- **hubspotQuotesServiceUrl** (string) : The base URL for the HubSpot API, for example `https://api.hubapi.com`
- **hubspotQuotesToken** (string) : Your HubSpot API token with CRM quotes permissions

## Configuring the HubSpot CRM Commerce Quotes get operation

### Step 5: Expand the connection node to view available operations

Select the **+** button on the flow canvas to open the node panel, then expand the **quotesClient** connection section to see available operations.

<ThemedImage
    alt="HubSpot CRM Commerce Quotes connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_04_operations.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_04_operations.png'),
    }}
/>

### Step 6: Select the get operation and configure its parameters

Select the **get** (List) operation to open its configuration form, then fill in the following:

- **Variable Name** : Enter `result` as the variable name to store the retrieved quotes
- **Variable Type** : Auto-populated as `quotes:CollectionResponseSimplePublicObjectWithAssociationsForwardPaging`

Select **Save** to add the operation to the flow.

<ThemedImage
    alt="HubSpot CRM Commerce Quotes get operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_05_operation_config.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_05_operation_config.png'),
    }}
/>

<ThemedImage
    alt="Completed HubSpot CRM Commerce Quotes automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.crm.commerce.quotes/hubspot_crm_commerce_quotes_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/hubspot.crm.commerce.quotes_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/hubspot.crm.commerce.quotes_connector_sample)

## More code examples

The `HubSpot CRM Commerce Quotes` connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.quotes/tree/main/examples/), covering the following use cases:

1. [Sales Analytics System](https://github.com/ballerina-platform/module-ballerinax-hubspot.crm.commerce.quotes/tree/main/examples/sales-analytics) - A store can insert their quotes to the system, and system record and analyses the details on the quotes.
