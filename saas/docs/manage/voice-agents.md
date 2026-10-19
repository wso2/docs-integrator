---
title: Voice Agents
---

# Voice Agents

:::info Feature preview
Voice agents are in feature preview. Behavior and configuration options may change before general availability.

A voice agent lets users talk to an AI agent instead of typing. WSO2 Cloud deploys a voice pipeline in front of your AI agent: it streams the user's audio through [LiveKit](https://livekit.io/), converts speech to text, sends the text to the AI agent over WebSocket, and speaks the agent's reply back using a text-to-speech provider.

You don't write any extra code for the voice pipeline. It's created and deployed as a separate integration from the AI agent's overview page.

:::tip Start here
First, build the AI agent as a **Voice Agent Service** in WSO2 Integrator and deploy it to WSO2 Cloud. See [Voice Agent](../develop-and-test/integration-artifacts/ai-integrations/voice-agent/voice-agent.md) for the steps. This page then covers adding the voice pipeline to that agent in WSO2 Cloud.

:::info Prerequisites
- A paid WSO2 Cloud subscription. On the free tier, **Enable Voice Agents** is disabled with the tooltip *Upgrade your plan to enable Voice Agents.*
- An AI agent integration deployed in WSO2 Cloud that exposes a **WebSocket** endpoint. Without one, **Enable Voice Agents** is disabled with the tooltip *Add a WebSocket endpoint to this AI Agent to enable voice.* Build it as a [Voice Agent Service](../develop-and-test/integration-artifacts/ai-integrations/voice-agent/voice-agent.md) in WSO2 Integrator. See [Expose an AI agent over WebSocket](#expose-an-ai-agent-over-websocket).
- A LiveKit project: the LiveKit URL (for example, `wss://your-project.livekit.cloud`), an API key, and an API secret. See [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials).
- API keys for your speech-to-text and text-to-speech providers. For OpenAI, create a key on the [OpenAI API keys](https://platform.openai.com/api-keys) page.

## Expose an AI agent over WebSocket

The voice pipeline sends each transcribed user utterance to the AI agent as a chat message and speaks the returned string. In WSO2 Integrator, create a **Voice Agent Service** and call your agent from its `onChatMessage` handler. See [Voice Agent](../develop-and-test/integration-artifacts/ai-integrations/voice-agent/voice-agent.md) for the full walkthrough. The generated code is similar to the following:

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

Write the agent's system prompt for speech: ask for short replies (one or two sentences) with no Markdown, lists, or code. Long or formatted replies take longer to synthesize and sound unnatural when read aloud.

## Enable the Voice Agents preview

1. Click your profile icon in the top-right corner of the console and select **Feature Preview**.

    <ThemedImage
        alt="Feature Preview option in the user profile menu"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/user-menu-feature-preview-v5.1.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/user-menu-feature-preview-v5.1.png'),
        }}
    />

2. Turn on **Voice Agents**, then close the dialog.

    <ThemedImage
        alt="Feature Preview dialog with Voice Agents turned on"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/feature-preview-voice-agents-enabled-v5.1.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/feature-preview-voice-agents-enabled-v5.1.png'),
        }}
    />

## Create a voice agent

You can create a voice agent in two ways:

- **[From the AI agent's overview page](#from-the-ai-agent-overview-page)**: the quickest option when the AI agent is deployed in WSO2 Cloud. The agent is preselected for you.
- **[From AI Services > Voice Agents](#from-ai-services--voice-agents)**: lets you pick the project and the target agent yourself. The target can be an agent deployed in WSO2 Cloud (**Platform-Hosted Agent**) or any agent you host yourself that's reachable over WebSocket (**Externally-Hosted Agent**).

Both options then continue through the same LiveKit, speech-to-text, text-to-speech, and deploy steps.

### From the AI agent overview page

Open the AI agent integration's **Overview** page and click **Enable Voice Agents** (on the right, under **Lifecycle Status**).

<ThemedImage
    alt="Enable Voice Agents on the AI agent overview page"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/enable-voice-agents-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/enable-voice-agents-v5.1.png'),
    }}
/>

A four-step wizard opens. The current AI agent is preselected as the target, so there's no **Configure Agent** step: the wizard starts at [Configure LiveKit](#configure-livekit).

<ThemedImage
    alt="Four-step wizard opened from the AI agent, starting at Configure LiveKit"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-livekit-from-ai-agent-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-livekit-from-ai-agent-v5.1.png'),
    }}
/>

### From AI Services > Voice Agents

