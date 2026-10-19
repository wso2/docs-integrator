---
title: Troubleshoot Deployment
---

# Troubleshoot Deployment

This page covers issues that surface only after an integration leaves your machine and runs on WSO2 Cloud, including configuration injected at runtime.

Before you start digging into the deployment layer, confirm the integration runs locally with `bal build && bal run`. If it fails locally, fix the integration first using the other pages in this section. If it works locally but breaks once deployed, the issue is in the deployment environment, and the section below helps you isolate it.

## Configuration in deployed environments

On WSO2 Cloud, configurable values are not read from a `Config.toml` file in the repository. They are set per environment from the integration's **Configure** view and injected at runtime, so a value that works locally can still be missing or wrong once deployed.

If a deployed integration fails to start with `value not provided for required configurable variable`, the configurable was declared in the integration but never given a value for that environment.

1. Open the integration from the project home.
2. Click **Configure** on the environment card for the failing environment.
3. Check that every required configurable has a value, then click **Update**.

The integration restarts with the new configuration. For sensitive values such as API keys and passwords, mark the value as a secret so it is stored in the data plane's secret vault rather than held in plain text. See [Runtime configurations](../../manage/configurations/runtime-configurations.md) for configuring values per environment, secrets, and organization-level configuration groups.

## What's next

- [Logging](../../develop-and-test/troubleshooting/logging.md) - add log statements to trace what the deployed integration is doing.
- [Errors and stack traces](../../develop-and-test/troubleshooting/errors-and-stack-traces.md) - read the error output captured from a deployed integration.
- [Profiling](../../develop-and-test/troubleshooting/profiling.md) - investigate performance issues that only appear under deployed load.
