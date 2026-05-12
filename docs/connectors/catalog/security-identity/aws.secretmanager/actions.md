---
title: Actions
---

# Actions

The `ballerinax/aws.secretmanager` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Interact with AWS Secrets Manager to describe and retrieve secrets. |

---

## Client

Interact with AWS Secrets Manager to describe and retrieve secrets.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `region` | `Region` | Required | The AWS region where your secrets are stored (e.g., `US_EAST_1`, `EU_WEST_1`). |
| `auth` | `StaticAuthConfig\|EC2_IAM_ROLE\|DEFAULT_CREDENTIALS` | Required | Authentication configuration: static access key credentials, EC2 IAM role, or default AWS credential chain. |

### Initializing the client

```ballerina
import ballerinax/aws.secretmanager;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

secretmanager:Client secretManagerClient = check new ({
    region: secretmanager:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
```

### Operations

#### Secret metadata

<details>
<summary>describeSecret</summary>

Retrieves metadata about a secret, including its name, ARN, description, rotation configuration, replication status, and tags. Does not return the secret value itself.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretId` | `SecretId` | Yes | The name or ARN of the secret (1–2048 characters). |

Returns: `DescribeSecretResponse|Error`

Sample code:

```ballerina
secretmanager:DescribeSecretResponse response = check secretManagerClient->describeSecret("prod/db/credentials");
```

Sample response:

```ballerina
{
  "arn": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db/credentials-AbCdEf",
  "name": "prod/db/credentials",
  "description": "Production database credentials",
  "createdDate": [1700000000, 0],
  "lastChangedDate": [1700100000, 0],
  "lastAccessedDate": [1700200000, 0],
  "rotationEnabled": true,
  "owningService": "secretsmanager.amazonaws.com",
  "primaryRegion": "US_EAST_1",
  "tags": [{"key": "Environment", "value": "Production"}],
  "versionToStages": {
    "v1-abc-123": ["AWSCURRENT"],
    "v0-xyz-789": ["AWSPREVIOUS"]
  }
}
```

</details>

#### Secret retrieval

<details>
<summary>getSecretValue</summary>

Retrieves the encrypted value of a secret. You can optionally specify a version by version ID or staging label; defaults to the `AWSCURRENT` version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretId` | `SecretId` | Yes | The name or ARN of the secret (1–2048 characters). |
| `versionId` | `string` | No | The unique identifier of the secret version (32–64 characters). |
| `versionStage` | `string` | No | The staging label of the version to retrieve (e.g., `AWSCURRENT`, `AWSPREVIOUS`). |

Returns: `SecretValue|Error`

Sample code:

```ballerina
secretmanager:SecretValue secret = check secretManagerClient->getSecretValue("prod/db/credentials");
```

Sample response:

```ballerina
{
  "arn": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db/credentials-AbCdEf",
  "name": "prod/db/credentials",
  "value": "{\"username\":\"admin\",\"password\":\"s3cur3P@ss!\"}",
  "versionId": "v1-abc-12345678-abcd-1234-abcd-123456789012",
  "versionStages": ["AWSCURRENT"],
  "createdDate": [1700000000, 0]
}
```

</details>

<details>
<summary>batchGetSecretValue</summary>

Retrieves the values of up to 20 secrets in a single call. You must provide either `secretIds` or `filters`, but not both.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `secretIds` | `SecretId[]` | No | Array of secret names or ARNs to retrieve (1–20 items). Cannot be used together with `filters`. |
| `filters` | `SecretValueFilter[]` | No | Array of filters to select secrets (max 10). Each filter has a `key` and `values`. Cannot be used together with `secretIds`. |
| `maxResults` | `int` | No | Maximum number of results to return (1–20). |
| `nextToken` | `string` | No | Pagination token from a previous response (1–4096 characters). |

Returns: `BatchGetSecretValueResponse|Error`

Sample code:

```ballerina
secretmanager:BatchGetSecretValueResponse response = check secretManagerClient->batchGetSecretValue(
    secretIds = ["prod/db/credentials", "prod/api/key"]
);
```

Sample response:

```ballerina
{
  "secretValues": [
    {
      "arn": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db/credentials-AbCdEf",
      "name": "prod/db/credentials",
      "value": "{\"username\":\"admin\",\"password\":\"s3cur3P@ss!\"}",
      "versionId": "v1-abc-12345678-abcd-1234-abcd-123456789012",
      "versionStages": ["AWSCURRENT"],
      "createdDate": [1700000000, 0]
    },
    {
      "arn": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/api/key-GhIjKl",
      "name": "prod/api/key",
      "value": "sk-live-abc123def456",
      "versionId": "v1-def-98765432-dcba-4321-dcba-210987654321",
      "versionStages": ["AWSCURRENT"],
      "createdDate": [1700050000, 0]
    }
  ],
  "errors": []
}
```

</details>

#### Client lifecycle

<details>
<summary>close</summary>

Releases resources associated with the client. Call this when the client is no longer needed.

Returns: `Error?`

Sample code:

```ballerina
check secretManagerClient->close();
```

</details>
