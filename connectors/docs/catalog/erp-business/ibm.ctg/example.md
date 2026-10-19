# Example

## What you'll build

Build a WSO2 Integrator automation that connects to an IBM CICS Transaction Gateway (CTG) server and executes a CICS transaction program. The integration uses the IBM CTG connector to invoke a named CICS program and capture the result as a byte array for further processing.

**Operations used:**
- **Execute** : Sends a request to the IBM CTG server to invoke a specified CICS program and returns the result as a byte array

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[Execute Operation]
    B --> C[IBM CTG Connector]
    C --> D((IBM CICS Server))
```

## Prerequisites

- Access to an IBM CICS Transaction Gateway server
- The following connection details:
  - **Host** : CTG server hostname or IP
  - **CICS Server** : Name of the target CICS server
  - **User ID** : Authentication user ID
  - **Password** : Authentication password

## Setting up the IBM CTG integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the IBM CTG connector

### Step 1: Open the add connection panel

Select the **+** button next to **Connections** in the project tree to open the **Add Connection** palette, which displays available pre-built connectors.

<ThemedImage
    alt="IBM CTG connector palette open with search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_01_palette.png'),
    }}
/>

## Configuring the IBM CTG connection

### Step 2: Fill in the connection parameters

Search for **ibm.ctg** in the search field, select the **IBM CTG** connector card, and bind each connection parameter to a configurable variable.

- **connectionName** : Unique identifier for this connection
- **host** : CTG server hostname
- **port** : CTG server port number
- **cicsServer** : Target CICS server name
- **auth** : Authentication credentials record containing user ID and password

<ThemedImage
    alt="IBM CTG connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection** to create the connection. The `ctgClient` entry appears in the **Connections** panel on the canvas.

<ThemedImage
    alt="IBM CTG Connections panel showing ctgClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_03_connections_list.png'),
    }}
/>

### Step 4: Set actual values for your configurables

In the left panel, select **Configurations** and set a value for each configurable listed below.

- **ibmCtgHost** (string) : IBM CTG server hostname or IP address
- **ibmCtgPort** (int) : IBM CTG server port number
- **ibmCtgCicsServer** (string) : Name of the target CICS server
- **ibmCtgUserId** (string) : User ID for CTG authentication
- **ibmCtgPassword** (string) : Password for CTG authentication

## Configuring the IBM CTG execute operation

### Step 5: Add an automation entry point

Select the **+** button next to **Entry Points** in the project tree and select **Automation** as the entry point type. The automation flow canvas opens with a **Start** node, an empty placeholder, and an **Error Handler** node.

### Step 6: Select and configure the execute operation

Expand **ctgClient** in the **Connections** section of the node panel to view available operations, then select **Execute** to add it to the automation flow and configure its parameters.

- **programName** : The CICS program to invoke on the server (for example, `EC01`)
- **result** : Name of the result variable (for example, `byteResult`)
- **resultType** : Return type of the result (`byte[]|()`)

<ThemedImage
    alt="IBM CTG connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_04_operations_panel.png'),
    }}
/>

<ThemedImage
    alt="IBM CTG Execute operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_05_operation_filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_05_operation_filled.png'),
    }}
/>

Select **Save** to add the operation to the flow.

<ThemedImage
    alt="Completed IBM CTG automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/ibm.ctg/ibm_ctg_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/ibm.ctg_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/ibm.ctg_connector_sample)
