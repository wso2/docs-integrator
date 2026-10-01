---
sidebar_position: 1
title: Migration Troubleshooting
description: Resolve the Ballerina version and dependency screens that appear when you open an older setup or integration after moving to Ballerina 2201.14.0 and Java 25.
keywords: [wso2 integrator, migration, troubleshooting, ballerina 2201.14.0, java 25, dependencies, upgrade, downgrade, previous version]
slug: /editor/troubleshooting/migration-troubleshooting
---

# Migration Troubleshooting

WSO2 Integrator 5.1.0, the WSO2 Integrator extension 1.2.0, and the Ballerina extension 6.0.0 run on Ballerina 2201.14.0, which moves from Java 21 to Java 25. When you open an older setup or integration in these releases, the editor can show one of two screens instead of your integration. This page explains why each screen appears and the options you have.

| The editor shows | Why | Go to |
|---|---|---|
| **WSO2 Integrator cannot start** or **Ballerina Visualizer cannot start** | Your Ballerina version is earlier than 2201.14.0. | [Ballerina version is incompatible](#ballerina-version-is-incompatible) |
| **Your project dependencies need to be updated** | Your integration's dependencies were set up with a Ballerina version earlier than 2201.14.0. | [Project dependencies need to be updated](#project-dependencies-need-to-be-updated) |

## Ballerina version is incompatible

The editor shows **WSO2 Integrator cannot start**, or **Ballerina Visualizer cannot start** if you use only the Ballerina extension, when your installed Ballerina version is earlier than 2201.14.0. The current extensions need Ballerina 2201.14.0 or later to start.

:::info
The WSO2 Integrator app bundles its own Ballerina version, so this screen appears only in VS Code.
:::

You can either update Ballerina, or keep your current Ballerina version and switch the extensions to their previous versions.

### Update Ballerina

1. On the screen, click **Update Ballerina**.
2. Wait for the update to finish. VS Code shows the progress and reloads the window when it's done. If the update fails, VS Code shows the error and the **cannot start** screen comes back, so you can try again.

    If Ballerina is installed in a location that needs administrator rights, VS Code opens a terminal with the update command on macOS and Linux, or an administrator prompt on Windows. Complete the update there, then reload the VS Code window.

To update from a terminal instead, run the following command, then reload the VS Code window:

```bash
bal dist pull 2201.14.0
```

Run `bal version` to confirm that Ballerina 2201.14.0 is active.

### Keep your current Ballerina version

Switch each installed extension to a version earlier than its current release:

| Extension | Install a version earlier than |
|---|---|
| WSO2 Integrator | 1.2.0 |
| Ballerina | 6.0.0 |

If you use the WSO2 Integrator extension, switch both extensions. If you use only the Ballerina extension, switch that one.

1. Open the **Extensions** view with `Cmd+Shift+X` on macOS, or `Ctrl+Shift+X` on Windows and Linux.
2. Select the extension, then open the dropdown next to **Uninstall** and select **Install Specific Version...**.
3. Select the latest version that is earlier than the version in the table.
4. Repeat for the other extension, if you use both.
5. Reload the VS Code window when prompted.

:::warning Turn off auto-update
VS Code updates extensions automatically by default, which reinstalls the current releases. Right-click each extension you switched and clear **Auto Update**.
:::

## Project dependencies need to be updated

The editor shows **Your project dependencies need to be updated** when the integration you open has dependencies that were set up with a Ballerina version earlier than 2201.14.0.

Integrations lock the exact version of each dependency in `Dependencies.toml`, so they keep using those versions until you update them. Some of the dependencies set up with an earlier Ballerina version are incompatible with Ballerina 2201.14.0. Newer releases of those packages fix the incompatibilities, and updating the dependencies picks them up. The `distribution-version` field in `Dependencies.toml` records the Ballerina version that set them up:

```toml
[ballerina]
dependencies-toml-version = "2"
distribution-version = "2201.12.3"
```

Only packages that set `sticky = true` under `[build-options]` in `Ballerina.toml` are checked. Integrations are created with it; a package without it picks up newer versions on its next build.

In a workspace, each package has its own `Dependencies.toml`, and the editor checks every package and lists the ones it will update. Running or debugging the integration also opens this screen until the dependencies are updated.

You can either update the dependencies, or keep them as they are by switching to a matching earlier setup.

### Update the dependencies

1. On the screen, click **Update Dependencies**.
2. Wait for the update to finish. This can take a few minutes. The screen shows the progress, with a **Show output** link to the build output, and opens your integration when every package is updated.

For each package with outdated dependencies, the update:

- Runs `bal clean` and `bal build --sticky=false`, which resolves each dependency to the latest version that works with Ballerina 2201.14.0.
- Rewrites `Dependencies.toml` with those versions.
- Sets `distribution` in the package's `Ballerina.toml` to the new Ballerina version.

The update needs access to Ballerina Central. Commit the updated `Dependencies.toml` and `Ballerina.toml` files so that others working on the integration get the same versions.

To update a package from a terminal instead, run the following commands from the package directory:

```bash
bal clean
bal build --sticky=false
```

#### If the update fails

The screen shows the reason in red, with a **Show output** link that opens the build output.

- **Compile errors**: fix the errors shown in the build output, then click **Update Dependencies** again.
- **Ballerina Central couldn't be reached**: check your internet connection and any proxy settings, then click **Update Dependencies** again.

If the update keeps failing, capture the output and report the issue as described in [Editor troubleshooting](troubleshooting.md).

### Keep the current dependencies

#### VS Code

Switch to the Ballerina version that set up the dependencies, then switch the extensions to their previous versions.

1. Open `Dependencies.toml` in the package directory, and note the `distribution-version` value in the `[ballerina]` table. In a workspace, check each package and use the latest version listed.
2. Switch to that Ballerina version. For example, if `distribution-version` is `2201.12.3`, run:

    ```bash
    bal dist pull 2201.12.3
    ```

3. Switch the extensions to their previous versions as described in [Keep your current Ballerina version](#keep-your-current-ballerina-version).

Until you finish step 3, the editor shows the **cannot start** screen. That's expected, because the current extensions need Ballerina 2201.14.0.

#### WSO2 Integrator app

The WSO2 Integrator app bundles its own Ballerina version. Download a WSO2 Integrator version earlier than 5.1.0 from the [WSO2 Integrator Downloads page](https://wso2.com/products/downloads/?product=wso2integrator) and install it. The integration opens unchanged, with no dependency update needed.

## What's next

- [Editor troubleshooting](troubleshooting.md) - capture verbose editor output and report an issue.
- [Ballerina.toml reference](../../reference/configuration-reference.md#ballerinatoml-reference) - manage package settings and dependencies.
