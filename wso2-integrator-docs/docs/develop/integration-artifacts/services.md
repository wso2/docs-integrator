---
sidebar_position: 1
title: Services
description: Build HTTP, GraphQL, gRPC, WebSocket, TCP, and WebSub services for your integrations.
---

# Services

Services are the most common integration artifact. They expose your integrations over network protocols, accepting incoming requests and returning responses. WSO2 Integrator supports HTTP, GraphQL, gRPC, WebSocket, TCP, and WebSub services, all built on the Ballerina language runtime.

## HTTP Services

HTTP services are the foundation for REST APIs, webhooks, and data services.

### Creating an HTTP Service

<!-- TODO: Screenshot of the visual designer creating an HTTP service -->

```ballerina
import ballerina/http;

configurable int port = 8090;

service /api on new http:Listener(port) {

    resource function get greeting() returns string {
        return "Hello from WSO2 Integrator!";
    }
}
```

### Defining Resources and Methods

Each resource function maps to an HTTP method and path. Ballerina's type system ensures request and response payloads are validated automatically.

```ballerina
service /orders on new http:Listener(8090) {

    // GET /orders
    resource function get .() returns Order[]|error {
        return getOrders();
    }

    // GET /orders/{id}
    resource function get [string id]() returns Order|http:NotFound {
        Order? order = getOrder(id);
        return order ?: http:NOT_FOUND;
    }

    // POST /orders
    resource function post .(Order order) returns Order|http:BadRequest|error {
        return createOrder(order);
    }

    // PUT /orders/{id}
    resource function put [string id](Order order) returns Order|http:NotFound|error {
        return updateOrder(id, order);
    }

    // DELETE /orders/{id}
    resource function delete [string id]() returns http:NoContent|http:NotFound {
        boolean deleted = deleteOrder(id);
        return deleted ? http:NO_CONTENT : http:NOT_FOUND;
    }
}
```

### Path Parameters and Query Parameters

```ballerina
service /api on new http:Listener(8090) {

    // Path parameter: /api/users/42
    resource function get users/[int userId]() returns User|error {
        return getUser(userId);
    }

    // Query parameters: /api/products?category=electronics&limit=10
    resource function get products(string? category, int limit = 20) returns Product[]|error {
        return searchProducts(category, limit);
    }

    // Multiple path segments: /api/orgs/wso2/repos/integrator
    resource function get orgs/[string org]/repos/[string repo]() returns Repository|error {
        return getRepository(org, repo);
    }
}
```

### Request and Response Payload Types

Define typed records for request and response payloads. Ballerina automatically validates and deserializes incoming JSON.

```ballerina
type OrderRequest record {|
    string customerId;
    LineItem[] items;
    string? shippingAddress;
|};

type OrderResponse record {|
    string orderId;
    string status;
    decimal totalAmount;
    string createdAt;
|};

resource function post orders(OrderRequest request) returns OrderResponse|http:BadRequest|error {
    // request is already validated and deserialized
    OrderResponse response = check processOrder(request);
    return response;
}
```

### Headers and Content Types

```ballerina
resource function post webhook(
    @http:Header string x\-api\-key,
    @http:Header {name: "Content-Type"} string contentType,
    http:Request req
) returns http:Accepted|http:Unauthorized {
    if x\-api\-key != expectedKey {
        return http:UNAUTHORIZED;
    }
    // Process the webhook payload
    return http:ACCEPTED;
}
```

### CORS Configuration

```ballerina
@http:ServiceConfig {
    cors: {
        allowOrigins: ["https://app.example.com"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 3600
    }
}
service /api on new http:Listener(8090) {
    // Resources inherit CORS configuration
}
```

### Interceptors and Middleware

Use request/response interceptors for cross-cutting concerns such as logging, authentication, and rate limiting.

```ballerina
service class LoggingInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
        http:RequestContext ctx,
        http:Request req
    ) returns http:NextService|error? {
        log:printInfo("Request received", method = req.method, path = req.rawPath);
        return ctx.next();
    }
}

service class AuthInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
        http:RequestContext ctx,
        @http:Header string authorization
    ) returns http:NextService|http:Unauthorized|error? {
        if !check validateToken(authorization) {
            return http:UNAUTHORIZED;
        }
        return ctx.next();
    }
}

listener http:Listener ep = new (8090);

// Apply interceptors to the service
@http:ServiceConfig {
    interceptors: [new LoggingInterceptor(), new AuthInterceptor()]
}
service /api on ep {
    resource function get secured\-data() returns json {
        return {message: "This is protected data"};
    }
}
```

### Error Responses and Status Codes

```ballerina
type ErrorResponse record {|
    string code;
    string message;
    string[] details?;
|};

resource function get orders/[string id]() returns Order|http:NotFound|http:InternalServerError {
    Order|error result = getOrder(id);
    if result is error {
        ErrorResponse errBody = {code: "NOT_FOUND", message: "Order not found"};
        http:NotFound notFound = {body: errBody};
        return notFound;
    }
    return result;
}
```

## GraphQL Services

Build GraphQL APIs with queries, mutations, and subscriptions.

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9090) {

    // Query: { products(category: "electronics") { id name price } }
    resource function get products(string? category) returns Product[]|error {
        return getProducts(category);
    }

    // Query: { product(id: "123") { id name price } }
    resource function get product(string id) returns Product|error {
        return getProduct(id);
    }

    // Mutation: mutation { addProduct(input: {...}) { id name } }
    remote function addProduct(ProductInput input) returns Product|error {
        return createProduct(input);
    }

    // Subscription: subscription { onProductCreated { id name } }
    resource function subscribe onProductCreated() returns stream<Product, error?> {
        return getProductStream();
    }
}
```

GraphQL services automatically generate the schema from Ballerina types. Use the built-in GraphQL Playground for interactive testing.

<!-- TODO: Screenshot of GraphQL Playground in Try-It -->

## gRPC Services

Define services using Protocol Buffers and generate Ballerina code.

```ballerina
import ballerina/grpc;

