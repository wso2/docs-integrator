---
title: ICP Management API
---

# ICP Management API

The Management API is a GraphQL endpoint exposed by the Integration Control Plane (ICP) server. It provides queries and mutations to manage runtimes, environments, projects, components, artifacts, loggers, secrets, and MI users.

:::info Workflow Management API
Integrations that run durable workflows can also serve their own REST Management API from the integration runtime. That API is separate from this one and reaches a single integration. See [Management API](../develop-and-test/integration-artifacts/workflow/durable-workflow/management-api.md) for workflows.

## Endpoint

```bash
POST https://<icp-host>:9446/graphql
```

The default port is `9446`. All operations use the same endpoint via HTTP `POST`.

## Authentication

Before calling the GraphQL API, obtain a JWT access token from the ICP authentication service. See the [Authentication API](auth-api.md) for the full reference covering:

- Login (local credentials and OIDC/SSO)
- Token refresh and revocation
- Password management
- User, group, role, and permission management

Once you have a token, include it in every request:

```bash
Authorization: Bearer <jwt-access-token>
```

The token is signed with HMAC-SHA256 and validated against:

- **Issuer**: `icp-frontend-jwt-issuer`
- **Audience**: `icp-server`

## Pagination

Paginated list queries (those that take a `pagination` argument) wrap the list in a page object. Select the list fields under `items`, and the paging details under `pageInfo`:

```graphql
query {
  environments(pagination: { limit: 10, offset: 0 }) {
    items { id name }
    pageInfo { total limit offset }
  }
}
```

The optional `pagination` argument (`options.pagination` for `components`) takes `limit` and `offset`. If you omit it, or omit `limit`, all items are returned and `offset` is ignored. `limit` is capped at `500`.

## Queries

### Runtimes

#### `runtimes`

Returns a list of registered runtimes. You must pass at least one of `projectId`, `componentId`, or `environmentId`; the other parameters are optional filters.

```graphql
runtimes(
  status: String
  runtimeType: String
  environmentId: String
  projectId: String
  componentId: String
  pagination: PaginationInput
): RuntimesPage!
```

**Example:**

```graphql
query {
  runtimes(environmentId: "env-001", componentId: "comp-abc") {
    items {
      runtimeId
      runtimeName
      runtimeType
      status
      version
      lastHeartbeat
      component { id name }
      environment { id name }
    }
    pageInfo { total limit offset }
  }
}
```

#### `runtime`

Returns a single runtime by ID.

```graphql
runtime(runtimeId: String!): Runtime
```

#### `componentDeployment`

Returns deployment information for a component in a specific environment.

```graphql
componentDeployment(
  orgHandler: String!
  orgUuid: String!
  componentId: String!
  versionId: String!
  environmentId: String!
): ComponentDeployment
```

---

### Environments

#### `environments`

Returns all environments accessible to the authenticated user.

```graphql
environments(orgUuid: String, type: String, projectId: String, pagination: PaginationInput): EnvironmentsPage!
```

The `type` parameter accepts `"prod"` or `"non-prod"` to filter by production status.

**Example:**

```graphql
query {
  environments(type: "non-prod") {
    items {
      id
      name
      handler
      description
      critical
    }
  }
}
```

#### `environmentByHandler`

Returns a single environment by its handler (slug).

```graphql
environmentByHandler(environmentHandler: String!): Environment
```

#### `environmentHandlerAvailability`

Checks if a handler string is available for a new environment.

```graphql
environmentHandlerAvailability(environmentHandlerCandidate: String!): EnvironmentHandlerAvailability!
```

---

### Projects

#### `projects`

Returns all projects accessible to the authenticated user.

```graphql
projects(orgId: Int, pagination: PaginationInput): ProjectsPage!
```

#### `project`

Returns a single project by ID.

```graphql
project(orgId: Int, projectId: String!): Project
```

#### `projectByHandler`

Returns a project by its handler within an organization.

```graphql
projectByHandler(orgId: Int!, projectHandler: String!): Project
```

#### `projectCreationEligibility`

Checks whether the authenticated user is permitted to create a project.

```graphql
projectCreationEligibility(orgId: Int!, orgHandler: String!): ProjectCreationEligibility!
```

#### `projectHandlerAvailability`

