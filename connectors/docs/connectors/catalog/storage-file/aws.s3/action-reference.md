---
title: Actions
---

# Actions

The AWS S3 connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Bucket management, object CRUD, presigned URLs, and multipart uploads |

---

## Client

The `Client` provides programmatic access to Amazon S3, supporting bucket management, object uploads and downloads with automatic type binding, presigned URL generation, and multipart uploads for large objects.

### Configuration

`ConnectionConfig`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), external credential process, or the default provider chain |
| `region` | <code>aws:Region&#124;string</code> | `us-east-1` | AWS region: an `aws:Region` enum member or a plain region string (e.g., `"us-east-1"`) for regions not yet in the enum |
| `endpoint` | <code>aws:EndpointConfig</code> | Optional | Optional endpoint options: FIPS/dualstack variants, or a custom endpoint override (e.g. VPC interface endpoints) |

### Initializing the client

```ballerina
import ballerinax/aws.s3;

s3:ConnectionConfig config = {
    auth: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    },
    region: "us-east-1"
};
s3:Client client = check new (config);
```

### Operations

#### Bucket Management

<details>
<summary>createBucket</summary>

Creates an S3 bucket with optional access control and object ownership settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for this bucket (e.g., `"private"`, `"public-read"`). Defaults to `PRIVATE` |
| `objectOwnership` | <code>ObjectOwnership</code> | No | Specifies ownership of objects uploaded to this bucket (e.g., `"BucketOwnerEnforced"`, `"ObjectWriter"`). Defaults to `BUCKET_OWNER_ENFORCED` |
| `objectLockEnabled` | <code>boolean</code> | No | Enable Object Lock to prevent objects from being deleted or overwritten |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->createBucket("my-app-data");
```

</details>

<details>
<summary>deleteBucket</summary>

Deletes an S3 bucket. The bucket must be empty before it can be deleted.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteBucket("my-app-data");
```

</details>

<details>
<summary>listBuckets</summary>

Lists all S3 buckets in the AWS account associated with the configured credentials.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| — | — | — | No parameters |

**Returns:** `Bucket[]|Error`

**Sample code:**

```ballerina
s3:Bucket[] buckets = check client->listBuckets();
```

**Sample response:**

```json
[
  {
    "name": "my-app-data",
    "creationDate": "2024-01-15T10:30:00.000Z"
  },
  {
    "name": "my-backups",
    "creationDate": "2024-03-20T08:00:00.000Z"
  }
]
```

</details>

<details>
<summary>getBucketLocation</summary>

