---
title: Local Setup
---

# Install WSO2 Integrator

Get your development environment ready to build integrations in under 5 minutes.

WSO2 Integrator is a 100% open-source IDE that enables you to connect AI agents, APIs, data, and events across cloud, on-premises, and hybrid environments with a unique low-code experience and pro-code parity.

## Download options

WSO2 Integrator is available in multiple profiles to suit different use cases:

- **WSO2 Integrator**: Full-featured IDE with low-code and pro-code capabilities
- **WSO2 Integrator: MI**: Low-code graphical interface for integration development
- **WSO2 Integrator: SI**: Visual stream flow designer for streaming integrations

## System requirements

Before installation, ensure your system meets the requirements listed on the [System requirements and prerequisites](system-requirements.md) page. Here is a quick overview:

- **Operating system**: Windows 10+, macOS 14.6+, or Ubuntu 24.04 LTS and later
- **Memory**: 512 MB minimum (1 GB+ recommended)
- **Disk space**: 2 GB free space for installation and projects

For detailed information, see [System requirements and prerequisites](system-requirements.md).

## Installation steps

### Step 1: Download WSO2 Integrator

1. Visit the [WSO2 Integrator Downloads page](https://wso2.com/products/downloads/?product=wso2integrator).
2. Select your operating system: Windows, macOS, or Linux.
3. Download the installer for **WSO2 Integrator**.

### Step 2: Install WSO2 Integrator

**Windows**
- Run the `.exe` installer and follow the installation wizard.

**macOS**
- Run the `.dmg` installer and drag the application to the **Applications** folder.

**Linux**
- Extract the `.tar.gz` file and run the startup script:
  ```bash
  tar -xzf wso2-integrator-*.tar.gz
  cd wso2-integrator-*/bin
  ./integrator.sh
  ```

### Step 3: Launch WSO2 Integrator

After installation, launch the IDE:

- **Windows**: Double-click the **WSO2 Integrator** icon on your desktop or start menu.
- **macOS**: Open the **Applications** folder and double-click **WSO2 Integrator**.
- **Linux**: Run the startup script from the `bin` directory.

## Verify installation

After launching WSO2 Integrator:

1. The main IDE interface displays the project explorer.
2. Create a new project or open an existing one to verify that everything is working.
3. The IDE displays the visual designer and available tools.

## Next steps

- [Create your first project](create-project.md): Generate a project structure.
- [Understand the IDE](understand-ide.md): Learn the visual designer.
- [Build an API integration](build-api-integration.md): Build your first API integration.
