---
title: WSO2 Identity Server
description: React to WSO2 Identity Server and Asgardeo events such as logins, registrations, user, role and organization changes using pre-built event handlers.
keywords: [wso2 integrator, wso2 identity server, asgardeo, webhook, event integration]
slug: /develop-and-test/integration-artifacts/event-driven-integration/wso2-identity-server
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WSO2 Identity Server

:::warning
WSO2 Identity Server event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

WSO2 Identity Server event integrations receive webhook deliveries from WSO2 Identity Server or Asgardeo and run a handler for each identity event. Use them to monitor sign-ins, provision users into other systems, or audit role and organization changes. They use the `ballerinax/identityserver.trigger` package, which verifies every delivery with the webhook secret before a handler runs.

## Creating a WSO2 Identity Server events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `identityserver.trigger` and select the **identityserver.trigger** card under **More on Ballerina Central**.
3. In the **WSO2 Identity Server Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="WSO2 Identity Server Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The WSO2 Identity Server events to handle, as a service type such as **identityserver:LoginService**. See [Event channels](#event-channels) for all options. | `identityserver:LoginService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a WSO2 Identity Server listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `identityserverListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Secret** | The **Secret** set on the webhook in the Console. The listener verifies every delivery with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="WSO2 Identity Server Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a WSO2 Identity Server event integration with an `identityserver:LoginService`.

```ballerina
import ballerina/log;
import ballerinax/identityserver.trigger as identityserver;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener identityserver:Listener identityserverListener = new ({webhookSecret}, port);

service identityserver:LoginService on identityserverListener {

    remote function onLoginSuccess(identityserver:LoginSuccessEvent payload) returns error? {
        identityserver:LoginSuccessPayload login = payload.events.loginSuccess;
        log:printInfo("Login succeeded", userId = login.user?.id, organization = login.organization?.name);
    }

    remote function onLoginFailed(identityserver:LoginFailedEvent payload) returns error? {
        identityserver:LoginFailedPayload login = payload.events.loginFailed;
        log:printWarn("Login failed", userId = login.user?.id, reason = login.reason?.description);
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point WSO2 Identity Server at the listener's public URL. See the [WSO2 Identity Server setup guide](product://connectors/catalog/security-identity/identityserver.trigger/setup-guide#configuring-identity-server-webhooks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **WSO2 Identity Server Event Integration Configuration** panel.

   <ThemedImage
       alt="WSO2 Identity Server listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/wso2-identity-server/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `identityserverListener` |
| **Listener Config** | A `identityserver:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `identityserver:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener identityserver:Listener identityserverListener = new ({webhookSecret}, port);
```

