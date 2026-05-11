---
title: Triggers
---

# Triggers

The `ballerinax/trigger.github` package supports event-driven GitHub webhook processing through a listener. The listener receives webhook requests from GitHub and invokes your service callbacks when issues, pull requests, releases, pushes, labels, milestones, project cards, and related repository events occur.

Three components work together:

| Component | Role |
|-----------|------|
| `github:Listener` | Exposes the webhook endpoint and dispatches incoming GitHub events to attached services. |
| `github:ListenerConfig` | Defines listener configuration such as the webhook secret used to validate incoming requests. |
| `github:IssuesService` | Defines issue event callbacks such as `onOpened`, `onClosed`, and `onReopened`. |
| `github:PullRequestService` | Defines pull request event callbacks such as `onOpened`, `onClosed`, and `onReviewRequested`. |
| `github:ReleaseService` | Defines release event callbacks such as `onPublished`, `onCreated`, and `onDeleted`. |
| `github:PushService` | Defines the `onPush` callback invoked when commits are pushed to a repository. |
| `github:IssuesEvent` | The issue event payload passed to issue callbacks. |
| `github:PushEvent` | The push event payload passed to the `onPush` callback. |

For action-based operations, see the [Action Reference](actions.md).

---

## Listener

The `github:Listener` receives GitHub webhook HTTP requests and routes events to the relevant service type. Configure the GitHub repository webhook to point to the public URL of the running listener, use `application/json` as the content type, and use the same secret value configured as `webhookSecret`.

### Configuration

The listener supports the following connection strategy:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the GitHub webhook listener. |

`ListenerConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | `string` | `DEFAULT_SECRET` | Secret token used to validate GitHub webhook requests. Configure the same value in the GitHub repository webhook settings. |

The listener also accepts a port or an HTTP listener object to expose the webhook endpoint. If you do not provide a port, the listener uses the default port `8090`.

### Initializing the listener

**Listener with a webhook secret and configurable port:**

```ballerina
import ballerinax/trigger.github;

configurable string webhookSecret = ?;
configurable int listenerPort = ?;

configurable github:ListenerConfig listenerConfig = {
    webhookSecret: webhookSecret
};

listener github:Listener githubListener = new (listenerConfig, listenerPort);
```

**Listener without a webhook secret:**

Use this only when no secret is configured in the GitHub webhook settings.

```ballerina
import ballerinax/trigger.github;

listener github:Listener githubListener = new (listenOn = 8090);
```

**Listener with the default port:**

```ballerina
import ballerinax/trigger.github;

