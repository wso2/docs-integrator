---
title: Actions
---

# Actions

The `ballerinax/slack` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to all Slack Web API methods for messaging, conversations, users, files, search, reactions, pins, and workspace administration. |

---

## Client

Provides access to all Slack Web API methods for messaging, conversations, users, files, search, reactions, pins, and workspace administration.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | Authentication configuration: a bearer token record `{token: "xoxb-..."}` or an OAuth 2.0 refresh token grant config. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable response payload validation against the Slack API schema. |
| `laxDataBinding` | `boolean` | `true` | Allow lax data binding for API responses with extra fields. |

### Initializing the client

```ballerina
import ballerinax/slack;

configurable string token = ?;

slack:Client slackClient = check new ({
    auth: {
        token: token
    }
});
```

### Operations

#### Messaging

<details>
<summary>Post a message to a channel</summary>

Sends a message to a public channel, private channel, or direct message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID or name where the message will be posted (e.g., `"C1234567890"` or `"general"`). |
| `text` | `string` | No | Message text. Required when `blocks` is not provided. |
| `blocks` | `string` | No | A JSON-encoded array of Block Kit layout blocks. |
| `thread_ts` | `string` | No | Timestamp of the parent message to reply to as a thread. |
| `mrkdwn` | `boolean` | No | Whether to parse Slack markdown in the message text. |

Returns: `ChatPostMessageResponse|error`

Sample code:

```ballerina
slack:ChatPostMessageResponse response = check slackClient->/chat\.postMessage.post({
    channel: "C1234567890",
    text: "Hello from Ballerina!"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": "C1234567890",
  "ts": "1720000000.123456",
  "message": {
    "type": "message",
    "text": "Hello from Ballerina!",
    "user": "U0000BOT",
    "ts": "1720000000.123456"
  }
}
```

</details>

<details>
<summary>Update a message</summary>

Updates the text of an existing message in a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the message. |
| `ts` | `string` | Yes | Timestamp of the message to update. |
| `text` | `string` | No | New message text. |

Returns: `ChatUpdateResponse|error`

Sample code:

```ballerina
slack:ChatUpdateResponse response = check slackClient->/chat\.update.post({
    channel: "C1234567890",
    ts: "1720000000.123456",
    text: "Updated: deployment completed successfully."
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": "C1234567890",
  "ts": "1720000000.123456",
  "text": "Updated: deployment completed successfully."
}
```

</details>

<details>
<summary>Delete a message</summary>

Deletes a message from a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the message. |
| `ts` | `string` | Yes | Timestamp of the message to delete. |

Returns: `ChatDeleteResponse|error`

Sample code:

```ballerina
slack:ChatDeleteResponse response = check slackClient->/chat\.delete.post({
    channel: "C1234567890",
    ts: "1720000000.123456"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": "C1234567890",
  "ts": "1720000000.123456"
}
```

</details>

<details>
<summary>Get a message permalink</summary>

Retrieves a permanent, public URL for a specific message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the message. |
| `message_ts` | `string` | Yes | Timestamp of the message. |

Returns: `ChatGetPermalinkResponse|error`

Sample code:

```ballerina
slack:ChatGetPermalinkResponse response = check slackClient->/chat\.getPermalink({
    channel: "C1234567890",
    message_ts: "1720000000.123456"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": "C1234567890",
  "permalink": "https://myworkspace.slack.com/archives/C1234567890/p1720000000123456"
}
```

</details>

<details>
<summary>Post an ephemeral message</summary>

Sends an ephemeral message to a user in a channel: visible only to that user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID where the ephemeral message is posted. |
| `user` | `string` | Yes | User ID of the recipient. |
| `text` | `string` | No | Message text. |

Returns: `ChatPostEphemeralResponse|error`

Sample code:

```ballerina
slack:ChatPostEphemeralResponse response = check slackClient->/chat\.postEphemeral.post({
    channel: "C1234567890",
    user: "U0000001",
    text: "Only you can see this reminder."
});
```

Sample response:

```ballerina
{
  "ok": true,
  "message_ts": "1720000001.000100"
}
```

