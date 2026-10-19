---
title: Actions
---

# Actions

The `ballerinax/discord` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Discord REST API v10: messages, channels, guilds, members, roles, webhooks, commands, events. |

---

## Client

Discord REST API v10: messages, channels, guilds, members, roles, webhooks, commands, events.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `ApiKeysConfig\|OAuth2ClientCredentialsGrantConfig\|BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | Authentication configuration. Use `ApiKeysConfig` for bot token, or an OAuth2 config for OAuth2 flows. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/discord;

configurable string botToken = ?;

discord:Client discord = check new ({
    auth: {
        authorization: string `Bot ${botToken}`
    }
});
```

### Operations

#### Messages

<details>
<summary>Create message</summary>

Posts a new message to a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel to send the message to. |
| `payload` | `ChannelIdMessagesBody` | Yes | Message content, embeds, attachments, and other message fields. |

Returns: `MessageResponse|error`

Sample code:

```ballerina
discord:MessageResponse message = check discord->/channels/["1234567890"]/messages.post(
    {contentType: "application/x-www-form-urlencoded"},
    {content: "Hello from Ballerina!"}
);
```

Sample response:

```ballerina
{"id": "1199876543210", "channelId": "1234567890", "content": "Hello from Ballerina!", "author": {"id": "9876543210", "username": "BallerinaBot", "discriminator": "0001"}, "timestamp": "2024-12-01T10:30:00.000000+00:00", "editedTimestamp": null, "tts": false, "mentionEveryone": false, "pinned": false, "type": 0}
```

</details>

<details>
<summary>List messages</summary>

Retrieves a list of messages from a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `queries` | `ListMessagesQueries` | No | Query parameters including `limit`, `before`, `after`, and `around` message IDs. |

Returns: `MessageResponse[]|error`

Sample code:

```ballerina
discord:MessageResponse[] messages = check discord->/channels/["1234567890"]/messages();
```

Sample response:

```ballerina
[{"id": "1199876543210", "channelId": "1234567890", "content": "Hello!", "author": {"id": "9876543210", "username": "BallerinaBot", "discriminator": "0001"}, "timestamp": "2024-12-01T10:30:00.000000+00:00", "type": 0}]
```

</details>

<details>
<summary>Get message</summary>

Retrieves a specific message by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to retrieve. |

Returns: `MessageResponse|error`

Sample code:

```ballerina
discord:MessageResponse message = check discord->/channels/["1234567890"]/messages/["1199876543210"];
```

Sample response:

```ballerina
{"id": "1199876543210", "channelId": "1234567890", "content": "Hello!", "author": {"id": "9876543210", "username": "BallerinaBot", "discriminator": "0001"}, "timestamp": "2024-12-01T10:30:00.000000+00:00", "type": 0}
```

</details>

<details>
<summary>Edit message</summary>

Edits a previously sent message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to edit. |
| `payload` | `MessagesmessageIdBody` | Yes | Updated message content and fields. |

Returns: `MessageResponse|error`

Sample code:

```ballerina
discord:MessageResponse updated = check discord->/channels/["1234567890"]/messages/["1199876543210"].patch(
    {contentType: "application/x-www-form-urlencoded"},
    {content: "Updated message content"}
);
```

Sample response:

```ballerina
{"id": "1199876543210", "channelId": "1234567890", "content": "Updated message content", "editedTimestamp": "2024-12-01T10:35:00.000000+00:00", "type": 0}
```

</details>

<details>
<summary>Delete message</summary>

Deletes a message from a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/messages/["1199876543210"].delete();
```

</details>

<details>
<summary>Crosspost message</summary>

Crossposts (publishes) a message in an announcement channel to all following channels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the announcement channel. |
| `messageId` | `string` | Yes | The ID of the message to crosspost. |

Returns: `MessageResponse|error`

Sample code:

```ballerina
discord:MessageResponse crossposted = check discord->/channels/["1234567890"]/messages/["1199876543210"]/crosspost.post();
```

Sample response:

```ballerina
{"id": "1199876543210", "channelId": "1234567890", "content": "Announcement!", "flags": 1, "type": 0}
```

</details>

<details>
<summary>Bulk delete messages</summary>

Deletes multiple messages in a single request (2–100 messages, not older than 14 days).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `payload` | `ChannelsMessagesBulkDeleteRequest` | Yes | Object containing an array of message IDs to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/messages/bulk-delete.post({
    messages: ["1199876543210", "1199876543211", "1199876543212"]
});
```

