---
sidebar_position: 10
title: "Receive Webhook Events with the AsyncAPI Tool"
sidebar_label: "Receive Webhook Events with AsyncAPI"
description: Generate a webhook listener from an AsyncAPI definition, handle its events in a WSO2 Integrator integration, and deploy it to Choreo Cloud with a public URL.
keywords: [wso2 integrator, asyncapi, webhook, listener, event-driven, signature, hmac, choreo cloud, deploy]
slug: /guides/how-to-guides/receive-webhook-events-with-asyncapi
card_icon: event
card_summary: Generate a webhook listener from AsyncAPI and deploy it
card_keywords: [asyncapi, webhook, event-driven, cloud]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Receive Webhook Events with the AsyncAPI Tool

Many services tell you about changes by calling your webhook: a store sends an event when a customer places an order, a payment service when a payment succeeds. This guide shows how to receive such events in WSO2 Integrator without writing the HTTP plumbing yourself. You describe the events in an AsyncAPI definition, the `bal asyncapi` tool generates a listener for them, and you only write what happens for each event.

**What you'll build:** An integration that receives `order_created` and `order_cancelled` events from an online store, checks that each request really comes from the store, and logs the order. You run it on your computer first, then deploy it to Choreo Cloud, where it gets a public URL the store can call.

## How it works

```text
Online store ──(POST, signed)──► Choreo Cloud ──► Listener ──(checks signature)──► onOrderCreated / onOrderCancelled
```

1. The store sends each event as an HTTP `POST` with a JSON body, such as `{"type": "order_created", "orderId": "A-1001"}`.
2. The store signs the body with a secret it shares with you, and sends the signature in the `X-Signature` header.
3. The generated listener checks the signature. A request with a wrong or missing signature gets `401` and goes no further.
4. The listener reads the `type` field and calls the matching remote function in your service: `onOrderCreated` or `onOrderCancelled`.

## Before you begin

:::info Prerequisites

- WSO2 Integrator. See [Setup](../../get-started/setup/setup.md).
- Ballerina Swan Lake Update 13 (2201.13.0) or later. WSO2 Integrator installs it for you.
- A GitHub account, to hold the integration's source code.
- A Choreo Cloud account, to deploy the integration.
- `curl` and `openssl`, to send test events. Both come with macOS, Linux and Git for Windows.

:::

## Part 1: Build the integration

### Step 1: Install the AsyncAPI tool

Open a terminal and run:

```bash
bal tool pull asyncapi
```

Check that it works:

```bash
bal asyncapi --version
```

### Step 2: Create the project

1. Open WSO2 Integrator. In the activity bar on the left, select the **WSO2 Integrator** icon, then **Get Started**.
2. On the welcome page, under **Create a Project**, select **Create**.
3. Fill in the form:
   - **Project name:** `Order Events`
   - **What do you want to build?** **Integration**
   - **Integration name:** `Order Listener`
4. Select **Create**.

<ThemedImage
    alt="Create a Project form with the project name Order Events and the integration name Order Listener"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/create-project.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/create-project.png'),
    }}
/>

WSO2 Integrator creates an `order_events` folder for the project, with an `order_listener` folder inside it for the integration.

### Step 3: Describe the events

The AsyncAPI definition tells the tool what the store sends. Create a file named `order-events.yaml` in the `order_events` project folder, next to the `order_listener` folder, with the following content:

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

Most of the file is standard AsyncAPI: the events, under `messages`, and the shape of their data, under `schemas`. Three lines starting with `x-ballerina` tell the tool what it needs to know about the webhook:

| Extension | What it says |
|---|---|
| `x-ballerina-event-identifier` | Where each request carries its event type. Here, in the `type` field of the body. |
| `x-ballerina-event-type` | The value of that field for each event: `order_created` and `order_cancelled`. |
| `x-ballerina-auth` | How the store signs each request: an HMAC-SHA256 of the body, in hex, sent as `X-Signature: sha256=<signature>`. |

