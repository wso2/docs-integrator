---
title: Building an HR knowledge base with RAG
---

# Building an HR knowledge base with RAG

**Time:** 30 minutes | **Level:** Intermediate | **What you'll build:** Two artifacts in a single integration. An Automation that ingests HR policy documents, and an HTTP Service that answers employee questions with retrieval-augmented generation.

Build a complete HR retrieval-augmented generation pipeline visually in the WSO2 Integrator visual designer. The Automation ingests an HR policy document into a vector knowledge base. The HTTP Service answers employee questions over HTTP, grounded in the ingested chunks.

**What you'll learn:**

- How to load and ingest documents into a vector knowledge base.
- How to configure a vector store, embedding provider, and chunker visually.
- How to retrieve relevant chunks and ground an LLM response with them.
- How to expose the result over HTTP as a reusable service.

## Prerequisites

- An HR policy document in plain-text form (for example, a leave policy or code of conduct). A short `.md` file is enough to follow the tutorial.

:::info Default model and embedding providers
The default WSO2 model provider and embedding provider share the same access token. WSO2 Integrator prompts you to run **Ballerina: Configure default WSO2 model provider** from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) the first time you create either provider in a flow. Sign in with your WSO2 account when prompted, and WSO2 Integrator wires the configuration into your project automatically.

![Command Palette filtered to "Configure default WSO2 model provider".](/img/genai/tutorials/hr-knowledge-base-rag/27-configure-model-provider.png)

The access token expires after a few hours. If a request to the default model provider or embedding provider starts failing, rerun **Ballerina: Configure default WSO2 model provider** from the Command Palette to refresh the token.

## Architecture

```mermaid
flowchart TD
    Folder[(HR Policy Document)]
    Employee([Employee])

    subgraph Automation["Ingestion Automation"]
        Loader[Data Loader]
        AILoad[ai:load]
        AIIngest[ai:ingest]
        Loader --> AILoad --> AIIngest
    end

    subgraph KB["ai:VectorKnowledgeBase"]
        VS[Vector Store<br/>In-Memory]
        EP[Embedding Provider<br/>WSO2]
        CH[Chunker<br/>AUTO]
    end

    subgraph Service["HTTP Service — POST /api/v1/query"]
        Retrieve[ai:retrieve]
        Augment[ai:augmentUserQuery]
        Generate[ai:generate]
        Retrieve --> Augment --> Generate
    end

    Folder --> Loader
    AIIngest --> KB
    KB --- Retrieve
    Employee -->|userQuery| Retrieve
    Generate -->|JSON answer| Employee
```

The Automation flow walks documents through a chunker, embedding model, and vector store. The query flow walks an employee question through retrieval, augmentation, generation, and a JSON response.

## Step 1: Open the integration

Open or create an integration project in WSO2 Integrator. The empty integration view shows an **+ Add Artifact** button. That's your starting point for the whole tutorial.

![Empty integration overview](/img/genai/tutorials/hr-knowledge-base-rag/01-empty-integration.png)

Click **+ Add Artifact**. The artifact catalog opens, grouping the artifact types by category.

![Add Artifact catalog](/img/genai/tutorials/hr-knowledge-base-rag/02-add-artifact-catalog.png)

You will create two artifacts in this catalog. An **Automation** (under *Automation*) for ingestion, then an **HTTP Service** (under *Integration as API*) for querying.

## Step 2: Create the ingestion automation

### 2.1 Pick the automation artifact

Click the **Automation** card. WSO2 Integrator opens the **Create New Automation** dialog. Accept the defaults and click **Create**.

![Create New Automation](/img/genai/tutorials/hr-knowledge-base-rag/03-create-new-automation.png)

The automation flow editor opens with an empty `Start` node and an `Error Handler` end node. Click the **+** between them to open the node palette.

The palette groups every node type, including **Statement** (Declare/Update Variable, Call Function, Map Data), **Control** (If, Match, While, Foreach, Return), **AI** (Direct LLM, RAG, Agent), and so on.

![Automation node palette](/img/genai/tutorials/hr-knowledge-base-rag/04-automation-node-palette.png)

### 2.2 Add a data loader

Under **AI > RAG**, click **Data Loader**. The **Data Loaders** panel opens.

![Data Loaders panel](/img/genai/tutorials/hr-knowledge-base-rag/05a-data-loaders-picker.png)

