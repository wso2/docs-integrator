---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting necessary details from the SAP Business One so that the connector can authenticate and communicate with the SAP Business One.

## Prerequisites

- An SAP Business One installation with the **Service Layer** component enabled
- A user account with permission to access the company database

## Enable and locate the Service Layer

The connector communicates with SAP Business One through the Service Layer, an OData-based HTTP API. Ensure the Service Layer component is installed and running as part of your SAP Business One server deployment.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`, where `<host>` is the address of your SAP Business One server.

The Service Layer typically listens on port `50000` over HTTPS. Confirm the host and port with your system administrator if you are unsure.

## Obtain the connection credentials

To connect, you need three values from the SAP Business One desktop client's login screen: the company database, your user name, and your password.

Click the company name at the top of the SAP Business One desktop application, or contact your administrator, to view the **Choose Company** window.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

Record the **Database** (company database), **User ID**, and **Password** shown on this screen. These map directly to the session credentials the connector requires.

## Next steps

- [Action Reference](action-reference.md) - Available operations
