---
sidebar_position: 4
title: AsyncAPI Tool
description: Generate webhook listeners and WebSocket clients from AsyncAPI definitions, or export AsyncAPI definitions from Ballerina WebSocket services.
slug: /develop-and-test/developer-tools/integration-tools/asyncapi-tool
---

# AsyncAPI Tool

An AsyncAPI definition outlines the channels, messages, and participants of an event-driven API. The `bal asyncapi` tool converts these definitions into Ballerina code, or exports an AsyncAPI definition from an existing Ballerina WebSocket service. It generates:

- **Webhook listener:** Generates a listener from an event source's AsyncAPI definition (such as a SaaS application) that invokes a remote function for each incoming event and verifies request signatures when configured.
- **WebSocket client:** Generates a client from a WebSocket API definition with dedicated functions for each message it sends or receives.
- **AsyncAPI definition:** Exports an AsyncAPI definition describing an existing Ballerina WebSocket service.

:::note
The AsyncAPI tool runs from the command line (pro-code tool). You can use the generated code in your integration like any other Ballerina code.
:::

## Install the tool

The tool requires Ballerina Swan Lake Update 13 (2201.13.0) or later. Pull it from Ballerina Central:

```bash
bal tool pull asyncapi
```

Run `bal asyncapi --version` to verify the installed version. This documentation covers version 1.0.0.

## Generate a webhook listener

Provide an AsyncAPI definition describing the events sent to your webhook. The tool generates a listener and a service type for each channel, with a remote function for each event.

### Prepare the AsyncAPI definition

The tool reads AsyncAPI 2.x and 3.x definitions in YAML or JSON. Add the following extensions to the definition. The listener uses them to check each request and to call the remote function for its event.

- `x-ballerina-event-identifier`: Add this at the root of the definition. It says where each request carries its event type.
  - `type`: `body` when the event type is a field of the request body, or `header` when it is an HTTP header.
  - `path`: The JSON path of the field, such as `type` or `event.type`, or the name of the header.
- `x-ballerina-event-type`: Add this to every message. It is the value the event type has for that message.
- `x-ballerina-auth` (optional): Configures how the listener verifies incoming requests (such as checking an HMAC signature in a header) and rejects any request that fails validation. For all supported signature schemes, see the [webhook signature reference](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/webhook-dsl-reference.md).
- `x-ballerina-event-label` (optional): The name of the remote function, when the event type isn't a readable name. For example, `x-ballerina-event-label: AccountMerged` names the function `onAccountMerged` for the event type `qbo.account.merged.v1`.

Consider the following definition for an online store sending `order_created` and `order_cancelled` events. Each event carries its type in the `type` field of the request body. The store signs each request body with HMAC-SHA256 using a secret it shares with you, and sends the signature in the `X-Signature` header as `sha256=<hex digest>`:

```yaml title="order-events.yaml"
asyncapi: 3.0.0
info:
  title: Order Events
  version: 1.0.0
  description: Events an online store sends when customers place or cancel orders.
x-ballerina-event-identifier:
  type: body
  path: type
x-ballerina-auth:
  header: X-Signature
  signature:
    algorithm: sha256
    encoding: hex
    headerFormat: "sha256=${signature}"
    input: "$body"
channels:
  orders:
    address: orders
    messages:
      orderCreated:
        x-ballerina-event-type: order_created
        summary: A customer placed an order.
        payload:
          $ref: "#/components/schemas/OrderEvent"
      orderCancelled:
        x-ballerina-event-type: order_cancelled
        summary: A customer cancelled an order.
        payload:
          $ref: "#/components/schemas/OrderEvent"
operations:
  orders:
    action: receive
    channel:
      $ref: "#/channels/orders"
    messages:
      - $ref: "#/channels/orders/messages/orderCreated"
      - $ref: "#/channels/orders/messages/orderCancelled"
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
          description: The event type, such as order_created.
        orderId:
          type: string
        customerId:
          type: string
        total:
          type: number
```

### Generate the listener

The tool generates code inside a Ballerina package. Create a new package, navigate to its directory, and run the tool with your definition:

```bash
bal new order_listener
cd order_listener
bal asyncapi ../order-events.yaml
```

The tool generates the following files:

| File | Contents |
|---|---|
| `types.bal` | The record types of the event payloads, and the `ListenerConfig` record. |
| `service_types.bal` | A service type for each channel, with a remote function for each event. |
| `listener.bal` | The `Listener` class, which receives the webhook requests over HTTP. |
| `dispatcher_service.bal` | The logic that verifies each request when the definition has `x-ballerina-auth`, reads its event type, and calls the matching remote function. |
| `lib/asyncapi-trigger-compiler-plugin.jar`, `CompilerPlugin.toml` | A compiler plugin that lists the listener's endpoints when you build with `bal build --export-endpoints`. Keep both files with the package. |

