---
connector: true
connector_name: "xero.files"
title: "Example"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Example

## What you'll build

This integration connects to Xero Files and retrieves the inbox folder of a Xero organisation's file library. An automation entry point runs the operation once and logs the returned folder.

**Operations used:**
- **Get Inbox** : Gets the inbox folder of the organisation's file library

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Get Inbox]
    B --> C[Xero Files Connector]
    C --> D[(Xero Files API)]
```

## Prerequisites

- A Xero account with access to the Files API.
- A Xero app with the `files.read` and `offline_access` scopes. Follow the [Setup Guide](setup-guide.md) to get the client ID, client secret, refresh token and tenant ID.

## Setting up the Xero Files integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the Xero Files connector

### Step 1: Open the connector palette

Hover over **Connections** in the project tree and select **Add Connection** (**+**).

<ThemedImage
    alt="Xero Files connector palette open before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_01_palette.png'),
    }}
/>

### Step 2: Select the Xero Files connector

1. Enter `xero.files` in the search field.
2. Select the **Xero Files** connector card.

## Configuring the Xero Files connection

### Step 3: Bind the connection parameters to configurable variables

Bind each connection field to a configurable variable. Use the **Configurables** tab of the field's helper panel to create each configurable.

- **Config** : Connection settings, with the OAuth 2.0 refresh token credentials set in the `auth` record. Switch the field to **Expression** and enter `{auth: {clientId: filesClientId, clientSecret: filesClientSecret, refreshToken: filesRefreshToken, refreshUrl: filesRefreshUrl}}`.
- **Service Url** : Set it to the `filesServiceUrl` configurable.

<ThemedImage
    alt="Xero Files connection form with all parameters bound before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_02_connection_form.png'),
    }}
/>

### Step 4: Save the connection

Select **Save Connection** and verify that **filesClient** appears under **Connections** in the project tree and on the design canvas.

<ThemedImage
    alt="Xero Files connection visible after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_03_connections_list.png'),
    }}
/>

### Step 5: Set actual values for your configurables

1. Select **Configurations** at the bottom of the project tree.
2. Enter a value for each configurable listed below before you run the integration.

- **filesServiceUrl** (`string`) : Xero Files API base URL. Defaults to `https://api.xero.com/files.xro/1.0/`.
- **filesClientId** (`string`) : The client ID of your Xero app.
- **filesClientSecret** (`string`) : The client secret of your Xero app.
- **filesRefreshToken** (`string`) : The OAuth 2.0 refresh token that grants the `files.read` scope.
- **filesRefreshUrl** (`string`) : Xero token endpoint. Defaults to `https://identity.xero.com/connect/token`.
- **filesTenantId** (`string`) : The ID of the Xero organisation to query.

## Configuring the Xero Files Get Inbox operation

### Step 6: Add an automation entry point

1. Select **Add Artifact** on the design canvas.
2. Select **Automation**.
3. Select **Create** to accept the settings.

### Step 7: Expand the connection and configure the Get Inbox operation

1. Select the **+** between **Start** and **Error Handler** in the automation flow.
2. Expand **filesClient** under **Connections** to display its operations.

<ThemedImage
    alt="Xero Files connection expanded to display operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_04_operations_panel.png'),
    }}
/>

3. Select **Get Inbox** and enter its required values.

- **Headers** : Switch the field to **Expression** and enter `{xeroTenantId: filesTenantId}`.
- **Result** : Set it to `inbox`, the variable that stores the returned folder.

<ThemedImage
    alt="Xero Files Get Inbox operation with all values entered before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_05_operation_form.png'),
    }}
/>

4. Select **Save**.

### Step 8: Log the Get Inbox result

1. Select the **+** below the **Get Inbox** node.
2. Under **Logging**, select **Log Info**.
3. Switch **Msg** to **Expression**, enter `inbox.toString()`, and select **Save**.

<ThemedImage
    alt="Completed Xero Files flow with the configured operation"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/xero.files/ballerinax_xero_files_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/xero.files_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/xero.files_connector_sample)

## More code examples

The Xero Files connector provides practical examples illustrating usage in various scenarios. Explore these [examples](https://github.com/ballerina-platform/module-ballerinax-xero.files/tree/main/examples/), covering the following use cases:

1. [Invoice document filing](https://github.com/ballerina-platform/module-ballerinax-xero.files/blob/main/examples/invoice_document_filing) - Create a folder, upload a supporting document into it, link the document to an invoice and confirm the link.
2. [Inbox file triage](https://github.com/ballerina-platform/module-ballerinax-xero.files/blob/main/examples/inbox_file_triage) - Page through all files, pick out those still in the Xero inbox and move them into a target folder.
