---
title: Actions
---

# Actions

The `ballerinax/elastic.elasticcloud` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the Elastic Cloud REST API for deployment management, organization admin, traffic filters, extensions, API keys, and more. |

---

## Client

Provides access to the Elastic Cloud REST API for deployment management, organization admin, traffic filters, extensions, API keys, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authorization` | `string` | Required | The API key authorization header value (e.g., `"ApiKey " + apiKey`). |

### Initializing the client

```ballerina
import ballerinax/elastic.elasticcloud;

configurable string apiKey = ?;

elasticcloud:Client elasticClient = check new ({
    authorization: "ApiKey " + apiKey
});
```

### Operations

#### Account operations

<details>
<summary>Fetch current account information</summary>

Retrieves the current account information including trust settings.

Returns: `AccountResponse|error`

Sample code:

```ballerina
elasticcloud:AccountResponse account = check elasticClient->/account();
```

Sample response:

```ballerina
{"id": "abc123456789", "trust": {"trust_all": false}}
```

</details>

<details>
<summary>Updates the current account</summary>

Replaces the current account settings with the provided values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AccountUpdateRequest` | Yes | The updated account data. |

Returns: `AccountResponse|error`

Sample code:

```ballerina
elasticcloud:AccountResponse updated = check elasticClient->/account.put({});
```

Sample response:

```ballerina
{"id": "abc123456789", "trust": {"trust_all": true}}
```

</details>

<details>
<summary>Patch the current account</summary>

Applies partial updates to the current account using JSON Merge Patch rules.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `string` | Yes | JSON Merge Patch payload for partial account updates. |

Returns: `AccountResponse|error`

Sample code:

```ballerina
elasticcloud:AccountResponse patched = check elasticClient->/account.patch("{}");
```

Sample response:

```ballerina
{"id": "abc123456789", "trust": {"trust_all": false}}
```

</details>

#### Deployment operations

<details>
<summary>List Deployments</summary>

Retrieves all deployments belonging to the authenticated user.

Returns: `DeploymentsListResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentsListResponse deploymentsList = check elasticClient->/deployments();
```

Sample response:

```ballerina
{"deployments": [{"id": "a1b2c3d4e5", "name": "my-deployment", "resources": [{"ref_id": "main-elasticsearch", "kind": "elasticsearch", "id": "es-abc123"}]}]}
```

</details>

<details>
<summary>Create Deployment</summary>

Creates a new deployment with the specified configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DeploymentCreateRequest` | Yes | The deployment definition including name, region, and version. |
| `queries` | `CreateDeploymentQueries` | No | Query parameters including `template_id` and `validate_only`. |

Returns: `DeploymentCreateResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentCreateResponse createdDeployment = check elasticClient->/deployments.post(
    {
        name: "ballerina-example-deployment",
        region: "gcp-asia-south1",
        version: "8.17.0"
    },
    queries = {template_id: "gcp-general-purpose"}
);
```

Sample response:

```ballerina
{"id": "f6g7h8i9j0", "name": "ballerina-example-deployment", "created": true, "resources": [{"ref_id": "main-elasticsearch", "kind": "elasticsearch", "id": "es-xyz789"}]}
```

</details>

<details>
<summary>Search Deployments</summary>

Searches for deployments matching a query. When no query is specified, all deployments are matched.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchRequest` | Yes | The search query. Use an empty record to match all deployments. |
| `queries` | `SearchDeploymentsQueries` | No | Query parameters for search pagination. |

Returns: `DeploymentsSearchResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentsSearchResponse searchResults = check elasticClient->/deployments/_search.post(
    {size: 10}
);
```

Sample response:

```ballerina
{"return_count": 2, "deployments": [{"id": "a1b2c3d4e5", "name": "my-deployment", "healthy": true}, {"id": "f6g7h8i9j0", "name": "test-deployment", "healthy": true}]}
```

</details>

<details>
<summary>Get Deployment</summary>

Retrieves detailed information about a specific deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `queries` | `GetDeploymentQueries` | No | Query parameters to control response detail. |

