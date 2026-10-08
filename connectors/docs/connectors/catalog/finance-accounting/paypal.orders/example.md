# Example

## What you'll build

Build a WSO2 Integrator automation that uses the PayPal Orders connector to create a new order via the PayPal API. The integration runs as an Automation entry point and logs the result of the order creation as a JSON string.

**Operations used:**
- **Create order** : Creates a new PayPal order with a specified purchase intent and units

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Create Order]
    B --> C[PayPal Orders Connector]
    C --> D((PayPal API))
```

## Prerequisites

- A PayPal developer account with a **Client ID** and **Client Secret** for OAuth2 authentication

## Setting up the PayPal orders integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the PayPal orders connector

### Step 1: Open the connector palette

In the project overview, select **Add Artifact**, then under **Other Artifacts** select **Connection** to open the connector palette.

<ThemedImage
    alt="PayPal Orders connector palette open with search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_01_palette.png'),
    }}
/>

### Step 2: Add an automation entry point

In the project overview, select **Add Artifact**, then select **Automation** under the Automation category, and select **Create** to add the Automation entry point. The flow canvas opens with a **Start** node and an **Error Handler** node.

## Configuring the PayPal orders connection

### Step 3: Configure connection parameters

Search for **Orders** (PayPal) in the connector palette, select the **Orders** connector card to open the configuration form, and enter the following parameters using configurable variables for your OAuth2 credentials:

- **config** : Set to Expression mode referencing `paypalClientId` and `paypalClientSecret` configurable variables for OAuth2 authentication
- **connectionName** : The name used to reference this connection in the flow

<ThemedImage
    alt="PayPal Orders connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_02_connection_form.png'),
    }}
/>

### Step 4: Save the connection

Select **Save Connection** to persist the connection. The connection is now visible in the project overview under **Connections**.

<ThemedImage
    alt="PayPal Orders Connections panel showing ordersClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_03_connection_saved.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_03_connection_saved.png'),
    }}
/>

### Step 5: Set actual values for your configurables

In the left panel, select **Configurations** and set a value for each configurable listed below:

- **paypalClientId** (string) : Your PayPal OAuth2 client ID from the PayPal Developer Dashboard
- **paypalClientSecret** (string) : Your PayPal OAuth2 client secret from the PayPal Developer Dashboard

## Configuring the PayPal orders create order operation

### Step 6: Select and configure the create order operation

1. Select the **+** button on the flow canvas to open the node panel.
2. Expand the **ordersClient** connection under **Connections** to see available operations.

<ThemedImage
    alt="PayPal Orders connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_04_operations.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_04_operations.png'),
    }}
/>

3. Select **Create order** to add it to the flow, then configure the following parameters:

- **payload** : An `OrderRequest` value specifying the purchase units and intent for the new order
- **result** : The variable that stores the returned order details

<ThemedImage
    alt="PayPal Orders Create order operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_05_operation_form.png'),
    }}
/>

Select **Save** to apply the configuration.

<ThemedImage
    alt="Completed PayPal Orders automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.orders/paypal_orders_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/paypal.orders_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/paypal.orders_connector_sample)

## More code examples

The `PayPal Orders` connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-paypal.orders/tree/main/examples/), covering the following use cases:

1. [**Order lifecycle**](https://github.com/ballerina-platform/module-ballerinax-paypal.orders/tree/main/examples/order-lifecycle): Process a complete PayPal order from creation and updates through confirming and capturing payments.

2. [**Manage shipping**](https://github.com/ballerina-platform/module-ballerinax-paypal.orders/tree/main/examples/manage-shipping): Enrich an order with shipping details, add or update tracking information, and push shipment updates back to PayPal.
