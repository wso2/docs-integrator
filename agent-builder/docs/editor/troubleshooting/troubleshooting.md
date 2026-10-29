---
title: Diagnose Issues
---

# Diagnose Issues

Use this page when something in the WSO2 Agent Builder editor isn't behaving the way you expect: a feature doesn't respond, a diagram doesn't load, or an action errors out. Before you file an issue, capture verbose editor output so the team can act on the report.

If the editor shows **Your project dependencies need to be updated** when you open a project that was created with an earlier Ballerina version, see [Moving to Ballerina 2201.14](moving-to-ballerina-2201-14.md).

## Steps : Capture verbose editor output

### 1. Enable verbose logging

1. Open **Settings** with `Cmd+,` on macOS, or `Ctrl+,` on Windows and Linux. You can also run **Preferences: Open User Settings** from the Command Palette.

    <ThemedImage
        alt="Preferences: Open User Settings in the Command Palette"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/open-settings-command-v1.0.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/open-settings-command-v1.0.png'),
        }}
    />

2. In the search box, type `ballerina`.

    <ThemedImage
        alt="Settings with ballerina typed in the search box"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/settings-page-v1.0.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/settings-page-v1.0.png'),
        }}
    />

3. Set each of the following to the value shown:
    - `ballerina.traceLog`: enabled (`true`).
    - `ballerina.debugLog`: enabled (`true`).
    - `ballerina-vscode.trace.server`: `verbose`.
4. When a message asks you to restart, click **Restart Now** so that the new settings take effect.

### 2. Open the output panel

1. Press `Cmd+Shift+P` on macOS, or `Ctrl+Shift+P` on Windows and Linux.
2. Run **Output: Focus on Output View**.
3. In the channel dropdown on the right of the Output panel, select **Ballerina**.

    <ThemedImage
        alt="Select the Ballerina output channel"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/ballerina-output-channel-v1.0.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/ballerina-output-channel-v1.0.png'),
        }}
    />

### 3. Reproduce the issue and read the output

1. Repeat the steps that caused the unexpected behavior.
2. Scroll through the Ballerina channel and look for errors or stack traces.
3. Copy any error text you find.

## Report the issue

Open a new issue in the [wso2/product-agent-builder](https://github.com/wso2/product-agent-builder/issues) repository and include:

- A short title that describes the symptom.
- The exact steps you followed to reproduce the issue.
- The error text copied from the Ballerina output channel, in a fenced code block.
- A screen recording of the reproduction, if you can capture one.

If the Ballerina channel doesn't show any error, still file the issue. Include the reproduction steps and the screen recording so the team can dig deeper from there.

## What's next

- [Moving to Ballerina 2201.14](moving-to-ballerina-2201-14.md) - resolve the dependency screen that appears when you open a project created with an earlier Ballerina version.
