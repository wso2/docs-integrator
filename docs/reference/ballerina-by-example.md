---
title: Ballerina by Example
---

# Ballerina by Example

Ballerina by Example (BBE) is a collection of over 200 runnable code examples that demonstrate Ballerina language features and library capabilities. Each example includes source code, expected output, and can be executed directly. All examples are hosted on [ballerina.io/learn/by-example](https://ballerina.io/learn/by-example/).

## Language concepts

### Basics

| Example | Description |
|---------|-------------|
| **[Hello World](https://ballerina.io/learn/by-example/hello-world/)** | Minimal Ballerina program |
| **[Programs and Modules](https://ballerina.io/learn/by-example/programs/)** | Module structure and imports |
| **[Variables and Types](https://ballerina.io/learn/by-example/variables/)** | Variable declarations and basic types |
| **[Functions](https://ballerina.io/learn/by-example/functions/)** | Function definitions and calls |
| **[Expressions](https://ballerina.io/learn/by-example/expressions/)** | Ballerina expressions |
| **[Strings](https://ballerina.io/learn/by-example/strings/)** | String operations and templates |
| **[If/Else](https://ballerina.io/learn/by-example/if-else/)** | Conditional statements |
| **[While Loop](https://ballerina.io/learn/by-example/while/)** | While loop iteration |
| **[Foreach](https://ballerina.io/learn/by-example/foreach/)** | Foreach loop iteration |
| **[Match Statement](https://ballerina.io/learn/by-example/match-statement/)** | Pattern matching |

### Type system

| Example | Description |
|---------|-------------|
| **[Integers](https://ballerina.io/learn/by-example/integers/)** | Integer type and operations |
| **[Floating Point](https://ballerina.io/learn/by-example/floating-point-numbers/)** | Float and decimal types |
| **[Nil Type](https://ballerina.io/learn/by-example/nil/)** | Working with nil values |
| **[Any Type](https://ballerina.io/learn/by-example/any-type/)** | The `any` and `anydata` types |
| **[Union Types](https://ballerina.io/learn/by-example/union-types/)** | Union type definitions |
| **[Type Definitions](https://ballerina.io/learn/by-example/type-definitions/)** | Custom type definitions |
| **[Type Inference](https://ballerina.io/learn/by-example/type-inference/)** | Let type inference |
| **[Covariance](https://ballerina.io/learn/by-example/covariance/)** | Type covariance |

### Records and maps

| Example | Description |
|---------|-------------|
| **[Records](https://ballerina.io/learn/by-example/records/)** | Record type definitions |
| **[Open Records](https://ballerina.io/learn/by-example/open-records/)** | Open vs closed records |
| **[Default Values](https://ballerina.io/learn/by-example/default-values-for-record-fields/)** | Record field defaults |
| **[Optional Fields](https://ballerina.io/learn/by-example/optional-fields/)** | Optional record fields |
| **[Maps](https://ballerina.io/learn/by-example/maps/)** | Map type and operations |
| **[Record to JSON](https://ballerina.io/learn/by-example/converting-to-user-defined-type/)** | Converting records to JSON |

### Arrays and tuples

| Example | Description |
|---------|-------------|
| **[Arrays](https://ballerina.io/learn/by-example/arrays/)** | Array type and operations |
| **[Tuples](https://ballerina.io/learn/by-example/tuples/)** | Tuple types |
| **[List Sub Typing](https://ballerina.io/learn/by-example/list-sub-typing/)** | List type relationships |
| **[Table](https://ballerina.io/learn/by-example/table/)** | Table type and operations |

### Error handling

| Example | Description |
|---------|-------------|
| **[Error Type](https://ballerina.io/learn/by-example/error-type/)** | Error value creation |
| **[Check Expression](https://ballerina.io/learn/by-example/check-expression/)** | Error propagation with check |
| **[Error Subtyping](https://ballerina.io/learn/by-example/error-subtyping/)** | Custom error types |
| **[Trap Expression](https://ballerina.io/learn/by-example/trap-expression/)** | Catching panics |
| **[On Fail Clause](https://ballerina.io/learn/by-example/on-fail-clause/)** | Handling errors in blocks |
| **[Error Detail](https://ballerina.io/learn/by-example/error-detail/)** | Error detail records |
| **[Retry](https://ballerina.io/learn/by-example/retry-transaction-statement/)** | Retry operations |

### Concurrency

| Example | Description |
|---------|-------------|
| **[Workers](https://ballerina.io/learn/by-example/named-workers/)** | Named workers |
| **[Worker Message Passing](https://ballerina.io/learn/by-example/named-worker-message-passing/)** | Inter-worker communication |
| **[Wait Expression](https://ballerina.io/learn/by-example/named-workers-and-futures/)** | Waiting for workers |
| **[Alternate Wait](https://ballerina.io/learn/by-example/alternate-wait/)** | Wait for first result |
| **[Multiple Wait](https://ballerina.io/learn/by-example/multiple-wait/)** | Wait for all results |
| **[Strand](https://ballerina.io/learn/by-example/strands/)** | Strand scheduling |
| **[Lock](https://ballerina.io/learn/by-example/lock-statement/)** | Mutual exclusion |
| **[Isolated Functions](https://ballerina.io/learn/by-example/isolated-functions/)** | Compile-time concurrency safety |

### Transactions

| Example | Description |
|---------|-------------|
| **[Transactions](https://ballerina.io/learn/by-example/transaction-statement/)** | Basic transaction blocks |
| **[Check in Transactions](https://ballerina.io/learn/by-example/check-semantics/)** | Error handling in transactions |
| **[Rollback](https://ballerina.io/learn/by-example/rollback/)** | Transaction rollback |
| **[Retry Transactions](https://ballerina.io/learn/by-example/retry-transaction-statement/)** | Automatic retry |
| **[Transactional Functions](https://ballerina.io/learn/by-example/transactional-qualifier/)** | Participating functions |

### Query expressions

| Example | Description |
|---------|-------------|
| **[Query Expressions](https://ballerina.io/learn/by-example/query-expressions/)** | Basic query syntax |
| **[Sort](https://ballerina.io/learn/by-example/ordering/)** | Sort with order by |
| **[Limit](https://ballerina.io/learn/by-example/limiting/)** | Limit results |
| **[Join](https://ballerina.io/learn/by-example/join-clause/)** | Table joins |
| **[Aggregation](https://ballerina.io/learn/by-example/aggregation/)** | Let clause and aggregation |

## AI integrations

| Example | Description |
|---------|-------------|
| **[Direct LLM Calls](https://ballerina.io/learn/by-example/direct-llm-calls/)** | Single-shot calls to a large language model |
| **[Direct LLM Calls with History](https://ballerina.io/learn/by-example/direct-llm-calls-with-history/)** | Conversational LLM calls with chat history |
| **[Direct LLM Calls with Multimodal Input](https://ballerina.io/learn/by-example/direct-llm-calls-with-multimodal-input/)** | Pass images and other media to an LLM |
| **[RAG with In-Memory Vector Store](https://ballerina.io/learn/by-example/rag-with-in-memory-vector-store/)** | Retrieval-augmented generation using an in-memory store |
| **[RAG Ingestion (External Store)](https://ballerina.io/learn/by-example/rag-ingestion-with-external-vector-store/)** | Index documents into an external vector store |
| **[RAG Query (External Store)](https://ballerina.io/learn/by-example/rag-query-with-external-vector-store/)** | Query an external vector store for grounded answers |
| **[MCP Service](https://ballerina.io/learn/by-example/mcp-service/)** | Expose tools through a Model Context Protocol server |
| **[MCP Advanced Service](https://ballerina.io/learn/by-example/mcp-service-advanced/)** | Advanced MCP server features |
| **[AI Agent with Local Tools](https://ballerina.io/learn/by-example/ai-agent-local-tools/)** | Agent that calls local Ballerina functions as tools |
| **[AI Agent with MCP Integration](https://ballerina.io/learn/by-example/ai-agent-mcp-integration/)** | Agent backed by tools served from an MCP server |
| **[AI Agent with External Endpoints](https://ballerina.io/learn/by-example/ai-agent-external-endpoint-integration/)** | Agent that calls external HTTP APIs as tools |
| **[Chat Agents](https://ballerina.io/learn/by-example/chat-agents/)** | Multi-turn conversational AI agent |
| **[AI Agent with Tool Kits](https://ballerina.io/learn/by-example/ai-agent-tool-kit/)** | Agent organized around grouped tool kits |
| **[Natural Expressions](https://ballerina.io/learn/by-example/natural-expressions/)** | Use the `natural` expression to call LLMs inline |

## Network libraries

### HTTP

| Example | Description |
|---------|-------------|
| **[HTTP Service](https://ballerina.io/learn/by-example/http-service-and-resource/)** | Basic HTTP service |
| **[HTTP Client](https://ballerina.io/learn/by-example/http-client-send-request-receive-response/)** | Basic HTTP client |
| **[Query Parameters](https://ballerina.io/learn/by-example/http-query-parameter/)** | Service query parameters |
| **[Path Parameters](https://ballerina.io/learn/by-example/http-path-parameter/)** | Service path parameters |
| **[Request/Response](https://ballerina.io/learn/by-example/http-send-response/)** | Full request/response handling |
| **[Headers](https://ballerina.io/learn/by-example/http-headers/)** | HTTP header handling |
| **[Data Binding](https://ballerina.io/learn/by-example/http-data-binding/)** | Payload data binding |
| **[Error Handling](https://ballerina.io/learn/by-example/http-service-error-handling/)** | HTTP error handling |
| **[Interceptors](https://ballerina.io/learn/by-example/http-interceptors/)** | HTTP interceptors |
| **[CORS](https://ballerina.io/learn/by-example/http-cors/)** | Cross-origin resource sharing |
| **[Circuit Breaker](https://ballerina.io/learn/by-example/http-circuit-breaker/)** | Circuit breaker pattern |
| **[Load Balancer](https://ballerina.io/learn/by-example/http-load-balancer/)** | Client-side load balancing |
| **[Retry](https://ballerina.io/learn/by-example/http-retry/)** | HTTP retry |
| **[Caching](https://ballerina.io/learn/by-example/http-caching/)** | HTTP response caching |
| **[SSL/TLS](https://ballerina.io/learn/by-example/http-service-ssl-tls/)** | HTTPS support |
| **[Mutual SSL](https://ballerina.io/learn/by-example/http-service-mutual-ssl/)** | Mutual TLS authentication |
| **[Basic Auth](https://ballerina.io/learn/by-example/http-service-basic-auth/)** | Basic authentication |
| **[JWT Auth](https://ballerina.io/learn/by-example/http-service-jwt-auth/)** | JWT authentication |
| **[OAuth2](https://ballerina.io/learn/by-example/http-service-oauth2/)** | OAuth 2.0 authentication |

### gRPC

| Example | Description |
|---------|-------------|
| **[Unary RPC](https://ballerina.io/learn/by-example/grpc-unary/)** | Simple unary gRPC |
| **[Server Streaming](https://ballerina.io/learn/by-example/grpc-server-streaming/)** | Server-side streaming |
| **[Client Streaming](https://ballerina.io/learn/by-example/grpc-client-streaming/)** | Client-side streaming |
| **[Bidirectional Streaming](https://ballerina.io/learn/by-example/grpc-bidirectional-streaming/)** | Bidirectional streaming |

### GraphQL

| Example | Description |
|---------|-------------|
| **[GraphQL Service](https://ballerina.io/learn/by-example/graphql-hello-world/)** | Basic GraphQL service |
| **[Mutations](https://ballerina.io/learn/by-example/graphql-mutations/)** | GraphQL mutations |
| **[Input Types](https://ballerina.io/learn/by-example/graphql-input-types/)** | GraphQL input types |
| **[Subscriptions](https://ballerina.io/learn/by-example/graphql-subscriptions/)** | GraphQL subscriptions |
| **[GraphQL Client Query](https://ballerina.io/learn/by-example/graphql-client-query-endpoint/)** | Query a GraphQL endpoint from a client |
| **[Client Partial Response](https://ballerina.io/learn/by-example/graphql-client-handle-partial-response/)** | Handle partial responses on the client |
| **[Client Error Handling](https://ballerina.io/learn/by-example/graphql-client-error-handling/)** | Handle error responses on the client |

### WebSocket

| Example | Description |
|---------|-------------|
| **[WebSocket Service](https://ballerina.io/learn/by-example/websocket-service/)** | Basic WebSocket server |
| **[WebSocket Client](https://ballerina.io/learn/by-example/websocket-client/)** | WebSocket client |
| **[Service Send/Receive](https://ballerina.io/learn/by-example/websocket-basic-sample/)** | Send and receive messages on a WebSocket service |
| **[Service Payload Validation](https://ballerina.io/learn/by-example/websocket-service-payload-constraint-validation/)** | Validate incoming payloads with constraints |
| **[Service Error Handling](https://ballerina.io/learn/by-example/websocket-service-error-handling/)** | Handle errors on a WebSocket service |
| **[Client Payload Validation](https://ballerina.io/learn/by-example/websocket-client-payload-constraint-validation/)** | Validate payloads from a WebSocket client |

### MQTT

| Example | Description |
|---------|-------------|
| **[MQTT Service](https://ballerina.io/learn/by-example/mqtt-service-subscribe-message/)** | Subscribe to messages from an MQTT broker |
| **[MQTT Client](https://ballerina.io/learn/by-example/mqtt-client-publish-message/)** | Publish messages to an MQTT broker |

### TCP and UDP

| Example | Description |
|---------|-------------|
| **[TCP Service](https://ballerina.io/learn/by-example/tcp-listener/)** | Send and receive bytes on a TCP listener |
| **[TCP Client](https://ballerina.io/learn/by-example/tcp-client/)** | Send and receive bytes from a TCP client |
| **[UDP Service](https://ballerina.io/learn/by-example/udp-listener/)** | Send and receive datagrams on a UDP listener |
| **[UDP Client](https://ballerina.io/learn/by-example/udp-client/)** | Send and receive datagrams from a UDP client |
| **[UDP Connected Client](https://ballerina.io/learn/by-example/udp-connect-client/)** | Send and receive datagrams over a connected UDP client |

### Messaging

| Example | Description |
|---------|-------------|
| **[Kafka Producer](https://ballerina.io/learn/by-example/kafka-producer-produce-message/)** | Kafka message producer |
| **[Kafka Consumer](https://ballerina.io/learn/by-example/kafka-consumer-payload-data-binding/)** | Kafka message consumer |
| **[Kafka Service: Consume](https://ballerina.io/learn/by-example/kafka-service-consume-message/)** | Consume messages with a Kafka service |
| **[Kafka Service: Constraints](https://ballerina.io/learn/by-example/kafka-service-constraint-validation/)** | Validate Kafka message payloads |
| **[Kafka Service: Errors](https://ballerina.io/learn/by-example/kafka-service-error-handling/)** | Handle errors in a Kafka service |
| **[RabbitMQ Producer](https://ballerina.io/learn/by-example/rabbitmq-producer/)** | RabbitMQ publisher |
| **[RabbitMQ Consumer](https://ballerina.io/learn/by-example/rabbitmq-consumer/)** | RabbitMQ consumer |
| **[RabbitMQ Acknowledged Consumer](https://ballerina.io/learn/by-example/rabbitmq-consumer-with-client-acknowledgement/)** | Consumer with client acknowledgement |
| **[RabbitMQ Transactional Consumer](https://ballerina.io/learn/by-example/rabbitmq-transaction-consumer/)** | Consumer in a transactional context |
| **[RabbitMQ Queue Declare](https://ballerina.io/learn/by-example/rabbitmq-queue-declare/)** | Declare a queue from a client |
| **[NATS Subscribe](https://ballerina.io/learn/by-example/nats-basic-sub/)** | Consume messages from a NATS subject |
| **[NATS Publish](https://ballerina.io/learn/by-example/nats-basic-pub/)** | Publish messages to a NATS subject |
| **[NATS Request/Reply](https://ballerina.io/learn/by-example/nats-basic-request/)** | Send a request and receive a reply |
| **[NATS Service Reply](https://ballerina.io/learn/by-example/nats-basic-reply/)** | Reply from a NATS service |
| **[NATS JetStream](https://ballerina.io/learn/by-example/nats-jetstream-pub/)** | Publish through JetStream |

### Database

| Example | Description |
|---------|-------------|
| **[MySQL Client](https://ballerina.io/learn/by-example/mysql-query-operation/)** | MySQL database operations |
| **[PostgreSQL Client](https://ballerina.io/learn/by-example/postgresql-query-operation/)** | PostgreSQL database operations |
| **[SQL Parameterized Query](https://ballerina.io/learn/by-example/sql-parameterized-query/)** | Safe parameterized queries |
| **[Batch Execute](https://ballerina.io/learn/by-example/sql-batch-execute/)** | Batch SQL operations |
| **[Call Procedure](https://ballerina.io/learn/by-example/sql-call-procedure/)** | Call stored procedures |

## Common libraries

### File and I/O

| Example | Description |
|---------|-------------|
| **[Read/Write Files](https://ballerina.io/learn/by-example/io-strings/)** | File I/O operations |
| **[Read/Write CSV](https://ballerina.io/learn/by-example/io-csv/)** | CSV file processing |
| **[Read/Write JSON](https://ballerina.io/learn/by-example/io-json/)** | JSON file processing |
| **[Read/Write XML](https://ballerina.io/learn/by-example/io-xml/)** | XML file processing |
| **[FTP Client](https://ballerina.io/learn/by-example/ftp-client/)** | FTP file operations |
| **[FTP Listener](https://ballerina.io/learn/by-example/ftp-service/)** | FTP file event listener |

### Security

| Example | Description |
|---------|-------------|
| **[Crypto](https://ballerina.io/learn/by-example/crypto/)** | Cryptographic operations |
| **[JWT Issue/Validate](https://ballerina.io/learn/by-example/jwt-issue-validate/)** | JWT token operations |
| **[URL Encoding](https://ballerina.io/learn/by-example/url-encode-decode/)** | URL encoding/decoding |

### Testing

| Example | Description |
|---------|-------------|
| **[Test Assertions](https://ballerina.io/learn/by-example/testerina-assertions/)** | Test assertion functions |
| **[Before/After Functions](https://ballerina.io/learn/by-example/testerina-before-and-after-each/)** | Test lifecycle hooks |
| **[Data-Driven Tests](https://ballerina.io/learn/by-example/testerina-data-driven-tests/)** | Parameterized tests |
| **[Mocking](https://ballerina.io/learn/by-example/testerina-mocking-functions/)** | Mock functions and clients |
| **[Service Testing](https://ballerina.io/learn/by-example/http-service-tests/)** | Test HTTP services |

## Observability

| Example | Description |
|---------|-------------|
| **[Logging](https://ballerina.io/learn/by-example/logging/)** | Structured logging |
| **[Counter Metrics](https://ballerina.io/learn/by-example/counter-metrics/)** | Prometheus counters |
| **[Gauge Metrics](https://ballerina.io/learn/by-example/gauge-metrics/)** | Prometheus gauges |
| **[Tracing](https://ballerina.io/learn/by-example/tracing/)** | Distributed tracing |

## Running examples locally

Each example can be run locally with:

```bash
# Clone the examples repository
git clone https://github.com/ballerina-platform/ballerina-distribution.git

# Navigate to an example
cd ballerina-distribution/examples/hello-world

# Run the example
bal run
```

Alternatively, use the "Run" button on each example page at [ballerina.io/learn/by-example](https://ballerina.io/learn/by-example/).

## See also

- [Ballerina Syntax Quick Reference](language/ballerina-syntax-quick-reference.md) — Language cheat sheet
- [Ballerina API Documentation](api/ballerina-documentation.md) — Full API docs
- [Ballerina Specifications](ballerina-specifications.md) — Language and platform specifications
