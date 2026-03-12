---
sidebar_position: 1
title: System Requirements & Prerequisites
description: Hardware, software, and network requirements for WSO2 Integrator development.
---

# System Requirements & Prerequisites

Before you install WSO2 Integrator, make sure your development environment meets these requirements.

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | 0.2 core (1.0--1.2 GHz) | 1+ core |
| **Memory (Heap)** | 512 MB | 1 GB+ |
| **Disk Space** | 2 GB free | 5+ GB free |

## Supported Operating Systems

| OS | Minimum Version |
|---|---|
| **Windows** | Windows 10 or later |
| **Ubuntu** | 24.04 LTS |
| **Red Hat Enterprise Linux** | RHEL 9 |
| **macOS** | macOS 14.6 (Sonoma) or later |

ARM architectures are supported, including Apple Silicon (M1/M2/M3/M4) and ARM-based Linux.

## Software Requirements

| Software | Version | Notes |
|----------|---------|-------|
| **Visual Studio Code** | Latest stable | Primary IDE -- download from [code.visualstudio.com](https://code.visualstudio.com/download) |
| **Java Runtime (JRE)** | 21 | Required for the Ballerina runtime |
| **Docker** | 20.10+ | Optional -- for containerized deployment |

### Supported Java Distributions

Any JRE 21 distribution works. Tested distributions:

| Distribution | Version |
|---|---|
| Amazon Corretto JRE | 21 |
| Eclipse Adoptium (Temurin) JRE | 21 |
| OpenJRE | 21 |
| Oracle JRE | 21 |

### Java Setup

Install a supported JDK/JRE:

```bash
# macOS (Homebrew)
brew install openjdk@21

# Ubuntu / Debian
sudo apt install openjdk-21-jdk

# Windows (winget)
winget install Microsoft.OpenJDK.21
```

Verify the installation:

```bash
java -version
```

Set `JAVA_HOME` if it's not already configured:

```bash
# macOS
export JAVA_HOME=$(/usr/libexec/java_home -v 21)

# Linux
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

## Network Requirements

The development environment needs internet access for:

- Downloading the Ballerina distribution and updates
- Pulling packages from [Ballerina Central](https://central.ballerina.io)
- Pulling connector dependencies
- VS Code extension marketplace access

If you're behind a corporate proxy, configure proxy settings in VS Code and in your terminal environment.

## What's Next

- [Install WSO2 Integrator](install.md) -- Install the VS Code extension and set up Ballerina
