---
title: Manage agents
---

# Manage agents

Once your agent leaves your machine, you need a control plane to organize it into projects and environments, move it through its lifecycle, govern what it can access, and watch how it behaves. You manage agents built in WSO2 Agent Builder with **WSO2 Agent Manager**.

:::info How you register the agent decides what Agent Manager manages
Every agent in Agent Manager is either platform-hosted or externally hosted. You choose the type when you create the agent, and you can't change it later.

- **Platform-hosted:** Agent Manager builds the agent from its source repository, deploys it, and promotes it across environments for you.
- **Externally hosted:** The agent runs on infrastructure you manage. Agent Manager doesn't build or deploy it, but it still governs and observes it.

## Manage with WSO2 Agent Manager

[WSO2 Agent Manager](https://wso2.com/agent-platform/docs/v1.0.0/get-started/what-is-amp/) is an open control plane for deploying, managing, and governing AI agents at scale. Platform-hosted agents run on Kubernetes, built on [OpenChoreo](https://github.com/openchoreo/openchoreo). Agent Manager is available as a managed cloud service and as a self-hosted installation.

**This is what you use when you:**

- Build, deploy, and promote agents through a deployment pipeline of environments, such as development, staging, and production.
- Configure environment variables, secrets, endpoint security, and timeouts for each agent.
- Route model calls through registered LLM service providers and give agents governed access to tools through MCP proxies.
- Enforce guardrails and policies, and control who can deploy to production with role-based access control.
- Capture traces, metrics, and logs with OpenTelemetry-based auto-instrumentation.
- Evaluate agent behavior continuously for accuracy, safety, reasoning, and tool usage.

### Platform-hosted and externally hosted agents

| Capability | Platform-hosted | Externally hosted |
|---|---|---|
| **Build and deploy** | Handled by Agent Manager | Handled by you |
| **Promote and suspend** | Supported | Not supported |
| **Configuration** | Injected into the running agent automatically | You apply the connection details Agent Manager provides |
| **Observability** | Auto-instrumentation | Requires you to instrument the agent |
| **LLM providers, MCP proxies, guardrails, access control, and evaluation** | Supported | Supported |

For details, see [Internal and external agents](https://wso2.com/agent-platform/docs/v1.0.0/concepts/internal-and-external-agent/).

### Deploy an agent from WSO2 Agent Builder

Agents built in WSO2 Agent Builder are Ballerina projects, so Agent Manager can build and host them with its Ballerina buildpack.

1. Push your agent project to a Git repository.
2. In your Agent Manager project, go to **Agents** and click **Add Agent**.
3. Select **Platform-Hosted Agent**, and then select **Source Code**.
4. Enter the repository URL, branch, and the path to your agent project.
5. Select **Ballerina** as the build type, and keep auto-instrumentation turned on.
6. Add the values your agent reads from `Config.toml` as environment variables named `BAL_CONFIG_VAR_`, where `` is the configurable name in uppercase. Mark API keys and other credentials as secrets.
7. Click **Deploy**.

Agent Manager deploys the agent to the first environment in the project's deployment pipeline. When the agent is ready, click **Try It** to test it, and use the **Observability** tab to review its traces and tool calls. For a complete walkthrough, see [Deploy the Ballerina leave assistant sample](https://wso2.com/agent-platform/docs/v1.0.0/tutorials/build-a-ballerina-agent/).

### Choose where Agent Manager runs

- **Managed cloud:** Sign up at the [WSO2 Agent Manager console](https://console.agent-manager.cloud.wso2.com/) and start managing agents without setting up any infrastructure.
- **Self-hosted:** Install Agent Manager on your own Kubernetes cluster, locally on k3d, or on a VM with Docker. See [Install on your environment](https://wso2.com/agent-platform/docs/v1.0.0/guides/on-your-environment/).

## What's next

- [Quick start guide](https://wso2.com/agent-platform/docs/v1.0.0/get-started/quick-start/): Run Agent Manager on your machine with a single command.
- [Agent and agent lifecycle](https://wso2.com/agent-platform/docs/v1.0.0/concepts/agent-lifecycle/): Learn the create, build, deploy, promote, and suspend actions, and the deployment status of each environment.
- [Deployment pipeline](https://wso2.com/agent-platform/docs/v1.0.0/concepts/deployment-pipeline/): Learn how environments and promotion permissions work.
- [Ship the agent to production](https://wso2.com/agent-platform/docs/v1.0.0/tutorials/promote-your-agent/): Promote an agent from development to production.
- [Observe](../observe/observe.md): Monitor and diagnose your agents with metrics, logs, and traces.
