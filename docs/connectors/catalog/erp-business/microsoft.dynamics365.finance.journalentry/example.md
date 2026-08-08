# Example

## What you'll build

This example builds an automation that connects to Microsoft Dynamics 365 Finance and retrieves general ledger journal lines through the Microsoft Dynamics 365 Finance Journal Entry connector. The integration authenticates with an OAuth2 client credentials grant, retrieves the journal line collection, and logs the result as JSON.

**Operations used:**
- **List Journal Lines** : Retrieves the collection of general ledger journal lines recorded in Microsoft Dynamics 365 Finance.

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[List Journal Lines]
    B --> C[Microsoft Dynamics 365 Finance Journal Entry Connector]
    C --> D((Microsoft Dynamics 365 Finance))
```

## Prerequisites

- A Microsoft Dynamics 365 Finance and Operations environment, either cloud-hosted or sandbox.
- An Azure Active Directory (Entra ID) app registration with API permissions for Dynamics 365, providing a client identifier, a client secret, and a token endpoint.

- The application must be registered as a user in the target Dynamics 365 Finance and Operations environment and assigned the security roles required for this connector's operations.

## Setting up the Microsoft Dynamics 365 Finance Journal entry integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](../../../../develop/create-integrations/create-a-new-integration.md) guide to set up your integration first, then return here to add the connector.

## Adding the Microsoft Dynamics 365 Finance Journal entry connector

### Step 1: Open the connector palette

Select **Add Connection** in the **Connections** section.

![Microsoft Dynamics 365 Finance Journal Entry connector palette open before selection](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_01_palette.png)

### Step 2: Select the Microsoft Dynamics 365 Finance Journal entry connector

1. Enter `microsoft.dynamics365.finance.journalentry` in the search field.
2. Select the **Journal Entry** connector card.

## Configuring the Microsoft Dynamics 365 Finance Journal entry connection

### Step 3: Bind the connection parameters to configurable variables

Bind every connection field to a configurable variable rather than entering a literal value.

- **Config** : The connection settings record, including the OAuth2 client credentials grant used to authenticate with Microsoft Dynamics 365 Finance. Enter the expression `{auth: {tokenUrl, clientId, clientSecret, scopes}}`.
- **Service Url** : The base address of the target Microsoft Dynamics 365 Finance and Operations environment. Use the OData root, for example `https://<your-org>.operations.dynamics.com/data`.

![Microsoft Dynamics 365 Finance Journal Entry connection form with all parameters bound before saving](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_02_connection_form.png)

### Step 4: Save the connection

Select **Save Connection** and verify that the connection appears in the **Connections** section.

![Microsoft Dynamics 365 Finance Journal Entry connection visible after saving](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_03_connections_list.png)

### Step 5: Set actual values for your configurables

1. Select **Configurations** at the bottom of the project tree under **Data Mappers**.
2. Enter a value for each configurable listed below before you run the integration.

- **tokenUrl** (`string`) : The OAuth2 token endpoint used to obtain an access token for Microsoft Dynamics 365 Finance.
- **clientId** (`string`) : The application (client) identifier from the Azure Active Directory app registration.
- **clientSecret** (`string`) : The client secret generated for the Azure Active Directory app registration.
- **scopes** (`string[]`) : The OAuth2 scope requested for the client-credentials token, set to the environment base URL followed by `/.default`
- **serviceUrl** (`string`) : The base address of the target Microsoft Dynamics 365 Finance and Operations environment.

## Configuring the Microsoft Dynamics 365 Finance Journal entry List Journal Lines operation

### Step 6: Add an automation entry point

1. Select **Add Entry Point** next to **Entry Points**.
2. Select **Automation**.
3. Select **Create** to accept the settings.

### Step 7: Expand the connection and configure the List Journal Lines operation

1. Select the **+** icon on the automation flow to add a step.
2. Expand **journalentryClient** to display its operations.

![Microsoft Dynamics 365 Finance Journal Entry connection expanded to display operations before selection](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_04_operations_panel.png)

3. Select **List Journal Lines**. This operation has no required values beyond the generated result variable.

- **Result** : Name of the variable that stores the returned collection of journal lines.

![Microsoft Dynamics 365 Finance Journal Entry List Journal Lines operation with all values entered before saving](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_05_operation_form.png)

4. Select **Save**.

### Step 8: Log the List Journal Lines result

Add a **Log Info** action, switch its **Msg** field to expression mode, and enter `journalentryJournallinescollection.toJsonString()` to log the result. Return to the visual flow to review the complete chain.

![Completed Microsoft Dynamics 365 Finance Journal Entry flow with the configured operation](/img/connectors/catalog/erp-business/microsoft.dynamics365.finance.journalentry/ballerinax_microsoft_dynamics365_finance_journalentry_screenshot_06_completed_flow.png)

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/microsoft_dynamics365_finance_journalentry_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/microsoft_dynamics365_finance_journalentry_connector_sample)

## More code examples

The Dynamics 365 Finance Ballerina connectors provide practical examples illustrating usage in various scenarios.
Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-microsoft.dynamics365.finance/tree/main/examples).