Click **+ Add Data Loader**. The picker lists the available loader types. Pick **Text Data Loader**.

![Text Data Loader option](/img/genai/tutorials/hr-knowledge-base-rag/05b-data-loaders-picker.png)

The **ai : Data Loader** side panel opens. Set **Data Loader Name** to `textDocumentLoader`. **Result Type** stays at the auto-filled `ai:TextDataLoader`.

![Data Loader form initial state](/img/genai/tutorials/hr-knowledge-base-rag/06-data-loader-form-empty.png)

Configure the **Paths** field with a configurable so the file path can be changed without editing the flow:

1. Click **+ Initialize Array** under **Paths**.

    ![Paths expression helper pane](/img/genai/tutorials/hr-knowledge-base-rag/06a-data-loader-form-initialized.png)

2. Click into the empty path expression. The helper pane opens with **Inputs**, **Variables**, and **Configurables**.

    ![Configurables panel with New Configurable](/img/genai/tutorials/hr-knowledge-base-rag/06b-configurables-panel.png)

3. Select **Configurables**, then click **+ New Configurable**.

    ![New Configurable for path](/img/genai/tutorials/hr-knowledge-base-rag/07-new-configurable-path.png)

4. In the **New Configurable** dialog, fill in:
   - **Variable Name**: `path`
   - **Variable Type**: `string`
   - **Documentation**: *Path of the HR policy document to ingest.*

   ![New Configurable for path](/img/genai/tutorials/hr-knowledge-base-rag/07a-new-configurable-path.png)

5. Click **Save**.

Save the configurable and complete the Data Loader form:

- **Paths**: ``path`` (uses the configurable)
- **Data Loader Name**: `textDocumentLoader`
- **Result Type**: `ai:TextDataLoader`

![Data Loader form filled](/img/genai/tutorials/hr-knowledge-base-rag/08-data-loader-form-filled.png)

Click **Save**.

:::tip Ingesting more than one document
The **Paths** field is an array of file paths, not a folder. To ingest several HR documents, add another path expression to the array for each file you want to load.

### 2.3 Add the `ai : load` node

After you save the data loader, the **Data Loaders** panel reopens and lists the `textDocumentLoader` connection you just created.

![Data Loaders panel with textDocumentLoader](/img/genai/tutorials/hr-knowledge-base-rag/09a-load-action-picker.png)

Click `textDocumentLoader` to expand it and reveal its **Load** action: *"Loads documents as TextDocuments from a source."*. Click **Load**.

![Load action expanded](/img/genai/tutorials/hr-knowledge-base-rag/09b-load-action-picker.png)

The **ai : load** form opens. Set:

- **Result**: `hrDocuments`
- **Result Type**: `ai:Document[] | ai:Document`

![ai:load form filled](/img/genai/tutorials/hr-knowledge-base-rag/09c-ai-load-form-filled.png)

Click **Save**. The `ai:load` node is added to the flow between the `Start` node and the `Error Handler`.

![ai:load node added to the flow](/img/genai/tutorials/hr-knowledge-base-rag/09d-ai-load-form-saved.png)

### 2.4 Create the vector knowledge base

Click the **+** below the `ai:load` node to add the next node.

![ai:load node with + below it](/img/genai/tutorials/hr-knowledge-base-rag/10a-knowledge-bases-picker.png)

The node palette opens. Under **AI > RAG**, click **Knowledge Base**.

![Knowledge Base option in the AI > RAG section](/img/genai/tutorials/hr-knowledge-base-rag/10b-knowledge-bases-picker.png)

The **Knowledge Bases** panel opens. Click **+ Add Knowledge Base**.

![Knowledge Bases panel](/img/genai/tutorials/hr-knowledge-base-rag/10c-knowledge-bases-picker.png)

The picker lists the supported knowledge base types. Pick **Vector Knowledge Base**.

![Knowledge Bases type picker](/img/genai/tutorials/hr-knowledge-base-rag/10d-knowledge-bases-picker.png)

The **ai : Vector Knowledge Base** form opens with all fields empty. It has three required building blocks: **Vector Store**, **Embedding Model**, and **Chunker**. Each can be created inline.

![Empty Vector Knowledge Base form](/img/genai/tutorials/hr-knowledge-base-rag/10e-knowledge-bases-picker.png)

Build them one at a time.

#### 2.4.1 Create the vector store

