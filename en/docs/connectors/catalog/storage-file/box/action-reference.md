---
connector: true
connector_name: "box"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Box connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Work with Box content and administration: files, folders, users, groups, collaborations, comments, tasks, metadata, retention and legal-hold policies, Box Sign requests and Box AI. |

---

## Client

The `Client` connects to the Box Platform API (`https://api.box.com/2.0`). It exposes 297 operations.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/box;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

final box:Client boxClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl
    }
});
```

### Operations

#### Authorize

<details>
<summary>authorizeUser</summary>

<div>

Authorize user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `scope` | <code>string</code> | No | A space-separated list of application scopes you'd like to authenticate the user for. This defaults to all the scopes configured for the application in its configuration page. |
| `responseType` | <code>"code"</code> | Yes | The type of response we'd like to receive. |
| `redirectUri` | <code>string</code> | No | The URI to which Box redirects the browser after the user has granted or denied the application permission. This URI match one of the redirect URIs in the configuration of your application. It must be a valid HTTPS URI and it needs to be able to handle the redirection to complete the next step in the OAuth 2.0 flow. Although this parameter is optional, it must be a part of the authorization URL if you configured multiple redirect URIs for the application in the developer console. A missing parameter causes a `redirect_uri_missing` error after the user grants application access. |
| `state` | <code>string</code> | No | A custom string of your choice. Box will pass the same string to the redirect URL when authentication is complete. This parameter can be used to identify a user on redirect, as well as protect against hijacked sessions and other exploits. |
| `clientId` | <code>string</code> | Yes | The Client ID of the application that is requesting to authenticate the user. To get the Client ID for your application, log in to your Box developer console and click the **Edit Application** link for the application you're working with. In the OAuth 2.0 Parameters section of the configuration page, find the item labelled `client_id`. The text of that item is your application's Client ID. |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check boxClient->authorizeUser(responseType = "code", clientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `string`.

</div>
</details>

#### OAuth 2.0

<details>
<summary>requestAccessToken</summary>

<div>

Request access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PostOAuth2Token</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccessToken|error`

**Sample code:**

```ballerina
box:AccessToken result = check boxClient->requestAccessToken({
    grantType: "authorization_code",
    subjectTokenType: "urn:ietf:params:oauth:token-type:access_token",
    code: "200",
    actorToken: "string"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "bearer",
  "expires_in": 1,
  "restricted_to": [
    {
      "scope": "annotation_edit",
      "object": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>refreshAccessToken</summary>

<div>

Refresh access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PostOAuth2TokenRefreshAccessToken</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccessToken|error`

**Sample code:**

```ballerina
box:AccessToken result = check boxClient->refreshAccessToken({
    refreshToken: "string",
    grantType: "refresh_token",
    clientSecret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "access_token": "string",
  "refresh_token": "string",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "bearer",
  "expires_in": 1,
  "restricted_to": [
    {
      "scope": "annotation_edit",
      "object": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>revokeAccessToken</summary>

<div>

Revoke access token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PostOAuth2Revoke</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->revokeAccessToken({
    clientSecret: "string",
    clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    token: "string"
});
```

</div>
</details>

#### Files

<details>
<summary>getFileInformation</summary>

<div>

Get file information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>GetFileInformationHeaders</code> | No | Request headers. Optional fields: `boxapi`, `ifNoneMatch`, `xRepHints`. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. Additionally this field can be used to query any metadata applied to the file by specifying the `metadata` field as well as the scope and key of the template to retrieve, for example `?fields=metadata.enterprise_12345.contractTemplate`. |

**Returns:** `FileFull|error?`

**Sample code:**

```ballerina
box:FileFull? result = check boxClient->getFileInformation("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateFile</summary>

<div>

Update file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>UpdateFileRequest</code> | Yes |  |
| `headers` | <code>UpdateFileHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileFull|error`

**Sample code:**

```ballerina
box:FileFull result = check boxClient->updateFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    collections: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "string"
    }],
    permissions: {
        canDownload: "open"
    },
    dispositionAt: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>restoreFile</summary>

<div>

Restore file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>RestoreFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashFileRestored|error`

**Sample code:**

```ballerina
box:TrashFileRestored result = check boxClient->restoreFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "description": "Sample description",
  "created_at": "string",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "type": "file",
  "item_status": "active",
  "sha1": "string",
  "size": 1,
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "modified_at": "string",
  "path_collection": {
    "total_count": 1,
    "entries": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>deleteFile</summary>

<div>

Delete file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>DeleteFileHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listFileAppItemAssociations</summary>

<div>

List file app item associations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `applicationType` | <code>string</code> | No | If given, only return app items for this application type. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `AppItemAssociations|error`

**Sample code:**

```ballerina
box:AppItemAssociations result = check boxClient->listFileAppItemAssociations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      },
      "app_item": {
        "application_type": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "app_item"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "app_item_association"
    }
  ]
}
```

</div>
</details>

<details>
<summary>downloadFile</summary>

<div>

Download file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>DownloadFileHeaders</code> | No | Request headers. Optional fields: `boxapi`, `range`. Defaults to `{}`. |
| `accessToken` | <code>string</code> | No | An optional access token that can be used to pre-authenticate this request, which means that a download link can be shared with a browser or a third party service without them needing to know how to handle the authentication. When using this parameter, please make sure that the access token is sufficiently scoped down to only allow read access to that file and no other files or folders. |
| `version` | <code>string</code> | No | The file version to download. |

**Returns:** `byte[]|error?`

**Sample code:**

```ballerina
byte[]? result = check boxClient->downloadFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]?`.

</div>
</details>

<details>
<summary>uploadFileVersion</summary>

<div>

Upload file version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>UploadFileVersionRequest</code> | Yes |  |
| `headers` | <code>UploadFileVersionHeaders</code> | No | Request headers. Optional fields: `contentMd5`, `ifMatch`. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Files|error`

**Sample code:**

```ballerina
box:Files result = check boxClient->uploadFileVersion("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    attributes: {
        name: "Sample name",
        contentModifiedAt: "string"
    }
});
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>uploadFile</summary>

<div>

Upload file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UploadFileRequest</code> | Yes |  |
| `headers` | <code>UploadFileHeaders</code> | No | Request headers. Optional fields: `contentMd5`. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Files|error`

**Sample code:**

```ballerina
box:Files result = check boxClient->uploadFile({
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    attributes: {
        parent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        name: "Sample name",
        contentCreatedAt: "string"
    }
});
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>preflightCheckBeforeUpload</summary>

<div>

Preflight check before upload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadUrl|error`

**Sample code:**

```ballerina
box:UploadUrl result = check boxClient->preflightCheckBeforeUpload();
```

**Sample response:**

```json
{
  "upload_token": "string",
  "upload_url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>createUploadSession</summary>

<div>

Create upload session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateUploadSessionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
box:UploadSession result = check boxClient->createUploadSession({
    fileName: "import.csv",
    folderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fileSize: 1
});
```

**Sample response:**

```json
{
  "num_parts_processed": 1,
  "part_size": 1,
  "total_parts": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "session_expires_at": "string",
  "type": "upload_session"
}
```

</div>
</details>

<details>
<summary>createUploadSessionForExistingFile</summary>

<div>

Create upload session for existing file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>CreateUploadSessionForExistingFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
box:UploadSession result = check boxClient->createUploadSessionForExistingFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    fileSize: 1,
    fileName: "import.csv"
});
```

**Sample response:**

```json
{
  "num_parts_processed": 1,
  "part_size": 1,
  "total_parts": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "session_expires_at": "string",
  "type": "upload_session"
}
```

</div>
</details>

<details>
<summary>getUploadSession</summary>

<div>

Get upload session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSession|error`

**Sample code:**

```ballerina
box:UploadSession result = check boxClient->getUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "num_parts_processed": 1,
  "part_size": 1,
  "total_parts": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "session_expires_at": "string",
  "type": "upload_session"
}
```

</div>
</details>

<details>
<summary>uploadPartOfFile</summary>

<div>

Upload part of file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `headers` | <code>UploadPartOfFileHeaders</code> | Yes | Request headers, including the required `digest`, `contentRange`. |
| `payload` | <code>byte[]</code> | Yes |  |

**Returns:** `UploadedPart|error`

**Sample code:**

```ballerina
byte[] fileContent = check io:fileReadBytes("invoice.pdf");
box:UploadedPart result = check boxClient->uploadPartOfFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {digest: "string", contentRange: "string"}, fileContent);
```

**Sample response:**

```json
{
  "part": {
    "offset": 1,
    "size": 1,
    "part_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

<details>
<summary>removeUploadSession</summary>

<div>

Remove upload session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listParts</summary>

<div>

List parts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `UploadParts|error`

**Sample code:**

```ballerina
box:UploadParts result = check boxClient->listParts("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "offset": 1,
      "size": 1,
      "part_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>planUploadSession</summary>

<div>

Plan upload session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `payload` | <code>UploadSessionPlanRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadSessionPlanResponse|error`

**Sample code:**

```ballerina
box:UploadSessionPlanResponse result = check boxClient->planUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    parts: [{
        offset: 1,
        size: 1,
        sha512: "string"
    }]
});
```

**Sample response:**

```json
{
  "hits": [
    {
      "offset": 1,
      "size": 1,
      "sha512": "string",
      "part_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "upload_session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "misses": [
    {
      "offset": 1,
      "size": 1,
      "sha512": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>commitUploadSession</summary>

<div>

Commit upload session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uploadSessionId` | <code>string</code> | Yes | The ID of the upload session. |
| `headers` | <code>CommitUploadSessionHeaders</code> | Yes | Request headers, including the required `digest`. Optional: `ifNoneMatch`, `ifMatch`. |
| `payload` | <code>CommitUploadSessionRequest</code> | Yes |  |

**Returns:** `Files|error?`

**Sample code:**

```ballerina
box:Files? result = check boxClient->commitUploadSession("3fa85f64-5717-4562-b3fc-2c963f66afa6", {digest: "string"}, {
    parts: [{
        offset: 1,
        size: 1,
        partId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>copyFile</summary>

<div>

Copy file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>CopyFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileFull|error?`

**Sample code:**

```ballerina
box:FileFull? result = check boxClient->copyFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    parent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    name: "Sample name",
    version: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getFileThumbnail</summary>

<div>

Get file thumbnail.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `extension` | <code>"png"&#124;"jpg"</code> | Yes | The file format for the thumbnail. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `maxWidth` | <code>int</code> | No | The maximum width of the thumbnail. |
| `minHeight` | <code>int</code> | No | The minimum height of the thumbnail. |
| `maxHeight` | <code>int</code> | No | The maximum height of the thumbnail. |
| `minWidth` | <code>int</code> | No | The minimum width of the thumbnail. |

**Returns:** `byte[]|error?`

**Sample code:**

```ballerina
byte[]? result = check boxClient->getFileThumbnail("3fa85f64-5717-4562-b3fc-2c963f66afa6", "png");
```

**Sample response:**

The raw response content as `byte[]?`.

</div>
</details>

<details>
<summary>listFileCollaborations</summary>

<div>

List file collaborations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Collaborations|error`

**Sample code:**

```ballerina
box:Collaborations result = check boxClient->listFileCollaborations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "type": "collaboration",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>listFileComments</summary>

<div>

List file comments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Comments|error`

**Sample code:**

```ballerina
box:Comments result = check boxClient->listFileComments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "comment",
      "created_at": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listTasksOnFile</summary>

<div>

List tasks on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tasks|error`

**Sample code:**

```ballerina
box:Tasks result = check boxClient->listTasksOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      },
      "action": "review",
      "created_at": "string"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getTrashedFile</summary>

<div>

Get trashed file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashFile|error`

**Sample code:**

```ballerina
box:TrashFile result = check boxClient->getTrashedFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "description": "Sample description",
  "created_at": "string",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "type": "file",
  "item_status": "active",
  "sha1": "string",
  "size": 1,
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "modified_at": "string",
  "path_collection": {
    "total_count": 1,
    "entries": [
      "string"
    ]
  }
}
```

</div>
</details>

<details>
<summary>permanentlyRemoveFile</summary>

<div>

Permanently remove file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->permanentlyRemoveFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listAllFileVersions</summary>

<div>

List all file versions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileVersions|error`

**Sample code:**

```ballerina
box:FileVersions result = check boxClient->listAllFileVersions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file_version",
      "sha1": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getFileVersion</summary>

<div>

Get file version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `fileVersionId` | <code>string</code> | Yes | The ID of the file version. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileVersionFull|error`

**Sample code:**

```ballerina
box:FileVersionFull result = check boxClient->getFileVersion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file_version",
  "sha1": "string",
  "restored_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "uploader_display_name": "Sample name",
  "size": 1
}
```

</div>
</details>

<details>
<summary>restoreFileVersion</summary>

<div>

Restore file version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `fileVersionId` | <code>string</code> | Yes | The ID of the file version. |
| `payload` | <code>RestoreFileVersionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileVersionFull|error`

**Sample code:**

```ballerina
box:FileVersionFull result = check boxClient->restoreFileVersion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    trashedAt: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file_version",
  "sha1": "string",
  "restored_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "uploader_display_name": "Sample name",
  "size": 1
}
```

</div>
</details>

<details>
<summary>removeFileVersion</summary>

<div>

Remove file version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `fileVersionId` | <code>string</code> | Yes | The ID of the file version. |
| `headers` | <code>RemoveFileVersionHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeFileVersion("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>promoteFileVersion</summary>

<div>

Promote file version.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>PromoteFileVersionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileVersionFull|error`

**Sample code:**

```ballerina
box:FileVersionFull result = check boxClient->promoteFileVersion("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'type: "file_version"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file_version",
  "sha1": "string",
  "restored_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "uploader_display_name": "Sample name",
  "size": 1
}
```

</div>
</details>

<details>
<summary>listMetadataInstancesOnFile</summary>

<div>

List metadata instances on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `view` | <code>string</code> | No | Taxonomy field values are returned in `API view` by default, meaning the value is represented with a taxonomy node identifier. To retrieve the `Hydrated view`, where taxonomy values are represented with the full taxonomy node information, set this parameter to `hydrated`. This is the only supported value for this parameter. |

**Returns:** `Metadatas|error`

**Sample code:**

```ballerina
box:Metadatas result = check boxClient->listMetadataInstancesOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "$scope": "string",
      "$template": "string",
      "$parent": "string"
    }
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getClassificationOnFile</summary>

<div>

Get classification on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->getClassificationOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>updateClassificationOnFile</summary>

<div>

Update classification on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>UpdateClassificationOnFileRequest[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->updateClassificationOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    op: "replace",
    path: "/Box__Security__Classification__Key",
    value: "string"
}]);
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>addClassificationToFile</summary>

<div>

Add classification to file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>AddClassificationToFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->addClassificationToFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    boxSecurityClassificationKey: "string"
});
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>removeClassificationFromFile</summary>

<div>

Remove classification from file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeClassificationFromFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getMetadataInstanceOnFile</summary>

<div>

Get metadata instance on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `view` | <code>string</code> | No | Taxonomy field values are returned in `API view` by default, meaning the value is represented with a taxonomy node identifier. To retrieve the `Hydrated view`, where taxonomy values are represented with the full taxonomy node information, set this parameter to `hydrated`. This is the only supported value for this parameter. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->getMetadataInstanceOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string");
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>updateMetadataInstanceOnFile</summary>

<div>

Update metadata instance on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `payload` | <code>AMetadataInstanceUpdateOperation[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->updateMetadataInstanceOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string", [{
    op: "add",
    path: "string",
    'from: "string"
}]);
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>createMetadataInstanceOnFile</summary>

<div>

Create metadata instance on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `payload` | <code>record &#123;&#125;</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->createMetadataInstanceOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string", {});
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>removeMetadataInstanceFromFile</summary>

<div>

Remove metadata instance from file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataInstanceFromFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string");
```

</div>
</details>

<details>
<summary>listSkillCardsOnFile</summary>

<div>

List Box Skill cards on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SkillCardsMetadata|error`

**Sample code:**

```ballerina
box:SkillCardsMetadata result = check boxClient->listSkillCardsOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "$scope": "string",
  "cards": [
    {
      "invocation": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "skill_invocation"
      },
      "entries": [
        {}
      ],
      "skill": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "service"
      },
      "type": "skill_card",
      "skill_card_type": "keyword"
    }
  ],
  "$template": "string",
  "$parent": "string",
  "$version": 1,
  "$typeVersion": 1
}
```

</div>
</details>

<details>
<summary>updateSkillCardsOnFile</summary>

<div>

Update Box Skill cards on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>UpdateSkillCardsOnFileRequest[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SkillCardsMetadata|error`

**Sample code:**

```ballerina
box:SkillCardsMetadata result = check boxClient->updateSkillCardsOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    op: "replace",
    path: "string",
    value: {
        invocation: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            'type: "skill_invocation"
        },
        entries: [{}],
        skill: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            'type: "service"
        },
        'type: "skill_card",
        skillCardType: "keyword"
    }
}]);
```

**Sample response:**

```json
{
  "$scope": "string",
  "cards": [
    {
      "invocation": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "skill_invocation"
      },
      "entries": [
        {}
      ],
      "skill": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "service"
      },
      "type": "skill_card",
      "skill_card_type": "keyword"
    }
  ],
  "$template": "string",
  "$parent": "string",
  "$version": 1,
  "$typeVersion": 1
}
```

</div>
</details>

<details>
<summary>createSkillCardsOnFile</summary>

<div>

Create Box Skill cards on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>CreateSkillCardsOnFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SkillCardsMetadata|error`

**Sample code:**

```ballerina
box:SkillCardsMetadata result = check boxClient->createSkillCardsOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    cards: [{
        invocation: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            'type: "skill_invocation"
        },
        entries: [{}],
        skill: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            'type: "service"
        },
        'type: "skill_card",
        skillCardType: "keyword"
    }]
});
```

**Sample response:**

```json
{
  "$scope": "string",
  "cards": [
    {
      "invocation": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "skill_invocation"
      },
      "entries": [
        {}
      ],
      "skill": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "service"
      },
      "type": "skill_card",
      "skill_card_type": "keyword"
    }
  ],
  "$template": "string",
  "$parent": "string",
  "$version": 1,
  "$typeVersion": 1
}
```

</div>
</details>

<details>
<summary>removeSkillCardsFromFile</summary>

<div>

Remove Box Skill cards from file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeSkillCardsFromFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getWatermarkOnFile</summary>

<div>

Get watermark on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Watermark|error`