</details>

<details>
<summary>Schedule a message</summary>

Schedules a message to be sent to a channel at a specified future time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID where the message will be posted. |
| `post_at` | `int` | Yes | Unix timestamp (seconds) indicating when to send the message. |
| `text` | `string` | No | Message text. |

Returns: `ChatScheduleMessageResponse|error`

Sample code:

```ballerina
slack:ChatScheduleMessageResponse response = check slackClient->/chat\.scheduleMessage.post({
    channel: "C1234567890",
    post_at: 1800000000,
    text: "Good morning team! Daily standup starts in 15 minutes."
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": "C1234567890",
  "scheduled_message_id": "Q1234ABCD",
  "post_at": 1800000000,
  "message": {
    "text": "Good morning team! Daily standup starts in 15 minutes.",
    "type": "delayed_message"
  }
}
```

</details>

<details>
<summary>List scheduled messages</summary>

Returns a list of scheduled messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | No | Filter to a specific channel ID. |
| `limit` | `int` | No | Maximum number of results to return. |

Returns: `ChatScheduledMessagesListResponse|error`

Sample code:

```ballerina
slack:ChatScheduledMessagesListResponse response = check slackClient->/chat\.scheduledMessages\.list({
    channel: "C1234567890"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "scheduled_messages": [
    {
      "id": "Q1234ABCD",
      "channel_id": "C1234567890",
      "post_at": 1800000000,
      "date_created": 1720000000,
      "text": "Good morning team! Daily standup starts in 15 minutes."
    }
  ],
  "response_metadata": {"next_cursor": ""}
}
```

</details>

#### Conversations

<details>
<summary>List all conversations</summary>

Returns a list of all channels in the Slack workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `types` | `string` | No | Comma-separated list of channel types to include: `public_channel`, `private_channel`, `mpim`, `im`. |
| `limit` | `int` | No | Maximum number of channels to return per page. |
| `exclude_archived` | `boolean` | No | Exclude archived channels from the results. |
| `cursor` | `string` | No | Pagination cursor returned from a previous response. |

Returns: `ConversationsListResponse|error`

Sample code:

```ballerina
slack:ConversationsListResponse response = check slackClient->/conversations\.list({
    types: "public_channel",
    exclude_archived: true,
    limit: 100
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channels": [
    {"id": "C1234567890", "name": "general", "is_channel": true, "num_members": 42, "is_archived": false},
    {"id": "C0987654321", "name": "random", "is_channel": true, "num_members": 38, "is_archived": false}
  ],
  "response_metadata": {"next_cursor": "dGVhbTpDMDYxRkE3NkQ="}
}
```

</details>

<details>
<summary>Get conversation message history</summary>

Fetches a conversation's message history including all messages posted in the channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to fetch history from. |
| `limit` | `int` | No | Maximum number of messages to return. |
| `oldest` | `string` | No | Only return messages after this Unix timestamp. |
| `latest` | `string` | No | Only return messages before this Unix timestamp. |
| `cursor` | `string` | No | Pagination cursor. |

Returns: `ConversationsHistoryResponse|error`

Sample code:

```ballerina
slack:ConversationsHistoryResponse response = check slackClient->/conversations\.history({
    channel: "C1234567890",
    limit: 5
});
```

Sample response:

```ballerina
{
  "ok": true,
  "messages": [
    {"type": "message", "user": "U0000001", "text": "Deployment complete!", "ts": "1720000100.000200"},
    {"type": "message", "user": "U0000002", "text": "Great work everyone", "ts": "1720000000.123456"}
  ],
  "has_more": true,
  "response_metadata": {"next_cursor": "bmV4dF90czoxNzIwMDAwMDAwLjEyMzQ1Ng=="}
}
```

</details>

<details>
<summary>Get conversation thread replies</summary>

Retrieves all replies in a message thread.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the thread. |
| `ts` | `string` | Yes | Timestamp of the parent (thread root) message. |
| `limit` | `int` | No | Maximum number of replies to return. |

