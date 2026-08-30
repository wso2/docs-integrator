---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_slspricingconditionrecord_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to SAP S/4HANA pricing condition records and all associated sub-entities via the Condition Record for Pricing in Sales OData API. |

---

## Client

Provides full CRUD access to SAP S/4HANA pricing condition records and all associated sub-entities via the Condition Record for Pricing in Sales OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig\|http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | Authentication credentials; use `http:CredentialsConfig` (username/password) for Basic Auth, `http:BearerTokenConfig` for a bearer token, or `OAuth2RefreshTokenGrantConfig` for OAuth 2.0. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_slspricingconditionrecord_srv as conditionrecord;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

conditionrecord:Client conditionRecordClient = check new (
    {
        auth: {
            username,
            password
        }
    },
    hostname
);
```

### Operations

#### Condition records

<details>
<summary>listA_SlsPrcgConditionRecords</summary>

<div>

Reads all condition records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgConditionRecordsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgConditionRecordWrapper result = check conditionRecordClient->listA_SlsPrcgConditionRecords(
    queries = {
        \$filter: "ConditionType eq 'PPR0'",
        \$top: 5,
        \$select: ["ConditionRecord", "ConditionType", "ConditionRateValue", "ConditionRateValueUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionTable": "304",
        "ConditionApplication": "V",
        "ConditionType": "PPR0",
        "ConditionRateValue": "95.00",
        "ConditionRateValueUnit": "USD",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "ConditionValidityEndDate": "/Date(253402214400000)/"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_SlsPrcgConditionRecord</summary>

<div>

Creates one or more condition records. The condition table key fields (e.g., material, sales organization, distribution channel) live on the validity sub-entity, so they are typically supplied through a deep insert on `to_SlsPrcgCndnRecdValidity`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsPrcgConditionRecord` | Yes | Condition record fields, including an optional deep-inserted `to_SlsPrcgCndnRecdValidity` collection. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper created = check conditionRecordClient->createA_SlsPrcgConditionRecord({
    ConditionRecord: "0000000123",
    ConditionSequentialNumber: "1",
    ConditionTable: "304",
    ConditionApplication: "V",
    ConditionType: "PPR0",
    to_SlsPrcgCndnRecdValidity: {
        results: [
            {
                ConditionRecord: "0000000123",
                ConditionValidityEndDate: "/Date(253402214400000)/",
                ConditionType: "PPR0",
                ConditionApplication: "V",
                Material: "HW0001",
                SalesOrganization: "1710",
                DistributionChannel: "10"
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "0.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgConditionRecord</summary>

<div>

Reads a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record (e.g., `"0000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgConditionRecordQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper conditionRecord = check conditionRecordClient->getA_SlsPrcgConditionRecord(
    "0000000123",
    queries = {
        \$expand: "to_SlsPrcgCndnRecdValidity"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "95.00",
    "ConditionRateValueUnit": "USD",
    "ConditionCurrency": "USD",
    "ConditionIsDeleted": false
  }
}
```

</div>

</details>

<details>
<summary>deleteA_SlsPrcgConditionRecord</summary>

<div>

Deletes a specific condition record.

:::note
Some communication scenarios reject a hard delete with "Deletion not allowed. Set the deletion flag by using update operations." If deletion fails, use `patchA_SlsPrcgConditionRecord` with `ConditionIsDeleted: true` instead.
:::

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | The condition record number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->deleteA_SlsPrcgConditionRecord(
    "0000000123",
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgConditionRecord</summary>

<div>

Updates a specific condition record. Retiring a condition record is typically done by flagging `ConditionIsDeleted: true` rather than deleting it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | The condition record number to update. |
| `payload` | `Modified\ A_SlsPrcgConditionRecordType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag; `If-Match: *` is rejected by this API. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgConditionRecord(
    "0000000123",
    {d: {ConditionIsDeleted: true}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgConditionRecord</summary>

<div>

Reads the condition supplements of a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgConditionRecordQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper supplements =
    check conditionRecordClient->listSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgConditionRecord("0000000123");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "ConditionTable": "305",
        "ConditionApplication": "V",
        "ConditionType": "PB00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgCndnRecdSuplmntOfA_SlsPrcgConditionRecord</summary>

<div>

Creates one or more condition supplements for a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `payload` | `CreateA_SlsPrcgCndnRecdSuplmnt` | Yes | New condition supplement fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement =
    check conditionRecordClient->createSlsPrcgCndnRecdSuplmntOfA_SlsPrcgConditionRecord(
        "0000000123",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "2",
            ConditionTable: "305",
            ConditionApplication: "V",
            ConditionType: "PB00"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecdValiditiesOfA_SlsPrcgConditionRecord</summary>

<div>

Reads the validity of a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecdValiditiesOfA_SlsPrcgConditionRecordQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper validities =
    check conditionRecordClient->listSlsPrcgCndnRecdValiditiesOfA_SlsPrcgConditionRecord("0000000123");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "Material": "HW0001",
        "SalesOrganization": "1710",
        "DistributionChannel": "10"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecordScalesOfA_SlsPrcgConditionRecord</summary>

<div>

Reads the pricing scales of a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecordScalesOfA_SlsPrcgConditionRecordQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper scales =
    check conditionRecordClient->listSlsPrcgCndnRecordScalesOfA_SlsPrcgConditionRecord("0000000123");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "1",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "100",
        "ConditionScaleQuantityUnit": "EA",
        "ConditionRateValue": "95.00",
        "ConditionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgCndnRecordScaleOfA_SlsPrcgConditionRecord</summary>

<div>

Creates one or more pricing scales for a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `payload` | `CreateA_SlsPrcgCndnRecordScale` | Yes | New pricing scale fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecordScaleWrapper scale =
    check conditionRecordClient->createSlsPrcgCndnRecordScaleOfA_SlsPrcgConditionRecord(
        "0000000123",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "1",
            ConditionScaleQuantity: "500",
            ConditionScaleQuantityUnit: "EA",
            ConditionRateValue: "90.00",
            ConditionCurrency: "USD"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "ConditionScaleLine": "0002",
    "ConditionScaleQuantity": "500",
    "ConditionScaleQuantityUnit": "EA",
    "ConditionRateValue": "90.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>listSlsPrcgConditionRecordTextsOfA_SlsPrcgConditionRecord</summary>

<div>

Reads the description texts of a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgConditionRecordTextsOfA_SlsPrcgConditionRecordQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgConditionRecordTextWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgConditionRecordTextWrapper texts =
    check conditionRecordClient->listSlsPrcgConditionRecordTextsOfA_SlsPrcgConditionRecord("0000000123");
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "1",
        "Language": "EN",
        "ConditionText": "Standard price - HW0001"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgConditionRecordTextOfA_SlsPrcgConditionRecord</summary>

<div>

Creates a description text for a specific condition record, for a given language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `payload` | `CreateA_SlsPrcgConditionRecordText` | Yes | Text content and language key. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordTextWrapper text =
    check conditionRecordClient->createSlsPrcgConditionRecordTextOfA_SlsPrcgConditionRecord(
        "0000000123",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "1",
            Language: "EN",
            ConditionText: "Standard price - HW0001"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "Language": "EN",
    "ConditionText": "Standard price - HW0001"
  }
}
```

</div>

</details>

#### Condition record validity

<details>
<summary>listA_SlsPrcgCndnRecdValidities</summary>

<div>

Reads validity records for all condition records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgCndnRecdValiditiesQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper result = check conditionRecordClient->listA_SlsPrcgCndnRecdValidities(
    queries = {
        \$filter: "Material eq 'HW0001'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "Material": "HW0001",
        "SalesOrganization": "1710",
        "DistributionChannel": "10"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgCndnRecdValidity</summary>

<div>

Reads the validity of a specific condition record identified by its validity end date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record, as `/Date(<ms since epoch>)/`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgCndnRecdValidityQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdValidityWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdValidityWrapper validity = check conditionRecordClient->getA_SlsPrcgCndnRecdValidity(
    "0000000123",
    "/Date(253402214400000)/"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionValidityEndDate": "/Date(253402214400000)/",
    "ConditionValidityStartDate": "/Date(1735689600000)/",
    "Material": "HW0001",
    "SalesOrganization": "1710",
    "DistributionChannel": "10"
  }
}
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgCndnRecdValidity</summary>

<div>

Updates the validity period of a specific condition record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date identifying the validity record to update. |
| `payload` | `Modified\ A_SlsPrcgCndnRecdValidityType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgCndnRecdValidity(
    "0000000123",
    "/Date(253402214400000)/",
    {d: {ConditionValidityStartDate: "/Date(1738368000000)/"}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgCndnRecdValidity</summary>

<div>

Reads the condition supplements for a specific condition record validity period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgCndnRecdValidityQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper supplements =
    check conditionRecordClient->listSlsPrcgCndnRecdSuplmntsOfA_SlsPrcgCndnRecdValidity(
        "0000000123",
        "/Date(253402214400000)/"
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "ConditionTable": "305",
        "ConditionApplication": "V",
        "ConditionType": "PB00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnRecdValidity</summary>

<div>

Creates one or more condition supplements for a specific condition record validity period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record. |
| `payload` | `CreateA_SlsPrcgCndnRecdSuplmnt` | Yes | New condition supplement fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement =
    check conditionRecordClient->createSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnRecdValidity(
        "0000000123",
        "/Date(253402214400000)/",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "2",
            ConditionTable: "305",
            ConditionApplication: "V",
            ConditionType: "PB00"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

<details>
<summary>getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdValidity</summary>

<div>

Reads the condition record for a specific condition record validity period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionValidityEndDate` | `string` | Yes | Validity end date of the condition record. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdValidityQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper conditionRecord =
    check conditionRecordClient->getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdValidity(
        "0000000123",
        "/Date(253402214400000)/"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "95.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

#### Pricing scales

<details>
<summary>listA_SlsPrcgCndnRecordScales</summary>

<div>

Reads all pricing scales in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgCndnRecordScalesQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper result = check conditionRecordClient->listA_SlsPrcgCndnRecordScales(
    queries = {
        \$filter: "ConditionRecord eq '0000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "1",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "100",
        "ConditionScaleQuantityUnit": "EA",
        "ConditionRateValue": "95.00",
        "ConditionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_SlsPrcgCndnRecordScale</summary>

<div>

Creates one or more pricing scales.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsPrcgCndnRecordScale` | Yes | New pricing scale fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecordScaleWrapper scale = check conditionRecordClient->createA_SlsPrcgCndnRecordScale({
    ConditionRecord: "0000000123",
    ConditionSequentialNumber: "1",
    ConditionScaleQuantity: "1000",
    ConditionScaleQuantityUnit: "EA",
    ConditionRateValue: "85.00",
    ConditionCurrency: "USD"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "ConditionScaleLine": "0003",
    "ConditionScaleQuantity": "1000",
    "ConditionScaleQuantityUnit": "EA",
    "ConditionRateValue": "85.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgCndnRecordScale</summary>

<div>

Reads a specific pricing scale.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line (e.g., `"0001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgCndnRecordScaleQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecordScaleWrapper scale = check conditionRecordClient->getA_SlsPrcgCndnRecordScale(
    "0000000123",
    "1",
    "0001"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "ConditionScaleLine": "0001",
    "ConditionScaleQuantity": "100",
    "ConditionScaleQuantityUnit": "EA",
    "ConditionRateValue": "95.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>deleteA_SlsPrcgCndnRecordScale</summary>

<div>

Deletes a specific pricing scale.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `ConditionScaleLine` | `string` | Yes | The scale line number to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->deleteA_SlsPrcgCndnRecordScale(
    "0000000123",
    "1",
    "0003",
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgCndnRecordScale</summary>

<div>

Updates a specific pricing scale.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `ConditionScaleLine` | `string` | Yes | The scale line number to update. |
| `payload` | `Modified\ A_SlsPrcgCndnRecordScaleType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgCndnRecordScale(
    "0000000123",
    "1",
    "0001",
    {d: {ConditionRateValue: "92.00"}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>getSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnRecordScale</summary>

<div>

Reads the condition supplement for a specific pricing scale.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnRecordScaleQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement =
    check conditionRecordClient->getSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnRecordScale(
        "0000000123",
        "2",
        "0001"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

<details>
<summary>getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecordScale</summary>

<div>

Reads the condition record for a specific pricing scale.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `ConditionScaleLine` | `string` | Yes | Current number of the scale line. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgConditionRecordOfA_SlsPrcgCndnRecordScaleQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper conditionRecord =
    check conditionRecordClient->getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecordScale(
        "0000000123",
        "1",
        "0001"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "95.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

#### Condition supplements

<details>
<summary>listA_SlsPrcgCndnRecdSuplmnts</summary>

<div>

Reads all condition supplements in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgCndnRecdSuplmntsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdSuplmntWrapper result = check conditionRecordClient->listA_SlsPrcgCndnRecdSuplmnts(
    queries = {
        \$filter: "ConditionRecord eq '0000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "ConditionTable": "305",
        "ConditionApplication": "V",
        "ConditionType": "PB00"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Creates one or more condition supplements.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsPrcgCndnRecdSuplmnt` | Yes | New condition supplement fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement = check conditionRecordClient->createA_SlsPrcgCndnRecdSuplmnt({
    ConditionRecord: "0000000123",
    ConditionSequentialNumber: "3",
    ConditionTable: "305",
    ConditionApplication: "V",
    ConditionType: "PB00"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "3",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Reads a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgCndnRecdSuplmntQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement = check conditionRecordClient->getA_SlsPrcgCndnRecdSuplmnt(
    "0000000123",
    "2"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

<details>
<summary>deleteA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Deletes a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->deleteA_SlsPrcgCndnRecdSuplmnt(
    "0000000123",
    "3",
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Updates a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition to update. |
| `payload` | `Modified\ A_SlsPrcgCndnRecdSuplmntType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgCndnRecdSuplmnt(
    "0000000123",
    "2",
    {d: {ConditionType: "PB01"}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecdValiditiesOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Reads validity of the condition record for a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecdValiditiesOfA_SlsPrcgCndnRecdSuplmntQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecdValidityWrapper validities =
    check conditionRecordClient->listSlsPrcgCndnRecdValiditiesOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2"
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionValidityEndDate": "/Date(253402214400000)/",
        "ConditionValidityStartDate": "/Date(1735689600000)/",
        "Material": "HW0001",
        "SalesOrganization": "1710",
        "DistributionChannel": "10"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnRecordScalesOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Reads the pricing scales of a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnRecordScalesOfA_SlsPrcgCndnRecdSuplmntQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnRecordScaleWrapper scales =
    check conditionRecordClient->listSlsPrcgCndnRecordScalesOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2"
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "ConditionScaleLine": "0001",
        "ConditionScaleQuantity": "50",
        "ConditionScaleQuantityUnit": "EA",
        "ConditionRateValue": "5.00",
        "ConditionCurrency": "USD"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgCndnRecordScaleOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Creates one or more pricing scales for a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `payload` | `CreateA_SlsPrcgCndnRecordScale` | Yes | New pricing scale fields. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnRecordScaleWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecordScaleWrapper scale =
    check conditionRecordClient->createSlsPrcgCndnRecordScaleOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "2",
            ConditionScaleQuantity: "50",
            ConditionScaleQuantityUnit: "EA",
            ConditionRateValue: "5.00",
            ConditionCurrency: "USD"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionScaleLine": "0001",
    "ConditionScaleQuantity": "50",
    "ConditionScaleQuantityUnit": "EA",
    "ConditionRateValue": "5.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

<details>
<summary>listSlsPrcgCndnSupplementTextsOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Reads the description texts of a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListSlsPrcgCndnSupplementTextsOfA_SlsPrcgCndnRecdSuplmntQueries` | No | OData query parameters for filtering and field selection. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnSupplementTextWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnSupplementTextWrapper texts =
    check conditionRecordClient->listSlsPrcgCndnSupplementTextsOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2"
    );
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "Language": "EN",
        "ConditionText": "Freight surcharge"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createSlsPrcgCndnSupplementTextOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Creates a description text for a specific condition supplement, for a given language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `payload` | `CreateA_SlsPrcgCndnSupplementText` | Yes | Text content and language key. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnSupplementTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnSupplementTextWrapper text =
    check conditionRecordClient->createSlsPrcgCndnSupplementTextOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2",
        {
            ConditionRecord: "0000000123",
            ConditionSequentialNumber: "2",
            Language: "EN",
            ConditionText: "Freight surcharge"
        }
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "Language": "EN",
    "ConditionText": "Freight surcharge"
  }
}
```

</div>

</details>

<details>
<summary>getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdSuplmnt</summary>

<div>

Reads the condition record for a specific condition supplement.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdSuplmntQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper conditionRecord =
    check conditionRecordClient->getSlsPrcgConditionRecordOfA_SlsPrcgCndnRecdSuplmnt(
        "0000000123",
        "2"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "95.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

#### Condition record texts

<details>
<summary>listA_SlsPrcgConditionRecordTexts</summary>

<div>

Reads all condition record description texts in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgConditionRecordTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgConditionRecordTextWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgConditionRecordTextWrapper result = check conditionRecordClient->listA_SlsPrcgConditionRecordTexts(
    queries = {
        \$filter: "Language eq 'EN'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "1",
        "Language": "EN",
        "ConditionText": "Standard price - HW0001"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_SlsPrcgConditionRecordText</summary>

<div>

Creates one or more condition record description texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsPrcgConditionRecordText` | Yes | Text content and language key. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordTextWrapper text = check conditionRecordClient->createA_SlsPrcgConditionRecordText({
    ConditionRecord: "0000000123",
    ConditionSequentialNumber: "1",
    Language: "DE",
    ConditionText: "Standardpreis - HW0001"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "Language": "DE",
    "ConditionText": "Standardpreis - HW0001"
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgConditionRecordText</summary>

<div>

Reads a specific condition record description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgConditionRecordTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordTextWrapper text = check conditionRecordClient->getA_SlsPrcgConditionRecordText(
    "0000000123",
    "1",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "1",
    "Language": "EN",
    "ConditionText": "Standard price - HW0001"
  }
}
```

</div>

</details>

<details>
<summary>deleteA_SlsPrcgConditionRecordText</summary>

<div>

Deletes a specific condition record description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->deleteA_SlsPrcgConditionRecordText(
    "0000000123",
    "1",
    "DE",
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgConditionRecordText</summary>

<div>

Updates a specific condition record description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text to update. |
| `payload` | `Modified\ A_SlsPrcgConditionRecordTextType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgConditionRecordText(
    "0000000123",
    "1",
    "EN",
    {d: {ConditionText: "Standard price - Hardware line HW0001"}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>getSlsPrcgConditionRecordOfA_SlsPrcgConditionRecordText</summary>

<div>

Reads the condition record for a specific description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgConditionRecordOfA_SlsPrcgConditionRecordTextQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgConditionRecordWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgConditionRecordWrapper conditionRecord =
    check conditionRecordClient->getSlsPrcgConditionRecordOfA_SlsPrcgConditionRecordText(
        "0000000123",
        "1",
        "EN"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionTable": "304",
    "ConditionApplication": "V",
    "ConditionType": "PPR0",
    "ConditionRateValue": "95.00",
    "ConditionCurrency": "USD"
  }
}
```

</div>

</details>

#### Condition supplement texts

<details>
<summary>listA_SlsPrcgCndnSupplementTexts</summary>

<div>

Reads all condition supplement description texts in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_SlsPrcgCndnSupplementTextsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `conditionrecord:CollectionOfA_SlsPrcgCndnSupplementTextWrapper|error`

Sample code:

```ballerina
conditionrecord:CollectionOfA_SlsPrcgCndnSupplementTextWrapper result = check conditionRecordClient->listA_SlsPrcgCndnSupplementTexts(
    queries = {
        \$filter: "ConditionRecord eq '0000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "ConditionRecord": "0000000123",
        "ConditionSequentialNumber": "2",
        "Language": "EN",
        "ConditionText": "Freight surcharge"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>createA_SlsPrcgCndnSupplementText</summary>

<div>

Creates one or more condition supplement description texts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_SlsPrcgCndnSupplementText` | Yes | Text content and language key. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `conditionrecord:A_SlsPrcgCndnSupplementTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnSupplementTextWrapper text = check conditionRecordClient->createA_SlsPrcgCndnSupplementText({
    ConditionRecord: "0000000123",
    ConditionSequentialNumber: "2",
    Language: "DE",
    ConditionText: "Frachtzuschlag"
});
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "Language": "DE",
    "ConditionText": "Frachtzuschlag"
  }
}
```

</div>

</details>

<details>
<summary>getA_SlsPrcgCndnSupplementText</summary>

<div>

Reads a specific condition supplement description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key (e.g., `"EN"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_SlsPrcgCndnSupplementTextQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `conditionrecord:A_SlsPrcgCndnSupplementTextWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnSupplementTextWrapper text = check conditionRecordClient->getA_SlsPrcgCndnSupplementText(
    "0000000123",
    "2",
    "EN"
);
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "Language": "EN",
    "ConditionText": "Freight surcharge"
  }
}
```

</div>

</details>

<details>
<summary>deleteA_SlsPrcgCndnSupplementText</summary>

<div>

Deletes a specific condition supplement description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text to delete. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->deleteA_SlsPrcgCndnSupplementText(
    "0000000123",
    "2",
    "DE",
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>patchA_SlsPrcgCndnSupplementText</summary>

<div>

Updates a specific condition supplement description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text to update. |
| `payload` | `Modified\ A_SlsPrcgCndnSupplementTextType` | Yes | Fields to update, wrapped as `{d: {...}}`. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity's current ETag. |

Returns: `error?`

Sample code:

```ballerina
check conditionRecordClient->patchA_SlsPrcgCndnSupplementText(
    "0000000123",
    "2",
    "EN",
    {d: {ConditionText: "Freight and handling surcharge"}},
    headers = {"If-Match": eTag}
);
```

</div>

</details>

<details>
<summary>getSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnSupplementText</summary>

<div>

Reads the condition supplement for a specific description text.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ConditionRecord` | `string` | Yes | Number of the condition record. |
| `ConditionSequentialNumber` | `string` | Yes | Sequential number of the condition. |
| `Language` | `string` | Yes | Language key of the text. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnSupplementTextQueries` | No | OData query parameters: `$select`. |

Returns: `conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper|error`

Sample code:

```ballerina
conditionrecord:A_SlsPrcgCndnRecdSuplmntWrapper supplement =
    check conditionRecordClient->getSlsPrcgCndnRecdSuplmntOfA_SlsPrcgCndnSupplementText(
        "0000000123",
        "2",
        "EN"
    );
```

Sample response:

```ballerina
{
  "d": {
    "ConditionRecord": "0000000123",
    "ConditionSequentialNumber": "2",
    "ConditionTable": "305",
    "ConditionApplication": "V",
    "ConditionType": "PB00"
  }
}
```

</div>

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

<div>

Sends a group of requests in a single round trip.

Entities can be passed directly, in which case each one is created in `entitySet`. Pass `BatchRequest` values instead to control the method, the target, and the headers per request, which is what updates, deletes, and reads need. Read requests are always sent as standalone parts, since OData does not allow them inside a change set.

By default each write gets its own change set, so a rejected request does not roll back the others. Set `atomic` to `true` to have every write commit or roll back together as a single transaction; in that mode, `Content-ID` references such as `$1` between requests resolve correctly, since the referenced request is guaranteed to be in the same change set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `requests` | `BatchRequest[]\|BatchEntity[]` | Yes | Entities to create, or requests to send. |
| `entitySet` | `string` | No | Entity set the entities are created in. Ignored when `BatchRequest` values are passed. Defaults to `"A_SlsPrcgConditionRecord"`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the batch request. |
| `atomic` | `boolean` | No | Whether every write belongs to a single transaction. Defaults to `false`. |

Returns: `BatchResult[]|error` — the outcome of each request, in the order they were sent. A batch answers `202 Accepted` even when every request inside it failed, so check each result's `statusCode` rather than relying on the overall call succeeding. When `atomic` is set, a failed change set answers with a single error result for the whole transaction, so fewer results than requests can come back.

Sample code — creating multiple condition records in one round trip:

```ballerina
BatchResult[] results = check conditionRecordClient->performBatchOperation([
    {ConditionRecord: "0000000201", ConditionSequentialNumber: "1", ConditionTable: "304",
        ConditionApplication: "V", ConditionType: "PPR0"},
    {ConditionRecord: "0000000202", ConditionSequentialNumber: "1", ConditionTable: "304",
        ConditionApplication: "V", ConditionType: "PPR0"}
], entitySet = "A_SlsPrcgConditionRecord");
```

Sample code — mixing a read with an atomic update, referencing an earlier request by `Content-ID`:

```ballerina
BatchResult[] results = check conditionRecordClient->performBatchOperation([
    {method: "GET", uri: "A_SlsPrcgConditionRecord('0000000123')"},
    {
        method: "PATCH",
        uri: "A_SlsPrcgConditionRecord('0000000123')",
        payload: {d: {ConditionRateValue: "99.00"}},
        headers: {"If-Match": eTag}
    }
], atomic = true);

foreach BatchResult result in results {
    if result.statusCode >= 300 {
        log:printWarn("Request failed", statusCode = result.statusCode, body = result.body);
    }
}
```

</div>

</details>
