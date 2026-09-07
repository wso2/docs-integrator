---
connector: true
connector_name: "aws.dynamodbstreams"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.dynamodbstreams connector."
---

# Setup Guide

This guide walks you through enabling an Amazon DynamoDB stream on your table and obtaining the credentials required to use the AWS DynamoDB Streams connector.

## Prerequisites

- An active [AWS account](https://aws.amazon.com/)
- An existing Amazon DynamoDB table from which to capture changes

## Step 1: Enable a stream on your DynamoDB table

A table only produces stream records once a stream is enabled on it.

1. Log in to the [DynamoDB console](https://console.aws.amazon.com/dynamodbv2).
2. Select **Tables** in the left sidebar, then select your table.
3. Go to the **Exports and streams** tab.
4. Under **DynamoDB stream details**, select **Turn on**.
5. Pick the view type that carries the data your application needs, then select **Turn on stream**.

| View type | What each record carries |
|-----------|--------------------------|
| `KEYS_ONLY` | Only the key attributes of the modified item |
| `NEW_IMAGE` | The whole item as it looked after the change |
| `OLD_IMAGE` | The whole item as it looked before the change |
| `NEW_AND_OLD_IMAGES` | Both the new and old item images |

Take note of the resulting **Latest stream ARN** — this is the `streamArn` you pass to the connector operations.

## Step 2: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-dynamodbstreams-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Select **Create policy**, open the **JSON** tab, and paste the policy below, then attach it. Replace `<REGION>`, `<ACCOUNT_ID>`, and `<TABLE_NAME>` with the values for your table, or use `table/*/stream/*` to grant access to every stream in the account.

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": "dynamodb:ListStreams",
               "Resource": "*"
           },
           {
               "Effect": "Allow",
               "Action": [
                   "dynamodb:DescribeStream",
                   "dynamodb:GetShardIterator",
                   "dynamodb:GetRecords"
               ],
               "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<TABLE_NAME>/stream/*"
           }
       ]
   }
   ```

   `dynamodb:ListStreams` operates across the account and takes no stream resource, so it stays in its own statement scoped to `*`; omit that statement entirely if your application never calls `listStreams`. The other three actions are scoped to the stream ARN, which is separate from the table's data-plane actions.

7. Select **Next**, review the settings, and select **Create user**.

:::note
For a screenshot-by-screenshot walkthrough of the IAM user creation and access key generation steps, see the [AWS SQS setup guide](../../messaging/aws.sqs/setup-guide.md). The console flow is identical, only the attached policy differs.
:::

:::tip
For production workloads, consider using an IAM role with temporary credentials via AWS STS instead of long-lived access keys. The connector accepts assume-role, web identity, SSO, and default-provider-chain credentials through its `auth` field.
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

Determine the AWS region that hosts the DynamoDB table whose stream you want to read, for example:

- `aws:US_EAST_1` (US East: N. Virginia)

:::note
A stream lives in the same region as its table, so the connector's `region` must match that table's region.
:::

## Next steps

- [Action Reference](actions.md) - Available operations
