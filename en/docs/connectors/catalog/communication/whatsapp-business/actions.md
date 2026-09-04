---
title: Actions
description: "Full reference for the WhatsApp Business connector client operations: sending messages and templates, and managing media."
keywords: [whatsapp, meta cloud api, sendMessage, sendTemplateMessage, uploadMedia, ballerina connector]
connector: true
connector_name: "whatsapp.business"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/whatsapp.business` package exposes the following client:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Send text, media, location, contact, and template messages, and manage media on WhatsApp Business Cloud. |

## Client

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig</code> | Required | Bearer-token authentication using a system-user or temporary access token. |
| `apiVersion` | <code>string</code> | <code>"v23.0"</code> | The Meta Graph API version path segment used for every request. |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client. |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response. |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header. |
| `poolConfig` | <code>http:PoolConfiguration</code> | <code>()</code> | Configurations associated with request pooling. |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching-related configurations. |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | The way of handling the `accept-encoding` header. |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | <code>()</code> | Configurations associated with the behavior of the circuit breaker. |

### Initializing the client

```ballerina
import ballerinax/whatsapp.business as whatsapp;

configurable string accessToken = ?;
configurable string phoneNumberId = ?;

whatsapp:Client whatsappClient = check new ({auth: {token: accessToken}});
```

### Operations

#### Messaging

<details>
<summary>sendMessage</summary>

Sends a text, image, audio, video, document, location, or contact message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumberId` | `string` | Yes | The business phone number ID to send from. |
| `payload` | `Message` | Yes | The message to send. A union of `TextMessage`, `ImageMessage`, `AudioMessage`, `VideoMessage`, `DocumentMessage`, `LocationMessage`, and `ContactMessage`. |

Returns: `MessageResponsePayload|Error`

Sample code:

```ballerina
whatsapp:TextMessage message = {
    to: "1XXXXXXXXXX",
    text: {body: "Hello from Ballerina!"}
};

whatsapp:MessageResponsePayload response = check whatsappClient->sendMessage(phoneNumberId, message);
```

Sample response:

```json
{
    "messaging_product": "whatsapp",
    "contacts": [{"input": "1XXXXXXXXXX", "wa_id": "1XXXXXXXXXX"}],
    "messages": [{"id": "wamid.HBgLMTX..."}]
}
```

</details>

<details>
<summary>sendTemplateMessage</summary>

Sends a pre-approved message template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumberId` | `string` | Yes | The business phone number ID to send from. |
| `payload` | `TemplateMessage` | Yes | The template name, language, and component parameters. |

Returns: `MessageResponsePayload|Error`

Sample code:

```ballerina
whatsapp:MessageResponsePayload response = check whatsappClient->sendTemplateMessage(phoneNumberId, {
    to: "1XXXXXXXXXX",
    template: {name: "hello_world", language: {code: "en_US"}}
});
```

Sample response:

```json
{
    "messaging_product": "whatsapp",
    "contacts": [{"input": "1XXXXXXXXXX", "wa_id": "1XXXXXXXXXX"}],
    "messages": [{"id": "wamid.HBgLMTX..."}]
}
```

</details>

#### Media

<details>
<summary>uploadMedia</summary>

Uploads media to be referenced by ID in a subsequent message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumberId` | `string` | Yes | The business phone number ID to upload against. |
| `payload` | `MediaUploadRequest` | Yes | The file content, file name, and MIME type. |

Returns: `MediaUploadResponse|Error`

Sample code:

```ballerina
whatsapp:MediaUploadResponse uploaded = check whatsappClient->uploadMedia(phoneNumberId, {
    fileContent: check io:fileReadBytes("image.jpg"),
    fileName: "image.jpg",
    mimeType: "image/jpeg"
});
```

Sample response:

```json
{
    "id": "1234567890"
}
```

</details>

<details>
<summary>retrieveMediaUrl</summary>

Retrieves the temporary download URL for a media object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mediaId` | `string` | Yes | The media object ID. |

Returns: `MediaUrlResponse|Error`

Sample code:

```ballerina
whatsapp:MediaUrlResponse mediaInfo = check whatsappClient->retrieveMediaUrl(mediaId);
```

Sample response:

```json
{
    "url": "https://lookaside.fbsbx.com/whatsapp_business/attachments/...",
    "id": "1234567890",
    "mime_type": "image/jpeg",
    "sha256": "...",
    "file_size": 12345
}
```

</details>

<details>
<summary>downloadMedia</summary>

Downloads a media object's bytes given its media ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mediaId` | `string` | Yes | The media object ID. |

Returns: `byte[]|Error`

Sample code:

```ballerina
byte[] mediaBytes = check whatsappClient->downloadMedia(mediaId);
```

</details>

<details>
<summary>deleteMedia</summary>

Deletes a previously uploaded media object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mediaId` | `string` | Yes | The media object ID. |

Returns: `MediaDeleteResponse|Error`

Sample code:

```ballerina
whatsapp:MediaDeleteResponse deleted = check whatsappClient->deleteMedia(mediaId);
```

Sample response:

```json
{
    "success": true
}
```

</details>

## What's next

- [Trigger Reference](triggers.md): react to inbound messages and status updates using the webhook listener.
- [Example](example.md): complete example integrations for the WhatsApp Business connector and trigger.
- [Setup Guide](setup-guide.md): create a Meta app and obtain credentials.
