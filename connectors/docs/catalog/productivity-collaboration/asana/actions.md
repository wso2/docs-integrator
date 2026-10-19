---
title: Actions
---

# Actions

The `ballerinax/asana` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the Asana REST API for managing tasks, projects, sections, teams, users, and all other Asana resources. |

---

## Client

Provides access to the Asana REST API for managing tasks, projects, sections, teams, users, and all other Asana resources.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|http:OAuth2RefreshTokenGrantConfig` | Required | Authentication configuration. Typically a Personal Access Token as bearer token. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/asana;

configurable string authToken = ?;

asana:Client asanaClient = check new ({
    auth: {
        token: authToken
    }
});
```

### Operations

#### Tasks

<details>
<summary>Get multiple tasks</summary>

Returns a list of tasks filtered by project, section, tag, user task list, or assignee.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Request headers. |
| `queries` | `GetTasksQueries` | No | Query parameters including `project`, `section`, `assignee`, `workspace`, `opt_fields`, `limit`, `offset`. |

Returns: `TaskCompacts|error`

Sample code:

```ballerina
asana:TaskCompacts tasks = check asanaClient->/tasks({}, project = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567890", "name": "Draft project proposal", "resource_type": "task"}, {"gid": "1201234567891", "name": "Review budget estimates", "resource_type": "task"}], "next_page": null}
```

</details>

<details>
<summary>Create a task</summary>