Gets the AWS region in which an S3 bucket resides.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string region = check client->getBucketLocation("my-app-data");
```

**Sample response:**

```json
"us-west-2"
```

</details>

#### Object Storage

<details>
<summary>putObjectFromFile</summary>

Uploads an S3 object from a local file path. Use this when the file already exists on disk.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `filePath` | <code>string</code> | Yes | The local file path to upload |
| `contentType` | <code>string</code> | No | The MIME type of the content |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for this object. Defaults to `PRIVATE` |
| `storageClass` | <code>StorageClass</code> | No | The storage class of the object. Defaults to `STANDARD` |
| `metadata` | <code>map&#60;string&#62;</code> | No | Custom data to attach to the object (e.g., `&#123;"author": "John"&#125;`) |
| `cacheControl` | <code>string</code> | No | Specifies caching behavior along the request/reply chain |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object |
| `contentEncoding` | <code>string</code> | No | Specifies what content encodings have been applied to the object |
| `contentLanguage` | <code>string</code> | No | The language the content is in (e.g., `"en-US"`) |
| `expires` | <code>string</code> | No | The date and time at which the object is no longer cacheable |
| `tagging` | <code>string</code> | No | Tags for the object (e.g., `"env=prod&team=finance"`) |
| `serverSideEncryption` | <code>string</code> | No | Encryption type (`"AES256"` or `"aws:kms"`) |
| `fileFormat` | <code>FileFormat</code> | No | The file format to use for serializing record content. Overrides the format inferred from the object key extension |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->putObjectFromFile("my-app-data", "reports/report.pdf", "/tmp/report.pdf");
```

</details>

<details>
<summary>putObject</summary>

Uploads an S3 object from in-memory content with automatic type serialization. The `content` parameter supports:

- Built-in types: `byte[]`, `string`, `json`, `xml`
- Custom record types (e.g., `User`): serialized as JSON for `.json` object keys and as XML for `.xml` object keys
- Record arrays (e.g., `User[]`) and `stream<record {}, error?>`: serialized as CSV with field names as headers for `.csv` object keys
- `stream<byte[], error?>`: collected into bytes before uploading

The `fileFormat` parameter overrides the format inferred from the object key extension.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `content` | <code>UploadContent</code> | Yes | The object content. Accepted types: `byte[]`, `string`, `json`, `xml`, `record &#123;&#125;`, `record &#123;&#125;[]`, `stream&#60;byte[], error?&#62;`, `stream&#60;record &#123;&#125;, error?&#62;` |
| `contentType` | <code>string</code> | No | The MIME type of the content |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for this object. Defaults to `PRIVATE` |
| `storageClass` | <code>StorageClass</code> | No | The storage class of the object. Defaults to `STANDARD` |
| `metadata` | <code>map&#60;string&#62;</code> | No | Custom data to attach to the object (e.g., `&#123;"author": "John"&#125;`) |
| `cacheControl` | <code>string</code> | No | Specifies caching behavior along the request/reply chain |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object |
| `contentEncoding` | <code>string</code> | No | Specifies what content encodings have been applied to the object |
| `contentLanguage` | <code>string</code> | No | The language the content is in (e.g., `"en-US"`) |
| `expires` | <code>string</code> | No | The date and time at which the object is no longer cacheable |
| `tagging` | <code>string</code> | No | Tags for the object (e.g., `"env=prod&team=finance"`) |
| `serverSideEncryption` | <code>string</code> | No | Encryption type (`"AES256"` or `"aws:kms"`) |
| `fileFormat` | <code>FileFormat</code> | No | The file format to use for serializing record content. Overrides the format inferred from the object key extension |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->putObject("my-app-data", "data.json", {"orderId": "ORD-123", "total": 129.99});
```

</details>

<details>
<summary>putObjectAsStream</summary>

Uploads an S3 object from a byte stream. Use this for large files to avoid loading the entire content into memory. The `contentLength` parameter is required.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `contentStream` | <code>stream&#60;byte[], error?&#62;</code> | Yes | The content stream to upload |
| `contentLength` | <code>int</code> | Yes | The size of the content in bytes |
| `contentType` | <code>string</code> | No | The MIME type of the content |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for this object. Defaults to `PRIVATE` |
| `storageClass` | <code>StorageClass</code> | No | The storage class of the object. Defaults to `STANDARD` |
| `metadata` | <code>map&#60;string&#62;</code> | No | Custom data to attach to the object |
| `cacheControl` | <code>string</code> | No | Specifies caching behavior along the request/reply chain |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object |
| `contentEncoding` | <code>string</code> | No | Specifies what content encodings have been applied to the object |
| `contentLanguage` | <code>string</code> | No | The language the content is in |
| `expires` | <code>string</code> | No | The date and time at which the object is no longer cacheable |
| `tagging` | <code>string</code> | No | Tags for the object |
| `serverSideEncryption` | <code>string</code> | No | Encryption type (`"AES256"` or `"aws:kms"`) |
| `fileFormat` | <code>FileFormat</code> | No | The file format to use for serializing record content |

**Returns:** `Error?`

**Sample code:**

```ballerina
stream<byte[], error?> fileStream = check io:fileReadBlocksAsStream("/tmp/large-file.bin");
check client->putObjectAsStream("my-app-data", "large-file.bin", fileStream, contentLength = 52428800);
```

</details>

<details>
<summary>getObject</summary>

Downloads an S3 object from a bucket with automatic type deserialization. The return type is inferred from the variable on the left-hand side. Supported target types:

- Built-in types: `byte[]`, `string`, `json`, `xml`
- Custom record types (e.g., `User`): deserialized from JSON for `.json` object keys and from XML for `.xml` object keys
- Record arrays (e.g., `User[]`) and `stream<record {}, error?>`: deserialized from CSV with the first row as headers for `.csv` object keys
- `stream<byte[], error?>`: retrieves large objects without loading the entire content into memory

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `targetType` | <code>typedesc&#60;RetrievableType&#62;</code> | No | Expected return type for automatic data binding. Inferred from the assignment target |
| `versionId` | <code>string</code> | No | Get a specific version of the object (when versioning is enabled) |
| `range` | <code>string</code> | No | Downloads the specified byte range of an object (e.g., `"bytes=0-1023"`) |
| `ifMatch` | <code>string</code> | No | Return the object only if its ETag matches the one specified |
| `ifNoneMatch` | <code>string</code> | No | Return the object only if its ETag differs from the one specified |
| `ifModifiedSince` | <code>string</code> | No | Return the object only if it has been modified since the specified time (e.g., `"2024-01-15T00:00:00Z"`) |
| `ifUnmodifiedSince` | <code>string</code> | No | Return the object only if it has not been modified since the specified time |
| `partNumber` | <code>int</code> | No | The part number of the file part to retrieve |
| `responseContentType` | <code>string</code> | No | Override the MIME type of the content in the response |
| `responseContentDisposition` | <code>string</code> | No | Override the presentational information for the object in the response |

**Returns:** `RetrievableType|Error`

**Sample code:**

```ballerina
json data = check client->getObject("my-app-data", "data.json");
```

**Sample response:**

```json
{
  "orderId": "ORD-123",
  "total": 129.99,
  "status": "shipped"
}
```

</details>

<details>
<summary>deleteObject</summary>

Deletes an S3 object from a bucket. Supports versioned buckets via `versionId` and MFA-protected deletion.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `versionId` | <code>string</code> | No | Delete a specific version of the object (when versioning is enabled) |
| `mfa` | <code>string</code> | No | Multi-factor authentication token (needed if MFA Delete is turned on for the bucket) |
| `bypassGovernanceRetention` | <code>boolean</code> | No | Skip the lock protection and delete the object even if it is protected (use with caution) |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->deleteObject("my-app-data", "reports/old-report.csv");
```

