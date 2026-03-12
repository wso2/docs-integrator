---
sidebar_position: 2
title: Open an Existing Integration
description: Open and work with existing integration projects from your local filesystem or version control.
---

# Open an Existing Integration

Open integration projects that already exist on your filesystem, clone them from a Git repository, or restore a recently used workspace. WSO2 Integrator automatically detects Ballerina projects and activates its tooling.

## Opening a Local Project

### From VS Code

1. Go to **File > Open Folder** (or `Ctrl+K Ctrl+O` / `Cmd+K Cmd+O`).
2. Navigate to the directory containing a `Ballerina.toml` file.
3. Select the folder and click **Open**.

<!-- TODO: Screenshot of VS Code with an opened integration project showing the explorer panel -->

WSO2 Integrator detects the `Ballerina.toml` file and activates:

- The visual flow designer in the editor panel
- IntelliSense and code completion for Ballerina
- The WSO2 Integrator sidebar with project artifacts
- The Try-It tool for testing endpoints

### From the Command Line

```bash
# Open a project directory in VS Code
code /path/to/my-integration

# Or navigate to the directory and open it
cd /path/to/my-integration
code .
```

## Cloning from Version Control

### Clone via VS Code

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Select **Git: Clone**.
3. Enter the repository URL and choose a local directory.
4. When prompted, click **Open** to open the cloned project.

### Clone via CLI

```bash
# Clone and open
git clone https://github.com/myorg/order-sync-service.git
code order-sync-service
```

## Opening Recent Projects

VS Code tracks recently opened folders. Access them quickly:

- **File > Open Recent** shows your project history.
- The WSO2 Integrator **Welcome** tab lists recent integration projects.

<!-- TODO: Screenshot of the Welcome tab showing recent integrations -->

## Project Detection and Validation

When you open a folder, WSO2 Integrator validates the project structure:

| Check | What It Verifies |
|---|---|
| `Ballerina.toml` exists | Confirms this is a Ballerina package |
| Distribution version | Checks compatibility with the installed Ballerina distribution |
| Dependencies | Validates that declared dependencies can be resolved |
| Syntax | Runs an initial syntax check on `.bal` files |

If any issues are found, the **Problems** panel shows actionable diagnostics with quick-fix suggestions.

## Resolving Dependencies

After opening a project, pull its dependencies:

```bash
# Pull all dependencies declared in Ballerina.toml
bal pull
```

VS Code performs this step automatically when you open a Ballerina project. If dependencies fail to resolve, check your network connection and verify the package names in `Ballerina.toml`.

## Working with Multi-Module Projects

For projects with multiple modules, the WSO2 Integrator sidebar displays each module as a collapsible section. You can navigate between modules and view their artifacts independently.

```
my-integration/
├── Ballerina.toml
├── main.bal                    # Root module
├── modules/
│   ├── api/                    # API module
│   │   └── service.bal
│   ├── transform/              # Transformation module
│   │   └── mapper.bal
│   └── persist/                # Persistence module
│       └── store.bal
└── tests/
```

Click on any `.bal` file to open it in both the code editor and the visual flow designer.

## Troubleshooting

### Project Not Detected

If WSO2 Integrator does not activate after opening a folder:

1. Verify that `Ballerina.toml` exists in the root of the opened folder.
2. Ensure the WSO2 Integrator extension is installed and enabled.
3. Check the **Output** panel (select **WSO2 Integrator** from the dropdown) for error messages.

### Incompatible Distribution

If the project requires a different Ballerina distribution version:

```bash
# Check current distribution
bal dist list

# Update to the required version
bal dist update
```

## What's Next

- [Explore Sample Integrations](explore-samples.md) -- Learn from built-in example projects
- [Import External Integrations](import-external.md) -- Bring in projects from other tools
