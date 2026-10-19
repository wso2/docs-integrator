---
title: Actions
---

# Actions

The `ballerinax/azure.storage.files` package connects to Microsoft Azure Files. It exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Operations within one share, bound at initialization. |
| [`AdminClient`](#adminclient) | Account-level share management and service configuration. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Operates on a single file share, bound at initialization, and on the directories and files within it.

### Configuration

Both clients take a `ClientConfiguration`. Credentials come from the [Setup Guide](setup-guide.md).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthConfig</code> | Required | The authentication configuration: one credential-artifact record (an account key, a bare SAS token, a full SAS URL, a connection string, or a Microsoft Entra ID identity). |
| `retryConfig` | <code>RetryConfig</code> | <code>()</code> | Retry behavior for service requests; omit for the service defaults. |
| `transportConfig` | <code>TransportConfig</code> | <code>()</code> | HTTP transport settings (proxy, connection pool, TLS); omit for the defaults. |

`AuthConfig` is a union of the credential records below. Each member has a unique required field or field combination, so the right member is selected by the fields you supply. The only exception is the pair `DefaultEntraIdConfig` and `ManagedIdentityConfig`, which would otherwise share the same field shape; these two, and only these two, carry a `kind` discriminator field. The other Entra ID records have no `kind` field.

**`SharedKeyConfig`**, Shared Key authentication using one of the storage account's access keys:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name, used to sign requests and to derive the service URL. |
| `accountKey` | <code>string</code> | Required | A base64-encoded access key of the storage account. |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`SasConfig`**, Shared Access Signature (SAS) authentication with a bare SAS token:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The name of the storage account the token belongs to (determines the service URL). |
| `sasToken` | <code>string</code> | Required | A SAS token scoped to the required resources and permissions. |

**`SasUrlConfig`**, SAS authentication with a full SAS URL, which carries the service URL and the SAS token in one string, as issued by the Azure portal:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sasUrl` | <code>string</code> | Required | A full file-service SAS URL, including the scheme and the SAS query string (e.g. <code>https://&#123;account&#125;.file.core.windows.net/?sv=...&sig=...</code>). |

**`ConnectionStringConfig`**, connection-string authentication. The connection string carries the account name, the credential (an account key or a SAS token), and the service endpoints:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | <code>string</code> | Required | An Azure Storage connection string, as issued by the Azure portal, the Azure CLI, or infrastructure tooling. |

`EntraIdConfig` is itself a union of five records, one per Microsoft Entra ID credential kind. The identity must hold the `Storage File Data Privileged Reader` or `Storage File Data Privileged Contributor` role.

**`DefaultEntraIdConfig`**, authentication through the default credential chain. The chain tries the environment, a managed identity, and developer sign-ins (Azure CLI, IDE accounts) in turn, so one configuration works both locally and when deployed:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `kind` | <code>DEFAULT_AZURE_CREDENTIAL</code> | Required | Selects the default credential chain (the value `"default"`). |
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`ManagedIdentityConfig`**, authentication as an Azure managed identity, for workloads running on Azure compute (VMs, App Service, AKS, Functions):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `kind` | <code>MANAGED_IDENTITY</code> | Required | Selects the managed-identity credential (the value `"managed-identity"`). |
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `clientId` | <code>string</code> | <code>()</code> | The client id of a user-assigned managed identity; omit to use the system-assigned identity. |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`ClientSecretConfig`**, authentication as a service principal with a client secret:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant (directory) id. |
| `clientId` | <code>string</code> | Required | The application (client) id of the service principal. |
| `clientSecret` | <code>string</code> | Required | The client secret of the service principal. |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`ClientCertificateConfig`**, authentication as a service principal with a client certificate:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant (directory) id. |
| `clientId` | <code>string</code> | Required | The application (client) id of the service principal. |
| `certificatePath` | <code>string</code> | Required | The path to the certificate file (PEM, or PFX when `certificatePassword` is set). |
| `certificatePassword` | <code>string</code> | <code>()</code> | The password protecting the certificate file, when it has one. |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`WorkloadIdentityConfig`**, workload-identity authentication, for Kubernetes workloads federated with Entra ID:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountName` | <code>string</code> | Required | The storage account name (determines the service URL unless `serviceUrl` overrides it). |
| `tenantId` | <code>string</code> | Required | The Entra ID tenant (directory) id. |
| `clientId` | <code>string</code> | Required | The application (client) id federated with the workload. |
| `tokenFilePath` | <code>string</code> | Required | The path to the file holding the federated service-account token. |
| `serviceUrl` | <code>string</code> | <code>()</code> | The file service endpoint URL, including the scheme. Omit to use the default <code>https://&#123;accountName&#125;.file.core.windows.net</code>. |

**`RetryConfig`**, retry behavior for service requests:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `retryPolicyType` | <code>RetryPolicyType</code> | <code>EXPONENTIAL</code> | How the delay between tries grows (`EXPONENTIAL` or `FIXED_INTERVAL`). |
| `maxTries` | <code>int</code> | <code>4</code> | The maximum number of tries (the first attempt plus retries). |
| `tryTimeoutSeconds` | <code>decimal</code> | <code>60</code> | The timeout applied to each individual try, in seconds. |
| `retryDelaySeconds` | <code>decimal</code> | <code>4</code> | The base delay between tries, in seconds. |
| `maxRetryDelaySeconds` | <code>decimal</code> | <code>120</code> | The upper bound on the delay between tries, in seconds. |
| `secondaryHostUrl` | <code>string</code> | <code>()</code> | A secondary endpoint to retry reads against (geo-redundant accounts). |

**`TransportConfig`**, HTTP transport settings, proxying, connection pooling, and TLS:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `proxy` | <code>ProxyConfig</code> | <code>()</code> | Route traffic through this proxy. |
| `connectionPool` | <code>ConnectionPoolConfig</code> | <code>&#123;&#125;</code> | Connection-pool tuning. |
| `secureSocket` | <code>SecureSocket</code> | <code>()</code> | Custom TLS settings (trust and key material, verification). |

**`ProxyConfig`**, routes the connector's traffic through a proxy server:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `proxyType` | <code>ProxyType</code> | Required | The proxy protocol (`HTTP`, `SOCKS4`, or `SOCKS5`). |
| `host` | <code>string</code> | Required | The proxy host name or IP address. |
| `port` | <code>int</code> | Required | The proxy port. |
| `username` | <code>string</code> | <code>()</code> | The user name, when the proxy requires authentication. |
| `password` | <code>string</code> | <code>()</code> | The password, when the proxy requires authentication. |
| `nonProxyHosts` | <code>string[]</code> | <code>[]</code> | Hosts reached directly, bypassing the proxy. |

**`ConnectionPoolConfig`**, tunes the connector's HTTP connection pool:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `maxConnections` | <code>int</code> | <code>50</code> | The maximum number of concurrent connections. |
| `idleTimeoutSeconds` | <code>decimal</code> | <code>60</code> | How long an idle connection is kept before being closed, in seconds. |
| `connectTimeoutSeconds` | <code>decimal</code> | <code>10</code> | The timeout for establishing a connection, in seconds. |
| `readTimeoutSeconds` | <code>decimal</code> | <code>60</code> | The timeout for reading a response, in seconds. |

**`SecureSocket`**, custom TLS settings for the connection to the service:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `cert` | <code>crypto:TrustStore&#124;string</code> | <code>()</code> | The trust material for verifying the server: a PKCS12 or JKS truststore, or the path to a PEM certificate file. Omit to trust the platform's default certificate authorities. |
| `'key` | <code>crypto:KeyStore&#124;CertKey</code> | <code>()</code> | The client's own identity for mutual TLS: a PKCS12 or JKS keystore, or a certificate and private key pair. Omit when the server does not request a client certificate. |
| `tlsVersions` | <code>string[]</code> | <code>()</code> | The TLS versions offered during the handshake (e.g. `TLSv1.3`, `TLSv1.2`). Omit to use the platform defaults. |
| `ciphers` | <code>string[]</code> | <code>()</code> | The cipher suites offered during the handshake. Omit to use the platform defaults. |
| `verifyHostName` | <code>boolean</code> | <code>true</code> | Verify that the server certificate matches the host being called. Disabling this removes protection against man-in-the-middle attacks, so it is meant for testing only. |
| `shareSession` | <code>boolean</code> | <code>true</code> | Allow TLS sessions to be reused across connections. |
| `validateRevocation` | <code>boolean</code> | <code>false</code> | Check the server certificate against revocation information: a stapled OCSP response when the server sends one, otherwise an OCSP or CRL fetch. Requires `cert` to be set. |
| `serverName` | <code>string</code> | <code>()</code> | The SNI (Server Name Indication) host name presented during the handshake; omit to use the host being called. |
| `handshakeTimeoutSeconds` | <code>decimal</code> | <code>()</code> | The TLS handshake timeout, in seconds. |
| `sessionTimeoutSeconds` | <code>decimal</code> | <code>()</code> | How long a TLS session stays reusable, in seconds. |

**`CertKey`**, a client certificate and private key pair, as files:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `certFile` | <code>string</code> | Required | The path to the certificate file. |
| `keyFile` | <code>string</code> | Required | The path to the private key file. |
| `keyPassword` | <code>string</code> | <code>()</code> | The password protecting the private key, when it has one. |

### Initializing the client

The client binds to one share at initialization. `Client.init` makes no call to Azure, so binding to a nonexistent share succeeds and the first operation on it fails with a `NotFoundError`; check up front with `AdminClient.hasShare`.

```ballerina
import ballerinax/azure.storage.files;

configurable string accountName = ?;
configurable string accountKey = ?;

files:Client fileShare = check new ("reports", auth = {accountName, accountKey});
```

With a Microsoft Entra ID service principal instead of an account key:

```ballerina
import ballerinax/azure.storage.files;

configurable string accountName = ?;
configurable string tenantId = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;

files:Client fileShare = check new ("reports", auth = {accountName, tenantId, clientId, clientSecret});
```

The fields present in the `auth` value select the credential record, so a `Config.toml` entry can switch auth modes without a code change:

```toml
# The fields present select the union member:
[myapp.filesConfig]
auth = {accountName = "myacct", accountKey = "..."}               # SharedKeyConfig
# auth = {accountName = "myacct", sasToken = "sv=..."}            # SasConfig
# auth = {sasUrl = "https://myacct.file.core.windows.net/?sv=..."}# SasUrlConfig
# auth = {connectionString = "..."}                               # ConnectionStringConfig
# auth = {kind = "default", accountName = "myacct"}               # DefaultEntraIdConfig
# auth = {kind = "managed-identity", accountName = "myacct"}      # ManagedIdentityConfig
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", clientSecret = "..."}                # ClientSecretConfig
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", certificatePath = "/path/cert.pem"}  # ClientCertificateConfig
# auth = {accountName = "myacct", tenantId = "...", clientId = "...", tokenFilePath = "/path/token"}       # WorkloadIdentityConfig
```

### Operations

#### Share operations

Operations on the bound share itself.

<details>
<summary>getShareProperties</summary>

Gets the properties of the bound share (quota, tier, protocols). This is a share-level operation, so it needs account-level credentials at runtime; a share- or file-scoped SAS fails.

**Returns:** `ShareProperties|Error`

**Sample code:**

```ballerina
files:ShareProperties properties = check fileShare->getShareProperties();
```

**Sample response:**

```ballerina
{
    quotaInGb: 100,
    accessTier: "TransactionOptimized",
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    lastModified: [1770307200, 0.0],
    metadata: {department: "finance"}
}
```

</details>

<details>
<summary>setShareMetadata</summary>

Replaces the metadata of the bound share. The supplied map replaces the complete metadata set, so any entry omitted from it is cleared. This is a share-level operation, so it needs account-level credentials at runtime; a share- or file-scoped SAS fails.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | Yes | The complete metadata set (replaces all existing metadata). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->setShareMetadata({department: "finance", year: "2026"});
```

</details>

<details>
<summary>getShareUsage</summary>

Gets the approximate amount of data stored on the bound share, in bytes. This is a share-level operation, so it needs account-level credentials at runtime; a share- or file-scoped SAS fails.

**Returns:** `int|Error`

**Sample code:**

```ballerina
int usageBytes = check fileShare->getShareUsage();
```

**Sample response:**

```ballerina
1073741824
```

</details>

#### Directory operations

Directory paths are slash-delimited, share-relative strings such as `"/2026/q1"`; the leading slash is optional.

<details>
<summary>createDirectory</summary>

Creates a directory in the bound share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory to create. |
| `options` | <code>DirectoryCreateOptions</code> | No | Optional creation options (metadata). See [DirectoryCreateOptions](#directorycreateoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->createDirectory("/2026/q1");
```

</details>

<details>
<summary>deleteDirectory</summary>

Deletes a directory from the bound share; the directory must be empty, otherwise the delete fails with a `ConflictError`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory to delete. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->deleteDirectory("/2026/q1/drafts");
```

</details>

<details>
<summary>hasDirectory</summary>

Checks whether a directory exists in the bound share. It returns `false` only when Azure confirms the directory is absent (a confirmed 404); an `Error` means the check itself failed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean directoryExists = check fileShare->hasDirectory("/2026/q1");
```

**Sample response:**

```ballerina
true
```

</details>

<details>
<summary>getDirectoryProperties</summary>

Gets the properties of a directory.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory. |

**Returns:** `DirectoryProperties|Error`

**Sample code:**

```ballerina
files:DirectoryProperties properties = check fileShare->getDirectoryProperties("/2026/q1");
```

**Sample response:**

```ballerina
{
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    lastModified: [1770307200, 0.0],
    isServerEncrypted: true
}
```

</details>

<details>
<summary>setDirectoryMetadata</summary>

Replaces the metadata of a directory. The supplied map replaces the complete metadata set, so any entry omitted from it is cleared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory. |
| `metadata` | <code>map&lt;string&gt;</code> | Yes | The complete metadata set (replaces all existing metadata). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->setDirectoryMetadata("/2026/q1", {reviewed: "true"});
```

</details>

<details>
<summary>list</summary>

Lists the entries (files and subdirectories) under a directory as one lazy stream. By default the listing is non-recursive and `Entry.eTag`/`Entry.lastModified` are absent; set `ListOptions.recursive` to descend into subdirectories and `ListOptions.includeExtendedInfo` to populate the ETag and timestamp fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directoryPath` | <code>string</code> | Yes | The share-relative path of the directory to list. |
| `options` | <code>ListOptions</code> | No | Optional listing options (prefix, recursion, extended info). See [ListOptions](#listoptions). |

**Returns:** `stream<Entry, Error?>|Error`

**Sample code:**

```ballerina
stream<files:Entry, files:Error?> entries = check fileShare->list("/2026/q1", {recursive: true});
check entries.forEach(function(files:Entry entry) {
    // process entry.path
});
```

**Sample response:**

```ballerina
{
    path: "/2026/q1/report.pdf",
    name: "report.pdf",
    isDirectory: false,
    sizeBytes: 524288,
    id: "13835093239654252544"
}
```

</details>

<details>
<summary>renameDirectory</summary>

Renames or moves a directory within the bound share, together with its entire contents; a rename never crosses shares. It is a move, not a copy: the source path no longer exists afterward. An existing file at the destination is overwritten only with `RenameOptions.replaceIfExists`; an existing directory at the destination always fails the operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The current share-relative path of the directory. |
| `destinationPath` | <code>string</code> | Yes | The new share-relative path. |
| `options` | <code>RenameOptions</code> | No | Optional rename options (overwrite, metadata). See [RenameOptions](#renameoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->renameDirectory("/2026/q1-draft", "/2026/q1");
```

</details>

#### File operations

File paths are slash-delimited, share-relative strings such as `"/2026/q1/report.pdf"`; the leading slash is optional.

<details>
<summary>createFile</summary>

Creates an empty file, pre-allocated at a fixed size.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file to create. |
| `sizeInBytes` | <code>int</code> | Yes | The size of the file, in bytes. |
| `options` | <code>CreateOptions</code> | No | Optional creation options (headers, metadata). See [CreateOptions](#createoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->createFile("/2026/q1/report.pdf", 524288);
```

</details>

<details>
<summary>deleteFile</summary>

Deletes a file from the bound share.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file to delete. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->deleteFile("/2026/q1/report-old.pdf");
```

</details>

<details>
<summary>hasFile</summary>

Checks whether a file exists in the bound share. It returns `false` only when Azure confirms the file is absent (a confirmed 404); an `Error` means the check itself failed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean fileExists = check fileShare->hasFile("/2026/q1/report.pdf");
```

**Sample response:**

```ballerina
true
```

</details>

<details>
<summary>getFileProperties</summary>

Gets the properties of a file, including its metadata (there is no separate metadata getter; read metadata from the `metadata` field of the result).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |

**Returns:** `FileProperties|Error`

**Sample code:**

```ballerina
files:FileProperties properties = check fileShare->getFileProperties("/2026/q1/report.pdf");
```

**Sample response:**

```ballerina
{
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    lastModified: [1770307200, 0.0],
    contentLength: 524288,
    contentType: "application/pdf",
    metadata: {reviewed: "true"},
    isServerEncrypted: true
}
```

</details>

<details>
<summary>setFileMetadata</summary>

Replaces the metadata of a file. The supplied map replaces the complete metadata set, so any entry omitted from it is cleared; read the current metadata from `getFileProperties().metadata`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `metadata` | <code>map&lt;string&gt;</code> | Yes | The complete metadata set (replaces all existing metadata). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->setFileMetadata("/2026/q1/report.pdf", {reviewed: "true"});
```

</details>

<details>
<summary>setContentHeaders</summary>

Sets the content headers of a file, such as `Content-Type` and `Cache-Control`. The supplied record replaces the complete header set, so any header omitted from it is cleared; metadata is untouched.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `headers` | <code>ContentHeaders</code> | Yes | The full set of content headers the file should carry. See [ContentHeaders](#contentheaders). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->setContentHeaders("/2026/q1/report.pdf", {
    contentType: "application/pdf",
    cacheControl: "max-age=3600"
});
```

</details>

<details>
<summary>renameFile</summary>

Renames or moves a file within the bound share; a rename never crosses shares. It is a move, not a copy: the source path no longer exists afterward. An existing destination file is overwritten only when `RenameOptions.replaceIfExists` is set, and an existing directory at the destination always fails the operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The current share-relative path of the file. |
| `destinationPath` | <code>string</code> | Yes | The new share-relative path. |
| `options` | <code>RenameOptions</code> | No | Optional rename options (overwrite, metadata). See [RenameOptions](#renameoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->renameFile("/2026/q1/report-draft.pdf", "/2026/q1/report.pdf", {replaceIfExists: true});
```

</details>

#### Transfer operations

`uploadFromFile` and `download` move data between a local file on disk and the share; the other operations work in memory or over streams. Transfer paths are full paths including the file name on both sides.

<details>
<summary>uploadFromFile</summary>

Uploads a local file to the bound share (disk to share).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The path of the local file to upload, including the file name. |
| `destinationPath` | <code>string</code> | Yes | The share-relative path the file is written to, including the file name. |
| `options` | <code>UploadOptions</code> | No | Optional upload options (headers, metadata). See [UploadOptions](#uploadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->uploadFromFile("./reports/q1.pdf", "/2026/q1/report.pdf");
```

</details>

<details>
<summary>upload</summary>

Uploads in-memory content to the bound share. A `byte[]` is written as-is, and an `xml` value as its textual form. A `string` is written verbatim as raw UTF-8 text, never JSON-quoted; call `toJsonString()` first to store a JSON encoding of a string. A record (which includes any map of `anydata` members), a record array, or any other `json` value is serialized per the format resolved from `UploadContentOptions.fileFormat` when set, else from the destination path's extension (`.json`, `.xml`, `.csv`): a record becomes a JSON or an XML document (never CSV), a record array becomes CSV rows headed by the union of the records' field names in first-seen order (nil or absent members as empty cells), and any other `json` value (an array, a scalar, or nil) becomes a JSON document. An unresolvable format, a record directed to CSV, a record array directed to a non-CSV format, or a non-mapping `json` value directed to a non-JSON format fails with a client-side `Error`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | <code>UploadContent</code> | Yes | The content to upload: <code>byte[]&#124;string&#124;json&#124;xml&#124;record {}&#124;record {}[]</code>. |
| `destinationPath` | <code>string</code> | Yes | The share-relative path the content is written to, including the file name. |
| `options` | <code>UploadContentOptions</code> | No | Every [UploadOptions](#uploadoptions) field plus `fileFormat` (`JSON`, `XML`, or `CSV`), the record serialization format override. |

**Returns:** `Error?`

**Sample code:**

```ballerina
Metrics metrics = {revenue: 1250000, growth: 0.12};
check fileShare->upload(metrics, "/2026/q1/metrics.json");
```

</details>

<details>
<summary>uploadFromStream</summary>

Uploads a byte stream to the bound share. `contentLength` is required up front, and must not be negative, because Azure Files pre-allocates the file, so a stream of unknown length cannot be uploaded. A length mismatch or a failure of the source stream is a client-side `Error`, and every failure closes the source stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `content` | <code>stream&lt;byte[], error?&gt;</code> | Yes | The byte stream to upload. |
| `contentLength` | <code>int</code> | Yes | The total length of the content, in bytes. |
| `destinationPath` | <code>string</code> | Yes | The share-relative path the content is written to, including the file name. |
| `options` | <code>UploadOptions</code> | No | Optional upload options (headers, metadata). See [UploadOptions](#uploadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<byte[], io:Error?> fileStream = check io:fileReadBlocksAsStream("./reports/q1.pdf");
check fileShare->uploadFromStream(fileStream, 524288, "/2026/q1/report.pdf");
```

</details>

<details>
<summary>download</summary>

Downloads a file to a local path (share to disk). The download fails with a client-side `Error` when a local file already exists at `destinationPath`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The share-relative path of the file to download, including the file name. |
| `destinationPath` | <code>string</code> | Yes | The local path to write the downloaded file to (must not exist). |
| `options` | <code>DownloadOptions</code> | No | Optional download options (range, snapshot). See [DownloadOptions](#downloadoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->download("/2026/q1/report.pdf", "./reports/q1.pdf");
```

</details>

<details>
<summary>getFile</summary>

Retrieves the file's content in the form the target type selects: `byte[]` (raw, materialized), `string` (UTF-8 text; invalid UTF-8 fails client-side), `json`, `xml`, `record {}`/`record {}[]`, which includes any map of `anydata` members and arrays of them (bound per the resolved format), `stream<byte[], error?>` (a lazy byte stream), or `stream<record {}, error?>` (lazy CSV rows, where a row that fails to bind surfaces as that pull's error entry). Record-shaped targets resolve their format from `options.fileFormat` when set, else the path's extension (`.json`, `.xml`, `.csv`): a single record binds from JSON or XML (never CSV), a record array from a JSON array or CSV rows (never XML), and an unresolvable format fails with a client-side `Error`. CSV content binds to record array and record stream targets only; for positional or headerless rows, read the content as `string` or `byte[]` and parse it with the `data.csv` module. Binding is strict.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The source share-relative path. |
| `options` | <code>GetFileOptions</code> | No | Optional retrieval options (range, snapshot, record binding format). See [GetFileOptions](#getfileoptions). |
| `targetType` | <code>typedesc&lt;RetrievableType&gt;</code> | No | The expected return type, used for automatic data binding; inferred from the assignment target. Accepts <code>byte[]&#124;string&#124;json&#124;xml&#124;record {}&#124;record {}[]&#124;stream&lt;byte[], error?&gt;&#124;stream&lt;record {}, error?&gt;</code>. |

**Returns:** `targetType|Error` — the content in the requested form, or an `Error` on a failed retrieval or a data binding failure.

**Sample code:**

```ballerina
byte[] raw = check fileShare->getFile("/2026/q1/report.pdf");
Person[] people = check fileShare->getFile("/2026/q1/people.csv");
stream<byte[], error?> chunks = check fileShare->getFile("/2026/q1/large.bin");
```

</details>

#### Copy operations

Server-side copy is non-blocking: it returns a `copyId` you can poll with `checkCopyStatus` and cancel with `abortCopy`.

<details>
<summary>copyFile</summary>

Copies a file within the bound share. The copy is asynchronous; inspect the returned `CopyInfo.copyStatus` for its state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourcePath` | <code>string</code> | Yes | The source share-relative path. |
| `destinationPath` | <code>string</code> | Yes | The destination share-relative path. |
| `options` | <code>CopyOptions</code> | No | Optional copy options (metadata). See [CopyOptions](#copyoptions). |

**Returns:** `CopyInfo|Error`

**Sample code:**

```ballerina
files:CopyInfo copy = check fileShare->copyFile("/2026/q1/report.pdf", "/archive/2026-q1-report.pdf");
```

**Sample response:**

```ballerina
{
    copyId: "1c556d19-8b45-42d1-a4b5-6a1e73923d20",
    copyStatus: "pending",
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    lastModified: [1770307200, 0.0]
}
```

</details>

<details>
<summary>copyFileFromUrl</summary>

Copies a file from an external URL into the bound share. A cross-account file source or any blob-container source must carry its own authorization in the URL (typically a SAS token); a same-account file source needs none.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceUrl` | <code>string</code> | Yes | The URL of the source file. |
| `destinationPath` | <code>string</code> | Yes | The destination share-relative path. |
| `options` | <code>CopyOptions</code> | No | Optional copy options (metadata). See [CopyOptions](#copyoptions). |

**Returns:** `CopyInfo|Error`

**Sample code:**

```ballerina
files:CopyInfo copy = check fileShare->copyFileFromUrl(
    "https://otheracct.file.core.windows.net/backups/2026/q1/report.pdf?sv=2025-05-05&sig=...",
    "/2026/q1/report.pdf"
);
```

**Sample response:**

```ballerina
{
    copyId: "8d1f3a52-6c07-4e4b-9f21-b3a8c5d4e6f7",
    copyStatus: "pending",
    eTag: "\"0x8DDA1B2C3D4E5F7\"",
    lastModified: [1770307260, 0.0]
}
```

</details>

<details>
<summary>checkCopyStatus</summary>

Checks the state of the most recent copy operation that targeted a file; it returns `()` when the file was never the destination of a copy. Call again to observe a pending copy's progress.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination share-relative path of the copy. |

**Returns:** `CopyStatusInfo?|Error`

**Sample code:**

```ballerina
files:CopyStatusInfo? status = check fileShare->checkCopyStatus("/archive/2026-q1-report.pdf");
```

**Sample response:**

```ballerina
{
    copyId: "1c556d19-8b45-42d1-a4b5-6a1e73923d20",
    copyStatus: "success",
    copyProgress: {copiedBytes: 524288, totalBytes: 524288}
}
```

</details>

<details>
<summary>abortCopy</summary>

Aborts a pending asynchronous copy operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The destination share-relative path of the copy. |
| `copyId` | <code>string</code> | Yes | The identifier of the copy to abort (from `CopyInfo.copyId`). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->abortCopy("/archive/2026-q1-report.pdf", "1c556d19-8b45-42d1-a4b5-6a1e73923d20");
```

</details>

#### Range operations

A file is pre-allocated; these operations fill, clear, and inspect specific byte ranges, which suits sparse or random-write workloads.

<details>
<summary>uploadRange</summary>

Writes a range of bytes into a file at a given offset. A single range write is capped at 4 MiB by the service with no internal chunking (the transfer operations chunk internally); larger content is rejected.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `offset` | <code>int</code> | Yes | The zero-based byte offset at which to begin writing. |
| `content` | <code>byte[]</code> | Yes | The bytes to write (at most 4 MiB). |

**Returns:** `Error?`

**Sample code:**

```ballerina
byte[] content = check io:fileReadBytes("./chunks/part-000.bin");
check fileShare->uploadRange("/2026/q1/data.bin", 0, content);
```

</details>

<details>
<summary>clearRange</summary>

Clears a range of bytes in a file. The service deallocates space in 512-byte units, so a cleared span smaller than that is zeroed but may still appear in `listRanges`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `offset` | <code>int</code> | Yes | The zero-based byte offset at which to begin clearing. |
| `length` | <code>int</code> | Yes | The number of bytes to clear. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->clearRange("/2026/q1/data.bin", 1048576, 524288);
```

</details>

<details>
<summary>listRanges</summary>

Lists the valid (written) byte ranges of a file; both bounds of each returned `Range` are inclusive.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `options` | <code>RangeListOptions</code> | No | Optional range-listing options. See [RangeListOptions](#rangelistoptions). |

**Returns:** `Range[]|Error`

**Sample code:**

```ballerina
files:Range[] ranges = check fileShare->listRanges("/2026/q1/data.bin");
```

**Sample response:**

```ballerina
[{startByte: 0, endByte: 4194303}]
```

</details>

#### Share snapshot operations

Point-in-time, read-only copies of the share. Snapshot contents are read through the regular read operations by passing the snapshot's id as the `snapshotId` of `DownloadOptions` or `ListOptions`.

<details>
<summary>createShareSnapshot</summary>

Creates a point-in-time, read-only snapshot of the bound share. Like the other snapshot operations, it needs account-level credentials; a share- or file-scoped SAS fails.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | No | Optional metadata to set on the snapshot; when absent, the share's metadata is copied to the snapshot. |

**Returns:** `ShareSnapshotInfo|Error`

**Sample code:**

```ballerina
files:ShareSnapshotInfo snapshot = check fileShare->createShareSnapshot();
```

**Sample response:**

```ballerina
{
    snapshotId: "2026-08-06T09:15:22.0000000Z",
    eTag: "\"0x8DDA1B2C3D4E5F6\"",
    lastModified: [1770307200, 0.0]
}
```

</details>

<details>
<summary>listShareSnapshots</summary>

Lists the snapshots of the bound share. This operation needs account-level credentials; a share- or file-scoped SAS fails.

**Returns:** `ShareSnapshotInfo[]|Error`

**Sample code:**

```ballerina
files:ShareSnapshotInfo[] snapshots = check fileShare->listShareSnapshots();
```

**Sample response:**

```ballerina
[
    {
        snapshotId: "2026-08-06T09:15:22.0000000Z",
        eTag: "\"0x8DDA1B2C3D4E5F6\"",
        lastModified: [1770307200, 0.0]
    }
]
```

</details>

<details>
<summary>deleteShareSnapshot</summary>

Deletes one snapshot of the bound share. This operation needs account-level credentials; a share- or file-scoped SAS fails.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `snapshotId` | <code>string</code> | Yes | The identifier of the snapshot to delete. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check fileShare->deleteShareSnapshot("2026-08-06T09:15:22.0000000Z");
```

</details>

<details>
<summary>listRangesDiff</summary>

Lists how a file's byte ranges changed since a share snapshot: the ranges written and the ranges cleared.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file. |
| `previousSnapshotId` | <code>string</code> | Yes | The identifier of the baseline snapshot to diff against. |
| `options` | <code>RangeListOptions</code> | No | Optional range-listing options. See [RangeListOptions](#rangelistoptions). |

**Returns:** `RangeDiff|Error`

**Sample code:**

```ballerina
files:RangeDiff diff = check fileShare->listRangesDiff("/2026/q1/data.bin", "2026-08-06T09:15:22.0000000Z");
```

**Sample response:**

```ballerina
{
    ranges: [{startByte: 0, endByte: 511}],
    clearRanges: []
}
```

</details>

#### SAS generation

These are ordinary methods, not remote functions: they sign locally without a service call, so invoke them with `.` rather than `->`. `generateShareSas` and `generateSas` require the client to hold a `SharedKeyConfig` (or a connection string carrying an account key); the user-delegation variants sign with a `UserDelegationKey` obtained from `AdminClient.getUserDelegationKey`.

<details>
<summary>generateShareSas</summary>

Generates a SAS (Shared Access Signature) token scoped to the bound share; the client must hold shared key credentials.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>ShareSasSignatureValues</code> | Yes | What the SAS grants: validity window and permissions, or a stored policy reference. See [ShareSasSignatureValues](#sharesassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check fileShare.generateShareSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=s&sp=rl&se=2026-08-06T10%3A00%3A00Z&sig=nJd7..."
```

</details>

<details>
<summary>generateSas</summary>

Generates a SAS (Shared Access Signature) token scoped to a single file; the client must hold shared key credentials.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file the SAS grants access to. |
| `values` | <code>FileSasSignatureValues</code> | Yes | What the SAS grants: validity window and permissions, or a stored policy reference. See [FileSasSignatureValues](#filesassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check fileShare.generateSas("/2026/q1/report.pdf", {
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=f&sp=r&se=2026-08-06T10%3A00%3A00Z&sig=Xk2p..."
```

</details>

<details>
<summary>generateShareUserDelegationSas</summary>

Generates a user-delegation SAS token scoped to the bound share, signed with an Entra ID user-delegation key instead of the account key. A user-delegation SAS is valid at most 7 days, and stored access policies do not apply to it: the generator rejects an `identifier` and requires an explicit `expiryTime` and `permissions`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>ShareSasSignatureValues</code> | Yes | What the SAS grants: validity window and permissions, both required here. See [ShareSasSignatureValues](#sharesassignaturevalues). |
| `key` | <code>UserDelegationKey</code> | Yes | The user-delegation key to sign with, from `AdminClient.getUserDelegationKey`. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
// An Entra ID-authenticated AdminClient mints the delegation key.
files:AdminClient admin = check new (auth = {accountName, tenantId, clientId, clientSecret});
files:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
string sasToken = check fileShare.generateShareUserDelegationSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true}
}, key);
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=s&sp=rl&se=2026-08-06T10%3A00%3A00Z&skoid=3d1e2f3a-...&sig=Qm9r..."
```

</details>

<details>
<summary>generateUserDelegationSas</summary>

Generates a user-delegation SAS token scoped to a single file, signed with an Entra ID user-delegation key instead of the account key. A user-delegation SAS is valid at most 7 days, and stored access policies do not apply to it: the generator rejects an `identifier` and requires an explicit `expiryTime` and `permissions`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | <code>string</code> | Yes | The share-relative path of the file the SAS grants access to. |
| `values` | <code>FileSasSignatureValues</code> | Yes | What the SAS grants: validity window and permissions, both required here. See [FileSasSignatureValues](#filesassignaturevalues). |
| `key` | <code>UserDelegationKey</code> | Yes | The user-delegation key to sign with, from `AdminClient.getUserDelegationKey`. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
// An Entra ID-authenticated AdminClient mints the delegation key.
files:AdminClient admin = check new (auth = {accountName, tenantId, clientId, clientSecret});
files:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
string sasToken = check fileShare.generateUserDelegationSas("/2026/q1/report.pdf", {
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true}
}, key);
```

**Sample response:**

```ballerina
"sv=2025-05-05&sr=f&sp=r&se=2026-08-06T10%3A00%3A00Z&skoid=3d1e2f3a-...&sig=Ttw4..."
```

</details>

## AdminClient

Account-level administration: share lifecycle and existence checks, file-service configuration, and account SAS.

### Configuration

The `AdminClient` takes the same `ClientConfiguration` as the `Client`; see the [Client configuration](#configuration) tables above.

Under Microsoft Entra ID credentials, the `AdminClient` operations authorize against the storage account's management permissions (the `Microsoft.Storage/storageAccounts/fileServices/shares/` actions, carried by roles such as Contributor); the Storage File Data Privileged roles alone do not cover them. The one exception is `getUserDelegationKey`, which requires the `Storage File Delegator` role instead. See the [Setup Guide](setup-guide.md) for the role split.

### Initializing the client

```ballerina
import ballerinax/azure.storage.files;

configurable string accountName = ?;
configurable string accountKey = ?;

files:AdminClient admin = check new (auth = {accountName, accountKey});
```

### Operations

#### Share management

<details>
<summary>hasShare</summary>

Checks whether a share exists in the storage account. It returns `false` only when Azure confirms the share is absent (a confirmed 404); an `Error` means the check itself failed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shareName` | <code>string</code> | Yes | The name of the share to check. |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean shareExists = check admin->hasShare("reports");
```

**Sample response:**

```ballerina
true
```

</details>

<details>
<summary>listShares</summary>

Lists the shares in the storage account, with optional filtering and optional inclusion of metadata, snapshots, and soft-deleted shares.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | <code>ShareListOptions</code> | No | Optional filtering and listing options. See [ShareListOptions](#sharelistoptions). |

**Returns:** `ShareInfo[]|Error`

**Sample code:**

```ballerina
files:ShareInfo[] shares = check admin->listShares({includeMetadata: true});
```

**Sample response:**

```ballerina
[
    {
        name: "reports",
        properties: {
            quotaInGb: 100,
            accessTier: "TransactionOptimized",
            eTag: "\"0x8DDA1B2C3D4E5F6\"",
            lastModified: [1770307200, 0.0]
        },
        metadata: {department: "finance"}
    }
]
```

</details>

<details>
<summary>createShare</summary>

Creates a new share in the storage account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shareName` | <code>string</code> | Yes | The name of the share to create. |
| `options` | <code>ShareCreateOptions</code> | No | Optional creation options (quota, tier, protocols, metadata). See [ShareCreateOptions](#sharecreateoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->createShare("reports", {quotaInGb: 100});
```

</details>

<details>
<summary>deleteShare</summary>

Deletes a share from the storage account. Under the account's soft-delete retention policy (the default for new accounts) the delete is soft, and the share is restorable with `undeleteShare`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shareName` | <code>string</code> | Yes | The name of the share to delete. |
| `options` | <code>ShareDeleteOptions</code> | No | Optional deletion options (snapshot handling, lease id). See [ShareDeleteOptions](#sharedeleteoptions). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->deleteShare("reports-2024");
```

</details>

<details>
<summary>undeleteShare</summary>

Restores a soft-deleted share. Find restorable shares and their versions with `listShares({includeDeleted: true})`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shareName` | <code>string</code> | Yes | The name of the soft-deleted share to restore. |
| `version` | <code>string</code> | Yes | The version of the soft-deleted share (from `ShareInfo.version`). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->undeleteShare("reports-2024", "01D9E9CE4B0316F0");
```

</details>

#### Service configuration

<details>
<summary>getServiceProperties</summary>

Reads the account's file-service configuration (metrics and CORS rules).

**Returns:** `ServiceProperties|Error`

**Sample code:**

```ballerina
files:ServiceProperties properties = check admin->getServiceProperties();
```

**Sample response:**

```ballerina
{
    hourMetrics: {enabled: true, version: "1.0", includeApis: true, retentionDays: 7},
    minuteMetrics: {enabled: false},
    cors: []
}
```

</details>

<details>
<summary>setServiceProperties</summary>

Updates the account's file-service configuration; the record replaces the whole configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `properties` | <code>ServiceProperties</code> | Yes | The complete file-service configuration to apply. See [ServiceProperties](#serviceproperties). |

**Returns:** `Error?`

**Sample code:**

```ballerina
check admin->setServiceProperties({
    hourMetrics: {enabled: true, includeApis: true, retentionDays: 7}
});
```

</details>

#### User delegation and account SAS

`generateAccountSas` is an ordinary method that signs locally without a service call; invoke it with `.` rather than `->`.

<details>
<summary>getUserDelegationKey</summary>

Gets a user-delegation key for signing user-delegation SAS tokens; the key is valid at most 7 days. This operation works only on an Entra ID client whose identity holds the `Storage File Delegator` role.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `startTime` | <code>time:Utc</code> | Yes | The start of the key's validity period. |
| `expiryTime` | <code>time:Utc</code> | Yes | The end of the key's validity period (at most 7 days out). |

**Returns:** `UserDelegationKey|Error`

**Sample code:**

```ballerina
files:UserDelegationKey key = check admin->getUserDelegationKey(
    time:utcNow(), time:utcAddSeconds(time:utcNow(), 86400));
```

**Sample response:**

```ballerina
{
    signedObjectId: "3d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a",
    signedTenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
    signedStart: [1770307200, 0.0],
    signedExpiry: [1770393600, 0.0],
    signedService: "f",
    signedVersion: "2025-05-05",
    value: "aGVsbG8gd29ybGQ="
}
```

</details>

<details>
<summary>generateAccountSas</summary>

Generates an account-level SAS (Shared Access Signature) token; the client must hold shared key credentials.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | <code>AccountSasSignatureValues</code> | Yes | What the SAS grants: validity window, permissions, and resource types. See [AccountSasSignatureValues](#accountsassignaturevalues). |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string sasToken = check admin.generateAccountSas({
    expiryTime: time:utcAddSeconds(time:utcNow(), 3600),
    permissions: {read: true, list: true},
    resourceTypes: {'service: true, container: true, 'object: true}
});
```

**Sample response:**

```ballerina
"sv=2025-05-05&ss=f&srt=sco&sp=rl&se=2026-08-06T10%3A00%3A00Z&sig=Bv3k..."
```

</details>

---

## Supporting types

The option, SAS, and result records used by the operations above, documented once.

### ContentHeaders

The standard content headers that can be set on a file.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentType` | <code>string</code> | <code>()</code> | The MIME type of the content (e.g. `application/pdf`), served as `Content-Type` on downloads. |
| `contentEncoding` | <code>string</code> | <code>()</code> | Any encoding applied to the stored content (e.g. `gzip`). |
| `contentLanguage` | <code>string</code> | <code>()</code> | The natural language of the content (e.g. `en-US`). |
| `contentDisposition` | <code>string</code> | <code>()</code> | How receivers should present the content (e.g. `attachment` or `inline`). |
| `cacheControl` | <code>string</code> | <code>()</code> | Caching directives served with the file (e.g. `max-age=3600, private`). |
| `contentMd5` | <code>string</code> | <code>()</code> | Base64-encoded MD5 of the content, for integrity verification. |

### ShareListOptions

Options for `AdminClient.listShares`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `prefix` | <code>string</code> | <code>()</code> | Return only shares whose name begins with this prefix. |
| `includeMetadata` | <code>boolean</code> | <code>false</code> | Include each share's metadata in the results. |
| `includeSnapshots` | <code>boolean</code> | <code>false</code> | Include share snapshots in the results. |
| `includeDeleted` | <code>boolean</code> | <code>false</code> | Include soft-deleted shares in the results. |

### ShareCreateOptions

Options for `AdminClient.createShare`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the new share. |
| `quotaInGb` | <code>int</code> | <code>()</code> | The provisioned capacity of the share, in GiB; when absent, the account kind's default quota applies. |
| `accessTier` | <code>ShareAccessTier</code> | <code>()</code> | The access tier for the share; when absent, the account kind's default tier applies (`TRANSACTION_OPTIMIZED` on pay-as-you-go accounts, `PREMIUM` on premium accounts). |
| `enabledProtocols` | <code>ShareProtocol[]</code> | <code>[SMB]</code> | The protocols to enable on the share (SMB and/or NFS). |
| `rootSquash` | <code>NfsRootSquash</code> | <code>()</code> | The NFS root-squash setting (NFS shares only); when absent, NFS shares default to `NO_ROOT_SQUASH`. |

### ShareDeleteOptions

Options for `AdminClient.deleteShare`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `deleteSnapshots` | <code>ShareSnapshotsDeleteOption</code> | <code>()</code> | How the share's snapshots are handled; when absent, only the share itself is deleted (the delete fails if snapshots exist). |
| `snapshotId` | <code>string</code> | <code>()</code> | Delete a specific snapshot rather than the share itself. |
| `leaseId` | <code>string</code> | <code>()</code> | The active lease id, required when the share is leased. |

### DirectoryCreateOptions

Options for `Client.createDirectory`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the new directory. |

### ListOptions

Options for `Client.list`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `prefix` | <code>string</code> | <code>()</code> | Return only entries whose name begins with this prefix. |
| `recursive` | <code>boolean</code> | <code>false</code> | List entries in subdirectories as well. |
| `pageSize` | <code>int</code> | <code>5000</code> | The number of entries fetched per service round-trip, up to the service maximum of 5,000. Does not cap the total number of results. |
| `includeExtendedInfo` | <code>boolean</code> | <code>false</code> | Include the ETag and timestamps on each entry. |
| `snapshotId` | <code>string</code> | <code>()</code> | List from the share snapshot with this id instead of the live share. |

### RenameOptions

Options for `Client.renameFile` and `Client.renameDirectory`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `replaceIfExists` | <code>boolean</code> | <code>false</code> | If a file already occupies the destination path, delete it and give its path to the renamed entry. A directory occupying the destination always fails the operation regardless of this flag. |
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the renamed entry (replaces all existing metadata); when absent, the existing metadata is preserved. |

### CreateOptions

Options for `Client.createFile` (creating an empty file of a given size).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentHeaders` | <code>ContentHeaders</code> | <code>()</code> | Content headers to set on the file, such as `Content-Type` and `Cache-Control`. |
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the file. |

### UploadOptions

Options for the upload operations (`uploadFromFile` and `uploadFromStream`; `upload` takes [UploadContentOptions](#uploadcontentoptions)).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentHeaders` | <code>ContentHeaders</code> | <code>()</code> | Content headers to set on the file, such as `Content-Type` and `Cache-Control`. |
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the file. |

### UploadContentOptions

Options for `upload`: every [UploadOptions](#uploadoptions) field, plus the record serialization format override.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fileFormat` | <code>FileFormat</code> | <code>()</code> | The serialization format for `json`, record, and record array content: `JSON`, `XML`, or `CSV`. When absent, the format is inferred from the destination path's extension (`.json`, `.xml`, `.csv`). |

### DownloadOptions

Options for `download`, included by `getFile`'s `GetFileOptions`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `range` | <code>Range</code> | <code>()</code> | Download only this byte range instead of the whole file. |
| `snapshotId` | <code>string</code> | <code>()</code> | Read from the share snapshot with this id instead of the live share. |

### GetFileOptions

Options for `getFile`: every [DownloadOptions](#downloadoptions) field, plus the record binding format override.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fileFormat` | <code>FileFormat</code> | <code>()</code> | The binding format for `record {}` and `record {}[]` targets: `JSON`, `XML`, or `CSV`. When absent, the format is inferred from the path's extension (`.json`, `.xml`, `.csv`). |

### CopyOptions

Options for `Client.copyFile` and `Client.copyFileFromUrl`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `metadata` | <code>map&lt;string&gt;</code> | <code>()</code> | User-defined metadata to set on the destination; when absent, the metadata is copied from the source file. |

### RangeListOptions

Options for `Client.listRanges` and `Client.listRangesDiff`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `range` | <code>Range</code> | <code>()</code> | Restrict the listing to this byte range. |

### ShareSasSignatureValues

The inputs for generating a share-scoped SAS via `Client.generateShareSas` or `Client.generateShareUserDelegationSas`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | <code>()</code> | The end of the SAS validity period (UTC). May be omitted only when `identifier` references a stored access policy that carries an expiry. |
| `permissions` | <code>ShareSasPermissions</code> | <code>()</code> | The permissions the SAS grants. May be omitted only when `identifier` references a stored access policy that carries permissions. |
| `startTime` | <code>time:Utc</code> | <code>()</code> | The start of the SAS validity period (UTC); omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | <code>()</code> | The protocols a request presenting the SAS may use; omit to allow HTTPS and HTTP. |
| `ipRange` | <code>string</code> | <code>()</code> | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |
| `identifier` | <code>string</code> | <code>()</code> | The identifier of a stored access policy on the share, as an alternative to spelling out expiry and permissions here. Not valid for the user delegation variants, which reject it. |

Generation fails with an `Error` when neither `identifier` nor both `expiryTime` and `permissions` are supplied.

### ShareSasPermissions

The permissions granted by a share-scoped SAS. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read file content, properties, and metadata. |
| `create` | <code>boolean</code> | <code>false</code> | Create files and directories. |
| `write` | <code>boolean</code> | <code>false</code> | Write file content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete files and directories. |
| `list` | <code>boolean</code> | <code>false</code> | List files and directories. |

### FileSasSignatureValues

The inputs for generating a file-scoped SAS via `Client.generateSas` or `Client.generateUserDelegationSas`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | <code>()</code> | The end of the SAS validity period (UTC). May be omitted only when `identifier` references a stored access policy that carries an expiry. |
| `permissions` | <code>FileSasPermissions</code> | <code>()</code> | The permissions the SAS grants. May be omitted only when `identifier` references a stored access policy that carries permissions. |
| `startTime` | <code>time:Utc</code> | <code>()</code> | The start of the SAS validity period (UTC); omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | <code>()</code> | The protocols a request presenting the SAS may use; omit to allow HTTPS and HTTP. |
| `ipRange` | <code>string</code> | <code>()</code> | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |
| `identifier` | <code>string</code> | <code>()</code> | The identifier of a stored access policy on the share, as an alternative to spelling out expiry and permissions here. Not valid for the user delegation variants, which reject it. |

Generation fails with an `Error` when neither `identifier` nor both `expiryTime` and `permissions` are supplied.

### FileSasPermissions

The permissions granted by a file-scoped SAS. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read the file's content, properties, and metadata. |
| `create` | <code>boolean</code> | <code>false</code> | Create the file. |
| `write` | <code>boolean</code> | <code>false</code> | Write the file's content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete the file. |

### AccountSasSignatureValues

The inputs for generating an account-level SAS via `AdminClient.generateAccountSas`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiryTime` | <code>time:Utc</code> | Required | The end of the SAS validity period (UTC). |
| `permissions` | <code>AccountSasPermissions</code> | Required | The permissions the SAS grants. |
| `resourceTypes` | <code>AccountSasResourceTypes</code> | Required | The resource types the SAS applies to. |
| `startTime` | <code>time:Utc</code> | <code>()</code> | The start of the SAS validity period (UTC); omit for immediately valid. |
| `protocol` | <code>SasProtocol</code> | <code>()</code> | The protocols a request presenting the SAS may use; omit to allow HTTPS and HTTP. |
| `ipRange` | <code>string</code> | <code>()</code> | An IP address or range the requests must come from (e.g. `168.1.5.60-168.1.5.70`). |

### AccountSasPermissions

The permissions granted by an account-level SAS. Every permission is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `read` | <code>boolean</code> | <code>false</code> | Read content, properties, and metadata, and list entries. |
| `write` | <code>boolean</code> | <code>false</code> | Write content, properties, and metadata. |
| `delete` | <code>boolean</code> | <code>false</code> | Delete resources. |
| `list` | <code>boolean</code> | <code>false</code> | List shares and directory contents. |
| `add` | <code>boolean</code> | <code>false</code> | Add content (append-style operations of other storage services). |
| `create` | <code>boolean</code> | <code>false</code> | Create new resources. |
| `update` | <code>boolean</code> | <code>false</code> | Update stored entities (of other storage services). |
| `process` | <code>boolean</code> | <code>false</code> | Process stored messages (of other storage services). |

### AccountSasResourceTypes

The resource types an account-level SAS applies to. Every type is off unless enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `'service` | <code>boolean</code> | <code>false</code> | Service-level operations (e.g. list shares, service properties). |
| `container` | <code>boolean</code> | <code>false</code> | Container-level operations (the share level: share properties, metadata). |
| `'object` | <code>boolean</code> | <code>false</code> | Object-level operations (files and directories). |

### Entry

One entry returned by `Client.list`.

| Field | Type | Description |
|-------|------|-------------|
| `path` | <code>string</code> | The share-relative path of the entry, e.g. `/dir1/dir2/file.ext`. |
| `name` | <code>string</code> | The entry name (file or directory), without the directory component. |
| `isDirectory` | <code>boolean</code> | `true` if the entry is a directory, `false` if it is a file. |
| `sizeBytes` | <code>int</code> | The file size in bytes; not present for directories. |
| `id` | <code>string</code> | The entry identifier. |
| `eTag` | <code>string</code> | The entity tag; present only when the listing requests extended info (`ListOptions.includeExtendedInfo`). |
| `lastModified` | <code>time:Utc</code> | The last-modified time (UTC); present only when the listing requests extended info. |

### ShareProperties

Properties of a file share, as returned by `Client.getShareProperties` and inside `ShareInfo`.

| Field | Type | Description |
|-------|------|-------------|
| `quotaInGb` | <code>int</code> | The provisioned capacity of the share, in GiB. |
| `accessTier` | <code>ShareAccessTier</code> | The share's access tier. Shares on premium (FileStorage) accounts always report `PREMIUM`. |
| `eTag` | <code>string</code> | The entity tag for optimistic concurrency. |
| `lastModified` | <code>time:Utc</code> | The last-modified time (UTC). |
| `metadata` | <code>map&lt;string&gt;</code> | User-defined metadata. |
| `enabledProtocols` | <code>ShareProtocol[]</code> | The enabled protocols (SMB and/or NFS). |
| `rootSquash` | <code>NfsRootSquash</code> | The NFS root-squash setting (NFS shares only). |
| `leaseState` | <code>LeaseState</code> | Where the lease stands in its lifecycle; present only while a lease exists. |
| `leaseStatus` | <code>LeaseStatus</code> | `LOCKED` while a lease is in force, `UNLOCKED` otherwise; present only while a lease exists. |
| `leaseDuration` | <code>LeaseDuration</code> | Whether the active lease is infinite or fixed-duration; present only while a lease exists. |
| `provisionedIops` | <code>int</code> | Provisioned IOPS (premium shares only). |
| `provisionedBandwidthMibps` | <code>int</code> | Provisioned bandwidth in MiB/s (premium shares only). |

### ShareInfo

One share as returned by `AdminClient.listShares`.

| Field | Type | Description |
|-------|------|-------------|
| `name` | <code>string</code> | The share name. |
| `properties` | <code>ShareProperties</code> | The share's properties. |
| `metadata` | <code>map&lt;string&gt;</code> | User-defined metadata, when requested via `ShareListOptions.includeMetadata`. |
| `snapshotId` | <code>string</code> | The snapshot identifier, present only for snapshot listings. |
| `isDeleted` | <code>boolean</code> | `true` when this entry is a soft-deleted share (requires `includeDeleted`). |
| `version` | <code>string</code> | The share version; pass to `AdminClient.undeleteShare` to restore a deleted share. |

### DirectoryProperties

Properties of a directory, as returned by `Client.getDirectoryProperties`.

| Field | Type | Description |
|-------|------|-------------|
| `eTag` | <code>string</code> | The entity tag for optimistic concurrency. |
| `lastModified` | <code>time:Utc</code> | The last-modified time (UTC). |
| `metadata` | <code>map&lt;string&gt;</code> | User-defined metadata. |
| `isServerEncrypted` | <code>boolean</code> | Whether the service has encrypted the directory at rest. |

### FileProperties

Properties of a file, as returned by `Client.getFileProperties`.

| Field | Type | Description |
|-------|------|-------------|
| `eTag` | <code>string</code> | The entity tag for optimistic concurrency. |
| `lastModified` | <code>time:Utc</code> | The last-modified time (UTC). |
| `contentLength` | <code>int</code> | The size of the file in bytes. |
| `contentType` | <code>string</code> | The MIME type of the content, served as `Content-Type` on downloads. `application/octet-stream` when no content type was ever set. |
| `contentEncoding` | <code>string</code> | The encoding applied to the stored content (e.g. `gzip`). |
| `contentDisposition` | <code>string</code> | How receivers should present the content (e.g. `attachment` or `inline`). |
| `cacheControl` | <code>string</code> | Caching directives served with the file (e.g. `max-age=3600, private`). |
| `contentMd5` | <code>string</code> | Base64-encoded MD5 of the content, for integrity verification. |
| `metadata` | <code>map&lt;string&gt;</code> | User-defined metadata. |
| `isServerEncrypted` | <code>boolean</code> | Whether the service has encrypted the file at rest (server-side encryption, covering the file data and its metadata). |
| `leaseState` | <code>LeaseState</code> | Where the lease stands in its lifecycle; present only while a lease exists. |
| `leaseStatus` | <code>LeaseStatus</code> | `LOCKED` while a lease is in force, `UNLOCKED` otherwise; present only while a lease exists. |
| `leaseDuration` | <code>LeaseDuration</code> | Whether the active lease is infinite or fixed-duration; present only while a lease exists. |
| `copyStatus` | <code>CopyStatus</code> | The status of the most recent copy operation, if any. |
| `copyId` | <code>string</code> | The identifier of the most recent copy operation, if any. |
| `copyProgress` | <code>CopyProgress</code> | Progress of the most recent copy operation, if any. |

### CopyInfo

The result of starting a copy operation. Copies are asynchronous.

| Field | Type | Description |
|-------|------|-------------|
| `copyId` | <code>string</code> | The copy operation identifier; pass to `Client.abortCopy` to cancel a pending copy. |
| `copyStatus` | <code>CopyStatus</code> | The copy status at the moment the copy started, `PENDING` while the copy is still in progress. |
| `eTag` | <code>string</code> | The entity tag of the destination after the copy started. |
| `lastModified` | <code>time:Utc</code> | The last-modified time of the destination (UTC). |

### CopyStatusInfo

The state of the most recent copy operation that targeted a file, as returned by `Client.checkCopyStatus`.

| Field | Type | Description |
|-------|------|-------------|
| `copyId` | <code>string</code> | The identifier of the copy operation; pass to `Client.abortCopy` to cancel a pending copy. |
| `copyStatus` | <code>CopyStatus</code> | The status of the copy. |
| `copyProgress` | <code>CopyProgress</code> | Progress of the copy (bytes copied so far out of the total). |

### CopyProgress

Progress of an asynchronous copy operation.

| Field | Type | Description |
|-------|------|-------------|
| `copiedBytes` | <code>int</code> | The number of bytes copied so far. |
| `totalBytes` | <code>int</code> | The total number of bytes to be copied. |

### Range

A single byte range within a file. Both bounds are inclusive (a range starting at offset `o` with length `l` is `startByte = o`, `endByte = o + l - 1`).

| Field | Type | Description |
|-------|------|-------------|
| `startByte` | <code>int</code> | The zero-based inclusive start offset. |
| `endByte` | <code>int</code> | The zero-based inclusive end offset. |

### RangeDiff

The result of `Client.listRangesDiff`: how a file's ranges changed since a share snapshot.

| Field | Type | Description |
|-------|------|-------------|
| `ranges` | <code>Range[]</code> | The ranges written since the baseline snapshot. |
| `clearRanges` | <code>Range[]</code> | The ranges cleared since the baseline snapshot. |

### ShareSnapshotInfo

One share snapshot, as returned by `Client.createShareSnapshot` and `Client.listShareSnapshots`.

| Field | Type | Description |
|-------|------|-------------|
| `snapshotId` | <code>string</code> | The snapshot identifier, an opaque UTC-timestamp-formatted string. Pass it as the `snapshotId` of the download and list options to read from the snapshot. |
| `eTag` | <code>string</code> | The entity tag of the share at the moment of the snapshot. |
| `lastModified` | <code>time:Utc</code> | The last-modified time of the share at the moment of the snapshot (UTC). |

### ServiceProperties

The account's file-service configuration: request-metrics collection and cross-origin resource sharing rules.

| Field | Type | Description |
|-------|------|-------------|
| `hourMetrics` | <code>Metrics</code> | Metrics aggregated per hour. |
| `minuteMetrics` | <code>Metrics</code> | Metrics aggregated per minute. |
| `cors` | <code>CorsRule[]</code> | The CORS (Cross-Origin Resource Sharing) rules, evaluated in order; at most five. |
| `protocol` | <code>ProtocolSettings</code> | Protocol-level settings. |

### Metrics

A metrics-collection setting of the file service.

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | <code>boolean</code> | Whether metrics are collected. |
| `version` | <code>string</code> | The storage-analytics version the setting applies to. |
| `includeApis` | <code>boolean</code> | Whether metrics cover called API operations as well as storage capacity. |
| `retentionDays` | <code>int</code> | How many days collected metrics are retained. |

### CorsRule

One CORS (Cross-Origin Resource Sharing) rule of the file service. The string fields are comma-separated lists; `*` allows all.

| Field | Type | Description |
|-------|------|-------------|
| `allowedOrigins` | <code>string</code> | The origin domains allowed to make requests. |
| `allowedMethods` | <code>string</code> | The HTTP methods an allowed origin may use. |
| `allowedHeaders` | <code>string</code> | The request headers an allowed origin may send. |
| `exposedHeaders` | <code>string</code> | The response headers exposed to the browser. |
| `maxAgeInSeconds` | <code>int</code> | How long, in seconds, a browser may cache the preflight response. |

### ProtocolSettings

Protocol-level settings of the file service.

| Field | Type | Description |
|-------|------|-------------|
| `smbMultichannelEnabled` | <code>boolean</code> | Whether SMB multichannel (multiple parallel network channels per SMB session) is enabled for the account. |

### UserDelegationKey

A key for signing user-delegation SAS tokens, obtained via `AdminClient.getUserDelegationKey`.

| Field | Type | Description |
|-------|------|-------------|
| `signedObjectId` | <code>string</code> | The object id of the Entra ID principal the key was issued to. |
| `signedTenantId` | <code>string</code> | The Entra ID tenant the key was issued in. |
| `signedStart` | <code>time:Utc</code> | The start of the key's validity period (UTC). |
| `signedExpiry` | <code>time:Utc</code> | The end of the key's validity period (UTC). |
| `signedService` | <code>string</code> | The service the key is valid for. |
| `signedVersion` | <code>string</code> | The storage service version the key was issued for. |
| `value` | <code>string</code> | The key itself, base64-encoded. |

### Enums

- `ShareAccessTier`: `HOT`, `COOL`, `TRANSACTION_OPTIMIZED`, `PREMIUM`.
- `ShareProtocol`: `SMB`, `NFS`.
- `FileFormat`: `JSON`, `XML`, `CSV`.
- `ShareSnapshotsDeleteOption`: `INCLUDE`, `INCLUDE_LEASED`.
- `NfsRootSquash`: `NO_ROOT_SQUASH`, `ROOT_SQUASH`, `ALL_SQUASH`.
- `CopyStatus`: `PENDING`, `SUCCESS`, `ABORTED`, `FAILED`.
- `LeaseState`: `AVAILABLE`, `LEASED`, `EXPIRED`, `BREAKING`, `BROKEN`.
- `LeaseStatus`: `LOCKED`, `UNLOCKED`.
- `LeaseDuration`: `INFINITE`, `FIXED`.
- `SasProtocol`: `HTTPS`, `HTTPS_HTTP`.
- `RetryPolicyType`: `EXPONENTIAL`, `FIXED_INTERVAL`.
- `ProxyType`: `HTTP`, `SOCKS4`, `SOCKS5`.

### Errors

Every operation returns the module's `Error` on failure. The hierarchy splits by origin:

- **`Error`**: the root type, and the type of every client-side failure (invalid configuration, local I/O, content that fails to bind). It carries no detail fields, with one exception:
  - **`ContentBindingError`**: a listener-only error raised when a dispatched file's content does not bind to its handler's declared type. It is delivered to the service's `onError` handler and carries the file's share-relative path in `filePath` and, when the content had been downloaded before binding failed, its raw bytes in `content`. See the [Trigger Reference](trigger-reference.md#contentbindingerror).
- **`ServiceError`**: any error the Azure service raised, always carrying `httpStatus` and `errorCode`. Its subtypes are `NotFoundError` (404), `ConflictError` (409), `AuthorizationError` (403), `PreconditionFailedError` (412), `RangeNotSatisfiableError` (416), and `QuotaExceededError` (403, the share is full). An unmapped service code lands on the generic `ServiceError`.

The mapping keys on the Azure error-code string rather than the HTTP status alone, so `ShareSizeLimitReached` (403) becomes a `QuotaExceededError` while an auth failure (also 403) becomes an `AuthorizationError`. Check the more specific error types before the general ones.
