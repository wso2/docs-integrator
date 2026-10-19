---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an AWS IAM user and obtaining the access credentials required to use the AWS S3 connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up here](https://portal.aws.amazon.com/billing/signup).

## Step 1: Sign in to the AWS Management Console

1. Go to [console.aws.amazon.com](https://console.aws.amazon.com/) and sign in.
2. In the top navigation bar, select the AWS **Region** where you want to create your S3 buckets (for example, `us-east-1`).

## Step 2: Create an IAM user

1. Open the **IAM** console by searching for "IAM" in the AWS Management Console.

   <ThemedImage
       alt="Search for IAM"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-1.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-1.jpeg'),
       }}
   />

2. In the left navigation pane, select **Users**.

   <ThemedImage
       alt="IAM Dashboard - select Users"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-2.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-2.jpeg'),
       }}
   />

3. Select **Create user**.

   <ThemedImage
       alt="Users page - Create user"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-3.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-user-3.jpeg'),
       }}
   />

4. Enter a **User name** (for example, `S3-USER`) and select **Next**.

   <ThemedImage
       alt="Specify user details"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/specify-user-details.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/specify-user-details.jpeg'),
       }}
   />

5. Under **Set permissions**, select **Attach policies directly**. Search for and select the **AmazonS3FullAccess** managed policy (or a custom policy with the minimum S3 permissions your integration requires).

   <ThemedImage
       alt="Set user permissions"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/set-user-permissions.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/set-user-permissions.jpeg'),
       }}
   />

6. Select **Next**, review the details, and select **Create user**.

   <ThemedImage
       alt="Review and create user"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/review-create-user.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/review-create-user.jpeg'),
       }}
   />

7. You should see a confirmation that the user was created successfully.

   <ThemedImage
       alt="User created successfully"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/users.jpeg'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/users.jpeg'),
       }}
   />

For production use, follow the principle of least privilege — create a custom IAM policy that grants only the specific S3 actions and resources your integration needs.

## Step 3: Generate access keys

1. In the IAM console, select the user you just created. Under **Access keys**, select **Create access key**.

   <ThemedImage
       alt="Create access key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-access-key-1.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/create-access-key-1.png'),
       }}
   />

2. Select the **Application running outside AWS** use case, then select **Next**.

   <ThemedImage
       alt="Select use case"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/select-usecase.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/select-usecase.png'),
       }}
   />

3. Optionally add a description tag, then select **Create access key**.

4. Copy the **Access key ID** and **Secret access key** — these are your `accessKeyId` and `secretAccessKey`.

   <ThemedImage
       alt="Retrieve access keys"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/retrieve-access-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/storage-file/aws.s3/setup/retrieve-access-key.png'),
       }}
   />

The secret access key is shown only once. Store both keys securely and do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Note your AWS region

Identify the AWS Region for your S3 operations (for example, `us-east-1`, `eu-west-1`, `ap-southeast-1`). This value is passed as the `region` configuration parameter when initializing the connector.

If you do not specify a region, the connector defaults to **US East (N. Virginia)** (`us-east-1`).

## What's next

- [Action reference](action-reference.md): Available operations
