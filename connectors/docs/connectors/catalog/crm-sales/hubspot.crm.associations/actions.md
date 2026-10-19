---
title: Actions
---

# Actions

The `ballerinax/hubspot.crm.associations` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages HubSpot CRM associations: reading, creating, labeling, and archiving relationships between CRM object pairs, plus usage reporting. |

---

## Client

Manages HubSpot CRM associations: reading, creating, labeling, and archiving relationships between CRM object pairs, plus usage reporting.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token grant, a bearer token, or API key headers (`privateApp` or `privateAppLegacy`). |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable constraint validation on response payloads. |

### Initializing the client

```ballerina
import ballerinax/hubspot.crm.associations as hscrmassociations;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hscrmassociations:Client hubspotClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        refreshUrl: "https://api.hubapi.com/oauth/v1/token",
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Single-Record associations

<details>
<summary>List associations of an object by type</summary>

Signature: `get /objects/[objectType]/[objectId]/associations/[toObjectType]`

Returns all associations of the specified type for a given CRM object, with optional pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | `string` | Yes | The CRM object type of the source record (e.g., `"deals"`, `"contacts"`). |
| `objectId` | `int:Signed32` | Yes | The ID of the source CRM record. |
| `toObjectType` | `string` | Yes | The CRM object type of the associated records (e.g., `"companies"`). |
| `limit` | `int:Signed32` | No | Maximum number of associations to return per page. Defaults to `500`. |
| `after` | `string` | No | Pagination cursor returned by a previous response to fetch the next page. |

Returns: `CollectionResponseMultiAssociatedObjectWithLabelForwardPaging|error`

Sample code:

```ballerina
hscrmassociations:CollectionResponseMultiAssociatedObjectWithLabelForwardPaging associations =
    check hubspotClient->/objects/["deals"]/[123]/associations/["companies"]();
```

Sample response:

```ballerina
{
  "results": [
    {
      "toObjectId": 456,
      "associationTypes": [
        {
          "category": "HUBSPOT_DEFINED",
          "typeId": 5,
          "label": null
        }
      ]
    },
    {
      "toObjectId": 789,
      "associationTypes": [
        {
          "category": "USER_DEFINED",
          "typeId": 1,
          "label": "Partner"
        }
      ]
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg==",
      "link": "?after=NTI1Cg=="
    }
  }
}
```

</details>

<details>
<summary>Create association labels between two records</summary>

Signature: `put /objects/[objectType]/[objectId]/associations/[toObjectType]/[toObjectId]`

Creates or updates labeled association relationships between two specific CRM records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | `string` | Yes | The CRM object type of the source record (e.g., `"deals"`). |
| `objectId` | `int:Signed32` | Yes | The ID of the source CRM record. |
| `toObjectType` | `string` | Yes | The CRM object type of the target record (e.g., `"companies"`). |
| `toObjectId` | `int:Signed32` | Yes | The ID of the target CRM record. |
| `payload` | `AssociationSpec[]` | Yes | Array of association specs, each with an `associationCategory` and `associationTypeId`. |

Returns: `LabelsBetweenObjectPair|error`

Sample code:

```ballerina
hscrmassociations:LabelsBetweenObjectPair result =
    check hubspotClient->/objects/["deals"]/[123]/associations/["companies"]/[456].put([
        {associationCategory: "USER_DEFINED", associationTypeId: 1}
    ]);
