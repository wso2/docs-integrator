---
connector: true
connector_name: "aws.ses"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.ses connector."
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS SES connector.

## Prerequisites

- An active [AWS account](https://aws.amazon.com/)
- Access to the [Amazon SES console](https://console.aws.amazon.com/ses/)

## Step 1: Verify an email identity

Amazon SES only sends from an address or domain you have proved you own. In the [Amazon SES console](https://console.aws.amazon.com/ses/), open **Identities** > **Create identity** and verify one of the following:

| Identity type | What to verify | When to use it |
|---|---|---|
| Email address | A single address, confirmed by following a link Amazon SES emails to it | Getting started, and low-volume senders |
| Domain | A domain, confirmed by adding the DKIM CNAME records Amazon SES returns to your DNS | Production sending, and sending from many addresses at one domain |

:::note
A new account is in the Amazon SES **sandbox**, where mail can only be sent to verified addresses and the sending quota is low. Request production access from **Account dashboard** > **Request production access** before sending to arbitrary recipients.
:::

## Step 2: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-ses-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Select **Create policy**, open the **JSON** tab, and paste the policy below, then attach it. Replace `<REGION>`, `<ACCOUNT_ID>`, `<VERIFIED_IDENTITY>`, and `<TEMPLATE_NAME>` with the values for your deployment, or use `identity/*` to grant access to every verified identity in the account.

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
               "Action": "ses:SendCustomVerificationEmail",
               "Resource": "arn:aws:ses:<REGION>:<ACCOUNT_ID>:custom-verification-email-template/<TEMPLATE_NAME>"
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

   `ses:SendCustomVerificationEmail` is granted on both the identity and the template ARN — drop the second statement if you don't send custom verification email. The read actions in the last statement can't be scoped to an identity, so they use `*`; see [controlling access to identities](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html). Add `Create*`, `Update*`, and `Delete*` actions only if your application manages these resources.

7. Select **Next**, review the settings, and select **Create user**.

:::note
For a screenshot-by-screenshot walkthrough of the IAM user creation and access key generation steps, see the [AWS SQS setup guide](../../messaging/aws.sqs/setup-guide.md). The console flow is identical, only the attached policy differs.
:::

:::tip
For production workloads, consider using an IAM role with temporary credentials via AWS STS instead of long-lived access keys.
:::

## Step 3: Generate access keys

1. In the IAM console, select the user you created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, select **Create access key**.
4. Select the **Application running outside AWS** use case and select **Next**.
5. Optionally add a description tag, then select **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

:::warning
The secret access key is shown only once at creation time. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.
:::

## Step 4: Identify your AWS region

Determine the AWS region you will send from, and configure the connector with that same region.

:::note
Amazon SES is a regional service, and an identity is verified per region — an address or domain verified in one region is not verified in another. Use the region in which you completed Step 1.
:::

## Next steps

- [Action Reference](actions.md) - Available operations
