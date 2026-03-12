---
sidebar_position: 4
title: MCP Security
description: Secure your MCP servers with API keys, OAuth, mTLS, and authorization policies.
---

# MCP Security

MCP servers expose enterprise data and actions to AI assistants, making security critical. This page covers authentication mechanisms, transport security, and authorization patterns for protecting your MCP endpoints.

Without proper security, any MCP client could discover and call your tools, potentially accessing sensitive data or triggering unintended actions.

## Authentication Methods

### API Key Authentication

The simplest authentication method. Clients include an API key in the connection headers.

```ballerina
import ballerinax/mcp;

@mcp:ServiceConfig {
    name: "secure-order-service",
    version: "1.0.0",
    auth: {
        apiKey: {
            headerName: "X-API-Key",
            validator: validateApiKey
        }
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}

isolated function validateApiKey(string apiKey) returns boolean|error {
    // Validate against your key store
    return check keyStore->isValid(apiKey);
}
```

Clients connect by including the API key in their configuration:

```json
{
  "mcpServers": {
    "order-service": {
      "url": "http://localhost:8090/sse",
      "headers": {
        "X-API-Key": "your-api-key-here"
      }
    }
  }
}
```

### OAuth 2.0 Authentication

For production deployments, use OAuth 2.0 to authenticate MCP clients through an identity provider.

```ballerina
@mcp:ServiceConfig {
    name: "enterprise-data-service",
    version: "1.0.0",
    auth: {
        oauth2: {
            issuer: "https://idp.example.com",
            audience: "mcp-enterprise-data",
            scopes: ["tools:read", "tools:execute"]
        }
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

#### Token Validation

```ballerina
import ballerina/oauth2;

oauth2:IntrospectionConfig introspectionConfig = {
    url: "https://idp.example.com/oauth2/introspect",
    clientId: clientId,
    clientSecret: clientSecret
};

