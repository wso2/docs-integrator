---
title: Actions
---

# Actions

The `ballerinax/jira` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Jira Cloud REST API v3: issues, projects, search, comments, workflows, users, and more. |

---

## Client

Jira Cloud REST API v3: issues, projects, search, comments, workflows, users, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:CredentialsConfig\|OAuth2RefreshTokenGrantConfig\|http:BearerTokenConfig` | Required | Authentication configuration. Use `http:CredentialsConfig` for Basic Auth (email + API token), `OAuth2RefreshTokenGrantConfig` for OAuth 2.0, or `http:BearerTokenConfig` for bearer token. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | The maximum time to wait (in seconds) for a response before closing the connection. |
| `retryConfig` | `http:RetryConfig` | `()` | Configurations associated with retrying. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS-related options. |

### Initializing the client

```ballerina
import ballerinax/jira;

configurable string username = ?;
configurable string password = ?;
configurable string domain = ?;

jira:ConnectionConfig config = {
    auth: {
        username: username,
        password: password
    }
};

string serviceUrl = string `https://${domain}.atlassian.net/rest`;

jira:Client jiraClient = check new (config, serviceUrl);
```

### Operations

#### Issues

<details>
<summary>Create issue</summary>

Creates a new issue in a Jira project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueUpdateDetails` | Yes | The issue details including project key, summary, description (ADF format), and issue type. |
| `queries` | `CreateIssueQueries` | No | Optional query parameters such as `updateHistory`. |

Returns: `CreatedIssue|error`

Sample code:

```ballerina
jira:IssueUpdateDetails issuePayload = {
    fields: {
        "project": {"key": "PROJ"},
        "summary": "Fix login page bug",
        "description": {
            'type: "doc",
            version: 1,
            content: [
                {
                    'type: "paragraph",
                    content: [
                        {
                            'type: "text",
                            text: "Login page returns 500 error on invalid credentials"
                        }
                    ]
                }
            ]
        },
        "issuetype": {"name": "Bug"}
    }
};
jira:CreatedIssue issue = check jiraClient->/api/'3/issue.post(issuePayload);
```

Sample response:

```ballerina
{"id": "10042", "key": "PROJ-15", "self": "https://your-domain.atlassian.net/rest/api/3/issue/10042"}
```

</details>

<details>
<summary>Get issue</summary>

Retrieves the details of an issue by its ID or key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue (e.g., `"PROJ-15"`). |
| `queries` | `GetIssueQueries` | No | Optional query parameters such as `fields`, `expand`, `properties`. |

Returns: `IssueBean|error`

Sample code:

```ballerina
jira:IssueBean issue = check jiraClient->/api/'3/issue/["PROJ-15"];
```

Sample response:

```ballerina
{"id": "10042", "key": "PROJ-15", "self": "https://your-domain.atlassian.net/rest/api/3/issue/10042", "fields": {"summary": "Fix login page bug", "status": {"name": "To Do"}, "issuetype": {"name": "Bug"}, "priority": {"name": "High"}}}
```

</details>

<details>
<summary>Edit issue</summary>

Edits an existing issue. Only the fields included in the request are updated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `IssueUpdateDetails` | Yes | The fields to update. |
| `queries` | `EditIssueQueries` | No | Optional query parameters such as `notifyUsers`, `returnIssue`. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"].put({
    fields: {
        "summary": "Fix login page bug (updated)",
        "priority": {"name": "Highest"}
    }
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Delete issue</summary>

Deletes an issue. An issue can be deleted only if it has no sub-tasks, unless `deleteSubtasks` is set to true.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `queries` | `DeleteIssueQueries` | No | Optional query parameters such as `deleteSubtasks`. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/issue/["PROJ-15"].delete();
```

</details>

<details>
<summary>Assign issue</summary>

Assigns an issue to a user by their account ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `User` | Yes | The user to assign. Set `accountId` to the target user's account ID, or `null` to unassign. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"]/assignee.put({
    accountId: "5b10ac8d82e05b22cc7d4ef5"
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Get issue transitions</summary>

Returns the available workflow transitions for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `queries` | `GetTransitionsQueries` | No | Optional query parameters such as `transitionId`, `expand`. |

Returns: `Transitions|error`

Sample code:

```ballerina
jira:Transitions transitions = check jiraClient->/api/'3/issue/["PROJ-15"]/transitions;
```

Sample response:

```ballerina
{"transitions": [{"id": "11", "name": "In Progress", "to": {"name": "In Progress", "id": "3"}}, {"id": "21", "name": "Done", "to": {"name": "Done", "id": "10001"}}]}
```

</details>

<details>
<summary>Transition issue</summary>

Performs a workflow transition on an issue, moving it to a new status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `IssueUpdateDetails` | Yes | The transition details including the `transition.id`. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"]/transitions.post({
    transition: {
        id: "11"
    }
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Bulk create issues</summary>

Creates multiple issues in a single request. Returns details of each created issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssuesUpdateBean` | Yes | The list of issue details to create. |

Returns: `CreatedIssues|error`

Sample code:

```ballerina
jira:CreatedIssues issues = check jiraClient->/api/'3/issue/bulk.post({
    issueUpdates: [
        {
            fields: {
                "project": {"key": "PROJ"},
                "summary": "Task 1",
                "issuetype": {"name": "Task"}
            }
        },
        {
            fields: {
                "project": {"key": "PROJ"},
                "summary": "Task 2",
                "issuetype": {"name": "Task"}
            }
        }
    ]
});
```

Sample response:

```ballerina
{"issues": [{"id": "10043", "key": "PROJ-16", "self": "https://your-domain.atlassian.net/rest/api/3/issue/10043"}, {"id": "10044", "key": "PROJ-17", "self": "https://your-domain.atlassian.net/rest/api/3/issue/10044"}], "errors": []}
```

</details>

#### Search

<details>
<summary>Search for issues using JQL (GET)</summary>

Searches for issues using JQL (Jira Query Language) via query parameters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `SearchForIssuesUsingJqlQueries` | No | Query parameters including `jql`, `startAt`, `maxResults`, `fields`, `expand`. |

Returns: `SearchResults|error`

Sample code:

```ballerina
jira:SearchResults results = check jiraClient->/api/'3/search(jql = "project = PROJ AND status = 'To Do' ORDER BY priority DESC", maxResults = 10);
```

Sample response:

```ballerina
{"startAt": 0, "maxResults": 10, "total": 2, "issues": [{"id": "10042", "key": "PROJ-15", "fields": {"summary": "Fix login page bug", "status": {"name": "To Do"}, "priority": {"name": "High"}}}, {"id": "10043", "key": "PROJ-16", "fields": {"summary": "Task 1", "status": {"name": "To Do"}, "priority": {"name": "Medium"}}}]}
```

</details>

<details>
<summary>Search for issues using JQL (POST)</summary>

Searches for issues using JQL via a request body. Preferred for complex or long JQL queries.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchRequestBean` | Yes | The search request including `jql`, `startAt`, `maxResults`, `fields`. |

Returns: `SearchResults|error`

Sample code:

```ballerina
jira:SearchResults results = check jiraClient->/api/'3/search.post({
    jql: "project = PROJ AND assignee = currentUser() ORDER BY created DESC",
    maxResults: 25,
    fields: ["summary", "status", "assignee", "priority"]
});
```

Sample response:

```ballerina
{"startAt": 0, "maxResults": 25, "total": 1, "issues": [{"id": "10042", "key": "PROJ-15", "fields": {"summary": "Fix login page bug", "status": {"name": "To Do"}, "assignee": {"displayName": "John Doe"}, "priority": {"name": "High"}}}]}
```

</details>

#### Comments

<details>
<summary>Get comments for an issue</summary>

Returns all comments on an issue, paginated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `queries` | `GetCommentsQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `orderBy`, `expand`. |

Returns: `PageOfComments|error`

Sample code:

```ballerina
jira:PageOfComments comments = check jiraClient->/api/'3/issue/["PROJ-15"]/comment;
```

Sample response:

```ballerina
{"startAt": 0, "maxResults": 50, "total": 1, "comments": [{"id": "10001", "author": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}, "body": {"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Sample comment"}]}]}, "created": "2025-01-15T10:30:00.000+0000"}]}
```

</details>

<details>
<summary>Add comment to an issue</summary>

Adds a comment to an issue. The comment body uses Atlassian Document Format (ADF).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `Comment` | Yes | The comment details including body in ADF format. |
| `queries` | `AddCommentQueries` | No | Optional query parameters such as `expand`. |

Returns: `Comment|error`

Sample code:

```ballerina
jira:Comment comment = check jiraClient->/api/'3/issue/["PROJ-15"]/comment.post({
    body: {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "This issue has been reviewed and approved."
                    }
                ]
            }
        ]
    }
});
```

Sample response:

```ballerina
{"id": "10002", "author": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}, "body": {"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "This issue has been reviewed and approved."}]}]}, "created": "2025-01-15T11:00:00.000+0000"}
```

</details>

<details>
<summary>Get comment</summary>

Returns a specific comment on an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `id` | `string` | Yes | The ID of the comment. |

Returns: `Comment|error`

Sample code:

```ballerina
jira:Comment comment = check jiraClient->/api/'3/issue/["PROJ-15"]/comment/["10001"];
```

Sample response:

```ballerina
{"id": "10001", "author": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}, "body": {"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Sample comment"}]}]}, "created": "2025-01-15T10:30:00.000+0000"}
```

</details>

<details>
<summary>Update comment</summary>

Updates an existing comment on an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `id` | `string` | Yes | The ID of the comment. |
| `payload` | `Comment` | Yes | The updated comment body. |

Returns: `Comment|error`

Sample code:

```ballerina
jira:Comment updated = check jiraClient->/api/'3/issue/["PROJ-15"]/comment/["10001"].put({
    body: {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {"type": "text", "text": "Updated comment text."}
                ]
            }
        ]
    }
});
```

Sample response:

```ballerina
{"id": "10001", "author": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}, "body": {"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Updated comment text."}]}]}, "updated": "2025-01-15T12:00:00.000+0000"}
```

</details>

<details>
<summary>Delete comment</summary>

Deletes a comment from an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `id` | `string` | Yes | The ID of the comment. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/issue/["PROJ-15"]/comment/["10001"].delete();
```

</details>

#### Projects

<details>
<summary>Create project</summary>

Creates a new Jira project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateProjectDetails` | Yes | The project details including key, name, project type key, and lead account ID. |

Returns: `ProjectIdentifiers|error`

Sample code:

```ballerina
jira:ProjectIdentifiers project = check jiraClient->/api/'3/project.post({
    'key: "NEWPROJ",
    name: "New Project",
    projectTypeKey: "business",
    leadAccountId: "5b10ac8d82e05b22cc7d4ef5"
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/project/10001", "id": 10001, "key": "NEWPROJ"}
```

</details>

<details>
<summary>Get all projects</summary>

Returns all projects visible to the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllProjectsQueries` | No | Optional query parameters such as `expand`, `recent`, `properties`. |

Returns: `Project[]|error`

Sample code:

```ballerina
jira:Project[] projects = check jiraClient->/api/'3/project;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/project/10001", "id": "10001", "key": "PROJ", "name": "My Project", "projectTypeKey": "software"}]
```

</details>

<details>
<summary>Get project</summary>

Returns the details of a project by its ID or key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `queries` | `GetProjectQueries` | No | Optional query parameters such as `expand`, `properties`. |

Returns: `Project|error`

Sample code:

```ballerina
jira:Project project = check jiraClient->/api/'3/project/["PROJ"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/project/10001", "id": "10001", "key": "PROJ", "name": "My Project", "projectTypeKey": "software", "lead": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}}
```

</details>

<details>
<summary>Update project</summary>

Updates the details of a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `payload` | `UpdateProjectDetails` | Yes | The project details to update. |

Returns: `Project|error`

Sample code:

```ballerina
jira:Project updated = check jiraClient->/api/'3/project/["PROJ"].put({
    name: "Updated Project Name",
    description: "Updated project description"
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/project/10001", "id": "10001", "key": "PROJ", "name": "Updated Project Name"}
```

</details>

<details>
<summary>Delete project</summary>

Deletes a project. All issues and components associated with the project are also deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `queries` | `DeleteProjectQueries` | No | Optional query parameters such as `enableUndo`. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/project/["PROJ"].delete();
```

</details>

<details>
<summary>Search projects</summary>

Returns a paginated list of projects matching the search criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `SearchProjectsQueries` | No | Query parameters including `query`, `typeKey`, `categoryId`, `expand`, `startAt`, `maxResults`. |

Returns: `PageBeanProject|error`

Sample code:

```ballerina
jira:PageBeanProject results = check jiraClient->/api/'3/project/search(query = "Mobile");
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/project/search?query=Mobile", "maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10002", "key": "MOB", "name": "Mobile App", "projectTypeKey": "software"}]}
```

</details>

#### Users

<details>
<summary>Get current user</summary>

Returns details of the currently authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCurrentUserQueries` | No | Optional query parameters such as `expand`. |

Returns: `User|error`

Sample code:

```ballerina
jira:User me = check jiraClient->/api/'3/myself;
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5", "accountId": "5b10ac8d82e05b22cc7d4ef5", "emailAddress": "john@example.com", "displayName": "John Doe", "active": true}
```

</details>

<details>
<summary>Get user</summary>

Returns details of a user by account ID, username, or key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetUserQueries` | No | Query parameters including `accountId`, `username`, `key`, `expand`. |

