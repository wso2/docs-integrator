---
connector: true
connector_name: "aws.simpledb"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.simpledb connector."
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS SimpleDB connector.

## Prerequisites

- An active AWS account with access to one of the regions where [Amazon SimpleDB](https://aws.amazon.com/simpledb/) is available
- Permissions to create IAM users and attach IAM policies in the AWS Management Console

## Step 1: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-simpledb-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Select **Create policy**, open the **JSON** tab, and paste the policy below, then attach it. Replace `<REGION>`, `<ACCOUNT_ID>`, and `<DOMAIN_NAME>` with the values for your deployment, or use `domain/*` to grant access to every domain in the account.

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": "sdb:ListDomains",
               "Resource": "*"
           },
           {
               "Effect": "Allow",
               "Action": [
                   "sdb:CreateDomain",
                   "sdb:DomainMetadata",
                   "sdb:DeleteDomain",
                   "sdb:GetAttributes",
                   "sdb:PutAttributes",
                   "sdb:DeleteAttributes",
                   "sdb:Select"
               ],
               "Resource": "arn:aws:sdb:<REGION>:<ACCOUNT_ID>:domain/<DOMAIN_NAME>"
           }
       ]
   }
   ```

   `sdb:ListDomains` operates across the account and takes no domain resource, so it stays in its own statement scoped to `*`. Every other action, including `CreateDomain`, is scoped to the domain ARN.

7. Select **Next**, review the settings, and select **Create user**.

:::note
For a screenshot-by-screenshot walkthrough of the IAM user creation and access key generation steps, see the [AWS SQS setup guide](../../messaging/aws.sqs/setup-guide.md). The console flow is identical, only the attached policy differs.
:::

:::tip
For production workloads, consider using an IAM role with temporary credentials via AWS STS instead of long-lived access keys.
:::

## Step 2: Generate access keys

1. In the IAM console, select the user you created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, select **Create access key**.
4. Select the **Application running outside AWS** use case and select **Next**.
5. Optionally add a description tag, then select **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

:::warning
The secret access key is shown only once at creation time. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.
:::

## Step 3: Identify your AWS region

Determine the AWS region that hosts your SimpleDB domains. Amazon SimpleDB is a legacy service with no AWS Management Console UI, and it is available in only these eight regions:

| Region | Endpoint |
|--------|----------|
| `us-east-1` | `sdb.amazonaws.com` |
| `us-west-1` | `sdb.us-west-1.amazonaws.com` |
| `us-west-2` | `sdb.us-west-2.amazonaws.com` |
| `eu-west-1` | `sdb.eu-west-1.amazonaws.com` |
| `ap-southeast-1` | `sdb.ap-southeast-1.amazonaws.com` |
| `ap-southeast-2` | `sdb.ap-southeast-2.amazonaws.com` |
| `ap-northeast-1` | `sdb.ap-northeast-1.amazonaws.com` |
| `sa-east-1` | `sdb.sa-east-1.amazonaws.com` |

:::note
The `us-east-1` region uses the region-less `sdb.amazonaws.com` host; the connector resolves this automatically. For new applications, AWS recommends Amazon DynamoDB instead of SimpleDB.
:::

## Next steps

- [Action Reference](actions.md) - Available operations
