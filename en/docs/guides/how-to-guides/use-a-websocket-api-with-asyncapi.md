---
sidebar_position: 11
title: "Use a WebSocket API with the AsyncAPI Tool"
sidebar_label: "Use a WebSocket API with AsyncAPI"
description: Generate a WebSocket client from an AsyncAPI definition, use it in a WSO2 Integrator automation, and run the automation on Choreo Cloud.
keywords: [wso2 integrator, asyncapi, websocket, client, automation, request reply, choreo cloud, deploy]
slug: /guides/how-to-guides/use-a-websocket-api-with-asyncapi
card_icon: event
card_summary: Generate a WebSocket client from AsyncAPI and run it in the cloud
card_keywords: [asyncapi, websocket, client, cloud]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Use a WebSocket API with the AsyncAPI Tool

A WebSocket API maintains a single open connection for bidirectional messaging, allowing you to send requests and receive replies while the server pushes real-time updates. Building a client manually requires correlating every incoming message with its corresponding request. This guide shows you how to avoid that boilerplate in WSO2 Integrator: define the API in an AsyncAPI definition, generate a client using the `bal asyncapi` tool with dedicated functions for each message, and focus solely on your integration logic.

**What you'll build:** An automation that connects to an order service, places an order, waits for the reply, and then waits for a price update. The guide includes a small sample order service for the client to talk to. You run both on your computer first, then on Choreo Cloud.

## How it works

```text
Automation ──PlaceOrder──►  Order service
           ◄─PriceUpdate──
           ◄─OrderAccepted / OrderRejected──
```

1. The automation calls `doPlaceOrder` on the generated client. The client sends a `PlaceOrder` message.
2. The service sends a `PriceUpdate`, then the reply to the order: `OrderAccepted` or `OrderRejected`.
3. Every message has a `type` field, such as `"type": "order_accepted"`. The client reads it, hands the reply to `doPlaceOrder`, and keeps the price update for whoever asks for one.
4. The automation calls `doPriceUpdate`, which returns the price update the client kept.

## Before you begin

:::info Prerequisites

- WSO2 Integrator. See [Setup](../../get-started/setup/setup.md).
- Ballerina Swan Lake Update 13 (2201.13.0) or later. WSO2 Integrator installs it for you.
- The AsyncAPI tool. Install it with `bal tool pull asyncapi`.
- A GitHub account, to hold the integration's source code.
- A Choreo Cloud account, to run the integration.

:::

## Part 1: Build the client

### Step 1: Create the project

1. Open WSO2 Integrator. In the activity bar on the left, select the **WSO2 Integrator** icon, then **Get Started**.
2. On the welcome page, under **Create a Project**, select **Create**.
3. Fill in the form:
   - **Project name:** `Order Client`
   - **What do you want to build?** **Integration**
   - **Integration name:** `Order Client`
4. Select **Create**.

<ThemedImage
    alt="Create a Project form with the project name and the integration name Order Client"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/create-project.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/create-project.png'),
    }}
/>

WSO2 Integrator creates an `order_client` folder for the project, with an `order_client` folder inside it for the integration.

### Step 2: Describe the API

Create a file named `orders.yaml` in the project folder, next to the inner `order_client` folder, with the following content:

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

What each part says:

| Part | What it says |
|---|---|
| `channels.orders` | The API has one connection, at the path `/orders` |
| `operations.placeOrder` | The client sends `PlaceOrder`, and the `reply` is `OrderAccepted` or `OrderRejected` |
| `operations.onPriceUpdate` | The client also receives `PriceUpdate` messages |
| `x-dispatcherKey: type` | The `type` field tells the messages apart. Each message gives it a fixed value with `const`. |

:::tip
If your API's definition has no `x-dispatcherKey`, the tool looks for the field itself and tells you which one it chose. If it can't tell the messages apart, it stops and shows the change to make. See [Which WebSocket specs the tool generates a client for](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/websocket-spec-support.md).
:::

### Step 3: Generate the client

1. In WSO2 Integrator, open a terminal with **Terminal** > **New Terminal**. It opens in the project folder.
2. Go into the integration's folder and run the tool:

   ```bash
   cd order_client
   bal asyncapi ../orders.yaml
   ```

