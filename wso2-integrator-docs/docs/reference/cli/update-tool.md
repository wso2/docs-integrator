---
sidebar_position: 8
title: Ballerina Update Tool
description: Reference for the Ballerina update tool — manage Ballerina distributions with bal dist commands.
---

# Ballerina Update Tool

The Ballerina update tool manages Ballerina distribution versions on your system. It allows you to install, switch between, and update Ballerina distributions. The tool itself is separate from the Ballerina distribution, enabling you to manage multiple versions side by side.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal dist update` | Update to the latest patch version of the active distribution |
| `bal dist pull` | Download and set a specific distribution version |
| `bal dist list` | List available and installed distributions |
| `bal dist use` | Switch to an already-installed distribution |
| `bal dist remove` | Remove an installed distribution |
| `bal update` | Update the Ballerina update tool itself |

## bal dist update

Updates the active Ballerina distribution to the latest patch version within the same minor version.

### Syntax

```bash
bal dist update
```

### Behavior

- Checks for the latest patch of the currently active distribution channel
- Downloads and installs the update if available
- Switches the active distribution to the new version
- Does not cross minor version boundaries (e.g., 2201.8.x stays on 2201.8.x)

### Example

```bash
$ bal dist update
Fetching the latest patch distribution for 'ballerina-2201.9.0'...
Downloading ballerina-2201.9.2 100% [====================] 150/150 MB
Successfully set the distribution to 'ballerina-2201.9.2'.
```

## bal dist pull

Downloads and installs a specific Ballerina distribution version and sets it as the active distribution.

### Syntax

```bash
bal dist pull <version>
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `version` | Yes | The distribution version to pull (e.g., `2201.9.0`, `slbeta6`) |

### Example

```bash
# Pull a specific stable distribution
$ bal dist pull 2201.9.0
Downloading ballerina-2201.9.0 100% [====================] 150/150 MB
Successfully set the distribution to 'ballerina-2201.9.0'.

# Pull an update channel distribution
$ bal dist pull 2201.10.0
Downloading ballerina-2201.10.0 100% [====================] 155/155 MB
Successfully set the distribution to 'ballerina-2201.10.0'.
```

## bal dist list

Lists all Ballerina distributions, both installed locally and available remotely.

### Syntax

```bash
bal dist list
```

### Output Format

```bash
$ bal dist list
Distributions available locally:

  [ballerina-2201.8.6]  2201.8.6
* [ballerina-2201.9.0]  2201.9.0
  [ballerina-2201.9.2]  2201.9.2

Distributions available remotely:

  [ballerina-2201.7.2]  2201.7.2
  [ballerina-2201.8.0]  2201.8.0
  [ballerina-2201.8.6]  2201.8.6
  [ballerina-2201.9.0]  2201.9.0
  [ballerina-2201.9.2]  2201.9.2
  [ballerina-2201.10.0] 2201.10.0

Use 'bal dist pull <version>' to download a distribution.
```

The `*` marker indicates the currently active distribution.

## bal dist use

Switches the active Ballerina distribution to a version that is already installed locally.

### Syntax

```bash
bal dist use <version>
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `version` | Yes | The locally installed distribution version to activate |

### Example

```bash
# Switch to an already-installed distribution
$ bal dist use 2201.8.6
Successfully set the distribution to 'ballerina-2201.8.6'.

# Verify the active version
$ bal version
Ballerina 2201.8.6 (Swan Lake Update 8)
```

## bal dist remove

Removes a locally installed Ballerina distribution. The currently active distribution cannot be removed.

### Syntax

```bash
bal dist remove <version>
```

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `version` | Yes | The distribution version to remove |

### Example

```bash
# Remove an old distribution
$ bal dist remove 2201.7.2
Distribution 'ballerina-2201.7.2' successfully removed.

# Cannot remove the active distribution
$ bal dist remove 2201.9.0
The active distribution cannot be removed. Use 'bal dist use' to switch first.
```

## bal update

Updates the Ballerina update tool itself to the latest version. This is separate from updating the Ballerina distribution.

### Syntax

```bash
bal update
```

### Example

```bash
$ bal update
Fetching the latest update tool version...
Downloading update tool 1.4.2 100% [====================] 15/15 MB
Update tool updated to version 1.4.2.
```

## Distribution Version Scheme

| Component | Format | Example | Description |
|-----------|--------|---------|-------------|
| Year | `YYYY` | `2201` | Release year (two-digit century + two-digit year: Swan Lake era) |
| Minor version | `N` | `9` | Feature release within the year |
| Patch version | `N` | `2` | Bug fix release |
| Full version | `YYYY.N.N` | `2201.9.2` | Complete version identifier |

## Common Workflows

### Set Up a New Development Environment

```bash
# Install the update tool (via installer or package manager)
# Then pull the latest distribution
bal dist pull 2201.9.2
```

### Pin a Project to a Specific Version

```bash
# Pull and switch to the required version
bal dist pull 2201.9.0
bal dist use 2201.9.0

# Verify
bal version
```

### Keep Up to Date

```bash
# Update the tool itself
bal update

# Update to the latest patch of your current distribution
bal dist update
```

### Switch Between Projects with Different Versions

```bash
# Project A requires 2201.8.x
cd project-a/
bal dist use 2201.8.6
bal build

# Project B requires 2201.9.x
cd ../project-b/
bal dist use 2201.9.2
bal build
```

## Installation Paths

| Platform | Tool location | Distributions location |
|----------|---------------|----------------------|
| macOS | `/Library/Ballerina/bin/bal` | `~/.ballerina/distributions/` |
| Linux | `/usr/lib/ballerina/bin/bal` | `~/.ballerina/distributions/` |
| Windows | `C:\Program Files\Ballerina\bin\bal.bat` | `C:\Users\<user>\.ballerina\distributions\` |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Installation Guide](/get-started/install.md) -- Initial installation
- [System Requirements](/reference/appendix/system-requirements.md) -- Supported platforms and prerequisites
