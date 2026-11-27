---
connector: true
connector_name: "bitbucket"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/bitbucket connector."
---

# Setup Guide

To use the connector you need a Bitbucket Cloud account and one of the supported credentials. The simplest is a repository, project or workspace access token.

## Prerequisites

- A Bitbucket Cloud account
- Permission to create access tokens for the repository, project or workspace you want to automate

## Step 1: Create an access token

1. Sign in to [Bitbucket Cloud](https://bitbucket.org/) and open the repository, project or workspace you want to automate.

2. Open **Settings**, then select **Access tokens** (under **Security**), then **Create access token**.

3. Enter a name and select the scopes your integration needs, such as repository read and write, and pull request read and write.

4. Select **Create** and copy the token. Bitbucket shows it only once.

:::note
A token created for a repository, project or workspace can only reach that resource.
:::

## Step 2: Choose another credential type (optional)

1. For basic authentication, use your Atlassian account email and an API token created under **Atlassian account settings**, in **Security**, then **API tokens**.

2. For OAuth 2.0, create a consumer under **Workspace settings**, in **OAuth consumers**, and use the refresh token grant.

## Step 3: Store the credentials

1. Create a `Config.toml` file next to your program and add the credentials.

2. Never commit the file to source control.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
