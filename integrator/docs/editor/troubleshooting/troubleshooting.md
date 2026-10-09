---
title: Editor Troubleshooting
---

# Editor Troubleshooting

Use this page when something in the WSO2 Integrator editor isn't behaving the way you expect: a feature doesn't respond, a diagram doesn't load, or an action errors out. Before you file an issue, capture verbose editor output so the team can act on the report.

If the editor shows **WSO2 Integrator cannot start** or **Your project dependencies need to be updated** after you move to Ballerina 2201.14.0, see [Moving to Ballerina 2201.14.0](moving-to-ballerina-2201-14.md).

## Steps : Capture verbose editor output

### 1. Enable verbose logging

1. Open **Settings** with `Cmd+,` on macOS, or `Ctrl+,` on Windows and Linux.

    <ThemedImage
        alt="Open Settings from the command menu"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/open-settings-command.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/open-settings-command.png'),
        }}
    />

2. In the search box, type `ballerina`.

    <ThemedImage
        alt="Settings page"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/settings-page.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/settings-page.png'),
        }}
    />

3. Set each of the following to the value shown:
    - `ballerina.traceLog`: enabled (`true`).
    - `ballerina.debugLog`: enabled (`true`).
    - `ballerina-vscode.trace.server`: `verbose`.

### 2. Open the output panel

1. Press `Cmd+Shift+P` on macOS, or `Ctrl+Shift+P` on Windows and Linux.
2. Run **Output: Focus on Output View**.
3. In the channel dropdown on the right of the Output panel, select **Ballerina**.

    <ThemedImage
        alt="Select the Ballerina output channel"
        sources={{
            light: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/ballerina-output-channel.png'),
            dark: useBaseUrl('/img/editor/troubleshooting/ide-troubleshooting/ballerina-output-channel.png'),
        }}
    />

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

- [Moving to Ballerina 2201.14.0](moving-to-ballerina-2201-14.md) - resolve the Ballerina version and dependency screens that appear after you move to Ballerina 2201.14.0.
- [Errors and stack traces](../../develop-and-test/troubleshooting/errors-and-stack-traces.md) - interpret the error text you captured from the Ballerina output channel.
- [Logging](../../develop-and-test/troubleshooting/logging.md) - add log statements once the IDE is working again to trace what the integration does at runtime.
- [Debug Your Integration](../../develop-and-test/debugging/debugging.md) - set breakpoints and step through the integration after the IDE issue is resolved.
