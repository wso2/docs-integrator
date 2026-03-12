---
sidebar_position: 3
title: Document Ingestion Pipelines
description: Build pipelines that ingest documents from various sources into your RAG knowledge base.
---

# Document Ingestion Pipelines

Document ingestion is the process of loading, parsing, chunking, embedding, and storing your content in a vector database. A well-designed ingestion pipeline determines the quality of your RAG system's retrieval and responses.

This page covers how to build ingestion pipelines for different document types and sources in WSO2 Integrator.

## Ingestion Pipeline Architecture

Every ingestion pipeline follows the same core stages:

```
Source → Load → Parse → Clean → Chunk → Embed → Store
```

```ballerina
import ballerinax/ai.rag;

// High-level pipeline definition
final rag:IngestionPipeline pipeline = check new ({
    embeddingModel: {provider: "openai", model: "text-embedding-3-small", apiKey: openAiApiKey},
    vectorStore: {provider: "chromadb", url: chromaDbUrl, collection: "knowledge_base"},
    chunking: {strategy: rag:PARAGRAPH, maxChunkSize: 500, overlap: 50}
});
```

## Ingesting Text Files

The simplest ingestion: read text files and push them into the pipeline.

```ballerina
import ballerina/io;
import ballerina/file;

function ingestTextFile(string filePath) returns error? {
    // Load
    string content = check io:fileReadString(filePath);

    // Parse and clean (text files need minimal parsing)
    string cleaned = content.trim();

    // Get the filename as the source identifier
    string fileName = check file:basename(filePath);

    // Ingest through the pipeline
    check pipeline.ingest(cleaned, {
        source: fileName,
        fileType: "text",
        ingestedAt: time:utcNow().toString()
    });
}

// Batch ingest all text files in a directory
function ingestDirectory(string dirPath) returns error? {
    file:MetaData[] files = check file:readDir(dirPath);
    foreach file:MetaData f in files {
        if f.absPath.endsWith(".txt") || f.absPath.endsWith(".md") {
            check ingestTextFile(f.absPath);
        }
    }
}
```

## Ingesting PDFs

Extract text from PDF documents before chunking and embedding.

```ballerina
import ballerinax/ai.rag;

function ingestPdf(string filePath) returns error? {
    // Use the built-in PDF parser
    rag:ParsedDocument parsed = check rag:parsePdf(filePath);

    // Ingest each page with page number metadata
    foreach int i in 0 ..< parsed.pages.length() {
        check pipeline.ingest(parsed.pages[i].text, {
            source: parsed.fileName,
            pageNumber: i + 1,
            totalPages: parsed.pages.length()
        });
    }
}
```

## Ingesting HTML and Web Content

Crawl web pages, strip HTML, and ingest the content.

```ballerina
import ballerina/http;
import ballerinax/ai.rag;

final http:Client webClient = check new ("https://docs.example.com");

function ingestWebPage(string path) returns error? {
    // Fetch the page
    http:Response response = check webClient->get(path);
    string htmlContent = check response.getTextPayload();

    // Parse HTML to extract text content
    rag:ParsedDocument parsed = check rag:parseHtml(htmlContent);

    // Ingest with source URL metadata
    check pipeline.ingest(parsed.text, {
        source: string `https://docs.example.com${path}`,
        contentType: "html",
        title: parsed.title
    });
}

// Crawl a sitemap and ingest all pages
function ingestFromSitemap(string sitemapUrl) returns error? {
    http:Response response = check webClient->get(sitemapUrl);
    xml sitemapXml = check response.getXmlPayload();

    // Extract URLs from sitemap
    string[] urls = from xml urlEntry in sitemapXml/<loc>
        select urlEntry.data();

    foreach string url in urls {
        error? result = ingestWebPage(url);
        if result is error {
            log:printWarn("Failed to ingest page", url = url, err = result.message());
        }
    }
}
```

## Ingesting Database Records

Pull records from a database and index them for semantic search.

```ballerina
import ballerinax/postgresql;
import ballerina/sql;