3. The tool asks before it replaces `types.bal`, which WSO2 Integrator created empty. Type `y` and press **Enter**:

   ```
     types.bal
   Overwrite these file(s)? [y/N] y
   created      client.bal
   overwritten  types.bal
   created      utils.bal
   Generated 3 files.
   ```

The tool wrote these files into the integration's folder:

| File | What it contains |
|---|---|
| `client.bal` | `OrdersOrdersClient`, named after the definition's title and the channel. It has `doPlaceOrder`, which sends an order and returns the reply, and `doPriceUpdate`, which waits for the next price update. |
| `types.bal` | A record type for each message, such as `PlaceOrder` and `OrderAccepted` |
| `utils.bal` | The helpers the client uses to match each incoming message to the call waiting for it |

### Step 4: Write the automation

1. Open `order_client/config.bal` and replace its content with the address of the order service. It's a configurable value, so you can point it at another server when you deploy:

   ```ballerina title="config.bal"
   configurable string orderServiceUrl = "ws://localhost:9090";
   ```

2. Open `order_client/automation.bal` and replace its content with:

   ```ballerina title="automation.bal"
   import ballerina/log;

   public function main() returns error? {
       OrdersOrdersClient orders = check new (serviceUrl = orderServiceUrl);

       OrderAccepted|OrderRejected result = check orders->doPlaceOrder({'type: "place_order", item: "apple"}, 10);
       if result is OrderAccepted {
           log:printInfo("Order placed", orderId = result.orderId);
       } else if result is OrderRejected {
           log:printInfo("Order rejected", reason = result.reason);
       }

       PriceUpdate update = check orders->doPriceUpdate(30);
       log:printInfo("Price update", price = update.price);
       check orders->connectionClose();
   }
   ```

- `new (serviceUrl = orderServiceUrl)` connects to the service. The client adds the channel's path, `/orders`, to the URL.
- The last argument of each function is how many seconds to wait. If nothing arrives in time, the function returns an error.
- `connectionClose` closes the connection when the automation is done.

### Step 5: Add the sample order service

Your client needs something to talk to. In a real integration, that's the WebSocket API you're connecting to. For this guide, add a small sample service to the same project.

1. In the project folder, create a folder named `order_service`, and in it a file named `Ballerina.toml`:

   ```toml title="order_service/Ballerina.toml"
   [package]
   org = "<org>"
   name = "order_service"
   version = "0.1.0"
   title = "Order Service"
   ```

   Use the same `org` as in `order_client/Ballerina.toml`.

2. In the same folder, create `main.bal`:

   ```ballerina title="order_service/main.bal"
   import ballerina/websocket;

   // A sample order service for the client to talk to
   service /orders on new websocket:Listener(9090) {
       resource function get .() returns websocket:Service => new OrderService();
   }

   service class OrderService {
       *websocket:Service;

       remote function onMessage(websocket:Caller caller, json message) returns error? {
           check caller->writeMessage({'type: "price_update", price: 42.5});
           string item = check message.item;
           if item == "" {
               check caller->writeMessage({'type: "order_rejected", reason: "No item given"});
           } else {
               check caller->writeMessage({'type: "order_accepted", orderId: "ORD-" + item});
           }
       }
   }
   ```

   Note that the service sends the price update *before* the reply. The generated client still hands the reply to `doPlaceOrder`, and keeps the price update for `doPriceUpdate`.

3. Open the project's `Ballerina.toml`, in the project folder, and add the new package to the list:

   ```toml title="Ballerina.toml"
   [workspace]
   title = "Order Client"
   packages = ["order_client", "order_service"]
   ```

### Step 6: Run both on your computer

1. Start the service. In the terminal, from the project folder:

   ```bash
   cd order_service
   bal run
   ```

2. In a second terminal, run the automation from the project folder:

   ```bash
   cd order_client
   bal run
   ```

   The automation places an order, gets the reply and a price update, and stops:

   ```
   level=INFO module=<org>/order_client message="Order placed" orderId="ORD-apple"
   level=INFO module=<org>/order_client message="Price update" price=42.5
   ```

Press **Ctrl+C** in the first terminal to stop the service.

## Part 2: Run it on Choreo Cloud

### Step 7: Tell the cloud about the service's endpoint

Create a folder named `.choreo` inside `order_service`, and in it a file named `component.yaml`:

