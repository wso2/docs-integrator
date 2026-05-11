---
title: Actions
---

# Actions

The `ballerinax/googleapis.gmail` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Gmail REST API: messages, drafts, threads, labels, history, profile, and attachments. |

---

## Client

Gmail REST API: messages, drafts, threads, labels, history, profile, and attachments.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 refresh token config or bearer token. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Compression setting for requests. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP response cache configuration. |
| `validation` | `boolean` | `true` | Enable payload validation against the OpenAPI spec. |
| `laxDataBinding` | `boolean` | `true` | Allow lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerinax/googleapis.gmail as gmail;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

gmail:Client gmail = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://accounts.google.com/o/oauth2/token"
    }
});
```

### Operations

#### Profile

<details>
<summary>Get user profile</summary>

Retrieves the authenticated user's Gmail profile including email address, total messages, total threads, and history ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or the special value `"me"` for the authenticated user. |

Returns: `gmail:Profile|error`

Sample code:

```ballerina
gmail:Profile profile = check gmail->/users/me/profile();
```

Sample response:

```ballerina
{"emailAddress": "user@gmail.com", "messagesTotal": 15234, "threadsTotal": 8421, "historyId": "987654"}
```

</details>

#### Messages

<details>
<summary>List messages</summary>

Lists message IDs in the user's mailbox. Supports Gmail search syntax via the `q` query parameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `q` | `string` | No | Gmail search query (e.g., `"label:INBOX is:unread"`). |
| `maxResults` | `int` | No | Maximum number of messages to return (default 100, max 500). |
| `pageToken` | `string` | No | Token for fetching the next page of results. |
| `labelIds` | `string[]` | No | Only return messages with all of the specified label IDs. |
| `includeSpamTrash` | `boolean` | No | Include messages from SPAM and TRASH in results. |

Returns: `gmail:ListMessagesResponse|error`

Sample code:

```ballerina
gmail:ListMessagesResponse messageList = check gmail->/users/me/messages(q = "label:INBOX is:unread");
```

Sample response:

```ballerina
{"messages": [{"id": "18a1b2c3d4e5f6a7", "threadId": "18a1b2c3d4e5f6a7"}, {"id": "18a1b2c3d4e5f6a8", "threadId": "18a1b2c3d4e5f6a8"}], "resultSizeEstimate": 2}
```

</details>

<details>
<summary>Send a message</summary>

Sends an email message. Supports plain text, HTML body, inline images, and file attachments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `message` | `gmail:MessageRequest` | Yes | The message to send, including recipients, subject, body, and optional attachments. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message sendResult = check gmail->/users/me/messages/send.post({
    to: ["recipient@example.com"],
    subject: "Scheduled Maintenance Notification",
    bodyInHtml: "<h1>Maintenance Notice</h1><p>Systems will be down for maintenance.</p>",
    inlineImages: [{
        contentId: "logo",
        mimeType: "image/png",
        name: "logo.png",
        path: "resources/logo.png"
    }]
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6a9", "threadId": "18a1b2c3d4e5f6a9", "labelIds": ["SENT"]}
```

</details>

<details>
<summary>Get a message</summary>

Retrieves a specific message by ID with full metadata, headers, and body content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The message ID. |
| `format` | `string` | No | Response format: `"full"`, `"metadata"`, `"minimal"`, or `"raw"`. |
| `metadataHeaders` | `string[]` | No | Specific headers to include when format is `"metadata"`. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message message = check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"](format = "full");
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6a7", "threadId": "18a1b2c3d4e5f6a7", "labelIds": ["INBOX", "UNREAD"], "snippet": "Hello, this is a test email...", "from": "sender@example.com", "to": "user@gmail.com", "subject": "Test Email", "date": "Mon, 15 Jan 2024 10:30:00 +0000", "internalDate": "1705312200000", "sizeEstimate": 2048}
```

</details>

<details>
<summary>Insert a message</summary>

Inserts a message directly into the mailbox (similar to IMAP APPEND), bypassing send.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `message` | `gmail:MessageRequest` | Yes | The message to insert. |
| `deleted` | `boolean` | No | Mark the message as permanently deleted (not TRASH) upon insert. |
| `internalDateSource` | `string` | No | Source for internal date: `"receivedTime"` or `"dateHeader"`. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message inserted = check gmail->/users/me/messages.post({
    to: ["archive@example.com"],
    subject: "Archived Message",
    bodyInText: "This message is being archived."
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6b0", "threadId": "18a1b2c3d4e5f6b0", "labelIds": ["INBOX"]}
```

</details>

<details>
<summary>Import a message</summary>