</details>

#### Channels

<details>
<summary>Get channel</summary>

Retrieves a channel by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |

Returns: `InlineResponse2006|error`

Sample code:

```ballerina
discord:InlineResponse2006 channel = check discord->/channels/["1234567890"];
```

Sample response:

```ballerina
{"id": "1234567890", "type": 0, "guildId": "9876543210", "name": "general", "position": 0, "permissionOverwrites": [], "topic": "General discussion", "nsfw": false}
```

</details>

<details>
<summary>Modify channel</summary>

Updates a channel's settings (name, topic, permissions, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel to modify. |
| `payload` | `ChannelschannelIdBody` | Yes | Updated channel fields. |

Returns: `InlineResponse2006|error`

Sample code:

```ballerina
discord:InlineResponse2006 updated = check discord->/channels/["1234567890"].patch({
    name: "announcements",
    topic: "Important announcements only"
});
```

Sample response:

```ballerina
{"id": "1234567890", "type": 0, "guildId": "9876543210", "name": "announcements", "topic": "Important announcements only", "position": 0}
```

</details>

<details>
<summary>Delete channel</summary>

Deletes a channel or closes a DM. Requires MANAGE_CHANNELS permission for guild channels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel to delete. |

Returns: `InlineResponse2006|error`

Sample code:

```ballerina
discord:InlineResponse2006 deleted = check discord->/channels/["1234567890"].delete();
```

Sample response:

```ballerina
{"id": "1234567890", "type": 0, "guildId": "9876543210", "name": "old-channel"}
```

</details>

<details>
<summary>List guild channels</summary>

Retrieves the list of channels in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `InlineResponseItems2007[]|error`

Sample code:

```ballerina
discord:InlineResponseItems2007[] channels = check discord->/guilds/["9876543210"]/channels();
```

Sample response:

```ballerina
[{"id": "1234567890", "type": 0, "guildId": "9876543210", "name": "general", "position": 0}, {"id": "1234567891", "type": 2, "guildId": "9876543210", "name": "Voice Chat", "position": 1}]
```

</details>

<details>
<summary>Create guild channel</summary>

Creates a new channel in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `payload` | `CreateGuildChannelRequest` | Yes | Channel creation payload with name, type, topic, and other settings. |

Returns: `GuildChannelResponse|error`

Sample code:

```ballerina
discord:GuildChannelResponse newChannel = check discord->/guilds/["9876543210"]/channels.post({
    name: "project-updates",
    'type: 0,
    topic: "Updates on the current project"
});
```

Sample response:

```ballerina
{"id": "1234567892", "type": 0, "guildId": "9876543210", "name": "project-updates", "topic": "Updates on the current project", "position": 5}
```

</details>

#### Guilds

<details>
<summary>Create guild</summary>

Creates a new guild (server). The bot can create guilds only if it is in fewer than 10 guilds.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GuildCreateRequest` | Yes | Guild creation payload with name and optional settings. |

Returns: `GuildResponse|error`

Sample code:

```ballerina
discord:GuildResponse guild = check discord->/guilds.post({
    name: "My New Server"
});
```

Sample response:

```ballerina
{"id": "9876543210", "name": "My New Server", "ownerId": "1111111111", "region": "us-west", "verificationLevel": 0, "defaultMessageNotifications": 0, "explicitContentFilter": 0}
```

</details>

<details>
<summary>Get guild</summary>

Retrieves a guild by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `GuildWithCountsResponse|error`

Sample code:

```ballerina
discord:GuildWithCountsResponse guild = check discord->/guilds/["9876543210"];
```

Sample response:

```ballerina
{"id": "9876543210", "name": "My Server", "ownerId": "1111111111", "memberCount": 150, "verificationLevel": 2, "premiumTier": 1}
```

</details>

<details>
<summary>Modify guild</summary>

Modifies a guild's settings (name, region, verification level, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `payload` | `GuildPatchRequestPartial` | Yes | Updated guild fields. |

Returns: `GuildResponse|error`

Sample code:

```ballerina
discord:GuildResponse updated = check discord->/guilds/["9876543210"].patch({
    name: "Renamed Server",
    verificationLevel: 2
});
```

Sample response:

```ballerina
{"id": "9876543210", "name": "Renamed Server", "verificationLevel": 2, "ownerId": "1111111111"}
```

</details>

<details>
<summary>Delete guild</summary>

Permanently deletes a guild. The bot must be the guild owner.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"].delete();
```

