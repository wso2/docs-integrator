---
title: "Overview"
description: "Reference for the WSO2 Identity Server and Asgardeo webhook listener and service callbacks: receive login, registration, token, session, user, role and organization events in Ballerina integrations."
keywords: [wso2 identity server, asgardeo, webhook listener, event handler, ballerina]
---

# Overview

WSO2 Identity Server and Asgardeo manage identities and access for applications. The `ballerinax/identityserver.trigger` package lets an integration react to identity events as they happen: it provides a webhook listener that verifies each delivery and calls your service callbacks for logins, registrations, tokens, sessions, credentials, users, consents, roles and organizations.

## Key features

- Receives 32 events across 10 service types, from logins and user changes to role and organization changes
- One package for both products: verifies Identity Server's `x-wso2-event-signature` and Asgardeo's `x-hub-signature` with the webhook secret
- Answers Asgardeo's subscription check itself, so activating a webhook needs no code
- Acknowledges each delivery before running your handler, so a slow handler doesn't cause retries

## Triggers

Triggers allow your integration to react to WSO2 Identity Server activity in real time. The `ballerinax/identityserver.trigger` package provides a webhook listener that verifies each delivery from WSO2 Identity Server with the webhook secret and calls your service callbacks. It covers 32 events through 10 service types.

Service types:

| Service type | Callbacks |
|--------------|-----------|
| `LoginService` | `onLoginSuccess`, `onLoginFailed` |
| `RegistrationService` | `onRegistrationSuccess`, `onRegistrationFailed` |
| `TokenService` | `onAccessTokenIssued`, `onAccessTokenRevoked` |
| `SessionService` | `onSessionEstablished`, `onSessionPresented`, `onSessionRevoked` |
| `CredentialService` | `onCredentialUpdated` |
| `UserService` | `onUserCreated`, `onUserProfileUpdated`, `onUserDisabled`, `onUserEnabled`, `onUserAccountLocked`, `onUserAccountUnlocked`, `onUserDeleted` |
| `ConsentService` | `onConsentAdded`, `onConsentRevoked` |
| `ConsentPurposeService` | `onPurposeVersionAdded` |
| `RoleService` | `onRoleCreated`, `onRoleMetaUpdated`, `onRoleDeleted`, `onRoleUsersUpdated`, `onRoleGroupsUpdated`, `onRoleIdpGroupsUpdated`, `onRolePermissionsUpdated` |
| `OrganizationService` | `onOrganizationCreated`, `onOrganizationUpdated`, `onOrganizationEnabled`, `onOrganizationDisabled`, `onOrganizationDeleted` |

See the **[Trigger Reference](triggers.md)** for listener configuration, every service type and callback, and the event payload structure, and the [WSO2 Identity Server](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/wso2-identity-server) guide to build a WSO2 Identity Server event integration in WSO2 Integrator.

## Documentation

* **[Setup Guide](setup-guide.md)**: Set up WSO2 Identity Server to send webhook events to your integration.

* **[Trigger Reference](triggers.md)**: Listener configuration, every service type and callback, and the event payload types.

* **[Example](example.md)**: Build a WSO2 Identity Server event integration in WSO2 Integrator.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this package, please create a pull request in the following repository.

* [WSO2 Identity Server Trigger GitHub repository](https://github.com/ballerina-platform/module-ballerinax-identityserver.trigger)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.

## What's next

- [Setup Guide](setup-guide.md): point WSO2 Identity Server at your listener
- [Trigger Reference](triggers.md): every service type, callback and payload type
- [Example](example.md): build a WSO2 Identity Server event integration in WSO2 Integrator
