---
sidebar_position: 3
title: Voice Agents
description: Enable voice for an AI agent on WSO2 Cloud - Integration Platform by connecting it to LiveKit, a speech-to-text provider, and a text-to-speech provider.
keywords: [wso2 integrator, wso2 cloud, voice agent, ai agent, livekit, speech to text, text to speech]
slug: /manage/managed-ai-services/voice-agents
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Voice Agents

A voice agent lets users talk to an AI agent instead of typing. WSO2 Cloud deploys a voice pipeline in front of your AI agent: it streams the user's audio through [LiveKit](https://livekit.io/), converts speech to text, sends the text to the AI agent over WebSocket, and speaks the agent's reply back using a text-to-speech provider.

You don't write any extra code for the voice pipeline. It's created and deployed as a separate integration, either from the AI agent's overview page or from **AI Services** > **Voice Agents**.

Voice agents are available to every organization under **AI Services** and don't need to be turned on as a feature preview. They're a paid feature: you need a paid WSO2 Cloud subscription to create one.

:::tip Start here
First, build the AI agent, expose it over WebSocket, and deploy it to WSO2 Cloud:

- In **WSO2 Integrator**, add a **Voice Agent Service** to the project and call your agent from it. See [Voice Agent in WSO2 Integrator](https://wso2.com/integration-platform/docs/integrator/develop-and-test/integration-artifacts/ai-integrations/voice-agent).
- In **WSO2 Agent Builder**, add a **Voice Chat** trigger to the agent, next to its **Agent Chat** trigger. See [Voice Agent in WSO2 Agent Builder](https://wso2.com/integration-platform/docs/agent-builder/develop-and-test/integration-artifacts/ai-integrations/voice-agent).

This page then covers adding the voice pipeline to that agent in WSO2 Cloud.
:::

:::info Prerequisites
- A paid WSO2 Cloud subscription. Voice agents are available to all organizations, but **Enable Voice Agents** is disabled on the free tier.
- An AI agent integration deployed in WSO2 Cloud that exposes a **WebSocket** endpoint. Without one, **Enable Voice Agents** is disabled with the tooltip *Add a WebSocket endpoint to this AI Agent to enable voice.* See [Expose an AI agent over WebSocket](#expose-an-ai-agent-over-websocket).
- A LiveKit project: the LiveKit URL (for example, `wss://your-project.livekit.cloud`), an API key, and an API secret. See [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials).
- API keys for your speech-to-text and text-to-speech providers. For OpenAI, create a key on the [OpenAI API keys](https://platform.openai.com/api-keys) page.
:::

## Expose an AI agent over WebSocket

The voice pipeline sends each transcribed user utterance to the AI agent as a chat message and speaks the returned string. [Create the AI agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md), then expose it over WebSocket. You can reuse an agent that you already expose as a [chat agent](../../develop-and-test/integration-artifacts/ai-integrations/agents/create-an-agent.md#create-a-chat-agent), so the same agent answers both chat and voice:

- **WSO2 Integrator**: add a **Voice Agent Service** and call your agent from its `onChatMessage` handler. See [Voice Agent in WSO2 Integrator](https://wso2.com/integration-platform/docs/integrator/develop-and-test/integration-artifacts/ai-integrations/voice-agent).
- **WSO2 Agent Builder**: open the agent's canvas, click **Add Trigger**, and select **Voice Chat** under **Chat Channels**. Agent Builder wires the agent into the `onChatMessage` handler for you. See [Voice Agent in WSO2 Agent Builder](https://wso2.com/integration-platform/docs/agent-builder/develop-and-test/integration-artifacts/ai-integrations/voice-agent).

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

Deploy the integration to WSO2 Cloud so its WebSocket endpoint is running.

:::tip
Write the agent's system prompt for speech: ask for short replies (one or two sentences) with no Markdown, lists, or code. Long or formatted replies take longer to synthesize and sound unnatural when read aloud.
:::

## Create a voice agent

You can create a voice agent in two ways:

- **[From the AI agent's overview page](#from-the-ai-agent-overview-page)**: the quickest option when the AI agent is deployed in WSO2 Cloud. The agent is preselected for you.
- **[From AI Services > Voice Agents](#from-ai-services--voice-agents)**: lets you pick the project and the target agent yourself. The target can be an agent deployed in WSO2 Cloud (**Platform-Hosted Agent**) or any agent you host yourself that's reachable over WebSocket (**Externally-Hosted Agent**, for development and testing only).

Both options then continue through the same LiveKit, speech-to-text, text-to-speech, and deploy steps.

### From the AI agent overview page

Open the AI agent integration's **Overview** page and click **Enable Voice Agents** (on the right, under **Lifecycle Status**).

<ThemedImage
    alt="AI agent overview page with Enable Voice Agents under Lifecycle Status, and the Development card showing the voice-agent endpoint with a note to enable a voice agent and then click Test Voice"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/enable-voice-agents.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/enable-voice-agents.png'),
    }}
/>

A four-step wizard opens. The current AI agent is preselected as the target, so there's no **Configure Agent** step: the wizard starts at [Configure LiveKit](#configure-livekit).

<ThemedImage
    alt="Four-step wizard opened from the AI agent, starting at Configure LiveKit"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit-from-ai-agent.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit-from-ai-agent.png'),
    }}
/>

### From AI Services > Voice Agents

1. In the organization's left navigation, expand **AI Services** and click **Voice Agents**. A five-step wizard opens at **Configure Agent**.

    <ThemedImage
        alt="Voice Agents under AI Services in the organization left navigation, next to Knowledge Base"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/ai-services-voice-agents.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/ai-services-voice-agents.png'),
        }}
    />

#### Configure agent

1. Select the **Target Project**. The voice agent is created in this project.

    <ThemedImage
        alt="Configure Agent step with the target project selected and the Target Agent options"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-target-project.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-target-project.png'),
        }}
    />

