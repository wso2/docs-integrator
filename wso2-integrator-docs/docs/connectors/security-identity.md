---
sidebar_position: 19
title: "Security & Identity"
description: "Security and identity connectors for OAuth, LDAP, Okta, Auth0, and more in WSO2 Integrator."
---

# Security & Identity Connectors

Integrate with identity providers, authentication services, and security platforms. These connectors let you implement single sign-on, validate tokens, manage user directories, and enforce access control in your integrations.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **OAuth 2.0** | `ballerina/oauth2` | Implement OAuth 2.0 authorization flows and token management |
| **JWT** | `ballerina/jwt` | Generate, validate, and decode JSON Web Tokens |
| **LDAP** | `ballerinax/ldap` | Authenticate users and query directory services |
| **Okta** | `ballerinax/okta` | Manage users, groups, and SSO through Okta APIs |
| **Auth0** | `ballerinax/auth0` | Manage users, roles, and authentication through Auth0 |
| **Azure AD (Entra ID)** | `ballerinax/azure.ad` | Manage users, groups, and app registrations in Azure AD |
| **WSO2 Asgardeo** | `ballerinax/asgardeo` | Identity management, CIAM, and adaptive authentication |

## Quick Example

### Secure an API with JWT Validation and Okta User Lookup

```ballerina
import ballerina/http;
import ballerina/jwt;
import ballerinax/okta;

configurable string jwtIssuer = ?;
configurable string jwksUrl = ?;
configurable string oktaDomain = ?;
configurable string oktaApiToken = ?;

final okta:Client oktaClient = check new ({
    domain: oktaDomain,
    auth: {
        apiToken: oktaApiToken
    }
});

// Secure the listener with JWT authentication
listener http:Listener secureListener = new (8090, {
    auth: [{
        jwtValidatorConfig: {
            issuer: jwtIssuer,
            signatureConfig: {
                jwksConfig: {
                    url: jwksUrl
                }
            }
        }
    }]
});

service /api on secureListener {
    // Only authenticated users can access this resource
    resource function get profile(@http:Header string authorization) returns json|error {
        // Decode the JWT to get the user ID
        string token = authorization.substring(7);
        jwt:Payload jwtPayload = check jwt:decode(token);
        string userId = check jwtPayload.sub.ensureType();

        // Look up full user profile from Okta
        okta:User user = check oktaClient->getUser(userId);

        return {
            id: user.id,
            email: user.profile.email,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            groups: user.groups
        };
    }
}
```

### Authenticate Against LDAP

```ballerina
import ballerinax/ldap;

configurable string ldapHost = ?;
configurable int ldapPort = ?;
configurable string ldapBindDn = ?;
configurable string ldapBindPassword = ?;
configurable string ldapBaseDn = ?;

final ldap:Client ldapClient = check new ({
    hostName: ldapHost,
    port: ldapPort,
    domainName: ldapBindDn,
    password: ldapBindPassword
});

function authenticateUser(string username, string password) returns boolean|error {
    string userDn = string `uid=${username},${ldapBaseDn}`;
    ldap:AuthResult result = check ldapClient->authenticate(userDn, password);
    return result.success;
}

function getUserGroups(string username) returns string[]|error {
    string filter = string `(&(objectClass=groupOfNames)(member=uid=${username},${ldapBaseDn}))`;
    ldap:Entry[] entries = check ldapClient->search(ldapBaseDn, filter, ["cn"]);

    return from ldap:Entry entry in entries
        select entry.cn.toString();
}
```

## Configuration

```toml
# JWT Validation
[jwt]
jwtIssuer = "https://your-idp.example.com/"
jwksUrl = "https://your-idp.example.com/.well-known/jwks.json"

# Okta
[okta]
oktaDomain = "your-org.okta.com"
oktaApiToken = "<OKTA_API_TOKEN>"

# LDAP
[ldap]
ldapHost = "ldap.example.com"
ldapPort = 389
ldapBindDn = "cn=admin,dc=example,dc=com"
ldapBindPassword = "<LDAP_PASSWORD>"
ldapBaseDn = "ou=users,dc=example,dc=com"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, JWT, mTLS, and more
- [Runtime Security](../deploy-operate/secure/runtime-security.md) -- Secure your integrations at runtime
- [API Security](../deploy-operate/secure/api-security.md) -- Protect your APIs with authentication and authorization
