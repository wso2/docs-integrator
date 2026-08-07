---
title: Actions
---

# Actions

The `ballerinax/microsoft.teams` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage teams, channels, members, messages, tabs, and tags in Microsoft Teams through the Microsoft Graph API v1.0. |

---

## Client

Manage teams, channels, members, messages, tabs, and tags in Microsoft Teams through the Microsoft Graph API v1.0. The connector supports both delegated (user) and application (app-only) OAuth 2.0 authentication.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig \| BearerTokenConfig \| OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 credentials: client-credentials (app-only), a bearer token, or a refresh-token grant. |
| `timeout` | `decimal` | `30` | Maximum time (seconds) to wait for a response. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |

Additional standard `http:ClientConfiguration` options are also supported (retry, circuit breaker, proxy, secure socket, cookies, compression, response limits, and so on).

### Initializing the client

```ballerina
import ballerinax/microsoft.teams;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string refreshUrl = ?;

teams:Client teamsClient = check new ({
    auth: {
        clientId,
        clientSecret,
        refreshToken,
        refreshUrl
    }
});
```

### Operations

#### Teams

<details>
<summary>createTeam</summary>

Required payload fields: `displayName`, plus the `template@odata.bind` navigation binding that selects the base template, e.g. `"template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')"`. When the calling app uses application (app-only) permissions, also include a `members` array with at least one owner — an `aadUserConversationMember` with `roles` = `["owner"]` and a `user@odata.bind` binding to the user (`https://graph.microsoft.com/v1.0/users('{user-id}')`). To create a team from an existing Microsoft 365 group, bind the group with `group@odata.bind` set to `https://graph.microsoft.com/v1.0/groups('{group-id}')` together with `template@odata.bind` and omit `displayName` (the group must have at least one owner). Team creation is asynchronous (see the note in the function body).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Team` | Yes | The team to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->createTeam({displayName: "Engineering", description: "Engineering team", "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')"});
```

</details>

<details>
<summary>getTeam</summary>

Get team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetTeamQueries` | No | Queries to be sent with the request |

Returns: `Team|error`

Sample code:

```ballerina
teams:Team result = check teamsClient->getTeam("<team-id>");
```

Sample response:

```ballerina
{"id": "<team-id>", "displayName": "Engineering", "description": "Engineering team", "visibility": "public", "webUrl": "https://teams.microsoft.com/l/team/..."}
```

</details>

<details>
<summary>deleteTeam</summary>

Delete entity from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `DeleteTeamHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteTeam("<team-id>");
```

</details>

<details>
<summary>updateTeam</summary>

No fields are required; send only the team properties to change (for example `displayName`, `description`, `visibility`, `funSettings`, `memberSettings`). Read-only properties are ignored.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `Team` | Yes | New property values |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updateTeam("<team-id>", {displayName: "Engineering", description: "Engineering team"});
```

</details>

#### All channels

<details>
<summary>listAllChannels</summary>

