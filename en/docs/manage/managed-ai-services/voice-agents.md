---
sidebar_position: 3
title: Voice Agents
description: Enable voice for an AI agent on Choreo Integration by connecting it to LiveKit, a speech-to-text provider, and a text-to-speech provider.
keywords: [choreo integrator, choreo cloud, voice agent, ai agent, livekit, speech to text, text to speech]
slug: /manage/managed-ai-services/voice-agents
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Voice Agents

A voice agent lets users talk to an AI agent instead of typing. Choreo Cloud deploys a voice pipeline in front of your AI agent: it streams the user's audio through [LiveKit](https://livekit.io/), converts speech to text, sends the text to the AI agent over WebSocket, and speaks the agent's reply back using a text-to-speech provider.

You don't write any extra code for the voice pipeline. It's created and deployed as a separate integration, either from the AI agent's overview page or from **AI Services** > **Voice agents**.

Voice agents are available to every organization under **AI Services** and don't need to be turned on as a feature preview.

:::tip Start here
First, build the AI agent, expose it over WebSocket, and deploy it to Choreo Cloud:

- In **Choreo Integrator**, add a **Voice Agent Service** to the project and call your agent from it. See [Voice Agent in Choreo Integrator](https://wso2.com/integration-platform/docs/integrator/develop-and-test/integration-artifacts/ai-integrations/voice-agent).
- In **Choreo Agent Builder**, add a **Voice Chat** trigger to the agent, next to its **Agent Chat** trigger. See [Voice Agent in Choreo Agent Builder](https://wso2.com/integration-platform/docs/agent-builder/develop-and-test/integration-artifacts/voice-agent).

This page then covers adding the voice pipeline to that agent in Choreo Cloud.
:::

:::info Prerequisites
- An AI agent integration deployed in Choreo Cloud that exposes a **WebSocket** endpoint. Without one, **Enable voice agent** is disabled with the tooltip *Add a WebSocket endpoint to this AI agent to enable its voice agent.* See [Expose an AI agent over WebSocket](#expose-an-ai-agent-over-websocket).
- A LiveKit project: the LiveKit URL (for example, `wss://your-project.livekit.cloud`), an API key, and an API secret. See [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials).
- API keys for your speech-to-text and text-to-speech providers. For OpenAI, create a key on the [OpenAI API keys](https://platform.openai.com/api-keys) page.
:::

## Expose an AI agent over WebSocket

The voice pipeline sends each transcribed user utterance to the AI agent as a chat message and speaks the returned string. [Create the AI agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md), then expose it over WebSocket. You can reuse an agent that you already expose as a [chat agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md#create-a-chat-agent), so the same agent answers both chat and voice:

- **Choreo Integrator**: add a **Voice Agent Service** and call your agent from its `onChatMessage` handler. See [Voice Agent in Choreo Integrator](https://wso2.com/integration-platform/docs/integrator/develop-and-test/integration-artifacts/ai-integrations/voice-agent).
- **Choreo Agent Builder**: open the agent's canvas, click **Add Trigger**, and select **Voice Chat** under **Chat Channels**. Agent Builder wires the agent into the `onChatMessage` handler for you. See [Voice Agent in Choreo Agent Builder](https://wso2.com/integration-platform/docs/agent-builder/develop-and-test/integration-artifacts/ai-integrations/voice-agent).

Both generate code similar to the following:

```ballerina
import ballerinax/ai.wso2.integration;

listener integration:CloudVoiceListener voiceListener = new (8080);

isolated service integration:VoiceService on voiceListener {
    isolated remote function onChatMessage(integration:ChatMessage message) returns string|error {
        string response = check customerSupportAgent.run(message.message, message.sessionId);
        return response;
    }
}
```

In this example, `customerSupportAgent` is a customer support agent with tools to check order status, explain the return policy, and create support tickets, plus short-term memory. Passing `message.sessionId` to the agent keeps the conversation context for the duration of a voice session.

Deploy the integration to Choreo Cloud so its WebSocket endpoint is running.

:::tip
Write the agent's system prompt for speech: ask for short replies (one or two sentences) with no Markdown, lists, or code. Long or formatted replies take longer to synthesize and sound unnatural when read aloud.
:::

## Create a voice agent

You can create a voice agent in two ways:

- **[From the AI agent's overview page](#from-the-ai-agent-overview-page)**: the quickest option when the AI agent is deployed in Choreo Cloud. The agent is preselected for you.
- **[From AI Services > Voice Agents](#from-ai-services--voice-agents)**: lets you pick the project and the target agent yourself, from any AI agent already deployed in that project.

Both options then continue through the same LiveKit, speech-to-text, text-to-speech, and deploy steps.

### From the AI agent overview page

Open the AI agent integration's **Overview** page and click **Enable voice agent** at the top right of the page header.

<ThemedImage
    alt="AI agent overview page with the Enable voice agent button at the top right and a successful chat with the agent"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/enable-voice-agents.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/enable-voice-agents.png'),
    }}
/>

A four-step wizard opens: **Configure LiveKit**, **Configure speech to text**, **Configure text to speech**, and **Tune and deploy**. The current AI agent is preselected as the target, so there's no **Configure agent** step: the wizard starts at [Configure LiveKit](#configure-livekit).

### From AI Services > Voice agents

1. In the organization's left navigation, expand **AI Services** and click **Voice agents**.

    <ThemedImage
        alt="Organization overview with AI Services expanded and Voice agents highlighted in the left navigation"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/ai-services-voice-agents.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/ai-services-voice-agents.png'),
        }}
    />

2. Before you've created any voice agents, the **Voice agents** page shows ready-made samples under **Start from a sample**. Click **Quick deploy** on one to deploy both the sample AI agent and its voice pipeline into a project of your choice in one step, skipping the wizard below. Click **Create voice agent** to start the five-step wizard at **Configure agent** instead.

    <ThemedImage
        alt="Voice agents page with the Create voice agent button and a Start from a sample gallery of prebuilt voice agents"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agents-landing.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agents-landing.png'),
        }}
    />

    **Quick deploy** asks which project to build and deploy the sample in, then creates the AI agent from the [integration-samples](https://github.com/wso2/integration-samples) repository. Enable voice on that agent from its overview page to continue.

    <ThemedImage
        alt="Choose a project dialog for Quick deploy of the Support Voice Agent sample, with Default Project selected"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/quick-deploy-dialog.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/quick-deploy-dialog.png'),
        }}
    />

    Once you've created at least one voice agent, this page instead lists your existing voice agents (Name, Project, AI agent, Description, Last updated), with **Create voice agent** still available to make another.

    <ThemedImage
        alt="Voice agents page listing an existing voice agent, with columns for Name, Project, AI agent, Description, and Last updated"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agents-list.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agents-list.png'),
        }}
    />

