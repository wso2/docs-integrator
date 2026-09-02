---
title: Aggregator
description: "Implement the Aggregator pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Aggregator

Use an Aggregator to collect individual but related messages and publish a single combined message once the set is complete. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html" label="Enterprise Integration Patterns Aggregator reference" />

In WSO2 Integrator, the aggregator keeps the partial messages in a map keyed by a correlation identifier, appends each arriving message to its group, and sends the combined message when the completeness condition is met.

## Example: Combining multi-part survey responses

This example collects survey form submissions that arrive one section at a time. Each submission is correlated by the `userId` header and stored with the user's earlier sections. When all three sections have arrived, the aggregator submits the complete survey to the survey API and clears the stored parts.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the survey section payload and the `userId` correlation header.
2. Add an HTTP client connection for the survey submission API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, look up the user's partial submissions in the aggregation map by `userId`.
4. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if): when no entry exists, store the first section; otherwise append the new section.
5. When the stored sections reach the completeness condition (three sections), post the combined survey to the submission endpoint and remove the entry from the map.

In the flow, the **If** node checks whether this is the user's first survey section; once three sections have accumulated, the combined survey is posted and the stored parts are cleared:

<PatternImage src="/img/eip-patterns/aggregator_flow.png" alt="Aggregator flow in the WSO2 Integrator visual designer" width={760} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

final http:Client formSubmitClient = check new ("http://api.surveyme.com.balmock.io");
// docs-fold-end

map<json[]> partialSurveys = {};

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post survey/[string id](@http:Header string userId, @http:Payload json formData) returns error? {
        json[]|() surveyData = partialSurveys[userId];
        if surveyData == () {
            json[] newSurvey = [formData];
            partialSurveys[userId] = newSurvey;
        } else {
            () var1 = surveyData.push(formData);
            if surveyData.length() == 3 {
                http:Response response = check formSubmitClient->/survey/[id]/submit.post({userId: surveyData}, targetType = http:Response);
                json[] remove = partialSurveys.remove(userId);
            }
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [aggregator sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/aggregator) on GitHub.
