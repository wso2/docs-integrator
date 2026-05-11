---
title: RAG Ingestion
---

# RAG Ingestion

The ingestion pipeline converts raw documents into vectors that the RAG query pipeline can retrieve. It runs once (or on a schedule) to populate your vector knowledge base. The query pipeline then searches that knowledge base at runtime.

This page covers building the ingestion pipeline in the WSO2 Integrator: creating an automation, wiring up a data loader, a knowledge base, and running the integration.

> For retrieval and query, see [RAG Query](rag-query.md).

---

## What the pipeline does

```mermaid
flowchart LR
    A[Documents] --> B[Text Data Loader]
    B --> C[ai:Document]
    C --> D[Knowledge Base]
    D --> E[Chunker]
    E --> F[Embedding Provider]
    F --> G[(Vector Store)]
```

The `ingest` action on the Knowledge Base handles everything after document loading: it chunks each document, calls the embedding provider to produce vectors, and persists the resulting entries in the vector store.

---

## Prerequisites

- An integration project open in the WSO2 Integrator.
- A document to ingest (Markdown, plain text, or other supported format).
- A configured embedding provider. The default WSO2 provider works out of the box — run the WSO2 Integrator command `Ballerina: Configure default WSO2 model provider` if you haven't already.

---

## Step 1: Create an automation artifact

An **Automation** runs on integration startup — the right artifact type for a one-shot ingestion job.

1. Click **+ Add Artifact** in the project view.
2. On the Artifacts page, select **Automation** and click **Create**.

    ![Artifacts page with Automation selected.](/img/genai/develop/rag/01-rag-ingestion-artifacts.png)

---

## Step 2: Add a text data loader

A **Text Data Loader** reads a file from disk and wraps its content as an `ai:Document`.

1. In the flow editor, click **+** to open the **Add Node** panel.
2. Go to **AI → RAG → Data Loader**.
3. Click **Add Data Loader** and select **Text Data Loader**.

    ![Add Node panel showing AI → RAG → Data Loader with Text Data Loader selected.](/img/genai/develop/rag/02-add-dataloader.png)

4. In the configuration panel:

    | Field | Value |
    |---|---|
    | **Paths** | Path to the file you want to ingest — e.g. `/resources/knowledge.pdf` |
    | **Name** | A variable name for the loader — e.g. `loader` |
    | **Result Type** | The variable type, set to `ai:TextDataLoader`. |

    ![Text Data Loader configuration form showing Paths, Name, and Result Type fields.](/img/genai/develop/rag/03-dataloader-form.png)

5. Click **Save**.

The node appears on the right panel. It does not load yet — you call its `load` function next.

---

## Step 3: Load the documents

Call the loader's `load` function to execute the read and get back an `ai:Document[]`.

1. Click on the `loader` node and select the `load` action call.

    ![Loader node with the load action call selected.](/img/genai/develop/rag/04-call-load-action.png)

2. In the form that appears, set the result variable name — e.g. `documents`.

    `ai:Document` is a generic content container. It holds the raw text from the source plus optional metadata (file name, URL, category) that you can use to filter results during retrieval.

    ![Load action form with result variable name set to documents.](/img/genai/develop/rag/05-load-form.png)

3. Click **Save**.
    ![Flow editor showing the load action node added to the automation flow.](/img/genai/develop/rag/06-load-node.png)

---

## Step 4: Create a vector knowledge base

The **Vector Knowledge Base** owns the three pluggable parts of a RAG store: a vector store, an embedding provider, and a chunker.

1. Click **+** to add a node.
2. Go to **AI → RAG → Knowledge Base → Vector Knowledge Base**.
    ![Select Knowledge Base picker showing Vector Knowledge Base option.](/img/genai/develop/rag/07-knowledge-base.png)

