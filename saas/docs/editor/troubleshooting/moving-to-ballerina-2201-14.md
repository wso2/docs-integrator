---
title: Moving to Ballerina 2201.14.0
---

# Moving to Ballerina 2201.14.0

WSO2 Integrator 5.1.0, the WSO2 Integrator extension 1.2.0, and the Ballerina extension 6.0.0 run on Ballerina 2201.14.0, which moves from Java 21 to Java 25. When you open an older setup or integration in these releases, the editor can show one of two screens instead of your integration. This page explains why each screen appears and the options you have.

| The editor shows | Why | To update | To stay on your current version |
|---|---|---|---|
| **WSO2 Integrator cannot start** or **Ballerina Visualizer cannot start** | Your Ballerina version is earlier than 2201.14.0. | [Update Ballerina](#update-ballerina) | [Keep your current Ballerina version](#keep-your-current-ballerina-version) |
| **Your project dependencies need to be updated**, including when you click **Run** or **Debug** | Your integration's dependencies were set up with a Ballerina version earlier than 2201.14.0. | [Update the dependencies](#update-the-dependencies) | [Keep the current dependencies](#keep-the-current-dependencies) |

If you build or run from a terminal or a CI/CD pipeline instead, see [Symptoms outside the editor](#symptoms-outside-the-editor).

## Ballerina version is incompatible

The editor shows **WSO2 Integrator cannot start**, or **Ballerina Visualizer cannot start** if you use only the Ballerina extension, when your installed Ballerina version is earlier than 2201.14.0. The current extensions need Ballerina 2201.14.0 or later to start.

The WSO2 Integrator app bundles its own Ballerina version, so this screen appears only in VS Code.

You can either update Ballerina, or keep your current Ballerina version and switch the extensions to their previous versions.

### Update Ballerina

1. On the screen, click **Update Ballerina**.
2. Wait for the update to finish. VS Code shows the progress and reloads the window when it's done. If the update fails, VS Code shows the error and the **cannot start** screen comes back, so you can try again.

    If you installed Ballerina yourself, rather than through the extension, VS Code opens a terminal with the update command on macOS and Linux, or an administrator prompt on Windows. Complete the update there, then reload the VS Code window.

To update from a terminal instead, run the following command, then reload the VS Code window:

```bash
bal dist pull 2201.14.0
```

If you installed Ballerina with the installer, rather than through the extension, run the command with `sudo` on macOS and Linux, or from an administrator command prompt on Windows.

Run `bal version` to confirm that Ballerina 2201.14.0 is active.

### Keep your current Ballerina version

Switch each installed extension to the version in the following table. These are the last releases before the move to Java 25, and they work with Ballerina 2201.13.x.

| Extension | Switch to |
|---|---|
| WSO2 Integrator | 1.0.1 |
| Ballerina | 5.12.5 |

If you use the WSO2 Integrator extension, switch both extensions, starting with the WSO2 Integrator extension. The WSO2 Integrator extension installs the Ballerina extension it needs, so switching the Ballerina extension first can prompt it to install a newer Ballerina extension again. If you use only the Ballerina extension, switch that one.

1. Open the **Extensions** view with `Cmd+Shift+X` on macOS, or `Ctrl+Shift+X` on Windows and Linux.
2. Select the **WSO2 Integrator** extension, then open the dropdown next to **Uninstall** and select **Install Specific Version...**.
3. Select the version in the table.
4. Repeat steps 2 and 3 for the **Ballerina** extension.
5. Reload the VS Code window when prompted.

:::warning Turn off auto-update
VS Code updates extensions automatically by default, which reinstalls the current releases. Right-click each extension you switched and clear **Auto Update**.

## Project dependencies need to be updated

The editor shows **Your project dependencies need to be updated** when the integration you open has dependencies that were set up with a Ballerina version earlier than 2201.14.0.

Clicking **Run** or **Debug** on such an integration doesn't start it. The editor opens this screen instead, and the status bar shows **Run cancelled: update the project dependencies first**.

Integrations lock the exact version of each dependency in `Dependencies.toml`, so they keep using those versions until you update them. Some of the dependencies set up with an earlier Ballerina version are incompatible with Ballerina 2201.14.0. Newer releases of those packages fix the incompatibilities, and updating the dependencies picks them up.

The `distribution-version` field in `Dependencies.toml` records the Ballerina version that set them up:

```toml
[ballerina]
dependencies-toml-version = "2"
distribution-version = "2201.12.3"
```

A `Dependencies.toml` without a `distribution-version` field uses an older format and is also treated as set up with an earlier Ballerina version.

Only packages that set `sticky = true` under `[build-options]` in `Ballerina.toml`, or in the workspace's `Ballerina.toml`, are checked. Integrations are created with it; a package without it picks up newer versions on its next build.

In a workspace, each package has its own `Dependencies.toml`, and the editor checks every package and lists the ones it will update.

You can either update the dependencies, or keep them as they are by switching to a matching earlier setup.

### Before you update

- **What moves:** each dependency moves to the latest version that works with Ballerina 2201.14.0 within its current major version. The update doesn't move a dependency to a new major version, because a new major version can include breaking changes.
- **What can change:** newer minor and patch versions are meant to be compatible, but they can deprecate APIs or fix behavior your integration relied on. Build and test the integration after the update.
- **Who it affects:** after the update, everyone working on the integration, and every pipeline that builds or runs it, needs Ballerina 2201.14.0 and Java 25. See [After you update](#after-you-update).
- **How to undo it:** commit or back up `Dependencies.toml` and `Ballerina.toml` in each package first. To undo the update, restore both files, for example with `git checkout -- Dependencies.toml Ballerina.toml`. In a workspace, packages update one at a time, and a package that fails doesn't stop the others, so after a failed update some packages can already have rewritten files. Check every package before you restore files. The restored files still have the old dependency versions, so on Ballerina 2201.14.0 the editor shows **Your project dependencies need to be updated** again. To stop it from appearing, [keep the current dependencies](#keep-the-current-dependencies).

### Update the dependencies

1. On the screen, click **Update Dependencies**.
2. Wait for the update to finish. This can take a few minutes. The screen shows the progress, with a **Show output** link to the build output, and opens your integration when every package is updated.

For each package with outdated dependencies, the update:

- Runs `bal clean` and `bal build --sticky=false`, which resolves each dependency to the latest version that works with Ballerina 2201.14.0 within its current major version.
- Rewrites `Dependencies.toml` with those versions.
- If the package's `Ballerina.toml` has a `distribution` field and no unsaved changes, moves it to the new Ballerina version.

The update needs access to Ballerina Central.

To update a package from a terminal instead, run the following commands from the package directory:

```bash
bal clean
bal build --sticky=false
```

These commands don't change `distribution` in `Ballerina.toml`. If the file has a `distribution` field, set it to `2201.14.0` by hand.

:::note Running `bal` with the WSO2 Integrator app
The WSO2 Integrator app bundles its own Ballerina distribution, which usually isn't on your `PATH`. Run the commands in the app's terminal (**Terminal** > **New Terminal**), which uses the bundled `bal`. Outside the app, use the `bal` in the `components/ballerina/bin` directory of the app installation, for example `/Applications/WSO2 Integrator.app/Contents/components/ballerina/bin/bal` on macOS.

#### If the update fails

The screen shows the reason in red, with a **Show output** link that opens the build output and a **See the troubleshooting guide** link. In a workspace, the message names the packages that failed.

- **Compile errors**: fix the errors shown in the build output, then click **Update Dependencies** again.
- **Ballerina Central couldn't be reached**: check your internet connection and any proxy settings, then click **Update Dependencies** again.
- **The dependencies couldn't be updated** with no other reason: open the build output to find the cause, then click **Update Dependencies** again.

If the update keeps failing, capture the output and report the issue as described in [Editor troubleshooting](troubleshooting.md).

#### After you update

Commit the updated `Dependencies.toml` and `Ballerina.toml` files so that others working on the integration get the same versions. The integration now needs Ballerina 2201.14.0, so also update the following:

- **Teammates' setups:** everyone working on the integration needs WSO2 Integrator 5.1.0, or VS Code with Ballerina 2201.14.0. A build on an earlier Ballerina version can still succeed, but it sets `distribution-version` in `Dependencies.toml` back to that version. If that change is committed, the editor shows **Your project dependencies need to be updated** again for everyone on 2201.14.0.
- **CI/CD pipelines and Docker images:** update any pipeline step or base image that installs or pins an earlier Ballerina version to 2201.14.0.
- **Runtime:** executables built with Ballerina 2201.14.0 need Java 25 to run. Update the Java runtime or base image wherever you deploy them. On a Java version earlier than 25, the integration fails to start with an `UnsupportedClassVersionError`.

### Keep the current dependencies

#### VS Code

Switch to the latest Ballerina 2201.13.x version, then switch the extensions to their previous versions.

1. Switch to the latest Ballerina 2201.13.x version, for example 2201.13.7:

    ```bash
    bal dist pull 2201.13.7
    ```

    Any Ballerina version from the one in the `distribution-version` field of `Dependencies.toml` up to, but not including, 2201.14.0 keeps the locked dependency versions.

2. Switch the extensions to their previous versions as described in [Keep your current Ballerina version](#keep-your-current-ballerina-version).

Until you finish step 2, the editor shows the **cannot start** screen. That's expected, because the current extensions need Ballerina 2201.14.0.

#### WSO2 Integrator app

The WSO2 Integrator app bundles its own Ballerina version. Download WSO2 Integrator 5.0.x, which bundles Ballerina 2201.13.x, from the [WSO2 Integrator Downloads page](https://wso2.com/products/downloads/?product=wso2integrator) and install it. The integration opens unchanged, with no dependency update needed.

WSO2 Integrator 5.0.x doesn't update itself, so it stays on that version until you install a newer one.

## Symptoms outside the editor

The editor screens appear only when you open the integration in the editor. If you build or run an integration from a terminal or a CI/CD pipeline, look for the following instead.

### Build warning about an earlier Swan Lake update

A `bal build` or `bal run` with Ballerina 2201.14.0 on an integration whose dependencies were set up with an earlier version shows a warning similar to the following:

```text
WARNING [message_translator] Detected an attempt to compile this package using Swan Lake Update 14. However, this package was built using Swan Lake Update 13.3.
HINT: Execute the bal command with --locking-mode=soft
```

The build keeps the dependency versions in `Dependencies.toml`. It can still succeed, or it can fail with compile or runtime errors from a dependency that's incompatible with Ballerina 2201.14.0.

To update the dependencies, run the following commands from the package directory, as described in [Update the dependencies](#update-the-dependencies):

```bash
bal clean
bal build --sticky=false
```

### Java version error at startup

An executable built with Ballerina 2201.14.0 fails to start on a Java version earlier than 25 with an error similar to the following:

```text
Error: LinkageError occurred while loading main class wso2.message_translator.0.$_init
	java.lang.UnsupportedClassVersionError: io/ballerina/runtime/internal/values/ValueCreator has been compiled by a more recent version of the Java Runtime (class file version 69.0), this version of the Java Runtime only recognizes class file versions up to 65.0
```

Run the executable on Java 25. See [After you update](#after-you-update).

## What's next

- [Editor troubleshooting](troubleshooting.md) - capture verbose editor output and report an issue.
- [Ballerina.toml reference](../../reference/configuration-reference.md#ballerinatoml-reference) - manage package settings and dependencies.
