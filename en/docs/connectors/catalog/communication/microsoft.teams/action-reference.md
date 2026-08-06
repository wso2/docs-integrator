---
title: Actions
toc_max_heading_level: 4
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

<div>

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

</div>

</details>

<details>
<summary>getTeam</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteTeam</summary>

<div>

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

</div>

</details>

<details>
<summary>updateTeam</summary>

<div>

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

</div>

</details>

#### All channels

<details>
<summary>listAllChannels</summary>

<div>

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

</div>

</details>

<details>
<summary>getAllChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>countAllChannels</summary>

<div>

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

</div>

</details>

#### Channels

<details>
<summary>listChannels</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannels</summary>

<div>

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

</div>

</details>

<details>
<summary>getAllChannelMessages</summary>

<div>

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

</div>

</details>

<details>
<summary>getAllRetainedChannelMessages</summary>

<div>

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

</div>

</details>

#### Channels / all members

<details>
<summary>listChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>addChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>removeChannelAllMembers</summary>

<div>

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

</div>

</details>

#### Channels / enabled apps

<details>
<summary>listChannelEnabledApps</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelEnabledApp</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelEnabledApps</summary>

<div>

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

</div>

</details>

#### Channels / files folder

<details>
<summary>getChannelFilesFolder</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

#### Channels / members

<details>
<summary>listChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>addChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>removeChannelMembers</summary>

<div>

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

</div>

</details>

#### Channels / messages

<details>
<summary>listChannelMessages</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>setReactionChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>softDeleteChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>undoSoftDeleteChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>unsetReactionChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelMessages</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessagesDelta</summary>

<div>

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

</div>

</details>

<details>
<summary>replyWithQuoteChannelMessages</summary>

<div>

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

</div>

</details>

#### Channels / messages / hosted contents

<details>
<summary>listChannelMessageHostedContents</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelMessageHostedContents</summary>

<div>

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

</div>

</details>

#### Channels / messages / replies

<details>
<summary>listChannelMessageReplies</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>setReactionChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>softDeleteChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>undoSoftDeleteChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>unsetReactionChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelMessageReplies</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageRepliesDelta</summary>

<div>

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

</div>

</details>

<details>
<summary>replyWithQuoteChannelMessageReplies</summary>

<div>

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

</div>

</details>

#### Channels / messages / replies / hosted contents

<details>
<summary>listChannelMessageReplyHostedContents</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelMessageReplyHostedContents</summary>

<div>

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

</div>

</details>

#### Channels / tabs

<details>
<summary>listChannelTabs</summary>

<div>

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

</div>

</details>

<details>
<summary>createChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>updateChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>getChannelTabTeamsApp</summary>

<div>

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

</div>

</details>

<details>
<summary>countChannelTabs</summary>

<div>

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

</div>

</details>

#### Incoming channels

<details>
<summary>listIncomingChannels</summary>

<div>

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

</div>

</details>

<details>
<summary>getIncomingChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>countIncomingChannels</summary>

<div>

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

</div>

</details>

#### Members

<details>
<summary>listMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteMember</summary>

<div>

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

</div>

</details>

<details>
<summary>updateMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>addMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>removeMembers</summary>

<div>

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

</div>

</details>

#### Send activity notification

<details>
<summary>sendActivityNotification</summary>

<div>

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

</div>

</details>

#### Primary channel

<details>
<summary>getPrimaryChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannel</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannel</summary>

<div>

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

</div>

</details>

#### Primary channel / all members

<details>
<summary>listPrimaryChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelAllMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>addPrimaryChannelAllMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>removePrimaryChannelAllMembers</summary>

<div>

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

</div>

</details>

#### Primary channel / enabled apps

<details>
<summary>listPrimaryChannelEnabledApps</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelEnabledApp</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelEnabledApps</summary>

<div>

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

</div>

</details>

#### Primary channel / files folder

<details>
<summary>getPrimaryChannelFilesFolder</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelFilesFolderContent</summary>

<div>

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

</div>

</details>

#### Primary channel / members

<details>
<summary>listPrimaryChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>addPrimaryChannelMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>removePrimaryChannelMembers</summary>

<div>

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

</div>

</details>

#### Primary channel / messages

<details>
<summary>listPrimaryChannelMessages</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>setReactionPrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>softDeletePrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>undoSoftDeletePrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>unsetReactionPrimaryChannelMessage</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelMessages</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessagesDelta</summary>

<div>

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

</div>

</details>

<details>
<summary>replyWithQuotePrimaryChannelMessages</summary>

<div>

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

</div>

</details>

#### Primary channel / messages / hosted contents

<details>
<summary>listPrimaryChannelMessageHostedContents</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessageHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessageHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelMessageHostedContents</summary>

<div>

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

</div>

</details>

#### Primary channel / messages / replies

<details>
<summary>listPrimaryChannelMessageReplies</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>setReactionPrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>softDeletePrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>undoSoftDeletePrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>unsetReactionPrimaryChannelMessageReply</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelMessageReplies</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageRepliesDelta</summary>

<div>

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

</div>

</details>

<details>
<summary>replyWithQuotePrimaryChannelMessageReplies</summary>

<div>

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

</div>

</details>

#### Primary channel / messages / replies / hosted contents

<details>
<summary>listPrimaryChannelMessageReplyHostedContents</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessageReplyHostedContent</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelMessageReplyHostedContentValue</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelMessageReplyHostedContents</summary>

<div>

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

</div>

</details>

#### Primary channel / tabs

<details>
<summary>listPrimaryChannelTabs</summary>

<div>

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

</div>

</details>

<details>
<summary>createPrimaryChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>deletePrimaryChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>updatePrimaryChannelTab</summary>

<div>

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

</div>

</details>

<details>
<summary>getPrimaryChannelTabTeamsApp</summary>

<div>

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

</div>

</details>

<details>
<summary>countPrimaryChannelTabs</summary>

<div>

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

</div>

</details>

#### Tags

<details>
<summary>listTags</summary>

<div>

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

</div>

</details>

<details>
<summary>createTag</summary>

<div>

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

</div>

</details>

<details>
<summary>getTag</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteTag</summary>

<div>

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

</div>

</details>

<details>
<summary>updateTag</summary>

<div>

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

</div>

</details>

<details>
<summary>countTags</summary>

<div>

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

</div>

</details>

#### Tags / members

<details>
<summary>listTagMembers</summary>

<div>

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

</div>

</details>

<details>
<summary>createTagMember</summary>

<div>

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

</div>

</details>

<details>
<summary>getTagMember</summary>

<div>

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

</div>

</details>

<details>
<summary>deleteTagMember</summary>

<div>

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

</div>

</details>

<details>
<summary>countTagMembers</summary>

<div>

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

</div>

</details>
