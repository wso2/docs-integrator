---
sidebar_position: 15
title: Moesif API Analytics
description: Integrate Ballerina integrations with Moesif for API analytics and monitoring.
---

# Moesif API Analytics

Moesif provides API analytics, monitoring, and usage-based billing capabilities. Integrating your Ballerina services with Moesif gives you deep visibility into API usage patterns, customer behavior, and error trends.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Moesif Account | Active account with Application ID |
| Ballerina | Integration project with HTTP services |

## Overview

Moesif captures API request and response data, providing:

| Feature | Description |
|---------|-------------|
| API Analytics | Request volume, latency, and error breakdowns |
| User Tracking | Per-user and per-company API usage |
| Alerting | Anomaly detection and threshold alerts |
| Usage Billing | Metered billing based on API consumption |
| Debugging | Full request/response inspection |

## Step 1 -- Add a Moesif Interceptor

Create an HTTP interceptor that sends request/response data to Moesif:

```ballerina
import ballerina/http;
import ballerina/log;
import ballerina/time;

configurable string moesifAppId = ?;
configurable string moesifApiEndpoint = "https://api.moesif.net/v1/events";

final http:Client moesifClient = check new (moesifApiEndpoint, {
    customHeaders: {"X-Moesif-Application-Id": moesifAppId}
});

service class MoesifInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
            http:RequestContext ctx,
            http:Request req) returns http:NextService|error? {
        // Capture request timestamp
        time:Utc requestTime = time:utcNow();
        ctx.set("moesif.requestTime", requestTime.toString());
        ctx.set("moesif.uri", req.rawPath);
        ctx.set("moesif.method", req.method);
        return ctx.next();
    }
}

service class MoesifResponseInterceptor {
    *http:ResponseInterceptor;

    remote function interceptResponse(http:RequestContext ctx,
            http:Response res) returns http:NextService|error? {
        // Send event to Moesif asynchronously
        string requestTime = check ctx.get("moesif.requestTime").ensureType();
        string uri = check ctx.get("moesif.uri").ensureType();
        string method = check ctx.get("moesif.method").ensureType();

        json event = {
            request: {
                time: requestTime,
                uri: uri,
                verb: method
            },
            response: {
                time: time:utcNow().toString(),
                status: res.statusCode
            }
        };

        // Fire and forget
        _ = start sendToMoesif(event);
        return ctx.next();
    }
}

function sendToMoesif(json event) {
    http:Response|error resp = moesifClient->post("/", event);
    if resp is error {
        log:printError("Failed to send event to Moesif", resp);
    }
}
```

## Step 2 -- Attach the Interceptor to Your Service

```ballerina
import ballerina/http;

listener http:Listener ep = new (9090,
    interceptors = [new MoesifInterceptor(), new MoesifResponseInterceptor()]
);

service /api on ep {
    resource function get orders() returns json {
        return {orders: []};
    }

    resource function post orders(json payload) returns json|error {
        // Process order...
        return {status: "created"};
    }
}
```

## Step 3 -- Configure Moesif Application ID

Add your Moesif Application ID to `Config.toml`:

```toml
moesifAppId = "your-moesif-application-id"
```

## Step 4 -- Add User and Company Context

Enrich events with user and company identifiers for per-customer analytics:

```ballerina
// In the interceptor, extract user context from the request
string? userId = req.getHeader("X-User-Id");
string? companyId = req.getHeader("X-Company-Id");

json event = {
    request: { ... },
    response: { ... },
    user_id: userId,
    company_id: companyId
};
```

## Using Moesif with an API Gateway

If you use an API gateway (Kong, Tyk, or AWS API Gateway), install the Moesif plugin at the gateway level instead of within the Ballerina service:

| Gateway | Moesif Plugin |
|---------|--------------|
| Kong | `kong-plugin-moesif` |
| Tyk | `tyk-plugin-moesif` |
| AWS API Gateway | Moesif Lambda integration |
| Apigee | Moesif shared flow |

This approach captures all API traffic without modifying your integration code.

## Viewing Analytics

In the Moesif dashboard:

1. **Live Event Log**: View real-time API requests and responses.
2. **Time Series**: Analyze request trends, latency, and error rates.
3. **Users**: Track API usage per user or company.
4. **Alerts**: Set up anomaly detection and threshold-based alerts.

## What's Next

- [Prometheus](prometheus.md) -- Self-managed metrics collection
- [Observability Overview](index.md) -- Full observability architecture
- [API Security](../secure/api-security.md) -- Secure your API endpoints