listener github:Listener githubListener = new ();
```

---

## Service

A GitHub trigger service is a Ballerina service attached to a `github:Listener`. Select the service type that matches the GitHub webhook event channel you want to handle. The service implements callbacks that are invoked when matching GitHub webhook actions occur.

### Callback signatures

| Service Type | Callback | Signature | Description |
|--------------|----------|-----------|-------------|
| `github:IssuesService` | `onOpened`, `onClosed`, `onReopened`, `onAssigned`, `onUnassigned`, `onLabeled`, `onUnlabeled` | `remote function <callback>(github:IssuesEvent payload) returns error?` | Invoked when a GitHub issue event is received. |
| `github:IssueCommentService` | `onCreated`, `onEdited`, `onDeleted` | `remote function <callback>(github:IssueCommentEvent payload) returns error?` | Invoked when a comment is added to, edited on, or deleted from an issue or pull request. |
| `github:PullRequestService` | `onOpened`, `onClosed`, `onReopened`, `onAssigned`, `onUnassigned`, `onReviewRequested`, `onReviewRequestRemoved`, `onLabeled`, `onUnlabeled`, `onEdited` | `remote function <callback>(github:PullRequestEvent payload) returns error?` | Invoked when a GitHub pull request event is received. |
| `github:PullRequestReviewService` | `onSubmitted`, `onEdited`, `onDismissed` | `remote function <callback>(github:PullRequestReviewEvent payload) returns error?` | Invoked when a pull request review event is received. |
| `github:PullRequestReviewCommentService` | `onCreated`, `onEdited`, `onDeleted` | `remote function <callback>(github:PullRequestReviewCommentEvent payload) returns error?` | Invoked when a pull request review comment event is received. |
| `github:ReleaseService` | `onPublished`, `onUnpublished`, `onCreated`, `onEdited`, `onDeleted`, `onPreReleased`, `onReleased` | `remote function <callback>(github:ReleaseEvent payload) returns error?` | Invoked when a GitHub release event is received. |
| `github:LabelService` | `onCreated`, `onEdited`, `onDeleted` | `remote function <callback>(github:LabelEvent payload) returns error?` | Invoked when a repository label event is received. |
| `github:MilestoneService` | `onCreated`, `onEdited`, `onDeleted`, `onClosed`, `onOpened` | `remote function <callback>(github:MilestoneEvent payload) returns error?` | Invoked when a repository milestone event is received. |
| `github:PushService` | `onPush` | `remote function onPush(github:PushEvent payload) returns error?` | Invoked when commits are pushed to a repository. |
| `github:ProjectCardService` | `onCreated`, `onEdited`, `onMoved`, `onConverted`, `onDeleted` | `remote function <callback>(github:ProjectCardEvent payload) returns error?` | Invoked when a GitHub project card event is received. |

You do not need to implement every callback in a service type. Implement only the GitHub event actions relevant to your integration.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/trigger.github;

configurable string webhookSecret = ?;
configurable int listenerPort = ?;

configurable github:ListenerConfig listenerConfig = {
    webhookSecret: webhookSecret
};

listener github:Listener githubListener = new (listenerConfig, listenerPort);

service github:IssuesService on githubListener {
    remote function onOpened(github:IssuesEvent payload) returns error? {
        log:printInfo("GitHub issue opened",
            issue = payload.issue.title,
            repository = payload.repository.full_name,
            sender = payload.sender.login
        );
    }

    remote function onClosed(github:IssuesEvent payload) returns error? {
        log:printInfo("GitHub issue closed",
            issue = payload.issue.title,
            repository = payload.repository.full_name
        );
    }
}
```

Each service type uses a different typed payload record. For example, `github:IssuesService` receives `github:IssuesEvent`, while `github:PushService` receives `github:PushEvent`.

## Supporting types

### `IssuesEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `IssuesActions` | Issue event action. |
| `issue` | `Issue` | Issue associated with the event. |
| `changes` | `Changes?` | Changes associated with the issue. |
| `label` | `Label?` | Label associated with the issue event. |
| `assignee` | `User?` | Assignee associated with the issue event. |
| `milestone` | `Milestone?` | Milestone associated with the issue event. |
| `repository` | `Repository` | Repository where the issue event occurred. |
| `sender` | `User` | User that triggered the issue event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `IssueCommentEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `IssueCommentActions` | Issue comment event action. |
| `issue` | `Issue` | Issue or pull request associated with the comment. |
| `changes` | `Changes?` | Changes associated with the issue comment. |
| `comment` | `IssueComment` | Comment payload. |
| `repository` | `Repository` | Repository where the comment event occurred. |
| `sender` | `User` | User that triggered the comment event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `PullRequestEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `PullRequestActions` | Pull request event action. |
| `number` | `int` | Pull request number. |
| `changes` | `Changes?` | Changes associated with the pull request. |
| `pull_request` | `PullRequest` | Pull request payload. |
| `assignee` | `User?` | Assignee associated with the pull request event. |
| `label` | `Label?` | Label associated with the pull request event. |
| `requested_reviewer` | `User?` | Requested reviewer associated with the pull request event. |
| `repository` | `Repository` | Repository where the pull request event occurred. |
| `sender` | `User` | User that triggered the pull request event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `PullRequestReviewEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `PullRequestReviewActions` | Pull request review event action. |
| `review` | `Review` | Pull request review payload. |
| `pull_request` | `PullRequest` | Pull request associated with the review. |
| `changes` | `Changes?` | Changes associated with the review. |
| `repository` | `Repository` | Repository where the review event occurred. |
| `sender` | `User` | User that triggered the review event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `PullRequestReviewCommentEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `string` | Pull request review comment event action. |
| `changes` | `Changes?` | Changes associated with the review comment. |
| `pull_request` | `PullRequest` | Pull request associated with the review comment. |
| `comment` | `PullRequestReviewComment` | Review comment payload. |
| `repository` | `Repository` | Repository where the review comment event occurred. |
| `sender` | `User` | User that triggered the review comment event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `ReleaseEvent`

