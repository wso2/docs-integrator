---
title: Message Filter
description: "Implement the Message Filter pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Filter

Use a Message Filter so a component avoids receiving uninteresting messages: messages that match the condition continue through the flow, and all others are discarded. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html" label="Enterprise Integration Patterns Message Filter reference" />

In WSO2 Integrator, the filter is an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) with no else path. When the condition fails, the flow simply ends and the message goes no further.

## Example: Forwarding only high-priority tickets

This example receives support tickets and notifies the support channel only for priority 1 tickets. Lower-priority tickets are dropped by the filter, so the notification channel never receives them.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `Ticket` payload.
2. Add an HTTP client connection for the notification channel. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) with the condition `ticket.priority == 1` and no else branch.
4. Inside the **True** branch, post the ticket to the notification endpoint. Tickets that fail the condition are discarded.

The flow continues to the notification channel only when the ticket priority is 1; tickets that fail the condition simply end:

<PatternImage src="/img/eip-patterns/message_filter_flow.png" alt="Message Filter flow in the WSO2 Integrator visual designer" width={666} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type Ticket record {|
    string id;
    string url;
    string subject;
    1|2|3 priority;
|};

final http:Client notificationChannel = check new ("http://api.notification.channel.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post ticket(Ticket ticket) returns error? {
        if ticket.priority == 1 {
            http:Response response = check notificationChannel->/email/notify.post(ticket, targetType = http:Response);
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message filter sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_filter) on GitHub.
