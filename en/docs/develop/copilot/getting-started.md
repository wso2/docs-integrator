---
title: "Getting Started"
description: Sign in to WSO2 Integrator Copilot with your WSO2 Cloud account or your own AI provider credentials.
keywords: [wso2 integrator, copilot, getting started, sign in]
slug: /develop/copilot/getting-started
---

# Getting Started

If you have already [signed in to WSO2 Integrator](../../get-started/setup/local-setup.md#step-4-sign-in-to-wso2-integrator) with your WSO2 Cloud account, WSO2 Integrator Copilot uses the same authentication and is ready to use. Otherwise, sign in from the Copilot welcome screen.

## Sign in from the Copilot welcome screen

1. In your WSO2 Integrator project view, open Copilot from the prompt box on your project overview. Select the Copilot orb in the prompt box to open the chat panel, or type what you want to build and press Enter; Copilot opens its panel and submits the prompt for you. Use the attach button beside the box to add files as context.

   ![The Copilot prompt box on the project overview](/img/develop/copilot/copilot-prompt-box.png)

   While Copilot works, the prompt box shows the live status in place of its input, and the floating status orb stays hidden so only one Copilot surface is on screen. See [Copilot in the background](background-copilot.md).

2. The Copilot welcome screen opens with the available sign-in options.

   ![WSO2 Integrator Copilot welcome screen](/img/develop/copilot/copilot-sign-in.png)

   - **Login using WSO2 Integration Platform** (recommended): Sign in with your WSO2 Cloud account.
   - **Enter your [Anthropic API key](https://platform.claude.com/settings/keys)**: Use your own Anthropic key to power Copilot.
   - **Enter your [AWS Bedrock credentials](https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html)**: Use your AWS Bedrock account.
   - **Enter your [Google Vertex AI credentials](https://docs.cloud.google.com/vertex-ai/docs/authentication)**: Use your Google Vertex AI account.

3. Select one option and complete the sign-in. Once authenticated, Copilot opens its chat view and is ready to use.

   ![WSO2 Integrator Copilot signed in](/img/develop/copilot/copilot-welcome.png)

:::info Terms of use and data handling
By signing in, you agree to the WSO2 Integrator Copilot Terms of Use shown on the welcome screen. See [AI usage and data handling guidelines](../../reference/ai-usage-and-data-handling-guidelines.md) for how Copilot handles your data.
:::

## What's next

- [Copilot capabilities](overview.md) — Explore planning, review, testing, and more.