:::tip
For your own event source, copy these values from its webhook documentation. For every signature scheme the tool supports, such as GitHub, Slack and Stripe style signatures, see the [webhook signature reference](https://github.com/ballerina-platform/asyncapi-tools/blob/main/docs/webhook-dsl-reference.md).
:::

### Step 4: Generate the listener

1. In WSO2 Integrator, open a terminal with **Terminal** > **New Terminal**. It opens in the `order_events` folder.
2. Go into the integration's folder and run the tool:

   ```bash
   cd order_listener
   bal asyncapi ../order-events.yaml
   ```

3. The tool asks before it replaces `types.bal`, which WSO2 Integrator created empty. Type `y` and press **Enter**:

   ```
     types.bal
   Overwrite these file(s)? [y/N] y
   created      CompilerPlugin.toml
   created      dispatcher_service.bal
   created      lib/asyncapi-trigger-compiler-plugin.jar
   created      listener.bal
   created      service_types.bal
   overwritten  types.bal
   Generated 6 files.
   ```

The tool wrote these files into `order_listener`:

| File | What it contains |
|---|---|
| `types.bal` | `OrderEvent`, the type of the event data, and `ListenerConfig`, the listener's settings |
| `service_types.bal` | `OrdersService`, with a remote function for each event: `onOrderCreated` and `onOrderCancelled` |
| `listener.bal` | `Listener`, which receives the requests |
| `dispatcher_service.bal` | The code that checks each signature and calls the right remote function |
| `lib/asyncapi-trigger-compiler-plugin.jar`, `CompilerPlugin.toml` | A plugin that lists the listener's endpoints when the integration is built |

You don't need to edit any of them.

:::caution
Keep your own types out of `types.bal`. If you generate the listener again, for example after adding an event to the definition, the tool replaces `types.bal`.
:::

### Step 5: Add the shared secret

The listener needs the secret that the store signs requests with. Make it a configurable value, so you can give it a different value on your computer and in the cloud.

Open `order_listener/config.bal` and replace its content with:

```ballerina title="config.bal"
configurable string webhookSecret = ?;
```

The `?` means the integration doesn't start until a value is given.

### Step 6: Handle the events

Open `order_listener/main.bal` and replace its content with:

```ballerina title="main.bal"
import ballerina/http;
import ballerina/log;

listener http:Listener httpListener = new (8090);

listener Listener orderListener = new ({webhookSecret}, httpListener);

service OrdersService on orderListener {
    remote function onOrderCreated(OrderEvent event) returns error? {
        log:printInfo("Order created", orderId = event.orderId, total = event.total);
    }

    remote function onOrderCancelled(OrderEvent event) returns error? {
        log:printInfo("Order cancelled", orderId = event.orderId);
    }
}
```

- `httpListener` listens for HTTP requests on port `8090`.
- `orderListener` is the generated listener. It uses `httpListener` and checks signatures with `webhookSecret`.
- The service implements the generated `OrdersService`, so it has one remote function per event. Put your own logic in them, such as saving the order or calling another service.

WSO2 Integrator shows the listener and the service on the design canvas:

<ThemedImage
    alt="Design canvas with orderListener connected to OrdersService, which has onOrderCreated and onOrderCancelled"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/integration-design.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/integration-design.png'),
    }}
/>

### Step 7: Run and test it on your computer

1. In the `order_listener` folder, create a file named `Config.toml` with a secret to test with:

   ```toml title="Config.toml"
   webhookSecret = "my-shared-secret"
   ```

   `Config.toml` holds values for your computer only. It's listed in `.gitignore`, so it isn't pushed to GitHub.

2. Run the integration from the terminal:

   ```bash
   bal run
   ```

3. Open a second terminal and send a signed event, the way the store would:

   ```bash
   BODY='{"type": "order_created", "orderId": "A-1001", "customerId": "C-7", "total": 59.90}'
   SIGNATURE=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "my-shared-secret" | sed 's/^.* //')
   curl -i -X POST http://localhost:8090 \
       -H "Content-Type: application/json" \
       -H "X-Signature: sha256=$SIGNATURE" \
       -d "$BODY"
   ```

   The response is `HTTP/1.1 200 OK`, and the first terminal shows:

   ```
   level=INFO module=<org>/order_listener message="Order created" orderId="A-1001" total=59.90
   ```

4. Send the same event with a wrong signature:

   ```bash
   curl -i -X POST http://localhost:8090 \
       -H "Content-Type: application/json" \
       -H "X-Signature: sha256=0000" \
       -d "$BODY"
   ```

   The response is `401 Unauthorized`, your service isn't called, and the listener logs why:

   ```
   level=WARN module=<org>/order_listener message="WEBHOOK_SIGNATURE_REJECTED" reason="Unauthorized: Signature Mismatch" path="/"
   ```

Press **Ctrl+C** in the first terminal to stop the integration.

## Part 2: Deploy to Choreo Cloud

### Step 8: Tell the cloud about the webhook endpoint

Choreo Cloud gives an integration a public URL for each endpoint it finds when it builds the integration. It doesn't find the generated listener on its own, so declare the endpoint in a file.

Create a folder named `.choreo` inside `order_listener`, and in it a file named `component.yaml`:

```yaml title="order_listener/.choreo/component.yaml"
schemaVersion: "1.2"
endpoints:
  - name: order-events
    displayName: Order Events
    service:
      basePath: /
      port: 8090
    type: REST
    networkVisibilities:
      - Public
```

The `port` is the port of `httpListener` in `main.bal`.

### Step 9: Push the project to GitHub

1. On GitHub, create a new repository, for example `order-events-integration`. It can be private.
2. In the terminal, go to the `order_events` project folder and push the project:

   ```bash
   cd ..
   git init -b main
   git add .
   git commit -m "Receive order events"
   git remote add origin https://github.com/<your-account>/order-events-integration.git
   git push -u origin main
   ```

You can also use the **Source Control** view of WSO2 Integrator to commit and publish.

