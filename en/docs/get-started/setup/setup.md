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

## Step 1: Sign in

Go to [Choreo Cloud](https://console.cloud.choreolabs.com). Choose the region you want to sign up in from the **Region** list, then continue with Google, GitHub, or your organization's SSO. Continuing signs you up if you do not have an account yet, and accepts the Terms of Service and Privacy Policy.

<ThemedImage
    alt="Choreo Labs sign-in page with the Region list and the Continue with Google, GitHub, and SSO options"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/sign-up.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/sign-up.png'),
    }}
/>

## Step 2: Create your organization

Enter an **Organization Name** and an **Organization Handle**, then click **Create Organization**. The handle becomes part of every workspace URL and appears in invitations.

<ThemedImage
    alt="Create Your Organization form with the Organization Name and Organization Handle fields"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/org-creation.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/org-creation.png'),
    }}
/>

The handle must:

- Be between 3 and 30 characters
- Contain only lowercase letters, numbers, and hyphens
- Start and end with a letter or a number

## Step 3: Choose your email preferences

Choreo Cloud creates your organization with a **Default Project** and opens its overview. A welcome dialog asks whether you want product updates, resources, and event invites by email. Click **Subscribe** or **No thanks**. You can unsubscribe at any time.

<ThemedImage
    alt="Welcome to Choreo Cloud dialog with the Subscribe and No thanks options"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/welcome-choreo-cloud.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/welcome-choreo-cloud.png'),
    }}
/>

## Step 4: Create an Integration

The Choreo Cloud overview lists the products available to your organization: **Agent Management**, **API Management**, **Integration**, and **Identity & Access Management**. On the **Integration** card, click **Create an integration**.

<ThemedImage
    alt="Choreo Cloud overview with Create an integration highlighted on the Integration card"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/create-an-integration.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/create-an-integration.png'),
    }}
/>

You land on the **Overview** page of the **Default Project** in Choreo Integration. From here you can build an integration in the cloud editor, import your own repository, or start from a prebuilt integration or sample.

<ThemedImage
    alt="Default Project overview in Choreo Integration with the cloud editor, import, and Start quickly options"
    sources={{
        light: useBaseUrl('/img/get-started/setup/sign-up-sign-in/project-home.png'),
        dark: useBaseUrl('/img/get-started/setup/sign-up-sign-in/project-home.png'),
    }}
/>

{/* TODO(v3): cloud-editor-setup.png below is still the old shot; the provisioning screen has not been re-captured. */}

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
