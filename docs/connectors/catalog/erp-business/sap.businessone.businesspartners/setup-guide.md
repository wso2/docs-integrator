---
title: Setup Guide
---

# Setup Guide

This guide walks you through the SAP Business One configuration needed before you can connect to the Service Layer.

## Prerequisites

- An SAP Business One installation with the **Service Layer** component enabled
- A valid Service Layer user name and password
- Network access to the Service Layer endpoint (typically reachable only from inside the network or VPN that hosts SAP Business One)

## Enable the Service Layer

The connector requires an SAP Business One installation with the Service Layer component enabled. The Service Layer is an OData-based interface that exposes SAP Business One data over HTTPS.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`.

If the Service Layer is not yet installed or enabled, contact your SAP Business One administrator to provision it.

## Obtain the connection credentials

To connect, you need three values from the SAP Business One desktop client's login screen: the **company database**, your **user name**, and your **password**.

Click the company name at the top of the SAP Business One desktop application, or contact your administrator, to find the company database name.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

Never commit these credentials to source control. Store them in a `Config.toml` file or another secure secret store.

## Next steps

- [Action Reference](action-reference.md) - Available operations
