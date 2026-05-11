---
title: Customer review analyzer with Natural Function
---

# Customer review analyzer with Natural Function

This tutorial walks through building an **HTTP service that uses a Natural Function to analyze a customer review** and return structured feedback. It is the end-to-end scenario for the [Natural Functions](/docs/genai/develop/natural-functions/overview) feature.

By the end you will have a `POST /api/v1/analyze` endpoint that takes a single customer review and returns a typed `ReviewResponse` containing the overall sentiment, a concise summary, per-topic sentiment, a churn-risk flag, and a suggested follow-up action. All of it is produced by an LLM, using a Natural Function as the body.

:::caution Experimental feature
Natural functions are an experimental feature. Enable experimental features in WSO2 Integrator before using them: open **Settings**, expand **Extensions**, select the **Ballerina** extension, and tick **Experimental: Enable Experimental Feature**.

:::info Default model provider
Before you start, open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run **Ballerina: Configure default WSO2 model provider**. Sign in with your WSO2 account when prompted. This is a one-time per-project setup; WSO2 Integrator writes the configuration values into the project automatically.

![Command Palette filtered to "Configure default model provider", showing matches "Ballerina: Configure default WSO2 Model Provider" and "Ballerina: Configure default model for natural functions (Experimental)".](/img/genai/tutorials/review-summarizer-natural-function/01-configure-wso2-model-provider.png)

The first run may also prompt you for the `wso2aiKey` configuration value. The **Configure Application** dialog handles that for you.

## What you'll build

1. **Create the natural function.** Define a typed signature, a return type with a record, an English prompt body, and a model-provider connection.
2. **Create the HTTP service** that exposes the function over `POST /api/v1/analyze`.
3. **Wire the resource flow** to call the natural function and return the typed response.
4. **Run and test** the service end-to-end.

---

## 1. Create the natural function

### Step 1.1: Open the create form

From the project sidebar, hover the **Natural Functions** node and click the **+** that appears on the right.

![Project sidebar with the Natural Functions node hovered, showing the inline + button on the right.](/img/genai/tutorials/review-summarizer-natural-function/02-add-natural-function-sidebar.png)

(You can also reach the same form from the integration **Overview** page: click **+ Add Artifact** and pick **Natural Function** under **Other Artifacts**.)

![Add Artifact panel scrolled to Other Artifacts, with the Natural Function (Beta) tile highlighted.](/img/genai/tutorials/review-summarizer-natural-function/03-add-natural-function-add-artifact.png)

### Step 1.2: Name and parameter

The **Create New Natural Function** form opens. Set:

| Field | Value |
|---|---|
| **Name** | `analyzeCustomerReviews` |

![Empty Create New Natural Function form with Name, Parameters (Add Parameter link), Return Type, and Create button.](/img/genai/tutorials/review-summarizer-natural-function/04-create-new-natural-function-form.png)

Click **+ Add Parameter** and fill in:

| Field | Value |
|---|---|
| **Type** | `string` |
| **Name** | `customerReview` |
| **Description** | `Review of the customer` |

![Add Parameter dialog with Type string, Name customerReview, Description "Review of the customer", Cancel and Save buttons.](/img/genai/tutorials/review-summarizer-natural-function/05-add-parameter.png)

Click **Save**. The parameter appears as a pill in the Parameters list.

### Step 1.3: Build the return type

The function will return a `ReviewResponse` record. The fastest way to define one is to import a JSON sample.

Click the **Return Type** field. From the dropdown, click **Create New Type**.

![Return Type dropdown listing primitive types with a Create New Type entry and an Open Type Browser link.](/img/genai/tutorials/review-summarizer-natural-function/06-create-new-type.png)

In the **Create New Type** dialog, switch to the **Import** tab. Set:

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

![Create New Type dialog on the Import tab with Format JSON, Name ReviewResponse, an Import JSON File button, and the JSON sample pasted into the textarea.](/img/genai/tutorials/review-summarizer-natural-function/07-create-from-json.png)

Click **Import**. WSO2 Integrator infers and registers three types under the **Types** node in the sidebar:

- `ReviewResponse`: the top-level record with fields `sentiment`, `summary`, `topics`, `churn_risk`, `suggested_action`.
- `Topics`: the array type used for the `topics` field (an alias for `TopicsItem[]`).
- `TopicsItem`: the per-element record with fields `name` and `sentiment`.

`ReviewResponse` is selected automatically as the function's return type.

