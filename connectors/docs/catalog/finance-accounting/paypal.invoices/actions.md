---
title: Actions
---

# Actions

The `ballerinax/paypal.invoices` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | PayPal Invoicing API v2: invoice CRUD, send/remind/cancel, payments, refunds, search, QR codes, and templates. |

---

## Client

PayPal Invoicing API v2: invoice CRUD, send/remind/cancel, payments, refunds, search, QR codes, and templates.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials grant configuration. Requires `clientId` and `clientSecret`. Default token URL is `https://api-m.sandbox.paypal.com/v1/oauth2/token`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Use lax data binding for response payloads. |

### Initializing the client

```ballerina
import ballerinax/paypal.invoices;

configurable string clientId = ?;
configurable string clientSecret = ?;

invoices:Client invoicesClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret
    }
});
```

### Operations

#### Invoice CRUD

<details>
<summary>List invoices</summary>

Lists invoices with optional pagination and field filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `InvoicesListQueries` | No | Query parameters: `page` (default `1`), `page_size` (default `20`), `fields` (default `"all"`), `total_required` (default `false`). |

Returns: `Invoices|error`

Sample code:

```ballerina
invoices:Invoices result = check invoicesClient->/invoices();
```

Sample response:

```ballerina
{
  "total_items": 2,
  "total_pages": 1,
  "items": [
    {
      "id": "INV2-XXXX-XXXX-XXXX-XXXX",
      "status": "DRAFT",
      "detail": {
        "currency_code": "USD",
        "invoice_number": "#001",
        "invoice_date": "2024-01-15"
      }
    }
  ],
  "links": [
    {"href": "https://api-m.sandbox.paypal.com/v2/invoicing/invoices?page=1&page_size=20&total_required=false", "rel": "self", "method": "GET"}
  ]
}
```

</details>

<details>
<summary>Create draft invoice</summary>

