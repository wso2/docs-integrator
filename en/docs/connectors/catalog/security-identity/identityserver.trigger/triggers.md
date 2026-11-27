---
title: Triggers
description: "Reference for the WSO2 Identity Server and Asgardeo webhook listener and service callbacks: receive login, registration, token, session, user, role and organization events in Ballerina integrations."
keywords: [wso2 identity server, asgardeo, webhook listener, event handler, ballerina]
connector: true
connector_name: "identityserver.trigger"
---

# Triggers

The `ballerinax/identityserver.trigger` package receives the webhooks of WSO2 Identity Server and Asgardeo. When a user signs in, registers, or is changed, or a token, session, credential, consent, role or organization changes, the server sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload.

This reference covers `ballerinax/identityserver.trigger` version 1.0.1. The following components work together:

| Component | Role |
|-----------|------|
| `identityserver:Listener` | Receives webhook requests from WSO2 Identity Server, verifies each one, and calls the attached service for its event. |
| `identityserver:ListenerConfig` | Holds what the listener verifies deliveries with, the webhook secret. |
| Service types | 10 service types, such as `identityserver:LoginService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `identityserver:LoginSuccessEvent`, passed to its callback. |

## Error handling

The listener acknowledges a delivery to WSO2 Identity Server as soon as it is verified, and then calls your callback, so WSO2 Identity Server never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `identityserver:Listener` exposes an HTTP endpoint for WSO2 Identity Server to deliver webhooks to. Set its URL as the **Endpoint** of a webhook in the Identity Server or Asgardeo Console. See the [Setup Guide](setup-guide.md#configuring-identity-server-webhooks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the WSO2 Identity Server webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The **Secret** set on the webhook in the Console. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

The server signs each delivery with the webhook secret: Identity Server in the `x-wso2-event-signature` header, and Asgardeo in `x-hub-signature`. Both hold `sha256=` followed by the hex HMAC-SHA256 of the request body. The listener computes the same value with `webhookSecret` and compares the two in constant time. A delivery without a signature, with a different one, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`.

When a webhook is activated, Asgardeo sends a `GET` request with a `hub.challenge` for each subscribed event type. The listener answers it, so your integration must be running when you activate the webhook.

Each delivery is a Security Event Token. The listener calls the callback for the event URI it carries under `events`.

### Initializing the listener

