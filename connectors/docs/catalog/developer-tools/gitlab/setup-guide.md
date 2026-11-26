---
title: Setup Guide
---

# Setup Guide

To use the GitLab connector, you need a GitLab account on [gitlab.com](https://gitlab.com/users/sign_up) or on a self-managed GitLab instance, and a token the connector sends with every request. The simplest is a personal access token.

## Prerequisites

- A GitLab account on GitLab.com or on a self-managed GitLab instance

## Step 1: Create a personal access token

1. Sign in to GitLab.
2. Select your avatar in the left sidebar, then **Edit profile**.
3. In the left sidebar, select **Access tokens** (under **User settings**), then **Add new token**.
4. Enter a name and an expiry date, and select the scopes the application needs:
   - `api` for full read and write access
   - `read_api` for read-only access
5. Select **Create personal access token** and copy the token. GitLab shows it only once.

Group and project access tokens (**Settings**, then **Access tokens** in a group or project) are used the same way, and limit the token to that group or project.

## Step 2: Note the API base URL

1. Use `https://gitlab.com/api/v4`, the connector's default, for GitLab.com.
2. For a self-managed instance, use `https://<your-gitlab-host>/api/v4` and pass it as the service URL.

The connector also accepts an OAuth 2.0 access token (`auth: {token: "<access token>"}`) or the OAuth 2.0 refresh-token grant, for applications registered under **User settings**, then **Applications**.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