**Sample code:**

```ballerina
box:Watermark result = check boxClient->getWatermarkOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "watermark": {
    "created_at": "string",
    "modified_at": "string"
  }
}
```

</div>
</details>

<details>
<summary>applyWatermarkToFile</summary>

<div>

Apply watermark to file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>ApplyWatermarkToFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Watermark|error`

**Sample code:**

```ballerina
box:Watermark result = check boxClient->applyWatermarkToFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    watermark: {
        imprint: "default"
    }
});
```

**Sample response:**

```json
{
  "watermark": {
    "created_at": "string",
    "modified_at": "string"
  }
}
```

</div>
</details>

<details>
<summary>removeWatermarkFromFile</summary>

<div>

Remove watermark from file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeWatermarkFromFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getSharedLinkForFile</summary>

<div>

Get shared link for file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FileFull|error`

**Sample code:**

```ballerina
box:FileFull result = check boxClient->getSharedLinkForFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>addSharedLinkToFile</summary>

<div>

Add shared link to file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>AddSharedLinkToFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FileFull|error`

**Sample code:**

```ballerina
box:FileFull result = check boxClient->addSharedLinkToFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateSharedLinkOnFile</summary>

<div>

Update shared link on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>UpdateSharedLinkOnFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FileFull|error`

**Sample code:**

```ballerina
box:FileFull result = check boxClient->updateSharedLinkOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>removeSharedLinkFromFile</summary>

<div>

Remove shared link from file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | The unique identifier that represents a file. |
| `payload` | <code>RemoveSharedLinkFromFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FileFull|error`

**Sample code:**

```ballerina
box:FileFull result = check boxClient->removeSharedLinkFromFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### File requests

<details>
<summary>getFileRequest</summary>

<div>

Get file request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileRequestId` | <code>string</code> | Yes | The unique identifier that represent a file request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileRequest|error`

**Sample code:**

```ballerina
box:FileRequest result = check boxClient->getFileRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "created_at": "string",
  "type": "file_request",
  "folder": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "updated_at": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>updateFileRequest</summary>

<div>

Update file request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileRequestId` | <code>string</code> | Yes | The unique identifier that represent a file request. |
| `payload` | <code>FileRequestUpdateRequest</code> | Yes |  |
| `headers` | <code>UpdateFileRequestHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |

**Returns:** `FileRequest|error`

**Sample code:**

```ballerina
box:FileRequest result = check boxClient->updateFileRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expiresAt: "string",
    description: "Sample description",
    isDescriptionRequired: false,
    title: "string"
});
```

**Sample response:**

```json
{
  "created_at": "string",
  "type": "file_request",
  "folder": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "updated_at": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteFileRequest</summary>

<div>

Delete file request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileRequestId` | <code>string</code> | Yes | The unique identifier that represent a file request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteFileRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>copyFileRequest</summary>

<div>

Copy file request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileRequestId` | <code>string</code> | Yes | The unique identifier that represent a file request. |
| `payload` | <code>FileRequestCopyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileRequest|error`

**Sample code:**

```ballerina
box:FileRequest result = check boxClient->copyFileRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    folder: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    },
    expiresAt: "string",
    description: "Sample description",
    isDescriptionRequired: false
});
```

**Sample response:**

```json
{
  "created_at": "string",
  "type": "file_request",
  "folder": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "updated_at": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "description": "Sample description"
}
```

</div>
</details>

#### Folders

<details>
<summary>getFolderInformation</summary>

<div>

Get folder information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>GetFolderInformationHeaders</code> | No | Request headers. Optional fields: `boxapi`, `ifNoneMatch`. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Offset-based pagination is not guaranteed to work reliably for high offset values and may fail for large datasets. In those cases, reduce the number of items in the folder (for example, by restructuring the folder into smaller subfolders) before retrying the request. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `sort` | <code>"id"&#124;"name"&#124;"date"&#124;"size"</code> | No | Defines the **second** attribute by which items are sorted. The folder type affects the way the items are sorted: * **Standard folder**: Items are always sorted by their `type` first, with folders listed before files, and files listed before web links. * **Root folder**: This parameter is not supported for marker-based pagination on the root folder (the folder with an `id` of `0`). * **Shared folder with parent path to the associated folder visible to the collaborator**: Items are always sorted by their `type` first, with folders listed before files, and files listed before web links. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. Additionally this field can be used to query any metadata applied to the file by specifying the `metadata` field as well as the scope and key of the template to retrieve, for example `?fields=metadata.enterprise_12345.contractTemplate`. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | The direction to sort results in. This can be either in alphabetical ascending (`ASC`) or descending (`DESC`) order. |

**Returns:** `FolderFull|error?`

**Sample code:**

```ballerina
box:FolderFull? result = check boxClient->getFolderInformation("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateFolder</summary>

<div>

Update folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>UpdateFolderRequest</code> | Yes |  |
| `headers` | <code>UpdateFolderHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->updateFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    isCollaborationRestrictedToEnterprise: false,
    canNonOwnersViewCollaborators: false,
    collections: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "string"
    }],
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>restoreFolder</summary>

<div>

Restore folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>RestoreFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashFolderRestored|error`

**Sample code:**

```ballerina
box:TrashFolderRestored result = check boxClient->restoreFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "created_at": "string",
  "description": "Sample description",
  "content_created_at": "string",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "type": "folder"
}
```

</div>
</details>

<details>
<summary>deleteFolder</summary>

<div>

Delete folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>DeleteFolderHeaders</code> | No | Request headers. Optional fields: `ifMatch`. Defaults to `{}`. |
| `recursive` | <code>boolean</code> | No | Delete a folder that is not empty by recursively deleting the folder and all of its content. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listFolderAppItemAssociations</summary>

<div>

List folder app item associations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `applicationType` | <code>string</code> | No | If given, returns only app items for this application type. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `AppItemAssociations|error`

**Sample code:**

```ballerina
box:AppItemAssociations result = check boxClient->listFolderAppItemAssociations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      },
      "app_item": {
        "application_type": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "app_item"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "app_item_association"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listItemsInFolder</summary>

<div>

List items in folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>ListItemsInFolderHeaders</code> | No | Request headers. Optional fields: `boxapi`. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Offset-based pagination is not guaranteed to work reliably for high offset values and may fail for large datasets. In those cases, use marker-based pagination by setting `usemarker` to `true`. Defaults to `0`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `sort` | <code>"id"&#124;"name"&#124;"date"&#124;"size"</code> | No | Defines the **second** attribute by which items are sorted. The folder type affects the way the items are sorted: * **Standard folder**: Items are always sorted by their `type` first, with folders listed before files, and files listed before web links. * **Root folder**: This parameter is not supported for marker-based pagination on the root folder (the folder with an `id` of `0`). * **Shared folder with parent path to the associated folder visible to the collaborator**: Items are always sorted by their `type` first, with folders listed before files, and files listed before web links. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. Additionally this field can be used to query any metadata applied to the file by specifying the `metadata` field as well as the scope and key of the template to retrieve, for example `?fields=metadata.enterprise_12345.contractTemplate`. |
| `usemarker` | <code>boolean</code> | No | Specifies whether to use marker-based pagination instead of offset-based pagination. Only one pagination method can be used at a time. By setting this value to true, the API will return a `marker` field that can be passed as a parameter to this endpoint to get the next page of the response. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | The direction to sort results in. This can be either in alphabetical ascending (`ASC`) or descending (`DESC`) order. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
box:Items result = check boxClient->listItemsInFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "offset": 1,
  "total_count": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createFolder</summary>

<div>

Create folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->createFolder({
    parent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    name: "Sample name",
    syncState: "synced"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>copyFolder</summary>

<div>

Copy folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier of the folder to copy. |
| `payload` | <code>CopyFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FolderFull|error?`

**Sample code:**

```ballerina
box:FolderFull? result = check boxClient->copyFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    parent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>listFolderCollaborations</summary>

<div>

List folder collaborations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Collaborations|error`

**Sample code:**

```ballerina
box:Collaborations result = check boxClient->listFolderCollaborations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "type": "collaboration",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getTrashedFolder</summary>

<div>

Get trashed folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashFolder|error`

**Sample code:**

```ballerina
box:TrashFolder result = check boxClient->getTrashedFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "description": "Sample description",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "type": "folder",
  "item_status": "active",
  "created_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "size": 1,
  "name": "Sample name",
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "path_collection": {
    "total_count": 1,
    "entries": [
      "string"
    ]
  }
}
```

</div>
</details>

<details>
<summary>permanentlyRemoveFolder</summary>

<div>

Permanently remove folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->permanentlyRemoveFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listMetadataInstancesOnFolder</summary>

<div>

List metadata instances on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `view` | <code>string</code> | No | Taxonomy field values are returned in `API view` by default, meaning the value is represented with a taxonomy node identifier. To retrieve the `Hydrated view`, where taxonomy values are represented with the full taxonomy node information, set this parameter to `hydrated`. This is the only supported value for this parameter. |

**Returns:** `Metadatas|error`

**Sample code:**

```ballerina
box:Metadatas result = check boxClient->listMetadataInstancesOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "$scope": "string",
      "$template": "string",
      "$parent": "string"
    }
  ],
  "limit": 1
}
```

</div>
</details>

<details>
<summary>getClassificationOnFolder</summary>

<div>

Get classification on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->getClassificationOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>updateClassificationOnFolder</summary>

<div>

Update classification on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>UpdateClassificationOnFolderRequest[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->updateClassificationOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    op: "replace",
    path: "/Box__Security__Classification__Key",
    value: "string"
}]);
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>addClassificationToFolder</summary>

<div>

Add classification to folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>AddClassificationToFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Classification|error`

**Sample code:**

```ballerina
box:Classification result = check boxClient->addClassificationToFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    boxSecurityClassificationKey: "string"
});
```

**Sample response:**

```json
{
  "$scope": "string",
  "$template": "securityClassification-6VMVochwUWo",
  "$parent": "string",
  "$version": 1,
  "Box__Security__Classification__Key": "string",
  "$typeVersion": 100.00
}
```

</div>
</details>

<details>
<summary>removeClassificationFromFolder</summary>

<div>

Remove classification from folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeClassificationFromFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getMetadataInstanceOnFolder</summary>

<div>

Get metadata instance on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->getMetadataInstanceOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string");
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>updateMetadataInstanceOnFolder</summary>

<div>

Update metadata instance on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `payload` | <code>AMetadataInstanceUpdateOperation[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->updateMetadataInstanceOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string", [{
    op: "add",
    path: "string",
    'from: "string"
}]);
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>createMetadataInstanceOnFolder</summary>

<div>

Create metadata instance on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `payload` | <code>record &#123;&#125;</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataFull|error`

**Sample code:**

```ballerina
box:MetadataFull result = check boxClient->createMetadataInstanceOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string", {});
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>removeMetadataInstanceFromFolder</summary>

<div>

Remove metadata instance from folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataInstanceFromFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", "global", "string");
```

</div>
</details>

<details>
<summary>listTrashedItems</summary>

<div>

List trashed items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `sort` | <code>"name"&#124;"date"&#124;"size"</code> | No | Defines the **second** attribute by which items are sorted. Items are always sorted by their `type` first, with folders listed before files, and files listed before web links. This parameter is not supported when using marker-based pagination. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `usemarker` | <code>boolean</code> | No | Specifies whether to use marker-based pagination instead of offset-based pagination. Only one pagination method can be used at a time. By setting this value to true, the API will return a `marker` field that can be passed as a parameter to this endpoint to get the next page of the response. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | The direction to sort results in. This can be either in alphabetical ascending (`ASC`) or descending (`DESC`) order. |

**Returns:** `Items|error`

**Sample code:**

```ballerina
box:Items result = check boxClient->listTrashedItems();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "offset": 1,
  "total_count": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getWatermarkForFolder</summary>

<div>

Get watermark for folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Watermark|error`

**Sample code:**

```ballerina
box:Watermark result = check boxClient->getWatermarkForFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "watermark": {
    "created_at": "string",
    "modified_at": "string"
  }
}
```

</div>
</details>

<details>
<summary>applyWatermarkToFolder</summary>

<div>

