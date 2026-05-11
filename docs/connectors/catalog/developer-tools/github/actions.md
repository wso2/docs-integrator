---
title: Actions
---

# Actions

The `ballerinax/github` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the GitHub REST API (903 resource functions) for managing repositories, issues, pull requests, organizations, users, and more. |

---

## Client

Provides access to the GitHub REST API (903 resource functions) for managing repositories, issues, pull requests, organizations, users, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Authentication configuration. Supply a Personal Access Token (PAT) as a bearer token: `{token: ""}`. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version used by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `()` | HTTP/1.x protocol settings including keep-alive and chunking behavior. |
| `http2Settings` | `http:ClientHttp2Settings` | `()` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Request timeout in seconds before the connection is closed. |
| `forwarded` | `string` | `"disable"` | Controls whether to set `forwarded` or `x-forwarded` headers. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pool configuration for request pooling. |
| `cache` | `http:CacheConfig` | `()` | HTTP caching configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Compression handling for `accept-encoding` headers. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `responseLimits` | `http:ResponseLimitConfigs` | `()` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | When enabled, validates response payloads against declared schemas using the `constraint` package. |

### Initializing the client

```ballerina
import ballerinax/github;

configurable string authToken = ?;

github:Client github = check new ({
    auth: {
        token: authToken
    }
});
```

### Operations

#### Repository management

<details>
<summary>List repositories for the authenticated user</summary>