Creates a draft invoice. The invoice must include a `detail` record with at least a `currency_code`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Invoice` | Yes | Invoice data including detail, items, invoicer, and recipient information. |
| `headers` | `InvoicesCreateHeaders` | No | Optional headers. `Prefer` defaults to `"return=representation"` to return the full invoice. |

Returns: `Invoice|error`

Sample code:

```ballerina
invoices:Invoice invoice = check invoicesClient->/invoices.post({
    detail: {
        currency_code: "USD",
        invoice_number: "#INV-001",
        invoice_date: "2024-03-15",
        payment_term: {
            term_type: "NET_30"
        }
    },
    invoicer: {
        business_name: "Acme Corp",
        email_address: "invoicing@acme.com"
    },
    primary_recipients: [
        {
            billing_info: {
                email_address: "customer@example.com"
            }
        }
    ],
    items: [
        {
            name: "Consulting Services",
            quantity: "10",
            unit_amount: {
                currency_code: "USD",
                value: "150.00"
            },
            unit_of_measure: "HOURS"
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "INV2-XXXX-XXXX-XXXX-XXXX",
  "status": "DRAFT",
  "detail": {
    "currency_code": "USD",
    "invoice_number": "#INV-001",
    "invoice_date": "2024-03-15",
    "payment_term": {"term_type": "NET_30"}
  },
  "invoicer": {
    "business_name": "Acme Corp",
    "email_address": "invoicing@acme.com"
  },
  "primary_recipients": [{"billing_info": {"email_address": "customer@example.com"}}],
  "items": [{"name": "Consulting Services", "quantity": "10", "unit_amount": {"currency_code": "USD", "value": "150.00"}, "unit_of_measure": "HOURS"}],
  "amount": {"currency_code": "USD", "value": "1500.00"},
  "links": [{"href": "https://api-m.sandbox.paypal.com/v2/invoicing/invoices/INV2-XXXX-XXXX-XXXX-XXXX", "rel": "self", "method": "GET"}]
}
```

</details>

<details>
<summary>Show invoice details</summary>

Retrieves the full details of an invoice by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID (e.g., `"INV2-XXXX-XXXX-XXXX-XXXX"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Invoice|error`

Sample code:

```ballerina
invoices:Invoice invoice = check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"];
```

Sample response:

```ballerina
{
  "id": "INV2-XXXX-XXXX-XXXX-XXXX",
  "status": "SENT",
  "detail": {
    "currency_code": "USD",
    "invoice_number": "#INV-001",
    "invoice_date": "2024-03-15",
    "payment_term": {"term_type": "NET_30", "due_date": "2024-04-14"}
  },
  "amount": {"currency_code": "USD", "value": "1500.00"},
  "due_amount": {"currency_code": "USD", "value": "1500.00"}
}
```

</details>

<details>
<summary>Fully update invoice</summary>

Fully updates an invoice by replacing the entire invoice object. Only invoices in DRAFT or SENT status can be updated.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `Invoice` | Yes | The full updated invoice object. |
| `headers` | `InvoicesUpdateHeaders` | No | Optional headers. `Prefer` defaults to `"return=representation"`. |
| `queries` | `InvoicesUpdateQueries` | No | Query parameters: `send_to_recipient` (default `true`), `send_to_invoicer` (default `true`). |

Returns: `Invoice|error`

Sample code:

```ballerina
invoices:Invoice updated = check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"].put({
    detail: {
        currency_code: "USD",
        invoice_number: "#INV-001",
        invoice_date: "2024-03-15",
        note: "Updated terms"
    },
    items: [
        {
            name: "Consulting Services",
            quantity: "15",
            unit_amount: {
                currency_code: "USD",
                value: "150.00"
            },
            unit_of_measure: "HOURS"
        }
    ]
});
```

Sample response:

```ballerina
{
  "id": "INV2-XXXX-XXXX-XXXX-XXXX",
  "status": "DRAFT",
  "detail": {
    "currency_code": "USD",
    "invoice_number": "#INV-001",
    "invoice_date": "2024-03-15",
    "note": "Updated terms"
  },
  "items": [{"name": "Consulting Services", "quantity": "15", "unit_amount": {"currency_code": "USD", "value": "150.00"}, "unit_of_measure": "HOURS"}],
  "amount": {"currency_code": "USD", "value": "2250.00"}
}
```

</details>

<details>
<summary>Delete invoice</summary>

Deletes a draft invoice. Only invoices in DRAFT status can be deleted.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"].delete();
```

</details>

#### Send, remind & cancel

<details>
<summary>Send invoice</summary>

Sends an invoice to the recipient. Changes the invoice status from DRAFT to SENT.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `Notification` | Yes | Notification options including subject, note, and recipient settings. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `LinkDescription|'202Response|error`

Sample code:

```ballerina
invoices:LinkDescription|invoices:'202Response result = check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/send.post({
    send_to_invoicer: true,
    send_to_recipient: true,
    subject: "Invoice #INV-001 from Acme Corp",
    note: "Please find your invoice attached."
});
```

Sample response:

```ballerina
{
  "href": "https://api-m.sandbox.paypal.com/v2/invoicing/invoices/INV2-XXXX-XXXX-XXXX-XXXX",
  "rel": "self",
  "method": "GET"
}
```

</details>

<details>
<summary>Send invoice reminder</summary>

Sends a reminder for an unpaid invoice to the recipient.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `Notification` | Yes | Notification options for the reminder. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/remind.post({
    send_to_recipient: true,
    subject: "Reminder: Invoice #INV-001 is due",
    note: "This is a friendly reminder that your invoice is due."
});
```

</details>

<details>
<summary>Cancel sent invoice</summary>

Cancels a sent invoice. The invoice status changes to CANCELLED.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `Notification` | Yes | Notification options for the cancellation notice. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/cancel.post({
    send_to_recipient: true,
    send_to_invoicer: true,
    subject: "Invoice #INV-001 cancelled",
    note: "This invoice has been cancelled."
});
```

</details>

#### Payments

<details>
<summary>Record payment for invoice</summary>

Records an external payment against an invoice. Use this to mark payments made outside of PayPal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `PaymentDetail` | Yes | Payment details including method, amount, and date. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `PaymentReference|error`

Sample code:

```ballerina
invoices:PaymentReference paymentRef = check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/payments.post({
    method: "CHECK",
    payment_date: "2024-03-20",
    amount: {
        currency_code: "USD",
        value: "1500.00"
    }
});
```

Sample response:

```ballerina
{"payment_id": "EXTR-XXXX-XXXX-XXXX-XXXX"}
```

</details>

<details>
<summary>Delete external payment</summary>

Deletes an externally recorded payment from an invoice.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `transactionId` | `string` | Yes | The payment transaction ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/payments/["EXTR-XXXX-XXXX-XXXX-XXXX"].delete();
```

</details>

#### Refunds

<details>
<summary>Record refund for invoice</summary>

Records an external refund against an invoice.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `RefundDetail` | Yes | Refund details including method, amount, and date. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `RefundReference|error`

Sample code:

```ballerina
invoices:RefundReference refundRef = check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/refunds.post({
    method: "BANK_TRANSFER",
    refund_date: "2024-04-01",
    amount: {
        currency_code: "USD",
        value: "500.00"
    }
});
```

Sample response:

```ballerina
{"refund_id": "EXTR-XXXX-XXXX-XXXX-XXXX"}
```

</details>

<details>
<summary>Delete external refund</summary>

Deletes an externally recorded refund from an invoice.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `transactionId` | `string` | Yes | The refund transaction ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/refunds/["EXTR-XXXX-XXXX-XXXX-XXXX"].delete();
```

</details>

#### Search & utilities

<details>
<summary>Search for invoices</summary>

Searches for invoices matching the specified criteria such as status, dates, recipient, or amount ranges.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchData` | Yes | Search criteria including status, date ranges, recipient info, currency code, and more. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `InvoicesSearchInvoicesQueries` | No | Query parameters: `page` (default `1`), `page_size` (default `20`), `total_required` (default `false`). |

Returns: `Invoices|error`

Sample code:

```ballerina
invoices:Invoices results = check invoicesClient->/search\-invoices.post({
    status: ["SENT", "UNPAID"],
    invoice_date_range: {
        'start: "2024-01-01",
        end: "2024-12-31"
    }
});
```

Sample response:

```ballerina
{
  "total_items": 5,
  "total_pages": 1,
  "items": [
    {
      "id": "INV2-XXXX-XXXX-XXXX-XXXX",
      "status": "SENT",
      "detail": {"currency_code": "USD", "invoice_number": "#INV-001", "invoice_date": "2024-03-15"},
      "amount": {"currency_code": "USD", "value": "1500.00"},
      "due_amount": {"currency_code": "USD", "value": "1500.00"}
    }
  ]
}
```

</details>

<details>
<summary>Generate invoice number</summary>

Generates the next sequential invoice number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `InvoicingGenerateNextInvoiceNumberHeaders` | No | Optional headers. `Content-Type` defaults to `"application/json"`. |

Returns: `InvoiceNumber|error`

Sample code:

```ballerina
invoices:InvoiceNumber nextNumber = check invoicesClient->/generate\-next\-invoice\-number.post();
```

Sample response:

```ballerina
{"invoice_number": "#0042"}
```

</details>

<details>
<summary>Generate QR code</summary>

Generates a QR code for an invoice. The QR code can be used to direct payers to the invoice payment page.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `invoiceId` | `string` | Yes | The PayPal invoice ID. |
| `payload` | `QrConfig` | Yes | QR code configuration: `width` (default `500`), `height` (default `500`), `action` (default `"pay"`). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/invoices/["INV2-XXXX-XXXX-XXXX-XXXX"]/generate\-qr\-code.post({
    width: 300,
    height: 300,
    action: "pay"
});
```

</details>

#### Templates

<details>
<summary>List templates</summary>

Lists all invoice templates with optional pagination and field filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `TemplatesListQueries` | No | Query parameters: `page` (default `1`), `page_size` (default `20`), `fields` (default `"all"`). |

Returns: `Templates|error`

Sample code:

```ballerina
invoices:Templates templates = check invoicesClient->/templates();
```

Sample response:

```ballerina
{
  "templates": [
    {
      "id": "TEMP-XXXX-XXXX-XXXX-XXXX",
      "name": "Standard Invoice",
      "default_template": true,
      "standard_template": false
    }
  ],
  "links": [{"href": "https://api-m.sandbox.paypal.com/v2/invoicing/templates?page=1&page_size=20", "rel": "self", "method": "GET"}]
}
```

</details>

<details>
<summary>Create template</summary>

Creates a new invoice template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Template` | Yes | Template data including name, settings, and template info. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Template|error`

Sample code:

```ballerina
invoices:Template template = check invoicesClient->/templates.post({
    name: "Monthly Retainer",
    default_template: false,
    template_info: {
        detail: {
            currency_code: "USD",
            note: "Thank you for your business."
        },
        items: [
            {
                name: "Monthly Retainer Fee",
                quantity: "1",
                unit_amount: {
                    currency_code: "USD",
                    value: "2000.00"
                }
            }
        ]
    }
});
```

Sample response:

```ballerina
{
  "id": "TEMP-XXXX-XXXX-XXXX-XXXX",
  "name": "Monthly Retainer",
  "default_template": false,
  "standard_template": false,
  "template_info": {
    "detail": {"currency_code": "USD", "note": "Thank you for your business."},
    "items": [{"name": "Monthly Retainer Fee", "quantity": "1", "unit_amount": {"currency_code": "USD", "value": "2000.00"}}]
  },
  "links": [{"href": "https://api-m.sandbox.paypal.com/v2/invoicing/templates/TEMP-XXXX-XXXX-XXXX-XXXX", "rel": "self", "method": "GET"}]
}
```

</details>

<details>
<summary>Show template details</summary>

Retrieves the full details of an invoice template by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | `string` | Yes | The PayPal template ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Template|error`

Sample code:

```ballerina
invoices:Template template = check invoicesClient->/templates/["TEMP-XXXX-XXXX-XXXX-XXXX"];
```

Sample response:

```ballerina
{
  "id": "TEMP-XXXX-XXXX-XXXX-XXXX",
  "name": "Monthly Retainer",
  "default_template": false,
  "standard_template": false,
  "template_info": {
    "detail": {"currency_code": "USD"},
    "items": [{"name": "Monthly Retainer Fee", "quantity": "1", "unit_amount": {"currency_code": "USD", "value": "2000.00"}}]
  }
}
```

</details>

<details>
<summary>Update template</summary>

Fully updates an invoice template by replacing the entire template object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | `string` | Yes | The PayPal template ID. |
| `payload` | `Template` | Yes | The full updated template object. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Template|error`

Sample code:

```ballerina
invoices:Template updated = check invoicesClient->/templates/["TEMP-XXXX-XXXX-XXXX-XXXX"].put({
    name: "Updated Retainer Template",
    default_template: true,
    template_info: {
        detail: {
            currency_code: "USD",
            note: "Updated terms apply."
        }
    }
});
```

Sample response:

```ballerina
{
  "id": "TEMP-XXXX-XXXX-XXXX-XXXX",
  "name": "Updated Retainer Template",
  "default_template": true,
  "standard_template": false,
  "template_info": {
    "detail": {"currency_code": "USD", "note": "Updated terms apply."}
  }
}
```

</details>

<details>
<summary>Delete template</summary>

Deletes an invoice template.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `templateId` | `string` | Yes | The PayPal template ID. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check invoicesClient->/templates/["TEMP-XXXX-XXXX-XXXX-XXXX"].delete();
```

</details>
