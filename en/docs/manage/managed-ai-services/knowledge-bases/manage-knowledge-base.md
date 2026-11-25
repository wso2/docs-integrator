---
sidebar_position: 3
sidebar_label: Manage a Knowledge Base
title: Manage a Knowledge Base
description: Manage Knowledge Base configuration, connection details, retrieval testing, and deletion on Choreo Integration.
keywords: [choreo integrator, choreo cloud, manage knowledge base, kb service, api key, retrieval]
slug: /manage/managed-ai-services/knowledge-bases/manage-knowledge-base
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Manage a Knowledge Base

Open **AI Services** > **Knowledge Bases** and select one from the list. Its detail page has four tabs:

| Tab | What you can do |
| --- | --- |
| **Overview** | Review the configuration summary and KB service URL; add and view data sources. |
| **Configurations** | Edit the display name, description, vector store, embedding model, and chunking settings. |
| **Connect to KB** | Copy the service URL and get an API key to call it. |
| **Retrieval** | Send a test query and tune the maximum chunk count and similarity threshold. |

<ThemedImage
    alt="Knowledge base Overview tab showing the configuration summary, KB service URL, and an empty KB data sources list"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-overview.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-overview.png'),
    }}
/>

## Edit the configuration

1. Open **Configurations**.
2. Update the display name, description, vector store, embedding model, or chunking settings.
3. Click **Save**.

<ThemedImage
    alt="Configurations tab with a warning that saving restarts the knowledge base service and its data sources"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-configurations.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-configurations.png'),
    }}
/>

:::caution
Saving restarts the knowledge base service and every data source of this knowledge base, so they pick up the new settings. If you change the embedding model, collection, index, table, or chunking settings, re-ingest content and retest retrieval before directing production traffic to it.
:::

## Connect an application

Open **Connect to KB** to copy the **Service URL** and get an API key:

1. Click **View KB Service**.
2. On the KB Service's overview, scroll to the API keys section of its environment card.
3. Click **Generate API key**, name the key, and copy it right away.
4. Call the Service URL with the generated key.

<ThemedImage
    alt="Connect to KB tab with the Service URL, Get an API key instructions and a View KB Service button, and the underlying KB service listed below"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-connect.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-connect.png'),
    }}
/>

## Test retrieval

1. Open **Retrieval**.
2. Optional: click **Query configurations** and adjust **Maximum chunks to retrieve** (1–10, default `5`) and **Minimum similarity threshold** (0–1, default `0.7`; a lower threshold returns more, less relevant chunks).

    <ThemedImage
        alt="Query configurations dialog with Maximum chunks to retrieve and Minimum similarity threshold fields"
        sources={{
            light: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-query-configurations.png'),
            dark: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-query-configurations.png'),
        }}
    />

3. Type a question and press Enter. The tester shows your query and the retrieved chunks in a chat-style view.

<ThemedImage
    alt="Retrieval tab showing a submitted query and a Failed to retrieve chunks message, since this knowledge base has no data source"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-retrieval.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/kb-retrieval.png'),
    }}
/>

A knowledge base with no ingested content returns **Failed to retrieve chunks. Please try again.** — add and ingest a [data source](./add-data-sources.md) first.

{/* TODO(v3): the old pre-v3-cut docs described an optional Cohere reranking
    toggle in Query configurations. It wasn't present in this pass's Query
    configurations dialog (only Maximum chunks to retrieve and Minimum
    similarity threshold) - re-verify whether it still exists before
    restoring that claim. */}

## Delete a knowledge base

Click the delete icon next to a knowledge base on the **Knowledge Bases** list.

{/* TODO(v3): the delete confirmation flow and any dependent-resource checks
    (for example, whether deletion is blocked while data sources or
    connected integrations still exist) are unverified - re-verify before
    documenting the exact steps and warnings. */}

## What's next

- [Knowledge Bases overview](./knowledge-bases.md)
- [Create a Knowledge Base](./create-knowledge-base.md)
- [Add data sources](./add-data-sources.md)
