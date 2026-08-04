---
title: Actions
---

# Actions

The `ballerinax/aws.marketplace.mpm` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Interacts with the AWS Marketplace Metering Service for customer resolution and usage metering. |

---

## Client

Interacts with the AWS Marketplace Metering Service for customer resolution and usage metering.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `auth:AuthConfig` | Required | Authentication configuration: Any standard credential source supported by `aws.auth` package: `StaticAuthConfig`, `ProfileAuthConfig`, `AssumeRoleConfig`, `WebIdentityConfig`, `SsoAuthConfig`, `ProcessAuthConfig`, `DEFAULT_CREDENTIALS` |
| `region` | `aws:Region\|string` | Required | AWS region for the Marketplace Metering Service (e.g., `aws:US_EAST_1`). |
| `endpoint` | `aws:EndpointConfig` | Optional | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. LocalStack, VPC interface endpoints). |

### Initializing the client

```ballerina
import ballerinax/aws;
import ballerinax/aws.marketplace.mpm;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

mpm:Client mpmClient = check new ({
    region: aws:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
```

### Operations

#### Customer resolution

<details>
<summary>resolveCustomer</summary>

Resolves a customer from an AWS Marketplace registration token, returning the customer identifier, AWS account ID, and product code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `registrationToken` | `string` | Yes | The registration token provided by AWS Marketplace when a customer subscribes to your product. |

Returns: `ResolveCustomerResponse|Error`

Sample code:

```ballerina
mpm:ResolveCustomerResponse response = check mpmClient->resolveCustomer("<registration-token>");
```

Sample response:

```ballerina
{"customerAWSAccountId": "123456789012", "customerIdentifier": "cust-abc123xyz", "productCode": "prod-example1234"}
```

</details>

#### Usage metering

<details>
<summary>batchMeterUsage</summary>

Submits a batch of metering usage records to AWS Marketplace for billing. Accepts up to 25 usage records per request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productCode` | `string` | Yes | The product code of your AWS Marketplace product (1–255 characters, alphanumeric and special characters). |
| `usageRecords` | `UsageRecord[]` | No | Array of usage records to submit (max 25). Defaults to an empty array. |

Returns: `BatchMeterUsageResponse|Error`

Sample code:

```ballerina
mpm:BatchMeterUsageResponse response = check mpmClient->batchMeterUsage(
    productCode = "prod-example1234",
    usageRecords = [
        {
            customerIdentifier: "cust-abc123xyz",
            dimension: "api_calls",
            timestamp: [1700000000, 0],
            quantity: 150
        }
    ]
);
```

Sample response:

```ballerina
{"results": [{"meteringRecordId": "mtr-12345abcde", "status": "Success", "usageRecord": {"customerIdentifier": "cust-abc123xyz", "dimension": "api_calls", "timestamp": [1700000000, 0], "quantity": 150}}], "unprocessedRecords": []}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the client connection and releases associated resources.

Returns: `Error?`

Sample code:

```ballerina
check mpmClient.close();
```

</details>