@grpc:Descriptor {value: ORDER_SERVICE_DESC}
service "OrderService" on new grpc:Listener(9090) {

    // Unary RPC
    remote function getOrder(OrderRequest request) returns Order|error {
        return retrieveOrder(request.orderId);
    }

    // Server streaming RPC
    remote function listOrders(OrderFilter filter) returns stream<Order, error?> {
        return streamOrders(filter);
    }

    // Client streaming RPC
    remote function batchCreateOrders(stream<Order, error?> orders) returns BatchResult|error {
        return processBatch(orders);
    }

    // Bidirectional streaming RPC
    remote function orderChat(stream<OrderMessage, error?> messages)
            returns stream<OrderMessage, error?> {
        return handleChat(messages);
    }
}
```

## WebSocket Services

Handle real-time bidirectional communication with WebSocket.

```ballerina
import ballerina/websocket;

service /ws on new websocket:Listener(8080) {

    resource function get .() returns websocket:Service|error {
        return new ChatService();
    }
}

service class ChatService {
    *websocket:Service;

    remote function onOpen(websocket:Caller caller) returns error? {
        log:printInfo("Client connected", connectionId = caller.getConnectionId());
    }

    remote function onTextMessage(websocket:Caller caller, string message) returns error? {
        // Echo the message back
        check caller->writeTextMessage("Received: " + message);
    }

    remote function onClose(websocket:Caller caller, int statusCode, string reason) {
        log:printInfo("Client disconnected", reason = reason);
    }
}
```

## TCP Services

Handle raw TCP connections for custom protocol implementations.

```ballerina
import ballerina/tcp;

service on new tcp:Listener(3000) {

    remote function onConnect(tcp:Caller caller) returns tcp:ConnectionService {
        log:printInfo("New TCP connection");
        return new TcpHandler();
    }
}

service class TcpHandler {
    *tcp:ConnectionService;

    remote function onBytes(tcp:Caller caller, readonly & byte[] data) returns error? {
        string message = check string:fromBytes(data);
        log:printInfo("Received", data = message);
        // Process and respond
        check caller->writeBytes("ACK".toBytes());
    }

    remote function onClose() {
        log:printInfo("Connection closed");
    }
}
```

## WebSub Services

Implement webhook-style publish/subscribe with the WebSub protocol. WebSub provides a standardized mechanism for content distribution using HTTP webhooks with subscription verification.

### WebSub Subscriber

Subscribe to events from a WebSub hub:

```ballerina
import ballerina/websub;
import ballerina/http;

@websub:SubscriberServiceConfig {
    target: ["https://hub.example.com", "https://topic.example.com/events"],
    leaseSeconds: 86400,
    secret: "my-subscriber-secret"
}
service /webhooks on new websub:Listener(9095) {

    remote function onSubscriptionValidationDenied(
        websub:SubscriptionDeniedError msg
    ) returns error? {
        log:printError("Subscription denied", reason = msg.message());
    }

    remote function onSubscriptionVerification(
        websub:SubscriptionVerification msg
    ) returns websub:SubscriptionVerificationSuccess|error? {
        log:printInfo("Subscription verified", hub = msg.hub, topic = msg.hubTopic);
        return websub:SUBSCRIPTION_VERIFICATION_SUCCESS;
    }

    remote function onEventNotification(websub:ContentDistributionMessage event)
            returns error? {
        json payload = check event.content.ensureType();
        log:printInfo("Event received", payload = payload.toString());
        // Process the event
    }
}
```

### WebSub Hub

Create your own WebSub hub to distribute events to subscribers:

```ballerina
import ballerina/websubhub;
import ballerina/http;

service /hub on new websubhub:Listener(9191) {

    remote function onRegisterTopic(websubhub:TopicRegistration msg)
            returns websubhub:TopicRegistrationSuccess|websubhub:TopicRegistrationError {
        log:printInfo("Topic registered", topic = msg.topic);
        return websubhub:TOPIC_REGISTRATION_SUCCESS;
    }

    remote function onSubscription(websubhub:Subscription msg)
            returns websubhub:SubscriptionAccepted|websubhub:SubscriptionError {
        log:printInfo("New subscriber", callback = msg.hubCallback, topic = msg.hubTopic);
        return websubhub:SUBSCRIPTION_ACCEPTED;
    }

    remote function onUnsubscription(websubhub:Unsubscription msg)
            returns websubhub:UnsubscriptionAccepted|websubhub:UnsubscriptionError {
        return websubhub:UNSUBSCRIPTION_ACCEPTED;
    }
}
```

## Service Configuration Options

All services support common configuration through annotations:

| Configuration | Description |
|---|---|
| `port` | Listener port number |
| `host` | Bind address (default: `0.0.0.0`) |
| `secureSocket` | TLS/SSL configuration |
| `timeout` | Request/connection timeout |
| `maxHeaderSize` | Maximum HTTP header size |
| `maxPayloadSize` | Maximum request body size |

```ballerina
listener http:Listener secureEp = new (8443, secureSocket = {
    key: {
        certFile: "/path/to/cert.pem",
        keyFile: "/path/to/key.pem"
    }
});
```

## What's Next

- [Event Handlers](event-handlers.md) -- React to messages from brokers and external systems
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle failures in your services
- [Connections](/docs/develop/design-logic/connections) -- Configure external connections
