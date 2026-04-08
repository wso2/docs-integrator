---
sidebar_position: 1
title: System Requirements
description: System requirements reference — supported operating systems, JDK versions, VS Code versions, and Docker versions.
---

# System Requirements

This page lists the minimum and recommended system requirements for developing, building, and running WSO2 Integrator projects powered by Ballerina.

## Operating System Support

| Operating System | Architecture | Development | Runtime | Notes |
|-----------------|-------------|-------------|---------|-------|
| macOS 12 (Monterey) | x86_64 | Supported | Supported | Intel Macs |
| macOS 12+ | aarch64 (ARM) | Supported | Supported | Apple Silicon (M1/M2/M3/M4) |
| macOS 13 (Ventura) | x86_64 / ARM | Supported | Supported | Recommended for macOS |
| macOS 14 (Sonoma) | x86_64 / ARM | Supported | Supported | Latest supported |
| macOS 15 (Sequoia) | x86_64 / ARM | Supported | Supported | Latest supported |
| Ubuntu 20.04 LTS | x86_64 | Supported | Supported | — |
| Ubuntu 22.04 LTS | x86_64 / ARM | Supported | Supported | Recommended for Linux |
| Ubuntu 24.04 LTS | x86_64 / ARM | Supported | Supported | Latest supported |
| Debian 11+ | x86_64 | Supported | Supported | — |
| RHEL 8+ | x86_64 | Supported | Supported | — |
| CentOS Stream 8+ | x86_64 | Supported | Supported | — |
| Amazon Linux 2 | x86_64 | — | Supported | Runtime only |
| Amazon Linux 2023 | x86_64 / ARM | — | Supported | Runtime only |
| Windows 10 | x86_64 | Supported | Supported | Version 1809+ |
| Windows 11 | x86_64 / ARM | Supported | Supported | — |
| Windows Server 2019+ | x86_64 | — | Supported | Runtime only |
| Alpine Linux 3.16+ | x86_64 | — | Supported | Container runtime only |

## JDK Requirements

Ballerina runs on the Java Virtual Machine (JVM). A compatible JDK is bundled with the Ballerina installer, but you can also use a separately installed JDK.

| Component | Minimum Version | Recommended Version | Notes |
|-----------|----------------|-------------------|-------|
| JDK (bundled) | 17 | 17 (LTS) | Included with Ballerina installer |
| JDK (external) | 17 | 21 (LTS) | Set via `JAVA_HOME` environment variable |
| JRE (runtime only) | 17 | 21 (LTS) | Sufficient for running compiled programs |

### Supported JDK Distributions

| Distribution | Supported | Notes |
|-------------|-----------|-------|
| Eclipse Temurin (Adoptium) | Yes | Recommended |
| Oracle JDK | Yes | — |
| Amazon Corretto | Yes | Recommended for AWS deployments |
| Microsoft Build of OpenJDK | Yes | Recommended for Azure deployments |
| GraalVM JDK | Yes | Required for native image compilation |
| Azul Zulu | Yes | — |
| Red Hat OpenJDK | Yes | — |

## IDE and Editor Requirements

### VS Code (Recommended)

| Component | Minimum Version | Recommended Version | Notes |
|-----------|----------------|-------------------|-------|
| Visual Studio Code | 1.80.0 | Latest stable | — |
| WSO2 Integrator Extension | 1.0.0 | Latest | Install from VS Code Marketplace |
| Ballerina Extension | 4.0.0 | Latest | Installed as dependency of WSO2 Integrator extension |

### VS Code Extension System Requirements

| Requirement | Specification |
|-------------|--------------|
| Memory | 4 GB RAM minimum, 8 GB recommended |
| Disk space | 500 MB for extension and language server |
| Network | Internet access for Ballerina Central package resolution |

### Other Supported Editors

| Editor | Support Level | Plugin/Extension |
|--------|-------------|-----------------|
| IntelliJ IDEA | Community plugin | Ballerina plugin (third-party) |
| Vim/Neovim | LSP support | Via Ballerina Language Server |
| Emacs | LSP support | Via Ballerina Language Server |
| Sublime Text | Syntax highlighting | Ballerina syntax package |

## Hardware Requirements

### Development Machine

| Resource | Minimum | Recommended | Notes |
|----------|---------|-------------|-------|
| CPU | 2 cores | 4+ cores | More cores improve build speed |
| RAM | 4 GB | 8 GB+ | Language server and builds are memory-intensive |
| Disk Space | 2 GB | 5 GB+ | For Ballerina, dependencies, and build artifacts |
| Network | Internet access | Broadband | Required for package resolution from Central |

### Production Runtime

| Resource | Minimum | Recommended | Notes |
|----------|---------|-------------|-------|
| CPU | 1 core | 2+ cores | Scale based on workload |
| RAM | 256 MB | 512 MB+ | Per service instance; JVM heap configuration |
| Disk Space | 100 MB | 500 MB | For application, JRE, and logs |

## Docker and Container Requirements

| Component | Minimum Version | Recommended Version | Notes |
|-----------|----------------|-------------------|-------|
| Docker Engine | 20.10 | 24.0+ | For building and running container images |
| Docker Compose | 2.0 | 2.20+ | For multi-container development |
| Podman | 4.0 | Latest | Alternative to Docker |
| Container base image | — | `ballerina/ballerina:latest` | Official Ballerina runtime image |
| Container base image (distroless) | — | `ballerina/ballerina-runtime:latest` | Minimal runtime image |

### Kubernetes Requirements

| Component | Minimum Version | Recommended Version | Notes |
|-----------|----------------|-------------------|-------|
| Kubernetes | 1.25 | 1.28+ | For orchestrated deployments |
| kubectl | 1.25 | 1.28+ | CLI tool matching cluster version |
| Helm | 3.10 | 3.13+ | For chart-based deployments |

### Container Image Sizes

| Image | Approximate Size | Use Case |
|-------|-----------------|----------|
| `ballerina/ballerina:latest` | ~350 MB | Development and debugging |
| `ballerina/ballerina-runtime:latest` | ~200 MB | Production runtime |
| Custom distroless | ~120 MB | Minimal production deployment |
| GraalVM native image | ~50-80 MB | Optimized startup and memory |

## Network Requirements

| Purpose | Protocol | Port | Required |
|---------|----------|------|----------|
| Ballerina Central | HTTPS | 443 | Yes (for package resolution) |
| VS Code Marketplace | HTTPS | 443 | Yes (for extension installation) |
| Docker Hub | HTTPS | 443 | For pulling base images |
| Application services | HTTP/HTTPS | Configurable | As defined by your services |
| Debug port | TCP | 5005 (default) | For remote debugging |
| Language Server | TCP | Managed by VS Code | For IDE features |

## GraalVM Native Image (Optional)

For ahead-of-time compilation to native executables:

| Component | Minimum Version | Notes |
|-----------|----------------|-------|
| GraalVM | 22.3 | Community or Enterprise edition |
| GraalVM JDK | 17 | Must match Ballerina JDK requirement |
| `native-image` tool | Included with GraalVM | Installed via `gu install native-image` |
| Additional RAM | 8 GB+ | Native image compilation is memory-intensive |

## See Also

- [Installation Guide](/docs/get-started/install) -- Step-by-step installation instructions
- [Docker and Kubernetes Deployment](/docs/deploy-operate/deploy/docker-kubernetes) -- Container deployment guide
- [Troubleshooting](troubleshooting.md) -- Common issues and solutions