function ingestProductCatalog() returns error? {
    stream<ProductRecord, sql:Error?> products = pgClient->query(
        `SELECT id, name, description, category, specifications
         FROM products WHERE active = true`
    );

    check from ProductRecord product in products
        do {
            // Compose a text representation of the record
            string text = string `Product: ${product.name}
                Category: ${product.category}
                Description: ${product.description}
                Specifications: ${product.specifications}`;

            check pipeline.ingest(text, {
                source: "product-catalog",
                productId: product.id,
                category: product.category
            });
        };
}

type ProductRecord record {|
    string id;
    string name;
    string description;
    string category;
    string specifications;
|};
```

## Ingesting from Event Streams

Process documents from Kafka or other message brokers in real time.

```ballerina
import ballerinax/kafka;

listener kafka:Listener docListener = new ("localhost:9092", {
    groupId: "rag-ingestion",
    topics: ["new-documents"]
});

service on docListener {
    remote function onConsumerRecord(kafka:ConsumerRecord record) returns error? {
        // Parse the incoming document event
        json payload = check value:fromJsonString(check string:fromBytes(record.value));
        string content = check payload.content;
        string source = check payload.source;
        string docType = check payload.docType;

        // Route to the appropriate parser
        string parsedText = check parseDocument(content, docType);

        // Ingest into the RAG pipeline
        check pipeline.ingest(parsedText, {
            source: source,
            docType: docType,
            ingestedAt: time:utcNow().toString()
        });
    }
}

function parseDocument(string content, string docType) returns string|error {
    match docType {
        "pdf" => {
            rag:ParsedDocument parsed = check rag:parsePdfBytes(content.toBytes());
            return parsed.text;
        }
        "html" => {
            rag:ParsedDocument parsed = check rag:parseHtml(content);
            return parsed.text;
        }
        _ => {
            return content;  // Plain text
        }
    }
}
```

## Incremental Ingestion

Update your knowledge base without re-ingesting everything. Track what has been ingested and only process changes.

```ballerina
function incrementalIngest() returns error? {
    // Get the last ingestion timestamp
    string? lastRun = check getLastIngestionTimestamp();

    // Fetch only new or updated documents
    stream<DocumentRecord, sql:Error?> newDocs = pgClient->query(
        `SELECT id, content, source, updated_at
         FROM documents
         WHERE updated_at > ${lastRun ?: "1970-01-01"}
         ORDER BY updated_at ASC`
    );

    check from DocumentRecord doc in newDocs
        do {
            // Delete old chunks for this document (if updating)
            check vectorStore.deleteByMetadata({"documentId": doc.id});

            // Ingest the new version
            check pipeline.ingest(doc.content, {
                documentId: doc.id,
                source: doc.source,
                updatedAt: doc.updatedAt
            });
        };

    // Record the ingestion timestamp
    check saveIngestionTimestamp(time:utcNow().toString());
}
```

## Scheduled Ingestion

Run ingestion on a schedule using Ballerina's task scheduling.

```ballerina
import ballerina/task;

// Run ingestion every 6 hours
final task:JobId ingestionJob = check task:scheduleJobRecurByFrequency(
    new IngestionJob(),
    interval = 21600  // 6 hours in seconds
);

class IngestionJob {
    *task:Job;

    public function execute() {
        error? result = incrementalIngest();
        if result is error {
            log:printError("Scheduled ingestion failed", err = result.message());
        }
    }
}
```

## What's Next

- [Chunking & Embedding](chunking-embedding.md) — Optimize how documents are split and vectorized
- [Vector Databases](vector-databases.md) — Configure your vector storage backend
- [Building a RAG Service](building-rag-service.md) — Put it all together in a queryable service
- [RAG Architecture Overview](architecture-overview.md) — Understand the full pipeline design