For the example definition, `service_types.bal` contains a service type for the `orders` channel. The tool names each remote function after the event type, so `order_created` becomes `onOrderCreated`:

```ballerina
public type OrdersService service object {
    remote function onOrderCreated(OrderEvent payload) returns error?;
    remote function onOrderCancelled(OrderEvent payload) returns error?;
};
```

The `types.bal` file contains the payload type, and the listener configuration with the secret the listener checks signatures with:

```ballerina
public type ListenerConfig record {
    # The secret used to verify incoming webhook signatures.
    string webhookSecret?;
};

public type OrderEvent record {
    # The event type, such as order_created.
    string 'type;
    string orderId;
    string customerId?;
    decimal total?;
};
```

If the files already exist with different content, the tool lists them and asks before it replaces them. Add `--force` to replace them without asking, or `--dry-run` to see what the tool would write without writing anything.

### Implement the event handlers

1. Replace the content of `main.bal` with a service of the generated service type, attached to the generated listener. The service must implement all the remote functions of the service type.

   ```ballerina title="main.bal"
   import ballerina/log;

   configurable string webhookSecret = ?;

   listener Listener orderListener = new ({webhookSecret}, 8090);

   service OrdersService on orderListener {
       remote function onOrderCreated(OrderEvent event) returns error? {
           log:printInfo("Order created", orderId = event.orderId, total = event.total);
       }

       remote function onOrderCancelled(OrderEvent event) returns error? {
           log:printInfo("Order cancelled", orderId = event.orderId);
       }
   }
   ```

   The listener listens on port `8090`. To share a port with other services, pass an existing `http:Listener` instead of a port number. To receive the events on a path other than `/`, give the service a path, such as `service OrdersService /orders on orderListener`.

2. Create a `Config.toml` file with the secret you share with the event source:

   ```toml title="Config.toml"
   webhookSecret = "my-shared-secret"
   ```

3. Run the package.

   ```bash
   bal run
   ```

4. Send a signed test event to the listener. The following commands sign the body the same way the event source does:

   ```bash
   BODY='{"type": "order_created", "orderId": "A-1001", "customerId": "C-7", "total": 59.90}'
   SIGNATURE=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "my-shared-secret" | sed 's/^.* //')
   curl -X POST http://localhost:8090 \
       -H "Content-Type: application/json" \
       -H "X-Signature: sha256=$SIGNATURE" \
       -d "$BODY"
   ```

   The listener returns `200` and calls `onOrderCreated`, which logs the order:

   ```
   level=INFO module=<org>/order_listener message="Order created" orderId="A-1001" total=59.90
   ```

   A request with a wrong signature, or without one, gets `401` and doesn't reach the service. The listener logs why:

   ```
   level=WARN module=<org>/order_listener message="WEBHOOK_SIGNATURE_REJECTED" reason="Unauthorized: Signature Mismatch" path="/"
   ```

### Test the listener

To generate tests, add `--with-tests`. The tool writes `tests/dispatch_test.bal`, which sends a signed request for each event and checks that its remote function is called. Each test reads a sample payload from `tests/resources/trigger_payloads/<event type>.json`, such as:

```json title="tests/resources/trigger_payloads/order_created.json"
{"type": "order_created", "orderId": "A-1001", "total": 59.90}
```

Add a payload file for each event, and run `bal test`. If `main.bal` reads the secret from a configurable value, as above, also add a `tests/Config.toml` with a value for it.

The tests sign their requests, so the definition needs `x-ballerina-auth` for the tool to generate them.

## Generate a WebSocket client

Provide an AsyncAPI definition of a WebSocket API. The tool generates a client for each channel, with a function for each message it sends or receives.

### Prepare the AsyncAPI definition

The following definition describes an order service. The client sends `PlaceOrder` and gets `OrderAccepted` or `OrderRejected` back, and the server also sends `PriceUpdate` messages.

