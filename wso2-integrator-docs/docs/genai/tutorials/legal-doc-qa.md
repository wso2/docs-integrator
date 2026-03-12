---
sidebar_position: 4
title: "Building a Legal Document Q&A System with MCP and RAG"
description: Build a legal document Q&A system that combines RAG for document search with MCP for accessing legal databases, exposed as a GraphQL service.
---

# Building a Legal Document Q&A System with MCP and RAG

**Time:** 50 minutes | **Level:** Advanced | **What you'll build:** A legal document Q&A system that combines retrieval-augmented generation (RAG) for searching internal legal documents with MCP-based access to external legal databases, exposed as a GraphQL service.

In this tutorial, you build a legal Q&A system that brings together two powerful patterns. RAG provides semantic search over your organization's contracts, policies, and legal opinions, while MCP servers connect the agent to external legal databases and case law repositories. The combination allows the agent to answer questions grounded in both internal documents and external legal references. The system is exposed as a GraphQL service for flexible querying by frontend applications.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (for embeddings and chat completion)
- PostgreSQL with the pgvector extension installed
- Familiarity with [RAG Architecture](/docs/genai/rag/architecture-overview) and [MCP Overview](/docs/genai/mcp/overview)

## Architecture

```
                          ┌────────────────────┐
                          │  Legal Q&A Agent   │
                          │                    │
   GraphQL Query ────────►│  LLM (GPT-4o)     │
                          │  + RAG Pipeline    │
                          │  + MCP Client      │
                          └────────┬───────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼               ▼
           ┌──────────────┐ ┌───────────┐ ┌──────────────┐
           │  pgvector    │ │ Legal DB  │ │ Case Law     │
           │  (Internal   │ │ MCP Server│ │ MCP Server   │
           │   Documents) │ │           │ │              │
           └──────────────┘ └───────────┘ └──────────────┘
                  RAG             MCP             MCP
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "legal_doc_qa"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "mcp"

[[dependency]]
org = "ballerinax"
name = "postgresql"

[[dependency]]
org = "ballerina"
name = "graphql"
```

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
pgHost = "localhost"
pgPort = 5432
pgUser = "postgres"
pgPassword = "password"
pgDatabase = "legal_docs"
legalDbMcpUrl = "http://localhost:3001"
caseLawMcpUrl = "http://localhost:3002"
```

## Step 2: Define Data Types

```ballerina
// types.bal
type LegalDocumentChunk record {|
    string id;
    string content;
    string source;
    string documentType;   // "contract", "policy", "opinion", "regulation", "memo"
    string? jurisdiction;
    string? effectiveDate;
    int chunkIndex;
    int totalChunks;
|};

type LegalSearchResult record {|
    string content;
    string source;
    string documentType;
    string? jurisdiction;
    float score;
|};

type CaseLawReference record {|
    string caseId;
    string caseName;
    string court;
    string date;
    string summary;
    string citation;
    string? fullTextUrl;
|};

type LegalDbRecord record {|
    string recordId;
    string title;
    string jurisdiction;
    string category;
    string status;
    string content;
    string effectiveDate;
|};

type QaResponse record {|
    string answer;
    string[] internalSources;
    CaseLawReference[] externalReferences;
    string confidence;     // "high", "medium", "low"
    string disclaimer;
|};
```

## Step 3: Set Up the Vector Database

```sql
-- Run in PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS legal_documents (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    source TEXT NOT NULL,
    document_type TEXT NOT NULL,
    jurisdiction TEXT,
    effective_date TEXT,
    chunk_index INT NOT NULL,
    total_chunks INT NOT NULL,
    embedding vector(1536)
);

CREATE INDEX ON legal_documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

## Step 4: Build the RAG Pipeline

```ballerina
// embeddings.bal
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

final openai:Client embeddingClient = check new ({
    auth: {token: openaiKey},
    model: "text-embedding-3-small"
});

function generateEmbedding(string text) returns float[]|error {
    openai:EmbeddingResponse response = check embeddingClient.createEmbedding(text);
    return response.embedding;
}
```

