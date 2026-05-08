---
title: Triggers
---

# Triggers

The `ballerinax/salesforce` connector supports event-driven integration through Salesforce Change Data Capture (CDC) and Platform Events. When records are created, updated, deleted, or restored in Salesforce, the listener receives change events in real time, triggering your service callbacks automatically — no polling required. Platform Events enable custom event-driven messaging between Salesforce and external systems.

Three components work together:

| Component | Role |
|-----------|------|
| `salesforce:Listener` | Connects to the Salesforce Streaming API and subscribes to change event or platform event channels. |
| `salesforce:CdcService` | Defines the `onCreate`, `onUpdate`, `onDelete`, and `onRestore` callbacks invoked per CDC event. |
| `salesforce:PlatformEventsService` | Defines the `onMessage` callback invoked when a platform event is received. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `salesforce:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `SoapBasedListenerConfig` | Authenticates using a username and password (with security token). Simpler setup for development. |
| `RestBasedListenerConfig` | Authenticates using OAuth 2.0. Recommended for production. Supports refresh token rotation via `TokenStore`. |

**`SoapBasedListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>CredentialsConfig</code> | Required | Salesforce username and password credentials. |
| `isSandBox` | <code>boolean</code> | <code>false</code> | Set to `true` if connecting to a sandbox environment. |
| `replayFrom` | <code>int&#124;ReplayOptions</code> | <code>REPLAY_FROM_TIP</code> | Replay option: `REPLAY_FROM_TIP`, `REPLAY_FROM_EARLIEST`, or a specific replay ID. |
| `connectionTimeout` | <code>decimal</code> | <code>30</code> | Connection timeout in seconds. |
| `readTimeout` | <code>decimal</code> | <code>30</code> | Read timeout in seconds. |
| `keepAliveInterval` | <code>decimal</code> | <code>120</code> | Keep-alive interval in seconds. |
| `apiVersion` | <code>string</code> | <code>"43.0"</code> | Salesforce Streaming API version. |
| `sessionTimeout` | <code>int</code> | <code>900</code> | Session timeout in seconds. |
| `proxyConfig` | <code>ProxyConfig</code> | <code>()</code> | HTTP proxy configuration. |

**`RestBasedListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `baseUrl` | <code>string</code> | Required | The Salesforce instance URL. |
| `auth` | <code>OAuth2Config</code> | Required | OAuth 2.0 configuration (refresh token, password grant, client credentials, or bearer token). |
| `tokenStore` | <code>TokenStore</code> | <code>InMemoryTokenStore</code> | Token store for managing refresh token rotation. |
| `replayFrom` | <code>int&#124;ReplayOptions</code> | <code>REPLAY_FROM_TIP</code> | Replay option: `REPLAY_FROM_TIP`, `REPLAY_FROM_EARLIEST`, or a specific replay ID. |
| `connectionTimeout` | <code>decimal</code> | <code>30</code> | Connection timeout in seconds. |
| `readTimeout` | <code>decimal</code> | <code>30</code> | Read timeout in seconds. |
| `keepAliveInterval` | <code>decimal</code> | <code>120</code> | Keep-alive interval in seconds. |
| `apiVersion` | <code>string</code> | <code>"43.0"</code> | Salesforce Streaming API version. |
| `sessionTimeout` | <code>int</code> | <code>900</code> | Session timeout in seconds. |
| `proxyConfig` | <code>ProxyConfig</code> | <code>()</code> | HTTP proxy configuration. |

**`ProxyConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scheme` | <code>ProxyScheme</code> | Required | Proxy scheme: `HTTP` or `HTTPS`. |
| `host` | <code>string</code> | Required | Proxy host address. |
| `port` | <code>int</code> | Required | Proxy port number. |
| `auth` | <code>ProxyAuthConfig?</code> | <code>()</code> | Optional proxy authentication (username and password). |

### Initializing the listener

**Using SOAP-based authentication (username + password):**

```ballerina
import ballerinax/salesforce;

configurable string username = ?;
configurable string password = ?;

