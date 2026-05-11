---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an AWS account and obtaining the credentials required to use the AWS SNS connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for an AWS account](https://aws.amazon.com/free/).

## Step 1: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management) by searching for it in the top search bar.
3. In the left navigation pane, click **Users**, then click **Create user**.
4. Enter a **User name** (e.g., `ballerina-sns-user`) and click **Next**.
5. Under **Set permissions**, select **Attach policies directly**.
6. Search for and select the **AmazonSNSFullAccess** policy (or a custom policy with the specific SNS permissions you need).
7. Click **Next**, review the settings, and click **Create user**.

For production environments, follow the principle of least privilege and create a custom IAM policy with only the specific SNS actions your integration requires.

## Step 2: Generate access keys

1. In the IAM console, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select **Application running outside AWS** as the use case and click **Next**.
5. Optionally add a description tag, then click **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once. Download the `.csv` file or copy the secret key immediately. If lost, you must create a new access key pair.

Store the access key ID and secret access key securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Note your AWS region

Identify the AWS region where you want to use SNS. The region determines the endpoint
for API calls and where your topics are created. Common regions include:

- `us-east-1` (US East: N. Virginia): the default region
- `us-west-2` (US West: Oregon)
- `eu-west-1` (Europe: Ireland)
- `ap-southeast-1` (Asia Pacific: Singapore)

You can find the full list of supported regions in the
[AWS SNS documentation](https://docs.aws.amazon.com/general/latest/gr/sns.html).

## Step 4: Configure security token (optional)

If you are using temporary security credentials (e.g., from AWS STS AssumeRole), you
will also need a **session token** in addition to the access key ID and secret access key.

This is common when:
- Using federated access or cross-account roles
- Running in environments that provide temporary credentials (e.g., AWS Lambda, ECS tasks)

For long-lived credentials (standard IAM user access keys), the security token is not required and can be omitted.