Returns: `User|error`

Sample code:

```ballerina
jira:User user = check jiraClient->/api/'3/user(accountId = "5b10ac8d82e05b22cc7d4ef5");
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5", "accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe", "emailAddress": "john@example.com", "active": true}
```

</details>

<details>
<summary>Search users</summary>

Returns a list of users matching the search string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `FindUsersQueries` | No | Query parameters including `query`, `startAt`, `maxResults`. |

Returns: `User[]|error`

Sample code:

```ballerina
jira:User[] users = check jiraClient->/api/'3/user/search(query = "john");
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5", "accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe", "active": true}]
```

</details>

<details>
<summary>Find assignable users</summary>

Returns users that can be assigned to an issue in a given project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `FindAssignableUsersQueries` | No | Query parameters including `query`, `project`, `issueKey`, `maxResults`. |

Returns: `User[]|error`

Sample code:

```ballerina
jira:User[] assignable = check jiraClient->/api/'3/user/assignable/search(project = "PROJ");
```

Sample response:

```ballerina
[{"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe", "active": true}, {"accountId": "5b10ac8d82e05b22cc7d4ef6", "displayName": "Jane Smith", "active": true}]
```

</details>

#### Worklogs

<details>
<summary>Get issue worklogs</summary>

Returns all worklogs for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `queries` | `GetIssueWorklogQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `expand`. |

Returns: `PageOfWorklogs|error`

Sample code:

```ballerina
jira:PageOfWorklogs worklogs = check jiraClient->/api/'3/issue/["PROJ-15"]/worklog;
```

Sample response:

```ballerina
{"startAt": 0, "maxResults": 1048576, "total": 1, "worklogs": [{"id": "100028", "author": {"displayName": "John Doe"}, "timeSpent": "3h 20m", "timeSpentSeconds": 12000, "started": "2025-01-15T09:00:00.000+0000"}]}
```

</details>

<details>
<summary>Add worklog</summary>

Adds a worklog entry to an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `Worklog` | Yes | The worklog details including `timeSpentSeconds` or `timeSpent` and `started`. |

Returns: `Worklog|error`

Sample code:

```ballerina
jira:Worklog worklog = check jiraClient->/api/'3/issue/["PROJ-15"]/worklog.post({
    timeSpentSeconds: 7200,
    started: "2025-01-15T09:00:00.000+0000"
});
```

Sample response:

```ballerina
{"id": "100029", "author": {"displayName": "John Doe"}, "timeSpent": "2h", "timeSpentSeconds": 7200, "started": "2025-01-15T09:00:00.000+0000"}
```

</details>

#### Watchers & votes

<details>
<summary>Get issue watchers</summary>

Returns the list of watchers for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |

Returns: `Watchers|error`

Sample code:

```ballerina
jira:Watchers watchers = check jiraClient->/api/'3/issue/["PROJ-15"]/watchers;
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/issue/PROJ-15/watchers", "watchCount": 2, "isWatching": true, "watchers": [{"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}]}
```

</details>

<details>
<summary>Add watcher</summary>

Adds a user as a watcher of an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `string` | Yes | The account ID of the user to add as a watcher (as a quoted string). |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"]/watchers.post("\"5b10ac8d82e05b22cc7d4ef5\"");
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Get issue votes</summary>

Returns the votes for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |

Returns: `Votes|error`

Sample code:

```ballerina
jira:Votes votes = check jiraClient->/api/'3/issue/["PROJ-15"]/votes;
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/issue/PROJ-15/votes", "votes": 3, "hasVoted": false, "voters": [{"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}]}
```

</details>

#### Issue links

<details>
<summary>Create issue link</summary>

Creates a link between two issues.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LinkIssueRequestJsonBean` | Yes | The link details including link type, inward issue, and outward issue. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issueLink.post({
    'type: {name: "Blocks"},
    inwardIssue: {'key: "PROJ-16"},
    outwardIssue: {'key: "PROJ-15"}
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Get issue link</summary>

Returns an issue link by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkId` | `string` | Yes | The ID of the issue link. |

Returns: `IssueLink|error`

Sample code:

```ballerina
jira:IssueLink link = check jiraClient->/api/'3/issueLink/["10001"];
```

Sample response:

```ballerina
{"id": "10001", "type": {"id": "10000", "name": "Blocks", "inward": "is blocked by", "outward": "blocks"}, "inwardIssue": {"id": "10043", "key": "PROJ-16"}, "outwardIssue": {"id": "10042", "key": "PROJ-15"}}
```

</details>

<details>
<summary>Delete issue link</summary>

Deletes an issue link.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkId` | `string` | Yes | The ID of the issue link. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/issueLink/["10001"].delete();
```

</details>

#### Issue types

<details>
<summary>Get all issue types</summary>

Returns all issue types available in the Jira instance.

Returns: `IssueTypeDetails[]|error`

Sample code:

```ballerina
jira:IssueTypeDetails[] issueTypes = check jiraClient->/api/'3/issuetype;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/issuetype/10001", "id": "10001", "name": "Bug", "subtask": false, "description": "A problem or error."}, {"self": "https://your-domain.atlassian.net/rest/api/3/issuetype/10002", "id": "10002", "name": "Task", "subtask": false, "description": "A task that needs to be done."}]
```

</details>

<details>
<summary>Get issue types for project</summary>

Returns the issue types available for a specific project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetIssueTypesForProjectQueries` | Yes | Query parameters including `projectId`. |

Returns: `IssueTypeDetails[]|error`

Sample code:

```ballerina
jira:IssueTypeDetails[] types = check jiraClient->/api/'3/issuetype/project(projectId = 10001);
```

Sample response:

```ballerina
[{"id": "10001", "name": "Bug", "subtask": false}, {"id": "10002", "name": "Task", "subtask": false}, {"id": "10003", "name": "Story", "subtask": false}]
```

</details>

#### Versions

<details>
<summary>Create version</summary>

Creates a project version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Version` | Yes | The version details including name, project ID, and optional release/start dates. |

Returns: `Version|error`

Sample code:

```ballerina
jira:Version version = check jiraClient->/api/'3/version.post({
    name: "v1.0.0",
    projectId: 10001,
    releaseDate: "2025-03-01",
    released: false
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/version/10000", "id": "10000", "name": "v1.0.0", "projectId": 10001, "released": false, "releaseDate": "2025-03-01"}
```

</details>

<details>
<summary>Get version</summary>

Returns a project version by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the version. |

Returns: `Version|error`

Sample code:

```ballerina
jira:Version version = check jiraClient->/api/'3/version/["10000"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/version/10000", "id": "10000", "name": "v1.0.0", "projectId": 10001, "released": false, "releaseDate": "2025-03-01"}
```

</details>

<details>
<summary>Update version</summary>

Updates a project version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the version. |
| `payload` | `Version` | Yes | The updated version details. |

Returns: `Version|error`

Sample code:

```ballerina
jira:Version updated = check jiraClient->/api/'3/version/["10000"].put({
    released: true,
    releaseDate: "2025-02-28"
});
```

Sample response:

```ballerina
{"id": "10000", "name": "v1.0.0", "projectId": 10001, "released": true, "releaseDate": "2025-02-28"}
```

</details>

<details>
<summary>Delete version</summary>

Deletes a project version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the version. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/version/["10000"].delete();
```

</details>

<details>
<summary>Get version related issue counts</summary>

Returns the number of issues in each status category for a version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the version. |

Returns: `VersionIssueCounts|error`

Sample code:

```ballerina
jira:VersionIssueCounts counts = check jiraClient->/api/'3/version/["10000"]/relatedIssueCounts;
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/version/10000/relatedIssueCounts", "issuesFixedCount": 5, "issuesAffectedCount": 12, "issueCountWithCustomFieldsShowingVersion": 3}
```

</details>

#### Components

<details>
<summary>Create component</summary>

Creates a new project component.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectComponent` | Yes | The component details including name and project reference. |

Returns: `ProjectComponent|error`

Sample code:

```ballerina
jira:ProjectComponent component = check jiraClient->/api/'3/component.post({
    name: "Backend",
    project: "PROJ",
    leadAccountId: "5b10ac8d82e05b22cc7d4ef5"
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/component/10000", "id": "10000", "name": "Backend", "project": "PROJ", "lead": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}}
```

</details>

<details>
<summary>Get component</summary>

Returns a project component by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the component. |

Returns: `ProjectComponent|error`

Sample code:

```ballerina
jira:ProjectComponent component = check jiraClient->/api/'3/component/["10000"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/component/10000", "id": "10000", "name": "Backend", "project": "PROJ"}
```

</details>

<details>
<summary>Update component</summary>

Updates a project component.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the component. |
| `payload` | `ProjectComponent` | Yes | The updated component details. |

Returns: `ProjectComponent|error`

Sample code:

```ballerina
jira:ProjectComponent updated = check jiraClient->/api/'3/component/["10000"].put({
    name: "Backend Services",
    description: "All backend microservices"
});
```

Sample response:

```ballerina
{"id": "10000", "name": "Backend Services", "description": "All backend microservices", "project": "PROJ"}
```

</details>

<details>
<summary>Delete component</summary>

Deletes a project component.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the component. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/component/["10000"].delete();
```

</details>

#### Priorities & statuses

<details>
<summary>Get all priorities</summary>

Returns all issue priorities.

Returns: `Priority[]|error`

Sample code:

```ballerina
jira:Priority[] priorities = check jiraClient->/api/'3/priority;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/priority/1", "id": "1", "name": "Highest", "iconUrl": "https://your-domain.atlassian.net/images/icons/priorities/highest.svg"}, {"self": "https://your-domain.atlassian.net/rest/api/3/priority/2", "id": "2", "name": "High"}, {"self": "https://your-domain.atlassian.net/rest/api/3/priority/3", "id": "3", "name": "Medium"}]
```

</details>

<details>
<summary>Get all statuses</summary>

Returns all statuses associated with workflows.

Returns: `StatusDetails[]|error`

Sample code:

```ballerina
jira:StatusDetails[] statuses = check jiraClient->/api/'3/status;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/status/1", "id": "1", "name": "Open", "statusCategory": {"id": 2, "key": "new", "name": "To Do"}}, {"self": "https://your-domain.atlassian.net/rest/api/3/status/3", "id": "3", "name": "In Progress", "statusCategory": {"id": 4, "key": "indeterminate", "name": "In Progress"}}]
```

</details>

<details>
<summary>Get all labels</summary>

Returns a paginated list of all labels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllLabelsQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanString|error`

Sample code:

```ballerina
jira:PageBeanString labels = check jiraClient->/api/'3/label;
```

Sample response:

```ballerina
{"maxResults": 1000, "startAt": 0, "total": 3, "isLast": true, "values": ["backend", "frontend", "urgent"]}
```

</details>

#### Groups

<details>
<summary>Get group</summary>

Returns a group with its name and members.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetGroupQueries` | Yes | Query parameters including `groupname` or `groupId`, and optional `expand`. |

Returns: `Group|error`

Sample code:

```ballerina
jira:Group group = check jiraClient->/api/'3/group(groupname = "jira-software-users");
```

Sample response:

```ballerina
{"name": "jira-software-users", "self": "https://your-domain.atlassian.net/rest/api/3/group?groupname=jira-software-users", "users": {"size": 25, "items": [], "max-results": 50, "start-index": 0, "end-index": 0}}
```

</details>

<details>
<summary>Create group</summary>

Creates a new group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddGroupBean` | Yes | The group name. |

Returns: `Group|error`

Sample code:

```ballerina
jira:Group group = check jiraClient->/api/'3/group.post({name: "new-team-group"});
```

Sample response:

```ballerina
{"name": "new-team-group", "self": "https://your-domain.atlassian.net/rest/api/3/group?groupname=new-team-group"}
```

</details>

<details>
<summary>Get group members</summary>

Returns the members of a group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetUsersFromGroupQueries` | Yes | Query parameters including `groupname` or `groupId`, `startAt`, `maxResults`. |

Returns: `PageBeanUserDetails|error`

Sample code:

```ballerina
jira:PageBeanUserDetails members = check jiraClient->/api/'3/group/member(groupname = "jira-software-users");
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/group/member?groupname=jira-software-users", "maxResults": 50, "startAt": 0, "total": 2, "isLast": true, "values": [{"self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5", "accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe", "active": true}]}
```

</details>

#### Dashboards

<details>
<summary>Search dashboards</summary>

Returns a paginated list of dashboards matching the search criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetDashboardsPaginatedQueries` | No | Query parameters including `dashboardName`, `startAt`, `maxResults`, `expand`. |

Returns: `PageBeanDashboard|error`

Sample code:

```ballerina
jira:PageBeanDashboard dashboards = check jiraClient->/api/'3/dashboard/search(dashboardName = "Sprint");
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10001", "name": "Sprint Dashboard", "self": "https://your-domain.atlassian.net/rest/api/3/dashboard/10001", "owner": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}}]}
```

</details>

<details>
<summary>Create dashboard</summary>

Creates a new dashboard.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DashboardDetails` | Yes | The dashboard details including name and share permissions. |

Returns: `Dashboard|error`