Checks if a handler string is available for a new project within an organization.

```graphql
projectHandlerAvailability(orgId: Int!, projectHandlerCandidate: String!): ProjectHandlerAvailability!
```

---

### Components

#### `components`

Returns all components accessible to the user within an organization, with optional project filter and sort/pagination options.

```graphql
components(
  orgHandler: String!
  projectId: String
  options: ComponentOptionsInput
): ComponentsPage!
```

#### `component`

Returns a single component by ID, or by project ID and handler.

```graphql
component(
  componentId: String
  projectId: String
  componentHandler: String
): Component
```

#### `componentArtifactTypes`

Returns the artifact types available for a component, optionally filtered by environment.

```graphql
componentArtifactTypes(componentId: String!, environmentId: String): [ArtifactTypeCount!]!
```

---

### Artifacts by Environment and Component

All artifact queries below share the same signature pattern and require both `environmentId` and `componentId`. State fields (e.g., `state`, `tracing`, `statistics`) are overlaid from the reconcile engine.

#### `servicesByEnvironmentAndComponent`

```graphql
servicesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): ServicesPage!
```

#### `listenersByEnvironmentAndComponent`

```graphql
listenersByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): ListenersPage!
```

#### `automationsByEnvironmentAndComponent`

```graphql
automationsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): AutomationsPage!
```

#### `restApisByEnvironmentAndComponent`

```graphql
restApisByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): RestApisPage!
```

**Example:**

```graphql
query {
  restApisByEnvironmentAndComponent(environmentId: "env-001", componentId: "comp-abc") {
    items {
      name
      url
      context
      version
      state
      tracing
      statistics
      resources { path methods }
    }
  }
}
```

#### `proxyServicesByEnvironmentAndComponent`

```graphql
proxyServicesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): ProxyServicesPage!
```

#### `endpointsByEnvironmentAndComponent`

```graphql
endpointsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): EndpointsPage!
```

#### `inboundEndpointsByEnvironmentAndComponent`

```graphql
inboundEndpointsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): InboundEndpointsPage!
```

#### `sequencesByEnvironmentAndComponent`

```graphql
sequencesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): SequencesPage!
```

#### `tasksByEnvironmentAndComponent`

```graphql
tasksByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): TasksPage!
```

#### `templatesByEnvironmentAndComponent`

```graphql
templatesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): TemplatesPage!
```

#### `messageStoresByEnvironmentAndComponent`

```graphql
messageStoresByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): MessageStoresPage!
```

#### `messageProcessorsByEnvironmentAndComponent`

```graphql
messageProcessorsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): MessageProcessorsPage!
```

#### `localEntriesByEnvironmentAndComponent`

```graphql
localEntriesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): LocalEntriesPage!
```

#### `dataServicesByEnvironmentAndComponent`

```graphql
dataServicesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): DataServicesPage!
```

#### `dataSourcesByEnvironmentAndComponent`

```graphql
dataSourcesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): DataSourcesPage!
```

#### `compositeAppsByEnvironmentAndComponent`

```graphql
compositeAppsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): CompositeAppsPage!
```

#### `compositeAppFaultStackTrace`

Returns the fault stack trace for a Composite App on a specific runtime.

```graphql
compositeAppFaultStackTrace(runtimeId: String!, appName: String!): CompositeAppFaultStackTrace!
```

#### `connectorsByEnvironmentAndComponent`

```graphql
connectorsByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): ConnectorsPage!
```

#### `registryResourcesByEnvironmentAndComponent`

```graphql
registryResourcesByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): RegistryResourcesPage!
```

---

### Artifact Detail Queries

These queries fetch live details from the MI Management API for a single artifact. They accept an optional `environmentId`, `runtimeId`, and `packageName` to target a specific runtime.

The result is wrapped in an object that holds the value (`content`, `parameters`, or `dataService`) along with `preparing` and `retryAfterMs`. If `preparing` is `true`, the value is not ready yet; repeat the query after `retryAfterMs` milliseconds.

#### `artifactSourceByComponent`

Returns the source definition of an artifact (e.g., sequence XML, API definition).

```graphql
artifactSourceByComponent(
  componentId: String!
  artifactType: String!
  artifactName: String!
  environmentId: String
  runtimeId: String
  packageName: String
  templateType: String
): FetchableText!
```

