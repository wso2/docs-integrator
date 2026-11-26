---
connector: true
connector_name: "microsoft.outlook.mail"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Microsoft Outlook Mail connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send, receive, organize, and manage email messages, mail folders, and attachments for the signed-in user and any user in a Microsoft 365 tenant via the Microsoft Graph API |

---

## Client

The `Client` connects to the Microsoft Graph API v1.0 to manage email messages, attachments, and mail folders for the signed-in user and for any user in a Microsoft 365 tenant.

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
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding; when enabled, `nil` values are treated as optional and absent fields are handled as `nilable` types |

### Initializing the client

```ballerina
import ballerinax/microsoft.outlook.mail;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

final mail:Client mailClient = check new ({
    auth: {clientId, clientSecret, refreshToken, refreshUrl}
});
```

### Operations

#### Messages (signed-in user)

<details>
<summary>listMessages</summary>

<div>

Retrieves the signed-in user's messages from the default mailbox, supporting OData query parameters to filter, sort, search, and project the result set.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenMessages` | <code>boolean</code> | No | Include hidden messages |

**Returns:** `MicrosoftGraphMessageCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessageCollectionResponse result = check mailClient->listMessages(
    dollarFilter = "isRead eq false",
    dollarTop = 10,
    dollarSelect = ["id", "subject", "from", "receivedDateTime", "bodyPreview"]
);
```

**Sample response:**

```json
{
  "@odata.count": 2,
  "@odata.nextLink": "https://graph.microsoft.com/v1.0/me/messages?$skip=10",
  "value": [
    {
      "@odata.type": "#microsoft.graph.message",
      "id": "AAMkAGI2THVSAAA=",
      "subject": "Project Update",
      "isRead": false,
      "receivedDateTime": "2024-01-15T10:30:00Z",
      "bodyPreview": "Hi Team, please find the latest project update...",
      "from": {
        "emailAddress": {
          "name": "Alice Johnson",
          "address": "alice@example.com"
        }
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDraftMessage</summary>

<div>

Creates a new draft message in the signed-in user's mailbox and returns the saved draft with its assigned message ID for later editing or sending.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>MicrosoftGraphMessage</code> | Yes | New message draft |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->createDraftMessage({
    subject: "[Weekly Report] Project Status Update",
    importance: "normal",
    body: {
        contentType: "html",
        content: "<h2>Weekly Status</h2><p>See attached.</p>"
    },
    toRecipients: [
        {emailAddress: {address: "bob@example.com", name: "Bob Smith"}}
    ]
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2draft==",
  "createdDateTime": "2024-01-15T10:30:00Z",
  "lastModifiedDateTime": "2024-01-15T10:30:00Z",
  "isDraft": true,
  "isRead": true,
  "subject": "[Weekly Report] Project Status Update",
  "importance": "normal",
  "parentFolderId": "AAMkAGI2drafts==",
  "body": {
    "contentType": "html",
    "content": "<h2>Weekly Status</h2><p>See attached.</p>"
  },
  "toRecipients": [
    {
      "emailAddress": {
        "name": "Bob Smith",
        "address": "bob@example.com"
      }
    }
  ],
  "ccRecipients": [],
  "bccRecipients": [],
  "replyTo": [],
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>getMessage</summary>

<div>

Retrieves a specific message from the signed-in user's mailbox by its ID, with optional OData query parameters to control which fields and related entities are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->getMessage("AAMkAGI2THVSAAA=");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2THVSAAA=",
  "subject": "Project Update",
  "isDraft": false,
  "isRead": false,
  "importance": "normal",
  "hasAttachments": false,
  "receivedDateTime": "2024-01-15T09:00:00Z",
  "sentDateTime": "2024-01-15T08:59:00Z",
  "bodyPreview": "Hi Team, please find the latest project update...",
  "conversationId": "AAQkAGI2conv==",
  "body": {
    "contentType": "html",
    "content": "<html><body>Hi Team, please find the latest project update...</body></html>"
  },
  "from": {
    "emailAddress": {"name": "Alice Johnson", "address": "alice@example.com"}
  },
  "sender": {
    "emailAddress": {"name": "Alice Johnson", "address": "alice@example.com"}
  },
  "toRecipients": [
    {"emailAddress": {"name": "Bob Smith", "address": "bob@example.com"}}
  ],
  "ccRecipients": [],
  "bccRecipients": [],
  "replyTo": [],
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>deleteMessage</summary>

<div>

Deletes the specified message from the signed-in user's mailbox permanently. If successful, no content is returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>DeleteMessageHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteMessage("AAMkAGI2THVSAAA=");
```