</details>

<details>
<summary>listObjects</summary>

Lists S3 objects in a bucket. Supports prefix filtering, delimiter-based grouping (folder simulation), and pagination via continuation tokens.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `prefix` | <code>string</code> | No | Filter objects that start with this value (e.g., `"reports/"` for all objects in the reports folder) |
| `delimiter` | <code>string</code> | No | Character to group object keys (e.g., `"/"` to list like folders) |
| `maxKeys` | <code>int</code> | No | Maximum number of objects to return (1–1000) |
| `continuationToken` | <code>string</code> | No | Token to get the next page of results (from a previous `isTruncated` response) |
| `startAfter` | <code>string</code> | No | List objects after this key name |
| `fetchOwner` | <code>boolean</code> | No | Include owner information in the results |
| `encodingType` | <code>string</code> | No | Encoding type for object keys (e.g., `"url"`) |

**Returns:** `ListObjectsResponse|Error`

**Sample code:**

```ballerina
s3:ListObjectsResponse response = check client->listObjects("my-app-data", prefix = "reports/");
```

**Sample response:**

```json
{
  "objects": [
    {
      "key": "reports/q1-2024.csv",
      "size": 4096,
      "lastModified": "2024-03-31T12:00:00.000Z",
      "eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
      "storageClass": "STANDARD"
    },
    {
      "key": "reports/q2-2024.csv",
      "size": 5120,
      "lastModified": "2024-06-30T12:00:00.000Z",
      "eTag": "\"a87ff679a2f3e71d9181a67b7542122c\"",
      "storageClass": "STANDARD"
    }
  ],
  "count": 2,
  "isTruncated": false
}
```

</details>

<details>
<summary>copyObject</summary>

Copies an S3 object from one location to another within or across buckets. Supports metadata replacement, conditional copies, and storage class changes on the destination.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sourceBucket` | <code>string</code> | Yes | The source bucket name |
| `sourceKey` | <code>string</code> | Yes | The source object path |
| `destinationBucket` | <code>string</code> | Yes | The destination bucket name |
| `destinationKey` | <code>string</code> | Yes | The destination object path |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for the copied object. Defaults to `PRIVATE` |
| `storageClass` | <code>StorageClass</code> | No | Storage class for the copied object. Defaults to `STANDARD` |
| `metadataDirective` | <code>string</code> | No | `"COPY"` to keep the original metadata or `"REPLACE"` to use new metadata |
| `metadata` | <code>map&#60;string&#62;</code> | No | New metadata for the copied object (only used when `metadataDirective` is `"REPLACE"`) |
| `contentType` | <code>string</code> | No | The MIME type of the copied object |
| `cacheControl` | <code>string</code> | No | Specifies caching behavior along the request/reply chain |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object |
| `contentEncoding` | <code>string</code> | No | Specifies what content encodings have been applied to the object |
| `tagging` | <code>string</code> | No | Tags for the copied object (e.g., `"env=prod&team=finance"`) |
| `copySourceIfMatch` | <code>string</code> | No | Copy only if the source ETag matches the one specified |
| `copySourceIfNoneMatch` | <code>string</code> | No | Copy only if the source ETag differs from the one specified |
| `copySourceIfModifiedSince` | <code>string</code> | No | Copy only if the source has been modified since the specified time |
| `copySourceIfUnmodifiedSince` | <code>string</code> | No | Copy only if the source has not been modified since the specified time |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->copyObject("my-app-data", "reports/q1-2024.csv", "my-backups", "archive/2024/q1.csv");
```

