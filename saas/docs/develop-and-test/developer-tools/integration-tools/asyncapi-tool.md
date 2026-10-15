---
title: AsyncAPI Tool
---

# AsyncAPI Tool

The `bal asyncapi` tool generates Ballerina code from AsyncAPI definitions. It supports two protocols:

- **HTTP (default):** Generates a listener that receives webhook events from an event source, such as a SaaS application, and dispatches each event to a remote function.
- **WebSocket (experimental):** Generates a WebSocket client from an AsyncAPI definition, or exports an AsyncAPI definition from a Ballerina WebSocket service.

The AsyncAPI tool is currently supported only through the Ballerina CLI (pro-code). Visual Designer support for AsyncAPI service generation is not yet available.

This page describes version 0.12.0 of the AsyncAPI tool, which is included in the Ballerina distribution that WSO2 Integrator uses.

## Generate a webhook listener

Use an AsyncAPI definition that describes the events an event source sends to your webhook. The tool generates a listener and a service type for each channel, with a remote function for each event.

### Prepare the AsyncAPI definition

The tool reads AsyncAPI 2.x definitions in YAML or JSON. Before you generate the listener, add the following extensions to the definition. The listener uses them to identify each incoming event and select the remote function that handles it.

- `x-ballerina-event-identifier`: Add this at the root of the definition. It specifies where each request carries its event type.
  - `type`: Set this to `body`. The tool supports reading the event type only from the request body.
  - `path`: The JSON path of the field in the request body that contains the event type.
- `x-ballerina-event-type`: Add this to every message. It specifies the value that the event type field has for that message.

The following definition describes an event source that sends `order_created` and `order_cancelled` events. Each event carries its type in the `type` field of the request body.

```yaml
asyncapi: 2.6.0
info:
  title: Order Events API
  version: 1.0.0
x-ballerina-event-identifier:
  type: body
  path: type
channels:
  orders:
    subscribe:
      message:
        oneOf:
          - x-ballerina-event-type: order_created
            summary: A customer placed an order.
            payload:
              $ref: '#/components/schemas/OrderEvent'
          - x-ballerina-event-type: order_cancelled
            summary: A customer cancelled an order.
            payload:
              $ref: '#/components/schemas/OrderEvent'
components:
  schemas:
    OrderEvent:
      type: object
      required:
        - type
        - orderId
      properties:
        type:
          type: string
          description: The event type, for example `order_created`.
        orderId:
          type: string
        customerId:
          type: string
        total:
          type: number
```

### Generate the listener

Run the following command. The `-o` option specifies the output directory. If you don't specify it, the tool writes the files to the current directory.

```bash
bal asyncapi -i order-events.yaml -o order-listener
```

The tool generates the following files:

| File | Contents |
|---|---|
| `data_types.bal` | The record types derived from the schemas in the definition. |
| `service_types.bal` | A service type for each channel, with a remote function for each event. |
| `listener.bal` | The `Listener` class, which receives the webhook requests over HTTP. |
| `dispatcher_service.bal` | The logic that reads the event type from each request and calls the matching remote function. |

For the example definition, `service_types.bal` contains a service type for the `orders` channel. The tool names each remote function after the event type, so `order_created` becomes `onOrderCreated`.

```ballerina
public type OrdersService service object {
    remote function onOrderCreated(OrderEvent event) returns error?;
    remote function onOrderCancelled(OrderEvent event) returns error?;
};
```

The `data_types.bal` file contains the payload type:

```ballerina
public type OrderEvent record {
    # The event type, for example `order_created`.
    string 'type;
    string orderId;
    string customerId?;
    decimal total?;
};
```

### Implement the event handlers

1. Go to the output directory and create a Ballerina package in it.

   ```bash
   cd order-listener
   bal init order_listener
   ```

2. Create a `main.bal` file that attaches a service of the generated service type to the generated listener. The service must implement all the remote functions of the service type.

   ```ballerina
   import ballerina/log;

   listener Listener orderListener = new (8090);

   service OrdersService on orderListener {
       remote function onOrderCreated(OrderEvent event) returns error? {
           log:printInfo("Order created", orderId = event.orderId, total = event.total);
       }

       remote function onOrderCancelled(OrderEvent event) returns error? {
           log:printInfo("Order cancelled", orderId = event.orderId);
       }
   }
   ```

   The listener listens on port `8090` by default. To share a port with other services, pass an existing `http:Listener` instead of a port number.

3. Run the package.

   ```bash
   bal run
   ```

