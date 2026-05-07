---
title: Build an Automation
---

# Build an Automation

**Time:** Under 10 minutes | **What you'll build:** An automation that prints `Hello World` to the terminal when it runs.

An automation runs your integration logic without an external request, on demand or on a schedule. Automations are ideal for data synchronization, report generation, and routine maintenance jobs. This quick start shows the full cycle: add an automation artifact, build the logic in the visual designer, run it, and review the scheduling options for production.

:::info Prerequisites

- [WSO2 Integrator installed](install.md)
- A project to work in. If you do not have one, select **Create New Integration** when WSO2 Integrator opens.

## Step 1: Add an automation artifact

1. Select your integration from the project panel.
2. In the design view, select **Add Artifact**.
3. Select **Automation** under **Automation**.
4. Select **Create**.

<ThemedImage
    alt="Create New Automation form opened after selecting Automation under Automation"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
        dark: useBaseUrl('/img/get-started/build-automation/add-an-automation-artifact.png'),
    }}
/>

## Step 2: Add logic

1. Select **+** after the **Start** node to open the node panel.
2. Select **Call Function**.
3. Select **Print** from the function list.
4. Select **Initialize Array** for the **Values** parameter.
5. Set **Values** to `"Hello World"` and select **Save**.

<ThemedImage
    alt="io:print configuration panel with the Values parameter set to Hello World, ready to be saved"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
        dark: useBaseUrl('/img/get-started/build-automation/add-logic.png'),
    }}
/>

## Step 3: Run and test

1. Select **Run**.
2. Confirm the terminal output contains `Hello World`.

<ThemedImage
    alt="Running the automation and seeing the Hello World output in the terminal"
    sources={{
        light: useBaseUrl('/img/get-started/build-automation/run-and-test-light.gif'),
        dark: useBaseUrl('/img/get-started/build-automation/run-and-test-dark.gif'),
    }}
/>

The following complete, runnable Ballerina program produces the same automation shown in the visual designer steps.

```ballerina
import ballerina/io;
import ballerina/log;

public function main() returns error? {
    do {
        io:print("Hello World");
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

Save this as `automation.bal`, then run `bal run` from the project directory. The terminal output contains `Hello World`.

## Scheduling automations

Periodic invocation is configured in an external system once the automation is deployed. Available options include:

- **Cron job**: schedule the automation from a `cron` entry on a Unix or Linux host.
- **Kubernetes**: define a `CronJob` resource to run the automation on a recurring schedule.
- **VM**: use a host scheduler such as Windows Task Scheduler or `systemd` timers.
- **WSO2 Integration Platform**: configure the schedule in the WSO2 Integration Platform when the integration is pushed to the cloud.

## What's next

- [Build an API integration](build-api-integration.md) — Build an HTTP service
- [Build an AI agent](build-ai-agent.md) — Build an intelligent agent
- [Build an event-driven integration](build-event-driven-integration.md) — React to messages from brokers
- [Build a file-driven integration](build-file-driven-integration.md) — Process files from FTP or local directories
- [Automation](../develop/integration-artifacts/automation/automation.md) — Configure scheduling, manual execution, and integration logic
- [Tutorials](../tutorials/rest-api-aggregation-service.md) — End-to-end walkthroughs and patterns
