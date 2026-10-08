---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS SNS connector.

## Prerequisites

- An active AWS account ([sign up at aws.amazon.com](https://aws.amazon.com/))
- Sufficient IAM permissions to create users and policies in your AWS account

## Step 1: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-sns-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Search for and attach the **AmazonSNSFullAccess** managed policy, or select **Create policy**, open the **JSON** tab, paste the policy below, and attach it. Replace `<REGION>`, `<ACCOUNT_ID>`, and `<TOPIC_NAME>` with your values, or use `*` in place of `<TOPIC_NAME>` to grant access to every topic in the account.

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "sns:CreateTopic",
                   "sns:DeleteTopic",
                   "sns:GetTopicAttributes",
                   "sns:SetTopicAttributes",
                   "sns:Publish",
                   "sns:Subscribe",
                   "sns:ConfirmSubscription",
                   "sns:Unsubscribe",
                   "sns:ListSubscriptionsByTopic",
                   "sns:GetSubscriptionAttributes",
                   "sns:SetSubscriptionAttributes",
                   "sns:TagResource",
                   "sns:UntagResource",
                   "sns:ListTagsForResource",
                   "sns:AddPermission",
                   "sns:RemovePermission",
                   "sns:PutDataProtectionPolicy",
                   "sns:GetDataProtectionPolicy"
               ],
               "Resource": "arn:aws:sns:<REGION>:<ACCOUNT_ID>:<TOPIC_NAME>"
           },
           {
               "Effect": "Allow",
               "Action": [
                   "sns:ListTopics",
                   "sns:ListSubscriptions"
               ],
               "Resource": "*"
           },
           {
               "Effect": "Allow",
               "Action": [
                   "sns:CreatePlatformApplication",
                   "sns:ListPlatformApplications",
                   "sns:GetPlatformApplicationAttributes",
                   "sns:SetPlatformApplicationAttributes",
                   "sns:DeletePlatformApplication",
                   "sns:CreatePlatformEndpoint",
                   "sns:ListEndpointsByPlatformApplication",
                   "sns:GetEndpointAttributes",
                   "sns:SetEndpointAttributes",
                   "sns:DeleteEndpoint",
                   "sns:CreateSMSSandboxPhoneNumber",
                   "sns:VerifySMSSandboxPhoneNumber",
                   "sns:ListSMSSandboxPhoneNumbers",
                   "sns:DeleteSMSSandboxPhoneNumber",
                   "sns:GetSMSSandboxAccountStatus",
                   "sns:ListOriginationNumbers",
                   "sns:ListPhoneNumbersOptedOut",
                   "sns:CheckIfPhoneNumberIsOptedOut",
                   "sns:OptInPhoneNumber",
                   "sns:GetSMSAttributes",
                   "sns:SetSMSAttributes"
               ],
               "Resource": "*"
           }
       ]
   }
   ```

   SNS policies can name only topics, so the account-level actions in the second and third statements use `*`. The third statement covers mobile push and SMS; omit it if your application uses neither. `publishBatch` is authorized by `sns:Publish` and needs no action of its own. To publish directly to a phone number or a platform endpoint rather than a topic, also grant `sns:Publish` on `*`.

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

Determine the AWS region that hosts your topics, and configure the connector with that same region. If you don't set a region, the connector uses `aws:US_EAST_1`.

:::note
SNS topics are regional. A topic's ARN includes its region (for example, `arn:aws:sns:us-east-1:123456789012:MyTopic`), and the connector reaches only the topics in the region it's configured for.
:::

## Step 4: Choose an authentication method

The connector supports multiple credential strategies. Use whichever matches your deployment environment:

- **Static credentials**: Provide `accessKeyId` and `secretAccessKey` directly in the connection config.
- **AWS profile**: Specify a `profileName` and optional `credentialsFilePath` to read credentials from a local AWS credentials file.
- **Default provider chain**: Use `auth:DEFAULT_CREDENTIALS` to let the connector resolve credentials automatically from environment variables, EKS Pod Identity, ECS task roles, or EC2 instance profiles. This is the recommended approach for workloads running on AWS infrastructure.

## Next steps

- [Action Reference](actions.md): Available operations