</details>

<details>
<summary>Get guild preview</summary>

Retrieves a guild preview (available for public/discoverable guilds).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `GuildPreviewResponse|error`

Sample code:

```ballerina
discord:GuildPreviewResponse preview = check discord->/guilds/["9876543210"]/preview;
```

Sample response:

```ballerina
{"id": "9876543210", "name": "My Server", "description": "A cool server", "approximateMemberCount": 150, "approximatePresenceCount": 42, "emojis": [], "stickers": []}
```

</details>

#### Guild members

<details>
<summary>List guild members</summary>

Retrieves a list of guild members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `queries` | `ListGuildMembersQueries` | No | Query parameters including `limit` and `after` for pagination. |

Returns: `GuildMemberResponse[]|error`

Sample code:

```ballerina
discord:GuildMemberResponse[] members = check discord->/guilds/["9876543210"]/members();
```

Sample response:

```ballerina
[{"user": {"id": "1111111111", "username": "Alice", "discriminator": "0001"}, "roles": ["2222222222"], "joinedAt": "2024-01-15T08:00:00.000000+00:00", "deaf": false, "mute": false}]
```

</details>

<details>
<summary>Get guild member</summary>

Retrieves a specific guild member by user ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user. |

Returns: `GuildMemberResponse|error`

Sample code:

```ballerina
discord:GuildMemberResponse member = check discord->/guilds/["9876543210"]/members/["1111111111"];
```

Sample response:

```ballerina
{"user": {"id": "1111111111", "username": "Alice", "discriminator": "0001"}, "nick": "Ali", "roles": ["2222222222"], "joinedAt": "2024-01-15T08:00:00.000000+00:00", "deaf": false, "mute": false}
```

</details>

<details>
<summary>Remove guild member</summary>

Removes (kicks) a member from the guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user to remove. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/members/["1111111111"].delete();
```

</details>

<details>
<summary>Add guild member role</summary>

Assigns a role to a guild member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user. |
| `roleId` | `string` | Yes | The ID of the role to assign. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/members/["1111111111"]/roles/["2222222222"].put();
```

</details>

<details>
<summary>Remove guild member role</summary>

Removes a role from a guild member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user. |
| `roleId` | `string` | Yes | The ID of the role to remove. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/members/["1111111111"]/roles/["2222222222"].delete();
```

</details>

<details>
<summary>Search guild members</summary>

Searches for guild members whose username or nickname starts with a given query string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `queries` | `SearchGuildMembersQueries` | Yes | Search query parameters including `query` (search term) and optional `limit`. |

Returns: `GuildMemberResponse[]|error`

Sample code:

```ballerina
discord:GuildMemberResponse[] results = check discord->/guilds/["9876543210"]/members/search(query = "Ali");
```

Sample response:

```ballerina
[{"user": {"id": "1111111111", "username": "Alice", "discriminator": "0001"}, "nick": "Ali", "roles": ["2222222222"], "joinedAt": "2024-01-15T08:00:00.000000+00:00"}]
```

</details>

#### Guild roles

<details>
<summary>List guild roles</summary>

Retrieves all roles in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `GuildRoleResponse[]|error`

Sample code:

```ballerina
discord:GuildRoleResponse[] roles = check discord->/guilds/["9876543210"]/roles;
```

Sample response:

```ballerina
[{"id": "2222222222", "name": "Moderator", "color": 3447003, "hoist": true, "position": 1, "permissions": "2147483647", "managed": false, "mentionable": true}]
```

</details>

<details>
<summary>Create guild role</summary>

Creates a new role in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `payload` | `GuildsRolesRequest` | Yes | Role creation payload with name, color, permissions, and other settings. |

Returns: `GuildRoleResponse|error`

Sample code:

```ballerina
discord:GuildRoleResponse role = check discord->/guilds/["9876543210"]/roles.post({
    name: "Contributors",
    color: 3066993,
    hoist: true,
    mentionable: true
});
```

Sample response:

```ballerina
{"id": "3333333333", "name": "Contributors", "color": 3066993, "hoist": true, "position": 2, "permissions": "0", "managed": false, "mentionable": true}
```

</details>

<details>
<summary>Modify guild role</summary>

Modifies a guild role's settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `roleId` | `string` | Yes | The ID of the role to modify. |
| `payload` | `GuildsRolesRequest` | Yes | Updated role fields. |

Returns: `GuildRoleResponse|error`

Sample code:

```ballerina
discord:GuildRoleResponse updated = check discord->/guilds/["9876543210"]/roles/["3333333333"].patch({
    name: "Top Contributors",
    color: 15105570
});
```

Sample response:

```ballerina
{"id": "3333333333", "name": "Top Contributors", "color": 15105570, "hoist": true, "position": 2, "permissions": "0", "managed": false, "mentionable": true}
```

</details>

<details>
<summary>Delete guild role</summary>

Deletes a guild role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `roleId` | `string` | Yes | The ID of the role to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/roles/["3333333333"].delete();
```