Click **+ Create New Vector Store**. The supported vector store types are listed.

![Select Vector Store](/img/genai/tutorials/hr-knowledge-base-rag/11a-vector-store-picker.png)

Pick **In Memory Vector Store**. No external infrastructure is required for this tutorial. The **Create Vector Store** form opens. Fill in:

- **Vector Store Name**: `aiInmemoryvectorstore`
- **Result Type**: `ai:InMemoryVectorStore`

![Create Vector Store filled](/img/genai/tutorials/hr-knowledge-base-rag/11b-vector-store-picker.png)

Click **Save**. You are returned to the **ai : Vector Knowledge Base** form with the **Vector Store** field now filled with `aiInmemoryvectorstore`. The new connection also appears in the left **Connections** tree.

![Vector Knowledge Base form with vector store filled](/img/genai/tutorials/hr-knowledge-base-rag/11c-vector-store-picker.png)

#### 2.4.2 Create the embedding provider

Back on the Vector Knowledge Base form, click **+ Create New Embedding Model**. The supported embedding providers are listed.

![Select Embedding Provider](/img/genai/tutorials/hr-knowledge-base-rag/12a-embedding-provider-picker.png)

Pick **Default Embedding Provider (WSO2)**. It is provisioned through your Copilot login, so no API key is required. The **Create Embedding Provider** form opens. Fill in:

- **Embedding Provider Name**: `aiWso2embeddingprovider`
- **Result Type**: `ai:Wso2EmbeddingProvider`

![Create Embedding Provider filled](/img/genai/tutorials/hr-knowledge-base-rag/12b-embedding-provider-picker.png)

Click **Save**. You are returned to the **ai : Vector Knowledge Base** form with the **Embedding Model** field now filled with `aiWso2embeddingprovider`. The new connection also appears in the left **Connections** tree.

![Vector Knowledge Base form with embedding model filled](/img/genai/tutorials/hr-knowledge-base-rag/12c-embedding-provider-picker.png)

#### 2.4.3 Pick (or create) a chunker

Back on the Vector Knowledge Base form, the **Chunker** field defaults to `AUTO`. The runtime selects a chunker based on document type. For most HR text documents this is fine.

If you want to control chunking explicitly, click **+ Create New Chunker**. The supported chunker types are listed.

![Select Chunker](/img/genai/tutorials/hr-knowledge-base-rag/13-chunker-picker.png)

For this tutorial, leave the chunker at `AUTO`.

#### 2.4.4 Save the knowledge base

The Vector Knowledge Base form is now fully populated:

- **Vector Store**: `aiInmemoryvectorstore`
- **Embedding Model**: `aiWso2embeddingprovider`
- **Chunker**: `AUTO`
- **Knowledge Base Name**: `aiVectorknowledgebase`
- **Result Type**: `ai:VectorKnowledgeBase`

![Vector Knowledge Base filled](/img/genai/tutorials/hr-knowledge-base-rag/14-vector-knowledge-base-filled.png)

Click **Save**. The left **Connections** tree now lists `aiInmemoryvectorstore`, `aiWso2embeddingprovider`, and `aiVectorknowledgebase`. These connections are reusable from any artifact in the project.

### 2.5 Add the `ai : ingest` node

After you save the Vector Knowledge Base form, the **Knowledge Bases** panel reopens and lists the `aiVectorknowledgebase` connection you just created.

![Knowledge Bases panel with aiVectorknowledgebase](/img/genai/tutorials/hr-knowledge-base-rag/15a-ingest-action-picker.png)

Click `aiVectorknowledgebase` to expand it and reveal its actions: **Ingest**, **Retrieve**, **Delete By Filter**. Click **Ingest**. The description reads *"Indexes a collection of chunks. Converts each chunk to an embedding and stores it in the vector store, making the chunk searchable through the retriever."*

![Ingest action expanded](/img/genai/tutorials/hr-knowledge-base-rag/15b-ingest-action-picker.png)

The **ai : ingest** form opens. The **Documents** field defaults to **Record** mode with an empty record shape.

![ai:ingest form in Record mode](/img/genai/tutorials/hr-knowledge-base-rag/15c-ingest-action-picker.png)

Switch the **Documents** field to **Expression** mode so you can reference the `hrDocuments` array loaded earlier.

![Documents field in Expression mode](/img/genai/tutorials/hr-knowledge-base-rag/15d-ingest-action-picker.png)