1. In the left navigation, expand **AI Services** and click **Voice Agents**. The page lists the voice agents in the selected project.

    <ThemedImage
        alt="Voice Agents under AI Services in the left navigation"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/ai-services-voice-agents-v5.1.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/ai-services-voice-agents-v5.1.png'),
        }}
    />

2. Click **Create**. A five-step wizard opens at **Configure Agent**.

#### Configure agent

1. Select the **Target Project**. The voice agent is created in this project.

    <ThemedImage
        alt="Configure Agent step with the target project selected"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-target-project-v5.1.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-target-project-v5.1.png'),
        }}
    />

2. Under **Target Agent**, choose where the agent that answers the caller runs:

    - **Platform-Hosted Agent**: an AI agent that's already deployed in WSO2 Cloud, in the selected project. Pick it from **Select Agent**. The list shows only agents with a deployed WebSocket endpoint. WSO2 Cloud resolves the agent's WebSocket URL for you when it deploys the voice agent. This gives the same result as clicking **Enable Voice Agents** on that agent's overview page.

        <ThemedImage
            alt="Platform-Hosted Agent with an existing agent selected"
            sources={{
                light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-platform-hosted-v5.1.png'),
                dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-platform-hosted-v5.1.png'),
            }}
        />

    - **Externally-Hosted Agent**: any agent you host yourself, outside WSO2 Cloud, that's reachable over WebSocket. Enter its **WebSocket URL**, which must start with `wss://` (or `ws://` for local setups), for example a public tunnel URL such as `wss://<your-host>/voice-agent`. The voice agent uses this URL as its **Target Agent WebSocket URL** configuration.

        <ThemedImage
            alt="Externally-Hosted Agent with the WebSocket URL field"
            sources={{
                light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-externally-hosted-v5.1.png'),
                dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-agent-externally-hosted-v5.1.png'),
            }}
        />

    An externally hosted agent must follow the same WebSocket contract as a Voice Agent Service. The wizard summarizes it under **How your target agent should handle a message?**:

    - Accept the `sessionId` as a query parameter on the WebSocket connection URL (for example, `wss://your-agent-host/path?sessionId=<id>`). It stays the same for the whole conversation.
    - Accept each caller message as a plain-text WebSocket message containing only the caller's latest utterance, and reply with a plain-text WebSocket message.
    - Signal failures by closing the WebSocket connection with an error close code and reason, instead of sending the error back as a regular message.

3. Check the **Display Name** and **Name**. For a platform-hosted agent, they default to `<agent-name> - Voice Agent`. Optionally, add a **Description**.
4. Click **Next**.

### Configure LiveKit

LiveKit handles the real-time audio connection between the user's browser and the voice pipeline.

1. Enter the **LiveKit URL**, for example `wss://your-project.livekit.cloud`.
2. Enter the **API Key** and **API Secret** of your LiveKit project.
3. Click **Next**.

To find these values, see [LiveKit credentials](https://docs.livekit.io/deploy/agents/secrets/#livekit-credentials). The wizard also links to this page from **How to get your LiveKit URL, API key & secret?**

<ThemedImage
    alt="Configure LiveKit step"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-livekit-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-livekit-v5.1.png'),
    }}
/>

### Configure speech to text

1. Select a speech-to-text (STT) provider: **Deepgram**, **AssemblyAI**, **Cartesia**, **ElevenLabs**, or **OpenAI**.
2. Select the **Model** and **Language**.
3. Enter the provider's API key. For OpenAI, create one on the [OpenAI API keys](https://platform.openai.com/api-keys) page. The wizard links to each provider's key page from **How to get your provider API key?**
4. Click **Next**.

<ThemedImage
    alt="Configure Speech to Text step with OpenAI selected"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-speech-to-text-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-speech-to-text-v5.1.png'),
    }}
/>

### Configure text to speech

1. Select a text-to-speech (TTS) provider: **Cartesia**, **ElevenLabs**, **Deepgram**, or **OpenAI**.
2. Select the **Model**, **Voice**, and **Language**. Cartesia and ElevenLabs also accept a custom voice ID.
3. Enter the provider's API key. You can reuse the same [OpenAI API key](https://platform.openai.com/api-keys) for both speech to text and text to speech.
4. Click **Next**.

For OpenAI, the available models are **GPT-4o Mini TTS**, **TTS-1**, and **TTS-1 HD**, and the available voices are Alloy, Ash, Ballad, Coral, Echo, Fable, Nova, Onyx, Sage, and Shimmer.

<ThemedImage
    alt="Configure Text to Speech step with OpenAI TTS-1 and the Alloy voice"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-text-to-speech-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/configure-text-to-speech-v5.1.png'),
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

