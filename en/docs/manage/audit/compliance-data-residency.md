---
sidebar_position: 3
title: "Data Residency and Compliance"
description: "How Choreo Cloud handles data residency, retention, encryption, and compliance for logs and metrics."
keywords: [choreo integrator, choreo cloud, compliance, data residency, data retention, encryption, dsar, breach notification]
slug: /manage/audit/compliance-data-residency
---

# Data Residency and Compliance

Choreo Cloud protects the confidentiality, integrity, and availability of the data collected through its logs and metrics solutions. This page describes how Choreo Cloud handles data residency, security, and compliance to meet legal and organizational requirements.

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

{/* TODO(v3): this table describes exactly the telemetry a Usage Dashboards-style feature would surface, but that feature doesn't currently exist in v3 (removed from the Acceptable Usage Policy and API Management overview this pass - see commit b9f0d74d). Couldn't verify live whether this data is still captured internally with no UI to view it, or whether this section is now aspirational/stale. Confirm with the product team before trusting this table. */}

## Data retention and backups

Choreo Cloud uses a tiered retention policy to give fast access to operational data while providing safeguards for recovery.

- **Logs**. Retention depends on your subscription plan. See [Acceptable Usage Policy](../billing/acceptable-usage-policy.md#monitoring-and-observability).
- **Backups**. All data (metrics and logs) is backed up for 1 year.

{/* TODO(v3): the v2 version of this page also had a 6-month "Insights" retention figure and a flat "Free users: 7 days, Paid/PDP users: 30 days" log-visibility split that duplicated (and partly conflicted with) the Acceptable Usage Policy's own Logs row, and referenced PDP (private data plane), which isn't a v3 concept. Replaced with a link to the AUP instead of restating numbers here. The "Backups" figure (1 year, for all plans) is unverified this pass - confirm it still applies, and whether it varies by plan like everything else on this page now does. */}

## Storage and encryption

- **Encryption at rest**. Captured data is persisted on vendor-provided disks where the data plane runs. All data stored on disk is encrypted.
- **Access control**. Access to infrastructure and customer data is strictly regulated based on the principle of least privilege. Authorized personnel can only access deployments for maintenance and support through secure, audited channels.

## Data subject requests and breaches

- **Data subject rights**. WSO2 complies with customer data subject requests such as erasure, rectification, or access to personal data. Send requests to `dpo@wso2.com`.
- **Breach notification**. In the event of a data breach impacting services or data, WSO2 notifies customers promptly. The notification includes how the breach was detected, the nature and extent of the impact, and the mitigation actions taken.

## What's next

- [Audit logs](audit-logs.md) — View and manage organization-level audit logs.
