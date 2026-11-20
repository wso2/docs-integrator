---
title: GitHub Webhooks
description: React to GitHub repository and organization events, such as pushes, pull requests, issues, releases and workflow runs, using pre-built event handlers for each event type.
keywords: [wso2 integrator, github webhooks, github event integration, webhook listener, push, pull requests, issues, releases]
slug: /develop-and-test/integration-artifacts/event-driven-integration/github-webhooks
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# GitHub Webhooks

:::warning
GitHub event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

GitHub event integrations receive webhook deliveries from GitHub and run a handler for each repository or organization event. Use them to automate CI/CD workflows, sync issue trackers, enforce code review policies, and react to repository activity in real time. They use the `ballerinax/github.trigger` package, which verifies every delivery with your webhook secret before a handler runs.

## Creating a GitHub Events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `github.trigger` and select the **github.trigger** card under **More on Ballerina Central**. Don't use the built-in **GitHub** card under **Event Integration**; it creates the older `trigger.github` package.
3. In the **GitHub Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="GitHub Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The GitHub event to handle, as a service type such as **github:PushService** or **github:PullRequestService**. See [Event channels](#event-channels) for all options. | `github:PushService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a GitHub listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `githubListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Secret** | The secret set on the GitHub webhook. Bind it to a configurable variable. The listener rejects every delivery until it is set. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="GitHub Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a GitHub event integration that logs every push.

```ballerina
import ballerina/log;
import ballerinax/github.trigger as github;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener github:Listener githubListener = new ({webhookSecret}, port);

service github:PushService on githubListener {

    remote function onPush(github:PushPayload payload) returns error? {
        log:printInfo("Push received", ref = payload.ref, commitCount = payload.commits.length(),
                repository = payload.repository.fullName);
    }
}
```

Save this as `main.bal`, set `webhookSecret` in `Config.toml`, and run `bal run` from the project directory. Then add a webhook to your GitHub repository that points at the listener's public URL, with the content type `application/json` and the same secret. See the [GitHub setup guide](product://connectors/catalog/developer-tools/github/setup-guide#configuring-a-github-repository-webhook).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **GitHub Event Integration Configuration** panel.

   <ThemedImage
       alt="GitHub listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/github-webhooks/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `githubListener` |
| **Listener Config** | A `github:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `github:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so the secret is supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener github:Listener githubListener = new ({webhookSecret}, 8090);
```

`github:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The secret set on the GitHub webhook. The listener verifies the `X-Hub-Signature-256` header of every delivery with it, and rejects every delivery with `401 Unauthorized` while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one GitHub webhook event, the value GitHub sends in the `X-GitHub-Event` header. Select the channel for the activity your integration needs to respond to, and enable the same event on the GitHub webhook. Each handler handles one action of the event.

