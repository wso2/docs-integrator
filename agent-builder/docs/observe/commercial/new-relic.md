---
title: New Relic
---

# New Relic

[New Relic](https://newrelic.com/) is an observability platform designed to help organizations monitor, analyze, and
troubleshoot their applications, infrastructure, and digital experiences in real-time. Both metrics and tracing of an agent can
be viewed with New Relic.

This guide uses the following sample shop service (`main.bal`), which listens on port `8090`. The service hosts a shop assistant agent that answers customer questions and calls tools to list products, place orders, and look up orders. The sample uses the default WSO2 model provider. Follow the steps given below to observe tracing and metrics in New Relic.

```ballerina
import ballerina/ai;
import ballerina/http;

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

## Step 1: Create a New Relic Account and API Key

Sign up and Generate an API Key in New Relic.

To configure the API key in New Relic:
> Go to **Profile → API keys → Insights Insert key → Insert keys** to create an account in New Relic.

## Step 2: Import the New Relic Extension

To include the New Relic extension into the executable, the `ballerinax/newrelic` module needs to be imported into your
agent's `main.bal` file. Navigate to File explorer view in WSO2 Agent Builder to do so.

```ballerina
import ballerinax/newrelic as _;
```

The New Relic extension has an `OpenTelemetry gRPC Span Exporter` that pushes tracing data in batches to the New Relic server endpoint (`https://otlp.nr-data.net:4317`) in OpenTelemetry format.

New Relic extension pushes metrics in New Relic metric format to the New Relic server endpoint (`https://metric-api.newrelic.com/metric/v1`).

## Step 3: Configure Runtime Configurations

Make sure `observabilityIncluded = true` is set under `[build-options]` in the `Ballerina.toml` file. New projects include it by default. Do not add a second `[build-options]` table.

```toml
[build-options]
observabilityIncluded = true
```

Tracing and metrics can be enabled in your Ballerina project using configurations similar to the following in your `Config.toml` file.

**File path:** `Config.toml`

```toml
[ballerina.observe]
tracingEnabled=true
tracingProvider="newrelic"
metricsEnabled=true
metricsReporter="newrelic"

[ballerinax.newrelic]
apiKey="<NEW_RELIC_LICENSE_KEY>"    # Mandatory Configuration.
tracingSamplerType="const"          # Optional Configuration. Default value is 'const'
tracingSamplerParam=1               # Optional Configuration. Default value is 1
tracingReporterFlushInterval=15000  # Optional Configuration. Default value is 15000 milliseconds
tracingReporterBufferSize=10000     # Optional Configuration. Default value is 10000
metricReporterFlushInterval=15000   # Optional Configuration. Default value is 15000 milliseconds
metricReporterClientTimeout=10000   # Optional Configuration. Default value is 10000 milliseconds
isTraceLoggingEnabled=false         # Optional Configuration. Default value is false
isPayloadLoggingEnabled=false       # Optional Configuration. Default value is false

[ballerinax.newrelic.additionalAttributes]      # Optional Configuration. Add custom attributes (key & value pair) to metrics
key1 = "<VALUE_1>"
key2 = "<VALUE_2>"
```

Users can also configure multiple API keys for different New Relic user accounts as given below.

```toml
[ballerinax.newrelic]
apiKey=["<NEW_RELIC_LICENSE_KEY_1>", "<NEW_RELIC_LICENSE_KEY_2>"]
```

User can configure the environment variable `BALLERINA_NEW_RELIC_API_KEY` instead of apiKey in `Config.toml`. If both are configured, apiKey in `Config.toml` will be overwritten by the environment variable value.

Environment variable can be configured for either a single user or multiple users.

**For a single user account:**
- Linux/Unix: `export BALLERINA_NEW_RELIC_API_KEY="<NEW_RELIC_LICENSE_KEY>"`
- Windows: `set BALLERINA_NEW_RELIC_API_KEY="<NEW_RELIC_LICENSE_KEY>"`

**For multiple user accounts:**
- Linux/Unix: `export BALLERINA_NEW_RELIC_API_KEY="<NEW_RELIC_LICENSE_KEY_1>,<NEW_RELIC_LICENSE_KEY_2>"`
- Windows: `set BALLERINA_NEW_RELIC_API_KEY="<NEW_RELIC_LICENSE_KEY_1>,<NEW_RELIC_LICENSE_KEY_2>"`

**Note:** When specifying multiple API keys in the environment variable, separate each key with a comma (`,`) and do not include spaces between the keys. Any leading or trailing whitespace around each key will be trimmed automatically. For example:
- `export BALLERINA_NEW_RELIC_API_KEY="key1,key2,key3"`
- `export BALLERINA_NEW_RELIC_API_KEY="key1, key2 , key3"` (spaces will be trimmed)

### Configuration options

| Configuration key | Description | Default value | Possible values |
| --- | --- | --- | --- |
| `ballerinax.newrelic.apiKey` | API key generated by the user in the New Relic platform. **This configuration is mandatory.** | `None` | |
| `ballerinax.newrelic.tracingSamplerType` | Type of the sampling methods used in the New Relic tracer. | `const` | `const`, `probabilistic`, or `ratelimiting` |
| `ballerinax.newrelic.tracingSamplerParam` | It is a floating value. Based on the sampler type, the effect of the sampler param varies | `1.0` | For `const` `0` (no sampling) or `1` (sample all spans), for `probabilistic` `0.0` to `1.0`, for `ratelimiting` any positive integer (rate per second) |
| `ballerinax.newrelic.tracingReporterFlushInterval` | The New Relic tracing client will be sending the spans to the agent at this interval. | `15000` | Any positive integer value |
| `ballerinax.newrelic.tracingReporterBufferSize` | Queue size of the New Relic tracing client. | `10000` | Any positive integer value |
| `ballerinax.newrelic.metricReporterFlushInterval` | The New Relic client will be sending the metrics to the agent at this interval. | `15000` | Any positive integer value |
| `ballerinax.newrelic.metricReporterClientTimeout` | Timeout of the New Relic metric client, in milliseconds. | `10000` | Any positive integer value |

## Step 4: Send Requests

Run the service and send requests. The requests to `/shop/assistant` share a session ID, so the agent keeps the context of the conversation.

Example cURL commands:

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

## Step 5: View Metrics on the New Relic Platform

You can view the metrics that were published to the New Relic platform in the New Relic query builder. You can view the metrics query data in graphical format, as shown below.

![New Relic metric Query Builder](./images/newrelic-metric-query-builder.png "New Relic metric Query Builder")

You can create a dashboard from the metrics provided by Ballerina in the New Relic platform.

## Step 6: View Tracing on the New Relic Platform

You can view the traces that were published to the New Relic platform in New Relic traces. Each request to `/shop/assistant` produces an `invoke_agent` span for the agent run, with `chat` spans for the LLM calls and `execute_tool` spans for the tool calls beneath it.

![Ballerina traces on New Relic](./images/newrelic-tracing.png "Ballerina traces on New Relic")

![Span tags on New Relic](./images/newrelic-span-tags.png "Span tags on New Relic")

## What's next

- [Jaeger](../open-source/jaeger.md) — Distributed tracing with Jaeger
- [Zipkin](../open-source/zipkin.md) — Distributed tracing with Zipkin
- [Overview](../observe.md) — Full observability architecture