Apply watermark to folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>ApplyWatermarkToFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Watermark|error`

**Sample code:**

```ballerina
box:Watermark result = check boxClient->applyWatermarkToFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    watermark: {
        imprint: "default"
    }
});
```

**Sample response:**

```json
{
  "watermark": {
    "created_at": "string",
    "modified_at": "string"
  }
}
```

</div>
</details>

<details>
<summary>removeWatermarkFromFolder</summary>

<div>

Remove watermark from folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeWatermarkFromFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getSharedLinkForFolder</summary>

<div>

Get shared link for folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->getSharedLinkForFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>addSharedLinkToFolder</summary>

<div>

Add shared link to folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>AddSharedLinkToFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->addSharedLinkToFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateSharedLinkOnFolder</summary>

<div>

Update shared link on folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>UpdateSharedLinkOnFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->updateSharedLinkOnFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>removeSharedLinkFromFolder</summary>

<div>

Remove shared link from folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. |
| `payload` | <code>RemoveSharedLinkFromFolderRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->removeSharedLinkFromFolder("3fa85f64-5717-4562-b3fc-2c963f66afa6", {}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

#### Folder locks

<details>
<summary>listFolderLocks</summary>

<div>

List folder locks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. |

**Returns:** `FolderLocks|error`

**Sample code:**

```ballerina
box:FolderLocks result = check boxClient->listFolderLocks(folderId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "entries": [
    {
      "folder": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      },
      "created_at": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "limit": "string"
}
```

</div>
</details>

<details>
<summary>createFolderLock</summary>

<div>

Create folder lock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFolderLockRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FolderLock|error`

**Sample code:**

```ballerina
box:FolderLock result = check boxClient->createFolderLock({
    folder: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "string"
    },
    lockedOperations: {
        move: false,
        delete: false
    }
});
```

**Sample response:**

```json
{
  "folder": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "locked_operations": {
    "move": false,
    "delete": false
  },
  "type": "string",
  "lock_type": "string"
}
```

</div>
</details>

<details>
<summary>deleteFolderLock</summary>

<div>

Delete folder lock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `folderLockId` | <code>string</code> | Yes | The ID of the folder lock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteFolderLock("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Metadata templates

<details>
<summary>findMetadataTemplateByInstanceID</summary>

<div>

Find metadata template by instance ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `metadataInstanceId` | <code>string</code> | Yes | The ID of an instance of the metadata template to find. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTemplates|error`

**Sample code:**

```ballerina
box:MetadataTemplates result = check boxClient->findMetadataTemplateByInstanceID(metadataInstanceId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "metadata_template",
      "copyInstanceOnItemCopy": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>listAllClassifications</summary>

<div>

List all classifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClassificationTemplate|error`

**Sample code:**

```ballerina
box:ClassificationTemplate result = check boxClient->listAllClassifications();
```

**Sample response:**

```json
{
  "displayName": "Classification",
  "scope": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "fields": [
    {
      "displayName": "Classification",
      "options": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "key": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "enum",
      "key": "Box__Security__Classification__Key"
    }
  ],
  "templateKey": "securityClassification-6VMVochwUWo"
}
```

</div>
</details>

<details>
<summary>addClassification</summary>

<div>

Add classification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddClassificationRequest[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClassificationTemplate|error`

**Sample code:**

```ballerina
box:ClassificationTemplate result = check boxClient->addClassification([{
    op: "addEnumOption",
    data: {
        'key: "string"
    },
    fieldKey: "Box__Security__Classification__Key"
}]);
```

**Sample response:**

```json
{
  "displayName": "Classification",
  "scope": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "fields": [
    {
      "displayName": "Classification",
      "options": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "key": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "enum",
      "key": "Box__Security__Classification__Key"
    }
  ],
  "templateKey": "securityClassification-6VMVochwUWo"
}
```

</div>
</details>

<details>
<summary>updateClassification</summary>

<div>

Update classification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UpdateClassificationRequest[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClassificationTemplate|error`

**Sample code:**

```ballerina
box:ClassificationTemplate result = check boxClient->updateClassification([{
    op: "editEnumOption",
    data: {
        'key: "string"
    },
    fieldKey: "Box__Security__Classification__Key",
    enumOptionKey: "string"
}]);
```

**Sample response:**

```json
{
  "displayName": "Classification",
  "scope": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "fields": [
    {
      "displayName": "Classification",
      "options": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "key": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "enum",
      "key": "Box__Security__Classification__Key"
    }
  ],
  "templateKey": "securityClassification-6VMVochwUWo"
}
```

</div>
</details>

<details>
<summary>getMetadataTemplateByName</summary>

<div>

Get metadata template by name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTemplate|error`

**Sample code:**

```ballerina
box:MetadataTemplate result = check boxClient->getMetadataTemplateByName("global", "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "copyInstanceOnItemCopy": false,
  "hidden": false,
  "displayName": "Sample name",
  "scope": "string"
}
```

</div>
</details>

<details>
<summary>updateMetadataTemplate</summary>

<div>

Update metadata template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `payload` | <code>AMetadataTemplateUpdateOperation[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTemplate|error`

**Sample code:**

```ballerina
box:MetadataTemplate result = check boxClient->updateMetadataTemplate("global", "string", [{
    op: "editTemplate",
    enumOptionKeys: ["string"],
    multiSelectOptionKeys: ["string"]
}]);
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "copyInstanceOnItemCopy": false,
  "hidden": false,
  "displayName": "Sample name",
  "scope": "string"
}
```

</div>
</details>

<details>
<summary>removeMetadataTemplate</summary>

<div>

Remove metadata template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scope` | <code>"global"&#124;"enterprise"</code> | Yes | The scope of the metadata template. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataTemplate("global", "string");
```

</div>
</details>

<details>
<summary>getMetadataTemplateByID</summary>

<div>

Get metadata template by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | <code>string</code> | Yes | The ID of the template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTemplate|error`

**Sample code:**

```ballerina
box:MetadataTemplate result = check boxClient->getMetadataTemplateByID("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "copyInstanceOnItemCopy": false,
  "hidden": false,
  "displayName": "Sample name",
  "scope": "string"
}
```

</div>
</details>

<details>
<summary>listAllGlobalMetadataTemplates</summary>

<div>

List all global metadata templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTemplates|error`

**Sample code:**

```ballerina
box:MetadataTemplates result = check boxClient->listAllGlobalMetadataTemplates();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "metadata_template",
      "copyInstanceOnItemCopy": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>listAllMetadataTemplatesForEnterprise</summary>

<div>

List all metadata templates for enterprise.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTemplates|error`

**Sample code:**

```ballerina
box:MetadataTemplates result = check boxClient->listAllMetadataTemplatesForEnterprise();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "metadata_template",
      "copyInstanceOnItemCopy": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMetadataTemplate</summary>

<div>

Create metadata template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMetadataTemplateRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTemplate|error`

**Sample code:**

```ballerina
box:MetadataTemplate result = check boxClient->createMetadataTemplate({
    displayName: "Sample name",
    scope: "string",
    copyInstanceOnItemCopy: false,
    hidden: false
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "copyInstanceOnItemCopy": false,
  "hidden": false,
  "displayName": "Sample name",
  "scope": "string"
}
```

</div>
</details>

<details>
<summary>addInitialClassifications</summary>

<div>

Add initial classifications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddInitialClassificationsRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClassificationTemplate|error`

**Sample code:**

```ballerina
box:ClassificationTemplate result = check boxClient->addInitialClassifications({
    displayName: "Classification",
    scope: "enterprise",
    fields: [{
        displayName: "Classification",
        options: [{
            'key: "string"
        }],
        'type: "enum",
        'key: "Box__Security__Classification__Key"
    }],
    templateKey: "securityClassification-6VMVochwUWo"
});
```

**Sample response:**

```json
{
  "displayName": "Classification",
  "scope": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_template",
  "fields": [
    {
      "displayName": "Classification",
      "options": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "key": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "enum",
      "key": "Box__Security__Classification__Key"
    }
  ],
  "templateKey": "securityClassification-6VMVochwUWo"
}
```

</div>
</details>

<details>
<summary>listTaxonomyFieldOptions</summary>

<div>

List metadata template's options for taxonomy field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `templateKey` | <code>string</code> | Yes | The name of the metadata template. |
| `fieldKey` | <code>string</code> | Yes | The key of the metadata taxonomy field in the template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `parent` | <code>string[]</code> | No | Node identifier of a direct parent node. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `level` | <code>int[]</code> | No | Filters results by taxonomy level. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `ancestor` | <code>string[]</code> | No | Node identifier of any ancestor node. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `query` | <code>string</code> | No | Query text to search for the taxonomy nodes. |
| `includeTotalResultCount` | <code>boolean</code> | No | When set to `true` this provides the total number of nodes that matched the query. The response will compute counts of up to 10,000 elements. Defaults to `false`. |
| `onlySelectableOptions` | <code>boolean</code> | No | When set to `true`, this only returns valid selectable options for this template taxonomy field. Otherwise, it returns all taxonomy nodes, whether or not they are selectable. Defaults to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTaxonomyNodes|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyNodes result = check boxClient->listTaxonomyFieldOptions("string", "string", "string");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "level": 1,
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

#### Metadata cascade policies

<details>
<summary>listMetadataCascadePolicies</summary>

<div>

List metadata cascade policies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `folderId` | <code>string</code> | Yes | Specifies which folder to return policies for. This can not be used on the root folder with ID `0`. |
| `ownerEnterpriseId` | <code>string</code> | No | The ID of the enterprise ID for which to find metadata cascade policies. If not specified, it defaults to the current enterprise. |

**Returns:** `MetadataCascadePolicies|error`

**Sample code:**

```ballerina
box:MetadataCascadePolicies result = check boxClient->listMetadataCascadePolicies(folderId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "metadata_cascade_policy",
      "scope": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMetadataCascadePolicy</summary>

<div>

Create metadata cascade policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMetadataCascadePolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataCascadePolicy|error`

**Sample code:**

```ballerina
box:MetadataCascadePolicy result = check boxClient->createMetadataCascadePolicy({
    scope: "global",
    folderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    templateKey: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_cascade_policy",
  "owner_enterprise": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "enterprise"
  },
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  },
  "scope": "string",
  "templateKey": "string"
}
```

</div>
</details>

<details>
<summary>getMetadataCascadePolicy</summary>

<div>

Get metadata cascade policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadataCascadePolicyId` | <code>string</code> | Yes | The ID of the metadata cascade policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataCascadePolicy|error`

**Sample code:**

```ballerina
box:MetadataCascadePolicy result = check boxClient->getMetadataCascadePolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "metadata_cascade_policy",
  "owner_enterprise": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "enterprise"
  },
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  },
  "scope": "string",
  "templateKey": "string"
}
```

</div>
</details>

<details>
<summary>removeMetadataCascadePolicy</summary>

<div>

Remove metadata cascade policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadataCascadePolicyId` | <code>string</code> | Yes | The ID of the metadata cascade policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataCascadePolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>applyMetadataCascadePolicy</summary>

<div>

Force-apply metadata cascade policy to folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metadataCascadePolicyId` | <code>string</code> | Yes | The ID of the cascade policy to force-apply. |
| `payload` | <code>ApplyMetadataCascadePolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->applyMetadataCascadePolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    conflictResolution: "none"
});
```

</div>
</details>

#### Metadata queries

<details>
<summary>queryFilesFoldersByMetadata</summary>

<div>

Query files/folders by metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>MetadataQuery</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataQueryResults|error`

**Sample code:**

```ballerina
box:MetadataQueryResults result = check boxClient->queryFilesFoldersByMetadata({
    'from: "string",
    ancestorFolderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    marker: "string",
    query: "string"
});
```

**Sample response:**

```json
{
  "next_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ],
  "limit": 1
}
```

</div>
</details>

#### Comments

<details>
<summary>getComment</summary>

<div>

Get comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>string</code> | Yes | The ID of the comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `CommentFull|error`

**Sample code:**

```ballerina
box:CommentFull result = check boxClient->getComment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "comment",
  "created_at": "string",
  "is_reply_comment": false,
  "message": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>updateComment</summary>

<div>

Update comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>string</code> | Yes | The ID of the comment. |
| `payload` | <code>UpdateCommentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `CommentFull|error`

**Sample code:**

```ballerina
box:CommentFull result = check boxClient->updateComment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    message: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "comment",
  "created_at": "string",
  "is_reply_comment": false,
  "message": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>removeComment</summary>

<div>

Remove comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>string</code> | Yes | The ID of the comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeComment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>createComment</summary>

<div>

Create comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCommentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `CommentFull|error`

**Sample code:**

```ballerina
box:CommentFull result = check boxClient->createComment({
    item: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    },
    message: "string",
    taggedMessage: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "comment",
  "created_at": "string",
  "is_reply_comment": false,
  "message": "string",
  "modified_at": "string"
}
```

</div>
</details>

#### Collaborations

<details>
<summary>getCollaboration</summary>

<div>

Get collaboration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationId` | <code>string</code> | Yes | The ID of the collaboration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Collaboration|error`

**Sample code:**

```ballerina
box:Collaboration result = check boxClient->getCollaboration("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "collaboration",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "role": "editor",
  "is_access_only": false,
  "app_item": {
    "application_type": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "app_item"
  }
}
```

</div>
</details>

<details>
<summary>updateCollaboration</summary>

<div>

Update collaboration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationId` | <code>string</code> | Yes | The ID of the collaboration. |
| `payload` | <code>UpdateCollaborationRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Collaboration|error?`

**Sample code:**

```ballerina
box:Collaboration? result = check boxClient->updateCollaboration("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    role: "editor",
    expiresAt: "string",
    canViewPath: false,
    status: "pending"
});
```

**Sample response:**

```json
{
  "type": "collaboration",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "role": "editor",
  "is_access_only": false,
  "app_item": {
    "application_type": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "app_item"
  }
}
```

</div>
</details>

<details>
<summary>removeCollaboration</summary>

<div>

Remove collaboration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationId` | <code>string</code> | Yes | The ID of the collaboration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeCollaboration("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listPendingCollaborations</summary>

<div>

List pending collaborations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `status` | <code>"pending"</code> | Yes | The status of the collaborations to retrieve. |

**Returns:** `CollaborationsOffsetPaginated|error`

**Sample code:**

```ballerina
box:CollaborationsOffsetPaginated result = check boxClient->listPendingCollaborations(status = "pending");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "entries": [
    {
      "type": "collaboration",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCollaboration</summary>

<div>

Create collaboration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCollaborationRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `notify` | <code>boolean</code> | No | Determines if users should receive email notification for the action performed. |

**Returns:** `Collaboration|error`

**Sample code:**

```ballerina
box:Collaboration result = check boxClient->createCollaboration({
    item: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    },
    accessibleBy: {
        'type: "user",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        login: "string"
    },
    role: "editor",
    expiresAt: "string"
});
```

**Sample response:**

```json
{
  "type": "collaboration",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "role": "editor",
  "is_access_only": false,
  "app_item": {
    "application_type": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "app_item"
  }
}
```

</div>
</details>

#### Search

<details>
<summary>searchForContent</summary>

<div>

Search for content.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `createdAtRange` | <code>string[]</code> | No | Limits the search results to any items created within a given date range. Date ranges are defined as comma separated RFC3339 timestamps. If the start date is omitted (`,2014-05-17T13:35:01-07:00`) anything created before the end date will be returned. If the end date is omitted (`2014-05-15T13:35:01-07:00,`) the current date will be used as the end date instead. |
| `updatedAtRange` | <code>string[]</code> | No | Limits the search results to any items updated within a given date range. Date ranges are defined as comma separated RFC3339 timestamps. If the start date is omitted (`,2014-05-17T13:35:01-07:00`) anything updated before the end date will be returned. If the end date is omitted (`2014-05-15T13:35:01-07:00,`) the current date will be used as the end date instead. |
| `recentUpdaterUserIds` | <code>string[]</code> | No | Limits the search results to any items that have been updated by the given list of users, defined as a list of comma separated user IDs. The items still need to be owned or shared with the currently authenticated user for them to show up in the search results. If the user does not have access to any files owned by any of the users an empty result set will be returned. This feature only searches back to the last 10 versions of an item. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `deletedAtRange` | <code>string[]</code> | No | Limits the search results to any items deleted within a given date range. Date ranges are defined as comma separated RFC3339 timestamps. If the start date is omitted (`2014-05-17T13:35:01-07:00`), anything deleted before the end date will be returned. If the end date is omitted (`2014-05-15T13:35:01-07:00`), the current date will be used as the end date instead. The `trash_content` parameter needs to be set to `trashed_only`. If searching in trash is not performed, then an empty result is returned. Data available from 2023-02-01 onwards. |
| `trashContent` | <code>"non_trashed_only"&#124;"trashed_only"&#124;"all_items"</code> | No | Determines if the search should look in the trash for items. By default, this API only returns search results for items not currently in the trash (`non_trashed_only`). * `trashed_only` - Only searches for items currently in the trash * `non_trashed_only` - Only searches for items currently not in the trash * `all_items` - Searches for both trashed and non-trashed items. Defaults to `"non_trashed_only"`. |
| `query` | <code>string</code> | No | The string to search for. This query is matched against item names, descriptions, text content of files, and various other fields of the different item types. This parameter supports a variety of operators to further refine the results returns. * `""` - by wrapping a query in double quotes only exact matches are returned by the API. Exact searches do not return search matches based on specific character sequences. Instead, they return matches based on phrases, that is, word sequences. For example: A search for `"Blue-Box"` may return search results including the sequence `"blue.box"`, `"Blue Box"`, and `"Blue-Box"`; any item containing the words `Blue` and `Box` consecutively, in the order specified. * `AND` - returns items that contain both the search terms. For example, a search for `marketing AND BoxWorks` returns items that have both `marketing` and `BoxWorks` within its text in any order. It does not return a result that only has `BoxWorks` in its text. * `OR` - returns items that contain either of the search terms. For example, a search for `marketing OR BoxWorks` returns a result that has either `marketing` or `BoxWorks` within its text. Using this operator is not necessary as we implicitly interpret multi-word queries as `OR` unless another supported boolean term is used. * `NOT` - returns items that do not contain the search term provided. For example, a search for `marketing AND NOT BoxWorks` returns a result that has only `marketing` within its text. Results containing `BoxWorks` are omitted. We do not support lower case (that is, `and`, `or`, and `not`) or mixed case (that is, `And`, `Or`, and `Not`) operators. This field is required unless the `mdfilters` parameter is defined. |
| `sort` | <code>"modified_at"&#124;"relevance"</code> | No | Defines the order in which search results are returned. This API defaults to returning items by relevance unless this parameter is explicitly specified. * `relevance` (default) returns the results sorted by relevance to the query search term. The relevance is based on the occurrence of the search term in the items name, description, content, and additional properties. * `modified_at` returns the results ordered in descending order by date at which the item was last modified. Defaults to `"relevance"`. |
| `ancestorFolderIds` | <code>string[]</code> | No | Limits the search results to items within the given list of folders, defined as a comma separated lists of folder IDs. Search results will also include items within any subfolders of those ancestor folders. The folders still need to be owned or shared with the currently authenticated user. If the folder is not accessible by this user, or it does not exist, a `HTTP 404` error code will be returned instead. To search across an entire enterprise, we recommend using the `enterprise_content` scope parameter which can be requested with our support team. |
| `'type` | <code>"file"&#124;"folder"&#124;"web_link"</code> | No | Limits the search results to any items of this type. This parameter only takes one value. By default the API returns items that match any of these types. * `file` - Limits the search results to files, * `folder` - Limits the search results to folders, * `web_link` - Limits the search results to web links, also known as bookmarks. |
| `mdfilters` | <code>MetadataFilter[]</code> | No | Limits the search results to any items for which the metadata matches the provided filter. This parameter is a list that specifies exactly **one** metadata template used to filter the search results. The parameter is required unless the `query` parameter is provided. |
| `includeRecentSharedLinks` | <code>boolean</code> | No | Defines whether the search results should include any items that the user recently accessed through a shared link. When this parameter has been set to true, the format of the response of this API changes to return a list of [Search Results with Shared Links](https://developer.box.com/reference/resources/search-results-with-shared-links). Defaults to `false`. |
| `ownerUserIds` | <code>string[]</code> | No | Limits the search results to any items that are owned by the given list of owners, defined as a list of comma separated user IDs. The items still need to be owned or shared with the currently authenticated user for them to show up in the search results. If the user does not have access to any files owned by any of the users an empty result set will be returned. To search across an entire enterprise, we recommend using the `enterprise_content` scope parameter which can be requested with our support team. |
| `fileExtensions` | <code>string[]</code> | No | Limits the search results to any files that match any of the provided file extensions. This list is a comma-separated list of file extensions without the dots. |
| `deletedUserIds` | <code>string[]</code> | No | Limits the search results to items that were deleted by the given list of users, defined as a list of comma separated user IDs. The `trash_content` parameter needs to be set to `trashed_only`. If searching in trash is not performed, an empty result set is returned. The items need to be owned or shared with the currently authenticated user for them to show up in the search results. If the user does not have access to any files owned by any of the users, an empty result set is returned. Data available from 2023-02-01 onwards. |
| `scope` | <code>"user_content"&#124;"enterprise_content"</code> | No | Limits the search results to either the files that the user has access to, or to files available to the entire enterprise. The scope defaults to `user_content`, which limits the search results to content that is available to the currently authenticated user. The `enterprise_content` can be requested by an admin through our support channels. Once this scope has been enabled for a user, it will allow that use to query for content across the entire enterprise and not only the content that they have access to. Defaults to `"user_content"`. |
| `'limit` | <code>int</code> | No | Defines the maximum number of items to return as part of a page of results. Defaults to `30`. |
| `contentTypes` | <code>("name"&#124;"description"&#124;"file_content"&#124;"comments"&#124;"tags")[]</code> | No | Limits the search results to any items that match the search query for a specific part of the file, for example the file description. Content types are defined as a comma separated lists of Box recognized content types. The allowed content types are as follows. * `name` - The name of the item, as defined by its `name` field. * `description` - The description of the item, as defined by its `description` field. * `file_content` - The actual content of the file. * `comments` - The content of any of the comments on a file or folder. * `tags` - Any tags that are applied to an item, as defined by its `tags` field. |
| `sizeRange` | <code>int[]</code> | No | Limits the search results to any items with a size within a given file size range. This applied to files and folders. Size ranges are defined as comma separated list of a lower and upper byte size limit (inclusive). The upper and lower bound can be omitted to create open ranges. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `direction` | <code>"DESC"&#124;"ASC"</code> | No | Defines the direction in which search results are ordered. This API defaults to returning items in descending (`DESC`) order unless this parameter is explicitly specified. When results are sorted by `relevance` the ordering is locked to returning items in descending order of relevance, and this parameter is ignored. Defaults to `"DESC"`. |

**Returns:** `SearchResultsResponse|error`

**Sample code:**

```ballerina
box:SearchResultsResponse result = check boxClient->searchForContent();
```

**Sample response:**

The raw response content as `SearchResultsResponse`.

</div>
</details>

#### Tasks

<details>
<summary>createTask</summary>

<div>

Create task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaskRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Task|error`

**Sample code:**

```ballerina
box:Task result = check boxClient->createTask({
    item: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    },
    action: "review",
    dueAt: "string",
    message: "string"
});
```

**Sample response:**

```json
{
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "action": "review",
  "task_assignment_collection": {
    "total_count": 1
  },
  "created_at": "string",
  "due_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getTask</summary>

<div>

Get task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Task|error`

**Sample code:**

```ballerina
box:Task result = check boxClient->getTask("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "action": "review",
  "task_assignment_collection": {
    "total_count": 1
  },
  "created_at": "string",
  "due_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>updateTask</summary>

<div>

Update task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task. |
| `payload` | <code>UpdateTaskRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Task|error`

**Sample code:**

```ballerina
box:Task result = check boxClient->updateTask("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    action: "review",
    dueAt: "string",
    message: "string",
    completionRule: "all_assignees"
});
```

**Sample response:**

```json
{
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "action": "review",
  "task_assignment_collection": {
    "total_count": 1
  },
  "created_at": "string",
  "due_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>removeTask</summary>

<div>

Remove task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeTask("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listTaskAssignments</summary>

<div>

List task assignments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | <code>string</code> | Yes | The ID of the task. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaskAssignments|error`

**Sample code:**

```ballerina
box:TaskAssignments result = check boxClient->listTaskAssignments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "resolution_state": "completed",
      "completed_at": "string",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ],
  "total_count": 1
}
```

</div>
</details>

#### Task assignments

<details>
<summary>assignTask</summary>

<div>

Assign task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignTaskRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaskAssignment|error`

**Sample code:**

```ballerina
box:TaskAssignment result = check boxClient->assignTask({
    task: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "task"
    },
    assignTo: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        login: "string"
    }
});
```

**Sample response:**

```json
{
  "resolution_state": "completed",
  "completed_at": "string",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "assigned_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getTaskAssignment</summary>

<div>

Get task assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskAssignmentId` | <code>string</code> | Yes | The ID of the task assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaskAssignment|error`

**Sample code:**

```ballerina
box:TaskAssignment result = check boxClient->getTaskAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "resolution_state": "completed",
  "completed_at": "string",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "assigned_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateTaskAssignment</summary>

<div>

Update task assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskAssignmentId` | <code>string</code> | Yes | The ID of the task assignment. |
| `payload` | <code>UpdateTaskAssignmentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaskAssignment|error`

**Sample code:**

```ballerina
box:TaskAssignment result = check boxClient->updateTaskAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    resolutionState: "completed",
    message: "string"
});
```

**Sample response:**

```json
{
  "resolution_state": "completed",
  "completed_at": "string",
  "item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "assigned_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>unassignTask</summary>

<div>

Unassign task.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskAssignmentId` | <code>string</code> | Yes | The ID of the task assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->unassignTask("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Shared files

<details>
<summary>findFileForSharedLink</summary>

<div>

Find file for shared link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>FindFileForSharedLinkHeaders</code> | Yes | Request headers, including the required `boxapi`. Optional: `ifNoneMatch`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileFull|error?`

**Sample code:**

```ballerina
box:FileFull? result = check boxClient->findFileForSharedLink({boxapi: "string"});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file",
  "etag": "string",
  "sha1": "string",
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Shared folders

<details>
<summary>findFolderForSharedLink</summary>

<div>

Find folder for shared link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>FindFolderForSharedLinkHeaders</code> | Yes | Request headers, including the required `boxapi`. Optional: `ifNoneMatch`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FolderFull|error?`

**Sample code:**

```ballerina
box:FolderFull? result = check boxClient->findFolderForSharedLink({boxapi: "string"});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

#### Web links

<details>
<summary>createWebLink</summary>

<div>

Create web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->createWebLink({
    parent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    url: "https://example.com/resource",
    name: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>getWebLink</summary>

<div>

Get web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `headers` | <code>GetWebLinkHeaders</code> | No | Request headers. Optional fields: `boxapi`. Defaults to `{}`. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->getWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>updateWebLink</summary>

<div>

Update web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `payload` | <code>UpdateWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->updateWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    description: "Sample description",
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    },
    url: "https://example.com/resource"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>restoreWebLink</summary>

<div>

Restore web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `payload` | <code>RestoreWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashWebLinkRestored|error`

**Sample code:**

```ballerina
box:TrashWebLinkRestored result = check boxClient->restoreWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "path_collection": {
    "total_count": 1,
    "entries": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    ]
  },
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "description": "Sample description",
  "created_at": "string",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>removeWebLink</summary>

<div>

Remove web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getTrashedWebLink</summary>

<div>

Get trashed web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `TrashWebLink|error`

**Sample code:**

```ballerina
box:TrashWebLink result = check boxClient->getTrashedWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "description": "Sample description",
  "created_at": "string",
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "type": "web_link",
  "item_status": "active"
}
```

</div>
</details>

<details>
<summary>permanentlyRemoveWebLink</summary>

<div>

Permanently remove web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->permanentlyRemoveWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getSharedLinkForWebLink</summary>

<div>

Get shared link for web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->getSharedLinkForWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>addSharedLinkToWebLink</summary>

<div>

Add shared link to web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `payload` | <code>AddSharedLinkToWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->addSharedLinkToWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>updateSharedLinkOnWebLink</summary>

<div>

Update shared link on web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `payload` | <code>UpdateSharedLinkOnWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->updateSharedLinkOnWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    sharedLink: {
        password: "string",
        access: "open",
        vanityName: "Sample name"
    }
}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>removeSharedLinkFromWebLink</summary>

<div>

Remove shared link from web link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webLinkId` | <code>string</code> | Yes | The ID of the web link. |
| `payload` | <code>RemoveSharedLinkFromWebLinkRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string</code> | Yes | Explicitly request the `shared_link` fields to be returned for this item. |

**Returns:** `WebLink|error`

**Sample code:**

```ballerina
box:WebLink result = check boxClient->removeSharedLinkFromWebLink("3fa85f64-5717-4562-b3fc-2c963f66afa6", {}, fields = "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

#### Shared web links

<details>
<summary>findWebLinkForSharedLink</summary>

<div>

Find web link for shared link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>FindWebLinkForSharedLinkHeaders</code> | Yes | Request headers, including the required `boxapi`. Optional: `ifNoneMatch`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `WebLink|error?`

**Sample code:**

```ballerina
box:WebLink? result = check boxClient->findWebLinkForSharedLink({boxapi: "string"});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "web_link",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "url": "https://example.com/resource"
}
```

</div>
</details>

#### Shared app items

<details>
<summary>findAppItemForSharedLink</summary>

<div>

Find app item for shared link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>FindAppItemForSharedLinkHeaders</code> | Yes | Request headers, including the required `boxapi`. |

**Returns:** `AppItem|error`

**Sample code:**

```ballerina
box:AppItem result = check boxClient->findAppItemForSharedLink({boxapi: "string"});
```

**Sample response:**

```json
{
  "application_type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "app_item"
}
```

</div>
</details>

#### Users

<details>
<summary>listEnterpriseUsers</summary>

<div>

List enterprise users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `userType` | <code>"all"&#124;"managed"&#124;"external"</code> | No | Limits the results to the kind of user specified. * `all` returns every kind of user for whom the `login` or `name` partially matches the `filter_term`. It will only return an external user if the login matches the `filter_term` completely, and in that case it will only return that user. * `managed` returns all managed and app users for whom the `login` or `name` partially matches the `filter_term`. * `external` returns all external users for whom the `login` matches the `filter_term` exactly. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `filterTerm` | <code>string</code> | No | Limits the results to only users who's `name` or `login` start with the search term. For externally managed users, the search term needs to completely match the in order to find the user, and it will only return one user at a time. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `externalAppUserId` | <code>string</code> | No | Limits the results to app users with the given `external_app_user_id` value. When creating an app user, an `external_app_user_id` value can be set. This value can then be used in this endpoint to find any users that match that `external_app_user_id` value. |
| `usemarker` | <code>boolean</code> | No | Specifies whether to use marker-based pagination instead of offset-based pagination. Only one pagination method can be used at a time. By setting this value to true, the API will return a `marker` field that can be passed as a parameter to this endpoint to get the next page of the response. |

**Returns:** `Users|error`

**Sample code:**

```ballerina
box:Users result = check boxClient->listEnterpriseUsers();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "offset": 1,
  "total_count": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createUser</summary>

<div>

Create user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `UserFull|error`

**Sample code:**

```ballerina
box:UserFull result = check boxClient->createUser({
    name: "Sample name",
    canSeeManagedUsers: false,
    role: "coadmin",
    address: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "user",
  "name": "Sample name",
  "login": "string",
  "space_used": 1,
  "max_upload_size": 1
}
```

</div>
</details>

<details>
<summary>getCurrentUser</summary>

<div>

Get current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `UserFull|error`

**Sample code:**

```ballerina
box:UserFull result = check boxClient->getCurrentUser();
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "user",
  "name": "Sample name",
  "login": "string",
  "space_used": 1,
  "max_upload_size": 1
}
```

</div>
</details>

<details>
<summary>createJobsToTerminateUsersSession</summary>

<div>

Create jobs to terminate users session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateJobsToTerminateUsersSessionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SessionTerminationMessage|error`

**Sample code:**

```ballerina
box:SessionTerminationMessage result = check boxClient->createJobsToTerminateUsersSession({
    userIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    userLogins: ["string"]
});
```

**Sample response:**

```json
{
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getUser</summary>

<div>

Get user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `UserFull|error`

**Sample code:**

```ballerina
box:UserFull result = check boxClient->getUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "user",
  "name": "Sample name",
  "login": "string",
  "space_used": 1,
  "max_upload_size": 1
}
```

</div>
</details>

<details>
<summary>updateUser</summary>

<div>

Update user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `payload` | <code>UpdateUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `UserFull|error`

**Sample code:**

```ballerina
box:UserFull result = check boxClient->updateUser("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    canSeeManagedUsers: false,
    role: "coadmin",
    address: "string",
    notificationEmail: {
        email: "user@example.com"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "user",
  "name": "Sample name",
  "login": "string",
  "space_used": 1,
  "max_upload_size": 1
}
```

</div>
</details>

<details>
<summary>deleteUser</summary>

<div>

Delete user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `force` | <code>boolean</code> | No | Specifies whether to delete the user even if they still own files. |
| `notify` | <code>boolean</code> | No | Whether the user will receive email notification of the deletion. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getUserAvatar</summary>

<div>

Get user avatar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check boxClient->getUserAvatar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>addOrUpdateUserAvatar</summary>

<div>

Add or update user avatar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `payload` | <code>AddOrUpdateUserAvatarRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UserAvatar|error`

**Sample code:**

```ballerina
box:UserAvatar result = check boxClient->addOrUpdateUserAvatar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    pic: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "pic_urls": {
    "small": "string",
    "preview": "string",
    "large": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteUserAvatar</summary>

<div>

Delete user avatar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteUserAvatar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>transferOwnedFolders</summary>

<div>

Transfer owned folders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `payload` | <code>TransferOwnedFoldersRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `notify` | <code>boolean</code> | No | Determines if users should receive email notification for the action performed. |

**Returns:** `FolderFull|error`

**Sample code:**

```ballerina
box:FolderFull result = check boxClient->transferOwnedFolders("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    ownedBy: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "folder",
  "etag": "string",
  "sequence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "parent": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  }
}
```

</div>
</details>

<details>
<summary>listUserEmailAliases</summary>

<div>

List user's email aliases.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmailAliases|error`

**Sample code:**

```ballerina
box:EmailAliases result = check boxClient->listUserEmailAliases("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "is_confirmed": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "email_alias"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>createEmailAlias</summary>

<div>

Create email alias.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `payload` | <code>CreateEmailAliasRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EmailAlias|error`

**Sample code:**

```ballerina
box:EmailAlias result = check boxClient->createEmailAlias("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    email: "user@example.com"
});
```

**Sample response:**

```json
{
  "is_confirmed": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "email_alias",
  "email": "user@example.com"
}
```

</div>
</details>

<details>
<summary>removeEmailAlias</summary>

<div>

Remove email alias.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `emailAliasId` | <code>string</code> | Yes | The ID of the email alias. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeEmailAlias("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listUserGroups</summary>

<div>

List user's groups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The ID of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `GroupMemberships|error`

**Sample code:**

```ballerina
box:GroupMemberships result = check boxClient->listUserGroups("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "role": "member",
      "created_at": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

#### Invites

<details>
<summary>createUserInvite</summary>

<div>

Create user invite.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateUserInviteRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Invite|error`

**Sample code:**

```ballerina
box:Invite result = check boxClient->createUserInvite({
    enterprise: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    actionableBy: {
        login: "string"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "invite",
  "actionable_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "created_at": "string",
  "invited_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>getUserInviteStatus</summary>

<div>

Get user invite status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `inviteId` | <code>string</code> | Yes | The ID of an invite. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Invite|error`

**Sample code:**

```ballerina
box:Invite result = check boxClient->getUserInviteStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "invite",
  "actionable_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "created_at": "string",
  "invited_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "modified_at": "string"
}
```

</div>
</details>

#### Groups

<details>
<summary>listGroupsForEnterprise</summary>

<div>

List groups for enterprise.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `filterTerm` | <code>string</code> | No | Limits the results to only groups whose `name` starts with the search term. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Groups|error`

**Sample code:**

```ballerina
box:Groups result = check boxClient->listGroupsForEnterprise();
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "group",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createGroup</summary>

<div>

Create group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateGroupRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupFull|error`

**Sample code:**

```ballerina
box:GroupFull result = check boxClient->createGroup({
    name: "Sample name",
    provenance: "string",
    invitabilityLevel: "admins_only",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group",
  "name": "Sample name",
  "group_type": "managed_group",
  "created_at": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>createJobsToTerminateUserGroupSession</summary>

<div>

Create jobs to terminate user group session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateJobsToTerminateUserGroupSessionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SessionTerminationMessage|error`

**Sample code:**

```ballerina
box:SessionTerminationMessage result = check boxClient->createJobsToTerminateUserGroupSession({
    groupIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"]
});
```

**Sample response:**

```json
{
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getGroup</summary>

<div>

Get group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The ID of the group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupFull|error`

**Sample code:**

```ballerina
box:GroupFull result = check boxClient->getGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group",
  "name": "Sample name",
  "group_type": "managed_group",
  "created_at": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>updateGroup</summary>

<div>

Update group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The ID of the group. |
| `payload` | <code>UpdateGroupRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupFull|error`

**Sample code:**

```ballerina
box:GroupFull result = check boxClient->updateGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    provenance: "string",
    invitabilityLevel: "admins_only",
    name: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group",
  "name": "Sample name",
  "group_type": "managed_group",
  "created_at": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>removeGroup</summary>

<div>

Remove group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The ID of the group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listMembersOfGroup</summary>

<div>

List members of group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The ID of the group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `GroupMemberships|error`

**Sample code:**

```ballerina
box:GroupMemberships result = check boxClient->listMembersOfGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "role": "member",
      "created_at": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listGroupCollaborations</summary>

<div>

List group collaborations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | <code>string</code> | Yes | The ID of the group. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `CollaborationsOffsetPaginated|error`

**Sample code:**

```ballerina
box:CollaborationsOffsetPaginated result = check boxClient->listGroupCollaborations("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "entries": [
    {
      "type": "collaboration",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ]
}
```

</div>
</details>

#### Group memberships

<details>
<summary>addUserToGroup</summary>

<div>

Add user to group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddUserToGroupRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupMembership|error`

**Sample code:**

```ballerina
box:GroupMembership result = check boxClient->addUserToGroup({
    user: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    group: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    role: "member"
});
```

**Sample response:**

```json
{
  "role": "member",
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group_membership",
  "modified_at": "string",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getGroupMembership</summary>

<div>

Get group membership.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupMembershipId` | <code>string</code> | Yes | The ID of the group membership. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupMembership|error`

**Sample code:**

```ballerina
box:GroupMembership result = check boxClient->getGroupMembership("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "role": "member",
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group_membership",
  "modified_at": "string",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateGroupMembership</summary>

<div>

Update group membership.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupMembershipId` | <code>string</code> | Yes | The ID of the group membership. |
| `payload` | <code>UpdateGroupMembershipRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `GroupMembership|error`

**Sample code:**

```ballerina
box:GroupMembership result = check boxClient->updateGroupMembership("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    role: "member"
});
```

**Sample response:**

```json
{
  "role": "member",
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "group_membership",
  "modified_at": "string",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>removeUserFromGroup</summary>

<div>

Remove user from group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupMembershipId` | <code>string</code> | Yes | The ID of the group membership. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeUserFromGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Webhooks

<details>
<summary>listAllWebhooks</summary>

<div>

List all webhooks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `Webhooks|error`

**Sample code:**

```ballerina
box:Webhooks result = check boxClient->listAllWebhooks();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "webhook"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createWebhook</summary>

<div>

Create webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateWebhookRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
box:Webhook result = check boxClient->createWebhook({
    address: "string",
    triggers: ["FILE.UPLOADED"],
    target: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "webhook",
  "target": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file"
  },
  "address": "string",
  "created_at": "string",
  "triggers": [
    "FILE.UPLOADED"
  ]
}
```

</div>
</details>

<details>
<summary>getWebhook</summary>

<div>

Get webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | <code>string</code> | Yes | The ID of the webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
box:Webhook result = check boxClient->getWebhook("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "webhook",
  "target": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file"
  },
  "address": "string",
  "created_at": "string",
  "triggers": [
    "FILE.UPLOADED"
  ]
}
```

</div>
</details>

<details>
<summary>updateWebhook</summary>

<div>

Update webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | <code>string</code> | Yes | The ID of the webhook. |
| `payload` | <code>UpdateWebhookRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
box:Webhook result = check boxClient->updateWebhook("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    address: "string",
    triggers: ["FILE.UPLOADED"],
    target: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "webhook",
  "target": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file"
  },
  "address": "string",
  "created_at": "string",
  "triggers": [
    "FILE.UPLOADED"
  ]
}
```

</div>
</details>

<details>
<summary>removeWebhook</summary>

<div>

Remove webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | <code>string</code> | Yes | The ID of the webhook. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeWebhook("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Skill invocations

<details>
<summary>updateAllSkillCardsOnFile</summary>

<div>

Update all Box Skill cards on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `skillId` | <code>string</code> | Yes | The ID of the skill to apply this metadata for. |
| `payload` | <code>UpdateAllSkillCardsOnFileRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->updateAllSkillCardsOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    metadata: {
        cards: [{
            invocation: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                'type: "skill_invocation"
            },
            entries: [{}],
            skill: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                'type: "service"
            },
            'type: "skill_card",
            skillCardType: "keyword"
        }]
    },
    file: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    },
    status: "invoked",
    fileVersion: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file_version"
    }
});
```

</div>
</details>

#### Events

<details>
<summary>listUserAndEnterpriseEvents</summary>

<div>

List user and enterprise events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `eventType` | <code>("ACCESS_GRANTED"&#124;"ACCESS_REVOKED"&#124;"ADD_DEVICE_ASSOCIATION"&#124;"ADD_LOGIN_ACTIVITY_DEVICE"&#124;"ADMIN_LOGIN"&#124;"ADVANCED_FOLDER_SETTINGS_UPDATE"&#124;"APPLICATION_CREATED"&#124;"APPLICATION_PUBLIC_KEY_ADDED"&#124;"APPLICATION_PUBLIC_KEY_DELETED"&#124;"CHANGE_ADMIN_ROLE"&#124;"CHANGE_FOLDER_PERMISSION"&#124;"COLLABORATION_ACCEPT"&#124;"COLLABORATION_EXPIRATION"&#124;"COLLABORATION_INVITE"&#124;"COLLABORATION_REMOVE"&#124;"COLLABORATION_ROLE_CHANGE"&#124;"COMMENT_CREATE"&#124;"COMMENT_DELETE"&#124;"COMMENT_EDIT"&#124;"CONTENT_WORKFLOW_ABNORMAL_DOWNLOAD_ACTIVITY"&#124;"CONTENT_WORKFLOW_AUTOMATION_ADD"&#124;"CONTENT_WORKFLOW_AUTOMATION_DELETE"&#124;"CONTENT_WORKFLOW_POLICY_ADD"&#124;"CONTENT_WORKFLOW_SHARING_POLICY_VIOLATION"&#124;"CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION"&#124;"COPY"&#124;"DATA_RETENTION_CREATE_RETENTION"&#124;"DATA_RETENTION_REMOVE_RETENTION"&#124;"DELETE"&#124;"DELETE_USER"&#124;"DEVICE_TRUST_CHECK_FAILED"&#124;"DOWNLOAD"&#124;"EDIT"&#124;"EDIT_USER"&#124;"EMAIL_ALIAS_CONFIRM"&#124;"EMAIL_ALIAS_PRIMARY"&#124;"EMAIL_ALIAS_REMOVE"&#124;"EMAIL_UPLOAD_DISABLED"&#124;"EMAIL_UPLOAD_ENABLED"&#124;"ENTERPRISE_APP_AUTHORIZATION_UPDATE"&#124;"EXTERNAL_COLLAB_SECURITY_SETTINGS"&#124;"FAILED_LOGIN"&#124;"FAVORITE"&#124;"FILE_MARKED_MALICIOUS"&#124;"FILE_REQUEST_CREATE"&#124;"FILE_REQUEST_DELETE"&#124;"FILE_REQUEST_UPDATE"&#124;"FILE_VERSION_RESTORE"&#124;"FILE_WATERMARKED_DOWNLOAD"&#124;"GROUP_ADD_ITEM"&#124;"GROUP_ADD_USER"&#124;"GROUP_CREATION"&#124;"GROUP_DELETION"&#124;"GROUP_EDITED"&#124;"GROUP_REMOVE_ITEM"&#124;"GROUP_REMOVE_USER"&#124;"ILLEGAL_ITEM_OWNERSHIP_TRANSFER_BY_USER"&#124;"ITEM_EMAIL_SEND"&#124;"ITEM_MODIFY"&#124;"ITEM_OPEN"&#124;"ITEM_SHARED_UPDATE"&#124;"ITEM_SYNC"&#124;"ITEM_UNSYNC"&#124;"LEGAL_HOLD_ASSIGNMENT_CREATE"&#124;"LEGAL_HOLD_ASSIGNMENT_DELETE"&#124;"LEGAL_HOLD_POLICY_CREATE"&#124;"LEGAL_HOLD_POLICY_DELETE"&#124;"LEGAL_HOLD_POLICY_UPDATE"&#124;"LOCK"&#124;"LOGIN"&#124;"METADATA_CASCADE_POLICY_APPLY"&#124;"METADATA_CASCADE_POLICY_CREATE"&#124;"METADATA_INSTANCE_COPY"&#124;"METADATA_INSTANCE_CREATE"&#124;"METADATA_INSTANCE_DELETE"&#124;"METADATA_INSTANCE_UPDATE"&#124;"METADATA_TEMPLATE_CREATE"&#124;"METADATA_TEMPLATE_DELETE"&#124;"METADATA_TEMPLATE_UPDATE"&#124;"MOVE"&#124;"NEW_USER"&#124;"OAUTH2_ACCESS_TOKEN_REVOKE"&#124;"OAUTH2_REFRESH_TOKEN_REVOKE"&#124;"PREVIEW"&#124;"REMOVE_DEVICE_ASSOCIATION"&#124;"REMOVE_LOGIN_ACTIVITY_DEVICE"&#124;"RENAME"&#124;"RETENTION_POLICY_ASSIGNMENT_ADD"&#124;"SHARE"&#124;"SHARED_LINK_SEND"&#124;"SHARE_EXPIRATION"&#124;"SHIELD_ALERT"&#124;"SHIELD_DOWNLOAD_BLOCKED"&#124;"SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED"&#124;"SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED_MISSING_JUSTIFICATION"&#124;"SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED"&#124;"SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED_MISSING_JUSTIFICATION"&#124;"SHIELD_JUSTIFICATION_APPROVAL"&#124;"SHIELD_PREVIEW_BLOCKED"&#124;"SHIELD_SHARED_LINK_ACCESS_BLOCKED"&#124;"SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_CREATE"&#124;"SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_UPDATE"&#124;"SIGN_DOCUMENT_ASSIGNED"&#124;"SIGN_DOCUMENT_CANCELLED"&#124;"SIGN_DOCUMENT_COMPLETED"&#124;"SIGN_DOCUMENT_CONVERTED"&#124;"SIGN_DOCUMENT_CREATED"&#124;"SIGN_DOCUMENT_DECLINED"&#124;"SIGN_DOCUMENT_EXPIRED"&#124;"SIGN_DOCUMENT_SIGNED"&#124;"SIGN_DOCUMENT_VIEWED_BY_SIGNED"&#124;"SIGNER_DOWNLOADED"&#124;"SIGNER_FORWARDED"&#124;"STORAGE_EXPIRATION"&#124;"TASK_ASSIGNMENT_CREATE"&#124;"TASK_ASSIGNMENT_DELETE"&#124;"TASK_ASSIGNMENT_UPDATE"&#124;"TASK_CREATE"&#124;"TASK_UPDATE"&#124;"TERMS_OF_SERVICE_ACCEPT"&#124;"TERMS_OF_SERVICE_REJECT"&#124;"UNDELETE"&#124;"UNFAVORITE"&#124;"UNLOCK"&#124;"UNSHARE"&#124;"UPDATE_COLLABORATION_EXPIRATION"&#124;"UPDATE_SHARE_EXPIRATION"&#124;"UPLOAD"&#124;"USER_AUTHENTICATE_OAUTH2_ACCESS_TOKEN_CREATE"&#124;"WATERMARK_LABEL_CREATE"&#124;"WATERMARK_LABEL_DELETE"&#124;"WORKFLOW_AUTOMATION_CREATE"&#124;"WORKFLOW_AUTOMATION_DELETE"&#124;"WORKFLOW_AUTOMATION_UPDATE")[]</code> | No | A comma-separated list of events to filter by. This can only be used when requesting the events with a `stream_type` of `admin_logs` or `adming_logs_streaming`. For any other `stream_type` this value will be ignored. |
| `createdAfter` | <code>string</code> | No | The lower bound date and time to return events for. This can only be used when requesting the events with a `stream_type` of `admin_logs`. For any other `stream_type` this value will be ignored. |
| `createdBefore` | <code>string</code> | No | The upper bound date and time to return events for. This can only be used when requesting the events with a `stream_type` of `admin_logs`. For any other `stream_type` this value will be ignored. |
| `streamType` | <code>"all"&#124;"changes"&#124;"sync"&#124;"admin_logs"&#124;"admin_logs_streaming"</code> | No | Defines the type of events that are returned * `all` returns everything for a user and is the default * `changes` returns events that may cause file tree changes such as file updates or collaborations. * `sync` is similar to `changes` but only applies to synced folders * `admin_logs` returns all events for an entire enterprise and requires the user making the API call to have admin permissions. This stream type is for programmatically pulling from a 1 year history of events across all users within the enterprise and within a `created_after` and `created_before` time frame. The complete history of events will be returned in chronological order based on the event time, but latency will be much higher than `admin_logs_streaming`. * `admin_logs_streaming` returns all events for an entire enterprise and requires the user making the API call to have admin permissions. This stream type is for polling for recent events across all users within the enterprise. Latency will be much lower than `admin_logs`, but events will not be returned in chronological order and may contain duplicates. Defaults to `"all"`. |
| `'limit` | <code>int</code> | No | Limits the number of events returned. Note: Sometimes, the events less than the limit requested can be returned even when there may be more events remaining. This is primarily done in the case where a number of events have already been retrieved and these retrieved events are returned rather than delaying for an unknown amount of time to see if there are any more results. Defaults to `100`. |
| `streamPosition` | <code>string</code> | No | The location in the event stream to start receiving events from. * `now` will return an empty list events and the latest stream position for initialization. * `0` or `null` will return all events. |

**Returns:** `Events|error`

**Sample code:**

```ballerina
box:Events result = check boxClient->listUserAndEnterpriseEvents();
```

**Sample response:**

```json
{
  "chunk_size": 1,
  "entries": [
    {
      "recorded_at": "string",
      "event_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "event_type": "ACCESS_GRANTED"
    }
  ],
  "next_stream_position": "string"
}
```

</div>
</details>

<details>
<summary>getEventsLongPollEndpoint</summary>

<div>

Get events long poll endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RealtimeServers|error`

**Sample code:**

```ballerina
box:RealtimeServers result = check boxClient->getEventsLongPollEndpoint();
```

**Sample response:**

```json
{
  "chunk_size": 1,
  "entries": [
    {
      "retry_timeout": 1,
      "max_retries": "string",
      "type": "string"
    }
  ]
}
```

</div>
</details>

#### Collections

<details>
<summary>listAllCollections</summary>

<div>

List all collections.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `Collections|error`

**Sample code:**

```ballerina
box:Collections result = check boxClient->listAllCollections();
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "name": "Favorites",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "collection"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listCollectionItems</summary>

<div>

List collection items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionId` | <code>string</code> | Yes | The ID of the collection. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `offset` | <code>int</code> | No | The offset of the item at which to begin the response. Queries with offset parameter value exceeding 10000 will be rejected with a 400 response. Defaults to `0`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `ItemsOffsetPaginated|error`

**Sample code:**

```ballerina
box:ItemsOffsetPaginated result = check boxClient->listCollectionItems("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "offset": 1,
  "total_count": 1,
  "limit": 1,
  "order": [
    {
      "by": "string",
      "direction": "ASC"
    }
  ],
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getCollectionByID</summary>

<div>

Get collection by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionId` | <code>string</code> | Yes | The ID of the collection. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Collection|error`

**Sample code:**

```ballerina
box:Collection result = check boxClient->getCollectionByID("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "name": "Favorites",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "collection",
  "collection_type": "favorites"
}
```

</div>
</details>

#### Recent items

<details>
<summary>listRecentlyAccessedItems</summary>

<div>

List recently accessed items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `RecentItems|error`

**Sample code:**

```ballerina
box:RecentItems result = check boxClient->listRecentlyAccessedItems();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "interaction_shared_link": "string",
      "item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      },
      "interaction_type": "item_preview"
    }
  ]
}
```

</div>
</details>

#### Retention policies

<details>
<summary>listRetentionPolicies</summary>

<div>

List retention policies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `policyType` | <code>"finite"&#124;"indefinite"</code> | No | Filters results by the type of retention policy. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `policyName` | <code>string</code> | No | Filters results by a case sensitive prefix of the name of retention policies. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `createdByUserId` | <code>string</code> | No | Filters results by the ID of the user who created policy. |

**Returns:** `RetentionPolicies|error`

**Sample code:**

```ballerina
box:RetentionPolicies result = check boxClient->listRetentionPolicies();
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "retention_policy",
      "retention_length": "string"
    }
  ],
  "next_marker": "string",
  "limit": 1
}
```

</div>
</details>

<details>
<summary>createRetentionPolicy</summary>

<div>

Create retention policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateRetentionPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RetentionPolicy|error`

**Sample code:**

```ballerina
box:RetentionPolicy result = check boxClient->createRetentionPolicy({
    policyType: "finite",
    dispositionAction: "permanently_delete",
    policyName: "Sample name",
    retentionLength: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "retention_policy",
  "retention_length": "string",
  "disposition_action": "permanently_delete",
  "max_extension_length": "string",
  "policy_name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getRetentionPolicy</summary>

<div>

Get retention policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyId` | <code>string</code> | Yes | The ID of the retention policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `RetentionPolicy|error`

**Sample code:**

```ballerina
box:RetentionPolicy result = check boxClient->getRetentionPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "retention_policy",
  "retention_length": "string",
  "disposition_action": "permanently_delete",
  "max_extension_length": "string",
  "policy_name": "Sample name"
}
```

</div>
</details>

<details>
<summary>updateRetentionPolicy</summary>

<div>

Update retention policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyId` | <code>string</code> | Yes | The ID of the retention policy. |
| `payload` | <code>UpdateRetentionPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RetentionPolicy|error`

**Sample code:**

```ballerina
box:RetentionPolicy result = check boxClient->updateRetentionPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    retentionLength: "string",
    dispositionAction: "permanently_delete",
    maxExtensionLength: "string",
    policyName: "Sample name"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "retention_policy",
  "retention_length": "string",
  "disposition_action": "permanently_delete",
  "max_extension_length": "string",
  "policy_name": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteRetentionPolicy</summary>

<div>

Delete retention policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyId` | <code>string</code> | Yes | The ID of the retention policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteRetentionPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listRetentionPolicyAssignments</summary>

<div>

List retention policy assignments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyId` | <code>string</code> | Yes | The ID of the retention policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `'type` | <code>"folder"&#124;"enterprise"&#124;"metadata_template"</code> | No | The type of the retention policy assignment to retrieve. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `RetentionPolicyAssignments|error`

**Sample code:**

```ballerina
box:RetentionPolicyAssignments result = check boxClient->listRetentionPolicyAssignments("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "retention_policy_assignment",
      "retention_policy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "retention_policy"
      }
    }
  ],
  "next_marker": "string",
  "limit": 1
}
```

</div>
</details>

#### Retention policy assignments

<details>
<summary>assignRetentionPolicy</summary>

<div>

Assign retention policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignRetentionPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RetentionPolicyAssignment|error`

**Sample code:**

```ballerina
box:RetentionPolicyAssignment result = check boxClient->assignRetentionPolicy({
    policyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignTo: {
        'type: "enterprise",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    filterFields: [{
        'field: "string",
        value: "string"
    }],
    startDateField: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "retention_policy_assignment",
  "retention_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "retention_policy",
    "retention_length": "string"
  },
  "assigned_at": "string",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "assigned_to": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  }
}
```

</div>
</details>

<details>
<summary>getRetentionPolicyAssignment</summary>

<div>

Get retention policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyAssignmentId` | <code>string</code> | Yes | The ID of the retention policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `RetentionPolicyAssignment|error`

**Sample code:**

```ballerina
box:RetentionPolicyAssignment result = check boxClient->getRetentionPolicyAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "retention_policy_assignment",
  "retention_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "retention_policy",
    "retention_length": "string"
  },
  "assigned_at": "string",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "assigned_to": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  }
}
```

</div>
</details>

<details>
<summary>removeRetentionPolicyAssignment</summary>

<div>

Remove retention policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyAssignmentId` | <code>string</code> | Yes | The ID of the retention policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeRetentionPolicyAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getFilesUnderRetention</summary>

<div>

Get files under retention.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyAssignmentId` | <code>string</code> | Yes | The ID of the retention policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `FilesUnderRetention|error`

**Sample code:**

```ballerina
box:FilesUnderRetention result = check boxClient->getFilesUnderRetention("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getFileVersionsUnderRetention</summary>

<div>

Get file versions under retention.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `retentionPolicyAssignmentId` | <code>string</code> | Yes | The ID of the retention policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `FilesUnderRetention|error`

**Sample code:**

```ballerina
box:FilesUnderRetention result = check boxClient->getFileVersionsUnderRetention("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ]
}
```

</div>
</details>

#### Legal hold policies

<details>
<summary>listAllLegalHoldPolicies</summary>

<div>

List all legal hold policies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `policyName` | <code>string</code> | No | Limits results to policies for which the names start with this search term. This is a case-insensitive prefix. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `LegalHoldPolicies|error`

**Sample code:**

```ballerina
box:LegalHoldPolicies result = check boxClient->listAllLegalHoldPolicies();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "legal_hold_policy",
      "release_notes": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createLegalHoldPolicy</summary>

<div>

Create legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateLegalHoldPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LegalHoldPolicy|error`

**Sample code:**

```ballerina
box:LegalHoldPolicy result = check boxClient->createLegalHoldPolicy({
    policyName: "Sample name",
    isOngoing: false,
    description: "Sample description",
    filterEndedAt: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "legal_hold_policy",
  "assignment_counts": {
    "file_version": 1,
    "folder": 1,
    "file": 1
  },
  "release_notes": "string",
  "policy_name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getLegalHoldPolicy</summary>

<div>

Get legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyId` | <code>string</code> | Yes | The ID of the legal hold policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LegalHoldPolicy|error`

**Sample code:**

```ballerina
box:LegalHoldPolicy result = check boxClient->getLegalHoldPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "legal_hold_policy",
  "assignment_counts": {
    "file_version": 1,
    "folder": 1,
    "file": 1
  },
  "release_notes": "string",
  "policy_name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>updateLegalHoldPolicy</summary>

<div>

Update legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyId` | <code>string</code> | Yes | The ID of the legal hold policy. |
| `payload` | <code>UpdateLegalHoldPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LegalHoldPolicy|error`

**Sample code:**

```ballerina
box:LegalHoldPolicy result = check boxClient->updateLegalHoldPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    releaseNotes: "string",
    policyName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "legal_hold_policy",
  "assignment_counts": {
    "file_version": 1,
    "folder": 1,
    "file": 1
  },
  "release_notes": "string",
  "policy_name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>removeLegalHoldPolicy</summary>

<div>

Remove legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyId` | <code>string</code> | Yes | The ID of the legal hold policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeLegalHoldPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Legal hold policy assignments

<details>
<summary>listLegalHoldPolicyAssignments</summary>

<div>

List legal hold policy assignments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `policyId` | <code>string</code> | Yes | The ID of the legal hold policy. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `assignToId` | <code>string</code> | No | Filters the results by the ID of item the policy was applied to. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |
| `assignToType` | <code>"file"&#124;"file_version"&#124;"folder"&#124;"user"&#124;"ownership"&#124;"interactions"</code> | No | Filters the results by the type of item the policy was applied to. |

**Returns:** `LegalHoldPolicyAssignments|error`

**Sample code:**

```ballerina
box:LegalHoldPolicyAssignments result = check boxClient->listLegalHoldPolicyAssignments(policyId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "legal_hold_policy_assignment",
      "legal_hold_policy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "legal_hold_policy"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>assignLegalHoldPolicy</summary>

<div>

Assign legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignLegalHoldPolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LegalHoldPolicyAssignment|error`

**Sample code:**

```ballerina
box:LegalHoldPolicyAssignment result = check boxClient->assignLegalHoldPolicy({
    policyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    assignTo: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "legal_hold_policy_assignment",
  "legal_hold_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "legal_hold_policy"
  },
  "assigned_at": "string",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "deleted_at": "string"
}
```

</div>
</details>

<details>
<summary>getLegalHoldPolicyAssignment</summary>

<div>

Get legal hold policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyAssignmentId` | <code>string</code> | Yes | The ID of the legal hold policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LegalHoldPolicyAssignment|error`

**Sample code:**

```ballerina
box:LegalHoldPolicyAssignment result = check boxClient->getLegalHoldPolicyAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "legal_hold_policy_assignment",
  "legal_hold_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "legal_hold_policy"
  },
  "assigned_at": "string",
  "assigned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "deleted_at": "string"
}
```

</div>
</details>

<details>
<summary>unassignLegalHoldPolicy</summary>

<div>

Unassign legal hold policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyAssignmentId` | <code>string</code> | Yes | The ID of the legal hold policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->unassignLegalHoldPolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listFilesOnLegalHold</summary>

<div>

List files with current file versions for legal hold policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyAssignmentId` | <code>string</code> | Yes | The ID of the legal hold policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FilesOnHold|error`

**Sample code:**

```ballerina
box:FilesOnHold result = check boxClient->listFilesOnLegalHold("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listFileVersionsOnLegalHold</summary>

<div>

List previous file versions for legal hold policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalHoldPolicyAssignmentId` | <code>string</code> | Yes | The ID of the legal hold policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `FileVersionsOnHold|error`

**Sample code:**

```ballerina
box:FileVersionsOnHold result = check boxClient->listFileVersionsOnLegalHold("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file_version",
      "sha1": "string"
    }
  ]
}
```

</div>
</details>

#### File version retentions

<details>
<summary>listFileVersionRetentions</summary>

<div>

List file version retentions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `dispositionAction` | <code>"permanently_delete"&#124;"remove_retention"</code> | No | Filters results by the retention policy with this disposition action. |
| `policyId` | <code>string</code> | No | Filters results by the retention policy with this ID. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `fileId` | <code>string</code> | No | Filters results by files with this ID. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `dispositionAfter` | <code>string</code> | No | Filters results by files that will have their disposition come into effect after this date. |
| `fileVersionId` | <code>string</code> | No | Filters results by file versions with this ID. |
| `dispositionBefore` | <code>string</code> | No | Filters results by files that will have their disposition come into effect before this date. |

**Returns:** `FileVersionRetentions|error`

**Sample code:**

```ballerina
box:FileVersionRetentions result = check boxClient->listFileVersionRetentions();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "file_version": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file_version"
      },
      "applied_at": "string",
      "file": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>getRetentionOnFile</summary>

<div>

Get retention on file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileVersionRetentionId` | <code>string</code> | Yes | The ID of the file version retention. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileVersionRetention|error`

**Sample code:**

```ballerina
box:FileVersionRetention result = check boxClient->getRetentionOnFile("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "applied_at": "string",
  "file": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "disposition_at": "string",
  "winning_retention_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "retention_policy",
    "retention_length": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### File version legal holds

<details>
<summary>getFileVersionLegalHold</summary>

<div>

Get file version legal hold.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileVersionLegalHoldId` | <code>string</code> | Yes | The ID of the file version legal hold. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileVersionLegalHold|error`

**Sample code:**

```ballerina
box:FileVersionLegalHold result = check boxClient->getFileVersionLegalHold("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "file_version": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file_version",
    "sha1": "string"
  },
  "file": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "file",
    "etag": "string"
  },
  "legal_hold_policy_assignments": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "legal_hold_policy_assignment",
      "legal_hold_policy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "legal_hold_policy"
      }
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "file_version_legal_hold",
  "deleted_at": "string"
}
```

</div>
</details>

<details>
<summary>listFileVersionLegalHolds</summary>

<div>

List file version legal holds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `policyId` | <code>string</code> | Yes | The ID of the legal hold policy to get the file version legal holds for. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `FileVersionLegalHolds|error`

**Sample code:**

```ballerina
box:FileVersionLegalHolds result = check boxClient->listFileVersionLegalHolds(policyId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "file_version": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file_version"
      },
      "file": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "file"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

#### Shield information barriers

<details>
<summary>getShieldBarrier</summary>

<div>

Get shield information barrier with specified ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierId` | <code>string</code> | Yes | The ID of the shield information barrier. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrier|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrier result = check boxClient->getShieldBarrier("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "enterprise": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "enterprise"
  },
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "created_at": "string",
  "enabled_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>changeShieldBarrierStatus</summary>

<div>

Add changed status of shield information barrier with specified ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ChangeShieldBarrierStatusRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrier|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrier result = check boxClient->changeShieldBarrierStatus({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "pending"
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "enterprise": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "enterprise"
  },
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "created_at": "string",
  "enabled_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listShieldBarriers</summary>

<div>

List shield information barriers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `ShieldInformationBarriers|error`

**Sample code:**

```ballerina
box:ShieldInformationBarriers result = check boxClient->listShieldBarriers();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "updated_at": "2026-01-15T00:00:00",
      "updated_by": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "user"
      },
      "created_at": "string"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShieldBarrier</summary>

<div>

Create shield information barrier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShieldBarrierRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrier|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrier result = check boxClient->createShieldBarrier({
    enterprise: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "enterprise"
    }
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "enterprise": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "enterprise"
  },
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "created_at": "string",
  "enabled_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

#### Shield information barrier reports

<details>
<summary>listShieldBarrierReports</summary>

<div>

List shield information barrier reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `shieldInformationBarrierId` | <code>string</code> | Yes | The ID of the shield information barrier. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `ShieldInformationBarrierReports|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierReports result = check boxClient->listShieldBarrierReports(shieldInformationBarrierId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "shield_information_barrier_report",
      "updated_at": "2026-01-15T00:00:00"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShieldBarrierReport</summary>

<div>

Create shield information barrier report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ShieldInformationBarrierReference</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierReport|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierReport result = check boxClient->createShieldBarrierReport({
    shieldInformationBarrier: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_report",
  "updated_at": "2026-01-15T00:00:00",
  "created_at": "string",
  "created_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "status": "pending"
}
```

</div>
</details>

<details>
<summary>getShieldBarrierReport</summary>

<div>

Get shield information barrier report by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierReportId` | <code>string</code> | Yes | The ID of the shield information barrier Report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierReport|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierReport result = check boxClient->getShieldBarrierReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_report",
  "updated_at": "2026-01-15T00:00:00",
  "created_at": "string",
  "created_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "status": "pending"
}
```

</div>
</details>

#### Shield information barrier segments

<details>
<summary>getShieldBarrierSegment</summary>

<div>

Get shield information barrier segment with specified ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentId` | <code>string</code> | Yes | The ID of the shield information barrier segment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegment|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegment result = check boxClient->getShieldBarrierSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  },
  "name": "Sample name",
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "description": "Sample description",
  "created_at": "string"
}
```

</div>
</details>

<details>
<summary>updateShieldBarrierSegment</summary>

<div>

Update shield information barrier segment with specified ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentId` | <code>string</code> | Yes | The ID of the shield information barrier segment. |
| `payload` | <code>UpdateShieldBarrierSegmentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegment|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegment result = check boxClient->updateShieldBarrierSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    name: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  },
  "name": "Sample name",
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "description": "Sample description",
  "created_at": "string"
}
```

</div>
</details>

<details>
<summary>deleteShieldBarrierSegment</summary>

<div>

Delete shield information barrier segment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentId` | <code>string</code> | Yes | The ID of the shield information barrier segment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteShieldBarrierSegment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listShieldBarrierSegments</summary>

<div>

List shield information barrier segments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `shieldInformationBarrierId` | <code>string</code> | Yes | The ID of the shield information barrier. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `ShieldInformationBarrierSegments|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegments result = check boxClient->listShieldBarrierSegments(shieldInformationBarrierId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "updated_at": "2026-01-15T00:00:00",
      "name": "Sample name",
      "updated_by": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "user"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShieldBarrierSegment</summary>

<div>

Create shield information barrier segment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShieldBarrierSegmentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegment|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegment result = check boxClient->createShieldBarrierSegment({
    shieldInformationBarrier: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier"
    },
    name: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  },
  "name": "Sample name",
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "description": "Sample description",
  "created_at": "string"
}
```

</div>
</details>

#### Shield information barrier segment members

<details>
<summary>getShieldBarrierSegmentMember</summary>

<div>

Get shield information barrier segment member by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentMemberId` | <code>string</code> | Yes | The ID of the shield information barrier segment Member. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegmentMember|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentMember result = check boxClient->getShieldBarrierSegmentMember("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_segment_member",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  },
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  }
}
```

</div>
</details>

<details>
<summary>deleteShieldBarrierSegmentMember</summary>

<div>

Delete shield information barrier segment member by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentMemberId` | <code>string</code> | Yes | The ID of the shield information barrier segment Member. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteShieldBarrierSegmentMember("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listShieldBarrierSegmentMembers</summary>

<div>

List shield information barrier segment members.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `shieldInformationBarrierSegmentId` | <code>string</code> | Yes | The ID of the shield information barrier segment. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `ShieldInformationBarrierSegmentMembers|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentMembers result = check boxClient->listShieldBarrierSegmentMembers(shieldInformationBarrierSegmentId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "shield_information_barrier_segment_member",
      "user": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "user"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShieldBarrierSegmentMember</summary>

<div>

Create shield information barrier segment member.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShieldBarrierSegmentMemberRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegmentMember|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentMember result = check boxClient->createShieldBarrierSegmentMember({
    shieldInformationBarrierSegment: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier_segment"
    },
    user: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "user"
    },
    shieldInformationBarrier: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier"
    },
    'type: "shield_information_barrier_segment_member"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_segment_member",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  },
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  },
  "updated_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  }
}
```

</div>
</details>

#### Shield information barrier segment restrictions

<details>
<summary>getShieldBarrierRestriction</summary>

<div>

Get shield information barrier segment restriction by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentRestrictionId` | <code>string</code> | Yes | The ID of the shield information barrier segment Restriction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegmentRestriction|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentRestriction result = check boxClient->getShieldBarrierRestriction("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "restricted_segment": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier_segment"
  },
  "shield_information_barrier_segment": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier_segment"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_segment_restriction",
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  }
}
```

</div>
</details>

<details>
<summary>deleteShieldBarrierRestriction</summary>

<div>

Delete shield information barrier segment restriction by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shieldInformationBarrierSegmentRestrictionId` | <code>string</code> | Yes | The ID of the shield information barrier segment Restriction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteShieldBarrierRestriction("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listShieldBarrierRestrictions</summary>

<div>

List shield information barrier segment restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `shieldInformationBarrierSegmentId` | <code>string</code> | Yes | The ID of the shield information barrier segment. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `ShieldInformationBarrierSegmentRestrictions|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentRestrictions result = check boxClient->listShieldBarrierRestrictions(shieldInformationBarrierSegmentId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "restricted_segment": {},
      "shield_information_barrier_segment": {},
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createShieldBarrierRestriction</summary>

<div>

Create shield information barrier segment restriction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShieldBarrierRestrictionRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShieldInformationBarrierSegmentRestriction|error`

**Sample code:**

```ballerina
box:ShieldInformationBarrierSegmentRestriction result = check boxClient->createShieldBarrierRestriction({
    restrictedSegment: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier_segment"
    },
    shieldInformationBarrierSegment: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier_segment"
    },
    'type: "shield_information_barrier_segment_restriction",
    shieldInformationBarrier: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "shield_information_barrier"
    }
});
```

**Sample response:**

```json
{
  "restricted_segment": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier_segment"
  },
  "shield_information_barrier_segment": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier_segment"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "shield_information_barrier_segment_restriction",
  "updated_at": "2026-01-15T00:00:00",
  "shield_information_barrier": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "shield_information_barrier"
  }
}
```

</div>
</details>

#### Device pinners

<details>
<summary>getDevicePin</summary>

<div>

Get device pin.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `devicePinnerId` | <code>string</code> | Yes | The ID of the device pin. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DevicePinner|error`

**Sample code:**

```ballerina
box:DevicePinner result = check boxClient->getDevicePin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "owned_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "device_pinner",
  "product_name": "Sample name"
}
```

</div>
</details>

<details>
<summary>removeDevicePin</summary>

<div>

Remove device pin.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `devicePinnerId` | <code>string</code> | Yes | The ID of the device pin. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeDevicePin("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Enterprises

<details>
<summary>listEnterpriseDevicePins</summary>

<div>

List enterprise device pins.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `enterpriseId` | <code>string</code> | Yes | The ID of the enterprise. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `direction` | <code>"ASC"&#124;"DESC"</code> | No | The direction to sort results in. This can be either in alphabetical ascending (`ASC`) or descending (`DESC`) order. |

**Returns:** `DevicePinners|error`

**Sample code:**

```ballerina
box:DevicePinners result = check boxClient->listEnterpriseDevicePins("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": 1,
  "entries": [
    {
      "owned_by": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "user"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "device_pinner"
    }
  ],
  "limit": 1,
  "order": [
    {
      "by": "id",
      "direction": "asc"
    }
  ]
}
```

</div>
</details>

#### Terms of services

<details>
<summary>listTermsOfServices</summary>

<div>

List terms of services.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `tosType` | <code>"external"&#124;"managed"</code> | No | Limits the results to the terms of service of the given type. |

**Returns:** `TermsOfServices|error`

**Sample code:**

```ballerina
box:TermsOfServices result = check boxClient->listTermsOfServices();
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "terms_of_service",
      "created_at": "string"
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>createTermsOfService</summary>

<div>

Create terms of service.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTermsOfServiceRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TermsOfService|error`

**Sample code:**

```ballerina
box:TermsOfService result = check boxClient->createTermsOfService({
    text: "string",
    status: "enabled",
    tosType: "external"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "terms_of_service",
  "created_at": "string",
  "tos_type": "managed",
  "text": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>getTermsOfService</summary>

<div>

Get terms of service.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `termsOfServiceId` | <code>string</code> | Yes | The ID of the terms of service. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TermsOfService|error`

**Sample code:**

```ballerina
box:TermsOfService result = check boxClient->getTermsOfService("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "terms_of_service",
  "created_at": "string",
  "tos_type": "managed",
  "text": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>updateTermsOfService</summary>

<div>

Update terms of service.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `termsOfServiceId` | <code>string</code> | Yes | The ID of the terms of service. |
| `payload` | <code>UpdateTermsOfServiceRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TermsOfService|error`

**Sample code:**

```ballerina
box:TermsOfService result = check boxClient->updateTermsOfService("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    text: "string",
    status: "enabled"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "terms_of_service",
  "created_at": "string",
  "tos_type": "managed",
  "text": "string",
  "modified_at": "string"
}
```

</div>
</details>

#### Terms of service user statuses

<details>
<summary>listTermsOfServiceUserStatuses</summary>

<div>

List terms of service user statuses.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `userId` | <code>string</code> | No | Limits results to the given user ID. |
| `tosId` | <code>string</code> | Yes | The ID of the terms of service. |

**Returns:** `TermsOfServiceUserStatuses|error`

**Sample code:**

```ballerina
box:TermsOfServiceUserStatuses result = check boxClient->listTermsOfServiceUserStatuses(tosId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "terms_of_service_user_status",
      "is_accepted": false
    }
  ],
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>createTermsOfServiceStatusForNewUser</summary>

<div>

Create terms of service status for new user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTermsOfServiceStatusForNewUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TermsOfServiceUserStatus|error`

**Sample code:**

```ballerina
box:TermsOfServiceUserStatus result = check boxClient->createTermsOfServiceStatusForNewUser({
    isAccepted: false,
    tos: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "terms_of_service"
    },
    user: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "user"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "terms_of_service_user_status",
  "is_accepted": false,
  "tos": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "terms_of_service"
  },
  "created_at": "string",
  "modified_at": "string"
}
```

</div>
</details>

<details>
<summary>updateTermsOfServiceUserStatus</summary>

<div>

Update terms of service status for existing user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `termsOfServiceUserStatusId` | <code>string</code> | Yes | The ID of the terms of service status. |
| `payload` | <code>UpdateTermsOfServiceUserStatusRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TermsOfServiceUserStatus|error`

**Sample code:**

```ballerina
box:TermsOfServiceUserStatus result = check boxClient->updateTermsOfServiceUserStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    isAccepted: false
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "terms_of_service_user_status",
  "is_accepted": false,
  "tos": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "terms_of_service"
  },
  "created_at": "string",
  "modified_at": "string"
}
```

</div>
</details>

#### Collaboration whitelist entries

<details>
<summary>listAllowedCollaborationDomains</summary>

<div>

List allowed collaboration domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `CollaborationAllowlistEntries|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistEntries result = check boxClient->listAllowedCollaborationDomains();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "domain": "string",
      "created_at": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>addAllowedCollaborationDomain</summary>

<div>

Add domain to list of allowed collaboration domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddAllowedCollaborationDomainRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CollaborationAllowlistEntry|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistEntry result = check boxClient->addAllowedCollaborationDomain({
    domain: "string",
    direction: "inbound"
});
```

**Sample response:**

```json
{
  "domain": "string",
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "collaboration_whitelist_entry",
  "direction": "inbound"
}
```

</div>
</details>

<details>
<summary>getAllowedCollaborationDomain</summary>

<div>

Get allowed collaboration domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationWhitelistEntryId` | <code>string</code> | Yes | The ID of the entry in the list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CollaborationAllowlistEntry|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistEntry result = check boxClient->getAllowedCollaborationDomain("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "domain": "string",
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "collaboration_whitelist_entry",
  "direction": "inbound"
}
```

</div>
</details>

<details>
<summary>removeAllowedCollabDomain</summary>

<div>

Remove domain from list of allowed collaboration domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationWhitelistEntryId` | <code>string</code> | Yes | The ID of the entry in the list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeAllowedCollabDomain("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Collaboration whitelist exempt targets

<details>
<summary>listCollabDomainExemptUsers</summary>

<div>

List users exempt from collaboration domain restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `CollaborationAllowlistExemptTargets|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistExemptTargets result = check boxClient->listCollabDomainExemptUsers();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "created_at": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "collaboration_whitelist_exempt_target"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCollabDomainExemptUser</summary>

<div>

Create user exemption from collaboration domain restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCollabDomainExemptUserRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CollaborationAllowlistExemptTarget|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistExemptTarget result = check boxClient->createCollabDomainExemptUser({
    user: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
});
```

**Sample response:**

```json
{
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "collaboration_whitelist_exempt_target",
  "modified_at": "string",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getCollabDomainExemptUser</summary>

<div>

Get user exempt from collaboration domain restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationWhitelistExemptTargetId` | <code>string</code> | Yes | The ID of the exemption to the list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CollaborationAllowlistExemptTarget|error`

**Sample code:**

```ballerina
box:CollaborationAllowlistExemptTarget result = check boxClient->getCollabDomainExemptUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "created_at": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "collaboration_whitelist_exempt_target",
  "modified_at": "string",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>removeCollabDomainExemptUser</summary>

<div>

Remove user from list of users exempt from domain restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collaborationWhitelistExemptTargetId` | <code>string</code> | Yes | The ID of the exemption to the list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeCollabDomainExemptUser("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Storage policies

<details>
<summary>listStoragePolicies</summary>

<div>

List storage policies.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `fields` | <code>string[]</code> | No | A comma-separated list of attributes to include in the response. This can be used to request fields that are not normally returned in a standard response. Be aware that specifying this parameter will have the effect that none of the standard fields are returned in the response unless explicitly specified, instead only fields for the mini representation are returned, additional to the fields requested. |

**Returns:** `StoragePolicies|error`

**Sample code:**

```ballerina
box:StoragePolicies result = check boxClient->listStoragePolicies();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "storage_policy",
      "name": "Sample name"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getStoragePolicy</summary>

<div>

Get storage policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storagePolicyId` | <code>string</code> | Yes | The ID of the storage policy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StoragePolicy|error`

**Sample code:**

```ballerina
box:StoragePolicy result = check boxClient->getStoragePolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "storage_policy",
  "name": "Sample name"
}
```

</div>
</details>

#### Storage policy assignments

<details>
<summary>listStoragePolicyAssignments</summary>

<div>

List storage policy assignments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `resolvedForId` | <code>string</code> | Yes | The ID of the user or enterprise to return assignments for. |
| `resolvedForType` | <code>"user"&#124;"enterprise"</code> | Yes | The target type to return assignments for. |

**Returns:** `StoragePolicyAssignments|error`

**Sample code:**

```ballerina
box:StoragePolicyAssignments result = check boxClient->listStoragePolicyAssignments(resolvedForId = "3fa85f64-5717-4562-b3fc-2c963f66afa6", resolvedForType = "user");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "storage_policy_assignment",
      "storage_policy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "storage_policy"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>assignStoragePolicy</summary>

<div>

Assign storage policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignStoragePolicyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StoragePolicyAssignment|error`

**Sample code:**

```ballerina
box:StoragePolicyAssignment result = check boxClient->assignStoragePolicy({
    storagePolicy: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "storage_policy"
    },
    assignedTo: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "user"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "storage_policy_assignment",
  "storage_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "storage_policy"
  }
}
```

</div>
</details>

<details>
<summary>getStoragePolicyAssignment</summary>

<div>

Get storage policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storagePolicyAssignmentId` | <code>string</code> | Yes | The ID of the storage policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StoragePolicyAssignment|error`

**Sample code:**

```ballerina
box:StoragePolicyAssignment result = check boxClient->getStoragePolicyAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "storage_policy_assignment",
  "storage_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "storage_policy"
  }
}
```

</div>
</details>

<details>
<summary>updateStoragePolicyAssignment</summary>

<div>

Update storage policy assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storagePolicyAssignmentId` | <code>string</code> | Yes | The ID of the storage policy assignment. |
| `payload` | <code>UpdateStoragePolicyAssignmentRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `StoragePolicyAssignment|error`

**Sample code:**

```ballerina
box:StoragePolicyAssignment result = check boxClient->updateStoragePolicyAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    storagePolicy: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "storage_policy"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "storage_policy_assignment",
  "storage_policy": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "storage_policy"
  }
}
```

</div>
</details>

<details>
<summary>unassignStoragePolicy</summary>

<div>

Unassign storage policy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `storagePolicyAssignmentId` | <code>string</code> | Yes | The ID of the storage policy assignment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->unassignStoragePolicy("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Zip downloads

<details>
<summary>createZipDownload</summary>

<div>

Create zip download.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ZipDownloadRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ZipDownload|error`

**Sample code:**

```ballerina
box:ZipDownload result = check boxClient->createZipDownload({
    items: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    }],
    downloadFileName: "import.csv"
});
```

**Sample response:**

```json
{
  "expires_at": "string",
  "name_conflicts": [
    [
      {}
    ]
  ],
  "download_url": "https://example.com/resource",
  "status_url": "https://example.com/resource"
}
```

</div>
</details>

<details>
<summary>downloadZipArchive</summary>

<div>

Download zip archive.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `zipDownloadId` | <code>string</code> | Yes | The unique identifier that represent this `zip` archive. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `byte[]|error`

**Sample code:**

```ballerina
byte[] result = check boxClient->downloadZipArchive("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `byte[]`.

</div>
</details>

<details>
<summary>getZipDownloadStatus</summary>

<div>

Get zip download status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `zipDownloadId` | <code>string</code> | Yes | The unique identifier that represent this `zip` archive. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ZipDownloadStatus|error`

**Sample code:**

```ballerina
box:ZipDownloadStatus result = check boxClient->getZipDownloadStatus("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "skipped_folder_count": 1,
  "total_file_count": 1,
  "downloaded_file_count": 1,
  "state": "in_progress",
  "skipped_file_count": 1
}
```

</div>
</details>

#### Sign requests

<details>
<summary>cancelSignRequest</summary>

<div>

Cancel Box Sign request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `signRequestId` | <code>string</code> | Yes | The ID of the signature request. |
| `payload` | <code>SignRequestCancelRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignRequest|error`

**Sample code:**

```ballerina
box:SignRequest result = check boxClient->cancelSignRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    reason: "string"
});
```

**Sample response:**

```json
{
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "external_system_name": "Sample name",
  "are_reminders_enabled": false,
  "is_document_preparation_needed": false,
  "email_message": "user@example.com",
  "prefill_tags": [
    {
      "text_value": "string",
      "date_value": "2026-01-15T00:00:00",
      "checkbox_value": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>resendSignRequest</summary>

<div>

Resend Box Sign request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `signRequestId` | <code>string</code> | Yes | The ID of the signature request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->resendSignRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getSignRequestByID</summary>

<div>

Get Box Sign request by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `signRequestId` | <code>string</code> | Yes | The ID of the signature request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignRequest|error`

**Sample code:**

```ballerina
box:SignRequest result = check boxClient->getSignRequestByID("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "external_system_name": "Sample name",
  "are_reminders_enabled": false,
  "is_document_preparation_needed": false,
  "email_message": "user@example.com",
  "prefill_tags": [
    {
      "text_value": "string",
      "date_value": "2026-01-15T00:00:00",
      "checkbox_value": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>listSignRequests</summary>

<div>

List Box Sign requests.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `sharedRequests` | <code>boolean</code> | No | If set to `true`, only includes requests that user is not an owner, but user is a collaborator. Collaborator access is determined by the user access level of the sign files of the request. Default is `false`. Must be set to `true` if `senders` are provided. Defaults to `false`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `senders` | <code>string[]</code> | No | A list of sender emails to filter the signature requests by sender. If provided, `shared_requests` must be set to `true`. |

**Returns:** `SignRequests|error`

**Sample code:**

```ballerina
box:SignRequests result = check boxClient->listSignRequests();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "external_system_name": "Sample name",
      "are_reminders_enabled": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSignRequest</summary>

<div>

Create Box Sign request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SignRequestCreateRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignRequest|error`

**Sample code:**

```ballerina
box:SignRequest result = check boxClient->createSignRequest({
    signers: [{
        role: "signer",
        signerGroupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        embedUrlExternalUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }],
    externalId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    externalSystemName: "Sample name",
    areRemindersEnabled: false
});
```

**Sample response:**

```json
{
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "external_system_name": "Sample name",
  "are_reminders_enabled": false,
  "is_document_preparation_needed": false,
  "email_message": "user@example.com",
  "prefill_tags": [
    {
      "text_value": "string",
      "date_value": "2026-01-15T00:00:00",
      "checkbox_value": false
    }
  ]
}
```

</div>
</details>

#### Workflows

<details>
<summary>listWorkflows</summary>

<div>

List workflows.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `triggerType` | <code>string</code> | No | Type of trigger to search for. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `folderId` | <code>string</code> | Yes | The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. |

**Returns:** `Workflows|error`

**Sample code:**

```ballerina
box:Workflows result = check boxClient->listWorkflows(folderId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "is_enabled": false,
      "name": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>startsWorkflowBasedOnRequestBody</summary>

<div>

Starts workflow based on request body.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workflowId` | <code>string</code> | Yes | The ID of the workflow. |
| `payload` | <code>StartsWorkflowBasedOnRequestBodyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->startsWorkflowBasedOnRequestBody("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    folder: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    },
    files: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file"
    }],
    flow: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "string"
    },
    outcomes: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        role: {
            variableValue: "editor",
            variableType: "collaborator_role",
            'type: "variable"
        },
        taskCollaborators: {
            variableValue: [{
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                'type: "user"
            }],
            variableType: "user_list",
            'type: "variable"
        }
    }]
});
```

</div>
</details>

#### Sign templates

<details>
<summary>listSignTemplates</summary>

<div>

List Box Sign templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `SignTemplates|error`

**Sample code:**

```ballerina
box:SignTemplates result = check boxClient->listSignTemplates();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "are_fields_locked": false,
      "are_files_locked": false,
      "source_files": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "type": "file"
        }
      ]
    }
  ]
}
```

</div>
</details>

<details>
<summary>getSignTemplateByID</summary>

<div>

Get Box Sign template by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | <code>string</code> | Yes | The ID of a Box Sign template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SignTemplate|error`

**Sample code:**

```ballerina
box:SignTemplate result = check boxClient->getSignTemplateByID("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "are_fields_locked": false,
  "are_files_locked": false,
  "source_files": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file",
      "etag": "string"
    }
  ],
  "are_recipients_locked": false,
  "custom_branding": {
    "branding_color": "string",
    "logo_uri": "string",
    "email_footer_text": "user@example.com"
  },
  "type": "sign-template"
}
```

</div>
</details>

#### Integration mappings

<details>
<summary>listSlackIntegrationMappings</summary>

<div>

List Slack integration mappings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `boxItemType` | <code>"folder"</code> | No | Box item type, for which the mappings should be returned. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `partnerItemType` | <code>"channel"</code> | No | Mapped item type, for which the mapping should be returned. |
| `partnerItemId` | <code>string</code> | No | ID of the mapped item, for which the mapping should be returned. |
| `boxItemId` | <code>string</code> | No | Box item ID, for which the mappings should be returned. |
| `isManuallyCreated` | <code>boolean</code> | No | Whether the mapping has been manually created. |

**Returns:** `IntegrationMappings|error`

**Sample code:**

```ballerina
box:IntegrationMappings result = check boxClient->listSlackIntegrationMappings();
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "integration_mapping",
      "partner_item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "channel"
      },
      "box_item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSlackIntegrationMapping</summary>

<div>

Create Slack integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IntegrationMappingSlackCreateRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IntegrationMapping|error`

**Sample code:**

```ballerina
box:IntegrationMapping result = check boxClient->createSlackIntegrationMapping({
    partnerItem: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "channel",
        slackOrgId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    boxItem: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    },
    options: {
        isAccessManagementDisabled: false
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "integration_mapping",
  "partner_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "channel",
    "slack_org_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "box_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "options": {
    "is_access_management_disabled": false
  },
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateSlackIntegrationMapping</summary>

<div>

Update Slack integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationMappingId` | <code>string</code> | Yes | An ID of an integration mapping. |
| `payload` | <code>UpdateSlackIntegrationMappingRequest</code> | Yes | At least one of `box_item` and `options` must be provided. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IntegrationMapping|error`

**Sample code:**

```ballerina
box:IntegrationMapping result = check boxClient->updateSlackIntegrationMapping("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    options: {
        isAccessManagementDisabled: false
    },
    boxItem: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "integration_mapping",
  "partner_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "channel",
    "slack_org_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "box_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder",
    "etag": "string"
  },
  "options": {
    "is_access_management_disabled": false
  },
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteSlackIntegrationMapping</summary>

<div>

Delete Slack integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationMappingId` | <code>string</code> | Yes | An ID of an integration mapping. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteSlackIntegrationMapping("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listTeamsIntegrationMappings</summary>

<div>

List Teams integration mappings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `boxItemType` | <code>"folder"</code> | No | Box item type, for which the mappings should be returned. |
| `partnerItemType` | <code>"channel"&#124;"team"</code> | No | Mapped item type, for which the mapping should be returned. |
| `partnerItemId` | <code>string</code> | No | ID of the mapped item, for which the mapping should be returned. |
| `boxItemId` | <code>string</code> | No | Box item ID, for which the mappings should be returned. |

**Returns:** `IntegrationMappingsTeams|error`

**Sample code:**

```ballerina
box:IntegrationMappingsTeams result = check boxClient->listTeamsIntegrationMappings();
```

**Sample response:**

```json
{
  "entries": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "integration_mapping",
      "partner_item": {
        "tenant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "channel"
      },
      "box_item": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "type": "folder"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createTeamsIntegrationMapping</summary>

<div>

Create Teams integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>IntegrationMappingTeamsCreateRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IntegrationMappingTeams|error`

**Sample code:**

```ballerina
box:IntegrationMappingTeams result = check boxClient->createTeamsIntegrationMapping({
    partnerItem: {
        tenantId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        teamId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "channel"
    },
    boxItem: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "integration_mapping",
  "partner_item": {
    "tenant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "channel"
  },
  "box_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  },
  "created_at": "string",
  "is_overridden_by_manual_mapping": false
}
```

</div>
</details>

<details>
<summary>updateTeamsIntegrationMapping</summary>

<div>

Update Teams integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationMappingId` | <code>string</code> | Yes | An ID of an integration mapping. |
| `payload` | <code>UpdateTeamsIntegrationMappingRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IntegrationMappingTeams|error`

**Sample code:**

```ballerina
box:IntegrationMappingTeams result = check boxClient->updateTeamsIntegrationMapping("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    boxItem: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "folder"
    }
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "integration_mapping",
  "partner_item": {
    "tenant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "channel"
  },
  "box_item": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "folder"
  },
  "created_at": "string",
  "is_overridden_by_manual_mapping": false
}
```

</div>
</details>

<details>
<summary>deleteTeamsIntegrationMapping</summary>

<div>

Delete Teams integration mapping.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `integrationMappingId` | <code>string</code> | Yes | An ID of an integration mapping. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteTeamsIntegrationMapping("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Box AI

<details>
<summary>askQuestion</summary>

<div>

Ask question.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AiAsk</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiResponseFull|error?`

**Sample code:**

```ballerina
box:AiResponseFull? result = check boxClient->askQuestion({
    mode: "multiple_item_qa",
    prompt: "string",
    items: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file",
        content: "string"
    }],
    includeCitations: false
});
```

**Sample response:**

```json
{
  "answer": "string",
  "created_at": "string",
  "ai_agent_info": {
    "processor": "string"
  },
  "completion_reason": "string",
  "citations": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "file"
    }
  ]
}
```

</div>
</details>

<details>
<summary>generateText</summary>

<div>

Generate text.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AiTextGen</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiResponse|error`

**Sample code:**

```ballerina
box:AiResponse result = check boxClient->generateText({
    prompt: "string",
    items: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file",
        content: "string"
    }],
    dialogueHistory: [{
        answer: "string",
        createdAt: "string",
        prompt: "string"
    }],
    aiAgent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "ai_agent_id"
    }
});
```

**Sample response:**

```json
{
  "answer": "string",
  "created_at": "string",
  "ai_agent_info": {
    "processor": "string"
  },
  "completion_reason": "string"
}
```

</div>
</details>

<details>
<summary>extractMetadataFreeform</summary>

<div>

Extract metadata (freeform).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AiExtract</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiResponse|error`

**Sample code:**

```ballerina
box:AiResponse result = check boxClient->extractMetadataFreeform({
    prompt: "string",
    items: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file",
        content: "string"
    }],
    aiAgent: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "ai_agent_id"
    }
});
```

**Sample response:**

```json
{
  "answer": "string",
  "created_at": "string",
  "ai_agent_info": {
    "processor": "string"
  },
  "completion_reason": "string"
}
```

</div>
</details>

<details>
<summary>extractMetadataStructured</summary>

<div>

Extract metadata (structured).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AiExtractStructured</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiExtractStructuredResponse|error`

**Sample code:**

```ballerina
box:AiExtractStructuredResponse result = check boxClient->extractMetadataStructured({
    items: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        'type: "file",
        content: "string"
    }],
    taxonomySources: [{
        namespace: "string",
        taxonomyKey: "string",
        'type: "taxonomy"
    }],
    metadataTemplate: {
        templateKey: "string",
        scope: "string",
        'type: "metadata_template"
    },
    includeReference: false
});
```

**Sample response:**

```json
{
  "answer": {},
  "created_at": "string",
  "ai_agent_info": {
    "processor": "string"
  },
  "completion_reason": "string"
}
```

</div>
</details>

#### Box AI agent defaults

<details>
<summary>getAIAgentDefaultConfiguration</summary>

<div>

Get AI agent default configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `mode` | <code>"ask"&#124;"text_gen"&#124;"extract"&#124;"extract_structured"</code> | Yes | The mode to filter the agent config to return. |
| `language` | <code>string</code> | No | The ISO language code to return the agent config for. If the language is not supported the default agent config is returned. |
| `model` | <code>string</code> | No | The model to return the default agent config for. |

**Returns:** `AiAgent|error`

**Sample code:**

```ballerina
box:AiAgent result = check boxClient->getAIAgentDefaultConfiguration(mode = "ask");
```

**Sample response:**

The raw response content as `AiAgent`.

</div>
</details>

#### Box AI agents

<details>
<summary>listAIAgents</summary>

<div>

List AI agents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `mode` | <code>string[]</code> | No | The mode to filter the agent config to return. Possible values are: `ask`, `text_gen`, and `extract`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. |
| `agentState` | <code>string[]</code> | No | The state of the agents to return. Possible values are: `enabled`, `disabled` and `enabled_for_selected_users`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |
| `includeBoxDefault` | <code>boolean</code> | No | Whether to include the Box default agents in the response. Defaults to `false`. |
| `fields` | <code>string[]</code> | No | The fields to return in the response. |

**Returns:** `AiMultipleAgentResponse|error`

**Sample code:**

```ballerina
box:AiMultipleAgentResponse result = check boxClient->listAIAgents();
```

**Sample response:**

```json
{
  "entries": [
    {
      "access_state": "string",
      "origin": "string",
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string"
}
```

</div>
</details>

<details>
<summary>createAIAgent</summary>

<div>

Create AI agent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAiAgent</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiSingleAgentResponseFull|error`

**Sample code:**

```ballerina
box:AiSingleAgentResponseFull result = check boxClient->createAIAgent({
    accessState: "string",
    name: "Sample name",
    'type: "ai_agent",
    extract: {
        accessState: "string",
        description: "Sample description",
        'type: "ai_agent_extract"
    }
});
```

**Sample response:**

```json
{
  "access_state": "string",
  "origin": "string",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "allowed_entities": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "user"
    }
  ],
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  }
}
```

</div>
</details>

<details>
<summary>getAIAgentByAgentID</summary>

<div>

Get AI agent by agent ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | <code>string</code> | Yes | The agent id to get. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fields` | <code>string[]</code> | No | The fields to return in the response. |

