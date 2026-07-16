---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting necessary details from the SAP Business One so that the connector can authenticate and communicate with the SAP Business One.

## Prerequisites

- An SAP Business One installation with the **Service Layer** component enabled
- A valid SAP Business One user name and password with access to the project management objects

## Enable the Service Layer

The connector communicates with SAP Business One through the Service Layer, an OData-based web service. Ensure the Service Layer component is installed and running on your SAP Business One server.

The Service Layer endpoint follows the pattern `https://<host>:50000/b1s/v1`.

## Gather the connection credentials

To connect, you need three values from the SAP Business One desktop client's login screen: the **company database**, your **user name**, and your **password**.

Click the company name at the top of the SAP Business One desktop application, or contact your administrator.

![SAP Business One Choose Company window showing the User ID, Password, and Database fields used to configure the connection](/img/connectors/catalog/erp-business/sap-b1-choose-company.png)

Never commit these credentials to source control. Store them in a secure configuration source such as `Config.toml`.

## Next steps

- [Action Reference](action-reference.md) - Available operations
