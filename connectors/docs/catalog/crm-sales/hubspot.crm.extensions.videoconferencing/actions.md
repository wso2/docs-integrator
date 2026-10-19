---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.extensions.videoconferencing` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage video conferencing application settings (webhook URLs) for a HubSpot app. |

---

## Client

Manage video conferencing application settings (webhook URLs) for a HubSpot app.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKeyConfig` | <code>ApiKeysConfig</code> | Required | API key configuration containing the HubSpot developer API key (`hapikey`). |
| `config` | <code>ConnectionConfig</code> | `{}` | HTTP client connection configuration. |
| `serviceUrl` | <code>string</code> | `"https://api.hubapi.com/crm/v3/extensions/videoconferencing/settings"` | Base URL for the HubSpot videoconferencing settings API. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.extensions.videoconferencing as hsvideoconferencing;

configurable string hapikey = ?;

hsvideoconferencing:Client hubspot = check new ({hapikey});
```

### Operations

#### Settings management

<details>
<summary>Get video conferencing settings for an app</summary>

Signature: `get /[int:Signed32 appId]`

Retrieves the video conferencing application settings (webhook URLs) currently configured for the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The ID of the video conference application. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom headers for the request. |

Returns: `ExternalSettings|error`

Sample code:

```ballerina
hsvideoconferencing:ExternalSettings settings = check hubspot->/[appIdSigned32]();
```

Sample response:

```ballerina
{
  "createMeetingUrl": "https://my-conference.io/meetings/new",
  "updateMeetingUrl": "https://my-conference.io/meetings",
  "deleteMeetingUrl": "https://my-conference.io/meetings",
  "userVerifyUrl": "https://my-conference.io/verify-user"
}
```

</details>

<details>
<summary>Save video conferencing settings for an app</summary>

Signature: `put /[int:Signed32 appId]`

Creates or updates the video conferencing application settings (webhook URLs) for the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The ID of the video conference application. |
| `payload` | <code>ExternalSettings</code> | Yes | The video conferencing settings to save. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom headers for the request. |

Returns: `ExternalSettings|error`

Sample code:

```ballerina
hsvideoconferencing:ExternalSettings settings = {
    createMeetingUrl: "https://my-conference.io/create-meeting",
    updateMeetingUrl: "https://my-conference.io/join-meeting",
    deleteMeetingUrl: "https://my-conference.io/record-meeting"
};
hsvideoconferencing:ExternalSettings result = check hubspot->/[appIdSigned32].put(settings);
```

Sample response:

```ballerina
{
  "createMeetingUrl": "https://my-conference.io/create-meeting",
  "updateMeetingUrl": "https://my-conference.io/join-meeting",
  "deleteMeetingUrl": "https://my-conference.io/record-meeting"
}
```

</details>

<details>
<summary>Delete video conferencing settings for an app</summary>

Signature: `delete /[int:Signed32 appId]`

Deletes all video conferencing application settings for the specified app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | <code>int:Signed32</code> | Yes | The ID of the video conference application. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional custom headers for the request. |

Returns: `error?`

Sample code:

```ballerina
check hubspot->/[appIdSigned32].delete();
```

</details>