listener salesforce:Listener sfListener = new ({
    auth: {
        username: username,
        password: password
    }
});
```

**Using REST-based authentication (OAuth 2.0):**

```ballerina
import ballerinax/salesforce;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

listener salesforce:Listener sfListener = new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});
```

**Using REST-based authentication with proxy:**

```ballerina
import ballerinax/salesforce;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

listener salesforce:Listener sfListener = new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    },
    proxyConfig: {
        scheme: salesforce:HTTP,
        host: "proxy.example.com",
        port: 8080
    }
});
```

### Listener Functions

The listener exposes the following public functions for managing connections and tokens:

| Function | Signature | Description |
|----------|-----------|-------------|
| `reconnect` | `reconnect() returns error?` | Reconnects the listener to the Salesforce Streaming API. |
| `updateRefreshToken` | `updateRefreshToken(string newRefreshToken) returns error?` | Updates the refresh token used by the listener (REST-based only). |
| `getRefreshToken` | `getRefreshToken() returns string&#124;error` | Returns the current refresh token (REST-based only). |

---

## Service

The `salesforce:Service` type is a union of `CdcService` and `PlatformEventsService`. Attach a service to the listener to handle either Change Data Capture events or Platform Events.

### CDC Service Callbacks

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onCreate` | `remote function onCreate(salesforce:EventData payload) returns error?` | Invoked when a record is created. |
| `onUpdate` | `remote function onUpdate(salesforce:EventData payload) returns error?` | Invoked when a record is updated. |
| `onDelete` | `remote function onDelete(salesforce:EventData payload) returns error?` | Invoked when a record is deleted. |
| `onRestore` | `remote function onRestore(salesforce:EventData payload) returns error?` | Invoked when a deleted record is restored (undeleted). |

You do not need to implement all four callbacks. Only implement the event types relevant to your use case.

### Platform Events Service Callback

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(salesforce:PlatformEventsMessage message) returns error?` | Invoked when a platform event is received. |

### Full CDC example

```ballerina
import ballerina/log;
import ballerinax/salesforce;

configurable string username = ?;
configurable string password = ?;

listener salesforce:Listener sfListener = new ({
    auth: {
        username: username,
        password: password
    }
});

// Subscribe to Account change events
// Channel format: /data/ChangeEvent
service salesforce:CdcService on sfListener {
    remote function onCreate(salesforce:EventData payload) returns error? {
        string? entityName = payload.metadata?.entityName;
        string? recordId = payload.metadata?.recordId;
        log:printInfo("Record created",
            entity = entityName,
            id = recordId,
            data = payload.changedData.toString()
        );
    }

    remote function onUpdate(salesforce:EventData payload) returns error? {
        string? recordId = payload.metadata?.recordId;
        log:printInfo("Record updated",
            id = recordId,
            changedFields = payload.changedData.keys()
        );
    }

    remote function onDelete(salesforce:EventData payload) returns error? {
        string? recordId = payload.metadata?.recordId;
        log:printInfo("Record deleted", id = recordId);
    }

    remote function onRestore(salesforce:EventData payload) returns error? {
        string? recordId = payload.metadata?.recordId;
        log:printInfo("Record restored (undeleted)", id = recordId);
    }
}
```

The service path corresponds to the Salesforce CDC channel. For object-specific channels, Salesforce uses the naming convention `/data/ChangeEvent` (e.g., `/data/AccountChangeEvent`). For all change events, use `/data/ChangeEvents`.

### Full Platform Events example

```ballerina
import ballerina/log;
import ballerinax/salesforce;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string baseUrl = ?;

listener salesforce:Listener sfListener = new ({
    baseUrl: baseUrl,
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://login.salesforce.com/services/oauth2/token"
    }
});

// Subscribe to a custom platform event channel
// Channel format: /event/__e
service salesforce:PlatformEventsService on sfListener {
    remote function onMessage(salesforce:PlatformEventsMessage message) returns error? {
        log:printInfo("Platform event received",
            payload = message.payload.toString(),
            replayId = message.replayId
        );
    }
}
```

