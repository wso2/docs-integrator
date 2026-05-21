---
title: IDE Troubleshooting
---

# IDE Troubleshooting

Use this page when something in the WSO2 Integrator editor isn't behaving the way you expect: a feature doesn't respond, a diagram doesn't load, or an action errors out. Before you file an issue, capture verbose editor output so the team can act on the report.

## Capture verbose editor output

### 1. Enable verbose logging

1. Open **Settings** with `Cmd+,` on macOS, or `Ctrl+,` on Windows and Linux.

    ![Open Settings from the command menu](/img/develop/troubleshooting/ide-troubleshooting/open-settings-command.png)

2. In the search box, type `ballerina`.

    ![Settings page](/img/develop/troubleshooting/ide-troubleshooting/settings-page.png)

3. Set each of the following to the value shown:
    - `ballerina.traceLog`: enabled (`true`).
    - `ballerina.debugLog`: enabled (`true`).
    - `ballerina-vscode.trace.server`: `verbose`.

### 2. Open the output panel

1. Press `Cmd+Shift+P` on macOS, or `Ctrl+Shift+P` on Windows and Linux.
2. Run **Output: Focus on Output View**.
3. In the channel dropdown on the right of the Output panel, select **Ballerina**.

    ![Select the Ballerina output channel](/img/develop/troubleshooting/ide-troubleshooting/ballerina-output-channel.png)

### 3. Reproduce the issue and read the output

1. Repeat the steps that caused the unexpected behavior.
2. Scroll through the Ballerina channel and look for errors or stack traces.
3. Copy any error text you find.

## Report the issue

Open a new issue in the [wso2/product-integrator](https://github.com/wso2/product-integrator/issues) repository and include:

- A short title that describes the symptom.
- The exact steps you followed to reproduce the issue.
- The error text copied from the Ballerina output channel, in a fenced code block.
- A screen recording of the reproduction, if you can capture one.

If the Ballerina channel doesn't show any error, still file the issue. Include the reproduction steps and the screen recording so the team can dig deeper from there.

## What's next

- [Errors and stack traces](errors-and-stack-traces.md) - interpret the error text you captured from the Ballerina output channel.
- [Logging](logging.md) - add log statements once the IDE is working again to trace what the integration does at runtime.
- [Editor debugging](../debugging/editor.md) - set breakpoints and step through the integration after the IDE issue is resolved.
