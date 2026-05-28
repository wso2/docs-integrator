---
title: GitHub Webhooks
---

# GitHub Webhooks

GitHub event integration is currently in **Beta**. APIs and behavior may change in future releases.

GitHub event integrations receive webhook callbacks from GitHub and trigger handler functions as repository events occur. Use them to automate CI/CD workflows, sync issue trackers, enforce code review policies, and react to repository activity in real time.

## Creating a GitHub Events service

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **GitHub** under **Event Integration**.
3. In the creation form, fill in the following fields:

   ![Github Webhook creation form](/img/develop/integration-artifacts/event/github-webhooks/step-creation-form.png)

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The type of GitHub event to listen for. Select a service type from the dropdown (for example, **IssuesService**, **PullRequestService**). See [Event channels](#event-channels) for all options. | Required |
   | **Webhook Secret** | Secret used to validate incoming GitHub webhook requests. Configure the same value in your GitHub repository webhook settings. | — |
   | **Webhook Listener Port** | The port on which the webhook listener accepts incoming HTTP requests. | `8090` |

   Expand **Advanced Configurations** to set the listener name.

   | Field | Description | Default |
   |---|---|---|
   | **Listener Name** | Identifier for the listener created with this service. | `githubListener` |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener pill, the active event channel pill, and the **Event Handlers** section with all handlers for the selected channel pre-added.

   ![Github Service Designer View](/img/develop/integration-artifacts/event/github-webhooks/step-service-designer.png)

   All event handlers for the selected channel are added automatically. Click any handler to open it in the flow diagram view and implement the logic.

The following complete, runnable Ballerina program creates a GitHub event integration that listens for issue events and logs each one.

```ballerina
import ballerinax/trigger.github;
import ballerina/log;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener github:Listener githubListener = new (
    listenerConfig = {webhookSecret: webhookSecret},
    listenOn = port
);

service github:IssuesService on githubListener {

    remote function onOpened(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue opened",
                      number = payload.issue.number,
                      title = payload.issue.title,
                      repo = payload.repository.name);
    }

    remote function onClosed(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue closed", number = payload.issue.number);
    }

    remote function onReopened(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue reopened", number = payload.issue.number);
    }

    remote function onAssigned(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue assigned", number = payload.issue.number);
    }

    remote function onUnassigned(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue unassigned", number = payload.issue.number);
    }

    remote function onLabeled(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue labeled", number = payload.issue.number);
    }

    remote function onUnlabeled(github:IssuesEvent payload) returns error? {
        log:printInfo("Issue unlabeled", number = payload.issue.number);
    }
}
```

Save this as `main.bal` and run `bal run` from the project directory. Configure your GitHub repository webhook to point at the listener URL and use the same `webhookSecret` value in the webhook settings.

## Listener configuration

In the **Service Designer**, click the **Configure** icon in the header to open the **GitHub Event Integration Configuration** panel.

   ![Github Connection Configure View](/img/develop/integration-artifacts/event/github-webhooks/step-configuration.png)

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `githubListener` |
| **Listener Config** | Webhook validation configuration. Accepts a `ListenerConfig` record expression with a `webhookSecret` field. | `{ webhookSecret: "" }` |
| **Listen On** | Port on which the listener accepts incoming webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

The listener is declared at the module level and takes a `ListenerConfig` value plus a port. `webhookSecret` is used to validate the HMAC signature on incoming GitHub webhook requests. Use `configurable` so the secret can be supplied via `Config.toml` or an environment variable without changing source code.

```ballerina
listener github:Listener githubListener = new (
    listenerConfig = {webhookSecret: webhookSecret},
    listenOn = 8090
);
```

`github:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | `""` | Secret used to verify the HMAC signature on incoming GitHub webhook requests |

## Event channels

Each event channel maps to a specific GitHub webhook event type. Select the channel that matches the repository activity your integration needs to respond to.

| Channel | GitHub event | Description |
|---|---|---|
| [`IssuesService`](#issuesservice-handlers) | `issues` | Issues opened, closed, reopened, assigned, labeled, and more |
| [`IssueCommentService`](#issuecommentservice-handlers) | `issue_comment` | Comments created, edited, or deleted on issues and pull requests |
| [`PullRequestService`](#pullrequestservice-handlers) | `pull_request` | Pull requests opened, closed, merged, reviewed, and updated |
| [`PullRequestReviewService`](#pullrequestreviewservice-handlers) | `pull_request_review` | Pull request reviews submitted, dismissed, or edited |
| [`PullRequestReviewCommentService`](#pullrequestreviewcommentservice-handlers) | `pull_request_review_comment` | Comments on pull request review diffs created, edited, or deleted |
| [`ReleaseService`](#releaseservice-handlers) | `release` | Releases published, unpublished, created, edited, or deleted |
| [`LabelService`](#labelservice-handlers) | `label` | Labels created, edited, or deleted |
| [`MilestoneService`](#milestoneservice-handlers) | `milestone` | Milestones created, closed, opened, edited, or deleted |
| [`PushService`](#pushservice-handlers) | `push` | Commits pushed to a branch or tag |
| [`ProjectCardService`](#projectcardservice-handlers) | `project_card` | Project board cards created, edited, moved, or deleted |

## Event handlers

When a GitHub Events service is created, WSO2 Integrator adds all handlers for the selected channel automatically. Click any handler in the **Service Designer** to open the flow diagram view and implement the processing logic.

### IssuesService handlers

Each handler receives a [github:IssuesEvent](../../../connectors/catalog/developer-tools/github/triggers.md#issuesevent) payload.

| Handler | Triggered when |
|---|---|
| `onOpened` | A new issue is opened |
| `onClosed` | An issue is closed |
| `onReopened` | A closed issue is reopened |
| `onAssigned` | A user is assigned to an issue |
| `onUnassigned` | A user is unassigned from an issue |
| `onLabeled` | A label is added to an issue |
| `onUnlabeled` | A label is removed from an issue |

### PullRequestService handlers

Each handler receives a [github:PullRequestEvent](../../../connectors/catalog/developer-tools/github/triggers.md#pullrequestevent) payload.

| Handler | Triggered when |
|---|---|
| `onOpened` | A pull request is opened |
| `onClosed` | A pull request is closed or merged |
| `onReopened` | A closed pull request is reopened |
| `onAssigned` | A user is assigned to a pull request |
| `onUnassigned` | A user is unassigned from a pull request |
| `onLabeled` | A label is added |
| `onUnlabeled` | A label is removed |
| `onEdited` | A pull request title, body, or base branch is edited |
| `onReviewRequested` | A review is requested |
| `onReviewRequestRemoved` | A review request is removed |

### IssueCommentService handlers

Each handler receives a [github:IssueCommentEvent](../../../connectors/catalog/developer-tools/github/triggers.md#issuecommentevent) payload.

| Handler | Triggered when |
|---|---|
| `onCreated` | A comment is added to an issue or pull request |
| `onEdited` | An existing comment is edited |
| `onDeleted` | A comment is deleted |

### PullRequestReviewService handlers

Each handler receives a [github:PullRequestReviewEvent](../../../connectors/catalog/developer-tools/github/triggers.md#pullrequestreviewevent) payload.

| Handler | Triggered when |
|---|---|
| `onSubmitted` | A pull request review is submitted |
| `onDismissed` | A pull request review is dismissed |
| `onEdited` | A pull request review body is edited |

### PullRequestReviewCommentService handlers

Each handler receives a [github:PullRequestReviewCommentEvent](../../../connectors/catalog/developer-tools/github/triggers.md#pullrequestreviewcommentevent) payload.

| Handler | Triggered when |
|---|---|
| `onCreated` | A comment is added to a pull request diff |
| `onEdited` | A comment on a pull request diff is edited |
| `onDeleted` | A comment on a pull request diff is deleted |

### ReleaseService handlers

Each handler receives a [github:ReleaseEvent](../../../connectors/catalog/developer-tools/github/triggers.md#releaseevent) payload.

| Handler | Triggered when |
|---|---|
| `onPublished` | A release is published |
| `onUnpublished` | A release is unpublished |
| `onCreated` | A release draft is created |
| `onEdited` | A release is edited |
| `onDeleted` | A release is deleted |
| `onPreReleased` | A release is marked as a pre-release |
| `onReleased` | A pre-release is promoted to a full release |

### LabelService handlers

Each handler receives a [github:LabelEvent](../../../connectors/catalog/developer-tools/github/triggers.md#labelevent) payload.

| Handler | Triggered when |
|---|---|
| `onCreated` | A label is created in the repository |
| `onEdited` | A label name or color is changed |
| `onDeleted` | A label is deleted |

### MilestoneService handlers

Each handler receives a [github:MilestoneEvent](../../../connectors/catalog/developer-tools/github/triggers.md#milestoneevent) payload.

| Handler | Triggered when |
|---|---|
| `onCreated` | A milestone is created |
| `onOpened` | A closed milestone is reopened |
| `onClosed` | A milestone is closed |
| `onEdited` | A milestone title or description is edited |
| `onDeleted` | A milestone is deleted |

### PushService handlers

The handler receives a [github:PushEvent](../../../connectors/catalog/developer-tools/github/triggers.md#pushevent) payload.

| Handler | Triggered when |
|---|---|
| `onPush` | Commits are pushed to a branch or a tag is created or deleted |

### ProjectCardService handlers

Each handler receives a [github:ProjectCardEvent](../../../connectors/catalog/developer-tools/github/triggers.md#projectcardevent) payload.

| Handler | Triggered when |
|---|---|
| `onCreated` | A card is added to a project board |
| `onEdited` | A card note is edited |
| `onMoved` | A card is moved to a different column |
| `onConverted` | A card note is converted to an issue |
| `onDeleted` | A card is deleted from a project board |

## Error handling

If an event handler returns an error, the GitHub listener logs the error and continues processing subsequent events. Use `do/on fail` inside each handler to catch and recover from expected failures without propagating them to the listener.

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are caught by the listener and logged automatically.

The GitHub listener catches errors returned from handler methods, logs them, and continues processing subsequent events. Use `do/on fail` inside a handler to take control of recovery before the error reaches the listener.

```ballerina
service github:IssuesService on githubListener {

    remote function onOpened(github:IssuesEvent payload) returns error? {
        do {
            log:printInfo("Issue opened", number = payload.issue.number);
        } on fail error err {
            log:printError("Failed to handle onOpened event", err);
        }
    }
}
```

Return `error?` from a handler to allow unhandled errors to propagate to the listener. Return `()` to suppress them.

## What's next

- [Kafka](kafka.md) — consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md) — listen to Salesforce Change Data Capture events
- [Connections](../supporting/connections.md) — reuse GitHub credentials across services
- [GitHub connector reference](../../../connectors/catalog/developer-tools/github/connector-overview.md) — full connector API reference
- [GitHub Personal Access Token Setup Guide](../../../connectors/catalog/developer-tools/github/setup-guide.md) — create a GitHub Personal Access Token and configure a repository webhook