Returns: `DeploymentGetResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentGetResponse deployment = check elasticClient->/deployments/["a1b2c3d4e5"]();
```

Sample response:

```ballerina
{"id": "a1b2c3d4e5", "name": "my-deployment", "healthy": true, "resources": {"elasticsearch": [], "kibana": [], "apm": [], "integrations_server": [], "enterprise_search": []}}
```

</details>

<details>
<summary>Update Deployment</summary>

Updates an existing deployment with a new configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `payload` | `DeploymentUpdateRequest` | Yes | The updated deployment definition. |

Returns: `DeploymentUpdateResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentUpdateResponse updated = check elasticClient->/deployments/["a1b2c3d4e5"].put(
    {name: "renamed-deployment"}
);
```

Sample response:

```ballerina
{"id": "a1b2c3d4e5", "name": "renamed-deployment", "resources": [{"ref_id": "main-elasticsearch", "kind": "elasticsearch", "id": "es-abc123"}]}
```

</details>

<details>
<summary>Shuts down Deployment</summary>

Shuts down all resources in a deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `queries` | `ShutdownDeploymentQueries` | No | Query parameters including `hide` and `skip_snapshot`. |

Returns: `DeploymentShutdownResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentShutdownResponse shutdownResp = check elasticClient->/deployments/["a1b2c3d4e5"]/_shutdown.post();
```

Sample response:

```ballerina
{"id": "a1b2c3d4e5", "name": "my-deployment"}
```

</details>

<details>
<summary>Restores a shutdown Deployment</summary>

Restores a previously shut-down deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |

Returns: `DeploymentRestoreResponse|error`

Sample code:

```ballerina
elasticcloud:DeploymentRestoreResponse restoreResp = check elasticClient->/deployments/["a1b2c3d4e5"]/_restore.post();
```

Sample response:

```ballerina
{"id": "a1b2c3d4e5"}
```

</details>

#### Elasticsearch resource operations

<details>
<summary>Get Deployment Elasticsearch Resource Info</summary>

Retrieves detailed information about the Elasticsearch resource within a deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `refId` | `string` | Yes | User-specified RefId for the resource (or `_main` if there is only one). |

Returns: `ElasticsearchResourceInfo|error`

Sample code:

```ballerina
elasticcloud:ElasticsearchResourceInfo esInfo = check elasticClient->/deployments/["a1b2c3d4e5"]/elasticsearch/["main-elasticsearch"]();
```

Sample response:

```ballerina
{"ref_id": "main-elasticsearch", "id": "es-abc123", "region": "gcp-asia-south1", "info": {"healthy": true, "status": "started"}}
```

</details>

<details>
<summary>Reset Elasticsearch user password</summary>

Resets the password for the `elastic` user on the specified Elasticsearch resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `refId` | `string` | Yes | User-specified RefId for the Elasticsearch resource. |

Returns: `ElasticsearchElasticUserPasswordResetResponse|error`

Sample code:

```ballerina
elasticcloud:ElasticsearchElasticUserPasswordResetResponse resetResp = check elasticClient->/deployments/["a1b2c3d4e5"]/elasticsearch/["main-elasticsearch"]/_reset\-password.post();
```

Sample response:

```ballerina
{"username": "elastic", "password": "newGeneratedPassword123"}
```

</details>

<details>
<summary>Get Elasticsearch keystore</summary>

Retrieves the keystore contents for the specified Elasticsearch resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `refId` | `string` | Yes | User-specified RefId for the Elasticsearch resource. |

Returns: `KeystoreContents|error`

Sample code:

```ballerina
elasticcloud:KeystoreContents keystore = check elasticClient->/deployments/["a1b2c3d4e5"]/elasticsearch/["main-elasticsearch"]/keystore();
```

Sample response:

```ballerina
{"secrets": {"s3.client.default.access_key": {"as_file": false}}}
```

</details>

<details>
<summary>Get remote clusters</summary>

