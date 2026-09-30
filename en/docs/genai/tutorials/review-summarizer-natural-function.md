---
sidebar_position: 6
title: Customer Review Analyzer with Natural Function
description: Step-by-step tutorial that builds an HTTP service using a Natural Function to analyze customer reviews and return structured feedback with sentiment, topics, churn risk, and a suggested action.
keywords: [wso2 integrator, genai, natural functions, tutorial, customer review, sentiment analysis]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Customer Review Analyzer with Natural Function

This tutorial walks through building an **HTTP service that uses a Natural Function to analyze a customer review** and return structured feedback. It is the end-to-end scenario for the [Natural Functions](../develop/natural-functions/overview.md) feature.

By the end you will have a `POST /api/v1/analyze` endpoint that takes a single customer review and returns a typed `ReviewResponse` containing the overall sentiment, a concise summary, per-topic sentiment, a churn-risk flag, and a suggested follow-up action. All of it is produced by an LLM, using a Natural Function as the body.

:::caution Experimental feature
Natural functions are an experimental feature. Enable experimental features in WSO2 Integrator before using them: open **Settings**, expand **Extensions**, select the **Ballerina** extension, and tick **Experimental: Enable Experimental Feature**.
:::

:::info Default model provider
Before you start, open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run **Ballerina: Configure default WSO2 model provider**. Sign in with your WSO2 account when prompted. This is a one-time per-project setup; WSO2 Integrator writes the configuration values into the project automatically.

![Command Palette filtered to "Configure default model provider", showing matches "Ballerina: Configure default WSO2 Model Provider" and "Ballerina: Configure default model for natural functions (Experimental)".](/img/genai/tutorials/review-summarizer-natural-function/01-configure-wso2-model-provider.png)

The first run may also prompt you for the `wso2aiKey` configuration value. The **Configure Application** dialog handles that for you.
:::

## What you'll build

1. **Create the natural function.** Define a typed signature, a return type with a record, an English prompt body, and a model-provider connection.
2. **Create the HTTP service** that exposes the function over `POST /api/v1/analyze`.
3. **Wire the resource flow** to call the natural function and return the typed response.
4. **Run and test** the service end-to-end.

---

## 1. Create the natural function

### Step 1.1: Open the create form

From the project sidebar, hover the **Natural Functions** node and click the **+** that appears on the right (tooltip: **Add Natural Function**).

![Project sidebar with the Natural Functions node hovered, showing the inline + button and an "Add Natural Function" tooltip.](/img/genai/tutorials/review-summarizer-natural-function/02-add-natural-function-sidebar.png)