</div>
</details>

<details>
<summary>updateMessage</summary>

<div>

Updates writable properties of the specified message in the signed-in user's mailbox, such as `isRead`, `subject`, `body`, `importance`, and `flag`, and returns the updated message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MicrosoftGraphMessage</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->updateMessage("AAMkAGI2THVSAAA=", {
    isRead: true
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2THVSAAA=",
  "subject": "Project Update",
  "isRead": true,
  "isDraft": false,
  "importance": "normal",
  "lastModifiedDateTime": "2024-01-15T11:00:00Z",
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>sendDraftMessage</summary>

<div>

Sends the specified draft message from the signed-in user's mailbox; on success, the draft is moved to Sent Items and no content is returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the draft message to send |
| `headers` | <code>SendDraftMessageHeaders</code> | No | Headers; `Content-Length` defaults to `0` |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->sendDraftMessage("AAMkAGI2draft==");
```

</div>
</details>

<details>
<summary>copyMessage</summary>

<div>

Copies the specified message to a destination mail folder within the signed-in user's mailbox and returns the copied message in its new location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MessageIdCopyBody</code> | Yes | Action parameters including the destination folder ID or well-known folder name |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessageResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessageResponse result = check mailClient->copyMessage("AAMkAGI2THVSAAA=", {
    destinationId: "AAMkAGI2archivefolder=="
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2copy==",
  "subject": "Project Update",
  "isDraft": false,
  "isRead": false,
  "parentFolderId": "AAMkAGI2archivefolder==",
  "receivedDateTime": "2024-01-15T09:00:00Z"
}
```

</div>
</details>

<details>
<summary>forwardMessage</summary>

<div>

Forwards the specified message on behalf of the signed-in user to one or more recipients, optionally prepending a comment; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MessageIdForwardBody</code> | Yes | Action parameters including recipients and optional comment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->forwardMessage("AAMkAGI2THVSAAA=", {
    comment: "FYI, forwarding for your review.",
    toRecipients: [
        {emailAddress: {address: "carol@example.com", name: "Carol White"}}
    ]
});
```

</div>
</details>

<details>
<summary>sendMail</summary>

<div>

Composes and immediately sends a new message on behalf of the signed-in user; optionally saves the sent message to Sent Items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>record &#123;MicrosoftGraphMessage Message?; boolean? SaveToSentItems?&#125;</code> | Yes | Action parameters including the message to send and whether to save to Sent Items (defaults to `true`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->sendMail({
    Message: {
        subject: "Hello from Ballerina",
        body: {
            contentType: "html",
            content: "<p>This is an automated notification.</p>"
        },
        toRecipients: [
            {emailAddress: {address: "bob@example.com", name: "Bob Smith"}}
        ]
    },
    SaveToSentItems: true
});
```

</div>
</details>

#### Attachments (signed-in user)

<details>
<summary>listAttachments</summary>

<div>