Sample code:

```ballerina
jira:Dashboard dashboard = check jiraClient->/api/'3/dashboard.post({
    name: "Team Dashboard",
    sharePermissions: [
        {"type": "authenticated"}
    ]
});
```

Sample response:

```ballerina
{"id": "10002", "name": "Team Dashboard", "self": "https://your-domain.atlassian.net/rest/api/3/dashboard/10002", "owner": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}}
```

</details>

<details>
<summary>Get dashboard</summary>

Returns a dashboard by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the dashboard. |

Returns: `Dashboard|error`

Sample code:

```ballerina
jira:Dashboard dashboard = check jiraClient->/api/'3/dashboard/["10001"];
```

Sample response:

```ballerina
{"id": "10001", "name": "Sprint Dashboard", "self": "https://your-domain.atlassian.net/rest/api/3/dashboard/10001", "owner": {"accountId": "5b10ac8d82e05b22cc7d4ef5", "displayName": "John Doe"}}
```

</details>

<details>
<summary>Delete dashboard</summary>

Deletes a dashboard.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the dashboard. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/dashboard/["10001"].delete();
```

</details>

#### Attachments

<details>
<summary>Add attachment to issue</summary>

Adds one or more attachments to an issue via multipart file upload.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `MultipartFile[]` | Yes | Array of files to attach. |

Returns: `Attachment[]|error`

Sample code:

```ballerina
jira:Attachment[] attachments = check jiraClient->/api/'3/issue/["PROJ-15"]/attachments.post([
    {fileName: "report.pdf", fileContent: fileBytes}
]);
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/attachment/10000", "id": "10000", "filename": "report.pdf", "size": 24576, "mimeType": "application/pdf"}]
```

</details>

<details>
<summary>Get attachment metadata</summary>

Returns metadata for an attachment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the attachment. |

Returns: `AttachmentMetadata|error`

Sample code:

```ballerina
jira:AttachmentMetadata meta = check jiraClient->/api/'3/attachment/["10000"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/attachment/10000", "id": "10000", "filename": "report.pdf", "size": 24576, "mimeType": "application/pdf", "created": "2025-01-15T10:30:00.000+0000"}
```

</details>

<details>
<summary>Delete attachment</summary>

Deletes an attachment from an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the attachment. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/attachment/["10000"].delete();
```

</details>

#### Filters

<details>
<summary>Create filter</summary>

Creates a new filter (saved JQL query).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Filter` | Yes | The filter details including name and JQL. |

Returns: `Filter|error`

Sample code:

```ballerina
jira:Filter filter = check jiraClient->/api/'3/filter.post({
    name: "My Open Bugs",
    jql: "project = PROJ AND issuetype = Bug AND status != Done",
    favourite: true
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/filter/10001", "id": "10001", "name": "My Open Bugs", "jql": "project = PROJ AND issuetype = Bug AND status != Done", "favourite": true}
```

</details>

<details>
<summary>Search filters</summary>

Returns a paginated list of filters matching the search criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetFiltersPaginatedQueries` | No | Query parameters including `filterName`, `expand`, `startAt`, `maxResults`. |

Returns: `PageBeanFilterDetails|error`

Sample code:

```ballerina
jira:PageBeanFilterDetails filters = check jiraClient->/api/'3/filter/search(filterName = "Bug");
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10001", "name": "My Open Bugs", "jql": "project = PROJ AND issuetype = Bug AND status != Done"}]}
```

</details>

#### Workflows

<details>
<summary>Search workflows</summary>

Returns a paginated list of workflows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetWorkflowsPaginatedQueries` | No | Query parameters including `workflowName`, `expand`, `startAt`, `maxResults`. |

Returns: `PageBeanWorkflow|error`

Sample code:

```ballerina
jira:PageBeanWorkflow workflows = check jiraClient->/api/'3/workflow/search;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "isLast": true, "values": [{"id": {"name": "jira"}, "description": "The default Jira workflow.", "transitions": [{"id": "1", "name": "Create", "to": {"id": "1", "name": "Open"}}]}]}
```

</details>

#### Server info

<details>
<summary>Get server info</summary>

Returns information about the Jira instance.

Returns: `ServerInformation|error`

Sample code:

```ballerina
jira:ServerInformation info = check jiraClient->/api/'3/serverInfo;
```

Sample response:

```ballerina
{"baseUrl": "https://your-domain.atlassian.net", "version": "1001.0.0-SNAPSHOT", "versionNumbers": [1001, 0, 0], "deploymentType": "Cloud", "scmInfo": "unknown", "serverTitle": "Jira"}
```

</details>

#### Bulk operations

<details>
<summary>Bulk delete issues</summary>

Submits a bulk delete operation for multiple issues.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueBulkDeletePayload` | Yes | The list of issue IDs or keys to delete. |

Returns: `SubmittedBulkOperation|error`

Sample code:

```ballerina
jira:SubmittedBulkOperation op = check jiraClient->/api/'3/bulk/issues/delete.post({
    selectedIssueIdsOrKeys: ["PROJ-15", "PROJ-16", "PROJ-17"],
    sendBulkNotification: false
});
```

Sample response:

```ballerina
{"taskId": "10001"}
```

</details>

<details>
<summary>Bulk transition issues</summary>

Submits a bulk transition operation to move multiple issues to a new status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueBulkTransitionPayload` | Yes | The transition details for the issues. |

Returns: `SubmittedBulkOperation|error`

Sample code:

```ballerina
jira:SubmittedBulkOperation op = check jiraClient->/api/'3/bulk/issues/transition.post({
    issues: [
        {issueIdOrKey: "PROJ-15", transitionId: "11"},
        {issueIdOrKey: "PROJ-16", transitionId: "11"}
    ],
    sendBulkNotification: true
});
```

Sample response:

```ballerina
{"taskId": "10002"}
```

</details>

<details>
<summary>Get bulk operation progress</summary>

Returns the progress of a bulk operation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | `string` | Yes | The ID of the bulk operation task. |

Returns: `BulkOperationProgress|error`

Sample code:

```ballerina
jira:BulkOperationProgress progress = check jiraClient->/api/'3/bulk/queue/["10001"];
```

Sample response:

```ballerina
{"taskId": "10001", "status": "COMPLETE", "progressPercent": 100, "submittedBy": {"accountId": "5b10ac8d82e05b22cc7d4ef5"}, "created": 1705312200000, "started": 1705312201000, "finished": 1705312205000}
```

</details>

#### Remote issue links

<details>
<summary>Get remote issue links</summary>

Returns the remote issue links for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |

Returns: `RemoteIssueLink|error`

Sample code:

```ballerina
jira:RemoteIssueLink links = check jiraClient->/api/'3/issue/["PROJ-15"]/remotelink;
```

Sample response:

```ballerina
{"id": 10000, "self": "https://your-domain.atlassian.net/rest/api/3/issue/PROJ-15/remotelink/10000", "object": {"url": "https://github.com/org/repo/pull/42", "title": "PR #42: Fix login bug"}}
```

</details>

<details>
<summary>Create remote issue link</summary>

Creates a remote issue link that associates an issue with an external resource.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `RemoteIssueLinkRequest` | Yes | The remote link details including the external object URL and title. |

Returns: `RemoteIssueLinkIdentifies|error`

Sample code:

```ballerina
jira:RemoteIssueLinkIdentifies link = check jiraClient->/api/'3/issue/["PROJ-15"]/remotelink.post({
    'object: {
        url: "https://github.com/org/repo/pull/42",
        title: "PR #42: Fix login bug"
    }
});
```

Sample response:

```ballerina
{"id": 10001, "self": "https://your-domain.atlassian.net/rest/api/3/issue/PROJ-15/remotelink/10001"}
```

</details>

#### Permissions

<details>
<summary>Get all permissions</summary>

Returns all permissions available in Jira, including custom permissions.

Returns: `Permissions|error`

Sample code:

```ballerina
jira:Permissions permissions = check jiraClient->/api/'3/permissions;
```

Sample response:

```ballerina
{"permissions": {"BROWSE_PROJECTS": {"key": "BROWSE_PROJECTS", "name": "Browse Projects", "type": "PROJECT", "description": "Ability to browse projects."}, "CREATE_ISSUES": {"key": "CREATE_ISSUES", "name": "Create Issues", "type": "PROJECT", "description": "Ability to create issues."}}}
```

</details>

<details>
<summary>Check permissions</summary>

Returns whether the user has the specified permissions for the given resources.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BulkPermissionsRequestBean` | Yes | The permission check request including permissions and resource context. |

Returns: `BulkPermissionGrants|error`

Sample code:

```ballerina
jira:BulkPermissionGrants grants = check jiraClient->/api/'3/permissions/check.post({
    projectPermissions: [
        {
            permissions: ["BROWSE_PROJECTS", "CREATE_ISSUES"],
            projects: [10001]
        }
    ]
});
```

Sample response:

```ballerina
{"projectPermissions": [{"permission": "BROWSE_PROJECTS", "projects": [10001]}, {"permission": "CREATE_ISSUES", "projects": [10001]}]}
```

</details>

<details>
<summary>Get my permissions</summary>

Returns the permissions the current user has for the given project, issue, or globally.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetMyPermissionsQueries` | No | Query parameters including `permissions`, `projectKey`, `issueKey`. |

Returns: `Permissions|error`

Sample code:

```ballerina
jira:Permissions myPerms = check jiraClient->/api/'3/mypermissions(permissions = "BROWSE_PROJECTS,CREATE_ISSUES", projectKey = "PROJ");
```

Sample response:

```ballerina
{"permissions": {"BROWSE_PROJECTS": {"key": "BROWSE_PROJECTS", "name": "Browse Projects", "havePermission": true}, "CREATE_ISSUES": {"key": "CREATE_ISSUES", "name": "Create Issues", "havePermission": true}}}
```

</details>

#### Permission schemes

<details>
<summary>Get all permission schemes</summary>

Returns all permission schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllPermissionSchemesQueries` | No | Optional query parameters such as `expand`. |

Returns: `PermissionSchemes|error`

Sample code:

```ballerina
jira:PermissionSchemes schemes = check jiraClient->/api/'3/permissionscheme;
```

Sample response:

```ballerina
{"permissionSchemes": [{"id": 10000, "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10000", "name": "Default Permission Scheme", "description": "Default scheme"}]}
```

</details>

<details>
<summary>Create permission scheme</summary>

Creates a new permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PermissionScheme` | Yes | The permission scheme details including name and permissions. |

Returns: `PermissionScheme|error`

Sample code:

```ballerina
jira:PermissionScheme scheme = check jiraClient->/api/'3/permissionscheme.post({
    name: "Custom Permission Scheme",
    description: "Permissions for the engineering team"
});
```

Sample response:

```ballerina
{"id": 10001, "self": "https://your-domain.atlassian.net/rest/api/3/permissionscheme/10001", "name": "Custom Permission Scheme", "description": "Permissions for the engineering team"}
```

</details>

<details>
<summary>Get permission scheme</summary>

Returns a permission scheme by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |

Returns: `PermissionScheme|error`

Sample code:

```ballerina
jira:PermissionScheme scheme = check jiraClient->/api/'3/permissionscheme/[10000];
```

Sample response:

```ballerina
{"id": 10000, "name": "Default Permission Scheme", "description": "Default scheme", "permissions": [{"id": 10001, "holder": {"type": "group", "parameter": "jira-software-users"}, "permission": "BROWSE_PROJECTS"}]}
```

</details>

<details>
<summary>Update permission scheme</summary>

Updates a permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |
| `payload` | `PermissionScheme` | Yes | The updated permission scheme details. |

Returns: `PermissionScheme|error`

Sample code:

```ballerina
jira:PermissionScheme updated = check jiraClient->/api/'3/permissionscheme/[10000].put({
    name: "Updated Permission Scheme",
    description: "Updated description"
});
```

Sample response:

```ballerina
{"id": 10000, "name": "Updated Permission Scheme", "description": "Updated description"}
```

</details>

<details>
<summary>Delete permission scheme</summary>

Deletes a permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/permissionscheme/[10001].delete();
```

</details>

<details>
<summary>Get permission scheme grants</summary>

Returns all permission grants for a permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |

Returns: `PermissionGrants|error`

Sample code:

```ballerina
jira:PermissionGrants grants = check jiraClient->/api/'3/permissionscheme/[10000]/permission;
```

Sample response:

```ballerina
{"permissions": [{"id": 10001, "holder": {"type": "group", "parameter": "jira-software-users"}, "permission": "BROWSE_PROJECTS"}], "expand": "permissions"}
```

</details>

<details>
<summary>Create permission grant</summary>

Creates a new permission grant in a permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |
| `payload` | `PermissionGrant` | Yes | The permission grant details. |

Returns: `PermissionGrant|error`

Sample code:

```ballerina
jira:PermissionGrant grant = check jiraClient->/api/'3/permissionscheme/[10000]/permission.post({
    holder: {
        'type: "group",
        'parameter: "jira-software-users"
    },
    permission: "CREATE_ISSUES"
});
```

Sample response:

```ballerina
{"id": 10002, "holder": {"type": "group", "parameter": "jira-software-users"}, "permission": "CREATE_ISSUES"}
```

</details>

<details>
<summary>Delete permission grant</summary>

