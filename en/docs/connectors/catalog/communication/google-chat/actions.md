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

<details>
<summary>post spaces</summary>

`POST /spaces`

Creates a named space (requires user authentication).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Space` | Yes | The space to create. |

Returns: `Space|error`

Sample code:

```ballerina
chat:Space created = check chatClient->/spaces.post({displayName: "Engineering", spaceType: "SPACE"});
```

</details>

<details>
<summary>patch spaces/[spaceId]</summary>

`PATCH /spaces/[spaceId]`

Updates a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The ID of the space to update. |
| `payload` | `Space` | Yes | The updated space fields. |
| `updateMask` | `string?` | No | The field paths to update (comma-separated). |

Returns: `Space|error`

Sample code:

```ballerina
chat:Space updated = check chatClient->/spaces/[spaceId].patch({displayName: "Engineering Team"},
    updateMask = "displayName");
```

</details>

<details>
<summary>delete spaces/[spaceId]</summary>

`DELETE /spaces/[spaceId]`

Deletes a named space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The ID of the space to delete. |

Returns: `error?`

Sample code:

```ballerina
check chatClient->/spaces/[spaceId].delete();
```

</details>

<details>
<summary>get spaces/findDirectMessage</summary>

`GET /spaces:findDirectMessage`

Finds an existing direct message space with a specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string?` | No | Resource name of the user to find a DM with, for example `users/user@example.com`. |

Returns: `Space|error`

Sample code:

```ballerina
chat:Space dm = check chatClient->/spaces/findDirectMessage(name = "users/user@example.com");
```

</details>

<details>
<summary>get spaces/search</summary>

`GET /spaces:search`

Searches for spaces in a Google Workspace organization. Requires the caller to be a Workspace administrator with the manage chat and spaces conversations privilege, and the `chat.admin.spaces` or `chat.admin.spaces.readonly` OAuth scope.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | A search query, for example `customer = "customers/my_customer" AND spaceType = "SPACE"`. `customer` and `spaceType` are required fields in the query. |
| `useAdminAccess` | `boolean` | Yes | Must be `true`. Runs the method using the caller's admin privileges. |
| `pageSize` | `int?` | No | Maximum number of spaces to return (default 100, max 1000). |
| `pageToken` | `string?` | No | Page token from a previous search request. |
| `orderBy` | `string?` | No | How to order results, for example `lastActiveTime DESC`. |

Returns: `SearchSpacesResponse|error`

Sample code:

```ballerina
chat:SearchSpacesResponse results = check chatClient->/spaces/search(
    query = "customer = \"customers/my_customer\" AND spaceType = \"SPACE\"", useAdminAccess = true);
```

</details>

<details>
<summary>post spaces/setup</summary>

`POST /spaces:setup`

Creates a space and adds specified users or Google Groups to it in one call. The calling user is added automatically and shouldn't be listed in `memberships`. Requires user authentication with the `chat.spaces` or `chat.spaces.create` OAuth scope.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SetUpSpaceRequest` | Yes | The space to create (`space.spaceType` is required: `SPACE`, `GROUP_CHAT`, or `DIRECT_MESSAGE`), plus optional `requestId` and up to 49 initial `memberships`. |

Returns: `Space|error`

Sample code:

