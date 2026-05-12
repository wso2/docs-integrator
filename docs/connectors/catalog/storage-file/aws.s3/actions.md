---
title: Actions
---

# Actions

The `ballerinax/aws.s3` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides operations to manage S3 buckets and objects via the Amazon S3 REST API. |

---

## Client

Provides operations to manage S3 buckets and objects via the Amazon S3 REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyId` | `string` | Required | Access key ID of the AWS account. |
| `secretAccessKey` | `string` | Required | Secret access key of the AWS account. |
| `region` | `string` | `"us-east-1"` | AWS region for S3 operations (e.g., `us-east-1`, `eu-west-1`). |
| `httpVersion` | `http:HttpVersion` | `HTTP_1_1` | HTTP protocol version. |
| `http1Settings` | `ClientHttp1Settings` | `()` | HTTP/1.x protocol settings (keep-alive, chunking, proxy). |
| `http2Settings` | `http:ClientHttp2Settings` | `()` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Connection timeout in seconds. |
| `forwarded` | `string` | `"disable"` | `forwarded` / `x-forwarded` header behaviour. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection-pool settings. |
| `cache` | `http:CacheConfig` | `()` | Response caching settings. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | `accept-encoding` handling. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit-breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings for failed requests. |
| `responseLimits` | `http:ResponseLimitConfigs` | `()` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation (constraint package). |

> `http:*` types come from `ballerina/http`; `ClientHttp1Settings` comes from `ballerinax/client.config`.

### Initializing the client

```ballerina
import ballerinax/aws.s3;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string region = ?;