List allChannels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListAllChannelsQueries` | No | Queries to be sent with the request |

Returns: `ChannelCollectionResponse|error`

Sample code:

```ballerina
teams:ChannelCollectionResponse result = check teamsClient->listAllChannels("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}]}
```

</details>

<details>
<summary>getAllChannel</summary>

Get allChannels from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetAllChannelQueries` | No | Queries to be sent with the request |

Returns: `Channel|error`

Sample code:

```ballerina
teams:Channel result = check teamsClient->getAllChannel("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}
```

</details>

<details>
<summary>countAllChannels</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountAllChannelsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countAllChannels("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Channels

<details>
<summary>listChannels</summary>

List channels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelsQueries` | No | Queries to be sent with the request |

Returns: `ChannelCollectionResponse|error`

Sample code:

```ballerina
teams:ChannelCollectionResponse result = check teamsClient->listChannels("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}]}
```

</details>

<details>
<summary>createChannel</summary>

Required payload fields: `displayName` (max 50 characters). A `standard` channel is created by default. For a private or shared channel, also set `membershipType` (`"private"` / `"shared"`) and include a `members` array with exactly one owner — an `aadUserConversationMember` with `roles` = `["owner"]` and a `user@odata.bind` binding to the user (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `Channel` | Yes | The channel to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->createChannel("<team-id>", {displayName: "Announcements", membershipType: "standard"});
```

</details>

<details>
<summary>getChannel</summary>

Get channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelQueries` | No | Queries to be sent with the request |

Returns: `Channel|error`

Sample code:

```ballerina
teams:Channel result = check teamsClient->getChannel("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}
```

</details>

<details>
<summary>deleteChannel</summary>

Delete channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `DeleteChannelHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannel("<team-id>", "<channel-id>");
```

</details>

<details>
<summary>updateChannel</summary>

No fields are required; send only the channel properties to change (for example `displayName`, `description`). The team's default `General` channel can't be renamed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `Channel` | Yes | The channel properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updateChannel("<team-id>", "<channel-id>", {displayName: "Announcements", description: "Team-wide announcements and updates"});
```

</details>

<details>
<summary>countChannels</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannels("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>getAllChannelMessages</summary>

Invoke function getAllMessages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetAllChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->getAllChannelMessages("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

<details>
<summary>getAllRetainedChannelMessages</summary>

Invoke function getAllRetainedMessages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetAllRetainedChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->getAllRetainedChannelMessages("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

#### Channels / all members

<details>
<summary>listChannelAllMembers</summary>

List allMembers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelAllMembersQueries` | No | Queries to be sent with the request |

Returns: `ConversationMemberCollectionResponse|error`

Sample code:

```ballerina
teams:ConversationMemberCollectionResponse result = check teamsClient->listChannelAllMembers("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}]}
```

</details>

<details>
<summary>createChannelAllMember</summary>

Required payload fields: the `user@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`) and `roles` (`["owner"]` for an owner, `[]` for a standard member). Members can be added only to private and shared channels, and the user must already belong to the parent team's roster.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `ConversationMember` | Yes | The member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->createChannelAllMember("<team-id>", "<channel-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>getChannelAllMember</summary>

Get allMembers from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelAllMemberQueries` | No | Queries to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->getChannelAllMember("<team-id>", "<channel-id>", "<conversation-member-id>");
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>deleteChannelAllMember</summary>

Remove member from channel allMembers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `DeleteChannelAllMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelAllMember("<team-id>", "<channel-id>", "<conversation-member-id>");
```

</details>

<details>
<summary>updateChannelAllMember</summary>

Required payload field: `roles` (the new role set — `["owner"]` to promote to owner, `[]` to demote to a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `payload` | `ConversationMember` | Yes | The member properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->updateChannelAllMember("<team-id>", "<channel-id>", "<conversation-member-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"]});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>countChannelAllMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelAllMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelAllMembers("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>addChannelAllMembers</summary>

Required: a non-empty `values` array (up to 200 members per call). Each entry requires the `user@odata.bind` binding and `roles` (`["owner"]` or `[]`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->addChannelAllMembers("<team-id>", "<channel-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>removeChannelAllMembers</summary>

Required: a non-empty `values` array (up to 20 members per call). Each entry identifies the member to remove by the `user@odata.bind` binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->removeChannelAllMembers("<team-id>", "<channel-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

#### Channels / enabled apps

<details>
<summary>listChannelEnabledApps</summary>

List enabledApps.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelEnabledAppsQueries` | No | Queries to be sent with the request |

Returns: `TeamsAppCollectionResponse|error`

Sample code:

```ballerina
teams:TeamsAppCollectionResponse result = check teamsClient->listChannelEnabledApps("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}]}
```

</details>

<details>
<summary>getChannelEnabledApp</summary>

Get teamsApp.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `teamsAppId` | `string` | Yes | The unique identifier of teamsApp |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelEnabledAppQueries` | No | Queries to be sent with the request |

Returns: `TeamsApp|error`

Sample code:

```ballerina
teams:TeamsApp result = check teamsClient->getChannelEnabledApp("<team-id>", "<channel-id>", "<teams-app-id>");
```

Sample response:

```ballerina
{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}
```

</details>

<details>
<summary>countChannelEnabledApps</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelEnabledAppsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelEnabledApps("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Channels / files folder

<details>
<summary>getChannelFilesFolder</summary>

Get filesFolder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelFilesFolderQueries` | No | Queries to be sent with the request |

Returns: `DriveItem|error`

Sample code:

```ballerina
teams:DriveItem result = check teamsClient->getChannelFilesFolder("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"id": "<item-id>", "name": "Documents", "webUrl": "https://contoso.sharepoint.com/...", "size": 0, "folder": {"childCount": 4}}
```

</details>

<details>
<summary>getChannelFilesFolderContent</summary>

Get channel filesFolder content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelFilesFolderContentQueries` | No | Queries to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getChannelFilesFolderContent("<team-id>", "<channel-id>");
```

</details>

<details>
<summary>updateChannelFilesFolderContent</summary>

The payload is the raw file content, uploaded as `application/octet-stream`. Simple upload supports files up to ~250 MB; larger files require an upload session, which this operation doesn't provide.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `DriveItem|error`

Sample code:

```ballerina
teams:DriveItem result = check teamsClient->updateChannelFilesFolderContent("<team-id>", "<channel-id>", content);
```

Sample response:

```ballerina
{"id": "<item-id>", "name": "Documents", "webUrl": "https://contoso.sharepoint.com/...", "size": 0, "folder": {"childCount": 4}}
```

</details>

<details>
<summary>deleteChannelFilesFolderContent</summary>

Delete channel filesFolder content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `DeleteChannelFilesFolderContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelFilesFolderContent("<team-id>", "<channel-id>");
```

</details>

#### Channels / members

<details>
<summary>listChannelMembers</summary>

List members of a channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelMembersQueries` | No | Queries to be sent with the request |

Returns: `ConversationMemberCollectionResponse|error`

Sample code:

```ballerina
teams:ConversationMemberCollectionResponse result = check teamsClient->listChannelMembers("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}]}
```

</details>

<details>
<summary>createChannelMember</summary>

Required payload fields: the `user@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`) and `roles` (`["owner"]` for an owner, `[]` for a standard member). Members can be added only to private and shared channels, and the user must already belong to the parent team's roster.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `ConversationMember` | Yes | The member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->createChannelMember("<team-id>", "<channel-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>getChannelMember</summary>

Get member of channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMemberQueries` | No | Queries to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->getChannelMember("<team-id>", "<channel-id>", "<conversation-member-id>");
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>deleteChannelMember</summary>

Remove member from channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `DeleteChannelMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMember("<team-id>", "<channel-id>", "<conversation-member-id>");
```

</details>

<details>
<summary>updateChannelMember</summary>

Required payload field: `roles` (the new role set — `["owner"]` to promote to owner, `[]` to demote to a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `payload` | `ConversationMember` | Yes | The member properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->updateChannelMember("<team-id>", "<channel-id>", "<conversation-member-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"]});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>countChannelMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelMembers("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>addChannelMembers</summary>

Required: a non-empty `values` array (up to 200 members per call). Each entry requires the `user@odata.bind` binding and `roles` (`["owner"]` or `[]`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->addChannelMembers("<team-id>", "<channel-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>removeChannelMembers</summary>

Required: a non-empty `values` array (up to 20 members per call). Each entry identifies the member to remove by the `user@odata.bind` binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->removeChannelMembers("<team-id>", "<channel-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

#### Channels / messages

<details>
<summary>listChannelMessages</summary>

List channel messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->listChannelMessages("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

<details>
<summary>createChannelMessage</summary>

Required payload fields: `body` with a non-empty `content` (set `body.contentType` to `"html"` or `"text"`). Optional: `attachments`, `mentions` (referenced from HTML content by an at-mention tag), and `hostedContents` for inline images (each referenced by its `@microsoft.graph.temporaryId`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `ChatMessage` | Yes | The message to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->createChannelMessage("<team-id>", "<channel-id>", {body: {contentType: "html", content: "Hello team!"}});
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>getChannelMessage</summary>

Get chatMessage in a channel or chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessageQueries` | No | Queries to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->getChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>deleteChannelMessage</summary>

Delete channel message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `DeleteChannelMessageHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>");
```

</details>

<details>
<summary>updateChannelMessage</summary>

Send only the properties to change — typically `body` with the new `content`. Note: Microsoft Graph v1.0 restricts which chatMessage properties may be updated (for example, `policyViolation`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updateChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>", {body: {contentType: "html", content: "Hello team!"}});
```

</details>

<details>
<summary>setReactionChannelMessage</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->setReactionChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>", {reactionType: "👍"});
```

</details>

<details>
<summary>softDeleteChannelMessage</summary>

Invoke action softDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->softDeleteChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>");
```

</details>

<details>
<summary>undoSoftDeleteChannelMessage</summary>

Invoke action undoSoftDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->undoSoftDeleteChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>");
```

</details>

<details>
<summary>unsetReactionChannelMessage</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->unsetReactionChannelMessage("<team-id>", "<channel-id>", "<chat-message-id>", {reactionType: "👍"});
```

</details>

<details>
<summary>countChannelMessages</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelMessages("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>getChannelMessagesDelta</summary>

Invoke function delta.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessagesDeltaQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageDeltaCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageDeltaCollectionResponse result = check teamsClient->getChannelMessagesDelta("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>replyWithQuoteChannelMessages</summary>

Required payload fields: `messageIds` (id(s) of the message(s) being quoted, up to 10) and `replyMessage` (a chatMessage whose `body.content` holds the reply text). Note: on Microsoft Graph v1.0 `replyWithQuote` is documented for chats, so channel-scoped support may be limited.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `ReplyWithQuoteRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageResponse|error`

Sample code:

```ballerina
teams:ChatMessageResponse result = check teamsClient->replyWithQuoteChannelMessages("<team-id>", "<channel-id>", {replyMessage: {body: {contentType: "html", content: "Great point!"}}, messageIds: ["<message-id>"]});
```

Sample response:

```ballerina
{"id": "1616990852570", "messageType": "message", "createdDateTime": "2026-01-15T10:05:00Z", "body": {"contentType": "html", "content": "Great point!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

#### Channels / messages / hosted contents

<details>
<summary>listChannelMessageHostedContents</summary>

List hostedContents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelMessageHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContentCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageHostedContentCollectionResponse result = check teamsClient->listChannelMessageHostedContents("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}]}
```

</details>

<details>
<summary>createChannelMessageHostedContent</summary>

Required payload fields: `contentBytes` (base64-encoded content) and `contentType` (the MIME type, for example `"image/png"`). Inline images are usually created together with the message instead, via the message's `hostedContents` array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->createChannelMessageHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getChannelMessageHostedContent</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessageHostedContentQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->getChannelMessageHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>deleteChannelMessageHostedContent</summary>

Delete channel message hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeleteChannelMessageHostedContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessageHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updateChannelMessageHostedContent</summary>

Sends hosted-content properties (`contentBytes`, `contentType`). Note: Microsoft Graph v1.0 offers limited support for updating message hosted content; this is provided for API completeness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->updateChannelMessageHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getChannelMessageHostedContentValue</summary>

List hostedContents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getChannelMessageHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updateChannelMessageHostedContentValue</summary>

The payload is the raw media bytes (for example an image), uploaded as `application/octet-stream`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->updateChannelMessageHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>", content);
```

</details>

<details>
<summary>deleteChannelMessageHostedContentValue</summary>

Delete channel message hosted content value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeleteChannelMessageHostedContentValueHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessageHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>countChannelMessageHostedContents</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelMessageHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelMessageHostedContents("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Channels / messages / replies

<details>
<summary>listChannelMessageReplies</summary>

List replies.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelMessageRepliesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->listChannelMessageReplies("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

<details>
<summary>createChannelMessageReply</summary>

Required payload fields: `body` with a non-empty `content` (set `body.contentType` to `"html"` or `"text"`). Optional: `attachments`, `mentions` (referenced from HTML content by an at-mention tag), and `hostedContents` for inline images (each referenced by its `@microsoft.graph.temporaryId`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->createChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", {body: {contentType: "html", content: "Hello team!"}});
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>getChannelMessageReply</summary>

Get chatMessage in a channel or chat.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessageReplyQueries` | No | Queries to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->getChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>deleteChannelMessageReply</summary>

Delete channel message reply.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `DeleteChannelMessageReplyHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>updateChannelMessageReply</summary>

Send only the properties to change — typically `body` with the new `content`. Note: Microsoft Graph v1.0 restricts which chatMessage properties may be updated (for example, `policyViolation`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updateChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", {body: {contentType: "html", content: "Hello team!"}});
```

</details>

<details>
<summary>setReactionChannelMessageReply</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->setReactionChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", {reactionType: "👍"});
```

</details>

<details>
<summary>softDeleteChannelMessageReply</summary>

Invoke action softDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->softDeleteChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>undoSoftDeleteChannelMessageReply</summary>

Invoke action undoSoftDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->undoSoftDeleteChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>unsetReactionChannelMessageReply</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->unsetReactionChannelMessageReply("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", {reactionType: "👍"});
```

</details>

<details>
<summary>countChannelMessageReplies</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelMessageRepliesQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelMessageReplies("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>getChannelMessageRepliesDelta</summary>

Invoke function delta.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessageRepliesDeltaQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageDeltaCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageDeltaCollectionResponse result = check teamsClient->getChannelMessageRepliesDelta("<team-id>", "<channel-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>replyWithQuoteChannelMessageReplies</summary>

Required payload fields: `messageIds` (id(s) of the message(s) being quoted, up to 10) and `replyMessage` (a chatMessage whose `body.content` holds the reply text). Note: on Microsoft Graph v1.0 `replyWithQuote` is documented for chats, so channel-scoped support may be limited.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ReplyWithQuoteRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageResponse|error`

Sample code:

```ballerina
teams:ChatMessageResponse result = check teamsClient->replyWithQuoteChannelMessageReplies("<team-id>", "<channel-id>", "<chat-message-id>", {replyMessage: {body: {contentType: "html", content: "Great point!"}}, messageIds: ["<message-id>"]});
```

Sample response:

```ballerina
{"id": "1616990852570", "messageType": "message", "createdDateTime": "2026-01-15T10:05:00Z", "body": {"contentType": "html", "content": "Great point!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

#### Channels / messages / replies / hosted contents

<details>
<summary>listChannelMessageReplyHostedContents</summary>

List hostedContents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelMessageReplyHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContentCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageHostedContentCollectionResponse result = check teamsClient->listChannelMessageReplyHostedContents("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
{"value": [{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}]}
```

</details>

<details>
<summary>createChannelMessageReplyHostedContent</summary>

Required payload fields: `contentBytes` (base64-encoded content) and `contentType` (the MIME type, for example `"image/png"`). Inline images are usually created together with the message instead, via the message's `hostedContents` array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->createChannelMessageReplyHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getChannelMessageReplyHostedContent</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelMessageReplyHostedContentQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->getChannelMessageReplyHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>deleteChannelMessageReplyHostedContent</summary>

Delete channel reply hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeleteChannelMessageReplyHostedContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessageReplyHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updateChannelMessageReplyHostedContent</summary>

Sends hosted-content properties (`contentBytes`, `contentType`). Note: Microsoft Graph v1.0 offers limited support for updating message hosted content; this is provided for API completeness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->updateChannelMessageReplyHostedContent("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getChannelMessageReplyHostedContentValue</summary>

List hostedContents.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getChannelMessageReplyHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updateChannelMessageReplyHostedContentValue</summary>

The payload is the raw media bytes (for example an image), uploaded as `application/octet-stream`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->updateChannelMessageReplyHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>", content);
```

</details>

<details>
<summary>deleteChannelMessageReplyHostedContentValue</summary>

Delete channel reply hosted content value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeleteChannelMessageReplyHostedContentValueHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelMessageReplyHostedContentValue("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>countChannelMessageReplyHostedContents</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelMessageReplyHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelMessageReplyHostedContents("<team-id>", "<channel-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Channels / tabs

<details>
<summary>listChannelTabs</summary>

List tabs in channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListChannelTabsQueries` | No | Queries to be sent with the request |

Returns: `TeamsTabCollectionResponse|error`

Sample code:

```ballerina
teams:TeamsTabCollectionResponse result = check teamsClient->listChannelTabs("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}]}
```

</details>

<details>
<summary>createChannelTab</summary>

Required payload fields: `displayName` and the `teamsApp@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/{app-id}`); the app must already be installed in the team. `configuration` (`entityId`, `contentUrl`, ...) is optional. For a static tab, omit `displayName`/`configuration` — Graph reads them from the app manifest and otherwise returns 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `payload` | `TeamsTab` | Yes | The tab to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->createChannelTab("<team-id>", "<channel-id>", {displayName: "My Tab", "teamsApp@odata.bind": "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/<app-id>"});
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>getChannelTab</summary>

Get tab.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelTabQueries` | No | Queries to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->getChannelTab("<team-id>", "<channel-id>", "<teams-tab-id>");
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>deleteChannelTab</summary>

Delete tab from channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `DeleteChannelTabHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteChannelTab("<team-id>", "<channel-id>", "<teams-tab-id>");
```

</details>

<details>
<summary>updateChannelTab</summary>

No fields are required; send only the tab properties to change (for example `displayName`, `configuration`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `payload` | `TeamsTab` | Yes | The tab properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->updateChannelTab("<team-id>", "<channel-id>", "<teams-tab-id>", {displayName: "My Tab"});
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>getChannelTabTeamsApp</summary>

Get teamsApp from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetChannelTabTeamsAppQueries` | No | Queries to be sent with the request |

Returns: `TeamsApp|error`

Sample code:

```ballerina
teams:TeamsApp result = check teamsClient->getChannelTabTeamsApp("<team-id>", "<channel-id>", "<teams-tab-id>");
```

Sample response:

```ballerina
{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}
```

</details>

<details>
<summary>countChannelTabs</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountChannelTabsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countChannelTabs("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Incoming channels

<details>
<summary>listIncomingChannels</summary>

List incomingChannels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListIncomingChannelsQueries` | No | Queries to be sent with the request |

Returns: `ChannelCollectionResponse|error`

Sample code:

```ballerina
teams:ChannelCollectionResponse result = check teamsClient->listIncomingChannels("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}]}
```

</details>

<details>
<summary>getIncomingChannel</summary>

Get incomingChannels from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `channelId` | `string` | Yes | The unique identifier of channel |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetIncomingChannelQueries` | No | Queries to be sent with the request |

Returns: `Channel|error`

Sample code:

```ballerina
teams:Channel result = check teamsClient->getIncomingChannel("<team-id>", "<channel-id>");
```

Sample response:

```ballerina
{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}
```

</details>

<details>
<summary>countIncomingChannels</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountIncomingChannelsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countIncomingChannels("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Members

<details>
<summary>listMembers</summary>

List members of team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListMembersQueries` | No | Queries to be sent with the request |

Returns: `ConversationMemberCollectionResponse|error`

Sample code:

```ballerina
teams:ConversationMemberCollectionResponse result = check teamsClient->listMembers("<team-id>");
```

Sample response:

```ballerina
{"value": [{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}]}
```

</details>

<details>
<summary>createMember</summary>

Required payload fields: the `user@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`) and `roles` (`["owner"]` for an owner, `[]` for a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `ConversationMember` | Yes | The member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->createMember("<team-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>getMember</summary>

Get member of team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetMemberQueries` | No | Queries to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->getMember("<team-id>", "<conversation-member-id>");
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>deleteMember</summary>

Remove member from team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `DeleteMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteMember("<team-id>", "<conversation-member-id>");
```

</details>

<details>
<summary>updateMember</summary>

Required payload field: `roles` (the new role set — `["owner"]` to promote to owner, `[]` to demote to a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `payload` | `ConversationMember` | Yes | The member properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->updateMember("<team-id>", "<conversation-member-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"]});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>countMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countMembers("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>addMembers</summary>

Required: a non-empty `values` array (up to 200 members per call). Each entry requires the `user@odata.bind` binding and `roles` (`["owner"]` or `[]`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->addMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>removeMembers</summary>

Required: a non-empty `values` array (up to 20 members per call). Each entry identifies the member to remove by the `user@odata.bind` binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->removeMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

#### Send activity notification

<details>
<summary>sendActivityNotification</summary>

Required payload fields: `topic` (with `source` and `value`), `activityType` (the reserved `systemDefault`, or a type declared in the team's app manifest), `previewText` (an item body with `content`), and `recipient` (for example an `aadUserNotificationRecipient` with a `userId`). Add `templateParameters` when the activity text contains placeholders.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `SendActivityNotificationRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->sendActivityNotification("<team-id>", {topic: <teams:TeamworkActivityTopic>{atOdataType: "#microsoft.graph.teamworkActivityTopic", 'source: "entityUrl", value: "https://graph.microsoft.com/v1.0/teams/<team-id>"}, activityType: "taskCreated", previewText: <teams:ItemBody>{content: "You have a new notification"}, recipient: <teams:TeamworkNotificationRecipient>{atOdataType: "#microsoft.graph.aadUserNotificationRecipient", "userId": "<user-id>"}});
```

</details>

#### Primary channel

<details>
<summary>getPrimaryChannel</summary>

Get primaryChannel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelQueries` | No | Queries to be sent with the request |

Returns: `Channel|error`

Sample code:

```ballerina
teams:Channel result = check teamsClient->getPrimaryChannel("<team-id>");
```

Sample response:

```ballerina
{"id": "<channel-id>", "displayName": "Announcements", "description": null, "membershipType": "standard", "webUrl": "https://teams.microsoft.com/l/channel/..."}
```

</details>

<details>
<summary>deletePrimaryChannel</summary>

Delete primary channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `DeletePrimaryChannelHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannel("<team-id>");
```

</details>

<details>
<summary>updatePrimaryChannel</summary>

No fields are required; send only the properties to change. `primaryChannel` is the team's `General` channel, whose `displayName` can't be changed (its `description` and settings can).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `Channel` | Yes | The channel properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updatePrimaryChannel("<team-id>", {description: "Team-wide announcements and updates"});
```

</details>

#### Primary channel / all members

<details>
<summary>listPrimaryChannelAllMembers</summary>

Get allMembers from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelAllMembersQueries` | No | Queries to be sent with the request |

Returns: `ConversationMemberCollectionResponse|error`

Sample code:

```ballerina
teams:ConversationMemberCollectionResponse result = check teamsClient->listPrimaryChannelAllMembers("<team-id>");
```

Sample response:

```ballerina
{"value": [{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}]}
```

</details>

<details>
<summary>createPrimaryChannelAllMember</summary>

Required payload fields: the `user@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`) and `roles` (`["owner"]` for an owner, `[]` for a standard member). Members can be added only to private and shared channels, and the user must already belong to the parent team's roster.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `ConversationMember` | Yes | The member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->createPrimaryChannelAllMember("<team-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>getPrimaryChannelAllMember</summary>

Get allMembers from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelAllMemberQueries` | No | Queries to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->getPrimaryChannelAllMember("<team-id>", "<conversation-member-id>");
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>deletePrimaryChannelAllMember</summary>

Remove member from primary channel allMembers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `DeletePrimaryChannelAllMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelAllMember("<team-id>", "<conversation-member-id>");
```

</details>

<details>
<summary>updatePrimaryChannelAllMember</summary>

Required payload field: `roles` (the new role set — `["owner"]` to promote to owner, `[]` to demote to a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `payload` | `ConversationMember` | Yes | The member properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->updatePrimaryChannelAllMember("<team-id>", "<conversation-member-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"]});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>countPrimaryChannelAllMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelAllMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelAllMembers("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>addPrimaryChannelAllMembers</summary>

Required: a non-empty `values` array (up to 200 members per call). Each entry requires the `user@odata.bind` binding and `roles` (`["owner"]` or `[]`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->addPrimaryChannelAllMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>removePrimaryChannelAllMembers</summary>

Required: a non-empty `values` array (up to 20 members per call). Each entry identifies the member to remove by the `user@odata.bind` binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->removePrimaryChannelAllMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

#### Primary channel / enabled apps

<details>
<summary>listPrimaryChannelEnabledApps</summary>

Get enabledApps from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelEnabledAppsQueries` | No | Queries to be sent with the request |

Returns: `TeamsAppCollectionResponse|error`

Sample code:

```ballerina
teams:TeamsAppCollectionResponse result = check teamsClient->listPrimaryChannelEnabledApps("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}]}
```

</details>

<details>
<summary>getPrimaryChannelEnabledApp</summary>

Get enabledApps from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamsAppId` | `string` | Yes | The unique identifier of teamsApp |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelEnabledAppQueries` | No | Queries to be sent with the request |

Returns: `TeamsApp|error`

Sample code:

```ballerina
teams:TeamsApp result = check teamsClient->getPrimaryChannelEnabledApp("<team-id>", "<teams-app-id>");
```

Sample response:

```ballerina
{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}
```

</details>

<details>
<summary>countPrimaryChannelEnabledApps</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelEnabledAppsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelEnabledApps("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Primary channel / files folder

<details>
<summary>getPrimaryChannelFilesFolder</summary>

Get filesFolder from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelFilesFolderQueries` | No | Queries to be sent with the request |

Returns: `DriveItem|error`

Sample code:

```ballerina
teams:DriveItem result = check teamsClient->getPrimaryChannelFilesFolder("<team-id>");
```

Sample response:

```ballerina
{"id": "<item-id>", "name": "Documents", "webUrl": "https://contoso.sharepoint.com/...", "size": 0, "folder": {"childCount": 4}}
```

</details>

<details>
<summary>getPrimaryChannelFilesFolderContent</summary>

Get primary channel filesFolder content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelFilesFolderContentQueries` | No | Queries to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getPrimaryChannelFilesFolderContent("<team-id>");
```

</details>

<details>
<summary>updatePrimaryChannelFilesFolderContent</summary>

The payload is the raw file content, uploaded as `application/octet-stream`. Simple upload supports files up to ~250 MB; larger files require an upload session, which this operation doesn't provide.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `DriveItem|error`

Sample code:

```ballerina
teams:DriveItem result = check teamsClient->updatePrimaryChannelFilesFolderContent("<team-id>", content);
```

Sample response:

```ballerina
{"id": "<item-id>", "name": "Documents", "webUrl": "https://contoso.sharepoint.com/...", "size": 0, "folder": {"childCount": 4}}
```

</details>

<details>
<summary>deletePrimaryChannelFilesFolderContent</summary>

Delete primary channel filesFolder content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `DeletePrimaryChannelFilesFolderContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelFilesFolderContent("<team-id>");
```

</details>

#### Primary channel / members

<details>
<summary>listPrimaryChannelMembers</summary>

Get members from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelMembersQueries` | No | Queries to be sent with the request |

Returns: `ConversationMemberCollectionResponse|error`

Sample code:

```ballerina
teams:ConversationMemberCollectionResponse result = check teamsClient->listPrimaryChannelMembers("<team-id>");
```

Sample response:

```ballerina
{"value": [{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}]}
```

</details>

<details>
<summary>createPrimaryChannelMember</summary>

Required payload fields: the `user@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`) and `roles` (`["owner"]` for an owner, `[]` for a standard member). Members can be added only to private and shared channels, and the user must already belong to the parent team's roster.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `ConversationMember` | Yes | The member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->createPrimaryChannelMember("<team-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>getPrimaryChannelMember</summary>

Get members from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMemberQueries` | No | Queries to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->getPrimaryChannelMember("<team-id>", "<conversation-member-id>");
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>deletePrimaryChannelMember</summary>

Remove member from primary channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `headers` | `DeletePrimaryChannelMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMember("<team-id>", "<conversation-member-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMember</summary>

Required payload field: `roles` (the new role set — `["owner"]` to promote to owner, `[]` to demote to a standard member).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `conversationMemberId` | `string` | Yes | The unique identifier of conversationMember |
| `payload` | `ConversationMember` | Yes | The member properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ConversationMember|error`

Sample code:

```ballerina
teams:ConversationMember result = check teamsClient->updatePrimaryChannelMember("<team-id>", "<conversation-member-id>", {"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"]});
```

Sample response:

```ballerina
{"@odata.type": "#microsoft.graph.aadUserConversationMember", "id": "<membership-id>", "roles": ["owner"], "displayName": "Alex Johnson", "userId": "<user-id>", "email": "alex@contoso.com"}
```

</details>

<details>
<summary>countPrimaryChannelMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelMembers("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>addPrimaryChannelMembers</summary>

Required: a non-empty `values` array (up to 200 members per call). Each entry requires the `user@odata.bind` binding and `roles` (`["owner"]` or `[]`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->addPrimaryChannelMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>removePrimaryChannelMembers</summary>

Required: a non-empty `values` array (up to 20 members per call). Each entry identifies the member to remove by the `user@odata.bind` binding (`https://graph.microsoft.com/v1.0/users('{user-id}')`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `AddMembersRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ActionResultPartCollectionResponse|error`

Sample code:

```ballerina
teams:ActionResultPartCollectionResponse result = check teamsClient->removePrimaryChannelMembers("<team-id>", {values: [{"@odata.type": "#microsoft.graph.aadUserConversationMember", roles: ["owner"], "user@odata.bind": "https://graph.microsoft.com/v1.0/users('<user-id>')"}]});
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

#### Primary channel / messages

<details>
<summary>listPrimaryChannelMessages</summary>

Get messages from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->listPrimaryChannelMessages("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

<details>
<summary>createPrimaryChannelMessage</summary>

Required payload fields: `body` with a non-empty `content` (set `body.contentType` to `"html"` or `"text"`). Optional: `attachments`, `mentions` (referenced from HTML content by an at-mention tag), and `hostedContents` for inline images (each referenced by its `@microsoft.graph.temporaryId`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `ChatMessage` | Yes | The message to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->createPrimaryChannelMessage("<team-id>", {body: {contentType: "html", content: "Hello team!"}});
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>getPrimaryChannelMessage</summary>

Get messages from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessageQueries` | No | Queries to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->getPrimaryChannelMessage("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>deletePrimaryChannelMessage</summary>

Delete primary channel message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `DeletePrimaryChannelMessageHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessage("<team-id>", "<chat-message-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMessage</summary>

Send only the properties to change — typically `body` with the new `content`. Note: Microsoft Graph v1.0 restricts which chatMessage properties may be updated (for example, `policyViolation`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updatePrimaryChannelMessage("<team-id>", "<chat-message-id>", {body: {contentType: "html", content: "Hello team!"}});
```

</details>

<details>
<summary>setReactionPrimaryChannelMessage</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->setReactionPrimaryChannelMessage("<team-id>", "<chat-message-id>", {reactionType: "👍"});
```

</details>

<details>
<summary>softDeletePrimaryChannelMessage</summary>

Invoke action softDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->softDeletePrimaryChannelMessage("<team-id>", "<chat-message-id>");
```

</details>

<details>
<summary>undoSoftDeletePrimaryChannelMessage</summary>

Invoke action undoSoftDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->undoSoftDeletePrimaryChannelMessage("<team-id>", "<chat-message-id>");
```

</details>

<details>
<summary>unsetReactionPrimaryChannelMessage</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->unsetReactionPrimaryChannelMessage("<team-id>", "<chat-message-id>", {reactionType: "👍"});
```

</details>

<details>
<summary>countPrimaryChannelMessages</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelMessagesQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelMessages("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>getPrimaryChannelMessagesDelta</summary>

Invoke function delta.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessagesDeltaQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageDeltaCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageDeltaCollectionResponse result = check teamsClient->getPrimaryChannelMessagesDelta("<team-id>");
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>replyWithQuotePrimaryChannelMessages</summary>

Required payload fields: `messageIds` (id(s) of the message(s) being quoted, up to 10) and `replyMessage` (a chatMessage whose `body.content` holds the reply text). Note: on Microsoft Graph v1.0 `replyWithQuote` is documented for chats, so channel-scoped support may be limited.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `ReplyWithQuoteRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageResponse|error`

Sample code:

```ballerina
teams:ChatMessageResponse result = check teamsClient->replyWithQuotePrimaryChannelMessages("<team-id>", {replyMessage: {body: {contentType: "html", content: "Great point!"}}, messageIds: ["<message-id>"]});
```

Sample response:

```ballerina
{"id": "1616990852570", "messageType": "message", "createdDateTime": "2026-01-15T10:05:00Z", "body": {"contentType": "html", "content": "Great point!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

#### Primary channel / messages / hosted contents

<details>
<summary>listPrimaryChannelMessageHostedContents</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelMessageHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContentCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageHostedContentCollectionResponse result = check teamsClient->listPrimaryChannelMessageHostedContents("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}]}
```

</details>

<details>
<summary>createPrimaryChannelMessageHostedContent</summary>

Required payload fields: `contentBytes` (base64-encoded content) and `contentType` (the MIME type, for example `"image/png"`). Inline images are usually created together with the message instead, via the message's `hostedContents` array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->createPrimaryChannelMessageHostedContent("<team-id>", "<chat-message-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getPrimaryChannelMessageHostedContent</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessageHostedContentQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->getPrimaryChannelMessageHostedContent("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>deletePrimaryChannelMessageHostedContent</summary>

Delete primary channel message hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeletePrimaryChannelMessageHostedContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessageHostedContent("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMessageHostedContent</summary>

Sends hosted-content properties (`contentBytes`, `contentType`). Note: Microsoft Graph v1.0 offers limited support for updating message hosted content; this is provided for API completeness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->updatePrimaryChannelMessageHostedContent("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getPrimaryChannelMessageHostedContentValue</summary>

Get primary channel message hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getPrimaryChannelMessageHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMessageHostedContentValue</summary>

The payload is the raw media bytes (for example an image), uploaded as `application/octet-stream`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->updatePrimaryChannelMessageHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>", content);
```

</details>

<details>
<summary>deletePrimaryChannelMessageHostedContentValue</summary>

Delete primary channel message hosted content value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeletePrimaryChannelMessageHostedContentValueHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessageHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>countPrimaryChannelMessageHostedContents</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelMessageHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelMessageHostedContents("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Primary channel / messages / replies

<details>
<summary>listPrimaryChannelMessageReplies</summary>

Get replies from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelMessageRepliesQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageCollectionResponse result = check teamsClient->listPrimaryChannelMessageReplies("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}]}
```

</details>

<details>
<summary>createPrimaryChannelMessageReply</summary>

Required payload fields: `body` with a non-empty `content` (set `body.contentType` to `"html"` or `"text"`). Optional: `attachments`, `mentions` (referenced from HTML content by an at-mention tag), and `hostedContents` for inline images (each referenced by its `@microsoft.graph.temporaryId`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->createPrimaryChannelMessageReply("<team-id>", "<chat-message-id>", {body: {contentType: "html", content: "Hello team!"}});
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>getPrimaryChannelMessageReply</summary>

Get replies from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessageReplyQueries` | No | Queries to be sent with the request |

Returns: `ChatMessage|error`

Sample code:

```ballerina
teams:ChatMessage result = check teamsClient->getPrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
{"id": "1616990852569", "messageType": "message", "createdDateTime": "2026-01-15T10:00:00Z", "body": {"contentType": "html", "content": "Hello team!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

<details>
<summary>deletePrimaryChannelMessageReply</summary>

Delete primary channel message reply.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `DeletePrimaryChannelMessageReplyHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>updatePrimaryChannelMessageReply</summary>

Send only the properties to change — typically `body` with the new `content`. Note: Microsoft Graph v1.0 restricts which chatMessage properties may be updated (for example, `policyViolation`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessage` | Yes | The message properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response result = check teamsClient->updatePrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>", {body: {contentType: "html", content: "Hello team!"}});
```

</details>

<details>
<summary>setReactionPrimaryChannelMessageReply</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->setReactionPrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>", {reactionType: "👍"});
```

</details>

<details>
<summary>softDeletePrimaryChannelMessageReply</summary>

Invoke action softDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->softDeletePrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>undoSoftDeletePrimaryChannelMessageReply</summary>

Invoke action undoSoftDelete.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->undoSoftDeletePrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

</details>

<details>
<summary>unsetReactionPrimaryChannelMessageReply</summary>

Required payload field: `reactionType`. On Microsoft Graph v1.0 this must be a Unicode emoji (for example `"👍"`); reaction names such as `"like"` are rejected with HTTP 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `SetReactionRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->unsetReactionPrimaryChannelMessageReply("<team-id>", "<chat-message-id>", "<chat-message-id1>", {reactionType: "👍"});
```

</details>

<details>
<summary>countPrimaryChannelMessageReplies</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelMessageRepliesQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelMessageReplies("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

<details>
<summary>getPrimaryChannelMessageRepliesDelta</summary>

Invoke function delta.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessageRepliesDeltaQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageDeltaCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageDeltaCollectionResponse result = check teamsClient->getPrimaryChannelMessageRepliesDelta("<team-id>", "<chat-message-id>");
```

Sample response:

```ballerina
{"value": [ { ... } ]}
```

</details>

<details>
<summary>replyWithQuotePrimaryChannelMessageReplies</summary>

Required payload fields: `messageIds` (id(s) of the message(s) being quoted, up to 10) and `replyMessage` (a chatMessage whose `body.content` holds the reply text). Note: on Microsoft Graph v1.0 `replyWithQuote` is documented for chats, so channel-scoped support may be limited.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ReplyWithQuoteRequest` | Yes | Action parameters |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageResponse|error`

Sample code:

```ballerina
teams:ChatMessageResponse result = check teamsClient->replyWithQuotePrimaryChannelMessageReplies("<team-id>", "<chat-message-id>", {replyMessage: {body: {contentType: "html", content: "Great point!"}}, messageIds: ["<message-id>"]});
```

Sample response:

```ballerina
{"id": "1616990852570", "messageType": "message", "createdDateTime": "2026-01-15T10:05:00Z", "body": {"contentType": "html", "content": "Great point!"}, "from": {"user": {"id": "<user-id>", "displayName": "Alex Johnson"}}}
```

</details>

#### Primary channel / messages / replies / hosted contents

<details>
<summary>listPrimaryChannelMessageReplyHostedContents</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelMessageReplyHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContentCollectionResponse|error`

Sample code:

```ballerina
teams:ChatMessageHostedContentCollectionResponse result = check teamsClient->listPrimaryChannelMessageReplyHostedContents("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
{"value": [{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}]}
```

</details>

<details>
<summary>createPrimaryChannelMessageReplyHostedContent</summary>

Required payload fields: `contentBytes` (base64-encoded content) and `contentType` (the MIME type, for example `"image/png"`). Inline images are usually created together with the message instead, via the message's `hostedContents` array.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->createPrimaryChannelMessageReplyHostedContent("<team-id>", "<chat-message-id>", "<chat-message-id1>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getPrimaryChannelMessageReplyHostedContent</summary>

Get hostedContents from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelMessageReplyHostedContentQueries` | No | Queries to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->getPrimaryChannelMessageReplyHostedContent("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>deletePrimaryChannelMessageReplyHostedContent</summary>

Delete primary channel reply hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeletePrimaryChannelMessageReplyHostedContentHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessageReplyHostedContent("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMessageReplyHostedContent</summary>

Sends hosted-content properties (`contentBytes`, `contentType`). Note: Microsoft Graph v1.0 offers limited support for updating message hosted content; this is provided for API completeness.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `ChatMessageHostedContent` | Yes | The hosted content properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `ChatMessageHostedContent|error`

Sample code:

```ballerina
teams:ChatMessageHostedContent result = check teamsClient->updatePrimaryChannelMessageReplyHostedContent("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>", {"@microsoft.graph.temporaryId": "1", contentBytes: "<base64>", contentType: "image/png"});
```

Sample response:

```ballerina
{"id": "<hosted-content-id>", "contentType": "image/png", "contentBytes": "<base64>"}
```

</details>

<details>
<summary>getPrimaryChannelMessageReplyHostedContentValue</summary>

Get primary channel reply hosted content.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] result = check teamsClient->getPrimaryChannelMessageReplyHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>updatePrimaryChannelMessageReplyHostedContentValue</summary>

The payload is the raw media bytes (for example an image), uploaded as `application/octet-stream`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `payload` | `byte[]` | Yes | New media content |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->updatePrimaryChannelMessageReplyHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>", content);
```

</details>

<details>
<summary>deletePrimaryChannelMessageReplyHostedContentValue</summary>

Delete primary channel reply hosted content value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageHostedContentId` | `string` | Yes | The unique identifier of chatMessageHostedContent |
| `headers` | `DeletePrimaryChannelMessageReplyHostedContentValueHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelMessageReplyHostedContentValue("<team-id>", "<chat-message-id>", "<chat-message-id1>", "<chat-message-hosted-content-id>");
```

</details>

<details>
<summary>countPrimaryChannelMessageReplyHostedContents</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `chatMessageId` | `string` | Yes | The unique identifier of chatMessage |
| `chatMessageId1` | `string` | Yes | The unique identifier of chatMessage |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelMessageReplyHostedContentsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelMessageReplyHostedContents("<team-id>", "<chat-message-id>", "<chat-message-id1>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Primary channel / tabs

<details>
<summary>listPrimaryChannelTabs</summary>

Get tabs from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListPrimaryChannelTabsQueries` | No | Queries to be sent with the request |

Returns: `TeamsTabCollectionResponse|error`

Sample code:

```ballerina
teams:TeamsTabCollectionResponse result = check teamsClient->listPrimaryChannelTabs("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}]}
```

</details>

<details>
<summary>createPrimaryChannelTab</summary>

Required payload fields: `displayName` and the `teamsApp@odata.bind` navigation binding (`https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/{app-id}`); the app must already be installed in the team. `configuration` (`entityId`, `contentUrl`, ...) is optional. For a static tab, omit `displayName`/`configuration` — Graph reads them from the app manifest and otherwise returns 400.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `TeamsTab` | Yes | The tab to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->createPrimaryChannelTab("<team-id>", {displayName: "My Tab", "teamsApp@odata.bind": "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/<app-id>"});
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>getPrimaryChannelTab</summary>

Get tabs from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelTabQueries` | No | Queries to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->getPrimaryChannelTab("<team-id>", "<teams-tab-id>");
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>deletePrimaryChannelTab</summary>

Delete tab from primary channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `DeletePrimaryChannelTabHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deletePrimaryChannelTab("<team-id>", "<teams-tab-id>");
```

</details>

<details>
<summary>updatePrimaryChannelTab</summary>

No fields are required; send only the tab properties to change (for example `displayName`, `configuration`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `payload` | `TeamsTab` | Yes | The tab properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamsTab|error`

Sample code:

```ballerina
teams:TeamsTab result = check teamsClient->updatePrimaryChannelTab("<team-id>", "<teams-tab-id>", {displayName: "My Tab"});
```

Sample response:

```ballerina
{"id": "<tab-id>", "displayName": "My Tab", "webUrl": "https://teams.microsoft.com/l/entity/...", "configuration": {"entityId": "...", "contentUrl": "..."}}
```

</details>

<details>
<summary>getPrimaryChannelTabTeamsApp</summary>

Get teamsApp from teams.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamsTabId` | `string` | Yes | The unique identifier of teamsTab |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetPrimaryChannelTabTeamsAppQueries` | No | Queries to be sent with the request |

Returns: `TeamsApp|error`

Sample code:

```ballerina
teams:TeamsApp result = check teamsClient->getPrimaryChannelTabTeamsApp("<team-id>", "<teams-tab-id>");
```

Sample response:

```ballerina
{"id": "<app-id>", "externalId": null, "displayName": "Planner", "distributionMethod": "store"}
```

</details>

<details>
<summary>countPrimaryChannelTabs</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountPrimaryChannelTabsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countPrimaryChannelTabs("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Tags

<details>
<summary>listTags</summary>

List teamworkTags.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListTagsQueries` | No | Queries to be sent with the request |

Returns: `TeamworkTagCollectionResponse|error`

Sample code:

```ballerina
teams:TeamworkTagCollectionResponse result = check teamsClient->listTags("<team-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<tag-id>", "displayName": "Engineering", "memberCount": 3, "teamId": "<team-id>"}]}
```

</details>

<details>
<summary>createTag</summary>

Required payload fields: `displayName` (max 40 characters) and a non-empty `members` array (max 25) — each member is a teamworkTagMember identified by `userId`. At least one member is required.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `payload` | `TeamworkTag` | Yes | The tag to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamworkTag|error`

Sample code:

```ballerina
teams:TeamworkTag result = check teamsClient->createTag("<team-id>", {displayName: "Engineering", "members": [{"userId": "<user-id>"}]});
```

Sample response:

```ballerina
{"id": "<tag-id>", "displayName": "Engineering", "memberCount": 3, "teamId": "<team-id>"}
```

</details>

<details>
<summary>getTag</summary>

Get teamworkTag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetTagQueries` | No | Queries to be sent with the request |

Returns: `TeamworkTag|error`

Sample code:

```ballerina
teams:TeamworkTag result = check teamsClient->getTag("<team-id>", "<teamwork-tag-id>");
```

Sample response:

```ballerina
{"id": "<tag-id>", "displayName": "Engineering", "memberCount": 3, "teamId": "<team-id>"}
```

</details>

<details>
<summary>deleteTag</summary>

Delete teamworkTag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `headers` | `DeleteTagHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteTag("<team-id>", "<teamwork-tag-id>");
```

</details>

<details>
<summary>updateTag</summary>

Required payload field: `displayName` (the only editable property of a teamworkTag).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `payload` | `TeamworkTag` | Yes | The tag properties to update |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamworkTag|error`

Sample code:

```ballerina
teams:TeamworkTag result = check teamsClient->updateTag("<team-id>", "<teamwork-tag-id>", {displayName: "Engineering"});
```

Sample response:

```ballerina
{"id": "<tag-id>", "displayName": "Engineering", "memberCount": 3, "teamId": "<team-id>"}
```

</details>

<details>
<summary>countTags</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountTagsQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countTags("<team-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>

#### Tags / members

<details>
<summary>listTagMembers</summary>

List members in a teamworkTag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*ListTagMembersQueries` | No | Queries to be sent with the request |

Returns: `TeamworkTagMemberCollectionResponse|error`

Sample code:

```ballerina
teams:TeamworkTagMemberCollectionResponse result = check teamsClient->listTagMembers("<team-id>", "<teamwork-tag-id>");
```

Sample response:

```ballerina
{"value": [{"id": "<tag-member-id>", "displayName": "Alex Johnson", "userId": "<user-id>", "tenantId": "<tenant-id>"}]}
```

</details>

<details>
<summary>createTagMember</summary>

Required payload field: `userId` — the object id of a user who is a member of the team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `payload` | `TeamworkTagMember` | Yes | The tag member to create |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |

Returns: `TeamworkTagMember|error`

Sample code:

```ballerina
teams:TeamworkTagMember result = check teamsClient->createTagMember("<team-id>", "<teamwork-tag-id>", {"userId": "<user-id>"});
```

Sample response:

```ballerina
{"id": "<tag-member-id>", "displayName": "Alex Johnson", "userId": "<user-id>", "tenantId": "<tenant-id>"}
```

</details>

<details>
<summary>getTagMember</summary>

Get teamworkTagMember.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `teamworkTagMemberId` | `string` | Yes | The unique identifier of teamworkTagMember |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*GetTagMemberQueries` | No | Queries to be sent with the request |

Returns: `TeamworkTagMember|error`

Sample code:

```ballerina
teams:TeamworkTagMember result = check teamsClient->getTagMember("<team-id>", "<teamwork-tag-id>", "<teamwork-tag-member-id>");
```

Sample response:

```ballerina
{"id": "<tag-member-id>", "displayName": "Alex Johnson", "userId": "<user-id>", "tenantId": "<tenant-id>"}
```

</details>

<details>
<summary>deleteTagMember</summary>

Delete teamworkTagMember.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `teamworkTagMemberId` | `string` | Yes | The unique identifier of teamworkTagMember |
| `headers` | `DeleteTagMemberHeaders` | No | Headers to be sent with the request |

Returns: `error?`

Sample code:

```ballerina
check teamsClient->deleteTagMember("<team-id>", "<teamwork-tag-id>", "<teamwork-tag-member-id>");
```

</details>

<details>
<summary>countTagMembers</summary>

Get the number of the resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamId` | `string` | Yes | The unique identifier of team |
| `teamworkTagId` | `string` | Yes | The unique identifier of teamworkTag |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request |
| `queries` | `*CountTagMembersQueries` | No | Queries to be sent with the request |

Returns: `string|error`

Sample code:

```ballerina
string result = check teamsClient->countTagMembers("<team-id>", "<teamwork-tag-id>");
```

Sample response:

```ballerina
"<value>"
```

</details>