> Why these field names matter: the runtime turns the record (and its nested types) into a JSON schema and sends it to the LLM. Field names, types, and any descriptions you add become part of the contract the model is constrained to. See [Typed Return Inference](/docs/genai/develop/natural-functions/overview#typed-return-inference) for the details.

### Step 1.4: Create the function

Click **Create**. WSO2 Integrator generates the Ballerina source and opens the function in the **Flow Designer**. The sidebar updates with three additions:

- **Connections**: `_analyzeCustomerReviewsModel` (the model-provider connection WSO2 Integrator created for this function).
- **Types**: `ReviewResponse`, `Topics`, `TopicsItem`.
- **Natural Functions**: `analyzeCustomerReviews`.

The flow shows a single **Prompt** node between **Start** and the end of the function:

![Natural function flow with Start, an empty Prompt node ("Enter your prompt here..."), and the end marker. A small cog icon sits to the right of the Prompt node.](/img/genai/tutorials/review-summarizer-natural-function/08-prompt-node-in-flow-diagram.png)

### Step 1.5: Bind the model provider

Hover the cog icon on the right of the Prompt node. The tooltip reads **Configure Model Provider**. Click it.

![Prompt node with the cog icon highlighted on the right and a tooltip reading "Configure Model Provider".](/img/genai/tutorials/review-summarizer-natural-function/09-bind-the-model-provider.png)

The **Configure Model Provider Connection** panel slides in. Pick the auto-created `_analyzeCustomerReviewsModel` connection and click **Save**.

![Configure Model Provider Connection panel with Select Model Provider set to _analyzeCustomerReviewsModel, "+ Create New Model Provider" link, a hint about the Configure default WSO2 model provider command, and a Save button.](/img/genai/tutorials/review-summarizer-natural-function/10-default-wso2-model-provider.png)

If you'd rather use OpenAI, Anthropic, Azure OpenAI, or any other provider, click **+ Create New Model Provider** and pick from the catalogue:

![Model Providers picker listing Default Model Provider (WSO2), Anthropic, Azure OpenAI, Deepseek, Google Vertex, Mistral, Ollama, OpenAI.](/img/genai/tutorials/review-summarizer-natural-function/11-other-model-providers.png)

### Step 1.6: Write the prompt

Click the pencil icon at the top-right of the Prompt node. The inline editor opens; click **Expand Editor** for the full Markdown editor with formatting tools.

Type the following prompt. Use **Bold** for the role line, and the **Insert** menu (or just type) to interpolate the parameter:

> You are a **customer review analyzer**. For the review below, identify the overall sentiment, extract the key topics being discussed with their individual sentiment, and suggest a follow-up action if needed.
>
> Review: `${customerReview}`

![Expanded Prompt editor with the prompt typed and the phrase "customer review analyzer" bold.](/img/genai/tutorials/review-summarizer-natural-function/12-prompt-editor-with-the-prompt-written.png)

Close the expanded view and click **Save**. The natural function is complete; the Prompt node shows the saved body inline, and behind the scenes WSO2 Integrator generated the Ballerina source.

![Prompt node showing the saved prompt body inline.](/img/genai/tutorials/review-summarizer-natural-function/13-prompt-saved-in-flow-diagram.png)

```ballerina
function analyzeCustomerReviews(string customerReview) returns ReviewResponse|error {
    ReviewResponse|error result = natural {
        You are a **customer review analyzer**. For the review below, identify
        the overall sentiment, extract the key topics being discussed with their
        individual sentiment, and suggest a follow-up action if needed.

        Review: ${customerReview}
    };
    return result;
}
```

---

## 2. Create the HTTP service

The function is callable; now we expose it as an API.

### Step 2.1: Add the service artifact

Click the back arrow to return to the integration **Overview**, then **+ Add Artifact**. Under **Integration as API**, pick **HTTP Service**.

![Add Artifact panel showing Automation, AI Integration, Integration as API (HTTP Service highlighted, GraphQL Service Beta, TCP Service Beta), Event Integration, and File Integration.](/img/genai/tutorials/review-summarizer-natural-function/14-create-http-service.png)

In the **Create HTTP Service** form, set:

| Field | Value |
|---|---|
| **Service Contract** | `Design From Scratch` |
| **Service Base Path** | `/api/v1` |

![Create HTTP Service form with Service Contract Design From Scratch, Service Base Path /api/v1, Advanced Configurations Expand link, and Create button.](/img/genai/tutorials/review-summarizer-natural-function/15-create-http-service-form.png)

Click **Create**. The HTTP Service editor opens with no resources yet.

### Step 2.2: Add the POST resource

Click **+ Add Resource**.

![HTTP Service editor with Listener httpDefaultListener, Base Path /api/v1, the Resources section showing "No resources found. Add a new resource." and a + Add Resource button.](/img/genai/tutorials/review-summarizer-natural-function/16-add-post-resource.png)

In the **Select HTTP Method to Add** picker, choose **POST**, then configure the resource:

| Field | Value |
|---|---|
| **HTTP Method** | `POST` |
| **Resource Path** | `analyze` |
| **Payload (Type / Name)** | `string` / `review` |
| **Responses** | `201` returns `ReviewResponse`; `500` returns `error` |

![Resource Configuration panel with HTTP Method POST, Resource Path analyze, a string review payload, and Responses 201 ReviewResponse / 500 error. Save button at the bottom right.](/img/genai/tutorials/review-summarizer-natural-function/17-post-resource-configured-in-form.png)

Click **Save**. The resource flow opens with **Start**, an empty placeholder, and an **Error Handler**.

![Resource flow showing Start, an empty placeholder ("Select node from node panel."), and Error Handler.](/img/genai/tutorials/review-summarizer-natural-function/18-resource-flow-add-new.png)

---

## 3. Call the natural function from the resource

### Step 3.1: Open the Add Node panel

Click the empty placeholder between **Start** and **Error Handler**. The **Add Node** panel slides in. Expand the **AI** category and click **Call Natural Function**.

![Add Node panel with AI category expanded, showing Direct LLM (Model Provider, Call Natural Function) and RAG nodes. The Call Natural Function tile is highlighted.](/img/genai/tutorials/review-summarizer-natural-function/19-select-natural-function-in-add-new.png)

### Step 3.2: Pick the function

The **Natural Functions** picker lists every natural function in the project. Pick `analyzeCustomerReviews`.

![Natural Functions picker with a Search box and a Current Integration section showing analyzeCustomerReviews.](/img/genai/tutorials/review-summarizer-natural-function/20-choose-analyzeCustomerReviews.png)

### Step 3.3: Bind the argument

The configuration form opens. Each parameter on the function becomes a row; here you only have `CustomerReview`.

![Configuration form for the analyzeCustomerReviews call: empty CustomerReview field with Text/Expression toggle, Result name reviewResponse, Variable Type ReviewResponse (locked), Save button.](/img/genai/tutorials/review-summarizer-natural-function/21-natural-function-config-form.png)

Bind **CustomerReview** to the inbound payload variable `review`. Leave **Result** (the variable name that will hold the typed return value, used by the next node) as `reviewResponse`, and **Variable Type** as the locked `ReviewResponse` (it always matches the function's declared return type).

![Configuration form filled in: CustomerReview bound to review (variable pill), Result reviewResponse, Variable Type ReviewResponse, Save button enabled.](/img/genai/tutorials/review-summarizer-natural-function/22-bind-review-to-customer-review.png)

Click **Save**. The natural-function node lands in the flow.

### Step 3.4: Add the return

Click the empty placeholder between the natural function call and **Error Handler**. In the Add Node panel, under **Control**, pick **Return**.

![Resource flow with Start, the analyzeCustomerReviews (reviewResponse) node, an empty placeholder, and Error Handler. The Add Node panel on the right has Return highlighted under Control.](/img/genai/tutorials/review-summarizer-natural-function/23-add-return.png)

In the Return panel, set the **Expression / Return value** to `reviewResponse`.

![Return node configuration panel saying "This operation has no required parameters. Optional settings can be configured below." with the Expression set to the variable reviewResponse. A Saving... indicator is on the right.](/img/genai/tutorials/review-summarizer-natural-function/24-set-reviewResponse-as-return.png)

The completed flow:

![Final resource flow with Start, then analyzeCustomerReviews (reviewResponse), then Return reviewResponse, then Error Handler.](/img/genai/tutorials/review-summarizer-natural-function/25-complete-flow.png)

---

## 4. Run and test

### Step 4.1: Run the service

From the **Overview** page click **Run**. WSO2 Integrator applies the `--experimental` flag and starts the service.

![Integration Overview page with the Run button highlighted in the top-right toolbar. The design diagram shows httpDefaultListener connected to the /api/v1 service with a POST /analyze resource. A toast at the bottom right reads "WSO2 default model provider configuration values were added to t…".](/img/genai/tutorials/review-summarizer-natural-function/26-run.png)

### Step 4.2: Send a test request

From the resource editor, click **Try It** in the top-right toolbar. Send a `POST /api/v1/analyze` with this body:

```json
{
  "review": "Loved the sound quality, but the charging case died after a week and support never replied."
}
```

### Step 4.3: Read the structured response

The natural function returns a fully structured response matching `ReviewResponse`.

![Try It panel showing the POST /api/v1/analyze request and the structured ReviewResponse returned by the natural function.](/img/genai/tutorials/review-summarizer-natural-function/27-try-it-result.png)

The LLM analyzed the review, identified the overall sentiment, extracted per-topic sentiment, flagged the customer as a churn risk, and suggested a concrete follow-up action. The response comes back as a typed `ReviewResponse` record, with no JSON parsing or schema validation in your code.

> Ballerina HTTP services return `201 Created` for POST requests by default; that is expected behaviour, not an error.

---

## What's next

- **[Natural Functions reference](/docs/genai/develop/natural-functions/overview)** — the single-page reference covering the form, the Prompt node, typed return inference, and calling from a flow.
- **[Email Generator with Direct LLM](email-generator-direct-llm.md)** — a similar tutorial built around direct LLM calls.
