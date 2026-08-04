---
title: Actions
---

# Actions

The `ballerinax/aws.marketplace.mpe` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Query the AWS Marketplace Entitlement Service to retrieve and filter customer entitlements by product code, customer identifier, or pricing dimension |

---

## Client

AWS Marketplace Entitlement service client for querying customer entitlements for AWS Marketplace products.

### Configuration

`ConnectionConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `auth:AuthConfig` | Required | Authentication configuration: Any standard credential source supported by `aws.auth` package: `StaticAuthConfig`, `ProfileAuthConfig`, `AssumeRoleConfig`, `WebIdentityConfig`, `SsoAuthConfig`, `ProcessAuthConfig`, `DEFAULT_CREDENTIALS` |
| `region` | `aws:Region\|string` | Required | The AWS region for the Marketplace Entitlement Service endpoint (e.g., `aws:US_EAST_1`). |
| `endpoint` | `aws:EndpointConfig` | Optional | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints). |

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.marketplace.mpe;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

mpe:ConnectionConfig config = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId,
        secretAccessKey
    }
};
mpe:Client mpeClient = check new (config);
```

### Operations

#### Entitlements

<details>
<summary>getEntitlements</summary>

Retrieves the entitlement values for a given product, with optional filtering by customer identifier or dimension and pagination support.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productCode` | `string` | Yes | Product code used to uniquely identify a product in AWS Marketplace (1–255 characters). |
| `filter` | `EntitlementFilter` | No | A filter to narrow results by customer identifier (`customerIdentifier` string array) or product dimension (`dimension` string array). |
| `maxResults` | `int` | No | The maximum number of results to return in a single call. |
| `nextToken` | `string` | No | The token for pagination to retrieve the next set of results. |

**Returns:** `EntitlementsResponse|Error`

**Sample code:**

```ballerina
mpe:EntitlementsResponse response = check mpeClient->getEntitlements(productCode = "abc123def456");
```

**Sample response:**

```json
{
  "entitlements": [
    {
      "productCode": "abc123def456",
      "dimension": "users",
      "customerIdentifier": "CUST-abcdef123456",
      "expirationDate": [1735689600, 0],
      "value": 10
    }
  ]
}
```

</details>

#### Filtered queries

<details>
<summary>getEntitlements (filtered by customer)</summary>

Retrieves entitlements filtered by a specific customer identifier.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productCode` | `string` | Yes | The AWS Marketplace product code. |
| `filter` | `EntitlementFilter` | Yes | Filter containing `customerIdentifier` array to filter by specific customers. |

Returns: `EntitlementsResponse|Error`

Sample code:

```ballerina
mpe:EntitlementsResponse response = check mpeClient->getEntitlements(
    productCode = "abc123def456",
    filter = {
        customerIdentifier: ["CUST-abcdef123456"]
    }
);
```

Sample response:

```ballerina
{
  "entitlements": [
    {
      "productCode": "abc123def456",
      "dimension": "users",
      "customerIdentifier": "CUST-abcdef123456",
      "expirationDate": [1735689600, 0],
      "value": 10
    },
    {
      "productCode": "abc123def456",
      "dimension": "storage_gb",
      "customerIdentifier": "CUST-abcdef123456",
      "expirationDate": [1735689600, 0],
      "value": 50
    }
  ],
  "nextToken": null
}
```

</details>

#### Client lifecycle

<details>
<summary>close</summary>

Closes the AWS MPE client and releases associated resources.

**Returns:** `Error?`

**Sample code:**

```ballerina
check mpeClient.close();
```

</details>
