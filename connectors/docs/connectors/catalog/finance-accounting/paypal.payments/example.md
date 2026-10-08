# Example

## What you'll build

Build a WSO2 Integrator automation that connects to the PayPal Payments API and retrieves details for an authorized payment. The integration uses configurable variables to securely manage API credentials and logs the payment details as a JSON string.

**Operations used:**
- **Show details for authorized payment** : Retrieves details of a specific authorized payment by its authorization ID

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Show details for authorized payment]
    B --> C[PayPal Payments Connector]
    C --> D((PayPal API))
```

## Prerequisites

- PayPal developer account with API credentials (Client ID and Client Secret)
- OAuth2 Client Credentials Grant configured in your PayPal developer dashboard

## Setting up the PayPal payments integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the PayPal payments connector

### Step 1: Add the PayPal payments connection

1. In the WSO2 Integrator sidebar, navigate to **Connections**.
2. Select **Add Connection** to open the connection palette.

<ThemedImage
    alt="PayPal Payments connector palette open with search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_01_palette.png'),
    }}
/>

3. Search for and select the **Payments** connector from the list of available connectors.

## Configuring the PayPal payments connection

### Step 2: Fill in the connection parameters

Bind each credential field to a configurable variable so that sensitive values aren't hardcoded.

- **Config** : The configurations for initializing the connector, including OAuth2 credentials
- **Connection Name** : Name of the connection instance

<ThemedImage
    alt="PayPal Payments connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection** to persist the connection. The `paymentsClient` connection now appears on the design canvas and in the sidebar under **Connections**.

<ThemedImage
    alt="PayPal Payments Connections panel showing paymentsClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_03_connector_on_canvas.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_03_connector_on_canvas.png'),
    }}
/>

### Step 4: Set actual values for your configurables

In the left panel, select **Configurations** and set a value for each configurable listed below.

- **paypalClientId** (string) : Your PayPal developer Client ID
- **paypalClientSecret** (string) : Your PayPal developer Client Secret

## Configuring the PayPal payments show details for authorized payment operation

### Step 5: Add an automation entry point

1. Select **+ Add Artifact** on the design canvas.
2. Select **Automation** from the artifact types.
3. Select **Create** to add the automation entry point with default settings.

### Step 6: Select and configure the operation

1. Select the **+** button on the flow canvas to open the node panel.
2. Under **Connections**, expand **paymentsClient** to see all available operations.

<ThemedImage
    alt="PayPal Payments connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_04_operations_panel.png'),
    }}
/>

3. Select **Show details for authorized payment**.
4. Fill in the operation parameters:

- **AuthorizationId** : The PayPal-generated ID for the authorized payment
- **Result** : Name of the variable to store the operation result

5. Select **Save** to add the operation to the flow.

<ThemedImage
    alt="PayPal Payments Show details for authorized payment operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_05_operation_config.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_05_operation_config.png'),
    }}
/>

<ThemedImage
    alt="Completed PayPal Payments automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/paypal.payments/paypal_payments_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/paypal.payments_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/paypal.payments_connector_sample)

## More code examples

The `PayPal Payments` connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-paypal.payments/tree/main/examples/), covering the following use cases:

1. [**Order creation**](https://github.com/ballerina-platform/module-ballerinax-paypal.payments/tree/main/examples/order-creation): Process a complete product purchase from order creation through payment authorization, capture, and partial refunds.

2. [**Subscription management**](https://github.com/ballerina-platform/module-ballerinax-paypal.payments/tree/main/examples/subscription-management): Simulate a recurring billing flow with subscription-style orders, monthly payments, plan switching, and pro-rated refunds.
