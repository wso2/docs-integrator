---
title: Actions
---

# Actions

The `ballerinax/paypal.subscriptions` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages PayPal billing plans and subscriptions via the PayPal Subscriptions REST API. |

---

## Client

Manages PayPal billing plans and subscriptions via the PayPal Subscriptions REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials config containing `clientId`, `clientSecret`, and `tokenUrl`. The default `tokenUrl` points to the PayPal sandbox token endpoint. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | `decimal` | `30` | HTTP client request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Whether to validate request and response payloads against the OpenAPI schema. |
| `laxDataBinding` | `boolean` | `true` | When true, unknown fields in responses are ignored rather than causing errors. |

### Initializing the client

```ballerina
import ballerinax/paypal.subscriptions as paypal;

configurable string clientId = ?;
configurable string clientSecret = ?;

// Sandbox; default serviceUrl: https://api-m.sandbox.paypal.com/v1/billing
paypal:Client paypalClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        tokenUrl: "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    }
});

// Production: pass the live service URL as the second argument
// paypal:Client paypalClient = check new ({
//     auth: {
//         clientId: clientId,
//         clientSecret: clientSecret,
//         tokenUrl: "https://api-m.paypal.com/v1/oauth2/token"
//     }
// }, "https://api-m.paypal.com/v1/billing");
```

### Operations

#### Plans

<details>
<summary>List billing plans</summary>

Returns a list of billing plans, with optional filtering by product ID and pagination controls.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `paypal:PlansListQueries` | No | Optional query parameters: `product_id`, `plan_ids`, `page` (default 1), `page_size` (default 10, max 20), `total_required` (default false). |

Returns: `paypal:PlanCollection|error`

Sample code:

```ballerina
paypal:PlanCollection planCollection = check paypalClient->/plans(
    queries = {page_size: 10, total_required: true}
);
```

Sample response:

```ballerina
{
  "plans": [
    {
      "id": "P-5ML4271244454362WXNWU5NQ",
      "name": "Basic Monthly Plan",
      "status": "ACTIVE",
      "description": "$10 per month for 12 months",
      "usage_type": "LICENSED",
      "create_time": "2024-01-15T10:00:00Z",
      "links": [
        {"href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ", "rel": "self", "method": "GET"}
      ]
    }
  ],
  "total_items": 1,
  "total_pages": 1,
  "links": [
    {"href": "https://api-m.paypal.com/v1/billing/plans?page=1&page_size=10", "rel": "self", "method": "GET"}
  ]
}
```

</details>

<details>
<summary>Create a billing plan</summary>

Creates a billing plan that defines recurring billing cycles, pricing, and payment preferences for a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `paypal:PlanRequestPOST` | Yes | The billing plan definition including `product_id`, `name`, `billing_cycles`, and `payment_preferences`. |

Returns: `paypal:Plan|error`

Sample code:

```ballerina
paypal:Plan createdPlan = check paypalClient->/plans.post({
    product_id: "PROD-XXCD1234QWER65782",
    name: "Basic Monthly Plan",
    description: "$10 per month for 12 months",
    billing_cycles: [
        {
            frequency: {interval_unit: "MONTH", interval_count: 1},
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: 12,
            pricing_scheme: {
                fixed_price: {value: "10", currency_code: "USD"}
            }
        }
    ],
    payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {value: "0", currency_code: "USD"},
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3
    }
});
```

Sample response:

```ballerina
{
  "id": "P-5ML4271244454362WXNWU5NQ",
  "product_id": "PROD-XXCD1234QWER65782",
  "name": "Basic Monthly Plan",
  "status": "ACTIVE",
  "description": "$10 per month for 12 months",
  "billing_cycles": [
    {
      "frequency": {"interval_unit": "MONTH", "interval_count": 1},
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 12,
      "pricing_scheme": {
        "fixed_price": {"value": "10.00", "currency_code": "USD"},
        "version": 1
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "setup_fee": {"value": "0.00", "currency_code": "USD"},
    "setup_fee_failure_action": "CONTINUE",
    "payment_failure_threshold": 3
  },
  "create_time": "2024-01-15T10:00:00Z",
  "links": [
    {"href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ", "rel": "self", "method": "GET"},
    {"href": "https://api-m.paypal.com/v1/billing/plans/P-5ML4271244454362WXNWU5NQ", "rel": "edit", "method": "PATCH"}
  ]
}
```

