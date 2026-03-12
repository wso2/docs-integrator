---
sidebar_position: 3
title: Install Ballerina
description: Download and install the Ballerina distribution that powers WSO2 Integrator.
---

# Install Ballerina

WSO2 Integrator is built on the Ballerina programming language. If you're using the WSO2 Integrator VS Code extension, Ballerina is set up automatically. Use this page only if you need a standalone Ballerina installation for CLI-based development.

## Automatic Installation (Recommended)

The WSO2 Integrator VS Code extension handles the Ballerina installation for you:

1. Install the [WSO2 Integrator extension](install.md).
2. Click the **BI** icon in the sidebar.
3. Select **Set up Ballerina distribution** when prompted.
4. Restart VS Code.

This is the recommended approach for most users.

## Manual Installation

If you need Ballerina outside VS Code (for CI/CD pipelines, Docker builds, or CLI-only workflows):

### macOS

```bash
# Using Homebrew
brew install ballerina

# Or download the installer from ballerina.io
```

### Linux (Ubuntu/Debian)

```bash
# Download the latest .deb package
wget https://dist.ballerina.io/downloads/2201.13.0/ballerina-2201.13.0-swan-lake-linux-x64.deb

# Install
sudo dpkg -i ballerina-2201.13.0-swan-lake-linux-x64.deb
```

### Linux (RPM-based)

```bash
wget https://dist.ballerina.io/downloads/2201.13.0/ballerina-2201.13.0-swan-lake-linux-x64.rpm
sudo rpm -i ballerina-2201.13.0-swan-lake-linux-x64.rpm
```

### Windows

Download the MSI installer from [ballerina.io/downloads](https://ballerina.io/downloads/) and run it.

## Verify Installation

```bash
bal version
```

Expected output:
```
Ballerina 2201.13.0 (Swan Lake Update 13)
```

## Managing Multiple Versions

Use the Ballerina Update Tool to manage distributions:

```bash
# List available distributions
bal dist list

# Install a specific version
bal dist pull 2201.13.0

# Switch to a different version
bal dist use 2201.13.0

# Update to the latest
bal dist update
```

## What's Next

- [Install WSO2 Integrator](install.md) -- Set up the VS Code extension
- [Create Your First Project](first-project.md) -- Generate a project structure
