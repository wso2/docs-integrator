---
sidebar_position: 1
sidebar_label: Setup
title: Set up WSO2 Integrator
description: Download and install WSO2 Integrator on Windows, macOS, or Linux, sign in, and start building integrations on your machine.
keywords: [wso2 integrator, setup, install, windows, macos, linux]
slug: /get-started/setup
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Set up WSO2 Integrator

Install WSO2 Integrator on your machine to develop, test, and debug integrations locally. The WSO2 Integrator available for Windows, macOS, and Linux.

## Installation steps

### Step 1: Download WSO2 Integrator

1. Visit the [WSO2 Integrator Downloads page](https://wso2.com/products/downloads/?product=wso2integrator).
2. Select your operating system: Windows, macOS, or Linux.
3. Download the installer for **WSO2 Integrator**.

### Step 2: Install WSO2 Integrator

**Windows**
- Run the `.msi` installer and follow the installation wizard.

**macOS**
- Run the `.dmg` installer and drag the application to the **Applications** folder.

**Linux**
- Ubuntu or Debian: install the `.deb` package.
- RHEL or Fedora: install the `.rpm` package.
- Other distributions: extract the `.tar.gz` archive.

### Step 3: Launch WSO2 Integrator

After installation, launch the WSO2 Integrator:

- **Windows**: Double-click the **WSO2 Integrator** icon on your desktop or start menu.
- **macOS**: Open the **Applications** folder and double-click **WSO2 Integrator**.
- **Linux**: Launch **WSO2 Integrator** from your applications menu (after a `.deb` or `.rpm` install), or run the binary from the extracted directory if you used the `.tar.gz` archive.

<ThemedImage
    alt="WSO2 Integrator "
    sources={{
        light: useBaseUrl('/img/get-started/setup/wso2-integrator-ide.png'),
        dark: useBaseUrl('/img/get-started/setup/wso2-integrator-ide.png'),
    }}
/>

### Step 4: Sign in to WSO2 Integrator

Sign in with your WSO2 Cloud account to deploy to WSO2 Cloud, manage environments, access observability features, and use [WSO2 Integrator Copilot](../../editor/copilot/capabilities.md).

1. On the **Get Started** page, click **Sign In** in the top-right corner.

   <ThemedImage
       alt="WSO2 Integrator Get Started page with the Sign In button in the top-right corner"
       sources={{
           light: useBaseUrl('/img/get-started/setup/sign-in/integrator-get-started.png'),
           dark: useBaseUrl('/img/get-started/setup/sign-in/integrator-get-started.png'),
       }}
   />

2. The WSO2 Integration Platform sign-in page opens up in your default browser. Sign in using your preferred method.

   <ThemedImage
       alt="WSO2 Integration Platform sign-in page"
       sources={{
           light: useBaseUrl('/img/get-started/setup/sign-in/sign-in-providers.png'),
           dark: useBaseUrl('/img/get-started/setup/sign-in/sign-in-providers.png'),
       }}
   />

3. When the browser prompts you, click **Open WSO2 Integrator** to return to the editor.
4. The editor shows a **Successfully signed into WSO2 Integration Platform** notification, and your account avatar appears in the top-right corner.

   <ThemedImage
       alt="WSO2 Integrator Get Started page after sign-in showing the account avatar and a success notification"
       sources={{
           light: useBaseUrl('/img/get-started/setup/sign-in/signed-in.png'),
           dark: useBaseUrl('/img/get-started/setup/sign-in/signed-in.png'),
       }}
   />

:::info Don't have a WSO2 Cloud account?
Create one and set up your organization by following <CloudDocsLink to="/get-started/cloud-setup">Cloud setup</CloudDocsLink> in the WSO2 Cloud documentation, then return here to sign in.
:::

## Next steps

- <CloudDocsLink to="/get-started/cloud-setup">Cloud setup</CloudDocsLink> — Create a WSO2 Cloud account and organization to get the most out of WSO2 Integrator.
- [Develop a new integration](../../develop-and-test/create-workspace/create-a-project.md) — Create a new integration project and start building.
- [Open an existing integration](../../develop-and-test/create-workspace/open-a-project.md) — Continue working on a project you already have.
- [Explore sample integrations](../../develop-and-test/create-workspace/explore-sample-integrations.md) — Learn from ready-made examples.
