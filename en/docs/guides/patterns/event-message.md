---
title: Event Message
description: "Implement the Event Message pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Event Message

Use an Event Message to transmit a notification about something that happened in one application to other interested applications. The receiver reacts to the event; it does not return a result to the sender. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventMessage.html" label="Enterprise Integration Patterns Event Message reference" />

In WSO2 Integrator, an event message is built from the details of the occurrence and dispatched over a client connection to the notification channel. The flow does not wait on a business response.

## Example: Notifying incidents over SMS

This example receives an incident report and transmits it as an event message — an SMS notification sent through the Twilio API. The message body describes what happened and when, and the subscriber's phone number identifies the interested receiver.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `IncidentRequest` payload.
2. Add an HTTP client connection for the Twilio API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, build the event text from the incident description, date, and time.
4. URL-encode the sender, recipient, and body fields, set them as a form-encoded payload, and post the event message to the Twilio messages endpoint.

The flow builds the incident notification and sends it as an SMS event through Twilio:

<PatternImage src="/img/eip-patterns/event_message_flow.png" alt="Event Message flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/mime;
import ballerina/url;

type IncidentRequest record {
    string phoneNo;
    Incident incident;
};

type Incident record {|
    string description;
    string date;
    string time;
|};

final http:Client twilio = check new ("http://api.twilio.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post incidents(IncidentRequest req) returns error? {
        string body = string `Incident ${req.incident.description} reported: ${req.incident.date} at ${req.incident.time}.`;
        http:Request twilioReq = new http:Request();
        string payload = "From=" + check url:encode("+15005550006", "utf-8") +
            "&To=" + check url:encode(req.phoneNo, "utf-8") +
            "&Body=" + check url:encode(body, "utf-8");
        () var1 = twilioReq.setTextPayload(payload, mime:APPLICATION_FORM_URLENCODED);
        http:Response response = check twilio->/["2010-04-01"]/Accounts/["VBC1849a56d52g41s4b2b2cc004c0027aa8"]/Messages\.json.post(twilioReq, targetType = http:Response);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [event message sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/event_message) on GitHub.
