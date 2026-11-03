---
sidebar_position: 5
title: Chunkers
description: Reference for every Chunker in WSO2 Agent Builder. Covers the AUTO and DISABLE constants, Generic Recursive Chunker, Markdown Chunker, HTML Chunker, and the Devant remote chunker, including strategies, defaults, and create form fields.
keywords: [wso2 agent builder, chunker, rag, text splitting, chunking strategy, knowledge base, embedding]
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/chunkers
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Chunkers

A **Chunker** splits a document into smaller pieces before they are embedded. Smaller chunks improve retrieval precision but lose surrounding context; larger chunks preserve context but are less precise.

> Most projects start with the default (`AUTO`) and only configure a chunker explicitly when retrieval quality drops because chunks are too big or too small for the content.

## Available actions

A chunker exposes one action.

| Action | What it does | Required parameters |
|---|---|---|
| **Chunk** | Splits a document into chunks according to the chunker's strategy. | **Document** (the input document). |

You don't usually call this directly. The Knowledge Base calls it for you on **Ingest**.

## `AUTO` and `DISABLE`

You almost always pick one of these in the **Vector Knowledge Base** form's **Chunker** field. Only switch to a custom chunker when the defaults aren't producing useful chunks.

| Value | Effect |
|---|---|
| **AUTO** *(default)* | The Knowledge Base picks a chunker automatically based on document type: Markdown chunker for `.md`, HTML chunker for `.html`, Generic Recursive for everything else. |
| **DISABLE** | No chunking. Each document is treated as a single chunk. Use when documents are already small or pre-chunked. |

## Where to find chunkers

Chunkers are configured in the **Create Vector Knowledge Base** form, which opens whenever you create a vector knowledge base. For example, on the agent canvas select **Add Tool** → **Use Knowledge Base** → **Vector Knowledge Base** → **Retrieve**, then select **Create knowledge base**. See [Knowledge Bases](../knowledge-bases/knowledge-bases.md).

The form's **Chunker** field defaults to **AUTO**. To use a specific chunker, select **+ Create New Chunker** below it.

<ThemedImage
    alt="The Create Vector Knowledge Base form with the Chunker field set to AUTO and the Create New Chunker link below it highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/00-chunker-field-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/00-chunker-field-v1.0.png'),
    }}
/>

The **Select Chunker** picker opens with an **AI Chunkers** group, described as *"Chunkers available in ballerina/ai"* and badged **3 options**, and the **Devant Chunker**:

<ThemedImage
    alt="Select Chunker picker showing the AI Chunkers group, described as Chunkers available in ballerina/ai and badged 3 options, and the Devant Chunker."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/01-select-list-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/01-select-list-v1.0.png'),
    }}
/>

Expand **AI Chunkers** to reveal the three individual chunker types: **Generic Recursive Chunker** (*"Represents a Genereric document chunker..."*), **Markdown Chunker** (*"Represents a Markdown document chunker..."*), and **Html Chunker** (*"Represents an HTML document chunker..."*):

<ThemedImage
    alt="Select Chunker picker with AI Chunkers expanded, listing Generic Recursive Chunker, Markdown Chunker, and Html Chunker, each with a short description."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/02-select-list-expanded-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/02-select-list-expanded-v1.0.png'),
    }}
/>

## Supported chunkers

All three local chunkers ship in the core `ballerina/ai` package. The Devant Chunker is a remote implementation that delegates the work to the Devant AI service.

| Chunker | Module | Default strategy | Use when |
|---|---|---|---|
| **Generic Recursive** | `ballerina/ai` | `PARAGRAPH` | Plain text. Falls back through paragraph, sentence, line, word, then character. |
| **Markdown** | `ballerina/ai` | `MARKDOWN_HEADER` | Markdown documents. Splits on headings first, falls back through code block, horizontal line, paragraph, line, sentence, word, then character. |
| **HTML** | `ballerina/ai` | `HTML_HEADER` | HTML documents. Splits on `<h1>`–`<h6>`, falls back through `<p>`, `<br>`, sentence, word, character. |
| **Devant** | [`ballerinax/ai.devant`](https://central.ballerina.io/ballerinax/ai.devant/latest) | `RECURSIVE` | Binary documents (PDF, DOCX, PPTX). Delegates to the Devant AI service. |

> All four chunkers share the same two top-level parameters: **Max Chunk Size** (the cap, in characters, per chunk) and **Max Overlap Size** (characters reused at the boundary between adjacent chunks for context continuity). The local chunkers default to `200` and `40`; the Devant chunker defaults to `500` and `50`.

## Generic Recursive Chunker

For plain text. Begins splitting using the chosen strategy and recursively falls back to finer-grained units when a chunk would exceed the size limit.

### Create form

<ThemedImage
    alt="Create Generic Recursive Chunker form. Header reads 'Initializes a new instance of the GenericRecursiveChunker.' Banner: 'This operation has no required parameters. Optional settings can be configured below.' Fields: Max Chunk Size (default 200), Max Overlap Size (default 40), Strategy (default PARAGRAPH), Chunker Name (default aiGenericrecursivechunker), Result Type (locked to ai:GenericRecursiveChunker). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/03-generic-recursive-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/03-generic-recursive-basic-v1.0.png'),
    }}
