---
sidebar_position: 3
title: Remote Debugging
description: Attach a debugger to Ballerina services running in remote environments.
---

# Remote Debugging

Attach the VS Code debugger to Ballerina services running in Docker containers, Kubernetes pods, or remote servers. Remote debugging lets you investigate issues that only occur in specific environments without adding log statements and redeploying.

## How Remote Debugging Works

Ballerina supports the Debug Adapter Protocol (DAP) over a TCP connection. When you start a Ballerina program in debug mode, it listens on a specified port for a debugger to attach. You then connect VS Code to that port to set breakpoints and inspect state.

## Starting a Service in Debug Mode

### On a Remote Server

Start your Ballerina service with the `--debug` flag to enable the debug listener.

```bash
# Start with debug port 5005
bal run --debug 5005

# The service starts and waits for a debugger connection
# Output: Listening for transport dt_socket at address: 5005
```

### In a Docker Container

Expose the debug port in your Dockerfile and Docker run command.

```dockerfile
FROM ballerina/ballerina:2201.11.0

COPY . /app
WORKDIR /app

# Expose both the service port and debug port
EXPOSE 9090 5005

# Start with debug mode enabled
CMD ["bal", "run", "--debug", "5005"]
```

```bash
# Run the container with debug port mapped
docker run -p 9090:9090 -p 5005:5005 my-integration:latest
```

### In Kubernetes

Add the debug port to your service definition and create a port-forward.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 1  # Use 1 replica for debugging
  template:
    spec:
      containers:
        - name: order-service
          image: my-integration:debug
          ports:
            - containerPort: 9090
              name: http
            - containerPort: 5005
              name: debug
          command: ["bal", "run", "--debug", "5005"]
```

```bash
# Forward the debug port to your local machine
kubectl port-forward deployment/order-service 5005:5005
```

:::caution Production Debugging
Never leave debug ports open in production. Use separate debug-enabled deployments or enable debug mode temporarily. Always use a single replica when debugging to ensure your breakpoints are hit.
:::

## Connecting VS Code

### Configure launch.json

Add a remote attach configuration to `.vscode/launch.json`.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Ballerina Remote Debug",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5005
        },
        {
            "name": "Remote Debug (Docker)",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5005
        },
        {
            "name": "Remote Debug (Kubernetes)",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5005
        }
    ]
}
```

### Attach to the Remote Service

1. Open your project in VS Code (the source code must match the deployed version)
2. Set breakpoints in your source files
3. Open the Run and Debug panel (`Ctrl+Shift+D`)
4. Select the remote debug configuration
5. Click the green play button to attach

<!-- TODO: Screenshot of VS Code Run and Debug panel with remote config selected -->

Once attached, the debugger behaves the same as local debugging -- you can step through code, inspect variables, and evaluate expressions.

## Debugging in Docker Compose

For multi-service debugging with Docker Compose, expose debug ports for each service.

```yaml
# docker-compose.debug.yaml
version: '3.8'
services:
  order-service:
    build: ./order-service
    ports:
      - "9090:9090"
      - "5005:5005"
    command: ["bal", "run", "--debug", "5005"]

  inventory-service:
    build: ./inventory-service
    ports:
      - "9091:9091"
      - "5006:5005"
    command: ["bal", "run", "--debug", "5005"]

  payment-service:
    build: ./payment-service
    ports:
      - "9092:9092"
      - "5007:5005"
    command: ["bal", "run", "--debug", "5005"]
```

Create separate launch configurations for each service:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Order Service",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5005
        },
        {
            "name": "Debug Inventory Service",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5006
        },
        {
            "name": "Debug Payment Service",
            "type": "ballerina",
            "request": "attach",
            "debuggeeHost": "127.0.0.1",
            "debuggeePort": 5007
        }
    ]
}
```

## Source Mapping

For remote debugging to work correctly, the source code in VS Code must match the version deployed to the remote environment.

```bash
# Verify the deployed version matches your local code
git log --oneline -1
# abc1234 Fix order validation logic

# The same commit should be deployed in the remote environment
```

If source code is out of sync, breakpoints may appear on wrong lines or variables may show incorrect values.

## Security Considerations

- **Never expose debug ports publicly** -- use SSH tunnels or port forwarding
- **Use network policies** in Kubernetes to restrict access to the debug port
- **Remove debug flags** before production deployment
- **Limit debug sessions** -- long-paused breakpoints can cause request timeouts and health check failures

### SSH Tunnel for Remote Servers

```bash
# Create an SSH tunnel to the debug port on a remote server
ssh -L 5005:localhost:5005 user@remote-server

# Then attach VS Code to localhost:5005
```

## Troubleshooting Remote Debugging

| Issue | Solution |
|-------|----------|
| Cannot connect to remote | Verify the debug port is exposed and accessible; check firewall rules |
| Breakpoints not hit | Ensure source code matches the deployed version exactly |
| Connection refused | Confirm the service started with `--debug` flag and is waiting for a connection |
| Debugger disconnects | Check network stability; increase timeout settings |
| Slow stepping | Remote network latency affects step-through speed; consider debugging locally with mocked dependencies |

## Best Practices

- **Match source to deployment** -- always debug with the exact code version that is deployed
- **Use a single replica** when debugging in Kubernetes to ensure your requests hit the debugged pod
- **Set a debug timeout** -- do not leave breakpoints paused for more than a few minutes to avoid cascading failures
- **Use SSH tunnels** instead of exposing debug ports directly
- **Debug in staging, not production** -- replicate the issue in a non-production environment whenever possible

## What's Next

- [Editor Debugging](editor-debugging.md) -- Local debugging fundamentals
- [Strand Dump Analysis](strand-dumps.md) -- Diagnose concurrency issues
- [Performance Profiling](performance-profiling.md) -- Identify performance bottlenecks