```

Sample response:

```ballerina
{
  "fromObjectTypeId": "0-3",
  "fromObjectId": 123,
  "toObjectTypeId": "0-2",
  "toObjectId": 456,
  "labels": ["Partner"]
}
```

</details>

<details>
<summary>Create default association between two object types</summary>

Signature: `put /objects/[fromObjectType]/[fromObjectId]/associations/default/[toObjectType]/[toObjectId]`

Creates a default HubSpot-defined association between two specific CRM records without specifying a label.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source record (e.g., `"deals"`). |
| `fromObjectId` | `int:Signed32` | Yes | The ID of the source CRM record. |
| `toObjectType` | `string` | Yes | The CRM object type of the target record (e.g., `"companies"`). |
| `toObjectId` | `int:Signed32` | Yes | The ID of the target CRM record. |

Returns: `BatchResponsePublicDefaultAssociation|error`

Sample code:

```ballerina
hscrmassociations:BatchResponsePublicDefaultAssociation result =
    check hubspotClient->/objects/["deals"]/[123]/associations/default/["companies"]/[456].put();
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "fromObjectTypeId": "0-3",
      "fromObjectId": 123,
      "toObjectTypeId": "0-2",
      "toObjectId": 456,
      "labels": ["Deal to Company"]
    }
  ],
  "startedAt": "2024-06-01T09:00:00.000Z",
  "completedAt": "2024-06-01T09:00:00.050Z"
}
```

</details>

<details>
<summary>Delete all associations between two records</summary>

Signature: `delete /objects/[objectType]/[objectId]/associations/[toObjectType]/[toObjectId]`

Permanently removes all association labels between two specified CRM records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectType` | `string` | Yes | The CRM object type of the source record. |
| `objectId` | `int:Signed32` | Yes | The ID of the source CRM record. |
| `toObjectType` | `string` | Yes | The CRM object type of the target record. |
| `toObjectId` | `int:Signed32` | Yes | The ID of the target CRM record. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/objects/["deals"]/[123]/associations/["companies"]/[456].delete();
```

</details>

#### Batch associations

<details>
<summary>Read associations</summary>

Signature: `post /associations/[fromObjectType]/[toObjectType]/batch/read`

Reads associations of a specific type for a batch of source CRM records in a single API call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source records (e.g., `"deals"`). |
| `toObjectType` | `string` | Yes | The CRM object type of the associated records (e.g., `"companies"`). |
| `payload` | `BatchInputPublicFetchAssociationsBatchRequest` | Yes | Batch request containing the list of source object IDs to look up. |

Returns: `BatchResponsePublicAssociationMultiWithLabel|BatchResponsePublicAssociationMultiWithLabelWithErrors|error`

Sample code:

```ballerina
hscrmassociations:BatchResponsePublicAssociationMultiWithLabel|
    hscrmassociations:BatchResponsePublicAssociationMultiWithLabelWithErrors result =
    check hubspotClient->/associations/["deals"]/["companies"]/batch/read.post({
        inputs: [{id: "123"}, {id: "124"}, {id: "125"}]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "from": {"id": "123"},
      "to": [
        {
          "toObjectId": 456,
          "associationTypes": [
            {"category": "HUBSPOT_DEFINED", "typeId": 5, "label": null}
          ]
        }
      ]
    },
    {
      "from": {"id": "124"},
      "to": [
        {
          "toObjectId": 789,
          "associationTypes": [
            {"category": "USER_DEFINED", "typeId": 1, "label": "Partner"}
          ]
        }
      ]
    }
  ],
  "startedAt": "2024-06-01T09:00:00.000Z",
  "completedAt": "2024-06-01T09:00:00.120Z"
}
```

</details>

<details>
<summary>Create default HubSpot-defined associations</summary>

Signature: `post /associations/[fromObjectType]/[toObjectType]/batch/associate/default`

Creates default HubSpot-defined associations between multiple pairs of CRM records in one request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source records (e.g., `"deals"`). |
| `toObjectType` | `string` | Yes | The CRM object type of the target records (e.g., `"companies"`). |
| `payload` | `BatchInputPublicDefaultAssociationMultiPost` | Yes | Batch input with a list of `from`/`to` object ID pairs. |

Returns: `BatchResponsePublicDefaultAssociation|error`

Sample code:

```ballerina
hscrmassociations:BatchResponsePublicDefaultAssociation result =
    check hubspotClient->/associations/["deals"]/["companies"]/batch/associate/default.post({
        inputs: [
            {from: {id: "201"}, to: {id: "301"}},
            {from: {id: "202"}, to: {id: "302"}}
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "fromObjectTypeId": "0-3",
      "fromObjectId": 201,
      "toObjectTypeId": "0-2",
      "toObjectId": 301,
      "labels": ["Deal to Company"]
    },
    {
      "fromObjectTypeId": "0-3",
      "fromObjectId": 202,
      "toObjectTypeId": "0-2",
      "toObjectId": 302,
      "labels": ["Deal to Company"]
    }
  ],
  "startedAt": "2024-06-01T09:00:00.000Z",
  "completedAt": "2024-06-01T09:00:00.080Z"
}
```

</details>

<details>
<summary>Create custom associations</summary>

Signature: `post /associations/[fromObjectType]/[toObjectType]/batch/create`

Creates custom labeled associations between multiple pairs of CRM records in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source records (e.g., `"deals"`). |
| `toObjectType` | `string` | Yes | The CRM object type of the target records (e.g., `"companies"`). |
| `payload` | `BatchInputPublicAssociationMultiPost` | Yes | Batch input with object ID pairs and their association type specs. |

Returns: `BatchResponseLabelsBetweenObjectPair|BatchResponseLabelsBetweenObjectPairWithErrors|error`

Sample code:

```ballerina
hscrmassociations:BatchResponseLabelsBetweenObjectPair|
    hscrmassociations:BatchResponseLabelsBetweenObjectPairWithErrors result =
    check hubspotClient->/associations/["deals"]/["companies"]/batch/create.post({
        inputs: [
            {
                from: {id: "123"},
                to: {id: "456"},
                types: [{associationCategory: "USER_DEFINED", associationTypeId: 1}]
            },
            {
                from: {id: "124"},
                to: {id: "457"},
                types: [{associationCategory: "USER_DEFINED", associationTypeId: 1}]
            }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "fromObjectTypeId": "0-3",
      "fromObjectId": 123,
      "toObjectTypeId": "0-2",
      "toObjectId": 456,
      "labels": ["Partner"]
    },
    {
      "fromObjectTypeId": "0-3",
      "fromObjectId": 124,
      "toObjectTypeId": "0-2",
      "toObjectId": 457,
      "labels": ["Partner"]
    }
  ],
  "startedAt": "2024-06-01T09:00:00.000Z",
  "completedAt": "2024-06-01T09:00:00.095Z"
}
```

</details>

<details>
<summary>Delete specific labels</summary>

Signature: `post /associations/[fromObjectType]/[toObjectType]/batch/labels/archive`

Removes specific association labels from multiple CRM record pairs without deleting the entire association relationship.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source records. |
| `toObjectType` | `string` | Yes | The CRM object type of the target records. |
| `payload` | `BatchInputPublicAssociationMultiPost` | Yes | Batch input specifying the record pairs and the association types (labels) to remove. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/associations/["deals"]/["companies"]/batch/labels/archive.post({
    inputs: [
        {
            from: {id: "123"},
            to: {id: "456"},
            types: [{associationCategory: "USER_DEFINED", associationTypeId: 1}]
        }
    ]
});
```

