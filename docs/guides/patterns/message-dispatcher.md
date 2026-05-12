---
title: Message Dispatcher
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Dispatcher

Use the Message Dispatcher pattern to coordinate which performer receives each message when several equivalent performers can process the same request. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageDispatcher.html" label="Enterprise Integration Patterns Message Dispatcher reference" />

The pattern is implemented at the point where the integration receives a message and must choose one processing endpoint. Keep the dispatch state close to the entry point, update it before the outbound call, and send the message to the selected performer through a connector.

## Stateful round-robin dispatch

Use stateful round-robin dispatch when each incoming message should be sent to the next processor in a fixed set. Store the current processor index in the service, update it with a `lock`, and call the selected processor through an [HTTP client connection](/docs/connectors/catalog/built-in/http/action-reference#client). The `lock` keeps the index update consistent when multiple requests arrive at the same time. For constructs that do not have a full visual representation, use [Ballerina Pro-Code](/docs/develop/design-logic/ballerina-pro-code) or the collapsed code block that appears in the [Visual Flow Designer](/docs/develop/design-logic/visual-flow-designer#bidirectional-sync).

1. Create an [HTTP service](/docs/develop/integration-artifacts/service/http#creating-an-http-service) for the dispatcher entry point.
2. Add a `GET` resource, such as `/process`, and define a query parameter that carries the message reference, such as `resourceUrl`. See [resource inputs](/docs/develop/integration-artifacts/service/http#defining-inputs).
3. Add the outbound processor [HTTP connection](/docs/develop/design-logic/managing-connections#creating-a-connection). Configure its base URL with a [configurable variable](/docs/develop/design-logic/configuration-management#configurable-variables).
4. Add a service-level variable named `nextProcessor` with type `int` and default value `0`.
5. In the resource flow, add the processor selection logic as a Ballerina code block: read `nextProcessor`, advance it inside a `lock`, and store the selected processor ID.
6. Add the HTTP connector call that includes the selected processor ID in the request path and passes the message reference as a query parameter.
7. Return the processor response from the resource function.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

configurable string processorEndpoint = ?;

type ProcessingResponse record {|
    string[] lines;
    int lineCount;
    string sourceUrl;
|};

final http:Client processorClient = check new (processorEndpoint);
final readonly & string[] processorIds = ["processor1", "processor2", "processor3"];
// docs-fold-end

service / on new http:Listener(8080) {
    int nextProcessor = 0;

    isolated resource function get process(string resourceUrl)
            returns ProcessingResponse|error {
        int currentProcessor;
        lock {
            currentProcessor = self.nextProcessor;
            self.nextProcessor = currentProcessor == processorIds.length() - 1
                ? 0
                : currentProcessor + 1;
        }

        string processorId = processorIds[currentProcessor];
        return check processorClient->/[processorId]/process(resourceUrl = resourceUrl);
    }
}
```