Click into the **Documents** field. The helper pane opens with **Inputs**, **Variables**, **Configurables**, and **Functions**.

![Documents helper pane](/img/genai/tutorials/hr-knowledge-base-rag/15e-ingest-action-picker.png)

Select **Variables**, then pick `hrDocuments`.

![Variables list with hrDocuments](/img/genai/tutorials/hr-knowledge-base-rag/15f-ingest-action-picker.png)

The **Documents** field is now set to `hrDocuments`.

![Documents set to hrDocuments](/img/genai/tutorials/hr-knowledge-base-rag/15g-ingest-action-picker.png)

Click **Save**. The `ai:ingest` node is added to the flow between `ai:load` and the `Error Handler`.

![ai:ingest node added to the flow](/img/genai/tutorials/hr-knowledge-base-rag/15h-ingest-action-picker.png)

### 2.6 Log completion (optional)

Click the **+** below the `ai:ingest` node.

![ai:ingest node with + below it](/img/genai/tutorials/hr-knowledge-base-rag/16a-add-log-node.png)

The node palette opens. Under **Logging**, click **Log Info**.

![Log Info option in the Logging section](/img/genai/tutorials/hr-knowledge-base-rag/16b-add-log-node.png)

The **log : printInfo** form opens. Set **Msg** to `Ingestion Completed!` so you can confirm in the run log when ingestion has actually finished. This is useful before kicking off any queries against the store. Click **Save**.

![log:printInfo form with message](/img/genai/tutorials/hr-knowledge-base-rag/16c-add-log-node.png)

### 2.7 Review the completed ingestion flow

Your ingestion automation now contains:

```bash
Start -> ai:load (hrDocuments) -> ai:ingest -> log:printInfo -> Error Handler
```

![Completed automation flow](/img/genai/tutorials/hr-knowledge-base-rag/17-automation-flow-complete.png)

When the automation runs, it loads the file at `path`, chunks it, embeds it, and populates `aiInmemoryvectorstore`. You'll run it together with the HTTP Service at the end of the tutorial.

:::tip In-memory store is volatile
Restart the runtime and you must re-ingest. For a persistent store, swap the vector store for Pinecone, Milvus, Pgvector, or Weaviate. The rest of the flow stays the same.

## Step 3: Create the query HTTP service

### 3.1 Add the HTTP service artifact

Go back to the project overview and click **+ Add Artifact** again. Under **Integration as API**, pick **HTTP Service**.

![HTTP Service in the artifact catalog](/img/genai/tutorials/hr-knowledge-base-rag/20a-http-service-config.png)

The **Create HTTP Service** form opens. Keep **Service Contract** at **Design From Scratch** and set **Service Base Path** to `/api/v1`. Click **Create**.

![Create HTTP Service form](/img/genai/tutorials/hr-knowledge-base-rag/20b-http-service-config.png)

The HTTP Service designer opens with the default listener `httpDefaultListener` and your base path `/api/v1`. The **Resources** section is empty.

![HTTP Service designer with no resources](/img/genai/tutorials/hr-knowledge-base-rag/20c-http-service-config.png)

### 3.2 Add the `query` resource

Click **+ Add Resource**. The **Select HTTP Method to Add** panel opens. Pick **POST**.

![HTTP method picker](/img/genai/tutorials/hr-knowledge-base-rag/21a-add-resource-form.png)

The **New Resource Configuration** panel opens with **HTTP Method** set to **POST**. Set:

- **Resource Path**: `query`
- **Responses**: keep the default `201` returning `json` and `500` returning `error`

![New Resource Configuration](/img/genai/tutorials/hr-knowledge-base-rag/21b-add-resource-form.png)

Click **+ Define Payload**. The **Define Payload** dialog opens on the **Import** tab.

![Define Payload dialog](/img/genai/tutorials/hr-knowledge-base-rag/21c-add-resource-form.png)

Paste the following JSON sample into **Sample data** and set **Type Name** to `QueryPayload`. Click **Import Type**.

```json
{
  "userQuery": "What is the leave policy for new joiners?"
}
```

![Import payload from sample JSON](/img/genai/tutorials/hr-knowledge-base-rag/21d-add-resource-form.png)

The payload is added as `QueryPayload payload`, and the new `QueryPayload` record type appears under **Types** in the left tree.