</details>

#### Reactions

<details>
<summary>Create reaction</summary>

Adds a reaction to a message as the current user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message. |
| `emojiName` | `string` | Yes | The emoji to react with (URL-encoded Unicode emoji or `name:id` for custom). |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/messages/["1199876543210"]/reactions/["🔴"]/'@me.put();
```

</details>

<details>
<summary>Get reactions</summary>

Retrieves the list of users who reacted with a specific emoji.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message. |
| `emojiName` | `string` | Yes | The emoji to look up. |

Returns: `UserResponse[]|error`

Sample code:

```ballerina
discord:UserResponse[] users = check discord->/channels/["1234567890"]/messages/["1199876543210"]/reactions/["🔴"];
```

Sample response:

```ballerina
[{"id": "1111111111", "username": "Alice", "discriminator": "0001", "avatar": "abc123", "bot": false, "flags": 0, "publicFlags": 0}]
```

</details>

<details>
<summary>Delete all reactions</summary>

Removes all reactions from a message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message. |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/messages/["1199876543210"]/reactions.delete();
```

</details>

#### Webhooks

<details>
<summary>Create webhook</summary>

Creates a new webhook for a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `payload` | `ChannelsWebhooksRequest` | Yes | Webhook creation payload with name and optional avatar. |

Returns: `GuildIncomingWebhookResponse|error`

Sample code:

```ballerina
discord:GuildIncomingWebhookResponse webhook = check discord->/channels/["1234567890"]/webhooks.post({
    name: "Build Notifications"
});
```

Sample response:

```ballerina
{"id": "5555555555", "type": 1, "guildId": "9876543210", "channelId": "1234567890", "name": "Build Notifications", "token": "webhook-token-here"}
```

</details>

<details>
<summary>Get webhook</summary>

Retrieves a webhook by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The ID of the webhook. |

Returns: `InlineResponse2004|error`

Sample code:

```ballerina
discord:InlineResponse2004 webhook = check discord->/webhooks/["5555555555"];
```

Sample response:

```ballerina
{"id": "5555555555", "type": 1, "guildId": "9876543210", "channelId": "1234567890", "name": "Build Notifications", "token": "webhook-token-here"}
```

</details>

<details>
<summary>Execute webhook</summary>

Executes a webhook by sending a message to its channel using the webhook token.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The ID of the webhook. |
| `webhookToken` | `string` | Yes | The webhook's token. |
| `payload` | `WebhookIdwebhookTokenBody` | Yes | Message content, embeds, and other webhook execution fields. |

Returns: `MessageResponse|error?`

Sample code:

```ballerina
discord:MessageResponse? res = check discord->/webhooks/["5555555555"]/["webhook-token-here"].post({
    content: "Build #142 succeeded"
});
```

Sample response:

```ballerina
{"id": "5555555555", "type": 1, "guildId": "9876543210", "channelId": "1234567890", "name": "Build Notifications"}
```

</details>

<details>
<summary>Delete webhook</summary>

Permanently deletes a webhook.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The ID of the webhook to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/webhooks/["5555555555"].delete();
```

</details>

#### Guild bans

<details>
<summary>List guild bans</summary>

Retrieves the list of bans for a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `GuildBanResponse[]|error`

Sample code:

```ballerina
discord:GuildBanResponse[] bans = check discord->/guilds/["9876543210"]/bans;
```

Sample response:

```ballerina
[{"reason": "Spamming", "user": {"id": "4444444444", "username": "BadUser", "discriminator": "9999"}}]
```

</details>

<details>
<summary>Ban user</summary>

Bans a user from the guild and optionally deletes their recent messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user to ban. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/bans/["4444444444"].put();
```

