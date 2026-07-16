---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting necessary details from the SAP Business One so that the connector can authenticate and communicate with the SAP Business One.

## Prerequisites

- An SAP Business One installation (version 10.0 or compatible) with the **Service Layer** component enabled
- A valid SAP Business One user account with permissions for the sales (A/R) objects

## Enable and locate the Service Layer

The connector communicates with SAP Business One through the Service Layer (OData) component, which must be installed and running on your SAP Business One server.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`, where `<host>` is the hostname of your SAP Business One server. Confirm with your administrator that the Service Layer is reachable at this address.

## Gather your connection credentials

To connect, you need three values that also appear on the SAP Business One desktop client's login screen: the company database, your user name, and your password.

Click the company name at the top of the SAP Business One desktop application to view the current company database, or contact your administrator.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

The Service Layer uses a session-based protocol: the connector logs in with the company database, user name, and password, then tracks the `B1SESSION`/`ROUTEID` cookies and re-logs in automatically when the session expires. Never commit these credentials to source control.

## Next steps

- [Action Reference](action-reference.md) - Available operations