#### Configure agent

1. Select the **Target project**. The voice agent is created in this project.
2. Under **Agent**, select the AI agent that answers the caller. The dropdown (**Select a deployed agent to add voice to**) lists agents deployed in that project; an agent that already has a voice agent shows as disabled with **Already has a voice agent** — each AI agent can have only one. Choreo Cloud resolves the agent's WebSocket URL for you when it deploys the voice agent, the same as clicking **Enable voice agent** on that agent's overview page.

    The wizard summarizes the WebSocket contract the target agent must follow under **How your target agent should handle a message**:

    - Accept the `sessionId` as a query parameter on the WebSocket connection URL (for example, `ws://your-agent-host/path?sessionId=<id>`). It stays the same for the whole conversation.
    - Accept each caller message as a plain-text WebSocket message containing only the caller's latest utterance, and reply with a plain-text WebSocket message.
    - Signal failures by closing the WebSocket connection with an error close code and reason, instead of sending the error back as a regular message.

    <ThemedImage
        alt="Configure agent step with the target project and agent selected, and the Display name and Name fields defaulting to Support Voice Agent - Voice agent"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent.png'),
        }}
    />

3. Check the **Display name** and **Name**. They default to `<agent-name> - Voice agent`. Optionally, add a **Description**.
4. Click **Next**.

{/* TODO(v3): the doc previously described a Platform-Hosted vs. Externally-Hosted
    Agent choice, letting you point a voice agent at any WebSocket URL outside
    Choreo Cloud. That choice no longer exists in the wizard - verified live,
    including typing into the Agent field, which is a plain select with no
    custom-URL entry. If externally-hosted targets return, re-add this section. */}

### Configure LiveKit

LiveKit handles the real-time audio connection between the user's browser and the voice pipeline.

