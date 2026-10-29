---
title: RAG Query with an Agent
---

# RAG Query with an Agent

In WSO2 Agent Builder, give an AI agent access to a WSO2 Cloud Knowledge Base by adding its **Retrieve** action as a tool. When a user asks a relevant question, the agent decides to call the tool, searches the indexed content, and uses the retrieved chunks to produce a grounded response.

You do not need to build a separate flow with Retrieve, Augment Query, Generate, and Return nodes. The agent handles tool selection, query generation, and response generation as part of its reasoning loop.

```mermaid
sequenceDiagram
    participant User
    participant Agent as AI Agent
    participant Tool as Retrieve tool
    participant KB as WSO2 Cloud Knowledge Base
    User->>Agent: Ask a question
    Agent->>Tool: Search query
    Tool->>KB: Retrieve relevant content
    KB-->>Tool: Matching chunks
    Tool-->>Agent: Retrieved context
    Agent-->>User: Grounded response
```

:::info Prerequisites

- Create and populate a WSO2 Cloud Knowledge Base by following [RAG ingestion](rag-ingestion.md).
- Create an [agent with an Agent Chat trigger](../agents/create-an-agent.md#expose-the-agent-as-a-chat-endpoint), or open an existing AI agent.
- Sign in to the WSO2 Cloud organization that contains the knowledge base and select the correct project.

## Add the knowledge base as an agent tool

1. Open the agent canvas. On the **AI Agent** node, select **+ Add Tool**.
2. In the **Add Tool** panel, select **Use Knowledge Base**.

    <ThemedImage
        alt="Add Tool panel listing the available tool types, including Use Knowledge Base."
        sources={{
            light: useBaseUrl('/img/genai/develop/agents/tools/02-add-tool-panel-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/agents/tools/02-add-tool-panel-v1.0.png'),
        }}
    />

3. Select **WSO2 Cloud Knowledge Base**.
4. Select the **Retrieve** action. This exposes knowledge-base retrieval to the agent as a tool.

    <ThemedImage
        alt="Add Tool - Use Knowledge Base panel for the WSO2 Cloud Knowledge Base Retrieve action, showing the tool name, description, knowledge base instance, and Create knowledge base button."
        sources={{
            light: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-create-v1.0.png'),
            dark: useBaseUrl('/img/genai/develop/components-v5.1/knowledge-bases/07-wso2-cloud-create-v1.0.png'),
        }}
    />

5. Under **Knowledge Base Instance**, select an existing WSO2 Cloud Knowledge Base connection. If the integration does not have one yet, select **Create New Knowledge Base**, then choose the knowledge base that you populated in WSO2 Cloud.

    The service URL and authentication configuration are filled from the selected WSO2 Cloud Knowledge Base. Review the retrieval settings and save the connection.

6. Configure the tool:

    | Field | Recommended value |
    | --- | --- |
    | **Tool Name** | Use a clear action name, such as `searchKnowledgeBase`. |
    | **Description** | State what content the knowledge base contains and when the agent should search it. For example: `Search the product documentation for information needed to answer the user's question.` |
    | **Knowledge Base Instance** | The WSO2 Cloud Knowledge Base connection created or selected above. |
    | **Requires Approval** | Leave cleared for normal read-only retrieval. |
    | **Inputs and Mapping** | Keep the query available as a tool input so the agent can generate the search text from the user's question. Configure optional retrieval inputs only when your use case requires them. |

7. Select **Save Tool**.

The Retrieve tool appears on the canvas, connected to the AI Agent node. The agent can now invoke it during its reasoning loop.

## Guide the agent to use the knowledge base

The tool description and agent instructions determine when retrieval is used. Give the agent clear guidance about the knowledge base's scope and how to handle missing information.

For example, add instructions similar to the following to the agent:

```text
Use the searchKnowledgeBase tool when the user asks about our product,
documentation, policies, or other information stored in the knowledge base.
Base the answer on the retrieved content. If the knowledge base does not
contain enough information, say that you could not find a supported answer
instead of inventing one.
```

The agent may answer general conversational questions without calling the tool. For questions covered by the knowledge base, it should retrieve first and use the tool result as context for its response.

## Test the knowledge-base tool

1. Select **Run** on the agent canvas.
2. Open **Chat** and ask a question that can be answered from an ingested document.
3. Confirm that the response uses information from the knowledge base.
4. Open **View Trace** on the response to verify that the agent invoked the Retrieve tool and inspect the query and returned chunks.

For details about inspecting tool calls, see [Agent observability](../agents/observability.md).

## Improve retrieval behavior

| What to tune | Where | Guidance |
| --- | --- | --- |
| Tool selection | Tool **Description** | Name the subjects covered by the knowledge base and explain when the agent should search it. |
| Agent behavior | Agent **Instructions** | Require retrieval for knowledge-grounded questions and define what to do when no relevant content is found. |
| Result relevance | WSO2 Cloud Knowledge Base connection | Adjust **Minimum Similarity Threshold** and optional reranker settings. |
| Source quality | WSO2 Cloud ingestion | Update or re-ingest incomplete, outdated, or poorly structured source content. |

## What's next

- **[RAG ingestion](rag-ingestion.md)** — create and populate the knowledge base in WSO2 Cloud.
- **[Give tools to an agent](../agents/tools.md)** — reference for configuring agent tools.
- **[WSO2 Cloud Knowledge Base](../ai-building-blocks/knowledge-bases.md#wso2-cloud-knowledge-base)** — connection and retrieval configuration reference.
- **[Agent observability](../agents/observability.md)** — inspect the Retrieve tool call and returned results.