```yaml title="order_service/.choreo/component.yaml"
schemaVersion: "1.2"
endpoints:
  - name: orders
    displayName: Orders
    service:
      basePath: /
      port: 9090
    type: WS
    networkVisibilities:
      - Public
```

`type: WS` makes it a WebSocket endpoint. The `basePath` is `/`, because the client adds `/orders` to the URL itself.

### Step 8: Push the project to GitHub

1. On GitHub, create a new repository, for example `order-client-integration`. It can be private.
2. In the terminal, from the project folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Place orders with a generated WebSocket client"
   git remote add origin https://github.com/<your-account>/order-client-integration.git
   git push -u origin main
   ```

### Step 9: Deploy the sample service

1. In the Choreo Cloud console, on the project home page, select **Import a repository from** and the **GitHub** icon.
2. Choose your account, the `order-client-integration` repository and the `main` branch. For **Path**, choose `order_service`.
3. Under **Choose Integration Type**, select **Integration as API**, and select **Create**.

Choreo Cloud builds the service and deploys it. When the **Development** environment shows **Active**, the **Overview** page shows the service's `wss://` URL. Copy it.

<ThemedImage
    alt="Overview of the order_service integration, active, with its wss URL"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/service-overview.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/service-overview.png'),
    }}
/>

4. By default, Choreo Cloud asks every caller for an OAuth2 token. The sample service is only for this guide, so turn that off: select **Configure Security**, clear **OAuth2**, and select **Apply**.

<ThemedImage
    alt="Configure Security for the Orders endpoint with OAuth2 cleared"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/service-security.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/service-security.png'),
    }}
/>

:::caution
Only do this for the sample service. A real API should keep its security, and the client can send its credentials. See [Security](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/websocket-spec-support.md#security).
:::

### Step 10: Deploy the automation

1. Import the repository again, this time with the path `order_client`.
2. Under **Choose Integration Type**, select **Automation**, and select **Create**.

<ThemedImage
    alt="Integration types with Automation selected"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/automation-type.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/automation-type.png'),
    }}
/>

3. When the build is done, open **Deploy** in the left menu. Next to **Configurables**, select the edit icon.
4. Under **Optional**, enter the service's `wss://` URL from Step 9 for `orderServiceUrl`, and select **Update**.

<ThemedImage
    alt="Configurations with the orderServiceUrl value"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/client-config.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/client-config.png'),
    }}
/>

### Step 11: Run the automation

1. Open **Test** in the left menu and select **Test**. The automation runs once.
2. When the run shows a green check, select it, then **View Logs**.

<ThemedImage
    alt="Executions page with a successful run"
    sources={{
        light: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/client-run.png'),
        dark: useBaseUrl('/img/guides/usecases/use-a-websocket-api-with-asyncapi/client-run.png'),
    }}
/>

The logs show the same lines as on your computer:

```
level=INFO module=<org>/order_client message="Order placed" orderId="ORD-apple"
level=INFO module=<org>/order_client message="Price update" price=42.5
```

To run the automation regularly, set a schedule under **Job Configs** on the **Deploy** page.

## Troubleshooting

| What you see | Why | What to do |
|---|---|---|
| `InvalidHandshakeError: Invalid handshake response getStatus: 401 Unauthorized` | The cloud gateway asks for an OAuth2 token | For the sample service, clear **OAuth2**, as in [Step 9](#step-9-deploy-the-sample-service). For a real API, send its credentials. |
| `ConnectionError` | The client can't reach the service | Check `orderServiceUrl`, and that the service shows **Active** |
| An error after the timeout | No reply arrived in time | Check the service's logs, and make the timeout longer if the service is slow |
| The tool stops and asks for `x-dispatcherKey` | It can't tell the received messages apart | Make the change the error shows. See [Which WebSocket specs the tool generates a client for](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/websocket-spec-support.md). |

## What's next

- [AsyncAPI Tool](../../develop-and-test/developer-tools/integration-tools/asyncapi-tool.md) -- Every option of the tool, and the definitions it supports
- [Receive Webhook Events with the AsyncAPI Tool](receive-webhook-events-with-asyncapi.md) -- Generate a webhook listener and deploy it with a public URL
- [Import an integration](../../deploy-and-run/deploy-to-wso2-cloud/import-integration.md) -- More about importing integrations from a repository