```yaml title="orders.yaml"
asyncapi: 3.0.0
info:
  title: Orders
  version: 1.0.0
servers:
  production:
    host: orders.example.com
    protocol: wss
x-dispatcherKey: type
channels:
  orders:
    address: /orders
    messages:
      PlaceOrder:
        $ref: "#/components/messages/PlaceOrder"
      OrderAccepted:
        $ref: "#/components/messages/OrderAccepted"
      OrderRejected:
        $ref: "#/components/messages/OrderRejected"
      PriceUpdate:
        $ref: "#/components/messages/PriceUpdate"
operations:
  placeOrder:
    action: send
    channel:
      $ref: "#/channels/orders"
    messages:
      - $ref: "#/channels/orders/messages/PlaceOrder"
    reply:
      channel:
        $ref: "#/channels/orders"
      messages:
        - $ref: "#/channels/orders/messages/OrderAccepted"
        - $ref: "#/channels/orders/messages/OrderRejected"
  onPriceUpdate:
    action: receive
    channel:
      $ref: "#/channels/orders"
    messages:
      - $ref: "#/channels/orders/messages/PriceUpdate"
components:
  messages:
    PlaceOrder:
      payload:
        type: object
        required: [type, item]
        properties:
          type: {type: string, const: place_order}
          item: {type: string}
    OrderAccepted:
      payload:
        type: object
        required: [type, orderId]
        properties:
          type: {type: string, const: order_accepted}
          orderId: {type: string}
    OrderRejected:
      payload:
        type: object
        required: [type, reason]
        properties:
          type: {type: string, const: order_rejected}
          reason: {type: string}
    PriceUpdate:
      payload:
        type: object
        required: [type, price]
        properties:
          type: {type: string, const: price_update}
          price: {type: number}
```

All messages share one connection, so the client tells the ones it receives apart by a field with a different fixed value in each. Here that field is `type`, and `x-dispatcherKey` names it. Without `x-dispatcherKey`, the tool works the field out when it can, and says so in a warning.

### Generate the client

Create a package, go into it, and run the tool with the definition:

```bash
bal new orders_app
cd orders_app
bal asyncapi ../orders.yaml
```

The tool reads the protocol from the definition's `wss` server. For a definition whose servers say `http` or `https`, add `--protocol ws`.

The tool generates the following files:

| File | Contents |
|---|---|
| `client.bal` | A client class for each channel. |
| `types.bal` | The record types of the messages. |
| `utils.bal` | The helpers the client uses to route the messages it receives. |

You can also customize the output with the following flags:

- `--with-tests`: Generates a test file in `tests/test.bal`.
- `--license <path>`: Adds the specified file's content as a license header to the generated files.

The tool names each client class after the definition's title and the channel, so the `orders` channel of the `Orders` definition gets `OrdersOrdersClient`. A channel at `/` is named after the title alone, such as `OrdersClient`. Each function is named after its message:

- A message the client sends gets a function (such as `doPlaceOrder`) that sends it, waiting for and returning the reply if one is defined.
- A standalone message the client receives gets a function (such as `doPriceUpdate`) that waits for the next incoming message.

The final argument of each function specifies the wait timeout in seconds.

### Use the client

Replace the content of `main.bal` with the following code, which places an order and waits for a price update:

```ballerina title="main.bal"
import ballerina/io;

public function main() returns error? {
    OrdersOrdersClient orders = check new;

    OrderAccepted|OrderRejected result = check orders->doPlaceOrder({'type: "place_order", item: "apple"}, 5);
    if result is OrderAccepted {
        io:println("Order placed: ", result.orderId);
    } else if result is OrderRejected {
        io:println("Order rejected: ", result.reason);
    }

    PriceUpdate update = check orders->doPriceUpdate(30);
    io:println("Price: ", update.price);
    check orders->connectionClose();
}
```

By default, the client connects to the server specified in the definition. To target a different server (such as a local instance), pass its base URL when initializing the client: `check new (serviceUrl = "ws://localhost:9090")`. The client automatically appends the channel's address to this URL.

### Supported WebSocket definitions

WebSocket definitions are written in many styles. The tool handles them as follows:

| The definition has | What the tool does |
|---|---|
| AsyncAPI 2.x or 3.x, with a `ws` or `wss` server | Generates a client |
| JSON messages told apart by a field, named with `x-dispatcherKey` or worked out by the tool | Generates a client |
| One kind of message received on a channel, including plain text | Generates a client, with no key needed |
| Requests with replies, as a 3.0 operation `reply` or `x-response` | The request's function returns the reply |
| Several channels, and channel parameters such as `/rooms/{roomId}` | A client for each channel, which takes the parameters when it connects |
| `http`, `httpApiKey`, `oauth2`, `apiKey` or `userPassword` security | The client sends the credentials when it connects |
| A definition written from the server's side | Generates a client with `--spec-side service` |
| A message without a JSON Schema payload, with its payload in another file, or with binary content | Leaves the message out, with a warning |
| Received messages that nothing tells apart | Stops, and shows the change to make |
| A server for another protocol, such as `mqtt`, or a Socket.IO endpoint | Stops |