`identityserver:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The **Secret** set on the webhook in the Console. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one group of identity events, which match the event groups you select on the webhook in the Console, such as **Logins**. Each handler handles one event URI.

| Channel | Event URIs | Handlers |
|---|---|---|
| `identityserver:ConsentService` | `https://schemas.identity.wso2.org/events/consent/event-type/consentAdded`, `https://schemas.identity.wso2.org/events/consent/event-type/consentRevoked` | `onConsentAdded`, `onConsentRevoked` |
| `identityserver:ConsentPurposeService` | `https://schemas.identity.wso2.org/events/consent-purpose/event-type/purposeVersionAdded` | `onPurposeVersionAdded` |
| `identityserver:CredentialService` | `https://schemas.identity.wso2.org/events/credential/event-type/credentialUpdated` | `onCredentialUpdated` |
| `identityserver:LoginService` | `https://schemas.identity.wso2.org/events/login/event-type/loginSuccess`, `https://schemas.identity.wso2.org/events/login/event-type/loginFailed` | `onLoginSuccess`, `onLoginFailed` |
| `identityserver:OrganizationService` | `https://schemas.identity.wso2.org/events/organization/event-type/organizationCreated`, `https://schemas.identity.wso2.org/events/organization/event-type/organizationUpdated`, `https://schemas.identity.wso2.org/events/organization/event-type/organizationEnabled`, `https://schemas.identity.wso2.org/events/organization/event-type/organizationDisabled`, `https://schemas.identity.wso2.org/events/organization/event-type/organizationDeleted` | `onOrganizationCreated`, `onOrganizationUpdated`, `onOrganizationEnabled`, `onOrganizationDisabled`, `onOrganizationDeleted` |
| `identityserver:RegistrationService` | `https://schemas.identity.wso2.org/events/registration/event-type/registrationSuccess`, `https://schemas.identity.wso2.org/events/registration/event-type/registrationFailed` | `onRegistrationSuccess`, `onRegistrationFailed` |
| `identityserver:RoleService` | `https://schemas.identity.wso2.org/events/role/event-type/roleCreated`, `https://schemas.identity.wso2.org/events/role/event-type/roleMetaUpdated`, `https://schemas.identity.wso2.org/events/role/event-type/roleDeleted`, `https://schemas.identity.wso2.org/events/role/event-type/roleUsersUpdated`, `https://schemas.identity.wso2.org/events/role/event-type/roleGroupsUpdated`, `https://schemas.identity.wso2.org/events/role/event-type/roleIdpGroupsUpdated`, `https://schemas.identity.wso2.org/events/role/event-type/rolePermissionsUpdated` | `onRoleCreated`, `onRoleMetaUpdated`, `onRoleDeleted`, `onRoleUsersUpdated`, `onRoleGroupsUpdated`, `onRoleIdpGroupsUpdated`, `onRolePermissionsUpdated` |
| `identityserver:SessionService` | `https://schemas.identity.wso2.org/events/session/event-type/sessionEstablished`, `https://schemas.identity.wso2.org/events/session/event-type/sessionPresented`, `https://schemas.identity.wso2.org/events/session/event-type/sessionRevoked` | `onSessionEstablished`, `onSessionPresented`, `onSessionRevoked` |
| `identityserver:TokenService` | `https://schemas.identity.wso2.org/events/token/event-type/accessTokenIssued`, `https://schemas.identity.wso2.org/events/token/event-type/accessTokenRevoked` | `onAccessTokenIssued`, `onAccessTokenRevoked` |
| `identityserver:UserService` | `https://schemas.identity.wso2.org/events/user/event-type/userCreated`, `https://schemas.identity.wso2.org/events/user/event-type/userProfileUpdated`, `https://schemas.identity.wso2.org/events/user/event-type/userDisabled`, `https://schemas.identity.wso2.org/events/user/event-type/userEnabled`, `https://schemas.identity.wso2.org/events/user/event-type/userAccountLocked`, `https://schemas.identity.wso2.org/events/user/event-type/userAccountUnlocked`, `https://schemas.identity.wso2.org/events/user/event-type/userDeleted` | `onUserCreated`, `onUserProfileUpdated`, `onUserDisabled`, `onUserEnabled`, `onUserAccountLocked`, `onUserAccountUnlocked`, `onUserDeleted` |

See the [WSO2 Identity Server trigger reference](product://connectors/catalog/security-identity/identityserver.trigger/triggers) for each channel's payload type and fields.

## Event handlers

When a WSO2 Identity Server events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the Security Event Token as a typed record, such as `identityserver:LoginSuccessEvent` for `onLoginSuccess`, with the event data under `events`.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers WSO2 Identity Server as soon as a delivery passes verification, then runs the handler, so WSO2 Identity Server never waits on your logic. Errors are logged, not sent back to WSO2 Identity Server:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | WSO2 Identity Server sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onLoginSuccess(identityserver:LoginSuccessEvent payload) returns error? {
    do {
        identityserver:LoginSuccessPayload login = payload.events.loginSuccess;
        log:printInfo("Login succeeded", userId = login.user?.id, organization = login.organization?.name);
    } on fail error err {
        log:printError("Failed to handle the event", err);
    }
}
```

</TabItem>
</Tabs>

## What's next

- [Kafka](kafka.md): consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md): listen to Salesforce Change Data Capture events
- [WSO2 Identity Server trigger reference](product://connectors/catalog/security-identity/identityserver.trigger/triggers): listener configuration, every callback and the payload types
- [WSO2 Identity Server setup guide](product://connectors/catalog/security-identity/identityserver.trigger/setup-guide#configuring-identity-server-webhooks): point WSO2 Identity Server at your listener