/>

No required fields. Sensible defaults work for most prose.

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Max Chunk Size** | `200` | Any positive integer (characters) | Maximum characters allowed per chunk. |
| **Max Overlap Size** | `40` | Any non-negative integer (characters) | Characters reused from the end of the previous chunk when starting the next. The overlap is whole sentences taken in reverse, capped at this length, to preserve cross-boundary context. |
| **Strategy** | `PARAGRAPH` | `PARAGRAPH`, `SENTENCE`, `LINE`, `WORD`, `CHARACTER` | Starting splitting unit. The chunker falls back through finer units automatically when a chunk overflows. |

#### Strategy fall-back order

Strategies are tried from large unit to small. If a chunk would exceed Max Chunk Size, the chunker falls back to the next finer strategy.

| Strategy | Boundary | Falls back to |
|---|---|---|
| `PARAGRAPH` | Two or more newlines (`\n\n`). | `SENTENCE`, `LINE`, `WORD`, `CHARACTER` |
| `SENTENCE` | OpenNLP sentence detector. | `WORD`, `CHARACTER` |
| `LINE` | One or more newlines (`\n`). | `WORD`, `CHARACTER` |
| `WORD` | One or more spaces. | `CHARACTER` |
| `CHARACTER` | Individual characters. | (terminal) |

## Markdown Chunker

Header-aware chunker for Markdown. Starts at heading level `##` and walks down before falling back to structure-aware then character-level strategies.

### Create form

<ThemedImage
    alt="Create Markdown Chunker form. Header reads 'Initializes a new instance of the MarkdownChunker.' Banner: 'This operation has no required parameters. Optional settings can be configured below.' Fields: Max Chunk Size (default 200), Max Overlap Size (default 40), Strategy (default MARKDOWN_HEADER), Chunker Name (default aiMarkdownchunker), Result Type (locked to ai:MarkdownChunker). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/04-markdown-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/04-markdown-basic-v1.0.png'),
    }}
/>

No required fields.

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Max Chunk Size** | `200` | Any positive integer | Max characters per chunk. |
| **Max Overlap Size** | `40` | Any non-negative integer | Overlap characters between adjacent chunks. |
| **Strategy** | `MARKDOWN_HEADER` | `MARKDOWN_HEADER`, `CODE_BLOCK`, `HORIZONTAL_LINE`, `PARAGRAPH`, `LINE`, `SENTENCE`, `WORD`, `CHARACTER` | Starting splitting unit. |

#### Strategy options

| Strategy | What it splits on |
|---|---|
| `MARKDOWN_HEADER` | Markdown headers, starting at `##` and walking down to `######`. Falls back through `CODE_BLOCK`, `HORIZONTAL_LINE`, `PARAGRAPH`, `LINE`, `SENTENCE`, `WORD`, `CHARACTER`. |
| `CODE_BLOCK` | Fenced code blocks. Each becomes a chunk tagged with type `code_block` (and a `language` annotation if declared). Code-block chunks are never merged with neighbours. |
| `HORIZONTAL_LINE` | The patterns `***`, `---`, `___`. Falls back to `PARAGRAPH`. |
| `PARAGRAPH` / `SENTENCE` / `LINE` / `WORD` / `CHARACTER` | Same semantics as the Generic Recursive Chunker. |

## HTML Chunker

Tag-aware chunker for HTML. Starts at heading tags and falls back through paragraphs, line breaks, then character-level strategies.

### Create form