Retrieves the remote cluster configuration for cross-cluster search and replication.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |
| `refId` | `string` | Yes | User-specified RefId for the Elasticsearch resource. |

Returns: `RemoteResources|error`

Sample code:

```ballerina
elasticcloud:RemoteResources remoteClusters = check elasticClient->/deployments/["a1b2c3d4e5"]/elasticsearch/["main-elasticsearch"]/remote\-clusters();
```

Sample response:

```ballerina
{"resources": []}
```

</details>

#### Extension operations

<details>
<summary>List Extensions</summary>

Retrieves all available extensions.

Returns: `Extensions|error`

Sample code:

```ballerina
elasticcloud:Extensions extensions = check elasticClient->/deployments/extensions();
```

Sample response:

```ballerina
{"extensions": [{"id": "ext-001", "name": "custom-analyzer", "extension_type": "bundle", "description": "Custom analysis plugin"}]}
```

</details>

<details>
<summary>Create an extension</summary>

Creates a new extension for use with Elasticsearch deployments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateExtensionRequest` | Yes | The extension creation data including name, type, and version. |

Returns: `Extension|error`

Sample code:

```ballerina
elasticcloud:Extension ext = check elasticClient->/deployments/extensions.post({
    name: "my-plugin",
    extension_type: "bundle",
    version: "8.17.*"
});
```

Sample response:

```ballerina
{"id": "ext-002", "name": "my-plugin", "extension_type": "bundle"}
```

</details>

<details>
<summary>Get Extension</summary>

Retrieves the details of a specific extension.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `extensionId` | `string` | Yes | Identifier for the extension. |

Returns: `Extension|error`

Sample code:

```ballerina
elasticcloud:Extension ext = check elasticClient->/deployments/extensions/["ext-001"]();
```

Sample response:

```ballerina
{"id": "ext-001", "name": "custom-analyzer", "extension_type": "bundle", "description": "Custom analysis plugin", "deployments": ["a1b2c3d4e5"]}
```

</details>

<details>
<summary>Delete Extension</summary>

Deletes an extension by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `extensionId` | `string` | Yes | Identifier for the extension. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/deployments/extensions/["ext-001"].delete();
```

</details>

#### Traffic filter operations

<details>
<summary>List traffic filter rulesets</summary>

Retrieves all traffic filter rulesets.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetTrafficFilterRulesetsQueries` | No | Query parameters to filter rulesets by region or include associations. |

Returns: `TrafficFilterRulesets|error`

Sample code:

```ballerina
elasticcloud:TrafficFilterRulesets rulesets = check elasticClient->/deployments/traffic\-filter/rulesets();
```

Sample response:

```ballerina
{"rulesets": [{"id": "tf-001", "name": "office-ip-filter", "type": "ip", "include_by_default": false, "rules": [{"source": "203.0.113.0/24"}]}]}
```

</details>

<details>
<summary>Create traffic filter ruleset</summary>

Creates a new traffic filter ruleset for controlling network access.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TrafficFilterRulesetRequest` | Yes | The ruleset definition including name, type, and rules. |

Returns: `TrafficFilterRulesetResponse|error`

Sample code:

```ballerina
elasticcloud:TrafficFilterRulesetResponse ruleset = check elasticClient->/deployments/traffic\-filter/rulesets.post({
    name: "office-ip-filter",
    'type: "ip",
    include_by_default: false,
    rules: [{source: "203.0.113.0/24"}]
});
```

Sample response:

```ballerina
{"id": "tf-002"}
```

</details>

<details>
<summary>Delete traffic filter ruleset</summary>

Deletes a traffic filter ruleset by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rulesetId` | `string` | Yes | Identifier for the traffic filter ruleset. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/deployments/traffic\-filter/rulesets/["tf-001"].delete();
```

</details>

<details>
<summary>Create traffic filter ruleset association</summary>