**Returns:** `AiSingleAgentResponseFull|error`

**Sample code:**

```ballerina
box:AiSingleAgentResponseFull result = check boxClient->getAIAgentByAgentID("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "access_state": "string",
  "origin": "string",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "allowed_entities": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "user"
    }
  ],
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  }
}
```

</div>
</details>

<details>
<summary>updateAIAgent</summary>

<div>

Update AI agent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | <code>string</code> | Yes | The ID of the agent to update. |
| `payload` | <code>CreateAiAgent</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AiSingleAgentResponseFull|error`

**Sample code:**

```ballerina
box:AiSingleAgentResponseFull result = check boxClient->updateAIAgent("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accessState: "string",
    name: "Sample name",
    'type: "ai_agent",
    extract: {
        accessState: "string",
        description: "Sample description",
        'type: "ai_agent_extract"
    }
});
```

**Sample response:**

```json
{
  "access_state": "string",
  "origin": "string",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "allowed_entities": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "user"
    }
  ],
  "modified_by": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "type": "user"
  }
}
```

</div>
</details>

<details>
<summary>deleteAIAgent</summary>

<div>

Delete AI agent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `agentId` | <code>string</code> | Yes | The ID of the agent to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->deleteAIAgent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Metadata taxonomies

<details>
<summary>createMetadataTaxonomy</summary>

<div>

Create metadata taxonomy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMetadataTaxonomyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomy|error`