![Resource configuration with QueryPayload payload](/img/genai/tutorials/hr-knowledge-base-rag/21e-add-resource-form.png)

Click **Save** on the **New Resource Configuration** panel. The resource flow editor opens with an empty `Start` node and an `Error Handler` end node. The user's question is available inside the flow as `payload.userQuery`.

![Resource flow editor](/img/genai/tutorials/hr-knowledge-base-rag/21f-add-resource-form.png)

### 3.3 Retrieve relevant chunks

Click the **+** in the resource flow. The node palette opens. Under **AI > RAG**, click **Knowledge Base**.

![Knowledge Base option in the AI > RAG section](/img/genai/tutorials/hr-knowledge-base-rag/22a-retrieve-action-picker.png)

The **Knowledge Bases** panel lists `aiVectorknowledgebase` (the same connection you created in the Automation).

![Knowledge Bases panel with aiVectorknowledgebase](/img/genai/tutorials/hr-knowledge-base-rag/22b-retrieve-action-picker.png)

Click `aiVectorknowledgebase` to expand it and reveal its actions. Click **Retrieve**: *"Retrieves relevant chunk for the given query."*

![Retrieve action expanded](/img/genai/tutorials/hr-knowledge-base-rag/22c-retrieve-action-picker.png)

The **ai : retrieve** form opens. Click into the **Query** field and the helper pane should open with **Inputs**, **Variables**, and **Configurables**.

![ai:retrieve form with helper pane](/img/genai/tutorials/hr-knowledge-base-rag/22d-retrieve-action-picker.png)

Select **Inputs**. The `payload` input is listed (typed as `QueryPayload`).

![Inputs list showing payload](/img/genai/tutorials/hr-knowledge-base-rag/22e-retrieve-action-picker.png)

Drill into `payload` and pick `userQuery`.

![payload fields with userQuery](/img/genai/tutorials/hr-knowledge-base-rag/22f-retrieve-action-picker.png)

The **Query** field is now set to `payload.userQuery`. Set **Result** to `queryMatch`. **Result Type** stays at the auto-filled `ai:QueryMatch[]`.

![ai:retrieve filled](/img/genai/tutorials/hr-knowledge-base-rag/22g-retrieve-action-picker.png)

Click **Save**. The `ai:retrieve` node is added to the flow.

![ai:retrieve node added to the flow](/img/genai/tutorials/hr-knowledge-base-rag/22h-retrieve-action-picker.png)

### 3.4 Augment the user query

Click the **+** below the `ai:retrieve` node to add the next node.

![ai:retrieve node with + below it](/img/genai/tutorials/hr-knowledge-base-rag/23a-augment-query-node.png)

The node palette opens. Under **AI > RAG**, click **Augment Query**. It packages the employee's question together with the retrieved chunks into a `ChatUserMessage` ready for the LLM, with no manual prompt-templating required.

![Augment Query option in the AI > RAG section](/img/genai/tutorials/hr-knowledge-base-rag/23b-augment-query-node.png)

The **ai : augmentUserQuery** form opens. **Result** is pre-filled with `aiChatusermessage` and **Result Type** with `ai:ChatUserMessage`. The **Context** field defaults to **Array** mode.

![ai:augmentUserQuery form initial state](/img/genai/tutorials/hr-knowledge-base-rag/23c-augment-query-node.png)

Switch the **Context** field to **Expression** mode so you can reference the array variable directly.

![Context switched to Expression mode](/img/genai/tutorials/hr-knowledge-base-rag/23d-augment-query-node.png)

Click into the **Context** expression. The helper pane opens with **Inputs**, **Variables**, **Configurables**, and **Functions**.

![Context helper pane](/img/genai/tutorials/hr-knowledge-base-rag/23e-augment-query-node.png)

Select **Variables** and pick `queryMatch`.

![Variables list with queryMatch](/img/genai/tutorials/hr-knowledge-base-rag/23f-augment-query-node.png)

The **Context** field is now set to `queryMatch`.

![Context set to queryMatch](/img/genai/tutorials/hr-knowledge-base-rag/23g-augment-query-node.png)

Click into the **Query** field. The helper pane opens.

![Query helper pane](/img/genai/tutorials/hr-knowledge-base-rag/23h-augment-query-node.png)

Select **Inputs**. The `payload` input is listed.