Associates a traffic filter ruleset with a deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rulesetId` | `string` | Yes | Identifier for the traffic filter ruleset. |
| `payload` | `FilterAssociation` | Yes | The association definition including entity type and ID. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/deployments/traffic\-filter/rulesets/["tf-001"]/associations.post({
    entity_type: "deployment",
    id: "a1b2c3d4e5"
});
```

</details>

#### Deployment template & stack version operations

<details>
<summary>Get deployment templates</summary>

Retrieves available deployment templates for creating new deployments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetDeploymentTemplatesV2Queries` | No | Query parameters including `region` and `stack_version`. |

Returns: `DeploymentTemplateInfoV2[]|error`

Sample code:

```ballerina
elasticcloud:DeploymentTemplateInfoV2[] templates = check elasticClient->/deployments/templates(queries = {region: "gcp-asia-south1"});
```

Sample response:

```ballerina
[{"id": "gcp-general-purpose", "name": "General Purpose", "description": "A general purpose deployment template"}]
```

</details>

<details>
<summary>Get available Elastic Stack versions</summary>

Retrieves all available Elastic Stack versions including template version and structure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetVersionStacksQueries` | No | Query parameters including `show_deleted` and `show_unusable`. |

Returns: `StackVersionConfigs|error`

Sample code:

```ballerina
elasticcloud:StackVersionConfigs versions = check elasticClient->/stack/versions();
```

Sample response:

```ballerina
{"stacks": [{"version": "8.17.0", "accessible": true, "min_upgradable_from": "7.17.0"}]}
```

</details>

#### Organization operations

<details>
<summary>List organizations</summary>

Retrieves all organizations accessible to the authenticated user.

Returns: `OrganizationList|error`

Sample code:

```ballerina
elasticcloud:OrganizationList orgs = check elasticClient->/organizations();
```

Sample response:

```ballerina
{"organizations": [{"id": "org-abc123", "name": "My Organization"}]}
```

</details>

<details>
<summary>Fetch organization information</summary>

Retrieves detailed information about a specific organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | Identifier for the organization. |

Returns: `Organization|error`

Sample code:

```ballerina
elasticcloud:Organization org = check elasticClient->/organizations/["org-abc123"]();
```

Sample response:

```ballerina
{"id": "org-abc123", "name": "My Organization", "default_disk_usage_alerts_enabled": true}
```

</details>

<details>
<summary>Update organization</summary>

Updates an organization's settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | Identifier for the organization. |
| `payload` | `OrganizationRequest` | Yes | The organization update payload. |

Returns: `Organization|error`

Sample code:

```ballerina
elasticcloud:Organization updated = check elasticClient->/organizations/["org-abc123"].put({
    notifications_allowed_email_domains: ["example.com"]
});
```

Sample response:

```ballerina
{"id": "org-abc123", "name": "My Organization", "notifications_allowed_email_domains": ["example.com"]}
```

</details>

<details>
<summary>Get organization members</summary>

Retrieves all members of an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | Identifier for the organization. |

Returns: `OrganizationMemberships|error`

Sample code:

```ballerina
elasticcloud:OrganizationMemberships members = check elasticClient->/organizations/["org-abc123"]/members();
```

Sample response:

```ballerina
{"members": [{"user_id": "user-001", "email": "admin@example.com", "organization_id": "org-abc123"}]}
```

</details>

<details>
<summary>Create organization invitation</summary>

Sends invitations to join an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `organizationId` | `string` | Yes | Identifier for the organization. |
| `payload` | `OrganizationInvitationRequest` | Yes | The invitation request with email addresses. |

Returns: `OrganizationInvitations|error`

Sample code:

```ballerina
elasticcloud:OrganizationInvitations invitations = check elasticClient->/organizations/["org-abc123"]/invitations.post({
    emails: ["newuser@example.com"]
});
```

Sample response:

```ballerina
{"invitations": [{"token": "inv-token-xyz", "email": "newuser@example.com", "accepted": false}]}
```

</details>

#### API key operations

<details>
<summary>Get all API keys</summary>

Retrieves the metadata for all API keys belonging to the authenticated user.

Returns: `ApiKeysResponse|error`