2. Under **Target Agent**, choose where the agent that answers the caller runs:

    - **Platform-Hosted Agent**: an AI agent that's already deployed in WSO2 Cloud, in the selected project. Pick it from **Select Agent**. The list shows only agents with a deployed WebSocket endpoint. WSO2 Cloud resolves the agent's WebSocket URL for you when it deploys the voice agent. This gives the same result as clicking **Enable Voice Agents** on that agent's overview page.

        <ThemedImage
            alt="Platform-Hosted Agent with voice_agent_integration selected and the display name defaulting to voice_agent_integration - Voice Agent"
            sources={{
                light: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-platform-hosted.png'),
                dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-platform-hosted.png'),
            }}
        />

    - **Externally-Hosted Agent**: any agent you host yourself, outside WSO2 Cloud, that's reachable over WebSocket. Enter its **WebSocket URL**, which must start with `wss://` (or `ws://` for local setups), for example a public tunnel URL such as `wss://<your-host>/voice-agent`. The voice agent uses this URL as its **Target Agent WebSocket URL** configuration, so the agent must stay reachable at that URL while the voice agent is in use.

        <ThemedImage
            alt="Externally-Hosted Agent with a public tunnel WebSocket URL"
            sources={{
                light: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-externally-hosted.png'),
                dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-agent-externally-hosted.png'),
            }}
        />

    :::caution Development and testing only
    Use an externally hosted agent only for development and testing. The voice agent doesn't authenticate to an externally hosted agent yet, so this option isn't suitable for production. For production, use a **Platform-Hosted Agent**.
    :::

    An externally hosted agent must follow the same WebSocket contract as a Voice Agent Service. The wizard summarizes it under **How your target agent should handle a message?**:

    - Accept the `sessionId` as a query parameter on the WebSocket connection URL (for example, `wss://your-agent-host/path?sessionId=<id>`). It stays the same for the whole conversation.
    - Accept each caller message as a plain-text WebSocket message containing only the caller's latest utterance, and reply with a plain-text WebSocket message.
    - Signal failures by closing the WebSocket connection with an error close code and reason, instead of sending the error back as a regular message.

3. Check the **Display Name** and **Name**. They default to `<agent-name> - Voice Agent`. Optionally, add a **Description**.
4. Click **Next**.

### Configure LiveKit

LiveKit handles the real-time audio connection between the user's browser and the voice pipeline.

1. Enter the **LiveKit URL**, for example `wss://your-project.livekit.cloud`.
2. Enter the **API Key** and **API Secret** of your LiveKit project.
3. Click **Next**.

To find these values, see [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials). The wizard also links to this page from **How to get your LiveKit URL, API key & secret?**

<ThemedImage
    alt="Configure LiveKit step with the LiveKit URL, API Key, and API Secret fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-livekit.png'),
    }}
/>

### Configure speech to text

1. Select a speech-to-text (STT) provider: **AssemblyAI**, **Cartesia**, **Deepgram**, **ElevenLabs**, or **OpenAI**.
2. Check the **Model** and **Language**. When you select a provider, the wizard preselects a model and language, which you can change. For OpenAI, it preselects **GPT-4o Mini Transcribe** and **English**.
3. Enter the provider's API key. For OpenAI, create one on the [OpenAI API keys](https://platform.openai.com/api-keys) page. The wizard links to each provider's key page, for example **How to get your OpenAI API key?**
4. Click **Next**.

<ThemedImage
    alt="Configure Speech to Text step with OpenAI, GPT-4o Mini Transcribe, and English selected"
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

