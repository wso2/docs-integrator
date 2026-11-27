---
connector: true
connector_name: "stripe"
toc_max_heading_level: 4
title: "Actions"
---

# Actions

The Stripe connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Accept payments and manage customers, subscriptions, invoices, products and prices, refunds, payouts, and the Connect, Billing, Issuing, Terminal, Treasury, Tax and Radar products through the Stripe REST API. |

---

## Client

The `Client` connects to the Stripe REST API (`https://api.stripe.com/v1`). It exposes 612 operations. Operations take an optional `headers` map, and request bodies are typed records.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;http:CredentialsConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

### Initializing the client

```ballerina
import ballerinax/stripe;

configurable string secretKey = ?;

final stripe:Client stripeClient = check new ({auth: {token: secretKey}});
```

### Operations

#### Current account

<details>
<summary>getCurrentAccount</summary>

<div>

Retrieve account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCurrentAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->getCurrentAccount();
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

#### Account links

<details>
<summary>createAccountLink</summary>

<div>

Create an account link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAccountLinkRequest</code> | Yes | Request payload to create an account link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccountLink|error`

**Sample code:**

```ballerina
stripe:AccountLink result = check stripeClient->createAccountLink({
    'type: "account_onboarding",
    account: "string",
    expand: ["string"],
    collectionOptions: {
        futureRequirements: "include",
        fields: "currently_due"
    }
});
```

**Sample response:**

```json
{
  "expires_at": 1,
  "created": 1,
  "url": "https://example.com/resource",
  "object": "account_link"
}
```

</div>
</details>

#### Account sessions

<details>
<summary>createAccountSession</summary>

<div>

Create an Account Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAccountSessionRequest</code> | Yes | Request payload to create an Account Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AccountSession|error`

**Sample code:**

```ballerina
stripe:AccountSession result = check stripeClient->createAccountSession({
    components: {
        issuingCardsList: {
            enabled: false
        },
        payoutDetails: {
            enabled: false
        },
        accountOnboarding: {
            enabled: false
        }
    },
    account: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "components": {
    "issuing_cards_list": {
      "features": {
        "card_spend_dispute_management": false,
        "card_management": false,
        "cardholder_management": false,
        "disable_stripe_user_authentication": false,
        "spend_control_management": false
      },
      "enabled": false
    },
    "payout_details": {
      "features": {},
      "enabled": false
    },
    "account_onboarding": {
      "features": {
        "external_account_collection": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "financial_account": {
      "features": {
        "transfer_balance": false,
        "send_money": false,
        "external_account_collection": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "payment_details": {
      "features": {
        "capture_payments": false,
        "dispute_management": false,
        "refund_management": false,
        "smart_disputes_management": false,
        "destination_on_behalf_of_charge_management": false
      },
      "enabled": false
    },
    "documents": {
      "features": {},
      "enabled": false
    },
    "payment_method_settings": {
      "features": {
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "notification_banner": {
      "features": {
        "external_account_collection": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "payments": {
      "features": {
        "capture_payments": false,
        "dispute_management": false,
        "refund_management": false,
        "smart_disputes_management": false,
        "destination_on_behalf_of_charge_management": false
      },
      "enabled": false
    },
    "balance_report": {
      "features": {},
      "enabled": false
    },
    "financial_account_transactions": {
      "features": {
        "card_spend_dispute_management": false
      },
      "enabled": false
    },
    "issuing_card": {
      "features": {
        "card_spend_dispute_management": false,
        "card_management": false,
        "cardholder_management": false,
        "spend_control_management": false
      },
      "enabled": false
    },
    "tax_settings": {
      "features": {},
      "enabled": false
    },
    "payouts": {
      "features": {
        "instant_payouts": false,
        "edit_payout_schedule": false,
        "external_account_collection": false,
        "standard_payouts": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "instant_payouts_promotion": {
      "features": {
        "instant_payouts": false,
        "external_account_collection": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "balances": {
      "features": {
        "instant_payouts": false,
        "edit_payout_schedule": false,
        "external_account_collection": false,
        "standard_payouts": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "account_management": {
      "features": {
        "external_account_collection": false,
        "disable_stripe_user_authentication": false
      },
      "enabled": false
    },
    "payment_disputes": {
      "features": {
        "dispute_management": false,
        "refund_management": false,
        "smart_disputes_management": false,
        "destination_on_behalf_of_charge_management": false
      },
      "enabled": false
    },
    "disputes_list": {
      "features": {
        "capture_payments": false,
        "dispute_management": false,
        "refund_management": false,
        "smart_disputes_management": false,
        "destination_on_behalf_of_charge_management": false
      },
      "enabled": false
    },
    "tax_registrations": {
      "features": {},
      "enabled": false
    },
    "payouts_list": {
      "features": {},
      "enabled": false
    },
    "payout_reconciliation_report": {
      "features": {},
      "enabled": false
    }
  },
  "expires_at": 1,
  "livemode": false,
  "client_secret": "string",
  "account": "string",
  "object": "account_session"
}
```

</div>
</details>

#### Accounts

<details>
<summary>listAccounts</summary>

<div>

List all connected accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created</code> | No | Only return connected accounts that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `AccountList|error`

**Sample code:**

```ballerina
stripe:AccountList result = check stripeClient->listAccounts();
```

**Sample response:**

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "account",
      "country": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createAccount</summary>

<div>

Create an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAccountRequest</code> | Yes | Request payload to create an account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->createAccount({
    tosAcceptance: {
        date: 1,
        serviceAgreement: "string",
        ip: "string"
    },
    country: "string",
    controller: {
        requirementCollection: "application"
    },
    metadata: ""
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>getAccount</summary>

<div>

Retrieve account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->getAccount("string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateAccount</summary>

<div>

Update an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>UpdateAccountRequest</code> | Yes | Request payload to update an account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->updateAccount("string", {
    tosAcceptance: {
        date: 1,
        serviceAgreement: "string",
        ip: "string"
    },
    metadata: "",
    individual: {
        maidenName: "Sample name",
        idNumber: "INV-0001",
        metadata: ""
    },
    accountToken: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>deleteAccount</summary>

<div>

Delete an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedAccount|error`

**Sample code:**

```ballerina
stripe:DeletedAccount result = check stripeClient->deleteAccount("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account"
}
```

</div>
</details>

#### Bank accounts

<details>
<summary>createAccountBankAccount</summary>

<div>

Create an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountBankAccountsBody</code> | Yes | Request payload to create an external account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->createAccountBankAccount("string", {
    expand: ["string"],
    externalAccount: "string",
    defaultForCurrency: false,
    bankAccount: "string"
});
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>getAccountBankAccount</summary>

<div>

Retrieve an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | Unique identifier for the external account to be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAccountBankAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->getAccountBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>updateAccountBankAccount</summary>

<div>

Update a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody</code> | Yes | Request payload to update a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->updateAccountBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountType: "checking",
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>deleteAccountBankAccount</summary>

<div>

Delete an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | Unique identifier for the external account to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedExternalAccount|error`

**Sample code:**

```ballerina
stripe:DeletedExternalAccount result = check stripeClient->deleteAccountBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `DeletedExternalAccount`.

</div>
</details>

#### Capabilities

<details>
<summary>listCapabilities</summary>

<div>

List all account capabilities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListCapabilitiesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ListAccountCapability|error`

**Sample code:**

```ballerina
stripe:ListAccountCapability result = check stripeClient->listCapabilities("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "requested": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account": "string",
      "object": "capability",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCapability</summary>

<div>

Retrieve an Account Capability.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `capability` | <code>string</code> | Yes | The capability parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCapabilityQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Capability|error`

**Sample code:**

```ballerina
stripe:Capability result = check stripeClient->getCapability("string", "string");
```

**Sample response:**

```json
{
  "requested": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "capability",
  "status": "active",
  "requirements": {
    "currently_due": [
      "string"
    ],
    "eventually_due": [
      "string"
    ],
    "past_due": [
      "string"
    ],
    "errors": [
      {
        "reason": "string",
        "code": "external_request",
        "requirement": "string"
      }
    ],
    "pending_verification": [
      "string"
    ]
  }
}
```

</div>
</details>

<details>
<summary>updateCapability</summary>

<div>

Update an Account Capability.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `capability` | <code>string</code> | Yes | The capability parameter. |
| `payload` | <code>UpdateCapabilityRequest</code> | Yes | Request payload to update an Account Capability. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Capability|error`

**Sample code:**

```ballerina
stripe:Capability result = check stripeClient->updateCapability("string", "string", {
    expand: ["string"],
    requested: false
});
```

**Sample response:**

```json
{
  "requested": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "capability",
  "status": "active",
  "requirements": {
    "currently_due": [
      "string"
    ],
    "eventually_due": [
      "string"
    ],
    "past_due": [
      "string"
    ],
    "errors": [
      {
        "reason": "string",
        "code": "external_request",
        "requirement": "string"
      }
    ],
    "pending_verification": [
      "string"
    ]
  }
}
```

</div>
</details>

#### External accounts

<details>
<summary>listExternalAccounts</summary>

<div>

List all external accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListExternalAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'object` | <code>"bank_account"&#124;"card"</code> | No | Filter external accounts according to a particular object type. |

**Returns:** `ExternalAccountList|error`

**Sample code:**

```ballerina
stripe:ExternalAccountList result = check stripeClient->listExternalAccounts("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "country": "string",
      "last4": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "bank_account",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createExternalAccount</summary>

<div>

Create an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountBankAccountsBody</code> | Yes | Request payload to create an external account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->createExternalAccount("string", {
    expand: ["string"],
    externalAccount: "string",
    defaultForCurrency: false,
    bankAccount: "string"
});
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>getExternalAccount</summary>

<div>

Retrieve an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | Unique identifier for the external account to be retrieved. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetExternalAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->getExternalAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>updateAccountExternalAccount</summary>

<div>

Update a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody</code> | Yes | Request payload to update a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->updateAccountExternalAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountType: "checking",
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

<details>
<summary>deleteExternalAccount</summary>

<div>

Delete an external account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `id` | <code>string</code> | Yes | Unique identifier for the external account to be deleted. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedExternalAccount|error`

**Sample code:**

```ballerina
stripe:DeletedExternalAccount result = check stripeClient->deleteExternalAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `DeletedExternalAccount`.

</div>
</details>

<details>
<summary>updateExternalAccount</summary>

<div>

Update a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody</code> | Yes | Request payload to update a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ExternalAccount|error`

**Sample code:**

```ballerina
stripe:ExternalAccount result = check stripeClient->updateExternalAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    accountType: "checking",
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `ExternalAccount`.

</div>
</details>

#### Login links

<details>
<summary>loginLinksAccount</summary>

<div>

Create a login link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to create a login link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LoginLink|error`

**Sample code:**

```ballerina
stripe:LoginLink result = check stripeClient->loginLinksAccount("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "created": 1,
  "url": "https://example.com/resource",
  "object": "login_link"
}
```

</div>
</details>

#### People

<details>
<summary>listAccountPeople</summary>

<div>

List all persons.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAccountPeopleQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `relationship` | <code>AllPeopleRelationshipSpecs</code> | No | Filters on the list of people returned based on the person's relationship to the account's company. |

**Returns:** `PersonList|error`

**Sample code:**

```ballerina
stripe:PersonList result = check stripeClient->listAccountPeople("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "account": "string",
      "object": "person"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPeople</summary>

<div>

Create a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>CreatePeopleRequest</code> | Yes | Request payload to create a person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->createPeople("string", {
    metadata: "",
    registeredAddress: {
        country: "string",
        city: "string",
        state: "string"
    },
    gender: "string",
    idNumberSecondary: "INV-0001"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>getAccountPerson</summary>

<div>

Retrieve a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAccountPersonQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->getAccountPerson("string", "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>updatePeople</summary>

<div>

Update a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `payload` | <code>UpdatePeopleRequest</code> | Yes | Request payload to update a person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->updatePeople("string", "string", {
    metadata: "",
    registeredAddress: {
        country: "string",
        city: "string",
        state: "string"
    },
    gender: "string",
    idNumberSecondary: "INV-0001"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>deletePeople</summary>

<div>

Delete a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedPerson|error`

**Sample code:**

```ballerina
stripe:DeletedPerson result = check stripeClient->deletePeople("string", "string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "person"
}
```

</div>
</details>

#### Persons

<details>
<summary>listPersons</summary>

<div>

List all persons.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPersonsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `relationship` | <code>AllPeopleRelationshipSpecs</code> | No | Filters on the list of people returned based on the person's relationship to the account's company. |

**Returns:** `PersonList|error`

**Sample code:**

```ballerina
stripe:PersonList result = check stripeClient->listPersons("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "account": "string",
      "object": "person"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPerson</summary>

<div>

Create a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>CreatePersonRequest</code> | Yes | Request payload to create a person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->createPerson("string", {
    metadata: "",
    registeredAddress: {
        country: "string",
        city: "string",
        state: "string"
    },
    gender: "string",
    idNumberSecondary: "INV-0001"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>getPerson</summary>

<div>

Retrieve a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPersonQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->getPerson("string", "string");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>updatePerson</summary>

<div>

Update a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `payload` | <code>UpdatePersonRequest</code> | Yes | Request payload to update a person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Person|error`

**Sample code:**

```ballerina
stripe:Person result = check stripeClient->updatePerson("string", "string", {
    metadata: "",
    registeredAddress: {
        country: "string",
        city: "string",
        state: "string"
    },
    gender: "string",
    idNumberSecondary: "INV-0001"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "account": "string",
  "object": "person",
  "registered_address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "gender": "string"
}
```

</div>
</details>

<details>
<summary>deletePerson</summary>

<div>

Delete a person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `person` | <code>string</code> | Yes | The person parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedPerson|error`

**Sample code:**

```ballerina
stripe:DeletedPerson result = check stripeClient->deletePerson("string", "string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "person"
}
```

</div>
</details>

#### Account rejection

<details>
<summary>rejectAccount</summary>

<div>

Reject an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>RejectAccountRequest</code> | Yes | Request payload to reject an account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->rejectAccount("string", {
    reason: "credit",
    expand: ["string"],
    payoutsAction: "none"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>unrejectAccount</summary>

<div>

Unreject an account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to unreject an account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Account|error`

**Sample code:**

```ballerina
stripe:Account result = check stripeClient->unrejectAccount("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "account",
  "tos_acceptance": {
    "date": 1,
    "service_agreement": "string",
    "ip": "string"
  },
  "country": "string",
  "settings": {
    "branding": {},
    "payments": {},
    "card_payments": {},
    "dashboard": {}
  },
  "controller": {
    "type": "account",
    "stripe_dashboard": {
      "type": "express"
    },
    "fees": {
      "payer": "account"
    }
  }
}
```

</div>
</details>

#### Apple Pay domains

<details>
<summary>listDomains</summary>

<div>

List Apple Pay domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `domainName` | <code>string</code> | No | The domain name that this payment method domain object represents. |
| `expand` | <code>ListDomainsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ApplePayDomainList|error`

**Sample code:**

```ballerina
stripe:ApplePayDomainList result = check stripeClient->listDomains();
```

**Sample response:**

```json
{
  "data": [
    {
      "domain_name": "Sample name",
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "apple_pay_domain"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createDomain</summary>

<div>

Create an Apple Pay domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateDomainRequest</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplePayDomain|error`

**Sample code:**

```ballerina
stripe:ApplePayDomain result = check stripeClient->createDomain({
    domainName: "Sample name",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "domain_name": "Sample name",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apple_pay_domain"
}
```

</div>
</details>

<details>
<summary>getDomain</summary>

<div>

Retrieve an Apple Pay domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | <code>string</code> | Yes | The domain parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetDomainQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ApplePayDomain|error`

**Sample code:**

```ballerina
stripe:ApplePayDomain result = check stripeClient->getDomain("string");
```

**Sample response:**

```json
{
  "domain_name": "Sample name",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apple_pay_domain"
}
```

</div>
</details>

<details>
<summary>deleteDomain</summary>

<div>

Delete an Apple Pay domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | <code>string</code> | Yes | The domain parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedApplePayDomain|error`

**Sample code:**

```ballerina
stripe:DeletedApplePayDomain result = check stripeClient->deleteDomain("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apple_pay_domain"
}
```

</div>
</details>

#### Application fees

<details>
<summary>listApplicationFees</summary>

<div>

List all application fees.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListApplicationFeesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `charge` | <code>string</code> | No | Only return application fees for the charge specified by this charge ID. |
| `created` | <code>Created1</code> | No | Only return applications fees that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PlatformEarningList|error`

**Sample code:**

```ballerina
stripe:PlatformEarningList result = check stripeClient->listApplicationFees();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "charge": "string",
      "livemode": false,
      "created": 1,
      "amount_refunded": 1,
      "refunds": {
        "data": [
          {
            "amount": 1,
            "created": 1,
            "fee": "string",
            "currency": "string",
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "fee_refund"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "application": "string",
      "currency": "string",
      "refunded": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account": "string",
      "object": "application_fee"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getApplicationFeeRefund</summary>

<div>

Retrieve an application fee refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fee` | <code>string</code> | Yes | The fee parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetApplicationFeeRefundQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FeeRefund|error`

**Sample code:**

```ballerina
stripe:FeeRefund result = check stripeClient->getApplicationFeeRefund("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "created": 1,
  "fee": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "fee_refund"
}
```

</div>
</details>

<details>
<summary>updateApplicationFeeRefund</summary>

<div>

Update an application fee refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fee` | <code>string</code> | Yes | The fee parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update an application fee refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FeeRefund|error`

**Sample code:**

```ballerina
stripe:FeeRefund result = check stripeClient->updateApplicationFeeRefund("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": 1,
  "created": 1,
  "fee": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "fee_refund"
}
```

</div>
</details>

<details>
<summary>getApplicationFee</summary>

<div>

Retrieve an application fee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetApplicationFeeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ApplicationFee|error`

**Sample code:**

```ballerina
stripe:ApplicationFee result = check stripeClient->getApplicationFee("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "charge": "string",
  "livemode": false,
  "created": 1,
  "amount_refunded": 1,
  "refunds": {
    "data": [
      {
        "amount": 1,
        "created": 1,
        "fee": "string",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "fee_refund"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "application": "string",
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "application_fee"
}
```

</div>
</details>

<details>
<summary>refundApplicationFee</summary>

<div>

Refund an application fee.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>RefundApplicationFeeRequest</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ApplicationFee|error`

**Sample code:**

```ballerina
stripe:ApplicationFee result = check stripeClient->refundApplicationFee("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 1,
    expand: ["string"],
    directive: "string"
});
```

**Sample response:**

```json
{
  "amount": 1,
  "charge": "string",
  "livemode": false,
  "created": 1,
  "amount_refunded": 1,
  "refunds": {
    "data": [
      {
        "amount": 1,
        "created": 1,
        "fee": "string",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "fee_refund"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "application": "string",
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "application_fee"
}
```

</div>
</details>

<details>
<summary>listApplicationFeeRefunds</summary>

<div>

List all application fee refunds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListApplicationFeeRefundsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `FeeRefundList|error`

**Sample code:**

```ballerina
stripe:FeeRefundList result = check stripeClient->listApplicationFeeRefunds("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "created": 1,
      "fee": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "fee_refund"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createApplicationFeeRefund</summary>

<div>

Create an application fee refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>CreateApplicationFeeRefundRequest</code> | Yes | Request payload to create an application fee refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FeeRefund|error`

**Sample code:**

```ballerina
stripe:FeeRefund result = check stripeClient->createApplicationFeeRefund("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 1,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": 1,
  "created": 1,
  "fee": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "fee_refund"
}
```

</div>
</details>

#### Apps

<details>
<summary>listInstalls</summary>

<div>

List all app installs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `app` | <code>string</code> | No | Only return installs for the app specified by this app ID. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInstallsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created2</code> | No | Only return app installs that were created during the given date interval. |
| `approvalRequired` | <code>boolean</code> | No | Only return installs whose installer must authorize pending permissions, content security policy entries, or endpoints. |
| `channel` | <code>"private_live"&#124;"private_test"&#124;"public"&#124;"testing"</code> | No | Only return installs in the distribution channel specified by this channel name. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `createdBy` | <code>string</code> | No | Only return installs created by the embedding platform specified by this account ID. |
| `account` | <code>string</code> | No | Only return installs made by this account. Only useful to app developers and embedding platforms, whose lists span the accounts that installed their app. |
| `status` | <code>"install_failed"&#124;"installed"&#124;"installing"&#124;"uninstall_failed"&#124;"uninstalling"</code> | No | Only return installs with the given status. |

**Returns:** `AppServiceResourceInstallAPIList|error`

**Sample code:**

```ballerina
stripe:AppServiceResourceInstallAPIList result = check stripeClient->listInstalls();
```

**Sample response:**

```json
{
  "data": [
    {
      "app": "string",
      "livemode": false,
      "created": 1,
      "approval_required": false,
      "channel": "private_live",
      "permissions_granted": [
        "string"
      ],
      "content_security_policy_pending": {
        "connect_src": [
          "string"
        ],
        "image_src": [
          "string"
        ]
      },
      "endpoints_granted": [
        "string"
      ],
      "endpoints_pending": [
        "string"
      ],
      "content_security_policy_granted": {
        "connect_src": [
          "string"
        ],
        "image_src": [
          "string"
        ]
      },
      "permissions_pending": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "account": "string",
      "object": "apps.install",
      "status": "install_failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createInstall</summary>

<div>

Create an app install.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateInstallRequest</code> | Yes | Request payload to create an app install. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppsInstall|error`

**Sample code:**

```ballerina
stripe:AppsInstall result = check stripeClient->createInstall({
    app: "string",
    expand: ["string"],
    channel: "private_live",
    codeChallengeMethod: "200"
});
```

**Sample response:**

```json
{
  "app": "string",
  "livemode": false,
  "created": 1,
  "approval_required": false,
  "channel": "private_live",
  "permissions_granted": [
    "string"
  ],
  "content_security_policy_pending": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "endpoints_granted": [
    "string"
  ],
  "endpoints_pending": [
    "string"
  ],
  "content_security_policy_granted": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "permissions_pending": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "apps.install",
  "status": "install_failed"
}
```

</div>
</details>

<details>
<summary>getInstall</summary>

<div>

Retrieve an app install.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInstallQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `AppsInstall|error`

**Sample code:**

```ballerina
stripe:AppsInstall result = check stripeClient->getInstall("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "app": "string",
  "livemode": false,
  "created": 1,
  "approval_required": false,
  "channel": "private_live",
  "permissions_granted": [
    "string"
  ],
  "content_security_policy_pending": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "endpoints_granted": [
    "string"
  ],
  "endpoints_pending": [
    "string"
  ],
  "content_security_policy_granted": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "permissions_pending": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "apps.install",
  "status": "install_failed"
}
```

</div>
</details>

<details>
<summary>updateInstall</summary>

<div>

Update an app install.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to update an app install. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppsInstall|error`

**Sample code:**

```ballerina
stripe:AppsInstall result = check stripeClient->updateInstall("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "app": "string",
  "livemode": false,
  "created": 1,
  "approval_required": false,
  "channel": "private_live",
  "permissions_granted": [
    "string"
  ],
  "content_security_policy_pending": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "endpoints_granted": [
    "string"
  ],
  "endpoints_pending": [
    "string"
  ],
  "content_security_policy_granted": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "permissions_pending": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "apps.install",
  "status": "install_failed"
}
```

</div>
</details>

<details>
<summary>uninstallInstall</summary>

<div>

Uninstall an app install.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to uninstall an app install. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppsInstall|error`

**Sample code:**

```ballerina
stripe:AppsInstall result = check stripeClient->uninstallInstall("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "app": "string",
  "livemode": false,
  "created": 1,
  "approval_required": false,
  "channel": "private_live",
  "permissions_granted": [
    "string"
  ],
  "content_security_policy_pending": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "endpoints_granted": [
    "string"
  ],
  "endpoints_pending": [
    "string"
  ],
  "content_security_policy_granted": {
    "connect_src": [
      "string"
    ],
    "image_src": [
      "string"
    ]
  },
  "permissions_pending": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "account": "string",
  "object": "apps.install",
  "status": "install_failed"
}
```

</div>
</details>

<details>
<summary>listSecrets</summary>

<div>

List secrets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSecretsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `scope` | <code>ScopeParam</code> | Yes | Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `SecretServiceResourceSecretList|error`

**Sample code:**

```ballerina
stripe:SecretServiceResourceSecretList result = check stripeClient->listSecrets(scope = {
    'type: "account",
    user: "string"
});
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "scope": {
        "type": "account"
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "apps.secret"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createSecret</summary>

<div>

Set a Secret.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSecretRequest</code> | Yes | Request payload to set a Secret. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppsSecret|error`

**Sample code:**

```ballerina
stripe:AppsSecret result = check stripeClient->createSecret({
    payload: "string",
    scope: {
        'type: "account",
        user: "string"
    },
    name: "Sample name",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "scope": {
    "type": "account",
    "user": "string"
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apps.secret"
}
```

</div>
</details>

<details>
<summary>createDelete</summary>

<div>

Delete a Secret.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateDeleteRequest</code> | Yes | Request payload to delete a Secret. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AppsSecret|error`

**Sample code:**

```ballerina
stripe:AppsSecret result = check stripeClient->createDelete({
    scope: {
        'type: "account",
        user: "string"
    },
    name: "Sample name",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "scope": {
    "type": "account",
    "user": "string"
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apps.secret"
}
```

</div>
</details>

<details>
<summary>getSecretFind</summary>

<div>

Find a Secret.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSecretFindQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `scope` | <code>ScopeParam</code> | Yes | Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user. |
| `name` | <code>string</code> | Yes | A name for the secret that's unique within the scope. |

**Returns:** `AppsSecret|error`

**Sample code:**

```ballerina
stripe:AppsSecret result = check stripeClient->getSecretFind(scope = {
    'type: "account",
    user: "string"
}, name = "Sample name");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "scope": {
    "type": "account",
    "user": "string"
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "apps.secret"
}
```

</div>
</details>

#### Balance

<details>
<summary>getBalance</summary>

<div>

Retrieve balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetBalanceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Balance|error`

**Sample code:**

```ballerina
stripe:Balance result = check stripeClient->getBalance();
```

**Sample response:**

```json
{
  "livemode": false,
  "pending": [
    {
      "amount": 1,
      "currency": "string"
    }
  ],
  "available": [
    {
      "amount": 1,
      "currency": "string"
    }
  ],
  "object": "balance",
  "issuing": {
    "available": [
      {
        "amount": 1,
        "currency": "string"
      }
    ]
  },
  "refund_and_dispute_prefunding": {
    "pending": [
      {
        "amount": 1,
        "currency": "string"
      }
    ],
    "available": [
      {
        "amount": 1,
        "currency": "string"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>listBalanceHistory</summary>

<div>

List all balance transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListBalanceHistoryQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created3</code> | No | Only return transactions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `payout` | <code>string</code> | No | For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID. |
| `currency` | <code>string</code> | No | Only return transactions in a certain currency. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'source` | <code>string</code> | No | Only returns transactions associated with the given object. |
| `'type` | <code>string</code> | No | Only returns transactions of the given type. One of: `tax_fund`, `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `inbound_transfer`, `inbound_transfer_reversal`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_dispute_provisional_credit`, `issuing_dispute_provisional_credit_reversal`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, `transfer_refund`, or `fee_credit_funding`. |

**Returns:** `BalanceTransactionsList|error`

**Sample code:**

```ballerina
stripe:BalanceTransactionsList result = check stripeClient->listBalanceHistory();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getBalanceHistoryItem</summary>

<div>

Retrieve a balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetBalanceHistoryItemQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BalanceTransaction|error`

**Sample code:**

```ballerina
stripe:BalanceTransaction result = check stripeClient->getBalanceHistoryItem("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "available_on": 1,
  "created": 1,
  "fee": 1,
  "reporting_category": "string",
  "fee_details": [
    {
      "amount": 1,
      "currency": "string",
      "type": "string"
    }
  ],
  "type": "adjustment",
  "balance_type": "issuing",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "net": 1,
  "object": "balance_transaction",
  "status": "string"
}
```

</div>
</details>

#### Balance settings

<details>
<summary>listBalanceSettings</summary>

<div>

Retrieve balance settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListBalanceSettingsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BalanceSettings|error`

**Sample code:**

```ballerina
stripe:BalanceSettings result = check stripeClient->listBalanceSettings();
```

**Sample response:**

```json
{
  "payments": {
    "settlement_timing": {
      "delay_days": 1
    },
    "debit_negative_balances": false,
    "payouts": {
      "status": "disabled"
    }
  },
  "object": "balance_settings"
}
```

</div>
</details>

<details>
<summary>createBalanceSetting</summary>

<div>

Update balance settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateBalanceSettingRequest</code> | Yes | Request payload to update balance settings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BalanceSettings|error`

**Sample code:**

```ballerina
stripe:BalanceSettings result = check stripeClient->createBalanceSetting({
    expand: ["string"],
    payments: {
        debitNegativeBalances: false
    }
});
```

**Sample response:**

```json
{
  "payments": {
    "settlement_timing": {
      "delay_days": 1
    },
    "debit_negative_balances": false,
    "payouts": {
      "status": "disabled"
    }
  },
  "object": "balance_settings"
}
```

</div>
</details>

#### Balance transactions

<details>
<summary>listBalanceTransactions</summary>

<div>

List all balance transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListBalanceTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created4</code> | No | Only return transactions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `payout` | <code>string</code> | No | For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID. |
| `currency` | <code>string</code> | No | Only return transactions in a certain currency. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'source` | <code>string</code> | No | Only returns transactions associated with the given object. |
| `'type` | <code>string</code> | No | Only returns transactions of the given type. One of: `tax_fund`, `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `inbound_transfer`, `inbound_transfer_reversal`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_dispute_provisional_credit`, `issuing_dispute_provisional_credit_reversal`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, `transfer_refund`, or `fee_credit_funding`. |

**Returns:** `BalanceTransactionsList|error`

**Sample code:**

```ballerina
stripe:BalanceTransactionsList result = check stripeClient->listBalanceTransactions();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getBalanceTransaction</summary>

<div>

Retrieve a balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetBalanceTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BalanceTransaction|error`

**Sample code:**

```ballerina
stripe:BalanceTransaction result = check stripeClient->getBalanceTransaction("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "available_on": 1,
  "created": 1,
  "fee": 1,
  "reporting_category": "string",
  "fee_details": [
    {
      "amount": 1,
      "currency": "string",
      "type": "string"
    }
  ],
  "type": "adjustment",
  "balance_type": "issuing",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "net": 1,
  "object": "balance_transaction",
  "status": "string"
}
```

</div>
</details>

#### Billing

<details>
<summary>listAlerts</summary>

<div>

List billing alerts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAlertsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `meter` | <code>string</code> | No | Filter results to only include alerts with the given meter. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `alertType` | <code>"usage_threshold"</code> | No | Filter results to only include this type of alert. |

**Returns:** `ThresholdsResourceAlertList|error`

**Sample code:**

```ballerina
stripe:ThresholdsResourceAlertList result = check stripeClient->listAlerts();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "alert_type": "usage_threshold",
      "object": "billing.alert"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createAlert</summary>

<div>

Create a billing alert.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAlertRequest</code> | Yes | Request payload to create a billing alert. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingAlert|error`

**Sample code:**

```ballerina
stripe:BillingAlert result = check stripeClient->createAlert({
    title: "string",
    alertType: "usage_threshold",
    expand: ["string"],
    usageThreshold: {
        recurrence: "one_time",
        meter: "string",
        gte: 1
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "alert_type": "usage_threshold",
  "object": "billing.alert",
  "usage_threshold": {
    "recurrence": "one_time",
    "meter": "string",
    "gte": 1
  }
}
```

</div>
</details>

<details>
<summary>getAlert</summary>

<div>

Retrieve a billing alert.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAlertQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingAlert|error`

**Sample code:**

```ballerina
stripe:BillingAlert result = check stripeClient->getAlert("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "alert_type": "usage_threshold",
  "object": "billing.alert",
  "usage_threshold": {
    "recurrence": "one_time",
    "meter": "string",
    "gte": 1
  }
}
```

</div>
</details>

<details>
<summary>activateAlert</summary>

<div>

Activate a billing alert.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to activate a billing alert. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingAlert|error`

**Sample code:**

```ballerina
stripe:BillingAlert result = check stripeClient->activateAlert("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "alert_type": "usage_threshold",
  "object": "billing.alert",
  "usage_threshold": {
    "recurrence": "one_time",
    "meter": "string",
    "gte": 1
  }
}
```

</div>
</details>

<details>
<summary>archiveAlert</summary>

<div>

Archive a billing alert.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to archive a billing alert. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingAlert|error`

**Sample code:**

```ballerina
stripe:BillingAlert result = check stripeClient->archiveAlert("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "alert_type": "usage_threshold",
  "object": "billing.alert",
  "usage_threshold": {
    "recurrence": "one_time",
    "meter": "string",
    "gte": 1
  }
}
```

</div>
</details>

<details>
<summary>deactivateAlert</summary>

<div>

Deactivate a billing alert.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to deactivate a billing alert. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingAlert|error`

**Sample code:**

```ballerina
stripe:BillingAlert result = check stripeClient->deactivateAlert("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "alert_type": "usage_threshold",
  "object": "billing.alert",
  "usage_threshold": {
    "recurrence": "one_time",
    "meter": "string",
    "gte": 1
  }
}
```

</div>
</details>

<details>
<summary>getCreditBalanceSummary</summary>

<div>

Retrieve the credit balance summary for a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `filter` | <code>BalanceSummaryFilterParam</code> | Yes | The filter criteria for the credit balance summary. |
| `customerAccount` | <code>string</code> | No | The account representing the customer whose credit balance summary you're retrieving. |
| `expand` | <code>GetCreditBalanceSummaryQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `customer` | <code>string</code> | No | The customer whose credit balance summary you're retrieving. |

**Returns:** `BillingCreditBalanceSummary|error`

**Sample code:**

```ballerina
stripe:BillingCreditBalanceSummary result = check stripeClient->getCreditBalanceSummary(filter = {
    'type: "applicability_scope",
    creditGrant: "string"
});
```

**Sample response:**

```json
{
  "balances": [
    {
      "ledger_balance": {
        "type": "monetary"
      },
      "available_balance": {
        "type": "monetary"
      }
    }
  ],
  "livemode": false,
  "customer": "string",
  "object": "billing.credit_balance_summary",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>listCreditBalanceTransactions</summary>

<div>

List credit balance transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | The account representing the customer whose credit balance transactions you're retrieving. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCreditBalanceTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `creditGrant` | <code>string</code> | No | The credit grant for which to fetch credit balance transactions. |
| `customer` | <code>string</code> | No | The customer whose credit balance transactions you're retrieving. |

**Returns:** `BillingCreditGrantsResourceBalanceTransactionList|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrantsResourceBalanceTransactionList result = check stripeClient->listCreditBalanceTransactions();
```

**Sample response:**

```json
{
  "data": [
    {
      "effective_at": 1,
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "credit_grant": "string",
      "object": "billing.credit_balance_transaction"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCreditBalanceTransaction</summary>

<div>

Retrieve a credit balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCreditBalanceTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingCreditBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:BillingCreditBalanceTransaction result = check stripeClient->getCreditBalanceTransaction("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "effective_at": 1,
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "credit_grant": "string",
  "object": "billing.credit_balance_transaction"
}
```

</div>
</details>

<details>
<summary>listCreditGrants</summary>

<div>

List credit grants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return credit grants for this account representing the customer. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCreditGrantsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | Only return credit grants for this customer. |

**Returns:** `BillingCreditGrantsResourceCreditGrantList|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrantsResourceCreditGrantList result = check stripeClient->listCreditGrants();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": {
        "type": "monetary"
      },
      "metadata": {},
      "livemode": false,
      "created": 1,
      "applicability_config": {
        "scope": {}
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": "paid",
      "updated": 1,
      "customer": "string",
      "object": "billing.credit_grant"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCreditGrant</summary>

<div>

Create a credit grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCreditGrantRequest</code> | Yes | Request payload to create a credit grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingCreditGrant|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrant result = check stripeClient->createCreditGrant({
    amount: {
        'type: "monetary",
        monetary: {
            currency: "string",
            value: 1
        }
    },
    applicabilityConfig: {
        scope: {}
    },
    customerAccount: "string",
    effectiveAt: 1
});
```

**Sample response:**

```json
{
  "amount": {
    "type": "monetary",
    "monetary": {
      "currency": "string",
      "value": 1
    }
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "applicability_config": {
    "scope": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "paid",
  "updated": 1,
  "customer": "string",
  "object": "billing.credit_grant"
}
```

</div>
</details>

<details>
<summary>getCreditGrant</summary>

<div>

Retrieve a credit grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCreditGrantQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingCreditGrant|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrant result = check stripeClient->getCreditGrant("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": {
    "type": "monetary",
    "monetary": {
      "currency": "string",
      "value": 1
    }
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "applicability_config": {
    "scope": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "paid",
  "updated": 1,
  "customer": "string",
  "object": "billing.credit_grant"
}
```

</div>
</details>

<details>
<summary>updateCreditGrant</summary>

<div>

Update a credit grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `payload` | <code>UpdateCreditGrantRequest</code> | Yes | Request payload to update a credit grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingCreditGrant|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrant result = check stripeClient->updateCreditGrant("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    expiresAt: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "type": "monetary",
    "monetary": {
      "currency": "string",
      "value": 1
    }
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "applicability_config": {
    "scope": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "paid",
  "updated": 1,
  "customer": "string",
  "object": "billing.credit_grant"
}
```

</div>
</details>

<details>
<summary>expireCreditGrant</summary>

<div>

Expire a credit grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to expire a credit grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingCreditGrant|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrant result = check stripeClient->expireCreditGrant("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": {
    "type": "monetary",
    "monetary": {
      "currency": "string",
      "value": 1
    }
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "applicability_config": {
    "scope": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "paid",
  "updated": 1,
  "customer": "string",
  "object": "billing.credit_grant"
}
```

</div>
</details>

<details>
<summary>voidCreditGrant</summary>

<div>

Void a credit grant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to void a credit grant. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingCreditGrant|error`

**Sample code:**

```ballerina
stripe:BillingCreditGrant result = check stripeClient->voidCreditGrant("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": {
    "type": "monetary",
    "monetary": {
      "currency": "string",
      "value": 1
    }
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "applicability_config": {
    "scope": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "paid",
  "updated": 1,
  "customer": "string",
  "object": "billing.credit_grant"
}
```

</div>
</details>

<details>
<summary>listFeedbackOptions</summary>

<div>

List all feedback options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListFeedbackOptionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"active"&#124;"inactive"</code> | No | Filter results to only include feedback options with the given status. |

**Returns:** `ResourceForListEndpoint|error`

**Sample code:**

```ballerina
stripe:ResourceForListEndpoint result = check stripeClient->listFeedbackOptions();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "description": "Sample description",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "object": "billing.feedback_option",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createFeedbackOption</summary>

<div>

Create a feedback option.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFeedbackOptionRequest</code> | Yes | Request payload to create a feedback option. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingFeedbackOption|error`

**Sample code:**

```ballerina
stripe:BillingFeedbackOption result = check stripeClient->createFeedbackOption({
    description: "Sample description",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "description": "Sample description",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "object": "billing.feedback_option",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getFeedbackOption</summary>

<div>

Retrieve a feedback option.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the feedback option to retrieve. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFeedbackOptionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingFeedbackOption|error`

**Sample code:**

```ballerina
stripe:BillingFeedbackOption result = check stripeClient->getFeedbackOption("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "description": "Sample description",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "object": "billing.feedback_option",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateFeedbackOption</summary>

<div>

Update a feedback option.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the feedback option to update. |
| `payload` | <code>UpdateFeedbackOptionRequest</code> | Yes | Request payload to update a feedback option. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingFeedbackOption|error`

**Sample code:**

```ballerina
stripe:BillingFeedbackOption result = check stripeClient->updateFeedbackOption("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "description": "Sample description",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "object": "billing.feedback_option",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>deactivateFeedbackOption</summary>

<div>

Deactivate a feedback option.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the feedback option to deactivate. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to deactivate a feedback option. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingFeedbackOption|error`

**Sample code:**

```ballerina
stripe:BillingFeedbackOption result = check stripeClient->deactivateFeedbackOption("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "description": "Sample description",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "object": "billing.feedback_option",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createMeterEventAdjustment</summary>

<div>

Create a billing meter event adjustment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMeterEventAdjustmentRequest</code> | Yes | Request payload to create a billing meter event adjustment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeterEventAdjustment|error`

**Sample code:**

```ballerina
stripe:BillingMeterEventAdjustment result = check stripeClient->createMeterEventAdjustment({
    eventName: "Sample name",
    'type: "cancel",
    cancel: {
        identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "event_name": "Sample name",
  "type": "cancel",
  "object": "billing.meter_event_adjustment",
  "status": "complete",
  "cancel": {
    "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

</div>
</details>

<details>
<summary>createMeterEvent</summary>

<div>

Create a billing meter event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMeterEventRequest</code> | Yes | Request payload to create a billing meter event. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeterEvent|error`

**Sample code:**

```ballerina
stripe:BillingMeterEvent result = check stripeClient->createMeterEvent({
    payload: {},
    eventName: "Sample name",
    identifier: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "livemode": false,
  "payload": {},
  "created": 1,
  "event_name": "Sample name",
  "object": "billing.meter_event",
  "timestamp": 1
}
```

</div>
</details>

<details>
<summary>listMeters</summary>

<div>

List billing meters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListMetersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"active"&#124;"inactive"</code> | No | Filter results to only include meters with the given status. |

**Returns:** `BillingMeterResourceBillingMeterList|error`

**Sample code:**

```ballerina
stripe:BillingMeterResourceBillingMeterList result = check stripeClient->listMeters();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "value_settings": {
        "event_payload_key": "string"
      },
      "customer_mapping": {
        "event_payload_key": "string",
        "type": "by_id"
      },
      "display_name": "Sample name",
      "default_aggregation": {
        "formula": "count"
      },
      "event_name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "updated": 1,
      "object": "billing.meter",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createMeter</summary>

<div>

Create a billing meter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMeterRequest</code> | Yes | Request payload to create a billing meter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeter|error`

**Sample code:**

```ballerina
stripe:BillingMeter result = check stripeClient->createMeter({
    defaultAggregation: {
        formula: "count"
    },
    eventName: "Sample name",
    displayName: "Sample name",
    eventTimeWindow: "day"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "value_settings": {
    "event_payload_key": "string"
  },
  "customer_mapping": {
    "event_payload_key": "string",
    "type": "by_id"
  },
  "display_name": "Sample name",
  "default_aggregation": {
    "formula": "count"
  },
  "event_name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "updated": 1,
  "object": "billing.meter",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getMeter</summary>

<div>

Retrieve a billing meter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetMeterQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingMeter|error`

**Sample code:**

```ballerina
stripe:BillingMeter result = check stripeClient->getMeter("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "value_settings": {
    "event_payload_key": "string"
  },
  "customer_mapping": {
    "event_payload_key": "string",
    "type": "by_id"
  },
  "display_name": "Sample name",
  "default_aggregation": {
    "formula": "count"
  },
  "event_name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "updated": 1,
  "object": "billing.meter",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateMeter</summary>

<div>

Update a billing meter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateMeterRequest</code> | Yes | Request payload to update a billing meter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeter|error`

**Sample code:**

```ballerina
stripe:BillingMeter result = check stripeClient->updateMeter("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    displayName: "Sample name"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "value_settings": {
    "event_payload_key": "string"
  },
  "customer_mapping": {
    "event_payload_key": "string",
    "type": "by_id"
  },
  "display_name": "Sample name",
  "default_aggregation": {
    "formula": "count"
  },
  "event_name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "updated": 1,
  "object": "billing.meter",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>deactivateMeter</summary>

<div>

Deactivate a billing meter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to deactivate a billing meter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeter|error`

**Sample code:**

```ballerina
stripe:BillingMeter result = check stripeClient->deactivateMeter("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "value_settings": {
    "event_payload_key": "string"
  },
  "customer_mapping": {
    "event_payload_key": "string",
    "type": "by_id"
  },
  "display_name": "Sample name",
  "default_aggregation": {
    "formula": "count"
  },
  "event_name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "updated": 1,
  "object": "billing.meter",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listEventSummaries</summary>

<div>

List billing meter event summaries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | Unique identifier for the object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `startTime` | <code>int</code> | Yes | The timestamp from when to start aggregating meter events (inclusive). Must be aligned with minute boundaries. |
| `expand` | <code>ListEventSummariesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `valueGroupingWindow` | <code>"day"&#124;"hour"</code> | No | Specifies what granularity to use when generating event summaries. If not specified, a single event summary would be returned for the specified time range. For hourly granularity, start and end times must align with hour boundaries (e.g., 00:00, 01:00, ..., 23:00). For daily granularity, start and end times must align with UTC day boundaries (00:00 UTC). |
| `endTime` | <code>int</code> | Yes | The timestamp from when to stop aggregating meter events (exclusive). Must be aligned with minute boundaries. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | Yes | The customer for which to fetch event summaries. |

**Returns:** `BillingMeterResourceBillingMeterEventSummaryList|error`

**Sample code:**

```ballerina
stripe:BillingMeterResourceBillingMeterEventSummaryList result = check stripeClient->listEventSummaries("3fa85f64-5717-4562-b3fc-2c963f66afa6", startTime = 1, endTime = 1, customer = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "start_time": 1,
      "livemode": false,
      "meter": "string",
      "aggregated_value": 100.00,
      "end_time": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "billing.meter_event_summary"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>reactivateMeter</summary>

<div>

Reactivate a billing meter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to reactivate a billing meter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingMeter|error`

**Sample code:**

```ballerina
stripe:BillingMeter result = check stripeClient->reactivateMeter("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "value_settings": {
    "event_payload_key": "string"
  },
  "customer_mapping": {
    "event_payload_key": "string",
    "type": "by_id"
  },
  "display_name": "Sample name",
  "default_aggregation": {
    "formula": "count"
  },
  "event_name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "deactivated_at": 1
  },
  "updated": 1,
  "object": "billing.meter",
  "status": "active"
}
```

</div>
</details>

#### Billing portal

<details>
<summary>listBillingPortalConfigurations</summary>

<div>

List portal configurations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListBillingPortalConfigurationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return configurations that are active or inactive (e.g., pass `true` to only list active configurations). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `isDefault` | <code>boolean</code> | No | Only return the default or non-default configurations (e.g., pass `true` to only list the default configuration). |

**Returns:** `PortalPublicResourceConfigurationList|error`

**Sample code:**

```ballerina
stripe:PortalPublicResourceConfigurationList result = check stripeClient->listBillingPortalConfigurations();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "active": false,
      "is_default": false,
      "business_profile": {},
      "features": {
        "subscription_cancel": {
          "mode": "at_period_end",
          "cancellation_reason": {
            "options": [
              "customer_service"
            ],
            "enabled": false
          },
          "proration_behavior": "always_invoice",
          "enabled": false
        },
        "invoice_history": {
          "enabled": false
        },
        "payment_method_update": {
          "enabled": false
        },
        "customer_update": {
          "enabled": false,
          "allowed_updates": [
            "address"
          ]
        },
        "subscription_update": {
          "default_allowed_updates": [
            "price"
          ],
          "schedule_at_period_end": {
            "conditions": [
              {}
            ]
          },
          "proration_behavior": "always_invoice",
          "enabled": false,
          "trial_update_behavior": "continue_trial"
        }
      },
      "login_page": {
        "enabled": false
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "updated": 1,
      "object": "billing_portal.configuration"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createBillingPortalConfiguration</summary>

<div>

Create a portal configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateBillingPortalConfigurationRequest</code> | Yes | Request payload to create a portal configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingPortalConfiguration|error`

**Sample code:**

```ballerina
stripe:BillingPortalConfiguration result = check stripeClient->createBillingPortalConfiguration({
    features: {
        subscriptionCancel: {
            enabled: false
        },
        invoiceHistory: {
            enabled: false
        },
        paymentMethodUpdate: {
            enabled: false
        }
    },
    defaultReturnUrl: "",
    expand: ["string"],
    loginPage: {
        enabled: false
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "active": false,
  "is_default": false,
  "business_profile": {
    "privacy_policy_url": "https://example.com/resource",
    "headline": "string",
    "terms_of_service_url": "https://example.com/resource"
  },
  "features": {
    "subscription_cancel": {
      "mode": "at_period_end",
      "cancellation_reason": {
        "options": [
          "customer_service"
        ],
        "enabled": false
      },
      "proration_behavior": "always_invoice",
      "enabled": false
    },
    "invoice_history": {
      "enabled": false
    },
    "payment_method_update": {
      "enabled": false
    },
    "customer_update": {
      "enabled": false,
      "allowed_updates": [
        "address"
      ]
    },
    "subscription_update": {
      "default_allowed_updates": [
        "price"
      ],
      "schedule_at_period_end": {
        "conditions": [
          {
            "type": "decreasing_item_amount"
          }
        ]
      },
      "proration_behavior": "always_invoice",
      "enabled": false,
      "trial_update_behavior": "continue_trial"
    }
  },
  "login_page": {
    "enabled": false,
    "url": "https://example.com/resource"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "billing_portal.configuration"
}
```

</div>
</details>

<details>
<summary>getBillingPortalConfiguration</summary>

<div>

Retrieve a portal configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetBillingPortalConfigurationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BillingPortalConfiguration|error`

**Sample code:**

```ballerina
stripe:BillingPortalConfiguration result = check stripeClient->getBillingPortalConfiguration("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "active": false,
  "is_default": false,
  "business_profile": {
    "privacy_policy_url": "https://example.com/resource",
    "headline": "string",
    "terms_of_service_url": "https://example.com/resource"
  },
  "features": {
    "subscription_cancel": {
      "mode": "at_period_end",
      "cancellation_reason": {
        "options": [
          "customer_service"
        ],
        "enabled": false
      },
      "proration_behavior": "always_invoice",
      "enabled": false
    },
    "invoice_history": {
      "enabled": false
    },
    "payment_method_update": {
      "enabled": false
    },
    "customer_update": {
      "enabled": false,
      "allowed_updates": [
        "address"
      ]
    },
    "subscription_update": {
      "default_allowed_updates": [
        "price"
      ],
      "schedule_at_period_end": {
        "conditions": [
          {
            "type": "decreasing_item_amount"
          }
        ]
      },
      "proration_behavior": "always_invoice",
      "enabled": false,
      "trial_update_behavior": "continue_trial"
    }
  },
  "login_page": {
    "enabled": false,
    "url": "https://example.com/resource"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "billing_portal.configuration"
}
```

</div>
</details>

<details>
<summary>updateBillingPortalConfiguration</summary>

<div>

Update a portal configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `payload` | <code>UpdateBillingPortalConfigurationRequest</code> | Yes | Request payload to update a portal configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingPortalConfiguration|error`

**Sample code:**

```ballerina
stripe:BillingPortalConfiguration result = check stripeClient->updateBillingPortalConfiguration("string", {
    features: {
        invoiceHistory: {
            enabled: false
        },
        paymentMethodUpdate: {
            enabled: false
        }
    },
    defaultReturnUrl: "",
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "active": false,
  "is_default": false,
  "business_profile": {
    "privacy_policy_url": "https://example.com/resource",
    "headline": "string",
    "terms_of_service_url": "https://example.com/resource"
  },
  "features": {
    "subscription_cancel": {
      "mode": "at_period_end",
      "cancellation_reason": {
        "options": [
          "customer_service"
        ],
        "enabled": false
      },
      "proration_behavior": "always_invoice",
      "enabled": false
    },
    "invoice_history": {
      "enabled": false
    },
    "payment_method_update": {
      "enabled": false
    },
    "customer_update": {
      "enabled": false,
      "allowed_updates": [
        "address"
      ]
    },
    "subscription_update": {
      "default_allowed_updates": [
        "price"
      ],
      "schedule_at_period_end": {
        "conditions": [
          {
            "type": "decreasing_item_amount"
          }
        ]
      },
      "proration_behavior": "always_invoice",
      "enabled": false,
      "trial_update_behavior": "continue_trial"
    }
  },
  "login_page": {
    "enabled": false,
    "url": "https://example.com/resource"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "billing_portal.configuration"
}
```

</div>
</details>

<details>
<summary>createBillingPortalSession</summary>

<div>

Create a portal session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateBillingPortalSessionRequest</code> | Yes | Request payload to create a portal session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BillingPortalSession|error`

**Sample code:**

```ballerina
stripe:BillingPortalSession result = check stripeClient->createBillingPortalSession({
    customerAccount: "string",
    expand: ["string"],
    configuration: "string",
    onBehalfOf: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "configuration": "string",
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "customer": "string",
  "object": "billing_portal.session"
}
```

</div>
</details>

#### Charges

<details>
<summary>listCharges</summary>

<div>

List all charges.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListChargesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `transferGroup` | <code>string</code> | No | Only return charges for this transfer group, limited to 100. |
| `created` | <code>Created5</code> | No | Only return charges that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `paymentIntent` | <code>string</code> | No | Only return charges that were created by the PaymentIntent specified by this PaymentIntent ID. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | Only return charges for the customer specified by this customer ID. |

**Returns:** `ChargeList|error`

**Sample code:**

```ballerina
stripe:ChargeList result = check stripeClient->listCharges();
```

**Sample response:**

```json
{
  "data": [
    {
      "billing_details": {},
      "metadata": {},
      "livemode": false,
      "amount_refunded": 1,
      "captured": false,
      "currency": "string",
      "refunded": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 1,
      "disputed": false,
      "created": 1,
      "amount_captured": 1,
      "paid": false,
      "object": "charge",
      "status": "failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCharge</summary>

<div>

Create a charge.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateChargeRequest</code> | Yes | Request payload to create a charge. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Charge|error`

**Sample code:**

```ballerina
stripe:Charge result = check stripeClient->createCharge({
    amount: 1,
    metadata: "",
    transferGroup: "string",
    radarOptions: {
        session: "string"
    }
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "metadata": {},
  "livemode": false,
  "amount_refunded": 1,
  "captured": false,
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "disputed": false,
  "created": 1,
  "amount_captured": 1,
  "paid": false,
  "object": "charge",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>searchCharges</summary>

<div>

Search charges.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchChargesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for charges](https://docs.stripe.com/search#query-fields-for-charges). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult|error`

**Sample code:**

```ballerina
stripe:SearchResult result = check stripeClient->searchCharges(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "billing_details": {},
      "metadata": {},
      "livemode": false,
      "amount_refunded": 1,
      "captured": false,
      "currency": "string",
      "refunded": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 1,
      "disputed": false,
      "created": 1,
      "amount_captured": 1,
      "paid": false,
      "object": "charge",
      "status": "failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getCharge</summary>

<div>

Retrieve a charge.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetChargeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Charge|error`

**Sample code:**

```ballerina
stripe:Charge result = check stripeClient->getCharge("string");
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "metadata": {},
  "livemode": false,
  "amount_refunded": 1,
  "captured": false,
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "disputed": false,
  "created": 1,
  "amount_captured": 1,
  "paid": false,
  "object": "charge",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>updateCharge</summary>

<div>

Update a charge.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>UpdateChargeRequest</code> | Yes | Request payload to update a charge. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Charge|error`

**Sample code:**

```ballerina
stripe:Charge result = check stripeClient->updateCharge("string", {
    expand: ["string"],
    metadata: "",
    transferGroup: "string",
    shipping: {
        address: {},
        name: "Sample name",
        carrier: "string"
    }
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "metadata": {},
  "livemode": false,
  "amount_refunded": 1,
  "captured": false,
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "disputed": false,
  "created": 1,
  "amount_captured": 1,
  "paid": false,
  "object": "charge",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>captureCharge</summary>

<div>

Capture a charge.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>CaptureChargeRequest</code> | Yes | Request payload to capture a charge. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Charge|error`

**Sample code:**

```ballerina
stripe:Charge result = check stripeClient->captureCharge("string", {
    statementDescriptor: "string",
    transferData: {
        amount: 1
    },
    amount: 1,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "metadata": {},
  "livemode": false,
  "amount_refunded": 1,
  "captured": false,
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "disputed": false,
  "created": 1,
  "amount_captured": 1,
  "paid": false,
  "object": "charge",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>getChargeDispute</summary>

<div>

Retrieve a charge dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetChargeDisputeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->getChargeDispute("string");
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

<details>
<summary>createChargeDispute</summary>

<div>

Update a charge dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>ChargeDisputeBody</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->createChargeDispute("string", {
    expand: ["string"],
    metadata: "",
    evidence: {
        refundPolicy: "string",
        enhancedEvidence: "",
        customerCommunication: "string"
    },
    submit: false
});
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

<details>
<summary>createClose</summary>

<div>

Close a charge dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->createClose("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

<details>
<summary>refundCharge</summary>

<div>

Create a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>RefundChargeRequest</code> | Yes | Request payload to create a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Charge|error`

**Sample code:**

```ballerina
stripe:Charge result = check stripeClient->refundCharge("string", {
    reason: "duplicate",
    amount: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "metadata": {},
  "livemode": false,
  "amount_refunded": 1,
  "captured": false,
  "currency": "string",
  "refunded": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "disputed": false,
  "created": 1,
  "amount_captured": 1,
  "paid": false,
  "object": "charge",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>listChargeRefunds</summary>

<div>

List all refunds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListChargeRefundsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `RefundList|error`

**Sample code:**

```ballerina
stripe:RefundList result = check stripeClient->listChargeRefunds("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 1,
      "created": 1,
      "object": "refund"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createChargeRefund</summary>

<div>

Create a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `payload` | <code>CreateChargeRefundRequest</code> | Yes | Request payload to create a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->createChargeRefund("string", {
    reason: "duplicate",
    amount: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>getChargeRefund</summary>

<div>

Retrieve a charge refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetChargeRefundQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->getChargeRefund("string", "string");
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>updateChargeRefund</summary>

<div>

Update a charge refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `charge` | <code>string</code> | Yes | The identifier of the charge to refund. |
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `payload` | <code>UpdateChargeRefundRequest</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->updateChargeRefund("string", "string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

#### Checkout

<details>
<summary>listSessions</summary>

<div>

List all Checkout Sessions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return the Checkout Sessions for the Account specified. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `customerDetails` | <code>CustomerDetailsParams</code> | No | Only return the Checkout Sessions for the Customer details specified. |
| `expand` | <code>ListSessionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created6</code> | No | Only return Checkout Sessions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `paymentIntent` | <code>string</code> | No | Only return the Checkout Session for the PaymentIntent specified. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `subscription` | <code>string</code> | No | Only return the Checkout Session for the subscription specified. |
| `paymentLink` | <code>string</code> | No | Only return the Checkout Sessions for the Payment Link specified. |
| `customer` | <code>string</code> | No | Only return the Checkout Sessions for the Customer specified. |
| `status` | <code>"complete"&#124;"expired"&#124;"open"</code> | No | Only return the Checkout Sessions matching the given status. |

**Returns:** `PaymentPagesCheckoutSessionList|error`

**Sample code:**

```ballerina
stripe:PaymentPagesCheckoutSessionList result = check stripeClient->listSessions();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "mode": "payment",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "custom_fields": [
        {
          "optional": false,
          "label": {
            "type": "custom"
          },
          "type": "dropdown",
          "key": "string"
        }
      ],
      "shipping_options": [
        {
          "shipping_amount": 1,
          "shipping_rate": "string"
        }
      ],
      "custom_text": {},
      "object": "checkout.session",
      "expires_at": 1,
      "payment_method_types": [
        "string"
      ],
      "payment_status": "no_payment_required",
      "automatic_tax": {
        "enabled": false
      }
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCheckoutSession</summary>

<div>

Create a Checkout Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCheckoutSessionRequest</code> | Yes | Request payload to create a Checkout Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CheckoutSession|error`

**Sample code:**

```ballerina
stripe:CheckoutSession result = check stripeClient->createCheckoutSession({
    afterExpiration: {
        recovery: {
            enabled: false
        }
    },
    lineItems: [{
        priceData: {
            currency: "string"
        },
        quantity: 1,
        adjustableQuantity: {
            enabled: false
        }
    }],
    mode: "payment",
    subscriptionData: {
        billingCycleAnchorConfig: {
            dayOfMonth: 1
        },
        defaultTaxRates: ["string"],
        billingMode: {
            'type: "classic"
        }
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "mode": "payment",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "checkout.session",
  "expires_at": 1,
  "payment_method_types": [
    "string"
  ],
  "payment_status": "no_payment_required",
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>getCheckoutSession</summary>

<div>

Retrieve a Checkout Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCheckoutSessionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CheckoutSession|error`

**Sample code:**

```ballerina
stripe:CheckoutSession result = check stripeClient->getCheckoutSession("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "mode": "payment",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "checkout.session",
  "expires_at": 1,
  "payment_method_types": [
    "string"
  ],
  "payment_status": "no_payment_required",
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>updateSession</summary>

<div>

Update a Checkout Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `payload` | <code>UpdateSessionRequest</code> | Yes | Request payload to update a Checkout Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CheckoutSession|error`

**Sample code:**

```ballerina
stripe:CheckoutSession result = check stripeClient->updateSession("string", {
    expand: ["string"],
    metadata: "",
    shippingOptions: "",
    lineItems: [{
        metadata: "",
        priceData: {
            currency: "string"
        },
        quantity: 1
    }]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "mode": "payment",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "checkout.session",
  "expires_at": 1,
  "payment_method_types": [
    "string"
  ],
  "payment_status": "no_payment_required",
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>expireSession</summary>

<div>

Expire a Checkout Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to expire a Checkout Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CheckoutSession|error`

**Sample code:**

```ballerina
stripe:CheckoutSession result = check stripeClient->expireSession("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "mode": "payment",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "checkout.session",
  "expires_at": 1,
  "payment_method_types": [
    "string"
  ],
  "payment_status": "no_payment_required",
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  }
}
```

</div>
</details>

<details>
<summary>listSessionLineItems</summary>

<div>

Retrieve a Checkout Session's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSessionLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentPagesCheckoutSessionListLineItems|error`

**Sample code:**

```ballerina
stripe:PaymentPagesCheckoutSessionListLineItems result = check stripeClient->listSessionLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_discount": 1,
      "amount_total": 1,
      "amount_tax": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_subtotal": 1,
      "object": "item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

#### Climate

<details>
<summary>listOrders</summary>

<div>

List orders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListOrdersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ClimateRemovalsOrdersList|error`

**Sample code:**

```ballerina
stripe:ClimateRemovalsOrdersList result = check stripeClient->listOrders();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "product": "string",
      "livemode": false,
      "expected_delivery_year": 1,
      "created": 1,
      "amount_total": 1,
      "amount_fees": 1,
      "currency": "string",
      "delivery_details": [
        {
          "supplier": {
            "removal_pathway": "biomass_carbon_removal_and_storage",
            "livemode": false,
            "name": "Sample name",
            "locations": [
              {
                "country": "string"
              }
            ],
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "info_url": "https://example.com/resource",
            "object": "climate.supplier"
          },
          "delivered_at": 1,
          "metric_tons": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_subtotal": 1,
      "metric_tons": "string",
      "object": "climate.order",
      "status": "awaiting_funds"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createOrder</summary>

<div>

Create an order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateOrderRequest</code> | Yes | Request payload to create an order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClimateOrder|error`

**Sample code:**

```ballerina
stripe:ClimateOrder result = check stripeClient->createOrder({
    product: "string",
    amount: 1,
    expand: ["string"],
    beneficiary: {
        publicName: "Sample name"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "expected_delivery_year": 1,
  "created": 1,
  "amount_total": 1,
  "amount_fees": 1,
  "currency": "string",
  "delivery_details": [
    {
      "supplier": {
        "removal_pathway": "biomass_carbon_removal_and_storage",
        "livemode": false,
        "name": "Sample name",
        "locations": [
          {
            "country": "string"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "info_url": "https://example.com/resource",
        "object": "climate.supplier"
      },
      "delivered_at": 1,
      "metric_tons": "string"
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_subtotal": 1,
  "metric_tons": "string",
  "object": "climate.order",
  "status": "awaiting_funds"
}
```

</div>
</details>

<details>
<summary>getOrder</summary>

<div>

Retrieve an order + 'order - Unique identifier of the order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'order` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetOrderQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ClimateOrder|error`

**Sample code:**

```ballerina
stripe:ClimateOrder result = check stripeClient->getOrder("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "expected_delivery_year": 1,
  "created": 1,
  "amount_total": 1,
  "amount_fees": 1,
  "currency": "string",
  "delivery_details": [
    {
      "supplier": {
        "removal_pathway": "biomass_carbon_removal_and_storage",
        "livemode": false,
        "name": "Sample name",
        "locations": [
          {
            "country": "string"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "info_url": "https://example.com/resource",
        "object": "climate.supplier"
      },
      "delivered_at": 1,
      "metric_tons": "string"
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_subtotal": 1,
  "metric_tons": "string",
  "object": "climate.order",
  "status": "awaiting_funds"
}
```

</div>
</details>

<details>
<summary>updateOrder</summary>

<div>

Update an order + 'order - Unique identifier of the order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'order` | <code>string</code> | Yes |  |
| `payload` | <code>UpdateOrderRequest</code> | Yes | Request payload to update an order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClimateOrder|error`

**Sample code:**

```ballerina
stripe:ClimateOrder result = check stripeClient->updateOrder("string", {
    expand: ["string"],
    beneficiary: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "expected_delivery_year": 1,
  "created": 1,
  "amount_total": 1,
  "amount_fees": 1,
  "currency": "string",
  "delivery_details": [
    {
      "supplier": {
        "removal_pathway": "biomass_carbon_removal_and_storage",
        "livemode": false,
        "name": "Sample name",
        "locations": [
          {
            "country": "string"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "info_url": "https://example.com/resource",
        "object": "climate.supplier"
      },
      "delivered_at": 1,
      "metric_tons": "string"
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_subtotal": 1,
  "metric_tons": "string",
  "object": "climate.order",
  "status": "awaiting_funds"
}
```

</div>
</details>

<details>
<summary>cancelOrder</summary>

<div>

Cancel an order + 'order - Unique identifier of the order.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'order` | <code>string</code> | Yes |  |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel an order. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ClimateOrder|error`

**Sample code:**

```ballerina
stripe:ClimateOrder result = check stripeClient->cancelOrder("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "expected_delivery_year": 1,
  "created": 1,
  "amount_total": 1,
  "amount_fees": 1,
  "currency": "string",
  "delivery_details": [
    {
      "supplier": {
        "removal_pathway": "biomass_carbon_removal_and_storage",
        "livemode": false,
        "name": "Sample name",
        "locations": [
          {
            "country": "string"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "info_url": "https://example.com/resource",
        "object": "climate.supplier"
      },
      "delivered_at": 1,
      "metric_tons": "string"
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_subtotal": 1,
  "metric_tons": "string",
  "object": "climate.order",
  "status": "awaiting_funds"
}
```

</div>
</details>

<details>
<summary>listClimateProducts</summary>

<div>

List products.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListClimateProductsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ClimateRemovalsProductsList|error`

**Sample code:**

```ballerina
stripe:ClimateRemovalsProductsList result = check stripeClient->listClimateProducts();
```

**Sample response:**

```json
{
  "data": [
    {
      "metric_tons_available": "string",
      "current_prices_per_metric_ton": {},
      "livemode": false,
      "suppliers": [
        {
          "removal_pathway": "biomass_carbon_removal_and_storage",
          "livemode": false,
          "name": "Sample name",
          "locations": [
            {
              "country": "string"
            }
          ],
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "info_url": "https://example.com/resource",
          "object": "climate.supplier"
        }
      ],
      "created": 1,
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "climate.product"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getClimateProduct</summary>

<div>

Retrieve a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `product` | <code>string</code> | Yes | The ID of the product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetClimateProductQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ClimateProduct|error`

**Sample code:**

```ballerina
stripe:ClimateProduct result = check stripeClient->getClimateProduct("string");
```

**Sample response:**

```json
{
  "metric_tons_available": "string",
  "current_prices_per_metric_ton": {},
  "livemode": false,
  "suppliers": [
    {
      "removal_pathway": "biomass_carbon_removal_and_storage",
      "livemode": false,
      "name": "Sample name",
      "locations": [
        {
          "country": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "info_url": "https://example.com/resource",
      "object": "climate.supplier"
    }
  ],
  "created": 1,
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "climate.product"
}
```

</div>
</details>

<details>
<summary>listSuppliers</summary>

<div>

List suppliers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSuppliersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ClimateRemovalsSuppliersList|error`

**Sample code:**

```ballerina
stripe:ClimateRemovalsSuppliersList result = check stripeClient->listSuppliers();
```

**Sample response:**

```json
{
  "data": [
    {
      "removal_pathway": "biomass_carbon_removal_and_storage",
      "livemode": false,
      "name": "Sample name",
      "locations": [
        {
          "country": "string"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "info_url": "https://example.com/resource",
      "object": "climate.supplier"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getSupplier</summary>

<div>

Retrieve a supplier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `supplier` | <code>string</code> | Yes | The supplier parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSupplierQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ClimateSupplier|error`

**Sample code:**

```ballerina
stripe:ClimateSupplier result = check stripeClient->getSupplier("string");
```

**Sample response:**

```json
{
  "removal_pathway": "biomass_carbon_removal_and_storage",
  "livemode": false,
  "name": "Sample name",
  "locations": [
    {
      "country": "string",
      "city": "string",
      "latitude": 100.00
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "info_url": "https://example.com/resource",
  "object": "climate.supplier"
}
```

</div>
</details>

#### Confirmation tokens

<details>
<summary>getConfirmationToken</summary>

<div>

Retrieve a ConfirmationToken.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `confirmationToken` | <code>string</code> | Yes | The confirmation token parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetConfirmationTokenQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ConfirmationToken|error`

**Sample code:**

```ballerina
stripe:ConfirmationToken result = check stripeClient->getConfirmationToken("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "use_stripe_sdk": false,
  "object": "confirmation_token",
  "setup_intent": "string"
}
```

</div>
</details>

#### Country specs

<details>
<summary>listCountrySpecs</summary>

<div>

List Country Specs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCountrySpecsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `CountrySpecList|error`

**Sample code:**

```ballerina
stripe:CountrySpecList result = check stripeClient->listCountrySpecs();
```

**Sample response:**

```json
{
  "data": [
    {
      "supported_payment_methods": [
        "string"
      ],
      "supported_payment_currencies": [
        "string"
      ],
      "supported_transfer_countries": [
        "string"
      ],
      "supported_bank_account_currencies": {},
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "default_currency": "string",
      "object": "country_spec",
      "verification_fields": {
        "individual": {
          "additional": [
            "string"
          ],
          "minimum": [
            "string"
          ]
        },
        "company": {
          "additional": [
            "string"
          ],
          "minimum": [
            "string"
          ]
        }
      }
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCountrySpec</summary>

<div>

Retrieve a Country Spec.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country` | <code>string</code> | Yes | The country parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCountrySpecQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CountrySpec|error`

**Sample code:**

```ballerina
stripe:CountrySpec result = check stripeClient->getCountrySpec("string");
```

**Sample response:**

```json
{
  "supported_payment_methods": [
    "string"
  ],
  "supported_payment_currencies": [
    "string"
  ],
  "supported_transfer_countries": [
    "string"
  ],
  "supported_bank_account_currencies": {},
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "default_currency": "string",
  "object": "country_spec",
  "verification_fields": {
    "individual": {
      "additional": [
        "string"
      ],
      "minimum": [
        "string"
      ]
    },
    "company": {
      "additional": [
        "string"
      ],
      "minimum": [
        "string"
      ]
    }
  }
}
```

</div>
</details>

#### Coupons

<details>
<summary>listCoupons</summary>

<div>

List all coupons.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCouponsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created7</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `CouponsResourceCouponList|error`

**Sample code:**

```ballerina
stripe:CouponsResourceCouponList result = check stripeClient->listCoupons();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "times_redeemed": 1,
      "duration": "forever",
      "valid": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "coupon"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCoupon</summary>

<div>

Create a coupon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCouponRequest</code> | Yes | Request payload to create a coupon. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Coupon|error`

**Sample code:**

```ballerina
stripe:Coupon result = check stripeClient->createCoupon({
    redeemBy: 1,
    metadata: "",
    maxRedemptions: 1,
    duration: "forever"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "duration": "forever",
  "valid": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "coupon"
}
```

</div>
</details>

<details>
<summary>getCoupon</summary>

<div>

Retrieve a coupon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `coupon` | <code>string</code> | Yes | The coupon parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCouponQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Coupon|error`

**Sample code:**

```ballerina
stripe:Coupon result = check stripeClient->getCoupon("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "duration": "forever",
  "valid": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "coupon"
}
```

</div>
</details>

<details>
<summary>updateCoupon</summary>

<div>

Update a coupon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `coupon` | <code>string</code> | Yes | The coupon parameter. |
| `payload` | <code>UpdateCouponRequest</code> | Yes | Request payload to update a coupon. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Coupon|error`

**Sample code:**

```ballerina
stripe:Coupon result = check stripeClient->updateCoupon("string", {
    expand: ["string"],
    metadata: "",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "duration": "forever",
  "valid": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "coupon"
}
```

</div>
</details>

<details>
<summary>deleteCoupon</summary>

<div>

Delete a coupon.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `coupon` | <code>string</code> | Yes | The coupon parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedCoupon|error`

**Sample code:**

```ballerina
stripe:DeletedCoupon result = check stripeClient->deleteCoupon("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "coupon"
}
```

</div>
</details>

#### Credit notes

<details>
<summary>listCreditNotes</summary>

<div>

List all credit notes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return credit notes for the account representing the customer specified by this account ID. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCreditNotesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created8</code> | No | Only return credit notes that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `invoice` | <code>string</code> | No | Only return credit notes for the invoice specified by this invoice ID. |
| `customer` | <code>string</code> | No | Only return credit notes for the customer specified by this customer ID. |

**Returns:** `CreditNotesList|error`

**Sample code:**

```ballerina
stripe:CreditNotesList result = check stripeClient->listCreditNotes();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "pre_payment_amount": 1,
      "discount_amount": 1,
      "post_payment_amount": 1,
      "pretax_credit_amounts": [
        {
          "amount": 1,
          "type": "credit_balance_transaction"
        }
      ],
      "amount_shipping": 1,
      "type": "mixed",
      "refunds": [
        {
          "amount_refunded": 1,
          "refund": "string"
        }
      ],
      "number": "INV-0001",
      "total": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lines": {
        "data": [
          {
            "amount": 1,
            "livemode": false,
            "discount_amount": 1,
            "pretax_credit_amounts": [
              {
                "amount": 1,
                "type": "credit_balance_transaction"
              }
            ],
            "type": "custom_line_item",
            "tax_rates": [
              {
                "inclusive": false,
                "livemode": false,
                "created": 1,
                "active": false,
                "display_name": "Sample name",
                "percentage": 100.00,
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "object": "tax_rate"
              }
            ],
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "discount_amounts": [
              {
                "amount": 1,
                "discount": "string"
              }
            ],
            "object": "credit_note_line_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "discount_amounts": [
        {
          "amount": 1,
          "discount": "string"
        }
      ],
      "amount": 1,
      "created": 1,
      "pdf": "string",
      "subtotal": 1,
      "invoice": "string",
      "customer": "string",
      "object": "credit_note",
      "status": "issued"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCreditNote</summary>

<div>

Create a credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCreditNoteRequest</code> | Yes | Request payload to create a credit note. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditNote|error`

**Sample code:**

```ballerina
stripe:CreditNote result = check stripeClient->createCreditNote({
    invoice: "string",
    reason: "duplicate",
    amount: 1,
    emailType: "credit_note"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "pre_payment_amount": 1,
  "discount_amount": 1,
  "post_payment_amount": 1,
  "pretax_credit_amounts": [
    {
      "amount": 1,
      "type": "credit_balance_transaction",
      "credit_balance_transaction": "string"
    }
  ],
  "amount_shipping": 1,
  "type": "mixed",
  "refunds": [
    {
      "amount_refunded": 1,
      "refund": "string",
      "payment_record_refund": {
        "refund_group": "string",
        "payment_record": "string"
      }
    }
  ],
  "number": "INV-0001",
  "total": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lines": {
    "data": [
      {
        "amount": 1,
        "livemode": false,
        "discount_amount": 1,
        "pretax_credit_amounts": [
          {
            "amount": 1,
            "type": "credit_balance_transaction"
          }
        ],
        "type": "custom_line_item",
        "tax_rates": [
          {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discount_amounts": [
          {
            "amount": 1,
            "discount": "string"
          }
        ],
        "object": "credit_note_line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "discount_amounts": [
    {
      "amount": 1,
      "discount": "string"
    }
  ],
  "amount": 1,
  "created": 1,
  "pdf": "string",
  "subtotal": 1,
  "invoice": "string",
  "customer": "string",
  "object": "credit_note",
  "status": "issued"
}
```

</div>
</details>

<details>
<summary>getPreview</summary>

<div>

Preview a credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `reason` | <code>"duplicate"&#124;"fraudulent"&#124;"order_change"&#124;"product_unsatisfactory"</code> | No | Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`. |
| `amount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |
| `metadata` | <code>record &#123;&#124;string...;&#124;&#125;</code> | No | Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. |
| `emailType` | <code>"credit_note"&#124;"none"</code> | No | Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`. |
| `shippingCost` | <code>CreditNoteShippingCost1</code> | No | When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |
| `creditAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice. |
| `memo` | <code>string</code> | No | The credit note's memo appears on the credit note PDF. |
| `refunds` | <code>CreditNoteRefundParams[]</code> | No | Refunds to link to this credit note. |
| `outOfBandAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe. |
| `effectiveAt` | <code>int</code> | No | The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF. |
| `expand` | <code>GetPreviewQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `refundAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice. |
| `invoice` | <code>string</code> | Yes | ID of the invoice. |
| `lines` | <code>CreditNoteLineItemParams[]</code> | No | Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |

**Returns:** `CreditNote|error`

**Sample code:**

```ballerina
stripe:CreditNote result = check stripeClient->getPreview(invoice = "string");
```

**Sample response:**

```json
{
  "livemode": false,
  "pre_payment_amount": 1,
  "discount_amount": 1,
  "post_payment_amount": 1,
  "pretax_credit_amounts": [
    {
      "amount": 1,
      "type": "credit_balance_transaction",
      "credit_balance_transaction": "string"
    }
  ],
  "amount_shipping": 1,
  "type": "mixed",
  "refunds": [
    {
      "amount_refunded": 1,
      "refund": "string",
      "payment_record_refund": {
        "refund_group": "string",
        "payment_record": "string"
      }
    }
  ],
  "number": "INV-0001",
  "total": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lines": {
    "data": [
      {
        "amount": 1,
        "livemode": false,
        "discount_amount": 1,
        "pretax_credit_amounts": [
          {
            "amount": 1,
            "type": "credit_balance_transaction"
          }
        ],
        "type": "custom_line_item",
        "tax_rates": [
          {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discount_amounts": [
          {
            "amount": 1,
            "discount": "string"
          }
        ],
        "object": "credit_note_line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "discount_amounts": [
    {
      "amount": 1,
      "discount": "string"
    }
  ],
  "amount": 1,
  "created": 1,
  "pdf": "string",
  "subtotal": 1,
  "invoice": "string",
  "customer": "string",
  "object": "credit_note",
  "status": "issued"
}
```

</div>
</details>

<details>
<summary>listPreviewLines</summary>

<div>

Retrieve a credit note preview's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `reason` | <code>"duplicate"&#124;"fraudulent"&#124;"order_change"&#124;"product_unsatisfactory"</code> | No | Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`. |
| `amount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |
| `metadata` | <code>record &#123;&#124;string...;&#124;&#125;</code> | No | Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`. |
| `emailType` | <code>"credit_note"&#124;"none"</code> | No | Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`. |
| `shippingCost` | <code>CreditNoteShippingCost1</code> | No | When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |
| `creditAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice. |
| `memo` | <code>string</code> | No | The credit note's memo appears on the credit note PDF. |
| `refunds` | <code>CreditNoteRefundParams[]</code> | No | Refunds to link to this credit note. |
| `outOfBandAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe. |
| `effectiveAt` | <code>int</code> | No | The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPreviewLinesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `refundAmount` | <code>int</code> | No | The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `invoice` | <code>string</code> | Yes | ID of the invoice. |
| `lines` | <code>CreditNoteLineItemParams[]</code> | No | Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided. |

**Returns:** `CreditNoteLinesList|error`

**Sample code:**

```ballerina
stripe:CreditNoteLinesList result = check stripeClient->listPreviewLines(invoice = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "livemode": false,
      "discount_amount": 1,
      "pretax_credit_amounts": [
        {
          "amount": 1,
          "type": "credit_balance_transaction"
        }
      ],
      "type": "custom_line_item",
      "tax_rates": [
        {
          "inclusive": false,
          "livemode": false,
          "created": 1,
          "active": false,
          "display_name": "Sample name",
          "percentage": 100.00,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "tax_rate"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discount_amounts": [
        {
          "amount": 1,
          "discount": "string"
        }
      ],
      "object": "credit_note_line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>listCreditNoteLines</summary>

<div>

Retrieve a credit note's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditNote` | <code>string</code> | Yes | The credit note parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCreditNoteLinesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `CreditNoteLinesList|error`

**Sample code:**

```ballerina
stripe:CreditNoteLinesList result = check stripeClient->listCreditNoteLines("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "livemode": false,
      "discount_amount": 1,
      "pretax_credit_amounts": [
        {
          "amount": 1,
          "type": "credit_balance_transaction"
        }
      ],
      "type": "custom_line_item",
      "tax_rates": [
        {
          "inclusive": false,
          "livemode": false,
          "created": 1,
          "active": false,
          "display_name": "Sample name",
          "percentage": 100.00,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "tax_rate"
        }
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discount_amounts": [
        {
          "amount": 1,
          "discount": "string"
        }
      ],
      "object": "credit_note_line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCreditNote</summary>

<div>

Retrieve a credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCreditNoteQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CreditNote|error`

**Sample code:**

```ballerina
stripe:CreditNote result = check stripeClient->getCreditNote("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "pre_payment_amount": 1,
  "discount_amount": 1,
  "post_payment_amount": 1,
  "pretax_credit_amounts": [
    {
      "amount": 1,
      "type": "credit_balance_transaction",
      "credit_balance_transaction": "string"
    }
  ],
  "amount_shipping": 1,
  "type": "mixed",
  "refunds": [
    {
      "amount_refunded": 1,
      "refund": "string",
      "payment_record_refund": {
        "refund_group": "string",
        "payment_record": "string"
      }
    }
  ],
  "number": "INV-0001",
  "total": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lines": {
    "data": [
      {
        "amount": 1,
        "livemode": false,
        "discount_amount": 1,
        "pretax_credit_amounts": [
          {
            "amount": 1,
            "type": "credit_balance_transaction"
          }
        ],
        "type": "custom_line_item",
        "tax_rates": [
          {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discount_amounts": [
          {
            "amount": 1,
            "discount": "string"
          }
        ],
        "object": "credit_note_line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "discount_amounts": [
    {
      "amount": 1,
      "discount": "string"
    }
  ],
  "amount": 1,
  "created": 1,
  "pdf": "string",
  "subtotal": 1,
  "invoice": "string",
  "customer": "string",
  "object": "credit_note",
  "status": "issued"
}
```

</div>
</details>

<details>
<summary>updateCreditNote</summary>

<div>

Update a credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateCreditNoteRequest</code> | Yes | Request payload to update a credit note. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditNote|error`

**Sample code:**

```ballerina
stripe:CreditNote result = check stripeClient->updateCreditNote("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    memo: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "pre_payment_amount": 1,
  "discount_amount": 1,
  "post_payment_amount": 1,
  "pretax_credit_amounts": [
    {
      "amount": 1,
      "type": "credit_balance_transaction",
      "credit_balance_transaction": "string"
    }
  ],
  "amount_shipping": 1,
  "type": "mixed",
  "refunds": [
    {
      "amount_refunded": 1,
      "refund": "string",
      "payment_record_refund": {
        "refund_group": "string",
        "payment_record": "string"
      }
    }
  ],
  "number": "INV-0001",
  "total": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lines": {
    "data": [
      {
        "amount": 1,
        "livemode": false,
        "discount_amount": 1,
        "pretax_credit_amounts": [
          {
            "amount": 1,
            "type": "credit_balance_transaction"
          }
        ],
        "type": "custom_line_item",
        "tax_rates": [
          {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discount_amounts": [
          {
            "amount": 1,
            "discount": "string"
          }
        ],
        "object": "credit_note_line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "discount_amounts": [
    {
      "amount": 1,
      "discount": "string"
    }
  ],
  "amount": 1,
  "created": 1,
  "pdf": "string",
  "subtotal": 1,
  "invoice": "string",
  "customer": "string",
  "object": "credit_note",
  "status": "issued"
}
```

</div>
</details>

<details>
<summary>voidCreditNote</summary>

<div>

Void a credit note.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to void a credit note. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreditNote|error`

**Sample code:**

```ballerina
stripe:CreditNote result = check stripeClient->voidCreditNote("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "pre_payment_amount": 1,
  "discount_amount": 1,
  "post_payment_amount": 1,
  "pretax_credit_amounts": [
    {
      "amount": 1,
      "type": "credit_balance_transaction",
      "credit_balance_transaction": "string"
    }
  ],
  "amount_shipping": 1,
  "type": "mixed",
  "refunds": [
    {
      "amount_refunded": 1,
      "refund": "string",
      "payment_record_refund": {
        "refund_group": "string",
        "payment_record": "string"
      }
    }
  ],
  "number": "INV-0001",
  "total": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "lines": {
    "data": [
      {
        "amount": 1,
        "livemode": false,
        "discount_amount": 1,
        "pretax_credit_amounts": [
          {
            "amount": 1,
            "type": "credit_balance_transaction"
          }
        ],
        "type": "custom_line_item",
        "tax_rates": [
          {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discount_amounts": [
          {
            "amount": 1,
            "discount": "string"
          }
        ],
        "object": "credit_note_line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "discount_amounts": [
    {
      "amount": 1,
      "discount": "string"
    }
  ],
  "amount": 1,
  "created": 1,
  "pdf": "string",
  "subtotal": 1,
  "invoice": "string",
  "customer": "string",
  "object": "credit_note",
  "status": "issued"
}
```

</div>
</details>

#### Customer sessions

<details>
<summary>createCustomerSession</summary>

<div>

Create a Customer Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCustomerSessionRequest</code> | Yes | Request payload to create a Customer Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSession|error`

**Sample code:**

```ballerina
stripe:CustomerSession result = check stripeClient->createCustomerSession({
    components: {
        activeEntitlements: {
            enabled: false
        },
        customerSheet: {
            enabled: false
        },
        paymentElement: {
            enabled: false
        }
    },
    customerAccount: "string",
    expand: ["string"],
    customer: "string"
});
```

**Sample response:**

```json
{
  "expires_at": 1,
  "livemode": false,
  "created": 1,
  "client_secret": "string",
  "customer": "string",
  "object": "customer_session"
}
```

</div>
</details>

#### Customers

<details>
<summary>listCustomers</summary>

<div>

List all customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `testClock` | <code>string</code> | No | Provides a list of customers that are associated with the specified test clock. The response will not include customers with test clocks if this parameter is not set. |
| `created` | <code>Created9</code> | No | Only return customers that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `email` | <code>string</code> | No | A case-sensitive filter on the list based on the customer's `email` field. The value must be a string. |

**Returns:** `CustomerResourceCustomerList|error`

**Sample code:**

```ballerina
stripe:CustomerResourceCustomerList result = check stripeClient->listCustomers();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "customer"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomer</summary>

<div>

Create a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCustomerRequest</code> | Yes | Request payload to create a customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Customer|error`

**Sample code:**

```ballerina
stripe:Customer result = check stripeClient->createCustomer({
    invoiceSettings: {
        footer: "string",
        customFields: "",
        defaultPaymentMethod: "string"
    },
    businessName: "",
    metadata: "",
    testClock: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "customer",
  "subscriptions": {
    "data": [
      {
        "metadata": {},
        "cancel_at_period_end": false,
        "livemode": false,
        "discounts": [
          "string"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "invoice_settings": {
          "issuer": {
            "type": "account"
          }
        },
        "created": 1,
        "billing_schedules": [
          {
            "bill_until": {
              "computed_timestamp": 1,
              "type": "duration"
            },
            "key": "string"
          }
        ],
        "items": {
          "data": [
            {
              "metadata": {},
              "created": 1,
              "subscription": "string",
              "current_period_end": 1,
              "discounts": [
                "string"
              ],
              "price": {},
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "current_period_start": 1,
              "object": "subscription_item"
            }
          ],
          "has_more": false,
          "url": "https://example.com/resource",
          "object": "list"
        },
        "object": "subscription",
        "status": "active",
        "billing_mode": {
          "type": "classic"
        },
        "currency": "string",
        "start_date": 1,
        "billing_cycle_anchor": 1,
        "automatic_tax": {
          "enabled": false
        },
        "collection_method": "charge_automatically",
        "customer": "string"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "sources": {
    "data": [
      {
        "country": "string",
        "last4": "string",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "bank_account",
        "status": "string"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  }
}
```

</div>
</details>

<details>
<summary>searchCustomers</summary>

<div>

Search customers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchCustomersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for customers](https://docs.stripe.com/search#query-fields-for-customers). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult1|error`

**Sample code:**

```ballerina
stripe:SearchResult1 result = check stripeClient->searchCustomers(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "customer"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getCustomer</summary>

<div>

Retrieve a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CustomerOrDeletedCustomer|error`

**Sample code:**

```ballerina
stripe:CustomerOrDeletedCustomer result = check stripeClient->getCustomer("string");
```

**Sample response:**

The raw response content as `CustomerOrDeletedCustomer`.

</div>
</details>

<details>
<summary>updateCustomer</summary>

<div>

Update a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>UpdateCustomerRequest</code> | Yes | Request payload to update a customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Customer|error`

**Sample code:**

```ballerina
stripe:Customer result = check stripeClient->updateCustomer("string", {
    metadata: "",
    nextInvoiceSequence: 1,
    description: "Sample description",
    individualName: ""
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "customer",
  "subscriptions": {
    "data": [
      {
        "metadata": {},
        "cancel_at_period_end": false,
        "livemode": false,
        "discounts": [
          "string"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "invoice_settings": {
          "issuer": {
            "type": "account"
          }
        },
        "created": 1,
        "billing_schedules": [
          {
            "bill_until": {
              "computed_timestamp": 1,
              "type": "duration"
            },
            "key": "string"
          }
        ],
        "items": {
          "data": [
            {
              "metadata": {},
              "created": 1,
              "subscription": "string",
              "current_period_end": 1,
              "discounts": [
                "string"
              ],
              "price": {},
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "current_period_start": 1,
              "object": "subscription_item"
            }
          ],
          "has_more": false,
          "url": "https://example.com/resource",
          "object": "list"
        },
        "object": "subscription",
        "status": "active",
        "billing_mode": {
          "type": "classic"
        },
        "currency": "string",
        "start_date": 1,
        "billing_cycle_anchor": 1,
        "automatic_tax": {
          "enabled": false
        },
        "collection_method": "charge_automatically",
        "customer": "string"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "sources": {
    "data": [
      {
        "country": "string",
        "last4": "string",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "bank_account",
        "status": "string"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  }
}
```

</div>
</details>

<details>
<summary>deleteCustomer</summary>

<div>

Delete a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedCustomer|error`

**Sample code:**

```ballerina
stripe:DeletedCustomer result = check stripeClient->deleteCustomer("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "customer"
}
```

</div>
</details>

<details>
<summary>listCustomerBalanceTransactions</summary>

<div>

List customer balance transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomerBalanceTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created10</code> | No | Only return customer balance transactions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `invoice` | <code>string</code> | No | Only return transactions that are related to the specified invoice. |

**Returns:** `CustomerBalanceTransactionList|error`

**Sample code:**

```ballerina
stripe:CustomerBalanceTransactionList result = check stripeClient->listCustomerBalanceTransactions("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "livemode": false,
      "created": 1,
      "ending_balance": 1,
      "type": "adjustment",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "customer": "string",
      "object": "customer_balance_transaction"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createBalanceTransaction</summary>

<div>

Create a customer balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CreateBalanceTransactionRequest</code> | Yes | Request payload to create a customer balance transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:CustomerBalanceTransaction result = check stripeClient->createBalanceTransaction("string", {
    amount: 1,
    currency: "string",
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "created": 1,
  "ending_balance": 1,
  "type": "adjustment",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "customer": "string",
  "object": "customer_balance_transaction"
}
```

</div>
</details>

<details>
<summary>getCustomerBalanceTransaction</summary>

<div>

Retrieve a customer balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerBalanceTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CustomerBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:CustomerBalanceTransaction result = check stripeClient->getCustomerBalanceTransaction("string", "string");
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "created": 1,
  "ending_balance": 1,
  "type": "adjustment",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "customer": "string",
  "object": "customer_balance_transaction"
}
```

</div>
</details>

<details>
<summary>updateBalanceTransaction</summary>

<div>

Update a customer credit balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `'transaction` | <code>string</code> | Yes |  |
| `payload` | <code>UpdateBalanceTransactionRequest</code> | Yes | Request payload to update a customer credit balance transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:CustomerBalanceTransaction result = check stripeClient->updateBalanceTransaction("string", "string", {
    expand: ["string"],
    metadata: "",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "created": 1,
  "ending_balance": 1,
  "type": "adjustment",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "customer": "string",
  "object": "customer_balance_transaction"
}
```

</div>
</details>

<details>
<summary>listBankAccounts</summary>

<div>

**Deprecated.** List all bank accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListBankAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BankAccountList|error`

**Sample code:**

```ballerina
stripe:BankAccountList result = check stripeClient->listBankAccounts("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "country": "string",
      "last4": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "bank_account",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomerBankAccount</summary>

<div>

Create a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CustomerBankAccountsBody</code> | Yes | Request payload to create a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentSource|error`

**Sample code:**

```ballerina
stripe:PaymentSource result = check stripeClient->createCustomerBankAccount("string", {
    alipayAccount: "string",
    expand: ["string"],
    'source: "string",
    card: "string"
});
```

**Sample response:**

The raw response content as `PaymentSource`.

</div>
</details>

<details>
<summary>getCustomerBankAccount</summary>

<div>

**Deprecated.** Retrieve a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerBankAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
stripe:BankAccount result = check stripeClient->getCustomerBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "country": "string",
  "last4": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "bank_account",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>updateCustomerBankAccount</summary>

<div>

Update a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody1</code> | Yes | Request payload to update a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceUpdateResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceUpdateResponse result = check stripeClient->updateCustomerBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    owner: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `CustomerSourceUpdateResponse`.

</div>
</details>

<details>
<summary>deleteCustomerBankAccount</summary>

<div>

Delete a customer source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to delete a customer source. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceDeleteResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceDeleteResponse result = check stripeClient->deleteCustomerBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

The raw response content as `CustomerSourceDeleteResponse`.

</div>
</details>

<details>
<summary>verifyBankAccount</summary>

<div>

Verify a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>IdVerifyBody</code> | Yes | Request payload to verify a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
stripe:BankAccount result = check stripeClient->verifyBankAccount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    amounts: [1]
});
```

**Sample response:**

```json
{
  "country": "string",
  "last4": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "bank_account",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>listCustomerCards</summary>

<div>

**Deprecated.** List all cards.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomerCardsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `CardList|error`

**Sample code:**

```ballerina
stripe:CardList result = check stripeClient->listCustomerCards("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "last4": "string",
      "exp_month": 1,
      "exp_year": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "brand": "string",
      "funding": "string",
      "object": "card"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomerCard</summary>

<div>

Create a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CustomerBankAccountsBody</code> | Yes | Request payload to create a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentSource|error`

**Sample code:**

```ballerina
stripe:PaymentSource result = check stripeClient->createCustomerCard("string", {
    alipayAccount: "string",
    expand: ["string"],
    'source: "string",
    card: "string"
});
```

**Sample response:**

The raw response content as `PaymentSource`.

</div>
</details>

<details>
<summary>getCustomerCard</summary>

<div>

**Deprecated.** Retrieve a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerCardQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Card|error`

**Sample code:**

```ballerina
stripe:Card result = check stripeClient->getCustomerCard("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "last4": "string",
  "exp_month": 1,
  "exp_year": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "funding": "string",
  "object": "card"
}
```

</div>
</details>

<details>
<summary>updateCustomerCard</summary>

<div>

Update a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody1</code> | Yes | Request payload to update a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceUpdateResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceUpdateResponse result = check stripeClient->updateCustomerCard("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    owner: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `CustomerSourceUpdateResponse`.

</div>
</details>

<details>
<summary>deleteCard</summary>

<div>

Delete a customer source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to delete a customer source. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceDeleteResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceDeleteResponse result = check stripeClient->deleteCard("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

The raw response content as `CustomerSourceDeleteResponse`.

</div>
</details>

<details>
<summary>getCashBalance</summary>

<div>

Retrieve a cash balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCashBalanceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CashBalance|error`

**Sample code:**

```ballerina
stripe:CashBalance result = check stripeClient->getCashBalance("string");
```

**Sample response:**

```json
{
  "settings": {
    "reconciliation_mode": "automatic",
    "using_merchant_default": false
  },
  "livemode": false,
  "customer": "string",
  "object": "cash_balance",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>createCashBalance</summary>

<div>

Update a cash balance's settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CreateCashBalanceRequest</code> | Yes | Request payload to update a cash balance's settings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CashBalance|error`

**Sample code:**

```ballerina
stripe:CashBalance result = check stripeClient->createCashBalance("string", {
    settings: {
        reconciliationMode: "automatic"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "settings": {
    "reconciliation_mode": "automatic",
    "using_merchant_default": false
  },
  "livemode": false,
  "customer": "string",
  "object": "cash_balance",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>listCashBalanceTransactions</summary>

<div>

List cash balance transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCashBalanceTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `CashBalanceTransactionList|error`

**Sample code:**

```ballerina
stripe:CashBalanceTransactionList result = check stripeClient->listCashBalanceTransactions("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "ending_balance": 1,
      "type": "adjusted_for_overdraft",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net_amount": 1,
      "customer": "string",
      "object": "customer_cash_balance_transaction"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCashBalanceTransaction</summary>

<div>

Retrieve a cash balance transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCashBalanceTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `CustomerCashBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:CustomerCashBalanceTransaction result = check stripeClient->getCashBalanceTransaction("string", "string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "ending_balance": 1,
  "type": "adjusted_for_overdraft",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "net_amount": 1,
  "customer": "string",
  "object": "customer_cash_balance_transaction"
}
```

</div>
</details>

<details>
<summary>getCustomerDiscount</summary>

<div>

Retrieve a customer discount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerDiscountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Discount|error`

**Sample code:**

```ballerina
stripe:Discount result = check stripeClient->getCustomerDiscount("string");
```

**Sample response:**

```json
{
  "start": 1,
  "source": {
    "type": "coupon",
    "coupon": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "discount",
  "customer_account": "string",
  "promotion_code": "200"
}
```

</div>
</details>

<details>
<summary>deleteCustomerDiscount</summary>

<div>

Delete a customer discount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedDiscount|error`

**Sample code:**

```ballerina
stripe:DeletedDiscount result = check stripeClient->deleteCustomerDiscount("string");
```

**Sample response:**

```json
{
  "start": 1,
  "source": {
    "type": "coupon",
    "coupon": "string"
  },
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "discount",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>fundingInstructionsCustomer</summary>

<div>

Create or retrieve funding instructions for a customer cash balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>FundingInstructionsCustomerRequest</code> | Yes | Request payload to create or retrieve funding instructions for a customer cash balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FundingInstructions|error`

**Sample code:**

```ballerina
stripe:FundingInstructions result = check stripeClient->fundingInstructionsCustomer("string", {
    bankTransfer: {
        'type: "eu_bank_transfer",
        euBankTransfer: {
            country: "string"
        },
        requestedAddressTypes: ["iban"]
    },
    fundingType: "bank_transfer",
    currency: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "bank_transfer": {
    "country": "string",
    "type": "eu_bank_transfer",
    "financial_addresses": [
      {
        "type": "aba"
      }
    ]
  },
  "livemode": false,
  "funding_type": "bank_transfer",
  "currency": "string",
  "object": "funding_instructions"
}
```

</div>
</details>

<details>
<summary>listCustomerPaymentMethods</summary>

<div>

List a Customer's PaymentMethods.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomerPaymentMethodsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"acss_debit"&#124;"affirm"&#124;"afterpay_clearpay"&#124;"alipay"&#124;"alma"&#124;"amazon_pay"&#124;"au_becs_debit"&#124;"bacs_debit"&#124;"bancontact"&#124;"billie"&#124;"bizum"&#124;"blik"&#124;"boleto"&#124;"card"&#124;"cashapp"&#124;"crypto"&#124;"custom"&#124;"customer_balance"&#124;"eps"&#124;"fpx"&#124;"giropay"&#124;"grabpay"&#124;"ideal"&#124;"kakao_pay"&#124;"klarna"&#124;"konbini"&#124;"kr_card"&#124;"link"&#124;"mb_way"&#124;"mobilepay"&#124;"multibanco"&#124;"naver_pay"&#124;"nz_bank_account"&#124;"oxxo"&#124;"p24"&#124;"pay_by_bank"&#124;"payco"&#124;"paynow"&#124;"paypal"&#124;"paypay"&#124;"payto"&#124;"pix"&#124;"promptpay"&#124;"revolut_pay"&#124;"samsung_pay"&#124;"satispay"&#124;"scalapay"&#124;"sepa_debit"&#124;"sequra"&#124;"sofort"&#124;"sunbit"&#124;"swish"&#124;"twint"&#124;"upi"&#124;"us_bank_account"&#124;"wechat_pay"&#124;"zip"</code> | No | An optional filter on the list, based on the object `type` field. Without the filter, the list includes all current and future payment method types. If your integration expects only one type of payment method in the response, make sure to provide a type value in the request. |
| `allowRedisplay` | <code>"always"&#124;"limited"&#124;"unspecified"</code> | No | This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. |

**Returns:** `CustomerPaymentMethodResourceList|error`

**Sample code:**

```ballerina
stripe:CustomerPaymentMethodResourceList result = check stripeClient->listCustomerPaymentMethods("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "billing_details": {},
      "livemode": false,
      "type": "acss_debit",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "payment_method"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getCustomerPaymentMethod</summary>

<div>

Retrieve a Customer's PaymentMethod.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `paymentMethod` | <code>string</code> | Yes | The payment method parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerPaymentMethodQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->getCustomerPaymentMethod("string", "string");
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

<details>
<summary>listSources</summary>

<div>

List customer sources.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSourcesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'object` | <code>string</code> | No | Filter sources according to a particular object type. |

**Returns:** `ApmsSourcesSourceList|error`

**Sample code:**

```ballerina
stripe:ApmsSourcesSourceList result = check stripeClient->listSources("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "country": "string",
      "last4": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "bank_account",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomerSource</summary>

<div>

Create a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CustomerBankAccountsBody</code> | Yes | Request payload to create a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentSource|error`

**Sample code:**

```ballerina
stripe:PaymentSource result = check stripeClient->createCustomerSource("string", {
    alipayAccount: "string",
    expand: ["string"],
    'source: "string",
    card: "string"
});
```

**Sample response:**

The raw response content as `PaymentSource`.

</div>
</details>

<details>
<summary>getCustomerSource</summary>

<div>

Retrieve a customer source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerSourceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentSource|error`

**Sample code:**

```ballerina
stripe:PaymentSource result = check stripeClient->getCustomerSource("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

The raw response content as `PaymentSource`.

</div>
</details>

<details>
<summary>updateCustomerSource</summary>

<div>

Update a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>BankAccountsidBody1</code> | Yes | Request payload to update a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceUpdateResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceUpdateResponse result = check stripeClient->updateCustomerSource("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    owner: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    metadata: "",
    accountHolderName: "Sample name",
    addressCountry: "string"
});
```

**Sample response:**

The raw response content as `CustomerSourceUpdateResponse`.

</div>
</details>

<details>
<summary>deleteSource</summary>

<div>

Delete a customer source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to delete a customer source. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerSourceDeleteResponse|error`

**Sample code:**

```ballerina
stripe:CustomerSourceDeleteResponse result = check stripeClient->deleteSource("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

The raw response content as `CustomerSourceDeleteResponse`.

</div>
</details>

<details>
<summary>verifyCustomerSource</summary>

<div>

Verify a bank account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>IdVerifyBody</code> | Yes | Request payload to verify a bank account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `BankAccount|error`

**Sample code:**

```ballerina
stripe:BankAccount result = check stripeClient->verifyCustomerSource("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    amounts: [1]
});
```

**Sample response:**

```json
{
  "country": "string",
  "last4": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "bank_account",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>listCustomerSubscriptions</summary>

<div>

List active subscriptions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomerSubscriptionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `SubscriptionList|error`

**Sample code:**

```ballerina
stripe:SubscriptionList result = check stripeClient->listCustomerSubscriptions("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "cancel_at_period_end": false,
      "livemode": false,
      "discounts": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "invoice_settings": {
        "issuer": {
          "type": "account"
        }
      },
      "created": 1,
      "billing_schedules": [
        {
          "bill_until": {
            "computed_timestamp": 1,
            "type": "duration"
          },
          "key": "string"
        }
      ],
      "items": {
        "data": [
          {
            "metadata": {},
            "created": 1,
            "subscription": "string",
            "current_period_end": 1,
            "discounts": [
              "string"
            ],
            "price": {
              "metadata": {},
              "product": "string",
              "livemode": false,
              "created": 1,
              "active": false,
              "billing_scheme": "per_unit",
              "type": "one_time",
              "currency": "string",
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "object": "price"
            },
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "current_period_start": 1,
            "object": "subscription_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "object": "subscription",
      "status": "active",
      "billing_mode": {
        "type": "classic"
      },
      "currency": "string",
      "start_date": 1,
      "billing_cycle_anchor": 1,
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "customer": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomerSubscription</summary>

<div>

Create a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CreateCustomerSubscriptionRequest</code> | Yes | Request payload to create a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->createCustomerSubscription("string", {
    metadata: "",
    paymentBehavior: "allow_incomplete",
    cancelAtPeriodEnd: false,
    daysUntilDue: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>getCustomerSubscription</summary>

<div>

Retrieve a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerSubscriptionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->getCustomerSubscription("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>updateCustomerSubscription</summary>

<div>

Update a subscription on a customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `payload` | <code>UpdateCustomerSubscriptionRequest</code> | Yes | Request payload to update a subscription on a customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->updateCustomerSubscription("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    metadata: "",
    paymentBehavior: "allow_incomplete",
    cancelAtPeriodEnd: false,
    daysUntilDue: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>deleteCustomerSubscription</summary>

<div>

Cancel a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `payload` | <code>DeleteCustomerSubscriptionRequest</code> | Yes | Request payload to cancel a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->deleteCustomerSubscription("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    invoiceNow: false,
    prorate: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>getSubscriptionDiscount</summary>

<div>

Retrieve a subscription discount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSubscriptionDiscountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Discount|error`

**Sample code:**

```ballerina
stripe:Discount result = check stripeClient->getSubscriptionDiscount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start": 1,
  "source": {
    "type": "coupon",
    "coupon": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "discount",
  "customer_account": "string",
  "promotion_code": "200"
}
```

</div>
</details>

<details>
<summary>deleteCustomerSubscriptionDiscount</summary>

<div>

Delete a customer discount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedDiscount|error`

**Sample code:**

```ballerina
stripe:DeletedDiscount result = check stripeClient->deleteCustomerSubscriptionDiscount("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start": 1,
  "source": {
    "type": "coupon",
    "coupon": "string"
  },
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "discount",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>listCustomerTaxIds</summary>

<div>

List all Customer tax IDs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCustomerTaxIdsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxIDsList|error`

**Sample code:**

```ballerina
stripe:TaxIDsList result = check stripeClient->listCustomerTaxIds("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "ad_nrt",
      "value": "string",
      "object": "tax_id"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCustomerTaxId</summary>

<div>

Create a Customer tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>CreateCustomerTaxIdRequest</code> | Yes | Request payload to create a Customer tax ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxId|error`

**Sample code:**

```ballerina
stripe:TaxId result = check stripeClient->createCustomerTaxId("string", {
    'type: "ad_nrt",
    value: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "ad_nrt",
  "value": "string",
  "object": "tax_id"
}
```

</div>
</details>

<details>
<summary>getCustomerTaxId</summary>

<div>

Retrieve a Customer tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCustomerTaxIdQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxId|error`

**Sample code:**

```ballerina
stripe:TaxId result = check stripeClient->getCustomerTaxId("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "ad_nrt",
  "value": "string",
  "object": "tax_id"
}
```

</div>
</details>

<details>
<summary>deleteCustomerTaxId</summary>

<div>

Delete a Customer tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTaxId|error`

**Sample code:**

```ballerina
stripe:DeletedTaxId result = check stripeClient->deleteCustomerTaxId("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_id"
}
```

</div>
</details>

#### Disputes

<details>
<summary>listDisputes</summary>

<div>

List all disputes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListDisputesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `charge` | <code>string</code> | No | Only return disputes associated to the charge specified by this charge ID. |
| `created` | <code>Created11</code> | No | Only return disputes that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `paymentIntent` | <code>string</code> | No | Only return disputes associated to the PaymentIntent specified by this PaymentIntent ID. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `DisputeList|error`

**Sample code:**

```ballerina
stripe:DisputeList result = check stripeClient->listDisputes();
```

**Sample response:**

```json
{
  "data": [
    {
      "reason": "string",
      "amount": 1,
      "metadata": {},
      "charge": "string",
      "evidence": {
        "enhanced_evidence": {}
      },
      "livemode": false,
      "evidence_details": {
        "enhanced_eligibility": {},
        "has_evidence": false,
        "submission_count": 1,
        "past_due": false
      },
      "created": 1,
      "balance_transactions": [
        {
          "amount": 1,
          "available_on": 1,
          "created": 1,
          "fee": 1,
          "reporting_category": "string",
          "fee_details": [
            {
              "amount": 1,
              "currency": "string",
              "type": "string"
            }
          ],
          "type": "adjustment",
          "balance_type": "issuing",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "net": 1,
          "object": "balance_transaction",
          "status": "string"
        }
      ],
      "is_charge_refundable": false,
      "enhanced_eligibility_types": [
        "mastercard_compliance"
      ],
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "dispute",
      "status": "lost"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getDispute</summary>

<div>

Retrieve a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetDisputeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->getDispute("string");
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

<details>
<summary>updateDispute</summary>

<div>

Update a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `payload` | <code>ChargeDisputeBody</code> | Yes | Request payload to update a dispute. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->updateDispute("string", {
    expand: ["string"],
    metadata: "",
    evidence: {
        refundPolicy: "string",
        enhancedEvidence: "",
        customerCommunication: "string"
    },
    submit: false
});
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

<details>
<summary>closeDispute</summary>

<div>

Close a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to close a dispute. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Dispute|error`

**Sample code:**

```ballerina
stripe:Dispute result = check stripeClient->closeDispute("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "reason": "string",
  "amount": 1,
  "metadata": {},
  "charge": "string",
  "evidence": {
    "enhanced_evidence": {},
    "refund_policy": "string",
    "customer_communication": "string"
  },
  "livemode": false,
  "evidence_details": {
    "enhanced_eligibility": {},
    "has_evidence": false,
    "submission_count": 1,
    "past_due": false
  },
  "created": 1,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "is_charge_refundable": false,
  "enhanced_eligibility_types": [
    "mastercard_compliance"
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "dispute",
  "status": "lost"
}
```

</div>
</details>

#### Entitlements

<details>
<summary>listActiveEntitlements</summary>

<div>

List all active entitlements.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListActiveEntitlementsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | Yes | The ID of the customer. |

**Returns:** `EntitlementsResourceCustomerEntitlementList|error`

**Sample code:**

```ballerina
stripe:EntitlementsResourceCustomerEntitlementList result = check stripeClient->listActiveEntitlements(customer = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "feature": "string",
      "livemode": false,
      "lookup_key": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "entitlements.active_entitlement"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getActiveEntitlement</summary>

<div>

Retrieve an active entitlement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the entitlement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetActiveEntitlementQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `EntitlementsActiveEntitlement|error`

**Sample code:**

```ballerina
stripe:EntitlementsActiveEntitlement result = check stripeClient->getActiveEntitlement("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "feature": "string",
  "livemode": false,
  "lookup_key": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "entitlements.active_entitlement"
}
```

</div>
</details>

<details>
<summary>listEntitlementFeatures</summary>

<div>

List all features.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `archived` | <code>boolean</code> | No | If set, filter results to only include features with the given archive status. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListEntitlementFeaturesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `lookupKey` | <code>string</code> | No | If set, filter results to only include features with the given lookup_key. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `EntitlementsResourceFeatureList|error`

**Sample code:**

```ballerina
stripe:EntitlementsResourceFeatureList result = check stripeClient->listEntitlementFeatures();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "name": "Sample name",
      "active": false,
      "lookup_key": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "entitlements.feature"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createEntitlementFeature</summary>

<div>

Create a feature.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateEntitlementFeatureRequest</code> | Yes | Request payload to create a feature. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EntitlementsFeature|error`

**Sample code:**

```ballerina
stripe:EntitlementsFeature result = check stripeClient->createEntitlementFeature({
    name: "Sample name",
    lookupKey: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "name": "Sample name",
  "active": false,
  "lookup_key": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "entitlements.feature"
}
```

</div>
</details>

<details>
<summary>getEntitlementFeature</summary>

<div>

Retrieve a feature.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the feature. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetEntitlementFeatureQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `EntitlementsFeature|error`

**Sample code:**

```ballerina
stripe:EntitlementsFeature result = check stripeClient->getEntitlementFeature("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "name": "Sample name",
  "active": false,
  "lookup_key": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "entitlements.feature"
}
```

</div>
</details>

<details>
<summary>updateFeature</summary>

<div>

Updates a feature.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateFeatureRequest</code> | Yes | Request payload to updates a feature. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EntitlementsFeature|error`

**Sample code:**

```ballerina
stripe:EntitlementsFeature result = check stripeClient->updateFeature("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    metadata: "",
    name: "Sample name",
    active: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "name": "Sample name",
  "active": false,
  "lookup_key": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "entitlements.feature"
}
```

</div>
</details>

#### Ephemeral keys

<details>
<summary>createEphemeralKey</summary>

<div>

Create an ephemeral key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateEphemeralKeyRequest</code> | Yes | Request payload to create an ephemeral key. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EphemeralKey|error`

**Sample code:**

```ballerina
stripe:EphemeralKey result = check stripeClient->createEphemeralKey({
    expand: ["string"],
    verificationSession: "string",
    issuingCard: "string",
    nonce: "string"
});
```

**Sample response:**

```json
{
  "expires": 1,
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "ephemeral_key",
  "secret": "string"
}
```

</div>
</details>

<details>
<summary>deleteEphemeralKey</summary>

<div>

Immediately invalidate an ephemeral key + 'key - The key parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | <code>string</code> | Yes |  |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to immediately invalidate an ephemeral key. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EphemeralKey|error`

**Sample code:**

```ballerina
stripe:EphemeralKey result = check stripeClient->deleteEphemeralKey("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "expires": 1,
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "ephemeral_key",
  "secret": "string"
}
```

</div>
</details>

#### Events

<details>
<summary>listEvents</summary>

<div>

List all events.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `deliverySuccess` | <code>boolean</code> | No | Filter events by whether all webhooks were successfully delivered. If false, events which are still pending or have failed all delivery attempts to a webhook endpoint will be returned. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListEventsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `types` | <code>ListEventsQueriesTypesItemsString[]</code> | No | An array of up to 20 strings containing specific event names. The list will be filtered to include only events with a matching event property. You may pass either `type` or `types`, but not both. |
| `created` | <code>Created12</code> | No | Only return events that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>string</code> | No | A string containing a specific event name, or group of events using * as a wildcard. The list will be filtered to include only events with a matching event property. |

**Returns:** `NotificationEventList|error`

**Sample code:**

```ballerina
stripe:NotificationEventList result = check stripeClient->listEvents();
```

**Sample response:**

```json
{
  "data": [
    {
      "data": {
        "object": {}
      },
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "pending_webhooks": 1,
      "object": "event"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getEvent</summary>

<div>

Retrieve an event.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetEventQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Event|error`

**Sample code:**

```ballerina
stripe:Event result = check stripeClient->getEvent("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "data": {
    "object": {}
  },
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "string",
  "pending_webhooks": 1,
  "object": "event"
}
```

</div>
</details>

#### Exchange rates

<details>
<summary>listExchangeRates</summary>

<div>

List all exchange rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with the exchange rate for currency X your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListExchangeRatesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and total number of supported payout currencies, and the default is the max. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with the exchange rate for currency X, your subsequent call can include `starting_after=X` in order to fetch the next page of the list. |

**Returns:** `ExchangeRateList|error`

**Sample code:**

```ballerina
stripe:ExchangeRateList result = check stripeClient->listExchangeRates();
```

**Sample response:**

```json
{
  "data": [
    {
      "rates": {},
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "exchange_rate"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getExchangeRate</summary>

<div>

Retrieve an exchange rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateId` | <code>string</code> | Yes | The rate id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetExchangeRateQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ExchangeRate|error`

**Sample code:**

```ballerina
stripe:ExchangeRate result = check stripeClient->getExchangeRate("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "rates": {},
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "exchange_rate"
}
```

</div>
</details>

#### File links

<details>
<summary>listFileLinks</summary>

<div>

List all file links.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListFileLinksQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `expired` | <code>boolean</code> | No | Filter links by their expiration status. By default, Stripe returns all links. |
| `file` | <code>string</code> | No | Only return links for the given file. |
| `created` | <code>Created13</code> | No | Only return links that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `FileResourceFileLinkList|error`

**Sample code:**

```ballerina
stripe:FileResourceFileLinkList result = check stripeClient->listFileLinks();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "expired": false,
      "file": "string",
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "file_link"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createFileLink</summary>

<div>

Create a file link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFileLinkRequest</code> | Yes | Request payload to create a file link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileLink|error`

**Sample code:**

```ballerina
stripe:FileLink result = check stripeClient->createFileLink({
    file: "string",
    expand: ["string"],
    metadata: "",
    expiresAt: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "expired": false,
  "file": "string",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "file_link"
}
```

</div>
</details>

<details>
<summary>getFileLink</summary>

<div>

Retrieve a file link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `link` | <code>string</code> | Yes | The link parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFileLinkQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FileLink|error`

**Sample code:**

```ballerina
stripe:FileLink result = check stripeClient->getFileLink("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "expired": false,
  "file": "string",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "file_link"
}
```

</div>
</details>

<details>
<summary>updateFileLink</summary>

<div>

Update a file link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `link` | <code>string</code> | Yes | The link parameter. |
| `payload` | <code>UpdateFileLinkRequest</code> | Yes | Request payload to update a file link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FileLink|error`

**Sample code:**

```ballerina
stripe:FileLink result = check stripeClient->updateFileLink("string", {
    expand: ["string"],
    metadata: "",
    expiresAt: "now"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "expired": false,
  "file": "string",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "file_link"
}
```

</div>
</details>

#### Files

<details>
<summary>listFiles</summary>

<div>

List all files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListFilesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `purpose` | <code>"account_requirement"&#124;"additional_verification"&#124;"business_icon"&#124;"business_logo"&#124;"customer_signature"&#124;"dispute_evidence"&#124;"document_provider_identity_document"&#124;"finance_report_run"&#124;"financial_account_statement"&#124;"identity_document"&#124;"identity_document_downloadable"&#124;"issuing_regulatory_reporting"&#124;"pci_document"&#124;"platform_terms_of_service"&#124;"selfie"&#124;"sigma_scheduled_query"&#124;"tax_document_user_upload"&#124;"terminal_android_apk"&#124;"terminal_reader_splashscreen"&#124;"terminal_wifi_certificate"&#124;"terminal_wifi_private_key"</code> | No | Filter queries by the file purpose. If you don't provide a purpose, the queries return unfiltered files. |
| `created` | <code>Created14</code> | No | Only return files that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `FileResourceFileList|error`

**Sample code:**

```ballerina
stripe:FileResourceFileList result = check stripeClient->listFiles();
```

**Sample response:**

```json
{
  "data": [
    {
      "size": 1,
      "purpose": "account_requirement",
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "file"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createFile</summary>

<div>

Create a file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFileRequest</code> | Yes | Request payload to create a file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `File|error`

**Sample code:**

```ballerina
stripe:File result = check stripeClient->createFile({
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    purpose: "account_requirement",
    expand: ["string"],
    fileLinkData: {
        create: false,
        metadata: "",
        expiresAt: 1
    }
});
```

**Sample response:**

```json
{
  "size": 1,
  "purpose": "account_requirement",
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "file",
  "expires_at": 1
}
```

</div>
</details>

<details>
<summary>getFile</summary>

<div>

Retrieve a file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | <code>string</code> | Yes | The file parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFileQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `File|error`

**Sample code:**

```ballerina
stripe:File result = check stripeClient->getFile("string");
```

**Sample response:**

```json
{
  "size": 1,
  "purpose": "account_requirement",
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "file",
  "expires_at": 1
}
```

</div>
</details>

#### Financial connections

<details>
<summary>listFinancialConnectionAccounts</summary>

<div>

List Accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListFinancialConnectionAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `accountHolder` | <code>AccountholderParams</code> | No | If present, only return accounts that belong to the specified account holder. `account_holder[customer]` and `account_holder[account]` are mutually exclusive. |
| `session` | <code>string</code> | No | If present, only return accounts that were collected as part of the given session. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BankConnectionsResourceLinkedAccountList|error`

**Sample code:**

```ballerina
stripe:BankConnectionsResourceLinkedAccountList result = check stripeClient->listFinancialConnectionAccounts();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "institution_name": "Sample name",
      "supported_payment_method_types": [
        "link"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": "cash",
      "subcategory": "checking",
      "object": "financial_connections.account",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getFinancialConnectionAccount</summary>

<div>

Retrieve an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFinancialConnectionAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->getFinancialConnectionAccount("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>disconnectAccount</summary>

<div>

Disconnect an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to disconnect an Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->disconnectAccount("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listAccountOwners</summary>

<div>

List Account Owners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAccountOwnersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `ownership` | <code>string</code> | Yes | The ID of the ownership object to fetch owners from. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BankConnectionsResourceOwnerList|error`

**Sample code:**

```ballerina
stripe:BankConnectionsResourceOwnerList result = check stripeClient->listAccountOwners("string", ownership = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "ownership": "string",
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "financial_connections.account_owner"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>refreshAccount</summary>

<div>

Refresh Account data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountRefreshBody</code> | Yes | Request payload to refresh Account data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->refreshAccount("string", {
    features: ["balance"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>subscribeAccount</summary>

<div>

Subscribe to data refreshes for an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>SubscribeAccountRequest</code> | Yes | Request payload to subscribe to data refreshes for an Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->subscribeAccount("string", {
    features: ["transactions"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>unsubscribeAccount</summary>

<div>

Unsubscribe from data refreshes for an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>UnsubscribeAccountRequest</code> | Yes | Request payload to unsubscribe from data refreshes for an Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->unsubscribeAccount("string", {
    features: ["transactions"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createFinancialConnectionSession</summary>

<div>

Create a Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>FinancialConnectionsSessionsBody</code> | Yes | Request payload to create a Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsSession|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsSession result = check stripeClient->createFinancialConnectionSession({
    accountHolder: {
        'type: "account",
        customerAccount: "string",
        account: "string"
    },
    permissions: ["balances"],
    expand: ["string"],
    prefetch: ["balances"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "permissions": [
    "balances"
  ],
  "accounts": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "institution_name": "Sample name",
        "supported_payment_method_types": [
          "link"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category": "cash",
        "subcategory": "checking",
        "object": "financial_connections.account",
        "status": "active"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "financial_connections.session",
  "prefetch": [
    "balances"
  ]
}
```

</div>
</details>

<details>
<summary>getFinancialConnectionSession</summary>

<div>

Retrieve a Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFinancialConnectionSessionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialConnectionsSession|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsSession result = check stripeClient->getFinancialConnectionSession("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "permissions": [
    "balances"
  ],
  "accounts": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "institution_name": "Sample name",
        "supported_payment_method_types": [
          "link"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category": "cash",
        "subcategory": "checking",
        "object": "financial_connections.account",
        "status": "active"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "financial_connections.session",
  "prefetch": [
    "balances"
  ]
}
```

</div>
</details>

<details>
<summary>listFinancialConnectionTransactions</summary>

<div>

List Transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListFinancialConnectionTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `transactedAt` | <code>TransactedAt</code> | No | A filter on the list based on the object `transacted_at` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with the following options:. |
| `transactionRefresh` | <code>TransactionRefreshParams</code> | No | A filter on the list based on the object `transaction_refresh` field. The value can be a dictionary with the following options:. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `account` | <code>string</code> | Yes | The ID of the Financial Connections Account whose transactions will be retrieved. |

**Returns:** `BankConnectionsResourceTransactionList|error`

**Sample code:**

```ballerina
stripe:BankConnectionsResourceTransactionList result = check stripeClient->listFinancialConnectionTransactions(account = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "transacted_at": 1,
      "transaction_refresh": "string",
      "livemode": false,
      "description": "Sample description",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "updated": 1,
      "account": "string",
      "object": "financial_connections.transaction",
      "status": "pending"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getFinancialConnectionTransaction</summary>

<div>

Retrieve a Transaction + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFinancialConnectionTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialConnectionsTransaction|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsTransaction result = check stripeClient->getFinancialConnectionTransaction("string");
```

**Sample response:**

```json
{
  "amount": 1,
  "transacted_at": 1,
  "transaction_refresh": "string",
  "livemode": false,
  "description": "Sample description",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "void_at": 1,
    "posted_at": 1
  },
  "updated": 1,
  "account": "string",
  "object": "financial_connections.transaction",
  "status": "pending"
}
```

</div>
</details>

#### Forwarding

<details>
<summary>listRequests</summary>

<div>

List all ForwardingRequests.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A pagination cursor to fetch the previous page of the list. The value must be a ForwardingRequest ID. |
| `expand` | <code>ListRequestsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>CreatedParam</code> | No | Similar to other List endpoints, filters results based on created timestamp. You can pass gt, gte, lt, and lte timestamp values. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A pagination cursor to fetch the next page of the list. The value must be a ForwardingRequest ID. |

**Returns:** `ForwardingRequestList|error`

**Sample code:**

```ballerina
stripe:ForwardingRequestList result = check stripeClient->listRequests();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "replacements": [
        "card_cvc"
      ],
      "payment_method": "string",
      "object": "forwarding.request"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createRequest</summary>

<div>

Create a ForwardingRequest.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateRequestRequest</code> | Yes | Request payload to create a ForwardingRequest. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ForwardingRequest|error`

**Sample code:**

```ballerina
stripe:ForwardingRequest result = check stripeClient->createRequest({
    replacements: ["card_cvc"],
    paymentMethod: "string",
    url: "https://example.com/resource",
    request: {
        headers: [{
            name: "Sample name",
            value: "string"
        }],
        body: "string"
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "replacements": [
    "card_cvc"
  ],
  "payment_method": "string",
  "object": "forwarding.request"
}
```

</div>
</details>

<details>
<summary>getRequest</summary>

<div>

Retrieve a ForwardingRequest.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetRequestQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ForwardingRequest|error`

**Sample code:**

```ballerina
stripe:ForwardingRequest result = check stripeClient->getRequest("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "replacements": [
    "card_cvc"
  ],
  "payment_method": "string",
  "object": "forwarding.request"
}
```

</div>
</details>

#### Identity

<details>
<summary>listVerificationReports</summary>

<div>

List VerificationReports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListVerificationReportsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `verificationSession` | <code>string</code> | No | Only return VerificationReports created by this VerificationSession ID. It is allowed to provide a VerificationIntent ID. |
| `created` | <code>Created15</code> | No | Only return VerificationReports that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `clientReferenceId` | <code>string</code> | No | A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"document"&#124;"id_number"</code> | No | Only return VerificationReports of this type. |

**Returns:** `GelatoVerificationReportList|error`

**Sample code:**

```ballerina
stripe:GelatoVerificationReportList result = check stripeClient->listVerificationReports();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "type": "document",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "identity.verification_report"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getVerificationReport</summary>

<div>

Retrieve a VerificationReport.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `report` | <code>string</code> | Yes | The report parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetVerificationReportQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IdentityVerificationReport|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationReport result = check stripeClient->getVerificationReport("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_report",
  "id_number": {
    "status": "unverified",
    "id_number_type": "br_cpf",
    "id_number": "INV-0001"
  }
}
```

</div>
</details>

<details>
<summary>listVerificationSessions</summary>

<div>

List VerificationSessions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListVerificationSessionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `relatedCustomerAccount` | <code>string</code> | No | The ID of the Account representing a customer. |
| `created` | <code>Created16</code> | No | Only return VerificationSessions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `clientReferenceId` | <code>string</code> | No | A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `relatedCustomer` | <code>string</code> | No | Customer ID. |
| `status` | <code>"canceled"&#124;"processing"&#124;"requires_input"&#124;"verified"</code> | No | Only return VerificationSessions with this status. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work). |

**Returns:** `GelatoVerificationSessionList|error`

**Sample code:**

```ballerina
stripe:GelatoVerificationSessionList result = check stripeClient->listVerificationSessions();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "created": 1,
      "type": "document",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "identity.verification_session",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createVerificationSession</summary>

<div>

Create a VerificationSession.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateVerificationSessionRequest</code> | Yes | Request payload to create a VerificationSession. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationSession|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationSession result = check stripeClient->createVerificationSession({
    providedDetails: {
        phone: "string",
        email: "user@example.com"
    },
    expand: ["string"],
    relatedCustomerAccount: "string",
    relatedPerson: {
        person: "string",
        account: "string"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_session",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getVerificationSession</summary>

<div>

Retrieve a VerificationSession.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetVerificationSessionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IdentityVerificationSession|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationSession result = check stripeClient->getVerificationSession("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_session",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>updateVerificationSession</summary>

<div>

Update a VerificationSession.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `payload` | <code>UpdateVerificationSessionRequest</code> | Yes | Request payload to update a VerificationSession. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationSession|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationSession result = check stripeClient->updateVerificationSession("string", {
    providedDetails: {
        phone: "string",
        email: "user@example.com"
    },
    expand: ["string"],
    options: {
        document: ""
    },
    'type: "document"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_session",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelVerificationSession</summary>

<div>

Cancel a VerificationSession.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel a VerificationSession. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationSession|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationSession result = check stripeClient->cancelVerificationSession("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_session",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>redactVerificationSession</summary>

<div>

Redact a VerificationSession.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to redact a VerificationSession. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IdentityVerificationSession|error`

**Sample code:**

```ballerina
stripe:IdentityVerificationSession result = check stripeClient->redactVerificationSession("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "type": "document",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "identity.verification_session",
  "status": "canceled"
}
```

</div>
</details>

#### Invoice payments

<details>
<summary>listInvoicePayments</summary>

<div>

List all payments for an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInvoicePaymentsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created17</code> | No | Only return invoice payments that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `payment` | <code>PaymentParam</code> | No | The payment details of the invoice payments to return. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `invoice` | <code>string</code> | No | The identifier of the invoice whose payments to return. |
| `status` | <code>"canceled"&#124;"open"&#124;"paid"</code> | No | The status of the invoice payments to return. |

**Returns:** `InvoicesPaymentsListInvoicePayments|error`

**Sample code:**

```ballerina
stripe:InvoicesPaymentsListInvoicePayments result = check stripeClient->listInvoicePayments();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "amount_requested": 1,
      "created": 1,
      "currency": "string",
      "payment": {
        "type": "charge"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "invoice": "string",
      "status_transitions": {},
      "is_default": false,
      "object": "invoice_payment",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getInvoicePayment</summary>

<div>

Retrieve an InvoicePayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoicePayment` | <code>string</code> | Yes | The invoice payment parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInvoicePaymentQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `InvoicePayment|error`

**Sample code:**

```ballerina
stripe:InvoicePayment result = check stripeClient->getInvoicePayment("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "amount_requested": 1,
  "created": 1,
  "currency": "string",
  "payment": {
    "type": "charge",
    "charge": "string",
    "payment_intent": "string"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice": "string",
  "status_transitions": {
    "paid_at": 1,
    "canceled_at": 1
  },
  "is_default": false,
  "object": "invoice_payment",
  "status": "string"
}
```

</div>
</details>

#### Invoice rendering templates

<details>
<summary>listInvoiceRenderingTemplates</summary>

<div>

List all invoice rendering templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInvoiceRenderingTemplatesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"active"&#124;"archived"</code> | No | The status parameter. |

**Returns:** `InvoiceRenderingTemplatesList|error`

**Sample code:**

```ballerina
stripe:InvoiceRenderingTemplatesList result = check stripeClient->listInvoiceRenderingTemplates();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "version": 1,
      "object": "invoice_rendering_template",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getInvoiceRenderingTemplate</summary>

<div>

Retrieve an invoice rendering template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `template` | <code>string</code> | Yes | The template parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInvoiceRenderingTemplateQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `version` | <code>int</code> | No | The version parameter. |

**Returns:** `InvoiceRenderingTemplate|error`

**Sample code:**

```ballerina
stripe:InvoiceRenderingTemplate result = check stripeClient->getInvoiceRenderingTemplate("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "object": "invoice_rendering_template",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>archiveInvoiceRenderingTemplate</summary>

<div>

Archive an invoice rendering template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `template` | <code>string</code> | Yes | The template parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to archive an invoice rendering template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvoiceRenderingTemplate|error`

**Sample code:**

```ballerina
stripe:InvoiceRenderingTemplate result = check stripeClient->archiveInvoiceRenderingTemplate("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "object": "invoice_rendering_template",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>unarchiveInvoiceRenderingTemplate</summary>

<div>

Unarchive an invoice rendering template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `template` | <code>string</code> | Yes | The template parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to unarchive an invoice rendering template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InvoiceRenderingTemplate|error`

**Sample code:**

```ballerina
stripe:InvoiceRenderingTemplate result = check stripeClient->unarchiveInvoiceRenderingTemplate("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "version": 1,
  "object": "invoice_rendering_template",
  "status": "active"
}
```

</div>
</details>

#### Invoice items

<details>
<summary>listInvoiceitems</summary>

<div>

List all invoice items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | The identifier of the account representing the customer whose invoice items to return. If none is provided, returns all invoice items. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInvoiceitemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created18</code> | No | Only return invoice items that were created during the given date interval. |
| `pending` | <code>boolean</code> | No | Set to `true` to only show pending invoice items, which are not yet attached to any invoices. Set to `false` to only show invoice items already attached to invoices. If unspecified, no filter is applied. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `invoice` | <code>string</code> | No | Only return invoice items belonging to this invoice. If none is provided, all invoice items will be returned. If specifying an invoice, no customer identifier is needed. |
| `customer` | <code>string</code> | No | The identifier of the customer whose invoice items to return. If none is provided, returns all invoice items. |

**Returns:** `InvoicesItemsList|error`

**Sample code:**

```ballerina
stripe:InvoicesItemsList result = check stripeClient->listInvoiceitems();
```

**Sample response:**

```json
{
  "data": [
    {
      "date": 1,
      "livemode": false,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discountable": false,
      "amount": 1,
      "period": {
        "start": 1,
        "end": 1
      },
      "quantity": 1,
      "proration": false,
      "quantity_decimal": "string",
      "customer": "string",
      "object": "invoiceitem"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createInvoiceitem</summary>

<div>

Create an invoice item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateInvoiceitemRequest</code> | Yes | Request payload to create an invoice item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoiceitem|error`

**Sample code:**

```ballerina
stripe:Invoiceitem result = check stripeClient->createInvoiceitem({
    customerAccount: "string",
    taxBehavior: "exclusive",
    amount: 1,
    metadata: ""
});
```

**Sample response:**

```json
{
  "date": 1,
  "livemode": false,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountable": false,
  "amount": 1,
  "period": {
    "start": 1,
    "end": 1
  },
  "quantity": 1,
  "proration": false,
  "quantity_decimal": "string",
  "customer": "string",
  "object": "invoiceitem"
}
```

</div>
</details>

<details>
<summary>getInvoiceitem</summary>

<div>

Retrieve an invoice item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceitem` | <code>string</code> | Yes | The invoiceitem parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInvoiceitemQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Invoiceitem|error`

**Sample code:**

```ballerina
stripe:Invoiceitem result = check stripeClient->getInvoiceitem("string");
```

**Sample response:**

```json
{
  "date": 1,
  "livemode": false,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountable": false,
  "amount": 1,
  "period": {
    "start": 1,
    "end": 1
  },
  "quantity": 1,
  "proration": false,
  "quantity_decimal": "string",
  "customer": "string",
  "object": "invoiceitem"
}
```

</div>
</details>

<details>
<summary>updateInvoiceitem</summary>

<div>

Update an invoice item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceitem` | <code>string</code> | Yes | The invoiceitem parameter. |
| `payload` | <code>UpdateInvoiceitemRequest</code> | Yes | Request payload to update an invoice item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoiceitem|error`

**Sample code:**

```ballerina
stripe:Invoiceitem result = check stripeClient->updateInvoiceitem("string", {
    taxBehavior: "exclusive",
    amount: 1,
    metadata: "",
    period: {
        'start: 1,
        end: 1
    }
});
```

**Sample response:**

```json
{
  "date": 1,
  "livemode": false,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountable": false,
  "amount": 1,
  "period": {
    "start": 1,
    "end": 1
  },
  "quantity": 1,
  "proration": false,
  "quantity_decimal": "string",
  "customer": "string",
  "object": "invoiceitem"
}
```

</div>
</details>

<details>
<summary>deleteInvoiceitem</summary>

<div>

Delete an invoice item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceitem` | <code>string</code> | Yes | The invoiceitem parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedInvoiceitem|error`

**Sample code:**

```ballerina
stripe:DeletedInvoiceitem result = check stripeClient->deleteInvoiceitem("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "invoiceitem"
}
```

</div>
</details>

#### Invoices

<details>
<summary>listInvoices</summary>

<div>

List all invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return invoices for the account representing the customer specified by this account ID. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInvoicesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created19</code> | No | Only return invoices that were created during the given date interval. |
| `collectionMethod` | <code>"charge_automatically"&#124;"send_invoice"</code> | No | The collection method of the invoice to retrieve. Either `charge_automatically` or `send_invoice`. |
| `dueDate` | <code>DueDate</code> | No | The due date parameter. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `subscription` | <code>string</code> | No | Only return invoices for the subscription specified by this subscription ID. |
| `customer` | <code>string</code> | No | Only return invoices for the customer specified by this customer ID. |
| `status` | <code>"draft"&#124;"open"&#124;"paid"&#124;"uncollectible"&#124;"void"</code> | No | The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview). |

**Returns:** `InvoicesResourceList|error`

**Sample code:**

```ballerina
stripe:InvoicesResourceList result = check stripeClient->listInvoices();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_paid": 1,
      "amount_remaining": 1,
      "livemode": false,
      "amount_shipping": 1,
      "issuer": {
        "type": "account"
      },
      "auto_advance": false,
      "discounts": [
        "string"
      ],
      "period_start": 1,
      "amount_due": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payment_settings": {},
      "created": 1,
      "period_end": 1,
      "subtotal": 1,
      "amount_overpaid": 1,
      "object": "invoice",
      "amount_paid_off_stripe": 1,
      "starting_balance": 1,
      "total": 1,
      "pre_payment_credit_notes_amount": 1,
      "currency": "string",
      "lines": {
        "data": [
          {
            "amount": 1,
            "metadata": {},
            "period": {
              "start": 1,
              "end": 1
            },
            "livemode": false,
            "discounts": [
              "string"
            ],
            "subtotal": 1,
            "currency": "string",
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "discountable": false,
            "object": "line_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "attempt_count": 1,
      "default_tax_rates": [
        {
          "inclusive": false,
          "livemode": false,
          "created": 1,
          "active": false,
          "display_name": "Sample name",
          "percentage": 100.00,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "tax_rate"
        }
      ],
      "post_payment_credit_notes_amount": 1,
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "attempted": false,
      "status_transitions": {},
      "customer": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createInvoice</summary>

<div>

Create an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateInvoiceRequest</code> | Yes | Request payload to create an invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->createInvoice({
    metadata: "",
    footer: "string",
    shippingDetails: {
        address: {},
        name: "Sample name",
        phone: ""
    },
    daysUntilDue: 1
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>createPreviewInvoice</summary>

<div>

Create a preview invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePreviewInvoiceRequest</code> | Yes | Request payload to create a preview invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->createPreviewInvoice({
    scheduleDetails: {
        billingMode: {
            'type: "classic"
        },
        endBehavior: "cancel",
        prorationBehavior: "always_invoice"
    },
    customerAccount: "string",
    invoiceItems: [{
        taxBehavior: "exclusive",
        amount: 1,
        metadata: ""
    }],
    onBehalfOf: ""
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>searchInvoices</summary>

<div>

Search invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchInvoicesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for invoices](https://docs.stripe.com/search#query-fields-for-invoices). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult2|error`

**Sample code:**

```ballerina
stripe:SearchResult2 result = check stripeClient->searchInvoices(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_paid": 1,
      "amount_remaining": 1,
      "livemode": false,
      "amount_shipping": 1,
      "issuer": {
        "type": "account"
      },
      "auto_advance": false,
      "discounts": [
        "string"
      ],
      "period_start": 1,
      "amount_due": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payment_settings": {},
      "created": 1,
      "period_end": 1,
      "subtotal": 1,
      "amount_overpaid": 1,
      "object": "invoice",
      "amount_paid_off_stripe": 1,
      "starting_balance": 1,
      "total": 1,
      "pre_payment_credit_notes_amount": 1,
      "currency": "string",
      "lines": {
        "data": [
          {
            "amount": 1,
            "metadata": {},
            "period": {
              "start": 1,
              "end": 1
            },
            "livemode": false,
            "discounts": [
              "string"
            ],
            "subtotal": 1,
            "currency": "string",
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "discountable": false,
            "object": "line_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "attempt_count": 1,
      "default_tax_rates": [
        {
          "inclusive": false,
          "livemode": false,
          "created": 1,
          "active": false,
          "display_name": "Sample name",
          "percentage": 100.00,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "tax_rate"
        }
      ],
      "post_payment_credit_notes_amount": 1,
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "attempted": false,
      "status_transitions": {},
      "customer": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getInvoice</summary>

<div>

Retrieve an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInvoiceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->getInvoice("string");
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>updateInvoice</summary>

<div>

Update an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>UpdateInvoiceRequest</code> | Yes | Request payload to update an invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->updateInvoice("string", {
    metadata: "",
    footer: "string",
    shippingDetails: "",
    daysUntilDue: 1
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>deleteInvoice</summary>

<div>

Delete a draft invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedInvoice|error`

**Sample code:**

```ballerina
stripe:DeletedInvoice result = check stripeClient->deleteInvoice("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "invoice"
}
```

</div>
</details>

<details>
<summary>addLinesInvoice</summary>

<div>

Bulk add invoice line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>AddLinesInvoiceRequest</code> | Yes | Request payload to bulk add invoice line items. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->addLinesInvoice("string", {
    lines: [{
        amount: 1,
        metadata: "",
        period: {
            'start: 1,
            end: 1
        }
    }],
    invoiceMetadata: "",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>attachPaymentInvoice</summary>

<div>

Attach a payment to an Invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>AttachPaymentInvoiceRequest</code> | Yes | Request payload to attach a payment to an Invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->attachPaymentInvoice("string", {
    expand: ["string"],
    paymentIntent: "string",
    paymentRecord: "string"
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>finalizeInvoice</summary>

<div>

Finalize an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>FinalizeInvoiceRequest</code> | Yes | Request payload to finalize an invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->finalizeInvoice("string", {
    expand: ["string"],
    autoAdvance: false
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>listInvoiceLines</summary>

<div>

Retrieve an invoice's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListInvoiceLinesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `InvoiceLinesList|error`

**Sample code:**

```ballerina
stripe:InvoiceLinesList result = check stripeClient->listInvoiceLines("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "metadata": {},
      "period": {
        "start": 1,
        "end": 1
      },
      "livemode": false,
      "discounts": [
        "string"
      ],
      "subtotal": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "discountable": false,
      "object": "line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>updateLine</summary>

<div>

Update an invoice's line item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `lineItemId` | <code>string</code> | Yes | Invoice line item ID. |
| `payload` | <code>UpdateLineRequest</code> | Yes | Request payload to update an invoice's line item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `LineItem1|error`

**Sample code:**

```ballerina
stripe:LineItem1 result = check stripeClient->updateLine("string", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 1,
    metadata: "",
    period: {
        'start: 1,
        end: 1
    },
    priceData: {
        currency: "string",
        taxBehavior: "exclusive",
        product: "string"
    }
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "period": {
    "start": 1,
    "end": 1
  },
  "livemode": false,
  "discounts": [
    "string"
  ],
  "subtotal": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "discountable": false,
  "object": "line_item"
}
```

</div>
</details>

<details>
<summary>markUncollectibleInvoice</summary>

<div>

Mark an invoice as uncollectible.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to mark an invoice as uncollectible. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->markUncollectibleInvoice("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>payInvoice</summary>

<div>

Pay an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>PayInvoiceRequest</code> | Yes | Request payload to pay an invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->payInvoice("string", {
    expand: ["string"],
    mandate: "",
    paidOutOfBand: false,
    forgive: false
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>removeLinesInvoice</summary>

<div>

Bulk remove invoice line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>RemoveLinesInvoiceRequest</code> | Yes | Request payload to bulk remove invoice line items. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->removeLinesInvoice("string", {
    lines: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        behavior: "delete"
    }],
    invoiceMetadata: "",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>sendInvoice</summary>

<div>

Send an invoice for manual payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to send an invoice for manual payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->sendInvoice("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>updateLinesInvoice</summary>

<div>

Bulk update invoice line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>UpdateLinesInvoiceRequest</code> | Yes | Request payload to bulk update invoice line items. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->updateLinesInvoice("string", {
    lines: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        amount: 1,
        metadata: ""
    }],
    invoiceMetadata: "",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>voidInvoice</summary>

<div>

Void an invoice.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoice` | <code>string</code> | Yes | Invoice ID of line item. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to void an invoice. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Invoice|error`

**Sample code:**

```ballerina
stripe:Invoice result = check stripeClient->voidInvoice("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount_paid": 1,
  "amount_remaining": 1,
  "livemode": false,
  "amount_shipping": 1,
  "issuer": {
    "type": "account",
    "account": "string"
  },
  "auto_advance": false,
  "discounts": [
    "string"
  ],
  "period_start": 1,
  "amount_due": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_settings": {
    "default_mandate": "2026-01-15T00:00:00",
    "payment_method_types": [
      "ach_credit_transfer"
    ]
  },
  "created": 1,
  "period_end": 1,
  "subtotal": 1,
  "amount_overpaid": 1,
  "object": "invoice",
  "amount_paid_off_stripe": 1,
  "starting_balance": 1,
  "total": 1,
  "pre_payment_credit_notes_amount": 1,
  "currency": "string",
  "lines": {
    "data": [
      {
        "amount": 1,
        "metadata": {},
        "period": {
          "start": 1,
          "end": 1
        },
        "livemode": false,
        "discounts": [
          "string"
        ],
        "subtotal": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "discountable": false,
        "object": "line_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "attempt_count": 1,
  "default_tax_rates": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "post_payment_credit_notes_amount": 1,
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "attempted": false,
  "status_transitions": {
    "finalized_at": 1,
    "paid_at": 1,
    "voided_at": 1
  },
  "customer": "string"
}
```

</div>
</details>

#### Issuing

<details>
<summary>listAuthorizations</summary>

<div>

List all authorizations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAuthorizationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created20</code> | No | Only return authorizations that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `cardholder` | <code>string</code> | No | Only return authorizations that belong to the given cardholder. |
| `card` | <code>string</code> | No | Only return authorizations that belong to the given card. |
| `status` | <code>"closed"&#124;"expired"&#124;"pending"&#124;"reversed"</code> | No | Only return authorizations with the given status. One of `pending`, `closed`, or `reversed`. |

**Returns:** `IssuingAuthorizationList|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorizationList result = check stripeClient->listAuthorizations();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "approved": false,
      "balance_transactions": [
        {
          "amount": 1,
          "available_on": 1,
          "created": 1,
          "fee": 1,
          "reporting_category": "string",
          "fee_details": [
            {
              "amount": 1,
              "currency": "string",
              "type": "string"
            }
          ],
          "type": "adjustment",
          "balance_type": "issuing",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "net": 1,
          "object": "balance_transaction",
          "status": "string"
        }
      ],
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "merchant_amount": 1,
      "amount": 1,
      "request_history": [
        {
          "merchant_amount": 1,
          "reason": "account_disabled",
          "amount": 1,
          "approved": false,
          "created": 1,
          "merchant_currency": "string",
          "currency": "string"
        }
      ],
      "verification_data": {
        "cvc_check": "match",
        "expiry_check": "match",
        "address_line1_check": "match",
        "address_postal_code_check": "match"
      },
      "created": 1,
      "transactions": [
        {
          "merchant_amount": 1,
          "amount": 1,
          "metadata": {},
          "livemode": false,
          "created": 1,
          "merchant_data": {
            "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "category_code": "200",
            "category": "string"
          },
          "merchant_currency": "string",
          "type": "capture",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "card": "string",
          "object": "issuing.transaction"
        }
      ],
      "authorization_method": "chip",
      "card": {
        "last4": "string",
        "metadata": {},
        "livemode": false,
        "exp_month": 1,
        "exp_year": 1,
        "type": "physical",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "brand": "string",
        "spending_controls": {},
        "created": 1,
        "cardholder": {
          "metadata": {},
          "requirements": {},
          "livemode": false,
          "created": 1,
          "type": "company",
          "billing": {
            "address": {}
          },
          "name": "Sample name",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "issuing.cardholder",
          "status": "active"
        },
        "object": "issuing.card",
        "status": "active"
      },
      "object": "issuing.authorization",
      "status": "closed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getAuthorization</summary>

<div>

Retrieve an authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAuthorizationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->getAuthorization("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>updateAuthorization</summary>

<div>

Update an authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update an authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->updateAuthorization("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>approveAuthorization</summary>

<div>

**Deprecated.** Approve an authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>ApproveAuthorizationRequest</code> | Yes | Request payload to approve an authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->approveAuthorization("string", {
    amount: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>declineAuthorization</summary>

<div>

**Deprecated.** Decline an authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to decline an authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->declineAuthorization("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>listCardholders</summary>

<div>

List all cardholders.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCardholdersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created21</code> | No | Only return cardholders that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `phoneNumber` | <code>string</code> | No | Only return cardholders that have the given phone number. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"company"&#124;"individual"</code> | No | Only return cardholders that have the given type. One of `individual` or `company`. |
| `email` | <code>string</code> | No | Only return cardholders that have the given email address. |
| `status` | <code>"active"&#124;"blocked"&#124;"inactive"</code> | No | Only return cardholders that have the given status. One of `active`, `inactive`, or `blocked`. |

**Returns:** `IssuingCardholderList|error`

**Sample code:**

```ballerina
stripe:IssuingCardholderList result = check stripeClient->listCardholders();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCardholder</summary>

<div>

Create a cardholder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCardholderRequest</code> | Yes | Request payload to create a cardholder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCardholder|error`

**Sample code:**

```ballerina
stripe:IssuingCardholder result = check stripeClient->createCardholder({
    name: "Sample name",
    billing: {
        address: {
            country: "string",
            city: "string",
            postalCode: "200",
            line1: "string"
        }
    },
    preferredLocales: ["de"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "requirements": {
    "past_due": [
      "company.tax_id"
    ],
    "disabled_reason": "listed"
  },
  "livemode": false,
  "created": 1,
  "type": "company",
  "billing": {
    "address": {}
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.cardholder",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getCardholder</summary>

<div>

Retrieve a cardholder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cardholder` | <code>string</code> | Yes | The cardholder parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCardholderQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingCardholder|error`

**Sample code:**

```ballerina
stripe:IssuingCardholder result = check stripeClient->getCardholder("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "requirements": {
    "past_due": [
      "company.tax_id"
    ],
    "disabled_reason": "listed"
  },
  "livemode": false,
  "created": 1,
  "type": "company",
  "billing": {
    "address": {}
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.cardholder",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateCardholder</summary>

<div>

Update a cardholder.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cardholder` | <code>string</code> | Yes | The cardholder parameter. |
| `payload` | <code>UpdateCardholderRequest</code> | Yes | Request payload to update a cardholder. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCardholder|error`

**Sample code:**

```ballerina
stripe:IssuingCardholder result = check stripeClient->updateCardholder("string", {
    preferredLocales: ["de"],
    expand: ["string"],
    individual: {
        dob: {
            month: 1,
            year: 1,
            day: 1
        },
        lastName: "Sample name",
        firstName: "Sample name"
    },
    spendingControls: {
        allowedCategories: ["ac_refrigeration_repair"],
        blockedMerchantCountries: ["string"],
        blockedCategories: ["ac_refrigeration_repair"]
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "requirements": {
    "past_due": [
      "company.tax_id"
    ],
    "disabled_reason": "listed"
  },
  "livemode": false,
  "created": 1,
  "type": "company",
  "billing": {
    "address": {}
  },
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.cardholder",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listIssuingCards</summary>

<div>

List all cards.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `last4` | <code>string</code> | No | Only return cards that have the given last four digits. |
| `expand` | <code>ListIssuingCardsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `personalizationDesign` | <code>string</code> | No | The personalization design parameter. |
| `created` | <code>Created22</code> | No | Only return cards that were issued during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `expMonth` | <code>int</code> | No | Only return cards that have the given expiration month. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `expYear` | <code>int</code> | No | Only return cards that have the given expiration year. |
| `cardholder` | <code>string</code> | No | Only return cards belonging to the Cardholder with the provided ID. |
| `'type` | <code>"physical"&#124;"virtual"</code> | No | Only return cards that have the given type. One of `virtual` or `physical`. |
| `status` | <code>"active"&#124;"canceled"&#124;"inactive"</code> | No | Only return cards that have the given status. One of `active`, `inactive`, or `canceled`. |

**Returns:** `IssuingCardList|error`

**Sample code:**

```ballerina
stripe:IssuingCardList result = check stripeClient->listIssuingCards();
```

**Sample response:**

```json
{
  "data": [
    {
      "last4": "string",
      "metadata": {},
      "livemode": false,
      "exp_month": 1,
      "exp_year": 1,
      "type": "physical",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "brand": "string",
      "spending_controls": {},
      "created": 1,
      "cardholder": {
        "metadata": {},
        "requirements": {},
        "livemode": false,
        "created": 1,
        "type": "company",
        "billing": {
          "address": {}
        },
        "name": "Sample name",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "issuing.cardholder",
        "status": "active"
      },
      "object": "issuing.card",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createIssuingCard</summary>

<div>

Create a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateIssuingCardRequest</code> | Yes | Request payload to create a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createIssuingCard({
    'type: "physical",
    currency: "string",
    financialAccount: "string",
    spendingControls: {
        allowedCategories: ["ac_refrigeration_repair"],
        blockedMerchantCountries: ["string"],
        blockedCategories: ["ac_refrigeration_repair"]
    }
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getIssuingCard</summary>

<div>

Retrieve a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetIssuingCardQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->getIssuingCard("string");
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateIssuingCard</summary>

<div>

Update a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>UpdateIssuingCardRequest</code> | Yes | Request payload to update a card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->updateIssuingCard("string", {
    expand: ["string"],
    metadata: "",
    personalizationDesign: "string",
    pin: {
        encryptedNumber: "INV-0001"
    }
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listIssuingDisputes</summary>

<div>

List all disputes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListIssuingDisputesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created23</code> | No | Only return Issuing disputes that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'transaction` | <code>string</code> | No | Select the Issuing dispute for the given transaction. |
| `status` | <code>"expired"&#124;"lost"&#124;"submitted"&#124;"unsubmitted"&#124;"won"</code> | No | Select Issuing disputes with the given status. |

**Returns:** `IssuingDisputeList|error`

**Sample code:**

```ballerina
stripe:IssuingDisputeList result = check stripeClient->listIssuingDisputes();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "metadata": {},
      "evidence": {
        "reason": "canceled"
      },
      "livemode": false,
      "created": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "transaction": "string",
      "object": "issuing.dispute",
      "status": "expired"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createIssuingDispute</summary>

<div>

Create a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateIssuingDisputeRequest</code> | Yes | Request payload to create a dispute. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingDispute|error`

**Sample code:**

```ballerina
stripe:IssuingDispute result = check stripeClient->createIssuingDispute({
    amount: 1,
    expand: ["string"],
    evidence: {
        canceled: "",
        reason: "canceled",
        other: ""
    },
    treasury: {
        receivedDebit: "string"
    }
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "evidence": {
    "reason": "canceled"
  },
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transaction": "string",
  "object": "issuing.dispute",
  "status": "expired"
}
```

</div>
</details>

<details>
<summary>getIssuingDispute</summary>

<div>

Retrieve a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetIssuingDisputeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingDispute|error`

**Sample code:**

```ballerina
stripe:IssuingDispute result = check stripeClient->getIssuingDispute("string");
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "evidence": {
    "reason": "canceled"
  },
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transaction": "string",
  "object": "issuing.dispute",
  "status": "expired"
}
```

</div>
</details>

<details>
<summary>updateIssuingDispute</summary>

<div>

Update a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `payload` | <code>UpdateIssuingDisputeRequest</code> | Yes | Request payload to update a dispute. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingDispute|error`

**Sample code:**

```ballerina
stripe:IssuingDispute result = check stripeClient->updateIssuingDispute("string", {
    amount: 1,
    expand: ["string"],
    metadata: "",
    evidence: {
        canceled: "",
        reason: "canceled",
        other: ""
    }
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "evidence": {
    "reason": "canceled"
  },
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transaction": "string",
  "object": "issuing.dispute",
  "status": "expired"
}
```

</div>
</details>

<details>
<summary>submitDispute</summary>

<div>

Submit a dispute.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dispute` | <code>string</code> | Yes | The dispute parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to submit a dispute. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingDispute|error`

**Sample code:**

```ballerina
stripe:IssuingDispute result = check stripeClient->submitDispute("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "evidence": {
    "reason": "canceled"
  },
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transaction": "string",
  "object": "issuing.dispute",
  "status": "expired"
}
```

</div>
</details>

<details>
<summary>listPersonalizationDesigns</summary>

<div>

List all personalization designs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPersonalizationDesignsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `preferences` | <code>PreferencesListParam</code> | No | Only return personalization designs with the given preferences. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `lookupKeys` | <code>ListPersonalizationDesignsQueriesLookupkeysItemsString[]</code> | No | Only return personalization designs with the given lookup keys. |
| `status` | <code>"active"&#124;"inactive"&#124;"rejected"&#124;"review"</code> | No | Only return personalization designs with the given status. |

**Returns:** `IssuingPersonalizationDesignList|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesignList result = check stripeClient->listPersonalizationDesigns();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "preferences": {
        "is_default": false
      },
      "livemode": false,
      "created": 1,
      "rejection_reasons": {},
      "physical_bundle": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.personalization_design",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPersonalizationDesign</summary>

<div>

Create a personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePersonalizationDesignRequest</code> | Yes | Request payload to create a personalization design. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->createPersonalizationDesign({
    physicalBundle: "string",
    expand: ["string"],
    preferences: {
        isDefault: false
    },
    carrierText: {
        footerBody: "",
        headerTitle: "",
        headerBody: ""
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getPersonalizationDesign</summary>

<div>

Retrieve a personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personalizationDesign` | <code>string</code> | Yes | The personalization design parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPersonalizationDesignQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->getPersonalizationDesign("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updatePersonalizationDesign</summary>

<div>

Update a personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personalizationDesign` | <code>string</code> | Yes | The personalization design parameter. |
| `payload` | <code>UpdatePersonalizationDesignRequest</code> | Yes | Request payload to update a personalization design. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->updatePersonalizationDesign("string", {
    expand: ["string"],
    preferences: {
        isDefault: false
    },
    carrierText: "",
    name: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listPhysicalBundles</summary>

<div>

List all physical bundles.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPhysicalBundlesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"custom"&#124;"standard"</code> | No | Only return physical bundles with the given type. |
| `status` | <code>"active"&#124;"inactive"&#124;"review"</code> | No | Only return physical bundles with the given status. |

**Returns:** `IssuingPhysicalBundleList|error`

**Sample code:**

```ballerina
stripe:IssuingPhysicalBundleList result = check stripeClient->listPhysicalBundles();
```

**Sample response:**

```json
{
  "data": [
    {
      "features": {
        "second_line": "optional",
        "carrier_text": "optional",
        "card_logo": "optional"
      },
      "livemode": false,
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "custom",
      "object": "issuing.physical_bundle",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getPhysicalBundle</summary>

<div>

Retrieve a physical bundle.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `physicalBundle` | <code>string</code> | Yes | The physical bundle parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPhysicalBundleQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingPhysicalBundle|error`

**Sample code:**

```ballerina
stripe:IssuingPhysicalBundle result = check stripeClient->getPhysicalBundle("string");
```

**Sample response:**

```json
{
  "features": {
    "second_line": "optional",
    "carrier_text": "optional",
    "card_logo": "optional"
  },
  "livemode": false,
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "custom",
  "object": "issuing.physical_bundle",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getSettlement</summary>

<div>

Retrieve a settlement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `settlement` | <code>string</code> | Yes | The settlement token to mark as complete. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSettlementQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingSettlement|error`

**Sample code:**

```ballerina
stripe:IssuingSettlement result = check stripeClient->getSettlement("string");
```

**Sample response:**

```json
{
  "clearing_date": 1,
  "metadata": {},
  "interchange_fees_amount": 1,
  "livemode": false,
  "bin": "string",
  "created": 1,
  "transaction_amount": 1,
  "transaction_count": 1,
  "settlement_service": "string",
  "network": "maestro",
  "net_total_amount": 1,
  "network_settlement_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "network_fees_amount": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.settlement",
  "status": "complete"
}
```

</div>
</details>

<details>
<summary>updateSettlement</summary>

<div>

Update a settlement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `settlement` | <code>string</code> | Yes | The settlement token to mark as complete. |
| `payload` | <code>SettlementssettlementBody</code> | Yes | Request payload to update a settlement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingSettlement|error`

**Sample code:**

```ballerina
stripe:IssuingSettlement result = check stripeClient->updateSettlement("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "clearing_date": 1,
  "metadata": {},
  "interchange_fees_amount": 1,
  "livemode": false,
  "bin": "string",
  "created": 1,
  "transaction_amount": 1,
  "transaction_count": 1,
  "settlement_service": "string",
  "network": "maestro",
  "net_total_amount": 1,
  "network_settlement_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "network_fees_amount": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.settlement",
  "status": "complete"
}
```

</div>
</details>

<details>
<summary>listTokens</summary>

<div>

List all issuing tokens for card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTokensQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created24</code> | No | Only return Issuing tokens that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `card` | <code>string</code> | Yes | The Issuing card identifier to list tokens for. |
| `status` | <code>"active"&#124;"deleted"&#124;"requested"&#124;"suspended"</code> | No | Select Issuing tokens with the given status. |

**Returns:** `IssuingNetworkTokenList|error`

**Sample code:**

```ballerina
stripe:IssuingNetworkTokenList result = check stripeClient->listTokens(card = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "network_updated_at": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "network": "mastercard",
      "object": "issuing.token",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getIssuingToken</summary>

<div>

Retrieve an issuing token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | <code>string</code> | Yes | The token parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetIssuingTokenQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingToken|error`

**Sample code:**

```ballerina
stripe:IssuingToken result = check stripeClient->getIssuingToken("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "network_updated_at": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "network": "mastercard",
  "object": "issuing.token",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateToken</summary>

<div>

Update a token status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | <code>string</code> | Yes | The token parameter. |
| `payload` | <code>UpdateTokenRequest</code> | Yes | Request payload to update a token status. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingToken|error`

**Sample code:**

```ballerina
stripe:IssuingToken result = check stripeClient->updateToken("string", {
    status: "active",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "network_updated_at": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "network": "mastercard",
  "object": "issuing.token",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listIssuingTransactions</summary>

<div>

List all transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListIssuingTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created25</code> | No | Only return transactions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `cardholder` | <code>string</code> | No | Only return transactions that belong to the given cardholder. |
| `'type` | <code>"capture"&#124;"refund"</code> | No | Only return transactions that have the given type. One of `capture` or `refund`. |
| `card` | <code>string</code> | No | Only return transactions that belong to the given card. |

**Returns:** `IssuingTransactionList|error`

**Sample code:**

```ballerina
stripe:IssuingTransactionList result = check stripeClient->listIssuingTransactions();
```

**Sample response:**

```json
{
  "data": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getIssuingTransaction</summary>

<div>

Retrieve a transaction + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetIssuingTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `IssuingTransaction|error`

**Sample code:**

```ballerina
stripe:IssuingTransaction result = check stripeClient->getIssuingTransaction("string");
```

**Sample response:**

```json
{
  "merchant_amount": 1,
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "type": "capture",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "object": "issuing.transaction"
}
```

</div>
</details>

<details>
<summary>updateTransaction</summary>

<div>

Update a transaction + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update a transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingTransaction|error`

**Sample code:**

```ballerina
stripe:IssuingTransaction result = check stripeClient->updateTransaction("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "merchant_amount": 1,
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "type": "capture",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "object": "issuing.transaction"
}
```

</div>
</details>

#### Link account sessions

<details>
<summary>createLinkAccountSession</summary>

<div>

Create a Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>FinancialConnectionsSessionsBody</code> | Yes | Request payload to create a Session. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsSession|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsSession result = check stripeClient->createLinkAccountSession({
    accountHolder: {
        'type: "account",
        customerAccount: "string",
        account: "string"
    },
    permissions: ["balances"],
    expand: ["string"],
    prefetch: ["balances"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "permissions": [
    "balances"
  ],
  "accounts": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "institution_name": "Sample name",
        "supported_payment_method_types": [
          "link"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category": "cash",
        "subcategory": "checking",
        "object": "financial_connections.account",
        "status": "active"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "financial_connections.session",
  "prefetch": [
    "balances"
  ]
}
```

</div>
</details>

<details>
<summary>getLinkAccountSession</summary>

<div>

Retrieve a Session.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `session` | <code>string</code> | Yes | The session parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetLinkAccountSessionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialConnectionsSession|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsSession result = check stripeClient->getLinkAccountSession("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "permissions": [
    "balances"
  ],
  "accounts": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "institution_name": "Sample name",
        "supported_payment_method_types": [
          "link"
        ],
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category": "cash",
        "subcategory": "checking",
        "object": "financial_connections.account",
        "status": "active"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "financial_connections.session",
  "prefetch": [
    "balances"
  ]
}
```

</div>
</details>

#### Linked accounts

<details>
<summary>listLinkedAccounts</summary>

<div>

List Accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListLinkedAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `accountHolder` | <code>AccountholderParams</code> | No | If present, only return accounts that belong to the specified account holder. `account_holder[customer]` and `account_holder[account]` are mutually exclusive. |
| `session` | <code>string</code> | No | If present, only return accounts that were collected as part of the given session. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BankConnectionsResourceLinkedAccountList|error`

**Sample code:**

```ballerina
stripe:BankConnectionsResourceLinkedAccountList result = check stripeClient->listLinkedAccounts();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "institution_name": "Sample name",
      "supported_payment_method_types": [
        "link"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "category": "cash",
      "subcategory": "checking",
      "object": "financial_connections.account",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getLinkedAccount</summary>

<div>

Retrieve an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetLinkedAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->getLinkedAccount("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>disconnectLinkedAccount</summary>

<div>

Disconnect an Account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to disconnect an Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->disconnectLinkedAccount("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listLinkedAccountOwners</summary>

<div>

List Account Owners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListLinkedAccountOwnersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `ownership` | <code>string</code> | Yes | The ID of the ownership object to fetch owners from. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BankConnectionsResourceOwnerList|error`

**Sample code:**

```ballerina
stripe:BankConnectionsResourceOwnerList result = check stripeClient->listLinkedAccountOwners("string", ownership = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "ownership": "string",
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "financial_connections.account_owner"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>refreshLinkedAccount</summary>

<div>

Refresh Account data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | <code>string</code> | Yes | The account parameter. |
| `payload` | <code>AccountRefreshBody</code> | Yes | Request payload to refresh Account data. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `FinancialConnectionsAccount|error`

**Sample code:**

```ballerina
stripe:FinancialConnectionsAccount result = check stripeClient->refreshLinkedAccount("string", {
    features: ["balance"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "institution_name": "Sample name",
  "supported_payment_method_types": [
    "link"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "category": "cash",
  "subcategory": "checking",
  "object": "financial_connections.account",
  "status": "active"
}
```

</div>
</details>

#### Mandates

<details>
<summary>getMandate</summary>

<div>

Retrieve a Mandate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mandate` | <code>string</code> | Yes | The mandate parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetMandateQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Mandate|error`

**Sample code:**

```ballerina
stripe:Mandate result = check stripeClient->getMandate("2026-01-15T00:00:00");
```

**Sample response:**

```json
{
  "customer_acceptance": {
    "type": "offline",
    "accepted_at": 1
  },
  "livemode": false,
  "payment_method_details": {
    "type": "string",
    "blik": {
      "type": "off_session"
    },
    "acss_debit": {
      "payment_schedule": "combined",
      "transaction_type": "business"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "multi_use",
  "payment_method": "string",
  "object": "mandate",
  "status": "active"
}
```

</div>
</details>

#### Payment attempt records

<details>
<summary>listPaymentAttemptRecords</summary>

<div>

List Payment Attempt Records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListPaymentAttemptRecordsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `paymentRecord` | <code>string</code> | Yes | The ID of the Payment Record. |

**Returns:** `PaymentAttemptRecordList|error`

**Sample code:**

```ballerina
stripe:PaymentAttemptRecordList result = check stripeClient->listPaymentAttemptRecords(paymentRecord = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": {
        "currency": "string",
        "value": 1
      },
      "metadata": {},
      "livemode": false,
      "created": 1,
      "amount_canceled": {
        "currency": "string",
        "value": 1
      },
      "amount_authorized": {
        "currency": "string",
        "value": 1
      },
      "amount_refunded": {
        "currency": "string",
        "value": 1
      },
      "amount_requested": {
        "currency": "string",
        "value": 1
      },
      "processor_details": {
        "type": "custom"
      },
      "reported_by": "self",
      "amount_guaranteed": {
        "currency": "string",
        "value": 1
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_failed": {
        "currency": "string",
        "value": 1
      },
      "object": "payment_attempt_record"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getPaymentAttemptRecord</summary>

<div>

Retrieve a Payment Attempt Record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Attempt Record. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentAttemptRecordQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentAttemptRecord|error`

**Sample code:**

```ballerina
stripe:PaymentAttemptRecord result = check stripeClient->getPaymentAttemptRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_attempt_record"
}
```

</div>
</details>

#### Payment intents

<details>
<summary>listPaymentIntents</summary>

<div>

List all PaymentIntents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return PaymentIntents for the account representing the customer that this ID specifies. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentIntentsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created26</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp or a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | Only return PaymentIntents for the customer that this customer ID specifies. |

**Returns:** `PaymentFlowsPaymentIntentList|error`

**Sample code:**

```ballerina
stripe:PaymentFlowsPaymentIntentList result = check stripeClient->listPaymentIntents();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "payment_intent",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPaymentIntent</summary>

<div>

Create a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentIntentRequest</code> | Yes | Request payload to create a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->createPaymentIntent({
    currency: "string",
    amount: 1,
    paymentMethodConfiguration: "string",
    amountDetails: {
        enforceArithmeticValidation: false,
        shipping: "",
        discountAmount: ""
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>searchPaymentIntents</summary>

<div>

Search PaymentIntents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchPaymentIntentsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for payment intents](https://docs.stripe.com/search#query-fields-for-paymentintents). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult3|error`

**Sample code:**

```ballerina
stripe:SearchResult3 result = check stripeClient->searchPaymentIntents(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "payment_intent",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getPaymentIntent</summary>

<div>

Retrieve a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentIntentQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `clientSecret` | <code>string</code> | No | The client secret of the PaymentIntent. We require it if you use a publishable key to retrieve the source. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->getPaymentIntent("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>updatePaymentIntent</summary>

<div>

Update a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>UpdatePaymentIntentRequest</code> | Yes | Request payload to update a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->updatePaymentIntent("string", {
    paymentMethodConfiguration: "string",
    amountDetails: "",
    metadata: "",
    paymentDetails: ""
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>listAmountDetailsLineItems</summary>

<div>

List all PaymentIntent LineItems.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAmountDetailsLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentFlowsAmountDetailsResourceLineItemsList|error`

**Sample code:**

```ballerina
stripe:PaymentFlowsAmountDetailsResourceLineItemsList result = check stripeClient->listAmountDetailsLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "quantity": 1,
      "unit_cost": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "product_name": "Sample name",
      "object": "payment_intent_amount_details_line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>applyCustomerBalancePaymentIntent</summary>

<div>

Reconcile a customer_balance PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>ApplyCustomerBalancePaymentIntentRequest</code> | Yes | Request payload to reconcile a customer_balance PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->applyCustomerBalancePaymentIntent("string", {
    amount: 1,
    expand: ["string"],
    currency: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>cancelPaymentIntent</summary>

<div>

Cancel a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>CancelPaymentIntentRequest</code> | Yes | Request payload to cancel a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->cancelPaymentIntent("string", {
    expand: ["string"],
    cancellationReason: "abandoned"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>capturePaymentIntent</summary>

<div>

Capture a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>CapturePaymentIntentRequest</code> | Yes | Request payload to capture a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->capturePaymentIntent("string", {
    statementDescriptor: "string",
    transferData: {
        amount: 1
    },
    amountDetails: {
        enforceArithmeticValidation: false,
        shipping: "",
        discountAmount: ""
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>confirmPaymentIntent</summary>

<div>

Confirm a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>ConfirmPaymentIntentRequest</code> | Yes | Request payload to confirm a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->confirmPaymentIntent("string", {
    captureMethod: "automatic",
    amountDetails: "",
    mandate: "2026-01-15T00:00:00",
    paymentDetails: ""
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>incrementAuthorizationPaymentIntent</summary>

<div>

Increment an authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>IncrementAuthorizationPaymentIntentRequest</code> | Yes | Request payload to increment an authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->incrementAuthorizationPaymentIntent("string", {
    amount: 1,
    statementDescriptor: "string",
    transferData: {
        amount: 1
    },
    amountDetails: {
        enforceArithmeticValidation: false,
        shipping: "",
        discountAmount: ""
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

<details>
<summary>verifyMicrodepositsPaymentIntent</summary>

<div>

Verify microdeposits on a PaymentIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>VerifyMicrodepositsPaymentIntentRequest</code> | Yes | Request payload to verify microdeposits on a PaymentIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentIntent|error`

**Sample code:**

```ballerina
stripe:PaymentIntent result = check stripeClient->verifyMicrodepositsPaymentIntent("string", {
    expand: ["string"],
    amounts: [1],
    descriptorCode: "200",
    clientSecret: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_intent",
  "status": "canceled",
  "amount_details": {
    "discount_amount": 1,
    "line_items": {
      "data": [
        {
          "quantity": 1,
          "unit_cost": 1,
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "product_name": "Sample name",
          "object": "payment_intent_amount_details_line_item"
        }
      ],
      "has_more": false,
      "url": "https://example.com/resource",
      "object": "list"
    }
  }
}
```

</div>
</details>

#### Payment links

<details>
<summary>listPaymentLinks</summary>

<div>

List all payment links.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentLinksQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return payment links that are active or inactive (e.g., pass `false` to list all inactive payment links). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentLinksResourcePaymentLinkList|error`

**Sample code:**

```ballerina
stripe:PaymentLinksResourcePaymentLinkList result = check stripeClient->listPaymentLinks();
```

**Sample response:**

```json
{
  "data": [
    {
      "payment_method_collection": "always",
      "metadata": {},
      "livemode": false,
      "after_completion": {
        "type": "hosted_confirmation"
      },
      "allow_promotion_codes": false,
      "customer_creation": "always",
      "phone_number_collection": {
        "enabled": false
      },
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "billing_address_collection": "auto",
      "custom_fields": [
        {
          "optional": false,
          "label": {
            "type": "custom"
          },
          "type": "dropdown",
          "key": "string"
        }
      ],
      "active": false,
      "shipping_options": [
        {
          "shipping_amount": 1,
          "shipping_rate": "string"
        }
      ],
      "url": "https://example.com/resource",
      "submit_type": "auto",
      "automatic_tax": {
        "enabled": false
      },
      "tax_id_collection": {
        "enabled": false,
        "required": "if_supported"
      },
      "custom_text": {},
      "object": "payment_link"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPaymentLink</summary>

<div>

Create a payment link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentLinkRequest</code> | Yes | Request payload to create a payment link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentLink|error`

**Sample code:**

```ballerina
stripe:PaymentLink result = check stripeClient->createPaymentLink({
    lineItems: [{
        quantity: 1,
        priceData: {
            currency: "string"
        },
        adjustableQuantity: {
            enabled: false
        }
    }],
    paymentMethodCollection: "always",
    inactiveMessage: "string",
    afterCompletion: {
        'type: "hosted_confirmation",
        redirect: {
            url: "https://example.com/resource"
        }
    }
});
```

**Sample response:**

```json
{
  "payment_method_collection": "always",
  "metadata": {},
  "livemode": false,
  "after_completion": {
    "type": "hosted_confirmation",
    "redirect": {
      "url": "https://example.com/resource"
    }
  },
  "allow_promotion_codes": false,
  "customer_creation": "always",
  "phone_number_collection": {
    "enabled": false
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "billing_address_collection": "auto",
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "active": false,
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "url": "https://example.com/resource",
  "submit_type": "auto",
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    }
  },
  "tax_id_collection": {
    "enabled": false,
    "required": "if_supported"
  },
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "payment_link"
}
```

</div>
</details>

<details>
<summary>getPaymentLink</summary>

<div>

Retrieve payment link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentLink` | <code>string</code> | Yes | The payment link parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentLinkQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentLink|error`

**Sample code:**

```ballerina
stripe:PaymentLink result = check stripeClient->getPaymentLink("string");
```

**Sample response:**

```json
{
  "payment_method_collection": "always",
  "metadata": {},
  "livemode": false,
  "after_completion": {
    "type": "hosted_confirmation",
    "redirect": {
      "url": "https://example.com/resource"
    }
  },
  "allow_promotion_codes": false,
  "customer_creation": "always",
  "phone_number_collection": {
    "enabled": false
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "billing_address_collection": "auto",
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "active": false,
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "url": "https://example.com/resource",
  "submit_type": "auto",
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    }
  },
  "tax_id_collection": {
    "enabled": false,
    "required": "if_supported"
  },
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "payment_link"
}
```

</div>
</details>

<details>
<summary>updatePaymentLink</summary>

<div>

Update a payment link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentLink` | <code>string</code> | Yes | The payment link parameter. |
| `payload` | <code>UpdatePaymentLinkRequest</code> | Yes | Request payload to update a payment link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentLink|error`

**Sample code:**

```ballerina
stripe:PaymentLink result = check stripeClient->updatePaymentLink("string", {
    paymentMethodCollection: "always",
    inactiveMessage: "",
    afterCompletion: {
        'type: "hosted_confirmation",
        redirect: {
            url: "https://example.com/resource"
        }
    },
    lineItems: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        quantity: 1,
        adjustableQuantity: {
            enabled: false
        }
    }]
});
```

**Sample response:**

```json
{
  "payment_method_collection": "always",
  "metadata": {},
  "livemode": false,
  "after_completion": {
    "type": "hosted_confirmation",
    "redirect": {
      "url": "https://example.com/resource"
    }
  },
  "allow_promotion_codes": false,
  "customer_creation": "always",
  "phone_number_collection": {
    "enabled": false
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "billing_address_collection": "auto",
  "custom_fields": [
    {
      "optional": false,
      "label": {
        "type": "custom"
      },
      "type": "dropdown",
      "key": "string"
    }
  ],
  "active": false,
  "shipping_options": [
    {
      "shipping_amount": 1,
      "shipping_rate": "string"
    }
  ],
  "url": "https://example.com/resource",
  "submit_type": "auto",
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    }
  },
  "tax_id_collection": {
    "enabled": false,
    "required": "if_supported"
  },
  "custom_text": {
    "after_submit": {
      "message": "string"
    },
    "submit": {
      "message": "string"
    },
    "terms_of_service_acceptance": {
      "message": "string"
    }
  },
  "object": "payment_link"
}
```

</div>
</details>

<details>
<summary>listPaymentLinkLineItems</summary>

<div>

Retrieve a payment link's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentLink` | <code>string</code> | Yes | The payment link parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentLinkLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentLinksResourceListLineItems|error`

**Sample code:**

```ballerina
stripe:PaymentLinksResourceListLineItems result = check stripeClient->listPaymentLinkLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_discount": 1,
      "amount_total": 1,
      "amount_tax": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_subtotal": 1,
      "object": "item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

#### Payment method configurations

<details>
<summary>listPaymentMethodConfigurations</summary>

<div>

List payment method configurations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentMethodConfigurationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `application` | <code>Application1</code> | No | The Connect application to filter by. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Whether the configuration is active. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentMethodConfigResourcePaymentMethodConfigurationsList|error`

**Sample code:**

```ballerina
stripe:PaymentMethodConfigResourcePaymentMethodConfigurationsList result = check stripeClient->listPaymentMethodConfigurations();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "active": false,
      "is_default": false,
      "name": "Sample name",
      "object": "payment_method_configuration"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPaymentMethodConfiguration</summary>

<div>

Create a payment method configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentMethodConfigurationRequest</code> | Yes | Request payload to create a payment method configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethodConfiguration|error`

**Sample code:**

```ballerina
stripe:PaymentMethodConfiguration result = check stripeClient->createPaymentMethodConfiguration({
    parent: "string",
    expand: ["string"],
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active": false,
  "is_default": false,
  "name": "Sample name",
  "object": "payment_method_configuration"
}
```

</div>
</details>

<details>
<summary>getPaymentMethodConfiguration</summary>

<div>

Retrieve payment method configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentMethodConfigurationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentMethodConfiguration|error`

**Sample code:**

```ballerina
stripe:PaymentMethodConfiguration result = check stripeClient->getPaymentMethodConfiguration("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active": false,
  "is_default": false,
  "name": "Sample name",
  "object": "payment_method_configuration"
}
```

</div>
</details>

<details>
<summary>updatePaymentMethodConfiguration</summary>

<div>

Update payment method configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `payload` | <code>UpdatePaymentMethodConfigurationRequest</code> | Yes | Request payload to update payment method configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethodConfiguration|error`

**Sample code:**

```ballerina
stripe:PaymentMethodConfiguration result = check stripeClient->updatePaymentMethodConfiguration("string", {
    active: false,
    expand: ["string"],
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active": false,
  "is_default": false,
  "name": "Sample name",
  "object": "payment_method_configuration"
}
```

</div>
</details>

#### Payment method domains

<details>
<summary>listPaymentMethodDomains</summary>

<div>

List payment method domains.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `domainName` | <code>string</code> | No | The domain name that this payment method domain object represents. |
| `expand` | <code>ListPaymentMethodDomainsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `enabled` | <code>boolean</code> | No | Whether this payment method domain is enabled. If the domain is not enabled, payment methods will not appear in Elements or Embedded Checkout. |

**Returns:** `PaymentMethodDomainResourcePaymentMethodDomainList|error`

**Sample code:**

```ballerina
stripe:PaymentMethodDomainResourcePaymentMethodDomainList result = check stripeClient->listPaymentMethodDomains();
```

**Sample response:**

```json
{
  "data": [
    {
      "apple_pay": {
        "status": "active"
      },
      "domain_name": "Sample name",
      "klarna": {
        "status": "active"
      },
      "livemode": false,
      "created": 1,
      "google_pay": {
        "status": "active"
      },
      "link": {
        "status": "active"
      },
      "amazon_pay": {
        "status": "active"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "paypal": {
        "status": "active"
      },
      "enabled": false,
      "object": "payment_method_domain"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPaymentMethodDomain</summary>

<div>

Create a payment method domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentMethodDomainRequest</code> | Yes | Request payload to create a payment method domain. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethodDomain|error`

**Sample code:**

```ballerina
stripe:PaymentMethodDomain result = check stripeClient->createPaymentMethodDomain({
    domainName: "Sample name",
    expand: ["string"],
    enabled: false
});
```

**Sample response:**

```json
{
  "apple_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "domain_name": "Sample name",
  "klarna": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "livemode": false,
  "created": 1,
  "google_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "link": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "amazon_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paypal": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "enabled": false,
  "object": "payment_method_domain"
}
```

</div>
</details>

<details>
<summary>getPaymentMethodDomain</summary>

<div>

Retrieve a payment method domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethodDomain` | <code>string</code> | Yes | The payment method domain parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentMethodDomainQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentMethodDomain|error`

**Sample code:**

```ballerina
stripe:PaymentMethodDomain result = check stripeClient->getPaymentMethodDomain("string");
```

**Sample response:**

```json
{
  "apple_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "domain_name": "Sample name",
  "klarna": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "livemode": false,
  "created": 1,
  "google_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "link": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "amazon_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paypal": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "enabled": false,
  "object": "payment_method_domain"
}
```

</div>
</details>

<details>
<summary>updatePaymentMethodDomain</summary>

<div>

Update a payment method domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethodDomain` | <code>string</code> | Yes | The payment method domain parameter. |
| `payload` | <code>UpdatePaymentMethodDomainRequest</code> | Yes | Request payload to update a payment method domain. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethodDomain|error`

**Sample code:**

```ballerina
stripe:PaymentMethodDomain result = check stripeClient->updatePaymentMethodDomain("string", {
    expand: ["string"],
    enabled: false
});
```

**Sample response:**

```json
{
  "apple_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "domain_name": "Sample name",
  "klarna": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "livemode": false,
  "created": 1,
  "google_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "link": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "amazon_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paypal": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "enabled": false,
  "object": "payment_method_domain"
}
```

</div>
</details>

<details>
<summary>validatePaymentMethodDomain</summary>

<div>

Validate an existing payment method domain.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethodDomain` | <code>string</code> | Yes | The payment method domain parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to validate an existing payment method domain. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethodDomain|error`

**Sample code:**

```ballerina
stripe:PaymentMethodDomain result = check stripeClient->validatePaymentMethodDomain("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "apple_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "domain_name": "Sample name",
  "klarna": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "livemode": false,
  "created": 1,
  "google_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "link": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "amazon_pay": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paypal": {
    "status": "active",
    "status_details": {
      "error_message": "string"
    }
  },
  "enabled": false,
  "object": "payment_method_domain"
}
```

</div>
</details>

#### Payment methods

<details>
<summary>listPaymentMethods</summary>

<div>

List PaymentMethods.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | The ID of the Account whose PaymentMethods will be retrieved. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentMethodsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"acss_debit"&#124;"affirm"&#124;"afterpay_clearpay"&#124;"alipay"&#124;"alma"&#124;"amazon_pay"&#124;"au_becs_debit"&#124;"bacs_debit"&#124;"bancontact"&#124;"billie"&#124;"bizum"&#124;"blik"&#124;"boleto"&#124;"card"&#124;"cashapp"&#124;"crypto"&#124;"custom"&#124;"customer_balance"&#124;"eps"&#124;"fpx"&#124;"giropay"&#124;"grabpay"&#124;"ideal"&#124;"kakao_pay"&#124;"klarna"&#124;"konbini"&#124;"kr_card"&#124;"link"&#124;"mb_way"&#124;"mobilepay"&#124;"multibanco"&#124;"naver_pay"&#124;"nz_bank_account"&#124;"oxxo"&#124;"p24"&#124;"pay_by_bank"&#124;"payco"&#124;"paynow"&#124;"paypal"&#124;"paypay"&#124;"payto"&#124;"pix"&#124;"promptpay"&#124;"revolut_pay"&#124;"samsung_pay"&#124;"satispay"&#124;"scalapay"&#124;"sepa_debit"&#124;"sequra"&#124;"sofort"&#124;"sunbit"&#124;"swish"&#124;"twint"&#124;"upi"&#124;"us_bank_account"&#124;"wechat_pay"&#124;"zip"</code> | No | Filters the list by the object `type` field. Unfiltered, the list returns all payment method types except `custom`. If your integration expects only one type of payment method in the response, specify that type value in the request to reduce your payload. |
| `allowRedisplay` | <code>"always"&#124;"limited"&#124;"unspecified"</code> | No | This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. |
| `customer` | <code>string</code> | No | The ID of the customer whose PaymentMethods will be retrieved. |

**Returns:** `PaymentFlowsPaymentMethodList|error`

**Sample code:**

```ballerina
stripe:PaymentFlowsPaymentMethodList result = check stripeClient->listPaymentMethods();
```

**Sample response:**

```json
{
  "data": [
    {
      "billing_details": {},
      "livemode": false,
      "type": "acss_debit",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "object": "payment_method"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPaymentMethod</summary>

<div>

Create a PaymentMethod.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentMethodRequest</code> | Yes | Request payload to create a PaymentMethod. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->createPaymentMethod({
    billingDetails: {
        address: "",
        phone: "",
        name: ""
    },
    radarOptions: {
        session: "string"
    },
    boleto: {
        taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    'type: "acss_debit"
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

<details>
<summary>getPaymentMethod</summary>

<div>

Retrieve a PaymentMethod.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | <code>string</code> | Yes | The payment method parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentMethodQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->getPaymentMethod("string");
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

<details>
<summary>updatePaymentMethod</summary>

<div>

Update a PaymentMethod.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | <code>string</code> | Yes | The payment method parameter. |
| `payload` | <code>UpdatePaymentMethodRequest</code> | Yes | Request payload to update a PaymentMethod. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->updatePaymentMethod("string", {
    billingDetails: {
        address: "",
        phone: "",
        name: ""
    },
    expand: ["string"],
    metadata: "",
    usBankAccount: {
        accountType: "checking",
        accountHolderType: "company"
    }
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

<details>
<summary>attachPaymentMethod</summary>

<div>

Attach a PaymentMethod to a Customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | <code>string</code> | Yes | The payment method parameter. |
| `payload` | <code>AttachPaymentMethodRequest</code> | Yes | Request payload to attach a PaymentMethod to a Customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->attachPaymentMethod("string", {
    customerAccount: "string",
    expand: ["string"],
    customer: "string"
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

<details>
<summary>detachPaymentMethod</summary>

<div>

Detach a PaymentMethod from a Customer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentMethod` | <code>string</code> | Yes | The payment method parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to detach a PaymentMethod from a Customer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentMethod|error`

**Sample code:**

```ballerina
stripe:PaymentMethod result = check stripeClient->detachPaymentMethod("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "billing_details": {
    "phone": "string",
    "name": "Sample name",
    "email": "user@example.com"
  },
  "livemode": false,
  "type": "acss_debit",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "object": "payment_method"
}
```

</div>
</details>

#### Payment records

<details>
<summary>listPaymentRecords</summary>

<div>

List Payment Records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPaymentRecordsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `createdAfter` | <code>int</code> | No | Only return Payment Records that were created after this unix timestamp. |
| `createdBefore` | <code>int</code> | No | Only return Payment Records that were created before this unix timestamp. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentRecordList|error`

**Sample code:**

```ballerina
stripe:PaymentRecordList result = check stripeClient->listPaymentRecords();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": {
        "currency": "string",
        "value": 1
      },
      "metadata": {},
      "livemode": false,
      "created": 1,
      "amount_canceled": {
        "currency": "string",
        "value": 1
      },
      "amount_authorized": {
        "currency": "string",
        "value": 1
      },
      "amount_refunded": {
        "currency": "string",
        "value": 1
      },
      "amount_requested": {
        "currency": "string",
        "value": 1
      },
      "processor_details": {
        "type": "custom"
      },
      "reported_by": "self",
      "amount_guaranteed": {
        "currency": "string",
        "value": 1
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_failed": {
        "currency": "string",
        "value": 1
      },
      "object": "payment_record"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createReportPayment</summary>

<div>

Report a payment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateReportPaymentRequest</code> | Yes | Request payload to report a payment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->createReportPayment({
    paymentMethodDetails: {
        'type: "custom",
        paymentMethod: "string"
    },
    initiatedAt: 1,
    amountRequested: {
        currency: "string",
        value: 1
    },
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>getPaymentRecord</summary>

<div>

Retrieve a Payment Record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPaymentRecordQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->getPaymentRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportPaymentAttemptPaymentRecord</summary>

<div>

Report a payment attempt.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportPaymentAttemptPaymentRecordRequest</code> | Yes | Request payload to report a payment attempt. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportPaymentAttemptPaymentRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    initiatedAt: 1,
    canceled: {
        canceledAt: 1
    },
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportPaymentAttemptCanceled</summary>

<div>

Report payment attempt canceled.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportPaymentAttemptCanceledRequest</code> | Yes | Request payload to report payment attempt canceled. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportPaymentAttemptCanceled("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    canceledAt: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportPaymentAttemptFailed</summary>

<div>

Report payment attempt failed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportPaymentAttemptFailedRequest</code> | Yes | Request payload to report payment attempt failed. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportPaymentAttemptFailed("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    failedAt: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportPaymentAttemptGuaranteed</summary>

<div>

Report payment attempt guaranteed.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportPaymentAttemptGuaranteedRequest</code> | Yes | Request payload to report payment attempt guaranteed. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportPaymentAttemptGuaranteed("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    guaranteedAt: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportPaymentAttemptInformational</summary>

<div>

Report payment attempt informational.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportPaymentAttemptInformationalRequest</code> | Yes | Request payload to report payment attempt informational. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportPaymentAttemptInformational("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    customerDetails: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    expand: ["string"],
    metadata: "",
    shippingDetails: ""
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

<details>
<summary>reportRefundPaymentRecord</summary>

<div>

Report a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the Payment Record. |
| `payload` | <code>ReportRefundPaymentRecordRequest</code> | Yes | Request payload to report a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PaymentRecord|error`

**Sample code:**

```ballerina
stripe:PaymentRecord result = check stripeClient->reportRefundPaymentRecord("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    processorDetails: {
        'type: "custom",
        custom: {
            refundReference: "REF-001"
        }
    },
    outcome: "refunded",
    amount: {
        currency: "string",
        value: 1
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": {
    "currency": "string",
    "value": 1
  },
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_canceled": {
    "currency": "string",
    "value": 1
  },
  "amount_authorized": {
    "currency": "string",
    "value": 1
  },
  "amount_refunded": {
    "currency": "string",
    "value": 1
  },
  "amount_requested": {
    "currency": "string",
    "value": 1
  },
  "processor_details": {
    "type": "custom"
  },
  "reported_by": "self",
  "amount_guaranteed": {
    "currency": "string",
    "value": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount_failed": {
    "currency": "string",
    "value": 1
  },
  "object": "payment_record"
}
```

</div>
</details>

#### Payouts

<details>
<summary>listPayouts</summary>

<div>

List all payouts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPayoutsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created27</code> | No | Only return payouts that were created during the given date interval. |
| `destination` | <code>string</code> | No | The ID of an external account - only return payouts sent to this external account. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `arrivalDate` | <code>ArrivalDate</code> | No | Only return payouts that are expected to arrive during the given date interval. |
| `status` | <code>string</code> | No | Only return payouts that have the given status: `pending`, `paid`, `failed`, or `canceled`. |

**Returns:** `PayoutList|error`

**Sample code:**

```ballerina
stripe:PayoutList result = check stripeClient->listPayouts();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "reconciliation_status": "completed",
      "type": "bank_account",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arrival_date": 1,
      "amount": 1,
      "method": "string",
      "created": 1,
      "automatic": false,
      "source_type": "string",
      "object": "payout",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPayout</summary>

<div>

Create a payout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePayoutRequest</code> | Yes | Request payload to create a payout. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Payout|error`

**Sample code:**

```ballerina
stripe:Payout result = check stripeClient->createPayout({
    amount: 1,
    currency: "string",
    statementDescriptor: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "reconciliation_status": "completed",
  "type": "bank_account",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "arrival_date": 1,
  "amount": 1,
  "method": "string",
  "created": 1,
  "automatic": false,
  "source_type": "string",
  "object": "payout",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getPayout</summary>

<div>

Retrieve a payout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payout` | <code>string</code> | Yes | The payout parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPayoutQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Payout|error`

**Sample code:**

```ballerina
stripe:Payout result = check stripeClient->getPayout("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "reconciliation_status": "completed",
  "type": "bank_account",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "arrival_date": 1,
  "amount": 1,
  "method": "string",
  "created": 1,
  "automatic": false,
  "source_type": "string",
  "object": "payout",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>updatePayout</summary>

<div>

Update a payout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payout` | <code>string</code> | Yes | The payout parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update a payout. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Payout|error`

**Sample code:**

```ballerina
stripe:Payout result = check stripeClient->updatePayout("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "livemode": false,
  "reconciliation_status": "completed",
  "type": "bank_account",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "arrival_date": 1,
  "amount": 1,
  "method": "string",
  "created": 1,
  "automatic": false,
  "source_type": "string",
  "object": "payout",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>cancelPayout</summary>

<div>

Cancel a payout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payout` | <code>string</code> | Yes | The payout parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel a payout. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Payout|error`

**Sample code:**

```ballerina
stripe:Payout result = check stripeClient->cancelPayout("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "reconciliation_status": "completed",
  "type": "bank_account",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "arrival_date": 1,
  "amount": 1,
  "method": "string",
  "created": 1,
  "automatic": false,
  "source_type": "string",
  "object": "payout",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>reversePayout</summary>

<div>

Reverse a payout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payout` | <code>string</code> | Yes | The payout parameter. |
| `payload` | <code>SettlementssettlementBody</code> | Yes | Request payload to reverse a payout. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Payout|error`

**Sample code:**

```ballerina
stripe:Payout result = check stripeClient->reversePayout("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "reconciliation_status": "completed",
  "type": "bank_account",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "arrival_date": 1,
  "amount": 1,
  "method": "string",
  "created": 1,
  "automatic": false,
  "source_type": "string",
  "object": "payout",
  "status": "string"
}
```

</div>
</details>

#### Plans

<details>
<summary>listPlans</summary>

<div>

List all plans.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPlansQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `product` | <code>string</code> | No | Only return plans for the given product. |
| `created` | <code>Created28</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return plans that are active or inactive (e.g., pass `false` to list all inactive plans). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PlanList|error`

**Sample code:**

```ballerina
stripe:PlanList result = check stripeClient->listPlans();
```

**Sample response:**

```json
{
  "data": [
    {
      "interval_count": 1,
      "livemode": false,
      "created": 1,
      "active": false,
      "billing_scheme": "per_unit",
      "usage_type": "licensed",
      "currency": "string",
      "interval": "day",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "plan"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPlan</summary>

<div>

Create a plan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePlanRequest</code> | Yes | Request payload to create a plan. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Plan|error`

**Sample code:**

```ballerina
stripe:Plan result = check stripeClient->createPlan({
    currency: "string",
    interval: "day",
    intervalCount: 1,
    amount: 1
});
```

**Sample response:**

```json
{
  "interval_count": 1,
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "usage_type": "licensed",
  "currency": "string",
  "interval": "day",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "plan"
}
```

</div>
</details>

<details>
<summary>getPlan</summary>

<div>

Retrieve a plan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | <code>string</code> | Yes | The plan parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPlanQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Plan|error`

**Sample code:**

```ballerina
stripe:Plan result = check stripeClient->getPlan("string");
```

**Sample response:**

```json
{
  "interval_count": 1,
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "usage_type": "licensed",
  "currency": "string",
  "interval": "day",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "plan"
}
```

</div>
</details>

<details>
<summary>updatePlan</summary>

<div>

Update a plan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | <code>string</code> | Yes | The plan parameter. |
| `payload` | <code>UpdatePlanRequest</code> | Yes | Request payload to update a plan. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Plan|error`

**Sample code:**

```ballerina
stripe:Plan result = check stripeClient->updatePlan("string", {
    expand: ["string"],
    metadata: "",
    product: "string",
    nickname: "Sample name"
});
```

**Sample response:**

```json
{
  "interval_count": 1,
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "usage_type": "licensed",
  "currency": "string",
  "interval": "day",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "plan"
}
```

</div>
</details>

<details>
<summary>deletePlan</summary>

<div>

Delete a plan.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `plan` | <code>string</code> | Yes | The plan parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedPlan|error`

**Sample code:**

```ballerina
stripe:DeletedPlan result = check stripeClient->deletePlan("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "plan"
}
```

</div>
</details>

#### Prices

<details>
<summary>listPrices</summary>

<div>

List all prices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPricesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `product` | <code>string</code> | No | Only return prices for the given product. |
| `created` | <code>Created29</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `recurring` | <code>AllPricesRecurringParams</code> | No | Only return prices with these recurring fields. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return prices that are active or inactive (e.g., pass `false` to list all inactive prices). |
| `currency` | <code>string</code> | No | Only return prices for the given currency. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `lookupKeys` | <code>ListPricesQueriesLookupkeysItemsString[]</code> | No | Only return the price with these lookup_keys, if any exist. You can specify up to 10 lookup_keys. |
| `'type` | <code>"one_time"&#124;"recurring"</code> | No | Only return prices of type `recurring` or `one_time`. |

**Returns:** `PriceList|error`

**Sample code:**

```ballerina
stripe:PriceList result = check stripeClient->listPrices();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "product": "string",
      "livemode": false,
      "created": 1,
      "active": false,
      "billing_scheme": "per_unit",
      "type": "one_time",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "price"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPrice</summary>

<div>

Create a price.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePriceRequest</code> | Yes | Request payload to create a price. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Price|error`

**Sample code:**

```ballerina
stripe:Price result = check stripeClient->createPrice({
    currency: "string",
    taxBehavior: "exclusive",
    product: "string",
    tiers: [{
        upTo: "inf",
        flatAmount: 1,
        unitAmountDecimal: "string"
    }]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "type": "one_time",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "price"
}
```

</div>
</details>

<details>
<summary>searchPrices</summary>

<div>

Search prices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchPricesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for prices](https://docs.stripe.com/search#query-fields-for-prices). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult4|error`

**Sample code:**

```ballerina
stripe:SearchResult4 result = check stripeClient->searchPrices(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "product": "string",
      "livemode": false,
      "created": 1,
      "active": false,
      "billing_scheme": "per_unit",
      "type": "one_time",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "price"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getPrice</summary>

<div>

Retrieve a price.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `price` | <code>string</code> | Yes | The price parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPriceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Price|error`

**Sample code:**

```ballerina
stripe:Price result = check stripeClient->getPrice("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "type": "one_time",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "price"
}
```

</div>
</details>

<details>
<summary>updatePrice</summary>

<div>

Update a price.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `price` | <code>string</code> | Yes | The price parameter. |
| `payload` | <code>UpdatePriceRequest</code> | Yes | Request payload to update a price. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Price|error`

**Sample code:**

```ballerina
stripe:Price result = check stripeClient->updatePrice("string", {
    taxBehavior: "exclusive",
    expand: ["string"],
    metadata: "",
    nickname: "Sample name"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "product": "string",
  "livemode": false,
  "created": 1,
  "active": false,
  "billing_scheme": "per_unit",
  "type": "one_time",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "price"
}
```

</div>
</details>

#### Product catalog

<details>
<summary>listTrialOffers</summary>

<div>

List trial offers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTrialOffersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created30</code> | No | Only return trial offers that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return trial offers that are active (`true`) or archived (`false`). If omitted, both active and archived trial offers are returned. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `prices` | <code>ListTrialOffersQueriesPricesItemsString[]</code> | No | Only return trial offers that reference these prices (during the trial period). |

**Returns:** `TrialOfferList|error`

**Sample code:**

```ballerina
stripe:TrialOfferList result = check stripeClient->listTrialOffers();
```

**Sample response:**

```json
{
  "data": [
    {
      "duration": {
        "type": "relative"
      },
      "livemode": false,
      "price": "string",
      "active": false,
      "end_behavior": {
        "type": "transition"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "product_catalog.trial_offer"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTrialOffer</summary>

<div>

Create a trial offer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTrialOfferRequest</code> | Yes | Request payload to create a trial offer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProductCatalogTrialOffer|error`

**Sample code:**

```ballerina
stripe:ProductCatalogTrialOffer result = check stripeClient->createTrialOffer({
    duration: {
        'type: "relative",
        relative: {
            iterations: 1
        }
    },
    price: "string",
    endBehavior: {
        transition: {
            price: "string"
        }
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "duration": {
    "type": "relative",
    "relative": {
      "iterations": 1
    }
  },
  "livemode": false,
  "price": "string",
  "active": false,
  "end_behavior": {
    "type": "transition",
    "transition": {
      "price": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_catalog.trial_offer"
}
```

</div>
</details>

<details>
<summary>getTrialOffer</summary>

<div>

Retrieve a trial offer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTrialOfferQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ProductCatalogTrialOffer|error`

**Sample code:**

```ballerina
stripe:ProductCatalogTrialOffer result = check stripeClient->getTrialOffer("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "duration": {
    "type": "relative",
    "relative": {
      "iterations": 1
    }
  },
  "livemode": false,
  "price": "string",
  "active": false,
  "end_behavior": {
    "type": "transition",
    "transition": {
      "price": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_catalog.trial_offer"
}
```

</div>
</details>

<details>
<summary>updateTrialOffer</summary>

<div>

Update a trial offer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateTrialOfferRequest</code> | Yes | Request payload to update a trial offer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProductCatalogTrialOffer|error`

**Sample code:**

```ballerina
stripe:ProductCatalogTrialOffer result = check stripeClient->updateTrialOffer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    active: false
});
```

**Sample response:**

```json
{
  "duration": {
    "type": "relative",
    "relative": {
      "iterations": 1
    }
  },
  "livemode": false,
  "price": "string",
  "active": false,
  "end_behavior": {
    "type": "transition",
    "transition": {
      "price": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_catalog.trial_offer"
}
```

</div>
</details>

#### Products

<details>
<summary>listProducts</summary>

<div>

List all products.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListProductsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `shippable` | <code>boolean</code> | No | Only return products that can be shipped (i.e., physical, not digital products). |
| `created` | <code>Created31</code> | No | Only return products that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return products that are active or inactive (e.g., pass `false` to list all inactive products). |
| `ids` | <code>ListProductsQueriesIdsItemsString[]</code> | No | Only return products with the given IDs. Cannot be used with [starting_after](https://docs.stripe.com/api#list_products-starting_after) or [ending_before](https://docs.stripe.com/api#list_products-ending_before). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `url` | <code>string</code> | No | Only return products with the given url. |

**Returns:** `ProductList|error`

**Sample code:**

```ballerina
stripe:ProductList result = check stripeClient->listProducts();
```

**Sample response:**

```json
{
  "data": [
    {
      "images": [
        "string"
      ],
      "metadata": {},
      "livemode": false,
      "created": 1,
      "active": false,
      "marketing_features": [
        {}
      ],
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "updated": 1,
      "object": "product"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createProduct</summary>

<div>

Create a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateProductRequest</code> | Yes | Request payload to create a product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Product|error`

**Sample code:**

```ballerina
stripe:Product result = check stripeClient->createProduct({
    name: "Sample name",
    images: ["string"],
    active: false,
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "images": [
    "string"
  ],
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "marketing_features": [
    {
      "name": "Sample name"
    }
  ],
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "product"
}
```

</div>
</details>

<details>
<summary>searchProducts</summary>

<div>

Search products.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchProductsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for products](https://docs.stripe.com/search#query-fields-for-products). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult5|error`

**Sample code:**

```ballerina
stripe:SearchResult5 result = check stripeClient->searchProducts(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "images": [
        "string"
      ],
      "metadata": {},
      "livemode": false,
      "created": 1,
      "active": false,
      "marketing_features": [
        {}
      ],
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "updated": 1,
      "object": "product"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getProduct</summary>

<div>

Retrieve a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetProductQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Product|error`

**Sample code:**

```ballerina
stripe:Product result = check stripeClient->getProduct("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "images": [
    "string"
  ],
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "marketing_features": [
    {
      "name": "Sample name"
    }
  ],
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "product"
}
```

</div>
</details>

<details>
<summary>updateProduct</summary>

<div>

Update a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateProductRequest</code> | Yes | Request payload to update a product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Product|error`

**Sample code:**

```ballerina
stripe:Product result = check stripeClient->updateProduct("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    images: "",
    metadata: "",
    defaultPrice: "string",
    active: false
});
```

**Sample response:**

```json
{
  "images": [
    "string"
  ],
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "marketing_features": [
    {
      "name": "Sample name"
    }
  ],
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "updated": 1,
  "object": "product"
}
```

</div>
</details>

<details>
<summary>deleteProduct</summary>

<div>

Delete a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedProduct|error`

**Sample code:**

```ballerina
stripe:DeletedProduct result = check stripeClient->deleteProduct("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product"
}
```

</div>
</details>

<details>
<summary>listProductFeatures</summary>

<div>

List all features attached to a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `product` | <code>string</code> | Yes | The ID of the product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListProductFeaturesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `EntitlementsResourceProductFeatureList|error`

**Sample code:**

```ballerina
stripe:EntitlementsResourceProductFeatureList result = check stripeClient->listProductFeatures("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "entitlement_feature": {
        "metadata": {},
        "livemode": false,
        "name": "Sample name",
        "active": false,
        "lookup_key": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "entitlements.feature"
      },
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "product_feature"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createProductFeature</summary>

<div>

Attach a feature to a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `product` | <code>string</code> | Yes | The ID of the product. |
| `payload` | <code>CreateProductFeatureRequest</code> | Yes | Request payload to attach a feature to a product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ProductFeature|error`

**Sample code:**

```ballerina
stripe:ProductFeature result = check stripeClient->createProductFeature("string", {
    entitlementFeature: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "entitlement_feature": {
    "metadata": {},
    "livemode": false,
    "name": "Sample name",
    "active": false,
    "lookup_key": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "entitlements.feature"
  },
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_feature"
}
```

</div>
</details>

<details>
<summary>getProductFeature</summary>

<div>

Retrieve a product_feature.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The ID of the product_feature. |
| `product` | <code>string</code> | Yes | The ID of the product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetProductFeatureQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ProductFeature|error`

**Sample code:**

```ballerina
stripe:ProductFeature result = check stripeClient->getProductFeature("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "entitlement_feature": {
    "metadata": {},
    "livemode": false,
    "name": "Sample name",
    "active": false,
    "lookup_key": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "entitlements.feature"
  },
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_feature"
}
```

</div>
</details>

<details>
<summary>deleteFeature</summary>

<div>

Remove a feature from a product.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `product` | <code>string</code> | Yes | The ID of the product. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedProductFeature|error`

**Sample code:**

```ballerina
stripe:DeletedProductFeature result = check stripeClient->deleteFeature("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "product_feature"
}
```

</div>
</details>

#### Promotion codes

<details>
<summary>listPromotionCodes</summary>

<div>

List all promotion codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return promotion codes that are restricted to this account representing the customer. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListPromotionCodesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `code` | <code>string</code> | No | Only return promotion codes that have this case-insensitive code. |
| `coupon` | <code>string</code> | No | Only return promotion codes for this coupon. |
| `created` | <code>Created32</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Filter promotion codes by whether they are active. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | Only return promotion codes that are restricted to this customer. |

**Returns:** `PromotionCodesResourcePromotionCodeList|error`

**Sample code:**

```ballerina
stripe:PromotionCodesResourcePromotionCodeList result = check stripeClient->listPromotionCodes();
```

**Sample response:**

```json
{
  "data": [
    {
      "code": "200",
      "livemode": false,
      "created": 1,
      "times_redeemed": 1,
      "active": false,
      "restrictions": {
        "first_time_transaction": false
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "promotion_code",
      "promotion": {
        "type": "coupon"
      }
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createPromotionCode</summary>

<div>

Create a promotion code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePromotionCodeRequest</code> | Yes | Request payload to create a promotion code. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PromotionCode|error`

**Sample code:**

```ballerina
stripe:PromotionCode result = check stripeClient->createPromotionCode({
    promotion: {
        'type: "coupon",
        coupon: "string"
    },
    customerAccount: "string",
    expand: ["string"],
    code: "200"
});
```

**Sample response:**

```json
{
  "code": "200",
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "active": false,
  "restrictions": {
    "first_time_transaction": false,
    "minimum_amount_currency": "string",
    "minimum_amount": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "promotion_code",
  "promotion": {
    "type": "coupon",
    "coupon": "string"
  }
}
```

</div>
</details>

<details>
<summary>getPromotionCode</summary>

<div>

Retrieve a promotion code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `promotionCode` | <code>string</code> | Yes | The promotion code parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPromotionCodeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `PromotionCode|error`

**Sample code:**

```ballerina
stripe:PromotionCode result = check stripeClient->getPromotionCode("200");
```

**Sample response:**

```json
{
  "code": "200",
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "active": false,
  "restrictions": {
    "first_time_transaction": false,
    "minimum_amount_currency": "string",
    "minimum_amount": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "promotion_code",
  "promotion": {
    "type": "coupon",
    "coupon": "string"
  }
}
```

</div>
</details>

<details>
<summary>updatePromotionCode</summary>

<div>

Update a promotion code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `promotionCode` | <code>string</code> | Yes | The promotion code parameter. |
| `payload` | <code>UpdatePromotionCodeRequest</code> | Yes | Request payload to update a promotion code. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `PromotionCode|error`

**Sample code:**

```ballerina
stripe:PromotionCode result = check stripeClient->updatePromotionCode("200", {
    expand: ["string"],
    metadata: "",
    active: false
});
```

**Sample response:**

```json
{
  "code": "200",
  "livemode": false,
  "created": 1,
  "times_redeemed": 1,
  "active": false,
  "restrictions": {
    "first_time_transaction": false,
    "minimum_amount_currency": "string",
    "minimum_amount": 1
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "promotion_code",
  "promotion": {
    "type": "coupon",
    "coupon": "string"
  }
}
```

</div>
</details>

#### Quotes

<details>
<summary>listQuotes</summary>

<div>

List all quotes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | The ID of the account representing the customer whose quotes you're retrieving. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListQuotesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `testClock` | <code>string</code> | No | Provides a list of quotes that are associated with the specified test clock. The response will not include quotes with test clocks if this and the customer parameter is not set. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | The ID of the customer whose quotes you're retrieving. |
| `status` | <code>"accepted"&#124;"canceled"&#124;"draft"&#124;"open"</code> | No | The status of the quote. |

**Returns:** `QuotesResourceQuoteList|error`

**Sample code:**

```ballerina
stripe:QuotesResourceQuoteList result = check stripeClient->listQuotes();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "computed": {
        "upfront": {
          "total_details": {
            "amount_tax": 1,
            "amount_discount": 1
          },
          "amount_total": 1,
          "amount_subtotal": 1
        }
      },
      "livemode": false,
      "amount_total": 1,
      "expires_at": 1,
      "subscription_data": {
        "billing_mode": {
          "type": "classic"
        }
      },
      "discounts": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "invoice_settings": {
        "issuer": {
          "type": "account"
        }
      },
      "created": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "status_transitions": {},
      "amount_subtotal": 1,
      "object": "quote",
      "status": "accepted"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createQuote</summary>

<div>

Create a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateQuoteRequest</code> | Yes | Request payload to create a quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->createQuote({
    invoiceSettings: {
        footer: "",
        customFields: "",
        daysUntilDue: 1
    },
    customerAccount: "string",
    defaultTaxRates: "",
    testClock: "string"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>getQuote</summary>

<div>

Retrieve a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetQuoteQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->getQuote("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>updateQuote</summary>

<div>

Update a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `payload` | <code>UpdateQuoteRequest</code> | Yes | Request payload to update a quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->updateQuote("string", {
    invoiceSettings: {
        footer: "",
        customFields: "",
        daysUntilDue: 1
    },
    customerAccount: "string",
    defaultTaxRates: "",
    footer: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>acceptQuote</summary>

<div>

Accept a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to accept a quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->acceptQuote("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>cancelQuote</summary>

<div>

Cancel a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel a quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->cancelQuote("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>listComputedUpfrontLineItems</summary>

<div>

Retrieve a quote's upfront line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListComputedUpfrontLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `QuotesResourceListLineItems|error`

**Sample code:**

```ballerina
stripe:QuotesResourceListLineItems result = check stripeClient->listComputedUpfrontLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_discount": 1,
      "amount_total": 1,
      "amount_tax": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_subtotal": 1,
      "object": "item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>finalizeQuote</summary>

<div>

Finalize a quote.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `payload` | <code>FinalizeQuoteRequest</code> | Yes | Request payload to finalize a quote. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Quote|error`

**Sample code:**

```ballerina
stripe:Quote result = check stripeClient->finalizeQuote("string", {
    expand: ["string"],
    expiresAt: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "computed": {
    "upfront": {
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "amount_subtotal": 1
    },
    "recurring": {
      "interval_count": 1,
      "total_details": {
        "amount_tax": 1,
        "amount_discount": 1
      },
      "amount_total": 1,
      "interval": "day",
      "amount_subtotal": 1
    }
  },
  "livemode": false,
  "amount_total": 1,
  "expires_at": 1,
  "subscription_data": {
    "billing_mode": {
      "type": "classic"
    },
    "effective_date": 1,
    "description": "Sample description"
  },
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "footer": "string",
    "custom_fields": [
      {
        "name": "Sample name",
        "value": "string"
      }
    ]
  },
  "created": 1,
  "total_details": {
    "amount_tax": 1,
    "amount_discount": 1,
    "breakdown": {
      "discounts": [
        {
          "amount": 1,
          "discount": {
            "start": 1,
            "source": {},
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "discount"
          }
        }
      ],
      "taxes": [
        {
          "amount": 1,
          "rate": {
            "inclusive": false,
            "livemode": false,
            "created": 1,
            "active": false,
            "display_name": "Sample name",
            "percentage": 100.00,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "tax_rate"
          }
        }
      ]
    }
  },
  "automatic_tax": {
    "enabled": false,
    "provider": "string",
    "liability": {
      "type": "account"
    }
  },
  "collection_method": "charge_automatically",
  "status_transitions": {
    "finalized_at": 1,
    "canceled_at": 1,
    "accepted_at": 1
  },
  "amount_subtotal": 1,
  "object": "quote",
  "status": "accepted"
}
```

</div>
</details>

<details>
<summary>listQuoteLineItems</summary>

<div>

Retrieve a quote's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListQuoteLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `QuotesResourceListLineItems|error`

**Sample code:**

```ballerina
stripe:QuotesResourceListLineItems result = check stripeClient->listQuoteLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount_discount": 1,
      "amount_total": 1,
      "amount_tax": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount_subtotal": 1,
      "object": "item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getPdf</summary>

<div>

Download quote PDF.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `quote` | <code>string</code> | Yes | The quote parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetPdfQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `http:Response|error`

**Sample code:**

```ballerina
http:Response result = check stripeClient->getPdf("string");
```

**Sample response:**

The raw `http:Response`. Read the PDF content with `check result.getBinaryPayload()`.

</div>
</details>

#### Radar

<details>
<summary>listEarlyFraudWarnings</summary>

<div>

List all early fraud warnings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListEarlyFraudWarningsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `charge` | <code>string</code> | No | Only return early fraud warnings for the charge specified by this charge ID. |
| `created` | <code>Created33</code> | No | Only return early fraud warnings that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `paymentIntent` | <code>string</code> | No | Only return early fraud warnings for charges that were created by the PaymentIntent specified by this PaymentIntent ID. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `RadarEarlyFraudWarningList|error`

**Sample code:**

```ballerina
stripe:RadarEarlyFraudWarningList result = check stripeClient->listEarlyFraudWarnings();
```

**Sample response:**

```json
{
  "data": [
    {
      "charge": "string",
      "livemode": false,
      "created": 1,
      "actionable": false,
      "fraud_type": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "radar.early_fraud_warning"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getEarlyFraudWarning</summary>

<div>

Retrieve an early fraud warning.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `earlyFraudWarning` | <code>string</code> | Yes | The early fraud warning parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetEarlyFraudWarningQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `RadarEarlyFraudWarning|error`

**Sample code:**

```ballerina
stripe:RadarEarlyFraudWarning result = check stripeClient->getEarlyFraudWarning("string");
```

**Sample response:**

```json
{
  "charge": "string",
  "livemode": false,
  "created": 1,
  "actionable": false,
  "fraud_type": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "radar.early_fraud_warning"
}
```

</div>
</details>

<details>
<summary>createPaymentEvaluation</summary>

<div>

Create a Payment Evaluation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreatePaymentEvaluationRequest</code> | Yes | Request payload to create a Payment Evaluation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RadarPaymentEvaluation|error`

**Sample code:**

```ballerina
stripe:RadarPaymentEvaluation result = check stripeClient->createPaymentEvaluation({
    customerDetails: {
        customerAccount: "string",
        phone: "string",
        name: "Sample name"
    },
    paymentDetails: {
        amount: 1,
        paymentMethodDetails: {
            paymentMethod: "string"
        },
        currency: "string"
    },
    clientDeviceMetadataDetails: {
        radarSession: "string"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "signals": {
    "fraudulent_payment": {
      "risk_level": "elevated",
      "evaluated_at": 1
    },
    "fraudulent_dispute": {
      "risk_level": "elevated",
      "evaluated_at": 1
    },
    "early_fraud_warning": {
      "risk_level": "elevated",
      "evaluated_at": 1
    }
  },
  "livemode": false,
  "recommended_action": "block",
  "created_at": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "events": [
    {
      "occurred_at": 1,
      "type": "dispute_opened",
      "early_fraud_warning_received": {
        "fraud_type": "made_with_lost_card"
      }
    }
  ],
  "object": "radar.payment_evaluation"
}
```

</div>
</details>

<details>
<summary>listValueListItems</summary>

<div>

List all value list items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListValueListItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created34</code> | No | Only return items that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `valueList` | <code>string</code> | Yes | Identifier for the parent value list this item belongs to. |
| `value` | <code>string</code> | No | Return items belonging to the parent list whose value matches the specified value (using an "is like" match). |

**Returns:** `RadarListListItemList|error`

**Sample code:**

```ballerina
stripe:RadarListListItemList result = check stripeClient->listValueListItems(valueList = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "value_list": "string",
      "created_by": "string",
      "value": "string",
      "object": "radar.value_list_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createValueListItem</summary>

<div>

Create a value list item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateValueListItemRequest</code> | Yes | Request payload to create a value list item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RadarValueListItem|error`

**Sample code:**

```ballerina
stripe:RadarValueListItem result = check stripeClient->createValueListItem({
    valueList: "string",
    value: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "value_list": "string",
  "created_by": "string",
  "value": "string",
  "object": "radar.value_list_item"
}
```

</div>
</details>

<details>
<summary>getValueListItem</summary>

<div>

Retrieve a value list item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `item` | <code>string</code> | Yes | The item parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetValueListItemQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `RadarValueListItem|error`

**Sample code:**

```ballerina
stripe:RadarValueListItem result = check stripeClient->getValueListItem("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "value_list": "string",
  "created_by": "string",
  "value": "string",
  "object": "radar.value_list_item"
}
```

</div>
</details>

<details>
<summary>deleteValueListItem</summary>

<div>

Delete a value list item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `item` | <code>string</code> | Yes | The item parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedRadarValueListItem|error`

**Sample code:**

```ballerina
stripe:DeletedRadarValueListItem result = check stripeClient->deleteValueListItem("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "radar.value_list_item"
}
```

</div>
</details>

<details>
<summary>listValueLists</summary>

<div>

List all value lists.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `contains` | <code>string</code> | No | A value contained within a value list - returns all value lists containing this value. |
| `expand` | <code>ListValueListsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created35</code> | No | Only return value lists that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `alias` | <code>string</code> | No | The alias used to reference the value list when writing rules. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `RadarListListList|error`

**Sample code:**

```ballerina
stripe:RadarListListList result = check stripeClient->listValueLists();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "created": 1,
      "item_type": "account",
      "name": "Sample name",
      "alias": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_by": "string",
      "list_items": {
        "data": [
          {
            "livemode": false,
            "created": 1,
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "value_list": "string",
            "created_by": "string",
            "value": "string",
            "object": "radar.value_list_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "object": "radar.value_list"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createValueList</summary>

<div>

Create a value list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateValueListRequest</code> | Yes | Request payload to create a value list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RadarValueList|error`

**Sample code:**

```ballerina
stripe:RadarValueList result = check stripeClient->createValueList({
    name: "Sample name",
    alias: "string",
    expand: ["string"],
    itemType: "account"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "item_type": "account",
  "name": "Sample name",
  "alias": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_by": "string",
  "list_items": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "value_list": "string",
        "created_by": "string",
        "value": "string",
        "object": "radar.value_list_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "radar.value_list"
}
```

</div>
</details>

<details>
<summary>getValueList</summary>

<div>

Retrieve a value list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `valueList` | <code>string</code> | Yes | The value list parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetValueListQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `RadarValueList|error`

**Sample code:**

```ballerina
stripe:RadarValueList result = check stripeClient->getValueList("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "item_type": "account",
  "name": "Sample name",
  "alias": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_by": "string",
  "list_items": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "value_list": "string",
        "created_by": "string",
        "value": "string",
        "object": "radar.value_list_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "radar.value_list"
}
```

</div>
</details>

<details>
<summary>updateValueList</summary>

<div>

Update a value list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `valueList` | <code>string</code> | Yes | The value list parameter. |
| `payload` | <code>UpdateValueListRequest</code> | Yes | Request payload to update a value list. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `RadarValueList|error`

**Sample code:**

```ballerina
stripe:RadarValueList result = check stripeClient->updateValueList("string", {
    expand: ["string"],
    name: "Sample name",
    alias: "string"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "item_type": "account",
  "name": "Sample name",
  "alias": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_by": "string",
  "list_items": {
    "data": [
      {
        "livemode": false,
        "created": 1,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "value_list": "string",
        "created_by": "string",
        "value": "string",
        "object": "radar.value_list_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "radar.value_list"
}
```

</div>
</details>

<details>
<summary>deleteValueList</summary>

<div>

Delete a value list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `valueList` | <code>string</code> | Yes | The value list parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedRadarValueList|error`

**Sample code:**

```ballerina
stripe:DeletedRadarValueList result = check stripeClient->deleteValueList("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "radar.value_list"
}
```

</div>
</details>

#### Refunds

<details>
<summary>listRefunds</summary>

<div>

List all refunds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListRefundsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `charge` | <code>string</code> | No | Only return refunds for the charge specified by this charge ID. |
| `created` | <code>Created36</code> | No | Only return refunds that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `paymentIntent` | <code>string</code> | No | Only return refunds for the PaymentIntent specified by this ID. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `APIMethodRefundList|error`

**Sample code:**

```ballerina
stripe:APIMethodRefundList result = check stripeClient->listRefunds();
```

**Sample response:**

```json
{
  "data": [
    {
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "amount": 1,
      "created": 1,
      "object": "refund"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createRefund</summary>

<div>

Create a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateRefundRequest</code> | Yes | Request payload to create a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->createRefund({
    reason: "duplicate",
    amount: 1,
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>getRefund</summary>

<div>

Retrieve a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetRefundQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->getRefund("string");
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>updateRefund</summary>

<div>

Update a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->updateRefund("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>cancelRefund</summary>

<div>

Cancel a refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel a refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->cancelRefund("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

#### Reporting

<details>
<summary>listReportRuns</summary>

<div>

List all Report Runs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListReportRunsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created37</code> | No | Only return Report Runs that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `FinancialReportingFinanceReportRunList|error`

**Sample code:**

```ballerina
stripe:FinancialReportingFinanceReportRunList result = check stripeClient->listReportRuns();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "report_type": "string",
      "parameters": {},
      "object": "reporting.report_run",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createReportRun</summary>

<div>

Create a Report Run.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateReportRunRequest</code> | Yes | Request payload to create a Report Run. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ReportingReportRun|error`

**Sample code:**

```ballerina
stripe:ReportingReportRun result = check stripeClient->createReportRun({
    reportType: "string",
    expand: ["string"],
    parameters: {
        intervalEnd: 1,
        connectedAccount: "string",
        columns: ["string"]
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report_type": "string",
  "parameters": {
    "interval_end": 1,
    "connected_account": "string",
    "columns": [
      "string"
    ]
  },
  "object": "reporting.report_run",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getReportRun</summary>

<div>

Retrieve a Report Run.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportRun` | <code>string</code> | Yes | The report run parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReportRunQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ReportingReportRun|error`

**Sample code:**

```ballerina
stripe:ReportingReportRun result = check stripeClient->getReportRun("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "report_type": "string",
  "parameters": {
    "interval_end": 1,
    "connected_account": "string",
    "columns": [
      "string"
    ]
  },
  "object": "reporting.report_run",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>listReportTypes</summary>

<div>

List all Report Types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListReportTypesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `FinancialReportingFinanceReportTypeList|error`

**Sample code:**

```ballerina
stripe:FinancialReportingFinanceReportTypeList result = check stripeClient->listReportTypes();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "name": "Sample name",
      "data_available_start": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "data_available_end": 1,
      "updated": 1,
      "version": 1,
      "object": "reporting.report_type"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getReportType</summary>

<div>

Retrieve a Report Type.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reportType` | <code>string</code> | Yes | The report type parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReportTypeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ReportingReportType|error`

**Sample code:**

```ballerina
stripe:ReportingReportType result = check stripeClient->getReportType("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "name": "Sample name",
  "data_available_start": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "data_available_end": 1,
  "updated": 1,
  "version": 1,
  "object": "reporting.report_type"
}
```

</div>
</details>

#### Reviews

<details>
<summary>listReviews</summary>

<div>

List all open reviews.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListReviewsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created38</code> | No | Only return reviews that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `RadarReviewList|error`

**Sample code:**

```ballerina
stripe:RadarReviewList result = check stripeClient->listReviews();
```

**Sample response:**

```json
{
  "data": [
    {
      "reason": "string",
      "livemode": false,
      "created": 1,
      "opened_reason": "manual",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "open": false,
      "object": "review"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getReview</summary>

<div>

Retrieve a review.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `review` | <code>string</code> | Yes | The review parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReviewQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Review|error`

**Sample code:**

```ballerina
stripe:Review result = check stripeClient->getReview("string");
```

**Sample response:**

```json
{
  "reason": "string",
  "livemode": false,
  "created": 1,
  "opened_reason": "manual",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "open": false,
  "object": "review"
}
```

</div>
</details>

<details>
<summary>approveReview</summary>

<div>

Approve a review.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `review` | <code>string</code> | Yes | The review parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to approve a review. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Review|error`

**Sample code:**

```ballerina
stripe:Review result = check stripeClient->approveReview("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "reason": "string",
  "livemode": false,
  "created": 1,
  "opened_reason": "manual",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "open": false,
  "object": "review"
}
```

</div>
</details>

#### Setup attempts

<details>
<summary>listSetupAttempts</summary>

<div>

List all SetupAttempts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSetupAttemptsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `setupIntent` | <code>string</code> | Yes | Only return SetupAttempts created by the SetupIntent specified by this ID. |
| `created` | <code>Created39</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp or a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `PaymentFlowsSetupIntentSetupAttemptList|error`

**Sample code:**

```ballerina
stripe:PaymentFlowsSetupIntentSetupAttemptList result = check stripeClient->listSetupAttempts(setupIntent = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "setup_intent": "string",
      "created": 1,
      "usage": "string",
      "payment_method_details": {
        "type": "string"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payment_method": "string",
      "object": "setup_attempt",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

#### Setup intents

<details>
<summary>listSetupIntents</summary>

<div>

List all SetupIntents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | Only return SetupIntents for the account specified by this customer ID. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSetupIntentsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created40</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `attachToSelf` | <code>boolean</code> | No | If present, the SetupIntent's payment method will be attached to the in-context Stripe Account. It can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `paymentMethod` | <code>string</code> | No | Only return SetupIntents that associate with the specified payment method. |
| `customer` | <code>string</code> | No | Only return SetupIntents for the customer specified by this customer ID. |

**Returns:** `PaymentFlowsSetupIntentList|error`

**Sample code:**

```ballerina
stripe:PaymentFlowsSetupIntentList result = check stripeClient->listSetupIntents();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "usage": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created": 1,
      "payment_method_types": [
        "string"
      ],
      "object": "setup_intent",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createSetupIntent</summary>

<div>

Create a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSetupIntentRequest</code> | Yes | Request payload to create a SetupIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->createSetupIntent({
    customerAccount: "string",
    paymentMethodConfiguration: "string",
    flowDirections: ["inbound"],
    onBehalfOf: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getSetupIntent</summary>

<div>

Retrieve a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSetupIntentQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `clientSecret` | <code>string</code> | No | The client secret of the SetupIntent. We require this string if you use a publishable key to retrieve the SetupIntent. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->getSetupIntent("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>updateSetupIntent</summary>

<div>

Update a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>UpdateSetupIntentRequest</code> | Yes | Request payload to update a SetupIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->updateSetupIntent("string", {
    customerAccount: "string",
    paymentMethodConfiguration: "string",
    metadata: "",
    flowDirections: ["inbound"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelSetupIntent</summary>

<div>

Cancel a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>CancelSetupIntentRequest</code> | Yes | Request payload to cancel a SetupIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->cancelSetupIntent("string", {
    expand: ["string"],
    cancellationReason: "abandoned"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>confirmSetupIntent</summary>

<div>

Confirm a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>ConfirmSetupIntentRequest</code> | Yes | Request payload to confirm a SetupIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->confirmSetupIntent("string", {
    expand: ["string"],
    paymentMethodData: {
        'type: "acss_debit",
        boleto: {
            taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        auBecsDebit: {
            bsbNumber: "INV-0001",
            accountNumber: "INV-0001"
        }
    },
    returnUrl: "https://example.com/resource",
    clientSecret: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>verifyMicrodepositsSetupIntent</summary>

<div>

Verify microdeposits on a SetupIntent.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `intent` | <code>string</code> | Yes | The intent parameter. |
| `payload` | <code>VerifyMicrodepositsSetupIntentRequest</code> | Yes | Request payload to verify microdeposits on a SetupIntent. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SetupIntent|error`

**Sample code:**

```ballerina
stripe:SetupIntent result = check stripeClient->verifyMicrodepositsSetupIntent("string", {
    expand: ["string"],
    amounts: [1],
    descriptorCode: "200",
    clientSecret: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "usage": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created": 1,
  "payment_method_types": [
    "string"
  ],
  "object": "setup_intent",
  "status": "canceled"
}
```

</div>
</details>

#### Shipping rates

<details>
<summary>listShippingRates</summary>

<div>

List all shipping rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListShippingRatesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created41</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Only return shipping rates that are active or inactive. |
| `currency` | <code>string</code> | No | Only return shipping rates for the given currency. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ShippingResourcesShippingRateList|error`

**Sample code:**

```ballerina
stripe:ShippingResourcesShippingRateList result = check stripeClient->listShippingRates();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "created": 1,
      "active": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "fixed_amount",
      "object": "shipping_rate"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createShippingRate</summary>

<div>

Create a shipping rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateShippingRateRequest</code> | Yes | Request payload to create a shipping rate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShippingRate|error`

**Sample code:**

```ballerina
stripe:ShippingRate result = check stripeClient->createShippingRate({
    displayName: "Sample name",
    taxBehavior: "exclusive",
    expand: ["string"],
    fixedAmount: {
        amount: 1,
        currency: "string"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "fixed_amount",
  "object": "shipping_rate"
}
```

</div>
</details>

<details>
<summary>getShippingRate</summary>

<div>

Retrieve a shipping rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shippingRateToken` | <code>string</code> | Yes | The shipping rate token parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetShippingRateQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ShippingRate|error`

**Sample code:**

```ballerina
stripe:ShippingRate result = check stripeClient->getShippingRate("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "fixed_amount",
  "object": "shipping_rate"
}
```

</div>
</details>

<details>
<summary>updateShippingRate</summary>

<div>

Update a shipping rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `shippingRateToken` | <code>string</code> | Yes | The shipping rate token parameter. |
| `payload` | <code>UpdateShippingRateRequest</code> | Yes | Request payload to update a shipping rate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ShippingRate|error`

**Sample code:**

```ballerina
stripe:ShippingRate result = check stripeClient->updateShippingRate("string", {
    taxBehavior: "exclusive",
    expand: ["string"],
    metadata: "",
    active: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "created": 1,
  "active": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "fixed_amount",
  "object": "shipping_rate"
}
```

</div>
</details>

#### Sigma

<details>
<summary>updateSavedQuery</summary>

<div>

Update an existing Sigma Query.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The `id` of the saved query to update. This should be a valid `id` that was previously created. |
| `payload` | <code>UpdateSavedQueryRequest</code> | Yes | Request payload to update an existing Sigma Query. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SigmaSigmaApiQuery|error`

**Sample code:**

```ballerina
stripe:SigmaSigmaApiQuery result = check stripeClient->updateSavedQuery("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    name: "Sample name",
    sql: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "sigma.sigma_api_query",
  "sql": "string"
}
```

</div>
</details>

<details>
<summary>listScheduledQueryRuns</summary>

<div>

List all scheduled query runs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListScheduledQueryRunsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `SigmaScheduledQueryRunList|error`

**Sample code:**

```ballerina
stripe:SigmaScheduledQueryRunList result = check stripeClient->listScheduledQueryRuns();
```

**Sample response:**

```json
{
  "data": [
    {
      "data_load_time": 1,
      "result_available_until": 1,
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "object": "scheduled_query_run",
      "sql": "string",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getScheduledQueryRun</summary>

<div>

Retrieve a scheduled query run.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `scheduledQueryRun` | <code>string</code> | Yes | The scheduled query run parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetScheduledQueryRunQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ScheduledQueryRun|error`

**Sample code:**

```ballerina
stripe:ScheduledQueryRun result = check stripeClient->getScheduledQueryRun("string");
```

**Sample response:**

```json
{
  "data_load_time": 1,
  "result_available_until": 1,
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "object": "scheduled_query_run",
  "sql": "string",
  "status": "string"
}
```

</div>
</details>

#### Sources

<details>
<summary>createSource</summary>

<div>

Create a source.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSourceRequest</code> | Yes | Request payload to create a source. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Source|error`

**Sample code:**

```ballerina
stripe:Source result = check stripeClient->createSource({
    owner: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    redirect: {
        returnUrl: "https://example.com/resource"
    },
    amount: 1,
    mandate: {
        amount: "",
        notificationMethod: "deprecated_none",
        acceptance: {
            status: "accepted"
        }
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "type": "ach_credit_transfer",
  "client_secret": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "flow": "string",
  "created": 1,
  "object": "source",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getSource</summary>

<div>

Retrieve a source + 'source - The source parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'source` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSourceQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `clientSecret` | <code>string</code> | No | The client secret of the source. Required if a publishable key is used to retrieve the source. |

**Returns:** `Source|error`

**Sample code:**

```ballerina
stripe:Source result = check stripeClient->getSource("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "type": "ach_credit_transfer",
  "client_secret": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "flow": "string",
  "created": 1,
  "object": "source",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>updateSource</summary>

<div>

Update a source + 'source - The source parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'source` | <code>string</code> | Yes |  |
| `payload` | <code>UpdateSourceRequest</code> | Yes | Request payload to update a source. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Source|error`

**Sample code:**

```ballerina
stripe:Source result = check stripeClient->updateSource("string", {
    owner: {
        phone: "string",
        name: "Sample name",
        email: "user@example.com"
    },
    amount: 1,
    expand: ["string"],
    mandate: {
        amount: "",
        notificationMethod: "deprecated_none",
        acceptance: {
            status: "accepted"
        }
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "type": "ach_credit_transfer",
  "client_secret": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "flow": "string",
  "created": 1,
  "object": "source",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getMandateNotification</summary>

<div>

Retrieve a Source MandateNotification.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mandateNotification` | <code>string</code> | Yes | The mandate notification parameter. |
| `'source` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetMandateNotificationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `SourceMandateNotification|error`

**Sample code:**

```ballerina
stripe:SourceMandateNotification result = check stripeClient->getMandateNotification("2026-01-15T00:00:00", "string");
```

**Sample response:**

```json
{
  "reason": "string",
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "source": {
    "livemode": false,
    "type": "ach_credit_transfer",
    "client_secret": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "flow": "string",
    "created": 1,
    "object": "source",
    "status": "string"
  },
  "type": "string",
  "object": "source_mandate_notification",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>listSourceTransactions</summary>

<div>

List source transactions + 'source - The source parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'source` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSourceTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `ApmsSourcesSourceTransactionList|error`

**Sample code:**

```ballerina
stripe:ApmsSourcesSourceTransactionList result = check stripeClient->listSourceTransactions("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "livemode": false,
      "created": 1,
      "source": "string",
      "type": "ach_credit_transfer",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "source_transaction",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getSourceTransaction</summary>

<div>

Retrieve a source transaction + 'source - The source parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'source` | <code>string</code> | Yes |  |
| `sourceTransaction` | <code>string</code> | Yes | The source transaction parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSourceTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `SourceTransaction|error`

**Sample code:**

```ballerina
stripe:SourceTransaction result = check stripeClient->getSourceTransaction("string", "string");
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "created": 1,
  "source": "string",
  "type": "ach_credit_transfer",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "source_transaction",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>verifySource</summary>

<div>

Verify a source + 'source - The source parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'source` | <code>string</code> | Yes |  |
| `payload` | <code>VerifySourceRequest</code> | Yes | Request payload to the operation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Source|error`

**Sample code:**

```ballerina
stripe:Source result = check stripeClient->verifySource("string", {
    values: ["string"],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "type": "ach_credit_transfer",
  "client_secret": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "flow": "string",
  "created": 1,
  "object": "source",
  "status": "string"
}
```

</div>
</details>

#### Subscription items

<details>
<summary>listSubscriptionItems</summary>

<div>

List all subscription items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSubscriptionItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `subscription` | <code>string</code> | Yes | The ID of the subscription whose items will be retrieved. |

**Returns:** `SubscriptionsItemsSubscriptionItemList|error`

**Sample code:**

```ballerina
stripe:SubscriptionsItemsSubscriptionItemList result = check stripeClient->listSubscriptionItems(subscription = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "created": 1,
      "subscription": "string",
      "current_period_end": 1,
      "discounts": [
        "string"
      ],
      "price": {
        "metadata": {},
        "product": "string",
        "livemode": false,
        "created": 1,
        "active": false,
        "billing_scheme": "per_unit",
        "type": "one_time",
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "price"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "current_period_start": 1,
      "object": "subscription_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createSubscriptionItem</summary>

<div>

Create a subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSubscriptionItemRequest</code> | Yes | Request payload to create a subscription item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionItem|error`

**Sample code:**

```ballerina
stripe:SubscriptionItem result = check stripeClient->createSubscriptionItem({
    subscription: "string",
    currentTrial: {
        trialOffer: "string"
    },
    priceData: {
        product: "string",
        recurring: {
            interval: "day"
        },
        currency: "string"
    },
    paymentBehavior: "allow_incomplete"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "created": 1,
  "subscription": "string",
  "current_period_end": 1,
  "discounts": [
    "string"
  ],
  "price": {
    "metadata": {},
    "product": "string",
    "livemode": false,
    "created": 1,
    "active": false,
    "billing_scheme": "per_unit",
    "type": "one_time",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "price"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "current_period_start": 1,
  "object": "subscription_item"
}
```

</div>
</details>

<details>
<summary>getSubscriptionItem</summary>

<div>

Retrieve a subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `item` | <code>string</code> | Yes | The item parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSubscriptionItemQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `SubscriptionItem|error`

**Sample code:**

```ballerina
stripe:SubscriptionItem result = check stripeClient->getSubscriptionItem("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "created": 1,
  "subscription": "string",
  "current_period_end": 1,
  "discounts": [
    "string"
  ],
  "price": {
    "metadata": {},
    "product": "string",
    "livemode": false,
    "created": 1,
    "active": false,
    "billing_scheme": "per_unit",
    "type": "one_time",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "price"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "current_period_start": 1,
  "object": "subscription_item"
}
```

</div>
</details>

<details>
<summary>updateSubscriptionItem</summary>

<div>

Update a subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `item` | <code>string</code> | Yes | The item parameter. |
| `payload` | <code>UpdateSubscriptionItemRequest</code> | Yes | Request payload to update a subscription item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionItem|error`

**Sample code:**

```ballerina
stripe:SubscriptionItem result = check stripeClient->updateSubscriptionItem("string", {
    currentTrial: {
        trialOffer: "string"
    },
    metadata: "",
    priceData: {
        product: "string",
        recurring: {
            interval: "day"
        },
        currency: "string"
    },
    paymentBehavior: "allow_incomplete"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "created": 1,
  "subscription": "string",
  "current_period_end": 1,
  "discounts": [
    "string"
  ],
  "price": {
    "metadata": {},
    "product": "string",
    "livemode": false,
    "created": 1,
    "active": false,
    "billing_scheme": "per_unit",
    "type": "one_time",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "price"
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "current_period_start": 1,
  "object": "subscription_item"
}
```

</div>
</details>

<details>
<summary>deleteSubscriptionItem</summary>

<div>

Delete a subscription item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `item` | <code>string</code> | Yes | The item parameter. |
| `payload` | <code>DeleteSubscriptionItemRequest</code> | Yes | Request payload to delete a subscription item. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedSubscriptionItem|error`

**Sample code:**

```ballerina
stripe:DeletedSubscriptionItem result = check stripeClient->deleteSubscriptionItem("string", {
    paymentBehavior: "allow_incomplete",
    clearUsage: false,
    prorationBehavior: "always_invoice",
    prorationDate: 1
});
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "subscription_item"
}
```

</div>
</details>

#### Subscription schedules

<details>
<summary>listSubscriptionSchedules</summary>

<div>

List all schedules.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `completedAt` | <code>CompletedAt</code> | No | Only return subscription schedules that completed during the given date interval. |
| `customerAccount` | <code>string</code> | No | Only return subscription schedules for the given account. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSubscriptionSchedulesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `canceledAt` | <code>CanceledAt</code> | No | Only return subscription schedules that were created canceled the given date interval. |
| `created` | <code>Created42</code> | No | Only return subscription schedules that were created during the given date interval. |
| `scheduled` | <code>boolean</code> | No | Only return subscription schedules that have not started yet. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `releasedAt` | <code>ReleasedAt</code> | No | Only return subscription schedules that were released during the given date interval. |
| `customer` | <code>string</code> | No | Only return subscription schedules for the given customer. The response will not include subscription schedules for customers with a test clock attached if this parameter is not set. |

**Returns:** `SubscriptionSchedulesResourceScheduleList|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedulesResourceScheduleList result = check stripeClient->listSubscriptionSchedules();
```

**Sample response:**

```json
{
  "data": [
    {
      "billing_mode": {
        "type": "classic"
      },
      "livemode": false,
      "created": 1,
      "end_behavior": "cancel",
      "default_settings": {
        "invoice_settings": {
          "issuer": {
            "type": "account"
          }
        },
        "billing_cycle_anchor": "automatic"
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "phases": [
        {
          "end_date": 1,
          "discounts": [
            {}
          ],
          "add_invoice_items": [
            {
              "period": {
                "start": {},
                "end": {}
              },
              "discounts": [
                {}
              ],
              "price": "string"
            }
          ],
          "currency": "string",
          "proration_behavior": "always_invoice",
          "items": [
            {
              "discounts": [
                {}
              ],
              "price": "string"
            }
          ],
          "start_date": 1
        }
      ],
      "customer": "string",
      "object": "subscription_schedule",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createSubscriptionSchedule</summary>

<div>

Create a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSubscriptionScheduleRequest</code> | Yes | Request payload to create a schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionSchedule|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedule result = check stripeClient->createSubscriptionSchedule({
    customerAccount: "string",
    expand: ["string"],
    metadata: "",
    billingMode: {
        'type: "classic"
    }
});
```

**Sample response:**

```json
{
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "livemode": false,
  "created": 1,
  "end_behavior": "cancel",
  "default_settings": {
    "invoice_settings": {
      "issuer": {
        "type": "account"
      }
    },
    "billing_cycle_anchor": "automatic",
    "transfer_data": {
      "destination": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "phases": [
    {
      "end_date": 1,
      "discounts": [
        {}
      ],
      "add_invoice_items": [
        {
          "period": {
            "start": {
              "type": "max_item_period_start"
            },
            "end": {
              "type": "min_item_period_end"
            }
          },
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "currency": "string",
      "proration_behavior": "always_invoice",
      "items": [
        {
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "start_date": 1
    }
  ],
  "customer": "string",
  "object": "subscription_schedule",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getSubscriptionSchedule</summary>

<div>

Retrieve a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schedule` | <code>string</code> | Yes | The schedule parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSubscriptionScheduleQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `SubscriptionSchedule|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedule result = check stripeClient->getSubscriptionSchedule("string");
```

**Sample response:**

```json
{
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "livemode": false,
  "created": 1,
  "end_behavior": "cancel",
  "default_settings": {
    "invoice_settings": {
      "issuer": {
        "type": "account"
      }
    },
    "billing_cycle_anchor": "automatic",
    "transfer_data": {
      "destination": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "phases": [
    {
      "end_date": 1,
      "discounts": [
        {}
      ],
      "add_invoice_items": [
        {
          "period": {
            "start": {
              "type": "max_item_period_start"
            },
            "end": {
              "type": "min_item_period_end"
            }
          },
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "currency": "string",
      "proration_behavior": "always_invoice",
      "items": [
        {
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "start_date": 1
    }
  ],
  "customer": "string",
  "object": "subscription_schedule",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateSubscriptionSchedule</summary>

<div>

Update a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schedule` | <code>string</code> | Yes | The schedule parameter. |
| `payload` | <code>UpdateSubscriptionScheduleRequest</code> | Yes | Request payload to update a schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionSchedule|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedule result = check stripeClient->updateSubscriptionSchedule("string", {
    expand: ["string"],
    metadata: "",
    endBehavior: "cancel",
    defaultSettings: {
        transferData: "",
        automaticTax: {
            enabled: false
        },
        onBehalfOf: ""
    }
});
```

**Sample response:**

```json
{
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "livemode": false,
  "created": 1,
  "end_behavior": "cancel",
  "default_settings": {
    "invoice_settings": {
      "issuer": {
        "type": "account"
      }
    },
    "billing_cycle_anchor": "automatic",
    "transfer_data": {
      "destination": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "phases": [
    {
      "end_date": 1,
      "discounts": [
        {}
      ],
      "add_invoice_items": [
        {
          "period": {
            "start": {
              "type": "max_item_period_start"
            },
            "end": {
              "type": "min_item_period_end"
            }
          },
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "currency": "string",
      "proration_behavior": "always_invoice",
      "items": [
        {
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "start_date": 1
    }
  ],
  "customer": "string",
  "object": "subscription_schedule",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>cancelSubscriptionSchedule</summary>

<div>

Cancel a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schedule` | <code>string</code> | Yes | The schedule parameter. |
| `payload` | <code>CancelSubscriptionScheduleRequest</code> | Yes | Request payload to cancel a schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionSchedule|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedule result = check stripeClient->cancelSubscriptionSchedule("string", {
    expand: ["string"],
    invoiceNow: false,
    prorate: false
});
```

**Sample response:**

```json
{
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "livemode": false,
  "created": 1,
  "end_behavior": "cancel",
  "default_settings": {
    "invoice_settings": {
      "issuer": {
        "type": "account"
      }
    },
    "billing_cycle_anchor": "automatic",
    "transfer_data": {
      "destination": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "phases": [
    {
      "end_date": 1,
      "discounts": [
        {}
      ],
      "add_invoice_items": [
        {
          "period": {
            "start": {
              "type": "max_item_period_start"
            },
            "end": {
              "type": "min_item_period_end"
            }
          },
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "currency": "string",
      "proration_behavior": "always_invoice",
      "items": [
        {
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "start_date": 1
    }
  ],
  "customer": "string",
  "object": "subscription_schedule",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>releaseSubscriptionSchedule</summary>

<div>

Release a schedule.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schedule` | <code>string</code> | Yes | The schedule parameter. |
| `payload` | <code>ReleaseSubscriptionScheduleRequest</code> | Yes | Request payload to release a schedule. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `SubscriptionSchedule|error`

**Sample code:**

```ballerina
stripe:SubscriptionSchedule result = check stripeClient->releaseSubscriptionSchedule("string", {
    preserveCancelDate: false,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "livemode": false,
  "created": 1,
  "end_behavior": "cancel",
  "default_settings": {
    "invoice_settings": {
      "issuer": {
        "type": "account"
      }
    },
    "billing_cycle_anchor": "automatic",
    "transfer_data": {
      "destination": "string"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "phases": [
    {
      "end_date": 1,
      "discounts": [
        {}
      ],
      "add_invoice_items": [
        {
          "period": {
            "start": {
              "type": "max_item_period_start"
            },
            "end": {
              "type": "min_item_period_end"
            }
          },
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "currency": "string",
      "proration_behavior": "always_invoice",
      "items": [
        {
          "discounts": [
            {}
          ],
          "price": "string"
        }
      ],
      "start_date": 1
    }
  ],
  "customer": "string",
  "object": "subscription_schedule",
  "status": "active"
}
```

</div>
</details>

#### Subscriptions

<details>
<summary>listSubscriptions</summary>

<div>

List subscriptions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `customerAccount` | <code>string</code> | No | The ID of the account representing the customer whose subscriptions you're retrieving. |
| `testClock` | <code>string</code> | No | Filter for subscriptions that are associated with the specified test clock. The response will not include subscriptions with test clocks if this and the customer parameter is not set. |
| `created` | <code>Created43</code> | No | Only return subscriptions that were created during the given date interval. |
| `currentPeriodEnd` | <code>CurrentPeriodEnd</code> | No | Only return subscriptions whose minimum item current_period_end falls within the given date interval. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListSubscriptionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `automaticTax` | <code>AutomaticTaxFilterParams</code> | No | Filter subscriptions by their automatic tax settings. |
| `price` | <code>string</code> | No | Filter for subscriptions that contain this recurring price ID. |
| `collectionMethod` | <code>"charge_automatically"&#124;"send_invoice"</code> | No | The collection method of the subscriptions to retrieve. Either `charge_automatically` or `send_invoice`. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `currentPeriodStart` | <code>CurrentPeriodStart</code> | No | Only return subscriptions whose maximum item current_period_start falls within the given date interval. |
| `customer` | <code>string</code> | No | The ID of the customer whose subscriptions you're retrieving. |
| `status` | <code>"active"&#124;"all"&#124;"canceled"&#124;"ended"&#124;"incomplete"&#124;"incomplete_expired"&#124;"past_due"&#124;"paused"&#124;"trialing"&#124;"unpaid"</code> | No | The status of the subscriptions to retrieve. Passing in a value of `canceled` will return all canceled subscriptions, including those belonging to deleted customers. Pass `ended` to find subscriptions that are canceled and subscriptions that are expired due to [incomplete payment](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses). Passing in a value of `all` will return subscriptions of all statuses. If no value is supplied, all subscriptions that have not been canceled are returned. |

**Returns:** `SubscriptionsSubscriptionList|error`

**Sample code:**

```ballerina
stripe:SubscriptionsSubscriptionList result = check stripeClient->listSubscriptions();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "cancel_at_period_end": false,
      "livemode": false,
      "discounts": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "invoice_settings": {
        "issuer": {
          "type": "account"
        }
      },
      "created": 1,
      "billing_schedules": [
        {
          "bill_until": {
            "computed_timestamp": 1,
            "type": "duration"
          },
          "key": "string"
        }
      ],
      "items": {
        "data": [
          {
            "metadata": {},
            "created": 1,
            "subscription": "string",
            "current_period_end": 1,
            "discounts": [
              "string"
            ],
            "price": {
              "metadata": {},
              "product": "string",
              "livemode": false,
              "created": 1,
              "active": false,
              "billing_scheme": "per_unit",
              "type": "one_time",
              "currency": "string",
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "object": "price"
            },
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "current_period_start": 1,
            "object": "subscription_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "object": "subscription",
      "status": "active",
      "billing_mode": {
        "type": "classic"
      },
      "currency": "string",
      "start_date": 1,
      "billing_cycle_anchor": 1,
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "customer": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createSubscription</summary>

<div>

Create a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSubscriptionRequest</code> | Yes | Request payload to create a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->createSubscription({
    billingCycleAnchorConfig: {
        dayOfMonth: 1,
        hour: 1,
        month: 1
    },
    metadata: "",
    paymentBehavior: "allow_incomplete",
    billingMode: {
        'type: "classic"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>searchSubscriptions</summary>

<div>

Search subscriptions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>SearchSubscriptionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `query` | <code>string</code> | Yes | The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for subscriptions](https://docs.stripe.com/search#query-fields-for-subscriptions). |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `page` | <code>string</code> | No | A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results. |

**Returns:** `SearchResult6|error`

**Sample code:**

```ballerina
stripe:SearchResult6 result = check stripeClient->searchSubscriptions(query = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "cancel_at_period_end": false,
      "livemode": false,
      "discounts": [
        "string"
      ],
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "invoice_settings": {
        "issuer": {
          "type": "account"
        }
      },
      "created": 1,
      "billing_schedules": [
        {
          "bill_until": {
            "computed_timestamp": 1,
            "type": "duration"
          },
          "key": "string"
        }
      ],
      "items": {
        "data": [
          {
            "metadata": {},
            "created": 1,
            "subscription": "string",
            "current_period_end": 1,
            "discounts": [
              "string"
            ],
            "price": {
              "metadata": {},
              "product": "string",
              "livemode": false,
              "created": 1,
              "active": false,
              "billing_scheme": "per_unit",
              "type": "one_time",
              "currency": "string",
              "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "object": "price"
            },
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "current_period_start": 1,
            "object": "subscription_item"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "object": "subscription",
      "status": "active",
      "billing_mode": {
        "type": "classic"
      },
      "currency": "string",
      "start_date": 1,
      "billing_cycle_anchor": 1,
      "automatic_tax": {
        "enabled": false
      },
      "collection_method": "charge_automatically",
      "customer": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "search_result",
  "next_page": "string",
  "total_count": 1
}
```

</div>
</details>

<details>
<summary>getSubscription</summary>

<div>

Retrieve a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetSubscriptionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->getSubscription("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>updateSubscription</summary>

<div>

Update a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `payload` | <code>UpdateSubscriptionRequest</code> | Yes | Request payload to update a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->updateSubscription("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    metadata: "",
    paymentBehavior: "allow_incomplete",
    cancelAtPeriodEnd: false,
    daysUntilDue: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>deleteSubscription</summary>

<div>

Cancel a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `payload` | <code>DeleteSubscriptionRequest</code> | Yes | Request payload to cancel a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->deleteSubscription("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    invoiceNow: false,
    cancellationDetails: {
        feedback: "",
        comment: "",
        feedbackOption: "string"
    },
    prorate: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>deleteSubscriptionDiscount</summary>

<div>

Delete a subscription discount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionExposedId` | <code>string</code> | Yes | The subscription exposed id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedDiscount|error`

**Sample code:**

```ballerina
stripe:DeletedDiscount result = check stripeClient->deleteSubscriptionDiscount("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start": 1,
  "source": {
    "type": "coupon",
    "coupon": "string"
  },
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "discount",
  "customer_account": "string"
}
```

</div>
</details>

<details>
<summary>migrateSubscription</summary>

<div>

Migrate a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscription` | <code>string</code> | Yes | The subscription parameter. |
| `payload` | <code>MigrateSubscriptionRequest</code> | Yes | Request payload to migrate a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->migrateSubscription("string", {
    billingMode: {
        'type: "flexible"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>pauseSubscription</summary>

<div>

Pause a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscription` | <code>string</code> | Yes | The subscription parameter. |
| `payload` | <code>PauseSubscriptionRequest</code> | Yes | Request payload to pause a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->pauseSubscription("string", {
    invoicingBehavior: "invoice",
    expand: ["string"],
    billFor: {
        unusedTimeFrom: {
            'type: "item_current_period_start"
        },
        outstandingUsageThrough: {
            'type: "none"
        }
    },
    'type: "subscription"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

<details>
<summary>resumeSubscription</summary>

<div>

Resume a subscription.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscription` | <code>string</code> | Yes | The subscription parameter. |
| `payload` | <code>ResumeSubscriptionRequest</code> | Yes | Request payload to resume a subscription. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Subscription|error`

**Sample code:**

```ballerina
stripe:Subscription result = check stripeClient->resumeSubscription("string", {
    expand: ["string"],
    paymentBehavior: "resume_on_payment_attempt",
    prorationBehavior: "always_invoice",
    billingCycleAnchor: {
        'type: "now"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "cancel_at_period_end": false,
  "livemode": false,
  "discounts": [
    "string"
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "invoice_settings": {
    "issuer": {
      "type": "account"
    },
    "account_tax_ids": [
      "string"
    ],
    "footer": "string"
  },
  "created": 1,
  "billing_schedules": [
    {
      "bill_until": {
        "computed_timestamp": 1,
        "type": "duration"
      },
      "key": "string",
      "applies_to": [
        {
          "type": "price"
        }
      ]
    }
  ],
  "items": {
    "data": [
      {
        "metadata": {},
        "created": 1,
        "subscription": "string",
        "current_period_end": 1,
        "discounts": [
          "string"
        ],
        "price": {
          "metadata": {},
          "product": "string",
          "livemode": false,
          "created": 1,
          "active": false,
          "billing_scheme": "per_unit",
          "type": "one_time",
          "currency": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "object": "price"
        },
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "current_period_start": 1,
        "object": "subscription_item"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "object": "subscription",
  "status": "active",
  "billing_mode": {
    "type": "classic",
    "updated_at": 1
  },
  "currency": "string",
  "start_date": 1,
  "billing_cycle_anchor": 1,
  "automatic_tax": {
    "enabled": false,
    "liability": {
      "type": "account"
    },
    "disabled_reason": "requires_location_inputs"
  },
  "collection_method": "charge_automatically",
  "customer": "string"
}
```

</div>
</details>

#### Tax

<details>
<summary>getAssociationFind</summary>

<div>

Find a Tax Association.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAssociationFindQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `paymentIntent` | <code>string</code> | Yes | Valid [PaymentIntent](https://docs.stripe.com/api/payment_intents/object) id. |

**Returns:** `TaxAssociation|error`

**Sample code:**

```ballerina
stripe:TaxAssociation result = check stripeClient->getAssociationFind(paymentIntent = "string");
```

**Sample response:**

```json
{
  "calculation": "string",
  "payment_intent": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax.association",
  "tax_transaction_attempts": [
    {
      "source": "string",
      "status": "string",
      "committed": {
        "transaction": "string"
      }
    }
  ]
}
```

</div>
</details>

<details>
<summary>createCalculation</summary>

<div>

Create a Calculation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCalculationRequest</code> | Yes | Request payload to create a Calculation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxCalculation|error`

**Sample code:**

```ballerina
stripe:TaxCalculation result = check stripeClient->createCalculation({
    currency: "string",
    lineItems: [{
        amount: 1,
        reference: "REF-001",
        taxBehavior: "exclusive"
    }],
    taxDate: 1,
    customerDetails: {
        taxabilityOverride: "customer_exempt",
        address: {
            country: "string"
        },
        taxIds: [{
            'type: "ad_nrt",
            value: "string"
        }]
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "tax_amount_exclusive": 1,
  "tax_breakdown": [
    {
      "inclusive": false,
      "amount": 1,
      "tax_rate_details": {
        "percentage_decimal": "string"
      },
      "taxability_reason": "customer_exempt",
      "taxable_amount": 1
    }
  ],
  "amount_total": 1,
  "tax_amount_inclusive": 1,
  "tax_date": 1,
  "customer_details": {
    "taxability_override": "customer_exempt",
    "tax_ids": [
      {
        "type": "ad_nrt",
        "value": "string"
      }
    ],
    "address": {
      "country": "string"
    }
  },
  "currency": "string",
  "object": "tax.calculation"
}
```

</div>
</details>

<details>
<summary>getCalculation</summary>

<div>

Retrieve a Calculation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calculation` | <code>string</code> | Yes | The calculation parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCalculationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxCalculation|error`

**Sample code:**

```ballerina
stripe:TaxCalculation result = check stripeClient->getCalculation("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "tax_amount_exclusive": 1,
  "tax_breakdown": [
    {
      "inclusive": false,
      "amount": 1,
      "tax_rate_details": {
        "percentage_decimal": "string"
      },
      "taxability_reason": "customer_exempt",
      "taxable_amount": 1
    }
  ],
  "amount_total": 1,
  "tax_amount_inclusive": 1,
  "tax_date": 1,
  "customer_details": {
    "taxability_override": "customer_exempt",
    "tax_ids": [
      {
        "type": "ad_nrt",
        "value": "string"
      }
    ],
    "address": {
      "country": "string"
    }
  },
  "currency": "string",
  "object": "tax.calculation"
}
```

</div>
</details>

<details>
<summary>listCalculationLineItems</summary>

<div>

Retrieve a Calculation's line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calculation` | <code>string</code> | Yes | The calculation parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListCalculationLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxProductResourceTaxCalculationLineItemList|error`

**Sample code:**

```ballerina
stripe:TaxProductResourceTaxCalculationLineItemList result = check stripeClient->listCalculationLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "tax_behavior": "exclusive",
      "amount": 1,
      "quantity": 1,
      "livemode": false,
      "reference": "REF-001",
      "tax_code": "200",
      "amount_tax": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax.calculation_line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>listTaxLocations</summary>

<div>

List tax locations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTaxLocationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'type` | <code>"performance"</code> | Yes | Type of the tax location. Currently the only option is `performance`. |

**Returns:** `TaxLocationList|error`

**Sample code:**

```ballerina
stripe:TaxLocationList result = check stripeClient->listTaxLocations('type = "performance");
```

**Sample response:**

```json
{
  "data": [
    {
      "address": {},
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "performance",
      "object": "tax.location"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTaxLocation</summary>

<div>

Create a tax location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaxLocationRequest</code> | Yes | Request payload to create a tax location. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxLocation|error`

**Sample code:**

```ballerina
stripe:TaxLocation result = check stripeClient->createTaxLocation({
    address: {
        country: "string",
        city: "",
        state: ""
    },
    'type: "performance",
    expand: ["string"],
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "performance",
  "object": "tax.location",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>getTaxLocation</summary>

<div>

Retrieve a tax location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `location` | <code>string</code> | Yes | The location parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTaxLocationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxLocation|error`

**Sample code:**

```ballerina
stripe:TaxLocation result = check stripeClient->getTaxLocation("string");
```

**Sample response:**

```json
{
  "address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "performance",
  "object": "tax.location",
  "description": "Sample description"
}
```

</div>
</details>

<details>
<summary>listRegistrations</summary>

<div>

List registrations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListRegistrationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"active"&#124;"all"&#124;"expired"&#124;"scheduled"</code> | No | The status of the Tax Registration. |

**Returns:** `TaxProductRegistrationsResourceTaxRegistrationList|error`

**Sample code:**

```ballerina
stripe:TaxProductRegistrationsResourceTaxRegistrationList result = check stripeClient->listRegistrations();
```

**Sample response:**

```json
{
  "data": [
    {
      "country": "string",
      "livemode": false,
      "created": 1,
      "country_options": {},
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "active_from": 1,
      "object": "tax.registration",
      "status": "active"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createRegistration</summary>

<div>

Create a registration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateRegistrationRequest</code> | Yes | Request payload to create a registration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxRegistration|error`

**Sample code:**

```ballerina
stripe:TaxRegistration result = check stripeClient->createRegistration({
    country: "string",
    countryOptions: {
        pt: {
            'type: "ioss"
        },
        hr: {
            'type: "ioss"
        },
        hu: {
            'type: "ioss"
        }
    },
    activeFrom: "now",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "country_options": {
    "pt": {
      "type": "ioss"
    },
    "hr": {
      "type": "ioss"
    },
    "hu": {
      "type": "ioss"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active_from": 1,
  "object": "tax.registration",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>getRegistration</summary>

<div>

Retrieve a registration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetRegistrationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxRegistration|error`

**Sample code:**

```ballerina
stripe:TaxRegistration result = check stripeClient->getRegistration("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "country_options": {
    "pt": {
      "type": "ioss"
    },
    "hr": {
      "type": "ioss"
    },
    "hu": {
      "type": "ioss"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active_from": 1,
  "object": "tax.registration",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>updateRegistration</summary>

<div>

Update a registration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>UpdateRegistrationRequest</code> | Yes | Request payload to update a registration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxRegistration|error`

**Sample code:**

```ballerina
stripe:TaxRegistration result = check stripeClient->updateRegistration("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    expiresAt: "now",
    activeFrom: "now"
});
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "country_options": {
    "pt": {
      "type": "ioss"
    },
    "hr": {
      "type": "ioss"
    },
    "hu": {
      "type": "ioss"
    }
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "active_from": 1,
  "object": "tax.registration",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>listSettings</summary>

<div>

Retrieve settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListSettingsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxSettings|error`

**Sample code:**

```ballerina
stripe:TaxSettings result = check stripeClient->listSettings();
```

**Sample response:**

```json
{
  "defaults": {
    "provider": "anrok",
    "tax_behavior": "exclusive",
    "tax_code": "200"
  },
  "livemode": false,
  "status_details": {},
  "object": "tax.settings",
  "status": "active",
  "head_office": {
    "address": {}
  }
}
```

</div>
</details>

<details>
<summary>createSetting</summary>

<div>

Update settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSettingRequest</code> | Yes | Request payload to update settings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxSettings|error`

**Sample code:**

```ballerina
stripe:TaxSettings result = check stripeClient->createSetting({
    expand: ["string"],
    defaults: {
        taxBehavior: "exclusive",
        taxCode: "200"
    },
    headOffice: {
        address: {}
    }
});
```

**Sample response:**

```json
{
  "defaults": {
    "provider": "anrok",
    "tax_behavior": "exclusive",
    "tax_code": "200"
  },
  "livemode": false,
  "status_details": {},
  "object": "tax.settings",
  "status": "active",
  "head_office": {
    "address": {}
  }
}
```

</div>
</details>

<details>
<summary>createTaxTransactionFromCalculation</summary>

<div>

Create a Transaction from a Calculation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaxTransactionFromCalculationRequest</code> | Yes | Request payload to create a Transaction from a Calculation. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxTransaction|error`

**Sample code:**

```ballerina
stripe:TaxTransaction result = check stripeClient->createTaxTransactionFromCalculation({
    calculation: "string",
    reference: "REF-001",
    expand: ["string"],
    postedAt: 1
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "type": "reversal",
  "reference": "REF-001",
  "tax_date": 1,
  "customer_details": {
    "taxability_override": "customer_exempt",
    "tax_ids": [
      {
        "type": "ad_nrt",
        "value": "string"
      }
    ],
    "address": {
      "country": "string"
    }
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "posted_at": 1,
  "object": "tax.transaction"
}
```

</div>
</details>

<details>
<summary>createTaxTransactionReversal</summary>

<div>

Create a reversal Transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaxTransactionReversalRequest</code> | Yes | Request payload to create a reversal Transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxTransaction|error`

**Sample code:**

```ballerina
stripe:TaxTransaction result = check stripeClient->createTaxTransactionReversal({
    mode: "full",
    reference: "REF-001",
    originalTransaction: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "type": "reversal",
  "reference": "REF-001",
  "tax_date": 1,
  "customer_details": {
    "taxability_override": "customer_exempt",
    "tax_ids": [
      {
        "type": "ad_nrt",
        "value": "string"
      }
    ],
    "address": {
      "country": "string"
    }
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "posted_at": 1,
  "object": "tax.transaction"
}
```

</div>
</details>

<details>
<summary>getTaxTransaction</summary>

<div>

Retrieve a Transaction + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTaxTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxTransaction|error`

**Sample code:**

```ballerina
stripe:TaxTransaction result = check stripeClient->getTaxTransaction("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "type": "reversal",
  "reference": "REF-001",
  "tax_date": 1,
  "customer_details": {
    "taxability_override": "customer_exempt",
    "tax_ids": [
      {
        "type": "ad_nrt",
        "value": "string"
      }
    ],
    "address": {
      "country": "string"
    }
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "posted_at": 1,
  "object": "tax.transaction"
}
```

</div>
</details>

<details>
<summary>listTransactionLineItems</summary>

<div>

Retrieve a Transaction's line items + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTransactionLineItemsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxProductResourceTaxTransactionLineItemList|error`

**Sample code:**

```ballerina
stripe:TaxProductResourceTaxTransactionLineItemList result = check stripeClient->listTransactionLineItems("string");
```

**Sample response:**

```json
{
  "data": [
    {
      "tax_behavior": "exclusive",
      "amount": 1,
      "quantity": 1,
      "livemode": false,
      "type": "reversal",
      "reference": "REF-001",
      "tax_code": "200",
      "amount_tax": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax.transaction_line_item"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

#### Tax codes

<details>
<summary>listTaxCodes</summary>

<div>

List all tax codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTaxCodesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxProductResourceTaxCodeList|error`

**Sample code:**

```ballerina
stripe:TaxProductResourceTaxCodeList result = check stripeClient->listTaxCodes();
```

**Sample response:**

```json
{
  "data": [
    {
      "name": "Sample name",
      "description": "Sample description",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_code"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getTaxCode</summary>

<div>

Retrieve a tax code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTaxCodeQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxCode|error`

**Sample code:**

```ballerina
stripe:TaxCode result = check stripeClient->getTaxCode("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "name": "Sample name",
  "description": "Sample description",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_code",
  "requirements": {
    "performance_location": "optional"
  }
}
```

</div>
</details>

#### Tax IDs

<details>
<summary>listTaxIds</summary>

<div>

List all tax IDs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `owner` | <code>OwnerParams</code> | No | The account or customer the tax ID belongs to. Defaults to `owner[type]=self`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTaxIdsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxIDsList|error`

**Sample code:**

```ballerina
stripe:TaxIDsList result = check stripeClient->listTaxIds();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "ad_nrt",
      "value": "string",
      "object": "tax_id"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTaxId</summary>

<div>

Create a tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaxIdRequest</code> | Yes | Request payload to create a tax ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxId|error`

**Sample code:**

```ballerina
stripe:TaxId result = check stripeClient->createTaxId({
    'type: "ad_nrt",
    value: "string",
    owner: {
        'type: "account",
        customerAccount: "string",
        account: "string"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "ad_nrt",
  "value": "string",
  "object": "tax_id"
}
```

</div>
</details>

<details>
<summary>getTaxId</summary>

<div>

Retrieve a tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTaxIdQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxId|error`

**Sample code:**

```ballerina
stripe:TaxId result = check stripeClient->getTaxId("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "ad_nrt",
  "value": "string",
  "object": "tax_id"
}
```

</div>
</details>

<details>
<summary>deleteTaxId</summary>

<div>

Delete a tax ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTaxId|error`

**Sample code:**

```ballerina
stripe:DeletedTaxId result = check stripeClient->deleteTaxId("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_id"
}
```

</div>
</details>

#### Tax rates

<details>
<summary>listTaxRates</summary>

<div>

List all tax rates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `inclusive` | <code>boolean</code> | No | Optional flag to filter by tax rates that are inclusive (or those that are not inclusive). |
| `expand` | <code>ListTaxRatesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created44</code> | No | Optional range for filtering created date. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `active` | <code>boolean</code> | No | Optional flag to filter by tax rates that are either active or inactive (archived). |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TaxRatesList|error`

**Sample code:**

```ballerina
stripe:TaxRatesList result = check stripeClient->listTaxRates();
```

**Sample response:**

```json
{
  "data": [
    {
      "inclusive": false,
      "livemode": false,
      "created": 1,
      "active": false,
      "display_name": "Sample name",
      "percentage": 100.00,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "tax_rate"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTaxRate</summary>

<div>

Create a tax rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTaxRateRequest</code> | Yes | Request payload to create a tax rate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxRate|error`

**Sample code:**

```ballerina
stripe:TaxRate result = check stripeClient->createTaxRate({
    inclusive: false,
    percentage: 100.00,
    displayName: "Sample name",
    country: "string"
});
```

**Sample response:**

```json
{
  "inclusive": false,
  "livemode": false,
  "created": 1,
  "active": false,
  "display_name": "Sample name",
  "percentage": 100.00,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_rate"
}
```

</div>
</details>

<details>
<summary>getTaxRate</summary>

<div>

Retrieve a tax rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxRate` | <code>string</code> | Yes | The tax rate parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTaxRateQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TaxRate|error`

**Sample code:**

```ballerina
stripe:TaxRate result = check stripeClient->getTaxRate("string");
```

**Sample response:**

```json
{
  "inclusive": false,
  "livemode": false,
  "created": 1,
  "active": false,
  "display_name": "Sample name",
  "percentage": 100.00,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_rate"
}
```

</div>
</details>

<details>
<summary>updateTaxRate</summary>

<div>

Update a tax rate.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `taxRate` | <code>string</code> | Yes | The tax rate parameter. |
| `payload` | <code>UpdateTaxRateRequest</code> | Yes | Request payload to update a tax rate. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TaxRate|error`

**Sample code:**

```ballerina
stripe:TaxRate result = check stripeClient->updateTaxRate("string", {
    country: "string",
    expand: ["string"],
    metadata: "",
    taxType: "amusement_tax"
});
```

**Sample response:**

```json
{
  "inclusive": false,
  "livemode": false,
  "created": 1,
  "active": false,
  "display_name": "Sample name",
  "percentage": 100.00,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "tax_rate"
}
```

</div>
</details>

#### Terminal

<details>
<summary>listTerminalConfigurations</summary>

<div>

List all Configurations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `isAccountDefault` | <code>boolean</code> | No | If present, only return the account default or non-default configurations. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTerminalConfigurationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TerminalConfigurationConfigurationList|error`

**Sample code:**

```ballerina
stripe:TerminalConfigurationConfigurationList result = check stripeClient->listTerminalConfigurations();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "terminal.configuration"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTerminalConfiguration</summary>

<div>

Create a Configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTerminalConfigurationRequest</code> | Yes | Request payload to create a Configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalConfiguration|error`

**Sample code:**

```ballerina
stripe:TerminalConfiguration result = check stripeClient->createTerminalConfiguration({
    bbposWisepad3: {
        splashscreen: ""
    },
    wifi: "",
    verifoneUx700: {
        splashscreen: ""
    },
    bbposWiseposE: {
        splashscreen: ""
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.configuration",
  "bbpos_wisepad3": {
    "splashscreen": "string"
  },
  "is_account_default": false,
  "wifi": {
    "type": "enterprise_eap_peap",
    "personal_psk": {
      "password": "string",
      "ssid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "enterprise_eap_peap": {
      "password": "string",
      "ssid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "username": "Sample name"
    }
  }
}
```

</div>
</details>

<details>
<summary>getTerminalConfiguration</summary>

<div>

Retrieve a Configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTerminalConfigurationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TerminalConfigurationResponse|error`

**Sample code:**

```ballerina
stripe:TerminalConfigurationResponse result = check stripeClient->getTerminalConfiguration("string");
```

**Sample response:**

The raw response content as `TerminalConfigurationResponse`.

</div>
</details>

<details>
<summary>updateTerminalConfiguration</summary>

<div>

Update a Configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `payload` | <code>UpdateTerminalConfigurationRequest</code> | Yes | Request payload to update a Configuration. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalConfigurationResponse|error`

**Sample code:**

```ballerina
stripe:TerminalConfigurationResponse result = check stripeClient->updateTerminalConfiguration("string", {
    bbposWisepad3: "",
    wifi: "",
    verifoneUx700: "",
    bbposWiseposE: ""
});
```

**Sample response:**

The raw response content as `TerminalConfigurationResponse`.

</div>
</details>

<details>
<summary>deleteConfiguration</summary>

<div>

Delete a Configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | <code>string</code> | Yes | The configuration parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTerminalConfiguration|error`

**Sample code:**

```ballerina
stripe:DeletedTerminalConfiguration result = check stripeClient->deleteConfiguration("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.configuration"
}
```

</div>
</details>

<details>
<summary>createConnectionToken</summary>

<div>

Create a Connection Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateConnectionTokenRequest</code> | Yes | Request payload to create a Connection Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalConnectionToken|error`

**Sample code:**

```ballerina
stripe:TerminalConnectionToken result = check stripeClient->createConnectionToken({
    expand: ["string"],
    location: "string"
});
```

**Sample response:**

```json
{
  "secret": "string",
  "object": "terminal.connection_token",
  "location": "string"
}
```

</div>
</details>

<details>
<summary>listTerminalLocations</summary>

<div>

List all Locations.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTerminalLocationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TerminalLocationLocationList|error`

**Sample code:**

```ballerina
stripe:TerminalLocationLocationList result = check stripeClient->listTerminalLocations();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "address": {},
      "livemode": false,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "display_name": "Sample name",
      "object": "terminal.location"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTerminalLocation</summary>

<div>

Create a Location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTerminalLocationRequest</code> | Yes | Request payload to create a Location. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalLocation|error`

**Sample code:**

```ballerina
stripe:TerminalLocation result = check stripeClient->createTerminalLocation({
    expand: ["string"],
    metadata: "",
    address: {
        country: "string",
        city: "string",
        state: "string"
    },
    phone: "string"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "address": {
    "country": "string",
    "city": "string",
    "state": "string"
  },
  "livemode": false,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "display_name": "Sample name",
  "object": "terminal.location"
}
```

</div>
</details>

<details>
<summary>getTerminalLocation</summary>

<div>

Retrieve a Location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `location` | <code>string</code> | Yes | The location parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTerminalLocationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TerminalLocationResponse|error`

**Sample code:**

```ballerina
stripe:TerminalLocationResponse result = check stripeClient->getTerminalLocation("string");
```

**Sample response:**

The raw response content as `TerminalLocationResponse`.

</div>
</details>

<details>
<summary>updateLocation</summary>

<div>

Update a Location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `location` | <code>string</code> | Yes | The location parameter. |
| `payload` | <code>UpdateLocationRequest</code> | Yes | Request payload to update a Location. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalLocationResponse|error`

**Sample code:**

```ballerina
stripe:TerminalLocationResponse result = check stripeClient->updateLocation("string", {
    expand: ["string"],
    metadata: "",
    address: {
        country: "string",
        city: "string",
        state: "string"
    },
    phone: ""
});
```

**Sample response:**

The raw response content as `TerminalLocationResponse`.

</div>
</details>

<details>
<summary>deleteLocation</summary>

<div>

Delete a Location.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `location` | <code>string</code> | Yes | The location parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTerminalLocation|error`

**Sample code:**

```ballerina
stripe:DeletedTerminalLocation result = check stripeClient->deleteLocation("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.location"
}
```

</div>
</details>

<details>
<summary>createOnboardingLink</summary>

<div>

Create an Onboarding Link.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateOnboardingLinkRequest</code> | Yes | Request payload to create an Onboarding Link. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalOnboardingLink|error`

**Sample code:**

```ballerina
stripe:TerminalOnboardingLink result = check stripeClient->createOnboardingLink({
    linkType: "apple_terms_and_conditions",
    linkOptions: {
        appleTermsAndConditions: {
            merchantDisplayName: "Sample name"
        }
    },
    expand: ["string"],
    onBehalfOf: "string"
});
```

**Sample response:**

```json
{
  "link_type": "apple_terms_and_conditions",
  "link_options": {
    "apple_terms_and_conditions": {
      "merchant_display_name": "Sample name"
    }
  },
  "redirect_url": "https://example.com/resource",
  "object": "terminal.onboarding_link",
  "on_behalf_of": "string"
}
```

</div>
</details>

<details>
<summary>listReaders</summary>

<div>

List all Readers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListReadersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `deviceType` | <code>"bbpos_chipper2x"&#124;"bbpos_wisepad3"&#124;"bbpos_wisepos_e"&#124;"mobile_phone_reader"&#124;"simulated_stripe_s700"&#124;"simulated_stripe_s710"&#124;"simulated_verifone_m425"&#124;"simulated_verifone_p630"&#124;"simulated_verifone_ux700"&#124;"simulated_verifone_v660p"&#124;"simulated_wisepos_e"&#124;"stripe_m2"&#124;"stripe_s700"&#124;"stripe_s710"&#124;"verifone_P400"&#124;"verifone_m425"&#124;"verifone_p630"&#124;"verifone_ux700"&#124;"verifone_v660p"</code> | No | Filters readers by device type. |
| `location` | <code>string</code> | No | A location ID to filter the response list to only readers at the specific location. |
| `serialNumber` | <code>string</code> | No | Filters readers by serial number. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"offline"&#124;"online"</code> | No | A status filter to filter readers to only offline or online readers. |

**Returns:** `TerminalReaderRetrieveReader|error`

**Sample code:**

```ballerina
stripe:TerminalReaderRetrieveReader result = check stripeClient->listReaders();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "device_type": "bbpos_chipper2x",
      "serial_number": "INV-0001",
      "label": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "terminal.reader"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createReader</summary>

<div>

Create a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateReaderRequest</code> | Yes | Request payload to create a Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->createReader({
    registrationCode: "200",
    expand: ["string"],
    metadata: "",
    location: "string"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>getReader</summary>

<div>

Retrieve a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReaderQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TerminalReaderResponse|error`

**Sample code:**

```ballerina
stripe:TerminalReaderResponse result = check stripeClient->getReader("string");
```

**Sample response:**

The raw response content as `TerminalReaderResponse`.

</div>
</details>

<details>
<summary>updateReader</summary>

<div>

Update a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>UpdateReaderRequest</code> | Yes | Request payload to update a Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReaderResponse|error`

**Sample code:**

```ballerina
stripe:TerminalReaderResponse result = check stripeClient->updateReader("string", {
    expand: ["string"],
    metadata: "",
    label: ""
});
```

**Sample response:**

The raw response content as `TerminalReaderResponse`.

</div>
</details>

<details>
<summary>deleteReader</summary>

<div>

Delete a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTerminalReader|error`

**Sample code:**

```ballerina
stripe:DeletedTerminalReader result = check stripeClient->deleteReader("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>cancelActionReader</summary>

<div>

Cancel the current reader action.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel the current reader action. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReaderResponse|error`

**Sample code:**

```ballerina
stripe:TerminalReaderResponse result = check stripeClient->cancelActionReader("string", {
    expand: ["string"]
});
```

**Sample response:**

The raw response content as `TerminalReaderResponse`.

</div>
</details>

<details>
<summary>collectInputsReader</summary>

<div>

Collect inputs using a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>CollectInputsReaderRequest</code> | Yes | Request payload to collect inputs using a Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->collectInputsReader("string", {
    inputs: [{
        customText: {
            title: "string"
        },
        'type: "email",
        selection: {
            choices: [{
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                text: "string"
            }]
        }
    }],
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>collectPaymentMethodReader</summary>

<div>

Hand off a PaymentIntent to a Reader and collect card details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>CollectPaymentMethodReaderRequest</code> | Yes | Request payload to hand off a PaymentIntent to a Reader and collect card details. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->collectPaymentMethodReader("string", {
    paymentIntent: "string",
    expand: ["string"],
    collectConfig: {
        allowRedisplay: "always",
        enableCustomerCancellation: false,
        skipTipping: false
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>confirmPaymentIntentReader</summary>

<div>

Confirm a PaymentIntent on the Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>ConfirmPaymentIntentReaderRequest</code> | Yes | Request payload to confirm a PaymentIntent on the Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->confirmPaymentIntentReader("string", {
    paymentIntent: "string",
    confirmConfig: {
        returnUrl: "https://example.com/resource"
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>processPaymentIntentReader</summary>

<div>

Hand-off a PaymentIntent to a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>ProcessPaymentIntentReaderRequest</code> | Yes | Request payload to hand-off a PaymentIntent to a Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->processPaymentIntentReader("string", {
    paymentIntent: "string",
    expand: ["string"],
    processConfig: {
        returnUrl: "https://example.com/resource",
        allowRedisplay: "always",
        enableCustomerCancellation: false
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>processSetupIntentReader</summary>

<div>

Hand-off a SetupIntent to a Reader.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>ProcessSetupIntentReaderRequest</code> | Yes | Request payload to hand-off a SetupIntent to a Reader. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->processSetupIntentReader("string", {
    setupIntent: "string",
    allowRedisplay: "always",
    expand: ["string"],
    processConfig: {
        enableCustomerCancellation: false
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>refundPaymentReader</summary>

<div>

Refund a Charge or a PaymentIntent in-person.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>RefundPaymentReaderRequest</code> | Yes | Request payload to refund a Charge or a PaymentIntent in-person. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->refundPaymentReader("string", {
    amount: 1,
    expand: ["string"],
    charge: "string",
    refundApplicationFee: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>setReaderDisplayReader</summary>

<div>

Set reader display.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>SetReaderDisplayReaderRequest</code> | Yes | Request payload to set reader display. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->setReaderDisplayReader("string", {
    'type: "cart",
    expand: ["string"],
    cart: {
        total: 1,
        currency: "string",
        lineItems: [{
            amount: 1,
            quantity: 1,
            description: "Sample description"
        }]
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>createTerminalRefund</summary>

<div>

Create a refund using a Terminal-supported device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to create a refund using a Terminal-supported device. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalRefund|error`

**Sample code:**

```ballerina
stripe:TerminalRefund result = check stripeClient->createTerminalRefund({
    expand: ["string"]
});
```

**Sample response:**

```json
{}
```

</div>
</details>

#### Test helpers

<details>
<summary>createConfirmationToken</summary>

<div>

Create a test Confirmation Token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateConfirmationTokenRequest</code> | Yes | Request payload to create a test Confirmation Token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ConfirmationToken|error`

**Sample code:**

```ballerina
stripe:ConfirmationToken result = check stripeClient->createConfirmationToken({
    expand: ["string"],
    shipping: {
        address: {},
        name: "Sample name",
        phone: ""
    },
    paymentMethodData: {
        'type: "acss_debit",
        boleto: {
            taxId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        auBecsDebit: {
            bsbNumber: "INV-0001",
            accountNumber: "INV-0001"
        }
    },
    returnUrl: "https://example.com/resource"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "use_stripe_sdk": false,
  "object": "confirmation_token",
  "setup_intent": "string"
}
```

</div>
</details>

<details>
<summary>fundCashBalanceCustomer</summary>

<div>

Fund a test mode cash balance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customer` | <code>string</code> | Yes | The customer parameter. |
| `payload` | <code>FundCashBalanceCustomerRequest</code> | Yes | Request payload to fund a test mode cash balance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CustomerCashBalanceTransaction|error`

**Sample code:**

```ballerina
stripe:CustomerCashBalanceTransaction result = check stripeClient->fundCashBalanceCustomer("string", {
    amount: 1,
    currency: "string",
    reference: "REF-001",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "ending_balance": 1,
  "type": "adjusted_for_overdraft",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "net_amount": 1,
  "customer": "string",
  "object": "customer_cash_balance_transaction"
}
```

</div>
</details>

<details>
<summary>createAuthorization</summary>

<div>

Create a test-mode authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAuthorizationRequest</code> | Yes | Request payload to create a test-mode authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->createAuthorization({
    card: "string",
    merchantAmount: 1,
    fleet: {
        purchaseType: "fuel_and_non_fuel_purchase",
        serviceType: "full_service"
    },
    amount: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>captureAuthorization</summary>

<div>

Capture a test-mode authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>CaptureAuthorizationRequest</code> | Yes | Request payload to capture a test-mode authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->captureAuthorization("string", {
    expand: ["string"],
    purchaseDetails: {
        reference: "REF-001"
    },
    closeAuthorization: false,
    captureAmount: 1
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>expireAuthorization</summary>

<div>

Expire a test-mode authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to expire a test-mode authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->expireAuthorization("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>finalizeAmountAuthorization</summary>

<div>

Finalize a test-mode authorization's amount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>FinalizeAmountAuthorizationRequest</code> | Yes | Request payload to finalize a test-mode authorization's amount. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->finalizeAmountAuthorization("string", {
    finalAmount: 1,
    fleet: {
        purchaseType: "fuel_and_non_fuel_purchase",
        serviceType: "full_service"
    },
    expand: ["string"],
    fuel: {
        unit: "charging_minute",
        quantityDecimal: "string",
        industryProductCode: "200"
    }
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>createRespond</summary>

<div>

Respond to fraud challenge.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>CreateRespondRequest</code> | Yes | Request payload to respond to fraud challenge. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->createRespond("string", {
    confirmed: false,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>incrementAuthorization</summary>

<div>

Increment a test-mode authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>IncrementAuthorizationRequest</code> | Yes | Request payload to increment a test-mode authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->incrementAuthorization("string", {
    incrementAmount: 1,
    expand: ["string"],
    isAmountControllable: false
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>reverseAuthorization</summary>

<div>

Reverse a test-mode authorization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authorization` | <code>string</code> | Yes | The authorization parameter. |
| `payload` | <code>ReverseAuthorizationRequest</code> | Yes | Request payload to reverse a test-mode authorization. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingAuthorization|error`

**Sample code:**

```ballerina
stripe:IssuingAuthorization result = check stripeClient->reverseAuthorization("string", {
    reverseAmount: 1,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "approved": false,
  "balance_transactions": [
    {
      "amount": 1,
      "available_on": 1,
      "created": 1,
      "fee": 1,
      "reporting_category": "string",
      "fee_details": [
        {
          "amount": 1,
          "currency": "string",
          "type": "string"
        }
      ],
      "type": "adjustment",
      "balance_type": "issuing",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "net": 1,
      "object": "balance_transaction",
      "status": "string"
    }
  ],
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "merchant_amount": 1,
  "amount": 1,
  "request_history": [
    {
      "merchant_amount": 1,
      "reason": "account_disabled",
      "amount": 1,
      "approved": false,
      "created": 1,
      "merchant_currency": "string",
      "currency": "string"
    }
  ],
  "verification_data": {
    "cvc_check": "match",
    "expiry_check": "match",
    "address_line1_check": "match",
    "address_postal_code_check": "match"
  },
  "created": 1,
  "transactions": [
    {
      "merchant_amount": 1,
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "merchant_data": {
        "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "category_code": "200",
        "category": "string"
      },
      "merchant_currency": "string",
      "type": "capture",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "card": "string",
      "object": "issuing.transaction"
    }
  ],
  "authorization_method": "chip",
  "card": {
    "last4": "string",
    "metadata": {},
    "livemode": false,
    "exp_month": 1,
    "exp_year": 1,
    "type": "physical",
    "currency": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "brand": "string",
    "spending_controls": {},
    "created": 1,
    "cardholder": {
      "metadata": {},
      "requirements": {},
      "livemode": false,
      "created": 1,
      "type": "company",
      "billing": {
        "address": {}
      },
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "issuing.cardholder",
      "status": "active"
    },
    "object": "issuing.card",
    "status": "active"
  },
  "object": "issuing.authorization",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>createDeliver</summary>

<div>

Deliver a testmode card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to deliver a testmode card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createDeliver("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createFail</summary>

<div>

Fail a testmode card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to fail a testmode card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createFail("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createReturn</summary>

<div>

Return a testmode card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to return a testmode card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createReturn("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createShip</summary>

<div>

Ship a testmode card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to ship a testmode card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createShip("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createSubmit</summary>

<div>

Submit a testmode card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `card` | <code>string</code> | Yes | The card parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to submit a testmode card. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingCard|error`

**Sample code:**

```ballerina
stripe:IssuingCard result = check stripeClient->createSubmit("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "last4": "string",
  "metadata": {},
  "livemode": false,
  "exp_month": 1,
  "exp_year": 1,
  "type": "physical",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "brand": "string",
  "spending_controls": {
    "allowed_categories": [
      "ac_refrigeration_repair"
    ],
    "blocked_merchant_countries": [
      "string"
    ],
    "blocked_categories": [
      "ac_refrigeration_repair"
    ]
  },
  "created": 1,
  "cardholder": {
    "metadata": {},
    "requirements": {},
    "livemode": false,
    "created": 1,
    "type": "company",
    "billing": {
      "address": {}
    },
    "name": "Sample name",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "object": "issuing.cardholder",
    "status": "active"
  },
  "object": "issuing.card",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>activatePersonalizationDesign</summary>

<div>

Activate a testmode personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personalizationDesign` | <code>string</code> | Yes | The personalization design parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to activate a testmode personalization design. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->activatePersonalizationDesign("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>deactivatePersonalizationDesign</summary>

<div>

Deactivate a testmode personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personalizationDesign` | <code>string</code> | Yes | The personalization design parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to deactivate a testmode personalization design. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->deactivatePersonalizationDesign("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>rejectPersonalizationDesign</summary>

<div>

Reject a testmode personalization design.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `personalizationDesign` | <code>string</code> | Yes | The personalization design parameter. |
| `payload` | <code>RejectPersonalizationDesignRequest</code> | Yes | Request payload to reject a testmode personalization design. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingPersonalizationDesign|error`

**Sample code:**

```ballerina
stripe:IssuingPersonalizationDesign result = check stripeClient->rejectPersonalizationDesign("string", {
    rejectionReasons: {
        carrierText: ["geographic_location"],
        cardLogo: ["geographic_location"]
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "preferences": {
    "is_default": false,
    "is_platform_default": false
  },
  "livemode": false,
  "created": 1,
  "rejection_reasons": {
    "carrier_text": [
      "geographic_location"
    ],
    "card_logo": [
      "geographic_location"
    ]
  },
  "physical_bundle": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.personalization_design",
  "status": "active"
}
```

</div>
</details>

<details>
<summary>createSettlement</summary>

<div>

Create a test-mode settlement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateSettlementRequest</code> | Yes | Request payload to create a test-mode settlement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingSettlement|error`

**Sample code:**

```ballerina
stripe:IssuingSettlement result = check stripeClient->createSettlement({
    netTotalAmount: 1,
    clearingDate: 1,
    bin: "string",
    currency: "string"
});
```

**Sample response:**

```json
{
  "clearing_date": 1,
  "metadata": {},
  "interchange_fees_amount": 1,
  "livemode": false,
  "bin": "string",
  "created": 1,
  "transaction_amount": 1,
  "transaction_count": 1,
  "settlement_service": "string",
  "network": "maestro",
  "net_total_amount": 1,
  "network_settlement_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "network_fees_amount": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.settlement",
  "status": "complete"
}
```

</div>
</details>

<details>
<summary>completeSettlement</summary>

<div>

Complete a test-mode settlement.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `settlement` | <code>string</code> | Yes | The settlement token to mark as complete. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to complete a test-mode settlement. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingSettlement|error`

**Sample code:**

```ballerina
stripe:IssuingSettlement result = check stripeClient->completeSettlement("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "clearing_date": 1,
  "metadata": {},
  "interchange_fees_amount": 1,
  "livemode": false,
  "bin": "string",
  "created": 1,
  "transaction_amount": 1,
  "transaction_count": 1,
  "settlement_service": "string",
  "network": "maestro",
  "net_total_amount": 1,
  "network_settlement_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "network_fees_amount": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "issuing.settlement",
  "status": "complete"
}
```

</div>
</details>

<details>
<summary>createTestIssuingForceCapture</summary>

<div>

Create a test-mode force capture.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTestIssuingForceCaptureRequest</code> | Yes | Request payload to create a test-mode force capture. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingTransaction|error`

**Sample code:**

```ballerina
stripe:IssuingTransaction result = check stripeClient->createTestIssuingForceCapture({
    amount: 1,
    card: "string",
    expand: ["string"],
    purchaseDetails: {
        reference: "REF-001"
    }
});
```

**Sample response:**

```json
{
  "merchant_amount": 1,
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "type": "capture",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "object": "issuing.transaction"
}
```

</div>
</details>

<details>
<summary>createTestIssuingUnlinkedRefund</summary>

<div>

Create a test-mode unlinked refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTestIssuingUnlinkedRefundRequest</code> | Yes | Request payload to create a test-mode unlinked refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingTransaction|error`

**Sample code:**

```ballerina
stripe:IssuingTransaction result = check stripeClient->createTestIssuingUnlinkedRefund({
    amount: 1,
    card: "string",
    expand: ["string"],
    purchaseDetails: {
        reference: "REF-001"
    }
});
```

**Sample response:**

```json
{
  "merchant_amount": 1,
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "type": "capture",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "object": "issuing.transaction"
}
```

</div>
</details>

<details>
<summary>refundTransaction</summary>

<div>

Refund a test-mode transaction + 'transaction - The transaction parameter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'transaction` | <code>string</code> | Yes |  |
| `payload` | <code>RefundTransactionRequest</code> | Yes | Request payload to refund a test-mode transaction. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `IssuingTransaction|error`

**Sample code:**

```ballerina
stripe:IssuingTransaction result = check stripeClient->refundTransaction("string", {
    expand: ["string"],
    refundAmount: 1
});
```

**Sample response:**

```json
{
  "merchant_amount": 1,
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "merchant_data": {
    "network_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "category_code": "200",
    "category": "string"
  },
  "merchant_currency": "string",
  "type": "capture",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card": "string",
  "object": "issuing.transaction"
}
```

</div>
</details>

<details>
<summary>expireRefund</summary>

<div>

Expire a pending refund.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `refund` | <code>string</code> | Yes | The refund parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to expire a pending refund. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Refund|error`

**Sample code:**

```ballerina
stripe:Refund result = check stripeClient->expireRefund("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "amount": 1,
  "created": 1,
  "object": "refund",
  "balance_transaction": "string"
}
```

</div>
</details>

<details>
<summary>presentPaymentMethodReader</summary>

<div>

Simulate presenting a payment method.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>PresentPaymentMethodReaderRequest</code> | Yes | Request payload to simulate presenting a payment method. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->presentPaymentMethodReader("string", {
    expand: ["string"],
    amountTip: 1,
    interacPresent: {
        number: "INV-0001"
    },
    'type: "card"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>succeedInputCollectionReader</summary>

<div>

Simulate a successful input collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>SucceedInputCollectionReaderRequest</code> | Yes | Request payload to simulate a successful input collection. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->succeedInputCollectionReader("string", {
    expand: ["string"],
    skipNonRequiredInputs: "all"
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>timeoutInputCollectionReader</summary>

<div>

Simulate an input collection timeout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reader` | <code>string</code> | Yes | The reader parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to simulate an input collection timeout. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TerminalReader|error`

**Sample code:**

```ballerina
stripe:TerminalReader result = check stripeClient->timeoutInputCollectionReader("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "device_type": "bbpos_chipper2x",
  "serial_number": "INV-0001",
  "label": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "terminal.reader"
}
```

</div>
</details>

<details>
<summary>listTestClocks</summary>

<div>

List all test clocks.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTestClocksQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `BillingClocksResourceBillingClockList|error`

**Sample code:**

```ballerina
stripe:BillingClocksResourceBillingClockList result = check stripeClient->listTestClocks();
```

**Sample response:**

```json
{
  "data": [
    {
      "livemode": false,
      "created": 1,
      "frozen_time": 1,
      "deletes_after": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_details": {},
      "object": "test_helpers.test_clock",
      "status": "advancing"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTestClock</summary>

<div>

Create a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTestClockRequest</code> | Yes | Request payload to create a test clock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TestHelpersTestClock|error`

**Sample code:**

```ballerina
stripe:TestHelpersTestClock result = check stripeClient->createTestClock({
    frozenTime: 1,
    expand: ["string"],
    name: "Sample name",
    customer: "string"
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "frozen_time": 1,
  "deletes_after": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_details": {
    "advancing": {
      "target_frozen_time": 1
    }
  },
  "object": "test_helpers.test_clock",
  "status": "advancing"
}
```

</div>
</details>

<details>
<summary>getTestClock</summary>

<div>

Retrieve a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `testClock` | <code>string</code> | Yes | The test clock parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTestClockQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TestHelpersTestClock|error`

**Sample code:**

```ballerina
stripe:TestHelpersTestClock result = check stripeClient->getTestClock("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "frozen_time": 1,
  "deletes_after": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_details": {
    "advancing": {
      "target_frozen_time": 1
    }
  },
  "object": "test_helpers.test_clock",
  "status": "advancing"
}
```

</div>
</details>

<details>
<summary>deleteTestClock</summary>

<div>

Delete a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `testClock` | <code>string</code> | Yes | The test clock parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedTestHelpersTestClock|error`

**Sample code:**

```ballerina
stripe:DeletedTestHelpersTestClock result = check stripeClient->deleteTestClock("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "test_helpers.test_clock"
}
```

</div>
</details>

<details>
<summary>advanceTestClock</summary>

<div>

Advance a test clock.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `testClock` | <code>string</code> | Yes | The test clock parameter. |
| `payload` | <code>AdvanceTestClockRequest</code> | Yes | Request payload to advance a test clock. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TestHelpersTestClock|error`

**Sample code:**

```ballerina
stripe:TestHelpersTestClock result = check stripeClient->advanceTestClock("string", {
    frozenTime: 1,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "frozen_time": 1,
  "deletes_after": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_details": {
    "advancing": {
      "target_frozen_time": 1
    }
  },
  "object": "test_helpers.test_clock",
  "status": "advancing"
}
```

</div>
</details>

<details>
<summary>failInboundTransfer</summary>

<div>

Test mode: Fail an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>FailInboundTransferRequest</code> | Yes | Request payload to test mode: Fail an InboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->failInboundTransfer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    failureDetails: {
        code: "account_closed"
    }
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>returnInboundTransfer</summary>

<div>

Test mode: Return an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Return an InboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->returnInboundTransfer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>succeedInboundTransfer</summary>

<div>

Test mode: Succeed an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Succeed an InboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->succeedInboundTransfer("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>updateOutboundPayment</summary>

<div>

Test mode: Update an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>OutboundPaymentsidBody</code> | Yes | Request payload to test mode: Update an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->updateOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    trackingDetails: {
        'type: "ach",
        ach: {
            traceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>failOutboundPayment</summary>

<div>

Test mode: Fail an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Fail an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->failOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>postOutboundPayment</summary>

<div>

Test mode: Post an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Post an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->postOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>returnOutboundPayment</summary>

<div>

Test mode: Return an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>ReturnOutboundPaymentRequest</code> | Yes | Request payload to test mode: Return an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->returnOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"],
    returnedDetails: {
        code: "account_closed"
    }
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>updateOutboundTransfer</summary>

<div>

Test mode: Update an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `payload` | <code>OutboundPaymentsidBody</code> | Yes | Request payload to test mode: Update an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->updateOutboundTransfer("string", {
    trackingDetails: {
        'type: "ach",
        ach: {
            traceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
    },
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>failOutboundTransfer</summary>

<div>

Test mode: Fail an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Fail an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->failOutboundTransfer("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>postOutboundTransfer</summary>

<div>

Test mode: Post an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to test mode: Post an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->postOutboundTransfer("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>returnOutboundTransfer</summary>

<div>

Test mode: Return an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `payload` | <code>ReturnOutboundTransferRequest</code> | Yes | Request payload to test mode: Return an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->returnOutboundTransfer("string", {
    expand: ["string"],
    returnedDetails: {
        code: "account_closed"
    }
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>createReceivedCredit</summary>

<div>

Test mode: Create a ReceivedCredit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateReceivedCreditRequest</code> | Yes | Request payload to test mode: Create a ReceivedCredit. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryReceivedCredit|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedCredit result = check stripeClient->createReceivedCredit({
    financialAccount: "string",
    amount: 1,
    currency: "string",
    network: "ach"
});
```

**Sample response:**

```json
{
  "amount": 1,
  "initiating_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "balance",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "livemode": false,
  "linked_flows": {
    "source_flow_type": "string",
    "issuing_transaction": "string",
    "source_flow_details": {
      "type": "credit_reversal"
    }
  },
  "created": 1,
  "description": "Sample description",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "treasury.received_credit",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>createReceivedDebit</summary>

<div>

Test mode: Create a ReceivedDebit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateReceivedDebitRequest</code> | Yes | Request payload to test mode: Create a ReceivedDebit. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryReceivedDebit|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedDebit result = check stripeClient->createReceivedDebit({
    financialAccount: "string",
    amount: 1,
    currency: "string",
    network: "ach"
});
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "linked_flows": {
    "issuing_transaction": "string",
    "topup": "string",
    "inbound_transfer": "string"
  },
  "created": 1,
  "description": "Sample description",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "treasury.received_debit",
  "status": "failed"
}
```

</div>
</details>

#### 3D Secure

<details>
<summary>listAuthentications</summary>

<div>

List all 3D Secure Authentications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListAuthenticationsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created45</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp or a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"canceled"&#124;"error"&#124;"failed"&#124;"requires_challenge"&#124;"requires_submission"&#124;"succeeded"</code> | No | Only return 3D Secure Authentications for specified status. |

**Returns:** `ThreeDSecureStandaloneResourceThreeDSecureAuthenticationList|error`

**Sample code:**

```ballerina
stripe:ThreeDSecureStandaloneResourceThreeDSecureAuthenticationList result = check stripeClient->listAuthentications();
```

**Sample response:**

```json
{
  "data": [
    {
      "directory_server": "american_express",
      "livemode": false,
      "created": 1,
      "channel": {
        "type": "browser"
      },
      "message_category": "non_payment_authentication",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "payment_method": "string",
      "object": "three_d_secure.authentication",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createAuthentication</summary>

<div>

Create a 3DS Authentication.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAuthenticationRequest</code> | Yes | Request payload to create a 3DS Authentication. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ThreeDSecureAuthentication|error`

**Sample code:**

```ballerina
stripe:ThreeDSecureAuthentication result = check stripeClient->createAuthentication({
    channel: {
        'type: "browser",
        threeRI: {
            previousAuthentication: "string",
            'type: "delayed_shipment"
        },
        browser: {
            javascriptEnabled: false,
            acceptHeader: "string",
            language: "string",
            ipAddress: "string",
            userAgent: "string"
        }
    },
    messageCategory: "non_payment_authentication",
    directoryServer: "american_express",
    reason: "cardholder_authentication"
});
```

**Sample response:**

```json
{
  "directory_server": "american_express",
  "livemode": false,
  "created": 1,
  "channel": {
    "type": "browser",
    "three_r_i": {
      "previous_authentication": "string",
      "type": "delayed_shipment"
    },
    "browser": {
      "javascript_enabled": false,
      "accept_header": "string",
      "language": "string",
      "ip_address": "string",
      "user_agent": "string"
    }
  },
  "message_category": "non_payment_authentication",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_method": "string",
  "object": "three_d_secure.authentication",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getAuthentication</summary>

<div>

Retrieve a 3DS Authentication.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authentication` | <code>string</code> | Yes | The authentication parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetAuthenticationQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `ThreeDSecureAuthentication|error`

**Sample code:**

```ballerina
stripe:ThreeDSecureAuthentication result = check stripeClient->getAuthentication("string");
```

**Sample response:**

```json
{
  "directory_server": "american_express",
  "livemode": false,
  "created": 1,
  "channel": {
    "type": "browser",
    "three_r_i": {
      "previous_authentication": "string",
      "type": "delayed_shipment"
    },
    "browser": {
      "javascript_enabled": false,
      "accept_header": "string",
      "language": "string",
      "ip_address": "string",
      "user_agent": "string"
    }
  },
  "message_category": "non_payment_authentication",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_method": "string",
  "object": "three_d_secure.authentication",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelAuthentication</summary>

<div>

Cancel a 3DS Authentication.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authentication` | <code>string</code> | Yes | The authentication parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to cancel a 3DS Authentication. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ThreeDSecureAuthentication|error`

**Sample code:**

```ballerina
stripe:ThreeDSecureAuthentication result = check stripeClient->cancelAuthentication("string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "directory_server": "american_express",
  "livemode": false,
  "created": 1,
  "channel": {
    "type": "browser",
    "three_r_i": {
      "previous_authentication": "string",
      "type": "delayed_shipment"
    },
    "browser": {
      "javascript_enabled": false,
      "accept_header": "string",
      "language": "string",
      "ip_address": "string",
      "user_agent": "string"
    }
  },
  "message_category": "non_payment_authentication",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_method": "string",
  "object": "three_d_secure.authentication",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>submitAuthentication</summary>

<div>

Submit a 3DS Authentication.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `authentication` | <code>string</code> | Yes | The authentication parameter. |
| `payload` | <code>SubmitAuthenticationRequest</code> | Yes | Request payload to submit a 3DS Authentication. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ThreeDSecureAuthentication|error`

**Sample code:**

```ballerina
stripe:ThreeDSecureAuthentication result = check stripeClient->submitAuthentication("string", {
    expand: ["string"],
    metadata: "",
    fingerprintingResult: "string"
});
```

**Sample response:**

```json
{
  "directory_server": "american_express",
  "livemode": false,
  "created": 1,
  "channel": {
    "type": "browser",
    "three_r_i": {
      "previous_authentication": "string",
      "type": "delayed_shipment"
    },
    "browser": {
      "javascript_enabled": false,
      "accept_header": "string",
      "language": "string",
      "ip_address": "string",
      "user_agent": "string"
    }
  },
  "message_category": "non_payment_authentication",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payment_method": "string",
  "object": "three_d_secure.authentication",
  "status": "canceled"
}
```

</div>
</details>

#### Tokens

<details>
<summary>createToken</summary>

<div>

Create a bank account token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTokenRequest</code> | Yes | Request payload to create a bank account token. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Token|error`

**Sample code:**

```ballerina
stripe:Token result = check stripeClient->createToken({
    pii: {
        idNumber: "INV-0001"
    },
    expand: ["string"],
    person: {
        metadata: "",
        gender: "string",
        idNumberSecondary: "INV-0001"
    },
    account: {
        tosShownAndAccepted: false,
        businessType: "company"
    }
});
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "used": false,
  "type": "string",
  "object": "token"
}
```

</div>
</details>

<details>
<summary>getToken</summary>

<div>

Retrieve a token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | <code>string</code> | Yes | The token parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTokenQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Token|error`

**Sample code:**

```ballerina
stripe:Token result = check stripeClient->getToken("string");
```

**Sample response:**

```json
{
  "livemode": false,
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "used": false,
  "type": "string",
  "object": "token"
}
```

</div>
</details>

#### Topups

<details>
<summary>listTopups</summary>

<div>

List all top-ups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `amount` | <code>Amount2</code> | No | A positive integer representing how much to transfer. |
| `expand` | <code>ListTopupsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created46</code> | No | A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"canceled"&#124;"failed"&#124;"pending"&#124;"succeeded"</code> | No | Only return top-ups that have the given status. One of `canceled`, `failed`, `pending` or `succeeded`. |

**Returns:** `TopupList|error`

**Sample code:**

```ballerina
stripe:TopupList result = check stripeClient->listTopups();
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "topup",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTopup</summary>

<div>

Create a top-up.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTopupRequest</code> | Yes | Request payload to create a top-up. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Topup|error`

**Sample code:**

```ballerina
stripe:Topup result = check stripeClient->createTopup({
    amount: 1,
    currency: "string",
    statementDescriptor: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "topup",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getTopup</summary>

<div>

Retrieve a top-up.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topup` | <code>string</code> | Yes | The topup parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTopupQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Topup|error`

**Sample code:**

```ballerina
stripe:Topup result = check stripeClient->getTopup("string");
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "topup",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>updateTopup</summary>

<div>

Update a top-up.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topup` | <code>string</code> | Yes | The topup parameter. |
| `payload` | <code>TopupstopupBody</code> | Yes | Request payload to update a top-up. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Topup|error`

**Sample code:**

```ballerina
stripe:Topup result = check stripeClient->updateTopup("string", {
    expand: ["string"],
    metadata: "",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "topup",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelTopup</summary>

<div>

Cancel a top-up.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topup` | <code>string</code> | Yes | The topup parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel a top-up. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Topup|error`

**Sample code:**

```ballerina
stripe:Topup result = check stripeClient->cancelTopup("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "topup",
  "status": "canceled"
}
```

</div>
</details>

#### Transfers

<details>
<summary>listTransfers</summary>

<div>

List all transfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListTransfersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `transferGroup` | <code>string</code> | No | Only return transfers with the specified transfer group. |
| `created` | <code>Created47</code> | No | Only return transfers that were created during the given date interval. |
| `destination` | <code>string</code> | No | Only return transfers for the destination specified by this account ID. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TransferList|error`

**Sample code:**

```ballerina
stripe:TransferList result = check stripeClient->listTransfers();
```

**Sample response:**

```json
{
  "data": [
    {
      "reversals": {
        "data": [
          {
            "amount": 1,
            "transfer": "string",
            "created": 1,
            "currency": "string",
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "object": "transfer_reversal"
          }
        ],
        "has_more": false,
        "url": "https://example.com/resource",
        "object": "list"
      },
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "amount_reversed": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "reversed": false,
      "object": "transfer"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createTransfer</summary>

<div>

Create a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTransferRequest</code> | Yes | Request payload to create a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Transfer|error`

**Sample code:**

```ballerina
stripe:Transfer result = check stripeClient->createTransfer({
    destination: "string",
    currency: "string",
    amount: 1,
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "reversals": {
    "data": [
      {
        "amount": 1,
        "transfer": "string",
        "created": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "transfer_reversal"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_reversed": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reversed": false,
  "object": "transfer"
}
```

</div>
</details>

<details>
<summary>listReversals</summary>

<div>

List all reversals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListReversalsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `TransferReversalList|error`

**Sample code:**

```ballerina
stripe:TransferReversalList result = check stripeClient->listReversals("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "transfer": "string",
      "created": 1,
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "transfer_reversal"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createReversal</summary>

<div>

Create a transfer reversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>CreateReversalRequest</code> | Yes | Request payload to create a transfer reversal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferReversal|error`

**Sample code:**

```ballerina
stripe:TransferReversal result = check stripeClient->createReversal("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    amount: 1,
    expand: ["string"],
    metadata: "",
    refundApplicationFee: false
});
```

**Sample response:**

```json
{
  "amount": 1,
  "transfer": "string",
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "transfer_reversal"
}
```

</div>
</details>

<details>
<summary>getTransfer</summary>

<div>

Retrieve a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `transfer` | <code>string</code> | Yes | The transfer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTransferQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `Transfer|error`

**Sample code:**

```ballerina
stripe:Transfer result = check stripeClient->getTransfer("string");
```

**Sample response:**

```json
{
  "reversals": {
    "data": [
      {
        "amount": 1,
        "transfer": "string",
        "created": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "transfer_reversal"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_reversed": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reversed": false,
  "object": "transfer"
}
```

</div>
</details>

<details>
<summary>updateTransfer</summary>

<div>

Update a transfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `transfer` | <code>string</code> | Yes | The transfer parameter. |
| `payload` | <code>TopupstopupBody</code> | Yes | Request payload to update a transfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `Transfer|error`

**Sample code:**

```ballerina
stripe:Transfer result = check stripeClient->updateTransfer("string", {
    expand: ["string"],
    metadata: "",
    description: "Sample description"
});
```

**Sample response:**

```json
{
  "reversals": {
    "data": [
      {
        "amount": 1,
        "transfer": "string",
        "created": 1,
        "currency": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "object": "transfer_reversal"
      }
    ],
    "has_more": false,
    "url": "https://example.com/resource",
    "object": "list"
  },
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "amount_reversed": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reversed": false,
  "object": "transfer"
}
```

</div>
</details>

<details>
<summary>getReversal</summary>

<div>

Retrieve a reversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `transfer` | <code>string</code> | Yes | The transfer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReversalQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TransferReversal|error`

**Sample code:**

```ballerina
stripe:TransferReversal result = check stripeClient->getReversal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string");
```

**Sample response:**

```json
{
  "amount": 1,
  "transfer": "string",
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "transfer_reversal"
}
```

</div>
</details>

<details>
<summary>updateReversal</summary>

<div>

Update a reversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `transfer` | <code>string</code> | Yes | The transfer parameter. |
| `payload` | <code>RefundsidBody</code> | Yes | Request payload to update a reversal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TransferReversal|error`

**Sample code:**

```ballerina
stripe:TransferReversal result = check stripeClient->updateReversal("3fa85f64-5717-4562-b3fc-2c963f66afa6", "string", {
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "amount": 1,
  "transfer": "string",
  "created": 1,
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "transfer_reversal"
}
```

</div>
</details>

#### Treasury

<details>
<summary>listCreditReversals</summary>

<div>

List all CreditReversals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListCreditReversalsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `receivedCredit` | <code>string</code> | No | Only return CreditReversals for the ReceivedCredit ID. |
| `status` | <code>"canceled"&#124;"posted"&#124;"processing"</code> | No | Only return CreditReversals for a given status. |

**Returns:** `TreasuryReceivedCreditsResourceCreditReversalList|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedCreditsResourceCreditReversalList result = check stripeClient->listCreditReversals(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "network": "ach",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "received_credit": "string",
      "object": "treasury.credit_reversal",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createCreditReversal</summary>

<div>

Create a CreditReversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCreditReversalRequest</code> | Yes | Request payload to create a CreditReversal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryCreditReversal|error`

**Sample code:**

```ballerina
stripe:TreasuryCreditReversal result = check stripeClient->createCreditReversal({
    receivedCredit: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "posted_at": 1
  },
  "received_credit": "string",
  "object": "treasury.credit_reversal",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getCreditReversal</summary>

<div>

Retrieve a CreditReversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `creditReversal` | <code>string</code> | Yes | The credit reversal parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetCreditReversalQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryCreditReversal|error`

**Sample code:**

```ballerina
stripe:TreasuryCreditReversal result = check stripeClient->getCreditReversal("string");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "posted_at": 1
  },
  "received_credit": "string",
  "object": "treasury.credit_reversal",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>listDebitReversals</summary>

<div>

List all DebitReversals.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListDebitReversalsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `resolution` | <code>"lost"&#124;"won"</code> | No | Only return DebitReversals for a given resolution. |
| `receivedDebit` | <code>string</code> | No | Only return DebitReversals for the ReceivedDebit ID. |
| `status` | <code>"canceled"&#124;"completed"&#124;"processing"</code> | No | Only return DebitReversals for a given status. |

**Returns:** `TreasuryReceivedDebitsResourceDebitReversalList|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedDebitsResourceDebitReversalList result = check stripeClient->listDebitReversals(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "metadata": {},
      "livemode": false,
      "created": 1,
      "received_debit": "string",
      "network": "ach",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "object": "treasury.debit_reversal",
      "status": "failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createDebitReversal</summary>

<div>

Create a DebitReversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateDebitReversalRequest</code> | Yes | Request payload to create a DebitReversal. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryDebitReversal|error`

**Sample code:**

```ballerina
stripe:TreasuryDebitReversal result = check stripeClient->createDebitReversal({
    receivedDebit: "string",
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "received_debit": "string",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "completed_at": 1
  },
  "object": "treasury.debit_reversal",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>getDebitReversal</summary>

<div>

Retrieve a DebitReversal.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `debitReversal` | <code>string</code> | Yes | The debit reversal parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetDebitReversalQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryDebitReversal|error`

**Sample code:**

```ballerina
stripe:TreasuryDebitReversal result = check stripeClient->getDebitReversal("string");
```

**Sample response:**

```json
{
  "amount": 1,
  "metadata": {},
  "livemode": false,
  "created": 1,
  "received_debit": "string",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "completed_at": 1
  },
  "object": "treasury.debit_reversal",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>listFinancialAccounts</summary>

<div>

List all FinancialAccounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | An object ID cursor for use in pagination. |
| `expand` | <code>ListFinancialAccountsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created48</code> | No | Only return FinancialAccounts that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit ranging from 1 to 100 (defaults to 10). |
| `startingAfter` | <code>string</code> | No | An object ID cursor for use in pagination. |
| `status` | <code>"closed"&#124;"open"</code> | No | Only return FinancialAccounts that have the given status: `open` or `closed`. |

**Returns:** `TreasuryFinancialAccountsResourceFinancialAccountList|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccountsResourceFinancialAccountList result = check stripeClient->listFinancialAccounts();
```

**Sample response:**

```json
{
  "data": [
    {
      "country": "string",
      "livemode": false,
      "created": 1,
      "supported_currencies": [
        "string"
      ],
      "balance": {
        "inbound_pending": {},
        "cash": {},
        "outbound_pending": {}
      },
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "financial_addresses": [
        {
          "type": "aba"
        }
      ],
      "status_details": {},
      "object": "treasury.financial_account",
      "status": "closed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createFinancialAccount</summary>

<div>

Create a FinancialAccount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateFinancialAccountRequest</code> | Yes | Request payload to create a FinancialAccount. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryFinancialAccount|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccount result = check stripeClient->createFinancialAccount({
    supportedCurrencies: ["string"],
    features: {
        cardIssuing: {
            requested: false
        },
        intraStripeFlows: {
            requested: false
        },
        depositInsurance: {
            requested: false
        }
    },
    expand: ["string"],
    nickname: ""
});
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "supported_currencies": [
    "string"
  ],
  "balance": {
    "inbound_pending": {},
    "cash": {},
    "outbound_pending": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "financial_addresses": [
    {
      "type": "aba",
      "supported_networks": [
        "ach"
      ],
      "aba": {
        "account_holder_name": "Sample name",
        "bank_name": "Sample name",
        "routing_number": "INV-0001",
        "account_number_last4": "INV-0001"
      }
    }
  ],
  "status_details": {
    "closed": {
      "reasons": [
        "account_rejected"
      ]
    }
  },
  "object": "treasury.financial_account",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>getFinancialAccount</summary>

<div>

Retrieve a FinancialAccount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialAccount` | <code>string</code> | Yes | The financial account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetFinancialAccountQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryFinancialAccount|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccount result = check stripeClient->getFinancialAccount("string");
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "supported_currencies": [
    "string"
  ],
  "balance": {
    "inbound_pending": {},
    "cash": {},
    "outbound_pending": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "financial_addresses": [
    {
      "type": "aba",
      "supported_networks": [
        "ach"
      ],
      "aba": {
        "account_holder_name": "Sample name",
        "bank_name": "Sample name",
        "routing_number": "INV-0001",
        "account_number_last4": "INV-0001"
      }
    }
  ],
  "status_details": {
    "closed": {
      "reasons": [
        "account_rejected"
      ]
    }
  },
  "object": "treasury.financial_account",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>updateFinancialAccount</summary>

<div>

Update a FinancialAccount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialAccount` | <code>string</code> | Yes | The financial account parameter. |
| `payload` | <code>UpdateFinancialAccountRequest</code> | Yes | Request payload to update a FinancialAccount. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryFinancialAccount|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccount result = check stripeClient->updateFinancialAccount("string", {
    features: {
        cardIssuing: {
            requested: false
        },
        intraStripeFlows: {
            requested: false
        },
        depositInsurance: {
            requested: false
        }
    },
    expand: ["string"],
    forwardingSettings: {
        'type: "financial_account",
        financialAccount: "string",
        paymentMethod: "string"
    },
    nickname: ""
});
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "supported_currencies": [
    "string"
  ],
  "balance": {
    "inbound_pending": {},
    "cash": {},
    "outbound_pending": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "financial_addresses": [
    {
      "type": "aba",
      "supported_networks": [
        "ach"
      ],
      "aba": {
        "account_holder_name": "Sample name",
        "bank_name": "Sample name",
        "routing_number": "INV-0001",
        "account_number_last4": "INV-0001"
      }
    }
  ],
  "status_details": {
    "closed": {
      "reasons": [
        "account_rejected"
      ]
    }
  },
  "object": "treasury.financial_account",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>closeFinancialAccount</summary>

<div>

Close a FinancialAccount.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialAccount` | <code>string</code> | Yes | The financial account parameter. |
| `payload` | <code>CloseFinancialAccountRequest</code> | Yes | Request payload to close a FinancialAccount. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryFinancialAccount|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccount result = check stripeClient->closeFinancialAccount("string", {
    expand: ["string"],
    forwardingSettings: {
        'type: "financial_account",
        financialAccount: "string",
        paymentMethod: "string"
    }
});
```

**Sample response:**

```json
{
  "country": "string",
  "livemode": false,
  "created": 1,
  "supported_currencies": [
    "string"
  ],
  "balance": {
    "inbound_pending": {},
    "cash": {},
    "outbound_pending": {}
  },
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "financial_addresses": [
    {
      "type": "aba",
      "supported_networks": [
        "ach"
      ],
      "aba": {
        "account_holder_name": "Sample name",
        "bank_name": "Sample name",
        "routing_number": "INV-0001",
        "account_number_last4": "INV-0001"
      }
    }
  ],
  "status_details": {
    "closed": {
      "reasons": [
        "account_rejected"
      ]
    }
  },
  "object": "treasury.financial_account",
  "status": "closed"
}
```

</div>
</details>

<details>
<summary>listFinancialAccountFeatures</summary>

<div>

Retrieve FinancialAccount Features.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialAccount` | <code>string</code> | Yes | The financial account parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>ListFinancialAccountFeaturesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryFinancialAccountFeatures|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccountFeatures result = check stripeClient->listFinancialAccountFeatures("string");
```

**Sample response:**

```json
{
  "object": "treasury.financial_account_features",
  "outbound_payments": {
    "ach": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    },
    "us_domestic_wire": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    }
  },
  "card_issuing": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  },
  "intra_stripe_flows": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  },
  "outbound_transfers": {
    "ach": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    },
    "us_domestic_wire": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    }
  },
  "deposit_insurance": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  }
}
```

</div>
</details>

<details>
<summary>createFinancialAccountFeature</summary>

<div>

Update FinancialAccount Features.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `financialAccount` | <code>string</code> | Yes | The financial account parameter. |
| `payload` | <code>CreateFinancialAccountFeatureRequest</code> | Yes | Request payload to update FinancialAccount Features. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryFinancialAccountFeatures|error`

**Sample code:**

```ballerina
stripe:TreasuryFinancialAccountFeatures result = check stripeClient->createFinancialAccountFeature("string", {
    expand: ["string"],
    outboundPayments: {
        ach: {
            requested: false
        },
        usDomesticWire: {
            requested: false
        }
    },
    cardIssuing: {
        requested: false
    },
    intraStripeFlows: {
        requested: false
    }
});
```

**Sample response:**

```json
{
  "object": "treasury.financial_account_features",
  "outbound_payments": {
    "ach": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    },
    "us_domestic_wire": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    }
  },
  "card_issuing": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  },
  "intra_stripe_flows": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  },
  "outbound_transfers": {
    "ach": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    },
    "us_domestic_wire": {
      "requested": false,
      "status_details": [
        {
          "code": "activating"
        }
      ],
      "status": "active"
    }
  },
  "deposit_insurance": {
    "requested": false,
    "status_details": [
      {
        "code": "activating"
      }
    ],
    "status": "active"
  }
}
```

</div>
</details>

<details>
<summary>listInboundTransfers</summary>

<div>

List all InboundTransfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListInboundTransfersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"canceled"&#124;"failed"&#124;"processing"&#124;"succeeded"</code> | No | Only return InboundTransfers that have the given status: `processing`, `succeeded`, `failed` or `canceled`. |

**Returns:** `TreasuryInboundTransfersResourceInboundTransferList|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfersResourceInboundTransferList result = check stripeClient->listInboundTransfers(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "amount": 1,
      "metadata": {},
      "cancelable": false,
      "livemode": false,
      "linked_flows": {},
      "created": 1,
      "statement_descriptor": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "object": "treasury.inbound_transfer",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createInboundTransfer</summary>

<div>

Create an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateInboundTransferRequest</code> | Yes | Request payload to create an InboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->createInboundTransfer({
    financialAccount: "string",
    originPaymentMethod: "string",
    amount: 1,
    currency: "string"
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getInboundTransfer</summary>

<div>

Retrieve an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetInboundTransferQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->getInboundTransfer("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelInboundTransfer</summary>

<div>

Cancel an InboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `inboundTransfer` | <code>string</code> | Yes | The inbound transfer parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel an InboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryInboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryInboundTransfer result = check stripeClient->cancelInboundTransfer("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "linked_flows": {
    "received_debit": "string"
  },
  "created": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "canceled_at": 1,
    "failed_at": 1,
    "succeeded_at": 1
  },
  "object": "treasury.inbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>listOutboundPayments</summary>

<div>

List all OutboundPayments.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListOutboundPaymentsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created49</code> | No | Only return OutboundPayments that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `customer` | <code>string</code> | No | Only return OutboundPayments sent to this customer. |
| `status` | <code>"canceled"&#124;"failed"&#124;"posted"&#124;"processing"&#124;"returned"</code> | No | Only return OutboundPayments that have the given status: `processing`, `failed`, `posted`, `returned`, or `canceled`. |

**Returns:** `TreasuryOutboundPaymentsResourceOutboundPaymentList|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPaymentsResourceOutboundPaymentList result = check stripeClient->listOutboundPayments(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "amount": 1,
      "metadata": {},
      "cancelable": false,
      "livemode": false,
      "created": 1,
      "expected_arrival_date": 1,
      "statement_descriptor": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "transaction": "string",
      "object": "treasury.outbound_payment",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createOutboundPayment</summary>

<div>

Create an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateOutboundPaymentRequest</code> | Yes | Request payload to create an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->createOutboundPayment({
    financialAccount: "string",
    amount: 1,
    currency: "string",
    statementDescriptor: "string"
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getOutboundPayment</summary>

<div>

Retrieve an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetOutboundPaymentQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->getOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelOutboundPayment</summary>

<div>

Cancel an OutboundPayment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel an OutboundPayment. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundPayment|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundPayment result = check stripeClient->cancelOutboundPayment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_payment",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>listOutboundTransfers</summary>

<div>

List all OutboundTransfers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListOutboundTransfersQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"canceled"&#124;"failed"&#124;"posted"&#124;"processing"&#124;"returned"</code> | No | Only return OutboundTransfers that have the given status: `processing`, `canceled`, `failed`, `posted`, or `returned`. |

**Returns:** `TreasuryOutboundTransfersResourceOutboundTransferList|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfersResourceOutboundTransferList result = check stripeClient->listOutboundTransfers(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "amount": 1,
      "metadata": {},
      "cancelable": false,
      "livemode": false,
      "created": 1,
      "destination_payment_method_details": {
        "billing_details": {
          "address": {}
        },
        "type": "financial_account"
      },
      "expected_arrival_date": 1,
      "statement_descriptor": "string",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "transaction": "string",
      "object": "treasury.outbound_transfer",
      "status": "canceled"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createOutboundTransfer</summary>

<div>

Create an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateOutboundTransferRequest</code> | Yes | Request payload to create an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->createOutboundTransfer({
    financialAccount: "string",
    amount: 1,
    currency: "string",
    statementDescriptor: "string"
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>getOutboundTransfer</summary>

<div>

Retrieve an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetOutboundTransferQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->getOutboundTransfer("string");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>cancelOutboundTransfer</summary>

<div>

Cancel an OutboundTransfer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `outboundTransfer` | <code>string</code> | Yes | The outbound transfer parameter. |
| `payload` | <code>AccountLoginLinksBody</code> | Yes | Request payload to cancel an OutboundTransfer. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `TreasuryOutboundTransfer|error`

**Sample code:**

```ballerina
stripe:TreasuryOutboundTransfer result = check stripeClient->cancelOutboundTransfer("string", {
    expand: ["string"]
});
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "metadata": {},
  "cancelable": false,
  "livemode": false,
  "created": 1,
  "destination_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "financial_account",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "expected_arrival_date": 1,
  "statement_descriptor": "string",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "returned_at": 1,
    "canceled_at": 1,
    "failed_at": 1
  },
  "transaction": "string",
  "object": "treasury.outbound_transfer",
  "status": "canceled"
}
```

</div>
</details>

<details>
<summary>listReceivedCredits</summary>

<div>

List all ReceivedCredits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | The FinancialAccount that received the funds. |
| `expand` | <code>ListReceivedCreditsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `linkedFlows` | <code>LinkedFlowsParam</code> | No | Only return ReceivedCredits described by the flow. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"failed"&#124;"succeeded"</code> | No | Only return ReceivedCredits that have the given status: `succeeded` or `failed`. |

**Returns:** `TreasuryReceivedCreditsResourceReceivedCreditList|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedCreditsResourceReceivedCreditList result = check stripeClient->listReceivedCredits(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "initiating_payment_method_details": {
        "billing_details": {
          "address": {}
        },
        "type": "balance"
      },
      "livemode": false,
      "linked_flows": {},
      "created": 1,
      "description": "Sample description",
      "network": "ach",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "treasury.received_credit",
      "status": "failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getReceivedCredit</summary>

<div>

Retrieve a ReceivedCredit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReceivedCreditQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryReceivedCredit|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedCredit result = check stripeClient->getReceivedCredit("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "initiating_payment_method_details": {
    "billing_details": {
      "address": {}
    },
    "type": "balance",
    "financial_account": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "network": "stripe"
    }
  },
  "livemode": false,
  "linked_flows": {
    "source_flow_type": "string",
    "issuing_transaction": "string",
    "source_flow_details": {
      "type": "credit_reversal"
    }
  },
  "created": 1,
  "description": "Sample description",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "treasury.received_credit",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>listReceivedDebits</summary>

<div>

List all ReceivedDebits.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | The FinancialAccount that funds were pulled from. |
| `expand` | <code>ListReceivedDebitsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `status` | <code>"failed"&#124;"succeeded"</code> | No | Only return ReceivedDebits that have the given status: `succeeded` or `failed`. |

**Returns:** `TreasuryReceivedDebitsResourceReceivedDebitList|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedDebitsResourceReceivedDebitList result = check stripeClient->listReceivedDebits(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "amount": 1,
      "livemode": false,
      "linked_flows": {},
      "created": 1,
      "description": "Sample description",
      "network": "ach",
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "object": "treasury.received_debit",
      "status": "failed"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getReceivedDebit</summary>

<div>

Retrieve a ReceivedDebit.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetReceivedDebitQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryReceivedDebit|error`

**Sample code:**

```ballerina
stripe:TreasuryReceivedDebit result = check stripeClient->getReceivedDebit("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "amount": 1,
  "livemode": false,
  "linked_flows": {
    "issuing_transaction": "string",
    "topup": "string",
    "inbound_transfer": "string"
  },
  "created": 1,
  "description": "Sample description",
  "network": "ach",
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "treasury.received_debit",
  "status": "failed"
}
```

</div>
</details>

<details>
<summary>listTransactionEntries</summary>

<div>

List all TransactionEntries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `effectiveAt` | <code>EffectiveAt</code> | No | The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListTransactionEntriesQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created50</code> | No | Only return TransactionEntries that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `orderBy` | <code>"created"&#124;"effective_at"</code> | No | The results are in reverse chronological order by `created` or `effective_at`. The default is `created`. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `'transaction` | <code>string</code> | No | Only return TransactionEntries associated with this Transaction. |

**Returns:** `TreasuryTransactionsResourceTransactionEntryList|error`

**Sample code:**

```ballerina
stripe:TreasuryTransactionsResourceTransactionEntryList result = check stripeClient->listTransactionEntries(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "livemode": false,
      "created": 1,
      "type": "credit_reversal",
      "effective_at": 1,
      "flow_type": "credit_reversal",
      "balance_impact": {
        "inbound_pending": 1,
        "cash": 1,
        "outbound_pending": 1
      },
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "transaction": "string",
      "object": "treasury.transaction_entry"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getTransactionEntry</summary>

<div>

Retrieve a TransactionEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTransactionEntryQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryTransactionEntry|error`

**Sample code:**

```ballerina
stripe:TreasuryTransactionEntry result = check stripeClient->getTransactionEntry("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "livemode": false,
  "created": 1,
  "type": "credit_reversal",
  "effective_at": 1,
  "flow_type": "credit_reversal",
  "balance_impact": {
    "inbound_pending": 1,
    "cash": 1,
    "outbound_pending": 1
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transaction": "string",
  "object": "treasury.transaction_entry"
}
```

</div>
</details>

<details>
<summary>listTreasuryTransactions</summary>

<div>

List all Transactions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `financialAccount` | <code>string</code> | Yes | Returns objects associated with this FinancialAccount. |
| `expand` | <code>ListTreasuryTransactionsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `created` | <code>Created51</code> | No | Only return Transactions that were created during the given date interval. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `orderBy` | <code>"created"&#124;"posted_at"</code> | No | The results are in reverse chronological order by `created` or `posted_at`. The default is `created`. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |
| `statusTransitions` | <code>StatusTransitionTimestampSpecs</code> | No | A filter for the `status_transitions.posted_at` timestamp. When using this filter, `status=posted` and `order_by=posted_at` must also be specified. |
| `status` | <code>"open"&#124;"posted"&#124;"void"</code> | No | Only return Transactions that have the given status: `open`, `posted`, or `void`. |

**Returns:** `TreasuryTransactionsResourceTransactionList|error`

**Sample code:**

```ballerina
stripe:TreasuryTransactionsResourceTransactionList result = check stripeClient->listTreasuryTransactions(financialAccount = "string");
```

**Sample response:**

```json
{
  "data": [
    {
      "financial_account": "string",
      "amount": 1,
      "livemode": false,
      "created": 1,
      "description": "Sample description",
      "flow_type": "credit_reversal",
      "balance_impact": {
        "inbound_pending": 1,
        "cash": 1,
        "outbound_pending": 1
      },
      "currency": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status_transitions": {},
      "object": "treasury.transaction",
      "status": "open"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>getTreasuryTransaction</summary>

<div>

Retrieve a Transaction.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | <code>string</code> | Yes | The id parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetTreasuryTransactionQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `TreasuryTransaction|error`

**Sample code:**

```ballerina
stripe:TreasuryTransaction result = check stripeClient->getTreasuryTransaction("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "financial_account": "string",
  "amount": 1,
  "livemode": false,
  "created": 1,
  "description": "Sample description",
  "flow_type": "credit_reversal",
  "balance_impact": {
    "inbound_pending": 1,
    "cash": 1,
    "outbound_pending": 1
  },
  "currency": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status_transitions": {
    "void_at": 1,
    "posted_at": 1
  },
  "object": "treasury.transaction",
  "status": "open"
}
```

</div>
</details>

#### Webhook endpoints

<details>
<summary>listWebhookEndpoints</summary>

<div>

List all webhook endpoints.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `endingBefore` | <code>string</code> | No | A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list. |
| `expand` | <code>ListWebhookEndpointsQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |
| `'limit` | <code>int</code> | No | A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10. |
| `startingAfter` | <code>string</code> | No | A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list. |

**Returns:** `NotificationWebhookEndpointList|error`

**Sample code:**

```ballerina
stripe:NotificationWebhookEndpointList result = check stripeClient->listWebhookEndpoints();
```

**Sample response:**

```json
{
  "data": [
    {
      "metadata": {},
      "livemode": false,
      "enabled_events": [
        "string"
      ],
      "created": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "url": "https://example.com/resource",
      "object": "webhook_endpoint",
      "status": "string"
    }
  ],
  "has_more": false,
  "url": "https://example.com/resource",
  "object": "list"
}
```

</div>
</details>

<details>
<summary>createWebhookEndpoint</summary>

<div>

Create a webhook endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateWebhookEndpointRequest</code> | Yes | Request payload to create a webhook endpoint. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookEndpoint|error`

**Sample code:**

```ballerina
stripe:WebhookEndpoint result = check stripeClient->createWebhookEndpoint({
    enabledEvents: ["*"],
    url: "https://example.com/resource",
    expand: ["string"],
    metadata: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "enabled_events": [
    "string"
  ],
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "object": "webhook_endpoint",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>getWebhookEndpoint</summary>

<div>

Retrieve a webhook endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookEndpoint` | <code>string</code> | Yes | The webhook endpoint parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `expand` | <code>GetWebhookEndpointQueriesExpandItemsString[]</code> | No | Specifies which fields in the response should be expanded. |

**Returns:** `WebhookEndpoint|error`

**Sample code:**

```ballerina
stripe:WebhookEndpoint result = check stripeClient->getWebhookEndpoint("string");
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "enabled_events": [
    "string"
  ],
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "object": "webhook_endpoint",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>updateWebhookEndpoint</summary>

<div>

Update a webhook endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookEndpoint` | <code>string</code> | Yes | The webhook endpoint parameter. |
| `payload` | <code>UpdateWebhookEndpointRequest</code> | Yes | Request payload to update a webhook endpoint. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `WebhookEndpoint|error`

**Sample code:**

```ballerina
stripe:WebhookEndpoint result = check stripeClient->updateWebhookEndpoint("string", {
    expand: ["string"],
    metadata: "",
    enabledEvents: ["*"],
    description: ""
});
```

**Sample response:**

```json
{
  "metadata": {},
  "livemode": false,
  "enabled_events": [
    "string"
  ],
  "created": 1,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "url": "https://example.com/resource",
  "object": "webhook_endpoint",
  "status": "string"
}
```

</div>
</details>

<details>
<summary>deleteWebhookEndpoint</summary>

<div>

Delete a webhook endpoint.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookEndpoint` | <code>string</code> | Yes | The webhook endpoint parameter. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `DeletedWebhookEndpoint|error`

**Sample code:**

```ballerina
stripe:DeletedWebhookEndpoint result = check stripeClient->deleteWebhookEndpoint("string");
```

**Sample response:**

```json
{
  "deleted": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "object": "webhook_endpoint"
}
```

</div>
</details>