Returns: `ConversationsRepliesResponse|error`

Sample code:

```ballerina
slack:ConversationsRepliesResponse response = check slackClient->/conversations\.replies({
    channel: "C1234567890",
    ts: "1720000000.123456"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "messages": [
    {"type": "message", "user": "U0000001", "text": "Any updates on the release?", "ts": "1720000000.123456", "reply_count": 2},
    {"type": "message", "user": "U0000002", "text": "Almost done, deploying now", "ts": "1720000010.000100"},
    {"type": "message", "user": "U0000003", "text": "Tests are passing!", "ts": "1720000020.000200"}
  ],
  "has_more": false
}
```

</details>

<details>
<summary>Create a conversation</summary>

Creates a new public or private channel in the workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name of the channel to create (lowercase, no spaces). |
| `is_private` | `boolean` | No | Set to `true` to create a private channel. |

Returns: `ConversationsCreateResponse|error`

Sample code:

```ballerina
slack:ConversationsCreateResponse response = check slackClient->/conversations\.create.post({
    name: "project-phoenix",
    is_private: false
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": {
    "id": "C0000NEW01",
    "name": "project-phoenix",
    "is_channel": true,
    "is_private": false,
    "created": 1720000000,
    "num_members": 1
  }
}
```

</details>

<details>
<summary>Get conversation info</summary>

Retrieves detailed information about a specific conversation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to retrieve information about. |

Returns: `ConversationsInfoResponse|error`

Sample code:

```ballerina
slack:ConversationsInfoResponse response = check slackClient->/conversations\.info({
    channel: "C1234567890"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": {
    "id": "C1234567890",
    "name": "general",
    "is_channel": true,
    "is_private": false,
    "num_members": 42,
    "purpose": {"value": "Company-wide announcements and news"},
    "topic": {"value": "Q3 planning sprint"}
  }
}
```

</details>

<details>
<summary>Invite users to a conversation</summary>

Invites one or more users to join a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to invite users to. |
| `users` | `string` | Yes | Comma-separated list of user IDs to invite. |

Returns: `ConversationsInviteErrorResponse|error`

Sample code:

```ballerina
slack:ConversationsInviteErrorResponse response = check slackClient->/conversations\.invite.post({
    channel: "C0000NEW01",
    users: "U0000001,U0000002,U0000003"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": {
    "id": "C0000NEW01",
    "name": "project-phoenix",
    "num_members": 4
  }
}
```

</details>

<details>
<summary>Get conversation members</summary>

Retrieves the list of member user IDs for a conversation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to retrieve members from. |
| `limit` | `int` | No | Maximum number of members to return per page. |
| `cursor` | `string` | No | Pagination cursor. |

Returns: `ConversationsMembersResponse|error`

Sample code:

```ballerina
slack:ConversationsMembersResponse response = check slackClient->/conversations\.members({
    channel: "C1234567890",
    limit: 50
});
```

Sample response:

```ballerina
{
  "ok": true,
  "members": ["U0000001", "U0000002", "U0000003", "U0000BOT"],
  "response_metadata": {"next_cursor": ""}
}
```

</details>

<details>
<summary>Set conversation topic</summary>

Sets the topic for a conversation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID. |
| `topic` | `string` | Yes | New topic text. |

Returns: `ConversationsSetTopicResponse|error`

Sample code:

```ballerina
slack:ConversationsSetTopicResponse response = check slackClient->/conversations\.setTopic.post({
    channel: "C1234567890",
    topic: "Q3 sprint: focus on performance improvements"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channel": {
    "id": "C1234567890",
    "topic": {
      "value": "Q3 sprint: focus on performance improvements",
      "creator": "U0000BOT",
      "last_set": 1720000000
    }
  }
}
```

</details>

<details>
<summary>Archive a conversation</summary>

Archives a conversation so it can no longer receive messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to archive. |

Returns: `ConversationsArchiveResponse|error`

Sample code:

