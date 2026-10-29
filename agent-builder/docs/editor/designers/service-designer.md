---
title: Service Designer
---

# Service Designer

The Service Designer is the surface you open for a service entry point in WSO2 Agent Builder. It lists every resource or handler the service exposes and gives you one place to add, edit, remove, try out, and export them.

In WSO2 Agent Builder, a service is created when you add a trigger to an agent. For example, **Add Trigger → HTTP** creates an HTTP service with one resource that calls the agent. The Service Designer is where you shape that service afterwards, for example by adding `GET`, `POST`, `PUT`, and `DELETE` resources.

<ThemedImage
    alt="Service Designer for the /orders HTTP service, with the Listener and Base Path metadata, the + Resource button, and the POST summary, GET status, POST create, PUT update, and DELETE cancel resources highlighted."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/02-service-designer-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/02-service-designer-v1.0.png'),
    }}
/>

## Open the designer

Select a service under **Entry Points** in the project explorer, for example **HTTP Service - /orders**. The designer opens with the resources or handlers the service exposes.

You can also start from the integration **Overview**, which shows each service as a node connected to its agent, with its resources listed inside the node.

<ThemedImage
    alt="OrderService integration overview with the /orders HTTP service node highlighted, listing POST /summary, GET /status, POST /create, PUT /update, and DELETE /cancel, connected to the orderAssistant AI Agent."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/01-integration-overview-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/01-integration-overview-v1.0.png'),
    }}
/>

To create a new service, open an agent, select **Add Trigger**, and choose the trigger type, for example **HTTP** under **API Endpoints**. See [Creating an Agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md).

## Header

The header shows the service type and a short tagline, together with the high-level actions for the service.

| Control | Description |
|---|---|
| **Back** | Returns to the previous view. |
| **Undo** / **Redo** | Reverses or reapplies recent changes to the service. |
| **Configure** | Opens the service configuration so you can change the base path, the listener, and other service-level settings. |
| **Try It** | Sends sample requests to the service from inside the editor. Available for HTTP services only. |
| **More** (`⋮`) | Opens additional actions for the service. For HTTP services, this includes **Export OpenAPI Spec**. |

## Read-only metadata

Below the header, the designer displays read-only metadata that describes the service at a glance, such as the **Listener** (for example, `httpDefaultListener`) and the **Base Path** (for example, `/orders`). The exact fields depend on the service type.

To change any of these values, open the service configuration through **Configure** in the header.

## Resources and handlers

The body of the designer lists every endpoint the service exposes. The label of this list depends on the service type:

- **HTTP services** show **Resources**, one row per resource function (`GET`, `POST`, `PUT`, `DELETE`, and so on).
- **Event-driven services** (for example, Kafka, RabbitMQ, or a Voice Agent) show **Event Handlers**, one row per remote function the listener invokes.

Each row identifies the resource or handler by its HTTP method (or event name) and its path or signature.

### Add a resource or handler

1. Select **+ Resource** (HTTP) at the top right of the list. The **Select HTTP Method to Add** panel opens.

<ThemedImage
    alt="Select HTTP Method to Add panel highlighted, listing GET, POST, PUT, DELETE, PATCH, and DEFAULT."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/03-select-http-method-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/03-select-http-method-v1.0.png'),
    }}
/>

2. Pick the method, for example **PUT**. In the **New Resource Configuration** panel, set the **Resource Path**, and optionally add path parameters, query parameters, headers, and responses.
3. Select **Save**. The designer generates the resource and opens its flow in the [Flow Canvas](../canvases/flow-canvas/flow-canvas.md).

<ThemedImage
    alt="New Resource Configuration panel with the HTTP Method PUT and Resource Path fields and the Save button highlighted."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/04-new-resource-config-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/04-new-resource-config-v1.0.png'),
    }}
/>

### Edit a resource or handler

Select the **settings** icon on the row you want to change. The **Resource Configuration** panel opens with the current configuration, so you can change the method, rename the path, adjust parameters, or change the responses.

<ThemedImage
    alt="Resource Configuration panel for the PUT update resource highlighted, with 200 json and 500 error responses."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/05-edit-resource-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/05-edit-resource-v1.0.png'),
    }}
/>

To edit the implementation (the flow that runs when the resource or handler is invoked), select the row itself. The designer opens the [Flow Canvas](../canvases/flow-canvas/flow-canvas.md) for that resource or handler.

### Delete a resource or handler

Select the **delete** icon on the row. The designer asks you to confirm before removing the resource or handler from the service.

<ThemedImage
    alt="Delete icon on the DELETE cancel row and the confirmation popover asking Are you sure you want to delete this resource? highlighted."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/06-delete-resource-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/06-delete-resource-v1.0.png'),
    }}
/>

## Configure

**Configure** in the header opens the **HTTP Service Configuration** page. Use it to change the **Base Path** and service-level settings, review the **Attached Listeners**, or attach another listener. Select **Save Changes** to apply your changes.

<ThemedImage
    alt="HTTP Service Configuration page with the HTTP Service and Attached Listeners navigation, the Base Path and Service Configuration fields, and Attach Listener highlighted."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/07-service-configuration-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/07-service-configuration-v1.0.png'),
    }}
/>

## Try It

For HTTP services, **Try It** in the header opens an in-editor request client. Pick a resource, fill in path parameters, query parameters, headers, and a request body, then send the request to the running service and inspect the response. Use this to check a resource without leaving the editor.

## More menu

The **More** (`⋮`) menu groups actions that are specific to the service type. For HTTP services it includes:

- **Export OpenAPI Spec**: generates the OpenAPI specification for the service, derived from its resources, parameters, and types.

<ThemedImage
    alt="More button and its menu with Export OpenAPI Spec highlighted in the Service Designer header."
    sources={{
        light: useBaseUrl('/img/editor/designers/service-designer-v1.0/08-more-menu-v1.0.png'),
        dark: useBaseUrl('/img/editor/designers/service-designer-v1.0/08-more-menu-v1.0.png'),
    }}
/>

## What's next

- [Creating an Agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md): create an agent and add the trigger that creates the service.
- [Flow Canvas](../canvases/flow-canvas/flow-canvas.md): edit the logic that runs when a resource or handler is invoked.
- [Type Panel](../panels/type-panel.md): define the request and response types used by the service.
