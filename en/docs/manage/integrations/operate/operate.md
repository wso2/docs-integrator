---
sidebar_position: 0
sidebar_label: Runtime Operations
title: Operate
description: "Monitor and manage a deployed integration's runtime: pod status, container resources, configs and secrets, health checks, scaling, and deployment tracks."
keywords: [choreo integrator, choreo cloud, operate, runtime, containers, health checks, scaling, deployment tracks]
slug: /manage/integrations/operate
---

# Operate

Once an integration is deployed, **Operate** is where you monitor and manage it while it's running — per environment, from the integration's own navigation.

## Operate areas

| Area | Description |
|---|---|
| [Runtime Status](./runtime-operations.md) | View pod status and resource usage for an environment, and redeploy an integration's release. |
| [Containers](./containers.md) | Set container CPU and memory request/limit. |
| [Configs & Secrets](./configs-and-secrets.md) | Manage environment variables and mounted files, for values that aren't Ballerina configurables. |
| [Health Checks](./health-checks.md) | Configure liveness and readiness probes so unhealthy replicas self-heal. |
| [Scaling](./scaling.md) | Configure autoscaling based on CPU and memory thresholds. |
| [Deployment Tracks](./deployment-tracks.md) | Manage multiple independently buildable and deployable versions of an integration. |
| [Promotion](./promotion.md) | Move a deployment track's build from one environment to the next. |
