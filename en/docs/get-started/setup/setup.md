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
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up WSO2 Integrator

Install WSO2 Integrator on your machine to develop, test, and debug integrations locally. The WSO2 Integrator available for Windows, macOS, and Linux.

## System requirements

Before installing WSO2 Integrator, ensure your machine meets the following hardware and software requirements:

| Requirement | Minimum | Recommended |
| :--- | :--- | :--- |
| **Operating System** | [Supported versions of Windows client](https://learn.microsoft.com/en-us/windows/release-health/supported-versions-windows-client) (64-bit), macOS versions with Apple security update support (typically the latest release and the two previous versions), Linux: Ubuntu Desktop 20.04, Debian 10, Red Hat Enterprise Linux 8, Fedora 36 or later | Latest version of a supported operating system |
| **Processor (CPU)** | 64-bit dual-core x64 or ARM64 processor, 1.6 GHz or faster | Quad-core or better (Intel Core i5/i7, AMD Ryzen 5/7, or Apple silicon) |
| **Memory (RAM)** | 4 GB | 8 GB or more (16 GB if you also run Docker or several projects) |
| **Disk Space** | 4 GB free space | 10 GB free space (SSD recommended) |
| **Network** | Internet connection to install, update, and pull packages from Ballerina Central | Broadband internet connection |

:::tip Behind a corporate proxy?
If your network restricts internet access, see [Work in a Restricted Network](../../develop-and-test/create-workspace/restricted-networks/restricted-networks.md) to configure a proxy before you install.
:::

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
    alt="Welcome to WSO2 Integrator screen with the Sign in with WSO2 Integration Platform and Skip for now buttons"
    sources={{
        light: useBaseUrl('/img/get-started/setup/wso2-integrator-ide-v5.1.png'),
        dark: useBaseUrl('/img/get-started/setup/wso2-integrator-ide-v5.1.png'),
    }}
/>

### Step 4: Sign in to WSO2 Integrator

Sign in with your WSO2 Cloud account to deploy to WSO2 Cloud, manage environments, access observability features, and use [WSO2 Integrator Copilot](../../editor/copilot/copilot.md).

1. On the **Welcome to WSO2 Integrator** screen that appears when you first launch the editor, click **Sign in with WSO2 Integration Platform**.

   If you click **Skip for now**, you can sign in later by clicking **Sign In** in the top-right corner of the **Get Started** page.

   <ThemedImage
       alt="WSO2 Integrator Get Started page with the Sign In button in the top-right corner"
       sources={{
           light: useBaseUrl('/img/get-started/setup/sign-in/integrator-get-started-v5.1.png'),
           dark: useBaseUrl('/img/get-started/setup/sign-in/integrator-get-started-v5.1.png'),
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
       alt="WSO2 Integrator Get Started page after sign-in showing the account avatar in the top-right corner"
       sources={{
           light: useBaseUrl('/img/get-started/setup/sign-in/signed-in-v5.1.png'),
           dark: useBaseUrl('/img/get-started/setup/sign-in/signed-in-v5.1.png'),
       }}
   />

:::info Don't have a WSO2 Cloud account?
Create one and set up your organization by following <CloudDocsLink to="/get-started/setup">Cloud setup</CloudDocsLink> in the WSO2 Cloud documentation, then return here to sign in.
:::

## Update WSO2 Integrator

WSO2 Integrator includes a built-in updater that automatically checks for updates to the application and its bundled components, including the Ballerina runtime, Java runtime, Integration Control Plane (ICP), and the wso2.ballerina extension. You don't need to download or reinstall WSO2 Integrator to keep it up to date.

### Check for updates

WSO2 Integrator checks for updates in the background and notifies you when updates are available. You can check for updates manually as follows.

<Tabs groupId="os">
<TabItem value="macos" label="macOS" default>

On the menu bar, click **WSO2 Integrator**, and then click **Check for Updates...**.

<ThemedImage
    alt="WSO2 Integrator menu on macOS with Check for Updates highlighted"
    sources={{
        light: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu.png'),
        dark: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu.png'),
    }}
/>

If updates are available, WSO2 Integrator shows a notification with an **Update All** button.

To install the updates:

1. Click **Update All** in the notification to download and install the updates for all components. To preview the available updates first, select **Show Details**.

   <ThemedImage
       alt="Notification that updates are available for WSO2 Integrator components, with Update All highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/component-update-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/component-update-notification.png'),
       }}
   />

   **Show Details** shows the updates for each component individually.

   <ThemedImage
       alt="Notification that updates are available for WSO2 Integrator components, with Show Details highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/show-details-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/show-details-notification.png'),
       }}
   />

   Each component shows its current version. A component that has an update also shows the available version. To update only one component, select a component that shows an available version.

   <ThemedImage
       alt="List of installed WSO2 Integrator components showing ballerina-runtime, jre, icp, and wso2.ballerina with current 6.0.0 and available 6.0.1"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/show-details-component-list.png'),
           dark: useBaseUrl('/img/get-started/setup/update/show-details-component-list.png'),
       }}
   />

   You can also click **WSO2 Integrator** > **Update WSO2 Integrator Components** on the menu bar. This option only appears when updates are available.

   <ThemedImage
       alt="WSO2 Integrator menu on macOS with Update WSO2 Integrator Components highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/update-components-menu.png'),
           dark: useBaseUrl('/img/get-started/setup/update/update-components-menu.png'),
       }}
   />

   While the update downloads, the menu shows **Downloading Component Updates...**.

   <ThemedImage
       alt="WSO2 Integrator menu on macOS showing Downloading Component Updates"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/downloading-component-updates-menu.png'),
           dark: useBaseUrl('/img/get-started/setup/update/downloading-component-updates-menu.png'),
       }}
   />

