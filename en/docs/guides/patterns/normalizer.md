---
title: Normalizer
description: "Implement the Normalizer pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Normalizer

Use a Normalizer to process messages that are semantically equivalent but arrive in different formats. The normalizer routes each format to the right translator so the receiver always gets one common format. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Normalizer.html" label="Enterprise Integration Patterns Normalizer reference" />

In WSO2 Integrator, the normalizer combines format detection — a union-typed payload and a type check — with a translator function that builds the common message format from whichever input arrived.

## Example: Normalizing JSON and XML support tickets

This example accepts support tickets as either JSON or XML. The service detects the incoming format, extracts the subject and comment from the matching structure, and calls the `normalize` function to build the single ticket format that the Zendesk API expects.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts a `json|xml` payload.
2. Add an HTTP client connection for the Zendesk API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) that checks whether the payload is JSON.
4. In each branch, extract the subject and comment from the format at hand and call the `normalize` function to build the common ticket structure.
5. Post the normalized ticket to the Zendesk tickets endpoint and return the ticket URL.

The flow branches on the incoming format — JSON or XML — and both branches call the same `normalize` function to produce one common ticket format:

<PatternImage src="/img/eip-patterns/normalizer_flow.png" alt="Normalizer flow in the WSO2 Integrator visual designer" width={760} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type ZendeskResponse record {
    record {|
        string url;
        int id;
        string subject;
    |} ticket;
};

final http:Client zendeskClient = check new ("http://api.zendesk.com.balmock.io");
// docs-fold-end

function normalize(string subject, string comment) returns json {
    return {
        ticket: {
            subject,
            comment: {
                body: comment
            }
        }
    };
}

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post ticket(@http:Payload json|xml request) returns string|error {
        if request is json {
            json normalizedRequest = normalize(check request.subject, check request.comment);
            ZendeskResponse zendeskResponse = check zendeskClient->/api/v2/tickets.post(normalizedRequest);
            return zendeskResponse.ticket.url;
        } else {
            json normalizedRequest = normalize((request/<subject>).data(), (request/<comment>).data());
            ZendeskResponse zendeskResponse = check zendeskClient->/api/v2/tickets.post(normalizedRequest);
            return zendeskResponse.ticket.url;
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [normalizer sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/normalizer) on GitHub.
