---
title: Build from OpenAPI Spec
---

# Build from OpenAPI Spec

WSO2 Integrator can generate a fully functional connector from any OpenAPI specification file, letting you integrate any REST API without writing manual client logic. Import the spec in the WSO2 Integrator and the generated connector is ready to use in your integration.

## Prerequisites

- An OpenAPI specification file (JSON or YAML) for the target API
- [WSO2 Integrator](https://wso2.com/products/downloads/?product=wso2integrator) installed and configured

## Generate a connector

Follow these steps to generate a custom connector from an OpenAPI spec and create a connection from it.

### Step 1: Add a connection from the Artifacts view

Open your integration and select **Connection** from the **Artifacts** view.

<ThemedImage
    alt="Add a connection from the Artifacts view"
    sources={{
        light: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/add-connection-artifacts.png'),
        dark: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/add-connection-artifacts.png'),
    }}
/>

### Step 2: Select Connect via API Specification

In the **Add Connection** dialog, select **Connect via API Specification**.

<ThemedImage
    alt="Select Connect via API Specification in the Add Connection dialog"
    sources={{
        light: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/connect-via-open-api-spec.png'),
        dark: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/connect-via-open-api-spec.png'),
    }}
/>

### Step 3: Configure and import the specification

Fill in the connector configuration fields, then save to import the specification.

| Field | Description | Example |
|---|---|---|
| **Connector Name** | A descriptive name for the generated connector. | `stackOverflow` |
| **Import Specification File** | Browse and select your OpenAPI specification file in JSON or YAML format. | `stack-overflow-api.yaml` |

<ThemedImage
    alt="Configure the connector and import the OpenAPI specification"
    sources={{
        light: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/configure-and-import.png'),
        dark: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/configure-and-import.png'),
    }}
/>

Make sure your OpenAPI specification is valid and well-structured before importing. You can validate your spec using tools like [Swagger Editor](https://editor.swagger.io/).

### Step 4: Create the connection

After you select **Save** in the previous step, WSO2 Integrator generates the connector from the specification and moves you to the **Create Connection** step of the **Connect via API Specification** wizard. Complete this step to create a connection with the name you provided. The connection is then available in the [Flow Diagram editor](product://integrator/editor/canvases/flow-canvas) for any integration in the project.

<ThemedImage
    alt="Create the connection in the Connect via API Specification wizard"
    sources={{
        light: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/create-connection.png'),
        dark: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/create-connection.png'),
    }}
/>

## Add a connection while building a flow

You don't have to start from the **Artifacts** view. While you work in the [Flow Diagram editor](product://integrator/editor/canvases/flow-canvas), open the node palette with the **+** button and select **Add Connection** to start the same **Connect via API Specification** wizard without leaving your integration.

<ThemedImage
    alt="Add a connection from the node palette in the Flow Diagram editor"
    sources={{
        light: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/create-connector-while-in-visualizer.gif'),
        dark: useBaseUrl('/img/connectors/build-your-own/create-from-openapi-spec/create-connector-while-in-visualizer.gif'),
    }}
/>

## Publish the generated connector

A connector generated this way is added directly to your project. To make it reusable across other projects, or to share it with your team or the broader community, package it as a standalone Ballerina project and [publish it to Ballerina Central](publish-connector.md).

## What's next

- [Connections](product://integrator/develop-and-test/integration-artifacts/supportive-artifacts/connections): Understand how connections are configured and reused across an integration.
- [Build from Scratch](custom-development.md): Build a connector from scratch using Ballerina for full control over the implementation.
- [Build your own connector](build-own.md): Compare approaches for creating custom connectors.
- [Publish Connector](publish-connector.md): Share a finished connector via Ballerina Central.
- [Connector catalog](../catalog/index.mdx): Browse all available pre-built connectors.