3. Fill in the form:

    | Field | Required | Values |
    |---|---|---|
    | **Vector Store** | Yes | In-Memory Vector Store, Pinecone, pgvector, Weaviate, or Milvus. |
    | **Embedding Model** | Yes | Default Embedding Provider (WSO2) or any other listed embedding provider — produces 1536-dimensional dense vectors. |
    | **Chunker** | No | `ai:AUTO` is the default and works for most cases. Switch to a specific chunker if retrieval quality degrades: use **Markdown** for `.md` files, **HTML** for web pages, or **Generic Recursive** for plain text. |
    | **Knowledge Base Name** | — | e.g. `knowledgeBase` |

    ![Vector Knowledge Base form showing Vector Store, Embedding Model, Chunker, and Knowledge Base Name fields.](/img/genai/develop/rag/08-vector-knowledge-base-form.png)

4. Click **Save**.

> **In-memory storage is not durable.** All vectors are lost when the integration stops. For production pipelines, configure an external vector store and set `vectorDimension: 1536` to match the WSO2 embedding provider's output.

> **Use the same embedding provider for ingestion and retrieval.** Vectors produced by different providers are not comparable. If you ingest with the WSO2 default provider and retrieve with OpenAI (or vice versa), the similarity search will return no useful results.

See [Vector Stores](/docs/genai/develop/components/vector-stores) and [Knowledge Bases](/docs/genai/develop/components/knowledge-bases) for the full configuration reference.

---

## Step 5: Ingest the documents

Call `ingest` on the knowledge base to chunk, embed, and persist the loaded documents.

1. Click **+** after the knowledge base creation node.
2. Select the `knowledgeBase` variable and choose the **Ingest** action.

    ![Knowledge Base node with Ingest action selected.](/img/genai/develop/rag/09-ingest-action.png)

3. Set **Documents** to the `documents` variable from Step 3.
    ![Ingest action form with the Documents field set to the documents variable.](/img/genai/develop/rag/10-ingest-doc-form.png)

4. Click **Save**.

    ![Flow editor showing the ingest node added after the knowledge base node.](/img/genai/develop/rag/11-with-ingest-node.png)

The `ingest` action:

1. Passes each `ai:Document` through the configured Chunker.
2. Sends each chunk to the Embedding Provider to produce a vector.
3. Persists the vector + chunk content in the Vector Store.

---

## Step 6: Add a completion log

Add a **Log Info** node after the ingest call to confirm the pipeline finished.

| Field | Value |
|---|---|
| **Message** | e.g. `"RAG ingestion complete."` |

This is optional but useful during development and when the automation runs on a schedule.

![Full RAG ingestion pipeline with data loader, knowledge base, ingest, and log nodes.](/img/genai/develop/rag/12-full-rag-ingestion-pipeline.png)

---

## Running the pipeline

Click **Run** at the top right of the project view. The WSO2 Integrator compiles and starts the integration. Because the artifact is an Automation, the ingestion function executes immediately on startup.

Watch the **Run** panel output for the log message. If the run fails, check:

- The file path is correct relative to the project root.
- The WSO2 model provider is configured (`Ballerina: Configure default WSO2 model provider`).
- The embedding provider and vector store are reachable (for external stores).

    ![Run panel output showing the RAG ingestion pipeline completed successfully.](/img/genai/develop/rag/13-run-rag-ingestion-pipeline.png)

---

## Keeping the knowledge base up to date

The in-memory store is rebuilt on every restart, so re-running the integration re-ingests automatically. For durable stores:

- Use **Delete By Filter** before re-ingesting a document to avoid duplicates — filter by a metadata field like `source` or `version`.
- Schedule the automation with a trigger (e.g. an HTTP call, a cron, or a file-watch event) rather than running it once.

See [Knowledge Bases — Delete By Filter](/docs/genai/develop/components/knowledge-bases#public-actions) for details.

---

## What's next

- **[RAG Query](rag-query.md)** — retrieve chunks at runtime and generate grounded responses.
- **[Knowledge Bases](/docs/genai/develop/components/knowledge-bases)** — ingest, retrieve, and delete-by-filter reference.
- **[Vector Stores](/docs/genai/develop/components/vector-stores)** — picking and configuring a production store.
- **[Embedding Providers](/docs/genai/develop/components/embedding-providers)** — available providers and dimension requirements.
- **[Chunkers](/docs/genai/develop/components/chunkers)** — controlling how documents are split before ingest.
