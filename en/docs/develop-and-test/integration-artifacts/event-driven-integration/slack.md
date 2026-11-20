---
title: Slack
description: React to Slack workspace events such as messages, mentions, reactions and channel changes using pre-built event handlers.
keywords: [wso2 integrator, slack, events api, event integration, ballerina]
slug: /develop-and-test/integration-artifacts/event-driven-integration/slack
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Slack

:::warning
Slack event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

Slack event integrations receive events from the Slack Events API and run a handler for each workspace event. Use them to build bots that answer mentions, route messages to other systems, or track reactions and channel changes in real time. They use the `ballerinax/slack.trigger` package, which verifies every delivery with the app's signing secret before a handler runs.

## Creating a Slack events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Slack** under **Event Integration**.
3. In the **Slack Event Integration** form, fill in the following fields:

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/slack/step-creation-form.png: Slack Event Integration creation form -->

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The Slack events to handle, as a service type such as **slack:MessageService**. See [Event channels](#event-channels) for all options. | `slack:MessageService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a Slack listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `slackListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Signing Secret** | The **Signing Secret** of your Slack app. The listener verifies every request with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/slack/step-service-designer.png: Slack Service Designer view -->

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a Slack event integration with a `slack:MessageService`.

```ballerina
import ballerina/log;
import ballerinax/slack.trigger as slack;

configurable string signingSecret = ?;
configurable int port = 8090;

listener slack:Listener slackListener = new ({webhookSecret: signingSecret}, port);

service slack:MessageService on slackListener {

    remote function onMessage(slack:MessageEventWrapper payload) returns error? {
        slack:MessageEvent message = payload.event;
        log:printInfo("Message received", channel = message.'channel, user = message.user, text = message.text);
    }

    remote function onMessageMetadataDeleted(slack:GenericEventWrapper payload) returns error? {
    }

    remote function onMessageMetadataPosted(slack:GenericEventWrapper payload) returns error? {
    }

    remote function onMessageMetadataUpdated(slack:GenericEventWrapper payload) returns error? {
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point Slack at the listener's public URL. See the [Slack setup guide](product://connectors/catalog/communication/slack/setup-guide#configuring-slack-event-subscriptions).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **Slack Event Integration Configuration** panel.

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/slack/step-configuration.png: Slack listener configuration view -->

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `slackListener` |
| **Listener Config** | A `slack:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `slack:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener slack:Listener slackListener = new ({webhookSecret: signingSecret}, port);
```

`slack:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The **Signing Secret** of your Slack app. The listener verifies every request with it, and rejects every delivery while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one group of Slack events, the `event.type` values of the Events API. Subscribe your Slack app to the bot events your handlers need. The `message.*` subscriptions all deliver a `message` event to `onMessage`.

| Channel | Slack events | Handlers |
|---|---|---|
| `slack:AgentService` | `agent_session_stopped`, `agent_session_title_changed` | `onAgentSessionStopped`, `onAgentSessionTitleChanged` |
| `slack:AppService` | `app_mention`, `app_uninstalled`, `app_context_changed`, `app_deleted`, `app_home_opened`, `app_installed`, `app_requested`, `app_uninstalled_team` | `onAppMention`, `onAppUninstalled`, `onAppContextChanged`, `onAppDeleted`, `onAppHomeOpened`, `onAppInstalled`, `onAppRequested`, `onAppUninstalledTeam` |
| `slack:AssistantService` | `assistant_thread_context_changed`, `assistant_thread_started` | `onAssistantThreadContextChanged`, `onAssistantThreadStarted` |
| `slack:CallService` | `call_rejected` | `onCallRejected` |
| `slack:ChannelService` | `channel_archive`, `channel_created`, `channel_deleted`, `channel_history_changed`, `channel_left`, `channel_rename`, `channel_id_changed`, `channel_shared`, `channel_unshared` | `onChannelArchive`, `onChannelCreated`, `onChannelDeleted`, `onChannelHistoryChanged`, `onChannelLeft`, `onChannelRename`, `onChannelIdChanged`, `onChannelShared`, `onChannelUnshared` |
| `slack:ImService` | `im_close`, `im_created`, `im_history_changed`, `im_open` | `onImClose`, `onImCreated`, `onImHistoryChanged`, `onImOpen` |
| `slack:DndService` | `dnd_updated`, `dnd_updated_user` | `onDndUpdated`, `onDndUpdatedUser` |
| `slack:EmailDomainChangedService` | `email_domain_changed` | `onEmailDomainChanged` |
| `slack:EmojiChangedService` | `emoji_changed` | `onEmojiChanged` |
| `slack:EntityService` | `entity_comments_requested`, `entity_details_requested` | `onEntityCommentsRequested`, `onEntityDetailsRequested` |
| `slack:FileService` | `file_change`, `file_comment_deleted`, `file_created`, `file_deleted`, `file_public`, `file_shared`, `file_unshared` | `onFileChange`, `onFileCommentDeleted`, `onFileCreated`, `onFileDeleted`, `onFilePublic`, `onFileShared`, `onFileUnshared` |
| `slack:FunctionService` | `function_executed` | `onFunctionExecuted` |
| `slack:GridMigrationService` | `grid_migration_finished`, `grid_migration_started` | `onGridMigrationFinished`, `onGridMigrationStarted` |
| `slack:GroupService` | `group_close`, `group_history_changed`, `group_left`, `group_open`, `group_rename`, `group_deleted` | `onGroupClose`, `onGroupHistoryChanged`, `onGroupLeft`, `onGroupOpen`, `onGroupRename`, `onGroupDeleted` |
| `slack:InviteService` | `invite_requested` | `onInviteRequested` |
| `slack:LinkSharedService` | `link_shared` | `onLinkShared` |
| `slack:MemberService` | `member_joined_channel`, `member_left_channel` | `onMemberJoinedChannel`, `onMemberLeftChannel` |
| `slack:MessageService` | `message`, `message_metadata_deleted`, `message_metadata_posted`, `message_metadata_updated` | `onMessage`, `onMessageMetadataDeleted`, `onMessageMetadataPosted`, `onMessageMetadataUpdated` |
| `slack:PinService` | `pin_added`, `pin_removed` | `onPinAdded`, `onPinRemoved` |
| `slack:ReactionService` | `reaction_added`, `reaction_removed` | `onReactionAdded`, `onReactionRemoved` |
| `slack:SharedChannelService` | `shared_channel_invite_accepted`, `shared_channel_invite_approved`, `shared_channel_invite_declined`, `shared_channel_invite_received`, `shared_channel_invite_requested` | `onSharedChannelInviteAccepted`, `onSharedChannelInviteApproved`, `onSharedChannelInviteDeclined`, `onSharedChannelInviteReceived`, `onSharedChannelInviteRequested` |
| `slack:StarService` | `star_added`, `star_removed` | `onStarAdded`, `onStarRemoved` |
| `slack:TeamService` | `team_domain_change`, `team_join`, `team_rename`, `team_access_granted`, `team_access_revoked` | `onTeamDomainChange`, `onTeamJoin`, `onTeamRename`, `onTeamAccessGranted`, `onTeamAccessRevoked` |
| `slack:TokensRevokedService` | `tokens_revoked` | `onTokensRevoked` |
| `slack:UserService` | `user_huddle_changed`, `user_profile_changed`, `user_status_changed`, `user_connection`, `user_guest_status_changed` | `onUserHuddleChanged`, `onUserProfileChanged`, `onUserStatusChanged`, `onUserConnection`, `onUserGuestStatusChanged` |
| `slack:UserChangeService` | `user_change` | `onUserChange` |
| `slack:SubteamService` | `subteam_created`, `subteam_members_changed`, `subteam_self_added`, `subteam_self_removed`, `subteam_updated` | `onSubteamCreated`, `onSubteamMembersChanged`, `onSubteamSelfAdded`, `onSubteamSelfRemoved`, `onSubteamUpdated` |

See the [Slack trigger reference](product://connectors/catalog/communication/slack/triggers) for each channel's payload type and fields.

## Event handlers

When a Slack events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the Events API envelope as a typed record, such as `slack:MessageEventWrapper` for `onMessage`, with the event in its `event` field.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers Slack as soon as a delivery passes verification, then runs the handler, so Slack never waits on your logic. Errors are logged, not sent back to Slack:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | Slack sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onMessage(slack:MessageEventWrapper payload) returns error? {
    do {
        slack:MessageEvent message = payload.event;
        log:printInfo("Message received", channel = message.'channel, user = message.user, text = message.text);
    } on fail error err {
        log:printError("Failed to handle the event", err);
    }
}
```

</TabItem>
</Tabs>

## What's next

- [Kafka](kafka.md): consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md): listen to Salesforce Change Data Capture events
- [Slack trigger reference](product://connectors/catalog/communication/slack/triggers): listener configuration, every callback and the payload types
- [Slack setup guide](product://connectors/catalog/communication/slack/setup-guide#configuring-slack-event-subscriptions): point Slack at your listener