**Advanced Settings** expose voice activity detection (VAD), turn detection and endpointing, barge-in (interrupting the agent while it speaks), and noise cancellation.

<ThemedImage
    alt="Tune and Deploy step"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/tune-and-deploy-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/tune-and-deploy-v5.1.png'),
    }}
/>

Click **Deploy Voice Agent**.

<ThemedImage
    alt="Advanced Settings and the Deploy Voice Agent button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/tune-and-deploy-advanced-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/tune-and-deploy-advanced-v5.1.png'),
    }}
/>

WSO2 Cloud creates a new integration (type **Voice Agent**) in the project, named **`<agent-name> - Voice Agent`** by default, and deploys it to the Development environment. The voice agent connects to the target agent through its **Target Agent WebSocket URL** configuration. For a platform-hosted agent, the AI agent's overview page now shows **Voice Agent Enabled**, which links to the new voice agent.

<ThemedImage
    alt="WSO2 Cloud creating the voice agent integration"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/creating-voice-agent-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/creating-voice-agent-v5.1.png'),
    }}
/>

<ThemedImage
    alt="AI agent overview page showing Voice Agent Enabled"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-agent-enabled-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-agent-enabled-v5.1.png'),
    }}
/>

Wait until the **Development** card on the voice agent's overview page shows **Active**. The card's **Voice Tester** is then ready to use.

<ThemedImage
    alt="Voice agent overview with the Development environment Active and the Voice Tester"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-agent-development-active-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-agent-development-active-v5.1.png'),
    }}
/>

## Test the voice agent

Each environment card on the voice agent's overview page has a **Voice Tester**. You can also open it from **Test** > **Voice Agent** in the left navigation.

<ThemedImage
    alt="Voice Agent Tester on the Test page"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/test-voice-agent-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/test-voice-agent-v5.1.png'),
    }}
/>

1. Click **Start Session** and allow microphone access when the browser asks. The tester shows **LIVE** and *Speak into your microphone — the agent is listening.* when it's connected.

    <ThemedImage
        alt="Voice Agent Tester with a live session"
        sources={{
            light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-tester-session-live-v5.1.png'),
            dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-tester-session-live-v5.1.png'),
        }}
    />

2. Speak to the agent. The transcript of the conversation appears in the tester, and you hear the agent's reply.
3. Click **Stop Session** to end the conversation.

For the customer support example, try:

- *"Hi, what can you help me with?"*
- *"Where is my order ORD-1001?"*
- *"Can I return my coffee maker from order ORD-1003?"*

<ThemedImage
    alt="Voice Agent Tester showing the conversation transcript"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-tester-session-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/voice-tester-session-v5.1.png'),
    }}
/>

## Promote to production

When you're ready to use the voice agent in production, click **Promote** on the voice agent's overview page. Choose **Use Development configuration** or **Define new configuration values**, click **Next**, and wait until the **Production** card shows **Active**.

<ThemedImage
    alt="Promote dialog for the voice agent"
    sources={{
        light: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/promote-dialog-v5.1.png'),
        dark: useBaseUrl('/img/manage/cloud/voice-agents-v5.1/promote-dialog-v5.1.png'),
    }}
/>

## Troubleshooting

### The reply text appears before the audio

The transcript is published as soon as the AI agent returns its full reply, but the audio has to wait for text-to-speech synthesis. To reduce the gap:

- Keep the agent's replies short and voice-friendly: one or two sentences with no Markdown or lists.
- Use a low-latency TTS model. For OpenAI, **TTS-1** is faster than **TTS-1 HD** or **GPT-4o Mini TTS**. Cartesia and Deepgram Aura are also fast.

### The agent doesn't respond

- Open the voice agent's **Development** card, click **Configure**, and check that **Target Agent WebSocket URL** (under **Target Agent**) points to the target agent's running WebSocket URL. For an externally hosted agent, this is the **WebSocket URL** you entered, so check that it's reachable from WSO2 Cloud. When the voice agent is created, it prefers the AI agent's Production URL. If the AI agent isn't running in Production, set the Development URL manually and redeploy.
- Check the AI agent's own logs for errors, such as a missing LLM model or API key configuration.

### The session ends on its own

A session ends when the user is silent for longer than **User Away Timeout**, or when the user leaves and **Close on Participant Disconnect** is on. Log entries such as `publisher data channel '_reliable' closed unexpectedly` followed by `disconnected from room with reason: RoomClosed` are part of normal room teardown, not an error.