```ballerina
chat:Space created = check chatClient->/spaces/setup.post({
    space: {displayName: "Engineering", spaceType: "SPACE"},
    memberships: [{member: {name: "users/user@example.com", 'type: "HUMAN"}}]
});
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
<summary>get spaces/[spaceId]/messages</summary>

`GET /spaces/[spaceId]/messages`

Lists messages in a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `pageSize` | `int?` | No | Maximum number of messages to return (max 1000). |
| `pageToken` | `string?` | No | Page token from a previous list request. |
| `filter` | `string?` | No | A query filter. |
| `orderBy` | `string?` | No | Ordering of results, for example `createTime desc`. |
| `showDeleted` | `boolean?` | No | Whether to include deleted messages in the response. |

Returns: `ListMessagesResponse|error`

Sample code:

```ballerina
chat:ListMessagesResponse messages = check chatClient->/spaces/[spaceId]/messages();
```

</details>

<details>
<summary>get spaces/[spaceId]/messages/[messageId]</summary>

`GET /spaces/[spaceId]/messages/[messageId]`

Returns details about a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |

Returns: `Message|error`

Sample code:

```ballerina
chat:Message message = check chatClient->/spaces/[spaceId]/messages/[messageId]();
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
| `payload` | `UpdateMessageRequest` | Yes | The updated message fields: `text`, `cardsV2`, `fallbackText`, and `accessoryWidgets`. |
| `updateMask` | `string` | Yes | The field paths to update, comma-separated (for example, `text,cardsV2`), or `*` to update all supported paths. |
| `allowMissing` | `boolean?` | No | If `true`, creates the message if it doesn't already exist. |

Returns: `Message|error`

Sample code:

```ballerina
chat:Message updated = check chatClient->/spaces/[spaceId]/messages/[messageId].patch({
    text: "Updated text"
}, updateMask = "text");
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

<details>
<summary>get spaces/[spaceId]/members</summary>

`GET /spaces/[spaceId]/members`

Lists memberships in a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `pageSize` | `int?` | No | Maximum number of memberships to return (max 1000). |
| `pageToken` | `string?` | No | Page token from a previous list request. |
| `filter` | `string?` | No | A query filter, for example `role = "ROLE_MANAGER"`. |
| `showGroups` | `boolean?` | No | Whether to include Google Group memberships. |
| `showInvited` | `boolean?` | No | Whether to include invited memberships. |
| `useAdminAccess` | `boolean?` | No | Whether to use the caller's Workspace admin privileges for the request. |

Returns: `ListMembershipsResponse|error`

Sample code:

```ballerina
chat:ListMembershipsResponse members = check chatClient->/spaces/[spaceId]/members();
```

</details>

<details>
<summary>get spaces/[spaceId]/members/[memberId]</summary>

`GET /spaces/[spaceId]/members/[memberId]`

Returns details about a membership.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `memberId` | `string` | Yes | The member resource name. |
| `useAdminAccess` | `boolean?` | No | Runs the method using the caller's Workspace admin privileges. Not supported for app memberships. |

Returns: `Membership|error`

Sample code:

```ballerina
chat:Membership member = check chatClient->/spaces/[spaceId]/members/[memberId]();
```

</details>

<details>
<summary>patch spaces/[spaceId]/members/[memberId]</summary>

`PATCH /spaces/[spaceId]/members/[memberId]`

Updates a membership, for example to change a member's role in a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `memberId` | `string` | Yes | The member resource name. |
| `payload` | `Membership` | Yes | The membership with updated fields. |
| `updateMask` | `string` | Yes | The field paths to update. Currently only `role` is supported. |
| `useAdminAccess` | `boolean?` | No | Runs the method using the caller's Workspace admin privileges. |

Returns: `Membership|error`

Sample code:

```ballerina
chat:Membership updated = check chatClient->/spaces/[spaceId]/members/[memberId].patch(
    {role: "ROLE_MANAGER"}, updateMask = "role");
