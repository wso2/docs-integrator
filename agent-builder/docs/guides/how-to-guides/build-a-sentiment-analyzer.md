---
title: Build a Sentiment Analyzer
---

# Build a Sentiment Analyzer

**Time:** Under 10 minutes | **What you'll build:** An HTTP endpoint that listens on `POST /sentiment-analyzer/analyze`, sends a customer review to an AI agent, and returns the sentiment (`POSITIVE`, `NEGATIVE`, or `NEUTRAL`) along with a confidence score.

This quick start shows the full cycle in WSO2 Agent Builder: define the result types, create an agent with classification instructions, expose it through a typed HTTP trigger, and test it. Because the trigger's response is typed, Ballerina enforces the result: the agent can only return one of the three sentiment values.

:::info Prerequisites

- [Model Providers for LLMs](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md)
- A project to work in. If you do not have one, see [Create a new integration](../../develop-and-test/create-workspace/create-a-project.md).

## Step 1: Create the agentic integration

1. Open WSO2 Agent Builder and select **Create** under **Start Building your Agent**.
2. Set **Project name** to `Sentiment-Analyzer` and choose a **Location**.
3. Under **What do you want to build?**, keep **Agentic Integration** selected.
4. Set **Agentic integration name** to `SentimentAnalyzer`.
5. Select **Create Agentic Integration**.

<ThemedImage
    alt="Create a Project form with Project name set to Sentiment-Analyzer, the Agentic Integration option selected, and Agentic integration name set to SentimentAnalyzer"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/01-create-project-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/01-create-project-v1.0.png'),
    }}
/>

The integration opens with the WSO2 Agent Builder Copilot, which asks **What should your agent do?** Skip it for this quick start and build the integration manually.

<ThemedImage
    alt="SentimentAnalyzer integration home page showing the WSO2 Agent Builder Copilot prompt, example agents, and the Add Agent and Add MCP Server buttons under Or start from scratch"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/02-integration-home-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/02-integration-home-v1.0.png'),
    }}
/>

## Step 2: Define the result types

The agent's reply is bound to a typed result. Define an enum for the sentiment and a record for the full result so Ballerina can enforce them.

### Create the `Sentiment` enum

1. In the project explorer, hover over **Types** and select **+**.
2. Set **Kind** to **Enum** and **Name** to `Sentiment`.
3. Select **+** next to **Members** to add three members: `POSITIVE`, `NEGATIVE`, and `NEUTRAL`.
4. Select **Save**.

<ThemedImage
    alt="New Type panel with Kind set to Enum, Name set to Sentiment, and the POSITIVE, NEGATIVE, and NEUTRAL members"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/03-create-sentiment-type-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/03-create-sentiment-type-v1.0.png'),
    }}
/>

### Create the `SentimentResult` record

1. Select **+ Add Type**.
2. Keep **Kind** as **Record** and set **Name** to `SentimentResult`.
3. Select **+** next to **Fields** to add two fields:

   | Name | Type |
   |---|---|
   | `sentiment` | `Sentiment` |
   | `confidence` | `float` |

4. Select **Save**.

<ThemedImage
    alt="New Type panel with Kind set to Record, Name set to SentimentResult, and the sentiment and confidence fields"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/04-create-sentiment-result-type-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/04-create-sentiment-result-type-v1.0.png'),
    }}
/>

The **Types** view shows `SentimentResult` linked to the `Sentiment` enum.

<ThemedImage
    alt="Types diagram showing the SentimentResult record with its sentiment field linked to the Sentiment enum"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/05-types-diagram-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/05-types-diagram-v1.0.png'),
    }}
/>

## Step 3: Create the agent

1. Return to the integration home page and, under **Or start from scratch**, select **Add Agent**.
2. In the **Add Agent** dialog, select **Create Agent** under **Create New**.

<ThemedImage
    alt="Add Agent dialog showing the Create Agent, Create Durable Agent, and Create Agent Definition options"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/06-add-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/06-add-agent-v1.0.png'),
    }}
/>

3. Set **Role** to `SentimentAnalyzer`.
4. Set **Instructions** to:

   ```plain
   You are a sentiment analysis assistant for customer reviews.

   Your responsibilities:
   - Classify the sentiment of each review as POSITIVE, NEGATIVE, or NEUTRAL.
   - Provide a confidence score between 0.0 and 1.0 indicating how confident you are in the classification.
   ```

   You don't need to describe the output format. The typed response you set on the HTTP trigger in Step 4 tells the model what shape to return.

5. Keep **Model** as **Default WSO2 Model Provider**. No third-party API key is required. To use a different LLM, see [Model providers](../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers.md).

