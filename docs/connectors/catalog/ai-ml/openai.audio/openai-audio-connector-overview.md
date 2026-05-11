---
title: Overview
---

# Overview

OpenAI Audio provides text-to-speech, speech-to-text transcription, and audio translation capabilities powered by OpenAI's TTS and Whisper models. The Ballerina `ballerinax/openai.audio` connector (v2.0.0) lets you generate spoken audio from text, transcribe audio files into text, and translate audio from any supported language into English, all through the OpenAI REST API.

## Key features

- Text-to-speech generation using OpenAI TTS models (`tts-1`, `tts-1-hd`) with six voice options
- Speech-to-text transcription using the Whisper model with language detection
- Audio translation from any supported language to English text
- Multiple audio output formats: MP3, Opus, AAC, FLAC, WAV, and PCM
- Configurable transcription output formats: JSON, verbose JSON, plain text, SRT, and VTT
- Adjustable speech speed (0.25× to 4.0×) for generated audio
- Word- and segment-level timestamp granularity for transcriptions

## Actions

Actions let you generate speech, transcribe audio, and translate audio through the OpenAI Audio API. The connector exposes a single client with three resource functions.

| Client | Actions |
|--------|---------|
| `Client` | Text-to-speech, transcription, translation |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an OpenAI account and obtaining the API key required to use the OpenAI Audio connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **OpenAI Audio** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [OpenAI Audio Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-openai.audio)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
