---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an AWS account and obtaining the credentials required to use the AWS SQS connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for an AWS account](https://aws.amazon.com/free/).

## Step 1: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management) by searching for it in the top search bar.
3. In the left sidebar, click **Users**, then click **Create user**.
4. Enter a **User name** (e.g., `ballerina-sqs-user`) and click **Next**.
5. Under **Set permissions**, select **Attach policies directly**.
6. Search for and select the **AmazonSQSFullAccess** policy (or create a custom policy with more restrictive permissions).
7. Click **Next**, review the settings, and click **Create user**.

For production use, follow the principle of least privilege and create a custom IAM policy that grants only the specific SQS actions your application needs.

## Step 2: Generate access keys

1. In the IAM console, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select **Application running outside AWS** as the use case and click **Next**.
5. Optionally add a description tag, then click **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once. Download the CSV file or copy both values immediately. If lost, you must create a new access key pair.

Store the Access Key ID and Secret Access Key securely. Do not commit them to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Create an SQS queue

1. Navigate to the [Amazon SQS console](https://console.aws.amazon.com/sqs/).
2. Click **Create queue**.
3. Choose the queue type:
   - **Standard**: best-effort ordering, at-least-once delivery, nearly unlimited throughput.
   - **FIFO**: guaranteed ordering, exactly-once processing (queue name must end with `.fifo`).
4. Enter a **Queue name**.
5. Configure optional settings such as visibility timeout, message retention period, and dead-letter queue.
6. Click **Create queue**.
7. Copy the **Queue URL** from the queue details page; you will need this to send and receive messages.

The queue URL has the format `https://sqs.<region>.amazonaws.com/<account-id>/<queue-name>`. You can also retrieve it programmatically using the `getQueueUrl` operation.

## Step 4: Note your AWS region

Identify the AWS region where your queue is created (e.g., `us-east-1`, `eu-west-1`).
You will need to specify this region when configuring the Ballerina connector.

You can find the region in the queue URL or in the top-right corner of the AWS console.