![Inputs list showing payload](/img/genai/tutorials/hr-knowledge-base-rag/23i-augment-query-node.png)

Drill into `payload` and pick `userQuery`.

![payload fields with userQuery](/img/genai/tutorials/hr-knowledge-base-rag/23j-augment-query-node.png)

The **Query** field is now set to `payload.userQuery`. Both fields are populated.

![ai:augmentUserQuery filled](/img/genai/tutorials/hr-knowledge-base-rag/23k-augment-query-node.png)

Click **Save**. The `ai:augmentUserQuery` node is added to the flow.

![ai:augmentUserQuery node added to the flow](/img/genai/tutorials/hr-knowledge-base-rag/23l-augment-query-node.png)

### 3.5 Add a model provider

Click the **+** below the `ai:augmentUserQuery` node to add the next node.

![ai:augmentUserQuery node with + below it](/img/genai/tutorials/hr-knowledge-base-rag/24a-mode-provider-node.png)

The node palette opens. Under **AI > Direct LLM**, click **Model Provider**.

![Model Provider option in the AI > Direct LLM section](/img/genai/tutorials/hr-knowledge-base-rag/24b-mode-provider-node.png)

The **Model Providers** panel opens with no existing connections. Click **+ Add Model Provider**.

![Model Providers panel](/img/genai/tutorials/hr-knowledge-base-rag/24c-mode-provider-node.png)

The supported model providers are listed. Pick **Default Model Provider (WSO2)**.

![Model provider type list](/img/genai/tutorials/hr-knowledge-base-rag/24d-mode-provider-node.png)

The **Create Model Provider** form opens. Fill in:

- **Model Provider Name**: `aiWso2modelprovider`
- **Result Type**: `ai:Wso2ModelProvider`

![Create Model Provider filled](/img/genai/tutorials/hr-knowledge-base-rag/24e-mode-provider-node.png)

Click **Save**. You are returned to the **Model Providers** panel with `aiWso2modelprovider` listed. The new connection also appears in the left **Connections** tree.

![Model Providers panel with aiWso2modelprovider](/img/genai/tutorials/hr-knowledge-base-rag/24f-mode-provider-node.png)

:::tip Sign in to use the default WSO2 model provider
If you have not signed into WSO2 Integrator Copilot yet, a sign-in prompt appears at this point. Sign in so the Copilot can configure the default model provider.

### 3.6 Generate the answer

Click `aiWso2modelprovider` to expand it and reveal its actions: **Chat** and **Generate**. Click **Generate**: *"Sends a chat request to the model and generates a value that belongs to the type corresponding to the type descriptor argument."*

![Generate action expanded](/img/genai/tutorials/hr-knowledge-base-rag/24g-mode-provider-node.png)

The **generate** form opens. Fill in:

- **Prompt** (Expression mode):
  ```ballerina
  check aiChatusermessage.content.ensureType()
  ```
  The `content` field on `ai:ChatUserMessage` is typed as `string|ai:Prompt`. `ai:augmentUserQuery` populates it with one or the other depending on the augmentation strategy. The `generate` node's **Prompt** expects a Ballerina template literal (`string`-compatible), so use `ensureType()` to assert the `string` branch at runtime. `check` propagates any conversion error to the resource's error handler.
- **Result**: `result`
- **Expected Type**: `string`

![ai:generate filled](/img/genai/tutorials/hr-knowledge-base-rag/24h-mode-provider-node.png)

Click **Save**. The `ai:generate` node is added to the flow, with the `aiWso2modelprovider` connection shown alongside it.

![ai:generate node added to the flow](/img/genai/tutorials/hr-knowledge-base-rag/24i-mode-provider-node.png)

### 3.7 Return the answer

Click the **+** below the `ai:generate` node. The node palette opens. Under **Control**, click **Return**.

![Return option in the Control section](/img/genai/tutorials/hr-knowledge-base-rag/25a-return-node.png)

The **Return** form opens. Click into the **Expression** field. The helper pane opens with **Inputs**, **Variables**, **Configurables**, and **Functions**.

![Return form with helper pane](/img/genai/tutorials/hr-knowledge-base-rag/25b-return-node.png)

Select **Variables** and pick `result`.

![Variables list with result](/img/genai/tutorials/hr-knowledge-base-rag/25c-return-node.png)

The **Expression** field is now set to `result`.

![Return Expression set to result](/img/genai/tutorials/hr-knowledge-base-rag/25d-return-node.png)