</details>

<details>
<summary>Unban user</summary>

Removes a ban for a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `userId` | `string` | Yes | The ID of the user to unban. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/bans/["4444444444"].delete();
```

</details>

#### Scheduled events

<details>
<summary>Create guild scheduled event</summary>

Creates a scheduled event in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `payload` | `GuildIdScheduledEventsBody` | Yes | Scheduled event details including name, start time, privacy level, and entity type. |

Returns: `InlineResponse2003|error`

Sample code:

```ballerina
var event = check discord->/guilds/["9876543210"]/scheduled-events.post({
    name: "Community Meeting",
    description: "Join us for our monthly community meeting!",
    scheduledStartTime: "2024-12-31T23:59:59Z",
    scheduledEndTime: "2025-01-01T01:00:00Z",
    privacyLevel: 2,
    entityType: 3,
    entityMetadata: { location: "Virtual" }
});
```

Sample response:

```ballerina
{"id": "6666666666", "guildId": "9876543210", "name": "Community Meeting", "description": "Join us for our monthly community meeting!", "scheduledStartTime": "2024-12-31T23:59:59+00:00", "privacyLevel": 2, "status": 1, "entityType": 3}
```

</details>

<details>
<summary>List guild scheduled events</summary>

Retrieves the list of scheduled events for a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `InlineResponseItems2004[]|error`

Sample code:

```ballerina
var events = check discord->/guilds/["9876543210"]/scheduled-events;
```

Sample response:

```ballerina
[{"id": "6666666666", "guildId": "9876543210", "name": "Community Meeting", "scheduledStartTime": "2024-12-31T23:59:59+00:00", "privacyLevel": 2, "status": 1, "entityType": 3}]
```

</details>

<details>
<summary>Delete guild scheduled event</summary>

Deletes a scheduled event from a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |
| `guildScheduledEventId` | `string` | Yes | The ID of the scheduled event to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/guilds/["9876543210"]/scheduled-events/["6666666666"].delete();
```

</details>

#### Threads

<details>
<summary>Create thread from message</summary>

Creates a new thread from an existing message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to start the thread from. |
| `payload` | `CreateTextThreadWithMessageRequest` | Yes | Thread creation payload with name and optional auto-archive duration. |

Returns: `ThreadResponse|error`

Sample code:

```ballerina
discord:ThreadResponse thread = check discord->/channels/["1234567890"]/messages/["1199876543210"]/threads.post({
    name: "Discussion Thread"
});
```

Sample response:

```ballerina
{"id": "7777777777", "type": 11, "guildId": "9876543210", "name": "Discussion Thread", "parentId": "1234567890", "messageCount": 0, "memberCount": 1}
```

</details>

<details>
<summary>Create thread without message</summary>

Creates a new thread in a channel without an associated message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `payload` | `ChannelIdThreadsBody` | Yes | Thread creation payload with name, type, and optional settings. |

Returns: `CreatedThreadResponse|error`

Sample code:

```ballerina
discord:CreatedThreadResponse thread = check discord->/channels/["1234567890"]/threads.post({
    name: "New Discussion",
    'type: 11
});
```

Sample response:

```ballerina
{"id": "7777777778", "type": 11, "guildId": "9876543210", "name": "New Discussion", "parentId": "1234567890", "messageCount": 0, "memberCount": 1}
```

</details>

<details>
<summary>List active threads</summary>

Retrieves all active threads in a guild.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `guildId` | `string` | Yes | The ID of the guild. |

Returns: `ThreadsResponse|error`

Sample code:

```ballerina
discord:ThreadsResponse activeThreads = check discord->/guilds/["9876543210"]/threads/active;
```

Sample response:

```ballerina
{"threads": [{"id": "7777777777", "type": 11, "name": "Discussion Thread", "parentId": "1234567890"}], "members": [{"id": "7777777777", "userId": "1111111111"}], "hasMore": false}
```

</details>

#### Application commands

<details>
<summary>List global application commands</summary>

