---
connector: true
connector_name: "bitbucket"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Bitbucket connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage Bitbucket Cloud repositories, branches and tags, commits, pull requests, pipelines, snippets, projects, workspaces and permissions through the Bitbucket Cloud REST API 2.0. |

---

## Client

The `Client` connects to the Bitbucket Cloud REST API 2.0 (`https://api.bitbucket.org/2.0`). It exposes 294 operations.

### Configuration

**ApiKeysConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authorization` | <code>string</code> | Required | API Keys can be used as Basic HTTP Authentication credentials and provide a substitute for the account's actual username and password. API Keys are only available to team accounts and there is only 1 key per account. API Keys do not support scopes and have therefore access to all contents of the account. |

**OAuth2RefreshTokenGrantConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `refreshUrl` | <code>string</code> | <code>"https://bitbucket.org/site/oauth2/access_token"</code> | Refresh URL |

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;http:CredentialsConfig&#124;ApiKeysConfig</code> | Required | Provides Auth configurations needed when communicating with a remote HTTP endpoint. |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/bitbucket;

configurable string accessToken = ?;

final bitbucket:Client bitbucketClient = check new ({
    auth: {token: accessToken}
});
```

### Operations

#### Addon

<details>
<summary>updateInstalledApp</summary>

<div>

Update an installed app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateInstalledApp();
```

</div>
</details>

<details>
<summary>deleteApp</summary>

<div>

Delete an app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteApp();
```

</div>
</details>

<details>
<summary>getClientKeyConnectAddon</summary>

<div>

Get the client key of a Connect addon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addonKey` | <code>string</code> | Yes | The Connect addon key as defined in an application descriptor. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getClientKeyConnectAddon("string");
```

</div>
</details>

#### Hook events

<details>
<summary>getWebhookResource</summary>

<div>

Get a webhook resource.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubjectTypes|error`

**Sample code:**

```ballerina
bitbucket:SubjectTypes result = check bitbucketClient->getWebhookResource();
```

**Sample response:**

```json
{}
```

</div>
</details>

<details>
<summary>listSubscribableWebhookTypes</summary>

<div>

List subscribable webhook types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subjectType` | <code>"repository"&#124;"workspace"</code> | Yes | A resource or subject type. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedHookEvents|error`

**Sample code:**

```ballerina
bitbucket:PaginatedHookEvents result = check bitbucketClient->listSubscribableWebhookTypes("repository");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "description": "Sample description",
      "label": "string",
      "event": "issue:comment_created"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Repositories

<details>
<summary>listRepositoriesInWorkspace</summary>

<div>

List repositories in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `role` | <code>"admin"&#124;"contributor"&#124;"member"&#124;"owner"</code> | No | Filters the result based on the authenticated user's role on each repository. * **member**: returns repositories to which the user has explicit read access * **contributor**: returns repositories to which the user has explicit write access * **admin**: returns repositories to which the user has explicit administrator access * **owner**: returns all repositories owned by the current user. |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |

**Returns:** `PaginatedRepositories|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositories result = check bitbucketClient->listRepositoriesInWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "full_name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getRepository</summary>

<div>

Get a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Repository|error`

**Sample code:**

```ballerina
bitbucket:Repository result = check bitbucketClient->getRepository("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "full_name": "Sample name",
  "is_private": false,
  "parent": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "scm": "git"
}
```

</div>
</details>

<details>
<summary>updateRepository</summary>

<div>

Update a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Repository</code> | Yes | The repository that is to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Repository|error`

**Sample code:**

```ballerina
bitbucket:Repository result = check bitbucketClient->updateRepository("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    full_name: "Sample name",
    is_private: false
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "full_name": "Sample name",
  "is_private": false,
  "parent": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "scm": "git"
}
```

</div>
</details>

<details>
<summary>createRepository</summary>

<div>

Create a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Repository</code> | Yes | The repository that is to be created. Note that most object elements are optional. Elements "owner" and "full_name" are ignored as the URL implies them. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Repository|error`

**Sample code:**

```ballerina
bitbucket:Repository result = check bitbucketClient->createRepository("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    full_name: "Sample name",
    is_private: false
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "full_name": "Sample name",
  "is_private": false,
  "parent": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "scm": "git"
}
```

</div>
</details>

<details>
<summary>deleteRepository</summary>

<div>

Delete a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `redirect_to` | <code>string</code> | No | If a repository has been moved to a new location, use this parameter to show users a friendly message in the Bitbucket UI that the repository has moved to a new location. However, a GET to this endpoint will still return a 404. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteRepository("string", "string");
```

</div>
</details>

#### Branches and restrictions

<details>
<summary>listBranchRestrictions</summary>

<div>

List branch restrictions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `kind` | <code>string</code> | No | Branch restrictions of this type. |
| `pattern` | <code>string</code> | No | Branch restrictions applied to branches of this pattern. |

**Returns:** `PaginatedBranchRestrictions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedBranchRestrictions result = check bitbucketClient->listBranchRestrictions("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "kind": "push",
      "branch_match_kind": "branching_model",
      "pattern": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createBranchRestrictionRule</summary>

<div>

Create a branch restriction rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>BranchRestriction</code> | Yes | The new rule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchRestriction|error`

**Sample code:**

```ballerina
bitbucket:BranchRestriction result = check bitbucketClient->createBranchRestrictionRule("string", "string", {
    'type: "string",
    kind: "push",
    branch_match_kind: "branching_model",
    pattern: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "kind": "push",
  "branch_match_kind": "branching_model",
  "pattern": "string",
  "id": 1,
  "branch_type": "feature"
}
```

</div>
</details>

<details>
<summary>getBranchRestrictionRule</summary>

<div>

Get a branch restriction rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The restriction rule's id. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchRestriction|error`

**Sample code:**

```ballerina
bitbucket:BranchRestriction result = check bitbucketClient->getBranchRestrictionRule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "kind": "push",
  "branch_match_kind": "branching_model",
  "pattern": "string",
  "id": 1,
  "branch_type": "feature"
}
```

</div>
</details>

<details>
<summary>updateBranchRestrictionRule</summary>

<div>

Update a branch restriction rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The restriction rule's id. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>BranchRestriction</code> | Yes | The new version of the existing rule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchRestriction|error`

**Sample code:**

```ballerina
bitbucket:BranchRestriction result = check bitbucketClient->updateBranchRestrictionRule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string", {
    'type: "string",
    kind: "push",
    branch_match_kind: "branching_model",
    pattern: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "kind": "push",
  "branch_match_kind": "branching_model",
  "pattern": "string",
  "id": 1,
  "branch_type": "feature"
}
```

</div>
</details>

<details>
<summary>deleteBranchRestrictionRule</summary>

<div>

Delete a branch restriction rule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The restriction rule's id. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteBranchRestrictionRule("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>getBranchingModelForRepository</summary>

<div>

Get the branching model for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchingModel|error`

**Sample code:**

```ballerina
bitbucket:BranchingModel result = check bitbucketClient->getBranchingModelForRepository("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string"
    }
  ],
  "development": {
    "name": "Sample name",
    "use_mainbranch": false,
    "branch": {
      "type": "string"
    }
  },
  "production": {
    "name": "Sample name",
    "use_mainbranch": false,
    "branch": {
      "type": "string"
    }
  }
}
```

</div>
</details>

<details>
<summary>getBranchingModelConfigForRepository</summary>

<div>

Get the branching model config for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchingModelSettings|error`

**Sample code:**

```ballerina
bitbucket:BranchingModelSettings result = check bitbucketClient->getBranchingModelConfigForRepository("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string",
      "enabled": false
    }
  ],
  "development": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  },
  "production": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  }
}
```

</div>
</details>

<details>
<summary>updateRepoBranchingModelConfig</summary>

<div>

Update the branching model config for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchingModelSettings|error`

**Sample code:**

```ballerina
bitbucket:BranchingModelSettings result = check bitbucketClient->updateRepoBranchingModelConfig("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string",
      "enabled": false
    }
  ],
  "development": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  },
  "production": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  }
}
```

</div>
</details>

<details>
<summary>getEffectiveBranchingModel</summary>

<div>

Get the effective, or currently applied, branching model for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EffectiveRepoBranchingModel|error`

**Sample code:**

```ballerina
bitbucket:EffectiveRepoBranchingModel result = check bitbucketClient->getEffectiveBranchingModel("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string"
    }
  ],
  "development": {
    "name": "Sample name",
    "use_mainbranch": false,
    "branch": {
      "type": "string"
    }
  },
  "production": {
    "name": "Sample name",
    "use_mainbranch": false,
    "branch": {
      "type": "string"
    }
  }
}
```

</div>
</details>

<details>
<summary>listBranchesAndTags</summary>

<div>

List branches and tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). The `name` field is handled specially for refs in that, if specified as the sort field, it uses a natural sort order instead of the default lexicographical sort order. For example, it will return ['1.1', '1.2', '1.10'] instead of ['1.1', '1.10', '1.2']. |