The tool doesn't support binary frames, text framings over WebSocket such as STOMP or Socket.IO, or messages told apart by their position in a JSON array.

Every warning and error specifies the location in the definition and the change needed to fix it. For details on each case, including the printed message and an example fix, see [Which WebSocket specs the tool generates a client for](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/websocket-spec-support.md).

## Export an AsyncAPI definition from a WebSocket service

The tool generates an AsyncAPI 3.0 definition from a Ballerina WebSocket service. The service needs a `dispatcherKey` in its `@websocket:ServiceConfig` annotation, which names the field that tells its messages apart. For example, consider the following service in a `service.bal` file:

```ballerina title="service.bal"
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
bal asyncapi service.bal
```

The tool writes the definition to `chat_asyncapi.yaml`, named after the base path of the service.

Here `service.bal` is a standalone file. For services in a package, pass the package directory instead, such as `bal asyncapi .`, as a `.bal` file that belongs to a package is not accepted. The tool compiles the package with the dependency versions in its `Dependencies.toml`, so run `bal build` once first if the package doesn't have one.

To customize the export, use the following options:

- `--spec-format json`: Writes the definition in JSON instead of YAML.
- `--service <path>`: Exports only one service, given by its base path, such as `--service /chat`, or by the name of the service class it upgrades to, such as `--service ChatService`.
- `--module <name>`: Exports the services of one module of the package.
- `-o <directory>`: Writes the definition to the given directory instead of the current directory.

You can generate a client from the exported definition. For the example service, the client class is `ChatClient`:

```ballerina
ChatClient chat = check new;
Subscribed subscribed = check chat->doSubscribe({event: "Subscribe", room: "general"}, 5);
```

## Command reference

```bash
bal asyncapi [options] <input>
```

The input decides what the tool generates: an AsyncAPI definition (`.yaml`, `.yml` or `.json`) generates Ballerina code, and a Ballerina package directory or `.bal` file generates an AsyncAPI definition.

| Option | Applies to | Default | Description |
|---|---|---|---|
| `-o`, `--output <dir>` | All | Current directory | Directory to write the generated files to. Ballerina code must go into a package. |
| `--protocol <http\|ws>` | Code generation | Read from the definition | Protocol to generate for. Needed only when the definition has neither `x-ballerina-event-identifier` nor a `ws` or `wss` server. |
| `--force` | All | Off | Replaces existing files without asking. |
| `-n`, `--dry-run` | All | Off | Lists the files the tool would write, without writing anything. |
| `--module <name>` | All | Default module | Generates code into, or exports the services of, this module of the package. |
| `--license <file>` | Code generation | None | File with the license header to add to the generated `.bal` files. |
| `--with-tests` | Code generation | Off | Generates tests along with the code. For a webhook listener, the definition needs `x-ballerina-auth`. |
| `--spec-side <client\|service>` | WebSocket client | `client` | Reads the definition as written from the client's or the server's side. |
| `--service <path>` | Definition export | All services | Exports only this service, by base path or service class name. |
| `--spec-format <yaml\|json>` | Definition export | `yaml` | Format of the exported definition. |
| `--output-format <text\|json>` | All | `text` in a terminal, `json` otherwise | Prints results, warnings and errors as text, or as one JSON object per line. |
| `-V`, `--version` | All | | Prints the tool's version. |
| `-h`, `--help` | All | | Prints the help. |

The tool exits with `0` on success, `1` when the input can't be generated from or a file can't be written, `2` for an invalid command line, `3` when the input or output isn't a valid package or file, and `4` when it would replace files and you declined or it couldn't ask.

## What's next

- [Receive Webhook Events with the AsyncAPI Tool](../../../guides/how-to-guides/receive-webhook-events-with-asyncapi.md) -- Step by step, from a definition to a webhook running on WSO2 Cloud
- [Use a WebSocket API with the AsyncAPI Tool](../../../guides/how-to-guides/use-a-websocket-api-with-asyncapi.md) -- Step by step, from a definition to a client running on WSO2 Cloud
- [gRPC Tool](grpc-tool.md) -- Generate gRPC services from Protocol Buffer definitions
- [OpenAPI Tool](openapi-tool.md) -- Generate REST services and clients
- [Error Handling](../../../editor/canvases/flow-canvas/node-palette.md#error-handling) -- Handle event processing failures gracefully
