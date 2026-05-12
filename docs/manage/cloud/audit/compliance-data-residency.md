---
title: Data residency and compliance
---

# Data residency and compliance

WSO2 Cloud protects the confidentiality, integrity, and availability of the data collected through its logs and metrics solutions. This page describes how WSO2 Cloud handles data residency, security, and compliance to meet legal and organizational requirements.

## Data privacy and sovereignty

- **No third-party transfers**. Collected data is never transferred to an external party or partner under any circumstance.
- **Customer control**. Customers maintain full control over their data. Submit requests to remove data for a particular user or for a whole organization to `dpo@wso2.com`.
- **Local capture and storage**. All data is captured locally within the network and stored in the same data plane where the services run.

## Captured API data

Each API call received by the gateway generates an event containing metadata. Payload data, query parameter values, and other sensitive information are omitted from the event data.

The following attributes are classified and collected.

| Category | Attributes |
|---|---|
| API | Method, name, resource template (for example, `/persons/{id}`), type (REST, GraphQL, WebSocket), version, and egress status. |
| Application | Application ID (UUID), name, and owner ID. |
| Organization | Organization ID, project ID, environment ID, and component ID. |
| Performance | Backend latency, request and response mediation latency, total response latency, target endpoint, and cache-hit status. |
| Error | Internal error codes, error messages, and error types (for example, authentication or throttle). |
| End user | `User-Agent` header details and correlation ID. |

## Data retention and backups

WSO2 Cloud uses a tiered retention policy to give fast access to operational data while providing safeguards for recovery.

- **Insights and metrics**. Retained for 6 months for storing and analyzing metrics.
- **Log storage**. Logs are stored for 30 days for all users.
- **Log visibility**:
    - Free users can view the last 7 days of logs.
    - Paid or PDP users have access to the full 30 days of logs.
- **Backups**. All data (metrics and logs) is backed up for 1 year.

## Storage and encryption

- **Encryption at rest**. Captured data is persisted on vendor-provided disks where the data plane runs. All data stored on disk is encrypted.
- **Access control**. Access to infrastructure and customer data is strictly regulated based on the principle of least privilege. Authorized personnel can only access deployments for maintenance and support through secure, audited channels.

## Data subject requests and breaches

- **Data subject rights**. WSO2 complies with customer data subject requests such as erasure, rectification, or access to personal data. Send requests to `dpo@wso2.com`.
- **Breach notification**. In the event of a data breach impacting services or data, WSO2 notifies customers promptly. The notification includes how the breach was detected, the nature and extent of the impact, and the mitigation actions taken.

## What's next

- [Audit logs](audit-logs.md) — View and manage organization-level audit logs.
