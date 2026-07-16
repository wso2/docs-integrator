---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting necessary details from the SAP Business One so that the connector can authenticate and communicate with the SAP Business One.

## Prerequisites

- An SAP Business One installation (version 10.0 or later) with the **Service Layer** component enabled
- A valid SAP Business One user account with permission to access the fixed asset objects
- Network access to the Service Layer endpoint (default port `50000`)

## Enable and locate the Service Layer

The connector communicates with SAP Business One through the Service Layer, an OData-based interface that must be installed and running on your SAP Business One server.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`, where `<host>` is the host name or address of your SAP Business One server.

The Service Layer is typically installed as part of the SAP Business One server components. If it is not available, contact your SAP Business One administrator to have it enabled.

## Gather the connection credentials

To connect, you need three values taken from the SAP Business One desktop client's login screen: the **company database**, your **user name**, and your **password**.

Click the company name at the top of the SAP Business One desktop application to view these values, or contact your administrator.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

Never commit these credentials to source control. Supply them through a `Config.toml` file or environment configuration at runtime.

## Next steps

- [Action Reference](action-reference.md) - Available operations
