---
title: Actions
---

# Actions

The `ballerinax/alfresco` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the core features of Alfresco Content Services via the REST API. |

---

## Client

Provides access to the core features of Alfresco Content Services via the REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig` | Required | Basic authentication credentials (username and password). |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS-related options. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching related configurations. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Specifies the way of handling compression (`accept-encoding`) header. |

### Initializing the client

```ballerina
import ballerinax/alfresco;

configurable string username = ?;
configurable string password = ?;
configurable string serviceUrl = ?;

alfresco:Client alfrescoClient = check new ({
    auth: {
        username,
        password
    }
}, serviceUrl);
```

### Operations

#### Node operations

<details>
<summary>getNode</summary>

Retrieves metadata for a node by its ID. Supports well-known aliases: `-my-`, `-shared-`, `-root-`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of a node. You can also use aliases: `-my-`, `-shared-`, `-root-`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry nodeResponse = check alfrescoClient->getNode("-root-");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "d4f0a4b2-1a3e-4c5f-9b8e-7d6c5e4f3a2b",
    "name": "Company Home",
    "nodeType": "cm:folder",
    "isFolder": true,
    "isFile": false,
    "isLocked": false,
    "modifiedAt": "2025-03-15T10:30:00.000+0000",
    "createdAt": "2024-01-01T00:00:00.000+0000",
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>createNode</summary>

Creates a new node (file or folder) as a child of the specified parent node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the parent node. Supports aliases: `-my-`, `-shared-`, `-root-`. |
| `payload` | `NodeBodyCreate` | Yes | The node information to create, including `name`, `nodeType`, and optional `properties`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateNodeQueries` | No | Query parameters including `autoRename`, `include`, and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeBodyCreate payload = {
    name: "hello.txt",
    nodeType: "cm:content",
    aspectNames: ["cm:titled"],
    properties: {
        "cm:title": "hello.txt"
    }
};
alfresco:NodeEntry createdNode = check alfrescoClient->createNode("-root-", payload);
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "modifiedAt": "2025-06-01T12:00:00.000+0000",
    "createdAt": "2025-06-01T12:00:00.000+0000",
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"},
    "parentId": "d4f0a4b2-1a3e-4c5f-9b8e-7d6c5e4f3a2b"
  }
}
```

</details>

<details>
<summary>updateNode</summary>

Updates the metadata of an existing node (e.g., name, properties, permissions).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to update. |
| `payload` | `NodeBodyUpdate` | Yes | The node information to update. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry updatedNode = check alfrescoClient->updateNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    name: "renamed-hello.txt",
    properties: {
        "cm:title": "Renamed Document"
    }
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "renamed-hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "modifiedAt": "2025-06-01T12:30:00.000+0000",
    "createdAt": "2025-06-01T12:00:00.000+0000",
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>deleteNode</summary>

Deletes the specified node. By default, moves the node to the trash can (archive).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to delete. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `DeleteNodeQueries` | No | Query parameters including `permanent` (boolean to permanently delete instead of archiving). |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

</details>

<details>
<summary>listNodeChildren</summary>

Lists the child nodes of a specified parent node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the parent node. Supports aliases: `-my-`, `-shared-`, `-root-`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListNodeChildrenQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, `where`, `include`, and `fields`. |

Returns: `NodeChildAssociationPaging|error`

Sample code:

```ballerina
alfresco:NodeChildAssociationPaging children = check alfrescoClient->listNodeChildren("-root-");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "abc123", "name": "Documents", "nodeType": "cm:folder", "isFolder": true, "isFile": false}},
      {"entry": {"id": "def456", "name": "Shared", "nodeType": "cm:folder", "isFolder": true, "isFile": false}}
    ]
  }
}
```

</details>

<details>
<summary>copyNode</summary>

Copies a node to a new target parent. Optionally renames the copy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to copy. |
| `payload` | `NodeBodyCopy` | Yes | The `targetParentId` and, optionally, a new `name`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CopyNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry copiedNode = check alfrescoClient->copyNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    targetParentId: "d4f0a4b2-1a3e-4c5f-9b8e-7d6c5e4f3a2b",
    name: "hello-copy.txt"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "f7e8d9c0-b1a2-3456-7890-abcdef123456",
    "name": "hello-copy.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>moveNode</summary>

Moves a node to a new target parent. Optionally renames the node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to move. |
| `payload` | `NodeBodyMove` | Yes | The `targetParentId` and, optionally, a new `name`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `MoveNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry movedNode = check alfrescoClient->moveNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    targetParentId: "bbb222-ccc333-ddd444"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "parentId": "bbb222-ccc333-ddd444",
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>lockNode</summary>

Locks a node to prevent concurrent modifications.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to lock. |
| `payload` | `NodeBodyLock` | Yes | Lock details including `timeToExpire`, `type`, and `lifetime`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `LockNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry lockedNode = check alfrescoClient->lockNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    timeToExpire: 300,
    'type: "ALLOW_OWNER_CHANGES",
    lifetime: "PERSISTENT"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": true,
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>unlockNode</summary>

Unlocks a previously locked node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node to unlock. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UnlockNodeQueries` | No | Query parameters including `include` and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry unlockedNode = check alfrescoClient->unlockNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

#### Node content operations

<details>
<summary>getNodeContent</summary>

Retrieves the binary content of a node (file download).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `GetNodeContentHeaders` | No | Headers including `If-Modified-Since` and `Range`. |
| `queries` | `GetNodeContentQueries` | No | Query parameters including `attachment`. |

Returns: `byte[]|error?`

Sample code:

```ballerina
byte[]? fileContent = check alfrescoClient->getNodeContent("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
<binary content bytes>
```

</details>

<details>
<summary>updateNodeContent</summary>

Updates the binary content of a node (file upload/replace).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `payload` | `byte[]` | Yes | The binary content to upload. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateNodeContentQueries` | No | Query parameters including `majorVersion`, `comment`, `name`, `include`, and `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
import ballerina/io;

