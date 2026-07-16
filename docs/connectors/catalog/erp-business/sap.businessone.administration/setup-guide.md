---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting necessary details from the SAP Business One so that the connector can authenticate and communicate with the SAP Business One.

## Prerequisites

- An SAP Business One installation (version 10.0 or later) with the **Service Layer** component enabled
- SAP Business One user credentials (user name and password) with the required permissions

## Enable the Service Layer

The connector communicates with SAP Business One through the Service Layer, an OData-based REST API. Ensure the Service Layer component is installed and running on your SAP Business One server.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`, where `<host>` is the host name or IP address of your SAP Business One server.

The Service Layer is typically installed alongside SAP Business One. If it is not available, contact your SAP Business One administrator to have the component enabled.

## Obtain the connection details

To connect, you need three values from the SAP Business One desktop client's login screen: the company database, your user name, and your password.

Click the company name at the top of the SAP Business One desktop application to view these details, or contact your administrator.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

The connector authenticates with the Service Layer session protocol: it logs in with the configured company database, user name, and password, tracks the `B1SESSION`/`ROUTEID` cookies, and transparently re-logs in once when the session expires.

## Next steps

- [Action Reference](action-reference.md) - Available operations