```ballerina
// chunking.bal
import ballerina/io;

function chunkLegalDocument(string content, int maxChunkSize = 800, int overlap = 150) returns string[] {
    // Legal documents benefit from larger chunks with more overlap
    // to preserve clause context
    string[] sections = re `\n\n+`.split(content);
    string[] chunks = [];
    string currentChunk = "";

    foreach string section in sections {
        if (currentChunk.length() + section.length()) > maxChunkSize && currentChunk.length() > 0 {
            chunks.push(currentChunk.trim());
            int overlapStart = currentChunk.length() > overlap
                ? currentChunk.length() - overlap : 0;
            currentChunk = currentChunk.substring(overlapStart) + "\n\n" + section;
        } else {
            currentChunk = currentChunk.length() > 0
                ? currentChunk + "\n\n" + section
                : section;
        }
    }
    if currentChunk.trim().length() > 0 {
        chunks.push(currentChunk.trim());
    }
    return chunks;
}

function ingestLegalDocument(
    string filePath,
    string documentType,
    string? jurisdiction = (),
    string? effectiveDate = ()
) returns LegalDocumentChunk[]|error {
    string content = check io:fileReadString(filePath);
    string[] chunks = chunkLegalDocument(content);

    LegalDocumentChunk[] docChunks = [];
    foreach int i in 0 ..< chunks.length() {
        docChunks.push({
            id: string `${filePath}-chunk-${i}`,
            content: chunks[i],
            source: filePath,
            documentType: documentType,
            jurisdiction: jurisdiction,
            effectiveDate: effectiveDate,
            chunkIndex: i,
            totalChunks: chunks.length()
        });
    }
    return docChunks;
}
```

```ballerina
// vectorstore.bal
import ballerinax/postgresql;

configurable string pgHost = ?;
configurable int pgPort = ?;
configurable string pgUser = ?;
configurable string pgPassword = ?;
configurable string pgDatabase = ?;

final postgresql:Client pgClient = check new ({
    host: pgHost, port: pgPort,
    username: pgUser, password: pgPassword,
    database: pgDatabase
});

function storeChunks(LegalDocumentChunk[] chunks) returns error? {
    foreach LegalDocumentChunk chunk in chunks {
        float[] embedding = check generateEmbedding(chunk.content);
        string embeddingStr = embedding.toString();

        _ = check pgClient->execute(`
            INSERT INTO legal_documents
                (id, content, source, document_type, jurisdiction, effective_date,
                 chunk_index, total_chunks, embedding)
            VALUES (${chunk.id}, ${chunk.content}, ${chunk.source}, ${chunk.documentType},
                    ${chunk.jurisdiction}, ${chunk.effectiveDate},
                    ${chunk.chunkIndex}, ${chunk.totalChunks}, ${embeddingStr}::vector)
            ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, embedding = EXCLUDED.embedding
        `);
    }
}

function searchInternalDocuments(
    string query,
    int topK = 5,
    string? documentType = (),
    string? jurisdiction = ()
) returns LegalSearchResult[]|error {
    float[] queryEmbedding = check generateEmbedding(query);
    string embeddingStr = queryEmbedding.toString();

    string whereClause = "WHERE 1=1";
    if documentType is string {
        whereClause += string ` AND document_type = '${documentType}'`;
    }
    if jurisdiction is string {
        whereClause += string ` AND jurisdiction = '${jurisdiction}'`;
    }

    return check from record {string content; string source; string document_type;
                               string? jurisdiction; float score} row in
        pgClient->query(`
            SELECT content, source, document_type, jurisdiction,
                   1 - (embedding <=> ${embeddingStr}::vector) AS score
            FROM legal_documents
            ${whereClause}
            ORDER BY embedding <=> ${embeddingStr}::vector
            LIMIT ${topK}
        `)
        select {
            content: row.content,
            source: row.source,
            documentType: row.document_type,
            jurisdiction: row.jurisdiction,
            score: row.score
        };
}
```

## Step 5: Create the Legal Database MCP Server

The legal database MCP server exposes regulatory and compliance data as tools the agent can call.

```ballerina
// legal_db_mcp.bal
import ballerinax/mcp;
import ballerinax/postgresql;

@mcp:Server {
    name: "legal-database",
    version: "1.0.0"
}
service on new mcp:Listener(3001) {

    @mcp:Tool {
        description: "Search the legal database for regulations, statutes, and compliance requirements by keyword, jurisdiction, or category."
    }
    remote function searchRegulations(
        string query,
        string? jurisdiction = (),
        string? category = ()
    ) returns LegalDbRecord[]|error {
        string whereClause = string `WHERE (title ILIKE ${"%" + query + "%"} OR content ILIKE ${"%" + query + "%"})`;
        if jurisdiction is string {
            whereClause += string ` AND jurisdiction = '${jurisdiction}'`;
        }
        if category is string {
            whereClause += string ` AND category = '${category}'`;
        }
        return check from LegalDbRecord rec in pgClient->query(
            `SELECT * FROM regulations ${whereClause} ORDER BY effective_date DESC LIMIT 10`
        ) select rec;
    }

    @mcp:Tool {
        description: "Look up a specific regulation or statute by its record ID."
    }
    remote function getRegulation(string recordId) returns LegalDbRecord|error {
        LegalDbRecord? record = check pgClient->queryRow(
            `SELECT * FROM regulations WHERE record_id = ${recordId}`
        );
        if record is () {
            return error(string `Regulation '${recordId}' not found`);
        }
        return record;
    }

    @mcp:Tool {
        description: "Check the compliance status of a specific regulation for the organization."
    }
    remote function checkCompliance(string regulationId) returns json|error {
        return check pgClient->queryRow(
            `SELECT r.title, r.jurisdiction, c.status, c.last_audit_date, c.notes
             FROM regulations r
             JOIN compliance_status c ON r.record_id = c.regulation_id
             WHERE r.record_id = ${regulationId}`
        );
    }
}
```