```ballerina
slack:ConversationsArchiveResponse response = check slackClient->/conversations\.archive.post({
    channel: "C0000OLD01"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

#### Users

<details>
<summary>List all users in the workspace</summary>

Returns a list of all users in the workspace, including deactivated accounts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `int` | No | Maximum number of users to return per page. |
| `cursor` | `string` | No | Pagination cursor. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/users\.list({limit: 100});
```

Sample response:

```ballerina
{
  "ok": true,
  "members": [
    {"id": "U0000001", "name": "alice", "real_name": "Alice Smith", "is_bot": false, "deleted": false},
    {"id": "U0000002", "name": "bob", "real_name": "Bob Jones", "is_bot": false, "deleted": false},
    {"id": "U0000BOT", "name": "ballerina-bot", "real_name": "Ballerina Bot", "is_bot": true, "deleted": false}
  ],
  "response_metadata": {"next_cursor": ""}
}
```

</details>

<details>
<summary>Get user info</summary>

Retrieves detailed information about a specific user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user` | `string` | Yes | User ID to retrieve. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/users\.info({user: "U0000001"});
```

Sample response:

```ballerina
{
  "ok": true,
  "user": {
    "id": "U0000001",
    "name": "alice",
    "real_name": "Alice Smith",
    "is_bot": false,
    "profile": {
      "email": "alice@example.com",
      "display_name": "Alice",
      "title": "Senior Software Engineer",
      "phone": "+1-555-0100"
    }
  }
}
```

</details>

<details>
<summary>Get user presence</summary>

Gets the current presence status of a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user` | `string` | Yes | User ID to check presence for. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/users\.getPresence({user: "U0000001"});
```

Sample response:

```ballerina
{
  "ok": true,
  "presence": "active",
  "online": true,
  "auto_away": false,
  "manual_away": false,
  "connection_count": 1,
  "last_activity": 1720000000
}
```

</details>

<details>
<summary>Get conversations for a user</summary>

Lists all conversations the calling user or a specified user may access.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user` | `string` | No | User ID whose conversations to list. Defaults to the authenticated user. |
| `types` | `string` | No | Comma-separated list of channel types: `public_channel`, `private_channel`, `mpim`, `im`. |
| `limit` | `int` | No | Maximum number of conversations to return. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/users\.conversations({
    user: "U0000001",
    types: "public_channel,private_channel"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "channels": [
    {"id": "C1234567890", "name": "general"},
    {"id": "C0987654321", "name": "team-dev"},
    {"id": "C0000NEW01", "name": "project-phoenix"}
  ],
  "response_metadata": {"next_cursor": ""}
}
```

</details>

#### Files

<details>
<summary>Upload a file</summary>

Uploads a file to Slack and optionally shares it to one or more channels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channels` | `string` | No | Comma-separated list of channel IDs to share the file to. |
| `content` | `string` | No | File content as a string (for text-based files). |
| `filename` | `string` | No | Name of the file. |
| `title` | `string` | No | Title of the file displayed in Slack. |
| `initial_comment` | `string` | No | Message text to post alongside the file. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/files\.upload.post({
    channels: "C1234567890",
    content: "Server: api-prod\nStatus: OK\nUptime: 99.98%",
    filename: "health-report.txt",
    title: "Daily Health Report",
    initial_comment: "Automated health check results for today."
});
```

Sample response:

```ballerina
{
  "ok": true,
  "file": {
    "id": "F0000FILE1",
    "name": "health-report.txt",
    "title": "Daily Health Report",
    "filetype": "text",
    "size": 45,
    "url_private": "https://files.slack.com/files-pri/T0001/F0000FILE1/health-report.txt",
    "permalink": "https://myworkspace.slack.com/files/U0000BOT/F0000FILE1/health-report.txt"
  }
}
```

</details>

<details>
<summary>List files</summary>

Returns a list of files within the workspace, optionally filtered by channel or user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | No | Filter files shared in this channel ID. |
| `user` | `string` | No | Filter files uploaded by this user ID. |
| `count` | `int` | No | Number of files to return per page. |
| `types` | `string` | No | Filter by file types (e.g., `images`, `pdfs`, `snippets`, `spaces`). |