```

</details>

<details>
<summary>delete spaces/[spaceId]/members/[memberId]</summary>

`DELETE /spaces/[spaceId]/members/[memberId]`

Removes a user or Chat app from a space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `memberId` | `string` | Yes | The member resource name. |

Returns: `error?`

Sample code:

```ballerina
check chatClient->/spaces/[spaceId]/members/[memberId].delete();
```

</details>

#### Reactions

<details>
<summary>post spaces/[spaceId]/messages/[messageId]/reactions</summary>

`POST /spaces/[spaceId]/messages/[messageId]/reactions`

Creates a reaction on a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |
| `payload` | `Reaction` | Yes | The reaction to create, for example `{emoji: {unicode: "👍"}}`. |

Returns: `Reaction|error`

Sample code:

```ballerina
chat:Reaction reaction = check chatClient->/spaces/[spaceId]/messages/[messageId]/reactions.post({
    emoji: {unicode: "👍"}
});
```

</details>

<details>
<summary>get spaces/[spaceId]/messages/[messageId]/reactions</summary>

`GET /spaces/[spaceId]/messages/[messageId]/reactions`

Lists reactions on a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |
| `pageSize` | `int?` | No | Maximum number of reactions to return (max 25). |
| `pageToken` | `string?` | No | Page token from a previous list request. |
| `filter` | `string?` | No | A query filter, for example by emoji. |

Returns: `ListReactionsResponse|error`

Sample code:

```ballerina
chat:ListReactionsResponse reactions = check chatClient->/spaces/[spaceId]/messages/[messageId]/reactions();
```

</details>

<details>
<summary>delete spaces/[spaceId]/messages/[messageId]/reactions/[reactionId]</summary>

`DELETE /spaces/[spaceId]/messages/[messageId]/reactions/[reactionId]`

Deletes a reaction from a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |
| `reactionId` | `string` | Yes | The reaction resource name. |

Returns: `error?`

Sample code:

```ballerina
check chatClient->/spaces/[spaceId]/messages/[messageId]/reactions/[reactionId].delete();
```

</details>

#### Attachments

<details>
<summary>post spaces/[spaceId]/attachments/upload</summary>

`POST /spaces/[spaceId]/attachments:upload`

Uploads an attachment to a Google Chat space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The ID of the space that will own the uploaded attachment. |
| `payload` | `UploadAttachmentRequest` | Yes | `filename` and the raw `mediaBytes` to upload. |

Returns: `UploadAttachmentResponse|error`

Sample code:

```ballerina
chat:UploadAttachmentResponse uploaded = check chatClient->/spaces/[spaceId]/attachments/upload.post({
    filename: "report.pdf",
    mediaBytes: fileBytes
});
```

</details>

<details>
<summary>get spaces/[spaceId]/messages/[messageId]/attachments/[attachmentId]</summary>

`GET /spaces/[spaceId]/messages/[messageId]/attachments/[attachmentId]`

Gets the metadata of a message attachment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `messageId` | `string` | Yes | The message resource name. |
| `attachmentId` | `string` | Yes | The attachment resource name. |

Returns: `Attachment|error`

Sample code:

```ballerina
chat:Attachment attachment = check chatClient->/spaces/[spaceId]/messages/[messageId]/attachments/[attachmentId]();
```

</details>

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

#### Space events

<details>
<summary>get spaces/[spaceId]/spaceEvents/[spaceEventId]</summary>

`GET /spaces/[spaceId]/spaceEvents/[spaceEventId]`

Returns an event from a Google Chat space, from the Workspace Events API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `spaceEventId` | `string` | Yes | The space event resource name. |

Returns: `SpaceEvent|error`

Sample code:

```ballerina
chat:SpaceEvent event = check chatClient->/spaces/[spaceId]/spaceEvents/[spaceEventId]();
```

</details>

<details>
<summary>get spaces/[spaceId]/spaceEvents</summary>

`GET /spaces/[spaceId]/spaceEvents`

Lists events from a Google Chat space.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `spaceId` | `string` | Yes | The space resource name. |
| `filter` | `string` | Yes | An event type filter, for example `eventTypes:"google.workspace.chat.message.v1.created"`. |
| `pageSize` | `int?` | No | Maximum number of events to return. |
| `pageToken` | `string?` | No | Page token from a previous list request. |

Returns: `ListSpaceEventsResponse|error`

Sample code:

```ballerina
chat:ListSpaceEventsResponse events = check chatClient->/spaces/[spaceId]/spaceEvents(
    filter = string `eventTypes:"google.workspace.chat.message.v1.created"`);
```

</details>

## What's next

- [Trigger Reference](triggers.md): react to interaction events using the webhook listener.
- [Example](example.md): complete example integrations for the Google Chat connector and trigger.
- [Setup Guide](setup-guide.md): create a GCP project and configure the Chat app.