Deletes a permission grant from a permission scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the permission scheme. |
| `permissionId` | `int` | Yes | The ID of the permission grant. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/permissionscheme/[10000]/permission/[10002].delete();
```

</details>

#### Notification schemes

<details>
<summary>Get notification schemes</summary>

Returns a paginated list of notification schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetNotificationSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`, `expand`. |

Returns: `PageBeanNotificationScheme|error`

Sample code:

```ballerina
jira:PageBeanNotificationScheme schemes = check jiraClient->/api/'3/notificationscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "self": "https://your-domain.atlassian.net/rest/api/3/notificationscheme/10000", "name": "Default Notification Scheme"}]}
```

</details>

<details>
<summary>Create notification scheme</summary>

Creates a new notification scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateNotificationSchemeDetails` | Yes | The notification scheme details. |

Returns: `NotificationSchemeId|error`

Sample code:

```ballerina
jira:NotificationSchemeId scheme = check jiraClient->/api/'3/notificationscheme.post({
    name: "Custom Notification Scheme",
    description: "Notifications for the team"
});
```

Sample response:

```ballerina
{"id": "10001"}
```

</details>

<details>
<summary>Get notification scheme</summary>

Returns a notification scheme by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the notification scheme. |

Returns: `NotificationScheme|error`

Sample code:

```ballerina
jira:NotificationScheme scheme = check jiraClient->/api/'3/notificationscheme/[10000];
```

Sample response:

```ballerina
{"id": 10000, "self": "https://your-domain.atlassian.net/rest/api/3/notificationscheme/10000", "name": "Default Notification Scheme", "description": "Default notification settings"}
```

</details>

<details>
<summary>Update notification scheme</summary>

Updates a notification scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the notification scheme. |
| `payload` | `UpdateNotificationSchemeDetails` | Yes | The updated notification scheme details. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/notificationscheme/["10000"].put({
    name: "Updated Notification Scheme",
    description: "Updated description"
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Delete notification scheme</summary>

Deletes a notification scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `notificationSchemeId` | `string` | Yes | The ID of the notification scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/notificationscheme/["10001"].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Announcement banner

<details>
<summary>Get announcement banner configuration</summary>

Returns the current announcement banner configuration.

Returns: `AnnouncementBannerConfiguration|error`

Sample code:

```ballerina
jira:AnnouncementBannerConfiguration banner = check jiraClient->/api/'3/announcementBanner;
```

Sample response:

```ballerina
{"message": "System maintenance scheduled for tonight.", "isDismissible": true, "isEnabled": true, "hashId": "abc123", "visibility": "public"}
```

</details>

<details>
<summary>Update announcement banner configuration</summary>

Updates the announcement banner configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AnnouncementBannerConfigurationUpdate` | Yes | The updated banner configuration. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/announcementBanner.put({
    message: "Jira will be unavailable on Saturday 9-11 AM UTC.",
    isDismissible: true,
    isEnabled: true,
    visibility: "public"
});
```

Sample response:

```ballerina
null
```

</details>

#### Application properties & roles

<details>
<summary>Get application property</summary>

Returns an application property or list of application properties.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetApplicationPropertyQueries` | No | Optional query parameters such as `key`, `permissionLevel`, `keyFilter`. |

Returns: `ApplicationProperty[]|error`

Sample code:

```ballerina
jira:ApplicationProperty[] props = check jiraClient->/api/'3/application\-properties;
```

Sample response:

```ballerina
[{"id": "jira.title", "key": "jira.title", "value": "My Jira Instance", "name": "Title", "desc": "The title of this Jira instance."}]
```

</details>

<details>
<summary>Get advanced settings</summary>

Returns the application properties that are accessible on the Advanced Settings page.

Returns: `ApplicationProperty[]|error`

Sample code:

```ballerina
jira:ApplicationProperty[] settings = check jiraClient->/api/'3/application\-properties/advanced\-settings;
```

Sample response:

```ballerina
[{"id": "jira.attachment.size", "key": "jira.attachment.size", "value": "52428800", "name": "Maximum attachment size", "desc": "Maximum size (in bytes) for attachments."}]
```

</details>

<details>
<summary>Get all application roles</summary>

Returns all application roles.

Returns: `ApplicationRole[]|error`

Sample code:

```ballerina
jira:ApplicationRole[] roles = check jiraClient->/api/'3/applicationrole;
```

Sample response:

```ballerina
[{"key": "jira-software", "name": "Jira Software", "groups": ["jira-software-users"], "defaultGroups": ["jira-software-users"]}]
```

</details>

<details>
<summary>Get application role</summary>

Returns an application role by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key of the application role. |

Returns: `ApplicationRole|error`

Sample code:

```ballerina
jira:ApplicationRole role = check jiraClient->/api/'3/applicationrole/["jira-software"];
```

Sample response:

```ballerina
{"key": "jira-software", "name": "Jira Software", "groups": ["jira-software-users"], "defaultGroups": ["jira-software-users"]}
```

</details>

#### Audit records

<details>
<summary>Get audit records</summary>

Returns a list of audit records matching the filter criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAuditRecordsQueries` | No | Query parameters including `offset`, `limit`, `filter`, `from`, `to`. |

Returns: `AuditRecords|error`

Sample code:

```ballerina
jira:AuditRecords records = check jiraClient->/api/'3/auditing/'record;
```

Sample response:

```ballerina
{"offset": 0, "limit": 1000, "total": 1, "records": [{"id": 1, "summary": "User logged in", "created": "2025-01-15T10:30:00.000+0000", "category": "user management"}]}
```

</details>

#### Configuration

<details>
<summary>Get global settings</summary>

Returns the global Jira configuration settings.

Returns: `Configuration|error`

Sample code:

```ballerina
jira:Configuration config = check jiraClient->/api/'3/configuration;
```

Sample response:

```ballerina
{"votingEnabled": true, "watchingEnabled": true, "unassignedIssuesAllowed": true, "subTasksEnabled": true, "issueLinkingEnabled": true, "timeTrackingEnabled": true, "attachmentsEnabled": true, "timeTrackingConfiguration": {"workingHoursPerDay": 8.0, "workingDaysPerWeek": 5.0}}
```

</details>

<details>
<summary>Get time tracking provider</summary>

Returns the currently selected time tracking provider.

Returns: `TimeTrackingProvider|json|error`

Sample code:

```ballerina
jira:TimeTrackingProvider|json provider = check jiraClient->/api/'3/configuration/timetracking;
```

Sample response:

```ballerina
{"key": "JIRA", "name": "JIRA provided time tracking"}
```

</details>

<details>
<summary>Get time tracking settings</summary>

Returns the time tracking settings (hours per day, days per week, format).

Returns: `TimeTrackingConfiguration|error`

Sample code:

```ballerina
jira:TimeTrackingConfiguration ttConfig = check jiraClient->/api/'3/configuration/timetracking/options;
```

Sample response:

```ballerina
{"workingHoursPerDay": 8.0, "workingDaysPerWeek": 5.0, "timeFormat": "pretty", "defaultUnit": "minute"}
```

</details>

#### Fields

<details>
<summary>Get all fields</summary>

Returns all system and custom fields.

Returns: `FieldDetails[]|error`

Sample code:

```ballerina
jira:FieldDetails[] fields = check jiraClient->/api/'3/'field;
```

Sample response:

```ballerina
[{"id": "summary", "name": "Summary", "custom": false, "orderable": true, "navigable": true, "searchable": true, "schema": {"type": "string", "system": "summary"}}, {"id": "customfield_10001", "name": "Story Points", "custom": true}]
```

</details>

<details>
<summary>Create custom field</summary>

Creates a custom field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomFieldDefinitionJsonBean` | Yes | The custom field definition including name, type, and search key. |

Returns: `FieldDetails|error`

Sample code:

```ballerina
jira:FieldDetails field = check jiraClient->/api/'3/'field.post({
    name: "Story Points",
    'type: "com.atlassian.jira.plugin.system.customfieldtypes:float",
    searcherKey: "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber"
});
```

Sample response:

```ballerina
{"id": "customfield_10100", "name": "Story Points", "custom": true, "schema": {"type": "number", "custom": "com.atlassian.jira.plugin.system.customfieldtypes:float", "customId": 10100}}
```

</details>

<details>
<summary>Search fields</summary>

Returns a paginated list of fields matching the search criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetFieldsPaginatedQueries` | No | Query parameters including `startAt`, `maxResults`, `type`, `id`, `query`, `expand`. |

Returns: `PageBeanField|error`

Sample code:

```ballerina
jira:PageBeanField fields = check jiraClient->/api/'3/'field/search(query = "Story");
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "customfield_10100", "name": "Story Points", "schema": {"type": "number"}, "description": "Estimated story points"}]}
```

</details>

<details>
<summary>Update custom field</summary>

Updates a custom field's name and description.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | `string` | Yes | The ID of the custom field. |
| `payload` | `UpdateCustomFieldDetails` | Yes | The updated field details. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/'field/["customfield_10100"].put({
    name: "Story Points (SP)",
    description: "Estimated effort in story points"
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Delete custom field</summary>

Deletes a custom field. The custom field is moved to the trash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the custom field. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response resp = check jiraClient->/api/'3/'field/["customfield_10100"].delete();
```

</details>

<details>
<summary>Get field contexts</summary>

Returns the contexts for a custom field.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | `string` | Yes | The ID of the custom field. |
| `queries` | `GetContextsForFieldQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanCustomFieldContext|error`

Sample code:

```ballerina
jira:PageBeanCustomFieldContext contexts = check jiraClient->/api/'3/'field/["customfield_10100"]/context;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10001", "name": "Default Context", "isGlobalContext": true, "isAnyIssueType": true}]}
```

</details>

<details>
<summary>Get context options</summary>

Returns the options for a custom field context (e.g., select list options).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | `string` | Yes | The ID of the custom field. |
| `contextId` | `int` | Yes | The ID of the context. |

Returns: `PageBeanCustomFieldContextOption|error`

Sample code:

```ballerina
jira:PageBeanCustomFieldContextOption options = check jiraClient->/api/'3/'field/["customfield_10200"]/context/[10001]/option;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 2, "values": [{"id": "10001", "value": "Option A", "disabled": false}, {"id": "10002", "value": "Option B", "disabled": false}]}
```

</details>

#### Field configurations

<details>
<summary>Get all field configurations</summary>

Returns a paginated list of field configurations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllFieldConfigurationsQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`, `isDefault`. |

Returns: `PageBeanFieldConfigurationDetails|error`

Sample code:

```ballerina
jira:PageBeanFieldConfigurationDetails configs = check jiraClient->/api/'3/fieldconfiguration;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "name": "Default Field Configuration", "isDefault": true}]}
```

</details>

<details>
<summary>Create field configuration</summary>

Creates a new field configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FieldConfigurationDetails` | Yes | The field configuration details. |

Returns: `FieldConfiguration|error`

Sample code:

```ballerina
jira:FieldConfiguration config = check jiraClient->/api/'3/fieldconfiguration.post({
    name: "Bug Field Configuration",
    description: "Fields for bug tracking"
});
```

Sample response:

```ballerina
{"id": 10001, "name": "Bug Field Configuration", "description": "Fields for bug tracking"}
```

</details>

<details>
<summary>Get field configuration items</summary>

Returns the fields for a field configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the field configuration. |

Returns: `PageBeanFieldConfigurationItem|error`

Sample code:

```ballerina
jira:PageBeanFieldConfigurationItem items = check jiraClient->/api/'3/fieldconfiguration/[10000]/fields;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 2, "values": [{"id": "summary", "isHidden": false, "isRequired": true}, {"id": "description", "isHidden": false, "isRequired": false}]}
```

</details>

<details>
<summary>Delete field configuration</summary>

Deletes a field configuration.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the field configuration. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/fieldconfiguration/[10001].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Field configuration schemes

<details>
<summary>Get all field configuration schemes</summary>

Returns a paginated list of field configuration schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllFieldConfigurationSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`. |

Returns: `PageBeanFieldConfigurationScheme|error`

Sample code:

```ballerina
jira:PageBeanFieldConfigurationScheme schemes = check jiraClient->/api/'3/fieldconfigurationscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10000", "name": "Default Field Configuration Scheme"}]}
```

</details>

<details>
<summary>Create field configuration scheme</summary>

Creates a field configuration scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpdateFieldConfigurationSchemeDetails` | Yes | The scheme details. |

Returns: `FieldConfigurationScheme|error`

Sample code:

```ballerina
jira:FieldConfigurationScheme scheme = check jiraClient->/api/'3/fieldconfigurationscheme.post({
    name: "Custom Field Config Scheme",
    description: "Scheme for specific projects"
});
```

Sample response:

```ballerina
{"id": "10001", "name": "Custom Field Config Scheme", "description": "Scheme for specific projects"}
```

</details>

<details>
<summary>Delete field configuration scheme</summary>

Deletes a field configuration scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the field configuration scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/fieldconfigurationscheme/[10001].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Issue type schemes

<details>
<summary>Get all issue type schemes</summary>