```ballerina
import ballerinax/identityserver.trigger as identityserver;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener identityserver:Listener identityserverListener = new ({webhookSecret}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<the secret set on the webhook>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 32 callbacks in all.

A service can also be attached on a path of its own, such as `service identityserver:LoginService /identityserver on identityserverListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(identityserver:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `identityserver:LoginService` | `onLoginSuccess`, `onLoginFailed` | <code>identityserver:LoginSuccessEvent</code>, <code>identityserver:LoginFailedEvent</code> |
| `identityserver:RegistrationService` | `onRegistrationSuccess`, `onRegistrationFailed` | <code>identityserver:RegistrationSuccessEvent</code>, <code>identityserver:RegistrationFailedEvent</code> |
| `identityserver:TokenService` | `onAccessTokenIssued`, `onAccessTokenRevoked` | <code>identityserver:AccessTokenIssuedEvent</code>, <code>identityserver:AccessTokenRevokedEvent</code> |
| `identityserver:SessionService` | `onSessionEstablished`, `onSessionPresented`, `onSessionRevoked` | <code>identityserver:SessionEstablishedEvent</code>, <code>identityserver:SessionPresentedEvent</code>, <code>identityserver:SessionRevokedEvent</code> |
| `identityserver:CredentialService` | `onCredentialUpdated` | <code>identityserver:CredentialUpdatedEvent</code> |
| `identityserver:UserService` | `onUserCreated`, `onUserProfileUpdated`, `onUserDisabled`, `onUserEnabled`, `onUserAccountLocked`, `onUserAccountUnlocked`, `onUserDeleted` | <code>identityserver:UserCreatedEvent</code>, <code>identityserver:UserProfileUpdatedEvent</code>, <code>identityserver:UserDisabledEvent</code>, <code>identityserver:UserEnabledEvent</code>, <code>identityserver:UserAccountLockedEvent</code>, <code>identityserver:UserAccountUnlockedEvent</code>, <code>identityserver:UserDeletedEvent</code> |
| `identityserver:ConsentService` | `onConsentAdded`, `onConsentRevoked` | <code>identityserver:ConsentAddedEvent</code>, <code>identityserver:ConsentRevokedEvent</code> |
| `identityserver:ConsentPurposeService` | `onPurposeVersionAdded` | <code>identityserver:PurposeVersionAddedEvent</code> |
| `identityserver:RoleService` | `onRoleCreated`, `onRoleMetaUpdated`, `onRoleDeleted`, `onRoleUsersUpdated`, `onRoleGroupsUpdated`, `onRoleIdpGroupsUpdated`, `onRolePermissionsUpdated` | <code>identityserver:RoleCreatedEvent</code>, <code>identityserver:RoleMetaUpdatedEvent</code>, <code>identityserver:RoleDeletedEvent</code>, <code>identityserver:RoleUsersUpdatedEvent</code>, <code>identityserver:RoleGroupsUpdatedEvent</code>, <code>identityserver:RoleIdpGroupsUpdatedEvent</code>, <code>identityserver:RolePermissionsUpdatedEvent</code> |
| `identityserver:OrganizationService` | `onOrganizationCreated`, `onOrganizationUpdated`, `onOrganizationEnabled`, `onOrganizationDisabled`, `onOrganizationDeleted` | <code>identityserver:OrganizationCreatedEvent</code>, <code>identityserver:OrganizationUpdatedEvent</code>, <code>identityserver:OrganizationEnabledEvent</code>, <code>identityserver:OrganizationDisabledEvent</code>, <code>identityserver:OrganizationDeletedEvent</code> |

### Full usage example

This is the [`login-monitor`](https://github.com/ballerina-platform/module-ballerinax-identityserver.trigger/tree/main/examples/login-monitor) example from the package:

```ballerina
import ballerina/log;
import ballerinax/identityserver.trigger as wso2is;

// webhookSecret is the secret set on the webhook in the Console, read from Config.toml.
configurable wso2is:ListenerConfig config = ?;

listener wso2is:Listener isListener = new (config, 8090);

// Logs successful logins and raises a warning with the reason for each failed one.
service wso2is:LoginService on isListener {

    remote function onLoginSuccess(wso2is:LoginSuccessEvent payload) returns error? {
        wso2is:LoginSuccessPayload login = payload.events.loginSuccess;
        log:printInfo("Login succeeded", userId = login.user?.id, organization = login.organization?.name,
                ip = login?.initiatorIpAddress, methods = login.authenticationMethods);
    }

    remote function onLoginFailed(wso2is:LoginFailedEvent payload) returns error? {
        wso2is:LoginFailedPayload login = payload.events.loginFailed;
        log:printWarn("Login failed", userId = login.user?.id, organization = login.organization?.name,
                ip = login?.initiatorIpAddress, reason = login.reason?.description);
    }
}
```

The package's examples import it as `wso2is`; any prefix works.

## Event payload types

Deliveries follow the Security Event Token format (RFC 8417): each event's record holds the event data under `events`. The types used by the example above:

### `LoginSuccessEvent`

| Field | Type | Description |
|-------|------|-------------|
| `iss` | <code>string</code> | Identifies the WSO2 Identity Server instance that issued the event. |
| `jti` | <code>string</code> | A unique identifier for the event. |
| `iat` | <code>int</code> | Timestamp showing when WSO2 Identity Server issues the event. Epoch milliseconds. |
| `rci` | <code>string</code> | A unique identifier that correlates the event with the original request that triggered it. |
| `events` | <code>EventDataLoginSuccess</code> | The event, keyed by its event type URI. |

### `LoginSuccessPayload`

| Field | Type | Description |
|-------|------|-------------|
| `initiatorType` | <code>string</code> | Indicates the persona who initiates the identity flow. E.g., `USER`. Optional. |
| `action` | <code>string</code> | Indicates the related identity flow. E.g., `LOGIN`. Optional. |
| `initiatorIpAddress` | <code>InitiatorIpAddress</code> | Indicates the IP address of the initiator that triggered the event. Optional. |
| `user` | <code>User</code> | Information of the user interacting in the related event. Optional. |
| `tenant` | <code>Tenant</code> | Root organization (tenant). Optional. |
| `organization` | <code>Organization</code> | The organization under which the event is processed. Optional. |
| `userStore` | <code>UserStore</code> | User store managing the user's data. Optional. |
| `application` | <code>anydata</code> | Information about the application that initiated the login. Optional. |
| `authenticationMethods` | <code>string[]</code> | An array of authentication methods used for the successful login (for example `BasicAuthenticator`). Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-identity-server-webhooks): point WSO2 Identity Server at your listener.
- [Example](example.md#wso2-identity-server-trigger-example): build a WSO2 Identity Server trigger integration in WSO2 Integrator.