**Sample code:**

```ballerina
box:MetadataTaxonomy result = check boxClient->createMetadataTaxonomy({
    displayName: "Sample name",
    namespace: "string",
    'key: "string"
});
```

**Sample response:**

```json
{
  "displayName": "Sample name",
  "namespace": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "levels": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getMetadataTaxonomiesForNamespace</summary>

<div>

Get metadata taxonomies for namespace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTaxonomies|error`

**Sample code:**

```ballerina
box:MetadataTaxonomies result = check boxClient->getMetadataTaxonomiesForNamespace("string");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "displayName": "Sample name",
      "namespace": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getMetadataTaxonomyByTaxonomyKey</summary>

<div>

Get metadata taxonomy by taxonomy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomy|error`

**Sample code:**

```ballerina
box:MetadataTaxonomy result = check boxClient->getMetadataTaxonomyByTaxonomyKey("string", "string");
```

**Sample response:**

```json
{
  "displayName": "Sample name",
  "namespace": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "levels": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>removeMetadataTaxonomy</summary>

<div>

Remove metadata taxonomy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataTaxonomy("string", "string");
```

</div>
</details>

<details>
<summary>updateMetadataTaxonomy</summary>

<div>

Update metadata taxonomy.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `payload` | <code>UpdateMetadataTaxonomyRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomy|error`

**Sample code:**

```ballerina
box:MetadataTaxonomy result = check boxClient->updateMetadataTaxonomy("string", "string", {
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "displayName": "Sample name",
  "namespace": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "levels": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMetadataTaxonomyLevels</summary>

<div>

Create metadata taxonomy levels.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `payload` | <code>MetadataTaxonomyLevel[]</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyLevels|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyLevels result = check boxClient->createMetadataTaxonomyLevels("string", "string", [{
    level: 1,
    displayName: "Sample name",
    description: "Sample description"
}]);
```

**Sample response:**

```json
{
  "entries": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>updateMetadataTaxonomyLevel</summary>

<div>

Update metadata taxonomy level.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `levelIndex` | <code>int</code> | Yes | The index of the metadata taxonomy level. |
| `payload` | <code>UpdateMetadataTaxonomyLevelRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyLevel|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyLevel result = check boxClient->updateMetadataTaxonomyLevel("string", "string", 1, {
    displayName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "level": 1,
  "displayName": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>addMetadataTaxonomyLevel</summary>

<div>

Add metadata taxonomy level.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `payload` | <code>UpdateMetadataTaxonomyLevelRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyLevels|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyLevels result = check boxClient->addMetadataTaxonomyLevel("string", "string", {
    displayName: "Sample name",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "entries": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteMetadataTaxonomyLevel</summary>

<div>

Delete metadata taxonomy level.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyLevels|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyLevels result = check boxClient->deleteMetadataTaxonomyLevel("string", "string");
```

**Sample response:**

```json
{
  "entries": [
    {
      "level": 1,
      "displayName": "Sample name",
      "description": "Sample description"
    }
  ]
}
```

</div>
</details>

<details>
<summary>listMetadataTaxonomyNodes</summary>

<div>

List metadata taxonomy nodes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `parent` | <code>string[]</code> | No | Node identifier of a direct parent node. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `level` | <code>int[]</code> | No | Filters results by taxonomy level. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `marker` | <code>string</code> | No | Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`. |
| `ancestor` | <code>string[]</code> | No | Node identifier of any ancestor node. Multiple values can be provided. Results include nodes that match any of the specified values. |
| `query` | <code>string</code> | No | Query text to search for the taxonomy nodes. |
| `includeTotalResultCount` | <code>boolean</code> | No | When set to `true` this provides the total number of nodes that matched the query. The response will compute counts of up to 10,000 elements. Defaults to `false`. |
| `'limit` | <code>int</code> | No | The maximum number of items to return per page. |

**Returns:** `MetadataTaxonomyNodes|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyNodes result = check boxClient->listMetadataTaxonomyNodes("string", "string");
```

**Sample response:**

```json
{
  "next_marker": "string",
  "limit": 1,
  "prev_marker": "string",
  "entries": [
    {
      "level": 1,
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMetadataTaxonomyNode</summary>

<div>

Create metadata taxonomy node.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `payload` | <code>CreateMetadataTaxonomyNodeRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyNode|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyNode result = check boxClient->createMetadataTaxonomyNode("string", "string", {
    level: 1,
    displayName: "Sample name",
    parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "level": 1,
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "nodePath": [
    "string"
  ],
  "ancestors": [
    {
      "level": 1,
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getMetadataTaxonomyNodeByID</summary>

<div>

Get metadata taxonomy node by ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `nodeId` | <code>string</code> | Yes | The identifier of the metadata taxonomy node. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyNode|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyNode result = check boxClient->getMetadataTaxonomyNodeByID("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "level": 1,
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "nodePath": [
    "string"
  ],
  "ancestors": [
    {
      "level": 1,
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>removeMetadataTaxonomyNode</summary>

<div>

Remove metadata taxonomy node.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `nodeId` | <code>string</code> | Yes | The identifier of the metadata taxonomy node. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check boxClient->removeMetadataTaxonomyNode("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateMetadataTaxonomyNode</summary>

<div>

Update metadata taxonomy node.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `namespace` | <code>string</code> | Yes | The namespace of the metadata taxonomy. |
| `taxonomyKey` | <code>string</code> | Yes | The key of the metadata taxonomy. |
| `nodeId` | <code>string</code> | Yes | The identifier of the metadata taxonomy node. |
| `payload` | <code>UpdateMetadataTaxonomyNodeRequest</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `MetadataTaxonomyNode|error`

**Sample code:**

```ballerina
box:MetadataTaxonomyNode result = check boxClient->updateMetadataTaxonomyNode("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "level": 1,
  "displayName": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "nodePath": [
    "string"
  ],
  "ancestors": [
    {
      "level": 1,
      "displayName": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>
