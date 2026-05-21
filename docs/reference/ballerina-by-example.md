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
| **[Programs and Modules](https://ballerina.io/learn/by-example/programs-and-modules/)** | Module structure and imports |
| **[Variables and Types](https://ballerina.io/learn/by-example/variables-and-types/)** | Variable declarations and basic types |
| **[Functions](https://ballerina.io/learn/by-example/functions/)** | Function definitions and calls |
| **[Strings](https://ballerina.io/learn/by-example/strings/)** | String operations and templates |
| **[If/Else](https://ballerina.io/learn/by-example/if-statement/)** | Conditional statements |
| **[While Loop](https://ballerina.io/learn/by-example/while-statement/)** | While loop iteration |
| **[Foreach](https://ballerina.io/learn/by-example/foreach-statement/)** | Foreach loop iteration |
| **[Match Statement](https://ballerina.io/learn/by-example/match-statement/)** | Pattern matching |

### Type system

| Example | Description |
|---------|-------------|
| **[Integers](https://ballerina.io/learn/by-example/integers/)** | Integer type and operations |
| **[Floating Point](https://ballerina.io/learn/by-example/floating-point-numbers/)** | Float and decimal types |
| **[Nil Type](https://ballerina.io/learn/by-example/nil/)** | Working with nil values |
| **[Any Type](https://ballerina.io/learn/by-example/any-type/)** | The `any` and `anydata` types |
| **[Union Types](https://ballerina.io/learn/by-example/unions/)** | Union type definitions |
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
| **[Record to JSON](https://ballerina.io/learn/by-example/converting-from-user-defined-type-to-json/)** | Converting records to JSON |

### Arrays and tuples

| Example | Description |
|---------|-------------|
| **[Arrays](https://ballerina.io/learn/by-example/arrays/)** | Array type and operations |
| **[Tuples](https://ballerina.io/learn/by-example/tuples/)** | Tuple types |
| **[List Sub Typing](https://ballerina.io/learn/by-example/list-subtyping/)** | List type relationships |
| **[Table](https://ballerina.io/learn/by-example/table/)** | Table type and operations |

### Error handling

| Example | Description |
|---------|-------------|
| **[Error Type](https://ballerina.io/learn/by-example/error-handling/)** | Error value creation |
| **[Check Expression](https://ballerina.io/learn/by-example/check-expression/)** | Error propagation with check |
| **[Error Subtyping](https://ballerina.io/learn/by-example/error-subtyping/)** | Custom error types |
| **[Trap Expression](https://ballerina.io/learn/by-example/trap-expression/)** | Catching panics |
| **[On Fail Clause](https://ballerina.io/learn/by-example/named-worker-with-on-fail-clause/)** | Handling errors in blocks |
| **[Error Detail](https://ballerina.io/learn/by-example/error-detail/)** | Error detail records |
| **[Retry](https://ballerina.io/learn/by-example/retry-transaction-statement/)** | Retry operations |

### Concurrency

| Example | Description |
|---------|-------------|
| **[Workers](https://ballerina.io/learn/by-example/named-workers/)** | Named workers |
| **[Worker Message Passing](https://ballerina.io/learn/by-example/inter-worker-message-passing/)** | Inter-worker communication |
| **[Wait Expression](https://ballerina.io/learn/by-example/waiting-for-workers/)** | Waiting for workers |
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
| **[Sort](https://ballerina.io/learn/by-example/sort-iterable-objects/)** | Sort with order by |
| **[Limit](https://ballerina.io/learn/by-example/limit-clause/)** | Limit results |
| **[Join](https://ballerina.io/learn/by-example/joining-iterable-objects/)** | Table joins |
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
| **[HTTP Service](https://ballerina.io/learn/by-example/http-basic-rest-service/)** | Basic HTTP service |
| **[HTTP Client](https://ballerina.io/learn/by-example/http-client-send-request-receive-response/)** | Basic HTTP client |
| **[Query Parameters](https://ballerina.io/learn/by-example/http-client-query-parameter/)** | Service query parameters |
| **[Path Parameters](https://ballerina.io/learn/by-example/http-path-param/)** | Service path parameters |
| **[Request/Response](https://ballerina.io/learn/by-example/http-request-response/)** | Full request/response handling |
| **[Headers](https://ballerina.io/learn/by-example/http-client-header-parameter/)** | HTTP header handling |
| **[Data Binding](https://ballerina.io/learn/by-example/http-service-data-binding/)** | Payload data binding |
| **[Error Handling](https://ballerina.io/learn/by-example/http-default-error-handling/)** | HTTP error handling |
| **[Interceptors](https://ballerina.io/learn/by-example/http-request-interceptor/)** | HTTP interceptors |
| **[CORS](https://ballerina.io/learn/by-example/http-cors/)** | Cross-origin resource sharing |
| **[Circuit Breaker](https://ballerina.io/learn/by-example/http-circuit-breaker/)** | Circuit breaker pattern |
| **[Load Balancer](https://ballerina.io/learn/by-example/http-load-balancer/)** | Client-side load balancing |
| **[Retry](https://ballerina.io/learn/by-example/http-retry/)** | HTTP retry |
| **[Caching](https://ballerina.io/learn/by-example/http-service-cache-response/)** | HTTP response caching |
| **[SSL/TLS](https://ballerina.io/learn/by-example/http-service-ssl-tls/)** | HTTPS support |
| **[Mutual SSL](https://ballerina.io/learn/by-example/http-service-mutual-ssl/)** | Mutual TLS authentication |
| **[Basic Auth](https://ballerina.io/learn/by-example/http-service-basic-authentication-file-user-store/)** | Basic authentication |
| **[JWT Auth](https://ballerina.io/learn/by-example/http-service-jwt-authentication/)** | JWT authentication |
| **[OAuth2](https://ballerina.io/learn/by-example/http-service-oauth2/)** | OAuth 2.0 authentication |

### gRPC

| Example | Description |
|---------|-------------|
| **[Unary RPC](https://ballerina.io/learn/by-example/grpc-client-simple/)** | Simple unary gRPC |
| **[Server Streaming](https://ballerina.io/learn/by-example/grpc-client-server-streaming/)** | Server-side streaming |
| **[Client Streaming](https://ballerina.io/learn/by-example/grpc-client-client-streaming/)** | Client-side streaming |
| **[Bidirectional Streaming](https://ballerina.io/learn/by-example/grpc-client-bidirectional-streaming/)** | Bidirectional streaming |

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
| **[WebSocket Service](https://ballerina.io/learn/by-example/websocket-basic-sample/)** | Basic WebSocket server |
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
| **[SQL Query](https://ballerina.io/learn/by-example/mysql-query-column-mapping/)** | Query |
| **[Batch Execute](https://ballerina.io/learn/by-example/mysql-batch-execute-operation/)** | Batch SQL operations |
| **[Call Procedure](https://ballerina.io/learn/by-example/mysql-call-stored-procedures/)** | Call stored procedures |

## Common libraries

### File and I/O

| Example | Description |
|---------|-------------|
| **[Read/Write Files](https://ballerina.io/learn/by-example/io-strings/)** | File I/O operations |
| **[Read/Write CSV](https://ballerina.io/learn/by-example/io-csv/)** | CSV file processing |
| **[Read/Write JSON](https://ballerina.io/learn/by-example/io-json/)** | JSON file processing |
| **[Read/Write XML](https://ballerina.io/learn/by-example/io-xml/)** | XML file processing |
| **[FTP Client](https://ballerina.io/learn/by-example/ftp-client-receive-file/)** | FTP file operations |
| **[FTP Listener](https://ballerina.io/learn/by-example/ftp-service-receive-file/)** | FTP file event listener |

### Security

| Example | Description |
|---------|-------------|
| **[Crypto](https://ballerina.io/learn/by-example/security-crypto/)** | Cryptographic operations |
| **[JWT Issue/Validate](https://ballerina.io/learn/by-example/security-jwt-issue-validate/)** | JWT token operations |
| **[Encoding](https://ballerina.io/learn/by-example/url-encode-decode/)** | URL encoding/decoding |

### Testing

| Example | Description |
|---------|-------------|
| **[Test Assertions](https://ballerina.io/learn/by-example/testerina-assertions/)** | Test assertion functions |
| **[Before/After Functions](https://ballerina.io/learn/by-example/testerina-before-and-after-each/)** | Test lifecycle hooks |
| **[Data-Driven Tests](https://ballerina.io/learn/by-example/testerina-data-driven-tests/)** | Parameterized tests |
| **[Mocking](https://ballerina.io/learn/by-example/testerina-mocking-functions/)** | Mock functions and clients |

## Observability

| Example | Description |
|---------|-------------|
| **[Logging](https://ballerina.io/learn/by-example/logging/)** | Structured logging |
| **[Counter Metrics](https://ballerina.io/learn/by-example/counter-metrics/)** | Prometheus counters |
| **[Gauge Metrics](https://ballerina.io/learn/by-example/gauge-metrics/)** | Prometheus gauges |
| **[Tracing](https://ballerina.io/learn/by-example/tracing/)** | Distributed tracing |
