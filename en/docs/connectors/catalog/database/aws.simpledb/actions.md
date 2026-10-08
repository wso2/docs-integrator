---
connector: true
connector_name: "aws.simpledb"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The AWS SimpleDB connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SimpleDB domains and perform item attribute reads, writes, queries, and deletes |

---

## Client

Provides access to all Amazon SimpleDB domain management and item attribute operations through a single authenticated client.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), external credential process, or the default provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region: an `aws:Region` enum member or a plain region string (e.g., `"us-east-1"`) for regions not yet in the enum |
| `endpoint` | <code>aws:EndpointConfig</code> | Optional | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. VPC interface endpoints) |

The client also accepts the standard Ballerina HTTP client options (`timeout`, `retryConfig`, `secureSocket`, `proxy`, and the rest of `http:ClientConfiguration`), which are omitted here.

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.simpledb;

simpledb:ConnectionConfig config = {
    auth: {
        accessKeyId: "<AWS_ACCESS_KEY_ID>",
        secretAccessKey: "<AWS_SECRET_ACCESS_KEY>"
    },
    region: aws:US_EAST_1
};
simpledb:Client simpleDb = check new (config);
```

### Operations

#### Domain management

<details>
<summary>createDomain</summary>

<div>

Create a domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |

**Returns:** `CreateDomainResponse|xml|error`

**Sample code:**

```ballerina
simpledb:CreateDomainResponse|xml result = check simpleDb->createDomain("inventory");
```

**Sample response:**

```json
{
  "responseMetadata": {
    "requestId": "b1e3e6fb-7c79-4d64-9b81-b54d7b023e40",
    "boxUsage": "0.0055590278"
  }
}
```

</div>
</details>

<details>
<summary>listDomains</summary>

<div>

List available domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|

This operation takes no parameters.

**Returns:** `ListDomainsResponse|xml|error`

**Sample code:**

```ballerina
simpledb:ListDomainsResponse|xml result = check simpleDb->listDomains();
```

**Sample response:**

```json
{
  "listDomainsResult": {
    "domainNames": "inventory products orders",
    "nextToken": ""
  },
  "responseMetadata": {
    "requestId": "d3e5b9c0-1f2a-4b6c-8d7e-b9c0d1e2f3a4",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>

<details>
<summary>getDomainMetaData</summary>

<div>

Get information about the domain, including when the domain was created, the number of items and attributes, and the size of attribute names and values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |

**Returns:** `DomainMetaDataResponse|xml|error`

**Sample code:**

```ballerina
simpledb:DomainMetaDataResponse|xml result = check simpleDb->getDomainMetaData("inventory");
```

**Sample response:**

```json
{
  "domainMetadataResult": {
    "itemCount": "4",
    "itemNamesSizeBytes": "48",
    "attributeNameCount": "3",
    "attributeNamesSizeBytes": "36",
    "attributeValueCount": "12",
    "attributeValuesSizeBytes": "120",
    "timestamp": "1735689600"
  },
  "responseMetadata": {
    "requestId": "c2f4a7b8-0e1d-4c5a-9f2e-a8b3c4d5e6f7",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>

<details>
<summary>deleteDomain</summary>

<div>

Delete a domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |

**Returns:** `DeleteDomainResponse|xml|error`

**Sample code:**

```ballerina
simpledb:DeleteDomainResponse|xml result = check simpleDb->deleteDomain("inventory");
```

**Sample response:**

```json
{
  "responseMetadata": {
    "requestId": "e4f6c0d1-2a3b-4c7d-9e8f-c0d1e2f3a4b5",
    "boxUsage": "0.0055590278"
  }
}
```

</div>
</details>

#### Item operations

<details>
<summary>putAttributes</summary>

<div>

Creates an attribute in an item. The value is added to the attribute rather than replacing any value it already has.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |
| `itemName` | <code>string</code> | Yes | Name of item |
| `attributes` | <code>Attribute[]</code> | Yes | Attributes to create; each `Attribute` has a `name` (string) and a `value` (string) |

**Returns:** `PutAttributesResponse|xml|error`

**Sample code:**

```ballerina
simpledb:PutAttributesResponse|xml result = check simpleDb->putAttributes(
    "inventory",
    "sku-1024",
    [{name: "colour", value: "blue"}]
);
```

**Sample response:**

```json
{
  "responseMetadata": {
    "requestId": "a6b8e2f3-4c5d-4e9f-1a0b-e2f3a4b5c6d7",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>

<details>
<summary>getAttributes</summary>

<div>

Get all of the attributes associated with the item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |
| `itemName` | <code>string</code> | Yes | Name of item |
| `consistentRead` | <code>boolean</code> | Yes | True if consistent reads are to be accepted |

**Returns:** `GetAttributesResponse|xml|error`

**Sample code:**

```ballerina
simpledb:GetAttributesResponse|xml result = check simpleDb->getAttributes("inventory", "sku-1024", true);
```

**Sample response:**

```json
{
  "getAttributesResult": {
    "attributes": "colour=blue size=medium"
  },
  "responseMetadata": {
    "requestId": "f5a7d1e2-3b4c-4d8e-0f9a-d1e2f3a4b5c6",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>

<details>
<summary>deleteAttributes</summary>

<div>

Delete attributes in an item. When `attributes` is empty, the whole item is deleted.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domainName` | <code>string</code> | Yes | Name of domain |
| `itemName` | <code>string</code> | Yes | Name of item |
| `attributes` | <code>Attribute[]</code> | Yes | Attributes to delete; pass an empty array to delete the entire item. Each `Attribute` has a `name` (string) and a `value` (string) |

**Returns:** `DeleteAttributesResponse|xml|error`

**Sample code:**

```ballerina
simpledb:DeleteAttributesResponse|xml result = check simpleDb->deleteAttributes(
    "inventory",
    "sku-1024",
    [{name: "colour", value: "blue"}]
);
```

**Sample response:**

```json
{
  "responseMetadata": {
    "requestId": "b7c9f3a4-5d6e-4f0a-2b1c-f3a4b5c6d7e8",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>

<details>
<summary>select</summary>

<div>

Select set of attributes that match the select expression.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectExpression` | <code>string</code> | Yes | SQL-like select expression to retrieve attributes (e.g., `select * from \`domainName\` where colour = 'blue'`) |
| `consistentRead` | <code>boolean</code> | Yes | True if consistent reads are to be accepted |

**Returns:** `SelectResponse|xml|error`

**Sample code:**

```ballerina
string selectExpression = "select * from `inventory` where colour = 'blue'";
simpledb:SelectResponse|xml result = check simpleDb->'select(selectExpression, true);
```

**Sample response:**

```json
{
  "selectResult": {
    "items": "sku-1024"
  },
  "responseMetadata": {
    "requestId": "c8d0a4b5-6e7f-4a1b-3c2d-a4b5c6d7e8f9",
    "boxUsage": "0.0000219907"
  }
}
```

</div>
</details>