s3:Client s3Client = check new ({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});
```

### Operations

#### Bucket operations

<details>
<summary>listBuckets</summary>

Retrieves a list of all S3 buckets owned by the authenticated user.

Returns: `Bucket[]|error`

Sample code:

```ballerina
s3:Bucket[] buckets = check s3Client->listBuckets();
```

Sample response:

```ballerina
[{"name": "my-app-data", "creationDate": "2024-01-15T10:30:00.000Z"}, {"name": "my-logs-bucket", "creationDate": "2024-03-22T08:15:00.000Z"}]
```

</details>

<details>
<summary>createBucket</summary>

Creates a new S3 bucket with the specified name and optional canned ACL.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | A globally unique name for the new bucket. |
| `cannedACL` | `CannedACL?` | No | The canned access control list for the bucket (e.g., `ACL_PRIVATE`, `ACL_PUBLIC_READ`). |

Returns: `error?`

Sample code:

```ballerina
check s3Client->createBucket("my-new-bucket");
```

</details>

<details>
<summary>deleteBucket</summary>

Deletes the specified S3 bucket. The bucket must be empty before deletion.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket to delete. |

Returns: `error?`

Sample code:

```ballerina
check s3Client->deleteBucket("my-old-bucket");
```

</details>

#### Object operations

<details>
<summary>listObjects</summary>

Retrieves a list of objects in the specified bucket with optional filtering and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket. |
| `delimiter` | `string?` | No | A character used to group keys (e.g., `/` for directory-like listing). |
| `encodingType` | `string?` | No | The encoding method for the response. |
| `maxKeys` | `int?` | No | Maximum number of keys to return. |
| `prefix` | `string?` | No | Limits results to keys beginning with this prefix. |
| `startAfter` | `string?` | No | Object key from which to begin listing. |
| `fetchOwner` | `boolean?` | No | Set to `true` to include owner information in the response. |
| `continuationToken` | `string?` | No | Token for paginating through truncated results. |

Returns: `S3Object[]|error`

Sample code:

```ballerina
s3:S3Object[] objects = check s3Client->listObjects("my-bucket", prefix = "documents/");
```

Sample response:

```ballerina
[{"objectName": "documents/report.pdf", "lastModified": "2024-06-01T12:00:00.000Z", "eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "objectSize": "1048576", "storageClass": "STANDARD"}]
```

</details>

<details>
<summary>createObject</summary>

Creates (uploads) a new object in the specified bucket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket. |
| `objectName` | `string` | Yes | The key (name) for the new object. |
| `payload` | `string\|xml\|json\|byte[]\|stream&lt;io:Block, io:Error?&gt;` | Yes | The content to upload. |
| `cannedACL` | `CannedACL?` | No | Canned ACL for the object. |
| `objectCreationHeaders` | `ObjectCreationHeaders?` | No | Optional headers such as `contentType`, `cacheControl`, `contentEncoding`. |
| `userMetadataHeaders` | `map&lt;string&gt;` | No | User-defined metadata key-value pairs to attach to the object. |

Returns: `error?`

Sample code:

```ballerina
check s3Client->createObject("my-bucket", "documents/greeting.txt", "Hello, World!");
```

</details>

<details>
<summary>getObject</summary>

Retrieves an object from the specified bucket as a byte stream.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket. |
| `objectName` | `string` | Yes | The key of the object to retrieve. |
| `objectRetrievalHeaders` | `ObjectRetrievalHeaders?` | No | Optional conditional headers (e.g., `modifiedSince`, `ifMatch`, `range`). |
| `byteArraySize` | `int?` | No | Size of each byte array chunk in the stream. Default is 8KB. |

Returns: `stream<byte[], io:Error?>|error`

Sample code:

```ballerina
stream<byte[], io:Error?> objectStream = check s3Client->getObject("my-bucket", "documents/greeting.txt");
byte[] content = [];
check from byte[] chunk in objectStream
    do {
        content.push(...chunk);
    };
```

Resulting `content` after consuming the stream:

```ballerina
[72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
```

</details>

<details>
<summary>deleteObject</summary>

Deletes an object from the specified bucket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket. |
| `objectName` | `string` | Yes | The key of the object to delete. |
| `versionId` | `string?` | No | The version ID of the object to delete (for versioned buckets). |

Returns: `error?`

Sample code:

```ballerina
check s3Client->deleteObject("my-bucket", "documents/greeting.txt");
```

</details>

#### Presigned URLs

<details>
<summary>createPresignedUrl</summary>

Generates a presigned URL for time-limited access to an S3 object without requiring credentials.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `bucketName` | `string` | Yes | The name of the bucket. |
| `objectName` | `string` | Yes | The key of the object. |
| `action` | `ObjectAction\|ObjectCreationHeaders\|ObjectRetrievalHeaders` | Yes | The action: `RETRIEVE` for download, `CREATE` for upload, or the relevant headers record. |
| `expires` | `int` | No | Validity period in seconds. Default is `1800` (30 minutes). |
| `partNo` | `int?` | No | Part number for multipart uploads. |
| `uploadId` | `string?` | No | Upload ID for multipart uploads. |

Returns: `string|error`

Sample code:

```ballerina
string presignedUrl = check s3Client->createPresignedUrl("my-bucket", "documents/report.pdf", s3:RETRIEVE, 3600);
```

Sample response:

```ballerina
"https://s3.amazonaws.com/my-bucket/documents/report.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA.../20240601/us-east-1/s3/aws4_request&X-Amz-Date=20240601T120000Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=abc123..."
```

> Note: `us-east-1` uses the global endpoint `s3.amazonaws.com`. For other regions, the host is `s3.<region>.amazonaws.com`.

</details>

#### Multipart upload

<details>
<summary>createMultipartUpload</summary>

Initiates a multipart upload and returns an upload ID for subsequent part uploads.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectName` | `string` | Yes | The key of the object. |
| `bucketName` | `string` | Yes | The name of the bucket. |
| `cannedACL` | `CannedACL?` | No | Canned ACL for the object. |
| `multipartUploadHeaders` | `MultipartUploadHeaders?` | No | Optional headers such as `contentType`, `cacheControl`. |

Returns: `string|error`

Sample code:

```ballerina
string uploadId = check s3Client->createMultipartUpload("large-file.zip", "my-bucket");
```

Sample response:

```ballerina
"VXBsb2FkSWQtZXhhbXBsZQ"
```

</details>

<details>
<summary>uploadPart</summary>

Uploads a single part of a multipart upload. Returns a CompletedPart record with the part number and ETag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectName` | `string` | Yes | The key of the object. |
| `bucketName` | `string` | Yes | The name of the bucket. |
| `payload` | `string\|xml\|json\|byte[]\|stream&lt;io:Block, io:Error?&gt;` | Yes | The part content. |
| `uploadId` | `string` | Yes | The upload ID from `createMultipartUpload`. |
| `partNumber` | `int` | Yes | The sequential part number (starting from 1). |
| `uploadPartHeaders` | `UploadPartHeaders?` | No | Optional headers such as `contentLength`, `contentMD5`. |

Returns: `CompletedPart|error`

Sample code:

```ballerina
s3:CompletedPart part1 = check s3Client->uploadPart("large-file.zip", "my-bucket", partData1, uploadId, 1);
```

Sample response:

```ballerina
{"partNumber": 1, "ETag": "\"a54357aff0632cce46d942af68356b38\""}
```

</details>

<details>
<summary>completeMultipartUpload</summary>

Completes a multipart upload by assembling all previously uploaded parts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectName` | `string` | Yes | The key of the object. |
| `bucketName` | `string` | Yes | The name of the bucket. |
| `uploadId` | `string` | Yes | The upload ID from `createMultipartUpload`. |
| `completedParts` | `CompletedPart[]` | Yes | Array of CompletedPart records (part number and ETag) for each uploaded part. |

Returns: `error?`

Sample code:

```ballerina
check s3Client->completeMultipartUpload("large-file.zip", "my-bucket", uploadId, [part1, part2, part3]);
```

</details>

<details>
<summary>abortMultipartUpload</summary>

Aborts an in-progress multipart upload, freeing any uploaded parts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectName` | `string` | Yes | The key of the object. |
| `bucketName` | `string` | Yes | The name of the bucket. |
| `uploadId` | `string` | Yes | The upload ID to abort. |

Returns: `error?`

Sample code:

```ballerina
check s3Client->abortMultipartUpload("large-file.zip", "my-bucket", uploadId);
```

</details>