<ThemedImage
    alt="Create Agent form with Role set to SentimentAnalyzer, the sentiment classification instructions, and Model set to Default WSO2 Model Provider"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/07-create-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/07-create-agent-v1.0.png'),
    }}
/>

6. Scroll down and set **Agent Name** to `SentimentAnalyzer`.
7. Select **Create Agent**.

<ThemedImage
    alt="Bottom of the Create Agent form with Agent Name set to SentimentAnalyzer and the Create Agent button"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/08-name-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/08-name-agent-v1.0.png'),
    }}
/>

The agent canvas for `SentimentAnalyzer` shows the **AI Agent** node connected to **Default WSO2 Model Provider**, with **Add Trigger** on its left.

<ThemedImage
    alt="AI Agent canvas for SentimentAnalyzer connected to the Default WSO2 Model Provider, with Add Trigger, Add Memory, and Add Tool options"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/09-ai-agent-canvas-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/09-ai-agent-canvas-v1.0.png'),
    }}
/>

## Step 4: Expose the agent through an HTTP trigger

1. Select **Add Trigger** on the left of the **AI Agent** node, then select **HTTP** under **API Endpoints**.

<ThemedImage
    alt="Add Trigger dialog showing Chat Channels, the HTTP option under API Endpoints, and event sources"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/10-add-trigger-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/10-add-trigger-v1.0.png'),
    }}
/>

2. Keep **Endpoint Path** as `/sentiment-analyzer`.
3. Keep **HTTP Method** as **POST** and set **Resource Path** to `analyze`.

<ThemedImage
    alt="HTTP trigger form with Endpoint Path /sentiment-analyzer, HTTP Method POST, Resource Path analyze, the AnalyzePayload payload, and the SentimentResult and error responses"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/11-http-trigger-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/11-http-trigger-v1.0.png'),
    }}
/>

### Define the request payload

1. Under **Payload**, select the edit icon on the default `string payload`.
2. Clear the **Type** field, type `AnalyzePayload`, and select **Add Type: AnalyzePayload**.
3. In the **Create New Type** dialog, keep **Kind** as **Record**, select **+** next to **Fields**, and add a field `text` of type `string`.
4. Select **Save** in the dialog, then select **Save** on the payload panel.

<ThemedImage
    alt="Create New Type dialog with Kind set to Record, Name set to AnalyzePayload, and a text field of type string"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/12-define-payload-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/12-define-payload-v1.0.png'),
    }}
/>

### Define the response type

1. Under **Responses**, select the edit icon on the `201` response (Ballerina returns `201 Created` for `POST` resources by default).
2. Expand **Advanced Configurations** and set **Response Body Schema** to `SentimentResult`.
3. Select **Save** on the response configuration.

<ThemedImage
    alt="201 response configuration with Response Body Schema set to SentimentResult"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/13-define-response-type-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/13-define-response-type-v1.0.png'),
    }}
/>

### Set the request instructions

The **Instructions** field tells the agent what to do with each request. The trigger appends the payload to these instructions at request time, as shown under **Appended to your instructions**.

1. Set **Instructions** to `Classify the sentiment of the customer review in the request payload.`
2. Confirm that the form shows `AnalyzePayload` for the request and `SentimentResult` for the `201` response, with `error` prefilled for `500`.
3. Select **Create**.

<ThemedImage
    alt="HTTP trigger form showing the AnalyzePayload payload, the 201 SentimentResult and 500 error responses, and the request Instructions with the payload appended"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/14-trigger-responses-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/14-trigger-responses-v1.0.png'),
    }}
/>

The agent canvas now shows the **HTTP Service · /sentiment-analyzer** trigger with **POST /analyze** connected to the agent.

<ThemedImage
    alt="SentimentAnalyzer agent canvas with the HTTP Service POST /analyze trigger connected to the AI Agent node and the Default WSO2 Model Provider"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/15-agent-with-http-trigger-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/15-agent-with-http-trigger-v1.0.png'),
    }}
/>

## Step 5: Review the resource flow

Under **Entry Points**, expand **HTTP Service - /sentiment-analyzer** and select the `analyze` resource. Agent Builder generates the flow for you:

- **agent : run** sends the request instructions and payload to `SentimentAnalyzer` and binds the reply to `result`, typed as `SentimentResult`.
- **Return** returns `result` as the response.
- **Error Handler** catches failures from the agent call.