---

## Supporting Types

### `EventData`

| Field | Type | Description |
|-------|------|-------------|
| `changedData` | <code>map&lt;json&gt;</code> | A map of changed field names to their new values. |
| `metadata` | <code>ChangeEventMetadata?</code> | Metadata about the change event (entity, type, record ID). |

### `ChangeEventMetadata`

| Field | Type | Description |
|-------|------|-------------|
| `entityName` | <code>string?</code> | The API name of the sObject that changed (e.g., `"Account"`). |
| `changeType` | <code>string?</code> | The type of change: `CREATE`, `UPDATE`, `DELETE`, or `UNDELETE`. |
| `changeOrigin` | <code>string?</code> | The source of the change (e.g., `"com/salesforce/api/rest/57.0"`). |
| `transactionKey` | <code>string?</code> | A unique key identifying the transaction. |
| `sequenceNumber` | <code>int?</code> | The sequence number of the event within the transaction. |
| `commitTimestamp` | <code>int?</code> | The Unix timestamp (milliseconds) when the change was committed. |
| `commitNumber` | <code>int?</code> | The transaction commit number. |
| `commitUser` | <code>string?</code> | The ID of the user who initiated the change. |
| `recordId` | <code>string?</code> | The record ID affected by the change. |

### `PlatformEventsMessage`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | <code>map&lt;json&gt;</code> | The published event fields as a JSON map. |
| `replayId` | <code>int?</code> | The replay ID for the event, used for replay-based subscriptions. |

### `TokenStore`

An isolated object interface for managing refresh token rotation. Implement this to persist tokens across restarts (e.g., to a database).

| Method | Signature | Description |
|--------|-----------|-------------|
| `acquireLock` | `acquireLock(string lockKey, int ttlSeconds) returns boolean&#124;error` | Attempts to acquire an advisory lock. Returns `true` if acquired, `false` if held by another replica, or an `error` if the store is unreachable. |
| `releaseLock` | `releaseLock(string lockKey) returns error?` | Releases the advisory lock after a refresh cycle completes. |
| `getTokenData` | `getTokenData(string key) returns TokenData?&#124;error` | Reads the current token data from the shared store. |
| `setTokenData` | `setTokenData(string key, TokenData data) returns error?` | Writes updated token data after a successful refresh. |
| `clearTokenData` | `clearTokenData(string key) returns error?` | Removes token data and its lock when the token family is permanently invalidated. |

### `TokenData`

| Field | Type | Description |
|-------|------|-------------|
| `accessToken` | <code>string</code> | The current OAuth 2.0 access token. |
| `refreshToken` | <code>string</code> | The current refresh token. |
| `accessTokenExpiryEpoch` | <code>int</code> | Epoch timestamp when the access token expires. |
| `issuedAtEpoch` | <code>int</code> | Epoch timestamp when the token was issued. |
| `lastRefreshedAtEpoch` | <code>int</code> | Epoch timestamp of the last token refresh. |

---

## Deployment

### Single replica

For a single-replica deployment (local dev, a single server, or a single Kubernetes pod), omit `tokenStore` — the connector defaults to `InMemoryTokenStore`. Refresh Token Rotation (RTR) is handled automatically: when Salesforce issues a new refresh token on each exchange, the connector captures it in memory and uses it for subsequent refreshes.

Set `defaultTokenExpTime` to match your org's Session Timeout value (Setup → Security → Session Settings → Timeout Value). Salesforce does not return `expires_in` in its token response, so the connector uses this value to calculate when to proactively refresh.

