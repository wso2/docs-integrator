# Triggers

The `ballerina/graphql` module provides a full GraphQL server framework. You define a Ballerina service with resource and remote functions, and the module automatically generates the GraphQL schema and serves it over HTTP. Subscriptions are served over WebSocket.

Three components work together:

| Component | Role |
|-----------|------|
| `graphql:Listener` | An HTTP/WebSocket listener that serves the GraphQL API and routes incoming operations to the appropriate service functions. |
| `graphql:Service` | A Ballerina service that defines GraphQL resolvers: resource functions for queries, remote functions for mutations, and subscribe resource functions for subscriptions. |
| `graphql:Context` | A per-request context object for passing data between interceptors and resolvers, and for managing DataLoaders and cache. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `graphql:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configures the underlying HTTP listener. Inherits all fields from `http:ListenerConfiguration`. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | <code>string</code> | `"0.0.0.0"` | The network interface to bind to. |
| `secureSocket` | <code>ListenerSecureSocket?</code> | `()` | SSL/TLS configuration for HTTPS. |
| `httpVersion` | <code>HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `60` | Request idle timeout in seconds. |
| `server` | <code>string?</code> | `()` | Server header value. |
| `requestLimits` | <code>RequestLimitConfigs</code> | `{}` | Request size limit configuration. |

### Initializing the listener

**Initialize with a port number:**

```ballerina
import ballerina/graphql;

listener graphql:Listener graphqlListener = new (9000);
```

**Initialize with HTTPS configuration:**

```ballerina
import ballerina/graphql;

listener graphql:Listener graphqlListener = new (9000, secureSocket = {
    key: {
        certFile: "./cert.pem",
        keyFile: "./key.pem"
    }
});
```

**Inline listener in service declaration:**

```ballerina
import ballerina/graphql;

service /graphql on new graphql:Listener(9000) {
    resource function get greeting() returns string {
        return "Hello, World!";
    }
}
```

---

## Service

A GraphQL service is a standard Ballerina service attached to a `graphql:Listener`. The module maps your Ballerina functions directly to GraphQL schema fields: `resource function get` for Query fields, `remote function` for Mutation fields, and `resource function subscribe` for Subscription fields.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `Query resolver` | <code>resource function get fieldName(args...) returns ReturnType</code> | Defines a Query field. The function name becomes the field name, parameters become field arguments, and the return type maps to the GraphQL output type. |
| `Mutation resolver` | <code>remote function mutationName(args...) returns ReturnType</code> | Defines a Mutation field. Remote functions are exposed as mutation operations in the schema. |
| `Subscription resolver` | <code>resource function subscribe fieldName(args...) returns stream&lt;ReturnType, error?&gt;</code> | Defines a Subscription field. Must return a `stream`: each value emitted by the stream is pushed to the subscribed client over WebSocket. |

You do not need to write a GraphQL schema file. The module generates the schema automatically from your service definition, including all types, fields, arguments, and documentation.

### Full usage example

```ballerina
import ballerina/graphql;
import ballerina/log;

// In-memory data store
type News record {|
    string title;
    string content;
    string author;
|};

News[] newsTable = [];

@graphql:ServiceConfig {
    graphiql: {
        enabled: true
    }
}
service /graphql on new graphql:Listener(9000) {
    // Query: fetch all news articles
    resource function get news() returns News[] {
        return newsTable;
    }

    // Mutation: publish a new article
    remote function publish(string title, string content, string author) returns News {
        News news = {title, content, author};
        newsTable.push(news);
        log:printInfo("Published article", title = title);
        return news;
    }

    // Subscription: receive real-time news updates
    resource function subscribe news() returns stream<News, error?> {
        return newsTable.toStream();
    }
}
```

Use the `@graphql:ServiceConfig` annotation to configure features like GraphiQL (`graphiql: {enabled: true}`), authentication (`auth`), CORS (`cors`), interceptors (`interceptors`), caching (`cacheConfig`), query complexity limits (`queryComplexityConfig`), and introspection control (`introspection`).

---

## Supporting types

### `GraphqlServiceConfig`

| Field | Type | Description |
|-------|------|-------------|
| `maxQueryDepth` | <code>int?</code> | Maximum allowed query depth. Queries exceeding this depth are rejected. |
| `auth` | <code>ListenerAuthConfig[]?</code> | Authentication configuration. Supports file user store, LDAP, JWT, and OAuth2 introspection. |
| `contextInit` | <code>ContextInit</code> | A function that initializes the `graphql:Context` for each request. Receives the HTTP request context and request object. |
| `cors` | <code>CorsConfig?</code> | CORS configuration for the GraphQL endpoint. |
| `graphiql` | <code>Graphiql</code> | GraphiQL interactive IDE configuration. Set `enabled: true` to serve the GraphiQL interface. |
| `interceptors` | <code>(readonly &amp; Interceptor)&#124;(readonly &amp; Interceptor)[]</code> | Global interceptors applied to all resolver executions. |
| `introspection` | <code>boolean</code> | Enable or disable schema introspection. Defaults to `true`. |
| `validation` | <code>boolean</code> | Enable or disable server-side query validation. Defaults to `true`. |
| `cacheConfig` | <code>ServerCacheConfig?</code> | Server-side response caching configuration with `maxAge` and `maxSize` settings. |
| `queryComplexityConfig` | <code>QueryComplexityConfig?</code> | Query complexity analysis with `maxComplexity`, `defaultFieldComplexity`, and `warnOnly` settings. |

### `Context`

| Field | Type | Description |
|-------|------|-------------|
| `set(key, value)` | <code>method</code> | Stores a value in the context, accessible by resolvers and interceptors downstream. |
| `get(key)` | <code>method</code> | Retrieves a previously stored value from the context by key. |
| `remove(key)` | <code>method</code> | Removes a value from the context by key. |
| `registerDataLoader(key, dataLoader)` | <code>method</code> | Registers a DataLoader instance for batch loading and caching. |
| `getDataLoader(key)` | <code>method</code> | Retrieves a registered DataLoader by key. |
| `invalidate(path)` | <code>method</code> | Invalidates the server-side cache for a specific field path. |
| `invalidateAll()` | <code>method</code> | Clears all entries from the server-side cache. |

### `Upload`

| Field | Type | Description |
|-------|------|-------------|
| `fileName` | <code>string</code> | The name of the uploaded file. |
| `mimeType` | <code>string</code> | The MIME type of the uploaded file. |
| `encoding` | <code>string</code> | The encoding of the uploaded file. |
| `byteStream` | <code>stream&lt;byte[], io:Error?&gt;</code> | A byte stream for reading the file content. |