Returns: `FilesListResponse|error`

Sample code:

```ballerina
slack:FilesListResponse response = check slackClient->/files\.list({
    channel: "C1234567890",
    count: 20
});
```

Sample response:

```ballerina
{
  "ok": true,
  "files": [
    {"id": "F0000FILE1", "name": "health-report.txt", "title": "Daily Health Report", "filetype": "text", "size": 45},
    {"id": "F0000FILE2", "name": "architecture.png", "title": "System Architecture", "filetype": "png", "size": 204800}
  ],
  "paging": {"count": 20, "total": 2, "page": 1, "pages": 1}
}
```

</details>

<details>
<summary>Get file info</summary>

Gets detailed information about a specific file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | `string` | Yes | File ID to retrieve. |

Returns: `FilesInfoResponse|error`

Sample code:

```ballerina
slack:FilesInfoResponse response = check slackClient->/files\.info({file: "F0000FILE1"});
```

Sample response:

```ballerina
{
  "ok": true,
  "file": {
    "id": "F0000FILE1",
    "name": "health-report.txt",
    "title": "Daily Health Report",
    "filetype": "text",
    "size": 45,
    "created": 1720000000,
    "url_private": "https://files.slack.com/files-pri/T0001/F0000FILE1/health-report.txt",
    "channels": ["C1234567890"]
  }
}
```

</details>

<details>
<summary>Delete a file</summary>

Deletes a file from Slack.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | `string` | Yes | File ID to delete. |

Returns: `FilesDeleteResponse|error`

Sample code:

