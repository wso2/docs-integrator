---
title: Overview
---

# Overview

Mailchimp Transactional (formerly Mandrill) is a powerful transactional email service for sending personalized, one-to-one emails such as password resets, order confirmations, and welcome messages. The Ballerina `ballerinax/mailchimp.transactional` connector (v1.0.1) provides programmatic access to the Mandrill API, enabling you to send transactional emails, manage templates, configure webhooks, and monitor delivery from your Ballerina integration flows.

## Key features

- Send transactional emails with full control over recipients, content, attachments, and merge variables
- Template management: create, update, publish, render, and delete reusable email templates
- Send template-based emails with dynamic content substitution via merge variables
- Message search and delivery tracking with time-series analytics
- Webhook lifecycle management for real-time event notifications (bounces, opens, clicks)
- Sender domain and DKIM/SPF verification for improved deliverability
- Reject and allowlist management to control email delivery policies
- Subaccount management for multi-tenant email sending

## Actions

Actions are operations you invoke on Mailchimp Transactional from your integration. Use these actions for sending emails, managing templates, configuring webhooks, and more. The connector exposes a single client with resource functions covering all Mandrill API endpoints.

| Client | Actions |
|--------|---------|
| `Client` | Send emails, manage templates, webhooks, senders, tags, rejects, allowlists, IPs, subaccounts, inbound routing, exports, URLs, and user info |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a Mailchimp Transactional (Mandrill) account and obtaining the API key required to use the connector.

* **[Action Reference](actions.md)**: Full reference for the client: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Mailchimp Transactional Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-mailchimp.transactional)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
