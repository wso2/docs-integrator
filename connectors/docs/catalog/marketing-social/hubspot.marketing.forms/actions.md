---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.forms` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage HubSpot marketing forms: create, list, retrieve, update, and archive form definitions. |

---

## Client

Manage HubSpot marketing forms: create, list, retrieve, update, and archive form definitions.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2RefreshTokenGrantConfig&#124;http:BearerTokenConfig&#124;ApiKeysConfig</code> | Required | Authentication configuration: OAuth 2.0 refresh token, bearer token, or private app API key. |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | <code>decimal</code> | `30` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `compression` | <code>http:Compression</code> | `COMPRESSION_AUTO` | Compression configuration for HTTP requests. |
| `validation` | <code>boolean</code> | `true` | Enable or disable payload validation. |

### Initializing the client

```ballerina
import ballerina/oauth2;
import ballerinax/hubspot.marketing.forms as forms;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

forms:Client formsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Form creation

<details>
<summary>Create a form</summary>

Signature: `post /`

Creates a new marketing form with the specified field groups, configuration, display options, and legal consent settings.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>FormDefinitionCreateRequestBase</code> | Yes | The form definition to create, including name, field groups, configuration, display options, and legal consent options. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `FormDefinitionBase|error`

Sample code:

```ballerina
forms:FormDefinitionBase response = check formsClient->/.post({
    name: "Contact Us Form",
    formType: "hubspot",
    fieldGroups: [
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "email",
                    label: "Email",
                    fieldType: "email",
                    objectTypeId: "0-1",
                    required: true,
                    hidden: false,
                    validation: {
                        useDefaultBlockList: true,
                        blockedEmailDomains: []
                    }
                }
            ]
        }
    ],
    configuration: {
        language: "en",
        createNewContactForNewEmail: true,
        editable: true,
        allowLinkToResetKnownValues: false,
        postSubmitAction: {
            'type: "thank_you",
            value: "Thank you for contacting us!"
        },
        prePopulateKnownValues: true,
        cloneable: true,
        notifyContactOwner: false,
        recaptchaEnabled: false,
        archivable: true,
        notifyRecipients: []
    },
    displayOptions: {
        renderRawHtml: false,
        theme: "default_style",
        submitButtonText: "Submit",
        style: {
            labelTextSize: "13",
            legalConsentTextColor: "#33475b",
            fontFamily: "arial, helvetica, sans-serif",
            legalConsentTextSize: "14",
            backgroundWidth: "100%",
            helpTextSize: "11",
            submitFontColor: "#ffffff",
            labelTextColor: "#33475b",
            submitAlignment: "left",
            submitSize: "12",
            helpTextColor: "#7c98b6",
            submitColor: "#ff7a59"
        }
    },
    legalConsentOptions: {
        'type: "none"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678-abcd-1234-efgh-123456789012",
  "name": "Contact Us Form",
  "formType": "hubspot",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false,
  "fieldGroups": [
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {
          "name": "email",
          "label": "Email",
          "fieldType": "email",
          "objectTypeId": "0-1",
          "required": true,
          "hidden": false,
          "validation": {
            "useDefaultBlockList": true,
            "blockedEmailDomains": []
          }
        }
      ]
    }
  ],
  "configuration": {
    "language": "en",
    "createNewContactForNewEmail": true,
    "editable": true,
    "allowLinkToResetKnownValues": false,
    "postSubmitAction": {
      "type": "thank_you",
      "value": "Thank you for contacting us!"
    },
    "prePopulateKnownValues": true,
    "cloneable": true,
    "notifyContactOwner": false,
    "recaptchaEnabled": false,
    "archivable": true,
    "notifyRecipients": []
  },
  "displayOptions": {
    "renderRawHtml": false,
    "theme": "default_style",
    "submitButtonText": "Submit",
    "style": {
      "labelTextSize": "13",
      "legalConsentTextColor": "#33475b",
      "fontFamily": "arial, helvetica, sans-serif",
      "legalConsentTextSize": "14",
      "backgroundWidth": "100%",
      "helpTextSize": "11",
      "submitFontColor": "#ffffff",
      "labelTextColor": "#33475b",
      "submitAlignment": "left",
      "submitSize": "12",
      "helpTextColor": "#7c98b6",
      "submitColor": "#ff7a59"
    }
  },
  "legalConsentOptions": {
    "type": "none"
  }
}
```

</details>

#### Form retrieval

<details>
<summary>Get a form definition by ID</summary>

Signature: `get /[string formId]`

Retrieves a single form definition by its unique identifier. Optionally includes archived forms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | <code>string</code> | Yes | The unique identifier of the form. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetMarketingV3FormsFormIdGetByIdQueries</code> | No | Query parameters: `archived` (boolean) to include archived forms. |

Returns: `FormDefinitionBase|error`

Sample code:

```ballerina
forms:FormDefinitionBase form = check formsClient->/[formId]();
```

Sample response:

```ballerina
{
  "id": "12345678-abcd-1234-efgh-123456789012",
  "name": "Contact Us Form",
  "formType": "hubspot",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "archived": false,
  "fieldGroups": [
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {
          "name": "email",
          "label": "Email",
          "fieldType": "email",
          "objectTypeId": "0-1",
          "required": true,
          "hidden": false,
          "validation": {
            "useDefaultBlockList": true,
            "blockedEmailDomains": []
          }
        }
      ]
    }
  ],
  "configuration": {
    "language": "en",
    "createNewContactForNewEmail": true,
    "editable": true,
    "allowLinkToResetKnownValues": false,
    "postSubmitAction": {
      "type": "thank_you",
      "value": "Thank you for contacting us!"
    },
    "prePopulateKnownValues": true,
    "cloneable": true,
    "notifyContactOwner": false,
    "recaptchaEnabled": false,
    "archivable": true,
    "notifyRecipients": []
  },
  "displayOptions": {
    "renderRawHtml": false,
    "theme": "default_style",
    "submitButtonText": "Submit",
    "style": {
      "labelTextSize": "13",
      "legalConsentTextColor": "#33475b",
      "fontFamily": "arial, helvetica, sans-serif",
      "legalConsentTextSize": "14",
      "backgroundWidth": "100%",
      "helpTextSize": "11",
      "submitFontColor": "#ffffff",
      "labelTextColor": "#33475b",
      "submitAlignment": "left",
      "submitSize": "12",
      "helpTextColor": "#7c98b6",
      "submitColor": "#ff7a59"
    }
  },
  "legalConsentOptions": {
    "type": "none"
  }
}
```

</details>

<details>
<summary>List forms</summary>

Signature: `get /`

Returns a paginated list of form definitions. Supports filtering by form type and archive status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |
| `queries` | <code>GetMarketingV3FormsGetPageQueries</code> | No | Query parameters: `formTypes` (array of `hubspot`, `captured`, `flow`, `blog_comment`, `all`), `archived` (boolean), `limit` (int), `after` (string cursor). |

Returns: `CollectionResponseFormDefinitionBaseForwardPaging|error`

Sample code:

```ballerina
forms:CollectionResponseFormDefinitionBaseForwardPaging response = check formsClient->/.get();
```

Sample response:

```ballerina
{
  "results": [
    {
      "id": "12345678-abcd-1234-efgh-123456789012",
      "name": "Contact Us Form",
      "formType": "hubspot",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "archived": false,
      "fieldGroups": [],
      "configuration": {},
      "displayOptions": {},
      "legalConsentOptions": {"type": "none"}
    }
  ],
  "paging": {
    "next": {
      "after": "NTI1Cg%3D%3D",
      "link": "https://api.hubapi.com/marketing/v3/forms?after=NTI1Cg%3D%3D"
    }
  }
}
```

</details>

#### Form updates

<details>
<summary>Replace a form definition</summary>

Signature: `put /[string formId]`

Performs a full replacement of a form definition. All fields in the payload will overwrite the existing form.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | <code>string</code> | Yes | The unique identifier of the form to replace. |
| `payload` | <code>HubSpotFormDefinition</code> | Yes | The complete form definition to replace the existing one. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `FormDefinitionBase|error`

Sample code:

```ballerina
forms:FormDefinitionBase response = check formsClient->/[formId].put({
    name: "Updated Contact Us Form",
    formType: "hubspot",
    createdAt: "2025-01-15T10:30:00.000Z",
    updatedAt: "2025-01-16T08:00:00.000Z",
    id: formId,
    archived: false,
    fieldGroups: [
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "email",
                    label: "Email Address",
                    fieldType: "email",
                    objectTypeId: "0-1",
                    required: true,
                    hidden: false,
                    validation: {
                        useDefaultBlockList: true,
                        blockedEmailDomains: []
                    }
                }
            ]
        }
    ],
    configuration: {
        language: "en",
        createNewContactForNewEmail: true,
        editable: true,
        allowLinkToResetKnownValues: false,
        postSubmitAction: {
            'type: "thank_you",
            value: "Thanks for reaching out!"
        },
        prePopulateKnownValues: true,
        cloneable: true,
        notifyContactOwner: false,
        recaptchaEnabled: false,
        archivable: true,
        notifyRecipients: []
    },
    displayOptions: {
        renderRawHtml: false,
        theme: "default_style",
        submitButtonText: "Send",
        style: {
            labelTextSize: "13",
            legalConsentTextColor: "#33475b",
            fontFamily: "arial, helvetica, sans-serif",
            legalConsentTextSize: "14",
            backgroundWidth: "100%",
            helpTextSize: "11",
            submitFontColor: "#ffffff",
            labelTextColor: "#33475b",
            submitAlignment: "left",
            submitSize: "12",
            helpTextColor: "#7c98b6",
            submitColor: "#ff7a59"
        }
    },
    legalConsentOptions: {
        'type: "none"
    }
});
```

Sample response:

