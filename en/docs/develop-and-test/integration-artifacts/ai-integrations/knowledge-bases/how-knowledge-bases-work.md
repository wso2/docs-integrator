---
sidebar_position: 1
sidebar_label: How Knowledge Bases Work
title: How Knowledge Bases Work
description: Ground agent responses in your own documents with knowledge bases. Ingest documents into a knowledge base, then let an agent retrieve the relevant content at query time using Retrieval-Augmented Generation (RAG).
keywords: [wso2 integrator, knowledge base, rag, retrieval-augmented generation, ingestion, retrieval, agent tool]
slug: /develop-and-test/integration-artifacts/ai-integrations/knowledge-bases/how-knowledge-bases-work
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# How Knowledge Bases Work

A knowledge base grounds LLM responses in your own documents. Instead of relying solely on the model's training data, which can be outdated or incomplete, an agent retrieves relevant content from the knowledge base at query time and uses it to answer. This technique is called Retrieval-Augmented Generation (RAG).

Grounding responses in a knowledge base solves two common problems with direct LLM calls:

- **Hallucinations** — the model produces plausible-sounding but incorrect answers because it doesn't have access to your specific content.
- **Stale knowledge** — the model's training data has a cutoff and won't reflect your latest documentation or data.

## How it works

A knowledge base is used in two stages:

<ThemedImage
    alt="Knowledge base stages. Ingestion, run once: Documents go to a Chunker, then an Embedding Provider, and are stored in the Vector Store that backs the knowledge base. Retrieval, run per request: a User question goes to an Embedding Provider, relevant chunks are retrieved from the Vector Store, the prompt is augmented with them, and the LLM returns a Response."
    sources={{
        light: useBaseUrl('/img/genai/develop/knowledge-bases/how-knowledge-bases-work-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/knowledge-bases/how-knowledge-bases-work-v1.0.png'),
    }}
/>

1. **Ingestion**: Documents are split into chunks, converted into vector embeddings, and stored in the knowledge base.
2. **Retrieval**: When a user asks a question, the most relevant chunks are retrieved by semantic similarity and injected into the prompt alongside the question. The model answers using only that retrieved context.

## Knowledge bases in WSO2 Integrator

- **[Knowledge bases overview](knowledge-bases.md)**: Every supported provider, including the Vector, AWS Bedrock, Azure AI Search, and WSO2 Cloud knowledge bases.
- **[Use with an agent](use-with-an-agent.md)**: Give an agent the knowledge base's Retrieve action as a tool so it can search indexed content and generate a grounded response.
- **[Ingest documents](ingest-documents.md)**: Load your documents into the knowledge base before the agent uses it. Ingestion happens in WSO2 Cloud or with your knowledge base provider, not in the agent.
