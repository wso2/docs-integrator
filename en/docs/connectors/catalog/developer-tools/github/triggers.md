---
title: Triggers
description: "Reference for the GitHub webhook listener and service callbacks: receive push, pull request, issue, release, workflow and other repository events in Ballerina integrations."
keywords: [github, webhook listener, github webhooks, event handler, ballerina]
connector: true
connector_name: "github"
---

# Triggers

The `ballerinax/github.trigger` package receives GitHub webhooks. When something happens in a repository or organization, such as a push, a pull request, a release or a workflow run, GitHub sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload. It replaces the earlier `ballerinax/trigger.github` package.

This reference covers `ballerinax/github.trigger` version 1.0.1. The following components work together:

| Component | Role |
|-----------|------|
| `github:Listener` | Receives webhook requests from GitHub, verifies each one, and calls the attached service for its event. |
| `github:ListenerConfig` | Holds what the listener verifies deliveries with, the webhook secret. |
| Service types | 75 service types, such as `github:PushService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `github:PushPayload`, passed to its callback. |

To call the GitHub API from your integration, use the separate `ballerinax/github` connector. See the [Action Reference](actions.md).

## Error handling

The listener acknowledges a delivery to GitHub as soon as it is verified, and then calls your callback, so GitHub never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `github:Listener` exposes an HTTP endpoint for GitHub to deliver webhooks to. Point a repository or organization webhook at its public URL, with the content type `application/json`. See the [Setup Guide](setup-guide.md#configuring-a-github-repository-webhook).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the GitHub webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The secret set on the GitHub webhook. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

GitHub signs each delivery with the webhook's secret, in the `X-Hub-Signature-256` header (`sha256=` followed by the hex HMAC-SHA256 of the body). The listener computes the same signature with `webhookSecret` and compares the two in constant time. A delivery without the header, with a different signature, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`, so set `webhookSecret` to exactly the secret you gave the webhook.

### Initializing the listener

