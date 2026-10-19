---
title: Actions
---

# Actions

The `ballerinax/openai.audio` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides text-to-speech generation, audio transcription, and audio translation via the OpenAI Audio API. |

---

## Client

Provides text-to-speech generation, audio transcription, and audio translation via the OpenAI Audio API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig` | Required | Bearer token configuration containing the OpenAI API key. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x specific configurations. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 specific configurations. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | Forwarded header handling mode. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirect handling configuration. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pool configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Content compression setting. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie handling configuration. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Response size limit configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | TCP socket configuration. |
| `validation` | `boolean` | `true` | Enable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Enable lax data binding. |

### Initializing the client

```ballerina
import ballerinax/openai.audio;

configurable string apiKey = ?;

audio:Client openaiAudio = check new ({
    auth: {
        token: apiKey
    }
});
```

### Operations

#### Text-to-Speech

<details>
<summary>Create speech</summary>

Generates audio from the input text using the specified TTS model and voice.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateSpeechRequest` | Yes | The speech generation request containing the input text, model, and voice. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] audioBytes = check openaiAudio->/audio/speech.post({
    model: "tts-1",
    input: "The quick brown fox jumped over the lazy dog.",
    voice: "alloy"
});
check io:fileWriteBytes("speech.mp3", audioBytes);
```

Sample response:

```ballerina
<binary audio data written to speech.mp3>
```

</details>

#### Transcription

<details>
<summary>Create transcription</summary>

Transcribes audio into text in the language of the input audio using the Whisper model.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateTranscriptionRequest` | Yes | The transcription request containing the audio file and model. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CreateTranscriptionResponse|error`

Sample code:

```ballerina
byte[] audioFileBytes = check io:fileReadBytes("meeting.mp3");
audio:CreateTranscriptionResponse response = check openaiAudio->/audio/transcriptions.post({
    model: "whisper-1",
    file: {
        fileContent: audioFileBytes,
        fileName: "meeting.mp3"
    }
});
```

Sample response:

```ballerina
{"text": "Good morning everyone. Let's start by reviewing the quarterly results and then move on to the product roadmap discussion."}
```

</details>

#### Translation

<details>
<summary>Create translation</summary>

Translates audio into English text using the Whisper model. The input audio can be in any supported language.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateTranslationRequest` | Yes | The translation request containing the audio file and model. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CreateTranslationResponse|error`

Sample code:

```ballerina
byte[] audioFileBytes = check io:fileReadBytes("french_audio.mp3");
audio:CreateTranslationResponse response = check openaiAudio->/audio/translations.post({
    model: "whisper-1",
    file: {
        fileContent: audioFileBytes,
        fileName: "french_audio.mp3"
    }
});
```

Sample response:

```ballerina
{"text": "Hello, welcome to today's news broadcast. We will be covering the latest developments in international politics and the economy."}
```

</details>