(You can also reach the same form from the integration **Overview** page: select **Add Artifact manually** below the WSO2 Integrator Copilot's quick-start cards, then pick **Natural Function** under **Other Artifacts**.)

![Artifacts page with Other Artifacts section showing Function, Natural Function (Beta) highlighted, Data Mapper, Type, Connection, Agent, and Configuration tiles.](/img/genai/tutorials/review-summarizer-natural-function/03-add-natural-function-add-artifact.png)

### Step 1.2: Name and parameter

The **Create New Natural Function** form opens. Set:

| Field | Value |
|---|---|
| **Name** | `analyzeCustomerReviews` |

![Create New Natural Function form with Name set to analyzeCustomerReviews, Parameters (Add Parameter link), Return Type, and Create button.](/img/genai/tutorials/review-summarizer-natural-function/04-create-new-natural-function-form.png)

Click **+ Add Parameter**. The parameter fields expand inline on the same page (not a separate dialog). Fill in:

| Field | Value |
|---|---|
| **Type** | `string` |
| **Name** | `customerReview` |
| **Description** | `Review of the customer` |

![Add Parameter fields expanded inline with Type string, Name customerReview, Description "Review of the customer", Cancel and Add buttons.](/img/genai/tutorials/review-summarizer-natural-function/05-add-parameter.png)

Click **Add**. The parameter appears as a row in the Parameters list, with edit and delete icons.

### Step 1.3: Build the return type

The function will return a `ReviewResponse` record. The fastest way to define one is to import a JSON sample.

Click the **Return Type** field, then select **Create New Type**. The **Create New Type** dialog opens on top of the form; switch to the **Import** tab. Set:

| Field | Value |
|---|---|
| **Format** | `JSON` |
| **Name** | `ReviewResponse` |

Paste the following JSON sample into the textarea:

```json
{
  "sentiment": "mixed",
  "summary": "Customer loves the sound quality but is frustrated by a faulty charging case and slow support response.",
  "topics": [
    { "name": "sound quality",     "sentiment": "positive" },
    { "name": "charging case",     "sentiment": "negative" },
    { "name": "customer support",  "sentiment": "negative" }
  ],
  "churn_risk": true,
  "suggested_action": "Reach out with a replacement case and apologize for the support delay."
}
```

![Create New Type dialog on the Import tab with Format JSON, Name ReviewResponse, an Import JSON File button, and the JSON sample pasted into the textarea.](/img/genai/tutorials/review-summarizer-natural-function/06-create-new-type.png)

Click **Import**. WSO2 Integrator infers and registers three types, closes the dialog, and returns you to the completed function form: the parameter row now shows edit/delete icons, and **Return Type** is set to `ReviewResponse`.

![Completed Create New Natural Function form with the customerReview parameter (edit/delete icons) and Return Type set to ReviewResponse, ready to select Create.](/img/genai/tutorials/review-summarizer-natural-function/07-create-from-json.png)

The three registered types appear under the **Types** node in the sidebar:

- `ReviewResponse`: the top-level record with fields `sentiment`, `summary`, `topics`, `churn_risk`, `suggested_action`.
- `Topics`: the array type used for the `topics` field (an alias for `TopicsItem[]`).
- `TopicsItem`: the per-element record with fields `name` and `sentiment`.

`ReviewResponse` is selected automatically as the function's return type.

> Why these field names matter: the runtime turns the record (and its nested types) into a JSON schema and sends it to the LLM. Field names, types, and any descriptions you add become part of the contract the model is constrained to. See [Typed Return Inference](../develop/natural-functions/overview.md#typed-return-inference) for the details.

### Step 1.4: Create the function

Click **Create**. WSO2 Integrator generates the Ballerina source and opens the function in the **Flow Designer**. The sidebar updates with three additions:

- **Connections**: `_analyzeCustomerReviewsModel` (the model-provider connection WSO2 Integrator created for this function).
- **Types**: `ReviewResponse`, `Topics`, `TopicsItem`.
- **Natural Functions**: `analyzeCustomerReviews`.

The flow shows a single **Prompt** node between **Start** and the end of the function. A pencil (edit) icon sits at the top-right corner of the node, and a small circular connection icon sits just outside it, linked by a short connector line:

![Natural function flow with Start, an empty Prompt node ("Enter your prompt here..."), a pencil icon, and a circular connection icon linked to the node.](/img/genai/tutorials/review-summarizer-natural-function/08-prompt-node-in-flow-diagram.png)

### Step 1.5: Bind the model provider

Hover or click the circular connection icon next to the Prompt node. The tooltip reads **Configure Model Provider**.

![Prompt node with the circular connection icon highlighted (blue border) and a tooltip reading "Configure Model Provider".](/img/genai/tutorials/review-summarizer-natural-function/09-bind-the-model-provider.png)

The **Configure Model Provider Connection** panel slides in. Pick the auto-created `_analyzeCustomerReviewsModel` connection and click **Save**.

![Configure Model Provider Connection panel with Select Model Provider set to _analyzeCustomerReviewsModel, "+ Create New Model Provider" link, a hint about the Configure default WSO2 model provider command, and a Save button.](/img/genai/tutorials/review-summarizer-natural-function/10-default-wso2-model-provider.png)

If you'd rather use OpenAI, Anthropic, Azure OpenAI, or any other provider, click **+ Create New Model Provider** and pick from the catalogue:

![Model Providers picker listing Default Model Provider (WSO2), Anthropic, Azure OpenAI, Deepseek, Google Vertex, Mistral, Ollama, OpenAI.](/img/genai/tutorials/review-summarizer-natural-function/11-other-model-providers.png)

### Step 1.6: Write the prompt

Click the pencil icon at the top-right of the Prompt node (tooltip: **Edit Prompt**). The full Prompt editor opens directly, with a formatting toolbar (**Insert**, undo/redo, **Bold**, *Italic*, link, headings, quote, lists, table, and **Preview**/**Source** toggles).

Type the following prompt, and use the **Insert** menu (or just type the parameter name) to interpolate `customerReview` — it renders as a token pill reading `{x} customerReview`, backed by the Ballerina template expression `${customerReview}`:

> You are a customer review analyzer. For the review below, identify the overall sentiment, extract the key topics being discussed with their individual sentiment, and suggest a follow-up action if needed.
>
> Review: `{x} customerReview`

![Prompt editor with the prompt typed and the customerReview parameter shown as a token pill.](/img/genai/tutorials/review-summarizer-natural-function/12-prompt-editor-with-the-prompt-written.png)

Click **Save**. The natural function is complete; the Prompt node shows the saved body inline, and behind the scenes WSO2 Integrator generated the Ballerina source.

:::note
Reopening a saved prompt (clicking the pencil icon again) opens a smaller floating editor with the same text but no formatting toolbar, and **Cancel**/**Save** buttons — a quick-edit view distinct from the full editor used the first time.
:::

<Tabs>
<TabItem value="visual" label="Visual Designer" default>

![Prompt node showing the saved prompt body inline, connected to the model provider's circular icon.](/img/genai/tutorials/review-summarizer-natural-function/13-prompt-saved-in-flow-diagram.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
function analyzeCustomerReviews(string customerReview) returns ReviewResponse|error {
    ReviewResponse|error result = natural {
        You are a customer review analyzer. For the review below, identify
        the overall sentiment, extract the key topics being discussed with their
        individual sentiment, and suggest a follow-up action if needed.

        Review: ${customerReview}
    };
    return result;
}
```

</TabItem>
</Tabs>

---

## 2. Create the HTTP service

The function is callable; now we expose it as an API.

### Step 2.1: Add the service artifact

Click the back arrow to return to the integration **Overview**, then select **Add Artifact manually**. Under **Integration as API**, pick **HTTP Service**.

![Artifacts page showing Automation, Durable Workflow, AI Integration (Chat Agent Service, Durable Agentic Workflow, MCP Service), Integration as API (HTTP Service highlighted, GraphQL Service Beta, TCP Service Beta), and Event Integration.](/img/genai/tutorials/review-summarizer-natural-function/14-create-http-service.png)

In the **Create HTTP Service** form, set:

| Field | Value |
|---|---|
| **Service Contract** | `Design From Scratch` |
| **Service Base Path** | `/api/v1` |

![Create HTTP Service form with Service Contract Design From Scratch, Service Base Path /api/v1, Advanced Configurations Expand link, and Create button.](/img/genai/tutorials/review-summarizer-natural-function/15-create-http-service-form.png)

Click **Create**. The HTTP Service editor opens with no resources yet.

### Step 2.2: Add the POST resource

Click **+ Add Resource**. The **Select HTTP Method to Add** picker opens.

![HTTP Service editor with Listener httpDefaultListener, Base Path /api/v1, no resources yet, and the Select HTTP Method to Add picker open with POST highlighted.](/img/genai/tutorials/review-summarizer-natural-function/16-add-post-resource.png)

Choose **POST**, then configure the resource:

| Field | Value |
|---|---|
| **HTTP Method** | `POST` |
| **Resource Path** | `analyze` |
| **Payload (Type / Name)** | `string` / `review` |
| **Responses** | `201` returns `ReviewResponse`; `500` returns `error` |

![Resource Configuration panel with HTTP Method POST, Resource Path analyze, a string review payload, and Responses 201 ReviewResponse / 500 error. Save button at the bottom right.](/img/genai/tutorials/review-summarizer-natural-function/17-post-resource-configured-in-form.png)

Click **Save**. The resource flow opens with **Start**, a **+** placeholder on the connector, and an **Error Handler**.

![Resource flow showing Start, a + placeholder icon on the connector, and Error Handler.](/img/genai/tutorials/review-summarizer-natural-function/18-resource-flow-add-new.png)

---

## 3. Call the natural function from the resource

### Step 3.1: Open the Add Node panel

Click the **+** placeholder between **Start** and **Error Handler**. The **Add Node** panel slides in. Expand the **AI** category and click **Call Natural Function** (tooltip: **Call a natural programming function**).

![Add Node panel with AI category expanded, showing Direct LLM (Model Provider, Call Natural Function) and RAG nodes. The Call Natural Function tile is highlighted with a "Call a natural programming function" tooltip.](/img/genai/tutorials/review-summarizer-natural-function/19-select-natural-function-in-add-new.png)

### Step 3.2: Pick the function

The **Natural Functions** picker lists every natural function in the project under **Current Integration**. Pick `analyzeCustomerReviews`.

![Natural Functions picker with a Search box and a Current Integration section showing the analyzeCustomerReviews tile.](/img/genai/tutorials/review-summarizer-natural-function/20-choose-analyzeCustomerReviews.png)

### Step 3.3: Bind the argument

The configuration form opens, titled with your project and function name (for example, `customer_review_analyzer : analyzeCustomerReviews`). Each parameter on the function becomes a row; here you only have `CustomerReview`, with a **Text**/**Expression** toggle.

![Configuration form for the analyzeCustomerReviews call: empty CustomerReview field with Text/Expression toggle, Result name reviewResponse, Variable Type ReviewResponse (locked), Save button disabled.](/img/genai/tutorials/review-summarizer-natural-function/21-natural-function-config-form.png)

Switch **CustomerReview** to **Expression** and bind it to the inbound payload variable `review`. Leave **Result** (the variable name that will hold the typed return value, used by the next node) as `reviewResponse`, and **Variable Type** as the locked `ReviewResponse` (it always matches the function's declared return type).

![Configuration form filled in: CustomerReview in Expression mode bound to review (variable pill), Result reviewResponse, Variable Type ReviewResponse, Save button enabled.](/img/genai/tutorials/review-summarizer-natural-function/22-bind-review-to-customer-review.png)

Click **Save**. The natural-function node lands in the flow.

### Step 3.4: Add the return

Click **+** between the natural function call and **Error Handler**. In the Add Node panel, under **Control**, pick **Return**.

![Resource flow with Start, the analyzeCustomerReviews (reviewResponse) node, and Error Handler. The Add Node panel on the right has Return highlighted under Control.](/img/genai/tutorials/review-summarizer-natural-function/23-add-return.png)

In the Return panel, set the **Expression / Return value** to `reviewResponse`.

![Return node configuration panel saying "This operation has no required parameters. Optional settings can be configured below." with the Expression set to the variable reviewResponse.](/img/genai/tutorials/review-summarizer-natural-function/24-set-reviewResponse-as-return.png)

The completed flow, with a **Try It** button now available at the top right:

![Final resource flow with Start, then analyzeCustomerReviews (reviewResponse), then Return reviewResponse, then Error Handler, with Configure and Try It buttons at the top.](/img/genai/tutorials/review-summarizer-natural-function/25-complete-flow.png)

---

## 4. Run and test

### Step 4.1: Run the service

From the resource editor, select **Run**. WSO2 Integrator applies the `--experimental` flag and compiles and starts the service, with progress shown in the integrated terminal.

### Step 4.2: Send a test request

Select **Try It**. A `TryIt.hurl` file opens with a `POST` request to `/api/v1/analyze` prefilled. Update the JSON body with a review to analyze, for example:

```json
{
  "review": "Loved the sound quality, but the charging case died after a week and support never replied."
}
```

Select the run icon next to the request to send it.

### Step 4.3: Read the structured response

The response appears inline below the request, in the same `TryIt.hurl` tab. It shows `Status: 201 Created` and a fully structured body matching `ReviewResponse`.

![TryIt.hurl showing the POST /api/v1/analyze request and the structured ReviewResponse — sentiment, summary, per-topic sentiment, churn_risk, and suggested_action — returned below it.](/img/genai/tutorials/review-summarizer-natural-function/26-try-it-result.png)

The LLM analyzed the review, identified the overall sentiment, extracted per-topic sentiment, flagged the customer as a churn risk, and suggested a concrete follow-up action. The response comes back as a typed `ReviewResponse` record, with no JSON parsing or schema validation in your code.

> Ballerina HTTP services return `201 Created` for POST requests by default; that is expected behaviour, not an error.

---

## What's next

- **[Natural Functions reference](../develop/natural-functions/overview.md)** — the single-page reference covering the form, the Prompt node, typed return inference, and calling from a flow.
- **[Email Generator with Direct LLM](email-generator-direct-llm.md)** — a similar tutorial built around direct LLM calls.
