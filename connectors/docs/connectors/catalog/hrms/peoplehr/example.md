# Example

## What you'll build

Build a WSO2 Integrator automation that retrieves employee information from the PeopleHR HR management platform using the PeopleHR connector. The integration configures a PeopleHR connection, calls the `getEmployeeById` operation, and logs the response.

**Operations used:**
- **getEmployeeById** : Retrieves a full employee record from PeopleHR by a unique employee identifier

## Architecture

```mermaid
flowchart LR
    A((User)) --> B[getEmployeeById Operation]
    B --> C[PeopleHR Connector]
    C --> D((PeopleHR API))
```

## Prerequisites

- A PeopleHR account with an API key

## Setting up the PeopleHR integration

> **New to WSO2 Integrator?** Follow the [Create a New Integration](product://integrator/develop-and-test/create-workspace) guide to set up your integration first, then return here to add the connector.

## Adding the PeopleHR connector

Select **+** in the **Connections** section of the left panel to open the connector search panel.

<ThemedImage
    alt="PeopleHR connector palette open with search field before any selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_01_palette.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_01_palette.png'),
    }}
/>

### Step 1: Add an automation entry point

1. Hover over the **Entry Points** section in the left panel.
2. Select the **Add Entry Point** (+) button.
3. Select **Automation** in the artifact type selection screen.
4. In the **Create New Automation** dialog, select **Create** to accept the default settings.

## Configuring the PeopleHR connection

### Step 2: Configure the PeopleHR connection parameters

Open the **Configure Peoplehr** form and bind each field to a configurable variable:
- **apiKey** : Your PeopleHR API key, bound to a new configurable variable
- **connectionName** : `peoplehrClient`

<ThemedImage
    alt="PeopleHR connection form fully filled with all parameters before saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_02_connection_form.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_02_connection_form.png'),
    }}
/>

### Step 3: Save the connection

Select **Save Connection** to persist the connection. The `peoplehrClient` connection appears under **Connections** in the left panel and as a node on the integration canvas.

<ThemedImage
    alt="PeopleHR Connections panel showing peoplehrClient entry after saving"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_03_connections_list.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_03_connections_list.png'),
    }}
/>

### Step 4: Set actual values for your configurables

1. In the left panel, select **Configurations**.
2. Set a value for each configurable listed below.

- **peoplehrApiKey** (string) : Your PeopleHR API key from your account settings

## Configuring the PeopleHR getEmployeeById operation

### Step 5: Add the getEmployeeById operation to the flow

1. On the automation flow canvas, select the **+** button between the **Start** node and the **Error Handler** node.
2. Under **Connections**, select **peoplehrClient** to expand its operations.

<ThemedImage
    alt="PeopleHR connection node expanded showing all available operations before selection"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_04_operations_panel.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_04_operations_panel.png'),
    }}
/>

3. Select **Get Employee By Id** from the list of operations.
4. Fill in the operation fields:
   - **Employee Request Detail** : Enter the employee request record, for example `{EmployeeId: "EMP001"}`
   - **Result** : Auto-filled as `peoplehrEmployeeresponse`

<ThemedImage
    alt="PeopleHR getEmployeeById operation configuration filled with all values"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_05_operation_filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_05_operation_filled.png'),
    }}
/>

Select **Save** to add the operation to the flow.

<ThemedImage
    alt="Completed PeopleHR automation flow"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_06_completed_flow.png'),
        dark: useBaseUrl('/img/connectors/catalog/hrms/peoplehr/peoplehr_screenshot_06_completed_flow.png'),
    }}
/>

## Try it yourself

Try this sample in WSO2 Integration Platform.

[![Deploy to Devant](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/connectors/peoplehr_connector_sample)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/connectors/peoplehr_connector_sample)