Retrieves the list of attachments for the specified message in the signed-in user's mailbox, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphAttachmentCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachmentCollectionResponse result = check mailClient->listAttachments("AAMkAGI2THVSAAA=");
```

**Sample response:**

```json
{
  "@odata.count": 1,
  "value": [
    {
      "@odata.type": "#microsoft.graph.fileAttachment",
      "id": "AAMkAGI2attach==",
      "lastModifiedDateTime": "2024-01-15T10:30:00Z",
      "name": "report.pdf",
      "contentType": "application/pdf",
      "size": 25600,
      "isInline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>addAttachment</summary>

<div>

Adds a file or item attachment to the specified draft message in the signed-in user's mailbox and returns the created attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MicrosoftGraphAttachment</code> | Yes | New attachment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphAttachment|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachment result = check mailClient->addAttachment("AAMkAGI2draft==", {
    atOdataType: "#microsoft.graph.fileAttachment",
    name: "status-summary.txt",
    contentType: "text/plain",
    isInline: false,
    contentBytes: "SGVsbG8gV29ybGQ="
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.fileAttachment",
  "id": "AAMkAGI2attach==",
  "lastModifiedDateTime": "2024-01-15T10:35:00Z",
  "name": "status-summary.txt",
  "contentType": "text/plain",
  "size": 12,
  "isInline": false,
  "contentBytes": "SGVsbG8gV29ybGQ="
}
```

</div>
</details>

<details>
<summary>getAttachment</summary>

<div>

Retrieves the specified attachment from a message in the signed-in user's mailbox, with optional OData query parameters to control which fields are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of the attachment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphAttachment|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachment result = check mailClient->getAttachment("AAMkAGI2THVSAAA=", "AAMkAGI2attach==");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.fileAttachment",
  "id": "AAMkAGI2attach==",
  "lastModifiedDateTime": "2024-01-15T10:30:00Z",
  "name": "report.pdf",
  "contentType": "application/pdf",
  "size": 25600,
  "isInline": false,
  "contentBytes": "JVBERi0xLjQ..."
}
```

</div>
</details>

<details>
<summary>deleteAttachment</summary>

<div>

Deletes the specified attachment from a message in the signed-in user's mailbox; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of the attachment |
| `headers` | <code>DeleteAttachmentHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteAttachment("AAMkAGI2THVSAAA=", "AAMkAGI2attach==");
```

</div>
</details>

<details>
<summary>createUploadSession</summary>

<div>

Creates an upload session to attach a large file (over 3 MB) to the specified message in the signed-in user's mailbox, returning the upload URL and expiration details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>AttachmentsCreateUploadSessionBody</code> | Yes | Action parameters including attachment item metadata |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphUploadSessionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphUploadSessionResponse result = check mailClient->createUploadSession("AAMkAGI2draft==", {
    attachmentItem: {
        attachmentType: "file",
        name: "large-report.pdf",
        size: 4000000,
        contentType: "application/pdf"
    }
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.uploadSession",
  "uploadUrl": "https://outlook.office.com/api/v2.0/Users/me/Messages/AAMkAGI2draft==/AttachmentSessions/AAMkAGIsession==",
  "expirationDateTime": "2024-01-15T14:30:00Z",
  "nextExpectedRanges": ["0-"]
}
```

</div>
</details>

#### Mail Folders (signed-in user)

<details>
<summary>listMailFolders</summary>

<div>

Retrieves the signed-in user's mail folders at the top level of the mailbox, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolderCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolderCollectionResponse result = check mailClient->listMailFolders();
```

**Sample response:**

```json
{
  "@odata.count": 3,
  "value": [
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2inbox==",
      "displayName": "Inbox",
      "parentFolderId": "AAMkAGI2root==",
      "childFolderCount": 2,
      "unreadItemCount": 10,
      "totalItemCount": 100,
      "isHidden": false
    },
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2sentitems==",
      "displayName": "Sent Items",
      "childFolderCount": 0,
      "unreadItemCount": 0,
      "totalItemCount": 50,
      "isHidden": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMailFolder</summary>

<div>

Creates a new mail folder (or mail search folder) in the signed-in user's mailbox and returns the created folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New mail folder (use `@odata.type: '#microsoft.graph.mailSearchFolder'` to create a search folder) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->createMailFolder({
    displayName: "Weekly Status Reports"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2folder==",
  "displayName": "Weekly Status Reports",
  "parentFolderId": "AAMkAGI2root==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 0,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>getMailFolder</summary>

<div>

Retrieves the specified mail folder from the signed-in user's mailbox, with optional OData query parameters to control which fields are returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->getMailFolder("AAMkAGI2folder==");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2folder==",
  "displayName": "Customer Support",
  "parentFolderId": "AAMkAGI2root==",
  "childFolderCount": 1,
  "unreadItemCount": 5,
  "totalItemCount": 23,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>deleteMailFolder</summary>

<div>

Deletes the specified mail folder from the signed-in user's mailbox; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `headers` | <code>DeleteMailFolderHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteMailFolder("AAMkAGI2folder==");
```

</div>
</details>

<details>
<summary>updateMailFolder</summary>

<div>

Updates writable properties of the specified mail folder in the signed-in user's mailbox and returns the updated folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->updateMailFolder("AAMkAGI2folder==", {
    displayName: "Customer Tickets"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2folder==",
  "displayName": "Customer Tickets",
  "parentFolderId": "AAMkAGI2root==",
  "childFolderCount": 1,
  "unreadItemCount": 5,
  "totalItemCount": 23,
  "isHidden": false
}
```

</div>
</details>

#### Child Folders (signed-in user)

<details>
<summary>listChildFolders</summary>

<div>

Retrieves the child folders of the specified mail folder in the signed-in user's mailbox, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolderCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolderCollectionResponse result = check mailClient->listChildFolders("AAMkAGI2inbox==");
```

**Sample response:**

```json
{
  "@odata.count": 2,
  "value": [
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2subfolder1==",
      "displayName": "Important",
      "childFolderCount": 0,
      "unreadItemCount": 2,
      "totalItemCount": 15,
      "isHidden": false
    },
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2subfolder2==",
      "displayName": "Newsletters",
      "childFolderCount": 0,
      "unreadItemCount": 10,
      "totalItemCount": 100,
      "isHidden": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createChildFolder</summary>

<div>

Creates a new child folder within the specified mail folder in the signed-in user's mailbox and returns the created folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New child mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->createChildFolder("AAMkAGI2folder==", {
    displayName: "Processed Tickets"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2childfolder==",
  "displayName": "Processed Tickets",
  "parentFolderId": "AAMkAGI2folder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 0,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>getChildFolder</summary>

<div>

Retrieves the specified child folder within a mail folder in the signed-in user's mailbox, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->getChildFolder("AAMkAGI2folder==", "AAMkAGI2childfolder==");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2childfolder==",
  "displayName": "Processed Tickets",
  "parentFolderId": "AAMkAGI2folder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 5,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>deleteChildFolder</summary>

<div>

Deletes the specified child folder from a mail folder in the signed-in user's mailbox; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `headers` | <code>DeleteChildFolderHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteChildFolder("AAMkAGI2folder==", "AAMkAGI2childfolder==");
```

</div>
</details>

<details>
<summary>updateChildFolder</summary>

<div>

Updates writable properties of the specified child folder within a mail folder in the signed-in user's mailbox and returns the updated folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->updateChildFolder("AAMkAGI2folder==", "AAMkAGI2childfolder==", {
    displayName: "Archived Tickets"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2childfolder==",
  "displayName": "Archived Tickets",
  "parentFolderId": "AAMkAGI2folder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 5,
  "isHidden": false
}
```

</div>
</details>

#### User-scoped Messages

<details>
<summary>sendMailFromUser</summary>

<div>

Composes and immediately sends a new message on behalf of the specified user in the tenant using application permissions; optionally saves the sent message to that user's Sent Items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `payload` | <code>record &#123;MicrosoftGraphMessage Message?; boolean? SaveToSentItems?&#125;</code> | Yes | Action parameters including the message to send and whether to save to Sent Items (defaults to `true`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->sendMailFromUser("user@example.com", {
    Message: {
        subject: "Automated Notification",
        body: {
            contentType: "text",
            content: "This is an automated system notification."
        },
        toRecipients: [
            {emailAddress: {address: "admin@example.com", name: "Admin"}}
        ]
    },
    SaveToSentItems: true
});
```

</div>
</details>

<details>
<summary>listMessagesFromUser</summary>

<div>

Retrieves the message list from the specified user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenMessages` | <code>boolean</code> | No | Include hidden messages |

**Returns:** `MicrosoftGraphMessageCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessageCollectionResponse result = check mailClient->listMessagesFromUser(
    "user@example.com",
    dollarTop = 20,
    dollarFilter = "isRead eq false"
);
```

**Sample response:**

```json
{
  "@odata.count": 3,
  "value": [
    {
      "@odata.type": "#microsoft.graph.message",
      "id": "AAMkAGI2THVSAAB=",
      "subject": "Support Request #1042",
      "isRead": false,
      "receivedDateTime": "2024-01-15T08:00:00Z",
      "from": {
        "emailAddress": {
          "name": "Customer A",
          "address": "customera@example.com"
        }
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createDraftMessageFromUser</summary>

<div>

Creates a new draft message in the specified user's mailbox in the tenant using application permissions and returns the saved draft.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `payload` | <code>MicrosoftGraphMessage</code> | Yes | New message draft |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->createDraftMessageFromUser("user@example.com", {
    subject: "Monthly Report",
    body: {
        contentType: "html",
        content: "<p>Please find this month's report attached.</p>"
    },
    toRecipients: [
        {emailAddress: {address: "manager@example.com", name: "Manager"}}
    ]
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2userdraft==",
  "isDraft": true,
  "isRead": true,
  "subject": "Monthly Report",
  "importance": "normal",
  "createdDateTime": "2024-01-15T10:00:00Z",
  "toRecipients": [
    {
      "emailAddress": {
        "name": "Manager",
        "address": "manager@example.com"
      }
    }
  ],
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>getMessageFromUser</summary>

<div>

Retrieves a specific message from the specified user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->getMessageFromUser("user@example.com", "AAMkAGI2THVSAAB=");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2THVSAAB=",
  "subject": "Support Request #1042",
  "isRead": false,
  "isDraft": false,
  "importance": "high",
  "receivedDateTime": "2024-01-15T08:00:00Z",
  "body": {
    "contentType": "html",
    "content": "<p>I need urgent assistance with...</p>"
  },
  "from": {
    "emailAddress": {"name": "Customer A", "address": "customera@example.com"}
  },
  "toRecipients": [
    {"emailAddress": {"name": "Support Team", "address": "support@example.com"}}
  ],
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>deleteMessageFromUser</summary>

<div>

Deletes the specified message from the specified user's mailbox in the tenant using application permissions; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>DeleteMessageFromUserHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteMessageFromUser("user@example.com", "AAMkAGI2THVSAAB=");
```

</div>
</details>

<details>
<summary>updateMessageFromUser</summary>

<div>

Updates writable properties of the specified message in the specified user's mailbox in the tenant using application permissions and returns the updated message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MicrosoftGraphMessage</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessage|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessage result = check mailClient->updateMessageFromUser("user@example.com", "AAMkAGI2THVSAAB=", {
    isRead: true,
    importance: "high"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2THVSAAB=",
  "subject": "Support Request #1042",
  "isRead": true,
  "importance": "high",
  "lastModifiedDateTime": "2024-01-15T11:00:00Z",
  "flag": {"flagStatus": "notFlagged"}
}
```

</div>
</details>

<details>
<summary>sendDraftMessageFromUser</summary>

<div>

Sends the specified draft message from the specified user's mailbox in the tenant using application permissions; on success, the draft is moved to Sent Items and no content is returned.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the draft message to send |
| `headers` | <code>SendDraftMessageFromUserHeaders</code> | No | Headers; `Content-Length` defaults to `0` |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->sendDraftMessageFromUser("user@example.com", "AAMkAGI2userdraft==");
```

</div>
</details>

<details>
<summary>copyMessageFromUser</summary>

<div>

Copies the specified message to a destination folder within the specified user's mailbox in the tenant using application permissions and returns the copied message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MessageIdCopyBody</code> | Yes | Action parameters including the destination folder ID or well-known folder name |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMessageResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMessageResponse result = check mailClient->copyMessageFromUser("user@example.com", "AAMkAGI2THVSAAB=", {
    destinationId: "AAMkAGI2archivefolder=="
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.message",
  "id": "AAMkAGI2usercopy==",
  "subject": "Support Request #1042",
  "isDraft": false,
  "isRead": false,
  "parentFolderId": "AAMkAGI2archivefolder=="
}
```

</div>
</details>

<details>
<summary>forwardMessageFromUser</summary>

<div>

Forwards the specified message on behalf of the specified user in the tenant using application permissions, optionally prepending a comment; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MessageIdForwardBody</code> | Yes | Action parameters including recipients and optional comment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->forwardMessageFromUser("user@example.com", "AAMkAGI2THVSAAB=", {
    comment: "Escalating this to the appropriate team.",
    toRecipients: [
        {emailAddress: {address: "escalations@example.com", name: "Escalations Team"}}
    ]
});
```

