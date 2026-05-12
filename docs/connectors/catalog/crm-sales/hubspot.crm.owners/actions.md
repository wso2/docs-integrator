---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.owners` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Access the HubSpot Owners API to list and retrieve owner information. |

---

## Client

Access the HubSpot Owners API to list and retrieve owner information.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or API keys. |
| `httpVersion` | <code>http:HttpVersion</code> | `http:HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig?</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket?</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig?</code> | `()` | Proxy server configuration. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig?</code> | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | <code>http:Compression</code> | `http:COMPRESSION_AUTO` | HTTP compression configuration. |
| `validation` | <code>boolean</code> | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.crm.owners as hsowners;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsowners:OAuth2RefreshTokenGrantConfig auth = {
    clientId,
    clientSecret,
    refreshToken,
    credentialBearer: oauth2:POST_BODY_BEARER
};

hsowners:Client hubspot = check new ({auth});
```

### Operations

#### Owner retrieval

<details>
<summary>Get a page of owners</summary>

Signature: `get /`

Retrieves a paginated list of owners for the account. Supports filtering by email address and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | <code>string?</code> | No | Filter results by owner email address. |
| `after` | <code>string?</code> | No | Pagination cursor token for the next page of results. |
| `'limit` | <code>int:Signed32</code> | No | Maximum number of results to return per page (default 100). |
| `archived` | <code>boolean</code> | No | Whether to return only archived owners (default `false`). |

Returns: `CollectionResponsePublicOwnerForwardPaging|error`

Sample code:

```ballerina
hsowners:CollectionResponsePublicOwnerForwardPaging response = check hubspot->/();
foreach hsowners:PublicOwner owner in response.results {
    // Access owner details: owner.email, owner.id, owner.firstName, etc.
}
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345",
      "email": "jsmith@example.com",
      "type": "PERSON",
      "firstName": "John",
      "lastName": "Smith",
      "userId": 9876543,
      "userIdIncludingInactive": 9876543,
      "archived": false,
      "teams": [
        {
          "id": "101",
          "name": "Sales Team",
          "primary": true
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-06-20T14:22:00.000Z"
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg%3D%3D",
      "link": "?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

<details>
<summary>Read an owner by given id or userId</summary>

Signature: `get /[int:Signed32 ownerId]`

Retrieves a single owner by their numeric owner ID or userId.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ownerId` | <code>int:Signed32</code> | Yes | The numeric ID of the owner (path parameter). |
| `idProperty` | <code>"id"&#124;"userId"</code> | No | Which property to use for lookup: `"id"` (default) or `"userId"`. |
| `archived` | <code>boolean</code> | No | Whether to return only archived owners (default `false`). |

Returns: `PublicOwner|error`

Sample code:

```ballerina
hsowners:PublicOwner owner = check hubspot->/[12345]();
```

Sample response:

```ballerina
{
  "id": "12345",
  "email": "jsmith@example.com",
  "type": "PERSON",
  "firstName": "John",
  "lastName": "Smith",
  "userId": 9876543,
  "userIdIncludingInactive": 9876543,
  "archived": false,
  "teams": [
    {
      "id": "101",
      "name": "Sales Team",
      "primary": true
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-06-20T14:22:00.000Z"
}
```

</details>