### Step 10: Import the integration

1. Sign in to the Choreo Cloud console. On the project home page, under **Create it yourself**, select **Import a repository from** and the **GitHub** icon.
2. If this is the first time, authorize the GitHub app and give it access to your repository. To add your personal account, select **Add** in the **Organization** list.
3. Fill in the form:
   - **Organization:** your GitHub account
   - **Repository:** `order-events-integration`
   - **Branch:** `main`
   - **Path:** select the edit icon and choose `order_listener`. The repository root is the project, so the console asks for the integration's folder.

<ThemedImage
    alt="Import an Integration form with the repository, the main branch and the order_listener path"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/import-integration.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/import-integration.png'),
    }}
/>

4. Under **Choose Integration Type**, select **Integration as API**. A webhook receiver is called over HTTP, like an API.
5. Select **Create**.

<ThemedImage
    alt="Integration types with Integration as API selected"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/integration-type.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/integration-type.png'),
    }}
/>

Choreo Cloud creates the integration and starts building it. Open **Build** in the left menu to follow it. Wait until the status is **Success**.

<ThemedImage
    alt="Builds page with a successful build"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/build.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/build.png'),
    }}
/>

### Step 11: Let the store call the webhook

By default, Choreo Cloud asks every caller of an endpoint for an OAuth2 token. A webhook sender, such as the store, can't send one, so turn that check off for `POST`. The listener still checks the signature of every request, so only the store can send events.

1. On the integration's **Overview** page, select **Configure Security**.
2. Under **Resources**, expand **POST** `/*` and turn **Security** off. Leave the other methods as they are.
3. Select **Apply**.

<ThemedImage
    alt="Configure Security with Security turned off for POST"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/post-security.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/post-security.png'),
    }}
/>

### Step 12: Set the secret and deploy

1. Open **Deploy** in the left menu and select **Configure & Deploy**.
2. Under **Required**, enter the shared secret for `webhookSecret`. Use a long random value, and give the same value to the store when you register the webhook with it.

<ThemedImage
    alt="Configurations with the required webhookSecret value"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/configure-secret.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/configure-secret.png'),
    }}
/>

3. Select **Next**. The **Endpoint Details** show the `order-events` endpoint on port `8090`, with its **Public URL**. Copy the URL.

<ThemedImage
    alt="Endpoint Details with the order-events endpoint and its public URL"
    sources={{
        light: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/endpoint-details.png'),
        dark: useBaseUrl('/img/guides/usecases/receive-webhook-events-with-asyncapi/endpoint-details.png'),
    }}
/>

4. Select **Apply**. When the **Development** environment shows **Active**, the integration is running.

### Step 13: Send an event to the cloud

Send a signed event to the public URL, using the secret you set in Step 12:

```bash
URL="<public URL from Step 12>"
SECRET="<secret from Step 12>"
BODY='{"type": "order_created", "orderId": "A-1001", "customerId": "C-7", "total": 59.90}'
SIGNATURE=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')
curl -i -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "X-Signature: sha256=$SIGNATURE" \
    -d "$BODY"
```

The response is `200`. To see what the integration did, open **Observability** > **Logs** in the left menu. The newest lines are at the bottom:

```
Gateway Logs      200 BACKEND_RESPONSE   Method="POST" RequestPath="/default/orderlistener/v1.0"
Application Logs  level=INFO module=<org>/order_listener message="Order created" orderId="A-1001" total=59.90
```

Finally, register the public URL as the webhook in the store's settings, with the same secret. From then on, every order the store sends calls your service.

## Troubleshooting

| What you see | Why | What to do |
|---|---|---|
| `401` with `"error_message":"Invalid Credentials"` | The cloud gateway asks for an OAuth2 token | Turn **Security** off for `POST`, as in [Step 11](#step-11-let-the-store-call-the-webhook) |
| `401` and `WEBHOOK_SIGNATURE_REJECTED` in the logs | The signature doesn't match | Check that the sender and the integration use the same secret, and that the body is signed exactly as sent |
| `error: value not provided for required configurable variable 'webhookSecret'` in the logs | The integration was deployed without the secret | Set it with **Configure & Deploy**, as in [Step 12](#step-12-set-the-secret-and-deploy) |
| **Endpoints** shows `0` and there's no public URL | The cloud didn't find the listener's endpoint | Add `.choreo/component.yaml`, as in [Step 8](#step-8-tell-the-cloud-about-the-webhook-endpoint), and push again |

## What's next

- [AsyncAPI Tool](../../develop-and-test/developer-tools/integration-tools/asyncapi-tool.md) -- Every option of the tool, and the WebSocket client it generates
- [Use a WebSocket API with the AsyncAPI Tool](use-a-websocket-api-with-asyncapi.md) -- Generate a client for a WebSocket API and run it in the cloud
- [Import an integration](../../deploy-and-run/deploy-to-wso2-cloud/import-integration.md) -- More about importing integrations from a repository
