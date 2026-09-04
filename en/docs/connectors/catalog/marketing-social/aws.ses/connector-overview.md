---
connector: true
connector_name: "aws.ses"
title: "Overview"
description: "Overview of the ballerinax/aws.ses connector for WSO2 Integrator."
---

# Overview

The AWS SES connector enables integration with [Amazon Simple Email Service (Amazon SES)](https://aws.amazon.com/ses/), a cost-effective and scalable cloud email platform for sending transactional messages, marketing campaigns, and bulk communications. It works over the Amazon SES API v2, allowing applications to send email, manage sending identities, maintain contact lists, and handle email templates. Flexible credential support makes it suitable for both local development and AWS-hosted deployments.

## Key features

- Send email as a simple assembled message, a raw MIME message with attachments, or a personalized templated message
- Bulk email sending with per-recipient template substitution and individual outcome reporting
- Verify, retrieve, list, and delete email identities, with DKIM signing (Easy DKIM or BYODKIM) configurable when a domain identity is verified
- Retrieve an identity's verification status, DKIM attributes, custom MAIL FROM settings, and sending authorization policies
- Manage contact lists, contacts, and topics with subscription filtering and unsubscribe-link support
- Create, update, retrieve, list, and delete email templates and custom verification email templates
- Auto-paginating streams over all list operations so results beyond the first page are retrieved transparently
- Flexible AWS credential support: static access keys, credential file profiles, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default provider chain
- Automatic refresh of expiring temporary credentials with FIPS, dualstack, and custom endpoint support

## Actions

The `Client` provides operations for sending email and managing the identities, contact lists, and templates that an Amazon SES account uses.

| Client | Actions |
|--------|---------|
| `Client` | Email sending, bulk email sending, custom verification email, email identity management, contact list management, contact management, email template management, custom verification template management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: Steps to verify a sending identity and create the IAM credentials needed to authenticate with Amazon SES.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS SES** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS SES Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.ses)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.