```ballerina
slack:FilesDeleteResponse response = check slackClient->/files\.delete.post({
    file: "F0000FILE1"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

#### Search

<details>
<summary>Search messages</summary>

Searches for messages matching a query string across the workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | Search query string. Supports Slack's search modifiers (e.g., `in:#channel`, `from:@user`). |
| `count` | `int` | No | Number of results per page. |
| `page` | `int` | No | Page number of results. |
| `sort` | `string` | No | Sort results by `score` (relevance) or `timestamp`. |
| `sort_dir` | `string` | No | Sort direction: `asc` or `desc`. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/search\.messages({
    query: "deployment failed in:#alerts",
    count: 10,
    sort: "timestamp",
    sort_dir: "desc"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "messages": {
    "total": 2,
    "pagination": {"total_count": 2, "page": 1, "per_page": 10, "page_count": 1},
    "matches": [
      {
        "type": "message",
        "text": "deployment failed on prod: rolling back now",
        "channel": {"id": "C1234567890", "name": "alerts"},
        "ts": "1720000000.000100",
        "username": "alice"
      }
    ]
  }
}
```

</details>

<details>
<summary>Search files</summary>

Searches for files matching a query string across the workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | Search query string. |
| `count` | `int` | No | Number of results per page. |
| `page` | `int` | No | Page number. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/search\.files({
    query: "Q3 report",
    count: 10
});
```

Sample response:

```ballerina
{
  "ok": true,
  "files": {
    "total": 1,
    "matches": [
      {"id": "F0000FILE1", "name": "q3-report.txt", "title": "Q3 Revenue Report", "filetype": "text", "size": 1024}
    ],
    "pagination": {"total_count": 1, "page": 1}
  }
}
```

</details>

#### Reactions

<details>
<summary>Add a reaction to a message</summary>

Adds an emoji reaction to a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the message. |
| `name` | `string` | Yes | Emoji name without surrounding colons (e.g., `"thumbsup"`, `"tada"`). |
| `timestamp` | `string` | Yes | Timestamp of the message to react to. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/reactions\.add.post({
    channel: "C1234567890",
    name: "white_check_mark",
    timestamp: "1720000000.123456"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

<details>
<summary>Remove a reaction from a message</summary>

Removes an emoji reaction previously added to a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID containing the message. |
| `name` | `string` | Yes | Emoji name to remove. |
| `timestamp` | `string` | Yes | Timestamp of the reacted message. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/reactions\.remove.post({
    channel: "C1234567890",
    name: "white_check_mark",
    timestamp: "1720000000.123456"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

<details>
<summary>Get reactions on a message</summary>

Gets all emoji reactions for a specified message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | No | Channel ID (required when retrieving reactions on a message). |
| `timestamp` | `string` | No | Message timestamp. |
| `file` | `string` | No | File ID (use instead of channel and timestamp for file reactions). |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/reactions\.get({
    channel: "C1234567890",
    timestamp: "1720000000.123456"
});
```

Sample response:

```ballerina
{
  "ok": true,
  "type": "message",
  "message": {
    "text": "Deployment complete!",
    "ts": "1720000000.123456",
    "reactions": [
      {"name": "white_check_mark", "count": 5, "users": ["U0000001", "U0000002", "U0000003"]},
      {"name": "tada", "count": 2, "users": ["U0000001", "U0000002"]}
    ]
  }
}
```

</details>

#### Pins

<details>
<summary>Pin a message to a channel</summary>

Pins a message to a channel for quick reference.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID where the item will be pinned. |
| `timestamp` | `string` | No | Timestamp of the message to pin. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/pins\.add.post({
    channel: "C1234567890",
    timestamp: "1720000000.123456"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

<details>
<summary>List pinned items in a channel</summary>

Lists all items pinned to a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID to list pinned items from. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/pins\.list({channel: "C1234567890"});
```

Sample response:

```ballerina
{
  "ok": true,
  "items": [
    {
      "type": "message",
      "message": {
        "text": "Team processes and guidelines: see wiki link in description",
        "ts": "1720000000.123456",
        "user": "U0000001"
      },
      "channel": "C1234567890",
      "created": 1720000100,
      "created_by": "U0000001"
    }
  ]
}
```

</details>

<details>
<summary>Unpin an item from a channel</summary>

Removes a pinned item from a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channel` | `string` | Yes | Channel ID. |
| `timestamp` | `string` | No | Timestamp of the message to unpin. |

Returns: `DefaultSuccessResponse|error`

Sample code:

```ballerina
slack:DefaultSuccessResponse response = check slackClient->/pins\.remove.post({
    channel: "C1234567890",
    timestamp: "1720000000.123456"
});
```

Sample response:

```ballerina
{"ok": true}
```

</details>

#### Auth & API

<details>
<summary>Test authentication</summary>

Verifies the authentication token and returns information about the authenticated user and workspace.

Returns: `AuthTestResponse|error`

Sample code:

```ballerina
slack:AuthTestResponse response = check slackClient->/auth\.test();
```

Sample response:

```ballerina
{
  "ok": true,
  "url": "https://myworkspace.slack.com/",
  "team": "My Workspace",
  "user": "ballerina-bot",
  "team_id": "T0000001",
  "user_id": "U0000BOT",
  "bot_id": "B0000001",
  "is_enterprise_install": false
}
```

</details>

<details>
<summary>Revoke an access token</summary>

Revokes an access token, invalidating it for future API calls.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `test` | `boolean` | No | Set to `true` for a dry run: the token is not actually revoked. |

Returns: `AuthRevokeResponse|error`

Sample code:

```ballerina
slack:AuthRevokeResponse response = check slackClient->/auth\.revoke();
```

Sample response:

```ballerina
{"ok": true, "revoked": true}
```

</details>

<details>
<summary>Get bot info</summary>

Gets information about a bot user associated with the workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bot` | `string` | No | Bot ID to retrieve. Defaults to the bot associated with the current token. |

Returns: `BotsInfoResponse|error`

Sample code:

```ballerina
slack:BotsInfoResponse response = check slackClient->/bots\.info();
```

Sample response:

```ballerina
{
  "ok": true,
  "bot": {
    "id": "B0000001",
    "deleted": false,
    "name": "Ballerina Bot",
    "app_id": "A0000001",
    "user_id": "U0000BOT",
    "icons": {
      "image_36": "https://a.slack-edge.com/80588/img/slackbot_36.png",
      "image_48": "https://a.slack-edge.com/80588/img/slackbot_48.png"
    }
  }
}
```

</details>