2. When the download completes, click **Reload Window** in the notification to finish updating.

   <ThemedImage
       alt="Notification asking to reload the window to finish updating components, with the Reload Window button"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/reload-window-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/reload-window-notification.png'),
       }}
   />

3. To confirm the update, click **WSO2 Integrator**, and then click **Check for Updates...** again.

   <ThemedImage
       alt="WSO2 Integrator menu on macOS showing Check for Updates after the components are updated"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu-after-update.png'),
           dark: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu-after-update.png'),
       }}
   />

   WSO2 Integrator shows the **WSO2 Integrator is up to date** notification.

   <ThemedImage
       alt="WSO2 Integrator is up to date notification"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/up-to-date-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/up-to-date-notification.png'),
       }}
   />

</TabItem>
<TabItem value="windows" label="Windows">

On the menu bar, click **Help**, and then click **Check for Updates**.

<ThemedImage
    alt="WSO2 Integrator Help menu on Windows with Check for Updates highlighted"
    sources={{
        light: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu-windows.png'),
        dark: useBaseUrl('/img/get-started/setup/update/check-for-updates-menu-windows.png'),
    }}
/>

If updates are available, WSO2 Integrator shows a notification with an **Update All** button.

To install the updates:

1. Click **Update All** in the notification to download and install the updates for all components. To preview the available updates first, select **Show Details**.

   <ThemedImage
       alt="Notification that updates are available for WSO2 Integrator components, with Update All highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/component-update-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/component-update-notification.png'),
       }}
   />

   **Show Details** shows the updates for each component individually.

   <ThemedImage
       alt="Notification that updates are available for WSO2 Integrator components, with Show Details highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/show-details-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/show-details-notification.png'),
       }}
   />

   Each component shows its current version. A component that has an update also shows the available version. To update only one component, select a component that shows an available version.

   <ThemedImage
       alt="List of installed WSO2 Integrator components showing ballerina-runtime, jre, icp, and wso2.ballerina with current 6.0.0 and available 6.0.1"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/show-details-component-list.png'),
           dark: useBaseUrl('/img/get-started/setup/update/show-details-component-list.png'),
       }}
   />

2. When the download completes, click **Reload Window** in the notification to finish updating.

   <ThemedImage
       alt="Notification asking to reload the window to finish updating components, with the Reload Window button"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/reload-window-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/reload-window-notification.png'),
       }}
   />

3. To confirm the update, click **Help**, and then click **Check for Updates** again. WSO2 Integrator shows the **WSO2 Integrator is up to date** notification.

   <ThemedImage
       alt="WSO2 Integrator is up to date notification"
       sources={{
           light: useBaseUrl('/img/get-started/setup/update/up-to-date-notification.png'),
           dark: useBaseUrl('/img/get-started/setup/update/up-to-date-notification.png'),
       }}
   />

</TabItem>
</Tabs>

## Next steps

- <CloudDocsLink to="/get-started/setup">Cloud setup</CloudDocsLink> — Create a WSO2 Cloud account and organization to get the most out of WSO2 Integrator.
- [Develop a new integration](../../develop-and-test/create-workspace/create-a-project.md) — Create a new integration project and start building.
- [Open an existing integration](../../develop-and-test/create-workspace/open-a-project.md) — Continue working on a project you already have.
- [Explore sample integrations](../../develop-and-test/create-workspace/explore-sample-integrations.md) — Learn from ready-made examples.