#### `artifactWsdlByComponent`

Returns the WSDL content for a proxy service artifact.

```graphql
artifactWsdlByComponent(
  componentId: String!
  artifactType: String!
  artifactName: String!
  environmentId: String
  runtimeId: String
  packageName: String
): FetchableText!
```

#### `localEntryValueByComponent`

Returns the value of a named local entry.

```graphql
localEntryValueByComponent(
  componentId: String!
  entryName: String!
  environmentId: String
  runtimeId: String
): FetchableText!
```

#### `artifactParametersByComponent`

Returns parameters for an inbound endpoint, message processor, or data source artifact.

```graphql
artifactParametersByComponent(
  componentId: String!
  artifactType: String!
  artifactName: String!
  environmentId: String
  runtimeId: String
  packageName: String
): FetchableParameters!
```

#### `dataSourceOverviewByComponent`

Returns overview fields (name, type, description, driverClass, userName, url) for a data source.

```graphql
dataSourceOverviewByComponent(
  componentId: String!
  dataSourceName: String!
  environmentId: String
  runtimeId: String
): FetchableParameters!
```

#### `messageStoreOverviewByComponent`

Returns overview fields (name, type, container, size) for a message store.

```graphql
messageStoreOverviewByComponent(
  componentId: String!
  storeName: String!
  environmentId: String
  runtimeId: String
): FetchableParameters!
```

#### `messageProcessorOverviewByComponent`

Returns overview fields (name, type, messageStore, status) for a message processor.

```graphql
messageProcessorOverviewByComponent(
  componentId: String!
  processorName: String!
  environmentId: String
  runtimeId: String
): FetchableParameters!
```

#### `dataServiceOverviewByComponent`

Returns structured overview (dataSources, queries, resources, operations) for a data service.

```graphql
dataServiceOverviewByComponent(
  componentId: String!
  dataServiceName: String!
  environmentId: String
  runtimeId: String
): FetchableDataService!
```

---

### Loggers

#### `loggersByRuntime`

Returns loggers for a specific runtime. For MI runtimes, fetches live from the MI Management API. For BI runtimes, reads from the database with reconcile state overlaid.

```graphql
loggersByRuntime(runtimeId: String!, pagination: PaginationInput): LoggersPage!
```

#### `loggersByEnvironmentAndComponent`

Returns loggers grouped by component name across all runtimes in an environment.

```graphql
loggersByEnvironmentAndComponent(environmentId: String!, componentId: String!, pagination: PaginationInput): LoggerGroupsPage!
```

**Example:**

```graphql
query {
  loggersByEnvironmentAndComponent(environmentId: "env-001", componentId: "comp-abc") {
    items {
      loggerName
      componentName
      logLevel
      logLevelInSync
      runtimeIds
    }
  }
}
```

---

### Log Files

#### `logFilesByRuntime`

Returns the list of available log files on an MI runtime. The runtime must be in `RUNNING` status.

```graphql
logFilesByRuntime(runtimeId: String!, searchKey: String, pagination: PaginationInput): LogFilesResponse!
```

#### `logFileContent`

Returns the content of a specific log file. The `fileName` must be a plain filename with no path separators or traversal sequences.

```graphql
logFileContent(runtimeId: String!, fileName: String!): FetchableText!
```

---

### Registry Browser

These queries operate on the MI registry and require the runtime to be in `RUNNING` status.

#### `registryDirectory`

Lists the contents of a registry directory path.

```graphql
registryDirectory(runtimeId: String!, path: String!, expand: Boolean): RegistryDirectoryResponse!
```

#### `registryFileContent`

Returns the content of a registry file at the given path.

```graphql
registryFileContent(runtimeId: String!, path: String!): FetchableText!
```

#### `registryResourceMetadata`

Returns metadata (name and mediaType) for a registry resource.

```graphql
registryResourceMetadata(runtimeId: String!, path: String!): RegistryResourceMetadata!
```

#### `registryResourceProperties`

Returns the properties of a registry resource.

```graphql
registryResourceProperties(runtimeId: String!, path: String!): RegistryPropertiesResponse!
```

---

### Secrets

#### `orgSecrets`

Returns org-level secrets. Optionally filter by environment.

