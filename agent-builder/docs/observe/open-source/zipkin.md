---
title: Zipkin
---

# Zipkin

Zipkin is an open-source distributed tracing platform that helps troubleshoot latency problems in service architectures. WSO2 Agent Builder provides built-in Zipkin support, publishing tracing data in Zipkin format.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Zipkin | Version 2.24 or later |
| Network | The agent must reach the Zipkin agent endpoint |

## Step 1: Start Zipkin

Run Zipkin using Docker:

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

The Zipkin UI is available at `http://localhost:9411`.

There are many possible ways to deploy Zipkin. For more information, see [Zipkin Quickstart](https://zipkin.io/pages/quickstart).

## Step 2: Import the Zipkin Extension

To include the Zipkin extension in the executable, import the `ballerinax/zipkin` module in your project's `main.bal` file.

1. In the **Explorer** pane, navigate to your project root and open `main.bal`.
2. Add the following import at the top of the file:

```ballerina
import ballerinax/zipkin as _;
```

The Zipkin extension includes a **Zipkin Span Exporter** that pushes tracing data as batches to the Zipkin server endpoint (default: `http://localhost:9411`) in Zipkin format.

## Step 3: Configure Ballerina for Zipkin

Open `Ballerina.toml` by navigating file explorer and edit as follows

```toml
[build-options]
observabilityIncluded = true

```

Configure `Config.toml`:

1. In the **Explorer** pane, navigate to your project root and open `Config.toml`. If the file does not exist, create it at the project root.
2. Add or update the following configuration:

```toml
[ballerina.observe]
tracingEnabled = true
tracingProvider = "zipkin"

[ballerinax.zipkin]
agentHostname = "localhost"
agentPort = 9411
samplerType = "const"
samplerParam = 1.0
reporterFlushInterval = 1000
reporterBufferSize = 10000
```

### Configuration options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `agentHostname` | string | `"localhost"` | Hostname of the Zipkin agent. Use `localhost` if running on the same node as Ballerina. |
| `agentPort` | int | `9411` | Port on which the Zipkin agent is listening. |
| `samplerType` | string | `"const"` | Sampling strategy: `const`, `probabilistic`, or `ratelimiting`. |
| `samplerParam` | decimal | `1` | For `const`: `0` (no sampling) or `1` (sample all). For `probabilistic`: `0.0`–`1.0`. For `ratelimiting`: positive integer (rate per second). |
| `reporterFlushInterval` | int | `1000` | Interval (ms) at which the client sends spans to the agent. |
| `reporterBufferSize` | int | `10000` | Queue size of the Zipkin client. |

## Step 4: Send Requests

Run the service and send requests to it to generate trace data. The example requests below call this sample shop service (`main.bal`), which listens on port `8090`. The service hosts a shop assistant agent that answers customer questions and calls tools to list products, place orders, and look up orders. The sample uses the default WSO2 model provider.

```ballerina
import ballerina/ai;
import ballerina/http;
import ballerinax/zipkin as _;

type Product record {|
    int id;
    string name;
    decimal price;
|};

type Order record {|
    int id;
    int productId;
    int quantity;
|};

final readonly & map products = {
    "1": {id: 1, name: "Laptop", price: 1200.00},
    "2": {id: 2, name: "Mouse", price: 25.00},
    "3": {id: 3, name: "Keyboard", price: 45.00}
};

isolated Order[] orders = [];

# Lists the products that the shop sells.
# + return - The product catalog
@ai:AgentTool
isolated function listProducts() returns Product[] => products.toArray();

# Places an order for a product.
# + productId - The ID of the product to order
# + quantity - The number of units to order
# + return - The new order, or an error if the product doesn't exist
@ai:AgentTool
isolated function placeOrder(int productId, int quantity) returns Order|error {
    if !products.hasKey(productId.toString()) {
        return error(string `Product ${productId} not found`);
    }
    lock {
        Order newOrder = {id: orders.length(), productId, quantity};
        orders.push(newOrder);
        return newOrder.clone();
    }
}

# Gets the details of an order.
# + orderId - The ID of the order
# + return - The order, or an error if it doesn't exist
@ai:AgentTool
isolated function getOrder(int orderId) returns Order|error {
    lock {
        if orderId < 0 || orderId >= orders.length() {
            return error(string `Order ${orderId} not found`);
        }
        return orders[orderId].clone();
    }
}

// Default model provider
final ai:Wso2ModelProvider wso2ModelProvider =
    check ai:getDefaultModelProvider();

// Agent declaration
final ai:Agent shopAssistantAgent = check new (
    systemPrompt = {
        role: string `Shop Assistant`,
        instructions: string `You help customers find products, place
            orders, and check order status. Use the tools for every
            product and order lookup. Never invent product IDs or prices.`
    },
    model = wso2ModelProvider,
    tools = [listProducts, placeOrder, getOrder]
);

service /shop on new http:Listener(8090) {

    resource function get products() returns Product[] {
        return products.toArray();
    }

    resource function post assistant(@http:Payload ai:ChatReqMessage request)
            returns ai:ChatRespMessage|error {
        string answer = check shopAssistantAgent.run(request.message, request.sessionId);
        return {message: answer};
    }
}
```

Example cURL commands. The requests to `/shop/assistant` share a session ID, so the agent keeps the context of the conversation:

```bash
curl -X GET http://localhost:8090/shop/products
```

```bash
curl -X POST http://localhost:8090/shop/assistant \
-H "Content-Type: application/json" \
-d '{
    "sessionId": "session-1",
    "message": "Which keyboards do you sell, and how much do they cost?"
}'
```

```bash
curl -X POST http://localhost:8090/shop/assistant \
-H "Content-Type: application/json" \
-d '{
    "sessionId": "session-1",
    "message": "Order one keyboard for me."
}'
```

```bash
curl -X POST http://localhost:8090/shop/assistant \
-H "Content-Type: application/json" \
-d '{
    "sessionId": "session-1",
    "message": "What is the status of my order?"
}'
```

## Step 5: View Traces

1. Open the Zipkin UI at `http://localhost:9411`.
2. Select the service for which you need tracing information.
3. Click **Run Query** to find recent traces.
4. Click a trace to view the span timeline.

### Trace visualization

Zipkin displays traces as a timeline of spans:

- **Service Name**: The Ballerina service that generated the span
- **Span Name**: The HTTP method and resource path for the request, `invoke_agent` for the agent run, `chat` for each LLM call, and `execute_tool` for each tool call
- **Duration**: Time taken for the operation
- **Annotations**: Checkpoints recorded while the request is processed, each with the source module and code position (`src.module`, `src.position`)

## What's next

- [Distributed Tracing](../tracing.md) — How tracing works and how to choose a backend
- [Jaeger](jaeger.md) — Alternative distributed tracing with Jaeger
- [Logging](../logging.md) — Configure structured logging
- [Overview](../observe.md) — Full observability architecture