</details>

<details>
<summary>doesObjectExist</summary>

Checks whether an S3 object exists in a bucket without downloading it. Returns `true` if it exists, `false` if not found, or an `Error` on request or transport failures.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |

**Returns:** `boolean|Error`

**Sample code:**

```ballerina
boolean exists = check client->doesObjectExist("my-app-data", "reports/q1-2024.csv");
```

**Sample response:**

```json
true
```

</details>

<details>
<summary>getObjectMetadata</summary>

Retrieves metadata for an S3 object without downloading its content. Equivalent to an HTTP HEAD request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `versionId` | <code>string</code> | No | Get metadata for a specific version of the object (when versioning is enabled) |
| `partNumber` | <code>int</code> | No | The part number of the file part to get metadata for |
| `ifMatch` | <code>string</code> | No | Return the metadata only if its ETag matches the one specified |
| `ifNoneMatch` | <code>string</code> | No | Return the metadata only if its ETag differs from the one specified |
| `ifModifiedSince` | <code>string</code> | No | Return the metadata only if the object has been modified since the specified time |
| `ifUnmodifiedSince` | <code>string</code> | No | Return the metadata only if the object has not been modified since the specified time |

**Returns:** `ObjectMetadata|Error`

**Sample code:**

```ballerina
s3:ObjectMetadata metadata = check client->getObjectMetadata("my-app-data", "reports/q1-2024.csv");
```

**Sample response:**

```json
{
  "key": "reports/q1-2024.csv",
  "contentLength": 4096,
  "contentType": "text/csv",
  "eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"",
  "lastModified": "2024-03-31T12:00:00.000Z",
  "storageClass": "STANDARD",
  "versionId": "3HL4kqtJlcpXrof3vjVBH40Nk3",
  "userMetadata": {
    "author": "John",
    "project": "quarterly-reports"
  }
}
```

</details>

#### Presigned URLs

<details>
<summary>createPresignedUrl</summary>

Creates a presigned URL for time-limited, credential-free access to an S3 object. Use `httpMethod = "GET"` to generate a download URL and `httpMethod = "PUT"` to generate an upload URL. The default validity is 15 minutes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `expirationMinutes` | <code>int</code> | No | How long the URL is valid in minutes. Defaults to `15`. Maximum is `10080` (7 days) |
| `httpMethod` | <code>HttpMethod</code> | No | The HTTP method the URL allows: `"GET"` to download or `"PUT"` to upload. Defaults to `GET` |
| `contentType` | <code>string</code> | No | The MIME type of the content (for PUT requests) |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object (for GET requests) |
| `responseContentType` | <code>string</code> | No | Override the file type when downloading (for GET requests) |
| `versionId` | <code>string</code> | No | Generate a URL for a specific version of the object (when versioning is enabled) |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string url = check client->createPresignedUrl("my-app-data", "reports/q1-2024.csv", expirationMinutes = 60);
```

**Sample response:**

```json
"https://my-app-data.s3.us-east-1.amazonaws.com/reports/q1-2024.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20240331%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240331T120000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=abc123..."
```

</details>

#### Multipart Uploads

<details>
<summary>createMultipartUpload</summary>

Initiates a multipart upload session for a large object. Returns an upload ID that must be passed to subsequent `uploadPart`, `completeMultipartUpload`, or `abortMultipartUpload` calls. Each part must be at least 5 MB except the last.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `contentType` | <code>string</code> | No | The MIME type of the content |
| `acl` | <code>CannedACL</code> | No | Specifies accessibility for this object. Defaults to `PRIVATE` |
| `storageClass` | <code>StorageClass</code> | No | The storage class of the object. Defaults to `STANDARD` |
| `metadata` | <code>map&#60;string&#62;</code> | No | Custom data to attach to the object |
| `cacheControl` | <code>string</code> | No | Specifies caching behavior along the request/reply chain |
| `contentDisposition` | <code>string</code> | No | Specifies presentational information for the object |
| `contentEncoding` | <code>string</code> | No | Specifies what content encodings have been applied to the object |
| `tagging` | <code>string</code> | No | Tags for the object (e.g., `"env=prod&team=finance"`) |
| `serverSideEncryption` | <code>string</code> | No | Encryption type (`"AES256"` or `"aws:kms"`) |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string uploadId = check client->createMultipartUpload("my-app-data", "large-dataset.csv");
```

