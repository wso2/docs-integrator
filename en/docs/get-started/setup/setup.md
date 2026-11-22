---
title: "Setup"
description: "Sign up for Choreo Cloud and launch Choreo Integrator in the browser-based cloud editor to start building integrations."
keywords: [choreo integrator, choreo cloud, cloud setup, sign up, sign in, account, organization, cloud editor]
sidebar_position: 0
slug: /get-started/setup
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Choreo Cloud Setup

Choreo Integrator runs entirely in the browser on Choreo Cloud, no local installation required. Sign up for an account, then launch the cloud editor to start building integrations.

Choreo Cloud is the identity and access layer for Choreo Integration. When you sign up, you create an organization and become its admin. An organization is a logical grouping of users and their associated resources. Users and resources in one organization are isolated from all others.

A Choreo Cloud account gives you access to:

- **Choreo Integration**: Deploy and run integrations in a managed cloud environment with built-in CI/CD, environment promotion, observability, and access control.
- **Choreo Integrator Copilot features**: Use AI-assisted development in Choreo Integrator to generate integrations, mappings, and configurations.

## Step 1: Go to the sign-up page

Go to [Choreo Cloud](https://cloud-console-development.gateway.dev.cloud.wso2.com). Choose the region you want to sign up in from the **Region** list, then continue with Google, GitHub, or your organization's SSO.

<ThemedImage
    alt="Choreo Labs sign-in page with the Region list and the Continue with Google, GitHub, and SSO options"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/sign-up.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/sign-up.png'),
    }}
/>

{/* TODO(v3): Steps 2 to 4 below still describe the v2 signup flow and are unverified against v3.
    The v3 sign-in screen carries the region selector and accepts the terms implicitly on continue,
    so "Accept the terms" and "Select a region" may no longer be separate steps. org-creation.png
    is still the old WSO2-branded shot and can only be retaken while creating a brand-new
    organization. The console URL above is a development host and must be swapped before
    publication. */}

## Step 2: Create an organization

Enter a unique name for your organization.

<ThemedImage
    alt="Creating an organization"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/org-creation.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/org-creation.png'),
    }}
/>

The name must:

- Be between 4 and 30 characters
- Begin with a letter
- Contain only uppercase letters, lowercase letters, hyphens, spaces, or underscores

## Step 3: Accept the terms

Read and accept the [Privacy Policy](https://wso2.com/privacy-policy) and [Terms of Use](https://wso2.com/integration-platform/terms-of-use), then click **Create**.

## Step 4: Select a region

Select the cloud region where you want to deploy your integrations and click **Confirm**.

You land on the **Overview** page of the default project in your new organization.

<ThemedImage
    alt="Default Project overview page after creating an organization"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/project-home.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/project-home.png'),
    }}
/>

## Step 5: Open the cloud editor

On the project overview page, click **Open Cloud Editor**. Choreo Integrator provisions a cloud editor instance for you, showing progress through each setup stage.

<ThemedImage
    alt="Cloud editor instance being created"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-setup.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-setup.png'),
    }}
/>

Once the instance is ready, the Choreo Integrator cloud editor opens in your browser, using the same visual designer and pro-code editor available in the desktop IDE. Add an artifact to your integration, then deploy it to Choreo Cloud from the **Deploy to Choreo Cloud** panel on the right.

<ThemedImage
    alt="Choreo Integrator cloud editor landing page showing an empty integration and the Deploy to Choreo Cloud panel"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
    }}
/>

To work on a different project, go to the organization overview page by clicking your organization name in the top navigation, then create a new project from there.