byte[] fileContent = check io:fileReadBytes("resources/hello.txt");
alfresco:NodeEntry result = check alfrescoClient->updateNodeContent("a1b2c3d4-e5f6-7890-abcd-ef1234567890", fileContent);
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "content": {
      "mimeType": "text/plain",
      "mimeTypeName": "Plain Text",
      "sizeInBytes": 1024,
      "encoding": "UTF-8"
    },
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

#### Comment operations

<details>
<summary>listComments</summary>

Lists comments on a specified node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCommentsQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `CommentPaging|error`

Sample code:

```ballerina
alfresco:CommentPaging comments = check alfrescoClient->listComments("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {
        "entry": {
          "id": "comment-001",
          "content": "Please review this document.",
          "title": "",
          "createdAt": "2025-06-01T12:00:00.000+0000",
          "modifiedAt": "2025-06-01T12:00:00.000+0000",
          "createdBy": {"id": "admin", "displayName": "Administrator"},
          "modifiedBy": {"id": "admin", "displayName": "Administrator"},
          "edited": false,
          "canEdit": true,
          "canDelete": true
        }
      }
    ]
  }
}
```

</details>

<details>
<summary>createComment</summary>

Creates a new comment on a specified node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `payload` | `CommentBody` | Yes | The comment text. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateCommentQueries` | No | Query parameters including `fields`. |

Returns: `CommentEntry|error`

Sample code:

```ballerina
alfresco:CommentEntry comment = check alfrescoClient->createComment("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    content: "Please review this document."
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "comment-002",
    "content": "Please review this document.",
    "title": "",
    "createdAt": "2025-06-01T14:00:00.000+0000",
    "modifiedAt": "2025-06-01T14:00:00.000+0000",
    "createdBy": {"id": "admin", "displayName": "Administrator"},
    "modifiedBy": {"id": "admin", "displayName": "Administrator"},
    "edited": false,
    "canEdit": true,
    "canDelete": true
  }
}
```

</details>

<details>
<summary>updateComment</summary>

Updates the content of an existing comment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `commentId` | `string` | Yes | The identifier of the comment. |
| `payload` | `CommentBody` | Yes | The updated comment text. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateCommentQueries` | No | Query parameters including `fields`. |

Returns: `CommentEntry|error`

Sample code:

```ballerina
alfresco:CommentEntry updated = check alfrescoClient->updateComment("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "comment-002", {
    content: "Updated comment text."
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "comment-002",
    "content": "Updated comment text.",
    "title": "",
    "createdAt": "2025-06-01T14:00:00.000+0000",
    "modifiedAt": "2025-06-01T14:30:00.000+0000",
    "createdBy": {"id": "admin", "displayName": "Administrator"},
    "modifiedBy": {"id": "admin", "displayName": "Administrator"},
    "edited": true,
    "canEdit": true,
    "canDelete": true
  }
}
```

</details>

<details>
<summary>deleteComment</summary>

Deletes a comment from a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `commentId` | `string` | Yes | The identifier of the comment. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteComment("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "comment-002");
```

</details>

#### Tag operations

<details>
<summary>listTagsForNode</summary>

Lists all tags assigned to a specific node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListTagsForNodeQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `TagPaging|error`

Sample code:

```ballerina
alfresco:TagPaging tags = check alfrescoClient->listTagsForNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "tag-001", "tag": "important"}}
    ]
  }
}
```

</details>

<details>
<summary>createTagForNode</summary>

Creates and assigns a new tag to a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `payload` | `TagBody` | Yes | The tag value. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateTagForNodeQueries` | No | Query parameters including `fields`. |

Returns: `TagEntry|error`

Sample code:

```ballerina
alfresco:TagEntry tag = check alfrescoClient->createTagForNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    tag: "important"
});
```

Sample response:

```ballerina
{"entry": {"id": "tag-001", "tag": "important"}}
```

</details>

<details>
<summary>deleteTagFromNode</summary>

Removes a tag from a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `tagId` | `string` | Yes | The identifier of the tag. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteTagFromNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "tag-001");
```

</details>

<details>
<summary>listTags</summary>

Lists all tags in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListTagsQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `TagPaging|error`

Sample code:

```ballerina
alfresco:TagPaging allTags = check alfrescoClient->listTags();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 3, "hasMoreItems": false, "totalItems": 3, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "tag-001", "tag": "important"}},
      {"entry": {"id": "tag-002", "tag": "draft"}},
      {"entry": {"id": "tag-003", "tag": "archived"}}
    ]
  }
}
```

</details>

<details>
<summary>getTag</summary>

Retrieves a tag by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tagId` | `string` | Yes | The identifier of the tag. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetTagQueries` | No | Query parameters including `fields`. |

Returns: `TagEntry|error`

Sample code:

```ballerina
alfresco:TagEntry tag = check alfrescoClient->getTag("tag-001");
```

Sample response:

```ballerina
{"entry": {"id": "tag-001", "tag": "important"}}
```

</details>

<details>
<summary>updateTag</summary>

Updates the value of an existing tag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tagId` | `string` | Yes | The identifier of the tag. |
| `payload` | `TagBody` | Yes | The new tag value. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateTagQueries` | No | Query parameters including `fields`. |

Returns: `TagEntry|error`

Sample code:

```ballerina
alfresco:TagEntry updatedTag = check alfrescoClient->updateTag("tag-001", {
    tag: "critical"
});
```

Sample response:

```ballerina
{"entry": {"id": "tag-001", "tag": "critical"}}
```

</details>

#### Rating operations

<details>
<summary>listRatings</summary>

Lists all ratings for a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRatingsQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `RatingPaging|error`

Sample code:

```ballerina
alfresco:RatingPaging ratings = check alfrescoClient->listRatings("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "likes", "aggregate": {"numberOfRatings": 3}, "myRating": true}}
    ]
  }
}
```

</details>

<details>
<summary>createRating</summary>

Creates a rating for a node. Supports `likes` (boolean) and `fiveStar` (integer) schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `payload` | `RatingBody` | Yes | The rating value: boolean for likes, integer for fiveStar. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateRatingQueries` | No | Query parameters including `fields`. |

Returns: `RatingEntry|error`

Sample code:

```ballerina
alfresco:RatingEntry rating = check alfrescoClient->createRating("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    id: "likes",
    myRating: true
});
```

Sample response:

```ballerina
{"entry": {"id": "likes", "aggregate": {"numberOfRatings": 4}, "myRating": true}}
```

</details>

<details>
<summary>getRating</summary>

Retrieves a specific rating for a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `ratingId` | `string` | Yes | The identifier of the rating (e.g., `likes` or `fiveStar`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetRatingQueries` | No | Query parameters including `fields`. |

Returns: `RatingEntry|error`

Sample code:

```ballerina
alfresco:RatingEntry rating = check alfrescoClient->getRating("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "likes");
```

Sample response:

```ballerina
{"entry": {"id": "likes", "aggregate": {"numberOfRatings": 4}, "myRating": true}}
```

</details>

<details>
<summary>deleteRating</summary>

Removes the current user's rating from a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `ratingId` | `string` | Yes | The identifier of the rating. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteRating("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "likes");
```

</details>

#### Version operations

<details>
<summary>listVersionHistory</summary>

Lists the version history of a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListVersionHistoryQueries` | No | Query parameters including `skipCount`, `maxItems`, `include`, and `fields`. |

Returns: `VersionPaging|error`

Sample code:

```ballerina
alfresco:VersionPaging versions = check alfrescoClient->listVersionHistory("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "2.0", "versionComment": "Updated content", "name": "hello.txt", "nodeType": "cm:content", "isFolder": false, "isFile": true, "modifiedAt": "2025-06-01T14:00:00.000+0000", "modifiedByUser": {"id": "admin", "displayName": "Administrator"}, "content": {"mimeType": "text/plain", "sizeInBytes": 2048}}},
      {"entry": {"id": "1.0", "versionComment": "Initial version", "name": "hello.txt", "nodeType": "cm:content", "isFolder": false, "isFile": true, "modifiedAt": "2025-06-01T12:00:00.000+0000", "modifiedByUser": {"id": "admin", "displayName": "Administrator"}, "content": {"mimeType": "text/plain", "sizeInBytes": 1024}}}
    ]
  }
}
```

</details>

<details>
<summary>getVersion</summary>

Retrieves metadata for a specific version of a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `versionId` | `string` | Yes | The version identifier (e.g., `1.0`, `2.0`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `VersionEntry|error`

Sample code:

```ballerina
alfresco:VersionEntry version = check alfrescoClient->getVersion("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "1.0");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "1.0",
    "versionComment": "Initial version",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "modifiedAt": "2025-06-01T12:00:00.000+0000",
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"},
    "content": {"mimeType": "text/plain", "sizeInBytes": 1024}
  }
}
```

</details>

<details>
<summary>deleteVersion</summary>

Deletes a specific version from the version history of a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `versionId` | `string` | Yes | The version identifier. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteVersion("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "1.0");
```

</details>

<details>
<summary>getVersionContent</summary>

Retrieves the binary content of a specific version of a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `versionId` | `string` | Yes | The version identifier. |
| `headers` | `GetVersionContentHeaders` | No | Headers including `If-Modified-Since` and `Range`. |
| `queries` | `GetVersionContentQueries` | No | Query parameters including `attachment`. |

Returns: `byte[]|error?`

Sample code:

```ballerina
byte[]? versionContent = check alfrescoClient->getVersionContent("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "1.0");
```

Sample response:

```ballerina
<binary content bytes>
```

</details>

<details>
<summary>revertVersion</summary>

Reverts the node to a previous version, creating a new version entry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `versionId` | `string` | Yes | The version identifier to revert to. |
| `payload` | `RevertBody` | Yes | Revert options including `majorVersion` and `comment`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `RevertVersionQueries` | No | Query parameters including `fields`. |

Returns: `VersionEntry|error`

Sample code:

```ballerina
alfresco:VersionEntry revertedVersion = check alfrescoClient->revertVersion("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "1.0", {
    majorVersion: true,
    comment: "Reverting to initial version"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "3.0",
    "versionComment": "Reverting to initial version",
    "name": "hello.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "modifiedAt": "2025-06-01T15:00:00.000+0000",
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

#### Rendition operations

<details>
<summary>listRenditions</summary>

Lists all renditions for a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListRenditionsQueries` | No | Query parameters including `where`. |

Returns: `RenditionPaging|error`

Sample code:

```ballerina
alfresco:RenditionPaging renditions = check alfrescoClient->listRenditions("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "doclib", "content": {"mimeType": "image/png", "mimeTypeName": "PNG Image", "sizeInBytes": 4096}, "status": "CREATED"}},
      {"entry": {"id": "pdf", "content": {"mimeType": "application/pdf", "mimeTypeName": "Adobe PDF Document", "sizeInBytes": 8192}, "status": "CREATED"}}
    ]
  }
}
```

</details>

<details>
<summary>createRendition</summary>

