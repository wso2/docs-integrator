---
sidebar_position: 2
sidebar_label: Add Data Sources
title: Add Data Sources
description: Add Google Drive or Amazon S3 data sources to a Knowledge Base and configure one-time or scheduled ingestion on Choreo Integration.
keywords: [choreo integrator, choreo cloud, knowledge base, data source, google drive, amazon s3, scheduled ingestion]
slug: /manage/managed-ai-services/knowledge-bases/add-data-sources
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Add Data Sources

A data source loads content from Google Drive or Amazon S3 into a knowledge base, chunking and embedding it using that knowledge base's configuration. A knowledge base can have multiple data sources, each ingesting once or on a recurring schedule.

## Prerequisites

- A knowledge base. See [Create a Knowledge Base](./create-knowledge-base.md).
- Credentials that can read the target Google Drive folder or Amazon S3 bucket.
- The Google Drive folder ID, or the Amazon S3 bucket name.

:::caution
Treat API keys, OAuth client secrets, refresh tokens, and AWS access keys as secrets. Don't place them in source files, documentation, or logs.
:::

## Add a data source

Open the knowledge base's **Overview** tab and click **Add data source**. A three-step wizard opens.

### Step 1: Name

Enter a **Display name** for the data source. The **Name** field derives an immutable identifier from it.

<ThemedImage
    alt="Name the data source step with Display name and Name fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-name.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-name.png'),
    }}
/>

### Step 2: Data source

Select a source and enter its connection details:

| Source | Connection options | Content location |
| --- | --- | --- |
| **Google Drive** | **API KEY** tab: an API key with access to the Google Drive API. **OAUTH** tab: Client ID, Client secret, and Refresh token. | Folder ID |
| **Amazon S3** | Access key ID and Secret access key | Bucket name |

<ThemedImage
    alt="Configure data source step with Google Drive selected on the API KEY tab, showing the API key and Folder ID fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-google-drive.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-google-drive.png'),
    }}
/>

<ThemedImage
    alt="Configure data source step with Amazon S3 selected, showing the Access key ID, Secret access key, and Bucket name fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-s3.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-s3.png'),
    }}
/>

### Step 3: Ingestion schedule

Choose how ingestion runs:

- **Ingest once, now**: runs a single ingestion after the data source deploys.
- **Ingest on a schedule, to pick up changes in the source**: runs repeatedly. Choose **By interval** (a number and a unit) or **By cron** (a raw cron expression), with **Advanced settings** for further tuning.

<ThemedImage
    alt="Configure ingestion schedule step with Ingest on a schedule selected, By Interval tab, repeating every 1 Day"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-schedule.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source-schedule.png'),
    }}
/>

Click **Add data source** to create and deploy it.

{/* TODO(v3): the resulting KB Data Sources table (Name, last successful sync,
    schedule, status, and Ingest / Schedule / Execution logs actions) is
    unverified this pass - completing this required real Google Drive or
    Amazon S3 credentials, which weren't available. Re-verify once a data
    source can be fully deployed, including supported file types and the
    Execution logs view. */}

## What's next

- [Manage a Knowledge Base](./manage-knowledge-base.md) — edit configuration, connect an application, and test retrieval.