Creates a new task in a workspace or directly within a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Request headers. |
| `payload` | `TasksBody` | Yes | Task data including name, workspace, assignee, projects, due dates, etc. |
| `queries` | `CreateTaskQueries` | No | Query parameters including `opt_fields`. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse task = check asanaClient->/tasks.post({
    data: {
        name: "Draft project proposal",
        workspace: "1234567890",
        projects: ["9876543210"],
        assignee: "me",
        due_on: "2026-04-01",
        notes: "Write the initial draft of the Q2 project proposal."
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1201234567890", "name": "Draft project proposal", "assignee": {"gid": "1100112233", "name": "Jane Doe"}, "due_on": "2026-04-01", "completed": false, "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Get a task</summary>

Returns the complete task record for a single task by its GID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `queries` | `GetTaskQueries` | No | Query parameters including `opt_fields`. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse task = check asanaClient->/tasks/["1201234567890"]();
```

Sample response:

```ballerina
{"data": {"gid": "1201234567890", "name": "Draft project proposal", "assignee": {"gid": "1100112233", "name": "Jane Doe"}, "due_on": "2026-04-01", "completed": false, "notes": "Write the initial draft of the Q2 project proposal."}}
```

</details>

<details>
<summary>Update a task</summary>

Updates an existing task. Only the fields provided in the payload are changed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidBody` | Yes | Task fields to update. |
| `queries` | `UpdateTaskQueries` | No | Query parameters including `opt_fields`. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse task = check asanaClient->/tasks/["1201234567890"].put({
    data: {
        completed: true
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1201234567890", "name": "Draft project proposal", "completed": true}}
```

</details>

<details>
<summary>Delete a task</summary>

Deletes a task by its GID. Returns an empty response on success.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/tasks/["1201234567890"].delete();
```

</details>

<details>
<summary>Duplicate a task</summary>

Creates a duplicate of an existing task, including selected fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task to duplicate. |
| `payload` | `TaskGidDuplicateBody` | Yes | Duplication options including name and which fields to include. |

Returns: `JobOkResponse|error`

Sample code:

```ballerina
asana:JobOkResponse job = check asanaClient->/tasks/["1201234567890"]/duplicate.post({
    data: {
        name: "Draft project proposal (copy)",
        include: "notes,assignee,due_date"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9900112233", "resource_type": "job", "status": "in_progress", "new_task": {"gid": "1201234567899", "name": "Draft project proposal (copy)"}}}
```

</details>

<details>
<summary>Get tasks from a project</summary>

Returns all tasks in a specific project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |
| `queries` | `GetProjectTasksQueries` | No | Query parameters including `opt_fields`, `limit`, `offset`. |

Returns: `TaskCompacts|error`

Sample code:

```ballerina
asana:TaskCompacts tasks = check asanaClient->/projects/["9876543210"]/tasks();
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567890", "name": "Draft project proposal", "resource_type": "task"}, {"gid": "1201234567891", "name": "Set up environment", "resource_type": "task"}], "next_page": null}
```

</details>

<details>
<summary>Get subtasks from a task</summary>

Returns all subtasks of a given task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the parent task. |

Returns: `TaskCompacts|error`

Sample code:

```ballerina
asana:TaskCompacts subtasks = check asanaClient->/tasks/["1201234567890"]/subtasks();
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567900", "name": "Research competitors", "resource_type": "task"}], "next_page": null}
```

</details>

<details>
<summary>Create a subtask</summary>

Creates a new subtask under the specified parent task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the parent task. |
| `payload` | `TaskGidSubtasksBody` | Yes | Subtask data. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse subtask = check asanaClient->/tasks/["1201234567890"]/subtasks.post({
    data: {
        name: "Research competitors"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1201234567900", "name": "Research competitors", "parent": {"gid": "1201234567890", "name": "Draft project proposal"}}}
```

</details>

<details>
<summary>Set the parent of a task</summary>

Sets or changes the parent task of an existing task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidSetParentBody` | Yes | Parent task configuration. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse task = check asanaClient->/tasks/["1201234567900"]/setParent.post({
    data: {
        parent: "1201234567890"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1201234567900", "name": "Research competitors", "parent": {"gid": "1201234567890", "name": "Draft project proposal"}}}
```

</details>

<details>
<summary>Add a project to a task</summary>

Adds a task to a specified project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidAddProjectBody` | Yes | Project to add, with optional section and insert position. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/tasks/["1201234567890"]/addProject.post({
    data: {
        project: "9876543210"
    }
});
```

</details>

<details>
<summary>Add a tag to a task</summary>

Adds a tag to a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidAddTagBody` | Yes | The tag to add. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/tasks/["1201234567890"]/addTag.post({
    data: {
        tag: "5566778899"
    }
});
```

</details>

<details>
<summary>Add followers to a task</summary>

Adds followers (collaborators) to a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidAddFollowersBody` | Yes | Followers to add. |

Returns: `TaskOkResponse|error`

Sample code:

```ballerina
asana:TaskOkResponse task = check asanaClient->/tasks/["1201234567890"]/addFollowers.post({
    data: {
        followers: ["1100112233"]
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1201234567890", "name": "Draft project proposal", "followers": [{"gid": "1100112233", "name": "Jane Doe"}]}}
```

</details>

<details>
<summary>Search tasks in a workspace</summary>

Searches for tasks in a workspace matching specified filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |
| `queries` | `SearchTasksQueries` | No | Search parameters including `text`, `assignee`, `completed`, `is_subtask`, etc. |

Returns: `TaskCompacts|error`

Sample code:

```ballerina
asana:TaskCompacts results = check asanaClient->/workspaces/["1234567890"]/tasks/search({}, text = "proposal");
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567890", "name": "Draft project proposal", "resource_type": "task"}], "next_page": null}
```

</details>

<details>
<summary>Set dependencies for a task</summary>

Marks a set of tasks as dependencies of a given task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidAddDependenciesBody` | Yes | Tasks to add as dependencies. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/tasks/["1201234567891"]/addDependencies.post({
    data: {
        dependencies: ["1201234567890"]
    }
});
```

</details>

<details>
<summary>Get dependencies of a task</summary>

Returns all tasks that a given task depends on.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |

Returns: `TaskCompacts|error`

Sample code:

```ballerina
asana:TaskCompacts deps = check asanaClient->/tasks/["1201234567891"]/dependencies();
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567890", "name": "Draft project proposal", "resource_type": "task"}], "next_page": null}
```

</details>

#### Projects

<details>
<summary>Get multiple projects</summary>

Returns a list of projects in a workspace or team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetProjectsQueries` | No | Query parameters including `workspace`, `team`, `archived`, `opt_fields`, `limit`, `offset`. |

Returns: `ProjectCompacts|error`

Sample code:

```ballerina
asana:ProjectCompacts projects = check asanaClient->/projects({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "9876543210", "name": "Q2 Planning", "resource_type": "project"}, {"gid": "9876543211", "name": "Marketing Campaign", "resource_type": "project"}], "next_page": null}
```

</details>

<details>
<summary>Create a project</summary>

Creates a new project in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectsBody` | Yes | Project data including name, workspace, privacy settings, and other fields. |

Returns: `ProjectCreatedResponse|error`

Sample code:

```ballerina
asana:ProjectCreatedResponse project = check asanaClient->/projects.post({
    data: {
        name: "Employee Onboarding",
        workspace: "1234567890",
        default_view: "list",
        notes: "Onboarding process for new team members."
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9876543212", "name": "Employee Onboarding", "owner": {"gid": "1100112233", "name": "Jane Doe"}, "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Get a project</summary>

Returns the full record for a single project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |

Returns: `ProjectOkResponse|error`

Sample code:

```ballerina
asana:ProjectOkResponse project = check asanaClient->/projects/["9876543210"]();
```

Sample response:

```ballerina
{"data": {"gid": "9876543210", "name": "Q2 Planning", "owner": {"gid": "1100112233", "name": "Jane Doe"}, "notes": "Q2 planning and goals.", "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Update a project</summary>

Updates an existing project. Only the fields provided are changed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |
| `payload` | `ProjectGidBody` | Yes | Project fields to update. |

Returns: `ProjectOkResponse|error`

Sample code:

```ballerina
asana:ProjectOkResponse project = check asanaClient->/projects/["9876543210"].put({
    data: {
        name: "Q2 Planning (Updated)",
        archived: false
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9876543210", "name": "Q2 Planning (Updated)", "archived": false}}
```

</details>

<details>
<summary>Delete a project</summary>

Deletes a project by its GID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/projects/["9876543210"].delete();
```

</details>

<details>
<summary>Duplicate a project</summary>

Creates a duplicate of a project, including selected components.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project to duplicate. |
| `payload` | `ProjectGidDuplicateBody` | Yes | Duplication options including name, team, and which elements to include. |

Returns: `JobOkResponse|error`

Sample code:

```ballerina
asana:JobOkResponse job = check asanaClient->/projects/["9876543210"]/duplicate.post({
    data: {
        name: "Q2 Planning (Copy)",
        include: "task_notes,task_assignee,task_due_dates"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9900223344", "resource_type": "job", "status": "in_progress"}}
```

</details>

<details>
<summary>Add members to project</summary>

Adds members to a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |
| `payload` | `ProjectGidAddMembersBody` | Yes | Members to add. |

Returns: `ProjectOkResponse|error`

Sample code:

```ballerina
asana:ProjectOkResponse project = check asanaClient->/projects/["9876543210"]/addMembers.post({
    data: {
        members: ["1100112233"]
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9876543210", "name": "Q2 Planning", "members": [{"gid": "1100112233", "name": "Jane Doe"}]}}
```

</details>

<details>
<summary>Get project task counts</summary>

Returns the number of tasks in various states within a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |

Returns: `TaskCountOkResponse|error`

Sample code:

```ballerina
asana:TaskCountOkResponse counts = check asanaClient->/projects/["9876543210"]/task_counts();
```

Sample response:

```ballerina
{"data": {"num_tasks": 25, "num_incomplete_tasks": 18, "num_completed_tasks": 7}}
```

</details>

#### Sections

<details>
<summary>Get sections in a project</summary>

Returns all sections in a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |

Returns: `SectionCompacts|error`

Sample code:

```ballerina
asana:SectionCompacts sections = check asanaClient->/projects/["9876543210"]/sections();
```

Sample response:

```ballerina
{"data": [{"gid": "5500112233", "name": "To Do", "resource_type": "section"}, {"gid": "5500112234", "name": "In Progress", "resource_type": "section"}], "next_page": null}
```

</details>

<details>
<summary>Create a section in a project</summary>

Creates a new section within a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectGid` | `string` | Yes | The globally unique identifier for the project. |
| `payload` | `ProjectGidSectionsBody` | Yes | Section data including name. |

Returns: `SectionOkResponse|error`

Sample code:

```ballerina
asana:SectionOkResponse section = check asanaClient->/projects/["9876543210"]/sections.post({
    data: {
        name: "Documentation"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "5500112235", "name": "Documentation", "project": {"gid": "9876543210", "name": "Employee Onboarding"}}}
```

</details>

<details>
<summary>Update a section</summary>

Updates a section's name or other properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sectionGid` | `string` | Yes | The globally unique identifier for the section. |
| `payload` | `SectionGidBody` | Yes | Section fields to update. |

Returns: `SectionOkResponse|error`

Sample code:

```ballerina
asana:SectionOkResponse section = check asanaClient->/sections/["5500112235"].put({
    data: {
        name: "Documentation & Guides"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "5500112235", "name": "Documentation & Guides"}}
```

</details>

<details>
<summary>Delete a section</summary>

Deletes a section. Tasks in the section are not deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sectionGid` | `string` | Yes | The globally unique identifier for the section. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/sections/["5500112235"].delete();
```

</details>

<details>
<summary>Add task to a section</summary>

Adds a task to a specific section within a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sectionGid` | `string` | Yes | The globally unique identifier for the section. |
| `payload` | `SectionGidAddTaskBody` | Yes | Task to add, with optional insert position. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/sections/["5500112233"]/addTask.post({
    data: {
        task: "1201234567890"
    }
});
```

</details>

#### Users

<details>
<summary>Get multiple users</summary>

Returns a list of users in a workspace or organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetUsersQueries` | No | Query parameters including `workspace`, `opt_fields`, `limit`, `offset`. |

Returns: `UserCompactsResponse|error`

Sample code:

```ballerina
asana:UserCompactsResponse users = check asanaClient->/users({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "1100112233", "name": "Jane Doe", "resource_type": "user"}, {"gid": "1100112234", "name": "John Smith", "resource_type": "user"}]}
```

</details>

<details>
<summary>Get a user</summary>

Returns the full user record for a single user. Use `me` as the userGid for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userGid` | `string` | Yes | The user GID or `"me"` for the authenticated user. |

Returns: `UserOkResponse|error`

Sample code:

```ballerina
asana:UserOkResponse me = check asanaClient->/users/["me"]();
```

Sample response:

```ballerina
{"data": {"gid": "1100112233", "name": "Jane Doe", "email": "jane@example.com", "workspaces": [{"gid": "1234567890", "name": "My Workspace"}]}}
```

</details>

<details>
<summary>Get a user's favorites</summary>

Returns all favorites for a user in a given workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userGid` | `string` | Yes | The user GID. |
| `queries` | `GetUserFavoritesQueries` | No | Query parameters including `resource_type`, `workspace`. |

Returns: `AsanaNamedResourceCompacts|error`

Sample code:

```ballerina
asana:AsanaNamedResourceCompacts favorites = check asanaClient->/users/["me"]/favorites({}, resource_type = "project", workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "9876543210", "name": "Q2 Planning", "resource_type": "project"}]}
```

</details>

#### Workspaces

<details>
<summary>Get multiple workspaces</summary>

Returns all workspaces visible to the authorized user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetWorkspacesQueries` | No | Query parameters including `opt_fields`, `limit`, `offset`. |

Returns: `WorkspaceCompacts|error`

Sample code:

```ballerina
asana:WorkspaceCompacts workspaces = check asanaClient->/workspaces();
```

Sample response:

```ballerina
{"data": [{"gid": "1234567890", "name": "My Workspace", "resource_type": "workspace"}]}
```

</details>

<details>
<summary>Get a workspace</summary>

Returns the full workspace record for a single workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |

Returns: `WorkspaceOkResponse|error`

Sample code:

```ballerina
asana:WorkspaceOkResponse workspace = check asanaClient->/workspaces/["1234567890"]();
```

Sample response:

```ballerina
{"data": {"gid": "1234567890", "name": "My Workspace", "is_organization": false, "email_domains": []}}
```

</details>

<details>
<summary>Update a workspace</summary>

Updates a workspace's name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |
| `payload` | `WorkspaceGidBody` | Yes | Workspace fields to update. |

Returns: `WorkspaceOkResponse|error`

Sample code:

```ballerina
asana:WorkspaceOkResponse workspace = check asanaClient->/workspaces/["1234567890"].put({
    data: {
        name: "Engineering Workspace"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1234567890", "name": "Engineering Workspace"}}
```

</details>

<details>
<summary>Add a user to a workspace</summary>

Adds a user to a workspace or organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |
| `payload` | `WorkspaceGidAddUserBody` | Yes | User to add. |

Returns: `UserOkResponse|error`

Sample code:

```ballerina
asana:UserOkResponse user = check asanaClient->/workspaces/["1234567890"]/addUser.post({
    data: {
        user: "1100112234"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1100112234", "name": "John Smith", "email": "john@example.com"}}
```

</details>

#### Teams

<details>
<summary>Get teams in a workspace</summary>

Returns all teams in a workspace visible to the authorized user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |

Returns: `TeamCompacts|error`

Sample code:

```ballerina
asana:TeamCompacts teams = check asanaClient->/workspaces/["1234567890"]/teams();
```

Sample response:

```ballerina
{"data": [{"gid": "7700112233", "name": "Engineering", "resource_type": "team"}, {"gid": "7700112234", "name": "Marketing", "resource_type": "team"}]}
```

</details>

<details>
<summary>Create a team</summary>

Creates a new team in an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TeamsBody` | Yes | Team data including name and organization. |

Returns: `TeamOkResponse|error`

Sample code:

```ballerina
asana:TeamOkResponse team = check asanaClient->/teams.post({
    data: {
        name: "Design Team",
        organization: "1234567890"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "7700112235", "name": "Design Team", "organization": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Get a team</summary>

Returns the full team record for a single team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamGid` | `string` | Yes | The globally unique identifier for the team. |

Returns: `TeamOkResponse|error`

Sample code:

```ballerina
asana:TeamOkResponse team = check asanaClient->/teams/["7700112233"]();
```

Sample response:

```ballerina
{"data": {"gid": "7700112233", "name": "Engineering", "description": "Engineering team", "organization": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Add a user to a team</summary>

Adds a user to a team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `teamGid` | `string` | Yes | The globally unique identifier for the team. |
| `payload` | `TeamGidAddUserBody` | Yes | User to add. |

Returns: `TeamMembershipOkResponse|error`

Sample code:

```ballerina
asana:TeamMembershipOkResponse membership = check asanaClient->/teams/["7700112233"]/addUser.post({
    data: {
        user: "1100112234"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "8800112233", "user": {"gid": "1100112234", "name": "John Smith"}, "team": {"gid": "7700112233", "name": "Engineering"}}}
```

</details>

#### Tags

<details>
<summary>Get multiple tags</summary>

Returns a list of tags in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetTagsQueries` | No | Query parameters including `workspace`, `opt_fields`, `limit`, `offset`. |

Returns: `TagCompacts|error`

Sample code:

```ballerina
asana:TagCompacts tags = check asanaClient->/tags({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "5566778899", "name": "Priority", "resource_type": "tag"}, {"gid": "5566778900", "name": "Blocked", "resource_type": "tag"}]}
```

</details>

<details>
<summary>Create a tag</summary>

Creates a new tag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TagsBody` | Yes | Tag data including name and workspace. |

Returns: `TagOkResponse|error`

Sample code:

```ballerina
asana:TagOkResponse tag = check asanaClient->/tags.post({
    data: {
        name: "Urgent",
        workspace: "1234567890"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "5566778901", "name": "Urgent", "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Get a tag</summary>

Returns the full record for a single tag.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tagGid` | `string` | Yes | The globally unique identifier for the tag. |

Returns: `TagOkResponse|error`

Sample code:

```ballerina
asana:TagOkResponse tag = check asanaClient->/tags/["5566778899"]();
```

Sample response:

```ballerina
{"data": {"gid": "5566778899", "name": "Priority", "color": "dark-red", "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Get tags for a task</summary>

Returns all tags associated with a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |

Returns: `TagCompacts|error`

Sample code:

```ballerina
asana:TagCompacts tags = check asanaClient->/tasks/["1201234567890"]/tags();
```

Sample response:

```ballerina
{"data": [{"gid": "5566778899", "name": "Priority", "resource_type": "tag"}]}
```

</details>

#### Stories

<details>
<summary>Get stories from a task</summary>

Returns all stories (comments, activity history) for a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |

Returns: `StoryCompacts|error`

Sample code:

```ballerina
asana:StoryCompacts stories = check asanaClient->/tasks/["1201234567890"]/stories();
```

Sample response:

```ballerina
{"data": [{"gid": "6600112233", "created_at": "2026-03-15T10:30:00.000Z", "text": "Great progress on this task!", "resource_type": "story", "type": "comment"}]}
```

</details>

<details>
<summary>Create a story on a task</summary>

Adds a comment or story to a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidStoriesBody` | Yes | Story data including text. |

Returns: `StoryOkResponse|error`

Sample code:

```ballerina
asana:StoryOkResponse story = check asanaClient->/tasks/["1201234567890"]/stories.post({
    data: {
        text: "Completed the first draft. Ready for review."
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "6600112234", "text": "Completed the first draft. Ready for review.", "type": "comment", "created_at": "2026-03-17T14:00:00.000Z"}}
```

</details>

#### Goals

<details>
<summary>Get goals</summary>

Returns a list of goals in a workspace, team, or time period.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetGoalsQueries` | No | Query parameters including `workspace`, `team`, `time_periods`, `is_workspace_level`. |

Returns: `GoalCompacts|error`

Sample code:

```ballerina
asana:GoalCompacts goals = check asanaClient->/goals({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "3300112233", "name": "Increase customer retention by 15%", "resource_type": "goal"}]}
```

</details>

<details>
<summary>Create a goal</summary>

Creates a new goal in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `GoalsBody` | Yes | Goal data including name, workspace, time period, etc. |

Returns: `GoalOkResponse|error`

Sample code:

```ballerina
asana:GoalOkResponse goal = check asanaClient->/goals.post({
    data: {
        name: "Launch new product feature",
        workspace: "1234567890",
        due_on: "2026-06-30",
        notes: "Ship the core product feature by end of Q2."
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "3300112234", "name": "Launch new product feature", "due_on": "2026-06-30", "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Update a goal</summary>

Updates an existing goal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `goalGid` | `string` | Yes | The globally unique identifier for the goal. |
| `payload` | `GoalGidBody` | Yes | Goal fields to update. |

Returns: `GoalOkResponse|error`

Sample code:

```ballerina
asana:GoalOkResponse goal = check asanaClient->/goals/["3300112234"].put({
    data: {
        status: "on_track"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "3300112234", "name": "Launch new product feature", "status": "on_track"}}
```

</details>

#### Portfolios

<details>
<summary>Get multiple portfolios</summary>

Returns a list of portfolios in a workspace for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetPortfoliosQueries` | No | Query parameters including `workspace`, `owner`, `opt_fields`. |

Returns: `PortfolioCompacts|error`

Sample code:

```ballerina
asana:PortfolioCompacts portfolios = check asanaClient->/portfolios({}, workspace = "1234567890", owner = "me");
```

Sample response:

```ballerina
{"data": [{"gid": "4400112233", "name": "Q2 Portfolio", "resource_type": "portfolio"}]}
```

</details>

<details>
<summary>Create a portfolio</summary>

Creates a new portfolio in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PortfoliosBody` | Yes | Portfolio data including name, workspace, and color. |

Returns: `PortfolioOkResponse|error`

Sample code:

```ballerina
asana:PortfolioOkResponse portfolio = check asanaClient->/portfolios.post({
    data: {
        name: "Engineering Initiatives",
        workspace: "1234567890",
        color: "light-green"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "4400112234", "name": "Engineering Initiatives", "color": "light-green", "workspace": {"gid": "1234567890", "name": "My Workspace"}}}
```

</details>

<details>
<summary>Add a portfolio item</summary>

Adds a project to a portfolio.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `portfolioGid` | `string` | Yes | The globally unique identifier for the portfolio. |
| `payload` | `PortfolioGidAddItemBody` | Yes | Item to add. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/portfolios/["4400112233"]/addItem.post({
    data: {
        item: "9876543210"
    }
});
```

</details>

#### Webhooks

<details>
<summary>Get multiple webhooks</summary>

Returns all webhooks for a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetWebhooksQueries` | No | Query parameters including `workspace`, `resource`. |

Returns: `WebhookCompacts|error`

Sample code:

```ballerina
asana:WebhookCompacts webhooks = check asanaClient->/webhooks({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "2200112233", "resource": {"gid": "9876543210", "name": "Q2 Planning"}, "target": "https://example.com/webhook", "active": true}]}
```

</details>

<details>
<summary>Establish a webhook</summary>

Creates a new webhook subscription for a resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksBody` | Yes | Webhook data including resource and target URL. |

Returns: `WebhookOkResponse|error`

Sample code:

```ballerina
asana:WebhookOkResponse webhook = check asanaClient->/webhooks.post({
    data: {
        resource: "9876543210",
        target: "https://example.com/asana-webhook"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "2200112234", "resource": {"gid": "9876543210", "name": "Q2 Planning"}, "target": "https://example.com/asana-webhook", "active": true}}
```

</details>

<details>
<summary>Delete a webhook</summary>

Deletes a webhook subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookGid` | `string` | Yes | The globally unique identifier for the webhook. |

Returns: `EmptyOkResponse|error`

Sample code:

```ballerina
_ = check asanaClient->/webhooks/["2200112233"].delete();
```

</details>

#### Attachments

<details>
<summary>Get attachments from an object</summary>

Returns all attachments for a given object (task, project, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAttachmentsQueries` | No | Query parameters including `parent` (resource GID). |

Returns: `AttachmentCompacts|error`

Sample code:

```ballerina
asana:AttachmentCompacts attachments = check asanaClient->/attachments({}, parent = "1201234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "1100223344", "name": "project_plan.pdf", "resource_type": "attachment"}]}
```

</details>

<details>
<summary>Get an attachment</summary>

Returns the full record for a single attachment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `attachmentGid` | `string` | Yes | The globally unique identifier for the attachment. |

Returns: `AttachmentOkResponse|error`

Sample code:

```ballerina
asana:AttachmentOkResponse attachment = check asanaClient->/attachments/["1100223344"]();
```

Sample response:

```ballerina
{"data": {"gid": "1100223344", "name": "project_plan.pdf", "download_url": "https://asana-user-private-us-east-1.s3.amazonaws.com/...", "host": "asana", "view_url": "https://app.asana.com/..."}}
```

</details>

#### Custom fields

<details>
<summary>Get workspace custom fields</summary>

Returns all custom fields in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |

Returns: `CustomFieldsResponse|error`

Sample code:

```ballerina
asana:CustomFieldsResponse fields = check asanaClient->/workspaces/["1234567890"]/custom_fields();
```

Sample response:

```ballerina
{"data": [{"gid": "8800334455", "name": "Priority Level", "resource_type": "custom_field", "type": "enum"}]}
```

</details>

<details>
<summary>Create a custom field</summary>

Creates a new custom field in a workspace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomFieldsBody` | Yes | Custom field data including name, type, workspace, and options. |

Returns: `CustomFieldOkResponse|error`

Sample code:

```ballerina
asana:CustomFieldOkResponse field = check asanaClient->/custom_fields.post({
    data: {
        name: "Story Points",
        resource_subtype: "number",
        workspace: "1234567890",
        precision: 0
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "8800334456", "name": "Story Points", "resource_subtype": "number", "precision": 0}}
```

</details>

#### Project templates

<details>
<summary>Get multiple project templates</summary>

Returns a list of project templates accessible in a workspace or team.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetProjectTemplatesQueries` | No | Query parameters including `workspace`, `team`. |

Returns: `ProjectTemplateCompacts|error`

Sample code:

```ballerina
asana:ProjectTemplateCompacts templates = check asanaClient->/project_templates({}, workspace = "1234567890");
```

Sample response:

```ballerina
{"data": [{"gid": "7700334455", "name": "Sprint Planning Template", "resource_type": "project_template"}]}
```

</details>

<details>
<summary>Instantiate a project from template</summary>

Creates a new project from an existing project template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectTemplateGid` | `string` | Yes | The globally unique identifier for the project template. |
| `payload` | `ProjectTemplateGidInstantiateProjectBody` | Yes | Instantiation options including name and team. |

Returns: `JobOkResponse|error`

Sample code:

```ballerina
asana:JobOkResponse job = check asanaClient->/project_templates/["7700334455"]/instantiateProject.post({
    data: {
        name: "Sprint 42 Planning"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "9900556677", "resource_type": "job", "status": "in_progress"}}
```

</details>

#### Time tracking

<details>
<summary>Get time tracking entries for a task</summary>

Returns all time tracking entries for a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |

Returns: `TimeTrackingEntryCompacts|error`

Sample code:

```ballerina
asana:TimeTrackingEntryCompacts entries = check asanaClient->/tasks/["1201234567890"]/time_tracking_entries();
```

Sample response:

```ballerina
{"data": [{"gid": "1122334455", "duration_minutes": 120, "entered_on": "2026-03-16", "created_by": {"gid": "1100112233", "name": "Jane Doe"}}]}
```

</details>

<details>
<summary>Create a time tracking entry</summary>

Creates a time tracking entry on a task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskGid` | `string` | Yes | The globally unique identifier for the task. |
| `payload` | `TaskGidTimeTrackingEntriesBody` | Yes | Time tracking entry data including duration and date. |

Returns: `TimeTrackingEntryOkResponse|error`

Sample code:

```ballerina
asana:TimeTrackingEntryOkResponse entry = check asanaClient->/tasks/["1201234567890"]/time_tracking_entries.post({
    data: {
        duration_minutes: 90,
        entered_on: "2026-03-17"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1122334456", "duration_minutes": 90, "entered_on": "2026-03-17", "created_by": {"gid": "1100112233", "name": "Jane Doe"}}}
```

</details>

#### Events & batch

<details>
<summary>Get events on a resource</summary>

Returns events for a resource since a sync token. Used for polling-based change detection.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetEventsQueries` | No | Query parameters including `resource` (GID) and `sync` (sync token). |

Returns: `EventsResponse|error`

Sample code:

```ballerina
asana:EventsResponse events = check asanaClient->/events({}, resource = "9876543210");
```

Sample response:

```ballerina
{"data": [{"type": "task", "action": "changed", "resource": {"gid": "1201234567890", "resource_type": "task"}}], "sync": "de4774f6915eae04714ca93bb2f5ee81"}
```

</details>

<details>
<summary>Submit parallel batch requests</summary>

Submits multiple API requests in a single HTTP call for improved performance.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchBody` | Yes | Batch request data containing an array of individual actions. |

Returns: `BatchOkResponse|error`

Sample code:

```ballerina
asana:BatchOkResponse batch = check asanaClient->/batch.post({
    data: {
        actions: [
            {
                relative_path: "/tasks/1201234567890",
                method: "GET"
            },
            {
                relative_path: "/tasks/1201234567891",
                method: "GET"
            }
        ]
    }
});
```

Sample response:

```ballerina
{"data": [{"status_code": 200, "body": {"data": {"gid": "1201234567890", "name": "Draft project proposal"}}}, {"status_code": 200, "body": {"data": {"gid": "1201234567891", "name": "Review budget estimates"}}}]}
```

</details>

#### Typeahead

<details>
<summary>Get objects via typeahead</summary>

Searches for objects in a workspace using typeahead-style matching.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |
| `queries` | `GetTypeaheadQueries` | No | Query parameters including `resource_type`, `query`, `count`. |

Returns: `AsanaNamedResourceCompacts|error`

Sample code:

```ballerina
asana:AsanaNamedResourceCompacts results = check asanaClient->/workspaces/["1234567890"]/typeahead({}, resource_type = "task", query = "proposal");
```

Sample response:

```ballerina
{"data": [{"gid": "1201234567890", "name": "Draft project proposal", "resource_type": "task"}]}
```

</details>

#### Memberships

<details>
<summary>Get multiple memberships</summary>

Returns memberships filtered by parent or member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetMembershipsQueries` | No | Query parameters including `parent`, `member`. |

Returns: `MembershipCompacts|error`

Sample code:

```ballerina
asana:MembershipCompacts memberships = check asanaClient->/memberships({}, parent = "9876543210");
```

Sample response:

```ballerina
{"data": [{"gid": "1100998877", "member": {"gid": "1100112233", "name": "Jane Doe"}, "resource_type": "membership"}]}
```

</details>

<details>
<summary>Create a membership</summary>

Creates a new membership (e.g., add a user to a project or goal).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MembershipsBody` | Yes | Membership data including parent and member. |

Returns: `MembershipCreatedResponse|error`

Sample code:

```ballerina
asana:MembershipCreatedResponse membership = check asanaClient->/memberships.post({
    data: {
        parent: "9876543210",
        member: "1100112234"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "1100998878", "member": {"gid": "1100112234", "name": "John Smith"}, "parent": {"gid": "9876543210", "name": "Q2 Planning"}}}
```

</details>

#### Status updates

<details>
<summary>Get status updates</summary>

Returns status updates for a given parent object (project, portfolio, or goal).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetStatusUpdatesQueries` | No | Query parameters including `parent` (resource GID). |

Returns: `StatusUpdateCompacts|error`

Sample code:

```ballerina
asana:StatusUpdateCompacts updates = check asanaClient->/status_updates({}, parent = "9876543210");
```

Sample response:

```ballerina
{"data": [{"gid": "4455667788", "title": "On Track - Week 12", "resource_type": "status_update", "status_type": "on_track"}]}
```

</details>

<details>
<summary>Create a status update</summary>

Creates a new status update on a project, portfolio, or goal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `StatusUpdatesBody` | Yes | Status update data including parent, title, text, and status type. |

Returns: `StatusUpdateOkResponse|error`

Sample code:

```ballerina
asana:StatusUpdateOkResponse update = check asanaClient->/status_updates.post({
    data: {
        parent: "9876543210",
        title: "On Track - Week 13",
        text: "All milestones are progressing as planned.",
        status_type: "on_track"
    }
});
```

Sample response:

```ballerina
{"data": {"gid": "4455667789", "title": "On Track - Week 13", "text": "All milestones are progressing as planned.", "status_type": "on_track"}}
```

</details>

#### Audit log

<details>
<summary>Get audit log events</summary>

Returns audit log events for a workspace. Only available to Enterprise organizations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceGid` | `string` | Yes | The globally unique identifier for the workspace. |
| `queries` | `GetAuditLogEventsQueries` | No | Query parameters including `start_at`, `end_at`, `event_type`. |

Returns: `AuditLogEventResponse|error`

Sample code:

```ballerina
asana:AuditLogEventResponse events = check asanaClient->/workspaces/["1234567890"]/audit_log_events();
```

Sample response:

```ballerina
{"data": [{"gid": "9988776655", "event_type": "task_created", "actor": {"gid": "1100112233", "actor_type": "user"}, "created_at": "2026-03-17T10:00:00.000Z"}]}
```

</details>
