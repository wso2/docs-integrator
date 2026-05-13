---
sidebar_position: 6
title: Remote Debugging
description: Attach the debugger to integrations running on remote environments.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remote debugging

Attach the WSO2 Integrator debugger to integrations running on remote servers, containers, or other environments. Remote debugging lets you investigate issues that only occur in specific environments without adding log statements and redeploying.

## How remote debugging works

When you start a Ballerina program with the `--debug` flag, it opens a debug port and waits for a debugger to connect. WSO2 Integrator then attaches to that port over TCP to provide the same debugging experience as local debugging — breakpoints, stepping, variable inspection, and expression evaluation.

## Start the integration in debug mode

Run one of the following commands on the machine where the integration is deployed:

| Command | Description |
|---------|-------------|
| `bal run --debug <PORT> <BAL_FILE_OR_PACKAGE>` | Debug a Ballerina package or file |
| `bal run --debug <PORT> <JAR_FILE>` | Debug a Ballerina executable JAR |
| `bal test --debug <PORT> <PACKAGE>` | Debug Ballerina tests |

**Example:**

```bash
bal run --debug 5005

# Output:
# Listening for transport dt_socket at address: 5005
```

The program starts and waits for a debugger connection before proceeding.

:::caution
Never leave debug ports open in production. Enable debug mode only temporarily and ensure the port is not publicly accessible.
:::

## Configure the remote debug session

Add a remote attach configuration to `launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Ballerina Remote",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5005
        }
    ]
}
```

Set `debuggeeHost` and `debuggeePort` to match the host and port where the integration is running.

## Attach to the remote integration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your project in WSO2 Integrator (the source code must match the deployed version).
2. Open your integration in the design view and set breakpoints on the flow nodes you want to inspect.
3. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS) and select **Ballerina: Attach to Remote**.
4. Enter the remote host and port (for example, `127.0.0.1:5005`).

Once attached, the debugger pauses at your breakpoints and highlights the active node in the flow diagram.

<!-- TODO: Screenshot showing Attach to Remote command in Command Palette -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

1. Open your project in WSO2 Integrator (the source code must match the deployed version).
2. Set breakpoints in your source files.
3. Open the **Run and Debug** panel (`Ctrl+Shift+D` or `Cmd+Shift+D` on macOS).
4. Select **Ballerina Remote** from the configuration dropdown.
5. Click the green play button or press `F5` to attach.

<!-- TODO: Screenshot showing Run and Debug panel with Ballerina Remote selected -->

</TabItem>
</Tabs>

Once attached, the debugger behaves the same as local debugging — you can step through code, inspect variables, and evaluate expressions in the **Debug Console**.

## Source mapping

For remote debugging to work correctly, the source code in WSO2 Integrator must match the version deployed to the remote environment.

```bash
# Verify the deployed version matches your local code
git log --oneline -1
# abc1234 Fix order validation logic

# The same commit should be deployed in the remote environment
```

If source code is out of sync, breakpoints may appear on wrong lines or variables may show incorrect values.

## Security considerations

- **Never expose debug ports publicly** — use SSH tunnels or port forwarding to access remote debug ports securely.
- **Remove debug flags** before deploying to production.
- **Limit debug sessions** — long-paused breakpoints can cause request timeouts and health check failures.

### SSH tunnel for remote servers

```bash
# Create an SSH tunnel to the debug port on a remote server
ssh -L 5005:localhost:5005 user@remote-server

# Then attach WSO2 Integrator to localhost:5005
```

## Troubleshooting remote debugging

| Issue | Solution |
|-------|----------|
| Cannot connect to remote | Verify the debug port is exposed and accessible; check firewall rules |
| Breakpoints not hit | Ensure source code matches the deployed version exactly |
| Connection refused | Confirm the service started with `--debug` flag and is waiting for a connection |
| Debugger disconnects | Check network stability; increase timeout settings |
| Slow stepping | Remote network latency affects step-through speed; consider debugging locally with mocked dependencies |

## Best practices

- **Match source to deployment** — always debug with the exact code version that is deployed
- **Use a single replica** when debugging in containerized environments to ensure your requests hit the debugged instance
- **Set a debug timeout** — do not leave breakpoints paused for more than a few minutes to avoid cascading failures
- **Use SSH tunnels** instead of exposing debug ports directly
- **Debug in staging, not production** — replicate the issue in a non-production environment whenever possible

## What's next

- [Editor Debugging](editor.md) — Local debugging fundamentals
- [Strand Dump Analysis](strand-dump-analysis.md) — Diagnose concurrency issues
- [Performance Profiling](performance-profiling.md) — Identify performance bottlenecks
