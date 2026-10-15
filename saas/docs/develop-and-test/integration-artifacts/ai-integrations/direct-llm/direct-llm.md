---
title: Direct LLM Calls
---

# Direct LLM Calls

A **direct LLM call** is the simplest way to use AI in WSO2 Integrator. You add a node to a flow, write a prompt, and get a typed response back. No agent loop, no memory, no tools. One round-trip.

This page is a single, end-to-end reference for everything you need to make that call work in WSO2 Integrator: adding a model provider, dropping a `generate` node, writing the prompt, and binding the response to a Ballerina type.

:::tip Looking for a hands-on walkthrough?
See the **[Email Generator with Direct LLM](../../../../guides/how-to-guides/email-generator-direct-llm.md)** tutorial. It builds a `POST /emails/generate` service end-to-end using everything described on this page.

## When to use direct LLM calls

| Use direct LLM when… | Look elsewhere when… |
|---|---|
| You need a single-shot LLM call inside a flow. | You want a typed function with an English body. Use [Natural Functions](../natural-functions/natural-functions.md). |
| You want full control over the prompt at the point of use. | The same prompt is reused all over the codebase. Wrap it in a [natural function](../natural-functions/natural-functions.md) instead. |
| The LLM doesn't need to call any tools or remember earlier turns. | The task needs tool calls, multi-step reasoning, or conversation history. Use an [AI Agent](../agents/agents.md). |
| You need to ground answers in your own documents. | Add [RAG](../rag/rag.md) and pass the retrieved context into the prompt. |

## How a direct LLM call looks in a flow

A typical flow with a direct LLM call has a `generate` node sitting between your inputs and the next step, with a small wire to the model-provider connection on the right.

<ThemedImage
    alt="A WSO2 Integrator flow on the canvas showing Start, an ai:generate node bound to an aiWso2modelprovider connection on the right, then log:printInfo with template `string ${summary}`, then Return, then Error Handler."
    sources={{
        light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/01-complete-flow-with-direct-llm-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/01-complete-flow-with-direct-llm-v5.1.png'),
    }}
/>

To build this you do three things, in order:

1. [**Add a model provider**](#add-a-model-provider), the connection to the LLM.
2. [**Add the generate node**](#the-generate-node), the call itself.
3. [**Write the prompt**](#the-prompt-editor) and pick the expected type.

The rest of this page walks each step in order.

---

## Add a model provider

A model provider is the connection that the `generate` node uses to reach the LLM. You create it once and reuse it in every direct LLM call in the integration.

1. In the flow canvas, select the **+** icon where you want to add the LLM call. In the node palette that opens, under **AI** > **Direct LLM**, select **Model Provider**.

    <ThemedImage
        alt="The node palette on the right side of the flow canvas, with the AI section expanded and Model Provider highlighted under Direct LLM. Knowledge Base, Data Loader, and Augment Query appear under RAG."
        sources={{
            light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/05-add-model-provider-node-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/05-add-model-provider-node-v5.1.png'),
        }}
    />

2. The **Model Providers** panel lists the model providers in the project. If the project has none yet, select **Add Model Provider**.

    <ThemedImage
        alt="The Model Providers panel with an empty list and the Add Model Provider button highlighted."
        sources={{
            light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/06-add-model-provider-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/06-add-model-provider-v5.1.png'),
        }}
    />

3. Select a provider from the list. The simplest option is **Default Model Provider (WSO2)**, which needs no API key, only a one-time WSO2 sign-in. To use OpenAI, Anthropic, Azure OpenAI, or another provider, see [Model Providers](../ai-building-blocks/model-providers.md).

    <ThemedImage
        alt="The Model Providers list showing Default Model Provider (WSO2) highlighted, followed by Anthropic, Azure OpenAI, Deepseek, Google Vertex, Mistral, Ollama, and OpenAI model providers."
        sources={{
            light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/07-select-default-model-provider-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/07-select-default-model-provider-v5.1.png'),
        }}
    />

4. Enter a **Model Provider Name** (for example, `aiWso2modelprovider`) and select **Save**. The **Result Type** is set for you based on the provider you selected.

    <ThemedImage
        alt="The ai : Model Provider form with Model Provider Name set to aiWso2modelprovider, a locked Result Type of ai:Wso2ModelProvider, and a Save button."
        sources={{
            light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/08-model-provider-config-v5.1.png'),
            dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/08-model-provider-config-v5.1.png'),
        }}
    />

The new connection appears under **Connections** in the project explorer and in the **Model Providers** list.

---

## The generate node

The `generate` node is the workhorse of direct LLM calls. It sends a single prompt to a model provider and binds the response to a variable.

### Where to find it

The `generate` action lives **on the model-provider connection itself**, not as a standalone node under AI. In the node panel, under **AI** > **Direct LLM**, select **Model Provider** to open the **Model Providers** panel. Expand the connection, and select **Generate**.

<ThemedImage
    alt="The Model Providers panel with aiWso2modelprovider expanded, showing two actions: Chat and Generate. The Generate tooltip says that it sends a chat request to the model and generates a value that belongs to the type corresponding to the type descriptor argument."
    sources={{
        light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/09-pick-generate-action-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/09-pick-generate-action-v5.1.png'),
    }}
/>

### The configuration form

When the form opens, three fields are all you need: the **Prompt**, the **Result** variable, and the **Expected Type**. Add the prompt that describes the work, pick the type you want the response in for your use case, and select **Save**.

<ThemedImage
    alt="The aiWso2modelprovider generate form with the Prompt field set to Summarize the payload, where payload is an inserted variable, the Result field set to td, the Expected Type field set to string, and a Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/10-generate-action-configure-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/10-generate-action-configure-v5.1.png'),
    }}
/>

| Field | Required | What it does |
|---|---|---|
| **Prompt** | Yes | The instruction sent to the LLM. Use the **Prompt** mode to write a prompt template with inserted values, or the **Expression** mode to pass a Ballerina expression. Detailed in [The prompt editor](#the-prompt-editor). |
| **Result** | Yes | The variable name where the response is stored. Used by later nodes. |
| **Expected Type** | Yes | The Ballerina type the response should be parsed into. |

The **Expected Type** field is what makes the response come back as a typed value. A `string`, an `int`, a record, an array. Not a blob of text you have to parse yourself. The runtime derives a JSON schema from the type, asks the model to fill it, parses the response back, and hands the typed value to the next node. **You don't need to write any schema instructions in the prompt.** The type drives that automatically.

There are no per-call overrides on the `generate` node. Anything you'd tune (temperature, max tokens, and so on) lives on the model provider connection and applies to every call that uses it. See [Model Providers](../ai-building-blocks/model-providers.md) for the full list of advanced configurations per provider.

### After saving

Click **Save** and the node lands in the flow as `<provider>:generate` (for example `ai:generate` for the WSO2 default provider, `openai:generate` for OpenAI, `azure:generate` for Azure OpenAI), with a small connection wire to its model-provider node on the right. From here you can chain follow-up nodes the same way you would after any other call. (See the canvas screenshot at the [top of this page](#how-a-direct-llm-call-looks-in-a-flow).)

---

## The prompt editor

The **Prompt** is the instruction you send to the LLM. Click any **Prompt** field and WSO2 Integrator opens a rich-text editor in a dialog. The toolbar gives you the usual formatting tools (Insert, undo/redo, Bold, Italic, Link, headings, quote, lists, tables, magic-wand AI assist) and a **Preview / Source** toggle.

<ThemedImage
    alt="The Prompt editor dialog opened with the toolbar at the top: Insert, undo/redo, Bold, Italic, Link, H1, quote, lists, table, and a magic-wand AI assist icon, plus a Preview/Source toggle."
    sources={{
        light: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/04-prompt-editor-v5.1.png'),
        dark: useBaseUrl('/img/genai/develop/direct-llm-v5.1/direct-llm/04-prompt-editor-v5.1.png'),
    }}
/>

The **Insert** menu is the bridge between the prompt and the rest of your project. Select it to pull in values from anywhere in scope: request inputs, flow variables, configurables, project functions, or RAG documents. It opens a menu listing **Inputs**, **Variables**, **Configurables**, **Functions**, and **Documents**.

| Element | What it does |
|---|---|
| **Insert** | Pull a value into the prompt: **Inputs** (resource path/query/payload params), **Variables** (anything in scope in the flow), **Configurables** (`Config.toml` values), **Functions** (calls into project functions), **Documents** (RAG retrieval results). |
| **Bold / Italic / Link** | Standard text formatting (rendered as plain text in the prompt). |
| **H1 / Quote / Lists / Tables** | Structure the prompt visually. Helpful for long prompts. |
| **Magic-wand AI assist** | Suggests a prompt scaffold for you when you describe the task in one line. |
| **Preview / Source** | Toggle between the rendered preview and the raw template source. |

---

## What's next

- **[Email Generator with Direct LLM (Tutorial)](../../../../guides/how-to-guides/email-generator-direct-llm.md)** — build a complete `POST /emails/generate` service from scratch using everything on this page.
- **[Model Providers](../ai-building-blocks/model-providers.md)** — switch the LLM provider for production; tune temperature, max tokens, retries.
- **[Natural Functions](../natural-functions/natural-functions.md)** — when the same prompt is used in many places, package it as a typed function.
- **[RAG](../rag/rag.md)** — ground the model's answers in your own documents.
- **[AI Agents](../agents/agents.md)** — if the task needs tools or multi-turn reasoning.