</div>
</details>

#### User-scoped Attachments

<details>
<summary>listAttachmentsFromUser</summary>

<div>

Retrieves the list of attachments for the specified message in a user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphAttachmentCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachmentCollectionResponse result = check mailClient->listAttachmentsFromUser(
    "user@example.com",
    "AAMkAGI2THVSAAB="
);
```

**Sample response:**

```json
{
  "@odata.count": 2,
  "value": [
    {
      "@odata.type": "#microsoft.graph.fileAttachment",
      "id": "AAMkAGI2userattach1==",
      "name": "invoice.pdf",
      "contentType": "application/pdf",
      "size": 51200,
      "isInline": false
    },
    {
      "@odata.type": "#microsoft.graph.fileAttachment",
      "id": "AAMkAGI2userattach2==",
      "name": "screenshot.png",
      "contentType": "image/png",
      "size": 10240,
      "isInline": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>addAttachmentFromUser</summary>

<div>

Adds a file or item attachment to the specified draft message in a user's mailbox in the tenant using application permissions and returns the created attachment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>MicrosoftGraphAttachment</code> | Yes | New attachment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphAttachment|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachment result = check mailClient->addAttachmentFromUser("user@example.com", "AAMkAGI2userdraft==", {
    atOdataType: "#microsoft.graph.fileAttachment",
    name: "contract.docx",
    contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    isInline: false,
    contentBytes: "UEsDBBQABgAI..."
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.fileAttachment",
  "id": "AAMkAGI2userattach==",
  "name": "contract.docx",
  "contentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "size": 8192,
  "isInline": false
}
```

</div>
</details>

<details>
<summary>getAttachmentFromUser</summary>

<div>

Retrieves the specified attachment from a message in a user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of the attachment |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphAttachment|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphAttachment result = check mailClient->getAttachmentFromUser(
    "user@example.com",
    "AAMkAGI2THVSAAB=",
    "AAMkAGI2userattach1=="
);
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.fileAttachment",
  "id": "AAMkAGI2userattach1==",
  "lastModifiedDateTime": "2024-01-15T08:00:00Z",
  "name": "invoice.pdf",
  "contentType": "application/pdf",
  "size": 51200,
  "isInline": false,
  "contentBytes": "JVBERi0xLjQ..."
}
```

</div>
</details>

<details>
<summary>deleteAttachmentFromUser</summary>

<div>

Deletes the specified attachment from a message in a user's mailbox in the tenant using application permissions; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `attachmentId` | <code>string</code> | Yes | The unique identifier of the attachment |
| `headers` | <code>DeleteAttachmentFromUserHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteAttachmentFromUser("user@example.com", "AAMkAGI2THVSAAB=", "AAMkAGI2userattach1==");
```

</div>
</details>

<details>
<summary>createUploadSessionFromUser</summary>

<div>

Creates an upload session to attach a large file (over 3 MB) to the specified message in a user's mailbox in the tenant using application permissions, returning the upload URL and expiration details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `messageId` | <code>string</code> | Yes | The unique identifier of the message |
| `payload` | <code>AttachmentsCreateUploadSessionBody</code> | Yes | Action parameters including attachment item metadata |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphUploadSessionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphUploadSessionResponse result = check mailClient->createUploadSessionFromUser(
    "user@example.com",
    "AAMkAGI2userdraft==",
    {
        attachmentItem: {
            attachmentType: "file",
            name: "large-dataset.zip",
            size: 10000000,
            contentType: "application/zip"
        }
    }
);
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.uploadSession",
  "uploadUrl": "https://outlook.office.com/api/v2.0/Users/user@example.com/Messages/AAMkAGI2userdraft==/AttachmentSessions/AAMkAGIsession==",
  "expirationDateTime": "2024-01-15T14:30:00Z",
  "nextExpectedRanges": ["0-"]
}
```

</div>
</details>

#### User-scoped Mail Folders

<details>
<summary>listMailFoldersFromUser</summary>

<div>

Retrieves the list of mail folders from the specified user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolderCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolderCollectionResponse result = check mailClient->listMailFoldersFromUser("user@example.com");
```

**Sample response:**

```json
{
  "@odata.count": 4,
  "value": [
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2userinbox==",
      "displayName": "Inbox",
      "childFolderCount": 3,
      "unreadItemCount": 25,
      "totalItemCount": 300,
      "isHidden": false
    },
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2usersentitems==",
      "displayName": "Sent Items",
      "childFolderCount": 0,
      "unreadItemCount": 0,
      "totalItemCount": 150,
      "isHidden": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createMailFolderFromUser</summary>

<div>

Creates a new mail folder (or mail search folder) in the specified user's mailbox in the tenant using application permissions and returns the created folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New mail folder (use `@odata.type: '#microsoft.graph.mailSearchFolder'` to create a search folder) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->createMailFolderFromUser("user@example.com", {
    displayName: "Processed Invoices"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userfolder==",
  "displayName": "Processed Invoices",
  "parentFolderId": "AAMkAGI2userroot==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 0,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>getMailFolderFromUser</summary>

<div>

Retrieves the specified mail folder from a user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->getMailFolderFromUser("user@example.com", "AAMkAGI2userfolder==");
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userfolder==",
  "displayName": "Processed Invoices",
  "parentFolderId": "AAMkAGI2userroot==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 12,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>deleteMailFolderFromUser</summary>

<div>

Deletes the specified mail folder from a user's mailbox in the tenant using application permissions; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `headers` | <code>DeleteMailFolderFromUserHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteMailFolderFromUser("user@example.com", "AAMkAGI2userfolder==");
```

</div>
</details>

<details>
<summary>updateMailFolderFromUser</summary>

<div>

Updates writable properties of the specified mail folder in a user's mailbox in the tenant using application permissions and returns the updated folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->updateMailFolderFromUser("user@example.com", "AAMkAGI2userfolder==", {
    displayName: "Archived Invoices"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userfolder==",
  "displayName": "Archived Invoices",
  "parentFolderId": "AAMkAGI2userroot==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 12,
  "isHidden": false
}
```

</div>
</details>

#### User-scoped Child Folders

<details>
<summary>listChildFoldersFromUser</summary>

<div>

Retrieves the child folders of the specified mail folder in a user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarSkip` | <code>int</code> | No | Skip the first n items |
| `dollarTop` | <code>int</code> | No | Show only the first n items |
| `dollarFilter` | <code>string</code> | No | Filter items by property values |
| `dollarSearch` | <code>string</code> | No | Search items by search phrases |
| `dollarOrderby` | <code>string[]</code> | No | Order items by property values |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarCount` | <code>boolean</code> | No | Include count of items |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolderCollectionResponse|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolderCollectionResponse result = check mailClient->listChildFoldersFromUser(
    "user@example.com",
    "AAMkAGI2userinbox=="
);
```

**Sample response:**

```json
{
  "@odata.count": 2,
  "value": [
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2usersubfolder1==",
      "displayName": "VIP Clients",
      "childFolderCount": 0,
      "unreadItemCount": 3,
      "totalItemCount": 20,
      "isHidden": false
    },
    {
      "@odata.type": "#microsoft.graph.mailFolder",
      "id": "AAMkAGI2usersubfolder2==",
      "displayName": "Newsletters",
      "childFolderCount": 0,
      "unreadItemCount": 50,
      "totalItemCount": 200,
      "isHidden": false
    }
  ]
}
```

</div>
</details>

<details>
<summary>createChildFolderFromUser</summary>

<div>

Creates a new child folder within the specified mail folder in a user's mailbox in the tenant using application permissions and returns the created folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New child mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->createChildFolderFromUser("user@example.com", "AAMkAGI2userfolder==", {
    displayName: "2024 Q1"
});
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userchildfolder==",
  "displayName": "2024 Q1",
  "parentFolderId": "AAMkAGI2userfolder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 0,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>getChildFolderFromUser</summary>

<div>

Retrieves the specified child folder within a mail folder in a user's mailbox in the tenant using application permissions, with optional OData query parameters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `dollarExpand` | <code>string[]</code> | No | Expand related entities |
| `dollarSelect` | <code>string[]</code> | No | Select properties to be returned |
| `includeHiddenFolders` | <code>boolean</code> | No | Include hidden folders |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->getChildFolderFromUser(
    "user@example.com",
    "AAMkAGI2userfolder==",
    "AAMkAGI2userchildfolder=="
);
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userchildfolder==",
  "displayName": "2024 Q1",
  "parentFolderId": "AAMkAGI2userfolder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 8,
  "isHidden": false
}
```

</div>
</details>

<details>
<summary>deleteChildFolderFromUser</summary>

<div>

Deletes the specified child folder from a mail folder in a user's mailbox in the tenant using application permissions; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `headers` | <code>DeleteChildFolderFromUserHeaders</code> | No | Headers including optional `If-Match` ETag for concurrency control |

**Returns:** `error?`

**Sample code:**

```ballerina
check mailClient->deleteChildFolderFromUser("user@example.com", "AAMkAGI2userfolder==", "AAMkAGI2userchildfolder==");
```

</div>
</details>

<details>
<summary>updateChildFolderFromUser</summary>

<div>

Updates writable properties of the specified child folder within a mail folder in a user's mailbox in the tenant using application permissions and returns the updated folder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userIdentifier` | <code>string</code> | Yes | The unique identifier or userPrincipalName of the user |
| `mailFolderId` | <code>string</code> | Yes | The unique identifier of the parent mail folder |
| `mailFolderId1` | <code>string</code> | Yes | The unique identifier of the child mail folder |
| `payload` | <code>MicrosoftGraphMailFolder</code> | Yes | New property values |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MicrosoftGraphMailFolder|error`

**Sample code:**

```ballerina
mail:MicrosoftGraphMailFolder result = check mailClient->updateChildFolderFromUser(
    "user@example.com",
    "AAMkAGI2userfolder==",
    "AAMkAGI2userchildfolder==",
    {displayName: "2024 Q1 Archived"}
);
```

**Sample response:**

```json
{
  "@odata.type": "#microsoft.graph.mailFolder",
  "id": "AAMkAGI2userchildfolder==",
  "displayName": "2024 Q1 Archived",
  "parentFolderId": "AAMkAGI2userfolder==",
  "childFolderCount": 0,
  "unreadItemCount": 0,
  "totalItemCount": 8,
  "isHidden": false
}
```

</div>
</details>