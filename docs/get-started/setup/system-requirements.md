---
title: System Requirements
---

# System Requirements and Prerequisites

Before you install WSO2 Integrator, make sure your development environment meets these requirements.

## Hardware requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Processor** | 0.2 core (1.0--1.2 GHz) | 1+ core |
| **Memory (Heap)** | 512 MB | 1 GB+ |
| **Disk Space** | 2 GB free | 5+ GB free |

## Supported operating systems

| OS | Minimum Version |
|---|---|
| **Windows** | Windows 10 or later |
| **Ubuntu** | 24.04 LTS |
| **Red Hat Enterprise Linux** | RHEL 9 |
| **macOS** | macOS 14.6 (Sonoma) or later |

## ARM compatibility

WSO2 Integrator is compatible with ARM processors. It can run on ARM-based systems, such as those with Apple Silicon or ARM-based Linux distributions.

## Supported Java distributions

A compatible JRE version will be automatically installed during the WSO2 Integrator installation process.
Any JRE 21 distribution works. Tested distributions:

| Distribution | Version |
|---|---|
| Amazon Corretto JRE | 21 |
| Eclipse Adoptium (Temurin) JRE | 21 |
| OpenJRE | 21 |
| Oracle JRE | 21 |

## Network requirements

The development environment needs internet access for:

- Downloading the WSO2 Integrator and updates
- Pulling packages from [Ballerina Central](https://central.ballerina.io)

If you're behind a corporate proxy, configure proxy settings in VS Code and in your terminal environment.

## What's next

- [Install WSO2 Integrator](install.md)
