---
title: Triggers
description: "Reference for the Slack Events API listener and service callbacks: receive message, mention, reaction, channel and other workspace events in Ballerina integrations."
keywords: [slack, events api, webhook listener, event handler, ballerina]
connector: true
connector_name: "slack"
---

# Triggers

The `ballerinax/slack.trigger` package receives events from the Slack Events API. When something happens in a workspace your app is installed in, such as a message, a mention or a reaction, Slack sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload.

This reference covers `ballerinax/slack.trigger` version 1.0.0. The following components work together:

| Component | Role |
|-----------|------|
| `slack:Listener` | Receives webhook requests from Slack, verifies each one, and calls the attached service for its event. |
| `slack:ListenerConfig` | Holds what the listener verifies deliveries with, the app's signing secret. |
| Service types | 27 service types, such as `slack:MessageService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `slack:MessageEventWrapper`, passed to its callback. |

To call the Slack API from your integration, use the `ballerinax/slack` connector. See the [Action Reference](actions.md).

## Error handling

The listener acknowledges a delivery to Slack as soon as it is verified, and then calls your callback, so Slack never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `slack:Listener` exposes an HTTP endpoint for Slack to deliver webhooks to. Set its public URL as the **Request URL** of your Slack app's event subscriptions. See the [Setup Guide](setup-guide.md#configuring-slack-event-subscriptions).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the Slack webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The **Signing Secret** of your Slack app. The listener verifies every request with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

Slack signs each request with the app's signing secret. `X-Slack-Signature` holds `v0=` followed by the hex HMAC-SHA256 of `v0:<X-Slack-Request-Timestamp>:<request body>`. The listener computes the same value with `webhookSecret` and compares the two in constant time. It also rejects a request whose `X-Slack-Request-Timestamp` is more than five minutes from the listener's clock, so a captured request can't be replayed. A rejected request gets `401 Unauthorized`.

When you set the **Request URL**, Slack sends a `url_verification` request with a `challenge`. The listener verifies it and answers with the challenge, so the URL shows **Verified** while your integration is running.

The listener calls the callback for the `event.type` of each Events API request. The `message.channels`, `message.groups`, `message.im`, `message.mpim` and `message.app_home` subscriptions all deliver a `message` event, so they all arrive at `MessageService.onMessage`; `event.channelType` tells them apart.

### Initializing the listener

```ballerina
import ballerinax/slack.trigger as slack;

configurable string signingSecret = ?;
configurable int port = 8090;