| Channel | GitHub event | Handlers |
|---|---|---|
| `github:BranchProtectionConfigurationService` | `branch_protection_configuration` | `onBranchProtectionConfigurationDisabled`, `onBranchProtectionConfigurationEnabled` |
| `github:BranchProtectionRuleService` | `branch_protection_rule` | `onBranchProtectionRuleCreated`, `onBranchProtectionRuleDeleted`, `onBranchProtectionRuleEdited` |
| `github:CheckRunService` | `check_run` | `onCheckRunCompleted`, `onCheckRunCreated`, `onCheckRunRequestedAction`, `onCheckRunRerequested` |
| `github:CheckSuiteService` | `check_suite` | `onCheckSuiteCompleted`, `onCheckSuiteRequested`, `onCheckSuiteRerequested` |
| `github:CodeScanningAlertService` | `code_scanning_alert` | `onCodeScanningAlertAppearedInBranch`, `onCodeScanningAlertClosedByUser`, `onCodeScanningAlertCreated`, `onCodeScanningAlertFixed`, `onCodeScanningAlertReopened`, `onCodeScanningAlertReopenedByUser`, `onCodeScanningAlertUpdatedAssignment` |
| `github:CommitCommentService` | `commit_comment` | `onCommitCommentCreated` |
| `github:CreateService` | `create` | `onCreate` |
| `github:CustomPropertyService` | `custom_property` | `onCustomPropertyCreated`, `onCustomPropertyDeleted`, `onCustomPropertyPromoteToEnterprise`, `onCustomPropertyUpdated` |
| `github:CustomPropertyValuesService` | `custom_property_values` | `onCustomPropertyValuesUpdated` |
| `github:DeleteService` | `delete` | `onDelete` |
| `github:DependabotAlertService` | `dependabot_alert` | `onDependabotAlertAssigneesChanged`, `onDependabotAlertAutoDismissed`, `onDependabotAlertAutoReopened`, `onDependabotAlertCreated`, `onDependabotAlertDismissed`, `onDependabotAlertFixed`, `onDependabotAlertReintroduced`, `onDependabotAlertReopened` |
| `github:DeployKeyService` | `deploy_key` | `onDeployKeyCreated`, `onDeployKeyDeleted` |
| `github:DeploymentService` | `deployment` | `onDeploymentCreated` |
| `github:DeploymentProtectionRuleService` | `deployment_protection_rule` | `onDeploymentProtectionRule` |
| `github:DeploymentReviewService` | `deployment_review` | `onDeploymentReviewApproved`, `onDeploymentReviewRejected`, `onDeploymentReviewRequested` |
| `github:DeploymentStatusService` | `deployment_status` | `onDeploymentStatusCreated` |
| `github:DiscussionService` | `discussion` | `onDiscussionAnswered`, `onDiscussionCategoryChanged`, `onDiscussionClosed`, `onDiscussionCreated`, `onDiscussionDeleted`, `onDiscussionEdited`, `onDiscussionLabeled`, `onDiscussionLocked`, `onDiscussionPinned`, `onDiscussionReopened`, `onDiscussionTransferred`, `onDiscussionUnanswered`, `onDiscussionUnlabeled`, `onDiscussionUnlocked`, `onDiscussionUnpinned` |
| `github:DiscussionCommentService` | `discussion_comment` | `onDiscussionCommentCreated`, `onDiscussionCommentDeleted`, `onDiscussionCommentEdited` |
| `github:ForkService` | `fork` | `onFork` |
| `github:GithubAppAuthorizationService` | `github_app_authorization` | `onGithubAppAuthorizationRevoked` |
| `github:GollumService` | `gollum` | `onGollum` |
| `github:InstallationService` | `installation` | `onInstallationCreated`, `onInstallationDeleted`, `onInstallationNewPermissionsAccepted`, `onInstallationSuspend`, `onInstallationUnsuspend` |
| `github:InstallationRepositoriesService` | `installation_repositories` | `onInstallationRepositoriesAdded`, `onInstallationRepositoriesRemoved` |
| `github:InstallationTargetService` | `installation_target` | `onInstallationTargetRenamed` |
| `github:IssueCommentService` | `issue_comment` | `onIssueCommentCreated`, `onIssueCommentDeleted`, `onIssueCommentEdited`, `onIssueCommentPinned`, `onIssueCommentUnpinned` |
| `github:IssueDependenciesService` | `issue_dependencies` | `onIssueDependenciesBlockedByAdded`, `onIssueDependenciesBlockedByRemoved`, `onIssueDependenciesBlockingAdded`, `onIssueDependenciesBlockingRemoved` |
| `github:IssuesService` | `issues` | `onIssuesAssigned`, `onIssuesClosed`, `onIssuesDeleted`, `onIssuesDemilestoned`, `onIssuesEdited`, `onIssuesLabeled`, `onIssuesLocked`, `onIssuesMilestoned`, `onIssuesOpened`, `onIssuesPinned`, `onIssuesReopened`, `onIssuesTransferred`, `onIssuesTyped`, `onIssuesUnassigned`, `onIssuesUnlabeled`, `onIssuesUnlocked`, `onIssuesUnpinned`, `onIssuesUntyped` |
| `github:LabelService` | `label` | `onLabelCreated`, `onLabelDeleted`, `onLabelEdited` |
| `github:MarketplacePurchaseService` | `marketplace_purchase` | `onMarketplacePurchaseCancelled`, `onMarketplacePurchaseChanged`, `onMarketplacePurchasePendingChange`, `onMarketplacePurchasePendingChangeCancelled`, `onMarketplacePurchasePurchased` |
| `github:MemberService` | `member` | `onMemberAdded`, `onMemberEdited`, `onMemberRemoved` |
| `github:MembershipService` | `membership` | `onMembershipAdded`, `onMembershipRemoved` |
| `github:MergeGroupService` | `merge_group` | `onMergeGroupChecksRequested`, `onMergeGroupDestroyed` |
| `github:MetaService` | `meta` | `onMetaDeleted` |
| `github:MilestoneService` | `milestone` | `onMilestoneClosed`, `onMilestoneCreated`, `onMilestoneDeleted`, `onMilestoneEdited`, `onMilestoneOpened` |
| `github:OrgBlockService` | `org_block` | `onOrgBlockBlocked`, `onOrgBlockUnblocked` |
| `github:OrganizationService` | `organization` | `onOrganizationDeleted`, `onOrganizationMemberAdded`, `onOrganizationMemberInvited`, `onOrganizationMemberRemoved`, `onOrganizationRenamed` |
| `github:PackageService` | `package` | `onPackagePublished`, `onPackageUpdated` |
| `github:PageBuildService` | `page_build` | `onPageBuild` |
| `github:PersonalAccessTokenRequestService` | `personal_access_token_request` | `onPersonalAccessTokenRequestApproved`, `onPersonalAccessTokenRequestCancelled`, `onPersonalAccessTokenRequestCreated`, `onPersonalAccessTokenRequestDenied` |
| `github:PingService` | `ping` | `onPing` |
| `github:ProjectService` | `project` | `onProjectClosed`, `onProjectCreated`, `onProjectDeleted`, `onProjectEdited`, `onProjectReopened` |
| `github:ProjectCardService` | `project_card` | `onProjectCardConverted`, `onProjectCardCreated`, `onProjectCardDeleted`, `onProjectCardEdited`, `onProjectCardMoved` |
| `github:ProjectColumnService` | `project_column` | `onProjectColumnCreated`, `onProjectColumnDeleted`, `onProjectColumnEdited`, `onProjectColumnMoved` |
| `github:ProjectsV2Service` | `projects_v2` | `onProjectsV2Closed`, `onProjectsV2Created`, `onProjectsV2Deleted`, `onProjectsV2Edited`, `onProjectsV2Reopened` |
| `github:ProjectsV2itemService` | `projects_v2item` | `onProjectsV2ItemArchived`, `onProjectsV2ItemConverted`, `onProjectsV2ItemCreated`, `onProjectsV2ItemDeleted`, `onProjectsV2ItemEdited`, `onProjectsV2ItemReordered`, `onProjectsV2ItemRestored` |
| `github:ProjectsV2statusUpdateService` | `projects_v2status_update` | `onProjectsV2StatusUpdateCreated`, `onProjectsV2StatusUpdateDeleted`, `onProjectsV2StatusUpdateEdited` |
| `github:PublicService` | `public` | `onPublic` |
| `github:PullRequestService` | `pull_request` | `onPullRequestAssigned`, `onPullRequestAutoMergeDisabled`, `onPullRequestAutoMergeEnabled`, `onPullRequestClosed`, `onPullRequestConvertedToDraft`, `onPullRequestDemilestoned`, `onPullRequestDequeued`, `onPullRequestEdited`, `onPullRequestEnqueued`, `onPullRequestLabeled`, `onPullRequestLocked`, `onPullRequestMilestoned`, `onPullRequestOpened`, `onPullRequestReadyForReview`, `onPullRequestReopened`, `onPullRequestReviewRequestRemoved`, `onPullRequestReviewRequested`, `onPullRequestSynchronize`, `onPullRequestUnassigned`, `onPullRequestUnlabeled`, `onPullRequestUnlocked` |
| `github:PullRequestReviewService` | `pull_request_review` | `onPullRequestReviewDismissed`, `onPullRequestReviewEdited`, `onPullRequestReviewSubmitted` |
| `github:PullRequestReviewCommentService` | `pull_request_review_comment` | `onPullRequestReviewCommentCreated`, `onPullRequestReviewCommentDeleted`, `onPullRequestReviewCommentEdited` |
| `github:PullRequestReviewThreadService` | `pull_request_review_thread` | `onPullRequestReviewThreadResolved`, `onPullRequestReviewThreadUnresolved` |
| `github:PushService` | `push` | `onPush` |
| `github:RegistryPackageService` | `registry_package` | `onRegistryPackagePublished`, `onRegistryPackageUpdated` |
| `github:ReleaseService` | `release` | `onReleaseCreated`, `onReleaseDeleted`, `onReleaseEdited`, `onReleasePrereleased`, `onReleasePublished`, `onReleaseReleased`, `onReleaseUnpublished` |
| `github:RepositoryService` | `repository` | `onRepositoryArchived`, `onRepositoryCreated`, `onRepositoryDeleted`, `onRepositoryEdited`, `onRepositoryPrivatized`, `onRepositoryPublicized`, `onRepositoryRenamed`, `onRepositoryTransferred`, `onRepositoryUnarchived` |
| `github:RepositoryAdvisoryService` | `repository_advisory` | `onRepositoryAdvisoryPublished`, `onRepositoryAdvisoryReported` |
| `github:RepositoryDispatchService` | `repository_dispatch` | `onRepositoryDispatch` |
| `github:RepositoryImportService` | `repository_import` | `onRepositoryImport` |
| `github:RepositoryRulesetService` | `repository_ruleset` | `onRepositoryRulesetCreated`, `onRepositoryRulesetDeleted`, `onRepositoryRulesetEdited` |
| `github:RepositoryVulnerabilityAlertService` | `repository_vulnerability_alert` | `onRepositoryVulnerabilityAlertCreate`, `onRepositoryVulnerabilityAlertDismiss`, `onRepositoryVulnerabilityAlertReopen`, `onRepositoryVulnerabilityAlertResolve` |
| `github:SecretScanningAlertService` | `secret_scanning_alert` | `onSecretScanningAlertAssigned`, `onSecretScanningAlertCreated`, `onSecretScanningAlertPubliclyLeaked`, `onSecretScanningAlertReopened`, `onSecretScanningAlertResolved`, `onSecretScanningAlertUnassigned`, `onSecretScanningAlertValidated` |
| `github:SecretScanningAlertLocationService` | `secret_scanning_alert_location` | `onSecretScanningAlertLocation` |
| `github:SecretScanningScanService` | `secret_scanning_scan` | `onSecretScanningScan` |
| `github:SecurityAdvisoryService` | `security_advisory` | `onSecurityAdvisoryPublished`, `onSecurityAdvisoryUpdated`, `onSecurityAdvisoryWithdrawn` |
| `github:SecurityAndAnalysisService` | `security_and_analysis` | `onSecurityAndAnalysis` |
| `github:SponsorshipService` | `sponsorship` | `onSponsorshipCancelled`, `onSponsorshipCreated`, `onSponsorshipEdited`, `onSponsorshipPendingCancellation`, `onSponsorshipPendingTierChange`, `onSponsorshipTierChanged` |
| `github:StarService` | `star` | `onStarCreated`, `onStarDeleted` |
| `github:StatusService` | `status` | `onStatus` |
| `github:SubIssuesService` | `sub_issues` | `onSubIssuesParentIssueAdded`, `onSubIssuesParentIssueRemoved`, `onSubIssuesSubIssueAdded`, `onSubIssuesSubIssueRemoved` |
| `github:TeamService` | `team` | `onTeamAddedToRepository`, `onTeamCreated`, `onTeamDeleted`, `onTeamEdited`, `onTeamRemovedFromRepository` |
| `github:TeamAddService` | `team_add` | `onTeamAdd` |
| `github:WatchService` | `watch` | `onWatchStarted` |
| `github:WorkflowDispatchService` | `workflow_dispatch` | `onWorkflowDispatch` |
| `github:WorkflowJobService` | `workflow_job` | `onWorkflowJobCompleted`, `onWorkflowJobInProgress`, `onWorkflowJobQueued`, `onWorkflowJobWaiting` |
| `github:WorkflowRunService` | `workflow_run` | `onWorkflowRunCompleted`, `onWorkflowRunInProgress`, `onWorkflowRunRequested` |

See the [GitHub trigger reference](product://connectors/catalog/developer-tools/github/triggers) for each channel's payload type and fields.

## Event handlers

When a GitHub Events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the event's payload as a typed record, such as `github:PushPayload` for `onPush`, with camelCase field names.

To handle several events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers GitHub as soon as a delivery passes verification, then runs the handler, so GitHub never waits on your logic. Errors are logged, not sent back to GitHub:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | GitHub sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onPush(github:PushPayload payload) returns error? {
    do {
        log:printInfo("Push received", ref = payload.ref);
    } on fail error err {
        log:printError("Failed to handle the push", err);
    }
}
```

</TabItem>
</Tabs>

## What's next

- [Kafka](kafka.md): consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md): listen to Salesforce Change Data Capture events
- [GitHub trigger reference](product://connectors/catalog/developer-tools/github/triggers): listener configuration, every callback and the payload types
- [GitHub setup guide](product://connectors/catalog/developer-tools/github/setup-guide#configuring-a-github-repository-webhook): add the webhook GitHub delivers events to
