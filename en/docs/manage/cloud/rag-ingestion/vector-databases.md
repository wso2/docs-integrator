---
title: "Managed Vector Databases"
description: "Create and manage vector databases in WSO2 Integration Platform."
keywords: [wso2 integrator, wso2 integration platform, managed database, postgresql, vector database]
---

# Managed Vector Databases

WSO2 Cloud - Integration Platform provides fully managed PostgreSQL databases and managed PostgreSQL vector databases for efficient vector similarity search. You can provision services on AWS, Azure, GCP, and DigitalOcean.

## Create a managed PostgreSQL database

Follow these steps to create a managed PostgreSQL database:

1. Sign in to the WSO2 Cloud.
2. In the header, open the **Organization** list and select your organization.
3. In the left navigation menu, click **Dependencies** then **Databases**.
4. Click **Create** and choose **PostgreSQL**. Enter a display name and follow the prompts.
5. Choose a cloud provider: AWS, Azure, GCP, or DigitalOcean.
    - The provider determines the underlying compute and storage for the database.
6. Choose a region.
7. Select a service plan.
    - Service plans determine CPU, memory, storage, backup retention, and high-availability options.

## Create a managed PostgreSQL vector database

To create a managed PostgreSQL vector database:

1. Sign in to the WSO2 Cloud.
2. In the header, select your **Organization**.
3. In the left navigation menu, click **Dependencies** then **Vector Databases**.
4. Follow step 4 onwards in the [Create a managed PostgreSQL database](#create-a-managed-postgresql-database) section.

## Connect to your managed PostgreSQL database

To connect to a managed PostgreSQL instance:

- Use any PostgreSQL driver, ORM, or supported SQL library for your language.
- Find connection parameters in the **Overview** section of the WSO2 Cloud for that database.
- Databases accept internet traffic by default. Restrict access using IP allowlists under **Advanced settings**.


## High availability and automatic backups

High availability and backup retention depend on the selected service plan:

| Service plan | High availability | Backup retention time |
|---|---|---|
| Hobbyist | Single-node with limited availability | None |
| Startup | Single-node with limited availability | 2 days |
| Business | Two-node (primary + standby) with higher availability | 14 days |
| Premium | Three-node (primary + standby + standby) with highest availability | 30 days |

Plans with standby nodes are recommended for production because they provide another copy of data, reduce potential data loss, and speed recovery.

### Automatic backups

- WSO2 Cloud runs full backups daily and copies write-ahead logs (WAL) every 5 minutes or when new WAL files are generated.
- WSO2 Cloud encrypts backups at rest.

- WSO2 Cloud automatically replaces failed nodes and restores service based on the most recent backups. The impact of a failure depends on how many standby nodes are available.

### Failure recovery

- **Minor failures**: WSO2 Cloud handles minor failures such as process crashes or temporary network loss. The platform restarts failed processes and restores service automatically.

- **Severe failures**: For severe hardware or software failures, the monitoring infrastructure detects failing nodes and schedules replacements. In the event of failover:
    - The service URI remains the same; the IP address changes to the new primary node.
    - Hobbyist and Startup plans use a single node. If that node fails, WSO2 Cloud creates a replacement and restores from the latest backup. During restoration, the service is unavailable and writes since the last WAL snapshot may be lost, typically at most five minutes.

## Connection limits

The following connection limits apply based on service plan:

| Service plan | Max connections |
|---|---|
| Hobbyist | 25 |
| Startup / Business / Premium-4 | 100 |
| Business-16 | 400 |
| Premium-8 | 200 |

## What's next

- [WSO2 Integration Platform overview](../overview.md) — Learn the management areas available in WSO2 Integration Platform.
- [Managed databases and caches](../platform-services/managed-databases.md) — Create and manage other database and cache services.
- [RAG ingestion](./ingestion.md) — Configure ingestion for knowledge bases and vector stores.