</details>

<details>
<summary>Archive associations</summary>

Signature: `post /associations/[fromObjectType]/[toObjectType]/batch/archive`

Removes all association links between multiple source/target CRM record pairs in a single batch request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fromObjectType` | `string` | Yes | The CRM object type of the source records. |
| `toObjectType` | `string` | Yes | The CRM object type of the target records. |
| `payload` | `BatchInputPublicAssociationMultiArchive` | Yes | Batch input with source objects and their associated target IDs to archive. |

Returns: `error?`

Sample code:

```ballerina
check hubspotClient->/associations/["deals"]/["companies"]/batch/archive.post({
    inputs: [
        {from: {id: "123"}, to: [{id: "456"}, {id: "789"}]},
        {from: {id: "124"}, to: [{id: "457"}]}
    ]
});
```

</details>

#### Usage reports

<details>
<summary>Generate high-usage report</summary>

Signature: `post /associations/usage/high-usage-report/[userId]`

Triggers generation of a high-usage associations report for the specified HubSpot user, useful for monitoring API consumption.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `int:Signed32` | Yes | The HubSpot user ID for whom the report will be generated. |

Returns: `ReportCreationResponse|error`

Sample code:

```ballerina
hscrmassociations:ReportCreationResponse report =
    check hubspotClient->/associations/usage/"high-usage-report"/[12345].post();
```

Sample response:

```ballerina
{
  "id": "rpt-a1b2c3d4e5f6"
}
```

</details>