@mcp:ServiceConfig {
    name: "protected-service",
    version: "1.0.0",
    auth: {
        oauth2: {
            introspectionConfig: introspectionConfig,
            requiredScopes: ["mcp:tools"]
        }
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

### mTLS (Mutual TLS)

For high-security environments, require both client and server certificates.

```ballerina
import ballerina/http;

http:ListenerSecureSocket secureSocket = {
    key: {
        certFile: "/certs/server.crt",
        keyFile: "/certs/server.key"
    },
    mutualSsl: {
        verifyClient: http:REQUIRE,
        cert: "/certs/ca.crt"
    }
};

@mcp:ServiceConfig {
    name: "high-security-service",
    version: "1.0.0"
}
service on new mcp:Listener(new mcp:SseTransport(8090, secureSocket)) {
}
```

#### Client-Side mTLS Configuration

```ballerina
final mcp:Client secureMcp = check new ({
    transport: new mcp:SseClientTransport("https://secure-service:8090/sse", {
        secureSocket: {
            cert: "/certs/ca.crt",
            key: {
                certFile: "/certs/client.crt",
                keyFile: "/certs/client.key"
            }
        }
    })
});
```

## Authorization

Authentication verifies who the client is. Authorization controls what they can do.

### Tool-Level Authorization

Restrict which tools a client can access based on their roles or scopes.

```ballerina
@mcp:Tool {
    name: "getOrderStatus",
    description: "Look up order status by order ID.",
    auth: {
        requiredScopes: ["orders:read"]
    }
}
isolated function getOrderStatus(string orderId) returns json|error {
    return check orderApi->get(string `/orders/${orderId}/status`);
}

@mcp:Tool {
    name: "cancelOrder",
    description: "Cancel an order. This action cannot be undone.",
    auth: {
        requiredScopes: ["orders:write", "orders:cancel"]
    }
}
isolated function cancelOrder(string orderId, string reason) returns json|error {
    return check orderApi->post(string `/orders/${orderId}/cancel`, {reason});
}
```

### Role-Based Access Control

Map client identities to roles and control tool visibility per role.

```ballerina
type ClientRole "viewer"|"editor"|"admin";

configurable map<ClientRole> clientRoles = {
    "client-read-only": "viewer",
    "client-standard": "editor",
    "client-admin": "admin"
};

map<string[]> rolePermissions = {
    "viewer": ["getOrderStatus", "searchProducts", "getCustomer"],
    "editor": ["getOrderStatus", "searchProducts", "getCustomer", "createSupportTicket", "updateOrder"],
    "admin": ["getOrderStatus", "searchProducts", "getCustomer", "createSupportTicket", "updateOrder", "cancelOrder", "deleteCustomer"]
};
```

## Transport Security

### TLS Encryption

Always use TLS for remote MCP connections to encrypt data in transit.

```ballerina
http:ListenerSecureSocket tlsConfig = {
    key: {
        certFile: "/certs/server.crt",
        keyFile: "/certs/server.key"
    }
};

@mcp:ServiceConfig {
    name: "encrypted-service",
    version: "1.0.0"
}
service on new mcp:Listener(new mcp:SseTransport(8443, tlsConfig)) {
}
```

### CORS Configuration

Control which origins can connect to your SSE or Streamable HTTP MCP server.

```ballerina
@mcp:ServiceConfig {
    name: "web-accessible-service",
    version: "1.0.0",
    cors: {
        allowOrigins: ["https://app.example.com"],
        allowMethods: ["GET", "POST"],
        allowHeaders: ["Authorization", "Content-Type"],
        maxAge: 3600
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

## Input Validation

Validate tool inputs to prevent injection attacks and malformed requests.

```ballerina
@mcp:Tool {
    name: "queryDatabase",
    description: "Run a read-only query against the analytics database."
}
isolated function queryDatabase(
    @mcp:Param {description: "SQL SELECT query"} string query
) returns json|error {
    // Reject anything that is not a SELECT
    if !query.toLowerAscii().startsWith("select") {
        return error("Only SELECT queries are allowed.");
    }

    // Block dangerous patterns
    string lower = query.toLowerAscii();
    string[] blocked = ["drop", "delete", "update", "insert", "alter", "truncate", "--", ";"];
    foreach string keyword in blocked {
        if lower.includes(keyword) {
            return error(string `Query contains blocked keyword: '${keyword}'.`);
        }
    }

    return check analyticsDb->queryRows(query);
}
```

## Rate Limiting

Protect your MCP server from excessive requests.

```ballerina
@mcp:ServiceConfig {
    name: "rate-limited-service",
    version: "1.0.0",
    rateLimit: {
        maxRequestsPerMinute: 60,
        maxRequestsPerHour: 500,
        perClient: true
    }
}
service on new mcp:Listener(new mcp:SseTransport(8090)) {
}
```

## Audit Logging

Log all tool invocations for compliance and debugging.

```ballerina
import ballerina/log;
import ballerina/time;

@mcp:Tool {
    name: "getPatientRecord",
    description: "Retrieve a patient record by patient ID. Access is logged for HIPAA compliance."
}
isolated function getPatientRecord(string patientId) returns json|error {
    // Log the access for audit
    log:printInfo("MCP tool access", tool = "getPatientRecord", patientId = patientId, timestamp = time:utcNow().toString());

    json result = check healthcareApi->get(string `/patients/${patientId}`);

    log:printInfo("MCP tool result", tool = "getPatientRecord", patientId = patientId, success = true);
    return result;
}
```

## Security Checklist

| Item | Description |
|------|-------------|
| **Authentication** | Every remote MCP server should require authentication (API key, OAuth, or mTLS) |
| **TLS** | Always use TLS for SSE and Streamable HTTP transports |
| **Input validation** | Validate all tool parameters before processing |
| **Rate limiting** | Protect against excessive or abusive requests |
| **Audit logging** | Log all tool invocations with client identity and timestamps |
| **Least privilege** | Expose only the tools each client needs |
| **Write-action safeguards** | Require elevated scopes for tools that modify data |

## What's Next

- [Exposing MCP Servers](exposing-mcp-servers.md) -- Build MCP servers with WSO2 Integrator
- [Consuming MCP Tools](consuming-mcp-tools.md) -- Connect to external MCP servers
- [Input/Output Guardrails](/docs/genai/guardrails/input-output-guardrails) -- Validate AI inputs and outputs
- [API Security](/docs/deploy-operate/secure/api-security) -- Broader API security practices
