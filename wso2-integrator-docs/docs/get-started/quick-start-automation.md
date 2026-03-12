---
sidebar_position: 10
title: "Quick Start: Build an Automation"
description: Create a scheduled automation that runs tasks on a timer.
---

# Quick Start: Build an Automation

**Time:** Under 10 minutes | **What you'll build:** A scheduled automation that runs tasks on a timer or manual trigger.

Automations are ideal for data synchronization, report generation, and routine maintenance jobs.

## Prerequisites

- [WSO2 Integrator extension installed](install.md)

## Step 1: Create the Project

1. Open the WSO2 Integrator sidebar in VS Code.
2. Click **Create New Integration**.
3. Enter the integration name (e.g., `MyAutomation`).

## Step 2: Add an Automation Artifact

1. In the design view, add an **Automation** artifact.
2. The automation starts with an empty flow.

## Step 3: Add Logic

1. Add a **Call Function** node to the flow.
2. Configure it with a simple expression:

```ballerina
import ballerina/io;

public function main() {
    io:println("Hello World");
}
```

## Step 4: Run and Test

1. Click **Run** in the toolbar (top-right corner).
2. The automation executes immediately and prints output to the terminal.
3. Check the terminal output for `Hello World`.

## Scheduling Automations

For production use, configure a cron schedule to trigger the automation periodically:

```ballerina
import ballerina/task;

listener task:Listener timer = new ({
    intervalInMillis: 60000  // Run every 60 seconds
});

service on timer {
    remote function onTrigger() {
        // Your automation logic here
    }
}
```

## What's Next

- [Quick Start: Integration as API](quick-start-api.md) -- Build an HTTP service
- [Quick Start: Event Integration](quick-start-event.md) -- React to messages from brokers
- [Quick Start: AI Agent](quick-start-ai-agent.md) -- Build an intelligent agent