Returns a paginated list of issue type schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllIssueTypeSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`, `orderBy`. |

Returns: `PageBeanIssueTypeScheme|error`

Sample code:

```ballerina
jira:PageBeanIssueTypeScheme schemes = check jiraClient->/api/'3/issuetypescheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10000", "name": "Default Issue Type Scheme", "defaultIssueTypeId": "10001"}]}
```

</details>

<details>
<summary>Create issue type scheme</summary>

Creates an issue type scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueTypeSchemeDetails` | Yes | The issue type scheme details including name and issue type IDs. |

Returns: `IssueTypeSchemeID|error`

Sample code:

```ballerina
jira:IssueTypeSchemeID scheme = check jiraClient->/api/'3/issuetypescheme.post({
    name: "Software Issue Type Scheme",
    issueTypeIds: ["10001", "10002", "10003"]
});
```

Sample response:

```ballerina
{"issueTypeSchemeId": "10001"}
```

</details>

<details>
<summary>Update issue type scheme</summary>

Updates an issue type scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueTypeSchemeId` | `int` | Yes | The ID of the issue type scheme. |
| `payload` | `IssueTypeSchemeUpdateDetails` | Yes | The updated scheme details. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issuetypescheme/[10001].put({
    name: "Updated Software Issue Type Scheme",
    description: "Updated description"
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Delete issue type scheme</summary>

Deletes an issue type scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueTypeSchemeId` | `int` | Yes | The ID of the issue type scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issuetypescheme/[10001].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Issue type screen schemes

<details>
<summary>Get all issue type screen schemes</summary>

Returns a paginated list of issue type screen schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetIssueTypeScreenSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`. |

Returns: `PageBeanIssueTypeScreenScheme|error`

Sample code:

```ballerina
jira:PageBeanIssueTypeScreenScheme schemes = check jiraClient->/api/'3/issuetypescreenscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10000", "name": "Default Issue Type Screen Scheme"}]}
```

</details>

<details>
<summary>Create issue type screen scheme</summary>

Creates an issue type screen scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueTypeScreenSchemeDetails` | Yes | The issue type screen scheme details. |

Returns: `IssueTypeScreenSchemeId|error`

Sample code:

```ballerina
jira:IssueTypeScreenSchemeId scheme = check jiraClient->/api/'3/issuetypescreenscheme.post({
    name: "Custom ITSS",
    issueTypeMappings: [
        {issueTypeId: "default", screenSchemeId: "10000"}
    ]
});
```

Sample response:

```ballerina
{"id": "10001"}
```

</details>

<details>
<summary>Delete issue type screen scheme</summary>

Deletes an issue type screen scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueTypeScreenSchemeId` | `string` | Yes | The ID of the issue type screen scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issuetypescreenscheme/["10001"].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Issue security schemes

<details>
<summary>Get issue security schemes</summary>

Returns all issue security schemes.

Returns: `SecuritySchemes|error`

Sample code:

```ballerina
jira:SecuritySchemes schemes = check jiraClient->/api/'3/issuesecurityschemes;
```

Sample response:

```ballerina
{"issueSecuritySchemes": [{"self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityschemes/10000", "id": 10000, "name": "Default Security Scheme"}]}
```

</details>

<details>
<summary>Create issue security scheme</summary>

Creates an issue security scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateIssueSecuritySchemeDetails` | Yes | The security scheme details. |

Returns: `SecuritySchemeId|error`

Sample code:

```ballerina
jira:SecuritySchemeId scheme = check jiraClient->/api/'3/issuesecurityschemes.post({
    name: "Restricted Security Scheme",
    description: "For confidential issues"
});
```

Sample response:

```ballerina
{"id": "10001"}
```

</details>

<details>
<summary>Get issue security scheme</summary>

Returns an issue security scheme by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the issue security scheme. |

Returns: `SecurityScheme|error`

Sample code:

```ballerina
jira:SecurityScheme scheme = check jiraClient->/api/'3/issuesecurityschemes/[10000];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/issuesecurityschemes/10000", "id": 10000, "name": "Default Security Scheme", "defaultSecurityLevelId": 10001}
```

</details>

<details>
<summary>Delete issue security scheme</summary>

Deletes an issue security scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `string` | Yes | The ID of the issue security scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issuesecurityschemes/["10001"].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Screens

<details>
<summary>Get screens</summary>

Returns a paginated list of all screens.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetScreensQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`. |

Returns: `PageBeanScreen|error`

Sample code:

```ballerina
jira:PageBeanScreen screens = check jiraClient->/api/'3/screens;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "name": "Default Screen"}]}
```

</details>

<details>
<summary>Create screen</summary>

Creates a screen.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenDetails` | Yes | The screen details. |

Returns: `Screen|error`

Sample code:

```ballerina
jira:Screen screen = check jiraClient->/api/'3/screens.post({
    name: "Bug Screen",
    description: "Screen for bug issues"
});
```

Sample response:

```ballerina
{"id": 10001, "name": "Bug Screen", "description": "Screen for bug issues"}
```

</details>

<details>
<summary>Update screen</summary>

Updates a screen.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screenId` | `int` | Yes | The ID of the screen. |
| `payload` | `UpdateScreenDetails` | Yes | The updated screen details. |

Returns: `Screen|error`

Sample code:

```ballerina
jira:Screen updated = check jiraClient->/api/'3/screens/[10001].put({
    name: "Bug Screen Updated",
    description: "Updated screen for bugs"
});
```

Sample response:

```ballerina
{"id": 10001, "name": "Bug Screen Updated", "description": "Updated screen for bugs"}
```

</details>

<details>
<summary>Delete screen</summary>

Deletes a screen.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screenId` | `int` | Yes | The ID of the screen. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/screens/[10001].delete();
```

</details>

<details>
<summary>Get screen tabs</summary>

Returns the tabs for a screen.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screenId` | `int` | Yes | The ID of the screen. |

Returns: `ScreenableTab[]|error`

Sample code:

```ballerina
jira:ScreenableTab[] tabs = check jiraClient->/api/'3/screens/[10000]/tabs;
```

Sample response:

```ballerina
[{"id": 10001, "name": "Field Tab"}]
```

</details>

<details>
<summary>Get screen tab fields</summary>

Returns the fields on a screen tab.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screenId` | `int` | Yes | The ID of the screen. |
| `tabId` | `int` | Yes | The ID of the tab. |

Returns: `ScreenableField[]|error`

Sample code:

```ballerina
jira:ScreenableField[] fields = check jiraClient->/api/'3/screens/[10000]/tabs/[10001]/fields;
```

Sample response:

```ballerina
[{"id": "summary", "name": "Summary"}, {"id": "description", "name": "Description"}, {"id": "priority", "name": "Priority"}]
```

</details>

#### Screen schemes

<details>
<summary>Get screen schemes</summary>

Returns a paginated list of screen schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetScreenSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`. |

Returns: `PageBeanScreenScheme|error`

Sample code:

```ballerina
jira:PageBeanScreenScheme schemes = check jiraClient->/api/'3/screenscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "name": "Default Screen Scheme"}]}
```

</details>

<details>
<summary>Create screen scheme</summary>

Creates a screen scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ScreenSchemeDetails` | Yes | The screen scheme details. |

Returns: `ScreenSchemeId|error`

Sample code:

```ballerina
jira:ScreenSchemeId scheme = check jiraClient->/api/'3/screenscheme.post({
    name: "Custom Screen Scheme",
    screens: {
        default: 10000
    }
});
```

Sample response:

```ballerina
{"id": 10001}
```

</details>

<details>
<summary>Delete screen scheme</summary>

Deletes a screen scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screenSchemeId` | `string` | Yes | The ID of the screen scheme. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/screenscheme/["10001"].delete();
```

</details>

#### Workflow schemes

<details>
<summary>Get all workflow schemes</summary>

Returns a paginated list of all workflow schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllWorkflowSchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanWorkflowScheme|error`

Sample code:

```ballerina
jira:PageBeanWorkflowScheme schemes = check jiraClient->/api/'3/workflowscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "name": "Default Workflow Scheme", "defaultWorkflow": "jira"}]}
```

</details>

<details>
<summary>Create workflow scheme</summary>

Creates a workflow scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WorkflowScheme` | Yes | The workflow scheme details. |

Returns: `WorkflowScheme|error`

Sample code:

```ballerina
jira:WorkflowScheme scheme = check jiraClient->/api/'3/workflowscheme.post({
    name: "Custom Workflow Scheme",
    description: "Workflow for software projects",
    defaultWorkflow: "jira"
});
```

Sample response:

```ballerina
{"id": 10001, "name": "Custom Workflow Scheme", "description": "Workflow for software projects", "defaultWorkflow": "jira"}
```

</details>

<details>
<summary>Get workflow scheme</summary>

Returns a workflow scheme by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the workflow scheme. |

Returns: `WorkflowScheme|error`

Sample code:

```ballerina
jira:WorkflowScheme scheme = check jiraClient->/api/'3/workflowscheme/[10000];
```

Sample response:

```ballerina
{"id": 10000, "name": "Default Workflow Scheme", "defaultWorkflow": "jira", "issueTypeMappings": {"10001": "jira", "10002": "jira"}}
```

</details>

<details>
<summary>Update workflow scheme</summary>

Updates a workflow scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the workflow scheme. |
| `payload` | `WorkflowScheme` | Yes | The updated workflow scheme details. |

Returns: `WorkflowScheme|error`

Sample code:

```ballerina
jira:WorkflowScheme updated = check jiraClient->/api/'3/workflowscheme/[10001].put({
    name: "Updated Workflow Scheme",
    description: "Updated description"
});
```

Sample response:

```ballerina
{"id": 10001, "name": "Updated Workflow Scheme", "description": "Updated description", "defaultWorkflow": "jira"}
```

</details>

<details>
<summary>Delete workflow scheme</summary>

Deletes a workflow scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the workflow scheme. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/workflowscheme/[10001].delete();
```

</details>

#### Roles

<details>
<summary>Get all project roles</summary>

Returns a list of all project roles.

Returns: `ProjectRole[]|error`

Sample code:

```ballerina
jira:ProjectRole[] roles = check jiraClient->/api/'3/role;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/role/10002", "name": "Administrators", "id": 10002}, {"self": "https://your-domain.atlassian.net/rest/api/3/role/10001", "name": "Developers", "id": 10001}]
```

</details>

<details>
<summary>Create project role</summary>

Creates a new project role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateUpdateRoleRequestBean` | Yes | The role details including name and description. |

Returns: `ProjectRole|error`

Sample code:

```ballerina
jira:ProjectRole role = check jiraClient->/api/'3/role.post({
    name: "QA Team",
    description: "Quality assurance team members"
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/role/10003", "name": "QA Team", "id": 10003, "description": "Quality assurance team members"}
```

</details>

<details>
<summary>Get project role</summary>

Returns a project role by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the project role. |

Returns: `ProjectRole|error`

Sample code:

```ballerina
jira:ProjectRole role = check jiraClient->/api/'3/role/[10002];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/role/10002", "name": "Administrators", "id": 10002, "description": "A project role for administrators"}
```

</details>

<details>
<summary>Delete project role</summary>

Deletes a project role.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the project role. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/role/[10003].delete();
```

</details>

#### Project categories

<details>
<summary>Get all project categories</summary>

Returns all project categories.

Returns: `ProjectCategory[]|error`

Sample code:

```ballerina
jira:ProjectCategory[] categories = check jiraClient->/api/'3/projectCategory;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000", "id": "10000", "name": "Engineering", "description": "Engineering projects"}]
```

</details>

<details>
<summary>Create project category</summary>

Creates a project category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ProjectCategory` | Yes | The project category details. |

Returns: `ProjectCategory|error`

Sample code:

```ballerina
jira:ProjectCategory category = check jiraClient->/api/'3/projectCategory.post({
    name: "Marketing",
    description: "Marketing projects"
});
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10001", "id": "10001", "name": "Marketing", "description": "Marketing projects"}
```

</details>

<details>
<summary>Get project category</summary>

Returns a project category by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the project category. |

Returns: `ProjectCategory|error`

Sample code:

```ballerina
jira:ProjectCategory category = check jiraClient->/api/'3/projectCategory/[10000];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/projectCategory/10000", "id": "10000", "name": "Engineering", "description": "Engineering projects"}
```

</details>

<details>
<summary>Delete project category</summary>

Deletes a project category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The ID of the project category. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/projectCategory/[10001].delete();
```

</details>

#### Project validation

<details>
<summary>Validate project key</summary>

Validates a project key and returns any errors.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ValidateProjectKeyQueries` | No | Query parameters including `key`. |

Returns: `ErrorCollection|error`

Sample code:

```ballerina
jira:ErrorCollection result = check jiraClient->/api/'3/projectvalidate/'key(key = "NEWPROJ");
```

Sample response:

```ballerina
{"errorMessages": [], "errors": {}}
```

</details>

<details>
<summary>Get valid project key</summary>

Returns a valid project key based on the suggested key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetValidProjectKeyQueries` | No | Query parameters including `key`. |

Returns: `string|error`

Sample code:

```ballerina
string validKey = check jiraClient->/api/'3/projectvalidate/validProjectKey(key = "My Project");
```

Sample response:

```ballerina
"MYPROJECT"
```

</details>

#### Resolutions

<details>
<summary>Get all resolutions</summary>

Returns a list of all issue resolution values.

Returns: `Resolution[]|error`

Sample code:

```ballerina
jira:Resolution[] resolutions = check jiraClient->/api/'3/resolution;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/resolution/1", "id": "1", "name": "Fixed", "description": "A fix for this issue is checked into the tree and tested."}, {"id": "2", "name": "Won't Fix"}, {"id": "3", "name": "Duplicate"}]
```

</details>

<details>
<summary>Get resolution</summary>

Returns a resolution by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the resolution. |

Returns: `Resolution|error`

Sample code:

```ballerina
jira:Resolution resolution = check jiraClient->/api/'3/resolution/["1"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/resolution/1", "id": "1", "name": "Fixed", "description": "A fix for this issue is checked into the tree and tested."}
```

</details>

<details>
<summary>Search resolutions</summary>

Returns a paginated list of resolutions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `SearchResolutionsQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `id`. |

Returns: `PageBeanResolutionJsonBean|error`

Sample code:

```ballerina
jira:PageBeanResolutionJsonBean results = check jiraClient->/api/'3/resolution/search;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 3, "values": [{"id": "1", "name": "Fixed"}, {"id": "2", "name": "Won't Fix"}, {"id": "3", "name": "Duplicate"}]}
```

</details>

#### Priority schemes

<details>
<summary>Get priority schemes</summary>

Returns a paginated list of priority schemes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetPrioritySchemesQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects|error`

Sample code:

```ballerina
jira:PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects schemes = check jiraClient->/api/'3/priorityscheme;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10000, "name": "Default Priority Scheme"}]}
```

</details>

<details>
<summary>Create priority scheme</summary>

Creates a priority scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreatePrioritySchemeDetails` | Yes | The priority scheme details. |

Returns: `PrioritySchemeId|error`

Sample code:

```ballerina
jira:PrioritySchemeId scheme = check jiraClient->/api/'3/priorityscheme.post({
    name: "Custom Priority Scheme",
    defaultPriorityId: 3
});
```

Sample response:

```ballerina
{"prioritySchemeId": 10001}
```

</details>

<details>
<summary>Delete priority scheme</summary>

Deletes a priority scheme.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemeId` | `int` | Yes | The ID of the priority scheme. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/priorityscheme/[10001].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Plans (advanced roadmaps)

<details>
<summary>Get plans</summary>

Returns a paginated list of plans (requires Jira Premium or Advanced Roadmaps).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetPlansQueries` | No | Optional query parameters such as `cursor`. |

Returns: `PageWithCursorGetPlanResponseForPage|error`

Sample code:

```ballerina
jira:PageWithCursorGetPlanResponseForPage plans = check jiraClient->/api/'3/plans/plan;
```

Sample response:

```ballerina
{"values": [{"id": 1, "name": "Q1 Roadmap", "status": "ACTIVE"}], "cursor": "abc123"}
```

</details>

<details>
<summary>Create plan</summary>

Creates a new plan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreatePlanRequest` | Yes | The plan details. |

Returns: `int|error`

Sample code:

```ballerina
int planId = check jiraClient->/api/'3/plans/plan.post({
    name: "Q2 Roadmap",
    leadAccountId: "5b10ac8d82e05b22cc7d4ef5",
    issueSources: [{
        'type: "Project",
        value: 10001
    }],
    scheduling: {
        dependencies: "Sequential",
        estimation: "StoryPoints"
    }
});
```

Sample response:

```ballerina
2
```

</details>

<details>
<summary>Get plan</summary>

Returns a plan by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `planId` | `int` | Yes | The ID of the plan. |

Returns: `GetPlanResponse|error`

Sample code:

```ballerina
jira:GetPlanResponse plan = check jiraClient->/api/'3/plans/plan/[1];
```

Sample response:

```ballerina
{"id": 1, "name": "Q1 Roadmap", "status": "ACTIVE", "leadAccountId": "5b10ac8d82e05b22cc7d4ef5"}
```

</details>

<details>
<summary>Archive plan</summary>

Archives a plan.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `planId` | `int` | Yes | The ID of the plan. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/plans/plan/[1]/archive.put();
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Trash plan</summary>

Moves a plan to the trash.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `planId` | `int` | Yes | The ID of the plan. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/plans/plan/[1]/trash.put();
```

Sample response:

```ballerina
null
```

</details>

#### JQL

<details>
<summary>Get JQL autocomplete data</summary>

Returns the JQL autocomplete reference data: fields, functions, and operators.

Returns: `JQLReferenceData|error`

Sample code:

```ballerina
jira:JQLReferenceData data = check jiraClient->/api/'3/jql/autocompletedata;
```

Sample response:

```ballerina
{"visibleFieldNames": [{"value": "summary", "displayName": "Summary", "orderable": "true"}], "visibleFunctionNames": [{"value": "currentUser()", "displayName": "currentUser()"}]}
```

</details>

<details>
<summary>Parse JQL queries</summary>

Parses and validates JQL queries, returning the parsed structure or errors.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JqlQueriesToParse` | Yes | The JQL queries to parse. |

Returns: `ParsedJqlQueries|error`

Sample code:

```ballerina
jira:ParsedJqlQueries parsed = check jiraClient->/api/'3/jql/parse.post({
    queries: ["project = PROJ AND status = 'In Progress'"]
});
```

Sample response:

```ballerina
{"queries": [{"query": "project = PROJ AND status = 'In Progress'", "structure": {"where": {"clause": "AND"}}}]}
```

</details>

<details>
<summary>Sanitize JQL queries</summary>

Sanitizes JQL queries by replacing user-identifying information with account IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JqlQueriesToSanitize` | Yes | The JQL queries to sanitize. |

Returns: `SanitizedJqlQueries|error`

Sample code:

```ballerina
jira:SanitizedJqlQueries sanitized = check jiraClient->/api/'3/jql/sanitize.post({
    queries: [
        {query: "assignee = john.doe"}
    ]
});
```

Sample response:

```ballerina
{"queries": [{"initialQuery": "assignee = john.doe", "sanitizedQuery": "assignee = '5b10ac8d82e05b22cc7d4ef5'"}]}
```

</details>

#### Webhooks

<details>
<summary>Get webhooks</summary>

Returns the webhooks registered by the calling app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetDynamicWebhooksForAppQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanWebhook|error`

Sample code:

```ballerina
jira:PageBeanWebhook webhooks = check jiraClient->/api/'3/webhook;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": 10001, "jqlFilter": "project = PROJ", "fieldIdsFilter": ["summary", "status"], "events": ["jira:issue_created", "jira:issue_updated"]}]}
```

</details>

<details>
<summary>Register webhooks</summary>

Registers webhooks for the calling app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhookRegistrationDetails` | Yes | The webhook registration details including URL, events, and JQL filter. |

Returns: `ContainerForRegisteredWebhooks|error`

Sample code:

```ballerina
jira:ContainerForRegisteredWebhooks result = check jiraClient->/api/'3/webhook.post({
    url: "https://your-app.example.com/webhook",
    webhooks: [
        {
            jqlFilter: "project = PROJ",
            events: ["jira:issue_created", "jira:issue_updated"]
        }
    ]
});
```

Sample response:

```ballerina
{"webhookRegistrationResult": [{"createdWebhookId": 10001}]}
```

</details>

<details>
<summary>Delete webhooks</summary>

Deletes webhooks by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContainerForWebhookIDs` | Yes | The IDs of webhooks to delete. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/webhook.delete({webhookIds: [10001]});
```

</details>

<details>
<summary>Get failed webhooks</summary>

Returns webhooks that have recently failed to be delivered.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetFailedWebhooksQueries` | No | Optional query parameters such as `maxResults`, `after`. |

Returns: `FailedWebhooks|error`

Sample code:

```ballerina
jira:FailedWebhooks failed = check jiraClient->/api/'3/webhook/failed;
```

Sample response:

```ballerina
{"maxResults": 100, "values": [{"id": "abc123", "body": "{\"webhookEvent\":\"jira:issue_created\"}", "url": "https://your-app.example.com/webhook", "failureTime": 1705312200000}]}
```

</details>

<details>
<summary>Refresh webhook expiration</summary>

Extends the life of the specified webhooks.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContainerForWebhookIDs` | Yes | The IDs of webhooks to refresh. |

Returns: `WebhooksExpirationDate|error`

Sample code:

```ballerina
jira:WebhooksExpirationDate expiry = check jiraClient->/api/'3/webhook/refresh.put({webhookIds: [10001]});
```

Sample response:

```ballerina
{"expirationDate": 1707904200000}
```

</details>

#### Issue link types

<details>
<summary>Get issue link types</summary>

Returns all issue link types.

Returns: `IssueLinkTypes|error`

Sample code:

```ballerina
jira:IssueLinkTypes linkTypes = check jiraClient->/api/'3/issueLinkType;
```

Sample response:

```ballerina
{"issueLinkTypes": [{"id": "10000", "name": "Blocks", "inward": "is blocked by", "outward": "blocks"}, {"id": "10001", "name": "Duplicate", "inward": "is duplicated by", "outward": "duplicates"}]}
```

</details>

<details>
<summary>Create issue link type</summary>

Creates an issue link type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueLinkType` | Yes | The issue link type details. |

Returns: `IssueLinkType|error`

Sample code:

```ballerina
jira:IssueLinkType linkType = check jiraClient->/api/'3/issueLinkType.post({
    name: "Causes",
    inward: "is caused by",
    outward: "causes"
});
```

Sample response:

```ballerina
{"id": "10002", "name": "Causes", "inward": "is caused by", "outward": "causes"}
```

</details>

<details>
<summary>Get issue link type</summary>

Returns an issue link type by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueLinkTypeId` | `string` | Yes | The ID of the issue link type. |

Returns: `IssueLinkType|error`

Sample code:

```ballerina
jira:IssueLinkType linkType = check jiraClient->/api/'3/issueLinkType/["10000"];
```

Sample response:

```ballerina
{"id": "10000", "name": "Blocks", "inward": "is blocked by", "outward": "blocks"}
```

</details>

<details>
<summary>Delete issue link type</summary>

Deletes an issue link type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueLinkTypeId` | `string` | Yes | The ID of the issue link type. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/issueLinkType/["10002"].delete();
```

</details>

#### Statuses (managed)

<details>
<summary>Get statuses by ID</summary>

Returns the statuses matching the given IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetStatusesByIdQueries` | No | Query parameters including `id`, `expand`. |

Returns: `JiraStatus[]|error`

Sample code:

```ballerina
jira:JiraStatus[] statuses = check jiraClient->/api/'3/statuses(id = "1,3");
```

Sample response:

```ballerina
[{"id": "1", "name": "Open", "statusCategory": "TODO"}, {"id": "3", "name": "In Progress", "statusCategory": "IN_PROGRESS"}]
```

</details>

<details>
<summary>Create statuses</summary>

Creates statuses for a workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `StatusCreateRequest` | Yes | The status creation details including names and categories. |

Returns: `JiraStatus[]|error`

Sample code:

```ballerina
jira:JiraStatus[] newStatuses = check jiraClient->/api/'3/statuses.post({
    statuses: [
        {name: "Code Review", statusCategory: "IN_PROGRESS"},
        {name: "QA Testing", statusCategory: "IN_PROGRESS"}
    ],
    scope: {
        'type: "PROJECT",
        project: {id: "10001"}
    }
});
```

Sample response:

```ballerina
[{"id": "10100", "name": "Code Review", "statusCategory": "IN_PROGRESS"}, {"id": "10101", "name": "QA Testing", "statusCategory": "IN_PROGRESS"}]
```

</details>

<details>
<summary>Update statuses</summary>

Updates existing statuses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `StatusUpdateRequest` | Yes | The status update details. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/statuses.put({
    statuses: [
        {id: "10100", name: "Peer Review", statusCategory: "IN_PROGRESS"}
    ]
});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Search statuses</summary>

Returns a paginated list of statuses matching the search criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `SearchQueries` | No | Query parameters including `expand`, `projectId`, `startAt`, `maxResults`, `searchString`, `statusCategory`. |

Returns: `PageOfStatuses|error`

Sample code:

```ballerina
jira:PageOfStatuses results = check jiraClient->/api/'3/statuses/search(searchString = "Review");
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10100", "name": "Code Review", "statusCategory": "IN_PROGRESS"}]}
```

</details>

#### Issue properties

<details>
<summary>Get issue property keys</summary>

Returns the keys of all properties for an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |

Returns: `PropertyKeys|error`

Sample code:

```ballerina
jira:PropertyKeys keys = check jiraClient->/api/'3/issue/["PROJ-15"]/properties;
```

Sample response:

```ballerina
{"keys": [{"self": "https://your-domain.atlassian.net/rest/api/3/issue/PROJ-15/properties/myProperty", "key": "myProperty"}]}
```

</details>

<details>
<summary>Get issue property</summary>

Returns the value of an issue property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `propertyKey` | `string` | Yes | The key of the property. |

Returns: `EntityProperty|error`

Sample code:

```ballerina
jira:EntityProperty prop = check jiraClient->/api/'3/issue/["PROJ-15"]/properties/["myProperty"];
```

Sample response:

```ballerina
{"key": "myProperty", "value": {"count": 42, "label": "Custom Value"}}
```

</details>

<details>
<summary>Set issue property</summary>