## Step 6: Create the Case Law MCP Server

The case law MCP server connects to an external case law API and exposes search and citation tools.

```ballerina
// case_law_mcp.bal
import ballerinax/mcp;
import ballerina/http;

final http:Client caseLawApi = check new ("https://api.case-law-provider.com/v1");

@mcp:Server {
    name: "case-law",
    version: "1.0.0"
}
service on new mcp:Listener(3002) {

    @mcp:Tool {
        description: "Search for case law by keywords, court, jurisdiction, or date range. Returns case summaries with citations."
    }
    remote function searchCaseLaw(
        string query,
        string? court = (),
        string? jurisdiction = (),
        string? dateFrom = (),
        string? dateTo = ()
    ) returns CaseLawReference[]|error {
        map<string> params = {"q": query, "limit": "10"};
        if court is string { params["court"] = court; }
        if jurisdiction is string { params["jurisdiction"] = jurisdiction; }
        if dateFrom is string { params["date_from"] = dateFrom; }
        if dateTo is string { params["date_to"] = dateTo; }

        string queryStr = "";
        foreach [string, string] [key, value] in params.entries() {
            queryStr += queryStr.length() > 0 ? string `&${key}=${value}` : string `${key}=${value}`;
        }

        return check caseLawApi->get(string `/cases?${queryStr}`);
    }

    @mcp:Tool {
        description: "Get the full details and summary of a specific case by its case ID."
    }
    remote function getCaseDetails(string caseId) returns json|error {
        return check caseLawApi->get(string `/cases/${caseId}`);
    }

    @mcp:Tool {
        description: "Find cases that cite a specific case, useful for checking if a precedent is still valid."
    }
    remote function getCitingCases(string caseId) returns CaseLawReference[]|error {
        return check caseLawApi->get(string `/cases/${caseId}/citing`);
    }
}
```

## Step 7: Build the Agent

The agent combines the RAG tool for internal document search with MCP tools for external legal databases.

```ballerina
// agent.bal
import ballerinax/ai.agent;
import ballerinax/ai.provider.openai;
import ballerinax/mcp;

configurable string legalDbMcpUrl = ?;
configurable string caseLawMcpUrl = ?;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

// Connect to MCP servers
final mcp:Client legalDbMcp = check new ({serverUrl: legalDbMcpUrl});
final mcp:Client caseLawMcp = check new ({serverUrl: caseLawMcpUrl});

final agent:McpTools legalDbTools = check new (legalDbMcp);
final agent:McpTools caseLawTools = check new (caseLawMcp);

// RAG tool for internal document search
@agent:Tool {
    name: "searchInternalLegalDocs",
    description: "Search internal legal documents (contracts, policies, legal opinions, memos) using semantic search. Returns the most relevant document excerpts. Use this for questions about internal company policies, existing contracts, or internal legal opinions."
}
isolated function searchInternalLegalDocs(
    @agent:Param {description: "The legal question or topic to search for"} string query,
    @agent:Param {description: "Document type filter: 'contract', 'policy', 'opinion', 'regulation', 'memo', or leave empty for all"} string? documentType = (),
    @agent:Param {description: "Jurisdiction filter, e.g., 'US-CA', 'US-NY', 'EU', or leave empty for all"} string? jurisdiction = ()
) returns json|error {
    LegalSearchResult[] results = check searchInternalDocuments(query, topK = 5,
        documentType = documentType, jurisdiction = jurisdiction);
    return results.toJson();
}

final agent:ChatAgent legalQaAgent = check new (
    model: llmClient,
    systemPrompt: string `You are a Legal Research Assistant for the company's legal department.

Role:
- Answer legal questions by searching internal documents and external legal databases.
- Provide well-sourced, accurate legal information grounded in actual documents and case law.

Available Capabilities:
- Internal Document Search (RAG): Search contracts, policies, legal opinions, and memos.
- Legal Database (MCP): Search regulations, statutes, and check compliance status.
- Case Law (MCP): Search case law, retrieve case details, and find citing cases.