```graphql
orgSecrets(environmentId: String, pagination: PaginationInput): OrgSecretsPage!
```

#### `componentSecrets`

Returns secrets bound to a specific component in an environment.

```graphql
componentSecrets(componentId: String!, environmentId: String!, pagination: PaginationInput): BoundSecretsPage!
```

---

### MI Runtime User Management

#### `getMIUsers`

Returns the list of users configured on an MI runtime.

```graphql
getMIUsers(componentId: String!, runtimeId: String!, pagination: PaginationInput): MIUsersPage!
```

**Example:**

```graphql
query {
  getMIUsers(componentId: "comp-abc", runtimeId: "runtime-001") {
    items {
      username
      domain
      isAdmin
    }
  }
}
```

---

### System

#### `systemInfo`

Returns the ICP server version.

```graphql
query {
  systemInfo {
    version
  }
}
```

---

## Mutations

### Runtime Mutations

#### `deleteRuntime`

Deletes a runtime by ID. If `revokeSecret` is `true` and the runtime's secret is no longer used by any other runtime, the secret is also revoked.

```graphql
deleteRuntime(runtimeId: String!, revokeSecret: Boolean): DeleteRuntimeResult!
```

**Example:**

```graphql
mutation {
  deleteRuntime(runtimeId: "runtime-001", revokeSecret: true) {
    deleted
    orphanedKeyId
    secretRevoked
  }
}
```

---

### Environment Mutations

#### `createEnvironment`

Creates a new environment. Requires environment management permission; production environments require full management permission.

```graphql
createEnvironment(environment: EnvironmentInput!): Environment
```

**Input:**

```graphql
input EnvironmentInput {
  name: String!
  environmentHandler: String!
  description: String
  critical: Boolean!   # true for a production environment
}
```

#### `deleteEnvironment`

Deletes an environment by ID.

```graphql
deleteEnvironment(environmentId: String!): Boolean!
```

#### `updateEnvironment`

Updates the name, handler, description, or production status of an environment.

```graphql
updateEnvironment(
  environmentId: String!
  name: String
  handler: String
  description: String
  critical: Boolean
): Environment
```

#### `updateEnvironmentProductionStatus`

Promotes or demotes an environment to/from production status. Always requires full management permission.

```graphql
updateEnvironmentProductionStatus(environmentId: String!, isProduction: Boolean!): Environment
```

---

### Project Mutations

#### `createProject`

Creates a new project.

```graphql
createProject(project: ProjectInput!): Project
```

**Example:**

```graphql
mutation {
  createProject(project: {
    orgId: 1
    orgHandler: "default"
    name: "Demo Project"
    projectHandler: "demo-project"
  }) {
    id
    name
    handler
  }
}
```

`orgId`, `orgHandler`, `name`, and `projectHandler` are required. The default organization has ID `1` and handler `default`.

#### `deleteProject`

Deletes a project. Fails if the project still contains components.

```graphql
deleteProject(orgId: Int!, projectId: String!): DeleteResponse!
```

#### `updateProject`

Updates project name, version, or description.

```graphql
updateProject(project: ProjectUpdateInput!): Project!
```

**Input:**

```graphql
input ProjectUpdateInput {
  id: String!
  orgId: Int
  name: String
  version: String
  description: String
}
```

---

### Component Mutations

#### `createComponent`

Creates a new component within a project. The name must be 3–64 characters.

```graphql
createComponent(component: ComponentInput!): Component
```

**Input:**

```graphql
input ComponentInput {
  projectId: String!
  name: String!
  displayName: String
  description: String
  orgId: Int
  orgHandler: String
  componentType: RuntimeType
  technology: String
  repository: String
  branch: String
  directoryPath: String
  secretRef: String
  isPublicRepo: Boolean
}
```

#### `deleteComponentV2`

Deletes a component. Returns a detailed response. Fails if the component has registered runtimes.

```graphql
deleteComponentV2(orgHandler: String!, componentId: String!, projectId: String!): DeleteComponentV2Response!
```

#### `updateComponent`

Updates component fields such as name, display name, or description.

```graphql
updateComponent(component: ComponentUpdateInput!): Component!
```

---

### Artifact Control Mutations

#### `updateArtifactStatus`