Imports a message into the mailbox with standard email delivery scanning (spam classification, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `message` | `gmail:MessageRequest` | Yes | The message to import. |
| `neverMarkSpam` | `boolean` | No | Never mark the imported message as spam. |
| `processForCalendar` | `boolean` | No | Process calendar invites in the message. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message imported = check gmail->/users/me/messages/'import.post({
    to: ["user@gmail.com"],
    subject: "Migrated Message",
    bodyInText: "This message was migrated from another system."
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6b1", "threadId": "18a1b2c3d4e5f6b1", "labelIds": ["INBOX"]}
```

</details>

<details>
<summary>Modify a message</summary>

Modifies the labels on a message (add or remove labels).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The message ID. |
| `modifyRequest` | `gmail:ModifyMessageRequest` | Yes | Labels to add and/or remove. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message modified = check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"]/modify.post({
    addLabelIds: ["STARRED"],
    removeLabelIds: ["UNREAD"]
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6a7", "threadId": "18a1b2c3d4e5f6a7", "labelIds": ["INBOX", "STARRED"]}
```

</details>

<details>
<summary>Trash a message</summary>

Moves a message to the trash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The message ID. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message trashed = check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"]/trash.post();
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6a7", "threadId": "18a1b2c3d4e5f6a7", "labelIds": ["TRASH"]}
```

</details>

<details>
<summary>Untrash a message</summary>

Removes a message from the trash, restoring it to its previous labels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The message ID. |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message restored = check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"]/untrash.post();
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6a7", "threadId": "18a1b2c3d4e5f6a7", "labelIds": ["INBOX"]}
```

</details>

<details>
<summary>Delete a message</summary>

Permanently deletes a message. This action cannot be undone.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The message ID. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"].delete();
```

</details>

<details>
<summary>Batch delete messages</summary>

Permanently deletes multiple messages by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `request` | `gmail:BatchDeleteMessagesRequest` | Yes | Object containing the array of message IDs to delete. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/messages/batchDelete.post({
    ids: ["18a1b2c3d4e5f6a7", "18a1b2c3d4e5f6a8"]
});
```

</details>

<details>
<summary>Batch modify messages</summary>

Modifies labels on multiple messages at once.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `request` | `gmail:BatchModifyMessagesRequest` | Yes | Message IDs and labels to add/remove. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/messages/batchModify.post({
    ids: ["18a1b2c3d4e5f6a7", "18a1b2c3d4e5f6a8"],
    removeLabelIds: ["UNREAD"]
});
```

</details>

#### Attachments

<details>
<summary>Get an attachment</summary>

Retrieves a message attachment by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `messageId` | `string` | Yes | The message ID containing the attachment. |
| `id` | `string` | Yes | The attachment ID. |

Returns: `gmail:Attachment|error`

Sample code:

```ballerina
gmail:Attachment attachment = check gmail->/users/me/messages/["18a1b2c3d4e5f6a7"]/attachments/["ANGjdJ8abc123"]();
```

Sample response:

```ballerina
{"attachmentId": "ANGjdJ8abc123", "size": 24576}
```

</details>

#### Drafts

<details>
<summary>List drafts</summary>

Lists drafts in the user's mailbox.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `q` | `string` | No | Gmail search query to filter drafts. |
| `maxResults` | `int` | No | Maximum number of drafts to return. |
| `pageToken` | `string` | No | Token for fetching the next page. |
| `includeSpamTrash` | `boolean` | No | Include drafts in SPAM and TRASH. |

Returns: `gmail:ListDraftsResponse|error`

Sample code:

```ballerina
gmail:ListDraftsResponse draftList = check gmail->/users/me/drafts();
```

Sample response:

```ballerina
{"drafts": [{"id": "r_abc123", "message": {"id": "18a1b2c3d4e5f6c0", "threadId": "18a1b2c3d4e5f6c0"}}], "resultSizeEstimate": 1}
```

</details>

<details>
<summary>Create a draft</summary>

Creates a new draft.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `draft` | `gmail:DraftRequest` | Yes | The draft content including the message. |

Returns: `gmail:Draft|error`

Sample code:

```ballerina
gmail:Draft draft = check gmail->/users/me/drafts.post({
    message: {
        to: ["colleague@example.com"],
        subject: "Project Update",
        bodyInText: "Here is the latest update on the project."
    }
});
```

Sample response:

```ballerina
{"id": "r_def456", "message": {"id": "18a1b2c3d4e5f6c1", "threadId": "18a1b2c3d4e5f6c1", "labelIds": ["DRAFT"]}}
```

</details>

<details>
<summary>Get a draft</summary>

Retrieves a specific draft by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The draft ID. |
| `format` | `string` | No | Response format: `"full"`, `"metadata"`, `"minimal"`, or `"raw"`. |

Returns: `gmail:Draft|error`

Sample code:

```ballerina
gmail:Draft draft = check gmail->/users/me/drafts/["r_def456"](format = "full");
```

Sample response:

```ballerina
{"id": "r_def456", "message": {"id": "18a1b2c3d4e5f6c1", "threadId": "18a1b2c3d4e5f6c1", "labelIds": ["DRAFT"], "snippet": "Here is the latest update...", "subject": "Project Update"}}
```

</details>

<details>
<summary>Update a draft</summary>

Replaces the content of an existing draft.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The draft ID. |
| `draft` | `gmail:DraftRequest` | Yes | The updated draft content. |

Returns: `gmail:Draft|error`

Sample code:

```ballerina
gmail:Draft updated = check gmail->/users/me/drafts/["r_def456"].put({
    message: {
        to: ["colleague@example.com"],
        subject: "Project Update (Revised)",
        bodyInText: "Here is the revised update."
    }
});
```

Sample response:

```ballerina
{"id": "r_def456", "message": {"id": "18a1b2c3d4e5f6c2", "threadId": "18a1b2c3d4e5f6c1", "labelIds": ["DRAFT"]}}
```

</details>

<details>
<summary>Send a draft</summary>

Sends an existing draft.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `draft` | `gmail:DraftRequest` | Yes | The draft to send (must include the draft `id`). |

Returns: `gmail:Message|error`

Sample code:

```ballerina
gmail:Message sent = check gmail->/users/me/drafts/send.post({
    id: "r_def456",
    message: {}
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6c3", "threadId": "18a1b2c3d4e5f6c1", "labelIds": ["SENT"]}
```

</details>

<details>
<summary>Delete a draft</summary>

Permanently deletes a draft.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The draft ID. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/drafts/["r_def456"].delete();
```

</details>

#### Threads

<details>
<summary>List threads</summary>

Lists threads in the user's mailbox, with optional search filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `q` | `string` | No | Gmail search query to filter threads. |
| `maxResults` | `int` | No | Maximum number of threads to return. |
| `pageToken` | `string` | No | Token for fetching the next page. |
| `labelIds` | `string[]` | No | Only return threads with all of the specified label IDs. |
| `includeSpamTrash` | `boolean` | No | Include threads from SPAM and TRASH. |

Returns: `gmail:ListThreadsResponse|error`

Sample code:

```ballerina
gmail:ListThreadsResponse threadList = check gmail->/users/me/threads(q = "subject:invoice", maxResults = 10);
```

Sample response:

```ballerina
{"threads": [{"id": "18a1b2c3d4e5f6d0", "snippet": "Please find the invoice attached...", "historyId": "987650"}], "resultSizeEstimate": 1}
```

</details>

<details>
<summary>Get a thread</summary>

Retrieves a specific thread with all its messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The thread ID. |
| `format` | `string` | No | Response format: `"full"`, `"metadata"`, or `"minimal"`. |
| `metadataHeaders` | `string[]` | No | Specific headers to include when format is `"metadata"`. |

Returns: `gmail:MailThread|error`

Sample code:

```ballerina
gmail:MailThread thread = check gmail->/users/me/threads/["18a1b2c3d4e5f6d0"]();
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6d0", "historyId": "987654", "messages": [{"id": "18a1b2c3d4e5f6d0", "threadId": "18a1b2c3d4e5f6d0", "snippet": "Please find the invoice..."}]}
```

</details>

<details>
<summary>Modify a thread</summary>

Modifies the labels applied to all messages in a thread.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The thread ID. |
| `modifyRequest` | `gmail:ModifyThreadRequest` | Yes | Labels to add and/or remove. |

Returns: `gmail:MailThread|error`

Sample code:

```ballerina
gmail:MailThread modified = check gmail->/users/me/threads/["18a1b2c3d4e5f6d0"]/modify.post({
    addLabelIds: ["IMPORTANT"],
    removeLabelIds: ["UNREAD"]
});
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6d0", "historyId": "987660"}
```

</details>

<details>
<summary>Trash a thread</summary>

Moves all messages in a thread to the trash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The thread ID. |

Returns: `gmail:MailThread|error`

Sample code:

```ballerina
gmail:MailThread trashed = check gmail->/users/me/threads/["18a1b2c3d4e5f6d0"]/trash.post();
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6d0", "historyId": "987661"}
```

</details>

<details>
<summary>Untrash a thread</summary>

Removes all messages in a thread from the trash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The thread ID. |

Returns: `gmail:MailThread|error`

Sample code:

```ballerina
gmail:MailThread restored = check gmail->/users/me/threads/["18a1b2c3d4e5f6d0"]/untrash.post();
```

Sample response:

```ballerina
{"id": "18a1b2c3d4e5f6d0", "historyId": "987662"}
```

</details>

<details>
<summary>Delete a thread</summary>

Permanently deletes a thread and all its messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The thread ID. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/threads/["18a1b2c3d4e5f6d0"].delete();
```

</details>

#### Labels

<details>
<summary>List labels</summary>

Lists all labels in the user's mailbox, including system and custom labels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |

Returns: `gmail:ListLabelsResponse|error`

Sample code:

```ballerina
gmail:ListLabelsResponse labelList = check gmail->/users/me/labels();
```

Sample response:

```ballerina
{"labels": [{"id": "INBOX", "name": "INBOX", "type": "system"}, {"id": "Label_1", "name": "Work", "type": "user", "messagesTotal": 42, "messagesUnread": 5}]}
```

</details>

<details>
<summary>Create a label</summary>

Creates a new custom label.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `label` | `gmail:Label` | Yes | The label to create. |

Returns: `gmail:Label|error`

Sample code:

```ballerina
gmail:Label newLabel = check gmail->/users/me/labels.post({
    name: "Invoices",
    labelListVisibility: "labelShow",
    messageListVisibility: "show"
});
```

Sample response:

```ballerina
{"id": "Label_25", "name": "Invoices", "type": "user", "labelListVisibility": "labelShow", "messageListVisibility": "show", "messagesTotal": 0, "messagesUnread": 0, "threadsTotal": 0, "threadsUnread": 0}
```

</details>

<details>
<summary>Get a label</summary>

Retrieves a specific label by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The label ID. |

Returns: `gmail:Label|error`

Sample code:

```ballerina
gmail:Label label = check gmail->/users/me/labels/["Label_25"]();
```

Sample response:

```ballerina
{"id": "Label_25", "name": "Invoices", "type": "user", "labelListVisibility": "labelShow", "messageListVisibility": "show", "messagesTotal": 12, "messagesUnread": 3, "threadsTotal": 8, "threadsUnread": 2}
```

</details>

<details>
<summary>Update a label</summary>

Replaces all fields of a label with the provided values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The label ID. |
| `label` | `gmail:Label` | Yes | The full label object with updated values. |

Returns: `gmail:Label|error`

Sample code:

```ballerina
gmail:Label updated = check gmail->/users/me/labels/["Label_25"].put({
    name: "Invoices: Paid",
    labelListVisibility: "labelShow",
    messageListVisibility: "show"
});
```

Sample response:

```ballerina
{"id": "Label_25", "name": "Invoices: Paid", "type": "user", "labelListVisibility": "labelShow", "messageListVisibility": "show"}
```

</details>

<details>
<summary>Patch a label</summary>

Partially updates a label, modifying only the specified fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The label ID. |
| `label` | `gmail:Label` | Yes | The label fields to update. |

Returns: `gmail:Label|error`

Sample code:

```ballerina
gmail:Label patched = check gmail->/users/me/labels/["Label_25"].patch({
    name: "Invoices: Archived"
});
```

Sample response:

```ballerina
{"id": "Label_25", "name": "Invoices: Archived", "type": "user", "labelListVisibility": "labelShow", "messageListVisibility": "show"}
```

</details>

<details>
<summary>Delete a label</summary>

Permanently deletes a custom label. Messages with the label are not deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `id` | `string` | Yes | The label ID. |

Returns: `error?`

Sample code:

```ballerina
check gmail->/users/me/labels/["Label_25"].delete();
```

</details>

#### History

<details>
<summary>List history</summary>

Lists the history of changes to the mailbox since a given history ID, useful for incremental sync.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The user's email address or `"me"`. |
| `startHistoryId` | `string` | Yes | The history ID to start listing from (obtained from a previous profile or message response). |
| `maxResults` | `int` | No | Maximum number of history records to return. |
| `pageToken` | `string` | No | Token for fetching the next page. |
| `labelId` | `string` | No | Only return history for this label. |
| `historyTypes` | `string[]` | No | Filter by history type: `"messageAdded"`, `"messageDeleted"`, `"labelAdded"`, `"labelRemoved"`. |

Returns: `gmail:ListHistoryResponse|error`

Sample code:

```ballerina
gmail:ListHistoryResponse history = check gmail->/users/me/history(startHistoryId = "987654");
```

Sample response:

```ballerina
{"historyId": "987700", "history": [{"id": "987655", "messagesAdded": [{"message": {"id": "18a1b2c3d4e5f6e0", "threadId": "18a1b2c3d4e5f6e0"}}]}]}
```

</details>
