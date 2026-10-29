---
title: Deploy to WSO2 Agent Manager
---

# Deploy to WSO2 Agent Manager

You can deploy your agents to WSO2 Agent Manager directly from WSO2 Agent Builder. Agent Manager builds the agentic integration from your GitHub repository, deploys it, and lets you run and manage your organization's agents in one place.

:::info Prerequisites
- Access to a WSO2 Agent Manager instance: its console URL and an account that can sign in to it.
- A project with an agentic integration that has something to run, such as an [agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md) with a trigger.
- The project published to a GitHub repository. Agent Manager builds from GitHub, so it needs your code there. To publish a project, see steps 5a–5e in [Deploy to WSO2 Cloud](../deploy-to-wso2-cloud/deploy-to-wso2-cloud.md#deploy-an-agentic-integration).

## Connect to Agent Manager

1. In WSO2 Agent Builder, open the agentic integration's overview. To get there, select the agentic integration's name in the sidebar.
2. Select **Deploy** at the top right. In the **Deploy** panel, expand **WSO2 Agent Manager** and select **Connect to Agent Manager**.

    ![The Deploy panel on an agentic integration's overview, with WSO2 Agent Manager expanded and the Connect to Agent Manager button highlighted](/img/deploy-and-run/deploy-to-agent-manager/01-connect-v1.0.png)

3. Enter your **Agent Manager Console URL**, for example `https://console.agent-manager.example.com`, and press **Enter**.

    ![The Connect to Agent Manager input box with an Agent Manager console URL entered](/img/deploy-and-run/deploy-to-agent-manager/02-console-url-v1.0.png)

4. A browser opens on the Agent Manager sign-in page. Sign in, then return to WSO2 Agent Builder when the browser asks you to.

    If your account belongs to more than one Agent Manager organization, WSO2 Agent Builder asks you to select one.

Once you're signed in, WSO2 Agent Builder shows **Signed in to Agent Manager**, and the **WSO2 Agent Manager** section shows your GitHub repository, its branch, and whether it is public or private.

## Prepare the project

Agent Manager needs an `openapi.yaml` that describes your agent's API, and the Agent Manager module that sends your agent's traces to it.

1. In the **WSO2 Agent Manager** section, keep **Enable Auto-Instrumentation** selected to send traces to Agent Manager.
2. Select **Prepare Project**.

    ![The WSO2 Agent Manager section showing the GitHub repository, the note that Agent Manager needs openapi.yaml, Enable Auto-Instrumentation, and the Prepare Project button highlighted](/img/deploy-and-run/deploy-to-agent-manager/03-prepare-project-v1.0.png)

    WSO2 Agent Builder adds `openapi.yaml` and `agent_manager.bal` to the agentic integration, and turns on observability in its `Ballerina.toml`.

3. The section now shows "GitHub doesn't have agent_manager.bal or openapi.yaml yet. Commit and push your changes before deploying." Select **Review and Commit**.

    ![The WSO2 Agent Manager section asking you to commit and push the new files, with the Review and Commit button highlighted](/img/deploy-and-run/deploy-to-agent-manager/04-review-commit-v1.0.png)

4. In the **Source Control** view, commit the new and changed files, then push them to GitHub.

    :::caution Keep secrets out of your repository
    Your agentic integration's `Config.toml` can hold secrets, such as the access token for the Default WSO2 Model Provider. Make sure `Config.toml` is in your `.gitignore` before you commit.
    :::

## Create and deploy the agent

1. Back on the overview, in the **WSO2 Agent Manager** section, select **Create New Agent**.

    ![The WSO2 Agent Manager section with the Create New Agent button highlighted](/img/deploy-and-run/deploy-to-agent-manager/05-create-new-agent-v1.0.png)

2. In **Create Agent in Agent Manager**, check the details. WSO2 Agent Builder fills them in from your project:

    | Field | Description |
    |---|---|
    | **Agent Name** | The agent's name in Agent Manager. Defaults to the agentic integration's name. |
    | **Project** | The Agent Manager project to create the agent in. |
    | **Repository** | The GitHub repository Agent Manager builds from. |
    | **Branch** | The branch to build. |
    | **Directory** | The agentic integration's folder in the repository. "Found on *branch*." confirms that the folder is on GitHub. |

    The dialog also lists what's **Included Automatically**: **Auto-Instrumentation**, and the environment the agent **Deploys To**.

3. If the repository is private, set **Repository Access** to **Add Personal Token...** and enter a GitHub **Personal Access Token** with read-only access to the repository contents.

4. Select **Create and Deploy**.

    ![The Create Agent in Agent Manager dialog with Agent Name, Project, Repository, Branch, Directory, Repository Access, a masked Personal Access Token, and the Create and Deploy button highlighted](/img/deploy-and-run/deploy-to-agent-manager/06-create-agent-dialog-v1.0.png)

Agent Manager creates the agent and starts a build. The **WSO2 Agent Manager** section shows the agent, its branch, and the progress through five steps: **Queued**, **Cloning Source**, **Building Image**, **Publishing Image**, and **Deploying**. Select **View Build Logs** to follow the build.

![The WSO2 Agent Manager section showing the support_agent agent on the main branch at the Building Image step, 2 of 5, with View Build Logs](/img/deploy-and-run/deploy-to-agent-manager/07-building-v1.0.png)

{/* TODO: Verify and document the deployed state (the section after the Deploying step completes, and trying the deployed agent) against an Agent Manager instance that completes the image build. */}

## Manage the deployed agent

Select the **⋯** next to the agent's name in the **WSO2 Agent Manager** section:

- **Rebuild**: build and deploy the agent again, for example after you push new changes.
- **Logs**: view the agent's logs.
- **Configuration**: set the agent's configuration values in Agent Manager.
- **Open in Console**: open the agent in the Agent Manager console.
- **Unlink**: disconnect the agentic integration from the agent in Agent Manager.
- **Sign Out**: sign out of Agent Manager.

![The WSO2 Agent Manager section with the more actions menu open, showing Rebuild, Logs, Configuration, Open in Console, Unlink, and Sign Out](/img/deploy-and-run/deploy-to-agent-manager/08-more-actions-v1.0.png)

## What's next

- [Deploy to WSO2 Cloud](../deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) — Deploy your agent to the fully managed WSO2 Cloud.
- [Containerized Deployment](../self-hosted/containerized-deployment.md) — Run your agent on Docker, Kubernetes, or Red Hat OpenShift.
- [Managing Configurations](../managing-configurations.md) — Per-environment configuration strategies.
