---
title: Setting Up WSO2 Integrator for AI
---

# Setting Up WSO2 Integrator for AI

Before building AI integrations, make sure your development environment is ready and that you have credentials for WSO2 Integrator Copilot — the AI features (agents, RAG, MCP, natural functions) all rely on it for the default model provider.

## Prerequisites

- **WSO2 Integrator** installed — follow the [Install WSO2 Integrator](/docs/get-started/install) guide. The Ballerina runtime and the AI/MCP modules ship with the distribution, so no extra setup is required.
- **WSO2 Integrator Copilot access** — Sign into WSO2 Integrator Copilot using the following steps.

## Sign in to WSO2 Integrator Copilot

1. In your WSO2 Integrator project view, click the **Open WSO2 Integrator Copilot** icon (the chat-bot icon) in the top-right corner of the editor toolbar.

   ![Open WSO2 Integrator Copilot icon](/img/genai/getting-started/01-open-copilot-icon.png)

2. The Copilot welcome screen opens with the available sign-in options.

   ![WSO2 Integrator Copilot welcome screen](/img/genai/getting-started/02-copilot-welcome.png)

   - **Login using WSO2 Integration Platform** — recommended. Signs you in with your WSO2 account and provisions a ready-to-use default model provider, no third-party API key required.
   - **Enter your Anthropic API key** — use your own Anthropic key to power Copilot and the default model provider.
   - **Enter your AWS Bedrock credentials** — use your AWS Bedrock account.
   - **Enter your Google Vertex AI credentials** — use your Google Vertex AI account.

3. Pick one option and complete the sign-in. Once authenticated, Copilot opens its chat view and the default model provider is configured for any AI integration you build.

   ![WSO2 Integrator Copilot signed in](/img/genai/getting-started/03-copilot-signed-in.png)

By signing in, you agree to the WSO2 Integrator Copilot Terms of Use shown on the welcome screen.

## What's next

- [Build a Smart Calculator Assistant](smart-calculator.md) — Your first AI integration using tool calling.
- [Build a Sample Hotel Booking Agent](hotel-booking-agent.md) — An agent with memory and multiple tools.