```ballerina
import ballerinax/github.trigger as github;

configurable string webhookSecret = ?;

listener github:Listener githubListener = new ({webhookSecret}, 8090);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<the secret you set on the GitHub webhook>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 265 callbacks in all.

A service can also be attached on a path of its own, such as `service github:PushService /github on githubListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(github:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `github:PingService` | `onPing` | <code>github:PingPayload</code> |
| `github:PushService` | `onPush` | <code>github:PushPayload</code> |
| `github:PullRequestService` | `onPullRequestAssigned`, `onPullRequestAutoMergeDisabled`, `onPullRequestAutoMergeEnabled`, `onPullRequestClosed`, `onPullRequestConvertedToDraft`, `onPullRequestDemilestoned`, `onPullRequestDequeued`, `onPullRequestEdited`, `onPullRequestEnqueued`, `onPullRequestLabeled`, `onPullRequestLocked`, `onPullRequestMilestoned`, `onPullRequestOpened`, `onPullRequestReadyForReview`, `onPullRequestReopened`, `onPullRequestReviewRequestRemoved`, `onPullRequestReviewRequested`, `onPullRequestSynchronize`, `onPullRequestUnassigned`, `onPullRequestUnlabeled`, `onPullRequestUnlocked` | <code>github:PullRequestPayload</code> |
| `github:IssuesService` | `onIssuesAssigned`, `onIssuesClosed`, `onIssuesDeleted`, `onIssuesDemilestoned`, `onIssuesEdited`, `onIssuesLabeled`, `onIssuesLocked`, `onIssuesMilestoned`, `onIssuesOpened`, `onIssuesPinned`, `onIssuesReopened`, `onIssuesTransferred`, `onIssuesTyped`, `onIssuesUnassigned`, `onIssuesUnlabeled`, `onIssuesUnlocked`, `onIssuesUnpinned`, `onIssuesUntyped` | <code>github:IssuesPayload</code> |
| `github:ReleaseService` | `onReleaseCreated`, `onReleaseDeleted`, `onReleaseEdited`, `onReleasePrereleased`, `onReleasePublished`, `onReleaseReleased`, `onReleaseUnpublished` | <code>github:ReleasePayload</code> |
| `github:IssueCommentService` | `onIssueCommentCreated`, `onIssueCommentDeleted`, `onIssueCommentEdited`, `onIssueCommentPinned`, `onIssueCommentUnpinned` | <code>github:IssueCommentPayload</code> |
| `github:PullRequestReviewService` | `onPullRequestReviewDismissed`, `onPullRequestReviewEdited`, `onPullRequestReviewSubmitted` | <code>github:PullRequestReviewPayload</code> |
| `github:PullRequestReviewCommentService` | `onPullRequestReviewCommentCreated`, `onPullRequestReviewCommentDeleted`, `onPullRequestReviewCommentEdited` | <code>github:PullRequestReviewCommentPayload</code> |
| `github:CreateService` | `onCreate` | <code>github:CreatePayload</code> |
| `github:DeleteService` | `onDelete` | <code>github:DeletePayload</code> |
| `github:ForkService` | `onFork` | <code>github:ForkPayload</code> |
| `github:StarService` | `onStarCreated`, `onStarDeleted` | <code>github:StarPayload</code> |
| `github:WatchService` | `onWatchStarted` | <code>github:WatchPayload</code> |
| `github:CheckRunService` | `onCheckRunCompleted`, `onCheckRunCreated`, `onCheckRunRequestedAction`, `onCheckRunRerequested` | <code>github:CheckRunPayload</code> |
| `github:CheckSuiteService` | `onCheckSuiteCompleted`, `onCheckSuiteRequested`, `onCheckSuiteRerequested` | <code>github:CheckSuitePayload</code> |
| `github:DeploymentService` | `onDeploymentCreated` | <code>github:DeploymentPayload</code> |
| `github:DeploymentStatusService` | `onDeploymentStatusCreated` | <code>github:DeploymentStatusPayload</code> |
| `github:WorkflowRunService` | `onWorkflowRunCompleted`, `onWorkflowRunInProgress`, `onWorkflowRunRequested` | <code>github:WorkflowRunPayload</code> |
| `github:WorkflowJobService` | `onWorkflowJobCompleted`, `onWorkflowJobInProgress`, `onWorkflowJobQueued`, `onWorkflowJobWaiting` | <code>github:WorkflowJobPayload</code> |
| `github:RepositoryService` | `onRepositoryArchived`, `onRepositoryCreated`, `onRepositoryDeleted`, `onRepositoryEdited`, `onRepositoryPrivatized`, `onRepositoryPublicized`, `onRepositoryRenamed`, `onRepositoryTransferred`, `onRepositoryUnarchived` | <code>github:RepositoryPayload</code> |
| `github:MemberService` | `onMemberAdded`, `onMemberEdited`, `onMemberRemoved` | <code>github:MemberPayload</code> |
| `github:DiscussionService` | `onDiscussionAnswered`, `onDiscussionCategoryChanged`, `onDiscussionClosed`, `onDiscussionCreated`, `onDiscussionDeleted`, `onDiscussionEdited`, `onDiscussionLabeled`, `onDiscussionLocked`, `onDiscussionPinned`, `onDiscussionReopened`, `onDiscussionTransferred`, `onDiscussionUnanswered`, `onDiscussionUnlabeled`, `onDiscussionUnlocked`, `onDiscussionUnpinned` | <code>github:DiscussionPayload</code> |
| `github:DiscussionCommentService` | `onDiscussionCommentCreated`, `onDiscussionCommentDeleted`, `onDiscussionCommentEdited` | <code>github:DiscussionCommentPayload</code> |
| `github:LabelService` | `onLabelCreated`, `onLabelDeleted`, `onLabelEdited` | <code>github:LabelPayload</code> |
| `github:MilestoneService` | `onMilestoneClosed`, `onMilestoneCreated`, `onMilestoneDeleted`, `onMilestoneEdited`, `onMilestoneOpened` | <code>github:MilestonePayload</code> |
| `github:StatusService` | `onStatus` | <code>github:StatusPayload</code> |
| `github:WorkflowDispatchService` | `onWorkflowDispatch` | <code>github:WorkflowDispatchPayload</code> |
| `github:PullRequestReviewThreadService` | `onPullRequestReviewThreadResolved`, `onPullRequestReviewThreadUnresolved` | <code>github:PullRequestReviewThreadPayload</code> |
| `github:TeamService` | `onTeamAddedToRepository`, `onTeamCreated`, `onTeamDeleted`, `onTeamEdited`, `onTeamRemovedFromRepository` | <code>github:TeamPayload</code> |
| `github:OrganizationService` | `onOrganizationDeleted`, `onOrganizationMemberAdded`, `onOrganizationMemberInvited`, `onOrganizationMemberRemoved`, `onOrganizationRenamed` | <code>github:OrganizationPayload</code> |
| `github:DeploymentProtectionRuleService` | `onDeploymentProtectionRule` | <code>github:DeploymentProtectionRulePayload</code> |
| `github:DeploymentReviewService` | `onDeploymentReviewApproved`, `onDeploymentReviewRejected`, `onDeploymentReviewRequested` | <code>github:DeploymentReviewPayload</code> |
| `github:InstallationTargetService` | `onInstallationTargetRenamed` | <code>github:InstallationTargetPayload</code> |
| `github:IssueDependenciesService` | `onIssueDependenciesBlockedByAdded`, `onIssueDependenciesBlockedByRemoved`, `onIssueDependenciesBlockingAdded`, `onIssueDependenciesBlockingRemoved` | <code>github:IssueDependenciesPayload</code> |
| `github:MarketplacePurchaseService` | `onMarketplacePurchaseCancelled`, `onMarketplacePurchaseChanged`, `onMarketplacePurchasePendingChange`, `onMarketplacePurchasePendingChangeCancelled`, `onMarketplacePurchasePurchased` | <code>github:MarketplacePurchasePayload</code> |
| `github:PersonalAccessTokenRequestService` | `onPersonalAccessTokenRequestApproved`, `onPersonalAccessTokenRequestCancelled`, `onPersonalAccessTokenRequestCreated`, `onPersonalAccessTokenRequestDenied` | <code>github:PersonalAccessTokenRequestPayload</code> |
| `github:ProjectService` | `onProjectClosed`, `onProjectCreated`, `onProjectDeleted`, `onProjectEdited`, `onProjectReopened` | <code>github:ProjectPayload</code> |
| `github:ProjectCardService` | `onProjectCardConverted`, `onProjectCardCreated`, `onProjectCardDeleted`, `onProjectCardEdited`, `onProjectCardMoved` | <code>github:ProjectCardPayload</code> |
| `github:ProjectColumnService` | `onProjectColumnCreated`, `onProjectColumnDeleted`, `onProjectColumnEdited`, `onProjectColumnMoved` | <code>github:ProjectColumnPayload</code> |
| `github:RepositoryImportService` | `onRepositoryImport` | <code>github:RepositoryImportPayload</code> |
| `github:SubIssuesService` | `onSubIssuesParentIssueAdded`, `onSubIssuesParentIssueRemoved`, `onSubIssuesSubIssueAdded`, `onSubIssuesSubIssueRemoved` | <code>github:SubIssuesPayload</code> |
| `github:PageBuildService` | `onPageBuild` | <code>github:PageBuildPayload</code> |
| `github:TeamAddService` | `onTeamAdd` | <code>github:TeamAddPayload</code> |
| `github:SponsorshipService` | `onSponsorshipCancelled`, `onSponsorshipCreated`, `onSponsorshipEdited`, `onSponsorshipPendingCancellation`, `onSponsorshipPendingTierChange`, `onSponsorshipTierChanged` | <code>github:SponsorshipPayload</code> |
| `github:SecurityAndAnalysisService` | `onSecurityAndAnalysis` | <code>github:SecurityAndAnalysisPayload</code> |
| `github:BranchProtectionConfigurationService` | `onBranchProtectionConfigurationDisabled`, `onBranchProtectionConfigurationEnabled` | <code>github:BranchProtectionConfigurationPayload</code> |
| `github:CustomPropertyService` | `onCustomPropertyCreated`, `onCustomPropertyDeleted`, `onCustomPropertyPromoteToEnterprise`, `onCustomPropertyUpdated` | <code>github:CustomPropertyPayload</code> |
| `github:CustomPropertyValuesService` | `onCustomPropertyValuesUpdated` | <code>github:CustomPropertyValuesPayload</code> |
| `github:ProjectsV2itemService` | `onProjectsV2ItemArchived`, `onProjectsV2ItemConverted`, `onProjectsV2ItemCreated`, `onProjectsV2ItemDeleted`, `onProjectsV2ItemEdited`, `onProjectsV2ItemReordered`, `onProjectsV2ItemRestored` | <code>github:ProjectsV2ItemPayload</code> |
| `github:ProjectsV2statusUpdateService` | `onProjectsV2StatusUpdateCreated`, `onProjectsV2StatusUpdateDeleted`, `onProjectsV2StatusUpdateEdited` | <code>github:ProjectsV2StatusUpdatePayload</code> |
| `github:RegistryPackageService` | `onRegistryPackagePublished`, `onRegistryPackageUpdated` | <code>github:RegistryPackagePayload</code> |
| `github:RepositoryRulesetService` | `onRepositoryRulesetCreated`, `onRepositoryRulesetDeleted`, `onRepositoryRulesetEdited` | <code>github:RepositoryRulesetPayload</code> |
| `github:RepositoryVulnerabilityAlertService` | `onRepositoryVulnerabilityAlertCreate`, `onRepositoryVulnerabilityAlertDismiss`, `onRepositoryVulnerabilityAlertReopen`, `onRepositoryVulnerabilityAlertResolve` | <code>github:RepositoryVulnerabilityAlertPayload</code> |
| `github:SecretScanningAlertLocationService` | `onSecretScanningAlertLocation` | <code>github:SecretScanningAlertLocationPayload</code> |
| `github:SecretScanningScanService` | `onSecretScanningScan` | <code>github:SecretScanningScanPayload</code> |
| `github:BranchProtectionRuleService` | `onBranchProtectionRuleCreated`, `onBranchProtectionRuleDeleted`, `onBranchProtectionRuleEdited` | <code>github:BranchProtectionRulePayload</code> |
| `github:CodeScanningAlertService` | `onCodeScanningAlertAppearedInBranch`, `onCodeScanningAlertClosedByUser`, `onCodeScanningAlertCreated`, `onCodeScanningAlertFixed`, `onCodeScanningAlertReopened`, `onCodeScanningAlertReopenedByUser`, `onCodeScanningAlertUpdatedAssignment` | <code>github:CodeScanningAlertPayload</code> |
| `github:DeployKeyService` | `onDeployKeyCreated`, `onDeployKeyDeleted` | <code>github:DeployKeyPayload</code> |
| `github:GithubAppAuthorizationService` | `onGithubAppAuthorizationRevoked` | <code>github:GithubAppAuthorizationPayload</code> |
| `github:MetaService` | `onMetaDeleted` | <code>github:MetaPayload</code> |
| `github:OrgBlockService` | `onOrgBlockBlocked`, `onOrgBlockUnblocked` | <code>github:OrgBlockPayload</code> |
| `github:PackageService` | `onPackagePublished`, `onPackageUpdated` | <code>github:PackagePayload</code> |
| `github:ProjectsV2Service` | `onProjectsV2Closed`, `onProjectsV2Created`, `onProjectsV2Deleted`, `onProjectsV2Edited`, `onProjectsV2Reopened` | <code>github:ProjectsV2Payload</code> |
| `github:RepositoryAdvisoryService` | `onRepositoryAdvisoryPublished`, `onRepositoryAdvisoryReported` | <code>github:RepositoryAdvisoryPayload</code> |
| `github:SecurityAdvisoryService` | `onSecurityAdvisoryPublished`, `onSecurityAdvisoryUpdated`, `onSecurityAdvisoryWithdrawn` | <code>github:SecurityAdvisoryPayload</code> |
| `github:CommitCommentService` | `onCommitCommentCreated` | <code>github:CommitCommentPayload</code> |
| `github:DependabotAlertService` | `onDependabotAlertAssigneesChanged`, `onDependabotAlertAutoDismissed`, `onDependabotAlertAutoReopened`, `onDependabotAlertCreated`, `onDependabotAlertDismissed`, `onDependabotAlertFixed`, `onDependabotAlertReintroduced`, `onDependabotAlertReopened` | <code>github:DependabotAlertPayload</code> |
| `github:GollumService` | `onGollum` | <code>github:GollumPayload</code> |
| `github:InstallationService` | `onInstallationCreated`, `onInstallationDeleted`, `onInstallationNewPermissionsAccepted`, `onInstallationSuspend`, `onInstallationUnsuspend` | <code>github:InstallationPayload</code> |
| `github:InstallationRepositoriesService` | `onInstallationRepositoriesAdded`, `onInstallationRepositoriesRemoved` | <code>github:InstallationRepositoriesPayload</code> |
| `github:MembershipService` | `onMembershipAdded`, `onMembershipRemoved` | <code>github:MembershipPayload</code> |
| `github:MergeGroupService` | `onMergeGroupChecksRequested`, `onMergeGroupDestroyed` | <code>github:MergeGroupPayload</code> |
| `github:PublicService` | `onPublic` | <code>github:PublicPayload</code> |
| `github:RepositoryDispatchService` | `onRepositoryDispatch` | <code>github:RepositoryDispatchPayload</code> |
| `github:SecretScanningAlertService` | `onSecretScanningAlertAssigned`, `onSecretScanningAlertCreated`, `onSecretScanningAlertPubliclyLeaked`, `onSecretScanningAlertReopened`, `onSecretScanningAlertResolved`, `onSecretScanningAlertUnassigned`, `onSecretScanningAlertValidated` | <code>github:SecretScanningAlertPayload</code> |

### Full usage example

This is the [`push-event-logger`](https://github.com/ballerina-platform/module-ballerinax-github.trigger/tree/main/examples/push-event-logger) example from the package:

```ballerina
import ballerina/log;
import ballerinax/github.trigger as github;

configurable github:ListenerConfig config = {
    webhookSecret: "xxxxxx"
};

listener github:Listener webhookListener = new (config, 8090);

// The minimal, canonical use case: log every push to any branch or tag.
service github:PushService on webhookListener {

    remote function onPush(github:PushPayload payload) returns error? {
        log:printInfo("Push received", pusher = payload.pusher.name ?: payload.sender.login,
                commitCount = payload.commits.length(), ref = payload.ref,
                repository = payload.repository.fullName);

        foreach github:Commit c in payload.commits {
            log:printInfo("Commit", sha = c.id.substring(0, 7), commitMessage = c.message);
        }
    }
}
```

## Event payload types

Each event's payload is a record named after the event, such as `PushPayload`, `PullRequestPayload` and `IssuesPayload`. Field names are camelCase; each field reads the matching snake_case key from GitHub's JSON. The types used by the example above:

### `PushPayload`

| Field | Type | Description |
|-------|------|-------------|
| `ref` | <code>string</code> | The full git ref that was pushed (e.g. refs/heads/main or refs/tags/v3.14.1) |
| `before` | <code>string</code> | The SHA of the most recent commit on ref before the push. |
| `after` | <code>string</code> | The SHA of the most recent commit on ref after the push. |
| `baseRef` | <code>string?</code> | The base ref for the push (if applicable) Optional. |
| `created` | <code>boolean</code> | Whether this push created the ref. |
| `deleted` | <code>boolean</code> | Whether this push deleted the ref. |
| `forced` | <code>boolean</code> | Whether this push was a force push of the ref. |
| `compare` | <code>string</code> | URL showing the changes in this ref update. |
| `commits` | <code>Commit[]</code> | Array of commit objects (maximum 2048) |
| `headCommit` | <code>Commit?</code> | A Git commit. Optional. |
| `pusher` | <code>CommitAuthor</code> | Metaproperties for the Git author/committer. |
| `sender` | <code>User</code> | A GitHub user. |
| `repository` | <code>Repository</code> | A repository on GitHub. |
| `organization` | <code>Organization</code> | A GitHub organization. Optional. |
| `installation` | <code>Installation</code> | A GitHub App installation. Optional. |
| `enterprise` | <code>Enterprise</code> | A GitHub Enterprise account. Optional. |

### `Commit`

| Field | Type | Description |
|-------|------|-------------|
| `id` | <code>string</code> | The commit SHA. |
| `treeId` | <code>string</code> | The SHA of the Git tree associated with this commit. Optional. |
| `distinct` | <code>boolean</code> | Whether this commit is distinct from any that have been pushed before. Optional. |
| `message` | <code>string</code> | The commit message. |
| `timestamp` | <code>string</code> | The ISO 8601 timestamp of the commit. Optional. |
| `url` | <code>string</code> | URL that points to the commit API resource. Optional. |
| `author` | <code>CommitAuthor</code> | Git author/committer metadata. Optional. |
| `committer` | <code>CommitAuthor</code> | Git author/committer metadata. Optional. |
| `added` | <code>string[]</code> | Files added in this commit. Optional. |
| `removed` | <code>string[]</code> | Files removed in this commit. Optional. |
| `modified` | <code>string[]</code> | Files modified in this commit. Optional. |

### `CommitAuthor`

| Field | Type | Description |
|-------|------|-------------|
| `name` | <code>string</code> | The git author's name. Optional. |
| `email` | <code>string</code> | The git author's email address. Optional. |
| `username` | <code>string</code> | The git author's GitHub username, if their email matched a GitHub account. Optional. |

### `User`

| Field | Type | Description |
|-------|------|-------------|
| `login` | <code>string</code> | The user's GitHub username. |
| `id` | <code>int</code> | The user's unique numeric identifier. |
| `nodeId` | <code>string</code> | The GraphQL node ID. Optional. |
| `avatarUrl` | <code>string</code> | The URL of the user's or organization's avatar image. Optional. |
| `gravatarId` | <code>string?</code> | The user's Gravatar ID (legacy field, typically empty). Optional. |
| `url` | <code>string</code> | The API URL of the resource. Optional. |
| `htmlUrl` | <code>string</code> | The URL of the resource on GitHub.com. Optional. |
| `type` | <code>string</code> | The account type: User, Organization, or Bot. Optional. |
| `siteAdmin` | <code>boolean</code> | Whether the user is a GitHub site administrator. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-a-github-repository-webhook): create the webhook GitHub delivers events to.
- [Example](example.md#github-trigger-example): build a GitHub trigger integration in WSO2 Integrator.
- [Action Reference](actions.md): call the GitHub API with the `ballerinax/github` connector.
