---
sidebar_position: 2
title: "Build a Sentiment Analyzer"
description: Build your first AI integration. An HTTP service that uses a direct LLM call to classify customer reviews.
keywords: [wso2 integrator, ai, llm, direct llm call, sentiment analysis, quick start, ballerina ai]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build a Sentiment Analyzer

**Time:** Under 10 minutes | **What you'll build:** An HTTP service that listens on `POST /analyze`, sends a customer review to an LLM, and returns the sentiment (`POSITIVE`, `NEGATIVE`, or `NEUTRAL`) along with a confidence score.

A direct LLM call is the simplest way to use AI in an integration: you send a prompt, the model returns a value, and Ballerina enforces the return type. This quick start shows the full cycle: define the result type, configure a model provider, make the call, and test it.

:::info Prerequisites

- [Model Providers for LLMs](../develop/components/model-providers.md)
- A project to work in. If you do not have one, see [Create a new integration](../../develop/create-integrations/create-a-new-integration.md).
:::

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

## Step 1: Add an HTTP service

1. Select your integration from the Project overview canvas.
2. On the **Design** tab, select **Add Artifact manually** below the WSO2 Integrator Copilot's quick-start cards.
3. On the Artifacts page, select **HTTP Service** under **Integration as API**.

<ThemedImage
    alt="Artifacts page listing artifact types such as Automation, AI Integration, and Integration as API, with HTTP Service highlighted"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/artifacts-picker.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/artifacts-picker.png'),
    }}
/>

4. Keep **Service Contract** as **Design From Scratch**.
5. Keep **Service Base Path** as `/`.
6. Select **Create**.

<ThemedImage
    alt="Empty HTTP Service view with base path / and the default listener"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/create-http-service.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/create-http-service.png'),
    }}
/>

## Step 2: Define the Sentiment type

The LLM call returns one of three values. Define an enum so Ballerina can enforce the result.

1. In Project Explorer, click the **+** next to **Types**.
2. Set the kind to **Enum** and **Type name** to `Sentiment`.
3. Add three members: `POSITIVE`, `NEGATIVE`, `NEUTRAL`.
4. Select **Save**.

<ThemedImage
    alt="Sentiment enum with POSITIVE, NEGATIVE, and NEUTRAL members"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/create-sentiment-type.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/create-sentiment-type.png'),
    }}
/>

## Step 3: Add a POST resource

1. In the HTTP Service Design editor, select **+ Add Resource**.
2. Select **POST**.
3. Set **Resource Path** to `analyze`.
4. Select **+ Define Payload**.
5. In the popup, select **Create Type Schema**, set the name to `AnalyzePayload`, and add a single field `text` of type `string`.

<ThemedImage
    alt="Define Payload popup with Create Type Schema selected, name set to AnalyzePayload, and a text field of type string"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/define-payload-popup.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/define-payload-popup.png'),
    }}
/>

6. Select **Save** on the payload panel. The resource configuration also lets you add **Query Parameter** and **Header** fields, and it prefills the response codes with `201` (`json`) and `500` (`error`). Leave these at their defaults for this quick start.
7. Select **Save** on the resource.

<ThemedImage
    alt="POST analyze resource configured with the AnalyzePayload request body"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-post-resource.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-post-resource.png'),
    }}
/>

## Step 4: Add a direct LLM call

The resource opens as a visual flow with **Start** connected to an **Error Handler**.

1. Select **+** on the connector between **Start** and **Error Handler**.
2. Select **Model Provider** under **Direct LLM**.
3. Select **+ Add Model Provider**, then choose **WSO2 Model Provider**.
4. Keep the default name and select **Save**. The provider is added under **Connections** as `aiWso2modelprovider`, and a confirmation message confirms the default configuration values were added.

<ThemedImage
    alt="Model Providers panel showing aiWso2modelprovider added to the flow between Start and Error Handler"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-model-provider.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-model-provider.png'),
    }}
/>

5. Select `aiWso2modelprovider`, then select the **generate** action.
6. Set **Prompt** to `Classify the sentiment of this customer review and provide a confidence score between 0.0 and 1.0 indicating how confident you are in the classification. Review: ${payload.text}`.
7. Set **Result** to `sentimentResult`.
8. For **Expected Type**, create a new record type `SentimentResult` with two fields: `sentiment` of type `Sentiment` and `confidence` of type `float`. Select **Save** in the type creator.
9. Back in the generate panel, select `SentimentResult` in the **Expected Type** field, then select **Save**.

