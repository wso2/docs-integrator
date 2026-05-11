---
title: Authentication
---

# Authentication

Secure your production services with industry-standard authentication mechanisms. WSO2 Integrator provides declarative auth configuration at the service level.

## JWT validation

Protect services by validating JWT tokens from an identity provider:

```ballerina
import ballerina/http;

@http:ServiceConfig {
    auth: [
        {
            jwtValidatorConfig: {
                issuer: "https://auth.example.com",
                audience: "my-integration-api",
                signatureConfig: {
                    jwksConfig: {
                        url: "https://auth.example.com/.well-known/jwks.json",
                        cacheConfig: {
                            capacity: 100,
                            defaultMaxAge: 300
                        }
                    }
                },
                scopeKey: "scp"
            },
            scopes: ["read", "write"]
        }
    ]
}
service /api on new http:Listener(9090) {
    resource function get data(http:Request req) returns json {
        return {message: "Authenticated access"};
    }
}
```

## OAuth 2.0 introspection

Validate opaque tokens by calling the token introspection endpoint:

```ballerina
@http:ServiceConfig {
    auth: [
        {
            oauth2IntrospectionConfig: {
                url: "https://auth.example.com/oauth2/introspect",
                clientConfig: {
                    customHeaders: {"Authorization": "Basic " + encodedCredentials}
                }
            },
            scopes: ["admin"]
        }
    ]
}
service /admin on secureListener { }
```

## Basic authentication

For internal or legacy services:

```ballerina
@http:ServiceConfig {
    auth: [
        {
            fileUserStoreConfig: {},
            scopes: ["admin"]
        }
    ]
}
service /internal on new http:Listener(9091) { }
```

Configure users in `Config.toml`:

```toml
[[ballerina.auth.users]]
username = "admin"
password = "hashed-password"
scopes = ["admin", "read"]
```

## Mutual TLS (mTLS)

Require client certificates for service-to-service authentication. Before configuring mTLS, set up your keystores and truststores as described in [Keystores and truststores](keystore-truststore.md).

```ballerina
listener http:Listener mtlsListener = new (9443, {
    secureSocket: {
        key: {
            certFile: "/path/to/server.crt",
            keyFile: "/path/to/server.key"
        },
        mutualSsl: {
            verifyClient: http:REQUIRE,
            cert: "/path/to/ca.crt"
        }
    }
});
```

## Combining authentication methods

Support multiple auth mechanisms on a single service. WSO2 Integrator tries each handler in order:

```ballerina
@http:ServiceConfig {
    auth: [
        {jwtValidatorConfig: {issuer: "https://auth.example.com", ...}},
        {oauth2IntrospectionConfig: {url: "https://auth.example.com/introspect", ...}}
    ]
}
service /api on secureListener { }
```

## What's next

- [SSO configuration](sso-configuration.md) — Set up single sign-on using OpenID Connect
- [API security and rate limiting](api-security-rate-limiting.md) — Rate limiting and input validation for your APIs
- [Secrets and encryption](secrets-encryption.md) — Manage credentials securely