Enables or disables a named artifact across all MI runtimes of a component. Changes are propagated via the reconcile engine. Supported artifact types: `proxy-service`, `endpoint`, `message-processor`, `task`, `inbound-endpoint`.

```graphql
updateArtifactStatus(input: ArtifactStatusChangeInput!): ArtifactStatusChangeResponse!
```

**Input:**

```graphql
input ArtifactStatusChangeInput {
  componentId: String!
  artifactType: String!
  artifactName: String!
  status: ArtifactState!   # ENABLED or DISABLED
}
```

**Example:**

```graphql
mutation {
  updateArtifactStatus(input: {
    componentId: "comp-abc"
    artifactType: "proxy-service"
    artifactName: "OrderProxy"
    status: DISABLED
  }) {
    status
    message
    successCount
    failedCount
  }
}
```

#### `updateArtifactTracingStatus`

Enables or disables tracing on a specific artifact in an environment. Supported artifact types: `proxy-service`, `endpoint`, `api`, `sequence`, `inbound-endpoint`, `template`.

```graphql
updateArtifactTracingStatus(input: ArtifactTracingChangeInput!): ArtifactTracingChangeResponse!
```

**Input:**

```graphql
input ArtifactTracingChangeInput {
  componentId: String!
  environmentId: String!
  artifactType: String!
  artifactName: String!
  trace: ArtifactState!   # ENABLED or DISABLED
}
```

#### `updateArtifactStatisticsStatus`

Enables or disables statistics collection on an artifact. Supported artifact types: `proxy-service`, `endpoint`, `api`, `sequence`, `inbound-endpoint`, `template`.

```graphql
updateArtifactStatisticsStatus(input: ArtifactStatisticsChangeInput!): ArtifactStatisticsChangeResponse!
```

**Input:**

```graphql
input ArtifactStatisticsChangeInput {
  componentId: String!
  environmentId: String!
  artifactType: String!
  artifactName: String!
  statistics: ArtifactState!   # ENABLED or DISABLED
}
```

#### `triggerArtifact`

Triggers a scheduled task on all MI runtimes of a component. Commands are queued for offline runtimes and delivered on next heartbeat.

```graphql
triggerArtifact(input: ArtifactTriggerInput!): ArtifactTriggerResponse!
```

**Input:**

```graphql
input ArtifactTriggerInput {
  componentId: String!
  taskName: String!
}
```

---

### Listener Control Mutations

#### `updateListenerState`

Starts or stops a named listener on a set of runtimes.

```graphql
updateListenerState(input: ListenerControlInput!): ListenerControlResponse!
```

**Input:**

```graphql
input ListenerControlInput {
  runtimeIds: [String!]!
  listenerName: String!
  action: ControlAction!   # START or STOP
}
```

**Example:**

```graphql
mutation {
  updateListenerState(input: {
    runtimeIds: ["runtime-001", "runtime-002"]
    listenerName: "httpListener"
    action: STOP
  }) {
    success
    message
  }
}
```

---

### Logger Control Mutations

#### `updateLogLevel`

Updates the log level for MI loggers (applied immediately via the MI Management API) or BI component loggers (applied via the reconcile engine).

```graphql
updateLogLevel(input: UpdateLogLevelInput!): UpdateLogLevelResponse!
```

**Input:**

```graphql
input UpdateLogLevelInput {
  runtimeIds: [String!]!
  componentType: RuntimeType    # MI or BI; inferred from first runtime if omitted
  componentName: String         # required for BI: a componentName from loggersByRuntime
  loggerName: String            # required for MI
  loggerClass: String           # optional: provide to add a new MI logger
  logLevel: LogLevel!
}
```

**Example — update an MI logger:**

```graphql
mutation {
  updateLogLevel(input: {
    runtimeIds: ["runtime-001"]
    loggerName: "org.apache.synapse"
    logLevel: DEBUG
  }) {
    success
    message
  }
}
```

**Example — add a new MI logger with a class:**

```graphql
mutation {
  updateLogLevel(input: {
    runtimeIds: ["runtime-001"]
    loggerName: "com.example.MyLogger"
    loggerClass: "com.example.MyLogger"
    logLevel: INFO
  }) {
    success
    message
  }
}
```

---

### Secret Mutations

#### `createOrgSecret`

Creates an org-level secret for an environment. If `componentId` is provided, the secret is bound to that component.