</details>

<details>
<summary>Show plan details</summary>

Shows full details for a billing plan, by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the billing plan. |

Returns: `paypal:Plan|error`

Sample code:

```ballerina
paypal:Plan plan = check paypalClient->/plans/["P-5ML4271244454362WXNWU5NQ"].get();
```

Sample response:

```ballerina
{
  "id": "P-5ML4271244454362WXNWU5NQ",
  "product_id": "PROD-XXCD1234QWER65782",
  "name": "Basic Monthly Plan",
  "status": "ACTIVE",
  "description": "$10 per month for 12 months",
  "billing_cycles": [
    {
      "frequency": {"interval_unit": "MONTH", "interval_count": 1},
      "tenure_type": "REGULAR",
      "sequence": 1,
      "total_cycles": 12,
      "pricing_scheme": {
        "fixed_price": {"value": "10.00", "currency_code": "USD"},
        "version": 1
      }
    }
  ],
  "payment_preferences": {
    "auto_bill_outstanding": true,
    "payment_failure_threshold": 3
  },
  "quantity_supported": false,
  "create_time": "2024-01-15T10:00:00Z",
  "update_time": "2024-01-15T10:00:00Z"
}
```

</details>

<details>
<summary>Update a plan</summary>

Updates a billing plan by ID using JSON Patch operations. Supported fields include `description`, `payment_preferences`, and `taxes`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the billing plan to update. |
| `payload` | `paypal:PatchRequest` | Yes | An array of JSON Patch operations (`op`, `path`, `value`) specifying the fields to change. |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/plans/["P-5ML4271244454362WXNWU5NQ"].patch([
    {op: "replace", path: "/description", value: "Updated: $10 per month recurring plan"}
]);
```

</details>

<details>
<summary>Activate a plan</summary>

Activates a billing plan so customers can subscribe to it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the billing plan to activate. |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/plans/["P-5ML4271244454362WXNWU5NQ"]/activate.post({});
```

</details>

<details>
<summary>Deactivate a plan</summary>

Deactivates a billing plan, preventing new subscriptions from being created for it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the billing plan to deactivate. |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/plans/["P-5ML4271244454362WXNWU5NQ"]/deactivate.post({});
```

</details>

<details>
<summary>Update plan pricing</summary>

Updates the pricing schemes for one or more billing cycles in a plan, referenced by their sequence numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the billing plan. |
| `payload` | `paypal:UpdatePricingSchemesListRequest` | Yes | List of pricing scheme updates, each identifying a billing cycle by `billing_cycle_sequence` and providing the new `pricing_scheme`. |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/plans/["P-5ML4271244454362WXNWU5NQ"]/["update-pricing-schemes"].post({
    pricing_schemes: [
        {
            billing_cycle_sequence: 1,
            pricing_scheme: {
                fixed_price: {value: "15", currency_code: "USD"}
            }
        }
    ]
});
```

</details>

#### Subscriptions

<details>
<summary>Create a subscription</summary>

Creates a subscription for a customer against a billing plan. Returns the subscription ID and an approval link for the customer to complete enrollment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `paypal:SubscriptionRequestPost` | Yes | The subscription request including `plan_id`, optional `subscriber` details, `application_context` for redirect URLs, and any plan overrides. |

Returns: `paypal:Subscription|error`

Sample code:

```ballerina
paypal:Subscription subscription = check paypalClient->/subscriptions.post({
    plan_id: "P-5ML4271244454362WXNWU5NQ",
    subscriber: {
        name: {given_name: "John", surname: "Doe"},
        email_address: "john.doe@example.com"
    },
    application_context: {
        brand_name: "My Store",
        locale: "en-US",
        return_url: "https://example.com/return",
        cancel_url: "https://example.com/cancel"
    }
});
```

Sample response:

```ballerina
{
  "id": "I-BW452GLLEP1G",
  "status": "APPROVAL_PENDING",
  "plan_id": "P-5ML4271244454362WXNWU5NQ",
  "start_time": "2024-01-15T11:00:00Z",
  "create_time": "2024-01-15T11:00:00Z",
  "links": [
    {
      "href": "https://www.paypal.com/webapps/billing/subscriptions?ba_token=BA-2M539689T3856352J",
      "rel": "approve",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Show subscription details</summary>

Shows details for a subscription, by ID. Optionally includes additional fields such as the last failed payment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `queries` | `paypal:SubscriptionsGetQueries` | No | Optional. Pass `fields: "last_failed_payment"` or `fields: "plan"` to include additional data in the response. |

Returns: `paypal:Subscription|error`

Sample code:

```ballerina
paypal:Subscription subscription = check paypalClient->/subscriptions/["I-BW452GLLEP1G"].get(
    queries = {fields: "last_failed_payment"}
);
```

Sample response:

```ballerina
{
  "id": "I-BW452GLLEP1G",
  "status": "ACTIVE",
  "plan_id": "P-5ML4271244454362WXNWU5NQ",
  "start_time": "2024-01-15T11:00:00Z",
  "quantity": "1",
  "subscriber": {
    "name": {"given_name": "John", "surname": "Doe"},
    "email_address": "john.doe@example.com"
  },
  "billing_info": {
    "outstanding_balance": {"currency_code": "USD", "value": "0.00"},
    "cycle_executions": [
      {
        "tenure_type": "REGULAR",
        "sequence": 1,
        "cycles_completed": 2,
        "cycles_remaining": 10,
        "current_pricing_scheme_version": 1
      }
    ],
    "next_billing_time": "2024-03-15T11:00:00Z",
    "failed_payments_count": 0
  },
  "create_time": "2024-01-15T11:00:00Z",
  "update_time": "2024-02-15T11:00:00Z"
}
```

</details>

<details>
<summary>Update a subscription</summary>

Updates a subscription by ID using JSON Patch operations. Supports updating fields such as `custom_id`, `plan/billing_cycles/pricing_scheme`, `subscriber`, and `shipping_amount`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `payload` | `paypal:PatchRequest` | Yes | An array of JSON Patch operations specifying the fields to update. |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/subscriptions/["I-BW452GLLEP1G"].patch([
    {op: "replace", path: "/custom_id", value: "order_2024_001"}
]);
```

</details>

<details>
<summary>Revise a subscription</summary>

Updates the plan or quantity of an active subscription. Returns an approval link when the customer must re-approve the revised terms.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription to revise. |
| `payload` | `paypal:SubscriptionReviseRequest` | Yes | Revision request specifying the new `plan_id` and/or quantity overrides. |

Returns: `paypal:SubscriptionReviseResponse|error`

Sample code:

```ballerina
paypal:SubscriptionReviseResponse reviseResponse = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/revise.post({
    plan_id: "P-7GL4271244454362WXNWU5NQ",
    shipping_amount: {value: "5", currency_code: "USD"}
});
```

Sample response:

```ballerina
{
  "plan_id": "P-7GL4271244454362WXNWU5NQ",
  "plan_overridden": false,
  "links": [
    {
      "href": "https://www.paypal.com/webapps/billing/subscriptions/update?ba_token=BA-3M539689T3856352J",
      "rel": "approve",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>

<details>
<summary>Suspend a subscription</summary>

Suspends a subscription, by ID, stopping future billing until the subscription is reactivated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `payload` | `paypal:SubscriptionSuspendRequest` | Yes | Suspend request containing an optional `reason` string (max 128 characters). |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/suspend.post({
    reason: "Customer requested a temporary pause in service."
});
```