| Field | Type | Description |
|-------|------|-------------|
| `action` | `ReleaseActions` | Release event action. |
| `release` | `Release` | Release payload. |
| `repository` | `Repository` | Repository where the release event occurred. |
| `sender` | `User` | User that triggered the release event. |
| `changes` | `Changes?` | Changes associated with the release event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `PushEvent`

| Field | Type | Description |
|-------|------|-------------|
| `ref` | `string` | Full Git ref that was pushed. |
| `before` | `string` | SHA before the push. |
| `after` | `string` | SHA after the push. |
| `created` | `boolean` | Whether the push created the ref. |
| `deleted` | `boolean` | Whether the push deleted the ref. |
| `forced` | `boolean` | Whether the push was forced. |
| `base_ref` | `string?` | Base Git ref, when available. |
| `compare` | `string` | URL for comparing the before and after commits. |
| `commits` | `Commit[]` | Commits included in the push. |
| `head_commit` | `Commit?` | Head commit for the push. |
| `repository` | `Repository` | Repository where the push occurred. |
| `pusher` | `CommitAuthor` | User who pushed the commits. |
| `sender` | `User` | User that triggered the push event. |
| `organization` | `Organization?` | Organization associated with the event, when available. |

### `Repository`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `int` | Repository ID. |
| `name` | `string` | Repository name. |
| `full_name` | `string` | Full repository name, including owner. |
| `owner` | `User` | Repository owner. |
| `html_url` | `string` | Repository HTML URL. |
| `description` | `string?` | Repository description. |
| `default_branch` | `string` | Default branch name. |

### `Issue`

| Field | Type | Description |
|-------|------|-------------|
| `number` | `int` | Issue number. |
| `title` | `string` | Issue title. |
| `user` | `User` | Author of the issue. |
| `labels` | `Label[]` | Labels assigned to the issue. |
| `state` | `string` | Issue state. |
| `assignee` | `User?` | Assigned user, when available. |
| `assignees` | `User[]` | Assigned users. |
| `milestone` | `Milestone?` | Associated milestone. |
| `comments` | `int` | Number of issue comments. |
| `body` | `string?` | Issue description. |

### `PullRequest`

| Field | Type | Description |
|-------|------|-------------|
| `number` | `int` | Pull request number. |
| `state` | `string` | Pull request state. |
| `title` | `string` | Pull request title. |
| `user` | `User` | Author of the pull request. |
| `body` | `string?` | Pull request description. |
| `created_at` | `string` | Creation timestamp. |
| `updated_at` | `string` | Last update timestamp. |
| `closed_at` | `string?` | Close timestamp, when available. |
| `merged` | `boolean?` | Whether the pull request was merged. |
| `head` | `Branch` | Head branch. |
| `base` | `Branch` | Base branch. |

### `User`

| Field | Type | Description |
|-------|------|-------------|
| `login` | `string` | GitHub username. |
| `id` | `int` | User ID. |
| `avatar_url` | `string` | Public avatar URL. |
| `html_url` | `string` | GitHub profile URL. |
| `type` | `string` | User type. |
| `site_admin` | `boolean` | Whether the user is a site administrator. |
| `name` | `string?` | Display name, when available. |
| `email` | `string?` | Email address, when available. |