4. Send a test event to the listener.

   ```bash
   curl -X POST http://localhost:8090 \
       -H "Content-Type: application/json" \
       -d '{"type": "order_created", "orderId": "A-1001", "customerId": "C-7", "total": 59.90}'
   ```

   The listener calls `onOrderCreated`, which logs the order:

   ```
   level=INFO module=<org>/order_listener message="Order created" orderId="A-1001" total=59.90
   ```

The generated listener doesn't verify that requests come from the event source. To add verification, such as checking a signature header, update the resource function in `dispatcher_service.bal`, which receives every incoming request. To pass additional values to the listener, such as secrets, update the `init` function in `listener.bal`.

## Generate a WebSocket client

WebSocket support in the AsyncAPI tool is experimental, and its behavior might change in future releases.

The tool generates a WebSocket client from an AsyncAPI 2.5.0 definition. You can export such a definition from a Ballerina WebSocket service. For more information, see [Export an AsyncAPI definition from a WebSocket service](#export-an-asyncapi-definition-from-a-websocket-service).

Run the following command:

```bash
bal asyncapi -i chat_asyncapi.yaml --protocol ws -o chat-client
```

The tool generates the following files:

| File | Contents |
|---|---|
| `client.bal` | The client class, with a remote function for each message the client sends. |
| `types.bal` | The record types derived from the schemas in the definition. |
| `utils.bal` | Utility functions that the client uses. |

To also generate a test file in `tests/test.bal`, add the `--with-tests` option. To add a license header to the generated files, add the `--license` option with the path to a file that contains the header.

The tool names the client class after the `info.title` field of the definition, and each remote function after the message it sends. For a definition with the title `Chat` and a `Subscribe` message, the tool generates a `ChatClient` class with a `doSubscribe` remote function. The following code uses the generated client to send a `Subscribe` message and read the response:

```ballerina
import ballerina/io;

public function main() returns error? {
    ChatClient chatClient = check new (serviceUrl = "ws://localhost:9090/chat");
    Subscribed subscribed = check chatClient->doSubscribe({event: "Subscribe", room: "general"}, 5);
    io:println("Subscribed to ", subscribed.room);
    check chatClient->connectionClose();
}
```

The second argument of `doSubscribe` is the time, in seconds, to wait for the response.

## Export an AsyncAPI definition from a WebSocket service

WebSocket support in the AsyncAPI tool is experimental, and its behavior might change in future releases.

The tool generates an AsyncAPI 2.5.0 definition from a Ballerina WebSocket service. For example, consider the following service in a `service.bal` file:

```ballerina
import ballerina/websocket;

type Subscribe record {|
    string event;
    string room;
|};

type Subscribed record {|
    string event;
    string room;
|};

@websocket:ServiceConfig {dispatcherKey: "event"}
service /chat on new websocket:Listener(9090) {
    resource function get .() returns websocket:Service {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;

    remote function onSubscribe(Subscribe message) returns Subscribed {
        return {event: "Subscribed", room: message.room};
    }
}
```

Run the following command to export the definition:

```bash
bal asyncapi -i service.bal --protocol ws
```

The tool writes the definition to `chat_asyncapi.yaml`. It names the file after the base path of the service.

To customize the export, use the following options:

- `--json`: Writes the definition in JSON format instead of YAML.
- `--service <base-path>`: Exports only the service with the given base path, for example `--service /chat`. Use this option when the file contains more than one service.
- `-o <directory>`: Writes the definition to the given directory instead of the current directory.

## Command reference

```bash
bal asyncapi -i <input-file> [options]
```

| Option | Applies to | Required | Default | Description |
|---|---|---|---|---|
| `-i`, `--input` | All | Yes | None | Path to the AsyncAPI definition (YAML or JSON), or to the Ballerina service file when you export a definition. |
| `-o`, `--output` | All | No | Current directory | Directory to write the generated files to. |
| `--protocol` | All | No | `http` | Protocol of the event API. Use `http` or `https` for webhooks, and `ws`, `wss`, or `websocket` for WebSocket. |
| `--license` | WebSocket client | No | None | Path to a file that contains the license header to add to the generated files. |
| `--with-tests` | WebSocket client | No | `false` | Generates a test file for the client. |
| `--service` | WebSocket export | No | All services | Base path of the service to export. |
| `--json` | WebSocket export | No | `false` | Writes the definition in JSON format instead of YAML. |

## What's next

- [gRPC Tool](grpc-tool.md) -- Generate gRPC services from Protocol Buffer definitions
- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [Error Handling](../../../editor/canvases/flow-canvas/node-palette.md#error-handling) -- Handle event processing failures gracefully