Lists repositories for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `visibility` | `"all"\|"public"\|"private"` | No | Filter by repository visibility. |
| `'type` | `"all"\|"owner"\|"public"\|"private"\|"member"\|()` | No | Filter by repository type. |
| `sort` | `"created"\|"updated"\|"pushed"\|"full_name"` | No | Sort field for results. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Repository[]|error`

Sample code:

```ballerina
github:Repository[] repos = check github->/user/repos(visibility = "private", 'type = ());
```

Sample response:

```ballerina
[{"id": 123456, "name": "my-project", "full_name": "octocat/my-project", "private": true, "description": "A sample project", "html_url": "https://github.com/octocat/my-project", "default_branch": "main"}]
```

</details>

<details>
<summary>Create a repository for the authenticated user</summary>

Creates a new repository for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `github:User_repos_body` | Yes | Repository creation payload including name, description, and visibility. |

Returns: `github:Repository|error`

Sample code:

```ballerina
github:Repository createdRepo = check github->/user/repos.post({
    name: "new-project",
    'private: true,
    description: "My new project"
});
```

Sample response:

```ballerina
{"id": 789012, "name": "new-project", "full_name": "octocat/new-project", "private": true, "description": "My new project", "default_branch": "main"}
```

</details>

<details>
<summary>Get a repository</summary>

Retrieves details of a specific repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `github:FullRepository|error`

Sample code:

```ballerina
github:FullRepository repo = check github->/repos/["octocat"]/["Hello-World"];
```

Sample response:

```ballerina
{"id": 1296269, "name": "Hello-World", "full_name": "octocat/Hello-World", "private": false, "description": "This your first repo!", "stargazers_count": 80, "forks_count": 9, "default_branch": "master"}
```

</details>

<details>
<summary>Update a repository</summary>

Updates a repository's settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repos_body` | Yes | Repository update payload. |

Returns: `github:FullRepository|error`

Sample code:

```ballerina
github:FullRepository updated = check github->/repos/["octocat"]/["Hello-World"].patch({
    description: "Updated description",
    has_issues: true
});
```

Sample response:

```ballerina
{"id": 1296269, "name": "Hello-World", "full_name": "octocat/Hello-World", "description": "Updated description", "has_issues": true}
```

</details>

<details>
<summary>Delete a repository</summary>

Deletes a repository. Requires admin access.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["old-project"].delete();
```

</details>

<details>
<summary>Create a fork</summary>

Creates a fork of a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_forks_body` | Yes | Fork creation payload with optional organization and name. |

Returns: `github:FullRepository|error`

Sample code:

```ballerina
github:FullRepository fork = check github->/repos/["octocat"]/["Hello-World"]/forks.post({});
```

Sample response:

```ballerina
{"id": 999999, "name": "Hello-World", "full_name": "myuser/Hello-World", "fork": true, "parent": {"full_name": "octocat/Hello-World"}}
```

</details>

<details>
<summary>Get all repository topics</summary>

Lists all repository topics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `github:Topic|error`

Sample code:

```ballerina
github:Topic topics = check github->/repos/["octocat"]/["Hello-World"]/topics;
```

Sample response:

```ballerina
{"names": ["ballerina", "integration", "github-api"]}
```

</details>

<details>
<summary>Replace all repository topics</summary>

Replaces all repository topics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_topics_body` | Yes | Payload with the new list of topic names. |

Returns: `github:Topic|error`

Sample code:

```ballerina
github:Topic updated = check github->/repos/["octocat"]/["Hello-World"]/topics.put({
    names: ["ballerina", "integration"]
});
```

Sample response:

```ballerina
{"names": ["ballerina", "integration"]}
```

</details>

#### Issue management

<details>
<summary>List repository issues</summary>

Lists issues in a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `state` | `"open"\|"closed"\|"all"` | No | Filter by issue state. |
| `labels` | `string` | No | Comma-separated list of label names to filter by. |
| `sort` | `"created"\|"updated"\|"comments"` | No | Sort field. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Issue[]|error`

Sample code:

```ballerina
github:Issue[] issues = check github->/repos/["octocat"]/["Hello-World"]/issues(state = "open");
```

Sample response:

```ballerina
[{"id": 1, "number": 1347, "state": "open", "title": "Found a bug", "body": "I'm having a problem with this.", "user": {"login": "octocat"}, "labels": [{"name": "bug"}]}]
```

</details>

<details>
<summary>Create an issue</summary>

Creates an issue in a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_issues_body` | Yes | Issue creation payload with title, body, labels, and assignees. |

Returns: `github:Issue|error`

Sample code:

```ballerina
github:Issue issue = check github->/repos/["octocat"]/["Hello-World"]/issues.post({
    title: "Found a bug",
    body: "I'm having a problem with this.",
    labels: ["bug"]
});
```

Sample response:

```ballerina
{"id": 1, "number": 1348, "state": "open", "title": "Found a bug", "body": "I'm having a problem with this.", "labels": [{"name": "bug"}], "html_url": "https://github.com/octocat/Hello-World/issues/1348"}
```

</details>

<details>
<summary>Get an issue</summary>

Retrieves a specific issue by number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |

Returns: `github:Issue|error`

Sample code:

```ballerina
github:Issue issue = check github->/repos/["octocat"]/["Hello-World"]/issues/[1347];
```

Sample response:

```ballerina
{"id": 1, "number": 1347, "state": "open", "title": "Found a bug", "body": "I'm having a problem with this.", "user": {"login": "octocat"}}
```

</details>

<details>
<summary>Update an issue</summary>

Updates an existing issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |
| `payload` | `github:Issues_issue_number_body` | Yes | Issue update payload. |

Returns: `github:Issue|error`

Sample code:

```ballerina
github:Issue updated = check github->/repos/["octocat"]/["Hello-World"]/issues/[1348].patch({
    state: "closed",
    labels: ["bug", "wontfix"]
});
```

Sample response:

```ballerina
{"id": 1, "number": 1348, "state": "closed", "title": "Found a bug", "labels": [{"name": "bug"}, {"name": "wontfix"}]}
```

</details>

<details>
<summary>List issue comments</summary>

Lists comments on an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:IssueComment[]|error`

Sample code:

```ballerina
github:IssueComment[] comments = check github->/repos/["octocat"]/["Hello-World"]/issues/[1347]/comments();
```

Sample response:

```ballerina
[{"id": 10001, "body": "This has been fixed.", "user": {"login": "contributor1"}, "created_at": "2024-01-15T10:30:00Z"}]
```

</details>

<details>
<summary>Create an issue comment</summary>

Creates a comment on an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |
| `payload` | `github:Issue_number_comments_body` | Yes | Comment payload containing the body text. |

Returns: `github:IssueComment|error`

Sample code:

```ballerina
github:IssueComment comment = check github->/repos/["octocat"]/["Hello-World"]/issues/[1348]/comments.post({
    body: "This has been fixed in the latest release."
});
```

Sample response:

```ballerina
{"id": 10002, "body": "This has been fixed in the latest release.", "user": {"login": "octocat"}, "created_at": "2024-01-15T10:30:00Z"}
```

</details>

<details>
<summary>List labels for an issue</summary>

Lists labels on an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |

Returns: `github:Label[]|error`

Sample code:

```ballerina
github:Label[] labels = check github->/repos/["octocat"]/["Hello-World"]/issues/[1347]/labels;
```

Sample response:

```ballerina
[{"id": 208045946, "name": "bug", "color": "f29513", "description": "Something isn't working"}]
```

</details>

<details>
<summary>Add labels to an issue</summary>

Adds labels to an issue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `issue_number` | `int` | Yes | The number of the issue. |
| `payload` | `github:Issue_number_labels_body` | Yes | Payload with label names to add. |

Returns: `github:Label[]|error`

Sample code:

```ballerina
github:Label[] labels = check github->/repos/["octocat"]/["Hello-World"]/issues/[1347]/labels.post({
    labels: ["enhancement", "help wanted"]
});
```

Sample response:

```ballerina
[{"id": 208045946, "name": "bug", "color": "f29513"}, {"id": 208045947, "name": "enhancement", "color": "84b6eb"}, {"id": 208045948, "name": "help wanted", "color": "128A0C"}]
```

</details>

<details>
<summary>List milestones</summary>

Lists milestones for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `state` | `"open"\|"closed"\|"all"` | No | Filter by milestone state. |

Returns: `github:Milestone[]|error`

Sample code:

```ballerina
github:Milestone[] milestones = check github->/repos/["octocat"]/["Hello-World"]/milestones(state = "open");
```

Sample response:

```ballerina
[{"id": 1, "number": 1, "title": "v1.0", "state": "open", "open_issues": 4, "closed_issues": 8}]
```

</details>

<details>
<summary>Create a milestone</summary>

Creates a milestone.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_milestones_body` | Yes | Milestone creation payload with title and optional due date. |

Returns: `github:Milestone|error`

Sample code:

```ballerina
github:Milestone milestone = check github->/repos/["octocat"]/["Hello-World"]/milestones.post({
    title: "v2.0",
    due_on: "2025-06-01T00:00:00Z"
});
```

Sample response:

```ballerina
{"id": 2, "number": 2, "title": "v2.0", "state": "open", "due_on": "2025-06-01T00:00:00Z"}
```

</details>

#### Pull request management

<details>
<summary>List pull requests</summary>

Lists pull requests in a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `state` | `"open"\|"closed"\|"all"` | No | Filter by pull request state. |
| `head` | `string` | No | Filter by head user or head user and branch name (`user:ref-name`). |
| `base` | `string` | No | Filter by base branch name. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:PullRequestSimple[]|error`

Sample code:

```ballerina
github:PullRequestSimple[] prs = check github->/repos/["octocat"]/["Hello-World"]/pulls(state = "open");
```

Sample response:

```ballerina
[{"id": 1, "number": 42, "state": "open", "title": "Add new feature", "user": {"login": "octocat"}, "head": {"ref": "feature-branch"}, "base": {"ref": "main"}}]
```

</details>

<details>
<summary>Create a pull request</summary>

Creates a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_pulls_body` | Yes | Pull request creation payload with title, head, base, and body. |

Returns: `github:PullRequest|error`

Sample code:

```ballerina
github:PullRequest pr = check github->/repos/["octocat"]/["Hello-World"]/pulls.post({
    title: "Amazing new feature",
    head: "feature-branch",
    base: "main",
    body: "Please review and merge this feature."
});
```

Sample response:

```ballerina
{"id": 1, "number": 43, "state": "open", "title": "Amazing new feature", "html_url": "https://github.com/octocat/Hello-World/pull/43", "head": {"ref": "feature-branch"}, "base": {"ref": "main"}}
```

</details>

<details>
<summary>Get a pull request</summary>

Retrieves a specific pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |

Returns: `github:PullRequest|error`

Sample code:

```ballerina
github:PullRequest pr = check github->/repos/["octocat"]/["Hello-World"]/pulls/[42];
```

Sample response:

```ballerina
{"id": 1, "number": 42, "state": "open", "title": "Add new feature", "mergeable": true, "commits": 3, "additions": 100, "deletions": 20}
```

</details>

<details>
<summary>Update a pull request</summary>

Updates a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |
| `payload` | `github:Pulls_pull_number_body` | Yes | Pull request update payload. |

Returns: `github:PullRequest|error`

Sample code:

```ballerina
github:PullRequest updated = check github->/repos/["octocat"]/["Hello-World"]/pulls/[43].patch({
    title: "Updated feature title",
    body: "Updated description for the PR."
});
```

Sample response:

```ballerina
{"id": 1, "number": 43, "state": "open", "title": "Updated feature title", "body": "Updated description for the PR."}
```

</details>

<details>
<summary>Merge a pull request</summary>

Merges a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |
| `payload` | `github:Pull_number_merge_body` | Yes | Merge payload with optional commit title and merge method. |

Returns: `github:PullRequestMergeResult|error`

Sample code:

```ballerina
github:PullRequestMergeResult result = check github->/repos/["octocat"]/["Hello-World"]/pulls/[43]/merge.put({
    commit_title: "Merge feature branch",
    merge_method: "squash"
});
```

Sample response:

```ballerina
{"sha": "abc123def456", "merged": true, "message": "Pull Request successfully merged"}
```

</details>

<details>
<summary>List reviews for a pull request</summary>

Lists reviews on a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |

Returns: `github:PullRequestReview[]|error`

Sample code:

```ballerina
github:PullRequestReview[] reviews = check github->/repos/["octocat"]/["Hello-World"]/pulls/[42]/reviews;
```

Sample response:

```ballerina
[{"id": 80, "user": {"login": "reviewer1"}, "body": "Looks good!", "state": "APPROVED"}]
```

</details>

<details>
<summary>Create a review for a pull request</summary>

Creates a review on a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |
| `payload` | `github:Pull_number_reviews_body` | Yes | Review payload with body and event (APPROVE, REQUEST_CHANGES, COMMENT). |

Returns: `github:PullRequestReview|error`

Sample code:

```ballerina
github:PullRequestReview review = check github->/repos/["octocat"]/["Hello-World"]/pulls/[43]/reviews.post({
    body: "Looks good! Ship it.",
    event: "APPROVE"
});
```

Sample response:

```ballerina
{"id": 80, "user": {"login": "octocat"}, "body": "Looks good! Ship it.", "state": "APPROVED"}
```

</details>

<details>
<summary>Request reviewers for a pull request</summary>

Requests reviewers for a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |
| `payload` | `github:Pull_number_requested_reviewers_body` | Yes | Payload with reviewer usernames or team slugs. |

Returns: `github:PullRequestSimple|error`

Sample code:

```ballerina
github:PullRequestSimple pr = check github->/repos/["octocat"]/["Hello-World"]/pulls/[43]/requested_reviewers.post({
    reviewers: ["reviewer1", "reviewer2"]
});
```

Sample response:

```ballerina
{"id": 1, "number": 43, "requested_reviewers": [{"login": "reviewer1"}, {"login": "reviewer2"}]}
```

</details>

<details>
<summary>List commits on a pull request</summary>

Lists commits on a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |

Returns: `github:Commit[]|error`

Sample code:

```ballerina
github:Commit[] commits = check github->/repos/["octocat"]/["Hello-World"]/pulls/[42]/commits;
```

Sample response:

```ballerina
[{"sha": "abc123", "commit": {"message": "Initial implementation", "author": {"name": "octocat", "date": "2024-01-10T10:00:00Z"}}}]
```

</details>

<details>
<summary>List pull request files</summary>

Lists files changed in a pull request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `pull_number` | `int` | Yes | The number of the pull request. |

Returns: `github:DiffEntry[]|error`

Sample code:

```ballerina
github:DiffEntry[] files = check github->/repos/["octocat"]/["Hello-World"]/pulls/[42]/files;
```

Sample response:

```ballerina
[{"sha": "abc123", "filename": "src/main.bal", "status": "modified", "additions": 50, "deletions": 10, "changes": 60}]
```

</details>

#### Branch & commit management

<details>
<summary>List branches</summary>

Lists branches for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:ShortBranch[]|error`

Sample code:

```ballerina
github:ShortBranch[] branches = check github->/repos/["octocat"]/["Hello-World"]/branches();
```

Sample response:

```ballerina
[{"name": "main", "commit": {"sha": "abc123"}, "protected": true}, {"name": "feature-branch", "commit": {"sha": "def456"}, "protected": false}]
```

</details>

<details>
<summary>Get a branch</summary>

Retrieves a specific branch.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `branch` | `string` | Yes | The branch name. |

Returns: `github:BranchWithProtection|error`

Sample code:

```ballerina
github:BranchWithProtection branch = check github->/repos/["octocat"]/["Hello-World"]/branches/["main"];
```

Sample response:

```ballerina
{"name": "main", "commit": {"sha": "abc123", "commit": {"message": "Latest commit"}}, "protected": true}
```

</details>

<details>
<summary>List commits</summary>

Lists commits on a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `sha` | `string` | No | SHA or branch to start listing commits from. |
| `path` | `string` | No | Only include commits containing this file path. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Commit[]|error`

Sample code:

```ballerina
github:Commit[] commits = check github->/repos/["octocat"]/["Hello-World"]/commits(sha = "main");
```

Sample response:

```ballerina
[{"sha": "abc123", "commit": {"message": "Update README", "author": {"name": "octocat", "date": "2024-01-10T10:00:00Z"}}, "author": {"login": "octocat"}}]
```

</details>

<details>
<summary>Get a commit</summary>

Retrieves a specific commit by SHA or ref.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `ref` | `string` | Yes | The commit SHA, branch name, or tag name. |

Returns: `github:Commit|error`

Sample code:

```ballerina
github:Commit commit = check github->/repos/["octocat"]/["Hello-World"]/commits/["abc123"];
```

Sample response:

```ballerina
{"sha": "abc123", "commit": {"message": "Update README", "tree": {"sha": "def456"}}, "stats": {"additions": 10, "deletions": 2, "total": 12}}
```

</details>

#### Release & tag management

<details>
<summary>List releases</summary>

Lists releases for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Release[]|error`

Sample code:

```ballerina
github:Release[] releases = check github->/repos/["octocat"]/["Hello-World"]/releases();
```

Sample response:

```ballerina
[{"id": 1, "tag_name": "v1.0.0", "name": "Release v1.0.0", "draft": false, "prerelease": false, "published_at": "2024-01-01T00:00:00Z"}]
```

</details>

<details>
<summary>Create a release</summary>

Creates a release.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `payload` | `github:Repo_releases_body` | Yes | Release creation payload with tag name, name, and body. |

Returns: `github:Release|error`

Sample code:

```ballerina
github:Release release = check github->/repos/["octocat"]/["Hello-World"]/releases.post({
    tag_name: "v2.0.0",
    name: "Release v2.0.0",
    body: "Major release with new features.",
    draft: false,
    prerelease: false
});
```

Sample response:

```ballerina
{"id": 2, "tag_name": "v2.0.0", "name": "Release v2.0.0", "body": "Major release with new features.", "draft": false, "prerelease": false, "html_url": "https://github.com/octocat/Hello-World/releases/tag/v2.0.0"}
```

</details>

<details>
<summary>Get a release</summary>

Retrieves a specific release.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `release_id` | `int` | Yes | The release ID. |

Returns: `github:Release|error`

Sample code:

```ballerina
github:Release release = check github->/repos/["octocat"]/["Hello-World"]/releases/[1];
```

Sample response:

```ballerina
{"id": 1, "tag_name": "v1.0.0", "name": "Release v1.0.0", "body": "Initial release", "assets": []}
```

</details>

<details>
<summary>Update a release</summary>

Updates a release.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `release_id` | `int` | Yes | The release ID. |
| `payload` | `github:Releases_release_id_body` | Yes | Release update payload. |

Returns: `github:Release|error`

Sample code:

```ballerina
github:Release updated = check github->/repos/["octocat"]/["Hello-World"]/releases/[1].patch({
    body: "Updated release notes with fixes."
});
```

Sample response:

```ballerina
{"id": 1, "tag_name": "v1.0.0", "name": "Release v1.0.0", "body": "Updated release notes with fixes."}
```

</details>

<details>
<summary>Delete a release</summary>

Deletes a release.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `release_id` | `int` | Yes | The release ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["Hello-World"]/releases/[1].delete();
```

</details>

<details>
<summary>Get the latest release</summary>

Retrieves the latest release for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `github:Release|error`

Sample code:

```ballerina
github:Release latest = check github->/repos/["octocat"]/["Hello-World"]/releases/latest;
```

Sample response:

```ballerina
{"id": 2, "tag_name": "v2.0.0", "name": "Release v2.0.0", "published_at": "2024-06-01T00:00:00Z"}
```

</details>

<details>
<summary>List repository tags</summary>

Lists tags for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Tag[]|error`

Sample code:

```ballerina
github:Tag[] tags = check github->/repos/["octocat"]/["Hello-World"]/tags();
```

Sample response:

```ballerina
[{"name": "v2.0.0", "commit": {"sha": "abc123"}}, {"name": "v1.0.0", "commit": {"sha": "def456"}}]
```

</details>

#### Content & file operations

<details>
<summary>Get repository content</summary>

Gets the contents of a file or directory in a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `path` | `string` | Yes | The file path within the repository. |
| `ref` | `string` | No | The name of the commit/branch/tag. Defaults to the default branch. |

Returns: `github:ContentDirectory|github:ContentFile|github:ContentSubmodule|github:ContentSymlink|error`

Sample code:

```ballerina
github:ContentFile|github:ContentDirectory|github:ContentSubmodule|github:ContentSymlink content = check github->/repos/["octocat"]/["Hello-World"]/contents/["README.md"];
```

Sample response:

```ballerina
{"type": "file", "encoding": "base64", "size": 442, "name": "README.md", "path": "README.md", "sha": "abc123", "content": "IyBIZWxsby1Xb3JsZA=="}
```

</details>

<details>
<summary>Create or update file contents</summary>

Creates or updates a file in a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `path` | `string` | Yes | The file path within the repository. |
| `payload` | `github:Content_path_body` | Yes | File content payload with message, content (Base64), and optional SHA for updates. |

Returns: `github:FileCommit|error`

Sample code:

```ballerina
github:FileCommit fileCommit = check github->/repos/["octocat"]/["Hello-World"]/contents/["docs/guide.md"].put({
    message: "Add guide document",
    content: "IyBHdWlkZQ=="
});
```

Sample response:

```ballerina
{"content": {"name": "guide.md", "path": "docs/guide.md", "sha": "def456"}, "commit": {"sha": "789abc", "message": "Add guide document"}}
```

</details>

<details>
<summary>Delete a file</summary>

Deletes a file from a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `path` | `string` | Yes | The file path within the repository. |
| `payload` | `github:Content_path_body_2` | Yes | Payload with commit message and file SHA. |

Returns: `github:FileCommit|error`

Sample code:

```ballerina
github:FileCommit result = check github->/repos/["octocat"]/["Hello-World"]/contents/["docs/old-guide.md"].delete({
    message: "Remove outdated guide",
    sha: "abc123"
});
```

Sample response:

```ballerina
{"content": null, "commit": {"sha": "def789", "message": "Remove outdated guide"}}
```

</details>

<details>
<summary>Get a repository README</summary>

Gets the README file for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `github:ContentFile|error`

Sample code:

```ballerina
github:ContentFile readme = check github->/repos/["octocat"]/["Hello-World"]/readme;
```

Sample response:

```ballerina
{"type": "file", "name": "README.md", "path": "README.md", "size": 442, "encoding": "base64", "content": "IyBIZWxsby1Xb3JsZA=="}
```

</details>

#### Collaborator & organization management

<details>
<summary>List repository collaborators</summary>

Lists collaborators for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Collaborator[]|error`

Sample code:

```ballerina
github:Collaborator[] collaborators = check github->/repos/["octocat"]/["Hello-World"]/collaborators();
```

Sample response:

```ballerina
[{"login": "contributor1", "id": 100, "permissions": {"admin": false, "push": true, "pull": true}}]
```

</details>

<details>
<summary>Add a repository collaborator</summary>

Adds a collaborator to a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `username` | `string` | Yes | The GitHub username of the collaborator to add. |
| `payload` | `github:Collaborators_username_body` | No | Optional payload specifying permission level. |

Returns: `github:RepositoryInvitation|error?`

Sample code:

```ballerina
github:RepositoryInvitation? invitation = check github->/repos/["octocat"]/["Hello-World"]/collaborators/["newuser"].put({
    permission: "push"
});
```

Sample response:

```ballerina
{"id": 1, "repository": {"id": 1296269, "name": "Hello-World"}, "invitee": {"login": "newuser"}, "permissions": "write"}
```

</details>

<details>
<summary>Remove a repository collaborator</summary>

Removes a collaborator from a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `username` | `string` | Yes | The GitHub username of the collaborator to remove. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["Hello-World"]/collaborators/["olduser"].delete();
```

</details>

<details>
<summary>Get an organization</summary>

Retrieves an organization's profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `org` | `string` | Yes | The organization name. |

Returns: `github:OrganizationFull|error`

Sample code:

```ballerina
github:OrganizationFull org = check github->/orgs/["ballerina-platform"];
```

Sample response:

```ballerina
{"login": "ballerina-platform", "id": 27461, "name": "Ballerina Platform", "description": "Cloud-native programming language", "public_repos": 150}
```

</details>

<details>
<summary>List organization repositories</summary>

Lists repositories for an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `org` | `string` | Yes | The organization name. |
| `'type` | `"all"\|"public"\|"private"\|"forks"\|"sources"\|"member"` | No | Filter by repository type. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:MinimalRepository[]|error`

Sample code:

```ballerina
github:MinimalRepository[] orgRepos = check github->/orgs/["ballerina-platform"]/repos('type = "public");
```

Sample response:

```ballerina
[{"id": 456789, "name": "ballerina-lang", "full_name": "ballerina-platform/ballerina-lang", "private": false, "description": "The Ballerina programming language"}]
```

</details>

<details>
<summary>List organization members</summary>

Lists members of an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `org` | `string` | Yes | The organization name. |
| `role` | `"all"\|"admin"\|"member"` | No | Filter by member role. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:SimpleUser[]|error`

Sample code:

```ballerina
github:SimpleUser[] members = check github->/orgs/["ballerina-platform"]/members(role = "admin");
```

Sample response:

```ballerina
[{"login": "admin-user", "id": 1001, "avatar_url": "https://avatars.githubusercontent.com/u/1001"}]
```

</details>

<details>
<summary>List teams</summary>

Lists teams in an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `org` | `string` | Yes | The organization name. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Team[]|error`

Sample code:

```ballerina
github:Team[] teams = check github->/orgs/["ballerina-platform"]/teams();
```

Sample response:

```ballerina
[{"id": 1, "name": "core-team", "slug": "core-team", "description": "Core development team", "permission": "push"}]
```

</details>

#### User operations

<details>
<summary>Get the authenticated user</summary>

Retrieves the authenticated user's profile.

Returns: `github:PrivateUser|github:PublicUser|error`

Sample code:

```ballerina
github:PrivateUser|github:PublicUser user = check github->/user;
```

Sample response:

```ballerina
{"login": "octocat", "id": 1, "name": "The Octocat", "email": "octocat@github.com", "public_repos": 8, "followers": 20, "following": 0}
```

</details>

<details>
<summary>Get a user</summary>

Retrieves a public user's profile by username.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | The GitHub username. |

Returns: `github:PrivateUser|github:PublicUser|error`

Sample code:

```ballerina
github:PrivateUser|github:PublicUser user = check github->/users/["octocat"];
```

Sample response:

```ballerina
{"login": "octocat", "id": 1, "name": "The Octocat", "company": "GitHub", "public_repos": 8, "followers": 20}
```

</details>

<details>
<summary>Star a repository for the authenticated user</summary>

Stars a repository for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `error?`

Sample code:

```ballerina
check github->/user/starred/["ballerina-platform"]/["ballerina-lang"].put();
```

</details>

<details>
<summary>Unstar a repository for the authenticated user</summary>

Unstars a repository for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `error?`

Sample code:

```ballerina
check github->/user/starred/["ballerina-platform"]/["ballerina-lang"].delete();
```

</details>

<details>
<summary>List followers of a user</summary>

Lists followers of a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | The GitHub username. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:SimpleUser[]|error`

Sample code:

```ballerina
github:SimpleUser[] followers = check github->/users/["octocat"]/followers();
```

Sample response:

```ballerina
[{"login": "fan1", "id": 2001}, {"login": "fan2", "id": 2002}]
```

</details>

<details>
<summary>List repositories for a user</summary>

Lists public repositories for a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | The GitHub username. |
| `'type` | `"all"\|"owner"\|"member"` | No | Filter by repository type. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:MinimalRepository[]|error`

Sample code:

```ballerina
github:MinimalRepository[] repos = check github->/users/["octocat"]/repos('type = "owner");
```

Sample response:

```ballerina
[{"id": 123456, "name": "Hello-World", "full_name": "octocat/Hello-World", "private": false}]
```

</details>

#### Gist management

<details>
<summary>List gists for the authenticated user</summary>

Lists gists for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:BaseGist[]|error`

Sample code:

```ballerina
github:BaseGist[] gists = check github->/gists();
```

Sample response:

```ballerina
[{"id": "aa5a315d61ae9438b18d", "description": "Hello World Example", "public": true, "files": {"hello.bal": {"filename": "hello.bal", "language": "Ballerina", "size": 42}}}]
```

</details>

<details>
<summary>Create a gist</summary>

Creates a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `github:Gists_body` | Yes | Gist creation payload with description, files, and visibility. |

Returns: `github:GistSimple|error`

Sample code:

```ballerina
github:GistSimple gist = check github->/gists.post({
    description: "Hello World Example",
    'public: true,
    files: {"hello.bal": {content: "import ballerina/io;\npublic function main() {\n    io:println(\"Hello\");\n}"}}
});
```

Sample response:

```ballerina
{"id": "aa5a315d61ae9438b18d", "description": "Hello World Example", "html_url": "https://gist.github.com/aa5a315d61ae9438b18d", "public": true}
```

</details>

<details>
<summary>Get a gist</summary>

Retrieves a specific gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |

Returns: `github:GistSimple|error`

Sample code:

```ballerina
github:GistSimple gist = check github->/gists/["aa5a315d61ae9438b18d"];
```

Sample response:

```ballerina
{"id": "aa5a315d61ae9438b18d", "description": "Hello World Example", "files": {"hello.bal": {"filename": "hello.bal", "content": "import ballerina/io;\npublic function main() {\n    io:println(\"Hello\");\n}"}}}
```

</details>

<details>
<summary>Update a gist</summary>

Updates a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |
| `payload` | `github:Gists_gist_id_body` | Yes | Gist update payload. |

Returns: `github:GistSimple|error`

Sample code:

```ballerina
github:GistSimple updated = check github->/gists/["aa5a315d61ae9438b18d"].patch({
    description: "Updated Hello World"
});
```

Sample response:

```ballerina
{"id": "aa5a315d61ae9438b18d", "description": "Updated Hello World"}
```

</details>

<details>
<summary>Delete a gist</summary>

Deletes a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/gists/["aa5a315d61ae9438b18d"].delete();
```

</details>

<details>
<summary>Star a gist</summary>

Stars a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/gists/["aa5a315d61ae9438b18d"]/star.put();
```

</details>

<details>
<summary>Fork a gist</summary>

Forks a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |

Returns: `github:BaseGist|error`

Sample code:

```ballerina
github:BaseGist forked = check github->/gists/["aa5a315d61ae9438b18d"]/forks.post();
```

Sample response:

```ballerina
{"id": "bb6b426e72bf549c29e", "description": "Hello World Example", "owner": {"login": "octocat"}}
```

</details>

<details>
<summary>Create a gist comment</summary>

Creates a comment on a gist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `gist_id` | `string` | Yes | The gist ID. |
| `payload` | `github:Gist_id_comments_body` | Yes | Comment payload with body text. |

Returns: `github:GistComment|error`

Sample code:

```ballerina
github:GistComment comment = check github->/gists/["aa5a315d61ae9438b18d"]/comments.post({
    body: "Nice example!"
});
```

Sample response:

```ballerina
{"id": 1, "body": "Nice example!", "user": {"login": "octocat"}, "created_at": "2024-01-15T10:30:00Z"}
```

</details>

#### Notification management

<details>
<summary>List notifications for the authenticated user</summary>

Lists notifications for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `all` | `boolean` | No | If true, show notifications marked as read. |
| `participating` | `boolean` | No | If true, only show notifications where the user is directly participating. |

Returns: `github:Thread[]|error`

Sample code:

```ballerina
github:Thread[] notifications = check github->/notifications(all = false);
```

Sample response:

```ballerina
[{"id": "1", "repository": {"full_name": "octocat/Hello-World"}, "subject": {"title": "New issue opened", "type": "Issue"}, "reason": "subscribed", "unread": true}]
```

</details>

<details>
<summary>Mark notifications as read</summary>

Marks all notifications as read.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `github:Notifications_body` | Yes | Payload with optional last_read_at timestamp. |

Returns: `github:Notifications_response_202|error?`

Sample code:

```ballerina
check github->/notifications.put({last_read_at: "2024-01-15T00:00:00Z"});
```

</details>

<details>
<summary>Get a thread</summary>

Retrieves a specific notification thread.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `thread_id` | `int` | Yes | The thread ID. |

Returns: `github:Thread|error`

Sample code:

```ballerina
github:Thread thread = check github->/notifications/threads/[1];
```

Sample response:

```ballerina
{"id": "1", "repository": {"full_name": "octocat/Hello-World"}, "subject": {"title": "Bug report", "type": "Issue"}, "reason": "mention", "unread": true}
```

</details>

<details>
<summary>Mark a thread as read</summary>

Marks a notification thread as read.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `thread_id` | `int` | Yes | The thread ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/notifications/threads/[1].patch();
```

</details>

#### Security advisories

<details>
<summary>List global security advisories</summary>

Lists global security advisories.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ghsa_id` | `string` | No | Filter by GHSA identifier. |
| `'type` | `"reviewed"\|"malware"\|"unreviewed"` | No | Filter by advisory type. |
| `ecosystem` | `string` | No | Filter by package ecosystem (e.g., `npm`, `pip`, `maven`). |
| `severity` | `"unknown"\|"low"\|"medium"\|"high"\|"critical"` | No | Filter by severity level. |
| `per_page` | `int` | No | Number of results per page. |

Returns: `github:GlobalAdvisory[]|error`

Sample code:

```ballerina
github:GlobalAdvisory[] advisories = check github->/advisories(severity = "critical", ecosystem = "npm");
```

Sample response:

```ballerina
[{"ghsa_id": "GHSA-xxxx-xxxx-xxxx", "cve_id": "CVE-2024-12345", "summary": "Critical vulnerability in example package", "severity": "critical", "published_at": "2024-01-10T00:00:00Z"}]
```

</details>

<details>
<summary>Get a global security advisory</summary>

Retrieves a specific global security advisory.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ghsa_id` | `string` | Yes | The GHSA identifier. |

Returns: `github:GlobalAdvisory|error`

Sample code:

```ballerina
github:GlobalAdvisory advisory = check github->/advisories/["GHSA-xxxx-xxxx-xxxx"];
```

Sample response:

```ballerina
{"ghsa_id": "GHSA-xxxx-xxxx-xxxx", "cve_id": "CVE-2024-12345", "summary": "Critical vulnerability", "severity": "critical", "vulnerabilities": [{"package": {"ecosystem": "npm", "name": "example-pkg"}}]}
```

</details>

#### Actions & workflows

<details>
<summary>List repository workflows</summary>

Lists repository workflows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |

Returns: `github:Workflows_response|error`

Sample code:

```ballerina
github:Workflows_response workflows = check github->/repos/["octocat"]/["Hello-World"]/actions/workflows;
```

Sample response:

```ballerina
{"total_count": 2, "workflows": [{"id": 1, "name": "CI", "state": "active", "path": ".github/workflows/ci.yml"}]}
```

</details>

<details>
<summary>List workflow runs for a repository</summary>

Lists workflow runs for a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `status` | `string` | No | Filter by status (e.g., `completed`, `in_progress`, `queued`). |

Returns: `github:Workflow_runs_response|error`

Sample code:

```ballerina
github:Workflow_runs_response runs = check github->/repos/["octocat"]/["Hello-World"]/actions/runs(status = "completed");
```

Sample response:

```ballerina
{"total_count": 1, "workflow_runs": [{"id": 100, "name": "CI", "status": "completed", "conclusion": "success", "head_branch": "main"}]}
```

</details>

<details>
<summary>Get a workflow run</summary>

Retrieves a specific workflow run.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `run_id` | `int` | Yes | The workflow run ID. |

Returns: `github:WorkflowRun|error`

Sample code:

```ballerina
github:WorkflowRun run = check github->/repos/["octocat"]/["Hello-World"]/actions/runs/[100];
```

Sample response:

```ballerina
{"id": 100, "name": "CI", "status": "completed", "conclusion": "success", "head_branch": "main", "run_started_at": "2024-01-10T10:00:00Z"}
```

</details>

<details>
<summary>Cancel a workflow run</summary>

Cancels a workflow run.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `run_id` | `int` | Yes | The workflow run ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["Hello-World"]/actions/runs/[100]/cancel.post();
```

</details>

<details>
<summary>Re-run a workflow</summary>

Re-runs a workflow run.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `run_id` | `int` | Yes | The workflow run ID. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["Hello-World"]/actions/runs/[100]/rerun.post();
```

</details>

<details>
<summary>Create a workflow dispatch event</summary>

Creates a workflow dispatch event to manually trigger a workflow.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `workflow_id` | `github:Workflow_id` | Yes | The workflow ID or workflow file name (e.g., `ci.yml`). |
| `payload` | `github:Workflow_id_dispatches_body` | Yes | Dispatch payload with ref (branch) and optional inputs. |

Returns: `error?`

Sample code:

```ballerina
check github->/repos/["octocat"]/["Hello-World"]/actions/workflows/["ci.yml"]/dispatches.post({
    ref: "main"
});
```

</details>

#### Star & watch operations

<details>
<summary>List stargazers</summary>

Lists users who starred a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:SimpleUser[]|github:Stargazer[]|error`

Sample code:

```ballerina
github:SimpleUser[]|github:Stargazer[] stargazers = check github->/repos/["octocat"]/["Hello-World"]/stargazers();
```

Sample response:

```ballerina
[{"login": "fan1", "id": 2001}, {"login": "fan2", "id": 2002}]
```

</details>

<details>
<summary>List watchers</summary>

Lists users watching a repository.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `owner` | `string` | Yes | The account owner of the repository. |
| `repo` | `string` | Yes | The name of the repository. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:SimpleUser[]|error`

Sample code:

```ballerina
github:SimpleUser[] watchers = check github->/repos/["octocat"]/["Hello-World"]/subscribers();
```

Sample response:

```ballerina
[{"login": "watcher1", "id": 3001}]
```

</details>

#### Search

<details>
<summary>Search repositories</summary>

Searches for repositories matching a query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `q` | `string` | Yes | The search query (e.g., `ballerina language:ballerina`). |
| `sort` | `"stars"\|"forks"\|"help-wanted-issues"\|"updated"` | No | Sort field. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Search_repositories_response|error`

Sample code:

```ballerina
github:Search_repositories_response results = check github->/search/repositories(q = "ballerina language:ballerina", sort = "stars");
```

Sample response:

```ballerina
{"total_count": 25, "incomplete_results": false, "items": [{"id": 123, "full_name": "ballerina-platform/ballerina-lang", "stargazers_count": 3500}]}
```

</details>

<details>
<summary>Search issues and pull requests</summary>

Searches for issues and pull requests matching a query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `q` | `string` | Yes | The search query (e.g., `bug repo:octocat/Hello-World is:open`). |
| `sort` | `"comments"\|"reactions"\|"reactions-+1"\|"reactions--1"\|"interactions"\|"created"\|"updated"` | No | Sort field. |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Search_issues_and_pull_requests_response|error`

Sample code:

```ballerina
github:Search_issues_and_pull_requests_response results = check github->/search/issues(q = "bug repo:octocat/Hello-World is:open");
```

Sample response:

```ballerina
{"total_count": 5, "items": [{"number": 1347, "title": "Found a bug", "state": "open", "labels": [{"name": "bug"}]}]}
```

</details>

<details>
<summary>Search code</summary>

Searches for code matching a query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `q` | `string` | Yes | The search query (e.g., `main repo:octocat/Hello-World language:ballerina`). |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Search_code_response|error`

Sample code:

```ballerina
github:Search_code_response results = check github->/search/code(q = "import ballerinax/kafka repo:octocat/Hello-World");
```

Sample response:

```ballerina
{"total_count": 2, "items": [{"name": "main.bal", "path": "src/main.bal", "repository": {"full_name": "octocat/Hello-World"}}]}
```

</details>

<details>
<summary>Search users</summary>

Searches for users matching a query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `q` | `string` | Yes | The search query (e.g., `octocat type:user`). |
| `per_page` | `int` | No | Number of results per page (max 100). |

Returns: `github:Search_users_response|error`

Sample code:

```ballerina
github:Search_users_response results = check github->/search/users(q = "octocat type:user");
```

Sample response:

```ballerina
{"total_count": 1, "items": [{"login": "octocat", "id": 1, "type": "User"}]}
```

</details>

#### License & meta

<details>
<summary>Get all commonly used licenses</summary>

Lists commonly used open source licenses.

Returns: `github:LicenseSimple[]|error`

Sample code:

```ballerina
github:LicenseSimple[] licenses = check github->/licenses;
```

Sample response:

```ballerina
[{"key": "mit", "name": "MIT License", "spdx_id": "MIT"}, {"key": "apache-2.0", "name": "Apache License 2.0", "spdx_id": "Apache-2.0"}]
```

</details>

<details>
<summary>Get GitHub meta information</summary>

Returns meta information about GitHub's APIs.

Returns: `github:ApiOverview|error`

Sample code:

```ballerina
github:ApiOverview meta = check github->/meta;
```

Sample response:

```ballerina
{"verifiable_password_authentication": true, "ssh_key_fingerprints": {"SHA256_RSA": "nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8"}}
```

</details>

<details>
<summary>Get rate limit status for the authenticated user</summary>

Returns the current rate limit status for the authenticated user.

Returns: `github:RateLimitOverview|error`

Sample code:

```ballerina
github:RateLimitOverview rateLimit = check github->/rate_limit;
```

Sample response:

```ballerina
{"resources": {"core": {"limit": 5000, "remaining": 4999, "reset": 1700000000}}, "rate": {"limit": 5000, "remaining": 4999}}
```

</details>

<details>
<summary>Get emojis</summary>

Lists all available GitHub emojis.

Returns: `json|error`

Sample code:

```ballerina
json emojis = check github->/emojis;
```

Sample response:

```ballerina
{"+1": "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png", "100": "https://github.githubassets.com/images/icons/emoji/unicode/1f4af.png"}
```

</details>
