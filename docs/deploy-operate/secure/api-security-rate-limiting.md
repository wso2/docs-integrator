---
title: API Security and Rate Limiting
---

# API Security and Rate Limiting

Protect your integration APIs from abuse, overload, and malicious input with rate limiting, request validation, and CORS configuration.

## Rate limiting

Implement rate limiting using a middleware pattern with Ballerina's HTTP interceptors:

```ballerina
import ballerina/http;
import ballerina/cache;
import ballerina/time;

final cache:Cache rateLimitCache = new ({
    capacity: 10000,
    defaultMaxAge: 60  // 60-second window
});

service class RateLimitInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](
            http:RequestContext ctx, http:Request req) returns http:NextService|http:TooManyRequests|error? {
        string clientIp = check req.getHeader("X-Forwarded-For");
        int|error count = rateLimitCache.get(clientIp).ensureType();
        if count is int && count >= 100 {
            return <http:TooManyRequests>{
                body: {message: "Rate limit exceeded. Try again later."},
                headers: {"Retry-After": "60"}
            };
        }
        rateLimitCache.put(clientIp, (count is int ? count + 1 : 1));
        return ctx.next();
    }
}
```

## Request size limits

Configure maximum request payload size on the HTTP listener:

```ballerina
listener http:Listener apiListener = new (9090, {
    maxPayloadSize: 1048576,  // 1 MB max payload
    maxHeaderSize: 8192,      // 8 KB max header size
    maxUriLength: 4096        // 4 KB max URI length
});
```

## Input validation

Validate incoming data using Ballerina's type system and constraint annotations:

```ballerina
import ballerina/constraint;

type OrderRequest record {|
    @constraint:String {minLength: 1, maxLength: 100}
    string customerName;

    @constraint:Array {minLength: 1, maxLength: 50}
    OrderItem[] items;

    @constraint:Float {minValue: 0.01}
    float total;
|};

resource function post orders(OrderRequest req) returns http:Created|http:BadRequest {
    // Ballerina automatically validates constraints
    // Invalid requests return 400 before reaching your code
    return <http:Created>{body: {status: "created"}};
}
```

## CORS configuration

```ballerina
@http:ServiceConfig {
    cors: {
        allowOrigins: ["https://app.example.com"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
        maxAge: 3600
    }
}
service /api on apiListener {
    // Resources here
}
```

## Security headers

Add security headers to all responses:

```ballerina
service class SecurityHeaderInterceptor {
    *http:ResponseInterceptor;

    remote function interceptResponse(http:RequestContext ctx,
            http:Response res) returns http:NextService|error? {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        return ctx.next();
    }
}
```

## What's next

- [Authentication](authentication.md) — OAuth 2.0, JWT, and mTLS for your APIs
- [IP whitelisting](ip-whitelisting.md) — Restrict access by IP address
- [Secrets and encryption](secrets-encryption.md) — Protect sensitive configuration
