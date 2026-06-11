---
title: Splitter
description: "Implement the Splitter pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Splitter

Use a Splitter to break a message that contains multiple elements into a series of individual messages, so each element can be processed on its own. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html" label="Enterprise Integration Patterns Splitter reference" />

In WSO2 Integrator, the splitter is a [Foreach node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) over the repeating elements of the message. Each iteration produces and processes one individual message.

## Example: Sending per-attendee event reminders

This example receives a single reminder request that contains multiple events, each with multiple attendees. The flow splits the composite message twice — once per event and once per attendee — and sends each attendee an individual SMS reminder through the Twilio API.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `ReminderRequest` payload.
2. Add an HTTP client connection for the Twilio API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. Add a [Foreach node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#foreach) over `request.events`, and a nested **Foreach** over `event.attendees`.
4. Inside the inner loop, call the `sendReminder` function, which builds the personalized message for one attendee and posts it to the Twilio messages endpoint.

Nested **Foreach** nodes split the request into one message per event and then per attendee, sending each attendee an individual reminder:

<PatternImage src="/img/eip-patterns/splitter_flow.png" alt="Splitter flow in the WSO2 Integrator visual designer" width={599} />

The [type diagram](../../develop/understand-ide/editors/type-diagram-editor.md) shows the composite message the splitter breaks down: a `ReminderRequest` holds many `Event` records, and each `Event` holds many `Attendee` records:

<PatternImage src="/img/eip-patterns/splitter_types.png" alt="Splitter type diagram in WSO2 Integrator" width={760} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/mime;
import ballerina/url;

type ReminderRequest record {
    string date;
    Event[] events;
};

type Event record {|
    string eventName;
    Attendee[] attendees;
|};

type Attendee record {|
    string name;
    string number;
|};

final http:Client twilio = check new ("http://api.twilio.com.balmock.io");

function sendReminder(Attendee attendee, string eventName, string date) returns error? {
    string body = string `Hi ${attendee.name}, looking forward to meet you at the ${eventName} on ${date}`;
    string payload = "From=" + check url:encode("+15005550006", "utf-8") +
        "&To=" + check url:encode(attendee.number, "utf-8") +
        "&Body=" + check url:encode(body, "utf-8");
    http:Request twilioReq = new http:Request();
    () var1 = twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);
    http:Response response = check twilio->/["2010-04-01"]/Accounts/["VAC1829a53d52f41b4b2b1cc003c0026aa8"]/Messages\.json.post(twilioReq, targetType = http:Response);
}
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post reminders(ReminderRequest request) returns error? {
        foreach Event event in request.events {
            foreach Attendee attendee in event.attendees {
                check sendReminder(attendee, event.eventName, request.date);
            }
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [splitter sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/splitter) on GitHub.
