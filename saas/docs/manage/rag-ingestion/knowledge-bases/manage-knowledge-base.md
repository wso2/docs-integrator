---
title: Manage a Knowledge Base
---

# Manage a Knowledge Base

To manage a Knowledge Base, navigate to **AI Services** > **Knowledge Base** and select it from the list. The details page features four tabs that let you configure, connect, and operate your service.

<ThemedImage
    alt="Knowledge Base Overview showing its configuration, service URL, data sources, ingestion controls, and execution logs"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/manage-knowledge-base-overview.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/manage-knowledge-base-overview.png'),
    }}
/>

| Tab | What you can do |
| --- | --- |
| **Overview** | Review the configuration and service URL; add, search, ingest, schedule, inspect, and remove KB data sources. |
| **Configurations** | Review environment configuration values and open **Edit Knowledge Base**. Secret values are not displayed. |
| **Connect to KB** | Copy the service URL, view KB services, and open the Developer Portal to obtain an API key. |
| **Retrieval** | Send a test query and tune the maximum result count, similarity threshold, and optional Cohere reranking. |

## Manage data sources

On **Overview**, click **Add data source** to attach Google Drive or Amazon S3. A Knowledge Base can have multiple data sources.

For each source, the table shows its type, last successful sync, schedule, and deployment status. Use its actions to:

- Click **Ingest** to start a run immediately.
- Click **Schedule** to add or change an interval or cron schedule.
- Open **Execution logs** to inspect completed and failed runs.
- Open the actions menu to access the data-source component or delete it.

After adding or changing a data source, wait until its status is **Deployed** before starting ingestion. Use the latest successful sync time and execution logs to confirm that content is current.

## Edit the Knowledge Base configuration

1. Open **Configurations**.
2. Click **Edit Knowledge Base**.
3. Update the name, description, or configuration values.
4. Leave a secret field blank to keep its current value. Enter a value only when rotating or replacing that secret.
5. Click **Update**.

Configuration changes affect every component that uses the Knowledge Base. WSO2 Cloud attempts to redeploy those components and notifies you if any deployment requires manual attention. If you change the embedding model, collection, index, table, or chunking settings, re-ingest content and retest retrieval before directing production traffic to it.

## Connect an application

Open **Connect to KB** to copy the KB service URL and review the generated KB service.

<ThemedImage
    alt="Connect to KB tab showing the service URL, Developer Portal API-key instructions, and generated KB services"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/connect-to-knowledge-base.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/connect-to-knowledge-base.png'),
    }}
/>

To call the service from an external application:

1. Click **Open Developer Portal** and sign in.
2. Create or select an application.
3. Subscribe the application to the KB service.
4. Generate an API key for the application and store it securely.
5. Call the copied service URL with the generated key.

To use the Knowledge Base from a WSO2 Integrator project, add a **WSO2 Cloud Knowledge Base** connection and select the provisioned Knowledge Base. See [Connect to an existing WSO2 Cloud Knowledge Base](../../../develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases.md#connect-to-an-existing-knowledge-base).

## Test retrieval

1. Open **Retrieval**.
2. Optional: Click **Query Configurations** and adjust:
   - **Maximum chunks to retrieve** (default `5`).
   - **Minimum similarity threshold** (default `0.7`). A higher value filters out less similar chunks.
   - **Enable Reranking** to reorder results with Cohere. This requires a Cohere API key.
3. Enter a question that is answered by the ingested content.
4. Click **Send** and inspect the returned chunks.

<ThemedImage
    alt="Test retrieval by querying a Knowledge Base and reviewing the returned chunks"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-retrieval.gif'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-retrieval.gif'),
    }}
/>

If no useful chunks are returned, check the data source's last successful sync and execution logs first. Then try a lower similarity threshold or a higher maximum chunk count. If results are still poor, review the chunking settings and confirm that ingestion and retrieval use the same embedding model.

## Delete a Knowledge Base

Delete a Knowledge Base from the Knowledge Base list. Deletion is available only when no components depend on it. Before deleting it:

1. Remove its KB data sources.
2. Remove its KB services.
3. Disconnect integrations and any other dependent components.
4. Return to the Knowledge Base list and use the delete action.

Deleting a Knowledge Base removes the managed configuration. Confirm separately whether content in an externally managed vector store must also be removed according to your data-retention requirements.

## Related pages

- [Knowledge Bases overview](./knowledge-bases.md)
- [Create a Knowledge Base](./create-knowledge-base.md)
- [Add data sources](./ingestion.md)