Creates a rendition for a node (e.g., `doclib` thumbnail or `pdf` preview).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `payload` | `RenditionBodyCreate` | Yes | The rendition ID to create (e.g., `doclib`, `pdf`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->createRendition("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    id: "pdf"
});
```

</details>

<details>
<summary>getRendition</summary>

Retrieves rendition information for a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `renditionId` | `string` | Yes | The name of the rendition (e.g., `doclib`, `pdf`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `RenditionEntry|error`

Sample code:

```ballerina
alfresco:RenditionEntry rendition = check alfrescoClient->getRendition("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "pdf");
```

Sample response:

```ballerina
{"entry": {"id": "pdf", "content": {"mimeType": "application/pdf", "mimeTypeName": "Adobe PDF Document", "sizeInBytes": 8192}, "status": "CREATED"}}
```

</details>

<details>
<summary>getRenditionContent</summary>

Retrieves the binary content of a rendition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `renditionId` | `string` | Yes | The name of the rendition (e.g., `doclib`, `pdf`). |
| `headers` | `GetRenditionContentHeaders` | No | Headers including `If-Modified-Since` and `Range`. |
| `queries` | `GetRenditionContentQueries` | No | Query parameters including `attachment` and `placeholder`. |

Returns: `byte[]|error?`

Sample code:

```ballerina
byte[]? renditionContent = check alfrescoClient->getRenditionContent("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "pdf");
```

Sample response:

```ballerina
<binary content bytes>
```

</details>

#### Association operations

<details>
<summary>listSecondaryChildren</summary>

Lists secondary child associations for a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the parent node. Supports aliases: `-my-`, `-shared-`, `-root-`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSecondaryChildrenQueries` | No | Query parameters including `where`, `include`, `skipCount`, `maxItems`, and `fields`. |

Returns: `NodeChildAssociationPaging|error`

Sample code:

```ballerina
alfresco:NodeChildAssociationPaging secondaryChildren = check alfrescoClient->listSecondaryChildren("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 0, "hasMoreItems": false, "totalItems": 0, "skipCount": 0, "maxItems": 100},
    "entries": []
  }
}
```

</details>

<details>
<summary>createSecondaryChildAssociation</summary>

Creates a secondary child association between two nodes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the parent node. |
| `payload` | `ChildAssociationBody` | Yes | The child node ID and association type. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateSecondaryChildAssociationQueries` | No | Query parameters including `fields`. |

Returns: `ChildAssociationEntry|error`

Sample code:

```ballerina
alfresco:ChildAssociationEntry assoc = check alfrescoClient->createSecondaryChildAssociation("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    childId: "f7e8d9c0-b1a2-3456-7890-abcdef123456",
    assocType: "cm:contains"
});
```

Sample response:

```ballerina
{"entry": {"childId": "f7e8d9c0-b1a2-3456-7890-abcdef123456", "assocType": "cm:contains"}}
```

</details>

<details>
<summary>deleteSecondaryChildAssociation</summary>

Deletes a secondary child association.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the parent node. |
| `childId` | `string` | Yes | The identifier of the child node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `DeleteSecondaryChildAssociationQueries` | No | Query parameters including `assocType`. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteSecondaryChildAssociation("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "f7e8d9c0-b1a2-3456-7890-abcdef123456");
```

</details>

<details>
<summary>listParents</summary>

Lists the parent nodes of a specified node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListParentsQueries` | No | Query parameters including `where`, `include`, `skipCount`, `maxItems`, and `fields`. |

Returns: `NodeAssociationPaging|error`

Sample code:

```ballerina
alfresco:NodeAssociationPaging parents = check alfrescoClient->listParents("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "d4f0a4b2-1a3e-4c5f-9b8e-7d6c5e4f3a2b", "name": "Company Home", "nodeType": "cm:folder", "isFolder": true, "isFile": false}}
    ]
  }
}
```

</details>

<details>
<summary>listTargetAssociations</summary>

Lists the target peer associations of a node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the source node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListTargetAssociationsQueries` | No | Query parameters including `where`, `include`, `skipCount`, `maxItems`, and `fields`. |

Returns: `NodeAssociationPaging|error`

Sample code:

```ballerina
alfresco:NodeAssociationPaging targets = check alfrescoClient->listTargetAssociations("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 0, "hasMoreItems": false, "totalItems": 0, "skipCount": 0, "maxItems": 100},
    "entries": []
  }
}
```

</details>

<details>
<summary>createAssociation</summary>

Creates a peer-to-peer association between two nodes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the source node. |
| `payload` | `AssociationBody` | Yes | The target node ID and association type. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateAssociationQueries` | No | Query parameters including `fields`. |

Returns: `AssociationEntry|error`

Sample code:

```ballerina
alfresco:AssociationEntry assoc = check alfrescoClient->createAssociation("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {
    targetId: "f7e8d9c0-b1a2-3456-7890-abcdef123456",
    assocType: "cm:references"
});
```

Sample response:

```ballerina
{"entry": {"targetId": "f7e8d9c0-b1a2-3456-7890-abcdef123456", "assocType": "cm:references"}}
```

</details>

<details>
<summary>deleteAssociation</summary>

Deletes a peer-to-peer association.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the source node. |
| `targetId` | `string` | Yes | The identifier of the target node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `DeleteAssociationQueries` | No | Query parameters including `assocType`. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteAssociation("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "f7e8d9c0-b1a2-3456-7890-abcdef123456");
```

</details>

<details>
<summary>listSourceAssociations</summary>

Lists the source peer associations of a node (i.e., nodes that point to this node).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the target node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSourceAssociationsQueries` | No | Query parameters including `where`, `include`, and `fields`. |

Returns: `NodeAssociationPaging|error`

Sample code:

```ballerina
alfresco:NodeAssociationPaging sources = check alfrescoClient->listSourceAssociations("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 0, "hasMoreItems": false, "totalItems": 0, "skipCount": 0, "maxItems": 100},
    "entries": []
  }
}
```

</details>

#### Deleted node (trash can) operations

<details>
<summary>listDeletedNodes</summary>

Lists nodes in the trash can (archived/deleted nodes).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDeletedNodesQueries` | No | Query parameters including `skipCount`, `maxItems`, and `include`. |

Returns: `DeletedNodesPaging|error`

Sample code:

```ballerina
alfresco:DeletedNodesPaging deletedNodes = check alfrescoClient->listDeletedNodes();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "name": "old-file.txt", "nodeType": "cm:content", "isFolder": false, "isFile": true, "archivedAt": "2025-06-01T16:00:00.000+0000", "archivedByUser": {"id": "admin", "displayName": "Administrator"}}}
    ]
  }
}
```

</details>

<details>
<summary>getDeletedNode</summary>

Retrieves metadata for a specific deleted node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the deleted node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDeletedNodeQueries` | No | Query parameters including `include`. |

Returns: `DeletedNodeEntry|error`

Sample code:

```ballerina
alfresco:DeletedNodeEntry deletedNode = check alfrescoClient->getDeletedNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "old-file.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "archivedAt": "2025-06-01T16:00:00.000+0000",
    "archivedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

<details>
<summary>deleteDeletedNode</summary>

Permanently deletes a node from the trash can.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the deleted node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteDeletedNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

</details>

<details>
<summary>restoreDeletedNode</summary>

Restores a deleted node from the trash can to its original or a specified location.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the deleted node. |
| `payload` | `DeletedNodeBodyRestore` | Yes | Optional target folder ID and association type for restore. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `RestoreDeletedNodeQueries` | No | Query parameters including `fields`. |

