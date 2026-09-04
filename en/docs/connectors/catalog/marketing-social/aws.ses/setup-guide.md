---
connector: true
connector_name: "aws.ses"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.ses connector."
---

# Setup Guide

This guide describes how to configure Amazon SES and create the IAM credentials required to use the connector.

## Prerequisites

- An active [AWS account](https://aws.amazon.com/)
- Access to the [Amazon SES console](https://console.aws.amazon.com/ses/)

## Verify an email identity

Amazon SES only sends from an address or domain you have proved you own. In the [Amazon SES console](https://console.aws.amazon.com/ses/), open **Identities** > **Create identity** and verify one of the following:

| Identity type | What to verify | When to use it |
|---|---|---|
| Email address | A single address, confirmed by following a link Amazon SES emails to it | Getting started, and low-volume senders |
| Domain | A domain, confirmed by adding the DKIM CNAME records Amazon SES returns to your DNS | Production sending, and sending from many addresses at one domain |

:::note
A new account is in the Amazon SES **sandbox**, where mail can only be sent to verified addresses and the sending quota is low. Request production access from **Account dashboard** > **Request production access** before sending to arbitrary recipients.
:::

## Obtain IAM user credentials

Create an IAM user and generate an access key by following the [obtaining IAM user credentials](https://central.ballerina.io/ballerinax/aws/latest#obtaining-iam-user-credentials) guide.

Attach the Amazon SES permissions your application needs. The following policy covers sending mail and reading the account's identities, lists, and templates:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendBulkEmail",
                "ses:SendCustomVerificationEmail"
            ],
            "Resource": "arn:aws:ses:<REGION>:<ACCOUNT_ID>:identity/<VERIFIED_IDENTITY>"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ses:GetEmailIdentity",
                "ses:ListEmailIdentities",
                "ses:GetContactList",
                "ses:ListContactLists",
                "ses:ListContacts",
                "ses:GetContact",
                "ses:GetEmailTemplate",
                "ses:ListEmailTemplates",
                "ses:GetCustomVerificationEmailTemplate",
                "ses:ListCustomVerificationEmailTemplates"
            ],
            "Resource": "*"
        }
    ]
}
```

:::note
None of these actions can be scoped to an identity ARN, so they need a statement of their own with `Resource` set to `*` — the two-statement split Amazon SES [documents](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html) for restricting which identities a user may send from. Some do accept a narrower resource of their own, such as a contact list or template ARN, if you want to scope them further. Add the matching `Create*`, `Update*`, and `Delete*` actions only if your application manages these resources rather than just reading them.
:::

## Next steps

- [Action Reference](actions.md) - Available operations