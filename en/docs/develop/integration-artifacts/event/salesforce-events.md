---
title: Salesforce Events
description: Listen to Salesforce Change Data Capture events in real time using onCreate, onUpdate, onDelete, and onRestore handlers.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Salesforce Events

Salesforce event integrations subscribe to Change Data Capture (CDC) channels and trigger handler functions as records are created, updated, deleted, or restored in your Salesforce organization. Use them for real-time CRM synchronization, audit logging, and event-driven workflows that react to Salesforce record changes without polling.

## Creating a Salesforce events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Salesforce** under **Event Integration**.
3. In the creation form, fill in the following fields:

   ![Salesforce Events creation form](/img/develop/integration-artifacts/event/salesforce-events/step-creation-form.png)

   | Field | Description |
   |---|---|
   | **Auth** | Credentials for connecting to Salesforce. Accepts a record expression with `username` and `password` fields. Required. By default, the listener uses SOAP-based authentication. You can change the auth type after creation under [Listener Configuration](#listener-configuration). |

   Expand **Advanced Configurations** to set the listener name.

   | Field | Description | Default |
   |---|---|---|
   | **Listener Name** | Identifier for the listener created with this service. | `salesforceListener` |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener pill and the **Event Handlers** section with all four handlers pre-added.

   ![Service Designer showing the Salesforce Events service canvas](/img/develop/integration-artifacts/event/salesforce-events/step-service-designer.png)

   The four event handlers - `onCreate`, `onUpdate`, `onDelete`, and `onRestore` - are added automatically when the service is created. Click any handler to open it in the flow diagram view and implement the logic.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerinax/salesforce;
import ballerina/log;

configurable string username = ?;
configurable string password = ?;

listener salesforce:Listener salesforceListener = new ({
    auth: {
        username: username,
        password: password // password concatenated with security token
    }
});

service salesforce:CdcService on salesforceListener {

    remote function onCreate(salesforce:EventData event) returns error? {
        log:printInfo("Record created",
                      entity = event.metadata?.entityName,
                      id = event.metadata?.recordId);
    }

    remote function onUpdate(salesforce:EventData event) returns error? {
        log:printInfo("Record updated",
                      id = event.metadata?.recordId,
                      fields = event.changedData.keys());
    }

    remote function onDelete(salesforce:EventData event) returns error? {
        log:printInfo("Record deleted",
                      id = event.metadata?.recordId);
    }

    remote function onRestore(salesforce:EventData event) returns error? {
        log:printInfo("Record restored",
                      id = event.metadata?.recordId);
    }
}
```

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Configure** panel, set **Auth** to a record expression with relevant fields with optional values to set any of the values below. Click **Save Changes** to apply.

   ![Salesforce Configuration](/img/develop/integration-artifacts/event/salesforce-events/salesforce-configuration.gif)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
listener salesforce:Listener salesforceListener = new ({
    auth: {
        username: username,
        password: password    // password concatenated with security token
    }
});
```

</TabItem>
</Tabs>

The listener supports two authentication modes: **SOAP-based** (username and password) and **REST-based** (OAuth 2.0). The same fields apply whether you configure the listener through the visual designer or directly in Ballerina code.

### SOAP-based authentication

`salesforce:SoapBasedListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `auth` | `CredentialsConfig` | Required | Authentication credentials. Contains `username` (Salesforce username / email) and `password`. The `password` value must be the user password concatenated with the user's security token (`<password><securityToken>`, no separator). |
| `isSandBox` | `boolean` | `false` | Set to `true` if connecting to a Salesforce sandbox environment. |

### REST-based authentication

`salesforce:RestBasedListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `baseUrl` | `string` | Required | Salesforce instance URL. |
| `auth` | `OAuth2Config` | Required | OAuth 2.0 configuration. Pick one of `BearerTokenConfig`, `OAuth2PasswordGrantConfig`, `OAuth2RefreshTokenGrantConfig`, or `OAuth2ClientCredentialsGrantConfig` - see [OAuth 2.0 auth variants](#oauth-20-auth-variants) below. |
| `tokenStore` | `TokenStore` | `InMemoryTokenStore` | Token store for coordinating refresh token rotation (RTR) across replicas. The default InMemoryTokenStore handles RTR automatically for single-replica deployments. For multi-replica deployments (e.g., multiple Kubernetes pods), provide a distributed implementation (e.g., Redis-backed) to prevent token replay conflicts.|

:::note
Token Store and Refresh Token Rotation(RTR) only apply when using OAuth2RefreshTokenGrantConfig. RTR must also be enabled on the Salesforce side, in your Connected App settings, enable Refresh Token Rotation under OAuth policies. The other grant types bypass the TokenManager entirely.
:::

### Common optional fields

These fields apply to both SOAP and REST-based listener configurations:

| Field | Type | Description |
|---|---|---|
| `replayFrom` | `int` \| `ReplayOptions` | Replay option: `REPLAY_FROM_TIP`, `REPLAY_FROM_EARLIEST`, or a specific replay ID. |
| `connectionTimeout` | `decimal` | Connection timeout in seconds. |
| `readTimeout` | `decimal` | Read timeout in seconds. |
| `keepAliveInterval` | `decimal` | Keep-alive interval in seconds. |
| `apiVersion` | `string` | Salesforce Streaming API version. |
| `sessionTimeout` | `int` | Session timeout in seconds. |
| `proxyConfig` | `ProxyConfig` | Optional HTTP proxy configuration. |

#### OAuth 2.0 auth variants

The Record Configuration panel's `auth` drop-down (and the corresponding Ballerina record types) exposes four grant configurations. Pick the one that matches how your Connected App is set up.

| Config type | Required fields | Use when |
|---|---|---|
| `BearerTokenConfig` | `token` | You already have a short-lived access token and refresh it out-of-band. |
| `OAuth2PasswordGrantConfig` | `tokenUrl`, `username`, `password` | You authenticate as a Salesforce user with username + password (the `password` value must be `<password><securityToken>`, as for SOAP). |
| `OAuth2RefreshTokenGrantConfig` | `refreshUrl`, `refreshToken`, `clientId`, `clientSecret` | You have a long-lived refresh token from a Connected App authorization-code flow. Recommended for production. |
| `OAuth2ClientCredentialsGrantConfig` | `tokenUrl`, `clientId`, `clientSecret` | The Connected App authenticates as itself (machine-to-machine), without a user context. |

All three grant configs additionally accept these optional fields: `scopes`, `defaultTokenExpTime`, `clockSkew`, `optionalParams`, `credentialBearer`, `clientConfig`. `OAuth2PasswordGrantConfig` also accepts `clientId`, `clientSecret`, and `refreshConfig` as optional.

## Event handlers

When a Salesforce Events service is created, WSO2 Integrator adds all four handlers automatically. Click any handler in the **Service Designer** to open the flow diagram view and implement the processing logic.

### Handler types

| Handler | Triggered when | Use when |
|---|---|---|
| `onCreate` | A record is created in Salesforce | Syncing new records to downstream systems |
| `onUpdate` | A record is updated in Salesforce | Propagating field changes or triggering workflows |
| `onDelete` | A record is deleted in Salesforce | Cleaning up related data or auditing deletions |
| `onRestore` | A deleted record is restored (undeleted) | Recovering soft-deleted records in downstream systems |

:::note
You do not need to implement logic in all four handlers. Leave empty any handlers that are not relevant to your use case.
:::

### Event data type

Each handler receives a `salesforce:EventData` parameter with the change payload and metadata.

`salesforce:EventData` fields:

| Field | Type | Description |
|---|---|---|
| `changedData` | `map<json>` | Map of changed field names to their new values. |
| `metadata` | `salesforce:ChangeEventMetadata?` | Metadata about the change event. |

`salesforce:ChangeEventMetadata` fields:

| Field | Type | Description |
|---|---|---|
| `entityName` | `string?` | API name of the sObject that changed (e.g., `"Account"`). |
| `changeType` | `string?` | Type of change: `CREATE`, `UPDATE`, `DELETE`, or `UNDELETE`. |
| `changeOrigin` | `string?` | Source of the change (e.g., `"com/salesforce/api/rest/57.0"`). |
| `transactionKey` | `string?` | Unique key identifying the transaction. |
| `sequenceNumber` | `int?` | Sequence number of the event within the transaction. |
| `commitTimestamp` | `int?` | Unix timestamp in milliseconds when the change was committed. |
| `commitNumber` | `int?` | Transaction commit number. |
| `commitUser` | `string?` | ID of the user who initiated the change. |
| `recordId` | `string?` | The record ID affected by the change. |

## Supported event channels

The CDC channel the service subscribes to is determined by the service path in Ballerina code.

| Channel type | Channel pattern | Use case |
|---|---|---|
| Object-specific CDC | `/data/<ObjectName>ChangeEvent` | React to changes on a specific sObject (e.g., `/data/AccountChangeEvent`) |
| All CDC events | `/data/ChangeEvents` | Capture change events across all CDC-enabled objects |

## What's next

- [Kafka](kafka.md) - consume messages from Apache Kafka topics
- [Azure Service Bus](azure-service-bus.md) - consume messages from Azure Service Bus queues
- [Connections](../supporting/connections.md) - reuse Salesforce credentials across services
- [Salesforce connector reference](../../../connectors/catalog/crm-sales/salesforce/connector-overview.md) - full connector API reference and trigger reference