As with speech to text, the wizard preselects a model, voice, and language for the provider you select. For OpenAI, it preselects **GPT-4o Mini TTS**, **Alloy**, and auto-detected language. The available OpenAI models are **GPT-4o Mini TTS**, **TTS-1**, and **TTS-1 HD**, and the available voices are Alloy, Ash, Ballad, Coral, Echo, Fable, Nova, Onyx, Sage, and Shimmer.

<ThemedImage
    alt="Configure Text to Speech step with OpenAI, GPT-4o Mini TTS, the Alloy voice, and auto-detected language selected"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/configure-text-to-speech.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/configure-text-to-speech.png'),
    }}
/>

### Tune and deploy

The defaults work for most agents. Adjust them if needed:

| Setting | Default | Description |
|---|---|---|
| **Text Output / Transcription** | On | Publishes the conversation transcript to the client alongside the audio. |
| **User Away Timeout** | `15` s | Ends the session after this much silence from the user. |
| **Min Consecutive Speech Delay** | `200` ms | Minimum gap between consecutive agent utterances. |
| **Close on Participant Disconnect** | On | Closes the LiveKit room when the user leaves. |
| **CORS Allowed Origins** | `*` | Origins allowed to request session tokens from the voice agent. Restrict this for production. |
| **Token Time-to-Live (TTL)** | `3600` s | How long a session token stays valid. |

<ThemedImage
    alt="Tune and Deploy step with the Text Output, User Interaction and Timing, and Session Cleanup and Lifecycle settings"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy.png'),
    }}
/>

**Advanced Settings** expose voice activity detection (VAD), noise cancellation, turn detection, barge-in (interrupting the agent while it speaks), and endpointing delay.

Click **Deploy Voice Agent**.

<ThemedImage
    alt="Advanced Settings with turn detection, barge-in, and endpointing delay, and the Deploy Voice Agent button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/tune-and-deploy-advanced.png'),
    }}
/>

WSO2 Cloud creates a new integration of type **Voice Agent** in the project, named **`<agent-name> - Voice Agent`** by default, and deploys it to the Development environment. The voice agent connects to the target agent through its **Target Agent WebSocket URL** configuration.

<ThemedImage
    alt="Project overview listing voice_agent_integration - Voice Agent of type Voice Agent next to the voice_agent_integration AI agent"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-created.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-created.png'),
    }}
/>

Open the voice agent and wait until the **Development** card on its overview page shows **Active**. The voice agent has **Development**, **Stage**, and **Production** cards. Each card has its own **Voice Tester**, and **How to Connect** shows how to connect a client to that environment.

<ThemedImage
    alt="Voice agent overview with the Development environment Active and its Voice Tester, and the Stage and Production cards"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-development-active.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-agent-development-active.png'),
    }}
/>

## Test the voice agent

Click **Start Session** in the **Voice Tester** on the **Development** card, or open the tester from **Test** > **Voice Agent** in the voice agent's left navigation. The **Test** page has an environment selector next to **Version**.

<ThemedImage
    alt="Voice Agent Tester on the Test page with the Development environment selected"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/test-voice-agent.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/test-voice-agent.png'),
    }}
/>

1. Click **Start Session** and allow microphone access when the browser asks. The tester shows **LIVE** and **Conversation Active** with *Speak into your microphone. The agent is listening and responding.*
2. Speak to the agent. The tester shows the transcript of what you say and the agent's replies, and you hear the agent's reply.
3. Click **Stop Session** to end the conversation.

For the customer support example, try:

- *"Hi, what can you help me with?"*
- *"Where is my order ORD-1001?"*
- *"Can I return my coffee maker from order ORD-1003?"*

<ThemedImage
    alt="Voice Agent Tester with a live session showing the three questions and the agent replies about order status and the return policy"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents/voice-tester-session.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents/voice-tester-session.png'),
    }}
/>

## Promote to production

When you're ready to use the voice agent beyond Development, click **Promote** on the voice agent's overview page to promote it to the next environment (**Stage**, then **Production**). Wait until the target environment's card shows **Active**, then test it with that card's **Voice Tester**.

## Troubleshooting

### The reply text appears before the audio

The transcript is published as soon as the AI agent returns its full reply, but the audio has to wait for text-to-speech synthesis. To reduce the gap:

- Keep the agent's replies short and voice-friendly: one or two sentences with no Markdown or lists.
- Use a low-latency TTS model. For OpenAI, **TTS-1** is faster than **TTS-1 HD** or **GPT-4o Mini TTS**. Cartesia and Deepgram Aura are also fast.

- Check the AI agent's own logs for errors, such as a missing LLM model or API key configuration.

### The session ends on its own

A session ends when the user is silent for longer than **User Away Timeout**, or when the user leaves and **Close on Participant Disconnect** is on. Log entries such as `publisher data channel '_reliable' closed unexpectedly` followed by `disconnected from room with reason: RoomClosed` are part of normal room teardown, not an error.
