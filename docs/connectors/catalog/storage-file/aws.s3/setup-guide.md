---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an AWS account and obtaining the access credentials required to use the AWS S3 connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up here](https://portal.aws.amazon.com/billing/signup).

## Step 1: Sign in to the AWS management console

1. Go to [https://console.aws.amazon.com/](https://console.aws.amazon.com/) and sign in with your AWS account credentials.
2. In the top navigation bar, select the AWS **Region** where you want to create your S3 buckets (e.g., `us-east-1`).

## Step 2: Create an IAM user

1. Open the **IAM** console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).
2. In the left navigation pane, click **Users**, then click **Create user**.
3. Enter a **User name** (e.g., `ballerina-s3-connector`).
4. Click **Next**.
5. Under **Set permissions**, choose **Attach policies directly**.
6. Search for and select the **AmazonS3FullAccess** managed policy (or a custom policy with the minimum S3 permissions your integration requires).
7. Click **Next**, review the details, and click **Create user**.

For production use, follow the principle of least privilege; create a custom IAM policy that grants only the specific S3 actions and resources your integration needs.

## Step 3: Generate access keys

1. In the IAM console, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select the **Application running outside AWS** use case, then click **Next**.
5. Optionally add a description tag, then click **Create access key**.
6. Copy the **Access key ID** and **Secret access key**; these are your `accessKeyId` and `secretAccessKey`.

The secret access key is shown only once at creation time. Store both keys securely and do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Note your AWS region

Identify the AWS Region you want to use for S3 operations (e.g., `us-east-1`, `eu-west-1`, `ap-southeast-1`).
This value is passed as the `region` configuration parameter when initializing the connector.

If you do not specify a region, the connector defaults to **US East (N. Virginia)** (`us-east-1`).
