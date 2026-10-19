---
title: Example
---

# Example

## What you'll build

This example builds an automation that connects to an SMB file share and lists everything in a directory on it. The connection binds its host, share, and credentials to configurable variables, so you can point the same integration at any server without editing the flow. The automation then logs how many entries it found.

**Operations used:**
- **List** : Lists files and directories in a folder on an SMB share.

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[List]
    B --> C[SMB Connector]
    C --> D[(SMB Share)]
```

## Prerequisites

- An SMB file server — a Windows server, NAS appliance, or Samba host — reachable over TCP port 445
- A share on that server, and an account with permission to read it
- The username, password, and domain for that account. Standalone servers usually use `WORKGROUP` as the domain

## Setting up the SMB integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the SMB connector

### Step 1: Open the connector palette

Select **Add Connection** in the **Connections** section.

<ThemedImage
    alt="SMB connector palette open before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_01_palette.png'),
    }}
/>

### Step 2: Select the SMB connector

1. Enter `smb` in the search field.
2. Select the **SMB** connector card.

> **Note:** The search also returns **SMB Caller**, which is used inside a listener service. Select **SMB** to create a client connection.

## Configuring the SMB connection

### Step 3: Bind the connection parameters to configurable variables

Set **Client Config** to **Expression** mode and build a record that binds each value to a configurable variable rather than a literal. Keep credentials out of the flow so they never reach source control.

- **Client Config** : The host, share, and authentication settings the client uses to reach the server.
- **Connection Name** : The name the connection is referenced by elsewhere in the integration.

<ThemedImage
    alt="SMB connection form with all parameters bound before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_02_connection_form.png'),
    }}
/>

### Step 4: Save the connection

Select **Save** and verify that the connection appears in the **Connections** section.

<ThemedImage
    alt="SMB connection visible after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_03_connections_list.png'),
    }}
/>

### Step 5: Set actual values for your configurables

1. Select **Configurations** at the bottom of the project tree under **Data Mappers**.
2. Enter a value for each configurable listed below before you run the integration.

- **smbHost** (`string`) : Hostname or IP address of the SMB server.
- **smbShare** (`string`) : Name of the share to connect to.
- **smbUsername** (`string`) : Username of the account that has access to the share.
- **smbPassword** (`string`) : Password for that account.

## Configuring the SMB List operation

### Step 6: Add an automation entry point

1. Select **Add Entry Point** next to **Entry Points**.
2. Select **Automation**.
3. Select **Create** to accept the settings.

### Step 7: Expand the connection and configure the List operation

1. Select **Add Step** in the automation flow.
2. Expand **smbClient** to display its operations.

<ThemedImage
    alt="SMB connection expanded to display operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_04_operations_panel.png'),
    }}
/>

3. Select **List** and enter its required values.

- **Path** : The directory to list, relative to the share root.
- **Result** : The name of the variable that receives the returned file information.

<ThemedImage
    alt="SMB List operation with all values entered before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_05_operation_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_05_operation_form.png'),
    }}
/>

4. Select **Save**.

### Step 8: Log the List result

Add a log action for the returned value, then return to the visual flow. The completed flow runs the operation, logs the number of entries it found, and routes any failure to the **Error Handler**.

<ThemedImage
    alt="Completed SMB flow with the configured operation"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/storage-file/smb/ballerina_smb_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/smb_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/smb_connector_sample)

## More code examples

The `smb` module provides practical examples illustrating usage in various scenarios.

1. [Basic file operations](https://github.com/ballerina-platform/module-ballerina-smb/tree/main/examples/basic-file-operations) – Connects to a Kerberos-enabled SMB share, lists the root directory, writes a test file, verifies it exists, and reads it back.

2. [Manage sales reports](https://github.com/ballerina-platform/module-ballerina-smb/tree/main/examples/sales-report) – Listens for JSON sales reports on an SMB share, flattens nested data into row records, appends them to a CSV data file, and moves the processed file to a designated folder.

3. [Manage timesheets](https://github.com/ballerina-platform/module-ballerina-smb/tree/main/examples/timesheets) – Validates contractor timesheet CSVs from an SMB share, moves valid files to a processed location and writes cleaned copies, or quarantines invalid files with detailed error logs.
