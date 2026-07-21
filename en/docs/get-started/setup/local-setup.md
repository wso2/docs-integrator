---
title: Local Setup
description: Download and install WSO2 Integrator IDE on Windows, macOS, or Linux to build integrations on your machine.
keywords: [wso2 integrator, local setup, install, ide, windows, macos, linux]
---

# Install WSO2 Integrator

Install WSO2 Integrator IDE on your machine to develop, test, and debug integrations locally. The IDE is available for Windows, macOS, and Linux.

## System requirements

Before installing WSO2 Integrator, ensure your machine meets the following hardware and software requirements:

| Requirement | Minimum | Recommended |
| :--- | :--- | :--- |
| **Operating System** | Windows 10/11 (64-bit), macOS 12 (Monterey) or later, Linux (Ubuntu/Debian, CentOS/RHEL, Fedora) | Windows 10/11 (64-bit), macOS 14 (Sonoma) or later, Linux (Ubuntu/Debian, CentOS/RHEL, Fedora) |
| **Processor (CPU)** | Intel Core i3 (Dual-Core, 2.0 GHz) or equivalent | Intel Core i5/i7 (Quad-Core, 2.5 GHz or above) or Apple Silicon (M1/M2/M3) |
| **Memory (RAM)** | 4 GB | 8 GB or more |
| **Disk Space** | 2 GB free space | 10 GB free space (SSD recommended) |
| **Network** | Active internet connection (only for installation and downloading dependencies) | Broadband internet connection |

---

## Installation steps
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

After installation, launch the IDE:

- **Windows**: Double-click the **WSO2 Integrator** icon on your desktop or start menu.
- **macOS**: Open the **Applications** folder and double-click **WSO2 Integrator**.
- **Linux**: Launch **WSO2 Integrator** from your applications menu (after a `.deb` or `.rpm` install), or run the binary from the extracted directory if you used the `.tar.gz` archive.

![WSO2 Integrator IDE](/img/get-started/setup/wso2-integrator-ide.png)

### Step 4: Sign in to WSO2 Integrator

Sign in with your WSO2 Cloud account to deploy to WSO2 Cloud, manage environments, access observability features, and use [WSO2 Integrator Copilot](../../develop/copilot/overview.md).

1. On the **Get Started** page, click **Sign In** in the top-right corner.

   ![WSO2 Integrator Get Started page with the Sign In button in the top-right corner](/img/get-started/setup/sign-in/integrator-get-started.png)

2. The WSO2 Integration Platform sign-in page opens up in your default browser. Sign in using your preferred method.

   ![WSO2 Integration Platform sign-in page](/img/get-started/setup/sign-in/sign-in-providers.png)

3. When the browser prompts you, click **Open WSO2 Integrator** to return to the IDE.
4. The IDE shows a **Successfully signed into WSO2 Integration Platform** notification, and your account avatar appears in the top-right corner.

   ![WSO2 Integrator Get Started page after sign-in showing the account avatar and a success notification](/img/get-started/setup/sign-in/signed-in.png)

:::info Don't have a WSO2 Cloud account?
[Sign up for WSO2 Cloud](sign-up-sign-in.md) to create one before signing in.
:::

## Next steps

- [Sign up with WSO2 Cloud](sign-up-sign-in.md) — Sign up with WSO2 Cloud to get the most out of WSO2 Integrator. 
- [Develop a new integration](../../develop/create-integrations/create-a-new-integration.md) — Create a new integration project and start building.
- [Open an existing integration](../../develop/create-integrations/open-existing-integration.md) — Continue working on a project you already have.
- [Explore sample integrations](../../develop/create-integrations/explore-sample-integrations.md) — Learn from ready-made examples.