<ThemedImage
    alt="Create Html Chunker form. Header reads 'Initializes a new instance of the HtmlChunker.' Banner: 'This operation has no required parameters. Optional settings can be configured below.' Fields: Max Chunk Size (default 200), Max Overlap Size (default 40), Strategy (default HTML_HEADER), Chunker Name (default aiHtmlchunker), Result Type (locked to ai:HtmlChunker). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/05-html-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/05-html-basic-v1.0.png'),
    }}
/>

No required fields.

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Max Chunk Size** | `200` | Any positive integer | Max characters per chunk. |
| **Max Overlap Size** | `40` | Any non-negative integer | Overlap characters between adjacent chunks. |
| **Strategy** | `HTML_HEADER` | `HTML_HEADER`, `HTML_PARAGRAPH`, `HTML_LINE`, `SENTENCE`, `WORD`, `CHARACTER` | Starting splitting unit. |

#### Strategy options

| Strategy | What it splits on |
|---|---|
| `HTML_HEADER` | `<h1>` through `<h6>`. Falls back through `HTML_PARAGRAPH`, `HTML_LINE`, `SENTENCE`, `WORD`, `CHARACTER`. |
| `HTML_PARAGRAPH` | `<p>` tags. Falls back through `HTML_LINE`, `SENTENCE`, `WORD`, `CHARACTER`. |
| `HTML_LINE` | `<br>` tags. Falls back through `SENTENCE`, `WORD`, `CHARACTER`. |
| `SENTENCE` / `WORD` / `CHARACTER` | Same semantics as the other chunkers. |

## Devant Chunker

A remote chunker that delegates the actual splitting to the Devant AI service. Useful when you have **binary** documents (PDF, DOCX, PPTX) that the local chunkers can't read directly. Pair it with the Devant Binary Data Loader (`devant:BinaryDataLoader`) to read the file as a binary document.

### Create form

The Devant Chunker is added from the same **Select Chunker** picker. Its create form requires the Devant AI service endpoint and an access token.

<ThemedImage
    alt="Create Devant Chunker form. Header reads 'Initializes a new Chunker instance.' Fields: Service URL and Access Token (both required), Maximum Chunk Size In Characters (default 500), Maximum Overlap Size In Characters (default 50), and Chunking Strategy (default RECURSIVE). Save button."
    sources={{
        light: useBaseUrl('/img/genai/develop/components/chunkers/06-devant-basic-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/components/chunkers/06-devant-basic-v1.0.png'),
    }}
/>

| Field | Required | Default | Available values |
|---|---|---|---|
| **Service URL** | Yes | N/A | The base URL of the Devant AI service endpoint. |
| **Access Token** | Yes | N/A | The access token used to authenticate API requests. |

### Advanced configurations

| Field | Default | Available values | What it controls |
|---|---|---|---|
| **Maximum Chunk Size In Characters** | `500` | Any positive integer | Max characters per chunk. |
| **Maximum Overlap Size In Characters** | `50` | Any non-negative integer | Overlap characters between adjacent chunks. |
| **Chunking Strategy** | `RECURSIVE` | `RECURSIVE`, `PARAGRAPH`, `SENTENCE`, `CHARACTER` | The strategy the Devant AI service uses to chunk the document. |

Plus the [Standard HTTP Advanced Configurations](model-providers.md#standard-http-advanced-configurations).

> Only binary documents are accepted. The document's metadata must include a file name so the Devant AI service can detect the source format.

---

## Selecting a chunk size

Chunk size is the most-tuned knob in RAG. Some rules of thumb:

| Symptom | Try |
|---|---|
| Retrieval brings back the right doc but the wrong section. | **Smaller** Max Chunk Size (try 150). |
| Retrieved chunks lose context (an answer is cut off mid-thought). | **Larger** Max Chunk Size (try 400) or **larger** Max Overlap Size. |
| Many tiny low-relevance results crowding out the good one. | **Larger** Max Chunk Size. |
| Retrieval cost is high (many calls, slow queries). | **Larger** Max Chunk Size, fewer chunks per document. |

The defaults (`200` / `40`) are tuned for prose. Code-heavy or table-heavy content usually wants larger chunks.

## What's next

- [Embedding Providers](embedding-providers.md) - Configure the model that converts chunks into vectors.
- [Vector Stores](vector-stores.md) - Set up the store that indexes and retrieves those vectors.
- [Knowledge Bases](../knowledge-bases/knowledge-bases.md) - Combine a chunker, embedding provider, and vector store into a single ingest-and-retrieve component.
- [How Knowledge Bases Work](../knowledge-bases/how-knowledge-bases-work.md) - End-to-end walkthrough of the ingestion and query flows.