Sets the value of an issue property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `propertyKey` | `string` | Yes | The key of the property. |
| `payload` | `json` | Yes | The property value (any JSON). |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"]/properties/["myProperty"].put({"count": 42, "label": "Custom Value"});
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Delete issue property</summary>

Deletes an issue property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `propertyKey` | `string` | Yes | The key of the property. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/api/'3/issue/["PROJ-15"]/properties/["myProperty"].delete();
```

</details>

#### Issue changelogs

<details>
<summary>Get issue changelogs</summary>

Returns a paginated list of all changelogs for an issue sorted by date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `queries` | `GetChangeLogsQueries` | No | Optional query parameters such as `startAt`, `maxResults`. |

Returns: `PageBeanChangelog|error`

Sample code:

```ballerina
jira:PageBeanChangelog changelogs = check jiraClient->/api/'3/issue/["PROJ-15"]/changelog;
```

Sample response:

```ballerina
{"maxResults": 100, "startAt": 0, "total": 1, "values": [{"id": "10001", "author": {"displayName": "John Doe"}, "created": "2025-01-15T10:30:00.000+0000", "items": [{"field": "status", "fromString": "To Do", "toString": "In Progress"}]}]}
```

</details>

#### Issue notifications

<details>
<summary>Send issue notification</summary>

Sends a notification (email) about an issue to specified users.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |
| `payload` | `Notification` | Yes | The notification details including subject, text body, and recipients. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/issue/["PROJ-15"]/notify.post({
    subject: "Issue update",
    textBody: "This issue has been assigned to you.",
    to: {
        users: [
            {accountId: "5b10ac8d82e05b22cc7d4ef5"}
        ]
    }
});
```

Sample response:

```ballerina
null
```

</details>

#### Issue edit & create metadata

<details>
<summary>Get create issue metadata</summary>

Returns the metadata required to create issues, including available projects and issue types.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetCreateIssueMetaQueries` | No | Optional query parameters such as `projectIds`, `projectKeys`, `issuetypeIds`, `expand`. |

Returns: `IssueCreateMetadata|error`

Sample code:

```ballerina
jira:IssueCreateMetadata meta = check jiraClient->/api/'3/issue/createmeta(projectKeys = "PROJ");
```

Sample response:

```ballerina
{"projects": [{"id": "10001", "key": "PROJ", "name": "My Project", "issuetypes": [{"id": "10001", "name": "Bug"}, {"id": "10002", "name": "Task"}]}]}
```

</details>

<details>
<summary>Get edit issue metadata</summary>

Returns the metadata required to edit an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issueIdOrKey` | `string` | Yes | The ID or key of the issue. |

Returns: `IssueUpdateMetadata|error`

Sample code:

```ballerina
jira:IssueUpdateMetadata editMeta = check jiraClient->/api/'3/issue/["PROJ-15"]/editmeta;
```

Sample response:

```ballerina
{"fields": {"summary": {"required": true, "schema": {"type": "string"}, "name": "Summary", "operations": ["set"]}, "priority": {"required": false, "schema": {"type": "priority"}, "name": "Priority", "operations": ["set"]}}}
```

</details>

#### My preferences

<details>
<summary>Get preference</summary>

Returns the value of a preference for the current user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetPreferenceQueries` | Yes | Query parameters including `key`. |

Returns: `string|error`

Sample code:

```ballerina
string pref = check jiraClient->/api/'3/mypreferences(key = "user.notifications.mimetype");
```

Sample response:

```ballerina
"text/html"
```

</details>

<details>
<summary>Set preference</summary>

Sets the value of a preference for the current user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `string` | Yes | The new preference value. |
| `queries` | `SetPreferenceQueries` | Yes | Query parameters including `key`. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/mypreferences.put("text/html", key = "user.notifications.mimetype");
```

Sample response:

```ballerina
null
```

</details>

<details>
<summary>Get locale</summary>

Returns the locale of the current user.

Returns: `Locale|error`

Sample code:

```ballerina
jira:Locale locale = check jiraClient->/api/'3/mypreferences/locale;
```

Sample response:

```ballerina
{"locale": "en_US"}
```

</details>

#### Tasks

<details>
<summary>Get task</summary>

Returns the status of a long-running asynchronous task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | `string` | Yes | The ID of the task. |

Returns: `TaskProgressBeanObject|error`

Sample code:

```ballerina
jira:TaskProgressBeanObject task = check jiraClient->/api/'3/task/["10001"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/task/10001", "id": "10001", "status": "COMPLETE", "progress": 100, "result": "Success"}
```

</details>

<details>
<summary>Cancel task</summary>

Cancels a long-running asynchronous task.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taskId` | `string` | Yes | The ID of the task. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/task/["10001"]/cancel.post();
```

Sample response:

```ballerina
null
```

</details>

#### Issue events

<details>
<summary>Get events</summary>

Returns all issue event types.

Returns: `IssueEvent[]|error`

Sample code:

```ballerina
jira:IssueEvent[] events = check jiraClient->/api/'3/events;
```

Sample response:

```ballerina
[{"id": 1, "name": "Issue Created"}, {"id": 2, "name": "Issue Updated"}, {"id": 3, "name": "Issue Assigned"}, {"id": 4, "name": "Issue Resolved"}, {"id": 5, "name": "Issue Deleted"}]
```

</details>

#### Custom field option

<details>
<summary>Get custom field option</summary>

Returns a custom field option by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the custom field option. |

Returns: `CustomFieldOption|error`

Sample code:

```ballerina
jira:CustomFieldOption option = check jiraClient->/api/'3/customFieldOption/["10001"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/customFieldOption/10001", "value": "Option A"}
```

</details>

#### License & instance

<details>
<summary>Get instance license</summary>

Returns the license information for the Jira instance.

Returns: `License|error`

Sample code:

```ballerina
jira:License license = check jiraClient->/api/'3/instance/license;
```

Sample response:

```ballerina
{"applications": [{"id": "jira-software", "plan": "FREE"}]}
```

</details>

<details>
<summary>Get approximate license count</summary>

Returns the approximate license count for the Jira instance.

Returns: `LicenseMetric|error`

Sample code:

```ballerina
jira:LicenseMetric metric = check jiraClient->/api/'3/license/approximateLicenseCount;
```

Sample response:

```ballerina
{"key": "approximateLicenseCount", "value": "25"}
```

</details>

#### System avatars

<details>
<summary>Get system avatars</summary>

Returns the system avatars by type (issuetype, project, user, or priority).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"issuetype"\|"project"\|"user"\|"priority"` | Yes | The avatar type. |

Returns: `SystemAvatars|error`

Sample code:

```ballerina
jira:SystemAvatars avatars = check jiraClient->/api/'3/avatar/["project"]/system;
```

Sample response:

```ballerina
{"system": [{"id": "10001", "isSystemAvatar": true, "isSelected": false}]}
```

</details>

#### Status categories

<details>
<summary>Get all status categories</summary>

Returns all status categories.

Returns: `StatusCategory[]|error`

Sample code:

```ballerina
jira:StatusCategory[] categories = check jiraClient->/api/'3/statuscategory;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/1", "id": 1, "key": "undefined", "colorName": "medium-gray", "name": "No Category"}, {"id": 2, "key": "new", "colorName": "blue-gray", "name": "To Do"}, {"id": 4, "key": "indeterminate", "colorName": "yellow", "name": "In Progress"}, {"id": 3, "key": "done", "colorName": "green", "name": "Done"}]
```

</details>

<details>
<summary>Get status category</summary>

Returns a status category by its ID or key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `idOrKey` | `string` | Yes | The ID or key of the status category. |

Returns: `StatusCategory|error`

Sample code:

```ballerina
jira:StatusCategory category = check jiraClient->/api/'3/statuscategory/["done"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/statuscategory/3", "id": 3, "key": "done", "colorName": "green", "name": "Done"}
```

</details>

#### Issue archive

<details>
<summary>Archive issues</summary>

Archives a list of issues synchronously.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueArchivalSyncRequest` | Yes | The list of issue IDs or keys to archive. |

Returns: `IssueArchivalSyncResponse|error`

Sample code:

```ballerina
jira:IssueArchivalSyncResponse result = check jiraClient->/api/'3/issue/archive.put({
    issueIdsOrKeys: ["PROJ-15", "PROJ-16"]
});
```

Sample response:

```ballerina
{"numberOfIssuesUpdated": 2, "errors": {}}
```

</details>

<details>
<summary>Unarchive issues</summary>

Unarchives a list of issues synchronously.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `IssueArchivalSyncRequest` | Yes | The list of issue IDs or keys to unarchive. |

Returns: `IssueArchivalSyncResponse|error`

Sample code:

```ballerina
jira:IssueArchivalSyncResponse result = check jiraClient->/api/'3/issue/unarchive.put({
    issueIdsOrKeys: ["PROJ-15", "PROJ-16"]
});
```

Sample response:

```ballerina
{"numberOfIssuesUpdated": 2, "errors": {}}
```

</details>

#### UI modifications

<details>
<summary>Get UI modifications</summary>

Returns a paginated list of UI modifications.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetUiModificationsQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `expand`. |

Returns: `PageBeanUiModificationDetails|error`

Sample code:

```ballerina
jira:PageBeanUiModificationDetails mods = check jiraClient->/api/'3/uiModifications;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 0, "values": []}
```

</details>

<details>
<summary>Create UI modification</summary>

Creates a UI modification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateUiModificationDetails` | Yes | The UI modification details. |

Returns: `UiModificationIdentifiers|error`

Sample code:

```ballerina
jira:UiModificationIdentifiers mod = check jiraClient->/api/'3/uiModifications.post({
    name: "Hide priority field",
    data: "{\"type\": \"hidden\", \"field\": \"priority\"}"
});
```

Sample response:

```ballerina
{"id": "10001", "self": "https://your-domain.atlassian.net/rest/api/3/uiModifications/10001"}
```

</details>

<details>
<summary>Delete UI modification</summary>

Deletes a UI modification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `uiModificationId` | `string` | Yes | The ID of the UI modification. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/uiModifications/["10001"].delete();
```

Sample response:

```ballerina
null
```

</details>

#### Bulk worklogs

<details>
<summary>Get deleted worklog IDs</summary>

Returns the IDs and delete times of worklogs deleted since the specified timestamp.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetIdsOfWorklogsDeletedSinceQueries` | No | Query parameters including `since` (Unix timestamp in ms). |

Returns: `ChangedWorklogs|error`

Sample code:

```ballerina
jira:ChangedWorklogs deleted = check jiraClient->/api/'3/worklog/deleted(since = 1705312200000);
```

Sample response:

```ballerina
{"values": [{"worklogId": 100028, "updatedTime": 1705400000000}], "since": 1705312200000, "until": 1705400000000, "lastPage": true}
```

</details>

<details>
<summary>Get worklogs by IDs</summary>

Returns the worklogs for a list of worklog IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WorklogIdsRequestBean` | Yes | The worklog IDs to retrieve. |

Returns: `Worklog[]|error`

Sample code:

```ballerina
jira:Worklog[] worklogs = check jiraClient->/api/'3/worklog/list.post({
    ids: [100028, 100029]
});
```

Sample response:

```ballerina
[{"id": "100028", "author": {"displayName": "John Doe"}, "timeSpent": "3h 20m", "timeSpentSeconds": 12000}, {"id": "100029", "author": {"displayName": "Jane Smith"}, "timeSpent": "2h", "timeSpentSeconds": 7200}]
```

</details>

<details>
<summary>Get updated worklog IDs</summary>

Returns the IDs and update times of worklogs updated since the specified timestamp.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetIdsOfWorklogsModifiedSinceQueries` | No | Query parameters including `since` (Unix timestamp in ms). |

Returns: `ChangedWorklogs|error`

Sample code:

```ballerina
jira:ChangedWorklogs updated = check jiraClient->/api/'3/worklog/updated(since = 1705312200000);
```

Sample response:

```ballerina
{"values": [{"worklogId": 100028, "updatedTime": 1705400000000}], "since": 1705312200000, "until": 1705400000000, "lastPage": true}
```

</details>

#### Data policy

<details>
<summary>Get workspace data policy</summary>

Returns the data policy for the workspace.

Returns: `WorkspaceDataPolicy|error`

Sample code:

```ballerina
jira:WorkspaceDataPolicy policy = check jiraClient->/api/'3/data\-policy;
```

Sample response:

```ballerina
{"anyContentBlocked": false}
```

</details>

<details>
<summary>Get project data policies</summary>

Returns data policies for projects.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetPoliciesQueries` | No | Query parameters including `ids`. |

Returns: `ProjectDataPolicies|error`

Sample code:

```ballerina
jira:ProjectDataPolicies policies = check jiraClient->/api/'3/data\-policy/project(ids = "10001");
```

Sample response:

```ballerina
{"projectDataPolicies": [{"projectId": "10001", "anyContentBlocked": false}]}
```

</details>

#### Classification levels

<details>
<summary>Get classification levels</summary>