Retrieves all global application commands for the application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicationId` | `string` | Yes | The ID of the application. |

Returns: `ApplicationCommandResponse[]|error`

Sample code:

```ballerina
discord:ApplicationCommandResponse[] commands = check discord->/applications/["8888888888"]/commands;
```

Sample response:

```ballerina
[{"id": "9999999999", "applicationId": "8888888888", "name": "ping", "description": "Replies with Pong!", "type": 1, "version": "1"}]
```

</details>

<details>
<summary>Create global application command</summary>

Creates a new global application command (slash command).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicationId` | `string` | Yes | The ID of the application. |
| `payload` | `ApplicationCommandCreateRequest` | Yes | Command definition with name, description, type, and options. |

Returns: `ApplicationCommandResponse|error`

Sample code:

```ballerina
discord:ApplicationCommandResponse command = check discord->/applications/["8888888888"]/commands.post({
    name: "greet",
    description: "Sends a greeting message",
    'type: 1
});
```

Sample response:

```ballerina
{"id": "9999999998", "applicationId": "8888888888", "name": "greet", "description": "Sends a greeting message", "type": 1, "version": "1"}
```

</details>

<details>
<summary>Delete global application command</summary>

Deletes a global application command.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `applicationId` | `string` | Yes | The ID of the application. |
| `commandId` | `string` | Yes | The ID of the command to delete. |

Returns: `error?`

Sample code:

```ballerina
check discord->/applications/["8888888888"]/commands/["9999999998"].delete();
```

</details>

#### Users

<details>
<summary>Get current user</summary>

Retrieves the currently authenticated user's information.

Returns: `UserPIIResponse|error`

Sample code:

```ballerina
discord:UserPIIResponse me = check discord->/users/'@me;
```

Sample response:

```ballerina
{"id": "1111111111", "username": "BallerinaBot", "discriminator": "0001", "email": "bot@example.com", "verified": true, "flags": 0, "publicFlags": 0}
```

</details>

<details>
<summary>Get user</summary>

Retrieves a user by their ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | The ID of the user. |

Returns: `UserResponse|error`

Sample code:

```ballerina
discord:UserResponse user = check discord->/users/["1111111111"];
```

Sample response:

```ballerina
{"id": "1111111111", "username": "Alice", "discriminator": "0001", "avatar": "abc123", "bot": false, "flags": 0, "publicFlags": 0}
```

</details>

<details>
<summary>List current user guilds</summary>

Retrieves the guilds the current user is a member of.

Returns: `MyGuildResponse[]|error`

Sample code:

```ballerina
discord:MyGuildResponse[] guilds = check discord->/users/'@me/guilds;
```

Sample response:

```ballerina
[{"id": "9876543210", "name": "My Server", "owner": true, "permissions": "2147483647"}]
```

</details>

#### Invites

<details>
<summary>Get invite</summary>

Retrieves an invite by its code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | The invite code. |

Returns: `InlineResponse2002|error`

Sample code:

```ballerina
discord:InlineResponse2002 invite = check discord->/invites/["abc123"];
```

Sample response:

```ballerina
{"code": "abc123", "guild": {"id": "9876543210", "name": "My Server"}, "channel": {"id": "1234567890", "name": "general", "type": 0}}
```

</details>

<details>
<summary>Delete invite</summary>

Deletes an invite by its code. Requires MANAGE_CHANNELS permission.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | The invite code to revoke. |

Returns: `InlineResponse2002|error`

Sample code:

```ballerina
discord:InlineResponse2002 invite = check discord->/invites/["abc123"].delete();
```

</details>

#### Channel pins

<details>
<summary>List pinned messages</summary>

Retrieves all pinned messages in a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |

Returns: `MessageResponse[]|error`

Sample code:

```ballerina
discord:MessageResponse[] pinned = check discord->/channels/["1234567890"]/pins;
```

Sample response:

```ballerina
[{"id": "1199876543210", "channelId": "1234567890", "content": "Important announcement", "pinned": true, "type": 0}]
```

</details>

<details>
<summary>Pin message</summary>

Pins a message in a channel (max 50 pins per channel).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to pin. |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/pins/["1199876543210"].put();
```

</details>

<details>
<summary>Unpin message</summary>

Unpins a message from a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | The ID of the channel. |
| `messageId` | `string` | Yes | The ID of the message to unpin. |

Returns: `error?`

Sample code:

```ballerina
check discord->/channels/["1234567890"]/pins/["1199876543210"].delete();
```

</details>
