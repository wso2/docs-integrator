---
title: Setup Guide
---

# Setup Guide

To use this connector you need a HubSpot Service Key (or access token) authorized with the `analytics.behavioral_events.send` scope, and at least one custom event definition already created in your HubSpot account.

## Prerequisites

- A HubSpot **Professional** or **Enterprise** account (required to access the `analytics.behavioral_events.send` scope), or a [HubSpot developer test account](https://developers.hubspot.com/get-started) for testing

## Create a service key

HubSpot Service Keys are the recommended way to authorize single-account API access. To create one:

1. Log in to your [HubSpot account](https://app.hubspot.com/).
2. Go to **Settings** > **Account Setup** > **Integrations** > **Service Keys**, and click **Create service key**.
3. Give it a name (e.g. `hubspot-events-completions`), then click **Add new scope** and search for `behavioral_events.send`. Select `analytics.behavioral_events.send`.

<ThemedImage
    alt="Selecting the analytics.behavioral_events.send scope"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-key-select-scope.jpg'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-key-select-scope.jpg'),
    }}
/>

4. Click **Create**. Copy the generated **service key** — this is the bearer token the connector uses to authenticate. Treat it like a password; it is only shown in full once.

<ThemedImage
    alt="Service key created with scopes assigned"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-key-created.jpg'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-key-created.jpg'),
    }}
/>

All your service keys are listed under **Service Keys** for future reference.

<ThemedImage
    alt="Service Keys list page"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-keys-list.jpg'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.events.completions/service-keys-list.jpg'),
    }}
/>

Service Keys are currently in **public beta** and are subject to change. They are HubSpot's recommended replacement for legacy Private App tokens for single-account access.

## Create a custom event definition

The Send Event Completions API reports occurrences of events that **already exist** in your account — it does not create the event definition itself. Before sending any events, create one in HubSpot:

1. Go to **Reports** > **Analytics Tools** > **Custom Events**, then **Create an event** > **Create custom event**.
2. Choose **Send via API** as the setup type, since this connector reports completions programmatically.
3. Fill in the event name and any properties you plan to send (e.g. `amount`), link it to the **Contacts** object, and finish the wizard.
4. Note the **internal tracking ID** shown on the last step (format `pe<hub-id>_<event-name>`, e.g. `pe12345678_purchase_completed`) — this is the value to use as `eventName` when sending event occurrences.

One custom event definition can be reused across many `sendEvent` and `sendEventBatch` calls. You only need to create it once per event type.

The UI wizard above is available on both **Professional** and **Enterprise** accounts. HubSpot's event-definitions API (for creating event definitions programmatically, as opposed to reporting occurrences with this connector) requires an **Enterprise** subscription and the `behavioral_events.event_definitions.read_write` scope — use the UI wizard on a Professional account instead.

## Next steps

- [Action Reference](action-reference.md) - Available operations