<ThemedImage
    alt="Configuring the generate action with the classification prompt and SentimentResult as the expected return type"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-prompt-and-return-type.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/add-prompt-and-return-type.png'),
    }}
/>

## Step 5: Return the result

1. Select **+** below the **ai:generate** node.
2. Select **Return**.
3. Set **Expression** to `sentimentResult`.
4. Select **Save**.

The flow now shows **Start**, **ai:generate**, **Return**, and the **Error Handler** the visual designer added automatically to catch failures from the LLM call. Use the **Flow**/**Sequence** toggle at the top right to switch between the diagram and a linear step list.

<ThemedImage
    alt="Final flow with Start, ai:generate, Return, the WSO2 model provider connection, and an Error Handler"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/final-view.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/final-view.png'),
    }}
/>

## Step 6: Run and test

1. Select **Run**. WSO2 Integrator compiles and starts the integration in the terminal.
2. Select **Try It**. A `TryIt.hurl` request file opens, prefilled with a `POST` request to `/analyze` and an example JSON body.
3. Update the JSON body if needed, for example `{"text": "Absolutely loved this product! Best purchase I made all year."}`.
4. Select the run icon next to the request to send it.
5. Confirm the response shows `Status: 201 Created` with a body that includes `"sentiment": "POSITIVE"` along with a `confidence` score.

<ThemedImage
    alt="Running the integration and testing it with the Hurl Client Runner's Try It panel showing a 201 Created response with a POSITIVE sentiment and a confidence score"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/run-and-test.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer/run-and-test.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following Ballerina program produces the same integration shown in the Visual Designer steps. The LLM returns a `SentimentResult` record so the response includes both the sentiment and a confidence score (for example, `{"sentiment":"POSITIVE","confidence":0.98}`). The visual designer wraps the call in a `do`/`on fail` block, matching the **Error Handler** node shown in the flow.

`types.bal`:

```ballerina
enum Sentiment {
    POSITIVE,
    NEGATIVE,
    NEUTRAL
}

type AnalyzePayload record {|
    string text;
|};

type SentimentResult record {|
    Sentiment sentiment;
    float confidence;
|};
```

`connections.bal`:

```ballerina
import ballerina/ai;

final ai:Wso2ModelProvider aiWso2modelprovider = check ai:getDefaultModelProvider();
```

`main.bal`:

```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service / on httpDefaultListener {
    resource function post analyze(@http:Payload AnalyzePayload payload) returns json|error {
        do {
            SentimentResult sentimentResult = check aiWso2modelprovider->generate(
                `Classify the sentiment of this customer review and provide a confidence score
                between 0.0 and 1.0 indicating how confident you are in the classification.
                Review: ${payload.text}`
            );
            return sentimentResult;
        } on fail error err {
            return error("unhandled error", err);
        }
    }
}
```

Note that `generate` takes an expected type descriptor as an argument, but it is not explicitly passed here. Ballerina infers it from the type of the variable the result is assigned to (`SentimentResult`), so the call stays concise while still being fully type-checked. The resource itself returns `json|error`: the `do`/`on fail` block catches any error from the LLM call (the **Error Handler** node) and lets you customize the failure response, while the successful path still returns the fully typed `sentimentResult`.

Run and test the integration from WSO2 Integrator using the **Try It** panel as shown in Step 6. The response returns `Status: 201 Created` with a body similar to `{"sentiment":"POSITIVE","confidence":0.98}`, with the actual sentiment and confidence score determined by the model.

</TabItem>
</Tabs>

## How it works

The model provider's `generate` method takes a backtick template prompt and an expected return type. The expected type is inferred from the variable the result is assigned to when not specified explicitly. Behind the scenes the LLM is instructed to produce output that conforms to that type, and the response is parsed and validated before being returned to your code.

Because the `sentiment` field is an enum, the LLM cannot return free-form text for it. It must pick one of `POSITIVE`, `NEGATIVE`, or `NEUTRAL`. If the model returns anything else, the call fails with a typed error rather than silently passing bad data downstream.

This is what differentiates a direct LLM call from a raw chat completion: you write the call as if it were a normal function and let the type system do the work.

## What's next

- [Build a Hotel Finder Agent](build-a-hotel-finder-agent.md) — Add custom tools and session-scoped memory
- [What is an AI Agent?](../develop/agents/overview.md) — Understand the agent architecture
- [What are Tools?](../develop/agents/tools.md) — Learn tool design patterns