**Returns:** `PaginatedRefs|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRefs result = check bitbucketClient->listBranchesAndTags("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "name": "Sample name",
      "target": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listOpenBranches</summary>

<div>

List open branches.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). The `name` field is handled specially for branches in that, if specified as the sort field, it uses a natural sort order instead of the default lexicographical sort order. For example, it will return ['branch1', 'branch2', 'branch10'] instead of ['branch1', 'branch10', 'branch2']. |

**Returns:** `PaginatedBranches|error`

**Sample code:**

```ballerina
bitbucket:PaginatedBranches result = check bitbucketClient->listOpenBranches("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "name": "Sample name",
      "target": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createBranch</summary>

<div>

Create a branch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Branch|error`

**Sample code:**

```ballerina
bitbucket:Branch result = check bitbucketClient->createBranch("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "name": "Sample name",
  "target": {
    "type": "string",
    "hash": "string",
    "date": "2026-01-15T00:00:00"
  },
  "merge_strategies": [
    "merge_commit"
  ],
  "default_merge_strategy": "string"
}
```

</div>
</details>

<details>
<summary>getBranch</summary>

<div>

Get a branch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | <code>string</code> | Yes | The name of the branch. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Branch|error`

**Sample code:**

```ballerina
bitbucket:Branch result = check bitbucketClient->getBranch("Sample name", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "name": "Sample name",
  "target": {
    "type": "string",
    "hash": "string",
    "date": "2026-01-15T00:00:00"
  },
  "merge_strategies": [
    "merge_commit"
  ],
  "default_merge_strategy": "string"
}
```

</div>
</details>

<details>
<summary>deleteBranch</summary>

<div>

Delete a branch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | <code>string</code> | Yes | The name of the branch. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteBranch("Sample name", "string", "string");
```

</div>
</details>

<details>
<summary>listTags</summary>

<div>

List tags.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). The `name` field is handled specially for tags in that, if specified as the sort field, it uses a natural sort order instead of the default lexicographical sort order. For example, it will return ['1.1', '1.2', '1.10'] instead of ['1.1', '1.10', '1.2']. |

**Returns:** `PaginatedTags|error`

**Sample code:**

```ballerina
bitbucket:PaginatedTags result = check bitbucketClient->listTags("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "name": "Sample name",
      "target": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createTag</summary>

<div>

Create a tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Tag</code> | Yes | Name and target commit of the tag to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tag|error`

**Sample code:**

```ballerina
bitbucket:Tag result = check bitbucketClient->createTag("string", "string", {
    'type: "string",
    name: "Sample name",
    target: {
        'type: "string",
        hash: "string",
        date: "2026-01-15T00:00:00"
    },
    message: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "name": "Sample name",
  "target": {
    "type": "string",
    "hash": "string",
    "date": "2026-01-15T00:00:00"
  },
  "message": "string",
  "date": "2026-01-15T00:00:00",
  "tagger": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  }
}
```

</div>
</details>

<details>
<summary>getTag</summary>

<div>

Get a tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | <code>string</code> | Yes | The name of the tag. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Tag|error`

**Sample code:**

```ballerina
bitbucket:Tag result = check bitbucketClient->getTag("Sample name", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "name": "Sample name",
  "target": {
    "type": "string",
    "hash": "string",
    "date": "2026-01-15T00:00:00"
  },
  "message": "string",
  "date": "2026-01-15T00:00:00",
  "tagger": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  }
}
```

</div>
</details>

<details>
<summary>deleteTag</summary>

<div>

Delete a tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | <code>string</code> | Yes | The name of the tag. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteTag("Sample name", "string", "string");
```

</div>
</details>

#### Commits and source

<details>
<summary>getCommit</summary>

<div>

Get a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Commit|error`

**Sample code:**

```ballerina
bitbucket:Commit result = check bitbucketClient->getCommit("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "hash": "string",
  "date": "2026-01-15T00:00:00",
  "author": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "committer": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "message": "string"
}
```

</div>
</details>

<details>
<summary>approveCommit</summary>

<div>

Approve a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Participant|error`

**Sample code:**

```ballerina
bitbucket:Participant result = check bitbucketClient->approveCommit("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "role": "PARTICIPANT",
  "approved": false,
  "state": "approved",
  "participated_on": "string"
}
```

</div>
</details>

<details>
<summary>unapproveCommit</summary>

<div>

Unapprove a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->unapproveCommit("string", "string", "string");
```

</div>
</details>

<details>
<summary>listCommitComments</summary>

<div>

List a commit's comments + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |

**Returns:** `PaginatedCommitComments|error`

**Sample code:**

```ballerina
bitbucket:PaginatedCommitComments result = check bitbucketClient->listCommitComments("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "created_on": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createCommentForCommit</summary>

<div>

Create comment for a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>CommitComment</code> | Yes | The specified comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->createCommentForCommit("string", "string", "string", {
    'type: "string",
    id: 1,
    created_on: "string",
    updated_on: "2026-01-15T00:00:00"
});
```

</div>
</details>

<details>
<summary>getCommitComment</summary>

<div>

Get a commit comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CommitComment|error`

**Sample code:**

```ballerina
bitbucket:CommitComment result = check bitbucketClient->getCommitComment(1, "string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateCommitComment</summary>

<div>

Update a commit comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>CommitComment</code> | Yes | The updated comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateCommitComment(1, "string", "string", "string", {
    'type: "string",
    id: 1,
    created_on: "string",
    updated_on: "2026-01-15T00:00:00"
});
```

</div>
</details>

<details>
<summary>deleteCommitComment</summary>

<div>

Delete a commit comment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteCommitComment(1, "string", "string", "string");
```

</div>
</details>

<details>
<summary>getCommitApplicationProperty</summary>

<div>

**Deprecated.** Get a commit application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationProperty|error`

**Sample code:**

```ballerina
bitbucket:ApplicationProperty result = check bitbucketClient->getCommitApplicationProperty("string", "string", "string", "string", "Sample name");
```

**Sample response:**

```json
{
  "_attributes": [
    "public"
  ]
}
```

</div>
</details>

<details>
<summary>updateCommitApplicationProperty</summary>

<div>

**Deprecated.** Update a commit application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `payload` | <code>ApplicationProperty</code> | Yes | The application property to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateCommitApplicationProperty("string", "string", "string", "string", "Sample name", {
    _attributes: ["public"]
});
```

</div>
</details>

<details>
<summary>deleteCommitApplicationProperty</summary>

<div>

**Deprecated.** Delete a commit application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteCommitApplicationProperty("string", "string", "string", "string", "Sample name");
```

</div>
</details>

<details>
<summary>listPullRequestsThatContainCommit</summary>

<div>

List pull requests that contain a commit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces. |
| `repoSlug` | <code>string</code> | Yes | The repository; either the UUID in curly braces, or the slug. |
| `'commit` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Which page to retrieve. Defaults to `1`. |
| `pagelen` | <code>int:Signed32</code> | No | How many pull requests to retrieve per page. Defaults to `30`. |

**Returns:** `PaginatedPullrequests|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPullrequests result = check bitbucketClient->listPullRequestsThatContainCommit("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "title": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listReports</summary>

<div>

List reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedReports|error`

**Sample code:**

```ballerina
bitbucket:PaginatedReports result = check bitbucketClient->listReports("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getReport</summary>

<div>

Get a report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bitbucket:Report result = check bitbucketClient->getReport("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "details": "string",
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reporter": "string"
}
```

</div>
</details>

<details>
<summary>createOrUpdateReport</summary>

<div>

Create or update a report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the report. |
| `payload` | <code>Report</code> | Yes | The report to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Report|error`

**Sample code:**

```ballerina
bitbucket:Report result = check bitbucketClient->createOrUpdateReport("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title: "string",
    details: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "details": "string",
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reporter": "string"
}
```

</div>
</details>

<details>
<summary>deleteReport</summary>

<div>

Delete a report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the report. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteReport("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listAnnotations</summary>

<div>

List annotations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Uuid or external-if of the report for which to get annotations for. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedAnnotations|error`

**Sample code:**

```ballerina
bitbucket:PaginatedAnnotations result = check bitbucketClient->listAnnotations("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>bulkCreateOrUpdateAnnotations</summary>

<div>

Bulk create or update annotations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Uuid or external-if of the report for which to get annotations for. |
| `payload` | <code>ReportAnnotation[]</code> | Yes | The annotations to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ReportAnnotation[]|error`

**Sample code:**

```ballerina
bitbucket:ReportAnnotation[] result = check bitbucketClient->bulkCreateOrUpdateAnnotations("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", [{
    'type: "string",
    external_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}]);
```

**Sample response:**

The raw response content as `ReportAnnotation[]`.

</div>
</details>

<details>
<summary>getAnnotation</summary>

<div>

Get an annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the report. |
| `annotationId` | <code>string</code> | Yes | Either the uuid or external-id of the annotation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ReportAnnotation|error`

**Sample code:**

```ballerina
bitbucket:ReportAnnotation result = check bitbucketClient->getAnnotation("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "annotation_type": "VULNERABILITY",
  "path": "string",
  "line": 1
}
```

</div>
</details>

<details>
<summary>createOrUpdateAnnotation</summary>

<div>

Create or update an annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the report. |
| `annotationId` | <code>string</code> | Yes | Either the uuid or external-id of the annotation. |
| `payload` | <code>ReportAnnotation</code> | Yes | The annotation to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ReportAnnotation|error`

**Sample code:**

```ballerina
bitbucket:ReportAnnotation result = check bitbucketClient->createOrUpdateAnnotation("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    external_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    annotation_type: "VULNERABILITY"
});
```

**Sample response:**

```json
{
  "type": "string",
  "external_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "annotation_type": "VULNERABILITY",
  "path": "string",
  "line": 1
}
```

</div>
</details>

<details>
<summary>deleteAnnotation</summary>

<div>

Delete an annotation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `'commit` | <code>string</code> | Yes |  |
| `reportId` | <code>string</code> | Yes | Either the uuid or external-id of the annotation. |
| `annotationId` | <code>string</code> | Yes | Either the uuid or external-id of the annotation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteAnnotation("string", "string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listCommitStatusesForCommit</summary>

<div>

List commit statuses for a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). Defaults to `created_on`. |
| `refname` | <code>string</code> | No | If specified, only return commit status objects that were either created without a refname, or were created with the specified refname. |

**Returns:** `PaginatedCommitstatuses|error`

**Sample code:**

```ballerina
bitbucket:PaginatedCommitstatuses result = check bitbucketClient->listCommitStatusesForCommit("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "key": "string",
      "state": "FAILED"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createBuildStatusForCommit</summary>

<div>

Create a build status for a commit + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Commitstatus</code> | Yes | The new commit status object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Commitstatus|error`

**Sample code:**

```ballerina
bitbucket:Commitstatus result = check bitbucketClient->createBuildStatusForCommit("string", "string", "string", {
    'type: "string",
    'key: "string",
    state: "FAILED",
    refname: "Sample name"
});
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "state": "FAILED",
  "refname": "Sample name",
  "url": "https://example.com/resource",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getBuildStatusForCommit</summary>

<div>

Get a build status for a commit + 'commit - The commit's SHA1 + 'key - The build status' unique key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `'key` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Commitstatus|error`

**Sample code:**

```ballerina
bitbucket:Commitstatus result = check bitbucketClient->getBuildStatusForCommit("string", "string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "state": "FAILED",
  "refname": "Sample name",
  "url": "https://example.com/resource",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>updateBuildStatusForCommit</summary>

<div>

Update a build status for a commit + 'commit - The commit's SHA1 + 'key - The build status' unique key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `'key` | <code>string</code> | Yes |  |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Commitstatus</code> | Yes | The updated build status object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Commitstatus|error`

**Sample code:**

```ballerina
bitbucket:Commitstatus result = check bitbucketClient->updateBuildStatusForCommit("string", "string", "string", "string", {
    'type: "string",
    'key: "string",
    state: "FAILED",
    refname: "Sample name"
});
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "state": "FAILED",
  "refname": "Sample name",
  "url": "https://example.com/resource",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>listCommits</summary>

<div>

List commits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedChangeset|error`

**Sample code:**

```ballerina
bitbucket:PaginatedChangeset result = check bitbucketClient->listCommits("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "hash": "string",
      "date": "2026-01-15T00:00:00"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listCommitsWithIncludeExclude</summary>

<div>

List commits with include/exclude.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedChangeset|error`

**Sample code:**

```ballerina
bitbucket:PaginatedChangeset result = check bitbucketClient->listCommitsWithIncludeExclude("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "hash": "string",
      "date": "2026-01-15T00:00:00"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listCommitsForRevision</summary>

<div>

List commits for revision.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `revision` | <code>string</code> | Yes | A commit SHA1 or ref name. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedChangeset|error`

**Sample code:**

```ballerina
bitbucket:PaginatedChangeset result = check bitbucketClient->listCommitsForRevision("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "hash": "string",
      "date": "2026-01-15T00:00:00"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listCommitsWithFilters</summary>

<div>

List commits for revision using include/exclude.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `revision` | <code>string</code> | Yes | A commit SHA1 or ref name. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedChangeset|error`

**Sample code:**

```ballerina
bitbucket:PaginatedChangeset result = check bitbucketClient->listCommitsWithFilters("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "hash": "string",
      "date": "2026-01-15T00:00:00"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>compareTwoCommits</summary>

<div>

Compare two commits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `spec` | <code>string</code> | Yes | A commit SHA (e.g. `3a8b42`) or a commit range using double dot. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `path` | <code>string</code> | No | Limit the diff to a particular file (this parameter can be repeated for multiple paths). |
| `ignoreWhitespace` | <code>boolean</code> | No | Generate diffs that ignore whitespace. |
| `binary` | <code>boolean</code> | No | Generate diffs that include binary files, true if omitted. |
| `merge` | <code>boolean</code> | No | This parameter is deprecated. The 'topic' parameter should be used instead. The 'merge' and 'topic' parameters cannot be both used at the same time. If true, the source commit is merged into the destination commit, and then a diff from the destination to the merge result is returned. If false, a simple 'two dot' diff between the source and destination is returned. True if omitted. |
| `context` | <code>int</code> | No | Generate diffs with &#60;n&#62; lines of context instead of the usual three. |
| `topic` | <code>boolean</code> | No | If true, returns 2-way 'three-dot' diff. This is a diff between the source commit and the merge base of the source commit and the destination commit. If false, a simple 'two dot' diff between the source and destination is returned. If omitted, defaults to true, ie. a 2 way 'three-dot' diff is returned. |
| `renames` | <code>boolean</code> | No | Whether to perform rename detection, true if omitted. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->compareTwoCommits("string", "string", "string");
```

</div>
</details>

<details>
<summary>compareTwoCommitDiffStats</summary>

<div>

Compare two commit diff stats.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `spec` | <code>string</code> | Yes | A commit SHA (e.g. `3a8b42`) or a commit range using double dot. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `path` | <code>string</code> | No | Limit the diffstat to a particular file (this parameter can be repeated for multiple paths). |
| `ignoreWhitespace` | <code>boolean</code> | No | Generate diffs that ignore whitespace. |
| `merge` | <code>boolean</code> | No | This parameter is deprecated. The 'topic' parameter should be used instead. The 'merge' and 'topic' parameters cannot be both used at the same time. If true, the source commit is merged into the destination commit, and then a diffstat from the destination to the merge result is returned. If false, a simple 'two dot' diffstat between the source and destination is returned. True if omitted. |
| `topic` | <code>boolean</code> | No | If true, returns 2-way 'three-dot' diff. This is a diff between the source commit and the merge base of the source commit and the destination commit. If false, a simple 'two dot' diff between the source and destination is returned. |
| `renames` | <code>boolean</code> | No | Whether to perform rename detection, true if omitted. |

**Returns:** `PaginatedDiffstats|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDiffstats result = check bitbucketClient->compareTwoCommitDiffStats("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "status": "added",
      "lines_added": 1
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getFileConflictsForCommitSpec</summary>

<div>

Get file conflicts for a commit spec.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `spec` | <code>string</code> | Yes | A commit SHA (e.g. `3a8b42`) or a commit range using double dot. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedFileConflicts|error`

**Sample code:**

```ballerina
bitbucket:PaginatedFileConflicts result = check bitbucketClient->getFileConflictsForCommitSpec("string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "path": "string",
      "scenario": "delete_modify"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listCommitsThatModifiedFile</summary>

<div>

List commits that modified a file + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `path` | <code>string</code> | Yes | Path to the file. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Name of a response property sort the result by as per [filtering and sorting](/cloud/bitbucket/rest/intro/#sorting-query-results). |
| `renames` | <code>string</code> | No | When `true`, Bitbucket will follow the history of the file across renames (this is the default behavior). This can be turned off by specifying `false`. |

**Returns:** `PaginatedFiles|error`

**Sample code:**

```ballerina
bitbucket:PaginatedFiles result = check bitbucketClient->listCommitsThatModifiedFile("string", "string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "path": "string",
      "commit": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getCommonAncestorBetweenTwoCommits</summary>

<div>

Get the common ancestor between two commits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `revspec` | <code>string</code> | Yes | A commit range using double dot notation (e.g. `3a8b42..9ff173`). |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Commit|error`

**Sample code:**

```ballerina
bitbucket:Commit result = check bitbucketClient->getCommonAncestorBetweenTwoCommits("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "hash": "string",
  "date": "2026-01-15T00:00:00",
  "author": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "committer": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getPatchForTwoCommits</summary>

<div>

Get a patch for two commits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `spec` | <code>string</code> | Yes | A commit SHA (e.g. `3a8b42`) or a commit range using double dot. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPatchForTwoCommits("string", "string", "string");
```

</div>
</details>

<details>
<summary>getRootDirectoryMainBranch</summary>

<div>

Get the root directory of the main branch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `format` | <code>"meta"</code> | No | Instead of returning the file's contents, return the (json) meta data for it. |

**Returns:** `PaginatedTreeentries|error`

**Sample code:**

```ballerina
bitbucket:PaginatedTreeentries result = check bitbucketClient->getRootDirectoryMainBranch("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "path": "string",
      "commit": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createCommitByUploadingFile</summary>

<div>

Create a commit by uploading a file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `author` | <code>string</code> | No | The raw string to be used as the new commit's author. This string follows the format `Erik van Zijst <evzijst@atlassian.com>`. When omitted, Bitbucket uses the authenticated user's full/display name and primary email address. Commits cannot be created anonymously. |
| `files` | <code>string</code> | No | Optional field that declares the files that the request is manipulating. When adding a new file to a repo, or when overwriting an existing file, the client can just upload the full contents of the file in a normal form field and the use of this `files` meta data field is redundant. However, when the `files` field contains a file path that does not have a corresponding, identically-named form field, then Bitbucket interprets that as the client wanting to replace the named file with the null set and the file is deleted instead. Paths in the repo that are referenced in neither files nor an individual file field, remain unchanged and carry over from the parent to the new commit. This API does not support renaming as an explicit feature. To rename a file, simply delete it and recreate it under the new name in the same commit. |
| `message` | <code>string</code> | No | The commit message. When omitted, Bitbucket uses a canned string. |
| `branch` | <code>string</code> | No | The name of the branch that the new commit should be created on. When omitted, the commit will be created on top of the main branch and will become the main branch's new head. When a branch name is provided that already exists in the repo, then the commit will be created on top of that branch. In this case, *if* a parent SHA1 was also provided, then it is asserted that the parent is the branch's tip/HEAD at the time the request is made. When this is not the case, a 409 is returned. When a new branch name is specified (that does not already exist in the repo), and no parent SHA1s are provided, then the new commit will inherit from the current main branch's tip/HEAD commit, but not advance the main branch. The new commit will be the new branch. When the request *also* specifies a parent SHA1, then the new commit and branch are created directly on top of the parent commit, regardless of the state of the main branch. When a branch name is not specified, but a parent SHA1 is provided, then Bitbucket asserts that it represents the main branch's current HEAD/tip, or a 409 is returned. When a branch name is not specified and the repo is empty, the new commit will become the repo's root commit and will be on the main branch. When a branch name is specified and the repo is empty, the new commit will become the repo's root commit and also define the repo's main branch going forward. This API cannot be used to create additional root commits in non-empty repos. The branch field cannot be repeated. As a side effect, this API can be used to create a new branch without modifying any files, by specifying a new branch name in this field, together with `parents`, but omitting the `files` fields, while not sending any files. This will create a new commit and branch with the same contents as the first parent. The diff of this commit against its first parent will be empty. |
| `parents` | <code>string</code> | No | #### Deprecation Notice: Support for specifying multiple parent commits is deprecated and will be removed in a future release. Only a single SHA1 is accepted. A SHA1 of the commit that should be the parent of the newly created commit. When omitted, the new commit will inherit from and become a child of the main branch's tip/HEAD commit. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->createCommitByUploadingFile("string", "string");
```

</div>
</details>

<details>
<summary>getFileOrDirectoryContents</summary>

<div>

Get file or directory contents + 'commit - The commit's SHA1.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'commit` | <code>string</code> | Yes |  |
| `path` | <code>string</code> | Yes | Path to the file. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Optional filter expression as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `maxDepth` | <code>int</code> | No | If provided, returns the contents of the repository and its subdirectories recursively until the specified max_depth of nested directories. When omitted, this defaults to 1. |
| `format` | <code>"meta"&#124;"rendered"</code> | No | If 'meta' is provided, returns the (json) meta data for the contents of the file. If 'rendered' is provided, returns the contents of a non-binary file in HTML-formatted rendered markup. The 'rendered' option only supports these filetypes: `.md`, `.markdown`, `.mkd`, `.mkdn`, `.mdown`, `.text`, `.rst`, and `.textile`. Since Git does not generally track what text encoding scheme is used, this endpoint attempts to detect the most appropriate character encoding. While usually correct, determining the character encoding can be ambiguous which in exceptional cases can lead to misinterpretation of the characters. As such, the raw element in the response object should not be treated as equivalent to the file's actual contents. |
| `sort` | <code>string</code> | No | Optional sorting parameter as per [filtering and sorting](/cloud/bitbucket/rest/intro/#sorting-query-results). |

**Returns:** `PaginatedTreeentries|error`

**Sample code:**

```ballerina
bitbucket:PaginatedTreeentries result = check bitbucketClient->getFileOrDirectoryContents("string", "string", "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "path": "string",
      "commit": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Pull requests

<details>
<summary>listDefaultReviewers</summary>

<div>

List default reviewers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedAccounts|error`

**Sample code:**

```ballerina
bitbucket:PaginatedAccounts result = check bitbucketClient->listDefaultReviewers("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "created_on": "string",
      "display_name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getRepoDefaultReviewer</summary>

<div>

Get a repository default reviewer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `targetUsername` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
bitbucket:Account result = check bitbucketClient->getRepoDefaultReviewer("string", "Sample name", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>addUserToDefaultReviewers</summary>

<div>

Add a user to the default reviewers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `targetUsername` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
bitbucket:Account result = check bitbucketClient->addUserToDefaultReviewers("string", "Sample name", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>removeUserFromDefaultReviewers</summary>

<div>

Remove a user from the default reviewers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `targetUsername` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->removeUserFromDefaultReviewers("string", "Sample name", "string");
```

</div>
</details>

<details>
<summary>listEffectiveDefaultReviewers</summary>

<div>

List effective default reviewers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedDefaultReviewerAndType|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDefaultReviewerAndType result = check bitbucketClient->listEffectiveDefaultReviewers("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "reviewer_type": "string",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listPullRequests</summary>

<div>

List pull requests.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `state` | <code>"OPEN"&#124;"MERGED"&#124;"DECLINED"&#124;"SUPERSEDED"</code> | No | Only return pull requests that are in this state. This parameter can be repeated. |

**Returns:** `PaginatedPullrequests|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPullrequests result = check bitbucketClient->listPullRequests("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "title": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createPullRequest</summary>

<div>

Create a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Pullrequest</code> | Yes | The new pull request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pullrequest|error`

**Sample code:**

```ballerina
bitbucket:Pullrequest result = check bitbucketClient->createPullRequest("string", "string", {
    'type: "string",
    id: 1,
    title: "string",
    summary: {
        markup: "markdown",
        raw: "string",
        html: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "summary": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "state": "OPEN",
  "author": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listRepoPullRequestActivity</summary>

<div>

List pull request activity log for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->listRepoPullRequestActivity("string", "string");
```

</div>
</details>

<details>
<summary>getPullRequest</summary>

<div>

Get a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pullrequest|error`

**Sample code:**

```ballerina
bitbucket:Pullrequest result = check bitbucketClient->getPullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "summary": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "state": "OPEN",
  "author": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updatePullRequest</summary>

<div>

Update a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Pullrequest</code> | Yes | The pull request that is to be updated. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pullrequest|error`

**Sample code:**

```ballerina
bitbucket:Pullrequest result = check bitbucketClient->updatePullRequest(1, "string", "string", {
    'type: "string",
    id: 1,
    title: "string",
    summary: {
        markup: "markdown",
        raw: "string",
        html: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "summary": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "state": "OPEN",
  "author": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listPullRequestActivity</summary>

<div>

List activity log for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->listPullRequestActivity(1, "string", "string");
```

</div>
</details>

<details>
<summary>approvePullRequest</summary>

<div>

Approve a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Participant|error`

**Sample code:**

```ballerina
bitbucket:Participant result = check bitbucketClient->approvePullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "role": "PARTICIPANT",
  "approved": false,
  "state": "approved",
  "participated_on": "string"
}
```

</div>
</details>

<details>
<summary>unapprovePullRequest</summary>

<div>

Unapprove a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->unapprovePullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>listCommentsOnPullRequest</summary>

<div>

List comments on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPullrequestComments|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPullrequestComments result = check bitbucketClient->listCommentsOnPullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "created_on": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createCommentOnPullRequest</summary>

<div>

Create a comment on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>PullrequestComment</code> | Yes | The comment object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestComment|error`

**Sample code:**

```ballerina
bitbucket:PullrequestComment result = check bitbucketClient->createCommentOnPullRequest(1, "string", "string", {
    'type: "string",
    id: 1,
    created_on: "string",
    updated_on: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getCommentOnPullRequest</summary>

<div>

Get a comment on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestComment|error`

**Sample code:**

```ballerina
bitbucket:PullrequestComment result = check bitbucketClient->getCommentOnPullRequest(1, 1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateCommentOnPullRequest</summary>

<div>

Update a comment on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>PullrequestComment</code> | Yes | The contents of the updated comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestComment|error`

**Sample code:**

```ballerina
bitbucket:PullrequestComment result = check bitbucketClient->updateCommentOnPullRequest(1, 1, "string", "string", {
    'type: "string",
    id: 1,
    created_on: "string",
    updated_on: "2026-01-15T00:00:00"
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteCommentOnPullRequest</summary>

<div>

Delete a comment on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteCommentOnPullRequest(1, 1, "string", "string");
```

</div>
</details>

<details>
<summary>resolveCommentThread</summary>

<div>

Resolve a comment thread.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CommentResolution|error`

**Sample code:**

```ballerina
bitbucket:CommentResolution result = check bitbucketClient->resolveCommentThread(1, 1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>reopenCommentThread</summary>

<div>

Reopen a comment thread.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->reopenCommentThread(1, 1, "string", "string");
```

</div>
</details>

<details>
<summary>listCommitsOnPullRequest</summary>

<div>

List commits on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->listCommitsOnPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>getFileConflictsForPullRequest</summary>

<div>

Get file conflicts for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getFileConflictsForPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>declinePullRequest</summary>

<div>

Decline a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pullrequest|error`

**Sample code:**

```ballerina
bitbucket:Pullrequest result = check bitbucketClient->declinePullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "summary": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "state": "OPEN",
  "author": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listChangesInPullRequest</summary>

<div>

List changes in a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->listChangesInPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>getDiffStatForPullRequest</summary>

<div>

Get the diff stat for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getDiffStatForPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>mergePullRequest</summary>

<div>

Merge a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>PullrequestMergeParameters</code> | Yes | Merge strategy, commit message and branch-closing options. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `async` | <code>boolean</code> | No | Default value is false. When set to true, runs merge asynchronously and immediately returns a 202 with polling link to the task-status API in the Location header. When set to false, runs merge and waits for it to complete, returning 200 when it succeeds. If the duration of the merge exceeds a timeout threshold, the API returns a 202 with polling link to the task-status API in the Location header. |

**Returns:** `Pullrequest|error?`

**Sample code:**

```ballerina
bitbucket:Pullrequest? result = check bitbucketClient->mergePullRequest(1, "string", "string", {
    'type: "string",
    message: "string",
    close_source_branch: false,
    merge_strategy: "merge_commit"
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "summary": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "state": "OPEN",
  "author": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getMergeTaskStatusForPullRequest</summary>

<div>

Get the merge task status for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `taskId` | <code>string</code> | Yes | ID of the merge task. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getMergeTaskStatusForPullRequest(1, "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>listPullRequestMergeabilityChecks</summary>

<div>

List pull request mergeability checks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Only a limited subset of BBQL is supported here. Checks that are expensive to calculate can be excluded: `type!="git_mergeability_check"` skips Git conflict evaluation, and `check.kind!="maximum_commits_behind"` skips the bounded Git ancestry check behind that standard merge check. Combine both with `AND` (either order). Anything else returns `400 Bad Request`. |

**Returns:** `PullrequestMergeabilityChecks|error`

**Sample code:**

```ballerina
bitbucket:PullrequestMergeabilityChecks result = check bitbucketClient->listPullRequestMergeabilityChecks(1, "string", "string");
```

**Sample response:**

```json
{
  "values": [
    {
      "type": "pullrequest_state_check",
      "status": "PASSED",
      "required": false,
      "blocking": false
    }
  ],
  "size": 1
}
```

</div>
</details>

<details>
<summary>getPatchForPullRequest</summary>

<div>

Get the patch for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPatchForPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>requestChangesForPullRequest</summary>

<div>

Request changes for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Participant|error`

**Sample code:**

```ballerina
bitbucket:Participant result = check bitbucketClient->requestChangesForPullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "role": "PARTICIPANT",
  "approved": false,
  "state": "approved",
  "participated_on": "string"
}
```

</div>
</details>

<details>
<summary>removeChangeRequestForPullRequest</summary>

<div>

Remove change request for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->removeChangeRequestForPullRequest(1, "string", "string");
```

</div>
</details>

<details>
<summary>listCommitStatusesForPullRequest</summary>

<div>

List commit statuses for a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). Defaults to `created_on`. |

**Returns:** `PaginatedCommitstatuses|error`

**Sample code:**

```ballerina
bitbucket:PaginatedCommitstatuses result = check bitbucketClient->listCommitStatusesForPullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "key": "string",
      "state": "FAILED"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listTasksOnPullRequest</summary>

<div>

List tasks on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response. See [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering) for details. |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). Defaults to `created_on`. |
| `pagelen` | <code>int</code> | No | Current number of objects on the existing page. The default value is 10 with 100 being the maximum allowed value. Individual APIs may enforce different values. |

**Returns:** `PaginatedTasks|error`

**Sample code:**

```ballerina
bitbucket:PaginatedTasks result = check bitbucketClient->listTasksOnPullRequest(1, "string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "updated_on": "2026-01-15T00:00:00",
      "creator": {
        "type": "string"
      },
      "created_on": "string",
      "state": "RESOLVED",
      "content": {}
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createTaskOnPullRequest</summary>

<div>

Create a task on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>PullrequestTaskCreate</code> | Yes | The contents of the task. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestCommentTask|error`

**Sample code:**

```ballerina
bitbucket:PullrequestCommentTask result = check bitbucketClient->createTaskOnPullRequest(1, "string", "string", {
    content: {
        raw: "string"
    },
    pending: false,
    comment: {
        'type: "string",
        id: 1,
        created_on: "string"
    }
});
```

**Sample response:**

```json
{
  "updated_on": "2026-01-15T00:00:00",
  "creator": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "created_on": "string",
  "state": "RESOLVED",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "resolved_by": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>getTaskOnPullRequest</summary>

<div>

Get a task on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `taskId` | <code>int</code> | Yes | The ID of the task. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestCommentTask|error`

**Sample code:**

```ballerina
bitbucket:PullrequestCommentTask result = check bitbucketClient->getTaskOnPullRequest(1, "string", 1, "string");
```

**Sample response:**

```json
{
  "updated_on": "2026-01-15T00:00:00",
  "creator": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "created_on": "string",
  "state": "RESOLVED",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "resolved_by": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateTaskOnPullRequest</summary>

<div>

Update a task on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `taskId` | <code>int</code> | Yes | The ID of the task. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>PullrequestTaskUpdate</code> | Yes | The updated state and content of the task. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PullrequestCommentTask|error`

**Sample code:**

```ballerina
bitbucket:PullrequestCommentTask result = check bitbucketClient->updateTaskOnPullRequest(1, "string", 1, "string", {
    state: "RESOLVED",
    content: {
        raw: "string"
    }
});
```

**Sample response:**

```json
{
  "updated_on": "2026-01-15T00:00:00",
  "creator": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "created_on": "string",
  "state": "RESOLVED",
  "content": {
    "markup": "markdown",
    "raw": "string",
    "html": "string"
  },
  "resolved_by": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteTaskOnPullRequest</summary>

<div>

Delete a task on a pull request.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pullRequestId` | <code>int</code> | Yes | The id of the pull request. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `taskId` | <code>int</code> | Yes | The ID of the task. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteTaskOnPullRequest(1, "string", 1, "string");
```

</div>
</details>

<details>
<summary>getPullRequestApplicationProperty</summary>

<div>

**Deprecated.** Get a pull request application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pullrequestId` | <code>string</code> | Yes | The pull request ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationProperty|error`

**Sample code:**

```ballerina
bitbucket:ApplicationProperty result = check bitbucketClient->getPullRequestApplicationProperty("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "Sample name");
```

**Sample response:**

```json
{
  "_attributes": [
    "public"
  ]
}
```

</div>
</details>

<details>
<summary>updatePullRequestApplicationProperty</summary>

<div>

**Deprecated.** Update a pull request application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pullrequestId` | <code>string</code> | Yes | The pull request ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `payload` | <code>ApplicationProperty</code> | Yes | The application property to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updatePullRequestApplicationProperty("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "Sample name", {
    _attributes: ["public"]
});
```

</div>
</details>

<details>
<summary>deletePullRequestApplicationProperty</summary>

<div>

**Deprecated.** Delete a pull request application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pullrequestId` | <code>string</code> | Yes | The pull request ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deletePullRequestApplicationProperty("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "Sample name");
```

</div>
</details>

<details>
<summary>listWorkspacePullRequestsForUser</summary>

<div>

List workspace pull requests for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be the username of the pull request author, the author's UUID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `state` | <code>"OPEN"&#124;"MERGED"&#124;"DECLINED"&#124;"SUPERSEDED"</code> | No | Only return pull requests that are in this state. This parameter can be repeated. |

**Returns:** `PaginatedPullrequests|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPullrequests result = check bitbucketClient->listWorkspacePullRequestsForUser("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "title": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Repository settings and access

<details>
<summary>listRepositoryDeployKeys</summary>

<div>

List repository deploy keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedDeployKeys|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDeployKeys result = check bitbucketClient->listRepositoryDeployKeys("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "key": "string",
      "repository": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>addRepositoryDeployKey</summary>

<div>

Add a repository deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeployKey|error`

**Sample code:**

```ballerina
bitbucket:DeployKey result = check bitbucketClient->addRepositoryDeployKey("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "comment": "string",
  "label": "string",
  "added_on": "string"
}
```

</div>
</details>

<details>
<summary>getRepositoryDeployKey</summary>

<div>

Get a repository deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The key ID matching the deploy key. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeployKey|error`

**Sample code:**

```ballerina
bitbucket:DeployKey result = check bitbucketClient->getRepositoryDeployKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "comment": "string",
  "label": "string",
  "added_on": "string"
}
```

</div>
</details>

<details>
<summary>updateRepositoryDeployKey</summary>

<div>

Update a repository deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The key ID matching the deploy key. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeployKey|error`

**Sample code:**

```ballerina
bitbucket:DeployKey result = check bitbucketClient->updateRepositoryDeployKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "comment": "string",
  "label": "string",
  "added_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteRepositoryDeployKey</summary>

<div>

Delete a repository deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The key ID matching the deploy key. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteRepositoryDeployKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>listDownloadArtifacts</summary>

<div>

List download artifacts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->listDownloadArtifacts("string", "string");
```

</div>
</details>

<details>
<summary>uploadDownloadArtifact</summary>

<div>

Upload a download artifact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->uploadDownloadArtifact("string", "string");
```

</div>
</details>

<details>
<summary>getDownloadArtifactLink</summary>

<div>

Get a download artifact link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filename` | <code>string</code> | Yes | Name of the file. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getDownloadArtifactLink("import.csv", "string", "string");
```

</div>
</details>

<details>
<summary>deleteDownloadArtifact</summary>

<div>

Delete a download artifact.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filename` | <code>string</code> | Yes | Name of the file. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteDownloadArtifact("import.csv", "string", "string");
```

</div>
</details>

<details>
<summary>listRepositoryForks</summary>

<div>

List repository forks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `role` | <code>"admin"&#124;"contributor"&#124;"member"&#124;"owner"</code> | No | Filters the result based on the authenticated user's role on each repository. * **member**: returns repositories to which the user has explicit read access * **contributor**: returns repositories to which the user has explicit write access * **admin**: returns repositories to which the user has explicit administrator access * **owner**: returns all repositories owned by the current user. |
| `sort` | <code>string</code> | No | Field by which the results should be sorted as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |

**Returns:** `PaginatedRepositories|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositories result = check bitbucketClient->listRepositoryForks("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "full_name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>forkRepository</summary>

<div>

Fork a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Repository</code> | Yes | A repository object. This can be left blank. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Repository|error`

**Sample code:**

```ballerina
bitbucket:Repository result = check bitbucketClient->forkRepository("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    full_name: "Sample name",
    is_private: false
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "full_name": "Sample name",
  "is_private": false,
  "parent": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "scm": "git"
}
```

</div>
</details>

<details>
<summary>getRepoInheritanceState</summary>

<div>

Retrieve the inheritance state for repository settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RepositoryInheritanceState|error`

**Sample code:**

```ballerina
bitbucket:RepositoryInheritanceState result = check bitbucketClient->getRepoInheritanceState("string", "string");
```

**Sample response:**

```json
{
  "type": "string"
}
```

</div>
</details>

<details>
<summary>setRepoInheritanceState</summary>

<div>

Set the inheritance state for repository settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->setRepoInheritanceState("string", "string");
```

</div>
</details>

<details>
<summary>listGroupPermissionsForRepository</summary>

<div>

List explicit group permissions for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedRepositoryGroupPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositoryGroupPermissions result = check bitbucketClient->listGroupPermissionsForRepository("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "group": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getGroupPermissionForRepository</summary>

<div>

Get an explicit group permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RepositoryGroupPermission|error`

**Sample code:**

```ballerina
bitbucket:RepositoryGroupPermission result = check bitbucketClient->getGroupPermissionForRepository("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "group": {
    "type": "string",
    "owner": {
      "type": "string"
    },
    "workspace": {
      "type": "string"
    }
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateGroupPermissionForRepository</summary>

<div>

Update an explicit group permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>RepoPermissionUpdate</code> | Yes | The permission to grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RepositoryGroupPermission|error`

**Sample code:**

```ballerina
bitbucket:RepositoryGroupPermission result = check bitbucketClient->updateGroupPermissionForRepository("string", "string", "string", {
    permission: "read"
});
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "group": {
    "type": "string",
    "owner": {
      "type": "string"
    },
    "workspace": {
      "type": "string"
    }
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteGroupPermissionForRepository</summary>

<div>

Delete an explicit group permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteGroupPermissionForRepository("string", "string", "string");
```

</div>
</details>

<details>
<summary>listUserPermissionsForRepository</summary>

<div>

List explicit user permissions for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedRepositoryUserPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositoryUserPermissions result = check bitbucketClient->listUserPermissionsForRepository("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getUserPermissionForRepository</summary>

<div>

Get an explicit user permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the UUID of the account, surrounded by curly-braces, for. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RepositoryUserPermission|error`

**Sample code:**

```ballerina
bitbucket:RepositoryUserPermission result = check bitbucketClient->getUserPermissionForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateUserPermissionForRepository</summary>

<div>

Update an explicit user permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the UUID of the account, surrounded by curly-braces, for. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>RepoPermissionUpdate</code> | Yes | The permission to grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RepositoryUserPermission|error`

**Sample code:**

```ballerina
bitbucket:RepositoryUserPermission result = check bitbucketClient->updateUserPermissionForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    permission: "read"
});
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>deleteUserPermissionForRepository</summary>

<div>

Delete an explicit user permission for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the UUID of the account, surrounded by curly-braces, for. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteUserPermissionForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>getRepositoryApplicationProperty</summary>

<div>

**Deprecated.** Get a repository application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationProperty|error`

**Sample code:**

```ballerina
bitbucket:ApplicationProperty result = check bitbucketClient->getRepositoryApplicationProperty("string", "string", "string", "Sample name");
```

**Sample response:**

```json
{
  "_attributes": [
    "public"
  ]
}
```

</div>
</details>

<details>
<summary>updateRepositoryApplicationProperty</summary>

<div>

**Deprecated.** Update a repository application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `payload` | <code>ApplicationProperty</code> | Yes | The application property to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateRepositoryApplicationProperty("string", "string", "string", "Sample name", {
    _attributes: ["public"]
});
```

</div>
</details>

<details>
<summary>deleteRepositoryApplicationProperty</summary>

<div>

**Deprecated.** Delete a repository application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The repository container; either the workspace slug or the UUID in curly braces. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteRepositoryApplicationProperty("string", "string", "string", "Sample name");
```

</div>
</details>

<details>
<summary>listRepositoriesWatchers</summary>

<div>

List repositories watchers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedAccounts|error`

**Sample code:**

```ballerina
bitbucket:PaginatedAccounts result = check bitbucketClient->listRepositoriesWatchers("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "created_on": "string",
      "display_name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Pipelines and deployments

<details>
<summary>listDeployments</summary>

<div>

List deployments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedDeployments|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDeployments result = check bitbucketClient->listDeployments("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "state": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getDeployment</summary>

<div>

Get a deployment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `deploymentUuid` | <code>string</code> | Yes | The deployment UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Deployment|error`

**Sample code:**

```ballerina
bitbucket:Deployment result = check bitbucketClient->getDeployment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "state": {
    "type": "string"
  },
  "environment": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Sample name"
  },
  "release": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listVariablesForEnvironment</summary>

<div>

List variables for an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedDeploymentVariable|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDeploymentVariable result = check bitbucketClient->listVariablesForEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createVariableForEnvironment</summary>

<div>

Create a variable for an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment. |
| `payload` | <code>DeploymentVariable</code> | Yes | The variable to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeploymentVariable|error`

**Sample code:**

```ballerina
bitbucket:DeploymentVariable result = check bitbucketClient->createVariableForEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>updateVariableForEnvironment</summary>

<div>

Update a variable for an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to update. |
| `payload` | <code>DeploymentVariable</code> | Yes | The updated deployment variable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeploymentVariable|error`

**Sample code:**

```ballerina
bitbucket:DeploymentVariable result = check bitbucketClient->updateVariableForEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>deleteVariableForEnvironment</summary>

<div>

Delete a variable for an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteVariableForEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listEnvironments</summary>

<div>

List environments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedEnvironments|error`

**Sample code:**

```ballerina
bitbucket:PaginatedEnvironments result = check bitbucketClient->listEnvironments("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createEnvironment</summary>

<div>

Create an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>DeploymentEnvironment</code> | Yes | The environment to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeploymentEnvironment|error`

**Sample code:**

```ballerina
bitbucket:DeploymentEnvironment result = check bitbucketClient->createEnvironment("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>getEnvironment</summary>

<div>

Get an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeploymentEnvironment|error`

**Sample code:**

```ballerina
bitbucket:DeploymentEnvironment result = check bitbucketClient->getEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name"
}
```

</div>
</details>

<details>
<summary>deleteEnvironment</summary>

<div>

Delete an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>updateEnvironment</summary>

<div>

Update an environment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `environmentUuid` | <code>string</code> | Yes | The environment UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateEnvironment("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listPipelines</summary>

<div>

List pipelines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `triggerType` | <code>"PUSH"&#124;"MANUAL"&#124;"SCHEDULED"&#124;"PARENT_STEP"</code> | No | The trigger type to filter by. |
| `creatorUuid` | <code>string</code> | No | The UUID of the creator of the pipeline to filter by. |
| `targetSelectorType` | <code>"BRANCH"&#124;"TAG"&#124;"CUSTOM"&#124;"PULLREQUESTS"&#124;"DEFAULT"</code> | No | The type of pipeline to filter by. |
| `sort` | <code>"creator.uuid"&#124;"created_on"&#124;"run_creation_date"</code> | No | The attribute name to sort on. |
| `targetCommitHash` | <code>string</code> | No | The revision to filter by. |
| `targetRefType` | <code>"BRANCH"&#124;"TAG"&#124;"ANNOTATED_TAG"</code> | No | The type of the reference to filter by. |
| `createdOn` | <code>string</code> | No | The creation date to filter by. |
| `targetBranch` | <code>string</code> | No | The name of the branch to filter by. |
| `targetRefName` | <code>string</code> | No | The reference name to filter by. |
| `targetSelectorPattern` | <code>string</code> | No | The pipeline pattern to filter by. |
| `page` | <code>int:Signed32</code> | No | The page number of elements to retrieve. Defaults to `1`. |
| `pagelen` | <code>int:Signed32</code> | No | The maximum number of results to return. Defaults to `10`. |
| `status` | <code>"PARSING"&#124;"PENDING"&#124;"PAUSED"&#124;"HALTED"&#124;"BUILDING"&#124;"ERROR"&#124;"PASSED"&#124;"FAILED"&#124;"STOPPED"&#124;"UNKNOWN"</code> | No | The pipeline status to filter by. |

**Returns:** `PaginatedPipelines|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelines result = check bitbucketClient->listPipelines("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "build_number": 1
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>runPipeline</summary>

<div>

Run a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>Pipeline</code> | Yes | The pipeline to initiate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `targetBranchToCreate` | <code>string</code> | No | Optional branch name to create from the requested branch or commit target. |
| `mergeDefaults` | <code>boolean</code> | No | Whether to merge repository-level defaults into the supplied YAML. Defaults to false. Defaults to `false`. |

**Returns:** `Pipeline|error`

**Sample code:**

```ballerina
bitbucket:Pipeline result = check bitbucketClient->runPipeline("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    build_number: 1,
    creator: {
        'type: "string",
        created_on: "string",
        display_name: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "build_number": 1,
  "creator": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "target": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>listCaches</summary>

<div>

List caches.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The account. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineCaches|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineCaches result = check bitbucketClient->listCaches("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "pipeline_uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>clearRepoCaches</summary>

<div>

Delete caches.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The account. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `name` | <code>string</code> | Yes | The cache name. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->clearRepoCaches("string", "string", name = "Sample name");
```

</div>
</details>

<details>
<summary>deleteCache</summary>

<div>

Delete a cache.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The account. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `cacheUuid` | <code>string</code> | Yes | The UUID of the cache to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteCache("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getCacheContentUri</summary>

<div>

Get cache content URI.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The account. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `cacheUuid` | <code>string</code> | Yes | The UUID of the cache. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineCacheContentUri|error`

**Sample code:**

```ballerina
bitbucket:PipelineCacheContentUri result = check bitbucketClient->getCacheContentUri("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "uri": "string"
}
```

</div>
</details>

<details>
<summary>listRepoRunners</summary>

<div>

Get repository runners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineRunners|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineRunners result = check bitbucketClient->listRepoRunners("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createRepositoryRunner</summary>

<div>

Create repository runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->createRepositoryRunner("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>getRepoRunnerByUuid</summary>

<div>

Get repository runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->getRepoRunnerByUuid("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>updateRepositoryRunner</summary>

<div>

Update repository runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->updateRepositoryRunner("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteRepositoryRunner</summary>

<div>

Delete repository runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteRepositoryRunner("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipeline</summary>

<div>

Get a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The pipeline UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Pipeline|error`

**Sample code:**

```ballerina
bitbucket:Pipeline result = check bitbucketClient->getPipeline("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "build_number": 1,
  "creator": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  },
  "target": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>listStepsForPipeline</summary>

<div>

List steps for a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineSteps|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineSteps result = check bitbucketClient->listStepsForPipeline("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "started_on": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getStepPipeline</summary>

<div>

Get a step of a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineStep|error`

**Sample code:**

```ballerina
bitbucket:PipelineStep result = check bitbucketClient->getStepPipeline("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "started_on": "string",
  "completed_on": "string",
  "state": {
    "type": "string"
  },
  "image": {
    "password": "string",
    "name": "Sample name",
    "email": "user@example.com"
  }
}
```

</div>
</details>

<details>
<summary>getLogFileForStep</summary>

<div>

Get log file for a step.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getLogFileForStep("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipelineStepContainerLog</summary>

<div>

Get the logs for the build container or a service container for a given step of a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `logUuid` | <code>string</code> | Yes | For the main build container specify the step UUID; for a service container specify the service container UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPipelineStepContainerLog("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipelineStepTestReportSummary</summary>

<div>

Get a summary of test reports for a given step of a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPipelineStepTestReportSummary("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getTestCasesForStepPipeline</summary>

<div>

Get test cases for a given step of a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getTestCasesForStepPipeline("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipelineTestCaseReasons</summary>

<div>

Get test case reasons (output) for a given test case in a step of a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `stepUuid` | <code>string</code> | Yes | The UUID of the step. |
| `testCaseUuid` | <code>string</code> | Yes | The UUID of the test case. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPipelineTestCaseReasons("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>stopPipeline</summary>

<div>

Stop a pipeline.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `pipelineUuid` | <code>string</code> | Yes | The UUID of the pipeline. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->stopPipeline("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getConfiguration</summary>

<div>

Get configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The account. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelinesConfig|error`

**Sample code:**

```ballerina
bitbucket:PipelinesConfig result = check bitbucketClient->getConfiguration("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "enabled": false,
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateConfiguration</summary>

<div>

Update configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelinesConfig</code> | Yes | The updated repository pipelines configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelinesConfig|error`

**Sample code:**

```ballerina
bitbucket:PipelinesConfig result = check bitbucketClient->updateConfiguration("string", "string", {
    'type: "string",
    enabled: false,
    repository: {
        'type: "string",
        uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        full_name: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "enabled": false,
  "repository": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "full_name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>updateNextBuildNumber</summary>

<div>

Update the next build number.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelineBuildNumber</code> | Yes | The build number to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineBuildNumber|error`

**Sample code:**

```ballerina
bitbucket:PipelineBuildNumber result = check bitbucketClient->updateNextBuildNumber("string", "string", {
    'type: "string",
    next: 1
});
```

**Sample response:**

```json
{
  "type": "string",
  "next": 1
}
```

</div>
</details>

<details>
<summary>listSchedules</summary>

<div>

List schedules.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineSchedules|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineSchedules result = check bitbucketClient->listSchedules("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "enabled": false
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createSchedule</summary>

<div>

Create a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelineSchedulePostRequestBody</code> | Yes | The schedule to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineSchedule|error`

**Sample code:**

```ballerina
bitbucket:PipelineSchedule result = check bitbucketClient->createSchedule("string", "string", {
    'type: "pipeline_schedule",
    target: {refName: "main", refType: "branch", selector: {'type: "branches", pattern: "main"}},
    cron_pattern: "0 0 12 * * ?",
    enabled: true
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "enabled": false,
  "target": {
    "type": "string",
    "ref_type": "branch",
    "ref_name": "Sample name"
  },
  "cron_pattern": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>getSchedule</summary>

<div>

Get a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `scheduleUuid` | <code>string</code> | Yes | The uuid of the schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineSchedule|error`

**Sample code:**

```ballerina
bitbucket:PipelineSchedule result = check bitbucketClient->getSchedule("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "enabled": false,
  "target": {
    "type": "string",
    "ref_type": "branch",
    "ref_name": "Sample name"
  },
  "cron_pattern": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>updateSchedule</summary>

<div>

Update a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `scheduleUuid` | <code>string</code> | Yes | The uuid of the schedule. |
| `payload` | <code>PipelineSchedulePutRequestBody</code> | Yes | The schedule to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineSchedule|error`

**Sample code:**

```ballerina
bitbucket:PipelineSchedule result = check bitbucketClient->updateSchedule("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    enabled: false
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "enabled": false,
  "target": {
    "type": "string",
    "ref_type": "branch",
    "ref_name": "Sample name"
  },
  "cron_pattern": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteSchedule</summary>

<div>

Delete a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `scheduleUuid` | <code>string</code> | Yes | The uuid of the schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteSchedule("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listExecutionsSchedule</summary>

<div>

List executions of a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `scheduleUuid` | <code>string</code> | Yes | The uuid of the schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineScheduleExecutions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineScheduleExecutions result = check bitbucketClient->listExecutionsSchedule("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getSshKeyPair</summary>

<div>

Get SSH key pair.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineSshKeyPair|error`

**Sample code:**

```ballerina
bitbucket:PipelineSshKeyPair result = check bitbucketClient->getSshKeyPair("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "private_key": "string",
  "public_key": "string"
}
```

</div>
</details>

<details>
<summary>updateSshKeyPair</summary>

<div>

Update SSH key pair.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelineSshKeyPair</code> | Yes | The created or updated SSH key pair. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineSshKeyPair|error`

**Sample code:**

```ballerina
bitbucket:PipelineSshKeyPair result = check bitbucketClient->updateSshKeyPair("string", "string", {
    'type: "string",
    private_key: "string",
    public_key: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "private_key": "string",
  "public_key": "string"
}
```

</div>
</details>

<details>
<summary>deleteSshKeyPair</summary>

<div>

Delete SSH key pair.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteSshKeyPair("string", "string");
```

</div>
</details>

<details>
<summary>listKnownHosts</summary>

<div>

List known hosts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineKnownHosts|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineKnownHosts result = check bitbucketClient->listKnownHosts("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "hostname": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createKnownHost</summary>

<div>

Create a known host.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelineKnownHost</code> | Yes | The known host to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineKnownHost|error`

**Sample code:**

```ballerina
bitbucket:PipelineKnownHost result = check bitbucketClient->createKnownHost("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    hostname: "Sample name",
    public_key: {
        'type: "string",
        key_type: "string",
        'key: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "hostname": "Sample name",
  "public_key": {
    "type": "string",
    "key_type": "string",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>getKnownHost</summary>

<div>

Get a known host.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `knownHostUuid` | <code>string</code> | Yes | The UUID of the known host to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineKnownHost|error`

**Sample code:**

```ballerina
bitbucket:PipelineKnownHost result = check bitbucketClient->getKnownHost("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "hostname": "Sample name",
  "public_key": {
    "type": "string",
    "key_type": "string",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateKnownHost</summary>

<div>

Update a known host.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `knownHostUuid` | <code>string</code> | Yes | The UUID of the known host to update. |
| `payload` | <code>PipelineKnownHost</code> | Yes | The updated known host. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineKnownHost|error`

**Sample code:**

```ballerina
bitbucket:PipelineKnownHost result = check bitbucketClient->updateKnownHost("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    hostname: "Sample name",
    public_key: {
        'type: "string",
        key_type: "string",
        'key: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "hostname": "Sample name",
  "public_key": {
    "type": "string",
    "key_type": "string",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteKnownHost</summary>

<div>

Delete a known host.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `knownHostUuid` | <code>string</code> | Yes | The UUID of the known host to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteKnownHost("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listVariablesForRepository</summary>

<div>

List variables for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineVariables|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineVariables result = check bitbucketClient->listVariablesForRepository("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createVariableForRepository</summary>

<div>

Create a variable for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `payload` | <code>PipelineVariable</code> | Yes | The variable to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->createVariableForRepository("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>getVariableForRepository</summary>

<div>

Get a variable for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->getVariableForRepository("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>updateVariableForRepository</summary>

<div>

Update a variable for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to update. |
| `payload` | <code>PipelineVariable</code> | Yes | The updated variable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->updateVariableForRepository("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>deleteVariableForRepository</summary>

<div>

Delete a variable for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `repoSlug` | <code>string</code> | Yes | The repository. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteVariableForRepository("string", "string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listVariablesForAccount</summary>

<div>

**Deprecated.** List variables for an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineVariables|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineVariables result = check bitbucketClient->listVariablesForAccount("Sample name");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createTeamPipelineVariable</summary>

<div>

**Deprecated.** Create a variable for a team.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account. |
| `payload` | <code>PipelineVariable</code> | Yes | The variable to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->createTeamPipelineVariable("Sample name", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>getVariableForTeam</summary>

<div>

**Deprecated.** Get a variable for a team.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->getVariableForTeam("Sample name", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>updateVariableForTeam</summary>

<div>

**Deprecated.** Update a variable for a team.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable. |
| `payload` | <code>PipelineVariable</code> | Yes | The updated variable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->updateVariableForTeam("Sample name", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>deleteVariableForTeam</summary>

<div>

**Deprecated.** Delete a variable for a team.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteVariableForTeam("Sample name", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listVariablesForUser</summary>

<div>

**Deprecated.** List variables for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineVariables|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineVariables result = check bitbucketClient->listVariablesForUser("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createUserPipelineVariable</summary>

<div>

**Deprecated.** Create a variable for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `payload` | <code>PipelineVariable</code> | Yes | The variable to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->createUserPipelineVariable("string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>getVariableForUser</summary>

<div>

**Deprecated.** Get a variable for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->getVariableForUser("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>updateVariableForUser</summary>

<div>

**Deprecated.** Update a variable for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable. |
| `payload` | <code>PipelineVariable</code> | Yes | The updated variable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->updateVariableForUser("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>deleteVariableForUser</summary>

<div>

**Deprecated.** Delete a variable for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteVariableForUser("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>getPipelinesOidcConfiguration</summary>

<div>

Get OpenID configuration for OIDC in Pipelines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getPipelinesOidcConfiguration("string");
```

</div>
</details>

<details>
<summary>getKeysForOidcInPipelines</summary>

<div>

Get keys for OIDC in Pipelines.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getKeysForOidcInPipelines("string");
```

</div>
</details>

<details>
<summary>listWorkspaceRunners</summary>

<div>

Get workspace runners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineRunners|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineRunners result = check bitbucketClient->listWorkspaceRunners("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createWorkspaceRunner</summary>

<div>

Create workspace runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->createWorkspaceRunner("string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>getWorkspaceRunnerByUuid</summary>

<div>

Get workspace runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->getWorkspaceRunnerByUuid("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>updateWorkspaceRunner</summary>

<div>

Update workspace runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineRunner|error`

**Sample code:**

```ballerina
bitbucket:PipelineRunner result = check bitbucketClient->updateWorkspaceRunner("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "labels": [
    "string"
  ],
  "state": {
    "type": "string",
    "status": "UNREGISTERED",
    "version": {
      "type": "string"
    }
  },
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteWorkspaceRunner</summary>

<div>

Delete workspace runner.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `runnerUuid` | <code>string</code> | Yes | The runner uuid. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteWorkspaceRunner("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

<details>
<summary>listVariablesForWorkspace</summary>

<div>

List variables for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedPipelineVariables|error`

**Sample code:**

```ballerina
bitbucket:PaginatedPipelineVariables result = check bitbucketClient->listVariablesForWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createVariableForWorkspace</summary>

<div>

Create a variable for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `payload` | <code>PipelineVariable</code> | Yes | The variable to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->createVariableForWorkspace("string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>getVariableForWorkspace</summary>

<div>

Get variable for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->getVariableForWorkspace("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>updateVariableForWorkspace</summary>

<div>

Update variable for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable. |
| `payload` | <code>PipelineVariable</code> | Yes | The updated variable. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PipelineVariable|error`

**Sample code:**

```ballerina
bitbucket:PipelineVariable result = check bitbucketClient->updateVariableForWorkspace("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    value: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "value": "string",
  "secured": false
}
```

</div>
</details>

<details>
<summary>deleteVariableForWorkspace</summary>

<div>

Delete a variable for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID surrounded by curly-braces, for example `{workspace UUID}`. |
| `variableUuid` | <code>string</code> | Yes | The UUID of the variable to delete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteVariableForWorkspace("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</div>
</details>

#### Webhooks

<details>
<summary>listWebhooksForRepository</summary>

<div>

List webhooks for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedWebhookSubscriptions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedWebhookSubscriptions result = check bitbucketClient->listWebhooksForRepository("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "url": "https://example.com/resource"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createWebhookForRepository</summary>

<div>

Create a webhook for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->createWebhookForRepository("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>getWebhookForRepository</summary>

<div>

Get a webhook for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->getWebhookForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateWebhookForRepository</summary>

<div>

Update a webhook for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->updateWebhookForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteWebhookForRepository</summary>

<div>

Delete a webhook for a repository.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteWebhookForRepository("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>listWebhooksForWorkspace</summary>

<div>

List webhooks for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedWebhookSubscriptions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedWebhookSubscriptions result = check bitbucketClient->listWebhooksForWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "url": "https://example.com/resource"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createWebhookForWorkspace</summary>

<div>

Create a webhook for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->createWebhookForWorkspace("string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>getWebhookForWorkspace</summary>

<div>

Get a webhook for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->getWebhookForWorkspace("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateWebhookForWorkspace</summary>

<div>

Update a webhook for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookSubscription|error`

**Sample code:**

```ballerina
bitbucket:WebhookSubscription result = check bitbucketClient->updateWebhookForWorkspace("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "description": "Sample description",
  "subject_type": "repository",
  "subject": {
    "type": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteWebhookForWorkspace</summary>

<div>

Delete a webhook for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uid` | <code>string</code> | Yes | Installed webhook's ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteWebhookForWorkspace("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

#### Snippets

<details>
<summary>createSnippet</summary>

<div>

Create a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Snippet</code> | Yes | The new snippet object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->createSnippet({
    'type: "string",
    id: 1,
    title: "string",
    scm: "git"
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>listSnippetsInWorkspace</summary>

<div>

List snippets in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `role` | <code>"owner"&#124;"contributor"&#124;"member"</code> | No | Filter down the result based on the authenticated user's role (`owner`, `contributor`, or `member`). |

**Returns:** `PaginatedSnippets|error`

**Sample code:**

```ballerina
bitbucket:PaginatedSnippets result = check bitbucketClient->listSnippetsInWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "id": 1,
      "title": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createSnippetForWorkspace</summary>

<div>

Create a snippet for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Snippet</code> | Yes | The new snippet object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->createSnippetForWorkspace("string", {
    'type: "string",
    id: 1,
    title: "string",
    scm: "git"
});
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>getSnippet</summary>

<div>

Get a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->getSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>updateSnippet</summary>

<div>

Update a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->updateSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deleteSnippet</summary>

<div>

Delete a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>listCommentsOnSnippet</summary>

<div>

List comments on a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedSnippetComments|error`

**Sample code:**

```ballerina
bitbucket:PaginatedSnippetComments result = check bitbucketClient->listCommentsOnSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "snippet": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createCommentOnSnippet</summary>

<div>

Create a comment on a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>SnippetComment</code> | Yes | The contents of the new comment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SnippetComment|error`

**Sample code:**

```ballerina
bitbucket:SnippetComment result = check bitbucketClient->createCommentOnSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    'type: "string",
    snippet: {
        'type: "string",
        id: 1,
        title: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "snippet": {
    "type": "string",
    "id": 1,
    "title": "string"
  }
}
```

</div>
</details>

<details>
<summary>getCommentOnSnippet</summary>

<div>

Get a comment on a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SnippetComment|error`

**Sample code:**

```ballerina
bitbucket:SnippetComment result = check bitbucketClient->getCommentOnSnippet(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "snippet": {
    "type": "string",
    "id": 1,
    "title": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateCommentOnSnippet</summary>

<div>

Update a comment on a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>SnippetComment</code> | Yes | The contents to update the comment to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SnippetComment|error`

**Sample code:**

```ballerina
bitbucket:SnippetComment result = check bitbucketClient->updateCommentOnSnippet(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    'type: "string",
    snippet: {
        'type: "string",
        id: 1,
        title: "string"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "snippet": {
    "type": "string",
    "id": 1,
    "title": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteCommentOnSnippet</summary>

<div>

Delete a comment on a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `commentId` | <code>int</code> | Yes | The id of the comment. |
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteCommentOnSnippet(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>listSnippetChanges</summary>

<div>

List snippet changes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedSnippetCommit|error`

**Sample code:**

```ballerina
bitbucket:PaginatedSnippetCommit result = check bitbucketClient->listSnippetChanges("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "hash": "string",
      "date": "2026-01-15T00:00:00"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getPreviousSnippetChange</summary>

<div>

Get a previous snippet change.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `revision` | <code>string</code> | Yes | The commit's SHA1. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SnippetCommit|error`

**Sample code:**

```ballerina
bitbucket:SnippetCommit result = check bitbucketClient->getPreviousSnippetChange("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "hash": "string",
  "date": "2026-01-15T00:00:00",
  "author": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "committer": {
    "type": "string",
    "raw": "string",
    "user": {
      "type": "string"
    }
  },
  "message": "string"
}
```

</div>
</details>

<details>
<summary>getSnippetRawFileAtHead</summary>

<div>

Get a snippet's raw file at HEAD.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `path` | <code>string</code> | Yes | Path to the file. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getSnippetRawFileAtHead("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>checkIfCurrentUserIsWatchingSnippet</summary>

<div>

Check if the current user is watching a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->checkIfCurrentUserIsWatchingSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>watchSnippet</summary>

<div>

Watch a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->watchSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>stopWatchingSnippet</summary>

<div>

Stop watching a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->stopWatchingSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>listUsersWatchingSnippet</summary>

<div>

**Deprecated.** List users watching a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedAccounts|error`

**Sample code:**

```ballerina
bitbucket:PaginatedAccounts result = check bitbucketClient->listUsersWatchingSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "created_on": "string",
      "display_name": "Sample name"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getPreviousRevisionSnippet</summary>

<div>

Get a previous revision of a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `nodeId` | <code>string</code> | Yes | A commit revision (SHA1). |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->getPreviousRevisionSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>updatePreviousRevisionSnippet</summary>

<div>

Update a previous revision of a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `nodeId` | <code>string</code> | Yes | A commit revision (SHA1). |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Snippet|error`

**Sample code:**

```ballerina
bitbucket:Snippet result = check bitbucketClient->updatePreviousRevisionSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "id": 1,
  "title": "string",
  "scm": "git",
  "created_on": "string",
  "updated_on": "2026-01-15T00:00:00"
}
```

</div>
</details>

<details>
<summary>deletePreviousRevisionSnippet</summary>

<div>

Delete a previous revision of a snippet.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `nodeId` | <code>string</code> | Yes | A commit revision (SHA1). |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deletePreviousRevisionSnippet("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

<details>
<summary>getSnippetRawFile</summary>

<div>

Get a snippet's raw file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `nodeId` | <code>string</code> | Yes | A commit revision (SHA1). |
| `path` | <code>string</code> | Yes | Path to the file. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getSnippetRawFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>getSnippetChangesBetweenVersions</summary>

<div>

Get snippet changes between versions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `revision` | <code>string</code> | Yes | A revspec expression. This can simply be a commit SHA1, a ref name, or a compare expression like `staging..production`. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `path` | <code>string</code> | No | When used, only one the diff of the specified file will be returned. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getSnippetChangesBetweenVersions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>getSnippetPatchBetweenVersions</summary>

<div>

Get snippet patch between versions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `encodedId` | <code>string</code> | Yes | The snippet id. |
| `revision` | <code>string</code> | Yes | A revspec expression. This can simply be a commit SHA1, a ref name, or a compare expression like `staging..production`. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getSnippetPatchBetweenVersions("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

#### Teams

<details>
<summary>searchCodeInTeamRepositories</summary>

<div>

**Deprecated.** Search for code in a team's repositories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | <code>string</code> | Yes | The account to search in; either the username or the UUID in curly braces. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Which page of the search results to retrieve. Defaults to `1`. |
| `searchQuery` | <code>string</code> | Yes | The search query. |
| `pagelen` | <code>int:Signed32</code> | No | How many search results to retrieve per page. Defaults to `10`. |

**Returns:** `SearchResultPage|error`

**Sample code:**

```ballerina
bitbucket:SearchResultPage result = check bitbucketClient->searchCodeInTeamRepositories("Sample name", searchQuery = "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "query_substituted": false,
  "values": [
    {
      "file": {
        "type": "string"
      },
      "content_match_count": 1,
      "type": "string"
    }
  ],
  "page": 1
}
```

</div>
</details>

#### User

<details>
<summary>getCurrentUser</summary>

<div>

Get current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
bitbucket:Account result = check bitbucketClient->getCurrentUser();
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>listEmailAddressesForCurrentUser</summary>

<div>

List email addresses for current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check bitbucketClient->listEmailAddressesForCurrentUser();
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>getEmailAddressForCurrentUser</summary>

<div>

Get an email address for current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | <code>string</code> | Yes | Email address of the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check bitbucketClient->getEmailAddressForCurrentUser("user@example.com");
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

<details>
<summary>listWorkspacesForCurrentUser</summary>

<div>

List workspaces for the current user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `administrator` | <code>boolean</code> | No | Filter workspaces based on which ones the caller has admin permissions or not. |
| `sort` | <code>string</code> | No | Name of a response property to sort results (only slug is supported). |

**Returns:** `PaginatedWorkspaceAccess|error`

**Sample code:**

```ballerina
bitbucket:PaginatedWorkspaceAccess result = check bitbucketClient->listWorkspacesForCurrentUser();
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "administrator": false,
      "workspace": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getUserPermissionOnWorkspace</summary>

<div>

Get user permission on a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WorkspaceMembership|error`

**Sample code:**

```ballerina
bitbucket:WorkspaceMembership result = check bitbucketClient->getUserPermissionOnWorkspace("string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "workspace": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listUserWorkspaceRepoPermissions</summary>

<div>

List repository permissions in a workspace for a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Name of a response property sort the result by as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |

**Returns:** `PaginatedRepositoryPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositoryPermissions result = check bitbucketClient->listUserWorkspaceRepoPermissions("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Users

<details>
<summary>getUser</summary>

<div>

Get a user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
bitbucket:Account result = check bitbucketClient->getUser("string");
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</div>
</details>

<details>
<summary>getUserApplicationProperty</summary>

<div>

**Deprecated.** Get a user application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationProperty|error`

**Sample code:**

```ballerina
bitbucket:ApplicationProperty result = check bitbucketClient->getUserApplicationProperty("string", "string", "Sample name");
```

**Sample response:**

```json
{
  "_attributes": [
    "public"
  ]
}
```

</div>
</details>

<details>
<summary>updateUserApplicationProperty</summary>

<div>

**Deprecated.** Update a user application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `payload` | <code>ApplicationProperty</code> | Yes | The application property to create or update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->updateUserApplicationProperty("string", "string", "Sample name", {
    _attributes: ["public"]
});
```

</div>
</details>

<details>
<summary>deleteUserApplicationProperty</summary>

<div>

**Deprecated.** Delete a user application property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `appKey` | <code>string</code> | Yes | The key of the Connect app. |
| `propertyName` | <code>string</code> | Yes | The name of the property. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteUserApplicationProperty("string", "string", "Sample name");
```

</div>
</details>

<details>
<summary>searchCodeInUserRepositories</summary>

<div>

**Deprecated.** Search for code in a user's repositories.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | Either the UUID of the account surrounded by curly-braces, for example `{account UUID}`, OR an Atlassian Account ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Which page of the search results to retrieve. Defaults to `1`. |
| `searchQuery` | <code>string</code> | Yes | The search query. |
| `pagelen` | <code>int:Signed32</code> | No | How many search results to retrieve per page. Defaults to `10`. |

**Returns:** `SearchResultPage|error`

**Sample code:**

```ballerina
bitbucket:SearchResultPage result = check bitbucketClient->searchCodeInUserRepositories("string", searchQuery = "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "query_substituted": false,
  "values": [
    {
      "file": {
        "type": "string"
      },
      "content_match_count": 1,
      "type": "string"
    }
  ],
  "page": 1
}
```

</div>
</details>

#### User keys

<details>
<summary>listGpgKeys</summary>

<div>

List GPG keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedGpgUserKeys|error`

**Sample code:**

```ballerina
bitbucket:PaginatedGpgUserKeys result = check bitbucketClient->listGpgKeys("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "owner": {
        "type": "string"
      },
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>addNewGpgKey</summary>

<div>

Add a new GPG key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `payload` | <code>GpgAccountKey</code> | Yes | The new GPG key object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GpgAccountKey|error`

**Sample code:**

```ballerina
bitbucket:GpgAccountKey result = check bitbucketClient->addNewGpgKey("string", {
    'type: "string",
    owner: {
        'type: "string",
        created_on: "string",
        display_name: "Sample name"
    },
    'key: "string",
    key_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
});
```

**Sample response:**

```json
{
  "type": "string",
  "owner": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "key": "string",
  "key_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fingerprint": "string",
  "parent_fingerprint": "string"
}
```

</div>
</details>

<details>
<summary>getGpgKey</summary>

<div>

Get a GPG key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fingerprint` | <code>string</code> | Yes | A GPG key fingerprint. |
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GpgAccountKey|error`

**Sample code:**

```ballerina
bitbucket:GpgAccountKey result = check bitbucketClient->getGpgKey("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "owner": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "key": "string",
  "key_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fingerprint": "string",
  "parent_fingerprint": "string"
}
```

</div>
</details>

<details>
<summary>deleteGpgKey</summary>

<div>

Delete a GPG key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fingerprint` | <code>string</code> | Yes | A GPG key fingerprint. |
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteGpgKey("string", "string");
```

</div>
</details>

<details>
<summary>listSshKeys</summary>

<div>

List SSH keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedSshUserKeys|error`

**Sample code:**

```ballerina
bitbucket:PaginatedSshUserKeys result = check bitbucketClient->listSshKeys("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>addNewSshKey</summary>

<div>

Add a new SSH key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `payload` | <code>SshAccountKey</code> | Yes | The new SSH key object. Note that the username property has been deprecated due to [privacy changes](https://developer.atlassian.com/cloud/bitbucket/bitbucket-api-changes-gdpr/#removal-of-usernames-from-user-referencing-apis). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expires_on` | <code>string</code> | No | The date or date-time of when the key will expire, in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format. Example: `YYYY-MM-DDTHH:mm:ss.sssZ`. |

**Returns:** `SshAccountKey|error`

**Sample code:**

```ballerina
bitbucket:SshAccountKey result = check bitbucketClient->addNewSshKey("string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    comment: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "comment": "string",
  "label": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>getSshKey</summary>

<div>

Get a SSH key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The SSH key's UUID value. |
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SshAccountKey|error`

**Sample code:**

```ballerina
bitbucket:SshAccountKey result = check bitbucketClient->getSshKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "comment": "string",
  "label": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>updateSshKey</summary>

<div>

Update a SSH key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The SSH key's UUID value. |
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `payload` | <code>SshAccountKey</code> | Yes | The updated SSH key object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SshAccountKey|error`

**Sample code:**

```ballerina
bitbucket:SshAccountKey result = check bitbucketClient->updateSshKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    comment: "string"
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "comment": "string",
  "label": "string",
  "created_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteSshKey</summary>

<div>

Delete a SSH key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The SSH key's UUID value. |
| `selectedUser` | <code>string</code> | Yes | This can either be an Atlassian Account ID OR the UUID of the account,. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteSshKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>

#### Workspaces

<details>
<summary>getWorkspace</summary>

<div>

Get a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Workspace|error`

**Sample code:**

```ballerina
bitbucket:Workspace result = check bitbucketClient->getWorkspace("string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Sample name",
  "slug": "string",
  "is_private": false,
  "is_personal": false
}
```

</div>
</details>

<details>
<summary>searchForCodeInWorkspace</summary>

<div>

**Deprecated.** Search for code in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | The workspace to search in; either the slug or the UUID in curly braces. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `page` | <code>int:Signed32</code> | No | Which page of the search results to retrieve. Defaults to `1`. |
| `searchQuery` | <code>string</code> | Yes | The search query. |
| `pagelen` | <code>int:Signed32</code> | No | How many search results to retrieve per page. Defaults to `10`. |

**Returns:** `SearchResultPage|error`

**Sample code:**

```ballerina
bitbucket:SearchResultPage result = check bitbucketClient->searchForCodeInWorkspace("string", searchQuery = "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "query_substituted": false,
  "values": [
    {
      "file": {
        "type": "string"
      },
      "content_match_count": 1,
      "type": "string"
    }
  ],
  "page": 1
}
```

</div>
</details>

<details>
<summary>getWorkspaceSystemGpgPublicKey</summary>

<div>

Get the workspace system GPG public key(s).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->getWorkspaceSystemGpgPublicKey("string");
```

</div>
</details>

#### Workspace members and permissions

<details>
<summary>listUsersInWorkspace</summary>

<div>

List users in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedWorkspaceMemberships|error`

**Sample code:**

```ballerina
bitbucket:PaginatedWorkspaceMemberships result = check bitbucketClient->listUsersInWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "user": {
        "type": "string"
      },
      "workspace": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getUserMembershipForWorkspace</summary>

<div>

Get user membership for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `member` | <code>string</code> | Yes | Member's UUID or Atlassian ID. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WorkspaceMembership|error`

**Sample code:**

```ballerina
bitbucket:WorkspaceMembership result = check bitbucketClient->getUserMembershipForWorkspace("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "workspace": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Sample name"
  }
}
```

</div>
</details>

<details>
<summary>listUserPermissionsInWorkspace</summary>

<div>

List user permissions in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |

**Returns:** `PaginatedWorkspaceMemberships|error`

**Sample code:**

```ballerina
bitbucket:PaginatedWorkspaceMemberships result = check bitbucketClient->listUserPermissionsInWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "user": {
        "type": "string"
      },
      "workspace": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listWorkspaceRepoPermissions</summary>

<div>

List all repository permissions for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Name of a response property sort the result by as per [filtering and sorting](/cloud/bitbucket/rest/intro/#sorting-query-results). |

**Returns:** `PaginatedRepositoryPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositoryPermissions result = check bitbucketClient->listWorkspaceRepoPermissions("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>listRepositoryPermissionsForWorkspace</summary>

<div>

List a repository permissions for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `repoSlug` | <code>string</code> | Yes | This can either be the repository slug or the UUID of the repository,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `q` | <code>string</code> | No | Query string to narrow down the response as per [filtering and sorting](/cloud/bitbucket/rest/intro/#filtering). |
| `sort` | <code>string</code> | No | Name of a response property sort the result by as per [filtering and sorting](/cloud/bitbucket/rest/intro/#sorting-query-results). |

**Returns:** `PaginatedRepositoryPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedRepositoryPermissions result = check bitbucketClient->listRepositoryPermissionsForWorkspace("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

#### Projects

<details>
<summary>listProjectsInWorkspace</summary>

<div>

List projects in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedProjects|error`

**Sample code:**

```ballerina
bitbucket:PaginatedProjects result = check bitbucketClient->listProjectsInWorkspace("string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "key": "string"
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createProjectInWorkspace</summary>

<div>

Create a project in a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Project</code> | Yes | Request payload containing the project to submit. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bitbucket:Project result = check bitbucketClient->createProjectInWorkspace("string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    owner: {
        'type: "string",
        created_on: "string",
        display_name: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "owner": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getProjectForWorkspace</summary>

<div>

Get a project for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bitbucket:Project result = check bitbucketClient->getProjectForWorkspace("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "owner": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>updateProjectForWorkspace</summary>

<div>

Update a project for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>Project</code> | Yes | Request payload containing the project to submit. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Project|error`

**Sample code:**

```ballerina
bitbucket:Project result = check bitbucketClient->updateProjectForWorkspace("string", "string", {
    'type: "string",
    uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    'key: "string",
    owner: {
        'type: "string",
        created_on: "string",
        display_name: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "type": "string",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "key": "string",
  "owner": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "name": "Sample name",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>deleteProjectForWorkspace</summary>

<div>

Delete a project for a workspace.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteProjectForWorkspace("string", "string");
```

</div>
</details>

<details>
<summary>getBranchingModelForProject</summary>

<div>

Get the branching model for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectBranchingModel|error`

**Sample code:**

```ballerina
bitbucket:ProjectBranchingModel result = check bitbucketClient->getBranchingModelForProject("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string"
    }
  ],
  "development": {
    "name": "Sample name",
    "use_mainbranch": false
  },
  "production": {
    "name": "Sample name",
    "use_mainbranch": false
  }
}
```

</div>
</details>

<details>
<summary>getBranchingModelConfigForProject</summary>

<div>

Get the branching model config for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchingModelSettings|error`

**Sample code:**

```ballerina
bitbucket:BranchingModelSettings result = check bitbucketClient->getBranchingModelConfigForProject("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string",
      "enabled": false
    }
  ],
  "development": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  },
  "production": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  }
}
```

</div>
</details>

<details>
<summary>updateBranchingModelConfigForProject</summary>

<div>

Update the branching model config for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BranchingModelSettings|error`

**Sample code:**

```ballerina
bitbucket:BranchingModelSettings result = check bitbucketClient->updateBranchingModelConfigForProject("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "branch_types": [
    {
      "kind": "feature",
      "prefix": "string",
      "enabled": false
    }
  ],
  "development": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  },
  "production": {
    "is_valid": false,
    "name": "Sample name",
    "use_mainbranch": false
  }
}
```

</div>
</details>

<details>
<summary>listDefaultReviewersInProject</summary>

<div>

List the default reviewers in a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedDefaultReviewerAndType|error`

**Sample code:**

```ballerina
bitbucket:PaginatedDefaultReviewerAndType result = check bitbucketClient->listDefaultReviewersInProject("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "reviewer_type": "string",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getProjectDefaultReviewer</summary>

<div>

Get a project default reviewer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This can either be the actual `key` assigned. |
| `selectedUser` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `User|error`

**Sample code:**

```ballerina
bitbucket:User result = check bitbucketClient->getProjectDefaultReviewer("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account_status": "string"
}
```

</div>
</details>

<details>
<summary>addProjectDefaultReviewer</summary>

<div>

Add the specific user as a default reviewer for the project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This can either be the actual `key` assigned. |
| `selectedUser` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `User|error`

**Sample code:**

```ballerina
bitbucket:User result = check bitbucketClient->addProjectDefaultReviewer("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "created_on": "string",
  "display_name": "Sample name",
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account_status": "string"
}
```

</div>
</details>

<details>
<summary>removeProjectDefaultReviewer</summary>

<div>

Remove the specific user from the project's default reviewers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This can either be the actual `key` assigned. |
| `selectedUser` | <code>string</code> | Yes | This can either be the username or the UUID of the default reviewer,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->removeProjectDefaultReviewer("string", "string", "string");
```

</div>
</details>

<details>
<summary>listProjectDeployKeys</summary>

<div>

List project deploy keys.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedProjectDeployKeys|error`

**Sample code:**

```ballerina
bitbucket:PaginatedProjectDeployKeys result = check bitbucketClient->listProjectDeployKeys("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "key": "string",
      "project": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>createProjectDeployKey</summary>

<div>

Create a project deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectDeployKey|error`

**Sample code:**

```ballerina
bitbucket:ProjectDeployKey result = check bitbucketClient->createProjectDeployKey("string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  },
  "comment": "string",
  "label": "string",
  "added_on": "string"
}
```

</div>
</details>

<details>
<summary>getProjectDeployKey</summary>

<div>

Get a project deploy key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The key ID matching the project deploy key. |
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectDeployKey|error`

**Sample code:**

```ballerina
bitbucket:ProjectDeployKey result = check bitbucketClient->getProjectDeployKey("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "key": "string",
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  },
  "comment": "string",
  "label": "string",
  "added_on": "string"
}
```

</div>
</details>

<details>
<summary>deleteDeployKeyFromProject</summary>

<div>

Delete a deploy key from a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyId` | <code>string</code> | Yes | The key ID matching the project deploy key. |
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual `key` assigned. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteDeployKeyFromProject("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", "string");
```

</div>
</details>

<details>
<summary>listGroupPermissionsForProject</summary>

<div>

List explicit group permissions for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedProjectGroupPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedProjectGroupPermissions result = check bitbucketClient->listGroupPermissionsForProject("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "group": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getGroupPermissionForProject</summary>

<div>

Get an explicit group permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectGroupPermission|error`

**Sample code:**

```ballerina
bitbucket:ProjectGroupPermission result = check bitbucketClient->getGroupPermissionForProject("string", "string", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "group": {
    "type": "string",
    "owner": {
      "type": "string"
    },
    "workspace": {
      "type": "string"
    }
  },
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateGroupPermissionForProject</summary>

<div>

Update an explicit group permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>ProjectPermissionUpdate</code> | Yes | The permission to grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectGroupPermission|error`

**Sample code:**

```ballerina
bitbucket:ProjectGroupPermission result = check bitbucketClient->updateGroupPermissionForProject("string", "string", "string", {
    permission: "read"
});
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "group": {
    "type": "string",
    "owner": {
      "type": "string"
    },
    "workspace": {
      "type": "string"
    }
  },
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteGroupPermissionForProject</summary>

<div>

Delete an explicit group permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `groupSlug` | <code>string</code> | Yes | Slug of the requested group. |
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteGroupPermissionForProject("string", "string", "string");
```

</div>
</details>

<details>
<summary>listUserPermissionsForProject</summary>

<div>

List explicit user permissions for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaginatedProjectUserPermissions|error`

**Sample code:**

```ballerina
bitbucket:PaginatedProjectUserPermissions result = check bitbucketClient->listUserPermissionsForProject("string", "string");
```

**Sample response:**

```json
{
  "next": "string",
  "size": 1,
  "previous": "string",
  "values": [
    {
      "type": "string",
      "permission": "read",
      "user": {
        "type": "string"
      }
    }
  ],
  "page": 1,
  "pagelen": 1
}
```

</div>
</details>

<details>
<summary>getUserPermissionForProject</summary>

<div>

Get an explicit user permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the username, the user's UUID surrounded by curly-braces,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectUserPermission|error`

**Sample code:**

```ballerina
bitbucket:ProjectUserPermission result = check bitbucketClient->getUserPermissionForProject("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>updateUserPermissionForProject</summary>

<div>

Update an explicit user permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the username, the user's UUID surrounded by curly-braces,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `payload` | <code>ProjectPermissionUpdate</code> | Yes | The permission to grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProjectUserPermission|error`

**Sample code:**

```ballerina
bitbucket:ProjectUserPermission result = check bitbucketClient->updateUserPermissionForProject("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    permission: "read"
});
```

**Sample response:**

```json
{
  "type": "string",
  "permission": "read",
  "user": {
    "type": "string",
    "created_on": "string",
    "display_name": "Sample name"
  },
  "project": {
    "type": "string",
    "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "key": "string"
  }
}
```

</div>
</details>

<details>
<summary>deleteUserPermissionForProject</summary>

<div>

Delete an explicit user permission for a project.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectKey` | <code>string</code> | Yes | The project in question. This is the actual key assigned to the project. |
| `selectedUserId` | <code>string</code> | Yes | This can either be the username, the user's UUID surrounded by curly-braces,. |
| `workspace` | <code>string</code> | Yes | This can either be the workspace ID (slug) or the workspace UUID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check bitbucketClient->deleteUserPermissionForProject("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

</div>
</details>
