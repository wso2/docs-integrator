---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your AWS account and Amazon Redshift environment to obtain the credentials and configuration required to use the AWS Redshift data connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for an AWS account](https://aws.amazon.com/).
- An Amazon Redshift provisioned cluster or Redshift Serverless workgroup with a database created.

## Step 1: Create an IAM user with Redshift data API permissions

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. In the left sidebar, click **Users**, then **Create user**.
4. Enter a user name (e.g., `ballerina-redshift-user`) and click **Next**.
5. Under **Set permissions**, choose **Attach policies directly**.
6. Search for and attach the following managed policies:
    - **AmazonRedshiftDataFullAccess**: grants access to the Redshift data API.
    - **AmazonRedshiftFullAccess**: grants access to Redshift cluster resources (if using provisioned clusters).
7. Click **Next**, then **Create user**.

For production environments, create a custom IAM policy with only the minimum required permissions instead of using full-access policies.

## Step 2: Generate access keys

1. In the IAM console, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select **Application running outside AWS** as the use case and click **Next**.
5. Optionally add a description tag, then click **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once. Store it securely. If lost, you must create a new access key pair.

Store the access key ID and secret access key securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Note your cluster or workgroup details

**For a provisioned Redshift cluster:**

1. Navigate to **Amazon Redshift** in the AWS Console.
2. Click **Clusters** in the left sidebar and select your cluster.
3. Note the **Cluster identifier** (e.g., `my-redshift-cluster`).
4. Note the **Database name** (e.g., `dev`).
5. Note the **Database user** (e.g., `awsuser`) if you plan to use temporary credentials.

**For Redshift Serverless:**

1. Navigate to **Amazon Redshift Serverless** in the AWS Console.
2. Click **Workgroups** and select your workgroup.
3. Note the **Workgroup name**.
4. Under the associated namespace, note the **Database name**.

If you prefer to authenticate database access using AWS Secrets Manager, create a secret with your database credentials and note its ARN. You can then provide it as `secretArn` instead of `dbUser`.

## Step 4: Identify your AWS region

Note the AWS region where your Redshift cluster or workgroup is deployed (e.g., `us-east-1`).
You can find this in the AWS Console URL or in the cluster/workgroup details page.