Sample code:

```ballerina
elasticcloud:ApiKeysResponse allKeys = check elasticClient->/users/auth/keys();
```

Sample response:

```ballerina
{"keys": [{"id": "key-001", "description": "Production key", "creation_date": "2025-01-15T10:30:00Z"}, {"id": "key-002", "description": "Dev key", "creation_date": "2025-02-20T14:00:00Z", "expiration_date": "2025-08-20T14:00:00Z"}]}
```

</details>

<details>
<summary>Create API key</summary>

Creates a new API key. The key value is returned only once in the response.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateApiKeyRequest` | Yes | The API key creation request including description and optional expiration. |

Returns: `ApiKeyResponse|error`

Sample code:

```ballerina
elasticcloud:ApiKeyResponse createdKey = check elasticClient->/users/auth/keys.post({
    description: "API key created from Ballerina"
});
```

Sample response:

```ballerina
{"id": "key-003", "key": "VnVhQ2ZHY0JDZGJrUW0tZTVhT3g6dWkybHAyYXhUTm1zeWFrdzl0dk5udw==", "description": "API key created from Ballerina", "creation_date": "2025-03-17T08:00:00Z"}
```

</details>

<details>
<summary>Get API key</summary>

Retrieves the metadata for a specific API key by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiKeyId` | `string` | Yes | The API key ID. |

Returns: `ApiKeyResponse|error`

Sample code:

```ballerina
elasticcloud:ApiKeyResponse keyInfo = check elasticClient->/users/auth/keys/["key-001"]();
```

Sample response:

```ballerina
{"id": "key-001", "description": "Production key", "creation_date": "2025-01-15T10:30:00Z", "user_id": "user-001", "organization_id": "org-abc123"}
```

</details>

<details>
<summary>Delete API key</summary>

Deletes a specific API key by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `apiKeyId` | `string` | Yes | The API key ID. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/users/auth/keys/["key-003"].delete();
```

</details>

<details>
<summary>Delete API keys</summary>

Deletes multiple API keys at once.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DeleteApiKeysRequest` | Yes | The list of API key IDs to delete. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/users/auth/keys.delete({
    keys: ["key-002", "key-003"]
});
```

</details>

#### User role assignment operations

<details>
<summary>Add Role Assignments</summary>

Adds role assignments to a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | Identifier for the user. |
| `payload` | `RoleAssignments` | Yes | The role assignments to add. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/users/["user-001"]/role_assignments.post({
    organization: [{organization_id: "org-abc123", role_id: "organization-admin"}]
});
```

</details>

<details>
<summary>Remove Role Assignments</summary>

Removes role assignments from a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | Identifier for the user. |
| `payload` | `RoleAssignments` | Yes | The role assignments to remove. |

Returns: `EmptyResponse|error`

Sample code:

```ballerina
elasticcloud:EmptyResponse _ = check elasticClient->/users/["user-001"]/role_assignments.delete({
    organization: [{organization_id: "org-abc123", role_id: "organization-admin"}]
});
```

</details>

#### Trust & security operations

<details>
<summary>Get trusted environments</summary>

Retrieves the trusted environment settings for the organization.

Returns: `ElasticsearchClusterTrustSettings|error`

Sample code:

```ballerina
elasticcloud:ElasticsearchClusterTrustSettings trustSettings = check elasticClient->/trusted\-environments();
```

Sample response:

```ballerina
{"accounts": [], "external": []}
```

</details>

<details>
<summary>Get deployment certificate authority</summary>

Retrieves the certificate authority for a deployment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deploymentId` | `string` | Yes | Identifier for the deployment. |

Returns: `CertificateAuthority|error`

Sample code:

```ballerina
elasticcloud:CertificateAuthority ca = check elasticClient->/deployments/["a1b2c3d4e5"]/certificate\-authority();
```

Sample response:

```ballerina
{"pem": "-----BEGIN CERTIFICATE-----\nMIIDQTCCAimgAw...\n-----END CERTIFICATE-----\n"}
```

</details>