Returns all classification levels.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetAllUserDataClassificationLevelsQueries` | No | Optional query parameters such as `status`, `orderBy`. |

Returns: `DataClassificationLevelsBean|error`

Sample code:

```ballerina
jira:DataClassificationLevelsBean levels = check jiraClient->/api/'3/classification\-levels;
```

Sample response:

```ballerina
{"classifications": [{"id": "10001", "name": "Public", "description": "Public information", "rank": 1}]}
```

</details>

#### Settings

<details>
<summary>Get default columns</summary>

Returns the default issue navigator columns.

Returns: `ColumnItem[]|error`

Sample code:

```ballerina
jira:ColumnItem[] columns = check jiraClient->/api/'3/settings/columns;
```

Sample response:

```ballerina
[{"label": "Key", "value": "issuekey"}, {"label": "Summary", "value": "summary"}, {"label": "Issue Type", "value": "issuetype"}, {"label": "Status", "value": "status"}, {"label": "Priority", "value": "priority"}]
```

</details>

#### Expressions

<details>
<summary>Analyse Jira expression</summary>

Analyses Jira expressions and returns type information and validation errors.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JiraExpressionForAnalysis` | Yes | The Jira expressions to analyse. |

Returns: `JiraExpressionsAnalysis|error`

Sample code:

```ballerina
jira:JiraExpressionsAnalysis analysis = check jiraClient->/api/'3/expression/analyse.post({
    expressions: ["issue.summary"]
});
```

Sample response:

```ballerina
{"results": [{"expression": "issue.summary", "valid": true, "type": "string"}]}
```

</details>

<details>
<summary>Evaluate Jira expression</summary>

Evaluates a Jira expression and returns the result.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JiraExpressionEvaluateRequestBean` | Yes | The expression to evaluate including context. |

Returns: `JExpEvaluateJiraExpressionResultBean|error`

Sample code:

```ballerina
jira:JExpEvaluateJiraExpressionResultBean result = check jiraClient->/api/'3/expression/evaluate.post({
    expression: "issue.summary",
    context: {
        issue: {
            'key: "PROJ-15"
        }
    }
});
```

Sample response:

```ballerina
{"value": "Fix login page bug", "meta": {"complexity": {"steps": {"value": 1, "limit": 10000}}}}
```

</details>

#### Project properties

<details>
<summary>Get project property keys</summary>

Returns the keys of all properties for a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |

Returns: `PropertyKeys|error`

Sample code:

```ballerina
jira:PropertyKeys keys = check jiraClient->/api/'3/project/["PROJ"]/properties;
```

Sample response:

```ballerina
{"keys": [{"self": "https://your-domain.atlassian.net/rest/api/3/project/PROJ/properties/myProp", "key": "myProp"}]}
```

</details>

<details>
<summary>Get project property</summary>

Returns the value of a project property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `propertyKey` | `string` | Yes | The key of the property. |

Returns: `EntityProperty|error`

Sample code:

```ballerina
jira:EntityProperty prop = check jiraClient->/api/'3/project/["PROJ"]/properties/["myProp"];
```

Sample response:

```ballerina
{"key": "myProp", "value": {"team": "engineering"}}
```

</details>

<details>
<summary>Set project property</summary>

Sets the value of a project property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `propertyKey` | `string` | Yes | The key of the property. |
| `payload` | `json` | Yes | The property value. |

Returns: `json|error`

Sample code:

```ballerina
json result = check jiraClient->/api/'3/project/["PROJ"]/properties/["myProp"].put({"team": "engineering"});
```

Sample response:

```ballerina
null
```

</details>

#### Project roles (per project)

<details>
<summary>Get project roles for project</summary>

Returns a list of project roles for a specific project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |

Returns: `record {|string...;|}|error`

Sample code:

```ballerina
record {|string...;|} roles = check jiraClient->/api/'3/project/["PROJ"]/role;
```

Sample response:

```ballerina
{"Administrators": "https://your-domain.atlassian.net/rest/api/3/project/PROJ/role/10002", "Developers": "https://your-domain.atlassian.net/rest/api/3/project/PROJ/role/10001"}
```

</details>

<details>
<summary>Get project role for project</summary>

Returns the details of a project role for a specific project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `id` | `int` | Yes | The ID of the project role. |

Returns: `ProjectRole|error`

Sample code:

```ballerina
jira:ProjectRole role = check jiraClient->/api/'3/project/["PROJ"]/role/[10002];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/project/PROJ/role/10002", "name": "Administrators", "id": 10002, "actors": [{"id": 10001, "displayName": "John Doe", "type": "atlassian-user-role-actor"}]}
```

</details>

#### Project versions (per project)

<details>
<summary>Get project versions paginated</summary>

Returns a paginated list of versions for a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |
| `queries` | `GetProjectVersionsPaginatedQueries` | No | Optional query parameters such as `startAt`, `maxResults`, `orderBy`, `status`, `expand`. |

Returns: `PageBeanVersion|error`

Sample code:

```ballerina
jira:PageBeanVersion versions = check jiraClient->/api/'3/project/["PROJ"]/version;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 2, "values": [{"id": "10000", "name": "v1.0.0", "released": true}, {"id": "10001", "name": "v2.0.0", "released": false}]}
```

</details>

<details>
<summary>Get project components</summary>

Returns all components for a project.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |

Returns: `ProjectComponent[]|error`

Sample code:

```ballerina
jira:ProjectComponent[] components = check jiraClient->/api/'3/project/["PROJ"]/components;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/component/10000", "id": "10000", "name": "Backend"}, {"id": "10001", "name": "Frontend"}]
```

</details>

<details>
<summary>Get project statuses</summary>

Returns the valid statuses for a project, grouped by issue type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectIdOrKey` | `string` | Yes | The ID or key of the project. |

Returns: `IssueTypeWithStatus[]|error`

Sample code:

```ballerina
jira:IssueTypeWithStatus[] statuses = check jiraClient->/api/'3/project/["PROJ"]/statuses;
```

Sample response:

```ballerina
[{"self": "https://your-domain.atlassian.net/rest/api/3/issuetype/10001", "id": "10001", "name": "Bug", "statuses": [{"self": "https://your-domain.atlassian.net/rest/api/3/status/1", "id": "1", "name": "Open"}, {"id": "3", "name": "In Progress"}, {"id": "10001", "name": "Done"}]}]
```

</details>

#### Project types

<details>
<summary>Get all project types</summary>

Returns all project types.

Returns: `ProjectType[]|error`

Sample code:

```ballerina
jira:ProjectType[] types = check jiraClient->/api/'3/project/'type;
```

Sample response:

```ballerina
[{"key": "software", "formattedKey": "Software", "descriptionI18nKey": "jira.project.type.software.description"}, {"key": "business", "formattedKey": "Business"}, {"key": "service_desk", "formattedKey": "Service Management"}]
```

</details>

<details>
<summary>Get accessible project type</summary>

Returns a project type if it is accessible to the user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectTypeKey` | `"software"\|"service_desk"\|"business"\|"product_discovery"` | Yes | The key of the project type. |

Returns: `ProjectType|error`

Sample code:

```ballerina
jira:ProjectType projectType = check jiraClient->/api/'3/project/'type/["software"]/accessible;
```

Sample response:

```ballerina
{"key": "software", "formattedKey": "Software", "descriptionI18nKey": "jira.project.type.software.description"}
```

</details>

#### Search (advanced)

<details>
<summary>Get approximate issue count</summary>

Returns an approximate count of issues matching a JQL query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `JQLCountRequestBean` | Yes | The JQL query to count. |

Returns: `JQLCountResultsBean|error`

Sample code:

```ballerina
jira:JQLCountResultsBean count = check jiraClient->/api/'3/search/approximate\-count.post({
    jql: "project = PROJ AND status != Done"
});
```

Sample response:

```ballerina
{"count": 42}
```

</details>

<details>
<summary>Search and reconcile issues (GET)</summary>

Searches for issues using JQL with reconciliation support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `SearchAndReconsileIssuesUsingJqlQueries` | No | Query parameters including `jql`, `startAt`, `maxResults`, `fields`. |

Returns: `SearchAndReconcileResults|error`

Sample code:

```ballerina
jira:SearchAndReconcileResults results = check jiraClient->/api/'3/search/jql(jql = "project = PROJ ORDER BY updated DESC");
```

Sample response:

```ballerina
{"issues": [{"id": "10042", "key": "PROJ-15", "fields": {"summary": "Fix login page bug"}}]}
```

</details>

<details>
<summary>Search and reconcile issues (POST)</summary>

Searches for issues using JQL via request body with reconciliation support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchAndReconcileRequestBean` | Yes | The search request. |

Returns: `SearchAndReconcileResults|error`

Sample code:

```ballerina
jira:SearchAndReconcileResults results = check jiraClient->/api/'3/search/jql.post({
    jql: "project = PROJ ORDER BY updated DESC",
    maxResults: 10
});
```

Sample response:

```ballerina
{"issues": [{"id": "10042", "key": "PROJ-15", "fields": {"summary": "Fix login page bug"}}]}
```

</details>

#### Atlassian connect

<details>
<summary>Get app property keys</summary>

Returns the keys of all properties for a Connect app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addonKey` | `string` | Yes | The key of the Connect app. |

Returns: `PropertyKeys|error`

Sample code:

```ballerina
jira:PropertyKeys keys = check jiraClient->/atlassian\-connect/'1/addons/["my-addon"]/properties;
```

Sample response:

```ballerina
{"keys": [{"self": "https://your-domain.atlassian.net/rest/atlassian-connect/1/addons/my-addon/properties/config", "key": "config"}]}
```

</details>

<details>
<summary>Get dynamic modules</summary>

Returns all dynamic modules registered by the calling Connect app.

Returns: `ConnectModules|error`

Sample code:

```ballerina
jira:ConnectModules modules = check jiraClient->/atlassian\-connect/'1/app/module/dynamic;
```

Sample response:

```ballerina
{"modules": []}
```

</details>

<details>
<summary>Get service registry</summary>

Returns services registered in the Atlassian service registry.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `ServiceRegistryResourceServicesGetQueries` | No | Optional query parameters. |

Returns: `ServiceRegistry[]|error`

Sample code:

```ballerina
jira:ServiceRegistry[] services = check jiraClient->/atlassian\-connect/'1/service\-registry;
```

Sample response:

```ballerina
[]
```

</details>

#### Security level

<details>
<summary>Get security level</summary>

Returns a security level by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the security level. |

Returns: `SecurityLevel|error`

Sample code:

```ballerina
jira:SecurityLevel level = check jiraClient->/api/'3/securitylevel/["10001"];
```

Sample response:

```ballerina
{"self": "https://your-domain.atlassian.net/rest/api/3/securitylevel/10001", "id": "10001", "name": "Confidential", "description": "Only visible to team leads"}
```

</details>

#### Redact

<details>
<summary>Submit bulk redaction</summary>

Submits a bulk redaction request to remove sensitive data from issues.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BulkRedactionRequest` | Yes | The redaction request details. |

Returns: `string|error`

Sample code:

```ballerina
string jobId = check jiraClient->/api/'3/redact.post({
    searchText: "sensitive-data",
    replaceWith: "[REDACTED]",
    issueIdsOrKeys: ["PROJ-15", "PROJ-16"]
});
```

Sample response:

```ballerina
"job-abc-123"
```

</details>

<details>
<summary>Get redaction job status</summary>

Returns the status of a redaction job.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `jobId` | `string` | Yes | The ID of the redaction job. |

Returns: `RedactionJobStatusResponse|error`

Sample code:

```ballerina
jira:RedactionJobStatusResponse status = check jiraClient->/api/'3/redact/status/["job-abc-123"];
```

Sample response:

```ballerina
{"status": "COMPLETED", "totalIssues": 2, "processedIssues": 2}
```

</details>

#### App custom field configuration

<details>
<summary>Bulk get custom field configurations</summary>

Returns custom field configurations for a list of contexts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ConfigurationsListParameters` | Yes | The context IDs to retrieve configurations for. |

Returns: `PageBeanBulkContextualConfiguration|error`

Sample code:

```ballerina
jira:PageBeanBulkContextualConfiguration configs = check jiraClient->/api/'3/app/'field/context/configuration/list.post({
    fieldIdOrKeys: ["customfield_10100"],
    contextIds: [10001]
});
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10001", "fieldId": "customfield_10100", "configuration": {}}]}
```

</details>

<details>
<summary>Get custom field configuration</summary>

Returns the configuration for a custom field's context.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldIdOrKey` | `string` | Yes | The ID or key of the custom field. |

Returns: `PageBeanContextualConfiguration|error`

Sample code:

```ballerina
jira:PageBeanContextualConfiguration config = check jiraClient->/api/'3/app/'field/["customfield_10100"]/context/configuration;
```

Sample response:

```ballerina
{"maxResults": 50, "startAt": 0, "total": 1, "values": [{"id": "10001", "configuration": {}}]}
```

</details>

#### Forge app properties

<details>
<summary>Set Forge app property</summary>

Sets the value of a Forge app property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `propertyKey` | `string` | Yes | The key of the property. |
| `payload` | `json` | Yes | The property value. |

Returns: `OperationMessage|error`

Sample code:

```ballerina
jira:OperationMessage result = check jiraClient->/forge/'1/app/properties/["myForgeConfig"].put({"enabled": true});
```

Sample response:

```ballerina
{"message": "Property updated.", "statusCode": 200}
```

</details>

<details>
<summary>Delete Forge app property</summary>

Deletes a Forge app property.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `propertyKey` | `string` | Yes | The key of the property. |

Returns: `error?`

Sample code:

```ballerina
check jiraClient->/forge/'1/app/properties/["myForgeConfig"].delete();
```

</details>