1. Enter the **LiveKit URL**, for example `wss://your-project.livekit.cloud`.
2. Enter the **API key** and **API secret** of your LiveKit project.
3. Click **Next**.

To find these values, see [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials). The wizard also links to this page from **How to get your LiveKit URL, API key & secret?** This step looks the same whichever path you used to start the wizard.

<ThemedImage
    alt="Configure LiveKit step with the LiveKit URL, API key, and API secret fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit.png'),
    }}
/>

### Configure speech to text

1. Select a speech-to-text (STT) provider: **AssemblyAI**, **Cartesia**, **Deepgram**, **ElevenLabs**, or **OpenAI**. You can mix providers, for example Deepgram for speech to text and ElevenLabs for text to speech.
2. Check the **Model** and **Language**. When you select a provider, the wizard preselects a model and language, which you can change. For OpenAI, it preselects **GPT-4o Mini Transcribe** and **English**. The available OpenAI models are **GPT-4o Mini Transcribe**, **GPT-4o Transcribe**, and **Whisper-1**. This page uses **GPT-4o Transcribe**.
3. Enter the provider's API key. For OpenAI, create one on the [OpenAI API keys](https://platform.openai.com/api-keys) page. The wizard links to each provider's key page, for example **How to get your OpenAI API key?**
4. Click **Next**.

<ThemedImage
    alt="Configure speech to text step with OpenAI, GPT-4o Transcribe, and English selected, and the API key masked"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-speech-to-text.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-speech-to-text.png'),
    }}
/>

### Configure text to speech

1. Select a text-to-speech (TTS) provider: **Cartesia**, **Deepgram**, **ElevenLabs**, or **OpenAI**.
2. Select the **Model**, **Voice**, and **Language**. Cartesia and ElevenLabs also accept a custom voice ID.
3. Enter the provider's API key. You can reuse the same [OpenAI API key](https://platform.openai.com/api-keys) for both speech to text and text to speech.
4. Click **Next**.

As with speech to text, the wizard preselects a model, voice, and language for the provider you select. For OpenAI, it preselects **GPT-4o Mini TTS**, **Alloy**, and auto-detected language. The available OpenAI models are **GPT-4o Mini TTS**, **TTS-1**, and **TTS-1 HD**, and the available voices are Alloy, Ash, Ballad, Coral, Echo, Fable, Nova, Onyx, Sage, and Shimmer. This page uses **TTS-1**, which has lower latency than **TTS-1 HD** and **GPT-4o Mini TTS**, so replies start sooner.

<ThemedImage
    alt="Configure text to speech step with OpenAI, TTS-1, the Alloy voice, and auto-detected language selected"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-text-to-speech.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-text-to-speech.png'),
    }}
/>

### Tune and deploy

The defaults work for most agents. Adjust them if needed:

| Setting | Default | Description |
|---|---|---|
| **Text output / transcription** | On | Publishes the conversation transcript to the client alongside the audio. |
| **User away timeout** | `15` s | Ends the session after this much silence from the user. |
| **Min consecutive speech delay** | `200` ms | Minimum gap between consecutive agent utterances. |
| **Close on participant disconnect** | On | Closes the LiveKit room when the user leaves. |
| **CORS allowed origins** | `*` | Origins allowed to request session tokens from the voice agent. Restrict this for production. |
| **Token time-to-live (TTL)** | `3600` s | How long a session token stays valid. |

<ThemedImage
    alt="Tune and deploy step with the Text output, User interaction and timing, and Session cleanup and lifecycle settings"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy.png'),
    }}
/>

Scroll down and click **Advanced settings** to expand it. It exposes voice activity detection (VAD), noise cancellation, turn detection, barge-in (interrupting the agent while it speaks), and endpointing delay.

<ThemedImage
    alt="Tune and deploy step scrolled down, with the Advanced settings section highlighted"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-expand.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-expand.png'),
    }}
/>

<ThemedImage
    alt="Expanded Advanced settings with voice activity detection, noise cancellation, turn detection, and barge-in settings"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced-1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced-1.png'),
    }}
/>

Scroll down to the end of the step and click **Deploy voice agent**.

<ThemedImage
    alt="End of the Advanced settings with the endpointing delay settings and the Deploy voice agent button highlighted"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced-2.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced-2.png'),
    }}
/>

