---
title: Actions
---

# Actions

The Azure Keyvault connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Covers all Key Vault data-plane operations across keys, secrets, certificates, and managed storage accounts |

---

## Client

The key vault client performs cryptographic key operations and vault operations against the Azure Key Vault service, covering secrets, keys, certificates, and managed storage accounts.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig&#124;http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling the `accept-encoding` header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding; `nil` values are treated as optional and absent fields as `nilable` types |

### Initializing the client

```ballerina
import ballerinax/azure.keyvault;

configurable string keyVaultUrl = ?;
configurable string tenantId = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

final keyvault:Client keyvaultClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl: string `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        scopes: ["https://vault.azure.net/user_impersonation", "offline_access"]
    }
}, keyVaultUrl);
```

### Operations

#### Key Management

<details>
<summary>createKey</summary>

Creates a new key, stores it, then returns key parameters and attributes to the client.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name for the new key |
| `payload` | <code>KeyCreateParameters</code> | Yes | The parameters to create a key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->createKey("mykey", {kty: "RSA", keySize: 2048, keyOps: ["encrypt", "decrypt"]}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA",
    "key_ops": ["encrypt", "decrypt"],
    "n": "sY8...",
    "e": "AQAB"
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>importKey</summary>

Imports an externally created key, stores it, and returns key parameters and attributes to the client.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | Name for the imported key |
| `payload` | <code>KeyImportParameters</code> | Yes | The parameters to import a key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->importKey("myimportedkey", {'key: {kty: "RSA", n: "...", e: "AQAB"}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/myimportedkey/abc123",
    "kty": "RSA",
    "key_ops": ["encrypt", "decrypt", "sign", "verify"]
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>deleteKey</summary>

Deletes a key of any type from storage in Azure Key Vault, returning the public part of the deleted key and deletion information on when the key will be purged.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key to delete |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedKeyBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedKeyBundle result = check keyvaultClient->deleteKey("mykey", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA"
  },
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedkeys/mykey",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>getKey</summary>

Gets the public part of a stored key. Retrieve a specific version by providing `keyVersion`, or use an empty string to get the latest version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key to get |
| `keyVersion` | <code>string</code> | Yes | The version of the key; use empty string for the latest version |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->getKey("mykey", "abc123", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA",
    "key_ops": ["encrypt", "decrypt"],
    "n": "sY8...",
    "e": "AQAB"
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>updateKey</summary>

Changes specified attributes of a stored key. Can be applied to any key type and key version stored in Azure Key Vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of key to update |
| `keyVersion` | <code>string</code> | Yes | The version of the key to update |
| `payload` | <code>KeyUpdateParameters</code> | Yes | The parameters of the key to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->updateKey("mykey", "abc123", {attributes: {enabled: false}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA"
  },
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>listKeyVersions</summary>

Retrieves a list of individual key versions with the same key name, including full key identifier, attributes, and tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `KeyListResult|error`

**Sample code:**

```ballerina
keyvault:KeyListResult result = check keyvaultClient->listKeyVersions("mykey", apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    },
    {
      "kid": "https://myvault.vault.azure.net/keys/mykey/def456",
      "attributes": {
        "enabled": false,
        "created": 1699000000,
        "updated": 1700001000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>listKeys</summary>

Lists all keys in the specified vault, providing the full key identifier and attributes in the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `KeyListResult|error`

**Sample code:**

```ballerina
keyvault:KeyListResult result = check keyvaultClient->listKeys(apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>backupKey</summary>

Requests that a backup of the specified key be downloaded to the client. All versions of the key are included in the backup blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `BackupKeyResult|error`

**Sample code:**

```ballerina
keyvault:BackupKeyResult result = check keyvaultClient->backupKey("mykey", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": "AzureKeyVaultKeyBackupV1.eyJraWQiOiJodHRwcz..."
}
```

</details>

<details>
<summary>restoreKey</summary>

Restores a backed up key to a vault, restoring all versions of the key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>KeyRestoreParameters</code> | Yes | The parameters to restore the key; contains the backup blob |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->restoreKey({value: "<backup-blob>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA",
    "key_ops": ["encrypt", "decrypt"]
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Cryptographic Operations

<details>
<summary>encrypt</summary>

Encrypts an arbitrary sequence of bytes using an encryption key stored in a key vault. The private key material never leaves the vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeyOperationsParameters</code> | Yes | The parameters for the encryption operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyOperationResult|error`

**Sample code:**

```ballerina
keyvault:KeyOperationResult result = check keyvaultClient->encrypt("mykey", "abc123", {alg: "RSA-OAEP-256", value: "<base64url-plaintext>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
  "value": "ZmFrZWNpcGhlcnRleHQ..."
}
```

</details>

<details>
<summary>decrypt</summary>

Decrypts a single block of encrypted data using the specified key. The private key never leaves the vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeyOperationsParameters</code> | Yes | The parameters for the decryption operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyOperationResult|error`

**Sample code:**

```ballerina
keyvault:KeyOperationResult result = check keyvaultClient->decrypt("mykey", "abc123", {alg: "RSA-OAEP-256", value: "<base64url-ciphertext>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
  "value": "cGxhaW50ZXh0dmFsdWU..."
}
```

</details>

<details>
<summary>sign</summary>

Creates a signature from a digest using the specified key. The sign operation supports RSA and EC key types; only the digest is sent to the vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeySignParameters</code> | Yes | The parameters for the signing operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyOperationResult|error`

**Sample code:**

```ballerina
keyvault:KeyOperationResult result = check keyvaultClient->sign("mykey", "abc123", {alg: "RS256", value: "<base64url-digest>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
  "value": "c2lnbmF0dXJldmFsdWU..."
}
```

</details>

<details>
<summary>verify</summary>

Verifies a signature using the specified key against a provided digest. The verify operation applies to RSA and EC public key types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeyVerifyParameters</code> | Yes | The parameters for verify operations |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyVerifyResult|error`

**Sample code:**

```ballerina
keyvault:KeyVerifyResult result = check keyvaultClient->verify("mykey", "abc123", {alg: "RS256", digest: "<base64url-digest>", value: "<base64url-signature>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": true
}
```

</details>

<details>
<summary>wrapKey</summary>

Wraps a symmetric key using a specified asymmetric or symmetric vault key. Used to protect a content encryption key for storage or transmission.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeyOperationsParameters</code> | Yes | The parameters for wrap operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyOperationResult|error`

**Sample code:**

```ballerina
keyvault:KeyOperationResult result = check keyvaultClient->wrapKey("mykey", "abc123", {alg: "RSA-OAEP", value: "<base64url-symmetric-key>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
  "value": "d3JhcHBlZGtleXZhbHVl..."
}
```

</details>

<details>
<summary>unwrapKey</summary>

Unwraps a symmetric key using the specified key that was initially used for wrapping that key, recovering the original symmetric key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `keyVersion` | <code>string</code> | Yes | The version of the key |
| `payload` | <code>KeyOperationsParameters</code> | Yes | The parameters for the key operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyOperationResult|error`

**Sample code:**

```ballerina
keyvault:KeyOperationResult result = check keyvaultClient->unwrapKey("mykey", "abc123", {alg: "RSA-OAEP", value: "<base64url-wrapped-key>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
  "value": "dW53cmFwcGVkc3ltbWV0cmlja2V5..."
}
```

</details>

#### Key Soft-Delete Recovery

<details>
<summary>listDeletedKeys</summary>

Lists the deleted keys in the specified vault. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `DeletedKeyListResult|error`

**Sample code:**

```ballerina
keyvault:DeletedKeyListResult result = check keyvaultClient->listDeletedKeys(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
      "attributes": {
        "enabled": false,
        "recoveryLevel": "Recoverable+Purgeable"
      },
      "deletedDate": 1700001000,
      "recoveryId": "https://myvault.vault.azure.net/deletedkeys/mykey",
      "scheduledPurgeDate": 1707777000
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getDeletedKey</summary>

Gets the public part of a deleted key along with deletion metadata. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedKeyBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedKeyBundle result = check keyvaultClient->getDeletedKey("mykey", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA"
  },
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedkeys/mykey",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>purgeDeletedKey</summary>

Permanently deletes the specified key. This irreversible operation requires privileged user access and is only available on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `error?`

**Sample code:**

```ballerina
check keyvaultClient->purgeDeletedKey("mykey", apiVersion = "7.0");
```

</details>

<details>
<summary>recoverDeletedKey</summary>

Recovers the deleted key to its latest version under the `/keys` path. Only available on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyName` | <code>string</code> | Yes | The name of the deleted key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `KeyBundle|error`

**Sample code:**

```ballerina
keyvault:KeyBundle result = check keyvaultClient->recoverDeletedKey("mykey", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "key": {
    "kid": "https://myvault.vault.azure.net/keys/mykey/abc123",
    "kty": "RSA",
    "key_ops": ["encrypt", "decrypt"]
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700002000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Secret Management

<details>
<summary>setSecret</summary>

Sets a secret in a specified key vault. Creates the secret if it does not exist; otherwise creates a new version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `payload` | <code>SecretSetParameters</code> | Yes | The parameters for setting the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SecretBundle|error`

**Sample code:**

```ballerina
keyvault:SecretBundle result = check keyvaultClient->setSecret("mysecret", {value: "supersecret", contentType: "text/plain"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "value": "supersecret",
  "contentType": "text/plain",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>deleteSecret</summary>

Deletes a secret from a specified key vault, returning deletion metadata and recovery information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedSecretBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedSecretBundle result = check keyvaultClient->deleteSecret("mysecret", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "contentType": "text/plain",
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedsecrets/mysecret",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>getSecret</summary>

Gets a specified secret from a given key vault, returning the secret value and its attributes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `secretVersion` | <code>string</code> | Yes | The version of the secret; use empty string for the latest version |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SecretBundle|error`

**Sample code:**

```ballerina
keyvault:SecretBundle result = check keyvaultClient->getSecret("mysecret", "abc123", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "value": "supersecret",
  "contentType": "text/plain",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>updateSecret</summary>

Updates the attributes associated with a specified secret in a given key vault. The secret value itself cannot be changed; create a new version via `setSecret` instead.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `secretVersion` | <code>string</code> | Yes | The version of the secret |
| `payload` | <code>SecretUpdateParameters</code> | Yes | The parameters for update secret operation |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SecretBundle|error`

**Sample code:**

```ballerina
keyvault:SecretBundle result = check keyvaultClient->updateSecret("mysecret", "abc123", {attributes: {enabled: false}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "contentType": "text/plain",
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>listSecrets</summary>

Lists secrets in a specified key vault. The full secret identifier and attributes are provided in the response; secret values are not included.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `SecretListResult|error`

**Sample code:**

```ballerina
keyvault:SecretListResult result = check keyvaultClient->listSecrets(apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/secrets/mysecret",
      "contentType": "text/plain",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>listSecretVersions</summary>

Lists all versions of the specified secret, returning the full identifier and attributes of each version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `SecretListResult|error`

**Sample code:**

```ballerina
keyvault:SecretListResult result = check keyvaultClient->listSecretVersions("mysecret", apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    },
    {
      "id": "https://myvault.vault.azure.net/secrets/mysecret/def456",
      "attributes": {
        "enabled": false,
        "created": 1699000000,
        "updated": 1700001000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>backupSecret</summary>

Backs up the specified secret by downloading all versions of the secret as a backup blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `BackupSecretResult|error`

**Sample code:**

```ballerina
keyvault:BackupSecretResult result = check keyvaultClient->backupSecret("mysecret", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": "AzureKeyVaultSecretBackupV1.eyJraWQiOiJodHRwcz..."
}
```

</details>

<details>
<summary>restoreSecret</summary>

Restores a backed up secret to a vault, restoring all versions of the secret.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SecretRestoreParameters</code> | Yes | The parameters to restore the secret; contains the backup blob |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SecretBundle|error`

**Sample code:**

```ballerina
keyvault:SecretBundle result = check keyvaultClient->restoreSecret({value: "<backup-blob>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "contentType": "text/plain",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Secret Soft-Delete Recovery

<details>
<summary>listDeletedSecrets</summary>

Lists deleted secrets for the specified vault. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `DeletedSecretListResult|error`

**Sample code:**

```ballerina
keyvault:DeletedSecretListResult result = check keyvaultClient->listDeletedSecrets(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/secrets/mysecret",
      "attributes": {
        "enabled": false,
        "recoveryLevel": "Recoverable+Purgeable"
      },
      "deletedDate": 1700001000,
      "recoveryId": "https://myvault.vault.azure.net/deletedsecrets/mysecret",
      "scheduledPurgeDate": 1707777000
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getDeletedSecret</summary>

Gets the specified deleted secret along with its attributes and deletion metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedSecretBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedSecretBundle result = check keyvaultClient->getDeletedSecret("mysecret", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "contentType": "text/plain",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedsecrets/mysecret",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>purgeDeletedSecret</summary>

Permanently deletes the specified secret. This irreversible operation is only available on soft-delete enabled vaults and cannot be undone.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `error?`

**Sample code:**

```ballerina
check keyvaultClient->purgeDeletedSecret("mysecret", apiVersion = "7.0");
```

</details>

<details>
<summary>recoverDeletedSecret</summary>

Recovers the deleted secret to the latest version under the `/secrets` path. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretName` | <code>string</code> | Yes | The name of the deleted secret |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SecretBundle|error`

**Sample code:**

```ballerina
keyvault:SecretBundle result = check keyvaultClient->recoverDeletedSecret("mysecret", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/secrets/mysecret/abc123",
  "contentType": "text/plain",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700002000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Certificate Management

<details>
<summary>listCertificates</summary>

Lists certificates in a specified key vault. The full certificate identifier and attributes are provided in the response.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |
| `includePending` | <code>boolean</code> | No | Whether to include certificates not completely provisioned |

**Returns:** `CertificateListResult|error`

**Sample code:**

```ballerina
keyvault:CertificateListResult result = check keyvaultClient->listCertificates(apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
      "x5t": "dGh1bWJwcmludA==",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>deleteCertificate</summary>

Deletes a certificate from a specified key vault, returning the deleted certificate and deletion information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedCertificateBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedCertificateBundle result = check keyvaultClient->deleteCertificate("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedcertificates/mycert",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>getCertificateContacts</summary>

Lists the certificate contacts for a specified key vault. These contacts receive certificate expiry notifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
keyvault:Contacts result = check keyvaultClient->getCertificateContacts(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/contacts",
  "contacts": [
    {
      "email": "admin@example.com",
      "name": "Vault Admin",
      "phone": "+1234567890"
    }
  ]
}
```

</details>

<details>
<summary>setCertificateContacts</summary>

Sets the certificate contacts for the specified key vault, replacing any existing contacts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Contacts</code> | Yes | The contacts for the key vault certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
keyvault:Contacts result = check keyvaultClient->setCertificateContacts({contacts: [{email: "admin@example.com", name: "Vault Admin"}]}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/contacts",
  "contacts": [
    {
      "email": "admin@example.com",
      "name": "Vault Admin"
    }
  ]
}
```

</details>

<details>
<summary>deleteCertificateContacts</summary>

Deletes the certificate contacts for a specified key vault, returning the contacts that were removed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `Contacts|error`

**Sample code:**

```ballerina
keyvault:Contacts result = check keyvaultClient->deleteCertificateContacts(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/contacts",
  "contacts": [
    {
      "email": "admin@example.com",
      "name": "Vault Admin"
    }
  ]
}
```

</details>

<details>
<summary>listCertificateIssuers</summary>

Lists certificate issuers for a specified key vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `CertificateIssuerListResult|error`

**Sample code:**

```ballerina
keyvault:CertificateIssuerListResult result = check keyvaultClient->listCertificateIssuers(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/certificates/issuers/DigiCert",
      "provider": "DigiCert"
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getCertificateIssuer</summary>

Gets the specified certificate issuer, returning its properties, credentials, and attributes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuerName` | <code>string</code> | Yes | The name of the issuer |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `IssuerBundle|error`

**Sample code:**

```ballerina
keyvault:IssuerBundle result = check keyvaultClient->getCertificateIssuer("DigiCert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/issuers/DigiCert",
  "provider": "DigiCert",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000
  }
}
```

</details>

<details>
<summary>setCertificateIssuer</summary>

Sets the specified certificate issuer, creating or replacing it with the provided provider and credential details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuerName` | <code>string</code> | Yes | The name of the issuer |
| `payload` | <code>CertificateIssuerSetParameters</code> | Yes | Certificate issuer set parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `IssuerBundle|error`

**Sample code:**

```ballerina
keyvault:IssuerBundle result = check keyvaultClient->setCertificateIssuer("DigiCert", {provider: "DigiCert", credentials: {accountId: "myaccount", pwd: "mypassword"}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/issuers/DigiCert",
  "provider": "DigiCert",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000
  }
}
```

</details>

<details>
<summary>deleteCertificateIssuer</summary>

Deletes the specified certificate issuer, returning the issuer that was removed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuerName` | <code>string</code> | Yes | The name of the issuer |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `IssuerBundle|error`

**Sample code:**

```ballerina
keyvault:IssuerBundle result = check keyvaultClient->deleteCertificateIssuer("DigiCert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/issuers/DigiCert",
  "provider": "DigiCert",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000
  }
}
```

</details>

<details>
<summary>updateCertificateIssuer</summary>

Updates the specified certificate issuer with new provider details, credentials, or attributes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuerName` | <code>string</code> | Yes | The name of the issuer |
| `payload` | <code>CertificateIssuerUpdateParameters</code> | Yes | Certificate issuer update parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `IssuerBundle|error`

**Sample code:**

```ballerina
keyvault:IssuerBundle result = check keyvaultClient->updateCertificateIssuer("DigiCert", {attributes: {enabled: false}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/issuers/DigiCert",
  "provider": "DigiCert",
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "updated": 1700001000
  }
}
```

</details>

<details>
<summary>createCertificate</summary>

Creates a new certificate. If this is the first version the certificate resource is created; the operation returns a `CertificateOperation` for async issuance tracking.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `payload` | <code>CertificateCreateParameters</code> | Yes | The parameters to create a certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateOperation|error`

**Sample code:**

```ballerina
keyvault:CertificateOperation result = check keyvaultClient->createCertificate("mycert", {policy: {keyProps: {kty: "RSA", keySize: 2048, exportable: false, reuseKey: false}, secretProps: {contentType: "application/x-pkcs12"}, x509Props: {subject: "CN=example.com", validityMonths: 12}, issuer: {name: "Self"}}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/pending",
  "issuer": {
    "name": "Self"
  },
  "csr": "MIIBqzCC...",
  "cancellation_requested": false,
  "status": "inProgress",
  "request_id": "abc123def456"
}
```

</details>

<details>
<summary>importCertificate</summary>

Imports a certificate into a specified key vault. The certificate must include the private key and be encoded as a base64 PFX or PEM.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `payload` | <code>CertificateImportParameters</code> | Yes | The parameters to import the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->importCertificate("mycert", {value: "<base64-encoded-pfx>", pwd: "pfxpassword", policy: {secretProps: {contentType: "application/x-pkcs12"}}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "kid": "https://myvault.vault.azure.net/keys/mycert/abc123",
  "sid": "https://myvault.vault.azure.net/secrets/mycert/abc123",
  "x5t": "dGh1bWJwcmludA==",
  "cer": "MIIBqzCC...",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>listCertificateVersions</summary>

Lists the versions of a certificate, returning the full identifier and attributes for each version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `CertificateListResult|error`

**Sample code:**

```ballerina
keyvault:CertificateListResult result = check keyvaultClient->listCertificateVersions("mycert", apiVersion = "7.0", maxresults = 25);
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
      "x5t": "dGh1bWJwcmludA==",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000,
        "exp": 1731600000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getCertificatePolicy</summary>

Lists the policy for a certificate, including key properties, secret properties, X.509 properties, issuer, and lifetime actions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate in a given key vault |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificatePolicy|error`

**Sample code:**

```ballerina
keyvault:CertificatePolicy result = check keyvaultClient->getCertificatePolicy("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/policy",
  "key_props": {
    "exportable": false,
    "kty": "RSA",
    "key_size": 2048,
    "reuse_key": false
  },
  "secret_props": {
    "contentType": "application/x-pkcs12"
  },
  "x509_props": {
    "subject": "CN=example.com",
    "validity_months": 12,
    "key_usage": ["digitalSignature", "keyEncipherment"]
  },
  "issuer": {
    "name": "Self"
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000
  }
}
```

</details>

<details>
<summary>updateCertificatePolicy</summary>

Updates the policy for a certificate with new key properties, lifetime actions, issuer, or other attributes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate in the given vault |
| `payload` | <code>CertificatePolicy</code> | Yes | The policy for the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificatePolicy|error`

**Sample code:**

```ballerina
keyvault:CertificatePolicy result = check keyvaultClient->updateCertificatePolicy("mycert", {x509Props: {validityMonths: 24}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/policy",
  "key_props": {
    "exportable": false,
    "kty": "RSA",
    "key_size": 2048
  },
  "x509_props": {
    "subject": "CN=example.com",
    "validity_months": 24
  },
  "issuer": {
    "name": "Self"
  },
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700001000
  }
}
```

</details>

<details>
<summary>getCertificate</summary>

Gets information about a certificate, including the CER content, key identifier, secret identifier, and attributes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate in the given vault |
| `certificateVersion` | <code>string</code> | Yes | The version of the certificate; use empty string for the latest version |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->getCertificate("mycert", "abc123", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "kid": "https://myvault.vault.azure.net/keys/mycert/abc123",
  "sid": "https://myvault.vault.azure.net/secrets/mycert/abc123",
  "x5t": "dGh1bWJwcmludA==",
  "cer": "MIIBqzCC...",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "exp": 1731600000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>updateCertificate</summary>

Updates the specified attributes associated with the given certificate, such as enabled state, tags, or policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate in the given key vault |
| `certificateVersion` | <code>string</code> | Yes | The version of the certificate |
| `payload` | <code>CertificateUpdateParameters</code> | Yes | The parameters for certificate update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->updateCertificate("mycert", "abc123", {attributes: {enabled: false}}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": false,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>getCertificateOperation</summary>

Gets the creation operation of a certificate, including its current status and any errors encountered during issuance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateOperation|error`

**Sample code:**

```ballerina
keyvault:CertificateOperation result = check keyvaultClient->getCertificateOperation("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/pending",
  "issuer": {
    "name": "Self"
  },
  "csr": "MIIBqzCC...",
  "cancellation_requested": false,
  "status": "completed",
  "request_id": "abc123def456"
}
```

</details>

<details>
<summary>deleteCertificateOperation</summary>

Deletes the creation operation for a specific certificate, cancelling any in-progress certificate issuance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateOperation|error`

**Sample code:**

```ballerina
keyvault:CertificateOperation result = check keyvaultClient->deleteCertificateOperation("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/pending",
  "issuer": {
    "name": "Self"
  },
  "cancellation_requested": true,
  "status": "inProgress",
  "request_id": "abc123def456"
}
```

</details>

<details>
<summary>updateCertificateOperation</summary>

Updates a certificate operation, primarily used to request cancellation of a pending certificate operation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `payload` | <code>CertificateOperationUpdateParameter</code> | Yes | The certificate operation update parameter with cancellation flag |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateOperation|error`

**Sample code:**

```ballerina
keyvault:CertificateOperation result = check keyvaultClient->updateCertificateOperation("mycert", {cancellationRequested: true}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/pending",
  "issuer": {
    "name": "Self"
  },
  "cancellation_requested": true,
  "status": "inProgress",
  "request_id": "abc123def456"
}
```

</details>

<details>
<summary>mergeCertificate</summary>

Merges a certificate or a certificate chain with a key pair existing on the server. Used to complete a CSR generated by Key Vault by supplying the signed certificate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `payload` | <code>CertificateMergeParameters</code> | Yes | The parameters to merge certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->mergeCertificate("mycert", {x5c: ["<base64-encoded-cert>"]}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "kid": "https://myvault.vault.azure.net/keys/mycert/abc123",
  "sid": "https://myvault.vault.azure.net/secrets/mycert/abc123",
  "x5t": "dGh1bWJwcmludA==",
  "cer": "MIIBqzCC...",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>backupCertificate</summary>

Backs up the specified certificate by downloading all versions as a backup blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `BackupCertificateResult|error`

**Sample code:**

```ballerina
keyvault:BackupCertificateResult result = check keyvaultClient->backupCertificate("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": "AzureKeyVaultCertBackupV1.eyJraWQiOiJodHRwcz..."
}
```

</details>

<details>
<summary>restoreCertificate</summary>

Restores a backed up certificate to a vault, restoring all versions of the certificate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CertificateRestoreParameters</code> | Yes | The parameters to restore the certificate; contains the backup blob |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->restoreCertificate({value: "<backup-blob>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "kid": "https://myvault.vault.azure.net/keys/mycert/abc123",
  "sid": "https://myvault.vault.azure.net/secrets/mycert/abc123",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Certificate Soft-Delete Recovery

<details>
<summary>listDeletedCertificates</summary>

Lists the deleted certificates in the specified vault currently available for recovery. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |
| `includePending` | <code>boolean</code> | No | Whether to include certificates not completely provisioned |

**Returns:** `DeletedCertificateListResult|error`

**Sample code:**

```ballerina
keyvault:DeletedCertificateListResult result = check keyvaultClient->listDeletedCertificates(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
      "x5t": "dGh1bWJwcmludA==",
      "attributes": {
        "enabled": false,
        "recoveryLevel": "Recoverable+Purgeable"
      },
      "deletedDate": 1700001000,
      "recoveryId": "https://myvault.vault.azure.net/deletedcertificates/mycert",
      "scheduledPurgeDate": 1707777000
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getDeletedCertificate</summary>

Retrieves information about the specified deleted certificate along with deletion metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedCertificateBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedCertificateBundle result = check keyvaultClient->getDeletedCertificate("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedcertificates/mycert",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>purgeDeletedCertificate</summary>

Permanently deletes the specified deleted certificate. This irreversible operation is only available on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `error?`

**Sample code:**

```ballerina
check keyvaultClient->purgeDeletedCertificate("mycert", apiVersion = "7.0");
```

</details>

<details>
<summary>recoverDeletedCertificate</summary>

Recovers the deleted certificate back to its current version under the `/certificates` path. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `certificateName` | <code>string</code> | Yes | The name of the deleted certificate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `CertificateBundle|error`

**Sample code:**

```ballerina
keyvault:CertificateBundle result = check keyvaultClient->recoverDeletedCertificate("mycert", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/certificates/mycert/abc123",
  "kid": "https://myvault.vault.azure.net/keys/mycert/abc123",
  "sid": "https://myvault.vault.azure.net/secrets/mycert/abc123",
  "contentType": "application/x-pkcs12",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700002000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Storage Account Management

<details>
<summary>listStorageAccounts</summary>

Lists storage accounts managed by the specified key vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `StorageListResult|error`

**Sample code:**

```ballerina
keyvault:StorageListResult result = check keyvaultClient->listStorageAccounts(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
      "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getStorageAccount</summary>

Gets information about a specified storage account managed by Key Vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->getStorageAccount("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "regenerationPeriod": "P90D",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>setStorageAccount</summary>

Creates or updates a new storage account managed by Key Vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `payload` | <code>StorageAccountCreateParameters</code> | Yes | The parameters to create a storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->setStorageAccount("mystorageaccount", {resourceId: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount", activeKeyName: "key1", autoRegenerateKey: true, regenerationPeriod: "P90D"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "regenerationPeriod": "P90D",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>deleteStorageAccount</summary>

Deletes a storage account from Key Vault management, returning the deleted storage account and recovery information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedStorageBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedStorageBundle result = check keyvaultClient->deleteStorageAccount("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>updateStorageAccount</summary>

Updates the specified attributes associated with the given storage account, such as the active key name, regeneration period, or enabled state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `payload` | <code>StorageAccountUpdateParameters</code> | Yes | The parameters to update a storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->updateStorageAccount("mystorageaccount", {regenerationPeriod: "P60D", autoRegenerateKey: true}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "regenerationPeriod": "P60D",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>regenerateStorageAccountKey</summary>

Regenerates the specified key value for the given storage account managed by Key Vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `payload` | <code>StorageAccountRegenerateKeyParameters</code> | Yes | The parameters to regenerate storage account key |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->regenerateStorageAccountKey("mystorageaccount", {keyName: "key1"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "regenerationPeriod": "P90D",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>backupStorageAccount</summary>

Backs up the specified storage account managed by Key Vault by downloading a backup blob.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `BackupStorageResult|error`

**Sample code:**

```ballerina
keyvault:BackupStorageResult result = check keyvaultClient->backupStorageAccount("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": "AzureKeyVaultStorageBackupV1.eyJraWQiOiJodHRwcz..."
}
```

</details>

<details>
<summary>restoreStorageAccount</summary>

Restores a backed up storage account to a vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>StorageRestoreParameters</code> | Yes | The parameters to restore the storage account; contains the backup blob |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->restoreStorageAccount({value: "<backup-blob>"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### Storage Account Soft-Delete Recovery

<details>
<summary>listDeletedStorageAccounts</summary>

Lists deleted storage accounts for the specified vault. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `DeletedStorageListResult|error`

**Sample code:**

```ballerina
keyvault:DeletedStorageListResult result = check keyvaultClient->listDeletedStorageAccounts(apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
      "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
      "attributes": {
        "enabled": false,
        "recoveryLevel": "Recoverable+Purgeable"
      },
      "deletedDate": 1700001000,
      "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount",
      "scheduledPurgeDate": 1707777000
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getDeletedStorageAccount</summary>

Gets the specified deleted storage account along with deletion metadata and recovery information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedStorageBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedStorageBundle result = check keyvaultClient->getDeletedStorageAccount("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>purgeDeletedStorageAccount</summary>

Permanently deletes the specified storage account. This irreversible operation is only available on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `error?`

**Sample code:**

```ballerina
check keyvaultClient->purgeDeletedStorageAccount("mystorageaccount", apiVersion = "7.0");
```

</details>

<details>
<summary>recoverDeletedStorageAccount</summary>

Recovers the deleted storage account back to its current state under the `/storage` path. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `StorageBundle|error`

**Sample code:**

```ballerina
keyvault:StorageBundle result = check keyvaultClient->recoverDeletedStorageAccount("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount",
  "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/mystorageaccount",
  "activeKeyName": "key1",
  "autoRegenerateKey": true,
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700002000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### SAS Definition Management

<details>
<summary>listSasDefinitions</summary>

Lists storage SAS definitions for the given storage account managed by Key Vault.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `SasDefinitionListResult|error`

**Sample code:**

```ballerina
keyvault:SasDefinitionListResult result = check keyvaultClient->listSasDefinitions("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
      "sid": "https://myvault.vault.azure.net/secrets/mystorageaccount-mysasdefinition",
      "attributes": {
        "enabled": true,
        "created": 1700000000,
        "updated": 1700000000
      }
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getSasDefinition</summary>

Gets information about a SAS definition for the specified storage account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:SasDefinitionBundle result = check keyvaultClient->getSasDefinition("mystorageaccount", "mysasdefinition", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sid": "https://myvault.vault.azure.net/secrets/mystorageaccount-mysasdefinition/abc123",
  "sasType": "account",
  "validityPeriod": "PT1H",
  "templateUri": "https://mystorageaccount.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=sco&sp=rwdlacupiytfx&se=2021-01-01T00:00:00Z&st=2020-01-01T00:00:00Z&spr=https&sig=...",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>setSasDefinition</summary>

Creates or updates a new SAS definition for the specified storage account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `payload` | <code>SasDefinitionCreateParameters</code> | Yes | The parameters to create a SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:SasDefinitionBundle result = check keyvaultClient->setSasDefinition("mystorageaccount", "mysasdefinition", {sasType: "account", validityPeriod: "PT1H", templateUri: "https://mystorageaccount.blob.core.windows.net/?..."}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sid": "https://myvault.vault.azure.net/secrets/mystorageaccount-mysasdefinition/abc123",
  "sasType": "account",
  "validityPeriod": "PT1H",
  "templateUri": "https://mystorageaccount.blob.core.windows.net/?...",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700000000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

<details>
<summary>deleteSasDefinition</summary>

Deletes a SAS definition from a specified storage account, returning the deleted definition and recovery information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedSasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedSasDefinitionBundle result = check keyvaultClient->deleteSasDefinition("mystorageaccount", "mysasdefinition", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sasType": "account",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount/sas/mysasdefinition",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>updateSasDefinition</summary>

Updates the specified attributes associated with the given SAS definition, such as validity period, template URI, or enabled state.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `payload` | <code>SasDefinitionUpdateParameters</code> | Yes | The parameters to update a SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:SasDefinitionBundle result = check keyvaultClient->updateSasDefinition("mystorageaccount", "mysasdefinition", {validityPeriod: "PT2H"}, apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sid": "https://myvault.vault.azure.net/secrets/mystorageaccount-mysasdefinition/abc123",
  "sasType": "account",
  "validityPeriod": "PT2H",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700001000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>

#### SAS Definition Soft-Delete Recovery

<details>
<summary>listDeletedSasDefinitions</summary>

Lists deleted SAS definitions for the specified vault and storage account. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |
| `maxresults` | <code>int:Signed32</code> | No | Maximum number of results per page (1 to 25) |

**Returns:** `DeletedSasDefinitionListResult|error`

**Sample code:**

```ballerina
keyvault:DeletedSasDefinitionListResult result = check keyvaultClient->listDeletedSasDefinitions("mystorageaccount", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "value": [
    {
      "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
      "attributes": {
        "enabled": false,
        "recoveryLevel": "Recoverable+Purgeable"
      },
      "deletedDate": 1700001000,
      "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount/sas/mysasdefinition",
      "scheduledPurgeDate": 1707777000
    }
  ],
  "nextLink": null
}
```

</details>

<details>
<summary>getDeletedSasDefinition</summary>

Gets the specified deleted SAS definition along with its attributes and deletion metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `DeletedSasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:DeletedSasDefinitionBundle result = check keyvaultClient->getDeletedSasDefinition("mystorageaccount", "mysasdefinition", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sasType": "account",
  "validityPeriod": "PT1H",
  "attributes": {
    "enabled": false,
    "recoveryLevel": "Recoverable+Purgeable"
  },
  "deletedDate": 1700001000,
  "recoveryId": "https://myvault.vault.azure.net/deletedstorage/mystorageaccount/sas/mysasdefinition",
  "scheduledPurgeDate": 1707777000
}
```

</details>

<details>
<summary>recoverDeletedSasDefinition</summary>

Recovers the deleted SAS definition back to its current state. Available only on soft-delete enabled vaults.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storageAccountName` | <code>string</code> | Yes | The name of the storage account |
| `sasDefinitionName` | <code>string</code> | Yes | The name of the SAS definition |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `apiVersion` | <code>string</code> | Yes | Client API version (query parameter) |

**Returns:** `SasDefinitionBundle|error`

**Sample code:**

```ballerina
keyvault:SasDefinitionBundle result = check keyvaultClient->recoverDeletedSasDefinition("mystorageaccount", "mysasdefinition", apiVersion = "7.0");
```

**Sample response:**

```json
{
  "id": "https://myvault.vault.azure.net/storage/mystorageaccount/sas/mysasdefinition",
  "sid": "https://myvault.vault.azure.net/secrets/mystorageaccount-mysasdefinition/abc123",
  "sasType": "account",
  "validityPeriod": "PT1H",
  "attributes": {
    "enabled": true,
    "created": 1700000000,
    "updated": 1700002000,
    "recoveryLevel": "Recoverable+Purgeable"
  }
}
```

</details>