```ballerina
{
  "id": "12345678-abcd-1234-efgh-123456789012",
  "name": "Updated Contact Us Form",
  "formType": "hubspot",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-16T08:00:00.000Z",
  "archived": false,
  "fieldGroups": [
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {
          "name": "email",
          "label": "Email Address",
          "fieldType": "email",
          "objectTypeId": "0-1",
          "required": true,
          "hidden": false,
          "validation": {
            "useDefaultBlockList": true,
            "blockedEmailDomains": []
          }
        }
      ]
    }
  ],
  "configuration": {
    "language": "en",
    "createNewContactForNewEmail": true,
    "editable": true,
    "allowLinkToResetKnownValues": false,
    "postSubmitAction": {
      "type": "thank_you",
      "value": "Thanks for reaching out!"
    },
    "prePopulateKnownValues": true,
    "cloneable": true,
    "notifyContactOwner": false,
    "recaptchaEnabled": false,
    "archivable": true,
    "notifyRecipients": []
  },
  "displayOptions": {
    "renderRawHtml": false,
    "theme": "default_style",
    "submitButtonText": "Send",
    "style": {
      "labelTextSize": "13",
      "legalConsentTextColor": "#33475b",
      "fontFamily": "arial, helvetica, sans-serif",
      "legalConsentTextSize": "14",
      "backgroundWidth": "100%",
      "helpTextSize": "11",
      "submitFontColor": "#ffffff",
      "labelTextColor": "#33475b",
      "submitAlignment": "left",
      "submitSize": "12",
      "helpTextColor": "#7c98b6",
      "submitColor": "#ff7a59"
    }
  },
  "legalConsentOptions": {
    "type": "none"
  }
}
```

</details>

<details>
<summary>Partially update a form definition</summary>

Signature: `patch /[string formId]`

Partially updates a form definition. Only the fields included in the payload are modified; all other fields remain unchanged.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | <code>string</code> | Yes | The unique identifier of the form to update. |
| `payload` | <code>HubSpotFormDefinitionPatchRequest</code> | Yes | The fields to update: `name`, `fieldGroups`, `configuration`, `displayOptions`, `legalConsentOptions`, `archived`. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `FormDefinitionBase|error`

Sample code:

```ballerina
forms:FormDefinitionBase response = check formsClient->/[formId].patch({
    fieldGroups: [
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "email",
                    label: "Email",
                    fieldType: "email",
                    objectTypeId: "0-1",
                    required: true,
                    hidden: false,
                    validation: {
                        useDefaultBlockList: true,
                        blockedEmailDomains: []
                    }
                }
            ]
        },
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "firstname",
                    label: "First Name",
                    fieldType: "single_line_text",
                    objectTypeId: "0-1",
                    required: true,
                    hidden: false
                },
                {
                    name: "lastname",
                    label: "Last Name",
                    fieldType: "single_line_text",
                    objectTypeId: "0-1",
                    required: true,
                    hidden: false
                }
            ]
        },
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "phone",
                    label: "Phone Number",
                    fieldType: "phone",
                    objectTypeId: "0-1",
                    required: false,
                    hidden: false,
                    useCountryCodeSelect: true,
                    validation: {
                        minAllowedDigits: 10,
                        maxAllowedDigits: 10
                    }
                }
            ]
        },
        {
            groupType: "default_group",
            richTextType: "text",
            fields: [
                {
                    name: "message",
                    label: "Message",
                    fieldType: "multi_line_text",
                    objectTypeId: "0-1",
                    required: false,
                    hidden: false
                }
            ]
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "12345678-abcd-1234-efgh-123456789012",
  "name": "Contact Us Form",
  "formType": "hubspot",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-16T09:15:00.000Z",
  "archived": false,
  "fieldGroups": [
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {"name": "email", "label": "Email", "fieldType": "email", "objectTypeId": "0-1", "required": true, "hidden": false}
      ]
    },
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {"name": "firstname", "label": "First Name", "fieldType": "single_line_text", "objectTypeId": "0-1", "required": true, "hidden": false},
        {"name": "lastname", "label": "Last Name", "fieldType": "single_line_text", "objectTypeId": "0-1", "required": true, "hidden": false}
      ]
    },
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {"name": "phone", "label": "Phone Number", "fieldType": "phone", "objectTypeId": "0-1", "required": false, "hidden": false}
      ]
    },
    {
      "groupType": "default_group",
      "richTextType": "text",
      "fields": [
        {"name": "message", "label": "Message", "fieldType": "multi_line_text", "objectTypeId": "0-1", "required": false, "hidden": false}
      ]
    }
  ],
  "configuration": {},
  "displayOptions": {},
  "legalConsentOptions": {"type": "none"}
}
```

</details>

#### Form archival

<details>
<summary>Archive a form definition</summary>

Signature: `delete /[string formId]`

Archives (soft-deletes) a form definition. Archived forms can still be retrieved by setting the `archived` query parameter to `true`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `formId` | <code>string</code> | Yes | The unique identifier of the form to archive. |
| `headers` | <code>map&lt;string&#124;string[]&gt;</code> | No | Optional HTTP headers. |

Returns: `json|error`

Sample code:

```ballerina
json response = check formsClient->/[formId].delete();
```

</details>