Choreo Cloud creates a new integration of type **Voice Agent** in the project, named **`<agent-name> - Voice agent`** by default, and deploys it to the Development environment. The voice agent connects to the target agent through its **Target Agent WebSocket URL** configuration.

<ThemedImage
    alt="Project overview listing Support Voice Agent - Voice agent of type Voice Agent next to the Support Voice Agent AI agent"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-created.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-created.png'),
    }}
/>

Open the voice agent and wait until the **Development** card on its overview page shows **Active**. The overview has a card for each environment, starting with **Development**. Each card has its own **Voice tester**, and **How to connect** shows how to connect a client to that environment.

**How to connect** opens **Connect your application**. Your application doesn't call the voice agent directly: your own backend requests a room token from the voice agent's token service on the API gateway and returns it to the application, which then joins the voice session. This keeps the token service's URL and API key out of the application. In the dialog:

1. Click **Open Developer Portal** and generate an API key for the token service.
2. Add the token service URL and the key to your backend's environment variables as `VOICE_AGENT_TOKEN_URL` and `VOICE_AGENT_API_KEY`.
3. Use the Node.js example in the dialog to forward token requests from your backend. The token service responds with a room token, the LiveKit server URL, the room name, and an identity.

<ThemedImage
    alt="Voice agent overview with the Development environment Active and its Voice tester"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-development-active.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-development-active.png'),
    }}
/>

## Test the voice agent

Click **Start session** in the **Voice tester** on the **Development** card, or open the tester from **Test** in the voice agent's left navigation. The **Test** page has an environment selector above the **Voice agent tester**.

<ThemedImage
    alt="Test page with the Development environment selected and the Voice agent tester below it"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/test-voice-agent.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/test-voice-agent.png'),
    }}
/>

1. Click **Start session** and allow microphone access when the browser asks. The tester shows a **Live** badge next to **Voice agent tester**.
2. Speak to the agent. The tester shows the transcript of what you say and the agent's replies, and you hear the agent's reply.
3. Click **End session** to end the conversation.

For the customer support example, try:

- *"Hi, I'm not happy with the product I purchased from you."*
- *"Can you explain me the return policy for products?"*
- *"What you mean by original packaging"*

<ThemedImage
    alt="Voice agent tester with a live session showing a customer asking about the return policy and what original packaging means"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-tester-session.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-tester-session.png'),
    }}
/>

## Promote to production

When you're ready to use the voice agent beyond Development, click **Promote** between the **Development** and **Production** cards on the voice agent's overview page. Wait until the **Production** card shows **Active**, then test it with that card's **Voice tester**.

The environments and promotion order shown here depend on the [promotion pipeline](../environments/configure-promotion-pipelines.md) configured for the project. A different pipeline may have more environments, such as **Staging**, between **Development** and **Production**. See [Configure Promotion Pipelines](../environments/configure-promotion-pipelines.md#assign-a-pipeline-to-a-project) to add one.

<ThemedImage
    alt="Voice agent overview with the Promote button between the Development and Production cards highlighted"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/promote-to-production.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/promote-to-production.png'),
    }}
/>

## Troubleshooting

### The first question gets no reply

The voice agent waits a few seconds for the AI agent to answer each message. If the AI agent is slow on its first request, for example because it hasn't been called recently, the voice agent gives up on that turn and the **Voice agent tester** shows your question with no reply. The voice agent logs show `APITimeoutError: integrator agent sent nothing for 7s`. Later questions in the same session are answered normally, usually within a few seconds.

Ask the question again, or send a message to the AI agent from its overview page before you start the session so the agent is ready.

### The reply text appears before the audio

The transcript is published as soon as the AI agent returns its full reply, but the audio has to wait for text-to-speech synthesis. To reduce the gap:

- Keep the agent's replies short and voice-friendly: one or two sentences with no Markdown or lists.
- Use a low-latency TTS model. For OpenAI, **TTS-1** is faster than **TTS-1 HD** or **GPT-4o Mini TTS**. Cartesia and Deepgram Aura are also fast.

- Check the AI agent's own logs for errors, such as a missing LLM model or API key configuration.

### The session ends on its own

A session ends when the user is silent for longer than **User Away Timeout**, or when the user leaves and **Close on Participant Disconnect** is on. Log entries such as `publisher data channel '_reliable' closed unexpectedly` followed by `disconnected from room with reason: RoomClosed` are part of normal room teardown, not an error.