Guidelines:
- ALWAYS cite your sources. Include document names, regulation IDs, and case citations.
- Search internal documents first for company-specific questions.
- Use the legal database for regulatory and compliance questions.
- Use case law search for precedent and judicial interpretation questions.
- When citing case law, include the full citation.
- Clearly distinguish between internal company policies and external legal requirements.
- ALWAYS include a disclaimer that your responses are for informational purposes only and do not constitute legal advice.
- Rate your confidence as 'high', 'medium', or 'low' based on the quality and relevance of sources found.
- If you cannot find relevant sources, clearly state the limitation rather than speculating.
- For questions requiring legal judgment, recommend consulting with a qualified attorney.`,
    tools: [
        searchInternalLegalDocs,
        ...check legalDbTools.getTools(),
        ...check caseLawTools.getTools()
    ],
    memory: new agent:MessageWindowChatMemory(maxMessages: 30)
);
```

## Step 8: Expose as a GraphQL Service

```ballerina
// service.bal
import ballerina/graphql;
import ballerina/uuid;

type IngestInput record {|
    string filePath;
    string documentType;
    string? jurisdiction;
    string? effectiveDate;
|};

type IngestResult record {|
    string message;
    int chunksCreated;
|};

type ChatInput record {|
    string question;
    string? sessionId;
|};

type ChatResult record {|
    string answer;
    string sessionId;
    string disclaimer;
|};

service /legal on new graphql:Listener(8090) {

    // Ask a legal question
    remote function askQuestion(ChatInput input) returns ChatResult|error {
        string sessionId = input.sessionId ?: uuid:createType1().toString();

        string response = check legalQaAgent.chat(input.question, sessionId);

        return {
            answer: response,
            sessionId: sessionId,
            disclaimer: "This response is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for legal guidance."
        };
    }

    // Ingest a legal document
    remote function ingestDocument(IngestInput input) returns IngestResult|error {
        LegalDocumentChunk[] chunks = check ingestLegalDocument(
            input.filePath,
            input.documentType,
            jurisdiction = input.jurisdiction,
            effectiveDate = input.effectiveDate
        );
        check storeChunks(chunks);
        return {
            message: string `Successfully ingested '${input.filePath}'`,
            chunksCreated: chunks.length()
        };
    }

    // Search internal documents directly (without agent)
    resource function get searchDocuments(
        string query,
        string? documentType = (),
        string? jurisdiction = (),
        int topK = 5
    ) returns LegalSearchResult[]|error {
        return searchInternalDocuments(query, topK, documentType, jurisdiction);
    }
}
```

## Step 9: Run and Test

1. Start the MCP servers and the GraphQL service:
   ```bash
   # Terminal 1: Start the legal database MCP server
   bal run legal_db_mcp.bal

   # Terminal 2: Start the case law MCP server
   bal run case_law_mcp.bal

   # Terminal 3: Start the GraphQL service
   bal run service.bal
   ```

2. Ingest legal documents:
   ```bash
   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "mutation { ingestDocument(input: { filePath: \"/docs/legal/nda-template.txt\", documentType: \"contract\", jurisdiction: \"US-CA\" }) { message chunksCreated } }"
     }'

   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "mutation { ingestDocument(input: { filePath: \"/docs/legal/data-privacy-policy.txt\", documentType: \"policy\", jurisdiction: \"EU\" }) { message chunksCreated } }"
     }'
   ```

3. Ask legal questions:
   ```bash
   # Ask about an internal policy
   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "mutation { askQuestion(input: { question: \"What are the termination clauses in our standard NDA?\" }) { answer sessionId disclaimer } }"
     }'

   # Ask about regulations (uses legal DB MCP)
   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "mutation { askQuestion(input: { question: \"What GDPR requirements apply to our data processing activities?\", sessionId: \"<session-id>\" }) { answer sessionId disclaimer } }"
     }'

   # Ask about case law (uses case law MCP)
   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "mutation { askQuestion(input: { question: \"Are there recent cases about NDA enforceability in California?\", sessionId: \"<session-id>\" }) { answer sessionId disclaimer } }"
     }'

   # Search documents directly via GraphQL query
   curl -X POST http://localhost:8090/legal \
     -H "Content-Type: application/json" \
     -d '{
       "query": "{ searchDocuments(query: \"intellectual property\", documentType: \"contract\") { content source documentType score } }"
     }'
   ```

## What You Built

You now have a legal document Q&A system that:
- Ingests legal documents into a pgvector database with semantic embeddings
- Searches internal documents (contracts, policies, memos) using RAG
- Accesses external regulations and compliance data through an MCP server
- Searches case law and judicial precedents through another MCP server
- Combines internal and external sources to provide comprehensive answers
- Includes confidence ratings and mandatory legal disclaimers
- Exposes a flexible GraphQL API for frontend consumption

## What's Next

- [RAG Architecture Overview](/docs/genai/rag/architecture-overview) -- Deep dive into RAG design patterns
- [MCP Security](/docs/genai/mcp/mcp-security) -- Secure your MCP connections for sensitive legal data
- [AI Governance and Security](/docs/genai/reference/ai-governance) -- Implement governance for legal AI
- [Content Filtering](/docs/genai/guardrails/content-filtering) -- Add output guardrails for legal accuracy