listener slack:Listener slackListener = new ({webhookSecret: signingSecret}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<your Slack app's signing secret>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 84 callbacks in all.

A service can also be attached on a path of its own, such as `service slack:MessageService /slack on slackListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(slack:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `slack:AppService` | `onAppMention`, `onAppUninstalled`, `onAppContextChanged`, `onAppDeleted`, `onAppHomeOpened`, `onAppInstalled`, `onAppRequested`, `onAppUninstalledTeam` | <code>slack:GenericEventWrapper</code> |
| `slack:ChannelService` | `onChannelArchive`, `onChannelCreated`, `onChannelDeleted`, `onChannelHistoryChanged`, `onChannelLeft`, `onChannelRename`, `onChannelIdChanged`, `onChannelShared`, `onChannelUnshared` | <code>slack:GenericEventWrapper</code> |
| `slack:DndService` | `onDndUpdated`, `onDndUpdatedUser` | <code>slack:GenericEventWrapper</code> |
| `slack:EmailDomainChangedService` | `onEmailDomainChanged` | <code>slack:GenericEventWrapper</code> |
| `slack:EmojiChangedService` | `onEmojiChanged` | <code>slack:GenericEventWrapper</code> |
| `slack:FileService` | `onFileChange`, `onFileCommentDeleted`, `onFileCreated`, `onFileDeleted`, `onFilePublic`, `onFileShared`, `onFileUnshared` | <code>slack:GenericEventWrapper</code> |
| `slack:GridMigrationService` | `onGridMigrationFinished`, `onGridMigrationStarted` | <code>slack:GenericEventWrapper</code> |
| `slack:GroupService` | `onGroupClose`, `onGroupHistoryChanged`, `onGroupLeft`, `onGroupOpen`, `onGroupRename`, `onGroupDeleted` | <code>slack:GenericEventWrapper</code> |
| `slack:ImService` | `onImClose`, `onImCreated`, `onImHistoryChanged`, `onImOpen` | <code>slack:GenericEventWrapper</code> |
| `slack:LinkSharedService` | `onLinkShared` | <code>slack:GenericEventWrapper</code> |
| `slack:MemberService` | `onMemberJoinedChannel`, `onMemberLeftChannel` | <code>slack:GenericEventWrapper</code> |
| `slack:MessageService` | `onMessage`, `onMessageMetadataDeleted`, `onMessageMetadataPosted`, `onMessageMetadataUpdated` | <code>slack:MessageEventWrapper</code>, <code>slack:GenericEventWrapper</code> |
| `slack:PinService` | `onPinAdded`, `onPinRemoved` | <code>slack:GenericEventWrapper</code> |
| `slack:ReactionService` | `onReactionAdded`, `onReactionRemoved` | <code>slack:GenericEventWrapper</code> |
| `slack:StarService` | `onStarAdded`, `onStarRemoved` | <code>slack:GenericEventWrapper</code> |
| `slack:SubteamService` | `onSubteamCreated`, `onSubteamMembersChanged`, `onSubteamSelfAdded`, `onSubteamSelfRemoved`, `onSubteamUpdated` | <code>slack:GenericEventWrapper</code> |
| `slack:TeamService` | `onTeamDomainChange`, `onTeamJoin`, `onTeamRename`, `onTeamAccessGranted`, `onTeamAccessRevoked` | <code>slack:GenericEventWrapper</code> |
| `slack:TokensRevokedService` | `onTokensRevoked` | <code>slack:GenericEventWrapper</code> |
| `slack:UserChangeService` | `onUserChange` | <code>slack:GenericEventWrapper</code> |
| `slack:AssistantService` | `onAssistantThreadContextChanged`, `onAssistantThreadStarted` | <code>slack:GenericEventWrapper</code> |
| `slack:CallService` | `onCallRejected` | <code>slack:GenericEventWrapper</code> |
| `slack:EntityService` | `onEntityCommentsRequested`, `onEntityDetailsRequested` | <code>slack:GenericEventWrapper</code> |
| `slack:FunctionService` | `onFunctionExecuted` | <code>slack:GenericEventWrapper</code> |
| `slack:InviteService` | `onInviteRequested` | <code>slack:GenericEventWrapper</code> |
| `slack:SharedChannelService` | `onSharedChannelInviteAccepted`, `onSharedChannelInviteApproved`, `onSharedChannelInviteDeclined`, `onSharedChannelInviteReceived`, `onSharedChannelInviteRequested` | <code>slack:GenericEventWrapper</code> |
| `slack:UserService` | `onUserHuddleChanged`, `onUserProfileChanged`, `onUserStatusChanged`, `onUserConnection`, `onUserGuestStatusChanged` | <code>slack:GenericEventWrapper</code> |
| `slack:AgentService` | `onAgentSessionStopped`, `onAgentSessionTitleChanged` | <code>slack:GenericEventWrapper</code> |

### Full usage example

This is the [`channel-message-logger`](https://github.com/ballerina-platform/module-ballerinax-slack.trigger/tree/main/examples/channel-message-logger) example from the package:

```ballerina
import ballerina/log;
import ballerinax/slack.trigger as slack;

configurable slack:ListenerConfig config = {
    webhookSecret: "xxxxxx"
};

listener slack:Listener slackListener = new (config, 8090);

// Logs every new message in the conversations the app is in, skipping edits, deletions and other subtypes.
service slack:MessageService on slackListener {

    remote function onMessage(slack:MessageEventWrapper payload) returns error? {
        slack:MessageEvent message = payload.event;
        if message.subtype is string {
            log:printDebug("Skipped message subtype", subtype = message.subtype);
            return;
        }
        log:printInfo("Message received", channel = message.'channel, channelType = message.channelType,
                user = message.user, text = message.text, inThread = message.threadTs is string);
    }

    remote function onMessageMetadataDeleted(slack:GenericEventWrapper payload) returns error? {
    }

    remote function onMessageMetadataPosted(slack:GenericEventWrapper payload) returns error? {
    }

    remote function onMessageMetadataUpdated(slack:GenericEventWrapper payload) returns error? {
    }
}
```

## Event payload types

Each callback receives the Events API envelope: `MessageEventWrapper` for `onMessage`, and `GenericEventWrapper` for most other events, with the event itself in `event`. The types used by the example above:

### `MessageEventWrapper`

| Field | Type | Description |
|-------|------|-------------|
| `apiAppId` | <code>string</code> | The unique identifier your installed Slack application. |
| `event` | <code>MessageEvent</code> | A message posted to a channel, private channel, DM, group DM or the app's home. `channel_type` tells them apart (`channel`, `group`, `im`, `mpim`, `app_home`), and `subtype` marks special messages such as `message_changed`, `message_deleted` or `bot_message`. |
| `eventId` | <code>string</code> | A unique identifier for this specific event, globally unique across all workspaces. |
| `eventTime` | <code>int</code> | The epoch timestamp in seconds indicating when this event was dispatched. |
| `teamId` | <code>string</code> | The unique identifier of the workspace where the event occurred. |
| `token` | <code>string</code> | A verification token to validate the event originated from Slack. |
| `type` | <code>string</code> | Indicates which kind of event dispatch this is, usually `event_callback`. |
| `authorizations` | <code>EventAuthorization[]</code> | The installation of your app that the event is visible to. Optional. |
| `eventContext` | <code>string</code> | An identifier for this specific event, used with apps.event.authorizations.list. Optional. |
| `isExtSharedChannel` | <code>boolean</code> | Whether the event happened in a channel shared with another organization. Optional. |
| `contextTeamId` | <code>string</code> | The workspace the event happened in. Optional. |
| `contextEnterpriseId` | <code>string?</code> | The organization the event happened in, or null outside Enterprise Grid. Optional. |
| `authedUsers` | <code>string[]</code> | Users the event is visible to. Deprecated; Slack sends `authorizations` now. Optional. |

### `MessageEvent`

| Field | Type | Description |
|-------|------|-------------|
| `type` | <code>string</code> | Always `message`. |
| `subtype` | <code>string</code> | The kind of special message, absent for an ordinary message. Optional. |
| `channel` | <code>string</code> | The ID of the conversation the message was posted in. |
| `channelType` | <code>string</code> | The type of conversation, `channel`, `group`, `im`, `mpim` or `app_home`. Optional. |
| `user` | <code>string</code> | The ID of the user who sent the message. Absent for some subtypes. Optional. |
| `botId` | <code>string</code> | The ID of the bot that sent the message, for bot messages. Optional. |
| `text` | <code>string</code> | The text of the message. Optional. |
| `ts` | <code>string</code> | The message's unique timestamp within the conversation. |
| `threadTs` | <code>string</code> | The timestamp of the thread's parent message, for a message in a thread. Optional. |
| `eventTs` | <code>string</code> | When the event was dispatched. Optional. |
| `hidden` | <code>boolean</code> | Whether the message is hidden from the conversation, as for some subtypes. Optional. |
| `deletedTs` | <code>string</code> | The timestamp of the deleted message, for `message_deleted`. Optional. |
| `edited` | <code>Edited</code> | Who edited the message and when, for an edited message. Optional. |
| `message` | <code>map&lt;json&gt;</code> | The message after the change, for `message_changed`. Optional. |
| `previousMessage` | <code>map&lt;json&gt;</code> | The message before the change, for `message_changed` and `message_deleted`. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-slack-event-subscriptions): point Slack at your listener.
- [Example](example.md#slack-trigger-example): build a Slack trigger integration in WSO2 Integrator.
- [Action Reference](actions.md): call the Slack API with the `ballerinax/slack` connector.