Returns: `NodeEntry|error`

Sample code:

```ballerina
alfresco:NodeEntry restoredNode = check alfrescoClient->restoreDeletedNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890", {});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "old-file.txt",
    "nodeType": "cm:content",
    "isFolder": false,
    "isFile": true,
    "isLocked": false,
    "createdByUser": {"id": "admin", "displayName": "Administrator"},
    "modifiedByUser": {"id": "admin", "displayName": "Administrator"}
  }
}
```

</details>

#### Download operations

<details>
<summary>createDownload</summary>

Creates a download ZIP for one or more nodes. Returns a download entry with a status to poll.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DownloadBodyCreate` | Yes | An array of node IDs to include in the download ZIP. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateDownloadQueries` | No | Query parameters including `fields`. |

Returns: `DownloadEntry|error`

Sample code:

```ballerina
alfresco:DownloadEntry download = check alfrescoClient->createDownload({
    nodeIds: ["a1b2c3d4-e5f6-7890-abcd-ef1234567890", "f7e8d9c0-b1a2-3456-7890-abcdef123456"]
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "dl-001",
    "status": "PENDING",
    "filesAdded": 0,
    "bytesAdded": 0,
    "totalFiles": 2,
    "totalBytes": 3072
  }
}
```

</details>

<details>
<summary>getDownload</summary>

Retrieves the status of a download request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `downloadId` | `string` | Yes | The identifier of the download. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDownloadQueries` | No | Query parameters including `fields`. |

Returns: `DownloadEntry|error`

Sample code:

```ballerina
alfresco:DownloadEntry status = check alfrescoClient->getDownload("dl-001");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "dl-001",
    "status": "DONE",
    "filesAdded": 2,
    "bytesAdded": 3072,
    "totalFiles": 2,
    "totalBytes": 3072
  }
}
```

</details>

<details>
<summary>cancelDownload</summary>

Cancels a download request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `downloadId` | `string` | Yes | The identifier of the download. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->cancelDownload("dl-001");
```

</details>

#### People operations

<details>
<summary>listPeople</summary>

Lists all people (users) in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListPeopleQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `PersonPaging|error`

Sample code:

```ballerina
alfresco:PersonPaging people = check alfrescoClient->listPeople();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "admin", "firstName": "Administrator", "email": "admin@example.com", "enabled": true}},
      {"entry": {"id": "jdoe", "firstName": "John", "lastName": "Doe", "email": "jdoe@example.com", "enabled": true}}
    ]
  }
}
```

</details>

<details>
<summary>createPerson</summary>

Creates a new person (user) in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PersonBodyCreate` | Yes | The person details including `id`, `firstName`, `lastName`, `email`, and `password`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreatePersonQueries` | No | Query parameters including `fields`. |

Returns: `PersonEntry|error`

Sample code:

```ballerina
alfresco:PersonEntry person = check alfrescoClient->createPerson({
    id: "jsmith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jsmith@example.com",
    password: "S3cur3P@ss!"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "jsmith",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jsmith@example.com",
    "enabled": true
  }
}
```

</details>

<details>
<summary>getPerson</summary>

Retrieves details for a specific person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person (username or `-me-`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetPersonQueries` | No | Query parameters including `fields`. |

Returns: `PersonEntry|error`

Sample code:

```ballerina
alfresco:PersonEntry person = check alfrescoClient->getPerson("-me-");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "admin",
    "firstName": "Administrator",
    "email": "admin@example.com",
    "enabled": true
  }
}
```

</details>

<details>
<summary>updatePerson</summary>

Updates details of an existing person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person. |
| `payload` | `PersonBodyUpdate` | Yes | The person fields to update. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdatePersonQueries` | No | Query parameters including `fields`. |

Returns: `PersonEntry|error`

Sample code:

```ballerina
alfresco:PersonEntry updatedPerson = check alfrescoClient->updatePerson("jsmith", {
    jobTitle: "Senior Developer"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "jsmith",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jsmith@example.com",
    "jobTitle": "Senior Developer",
    "enabled": true
  }
}
```

</details>

<details>
<summary>requestPasswordReset</summary>

Requests a password reset for a person. Sends a reset email.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person. |
| `payload` | `ClientBody` | Yes | The client name for the password reset. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->requestPasswordReset("jsmith", {
    'client: "alfresco"
});
```

</details>

<details>
<summary>resetPassword</summary>

Resets the password for a person using a reset token.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person. |
| `payload` | `PasswordResetBody` | Yes | The new password and reset token. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->resetPassword("jsmith", {
    password: "N3wS3cur3P@ss!",
    id: "reset-token-abc123"
});
```

</details>

#### Site operations

<details>
<summary>listSites</summary>

Lists all sites in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSitesQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, `where`, and `fields`. |

Returns: `SitePaging|error`

Sample code:

```ballerina
alfresco:SitePaging sites = check alfrescoClient->listSites();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "engineering", "guid": "site-guid-001", "title": "Engineering", "description": "Engineering team site", "visibility": "PRIVATE"}}
    ]
  }
}
```

</details>

<details>
<summary>createSite</summary>

Creates a new site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SiteBodyCreate` | Yes | The site details including `title`, `visibility`, and optional `description` and `id`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateSiteQueries` | No | Query parameters including `skipConfiguration`, `skipAddToFavorites`, and `fields`. |

Returns: `SiteEntry|error`

Sample code:

```ballerina
alfresco:SiteEntry site = check alfrescoClient->createSite({
    title: "Marketing",
    description: "Marketing team collaboration site",
    visibility: "MODERATED"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "marketing",
    "guid": "site-guid-002",
    "title": "Marketing",
    "description": "Marketing team collaboration site",
    "visibility": "MODERATED"
  }
}
```

</details>

<details>
<summary>getSite</summary>

