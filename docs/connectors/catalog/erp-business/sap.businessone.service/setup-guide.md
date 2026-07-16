---
title: Setup Guide
---

# Setup Guide

This guide walks you through enabling the SAP Business One Service Layer and gathering the values needed to connect to it.

## Prerequisites

- An SAP Business One installation (version 10.0 or later) with the **Service Layer** component enabled
- A SAP Business One user account with permission to access the service module objects
- Network access to the Service Layer host on its HTTPS port (default `50000`)

## Enable the Service Layer

The connector talks to SAP Business One through its Service Layer, an OData-based interface that must be installed and running on your SAP Business One server.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`, where `<host>` is your SAP Business One server. Confirm the endpoint is reachable before continuing.

The Service Layer is installed as part of the SAP Business One server components. If it is not available, contact your SAP Business One administrator to have it enabled.

## Gather the connection values

To connect, you need three values from the SAP Business One desktop client's login screen: the company database, your user name, and your password.

Click the company name at the top of the SAP Business One desktop application to view these values, or contact your administrator.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

The connector authenticates with the Service Layer session protocol: it logs in with the configured company database, user name, and password, tracks the `B1SESSION`/`ROUTEID` cookies, and transparently re-logs in once when the session expires.

Never commit credentials to source control. Store the company database, user name, and password in a secure configuration such as a `Config.toml` that is excluded from version control.

## Next steps

- [Action Reference](action-reference.md) - Available operations
