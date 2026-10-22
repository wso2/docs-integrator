---
connector: true
connector_name: "azure.storage.blob"
title: "Actions"
description: "Available operations in the ballerinax/azure.storage.blob connector."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/azure.storage.blob` package connects to Microsoft Azure Blob Storage. It exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Operations within one container, bound at initialization. |
| [`AdminClient`](#adminclient) | Account-level container management, service configuration, and account SAS. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Operates on a single container, bound at initialization, and on the blobs within it. A blob is addressed by its container-relative path, such as `2026/07/invoice.pdf`.

### Configuration

Both clients take a `ClientConfiguration`. Credentials come from the [Setup Guide](setup-guide.md).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthConfig</code> | Required | The authentication configuration: one credential-artifact record (an account key, a bare SAS token, a full SAS URL, a connection string, or a Microsoft Entra ID identity). |
| `retryConfig` | <code>RetryConfig</code> | <code>&#123;&#125;</code> | Retry behavior for service requests; the connector's defaults apply when omitted. |
| `transportConfig` | <code>TransportConfig</code> | <code>&#123;&#125;</code> | HTTP transport settings (proxy, connection pool, TLS). |

`AuthConfig` is a union of the credential records below. Each member has a unique required field or field combination, so the right member is selected by the fields you supply. The only exception is the credential-chain record `EntraIdChainConfig`, whose default-chain and managed-identity forms would otherwise share the same field shape; it carries a `kind` discriminator field. The other Entra ID records have no `kind` field.

**`SharedKeyConfig`**, Shared Key authentication using one of the storage account's access keys:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name, used to sign requests and to derive the service URL. |
| `accountKey` | <code>string</code> | Required | A base64-encoded access key of the storage account. |
| `serviceUrl` | <code>string</code> | Optional | The blob service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.blob.core.windows.net</code>. |

**`SasConfig`**, Shared Access Signature (SAS) authentication with a bare SAS token, as issued by `az storage container generate-sas` or the SAS-generation operations:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The name of the storage account the token belongs to (determines the service URL). |
| `sasToken` | <code>string</code> | Required | A SAS token scoped to the required resources and permissions. |

**`SasUrlConfig`**, SAS authentication with a full SAS URL, which carries the service URL and the SAS token in one string, as issued by the Azure portal:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sasUrl` | <code>string</code> | Required | A full blob-service SAS URL, including the scheme and the SAS query string (e.g. <code>https://&#123;account&#125;.blob.core.windows.net/?sv=...&sig=...</code>). |

**`ConnectionStringConfig`**, connection-string authentication. The connection string carries the account name, the credential (an account key or a SAS token), and the service endpoints:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | <code>string</code> | Required | An Azure Storage connection string, as issued by the Azure portal, the Azure CLI, or infrastructure tooling. |

`EntraIdConfig` is itself a union of four records: a credential chain, or a service principal identified by its client secret, its certificate, or a federated token. The identity authorizes data operations through Azure RBAC: `Storage Blob Data Reader` covers reads and listings, `Storage Blob Data Contributor` adds writes and deletes, and `Storage Blob Data Owner` adds the access policy, index tag, and tag query operations. Obtaining a user delegation key additionally needs the `Storage Blob Delegator` role (or a blob data role assigned at storage account scope or wider).

**`EntraIdChainConfig`**, authentication through a credential chain selected by `kind`. The default chain tries the environment, a managed identity, and developer sign-ins (Azure CLI, IDE accounts) in turn, so one configuration works both locally and when deployed; the managed-identity chain uses the managed identity alone, for workloads running on Azure compute (VMs, App Service, AKS, Functions):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `kind` | <code>EntraIdKind</code> | Required | The credential chain to use: `DEFAULT_AZURE_CREDENTIAL` (the value `"default"`) or `MANAGED_IDENTITY` (the value `"managed-identity"`). |
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `clientId` | <code>string</code> | Optional | The client ID of a user-assigned managed identity. Omit to use the system-assigned one. |
| `serviceUrl` | <code>string</code> | Optional | The blob service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.blob.core.windows.net</code>. |

**`ClientSecretConfig`**, authentication as a service principal with a client secret:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant the service principal belongs to. |
| `clientId` | <code>string</code> | Required | The application (client) ID of the service principal. |
| `clientSecret` | <code>string</code> | Required | The client secret issued for the service principal. |
| `serviceUrl` | <code>string</code> | Optional | The blob service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.blob.core.windows.net</code>. |

**`ClientCertificateConfig`**, authentication as a service principal with a client certificate:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant the service principal belongs to. |
| `clientId` | <code>string</code> | Required | The application (client) ID of the service principal. |
| `certificatePath` | <code>string</code> | Required | Path to the certificate file: a PEM file, or a PFX file when `certificatePassword` is set. |
| `certificatePassword` | <code>string</code> | Optional | The password protecting a PFX certificate. Omit for an unencrypted PEM certificate. |
| `serviceUrl` | <code>string</code> | Optional | The blob service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.blob.core.windows.net</code>. |

**`WorkloadIdentityConfig`**, workload-identity authentication, for Kubernetes workloads federated with Entra ID:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant the workload identity belongs to. |
| `clientId` | <code>string</code> | Required | The application (client) ID of the federated identity. |
| `tokenFilePath` | <code>string</code> | Required | Path to the projected service-account token file. |
| `serviceUrl` | <code>string</code> | Optional | The blob service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.blob.core.windows.net</code>. |

**`RetryConfig`**, retry behavior for service requests. Omit the record to keep the connector's defaults:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `retryPolicyType` | <code>RetryPolicyType</code> | <code>EXPONENTIAL</code> | How the delay between tries grows (`EXPONENTIAL` or `FIXED_INTERVAL`). |
| `maxTries` | <code>int</code> | <code>4</code> | The maximum number of tries, counting the first attempt. |
| `tryTimeout` | <code>decimal</code> | <code>60</code> | The timeout applied to each individual try, in seconds. |
| `retryDelay` | <code>decimal</code> | <code>4</code> | The base delay between tries, in seconds. |
| `maxRetryDelay` | <code>decimal</code> | <code>120</code> | The upper bound on the delay between tries, in seconds. |
| `secondaryHostUrl` | <code>string</code> | Optional | A secondary endpoint to retry reads against, for geo-redundant accounts. |

**`TransportConfig`**, HTTP transport settings: proxying, connection pooling, and TLS:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `proxy` | <code>ProxyConfig</code> | Optional | Route traffic through this proxy. |
| `connectionPool` | <code>ConnectionPoolConfig</code> | <code>&#123;&#125;</code> | Connection-pool tuning. |
| `secureSocket` | <code>SecureSocket</code> | Optional | Custom TLS settings (trust and key material, verification). |

**`ProxyConfig`**, proxy settings for the connector's traffic:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `proxyType` | <code>ProxyType</code> | <code>HTTP</code> | The proxy protocol (`HTTP`, `SOCKS4`, or `SOCKS5`). |
| `host` | <code>string</code> | Required | The proxy host name or address. |
| `port` | <code>int</code> | Required | The proxy port. |
| `username` | <code>string</code> | Optional | The user name, when the proxy requires authentication. |
| `password` | <code>string</code> | Optional | The password, when the proxy requires authentication. |
| `nonProxyHosts` | <code>string[]</code> | Optional | Host names that bypass the proxy. |

**`ConnectionPoolConfig`**, connection-pool settings for the connector's HTTP transport:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `maxConnections` | <code>int</code> | <code>50</code> | The maximum number of concurrent connections. |
| `idleTimeout` | <code>decimal</code> | <code>60</code> | How long an idle connection is kept before being closed, in seconds. |
| `connectTimeout` | <code>decimal</code> | <code>10</code> | The timeout for establishing a connection, in seconds. |
| `readTimeout` | <code>decimal</code> | <code>60</code> | The timeout for reading a response, in seconds. |

**`SecureSocket`**, TLS configuration for the connector's HTTPS traffic:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cert` | <code>CertStore&#124;string</code> | Optional | The trusted CA certificates: a PEM file path, or a truststore with its password. |
| `'key` | <code>CertKey&#124;CertStore</code> | Optional | The client identity for mutual TLS: a certificate and key pair, or a keystore with its password. |
| `protocolVersions` | <code>string[]</code> | Optional | The TLS protocol versions offered during the handshake (e.g. `["TLSv1.3", "TLSv1.2"]`). |
| `ciphers` | <code>string[]</code> | Optional | The cipher suites offered during the handshake. |
| `verifyHostName` | <code>boolean</code> | <code>true</code> | Whether the server's host name is verified against its certificate. |
| `sessionResumption` | <code>boolean</code> | Optional | Whether TLS sessions may be resumed. |
| `validateRevocation` | <code>boolean</code> | Optional | Whether the server certificate's revocation status is checked. |
| `sniHostName` | <code>string</code> | Optional | The Server Name Indication host name sent during the handshake. |
| `handshakeTimeout` | <code>decimal</code> | Optional | The TLS handshake timeout, in seconds. |
| `sessionTimeout` | <code>decimal</code> | Optional | The TLS session timeout, in seconds. |

**`CertStore`**, a PKCS12 or JKS certificate store and the password that opens it:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | <code>string</code> | Required | Path to the store file. |
| `password` | <code>string</code> | Required | The store password. |

**`CertKey`**, a certificate and private key pair identifying the client for mutual TLS:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `certFile` | <code>string</code> | Required | Path to the client certificate file. |
| `keyFile` | <code>string</code> | Required | Path to the client private key file. |
| `keyPassword` | <code>string</code> | Optional | The password protecting the private key, when it is encrypted. |

### Initializing the client

The client binds to one container at initialization. `Client.init` makes no call to Azure, so binding to a nonexistent container succeeds and the first operation on it fails with a `NotFoundError`; check up front with `AdminClient.hasContainer`.

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

blob:Client blobClient = check new ("reports", auth = {accountName, accountKey});
```

With a Microsoft Entra ID service principal instead of an account key:

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string tenantId = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

blob:Client blobClient = check new ("reports", auth = {accountName, tenantId, clientId, clientSecret});
```

The fields present in the `auth` value select the credential record, so a `Config.toml` entry can switch auth modes without a code change:

```toml
# The fields present select the union member:
[myapp.blobConfig]
auth = {accountName = "myacct", accountKey = "..."}               # SharedKeyConfig
# auth = {accountName = "myacct", sasToken = "sv=..."}            # SasConfig
# auth = {sasUrl = "https://myacct.blob.core.windows.net/?sv=..."}# SasUrlConfig
# auth = {connectionString = "..."}                               # ConnectionStringConfig
# auth = {kind = "default", accountName = "myacct"}               # EntraIdChainConfig (default chain)
# auth = {kind = "managed-identity", accountName = "myacct"}      # EntraIdChainConfig (managed identity)
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", clientSecret = "..."}                # ClientSecretConfig
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", certificatePath = "/path/cert.pem"}  # ClientCertificateConfig
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", tokenFilePath = "/path/token"}       # WorkloadIdentityConfig
```

### Operations

#### Container operations

Operations on the bound container itself. The service writes the anonymous access level and the stored access policies together, so each of the two setters first reads the current access control list and resends the half it does not change: each call is two requests, and two processes changing the two halves at the same time can overwrite each other (the last writer wins). The connector offers no container lease operations, but it honors a container lease held elsewhere: such a lease gates only the container's deletion, and a wrong `leaseId` passed to a container write fails with a `PreconditionFailedError`.

<details>
<summary>getContainerProperties</summary>

<div>

Reads the bound container's properties and metadata, including its anonymous access level, lease state, and the immutability and legal hold flags.

**Returns:** `ContainerProperties|Error`

**Sample code:**

```ballerina
blob:ContainerProperties properties = check blobClient->getContainerProperties();
```

**Sample response:**

```ballerina
{
    lastModified: [1770307200, 0.0],
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    publicAccess: "private",
    metadata: {department: "finance"},
    leaseState: "available",
    leaseStatus: "unlocked",
    leaseDuration: (),
    hasImmutabilityPolicy: false,
    hasLegalHold: false
}
```

</div>

</details>

<details>
<summary>setContainerMetadata</summary>

<div>

Replaces the container's complete metadata set. Any key absent from `metadata` is removed; read the current metadata back through `getContainerProperties`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | Yes | The new complete metadata set; pass `{}` to clear it. |
| `options` | <code>ContainerMetadataOptions</code> | No | Optional options (the lease id, when the container is leased). See [ContainerMetadataOptions](#containermetadataoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setContainerMetadata({department: "finance", year: "2026"});
```

</div>

</details>

<details>
<summary>getContainerAccessPolicy</summary>

<div>

Reads the container's anonymous access level and its stored access policies together; a private container reads back as `PRIVATE`.

**Returns:** `ContainerAccessPolicy|Error`

**Sample code:**

```ballerina
blob:ContainerAccessPolicy policy = check blobClient->getContainerAccessPolicy();
```

**Sample response:**

```ballerina
{
    access: "private",
    identifiers: [
        {
            id: "read-only-2026",
            startTime: [1770307200, 0.0],
            expiryTime: [1801843200, 0.0],
            permissions: "rl"
        }
    ]
}
```

</div>

</details>

<details>
<summary>setPublicAccess</summary>

<div>

Sets the container's anonymous access level (`PRIVATE`, `BLOB`, or `CONTAINER`). The stored access policies are left unchanged. Anonymous access also requires the storage account to permit it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `access` | <code>PublicAccess</code> | Yes | The anonymous access level to apply. |
| `options` | <code>AccessPolicyOptions</code> | No | Optional options (the lease id, when the container is leased). See [AccessPolicyOptions](#accesspolicyoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setPublicAccess(blob:BLOB);
```

</div>

</details>

<details>
<summary>setContainerAccessPolicy</summary>

<div>

Replaces the container's stored access policies. The anonymous access level is left unchanged. Container SAS tokens minted against a policy (through the `identifier` field of the signature values) inherit its window and permissions, so removing or editing a policy immediately revokes or changes every SAS minted against it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `identifiers` | <code>SignedIdentifier[]</code> | Yes | The new complete policy set, at most five (validated locally); pass `[]` to remove them all. See [SignedIdentifier](#signedidentifier). |
| `options` | <code>AccessPolicyOptions</code> | No | Optional options (the lease id, when the container is leased). See [AccessPolicyOptions](#accesspolicyoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setContainerAccessPolicy([
    {
        id: "read-only-2026",
        startTime: time:utcNow(),
        expiryTime: time:utcAddSeconds(time:utcNow(), 2592000),
        permissions: "rl"
    }
]);
```

</div>

</details>

#### Blob operations

Blob paths are slash-delimited, container-relative strings such as `"2026/07/invoice.pdf"`; the leading slash is optional. Blob storage has no directories: the slashes are part of the name. Properties are read whole and written through the narrower setters (`setBlobMetadata`, `setContentHeaders`, and `setAccessTier`); the remaining properties are maintained by the service. There is no rename operation: relocating a blob is a copy to the new name followed by a delete of the old one, and the two steps are individually observable.

<details>
<summary>listBlobs</summary>

<div>

Lists the container's blobs as one lazy stream, so memory stays bounded on large containers. In the flat mode (no `delimiter`) every blob of the container is returned regardless of the slashes in its name. In the hierarchical mode (a `delimiter` set) the listing covers one level: names extending past the next delimiter collapse into a single entry whose `isPrefix` flag is set, and such a prefix entry is fed back as the `prefix` of a further listing to descend one level.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | <code>BlobListOptions</code> | No | Optional listing options (prefix, delimiter, inclusion toggles). See [BlobListOptions](#bloblistoptions). |

**Returns:** `stream<BlobEntry, Error?>|Error`

**Sample code:**

```ballerina
stream<blob:BlobEntry, blob:Error?> entries = check blobClient->listBlobs({prefix: "2026/"});
check entries.forEach(function(blob:BlobEntry entry) {
    // process entry.path
});
```

**Sample response:**

```ballerina
{
    path: "2026/q1/report.pdf",
    isPrefix: false,
    contentLength: 524288,
    lastModified: [1770307200, 0.0],
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    blobType: "BlockBlob",
    accessTier: "Hot"
}
```

</div>

</details>

<details>
<summary>listBlobsPage</summary>

<div>

Lists one page of the container's blobs, with the marker to resume from. The options extend `BlobListOptions` with a `pageSize` (up to the service maximum of 5,000) and the `marker` to resume from. The marker is plain data, so a listing can be checkpointed and resumed across process restarts; otherwise prefer `listBlobs`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | <code>BlobPageOptions</code> | No | Optional listing options, plus the page size and marker. See [BlobPageOptions](#blobpageoptions). |

**Returns:** `BlobList|Error`

**Sample code:**

```ballerina
blob:BlobList page = check blobClient->listBlobsPage({prefix: "2026/", pageSize: 500});
```

**Sample response:**

```ballerina
{
    blobs: [
        {
            path: "2026/q1/report.pdf",
            isPrefix: false,
            contentLength: 524288,
            lastModified: [1770307200, 0.0],
            eTag: "\"0x8DDA1B2C3D4E5F6\"",
            blobType: "BlockBlob",
            accessTier: "Hot"
        }
    ],
    nextMarker: "2!108!MDAwMDI1ITIwMjYvcTEvcmVwb3J0LnBkZiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"
}
```

</div>

</details>

<details>
<summary>hasBlob</summary>

<div>

Checks whether a blob exists. It returns `false` only when Azure confirms the blob is absent (a confirmed 404); an `Error` means the check itself failed, so an auth problem is never misreported as a missing blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean blobExists = check blobClient->hasBlob("2026/q1/report.pdf");
```

**Sample response:**

```ballerina
true
```

</div>

</details>

<details>
<summary>deleteBlob</summary>

<div>

Deletes a blob, or one of its snapshots. A blob that has snapshots cannot be deleted without directing what happens to them through `DeleteBlobOptions.deleteSnapshots`. When the account's blob soft delete retention policy is enabled, the deleted blob is retained for the configured period and `undeleteBlob` restores it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `options` | <code>DeleteBlobOptions</code> | No | Optional deletion options (snapshot handling, a snapshot id, the lease id). See [DeleteBlobOptions](#deletebloboptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->deleteBlob("2026/q1/report-old.pdf", {deleteSnapshots: blob:INCLUDE});
```

</div>

</details>

<details>
<summary>undeleteBlob</summary>

<div>

Restores a soft-deleted blob, together with any soft-deleted snapshots it had. Find restorable blobs with `listBlobs({includeDeleted: true})`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the deleted blob. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->undeleteBlob("2026/q1/report-old.pdf");
```

</div>

</details>

<details>
<summary>getBlobProperties</summary>

<div>

Reads a blob's properties, metadata, and the state of its most recent copy operation. This is also how a pending copy is watched: the `copyStatus` field carries the state of the most recent copy. The access tier is reported as the wire's string, since the service's tier set is open-ended, and the type-specific fields (`blobSequenceNumber` for page blobs, `committedBlockCount` for append blobs) are present only for their type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |

**Returns:** `BlobProperties|Error`

**Sample code:**

```ballerina
blob:BlobProperties properties = check blobClient->getBlobProperties("2026/q1/report.pdf");
```

**Sample response:**

```ballerina
{
    lastModified: [1770307200, 0.0],
    createdTime: [1770303600, 0.0],
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    contentLength: 524288,
    contentHeaders: {contentType: "application/pdf", cacheControl: "max-age=3600"},
    metadata: {reviewed: "true"},
    blobType: "BlockBlob",
    accessTier: "Hot",
    accessTierInferred: true,
    leaseState: "available",
    leaseStatus: "unlocked",
    leaseDuration: ()
}
```

</div>

</details>

<details>
<summary>setBlobMetadata</summary>

<div>

Replaces a blob's complete metadata set. Any key absent from `metadata` is removed; read the current metadata back through `getBlobProperties`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `metadata` | <code>map&lt;string&gt;</code> | Yes | The new complete metadata set; pass `{}` to clear it. |
| `options` | <code>BlobMetadataOptions</code> | No | Optional options (the lease id, when the blob is leased). See [BlobMetadataOptions](#blobmetadataoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setBlobMetadata("2026/q1/report.pdf", {reviewed: "true"});
```

</div>

</details>

<details>
<summary>setContentHeaders</summary>

<div>

Replaces a blob's complete content-header set, such as `Content-Type` and `Cache-Control`. The wire applies the set as a whole, so any header omitted from the record is cleared on the blob. Metadata is untouched.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `headers` | <code>ContentHeaders</code> | Yes | The new complete content-header set. See [ContentHeaders](#contentheaders). |
| `options` | <code>ContentHeaderOptions</code> | No | Optional options (the lease id, when the blob is leased). See [ContentHeaderOptions](#contentheaderoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setContentHeaders("2026/q1/report.pdf", {
    contentType: "application/pdf",
    cacheControl: "max-age=3600"
});
```

</div>

</details>

#### Transfer operations

`uploadFromFile` and `download` move bytes between a local file on disk and the container and do no format detection or type conversion; `upload` and `getBlob` carry Ballerina values. Transfer paths are full paths including the file name on both sides. Every upload creates a block blob. An existing block blob at the destination is replaced, and its snapshots are retained. An existing append or page blob fails with an `InvalidBlobTypeError` (delete it first, then upload), and an archived blob fails with an `ArchivedBlobError` until it is rehydrated or deleted. There is no `overwrite` option. Content larger than a single request threshold is transferred as parallel chunks in every direction, so memory stays bounded.

<details>
<summary>uploadFromFile</summary>

<div>

Uploads a local file as a block blob (disk to container). The source is not deleted, and no automatic content type is set for a disk upload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The local file to upload, including its name. |
| `destinationPath` | <code>string</code> | Yes | The container-relative path to write, including the blob's name. |
| `options` | <code>UploadOptions</code> | No | Optional upload options (content headers, metadata, tags, tier, lease id). See [UploadOptions](#uploadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->uploadFromFile("./reports/q1.pdf", "2026/q1/report.pdf");
```

</div>

</details>

<details>
<summary>upload</summary>

<div>

Uploads in-memory or streamed content to the bound container. The serialization format resolves first: the explicit `UploadContentOptions.fileFormat` override wins, else the destination path's extension (`.json`, `.xml`, `.csv`) decides; the value is then checked against the resolved format. `byte[]`, `string`, and a byte stream pass through untouched under every format, so content you already serialized is never re-encoded. Under JSON a `json` value or a record (which includes any map of `anydata` members) becomes a JSON document. Under XML an `xml` value is written in its textual form and a record becomes a single-element document whose root element is named `root`. Under CSV a record array becomes rows headed by the union of every record's field names in first-seen order (nil or absent members as empty cells), and a record stream is written row by row as it is pulled, so its header is the first record's field names. A record array is never JSON or XML, and a single record is never CSV. A byte stream is staged as blocks and committed at the end of the stream with no content length needed up front; until that commit the destination blob does not exist, so a failed stream upload leaves no partial blob. A source stream failure aborts with a client-side `Error`, and every failure closes the source stream. A structured value whose format resolves to neither an override nor a known extension, and any value-to-format pairing outside these rules, is refused with a client-side `Error`. When the connector chose the serialization (a `json` value, a record, a record array, a record stream, or an `xml` value) and you set no explicit `contentType`, the blob's content type is set to match: `application/json`, `application/xml`, or `text/csv`. Positional or headerless CSV has no union member: write the text and upload it as a `string` or `byte[]`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | <code>UploadContent</code> | Yes | The content to upload: <code>byte[]&#124;string&#124;json&#124;xml&#124;record {}&#124;record {}[]&#124;stream&lt;byte[], error?&gt;&#124;stream&lt;record {}, error?&gt;</code>. `byte[]`, `string`, and a byte stream are written as-is; `json`, `xml`, a record, a record array, and a record stream are serialized per the resolved format. |
| `destinationPath` | <code>string</code> | Yes | The container-relative path, including the blob name. Its extension selects the format unless `fileFormat` overrides it. |
| `options` | <code>UploadContentOptions</code> | No | Every [UploadOptions](#uploadoptions) field plus `fileFormat` (`JSON`, `XML`, or `CSV`), the serialization format override. See [UploadContentOptions](#uploadcontentoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
Metric q1 = {quarter: "q1", revenue: 1250000};
check blobClient->upload(q1, "2026/q1/metrics.json");

Metric[] quarters = [{quarter: "q1", revenue: 1250000}, {quarter: "q2", revenue: 1310000}];
check blobClient->upload(quarters, "2026/summary.dat", {fileFormat: blob:CSV});

stream<byte[], io:Error?> fileStream = check io:fileReadBlocksAsStream("./reports/q1.pdf");
check blobClient->upload(fileStream, "2026/q1/report.pdf");
```

</div>

</details>

<details>
<summary>download</summary>

<div>

Downloads a blob to a local file (container to disk). The download fails with a client-side `Error` when a local file already exists at `destinationPath`, so it never overwrites local data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The container-relative path of the blob. |
| `destinationPath` | <code>string</code> | Yes | The local path to write, including the file name (must not exist). |
| `options` | <code>DownloadOptions</code> | No | Optional download options (a byte range, a snapshot id). See [DownloadOptions](#downloadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->download("2026/q1/report.pdf", "./downloads/report.pdf");
```

</div>

</details>

<details>
<summary>getBlob</summary>

<div>

Retrieves a blob's content in the form the target type selects. The target type is inferred from the call site, so no cast is needed: `byte[]` gives the raw content, materialized in one call; `string` decodes the content as UTF-8 text and fails with a client-side `Error` on content that is not valid UTF-8; `json` and `xml` parse the document (an `xml` subtype such as `xml:Element` takes only a document of that shape); `record {}` and `record {}[]` bind the content to the record shape per a resolved format, where the explicit `GetBlobOptions.fileFormat` override wins, else the path's extension (`.json`, `.xml`, `.csv`) decides; `stream<byte[], error?>` streams the content lazily, so memory stays bounded for any blob size; and `stream<record {}, error?>` binds CSV rows lazily, one record per pull, where a row that fails to bind surfaces as the error entry of that pull. A single record binds from JSON or XML (never CSV), a record array binds from a JSON array or CSV rows (never XML), and a format that resolves to neither an override nor a known extension is refused with a client-side `Error`. CSV binding consumes the header row for field names; for positional or headerless CSV, read the content as `string` or `byte[]` and parse it yourself. A union of these members binds through the JSON parser, and a readonly intersection such as `Person & readonly` binds as its underlying member. The materialized targets download the full content before binding. Binding is strict: content that does not match the target type fails with a client-side `Error`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. Its extension selects the format for record targets unless `fileFormat` overrides it. |
| `options` | <code>GetBlobOptions</code> | No | Optional retrieval options (a byte range, a snapshot id, the binding format). See [GetBlobOptions](#getbloboptions). |
| `targetType` | <code>typedesc&lt;RetrievableType&gt;</code> | No | The expected return type, used for automatic data binding; inferred from the assignment target. Accepts <code>byte[]&#124;string&#124;json&#124;xml&#124;record {}&#124;record {}[]&#124;stream&lt;byte[], error?&gt;&#124;stream&lt;record {}, error?&gt;</code>. |

**Returns:** `targetType|Error`, the content in the requested form, or an `Error` on a failed retrieval or a data binding failure.

**Sample code:**

```ballerina
byte[] raw = check blobClient->getBlob("2026/q1/report.pdf");
Metric stored = check blobClient->getBlob("2026/q1/metrics.json");
Person[] people = check blobClient->getBlob("2026/q1/people.csv");
stream<byte[], error?> chunks = check blobClient->getBlob("2026/q1/large.bin");
```

**Sample response:**

```ballerina
{quarter: "q1", revenue: 1250000}
```

</div>

</details>

#### Copy operations

Copies are asynchronous: the service accepts the request and copies in the background. Inspect the returned `CopyInfo.copyStatus` and, if pending, observe progress through `getBlobProperties`, whose `copyStatus` carries the state of the blob's most recent copy, or cancel it with `abortCopy`. The destination inherits the source's metadata unless the copy sets metadata, but it carries no index tags unless the copy sets them. The service accepts a copy over a leased destination only when its lease is infinite.

<details>
<summary>copyBlob</summary>

<div>

Copies a blob within the bound container under this client's credentials. The service authorizes the copy source separately from the request, so a client authenticated with a SAS attaches that SAS to the source URL; a shared key authorizes a source in the same account on its own.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The container-relative path of the source blob. |
| `destinationPath` | <code>string</code> | Yes | The container-relative path of the destination blob. |
| `options` | <code>CopyOptions</code> | No | Optional copy options (destination metadata, tags, tier, lease id). See [CopyOptions](#copyoptions). |

**Returns:** `CopyInfo|Error`

**Sample code:**

```ballerina
blob:CopyInfo copy = check blobClient->copyBlob("2026/q1/report.pdf", "archive/2026-q1-report.pdf");
```

**Sample response:**

```ballerina
{
    copyId: "1c556d19-8b45-42d1-a4b5-6a1e73923d20",
    copyStatus: "pending"
}
```

</div>

</details>

<details>
<summary>copyBlobFromUrl</summary>

<div>

Copies into the bound container from any Azure Storage URL the service can read: a blob in another container or account, or a file in Azure Files. A source in the same storage account is authorized by this client's own credential: a client authenticated with a SAS attaches that SAS to a same-account blob source that carries none, since the service authorizes the source separately from the request. A source elsewhere that is not publicly readable must carry its own authorization in the URL, typically a SAS token. Copying an archived blob to a destination with an online `accessTier` rehydrates the content while keeping the archived original.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceUrl` | <code>string</code> | Yes | The URL of the source. A source in this storage account is authorized by the client's credential, a SAS being attached to the URL unless it already carries one; a source elsewhere carries its own authorization, typically a SAS token. |
| `destinationPath` | <code>string</code> | Yes | The container-relative path of the destination blob. |
| `options` | <code>CopyOptions</code> | No | Optional copy options (destination metadata, tags, tier, lease id). See [CopyOptions](#copyoptions). |

**Returns:** `CopyInfo|Error`

**Sample code:**

```ballerina
blob:CopyInfo copy = check blobClient->copyBlobFromUrl(
    "https://otheracct.blob.core.windows.net/backups/2026/q1/report.pdf?sv=2025-05-05&sig=...",
    "2026/q1/report.pdf"
);
```

**Sample response:**

```ballerina
{
    copyId: "8d1f3a52-6c07-4e4b-9f21-b3a8c5d4e6f7",
    copyStatus: "pending"
}
```

</div>

</details>

<details>
<summary>abortCopy</summary>

<div>

Cancels a pending copy. It fails with a `ConflictError` when no copy is pending, or when `copyId` does not match the pending one.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the destination blob. |
| `copyId` | <code>string</code> | Yes | The identifier from the `CopyInfo` the copy returned. |
| `options` | <code>AbortCopyOptions</code> | No | Optional options (the lease id, when the destination is leased). See [AbortCopyOptions](#abortcopyoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->abortCopy("archive/2026-q1-report.pdf", "1c556d19-8b45-42d1-a4b5-6a1e73923d20");
```

</div>

</details>

#### Access tier operations

An archived blob's content cannot be read or replaced until it is rehydrated: reads of an archived blob fail with an `ArchivedBlobError`, while its properties, metadata, and index tags stay readable.

<details>
<summary>setAccessTier</summary>

<div>

Moves a blob to another access tier: `HOT`, `COOL`, or `COLD` (the online tiers), or `ARCHIVE` (offline). Moving an archived blob to an online tier starts a rehydration that takes hours; the `rehydratePriority` option (`STANDARD`, up to fifteen hours, or `HIGH`, typically under one) applies to that move, and the pending rehydration is observable in `BlobProperties.archiveStatus`. A copy to a new destination with an online tier rehydrates while keeping the archived original.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `accessTier` | <code>AccessTier</code> | Yes | The tier to move the blob to. |
| `options` | <code>SetAccessTierOptions</code> | No | Optional options (the rehydration priority, the lease id). See [SetAccessTierOptions](#setaccesstieroptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setAccessTier("2026/q1/report.pdf", blob:COOL);
```

</div>

</details>

#### Blob index tag operations

Index tags differ from metadata: the service indexes them, so they answer queries without listing, and they carry their own SAS permission (`tag`, and `filter` for queries). Tags are set and read whole. A blob carries at most ten tags; a tag key is 1 to 128 characters and a value 0 to 256, both case sensitive, and both admit only letters, digits, and the characters ` +-.:=_/`. The tag index is eventually consistent: a `findBlobsByTags` query may briefly lag a `setTags` write, while `getTags` always reads the blob's current tags. The service refuses index tags on an account with a hierarchical namespace, so the three operations fail there with the service's error.

<details>
<summary>setTags</summary>

<div>

Replaces a blob's complete index-tag set, at most ten tags. The tag rules are checked locally before any request. On a leased blob, a missing or mismatched lease id fails with a `PreconditionFailedError`, as on the other leased writes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `tags` | <code>map&lt;string&gt;</code> | Yes | The new complete tag set; pass `{}` to clear it. |
| `options` | <code>TagOptions</code> | No | Optional options (the lease id, when the blob is leased). See [TagOptions](#tagoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->setTags("2026/q1/report.pdf", {status: "processed", year: "2026"});
```

</div>

</details>

<details>
<summary>getTags</summary>

<div>

Reads a blob's index tags; the map is empty when the blob has none.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |

**Returns:** `map<string>|Error`

**Sample code:**

```ballerina
map<string> tags = check blobClient->getTags("2026/q1/report.pdf");
```

**Sample response:**

```ballerina
{status: "processed", year: "2026"}
```

</div>

</details>

<details>
<summary>findBlobsByTags</summary>

<div>

Finds the bound container's blobs whose index tags match a query, as a lazy stream. The query is the service's filter expression: tag keys in double quotes, values in single quotes, the operators `=`, `>`, `>=`, `<`, and `<=`, and conditions joined by `AND`. Before any request the connector checks that the quotes balance, that only those operators appear, and that the quoted parts use the tag character set, and it adds the `@container` clause for the bound container; an expression that supplies its own `@container` is refused with a client-side `Error`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | <code>string</code> | Yes | The filter expression, such as `"status" = 'done' AND "priority" >= '05'`. |

**Returns:** `stream<TaggedBlobEntry, Error?>|Error`

**Sample code:**

```ballerina
stream<blob:TaggedBlobEntry, blob:Error?> matches =
    check blobClient->findBlobsByTags("\"status\" = 'processed' AND \"year\" >= '2026'");
check matches.forEach(function(blob:TaggedBlobEntry entry) {
    // process entry.path
});
```

**Sample response:**

```ballerina
{
    path: "2026/q1/report.pdf",
    tags: {status: "processed", year: "2026"}
}
```

</div>

</details>

#### Snapshot operations

A snapshot is a point-in-time, read-only copy of a blob. Snapshot contents are read through the regular read operations by passing the snapshot id as the `snapshotId` of `GetBlobOptions` or `DownloadOptions`. Snapshots are listed with `listBlobs({includeSnapshots: true})`, where each snapshot entry carries its `snapshotId`, and deleted through `deleteBlob` (one snapshot through `snapshotId`, or all of a blob's snapshots through `deleteSnapshots`).

<details>
<summary>createSnapshot</summary>

<div>

Creates a point-in-time, read-only copy of a blob and returns the snapshot identifier. A snapshot of a leased blob succeeds without the lease id, the one blob write that does; a lease id that is given is checked, and a wrong one fails with a `PreconditionFailedError`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `options` | <code>CreateSnapshotOptions</code> | No | Optional options (the snapshot's metadata, the lease id). See [CreateSnapshotOptions](#createsnapshotoptions). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string snapshotId = check blobClient->createSnapshot("2026/q1/report.pdf");
```

**Sample response:**

```ballerina
"2026-08-06T09:15:22.0000000Z"
```

</div>

</details>

#### Lease operations

Blob leases lock a blob against writes and deletion by anyone not holding the lease id; reads stay open to all. While a blob is leased, the write operations pass the lease id through the `leaseId` field of their options, `setAccessTier` and the index tag operations included; a write without the current lease id, or with a wrong one, fails with a `PreconditionFailedError`. The one exception is `createSnapshot`, which succeeds without the lease id. Failures of the lease operations themselves, against a stale id or the wrong lease state, surface as a `ConflictError`, and the error code in the detail names the exact condition.

<details>
<summary>acquireLease</summary>

<div>

Acquires a lease on a blob, locking it against writes and deletion by others. The duration is validated locally, so a value outside the range fails without a round trip. It fails with a `ConflictError` when the blob is already leased.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `leaseDurationSeconds` | <code>int</code> | Yes | 15 to 60 for a fixed lease, or -1 for an infinite one. |
| `proposedLeaseId` | <code>string</code> | No | A lease id to use; omit and the service generates one. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string leaseId = check blobClient->acquireLease("2026/q1/report.pdf", 60);
```

**Sample response:**

```ballerina
"5f3a9c2e-1b4d-4e8f-9a7c-2d6b8e0f1a3c"
```

</div>

</details>

<details>
<summary>renewLease</summary>

<div>

Renews a fixed-duration lease, restarting its clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `leaseId` | <code>string</code> | Yes | The current lease id. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->renewLease("2026/q1/report.pdf", "5f3a9c2e-1b4d-4e8f-9a7c-2d6b8e0f1a3c");
```

</div>

</details>

<details>
<summary>releaseLease</summary>

<div>

Releases a lease, making the blob immediately available to other clients.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `leaseId` | <code>string</code> | Yes | The current lease id. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->releaseLease("2026/q1/report.pdf", "5f3a9c2e-1b4d-4e8f-9a7c-2d6b8e0f1a3c");
```

</div>

</details>

<details>
<summary>breakLease</summary>

<div>

Breaks a lease without holding its id, for when the holder is gone. With no break period a fixed lease runs out its remaining time and an infinite lease breaks immediately; an explicit period can only shorten the break, never lengthen it. A broken lease cannot be renewed, and no new lease can be acquired until the period elapses.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `breakPeriodSeconds` | <code>int</code> | No | How long the lease keeps running before it breaks, 0 to 60. |

**Returns:** `int|Error`, the seconds until the lease is actually free; `0` means it is free now.

**Sample code:**

```ballerina
int secondsRemaining = check blobClient->breakLease("2026/q1/report.pdf", 0);
```

**Sample response:**

```ballerina
0
```

</div>

</details>

<details>
<summary>changeLease</summary>

<div>

Changes a lease's id, handing it over without a window in which another client could acquire it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `leaseId` | <code>string</code> | Yes | The current lease id. |
| `proposedLeaseId` | <code>string</code> | Yes | The new lease id. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string newLeaseId = check blobClient->changeLease("2026/q1/report.pdf",
    "5f3a9c2e-1b4d-4e8f-9a7c-2d6b8e0f1a3c", "9b1e4d7a-3c5f-4a2b-8d6e-0f2a4c6e8b1d");
```

**Sample response:**

```ballerina
"9b1e4d7a-3c5f-4a2b-8d6e-0f2a4c6e8b1d"
```

</div>

</details>

#### Append blob operations

Append blobs grow only at the end, which suits log-style accumulation. The transfer operations always create block blobs, so use these to create and extend an append blob; applying them to a blob of another type fails with an `InvalidBlobTypeError`. The `committedBlockCount` of `BlobProperties` reports an append blob's progress.

<details>
<summary>createAppendBlob</summary>

<div>

Creates an empty append blob. Append blobs grow only through the append operations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob to create. |
| `options` | <code>CreateBlobOptions</code> | No | Optional creation options (content headers, metadata, tags, lease id). See [CreateBlobOptions](#createbloboptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->createAppendBlob("logs/2026-08.log");
```

</div>

</details>

<details>
<summary>appendBlock</summary>

<div>

Appends a block of content at the blob's end. Blocks append in arrival order; each block may be at most 4 MiB, and a blob holds at most 50,000 blocks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the append blob. |
| `content` | <code>byte[]</code> | Yes | The content to append. |
| `options` | <code>AppendBlockOptions</code> | No | Optional options (the lease id, when the blob is leased). See [AppendBlockOptions](#appendblockoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->appendBlock("logs/2026-08.log", "2026-08-06T09:15:22Z order 1042 shipped\n".toBytes());
```

</div>

</details>

<details>
<summary>appendBlockFromUrl</summary>

<div>

Appends content the service reads from a URL, with the same source rules as `copyBlobFromUrl`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the append blob. |
| `sourceUrl` | <code>string</code> | Yes | The URL of the source. |
| `options` | <code>AppendBlockOptions</code> | No | Optional options (the lease id, when the blob is leased). See [AppendBlockOptions](#appendblockoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->appendBlockFromUrl("logs/2026-08.log",
    "https://otheracct.blob.core.windows.net/logs/2026-08-06.log?sv=2025-05-05&sig=...");
```

</div>

</details>

#### Page blob operations

Page blobs are fixed-capacity, 512-byte-aligned random-access blobs. The capacity is reserved sparsely: unwritten pages read as zeros and only written pages are billed. Page writes to a blob of another type fail with an `InvalidBlobTypeError`, and misaligned offsets or lengths are refused with a client-side `Error` before any request is made. The `blobSequenceNumber` of `BlobProperties` is the page blob's write sequence marker.

<details>
<summary>createPageBlob</summary>

<div>

Creates an empty page blob of a fixed capacity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob to create. |
| `sizeInBytes` | <code>int</code> | Yes | The blob's fixed capacity, a multiple of 512 up to 8 TiB. |
| `options` | <code>CreateBlobOptions</code> | No | Optional creation options (content headers, metadata, tags, lease id). See [CreateBlobOptions](#createbloboptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->createPageBlob("disks/data.vhd", 1048576);
```

</div>

</details>

<details>
<summary>uploadPages</summary>

<div>

Writes content at the given offset of a page blob. The offset must be 512-byte aligned and the content length a multiple of 512, at most 4 MiB per call.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the page blob. |
| `offset` | <code>int</code> | Yes | The 512-byte-aligned offset to write at. |
| `content` | <code>byte[]</code> | Yes | The content to write. |
| `options` | <code>PageOptions</code> | No | Optional options (the lease id, when the blob is leased). See [PageOptions](#pageoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
byte[] content = check io:fileReadBytes("./chunks/page-000.bin");
check blobClient->uploadPages("disks/data.vhd", 0, content);
```

</div>

</details>

<details>
<summary>clearPages</summary>

<div>

Resets a 512-byte-aligned range of a page blob to zeros, releasing its storage.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the page blob. |
| `offset` | <code>int</code> | Yes | The 512-byte-aligned offset to clear from. |
| `length` | <code>int</code> | Yes | The 512-byte-aligned number of bytes to clear. |
| `options` | <code>PageOptions</code> | No | Optional options (the lease id, when the blob is leased). See [PageOptions](#pageoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->clearPages("disks/data.vhd", 524288, 524288);
```

</div>

</details>

<details>
<summary>listPageRanges</summary>

<div>

Lists the written byte ranges of a page blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the page blob. |
| `options` | <code>PageRangeOptions</code> | No | Optional options (a byte range to restrict the listing, a snapshot id). See [PageRangeOptions](#pagerangeoptions). |

**Returns:** `PageRange[]|Error`

**Sample code:**

```ballerina
blob:PageRange[] ranges = check blobClient->listPageRanges("disks/data.vhd");
```

**Sample response:**

```ballerina
[{offset: 0, length: 524288}]
```

</div>

</details>

#### Block operations

The block operations expose block blob composition directly. They are not the path for ordinary large uploads, which `upload` and `uploadFromFile` chunk internally. They serve composing a blob from remote pieces without the content passing through your program, and staging content across process restarts before committing it. All block ids of one blob must be equal in length. Staged blocks expire seven days after the blob's most recent successful staging; until a commit, the visible blob (if any) is unchanged.

<details>
<summary>stageBlock</summary>

<div>

Stages a block of content under a base64 block id, without changing the visible blob. The caller supplies the id already base64 encoded; an id that is not valid base64 fails with a client-side `Error` before any request is made.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `blockId` | <code>string</code> | Yes | The block's base64 identifier; all ids of one blob must be equal in length. |
| `content` | <code>byte[]</code> | Yes | The content to stage, at most 4,000 MiB. |
| `options` | <code>StageBlockOptions</code> | No | Optional options (the lease id, when the blob is leased). See [StageBlockOptions](#stageblockoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
byte[] part = check io:fileReadBytes("./chunks/part-000.bin");
check blobClient->stageBlock("2026/combined.bin", "MDAwMDAw", part);
```

</div>

</details>

<details>
<summary>stageBlockFromUrl</summary>

<div>

Stages a block the service reads from a URL, so the content never passes through the caller. The source rules are those of `copyBlobFromUrl`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `blockId` | <code>string</code> | Yes | The block's base64 identifier; all ids of one blob must be equal in length. |
| `sourceUrl` | <code>string</code> | Yes | The URL of the source. |
| `options` | <code>StageBlockFromUrlOptions</code> | No | Optional options (a source byte range, the lease id). See [StageBlockFromUrlOptions](#stageblockfromurloptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->stageBlockFromUrl("2026/combined.bin", "MDAwMDAx",
    "https://otheracct.blob.core.windows.net/parts/part-001.bin?sv=2025-05-05&sig=...");
```

</div>

</details>

<details>
<summary>commitBlockList</summary>

<div>

Commits an ordered list of staged block ids as the blob's content, creating or replacing it in one atomic step. All block ids must be equal in length; an unequal set fails with a client-side `Error` before the request is made.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |
| `blockIds` | <code>string[]</code> | Yes | The block ids to commit, in order. |
| `options` | <code>UploadOptions</code> | No | Optional options (content headers, metadata, tags, tier, lease id). See [UploadOptions](#uploadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check blobClient->commitBlockList("2026/combined.bin", ["MDAwMDAw", "MDAwMDAx"]);
```

</div>

</details>

<details>
<summary>listBlocks</summary>

<div>

Reports a blob's committed blocks and its staged, uncommitted blocks. This is how a restarted producer finds what it already staged.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob. |

**Returns:** `BlockList|Error`

**Sample code:**

```ballerina
blob:BlockList blocks = check blobClient->listBlocks("2026/combined.bin");
```

**Sample response:**

```ballerina
{
    committedBlocks: [{blockId: "MDAwMDAw", sizeBytes: 4194304}],
    uncommittedBlocks: [{blockId: "MDAwMDAx", sizeBytes: 1048576}]
}
```

</div>

</details>

#### SAS generation

These are ordinary methods, not remote functions: they sign locally without a service call, so invoke them with `.` rather than `->`. `generateContainerSas` and `generateSas` sign with the account key, so the client must hold a `SharedKeyConfig` (or a connection string carrying an account key); rotating the account key revokes every SAS minted from it. The user-delegation variants sign with a `UserDelegationKey` obtained from `AdminClient.getUserDelegationKey`, so no storage key is handled. Each returns the token without a leading `?`, to append to a blob or container URL as the query string.

<details>
<summary>generateContainerSas</summary>

<div>

Mints a SAS (Shared Access Signature) token scoped to the whole container, signed locally with the account key; the client must hold shared key credentials. Generation fails with a client-side `Error` when no `identifier` is supplied and the `expiryTime` or the `permissions` are missing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>ContainerSasSignatureValues</code> | Yes | The values signed into the token: validity window and permissions, or a stored policy identifier. See [ContainerSasSignatureValues](#containersassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check blobClient.generateContainerSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=c&sp=rl&se=2026-08-06T10%3A00%3A00Z&sig=nJd7..."
```

</div>

</details>

<details>
<summary>generateSas</summary>

<div>

Mints a SAS (Shared Access Signature) token scoped to a single blob, signed locally with the account key; the client must hold shared key credentials. Generation fails with a client-side `Error` when no `identifier` is supplied and the `expiryTime` or the `permissions` are missing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob the token grants access to. |
| `values` | <code>BlobSasSignatureValues</code> | Yes | The values signed into the token: validity window and permissions, or a stored policy identifier. See [BlobSasSignatureValues](#blobsassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check blobClient.generateSas("2026/q1/report.pdf", {
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=b&sp=r&se=2026-08-06T10%3A00%3A00Z&sig=Xk2p..."
```

</div>

</details>

<details>
<summary>generateContainerUserDelegationSas</summary>

<div>

Mints a container-scoped user-delegation SAS token, signed with an Entra ID user-delegation key instead of the account key. A user-delegation SAS is valid at most 7 days (the key's lifetime), and stored access policies do not apply to it: the generator rejects an `identifier` and requires an explicit `expiryTime` and `permissions`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>ContainerSasSignatureValues</code> | Yes | The values signed into the token; an explicit window and permissions are required. See [ContainerSasSignatureValues](#containersassignaturevalues). |
| `key` | <code>UserDelegationKey</code> | Yes | The user-delegation key from `AdminClient.getUserDelegationKey`. See [UserDelegationKey](#userdelegationkey). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
// An Entra ID-authenticated AdminClient mints the delegation key.
blob:AdminClient admin = check new (auth = {accountName, tenantId, clientId, clientSecret});
blob:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
string sasToken = check blobClient.generateContainerUserDelegationSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true}
}, key);
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=c&sp=rl&se=2026-08-06T10%3A00%3A00Z&skoid=3d1e2f3a-...&sig=Qm9r..."
```

</div>

</details>

<details>
<summary>generateUserDelegationSas</summary>

<div>

Mints a blob-scoped user-delegation SAS token, signed with an Entra ID user-delegation key instead of the account key. A user-delegation SAS is valid at most 7 days (the key's lifetime), and stored access policies do not apply to it: the generator rejects an `identifier` and requires an explicit `expiryTime` and `permissions`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The container-relative path of the blob the token grants access to. |
| `values` | <code>BlobSasSignatureValues</code> | Yes | The values signed into the token; an explicit window and permissions are required. See [BlobSasSignatureValues](#blobsassignaturevalues). |
| `key` | <code>UserDelegationKey</code> | Yes | The user-delegation key from `AdminClient.getUserDelegationKey`. See [UserDelegationKey](#userdelegationkey). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
// An Entra ID-authenticated AdminClient mints the delegation key.
blob:AdminClient admin = check new (auth = {accountName, tenantId, clientId, clientSecret});
blob:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
string sasToken = check blobClient.generateUserDelegationSas("2026/q1/report.pdf", {
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true}
}, key);
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=b&sp=r&se=2026-08-06T10%3A00%3A00Z&skoid=3d1e2f3a-...&sig=Ttw4..."
```

</div>

</details>

## AdminClient

Account-level administration: container lifecycle and existence checks, the account's blob service configuration, account information, the user delegation key, and account SAS.

### Configuration

The `AdminClient` takes the same `ClientConfiguration` as the `Client`; see the [Client configuration](#configuration) tables above.

Under Microsoft Entra ID credentials, creating and deleting containers and setting container metadata need `Storage Blob Data Contributor` assigned at storage account scope or wider. Reading and setting the blob service properties need the storage account's `blobServices/read` and `blobServices/write` actions, whose least privileged built-in role is `Storage Account Contributor`. `getUserDelegationKey` requires the `Storage Blob Delegator` role (or a blob data role assigned at storage account scope or wider). See the [Setup Guide](setup-guide.md) for the role split.

### Initializing the client

```ballerina
import ballerinax/azure.storage.blob;

configurable string accountName = ?;
configurable string accountKey = ?;

blob:AdminClient admin = check new (auth = {accountName, accountKey});
```

### Operations

#### Container management

<details>
<summary>hasContainer</summary>

<div>

Checks whether a container exists in the storage account. It returns `false` only when Azure confirms the container is absent (a confirmed 404); an `Error` means the check itself failed, so an auth problem is never misreported as a missing container.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | The name of the container to check. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean containerExists = check admin->hasContainer("reports");
```

**Sample response:**

```ballerina
true
```

</div>

</details>

<details>
<summary>listContainers</summary>

<div>

Lists the containers in the storage account. Without a `'limit` every container is returned and `nextMarker` is absent; with one, up to that many are returned and `nextMarker` is present when more remain, to be passed back as the next call's `marker`. The marker is plain data, so a listing survives a process restart.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | <code>ContainerListOptions</code> | No | Optional listing options (prefix, inclusion toggles, a result limit and marker). See [ContainerListOptions](#containerlistoptions). |

**Returns:** `ContainerList|Error`

**Sample code:**

```ballerina
blob:ContainerList containers = check admin->listContainers({includeMetadata: true});
```

**Sample response:**

```ballerina
{
    containers: [
        {
            name: "reports",
            lastModified: [1770307200, 0.0],
            eTag: "\"0x8DDA1B2C3D4E5F6\"",
            publicAccess: "private",
            leaseState: "available",
            leaseStatus: "unlocked",
            leaseDuration: (),
            metadata: {department: "finance"}
        }
    ]
}
```

</div>

</details>

<details>
<summary>createContainer</summary>

<div>

Creates a new container in the storage account. It fails with a `ConflictError` if the container already exists.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | The name of the container to create. |
| `options` | <code>ContainerCreateOptions</code> | No | Optional creation options (metadata, anonymous access level). See [ContainerCreateOptions](#containercreateoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->createContainer("reports", {metadata: {department: "finance"}});
```

</div>

</details>

<details>
<summary>deleteContainer</summary>

<div>

Deletes a container and every blob in it. Where the account's container soft-delete retention policy is enabled, the container is retained for the configured period and can be restored with `undeleteContainer`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | The name of the container to delete. |
| `options` | <code>DeleteContainerOptions</code> | No | Optional deletion options (the lease id, when the container is leased). See [DeleteContainerOptions](#deletecontaineroptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->deleteContainer("reports-2024");
```

</div>

</details>

<details>
<summary>undeleteContainer</summary>

<div>

Restores a soft-deleted container. Find restorable containers with `listContainers({includeDeleted: true})`, where each carries the `deletedVersion` this operation takes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `containerName` | <code>string</code> | Yes | The name of the soft-deleted container to restore. |
| `deletedContainerVersion` | <code>string</code> | Yes | The version of the soft-deleted container (from `ContainerInfo.deletedVersion`). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->undeleteContainer("reports-2024", "01D9E9CE4B0316F0");
```

</div>

</details>

#### Service configuration and account information

<details>
<summary>getServiceProperties</summary>

<div>

Reads the account's blob service configuration: request-metrics collection, classic logging, CORS rules, the blob soft delete retention policy, the static website settings, and the default service version.

**Returns:** `ServiceProperties|Error`

**Sample code:**

```ballerina
blob:ServiceProperties properties = check admin->getServiceProperties();
```

**Sample response:**

```ballerina
{
    hourMetrics: {version: "1.0", enabled: true, includeApis: true, retentionPolicy: {enabled: true, days: 7}},
    minuteMetrics: {version: "1.0", enabled: false},
    logging: {version: "1.0", read: false, write: false, delete: false, retentionPolicy: {enabled: false}},
    cors: [],
    deleteRetentionPolicy: {enabled: true, days: 7},
    staticWebsite: {enabled: false},
    defaultServiceVersion: "2025-05-05"
}
```

</div>

</details>

<details>
<summary>setServiceProperties</summary>

<div>

Writes the account's blob service configuration. Each configuration group is an optional field of the record: a group present in the record replaces that group whole, and a group absent is left unchanged. An empty `cors` array therefore deletes every CORS rule, while omitting the `cors` field preserves them. To change one group, read the current configuration, modify it, and pass the result back. Enabling the blob soft delete retention policy here is the prerequisite for `undeleteBlob`; container soft delete is a storage account setting, enabled on the account rather than through the service properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | <code>ServiceProperties</code> | Yes | The configuration groups to apply. See [ServiceProperties](#serviceproperties). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->setServiceProperties({
    deleteRetentionPolicy: {enabled: true, days: 7}
});
```

</div>

</details>

<details>
<summary>getAccountInfo</summary>

<div>

Reads the storage account's SKU, kind, and whether it has a hierarchical namespace. On hierarchical namespace accounts (Azure Data Lake Storage Gen2) directories are real and renames exist through a different endpoint; the connector models neither.

**Returns:** `AccountInfo|Error`

**Sample code:**

```ballerina
blob:AccountInfo info = check admin->getAccountInfo();
```

**Sample response:**

```ballerina
{
    skuName: "Standard_LRS",
    accountKind: "StorageV2",
    isHierarchicalNamespaceEnabled: false
}
```

</div>

</details>

#### User delegation key and account SAS

`generateAccountSas` is an ordinary method that signs locally without a service call; invoke it with `.` rather than `->`.

<details>
<summary>getUserDelegationKey</summary>

<div>

Obtains a key for signing user-delegation SAS tokens; the key is valid at most 7 days, and the tokens signed with it cannot outlive it. This operation requires a Microsoft Entra ID credential whose identity holds the `generateUserDelegationKey` action at storage account scope or wider, which `Storage Blob Delegator` or any blob data role assigned there grants; any other credential, or an identity without the action, fails with an `AuthorizationError`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `startTime` | <code>time:Utc</code> | Yes | When the key becomes valid. |
| `expiryTime` | <code>time:Utc</code> | Yes | When the key expires; at most 7 days after `startTime`. |

**Returns:** `UserDelegationKey|Error`

**Sample code:**

```ballerina
blob:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
```

**Sample response:**

```ballerina
{
    signedObjectId: "3d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a",
    signedTenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
    signedStart: [1770307200, 0.0],
    signedExpiry: [1770393600, 0.0],
    signedService: "b",
    signedVersion: "2025-05-05",
    value: "aGVsbG8gd29ybGQ="
}
```

</div>

</details>

<details>
<summary>generateAccountSas</summary>

<div>

Mints an account-level SAS (Shared Access Signature) token, signed locally with the account key; the client must hold shared key credentials (or a connection string carrying an account key), and any other credential fails with a client-side `Error`. The signature values select the covered services (`blob`, `queue`), the resource types, the permissions, and the validity window. An account SAS covering the blob and queue services, the `container` and `'object` resource types, and the permissions `read`, `add`, `create`, `update`, and `process` is the credential a `Listener` needs; see the [Trigger Reference](trigger-reference.md). Rotating the account key revokes every SAS minted from it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>AccountSasSignatureValues</code> | Yes | The values signed into the token (services, resource types, permissions, window). See [AccountSasSignatureValues](#accountsassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check admin.generateAccountSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true},
    services: {blob: true},
    resourceTypes: {'service: true, container: true, 'object: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&ss=b&srt=sco&sp=rl&se=2026-08-06T10%3A00%3A00Z&sig=Bv3k..."
```

</div>

</details>

---

## Supporting types

The option, SAS, and result records used by the operations above, documented once.

### ContentHeaders

A blob's standard content headers. Written as a whole set: a field omitted from the record is cleared on the blob.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentType` | <code>string</code> | Optional | The media type of the blob's content. |
| `contentEncoding` | <code>string</code> | Optional | The content encoding applied to the blob. |
| `contentLanguage` | <code>string</code> | Optional | The natural language of the blob's content. |
| `contentDisposition` | <code>string</code> | Optional | How a user agent should present the content. |
| `cacheControl` | <code>string</code> | Optional | The caching directives for the blob. |
| `contentMd5` | <code>string</code> | Optional | The MD5 hash of the blob's content. |

### ByteRange

A byte range, with inclusive start and end offsets.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `startByte` | <code>int</code> | Required | The first byte of the range. |
| `endByte` | <code>int</code> | Required | The last byte of the range. |

### LeaseOptions

The lease a write must carry. Included by every option record of a lease-guarded write.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the target is leased. |

### ContainerListOptions

Options for `AdminClient.listContainers`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `prefix` | <code>string</code> | Optional | Return only containers whose name begins with this prefix. |
| `includeMetadata` | <code>boolean</code> | <code>false</code> | Include each container's metadata. |
| `includeDeleted` | <code>boolean</code> | <code>false</code> | Include soft-deleted containers. |
| `'limit` | <code>int</code> | Optional | The maximum number of containers to return; omit for all. |
| `marker` | <code>string</code> | Optional | Resume from a previous `ContainerList.nextMarker`. |

### ContainerCreateOptions

Options for `AdminClient.createContainer`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | Optional | The container's initial metadata. |
| `publicAccess` | <code>PublicAccess</code> | Optional | The anonymous access level. Omit to create a private container. Anonymous access also requires the storage account to permit it. |

### DeleteContainerOptions

Options for `AdminClient.deleteContainer`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the container is leased. |

### ContainerMetadataOptions

Options for `Client.setContainerMetadata`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, when the container is leased. |

### AccessPolicyOptions

Options for `Client.setPublicAccess` and `Client.setContainerAccessPolicy`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, when the container is leased. |

### BlobListOptions

Options for `Client.listBlobs`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `prefix` | <code>string</code> | Optional | Return only blobs whose name begins with this prefix. |
| `delimiter` | <code>string</code> | Optional | Group names that extend past this delimiter into a single prefix entry. |
| `includeMetadata` | <code>boolean</code> | <code>false</code> | Include each blob's metadata. |
| `includeTags` | <code>boolean</code> | <code>false</code> | Include each blob's index tags. |
| `includeSnapshots` | <code>boolean</code> | <code>false</code> | Include blob snapshots. |
| `includeDeleted` | <code>boolean</code> | <code>false</code> | Include soft-deleted blobs. |

### BlobPageOptions

Options for `Client.listBlobsPage`: every [BlobListOptions](#bloblistoptions) field, plus the page size and marker.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pageSize` | <code>int</code> | Optional | The maximum number of blobs in the page, up to the service maximum of 5,000. |
| `marker` | <code>string</code> | Optional | Resume from a previous `BlobList.nextMarker`. |

### DeleteBlobOptions

Options for `Client.deleteBlob`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |
| `deleteSnapshots` | <code>DeleteSnapshotsOption</code> | Optional | What happens to the blob's snapshots (`INCLUDE` or `ONLY_SNAPSHOTS`). Required when the blob has snapshots. |
| `snapshotId` | <code>string</code> | Optional | Deletes this snapshot instead of the blob. |

### BlobMetadataOptions

Options for `Client.setBlobMetadata`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### ContentHeaderOptions

Options for `Client.setContentHeaders`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### UploadOptions

Options for `Client.uploadFromFile` and `Client.commitBlockList` (`upload` takes [UploadContentOptions](#uploadcontentoptions)).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the destination blob is leased. |
| `contentHeaders` | <code>ContentHeaders</code> | Optional | The content headers stored with the new blob. |
| `metadata` | <code>map&lt;string&gt;</code> | Optional | The metadata stored with the new blob. |
| `tags` | <code>map&lt;string&gt;</code> | Optional | The index tags stored with the new blob. |
| `accessTier` | <code>AccessTier</code> | Optional | The access tier the new blob starts in. |

### UploadContentOptions

Options for `Client.upload`: every [UploadOptions](#uploadoptions) field, plus the serialization format override.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fileFormat` | <code>FileFormat</code> | Optional | The serialization format for structured content: `JSON`, `XML`, or `CSV`. When absent, the format is inferred from the destination path's extension (`.json`, `.xml`, `.csv`). |

### DownloadOptions

Options for `Client.download`, included by `getBlob`'s `GetBlobOptions`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `range` | <code>ByteRange</code> | Optional | Reads only this byte range of the blob. |
| `snapshotId` | <code>string</code> | Optional | Reads this snapshot instead of the live blob. |

### GetBlobOptions

Options for `Client.getBlob`: every [DownloadOptions](#downloadoptions) field, plus the binding format override.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fileFormat` | <code>FileFormat</code> | Optional | The binding format for record targets: `JSON`, `XML`, or `CSV`. When absent, the format is inferred from the path's extension (`.json`, `.xml`, `.csv`). |

### CopyOptions

Options for `Client.copyBlob` and `Client.copyBlobFromUrl`. An asynchronous copy over a leased destination requires that lease to be infinite.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The destination's active lease id, required when the destination is leased. |
| `metadata` | <code>map&lt;string&gt;</code> | Optional | The metadata stored with the destination blob; when omitted, the destination inherits the source's metadata. |
| `tags` | <code>map&lt;string&gt;</code> | Optional | The index tags stored with the destination blob. |
| `accessTier` | <code>AccessTier</code> | Optional | The access tier the destination blob starts in. |

### AbortCopyOptions

Options for `Client.abortCopy`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The destination's active lease id, required when the destination is leased. |

### SetAccessTierOptions

Options for `Client.setAccessTier`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |
| `rehydratePriority` | <code>RehydratePriority</code> | Optional | How quickly an archived blob is rehydrated; meaningful when leaving the archive tier. |

### TagOptions

Options for `Client.setTags`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### CreateSnapshotOptions

Options for `Client.createSnapshot`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id; not required on a leased blob, but checked when given. |
| `metadata` | <code>map&lt;string&gt;</code> | Optional | The snapshot's own metadata; when omitted, the snapshot inherits the blob's metadata. |

### CreateBlobOptions

Options for `Client.createAppendBlob` and `Client.createPageBlob`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |
| `contentHeaders` | <code>ContentHeaders</code> | Optional | The content headers stored with the new blob. |
| `metadata` | <code>map&lt;string&gt;</code> | Optional | The metadata stored with the new blob. |
| `tags` | <code>map&lt;string&gt;</code> | Optional | The index tags stored with the new blob. |

### AppendBlockOptions

Options for `Client.appendBlock` and `Client.appendBlockFromUrl`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### PageOptions

Options for `Client.uploadPages` and `Client.clearPages`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### PageRangeOptions

Options for `Client.listPageRanges`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `range` | <code>ByteRange</code> | Optional | Restricts the listing to this byte range. |
| `snapshotId` | <code>string</code> | Optional | Lists the ranges of this snapshot instead of the live blob. |

### StageBlockOptions

Options for `Client.stageBlock`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |

### StageBlockFromUrlOptions

Options for `Client.stageBlockFromUrl`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `leaseId` | <code>string</code> | Optional | The active lease id, required when the blob is leased. |
| `sourceRange` | <code>ByteRange</code> | Optional | Stages only this byte range of the source instead of its whole content. |

### ContainerSasSignatureValues

The values signed into a container SAS token, for `Client.generateContainerSas` and `Client.generateContainerUserDelegationSas`. A parameter may be carried by the stored access policy or by the token, but not both; a parameter set in both places fails at use time with HTTP 400.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | Optional | When the token expires. May be omitted only when `identifier` supplies it. |
| `identifier` | <code>string</code> | Optional | A stored access policy on the container whose window and permissions the token inherits. Not valid for the user delegation variants, which reject it. |
| `startTime` | <code>time:Utc</code> | Optional | When the token becomes valid; omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | Optional | The protocols a request presenting the token may use. |
| `ipRange` | <code>string</code> | Optional | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |
| `permissions` | <code>ContainerSasPermissions</code> | Optional | The permissions granted. May be omitted only when `identifier` supplies them. |

Generation fails with an `Error` when no `identifier` is supplied and the `expiryTime` or the `permissions` are missing.

### ContainerSasPermissions

The permissions granted by a container SAS: the blob permissions, plus listing and tag queries. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read the blob's content, properties, and metadata. |
| `add` | <code>boolean</code> | <code>false</code> | Append a block to the append blob. |
| `create` | <code>boolean</code> | <code>false</code> | Create the blob. |
| `write` | <code>boolean</code> | <code>false</code> | Write the blob's content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete the blob. |
| `tag` | <code>boolean</code> | <code>false</code> | Read and write the blob's index tags. |
| `list` | <code>boolean</code> | <code>false</code> | List the container's blobs. |
| `filter` | <code>boolean</code> | <code>false</code> | Run an index-tag query. |

### BlobSasSignatureValues

The values signed into a blob SAS token, for `Client.generateSas` and `Client.generateUserDelegationSas`. A parameter may be carried by the stored access policy or by the token, but not both; a parameter set in both places fails at use time with HTTP 400.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | Optional | When the token expires. May be omitted only when `identifier` supplies it. |
| `identifier` | <code>string</code> | Optional | A stored access policy on the container whose window and permissions the token inherits. Not valid for the user delegation variants, which reject it. |
| `startTime` | <code>time:Utc</code> | Optional | When the token becomes valid; omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | Optional | The protocols a request presenting the token may use. |
| `ipRange` | <code>string</code> | Optional | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |
| `permissions` | <code>BlobSasPermissions</code> | Optional | The permissions granted. May be omitted only when `identifier` supplies them. |

Generation fails with an `Error` when no `identifier` is supplied and the `expiryTime` or the `permissions` are missing.

### BlobSasPermissions

The permissions granted by a blob SAS. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read the blob's content, properties, and metadata. |
| `add` | <code>boolean</code> | <code>false</code> | Append a block to the append blob. |
| `create` | <code>boolean</code> | <code>false</code> | Create the blob. |
| `write` | <code>boolean</code> | <code>false</code> | Write the blob's content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete the blob. |
| `tag` | <code>boolean</code> | <code>false</code> | Read and write the blob's index tags. |

### AccountSasSignatureValues

The values signed into an account-level SAS token, for `AdminClient.generateAccountSas`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | Required | When the token expires. |
| `permissions` | <code>AccountSasPermissions</code> | Required | The permissions granted. |
| `services` | <code>AccountSasServices</code> | Required | The services the token covers. |
| `resourceTypes` | <code>AccountSasResourceTypes</code> | Required | The resource types the token covers. |
| `startTime` | <code>time:Utc</code> | Optional | When the token becomes valid; omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | Optional | The protocols a request presenting the token may use. |
| `ipRange` | <code>string</code> | Optional | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |

### AccountSasPermissions

The permissions granted by an account-level SAS. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read content, properties, and metadata. |
| `write` | <code>boolean</code> | <code>false</code> | Write content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete resources. |
| `list` | <code>boolean</code> | <code>false</code> | List containers and their blobs. |
| `add` | <code>boolean</code> | <code>false</code> | Add content (append-style operations). |
| `create` | <code>boolean</code> | <code>false</code> | Create new resources. |
| `update` | <code>boolean</code> | <code>false</code> | Update a queued message; required by the `Listener`. |
| `process` | <code>boolean</code> | <code>false</code> | Get and delete queued messages; required by the `Listener`. |
| `tag` | <code>boolean</code> | <code>false</code> | Read and write blob index tags. |
| `filter` | <code>boolean</code> | <code>false</code> | Query blobs by their index tags. |

### AccountSasServices

The storage services an account SAS covers.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `blob` | <code>boolean</code> | <code>false</code> | The blob service. |
| `queue` | <code>boolean</code> | <code>false</code> | The queue service; enable it for a `Listener` credential. |

### AccountSasResourceTypes

The resource types an account SAS covers.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `'service` | <code>boolean</code> | <code>false</code> | Service-level operations, such as reading the service properties. |
| `container` | <code>boolean</code> | <code>false</code> | Container-level operations, such as creating or listing containers. |
| `'object` | <code>boolean</code> | <code>false</code> | Object-level operations on a blob. |

### ContainerInfo

A container as returned by `AdminClient.listContainers`.

| Field | Type | Description |
|-------|------|-------------|
| `name` | <code>string</code> | The container name. |
| `lastModified` | <code>time:Utc</code> | When the container was last modified. |
| `eTag` | <code>string</code> | The container's entity tag. |
| `publicAccess` | <code>PublicAccess</code> | The anonymous access level. |
| `leaseState` | <code>LeaseState</code> | The lease state. |
| `leaseStatus` | <code>LeaseStatus</code> | Whether the container is locked by a lease. |
| `leaseDuration` | <code>LeaseDuration?</code> | Whether a held lease is fixed-duration or infinite, or `()` when no lease is held. |
| `metadata` | <code>map&lt;string&gt;</code> | The container's metadata; present only when the listing requested it. |
| `isDeleted` | <code>boolean</code> | Whether the container is soft-deleted; present only on soft-deleted entries. |
| `deletedVersion` | <code>string</code> | The restore version of a soft-deleted container; pass to `AdminClient.undeleteContainer`. |
| `deletedTime` | <code>time:Utc</code> | When the container was deleted; present only on soft-deleted entries. |
| `remainingRetentionDays` | <code>int</code> | Days remaining before the soft-deleted container is purged. |

### ContainerList

The result of `AdminClient.listContainers`.

| Field | Type | Description |
|-------|------|-------------|
| `containers` | <code>ContainerInfo[]</code> | The containers returned. |
| `nextMarker` | <code>string</code> | The marker to resume the listing from; present only when more containers remain. |

### ContainerProperties

The bound container's properties and metadata, as returned by `Client.getContainerProperties`.

| Field | Type | Description |
|-------|------|-------------|
| `lastModified` | <code>time:Utc</code> | When the container was last modified. |
| `eTag` | <code>string</code> | The container's entity tag. |
| `publicAccess` | <code>PublicAccess</code> | The anonymous access level. |
| `metadata` | <code>map&lt;string&gt;</code> | The container's complete metadata set. |
| `leaseState` | <code>LeaseState</code> | The lease state. |
| `leaseStatus` | <code>LeaseStatus</code> | Whether the container is locked by a lease. |
| `leaseDuration` | <code>LeaseDuration?</code> | Whether a held lease is fixed-duration or infinite, or `()` when no lease is held. |
| `hasImmutabilityPolicy` | <code>boolean</code> | Whether an immutability policy is set on the container. |
| `hasLegalHold` | <code>boolean</code> | Whether a legal hold is set on the container. |

### SignedIdentifier

One stored access policy: a validity window and a permission string under an identifier.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | <code>string</code> | Required | The identifier a SAS token references to inherit this policy. |
| `startTime` | <code>time:Utc</code> | Optional | When the policy becomes valid. |
| `expiryTime` | <code>time:Utc</code> | Optional | When the policy expires. |
| `permissions` | <code>string</code> | Optional | The permissions the policy grants, as the wire's permission string. |

### ContainerAccessPolicy

A container's anonymous access level and its stored access policies, as returned by `Client.getContainerAccessPolicy`.

| Field | Type | Description |
|-------|------|-------------|
| `access` | <code>PublicAccess</code> | The anonymous access level. |
| `identifiers` | <code>SignedIdentifier[]</code> | The stored access policies, at most five. |

### BlobEntry

One entry of a blob listing, as returned by `Client.listBlobs` and inside `BlobList`. In the hierarchical mode an entry whose `isPrefix` is set is a collapsed group of names rather than a blob.

| Field | Type | Description |
|-------|------|-------------|
| `path` | <code>string</code> | The blob's container-relative path, which feeds the path-taking operations directly. |
| `isPrefix` | <code>boolean</code> | Whether this entry is a collapsed prefix rather than a blob; `false` by default. |
| `contentLength` | <code>int</code> | The blob's size in bytes; absent on prefix entries. |
| `lastModified` | <code>time:Utc</code> | When the blob was last modified. |
| `eTag` | <code>string</code> | The blob's entity tag. |
| `blobType` | <code>string</code> | The blob type (`BlockBlob`, `AppendBlob`, or `PageBlob`). |
| `accessTier` | <code>string</code> | The blob's access tier, as the wire's string. |
| `metadata` | <code>map&lt;string&gt;</code> | The blob's metadata; present only when the listing requested it. |
| `tags` | <code>map&lt;string&gt;</code> | The blob's index tags; present only when the listing requested it. |
| `snapshotId` | <code>string</code> | The snapshot identifier; present on snapshot entries. |
| `isDeleted` | <code>boolean</code> | Whether the blob is soft-deleted; present on soft-deleted entries. |

### BlobList

One page of a blob listing, as returned by `Client.listBlobsPage`.

| Field | Type | Description |
|-------|------|-------------|
| `blobs` | <code>BlobEntry[]</code> | The blobs returned. |
| `nextMarker` | <code>string</code> | The marker to resume the listing from; present only when more blobs remain. |

### BlobProperties

A blob's properties, metadata, and the state of its most recent copy, as returned by `Client.getBlobProperties`.

| Field | Type | Description |
|-------|------|-------------|
| `lastModified` | <code>time:Utc</code> | When the blob was last modified. |
| `createdTime` | <code>time:Utc</code> | When the blob was created. |
| `eTag` | <code>string</code> | The blob's entity tag. |
| `contentLength` | <code>int</code> | The blob's size in bytes. |
| `contentHeaders` | <code>ContentHeaders</code> | The blob's content headers. |
| `metadata` | <code>map&lt;string&gt;</code> | The blob's complete metadata set. |
| `blobType` | <code>string</code> | The blob type (`BlockBlob`, `AppendBlob`, or `PageBlob`). |
| `accessTier` | <code>string</code> | The access tier, as the wire's string, since the service's tier set is open-ended. |
| `accessTierInferred` | <code>boolean</code> | Whether the tier was inferred rather than set explicitly; present whenever the blob has a tier. |
| `archiveStatus` | <code>string</code> | The rehydration state, set while a rehydration from the archive tier is pending. |
| `leaseState` | <code>LeaseState</code> | The lease state. |
| `leaseStatus` | <code>LeaseStatus</code> | Whether the blob is locked by a lease. |
| `leaseDuration` | <code>LeaseDuration?</code> | Whether a held lease is fixed-duration or infinite, or `()` when no lease is held. |
| `copyStatus` | <code>CopyStatusInfo</code> | The most recent copy operation; absent when the blob was never a copy destination. |
| `blobSequenceNumber` | <code>int</code> | The page blob's write sequence marker; present only on page blobs. |
| `committedBlockCount` | <code>int</code> | The append blob's committed block count; present only on append blobs. |

### CopyStatusInfo

The state of a blob's most recent copy operation, carried by `BlobProperties.copyStatus`.

| Field | Type | Description |
|-------|------|-------------|
| `copyId` | <code>string</code> | The identifier of the copy operation. |
| `copyStatus` | <code>CopyStatus</code> | The copy's state. |
| `copySource` | <code>string</code> | The URL the content was copied from. |
| `copyProgress` | <code>string</code> | The bytes copied so far, as `copied/total`. |
| `copyCompletionTime` | <code>time:Utc</code> | When the copy completed. |
| `copyStatusDescription` | <code>string</code> | The service's description of a failed or aborted copy. |

### CopyInfo

The identifier and state of a copy at the moment the service accepted it, as returned by `Client.copyBlob` and `Client.copyBlobFromUrl`.

| Field | Type | Description |
|-------|------|-------------|
| `copyId` | <code>string</code> | The identifier of the copy operation, which `abortCopy` cancels. |
| `copyStatus` | <code>CopyStatus</code> | The copy's state at acceptance, which may already be `SUCCESS` for a small copy. |

### TaggedBlobEntry

One blob matched by an index-tag query, as returned by `Client.findBlobsByTags`.

| Field | Type | Description |
|-------|------|-------------|
| `path` | <code>string</code> | The blob's container-relative path. |
| `tags` | <code>map&lt;string&gt;</code> | The blob's index tags. |

### PageRange

One written byte range of a page blob, as returned by `Client.listPageRanges`.

| Field | Type | Description |
|-------|------|-------------|
| `offset` | <code>int</code> | The range's start offset in bytes. |
| `length` | <code>int</code> | The range's length in bytes. |

### BlockInfo

One block of a block blob.

| Field | Type | Description |
|-------|------|-------------|
| `blockId` | <code>string</code> | The block's base64 identifier. |
| `sizeBytes` | <code>int</code> | The block's size in bytes. |

### BlockList

A block blob's committed and staged blocks, as returned by `Client.listBlocks`.

| Field | Type | Description |
|-------|------|-------------|
| `committedBlocks` | <code>BlockInfo[]</code> | The blocks that make up the blob's current content. |
| `uncommittedBlocks` | <code>BlockInfo[]</code> | The blocks staged but not yet committed. |

### ServiceProperties

The account's blob service configuration, as returned by `AdminClient.getServiceProperties` and taken by `setServiceProperties`. A group present in the record replaces that group whole; a group absent is left unchanged.

| Field | Type | Description |
|-------|------|-------------|
| `hourMetrics` | <code>MetricsProperties</code> | Hourly request-metrics collection. |
| `minuteMetrics` | <code>MetricsProperties</code> | Per-minute request-metrics collection. |
| `logging` | <code>LoggingProperties</code> | Classic request logging. |
| `cors` | <code>CorsRule[]</code> | The CORS rules; an empty array deletes every rule. |
| `deleteRetentionPolicy` | <code>RetentionPolicy</code> | The blob soft-delete retention policy, the prerequisite for `undeleteBlob`. |
| `staticWebsite` | <code>StaticWebsiteProperties</code> | The static website settings. |
| `defaultServiceVersion` | <code>string</code> | The service version applied to requests that do not name one. |

### MetricsProperties

Request-metrics collection for the blob service.

| Field | Type | Description |
|-------|------|-------------|
| `version` | <code>string</code> | The metrics configuration version. |
| `enabled` | <code>boolean</code> | Whether metrics collection is enabled. |
| `includeApis` | <code>boolean</code> | Whether per-API metrics are collected. |
| `retentionPolicy` | <code>RetentionPolicy</code> | How long the metrics data is retained. |

### LoggingProperties

Classic request logging for the blob service.

| Field | Type | Description |
|-------|------|-------------|
| `version` | <code>string</code> | The logging configuration version. |
| `read` | <code>boolean</code> | Whether read requests are logged. |
| `write` | <code>boolean</code> | Whether write requests are logged. |
| `delete` | <code>boolean</code> | Whether delete requests are logged. |
| `retentionPolicy` | <code>RetentionPolicy</code> | How long the log data is retained. |

### RetentionPolicy

How long soft-deleted blobs, or metrics and log data, are retained.

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | <code>boolean</code> | Whether the retention policy is enabled. |
| `days` | <code>int</code> | The number of days a deleted resource is retained. |

### CorsRule

One cross-origin resource sharing rule of the blob service.

| Field | Type | Description |
|-------|------|-------------|
| `allowedOrigins` | <code>string[]</code> | The origins allowed to make cross-origin requests. |
| `allowedMethods` | <code>string[]</code> | The HTTP methods allowed in cross-origin requests. |
| `allowedHeaders` | <code>string[]</code> | The request headers the origin may specify. |
| `exposedHeaders` | <code>string[]</code> | The response headers exposed to the client. |
| `maxAgeInSeconds` | <code>int</code> | How long a browser may cache the preflight response, in seconds. |

### StaticWebsiteProperties

The account's static website settings. The connector offers no operations against the static website endpoint itself.

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | <code>boolean</code> | Whether static website hosting is enabled. |
| `indexDocument` | <code>string</code> | The blob served for a directory request. |
| `errorDocument404Path` | <code>string</code> | The blob served when a request matches nothing. |
| `defaultIndexDocumentPath` | <code>string</code> | The default index document path. |

### AccountInfo

The storage account's SKU, kind, and namespace type, as returned by `AdminClient.getAccountInfo`.

| Field | Type | Description |
|-------|------|-------------|
| `skuName` | <code>string</code> | The account's SKU name (e.g. `Standard_LRS`). |
| `accountKind` | <code>string</code> | The account kind (e.g. `StorageV2`). |
| `isHierarchicalNamespaceEnabled` | <code>boolean</code> | Whether the account has a hierarchical namespace (Azure Data Lake Storage Gen2), on which directories are real and renames exist through a different endpoint. |

### UserDelegationKey

A key for signing user-delegation SAS tokens, obtained from `AdminClient.getUserDelegationKey`.

| Field | Type | Description |
|-------|------|-------------|
| `signedObjectId` | <code>string</code> | The object ID of the Entra ID identity the key was issued to. |
| `signedTenantId` | <code>string</code> | The tenant the identity belongs to. |
| `signedStart` | <code>time:Utc</code> | When the key becomes valid. |
| `signedExpiry` | <code>time:Utc</code> | When the key expires; tokens signed with it cannot outlive this. |
| `signedService` | <code>string</code> | The service the key applies to. |
| `signedVersion` | <code>string</code> | The service version that issued the key. |
| `value` | <code>string</code> | The key value used to sign tokens. |

### Enums

- `AccessTier`: `HOT` (`"Hot"`), `COOL` (`"Cool"`), `COLD` (`"Cold"`), `ARCHIVE` (`"Archive"`). The tiers the connector sets on a blob; the tier a blob reports is a plain `string`, because the service's tier set is open-ended.
- `RehydratePriority`: `STANDARD` (`"Standard"`, documented at up to fifteen hours), `HIGH` (`"High"`, typically under one hour).
- `PublicAccess`: `PRIVATE` (`"private"`), `BLOB` (`"blob"`, anonymous read access to blobs), `CONTAINER` (`"container"`, anonymous read access to blobs and anonymous listing of the container).
- `DeleteSnapshotsOption`: `INCLUDE` (`"include"`, delete the blob together with its snapshots), `ONLY_SNAPSHOTS` (`"only"`, delete only the snapshots, keeping the blob).
- `FileFormat`: `JSON`, `XML`, `CSV`.
- `CopyStatus`: `PENDING` (`"pending"`), `SUCCESS` (`"success"`), `ABORTED` (`"aborted"`), `FAILED` (`"failed"`).
- `LeaseState`: `AVAILABLE` (`"available"`), `LEASED` (`"leased"`), `EXPIRED` (`"expired"`), `BREAKING` (`"breaking"`), `BROKEN` (`"broken"`).
- `LeaseStatus`: `LOCKED` (`"locked"`), `UNLOCKED` (`"unlocked"`).
- `LeaseDuration`: `INFINITE` (`"infinite"`), `FIXED` (`"fixed"`).
- `SasProtocol`: `HTTPS` (`"https"`), `HTTPS_HTTP` (`"https,http"`).
- `EntraIdKind`: `DEFAULT_AZURE_CREDENTIAL` (`"default"`), `MANAGED_IDENTITY` (`"managed-identity"`).
- `RetryPolicyType`: `EXPONENTIAL` (`"exponential"`), `FIXED_INTERVAL` (`"fixed"`).
- `ProxyType`: `HTTP`, `SOCKS4`, `SOCKS5`.

### Errors

Every operation returns the module's `Error` on failure. The hierarchy splits by origin:

- **`Error`**: the root type, and the type of every client-side failure (invalid configuration, local I/O, content that fails to bind or serialize, a value refused by a local check). It carries no detail fields. The listener adds three direct subtypes that are never mapped from an Azure error code: `ContentBindingError` (a blob's content could not be bound to a handler's parameter type; its detail carries `containerName`, `path`, and, when the content was already read into memory, `content`), and `DeadLetterError` and `RetryError` (returned by a handler to steer settlement). See the [Trigger Reference](trigger-reference.md).
- **`ServiceError`**: any error the Azure service raised, always carrying `httpStatus` and `errorCode` in its detail. Its subtypes are `NotFoundError` (404), `ConflictError` (409), `AuthorizationError` (403), `PreconditionFailedError` (412), `RangeNotSatisfiableError` (416), `ArchivedBlobError` (409, the blob is still archived or currently rehydrating), and `InvalidBlobTypeError` (409, the operation applies to another blob type). An unmapped service code lands on the generic `ServiceError`.

The mapping keys on the Azure error-code string rather than the HTTP status alone, so `BlobArchived`, `BlobBeingRehydrated`, and `InvalidBlobType` (each 409) become their own types while a state conflict such as `ContainerAlreadyExists` (also 409) becomes a `ConflictError`. Check the more specific error types before the general ones.
