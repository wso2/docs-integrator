---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.transactional` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send transactional emails and manage SMTP API tokens via the HubSpot Marketing API. |

---

## Client

Send transactional emails and manage SMTP API tokens via the HubSpot Marketing API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | OAuth 2.0 refresh token config, bearer token, or private app legacy API key. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/hubspot.marketing.transactional;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

transactional:Client hubspotClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token"
    }
});
```

### Operations

#### Transactional email

<details>
<summary>Send a single transactional email</summary>

Asynchronously send a transactional email. The email content is based on a template created in HubSpot, identified by `emailId`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PublicSingleSendRequestEgg` | Yes | The email send request containing the email ID, recipient, and optional custom properties. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EmailSendStatusView|error`

Sample code:

```ballerina
transactional:EmailSendStatusView response = check hubspotClient->post single\-email/send(
    {
        emailId: 12345,
        message: {
            to: "recipient@example.com",
            'from: "sender@example.com",
            sendId: "unique-send-id-001"
        },
        customProperties: {
            "propertyName": {"value": "propertyValue"}
        }
    }
);
```

Sample response:

```ballerina
{
  "statusId": "abc123",
  "status": "PENDING",
  "requestedAt": "2026-03-17T10:00:00Z"
}
```

</details>

#### SMTP token management

<details>
<summary>Query SMTP API tokens</summary>

Query SMTP API tokens by campaign name or email campaign ID. Returns a paginated list of tokens.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignName` | `string?` | No | Filter tokens by campaign name. |
| `emailCampaignId` | `string?` | No | Filter tokens by email campaign ID. |
| `after` | `string?` | No | Pagination cursor for the next page of results. |
| `limit` | `int:Signed32?` | No | Maximum number of tokens to return. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CollectionResponseSmtpApiTokenViewForwardPaging|error`

Sample code:

```ballerina
transactional:CollectionResponseSmtpApiTokenViewForwardPaging response = check hubspotClient->get smtp\-tokens(
    campaignName = "Welcome Campaign"
);
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "token-001",
      "campaignName": "Welcome Campaign",
      "emailCampaignId": "camp-123",
      "createdBy": "user@example.com",
      "createContact": true,
      "createdAt": "2026-01-15T08:30:00Z"
    }
  ]
}
```

</details>

<details>
<summary>Create a SMTP API token</summary>

Create a new SMTP API token for sending transactional emails via SMTP.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SmtpApiTokenRequestEgg` | Yes | Token creation request with campaign name and contact creation preference. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SmtpApiTokenView|error`

Sample code:

```ballerina
transactional:SmtpApiTokenView response = check hubspotClient->post smtp\-tokens(
    {
        campaignName: "Order Confirmation",
        createContact: true
    }
);
```

Sample response:

```ballerina
{
  "id": "token-002",
  "campaignName": "Order Confirmation",
  "emailCampaignId": "camp-456",
  "createdBy": "user@example.com",
  "createContact": true,
  "createdAt": "2026-03-17T10:00:00Z",
  "password": "generated-smtp-password"
}
```

</details>

<details>
<summary>Query a single token by ID</summary>

Retrieve a single SMTP API token by its token ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenId` | `string` | Yes | The ID of the SMTP token to retrieve. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SmtpApiTokenView|error`

Sample code:

```ballerina
transactional:SmtpApiTokenView response = check hubspotClient->get smtp\-tokens/["token-001"];
```

Sample response:

```ballerina
{
  "id": "token-001",
  "campaignName": "Welcome Campaign",
  "emailCampaignId": "camp-123",
  "createdBy": "user@example.com",
  "createContact": true,
  "createdAt": "2026-01-15T08:30:00Z"
}
```

</details>

<details>
<summary>Reset the password of an existing token</summary>

Reset the password for an existing SMTP API token. The new password is returned in the response.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenId` | `string` | Yes | The ID of the SMTP token whose password should be reset. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SmtpApiTokenView|error`

Sample code:

```ballerina
transactional:SmtpApiTokenView response = check hubspotClient->post smtp\-tokens/["token-001"]/password\-reset;
```

Sample response:

```ballerina
{
  "id": "token-001",
  "campaignName": "Welcome Campaign",
  "emailCampaignId": "camp-123",
  "createdBy": "user@example.com",
  "createContact": true,
  "createdAt": "2026-01-15T08:30:00Z",
  "password": "new-generated-password"
}
```

</details>

<details>
<summary>Delete a single token by ID</summary>

Delete (archive) an existing SMTP API token by its token ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenId` | `string` | Yes | The ID of the SMTP token to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->delete smtp\-tokens/["token-001"];
```

</details>