Retrieves details of a specific site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetSiteQueries` | No | Query parameters including `relations` and `fields`. |

Returns: `SiteEntry|error`

Sample code:

```ballerina
alfresco:SiteEntry site = check alfrescoClient->getSite("engineering");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "engineering",
    "guid": "site-guid-001",
    "title": "Engineering",
    "description": "Engineering team site",
    "visibility": "PRIVATE"
  }
}
```

</details>

<details>
<summary>updateSite</summary>

Updates the properties of an existing site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `payload` | `SiteBodyUpdate` | Yes | The site properties to update. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateSiteQueries` | No | Query parameters including `fields`. |

Returns: `SiteEntry|error`

Sample code:

```ballerina
alfresco:SiteEntry updatedSite = check alfrescoClient->updateSite("engineering", {
    description: "Updated engineering site description",
    visibility: "PUBLIC"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "engineering",
    "guid": "site-guid-001",
    "title": "Engineering",
    "description": "Updated engineering site description",
    "visibility": "PUBLIC"
  }
}
```

</details>

<details>
<summary>deleteSite</summary>

Deletes a site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `DeleteSiteQueries` | No | Query parameters including `permanent`. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteSite("marketing");
```

</details>

#### Site membership operations

<details>
<summary>listSiteMemberships</summary>

Lists all members of a specific site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSiteMembershipsQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `SiteMemberPaging|error`

Sample code:

```ballerina
alfresco:SiteMemberPaging members = check alfrescoClient->listSiteMemberships("engineering");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "admin", "person": {"id": "admin", "firstName": "Administrator"}, "role": "SiteManager"}},
      {"entry": {"id": "jsmith", "person": {"id": "jsmith", "firstName": "Jane", "lastName": "Smith"}, "role": "SiteContributor"}}
    ]
  }
}
```

</details>

<details>
<summary>createSiteMembership</summary>

Adds a person as a member of a site with a specified role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `payload` | `SiteMembershipBodyCreate` | Yes | The person ID and role (`SiteConsumer`, `SiteContributor`, `SiteCollaborator`, `SiteManager`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateSiteMembershipQueries` | No | Query parameters including `fields`. |

Returns: `SiteMemberEntry|error`

Sample code:

```ballerina
alfresco:SiteMemberEntry member = check alfrescoClient->createSiteMembership("engineering", {
    id: "jsmith",
    role: "SiteContributor"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "jsmith",
    "person": {"id": "jsmith", "firstName": "Jane", "lastName": "Smith"},
    "role": "SiteContributor"
  }
}
```

</details>

<details>
<summary>deleteSiteMembership</summary>

Removes a person from a site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | `string` | Yes | The identifier of the site. |
| `personId` | `string` | Yes | The identifier of the person. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteSiteMembership("engineering", "jsmith");
```

</details>

#### Group operations

<details>
<summary>listGroups</summary>

Lists all groups in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListGroupsQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, `where`, `include`, and `fields`. |

Returns: `GroupPaging|error`

Sample code:

```ballerina
alfresco:GroupPaging groups = check alfrescoClient->listGroups();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "GROUP_ALFRESCO_ADMINISTRATORS", "displayName": "ALFRESCO_ADMINISTRATORS", "isRoot": true}},
      {"entry": {"id": "GROUP_EVERYONE", "displayName": "EVERYONE", "isRoot": true}}
    ]
  }
}
```

</details>

<details>
<summary>createGroup</summary>

Creates a new group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GroupBodyCreate` | Yes | The group details including `id`, `displayName`, and optional `parentIds`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateGroupQueries` | No | Query parameters including `include` and `fields`. |

Returns: `GroupEntry|error`

Sample code:

```ballerina
alfresco:GroupEntry group = check alfrescoClient->createGroup({
    id: "GROUP_DEVELOPERS",
    displayName: "Developers"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "GROUP_DEVELOPERS",
    "displayName": "Developers",
    "isRoot": true
  }
}
```

</details>

<details>
<summary>getGroup</summary>

Retrieves details of a specific group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetGroupQueries` | No | Query parameters including `include` and `fields`. |

Returns: `GroupEntry|error`

Sample code:

```ballerina
alfresco:GroupEntry group = check alfrescoClient->getGroup("GROUP_DEVELOPERS");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "GROUP_DEVELOPERS",
    "displayName": "Developers",
    "isRoot": true
  }
}
```

</details>

<details>
<summary>updateGroup</summary>

Updates the display name of a group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `payload` | `GroupBodyUpdate` | Yes | The updated group details. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `UpdateGroupQueries` | No | Query parameters including `include` and `fields`. |

Returns: `GroupEntry|error`

Sample code:

```ballerina
alfresco:GroupEntry updatedGroup = check alfrescoClient->updateGroup("GROUP_DEVELOPERS", {
    displayName: "Engineering Developers"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "GROUP_DEVELOPERS",
    "displayName": "Engineering Developers",
    "isRoot": true
  }
}
```

</details>

<details>
<summary>deleteGroup</summary>

Deletes a group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `DeleteGroupQueries` | No | Query parameters including `cascade` (boolean to delete sub-groups). |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteGroup("GROUP_DEVELOPERS");
```

</details>

<details>
<summary>listGroupMemberships</summary>

Lists members of a specific group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListGroupMembershipsQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, and `where`. |

Returns: `GroupMemberPaging|error`

Sample code:

```ballerina
alfresco:GroupMemberPaging members = check alfrescoClient->listGroupMemberships("GROUP_DEVELOPERS");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "jsmith", "displayName": "Jane Smith", "memberType": "PERSON"}}
    ]
  }
}
```

</details>

<details>
<summary>createGroupMembership</summary>

Adds a person or group as a member of a group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `payload` | `GroupMembershipBodyCreate` | Yes | The member ID and member type (`PERSON` or `GROUP`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateGroupMembershipQueries` | No | Query parameters including `fields`. |

Returns: `GroupMemberEntry|error`

Sample code:

```ballerina
alfresco:GroupMemberEntry member = check alfrescoClient->createGroupMembership("GROUP_DEVELOPERS", {
    id: "jsmith",
    memberType: "PERSON"
});
```

Sample response:

```ballerina
{"entry": {"id": "jsmith", "displayName": "Jane Smith", "memberType": "PERSON"}}
```

</details>

<details>
<summary>deleteGroupMembership</summary>