</details>

<details>
<summary>Cancel a subscription</summary>

Cancels a subscription, by ID. A cancelled subscription cannot be reactivated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `payload` | `paypal:SubscriptionCancelRequest` | Yes | Cancel request containing an optional `reason` string (max 128 characters). |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/cancel.post({
    reason: "Customer requested cancellation."
});
```

</details>

<details>
<summary>Activate a subscription</summary>

Reactivates a suspended subscription, by ID, resuming the billing schedule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `payload` | `paypal:SubscriptionActivateRequest` | Yes | Activate request containing an optional `reason` string (max 128 characters). |

Returns: `error?`

Sample code:

```ballerina
error? result = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/activate.post({
    reason: "Reactivating subscription at customer request."
});
```

</details>

<details>
<summary>Capture authorized payment on a subscription</summary>

Captures an authorized payment from the subscriber on the subscription, by ID. Used to collect outstanding balances or the full authorized amount.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `payload` | `paypal:SubscriptionCaptureRequest` | Yes | Capture request specifying `note`, `capture_type` (`OUTSTANDING_BALANCE`), and the `amount` to capture. |

Returns: `paypal:Transaction|error?`

Sample code:

```ballerina
paypal:Transaction? transaction = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/capture.post({
    note: "Capturing outstanding balance for January 2024",
    capture_type: "OUTSTANDING_BALANCE",
    amount: {currency_code: "USD", value: "10.00"}
});
```

Sample response:

```ballerina
{
  "id": "8C679109KX922894H",
  "status": "COMPLETED",
  "amount_with_breakdown": {
    "gross_amount": {"currency_code": "USD", "value": "10.00"},
    "fee_amount": {"currency_code": "USD", "value": "0.69"},
    "net_amount": {"currency_code": "USD", "value": "9.31"}
  },
  "payer_email": "john.doe@example.com",
  "payer_name": {"given_name": "John", "surname": "Doe"},
  "time": "2024-01-15T11:30:00Z"
}
```

</details>

<details>
<summary>List transactions for a subscription</summary>

Lists transactions for a subscription, by ID, within a specified date range.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the subscription. |
| `queries` | `paypal:SubscriptionsTransactionsQueries` | Yes | Required date-range filter: `start_time` and `end_time` in ISO 8601 date-time format. |

Returns: `paypal:TransactionsList|error`

Sample code:

```ballerina
paypal:TransactionsList txList = check paypalClient->/subscriptions/["I-BW452GLLEP1G"]/transactions(
    queries = {
        start_time: "2024-01-01T00:00:00Z",
        end_time: "2024-12-31T23:59:59Z"
    }
);
```

Sample response:

```ballerina
{
  "transactions": [
    {
      "id": "8C679109KX922894H",
      "status": "COMPLETED",
      "amount_with_breakdown": {
        "gross_amount": {"currency_code": "USD", "value": "10.00"},
        "fee_amount": {"currency_code": "USD", "value": "0.69"},
        "net_amount": {"currency_code": "USD", "value": "9.31"}
      },
      "payer_email": "john.doe@example.com",
      "payer_name": {"given_name": "John", "surname": "Doe"},
      "time": "2024-01-15T11:30:00Z"
    },
    {
      "id": "9D780210LY033905I",
      "status": "COMPLETED",
      "amount_with_breakdown": {
        "gross_amount": {"currency_code": "USD", "value": "10.00"},
        "fee_amount": {"currency_code": "USD", "value": "0.69"},
        "net_amount": {"currency_code": "USD", "value": "9.31"}
      },
      "payer_email": "john.doe@example.com",
      "payer_name": {"given_name": "John", "surname": "Doe"},
      "time": "2024-02-15T11:00:00Z"
    }
  ],
  "links": [
    {
      "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/transactions",
      "rel": "self",
      "method": "GET"
    }
  ]
}
```

</details>
