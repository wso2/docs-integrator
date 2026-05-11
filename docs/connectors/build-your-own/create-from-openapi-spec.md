---
title: Create from OpenAPI spec
---

# Create from OpenAPI spec

WSO2 Integrator can generate a fully functional connector from any OpenAPI specification file, letting you integrate any REST API without writing manual client logic. Import the spec in the WSO2 Integrator IDE and the connector is ready to use in your integration flow.

## Prerequisites

- An OpenAPI specification file (JSON or YAML) for the target API
- WSO2 Integrator IDE installed and configured

## Generate a connector

Follow these steps to generate a custom connector from an OpenAPI spec:

### Step 1: Open the flow diagram

Open your integration project in the Automation diagram view.

![Open the Automation diagram view](/img/connectors/build-your-own/openapi_spec_1_create_automation.png)

### Step 2: Add a new connection

Click the **+** icon positioned between the **Start** and **Error Handler** nodes on your flow line. From the right-side palette, choose **Add Connection**.

![Add a new connection](/img/connectors/build-your-own/openapi_spec_2_create_connection.png)

### Step 3: Select OpenAPI

In the **Add Connection** overlay, select **OpenAPI** under the **Connect via API Specification** section.

![Configure the connector](/img/connectors/build-your-own/openapi_spec_3_import_spec.png)

### Step 4: Configure the connector

In the **Connector Configuration** form, fill in the following:

| Field | Description | Example |
|---|---|---|
| **Connector Name** | A descriptive name for your connector | `stackOverflow` |
| **Import Specification File** | Browse and upload your OpenAPI definition file | `stack-overflow-api.yaml` |

![Save the connection](/img/connectors/build-your-own/openapi_spec_4_save_connection.png)

### Step 5: Save and review

Click **Save Connector** to generate the connector from your OpenAPI spec. Review the connection details displayed on the following screen to verify everything looks correct.

### Step 6: Finalize

Click **Save Connection** to complete the setup. Your custom connector is now ready to use in your integration flow.

Make sure your OpenAPI specification is valid and well-structured before importing. You can validate your spec using tools like [Swagger Editor](https://editor.swagger.io/).

Once your connector is generated, you can use it just like any pre-built connector: drag it into your integration flow, configure its operations, and map data between services.

## What's next

- [Custom development](custom-development.md): Build a connector from scratch using Ballerina for full control over implementation
- [Build your own connector](build-own.md): Compare approaches for creating custom connectors
- [Connector catalog](../catalog/index.mdx): Browse all available pre-built connectors
