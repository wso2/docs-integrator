---
title: Actions
description: "Full reference for the Google Chat connector client operations: managing spaces, messages, members, and attachments."
keywords: [google chat, google workspace, chat api, ballerina connector, actions]
connector: true
connector_name: "googleapis.chat"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/googleapis.chat` package exposes the following client:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Space, message, member, and attachment management on the Google Chat REST API. |

## Client

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>ServiceAccountAuthConfig&#124;OAuth2Config&#124;http:BearerTokenConfig</code> | Required | Authentication configuration: service account, OAuth2, or bearer token. |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client. |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response. |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header. |
| `retryConfig` | <code>http:RetryConfig</code> | <code>()</code> | Retry configuration for failed requests. |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching-related configurations. |

### Initializing the client

```ballerina
import ballerinax/googleapis.chat;

configurable chat:OAuth2Config oauthAuth = ?;

final chat:Client chatClient = check new ({auth: oauthAuth});
```

### Operations

Most `Client` operations are resource functions, invoked with the HTTP method and resource path shown in each signature.

#### Spaces

<details>
<summary>get spaces</summary>

`GET /spaces`

Lists spaces the app has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pageSize` | `int?` | No | The maximum number of spaces to return. |
| `filter` | `string?` | No | A filter query, for example by space type. |

Returns: `ListSpacesResponse|error`

Sample code:

```ballerina
chat:ListSpacesResponse spaces = check chatClient->/spaces();
```

Sample response:

```json
{
    "spaces": [{"name": "spaces/AAAA", "displayName": "Engineering", "spaceType": "SPACE"}]
}
```

</details>

<details>
<summary>get spaces/[spaceId]</summary>

`GET /spaces/[spaceId]`

Gets details of a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name, for example `spaces/AAAA`. |

Returns: `Space|error`

Sample code:

```ballerina
chat:Space space = check chatClient->/spaces/[spaceId]();
```

</details>

#### Messages

<details>
<summary>post spaces/[spaceId]/messages</summary>

`POST /spaces/[spaceId]/messages`

Sends a message to a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `payload` | `Message` | Yes | The message content. |

Returns: `Message|error`

Sample code:

```ballerina
chat:Message sent = check chatClient->/spaces/[spaceId]/messages.post({
    text: "Hello from Ballerina!"
});
```

Sample response:

```json
{
    "name": "spaces/AAAA/messages/BBBB",
    "text": "Hello from Ballerina!"
}
```

</details>

<details>
<summary>patch spaces/[spaceId]/messages/[messageId]</summary>

`PATCH /spaces/[spaceId]/messages/[messageId]`

Updates an existing message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |
| `payload` | `Message` | Yes | The updated message content. |

Returns: `Message|error`

Sample code:

```ballerina
chat:Message updated = check chatClient->/spaces/[spaceId]/messages/[messageId].patch({
    text: "Updated text"
});
```

</details>

<details>
<summary>delete spaces/[spaceId]/messages/[messageId]</summary>

`DELETE /spaces/[spaceId]/messages/[messageId]`

Deletes a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |

Returns: `error?`

Sample code:

```ballerina
check chatClient->/spaces/[spaceId]/messages/[messageId].delete();
```

</details>

#### Members

<details>
<summary>post spaces/[spaceId]/members</summary>

`POST /spaces/[spaceId]/members`

Adds a member to a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `payload` | `Membership` | Yes | The member to add. |

Returns: `Membership|error`

Sample code:

```ballerina
chat:Membership membership = check chatClient->/spaces/[spaceId]/members.post({
    member: {name: "users/user@example.com", 'type: "HUMAN"}
});
```

</details>

#### Attachments

<details>
<summary>downloadMedia</summary>

Downloads attachment media bytes given its resource name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `resourceName` | `string` | Yes | The attachment media resource name from a message's `attachment.downloadUri` or `attachment.name`. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] mediaBytes = check chatClient->downloadMedia(resourceName);
```

</details>

:::note
The client also exposes operations for finding direct message spaces, searching spaces, uploading attachments, and managing reactions and space events. See the [connector source](https://github.com/ballerina-platform/module-ballerinax-googleapis.chat/blob/main/ballerina/client.bal) for the complete list.
:::

## What's next

- [Trigger Reference](triggers.md): react to interaction events using the webhook listener.
- [Example](example.md): complete example integrations for the Google Chat connector and trigger.
- [Setup Guide](setup-guide.md): create a GCP project and configure the Chat app.