```ballerina
import ballerina/http;
import ballerinax/salesforce;

configurable string baseUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string tokenUrl = ?;
configurable int sessionTimeoutSeconds = 3600;

listener salesforce:Listener eventListener = new ({
    baseUrl: baseUrl,
    auth: <http:OAuth2RefreshTokenGrantConfig>{
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: tokenUrl,
        defaultTokenExpTime: <decimal>sessionTimeoutSeconds
    }
});

service "/data/ChangeEvents" on eventListener {

    remote function onCreate(salesforce:EventData payload) returns error? {
        // handle record creation
    }

    remote function onUpdate(salesforce:EventData payload) returns error? {
        // handle record update
    }

    remote function onDelete(salesforce:EventData payload) returns error? {
        // handle record deletion
    }

    remote function onRestore(salesforce:EventData payload) returns error? {
        // handle record restore
    }
}
```

To subscribe to a specific object's change events instead of all CDC events, change the service path. For example, use `"/data/AccountChangeEvent"` for Account changes only.

---

### Multiple replicas

In a horizontally-scaled deployment (e.g., multiple Kubernetes pods sharing one Salesforce Connected App), replicas must coordinate token refresh. Without coordination, two pods responding to a 401 simultaneously will each send the same stale refresh token. Salesforce rotates and immediately revokes the old token — causing `invalid_grant` errors that crash all replicas and require manual re-authentication.

The solution is to provide a shared `TokenStore` implementation backed by a distributed store such as Redis or a database. All replicas point to the same store. The connector's token manager uses double-checked locking: the first replica to acquire the distributed lock performs the token refresh and writes the result; all other replicas adopt the new tokens without making an additional HTTP call.

Implement the `TokenStore` interface and pass it as `tokenStore` in the listener config:

```ballerina
import ballerina/http;
import ballerinax/salesforce;

configurable string baseUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string tokenUrl = ?;
configurable int sessionTimeoutSeconds = 3600;

// Implement salesforce:TokenStore backed by a shared distributed store (e.g. Redis).
// All replicas must point to the same store instance.
//
// Redis equivalent per method:
//   acquireLock    → SETNX lock:<key> 1  +  EXPIRE lock:<key> <ttl>
//   releaseLock    → DEL lock:<key>
//   getTokenData   → GET data:<key>  (deserialise JSON → TokenData)
//   setTokenData   → SET data:<key> <json>
//   clearTokenData → DEL data:<key> lock:<key>
public isolated class RedisTokenStore {
    *salesforce:TokenStore;

    public isolated function acquireLock(string lockKey, int ttlSeconds) returns boolean|error {
        // Redis: SET lock:<lockKey> 1 NX EX <ttlSeconds>
        // Example: redisClient->set(string `lock:${lockKey}`, "1", ttlSeconds, (), true)
    }

    public isolated function releaseLock(string lockKey) returns error? {
        // Redis: DEL lock:<lockKey>
        // Example: _ = check redisClient->del([string `lock:${lockKey}`]);
    }

    public isolated function getTokenData(string key) returns salesforce:TokenData?|error {
        // Redis: GET data:<key>  (deserialize JSON → TokenData)
        // Example: string? json = check redisClient->get(string `data:${key}`);
    }

    public isolated function setTokenData(string key, salesforce:TokenData data) returns error? {
        // Redis: SET data:<key> <json>
        // Example: _ = check redisClient->set(string `data:${key}`, data.toJsonString());
    }

    public isolated function clearTokenData(string key) returns error? {
        // Redis: DEL data:<key> lock:<key>
        // Example: _ = check redisClient->del([string `data:${key}`, string `lock:${key}`]);
    }
}

listener salesforce:Listener eventListener = new ({
    baseUrl: baseUrl,
    auth: <http:OAuth2RefreshTokenGrantConfig>{
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: tokenUrl,
        defaultTokenExpTime: <decimal>sessionTimeoutSeconds
    },
    tokenStore: new RedisTokenStore()
});

service "/data/ChangeEvents" on eventListener {

    remote function onCreate(salesforce:EventData payload) returns error? {
        // handle record creation
    }

    remote function onUpdate(salesforce:EventData payload) returns error? {
        // handle record update
    }

    remote function onDelete(salesforce:EventData payload) returns error? {
        // handle record deletion
    }

    remote function onRestore(salesforce:EventData payload) returns error? {
        // handle record restore
    }
}
