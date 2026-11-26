---
title: Azure Keyvault
---

# Azure Keyvault

The Azure Key Vault connector integrates with Microsoft Azure Key Vault, a cloud service for securely storing and accessing secrets, cryptographic keys, certificates, and managed storage account keys, with access governed by Microsoft Entra ID. It exposes the full Key Vault data-plane REST API (version 7.0) to integrations, covering all 78 operations across keys, secrets, certificates, and managed storage accounts. Authentication is handled via OAuth 2.0 refresh tokens issued by Microsoft Entra ID, with automatic access token renewal.

## Key Features

- Create, import, rotate, back up, and restore cryptographic keys of any type stored in the vault
- Perform cryptographic operations (encrypt, decrypt, sign, verify, wrap, and unwrap) using vault keys without the private key leaving the vault
- Store, version, update, rotate, back up, and restore secrets such as passwords, connection strings, and API keys
- Issue and import certificates, manage their policies, issuers, and contacts, and track pending certificate operations
- Manage Key Vault-managed storage accounts, trigger key regeneration, and define SAS definitions
- Recover or permanently purge soft-deleted keys, secrets, certificates, and storage accounts

## Actions

The connector exposes a single client that covers all Key Vault data-plane operations across keys, secrets, certificates, and managed storage accounts.

| Client | Actions |
|--------|---------|
| `Client` | Key management, cryptographic operations, secret management, certificate management, storage account management, soft-delete recovery |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: How to create an Azure Key Vault, grant data-plane access, and obtain the OAuth 2.0 credentials required by the connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients, with operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **Azure Keyvault** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure Keyvault Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure.keyvault)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