Click **Save**. The completed query flow walks the request through `ai:retrieve`, `ai:augmentUserQuery`, `ai:generate`, and finally returns `result`.

![Completed query flow](/img/genai/tutorials/hr-knowledge-base-rag/25e-return-node.png)

## Step 4: Run and try it

Open the project overview. The integration shows the HTTP Service with the `[POST] /query` resource, the Automation, and all the connections wired together. Click **Run** in the top-right.

![Project overview before run](/img/genai/tutorials/hr-knowledge-base-rag/26a-run-and-try-it.png)

WSO2 Integrator detects that the `path` configurable has no value yet and prompts you for the missing configuration. Click **Update Configurations**.

![Missing configurations dialog](/img/genai/tutorials/hr-knowledge-base-rag/26b-run-and-try-it.png)

The **Configurable Variables** view opens. Set `path` to your HR policy document file, for example `documents/leave-policy.md`.

![Set the path configurable](/img/genai/tutorials/hr-knowledge-base-rag/26c-run-and-try-it.png)

Save the configuration and click **Run** again. The Automation runs first and populates the in-memory vector store. Wait for the `Ingestion Completed!` log line before continuing. The HTTP Service then starts on `httpDefaultListener` (port `9090` by default).

A prompt appears at the bottom right: *"1 service found in the integration. Test with Try It Client?"* Click **Test**.

![Try It Client prompt](/img/genai/tutorials/hr-knowledge-base-rag/26d-run-and-try-it.png)

The **Try Service** panel opens at `http://localhost:9090/api/v1` with a `POST /query` request template.

![Try Service panel with template](/img/genai/tutorials/hr-knowledge-base-rag/26e-run-and-try-it.png)

Edit the request body to ask a question about a topic in the documents you ingested:

```json
{
  "userQuery": "What is the leave policy for new joiners?"
}
```

![Try Service request edited](/img/genai/tutorials/hr-knowledge-base-rag/26f-run-and-try-it.png)

Send the request. The response is the LLM's answer grounded in the chunks retrieved from your HR knowledge base.

![Response with grounded answer](/img/genai/tutorials/hr-knowledge-base-rag/26g-run-and-try-it.png)

If the answer comes back as *"I don't have that information"*, double-check that the Automation finished ingesting and that the question matches a topic actually present in the source documents.

You can also test from the command line with `curl`:

```bash
curl -X POST http://localhost:9090/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{"userQuery": "What is the leave policy for new joiners?"}'
```

## Summary

You now have a fully visual HR RAG pipeline that grounds an LLM in your actual policies, with no glue code. Every connection is reusable across other artifacts in the same project.

| Component | Where | Purpose |
|---|---|---|
| `path` (Configurable) | Configurations | HR document file to ingest |
| `textDocumentLoader` (Data Loader) | Automation | Reads the HR document at `path` |
| `aiInmemoryvectorstore` (Vector Store) | Connections | Stores embeddings |
| `aiWso2embeddingprovider` (Embedding Model) | Connections | Generates vector representations |
| `aiVectorknowledgebase` (Vector Knowledge Base) | Connections | Combines store, embedder, and chunker |
| `aiWso2modelprovider` (Model Provider) | Connections | Calls the LLM |
| `ai:load` / `ai:ingest` | Automation | Loads, chunks, embeds, and writes documents |
| `ai:retrieve` | HTTP Service | Top-K vector search |
| `ai:augmentUserQuery` | HTTP Service | Builds the grounded chat message |
| `ai:generate` | HTTP Service | Generates the typed answer |

## What's next

- [AI Connections and Stores → Vector Stores](/docs/genai/develop/components/vector-stores) — Swap the in-memory store for a persistent backend (Pinecone, Milvus, Pgvector, Weaviate).
- [AI Connections and Stores → Chunkers](/docs/genai/develop/components/chunkers) — Tune chunk size and overlap, or plug in a custom chunker.
- [RAG → The Query Flow](/docs/genai/develop/rag/overview#the-query-flow) — Customize retrieval (top-K, filters, hybrid search).
- [AI Customer Support Agent](ai-customer-support-agent.md) — Reuse `aiVectorknowledgebase` from a chat agent as a tool.
- [Multi-Agent Workflow](multi-agent-workflow.md) — Combine RAG with other agents in a larger workflow.