**Sample response:**

```json
"VXBsb2FkIElEIGZvciBteS1vYmplY3Q"
```

</details>

<details>
<summary>uploadPart</summary>

Uploads a single part in an ongoing multipart upload. Returns the ETag of the uploaded part, which must be collected and passed to `completeMultipartUpload`. Part numbers must be between 1 and 10000.

Supported content types: `byte[]`, `string`, `json`, `xml`, `record {}`, `record {}[]`, `stream<byte[], error?>`, and `stream<record {}, error?>`.

- `record {}` requires a `.json` or `.xml` object key (or explicit `fileFormat`)
- `record {}[]` and `stream<record {}, error?>` require a `.csv` object key
- `stream<byte[], error?>` is collected into bytes before uploading

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `uploadId` | <code>string</code> | Yes | The upload ID returned by `createMultipartUpload` |
| `partNumber` | <code>int</code> | Yes | The part number (1–10000). Parts are assembled in ascending order by part number |
| `content` | <code>UploadContent</code> | Yes | The part content. Accepted types: `byte[]`, `string`, `json`, `xml`, `record &#123;&#125;`, `record &#123;&#125;[]`, `stream&#60;byte[], error?&#62;`, `stream&#60;record &#123;&#125;, error?&#62;` |
| `contentLength` | <code>int</code> | No | Size of the part in bytes |
| `contentMD5` | <code>string</code> | No | MD5 hash of the part content for data integrity verification |
| `fileFormat` | <code>FileFormat</code> | No | The file format to use for serializing record content. Overrides the format inferred from the object key extension |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string etag1 = check client->uploadPart("my-app-data", "large-dataset.csv", uploadId, 1, part1Bytes);
```

**Sample response:**

```json
"\"a54357aff0632cce46d942af68356b38\""
```

</details>

<details>
<summary>uploadPartAsStream</summary>

Uploads a single part as a byte stream in an ongoing multipart upload. Use this to stream large parts without loading them fully into memory. The `contentLength` parameter is required.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `uploadId` | <code>string</code> | Yes | The upload ID returned by `createMultipartUpload` |
| `partNumber` | <code>int</code> | Yes | The part number (1–10000) |
| `contentStream` | <code>stream&#60;byte[], error?&#62;</code> | Yes | The content stream for this part |
| `contentLength` | <code>int</code> | Yes | Size of the part in bytes |
| `contentMD5` | <code>string</code> | No | MD5 hash of the part content for data integrity verification |
| `fileFormat` | <code>FileFormat</code> | No | The file format to use for serializing record content |

**Returns:** `string|Error`

**Sample code:**

```ballerina
stream<byte[], error?> partStream = check io:fileReadBlocksAsStream("/tmp/part1.bin");
string etag1 = check client->uploadPartAsStream("my-app-data", "large-dataset.csv", uploadId, 1, partStream, contentLength = 5242880);
```

**Sample response:**

```json
"\"b6d81b360a5672d80c27430f39153e2c\""
```

</details>

<details>
<summary>completeMultipartUpload</summary>

Completes a multipart upload by assembling all previously uploaded parts into the final object. The `partNumbers` and `etags` arrays must correspond to each other by index and must include every part uploaded.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `uploadId` | <code>string</code> | Yes | The upload ID returned by `createMultipartUpload` |
| `partNumbers` | <code>int[]</code> | Yes | Array of part numbers in the order they were uploaded |
| `etags` | <code>string[]</code> | Yes | Array of ETags corresponding to each part number |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->completeMultipartUpload("my-app-data", "large-dataset.csv", uploadId, [1, 2, 3], [etag1, etag2, etag3]);
```

</details>

<details>
<summary>abortMultipartUpload</summary>

Aborts an in-progress multipart upload and releases all storage associated with the uploaded parts. Call this if the upload fails or is cancelled to avoid incurring storage charges for partial uploads.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | <code>string</code> | Yes | The name of the bucket |
| `objectKey` | <code>string</code> | Yes | The path of the object within the bucket |
| `uploadId` | <code>string</code> | Yes | The upload ID returned by `createMultipartUpload` |

**Returns:** `Error?`

**Sample code:**

```ballerina
check client->abortMultipartUpload("my-app-data", "large-dataset.csv", uploadId);
```

</details>
