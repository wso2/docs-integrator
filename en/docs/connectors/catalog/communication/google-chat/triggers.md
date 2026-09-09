---
title: Triggers
description: "Reference for the Google Chat webhook listener and service callbacks: configure message, card click, and other interaction event handlers in Ballerina integrations."
keywords: [google chat, webhook listener, chat api, event handler, ballerina]
connector: true
connector_name: "googleapis.chat"
---

# Triggers

The `ballerinax/googleapis.chat` package supports event-driven integration through direct HTTP delivery of Google Chat interaction events. There's no separate webhook relay. When a user messages, adds, or interacts with your Chat app, the listener receives the event and dispatches it to the matching service callback automatically.

Components that work together:

| Component | Role |
|-----------|------|
| `chat:Listener` | Exposes the HTTP endpoint, verifies the Google-signed bearer token, and dispatches incoming events to an attached `ChatService`. |
| `chat:ChatService` | Defines the event-type callbacks, such as `onMessage`, `onCardClicked`, and `onAppHome`. Requires a `@chat:ServiceConfig` annotation. |
| `chat:MessageEvent` | The event payload passed to `onMessage`, with `message` guaranteed non-optional. |
| `chat:MessageCaller`, `chat:CardClickedCaller`, `chat:AppHomeCaller`, `chat:SubmitFormCaller` | Event-specific callers injected into handlers, pre-configured with the event's space context, used to respond or call the Chat API asynchronously. |

For action-based operations, see the [Action Reference](actions.md).

## Error handling

Each service callback returns `error?`. If a callback returns an error, the listener logs the failure.

## Listener

The `chat:Listener` receives interaction events directly from Google Chat over HTTP and routes them to the attached service. It also builds an internal Chat API client, used by the injected callers, from the `auth` configuration.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `int\|http:Listener` | The port or HTTP listener to listen on. Defaults to port `8000`. |
| `ListenerConfig` | Auth credentials for the internal Chat API client, plus optional inbound HTTP listener settings. |

`chat:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `auth` | <code>ServiceAccountAuthConfig&#124;OAuth2Config&#124;http:BearerTokenConfig</code> | Required | Authentication for the internal Chat API client. |
| `httpListenerConfig` | `http:ListenerConfiguration` | `{}` | Optional inbound HTTP listener settings. |

### Initializing the listener

```ballerina
import ballerinax/googleapis.chat;

configurable chat:ServiceAccountFileConfig serviceAccountAuth = ?;

listener chat:Listener chatListener = new (8000, {
    auth: serviceAccountAuth
});
```

## Service

A Google Chat trigger service is a Ballerina service attached to a `chat:Listener`, implementing `chat:ChatService`, with a required `@chat:ServiceConfig` annotation that declares the bearer-token audience.

```ballerina
@chat:ServiceConfig {
    endpointUrl: "https://my-app.example.com"
}
service chat:ChatService on chatListener {
    // ...
}
```

Use `projectNumber` instead of `endpointUrl` if your Chat app's **Authentication audience** is set to **Project Number**. The value must match your Chat app's configuration exactly. The listener validates the `aud` claim of every incoming bearer token against it, and attaching a service without this annotation fails.

### Callback signatures

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(chat:MessageEvent event, chat:MessageCaller caller) returns error?` | Invoked when a user sends a message, @mentions the app, or invokes a slash command. |
| `onAddedToSpace` | `remote function onAddedToSpace(chat:ChatEvent event, chat:MessageCaller caller) returns error?` | Invoked when the app is added to a space. |
| `onRemovedFromSpace` | `remote function onRemovedFromSpace(chat:ChatEvent event) returns error?` | Invoked when the app is removed from a space. No caller, since the app can no longer respond. |
| `onCardClicked` | `remote function onCardClicked(chat:ChatEvent event, chat:CardClickedCaller caller) returns error?` | Invoked when a user clicks a button or interactive element on a card. |
| `onWidgetUpdated` | `remote function onWidgetUpdated(chat:ChatEvent event, chat:WidgetUpdatedCaller caller) returns error?` | Invoked when a widget requests an autocomplete or similar update. |
| `onAppCommand` | `remote function onAppCommand(chat:ChatEvent event, chat:MessageCaller caller) returns error?` | Invoked when a user invokes a Chat app command. |
| `onAppHome` | `remote function onAppHome(chat:ChatEvent event, chat:AppHomeCaller caller) returns error?` | Invoked when a user opens the app's home page. |
| `onSubmitForm` | `remote function onSubmitForm(chat:ChatEvent event, chat:SubmitFormCaller caller) returns error?` | Invoked when a user submits a dialog or form. |

:::note
The native dispatcher inspects each declared remote function's signature at runtime to determine which event-specific caller to inject alongside the event.
:::

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/googleapis.chat;

configurable chat:ServiceAccountFileConfig serviceAccountAuth = ?;
configurable string endpointUrl = ?;

listener chat:Listener chatListener = new (8000, {auth: serviceAccountAuth});

@chat:ServiceConfig {
    endpointUrl: endpointUrl
}
service chat:ChatService on chatListener {

    remote function onMessage(chat:MessageEvent event, chat:MessageCaller caller) returns error? {
        string text = event.message.text ?: "";
        log:printInfo("Google Chat message received", text = text);
        check caller->respond({text: "Echo: " + text});
    }
}
```

## Event payload types

### `ChatEvent`

The base Google Chat app interaction event.

| Field | Type | Description |
|-------|------|-------------|
| `type` | `EventType` | The type of interaction event. |
| `eventTime` | `string?` | When the event occurred (RFC 3339 timestamp). |
| `message` | `Message?` | The message that triggered the event, for `MESSAGE`, `ADDED_TO_SPACE`, and `CARD_CLICKED` events. |
| `user` | `User?` | The user that triggered the interaction. |
| `space` | `Space?` | The space where the interaction occurred. |
| `action` | `FormAction?` | The form action data, for `CARD_CLICKED` and `SUBMIT_FORM` events. |
| `common` | `CommonEventObject?` | Information about the user's client (locale, platform, form inputs). |

### `MessageEvent`

A specialization of `ChatEvent` with `message` guaranteed non-optional. Used as the parameter type for `onMessage` to avoid nil-check operators.

| Field | Type | Description |
|-------|------|-------------|
| `message` | `Message` | The message that triggered the event (always present for `MESSAGE` events). |

## What's next

- [Action Reference](actions.md): manage spaces, messages, and members using the `Client`.
- [Example](example.md): complete example integrations for the Google Chat connector and trigger.
- [Setup Guide](setup-guide.md): create a GCP project and configure the Chat app.
