---
title: Message
description: "Implement the Message pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message

A Message packages a piece of information as a data record so it can be transmitted through a message channel from one application to another. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html" label="Enterprise Integration Patterns Message reference" />

In WSO2 Integrator, a message is modeled as a Ballerina record. The record type defines the structure of the data both applications agree on, and a client connection transmits the record over the channel.

## Example: Updating a survey

This example builds a message that carries the details of a customer satisfaction survey update and sends it to the SurveyMonkey API. The `SurveyUpdateRequest` record defines the message structure, and the HTTP client transmits it as a `PUT` request.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Define the message structure as a record type with the [Type editor](../../develop/understand-ide/editors/type-editor.md). Here, `SurveyUpdateRequest` names the fields the two applications agree on, with a type for each.
2. Create an [automation](../../develop/integration-artifacts/automation.md#creating-an-automation) to run the flow.
3. Add an HTTP client connection that points to the SurveyMonkey API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
4. In the flow, declare a variable of type `SurveyUpdateRequest` and assign the survey details. This record instance is the message.
5. Add the HTTP `put` action on the connection to transmit the message to the survey resource path.

Defining the message is the heart of this pattern. The `SurveyUpdateRequest` record fixes the shape both applications rely on (`title`, `from_template_id`, `footer`, `folder_id`, and `theme_id`), each with its type:

<PatternImage src="/img/eip-patterns/message_types.png" alt="SurveyUpdateRequest message type in the WSO2 Integrator type diagram" width={355} />

With the message type defined, the flow assigns its values and sends it to the SurveyMonkey channel as a single PUT request:

<PatternImage src="/img/eip-patterns/message_flow.png" alt="Message flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type SurveyUpdateRequest record {
    string title;
    string from_template_id;
    boolean footer;
    string folder_id;
    int theme_id;
};

final http:Client surveyMonkey = check new ("http://api.surveymonkey.com/v3/surveys");
// docs-fold-end

public function main() returns error? {
    SurveyUpdateRequest message = {
        title: "Customer Satisfaction Survey 2025",
        from_template_id: "customer_satisfaction_template_7",
        footer: true,
        folder_id: "customer_satisfaction",
        theme_id: 789
    };
    http:Response response = check surveyMonkey->/v3/surveys/["1267"].put(message, targetType = http:Response);
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message) on GitHub.