```graphql
createOrgSecret(environmentId: String!, componentId: String): String!
```

Returns the secret value as a plain string (shown only once), in the form `<keyId>.<keyMaterial>`. The `keyId` part is the value that `orgSecrets` lists and `revokeOrgSecret` takes.

#### `revokeOrgSecret`

Revokes an org-level secret by its key ID.

```graphql
revokeOrgSecret(keyId: String!): Boolean!
```

---

### MI Runtime User Management Mutations

#### `addMIUser`

Creates a new user on an MI runtime.

```graphql
addMIUser(
  componentId: String!
  runtimeId: String!
  username: String!
  password: String!
  isAdmin: Boolean
  domain: String
): MIUserOperationResponse!
```

#### `deleteMIUser`

Deletes a user from an MI runtime.

```graphql
deleteMIUser(
  componentId: String!
  runtimeId: String!
  username: String!
  domain: String
): MIUserOperationResponse!
```

---

## Key Types

### `Runtime`

| Field | Type | Description |
|-------|------|-------------|
| `runtimeId` | `String!` | Unique runtime identifier |
| `runtimeName` | `String` | Human-readable name |
| `runtimeType` | `String!` | `"MI"` or `"BI"` |
| `status` | `String!` | Current status (e.g., `RUNNING`, `OFFLINE`) |
| `version` | `String` | Runtime version |
| `component` | `Component!` | The component this runtime belongs to |
| `environment` | `Environment!` | The environment this runtime is deployed in |
| `platformName` | `String` | Host platform name |
| `registrationTime` | `String` | ISO 8601 timestamp when the runtime registered |
| `lastHeartbeat` | `String` | ISO 8601 timestamp of last heartbeat |

### `Environment`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique environment ID |
| `name` | `String!` | Display name |
| `handler` | `String!` | URL-safe identifier (slug) |
| `description` | `String` | Optional description |
| `critical` | `Boolean!` | Whether this is a production environment; controls permission level required |

### `Component`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique component ID |
| `name` | `String!` | Component name |
| `displayName` | `String!` | Human-readable display name |
| `componentType` | `RuntimeType!` | `MI` or `BI` |
| `projectId` | `String!` | Parent project ID |

### `LogLevel` (enum)

`OFF` | `FATAL` | `ERROR` | `WARN` | `INFO` | `DEBUG` | `TRACE`

### `ControlAction` (enum)

`START` | `STOP` | `SET_LOGGER_LEVEL` | `WORKFLOW_MGMT` | `MI_MGMT`

`updateListenerState` accepts only `START` and `STOP`.

### `RuntimeType` (enum)

`MI` | `BI`

### `ArtifactState` (enum)

`ENABLED` | `DISABLED`

---

## Permissions

Operations are protected by role-based access control (RBAC). The key permission levels are:

| Permission | Covers |
|------------|--------|
| `integration_mgt:view` | Reading artifact and runtime data |
| `integration_mgt:edit` | Modifying artifacts, log levels, MI users |
| `integration_mgt:manage` | Full control including deletes and secret management |
| `environment_mgt:manage` | Creating and deleting production environments |
| `environment_mgt:manage_nonprod` | Managing non-production environments |
| `project_mgt:manage` | Creating and deleting projects |
| `project_mgt:edit` | Updating project metadata |

Insufficient permissions return a GraphQL error with the message `Access denied: ...` or `Insufficient permissions to ...`.

## Error Handling

GraphQL errors are returned in the standard format:

```json
{
  "errors": [
    {
      "message": "Access denied: insufficient permissions to delete runtime",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["deleteRuntime"]
    }
  ],
  "data": null
}
```

Common error messages:

| Message pattern | Cause |
|-----------------|-------|
| `Access denied: ...` or `Insufficient permissions to ...` | Insufficient RBAC permission |
| `Runtime not found` | Invalid or deleted `runtimeId` |
| `Integration not found` | Invalid `componentId` |
| `Runtime is not online` or `The runtime is not online` | Operation requires `RUNNING` status |
| `Required authentication information is either missing or not valid for the resource.` | Missing or invalid `Authorization` header (returned with HTTP `400`) |
| `At least one runtime ID must be provided` | Empty `runtimeIds` list in mutation input |