Removes a member from a group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupId` | `string` | Yes | The identifier of the group. |
| `groupMemberId` | `string` | Yes | The identifier of the member to remove. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteGroupMembership("GROUP_DEVELOPERS", "jsmith");
```

</details>

#### Shared link operations

<details>
<summary>listSharedLinks</summary>

Lists all shared links the current user has access to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSharedLinksQueries` | No | Query parameters including `skipCount`, `maxItems`, `where`, `include`, and `fields`. |

Returns: `SharedLinkPaging|error`

Sample code:

```ballerina
alfresco:SharedLinkPaging sharedLinks = check alfrescoClient->listSharedLinks();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "abc123xyz", "nodeId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "name": "hello.txt", "modifiedAt": "2025-06-01T12:00:00.000+0000"}}
    ]
  }
}
```

</details>

<details>
<summary>createSharedLink</summary>

Creates a shared link for a node, enabling external sharing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SharedLinkBodyCreate` | Yes | The `nodeId` and optional `expiresAt` datetime. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateSharedLinkQueries` | No | Query parameters including `include` and `fields`. |

Returns: `SharedLinkEntry|error`

Sample code:

```ballerina
alfresco:SharedLinkEntry sharedLink = check alfrescoClient->createSharedLink({
    nodeId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
});
```

Sample response:

```ballerina
{
  "entry": {
    "id": "abc123xyz",
    "nodeId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "modifiedAt": "2025-06-01T12:00:00.000+0000"
  }
}
```

</details>

<details>
<summary>getSharedLink</summary>

Retrieves details of a shared link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sharedId` | `string` | Yes | The identifier of the shared link. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetSharedLinkQueries` | No | Query parameters including `fields`. |

Returns: `SharedLinkEntry|error`

Sample code:

```ballerina
alfresco:SharedLinkEntry link = check alfrescoClient->getSharedLink("abc123xyz");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "abc123xyz",
    "nodeId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "hello.txt",
    "modifiedAt": "2025-06-01T12:00:00.000+0000"
  }
}
```

</details>

<details>
<summary>deleteSharedLink</summary>

Deletes a shared link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sharedId` | `string` | Yes | The identifier of the shared link. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteSharedLink("abc123xyz");
```

</details>

<details>
<summary>emailSharedLink</summary>

Sends an email with a shared link to specified recipients.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sharedId` | `string` | Yes | The identifier of the shared link. |
| `payload` | `SharedLinkBodyEmail` | Yes | Email details including `client`, `message`, and `recipientEmails`. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->emailSharedLink("abc123xyz", {
    'client: "alfresco",
    message: "Please review this document.",
    recipientEmails: ["colleague@example.com"]
});
```

</details>

#### Search & find operations

<details>
<summary>findNodes</summary>

Searches for nodes by a term string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `FindNodesQueries` | Yes | Query parameters including `term` (required), `rootNodeId`, `nodeType`, `include`, `orderBy`, `skipCount`, `maxItems`, and `fields`. |

Returns: `NodePaging|error`

Sample code:

```ballerina
alfresco:NodePaging results = check alfrescoClient->findNodes(term = "quarterly report");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "abc123", "name": "Q3-Quarterly-Report.pdf", "nodeType": "cm:content", "isFolder": false, "isFile": true}}
    ]
  }
}
```

</details>

<details>
<summary>findSites</summary>

Searches for sites by a term string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `FindSitesQueries` | Yes | Query parameters including `term` (required), `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `SitePaging|error`

Sample code:

```ballerina
alfresco:SitePaging siteResults = check alfrescoClient->findSites(term = "engineering");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "engineering", "guid": "site-guid-001", "title": "Engineering", "visibility": "PRIVATE"}}
    ]
  }
}
```

</details>

<details>
<summary>findPeople</summary>

Searches for people by a term string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `FindPeopleQueries` | Yes | Query parameters including `term` (required), `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `PersonPaging|error`

Sample code:

```ballerina
alfresco:PersonPaging peopleResults = check alfrescoClient->findPeople(term = "jane");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "jsmith", "firstName": "Jane", "lastName": "Smith", "email": "jsmith@example.com"}}
    ]
  }
}
```

</details>

#### Audit operations

<details>
<summary>listAuditApps</summary>

Lists all audit applications in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAuditAppsQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `AuditAppPaging|error`

Sample code:

```ballerina
alfresco:AuditAppPaging auditApps = check alfrescoClient->listAuditApps();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "alfresco-access", "name": "alfresco-access", "isEnabled": true}}
    ]
  }
}
```

</details>

<details>
<summary>getAuditApp</summary>

Retrieves details of a specific audit application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `auditApplicationId` | `string` | Yes | The identifier of the audit application. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAuditAppQueries` | No | Query parameters including `fields`. |

Returns: `AuditApp|error`

Sample code:

```ballerina
alfresco:AuditApp auditApp = check alfrescoClient->getAuditApp("alfresco-access");
```

Sample response:

```ballerina
{"id": "alfresco-access", "name": "alfresco-access", "isEnabled": true}
```

</details>

<details>
<summary>listAuditEntriesForAuditApp</summary>

Lists audit entries for a specific audit application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `auditApplicationId` | `string` | Yes | The identifier of the audit application. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAuditEntriesForAuditAppQueries` | No | Query parameters including `skipCount`, `maxItems`, `where`, `include`, `orderBy`, and `fields`. |

Returns: `AuditEntryPaging|error`

Sample code:

```ballerina
alfresco:AuditEntryPaging entries = check alfrescoClient->listAuditEntriesForAuditApp("alfresco-access");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": true, "totalItems": 500, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "1", "auditApplicationId": "alfresco-access", "createdByUser": {"id": "admin", "displayName": "Administrator"}, "createdAt": "2025-06-01T12:00:00.000+0000"}}
    ]
  }
}
```

</details>

<details>
<summary>listAuditEntriesForNode</summary>

Lists audit entries associated with a specific node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAuditEntriesForNodeQueries` | No | Query parameters including `skipCount`, `maxItems`, and `fields`. |

Returns: `AuditEntryPaging|error`

Sample code:

```ballerina
alfresco:AuditEntryPaging nodeAudit = check alfrescoClient->listAuditEntriesForNode("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "42", "auditApplicationId": "alfresco-access", "createdByUser": {"id": "admin", "displayName": "Administrator"}, "createdAt": "2025-06-01T12:00:00.000+0000"}}
    ]
  }
}
```

</details>

#### Action operations

<details>
<summary>listActions</summary>

Lists all available action definitions in the repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListActionsQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `ActionDefinitionList|error`

Sample code:

```ballerina
alfresco:ActionDefinitionList actions = check alfrescoClient->listActions();
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 2, "hasMoreItems": false, "totalItems": 2, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "copy", "name": "copy", "title": "Copy", "description": "Copy a node to a destination folder"}},
      {"entry": {"id": "move", "name": "move", "title": "Move", "description": "Move a node to a destination folder"}}
    ]
  }
}
```

</details>

<details>
<summary>actionDetails</summary>

Retrieves details of a specific action definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `actionDefinitionId` | `string` | Yes | The identifier of the action definition. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `ActionDefinitionEntry|error`

Sample code:

```ballerina
alfresco:ActionDefinitionEntry actionDef = check alfrescoClient->actionDetails("copy");
```

Sample response:

```ballerina
{
  "entry": {
    "id": "copy",
    "name": "copy",
    "title": "Copy",
    "description": "Copy a node to a destination folder",
    "applicableTypes": [],
    "trackStatus": false,
    "parameterDefinitions": [
      {"name": "destination-folder", "type": "d:noderef", "multiValued": false, "mandatory": true, "displayLabel": "Destination Folder"}
    ]
  }
}
```

</details>

<details>
<summary>actionExec</summary>

Executes an action against a target node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ActionBodyExec` | Yes | The action definition ID, target node ID, and optional parameters. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `ActionExecResultEntry|error`

Sample code:

```ballerina
alfresco:ActionExecResultEntry result = check alfrescoClient->actionExec({
    actionDefinitionId: "copy",
    targetId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    params: {
        "destination-folder": "d4f0a4b2-1a3e-4c5f-9b8e-7d6c5e4f3a2b"
    }
});
```

Sample response:

```ballerina
{"entry": {"id": "action-exec-001"}}
```

</details>

<details>
<summary>nodeActions</summary>

Lists the action definitions applicable to a specific node.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | Yes | The identifier of the node. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `NodeActionsQueries` | No | Query parameters including `skipCount`, `maxItems`, `orderBy`, and `fields`. |

Returns: `ActionDefinitionList|error`

Sample code:

```ballerina
alfresco:ActionDefinitionList nodeActions = check alfrescoClient->nodeActions("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 5, "hasMoreItems": false, "totalItems": 5, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": "copy", "name": "copy", "title": "Copy"}},
      {"entry": {"id": "move", "name": "move", "title": "Move"}},
      {"entry": {"id": "check-out", "name": "check-out", "title": "Check Out"}},
      {"entry": {"id": "check-in", "name": "check-in", "title": "Check In"}},
      {"entry": {"id": "extract-metadata", "name": "extract-metadata", "title": "Extract Metadata"}}
    ]
  }
}
```

</details>

#### Favorites & activities

<details>
<summary>listFavorites</summary>

Lists all favorites for a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person (or `-me-`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListFavoritesQueries` | No | Query parameters including `skipCount`, `maxItems`, `where`, `include`, `orderBy`, and `fields`. |

Returns: `FavoritePaging|error`

Sample code:

```ballerina
alfresco:FavoritePaging favorites = check alfrescoClient->listFavorites("-me-");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"targetGuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "createdAt": "2025-06-01T12:00:00.000+0000"}}
    ]
  }
}
```

</details>

<details>
<summary>createFavorite</summary>

Creates a new favorite for a person (file, folder, or site).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person (or `-me-`). |
| `payload` | `FavoriteBodyCreate` | Yes | The target to favorite. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `CreateFavoriteQueries` | No | Query parameters including `include` and `fields`. |

Returns: `FavoriteEntry|error`

Sample code:

```ballerina
alfresco:FavoriteEntry favorite = check alfrescoClient->createFavorite("-me-", {
    target: {
        file: {
            guid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
        }
    }
});
```

Sample response:

```ballerina
{
  "entry": {
    "targetGuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "createdAt": "2025-06-01T15:00:00.000+0000"
  }
}
```

</details>

<details>
<summary>deleteFavorite</summary>

Removes a favorite for a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person (or `-me-`). |
| `favoriteId` | `string` | Yes | The identifier of the favorite. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `error?`

Sample code:

```ballerina
check alfrescoClient->deleteFavorite("-me-", "a1b2c3d4-e5f6-7890-abcd-ef1234567890");
```

</details>

<details>
<summary>listActivitiesForPerson</summary>

Lists activities (activity feed) for a person.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personId` | `string` | Yes | The identifier of the person (or `-me-`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListActivitiesForPersonQueries` | No | Query parameters including `skipCount`, `maxItems`, `who`, `siteId`, and `fields`. |

Returns: `ActivityPaging|error`

Sample code:

```ballerina
alfresco:ActivityPaging activities = check alfrescoClient->listActivitiesForPerson("-me-");
```

Sample response:

```ballerina
{
  "list": {
    "pagination": {"count": 1, "hasMoreItems": false, "totalItems": 1, "skipCount": 0, "maxItems": 100},
    "entries": [
      {"entry": {"id": 1001, "siteId": "engineering", "postPersonId": "admin", "activityType": "org.alfresco.documentlibrary.file-added", "postedAt": "2025-06-01T12:00:00.000+0000"}}
    ]
  }
}
```

</details>

#### Probe operations

<details>
<summary>getProbe</summary>

Checks the health/readiness of the Alfresco repository. Used for liveness and readiness probes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `probeId` | `string` | Yes | The probe identifier (`-ready-` or `-live-`). |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `ProbeEntry|error`

Sample code:

```ballerina
alfresco:ProbeEntry probe = check alfrescoClient->getProbe("-ready-");
```

Sample response:

```ballerina
{"entry": {"message": "READY"}}
```

</details>