Use the **Flow**/**Sequence** toggle at the top right to switch between the diagram and a linear step list.

<ThemedImage
    alt="POST analyze resource flow with Start, the agent run node calling SentimentAnalyzer, Return result, and an Error Handler"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/16-analyze-resource-flow-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/16-analyze-resource-flow-v1.0.png'),
    }}
/>

## Step 6: Run and test

1. Select **Run Integration** at the top-right corner of the editor. Wait until the terminal shows `Running executable`.
2. On the `analyze` resource, select **Try It**, then select **Try It (Try resource with Hurl Client)**. A `TryIt.hurl` file opens with a `POST` request to `/sentiment-analyzer/analyze`, a comment describing the expected schema (`text: string`), and a JSON body with a `{?}` placeholder.

<ThemedImage
    alt="TryIt.hurl request file prefilled with a POST request to /sentiment-analyzer/analyze, a schema comment, and a text placeholder"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/17-try-it-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/17-try-it-v1.0.png'),
    }}
/>

3. Replace the placeholder with a review, for example:

   ```json
   {
     "text": "Absolutely loved this product! Best purchase I made all year."
   }
   ```

4. Select the run icon next to the request to send it.
5. Confirm the response shows `Status: 201 Created` with a body that includes `"sentiment": "POSITIVE"` along with a `confidence` score.

<ThemedImage
    alt="TryIt.hurl response showing 201 Created with sentiment POSITIVE and confidence 0.95, next to the analyze resource flow"
    sources={{
        light: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/18-run-and-test-v1.0.png'),
        dark: useBaseUrl('/img/genai/getting-started/build-a-sentiment-analyzer-v1.0/18-run-and-test-v1.0.png'),
    }}
/>

The following Ballerina program is what WSO2 Agent Builder generates from the Visual Designer steps. The resource binds the agent's reply to `SentimentResult`, so the response includes both the sentiment and a confidence score (for example, `{"sentiment":"POSITIVE","confidence":0.95}`). The HTTP resource wraps the agent call in a `do`/`on fail` block, matching the **Error Handler** node shown in the flow.

`types.bal`:

```ballerina
enum Sentiment {
    POSITIVE,
    NEGATIVE,
    NEUTRAL
}

type SentimentResult record {|
    Sentiment sentiment;
    float confidence;
|};

type AnalyzePayload record {|
    string text;
|};
```

`agents.bal`:

```ballerina
import ballerina/ai;

final ai:Agent SentimentAnalyzer = check new (
    systemPrompt = {
        role: string `SentimentAnalyzer`,
        instructions: string `You are a sentiment analysis assistant for customer reviews.

Your responsibilities:
- Classify the sentiment of each review as POSITIVE, NEGATIVE, or NEUTRAL.
- Provide a confidence score between 0.0 and 1.0 indicating how confident you are in the classification.
`
    }, model = check ai:getDefaultModelProvider()
);
```

`main.bal`:

```ballerina
import ballerina/http;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /sentiment\-analyzer on httpDefaultListener {
    resource function post analyze(@http:Payload AnalyzePayload payload) returns SentimentResult|error {
        do {
            SentimentResult result = check SentimentAnalyzer.run(string `Classify the sentiment of the customer review in the request payload.

Request payload:
${payload.toJsonString()}`);
            return result;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }
}
```

Note that `run` is not explicitly given an expected type here. Ballerina infers it from the type of the variable the result is assigned to (`SentimentResult`), so the agent is asked for a reply of that shape and the reply is validated against it before it is returned.

Run and test the integration from WSO2 Agent Builder using the **Try It** panel as shown in Step 6, or with `curl`:

```bash
curl -X POST http://localhost:9090/sentiment-analyzer/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Absolutely loved this product! Best purchase I made all year."}'
```

The response returns `Status: 201 Created` with a body similar to `{"sentiment":"POSITIVE","confidence":0.95}`, with the actual sentiment and confidence score determined by the model.

## How it works

The HTTP trigger is the agent's entry point. Each request to `POST /sentiment-analyzer/analyze` runs the `SentimentAnalyzer` agent with the trigger's instructions and the review, and the agent's reply becomes the response body.

The resource assigns the reply to a `SentimentResult` variable. Behind the scenes the agent is asked to produce output that conforms to that type, and the reply is parsed and validated before it reaches your code.

Because the `sentiment` field is an enum, the agent cannot return free-form text for it. It must pick one of `POSITIVE`, `NEGATIVE`, or `NEUTRAL`. If the model returns anything else, the call fails with a typed error that the **Error Handler** catches, rather than silently passing bad data downstream.

## What's next

- [Build a Hotel Finder Agent](build-a-hotel-finder-agent.md) — Add custom tools and session-scoped memory
- [What is an AI Agent?](../../develop-and-test/integration-artifacts/ai-integrations/agents/agents.md) — Understand the agent architecture
- [What are Tools?](../../develop-and-test/integration-artifacts/ai-integrations/agents/tools.md) — Learn tool design patterns
