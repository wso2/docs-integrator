---
title: Actions
---

# Actions

The `ballerinax/shopify.admin` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Shopify Admin REST API: manage customers, products, orders, fulfillments, webhooks, and more. |

---

## Client

Shopify Admin REST API: manage customers, products, orders, fulfillments, webhooks, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `xShopifyAccessToken` | `string` | Required | The Shopify Admin API access token (`X-Shopify-Access-Token` header). |

### Initializing the client

```ballerina
import ballerinax/shopify.admin;

configurable string accessToken = ?;
configurable string storeUrl = ?;

admin:ApiKeysConfig apiKeyConfig = {
    xShopifyAccessToken: accessToken
};

admin:Client shopify = check new (apiKeyConfig, storeUrl);
```

### Operations

#### Customer management

<details>
<summary>getCustomers</summary>

Retrieves a list of customers with optional filtering by IDs, date ranges, and pagination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ids` | `string?` | No | Comma-separated list of customer IDs to restrict results. |
| `sinceId` | `string?` | No | Restrict results to those after the specified ID. |
| `createdAtMin` | `string?` | No | Show customers created after this date (ISO 8601). |
| `createdAtMax` | `string?` | No | Show customers created before this date (ISO 8601). |
| `updatedAtMin` | `string?` | No | Show customers last updated after this date (ISO 8601). |
| `updatedAtMax` | `string?` | No | Show customers last updated before this date (ISO 8601). |
| `'limit` | `int?` | No | Maximum number of results to show (default: 50, max: 250). |
| `fields` | `string?` | No | Comma-separated list of fields to include in the response. |

Returns: `CustomerList|error`

Sample code:

```ballerina
admin:CustomerList customers = check shopify->getCustomers('limit = 10);
```

Sample response:

```ballerina
{
  "customers": [
    {
      "id": 6940095127745,
      "first_name": "Steve",
      "last_name": "Lastnameson",
      "email": "steve.lastnameson@example.com",
      "orders_count": 0,
      "state": "disabled",
      "total_spent": "0.00",
      "created_at": "2024-01-15T10:30:00-05:00"
    }
  ]
}
```

</details>

<details>
<summary>createCustomer</summary>

Creates a new customer record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateCustomer` | Yes | The Customer object to be created. |

Returns: `CustomerObject|error`

Sample code:

```ballerina
admin:CreateCustomer payload = {
    customer: {
        first_name: "Steve",
        last_name: "Lastnameson",
        email: "steve.lastnameson@example.com"
    }
};
admin:CustomerObject result = check shopify->createCustomer(payload);
```

Sample response:

```ballerina
{
  "customer": {
    "id": 6940095127745,
    "first_name": "Steve",
    "last_name": "Lastnameson",
    "email": "steve.lastnameson@example.com",
    "created_at": "2024-01-15T10:30:00-05:00",
    "orders_count": 0,
    "state": "disabled",
    "total_spent": "0.00",
    "verified_email": true
  }
}
```

</details>

<details>
<summary>getCustomer</summary>

Retrieves a single customer by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `string` | Yes | The customer ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `CustomerObject|error`

Sample code:

```ballerina
admin:CustomerObject customer = check shopify->getCustomer("6940095127745");
```

Sample response:

```ballerina
{
  "customer": {
    "id": 6940095127745,
    "first_name": "Steve",
    "last_name": "Lastnameson",
    "email": "steve.lastnameson@example.com",
    "orders_count": 0,
    "state": "disabled"
  }
}
```

</details>

<details>
<summary>updateCustomer</summary>

Updates an existing customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `string` | Yes | The customer ID. |
| `payload` | `UpdateCustomer` | Yes | The Customer object with updated fields. |

Returns: `CustomerObject|error`

Sample code:

```ballerina
admin:CustomerObject updated = check shopify->updateCustomer("6940095127745", {
    customer: {
        first_name: "Steven",
        tags: "VIP,loyal"
    }
});
```

Sample response:

```ballerina
{
  "customer": {
    "id": 6940095127745,
    "first_name": "Steven",
    "last_name": "Lastnameson",
    "email": "steve.lastnameson@example.com",
    "tags": "VIP,loyal"
  }
}
```

</details>

<details>
<summary>searchCustomers</summary>

Searches for customers matching a supplied query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string?` | No | Text to search for in the shop's customer data. |
| `'order` | `string?` | No | Field and direction by which to order results (default: `last_order_date DESC`). |
| `'limit` | `int?` | No | Maximum number of results (default: 50, max: 250). |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `CustomerList|error`

Sample code:

```ballerina
admin:CustomerList results = check shopify->searchCustomers(query = "steve");
```

Sample response:

```ballerina
{
  "customers": [
    {
      "id": 6940095127745,
      "first_name": "Steve",
      "last_name": "Lastnameson",
      "email": "steve.lastnameson@example.com"
    }
  ]
}
```

</details>

#### Product management

<details>
<summary>getProducts</summary>

Retrieves a list of products with optional filtering by title, vendor, status, collection, and date ranges.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ids` | `string?` | No | Comma-separated list of product IDs. |
| `'limit` | `int?` | No | Maximum results per page (default: 50, max: 250). |
| `title` | `string?` | No | Filter by product title. |
| `vendor` | `string?` | No | Filter by product vendor. |
| `productType` | `string?` | No | Filter by product type. |
| `status` | `string?` | No | Filter by status: `active`, `archived`, or `draft` (default: `active`). |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `ProductList|error`

Sample code:

```ballerina
admin:ProductList products = check shopify->getProducts(status = "active", 'limit = 5);
```

Sample response:

```ballerina
{
  "products": [
    {
      "id": 7982605344961,
      "title": "Classic T-Shirt",
      "vendor": "Acme",
      "product_type": "Apparel",
      "status": "active",
      "created_at": "2024-01-10T08:00:00-05:00"
    }
  ]
}
```

</details>

<details>
<summary>createProduct</summary>

Creates a new product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateProduct` | Yes | The Product object to be created. |

Returns: `ProductObject|error`

Sample code:

```ballerina
admin:ProductObject product = check shopify->createProduct({
    product: {
        title: "Classic T-Shirt",
        body_html: "<p>A comfortable cotton t-shirt.</p>",
        vendor: "Acme",
        product_type: "Apparel",
        tags: "cotton,summer"
    }
});
```

Sample response:

```ballerina
{
  "product": {
    "id": 7982605344961,
    "title": "Classic T-Shirt",
    "body_html": "<p>A comfortable cotton t-shirt.</p>",
    "vendor": "Acme",
    "product_type": "Apparel",
    "status": "draft",
    "tags": "cotton,summer"
  }
}
```

</details>

<details>
<summary>getProduct</summary>

Retrieves a single product by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | `string` | Yes | The product ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `ProductObject|error`

Sample code:

```ballerina
admin:ProductObject product = check shopify->getProduct("7982605344961");
```

Sample response:

```ballerina
{
  "product": {
    "id": 7982605344961,
    "title": "Classic T-Shirt",
    "vendor": "Acme",
    "product_type": "Apparel",
    "status": "active"
  }
}
```

</details>

<details>
<summary>updateProduct</summary>

Updates a product and its variants and images.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | `string` | Yes | The product ID. |
| `payload` | `UpdateProduct` | Yes | The Product object with updated fields. |

Returns: `ProductObject|error`

Sample code:

```ballerina
admin:ProductObject updated = check shopify->updateProduct("7982605344961", {
    product: {
        title: "Premium Classic T-Shirt",
        status: "active"
    }
});
```

Sample response:

```ballerina
{
  "product": {
    "id": 7982605344961,
    "title": "Premium Classic T-Shirt",
    "vendor": "Acme",
    "status": "active"
  }
}
```

</details>

#### Product variants

<details>
<summary>getProductVariants</summary>

Retrieves a list of product variants for a given product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | `string` | Yes | The product ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |
| `'limit` | `int?` | No | Maximum results per page. |
| `sinceId` | `string?` | No | Restrict results to after the specified ID. |

Returns: `ProductVariantList|error`

Sample code:

```ballerina
admin:ProductVariantList variants = check shopify->getProductVariants("7982605344961");
```

Sample response:

```ballerina
{
  "variants": [
    {
      "id": 43503271895233,
      "product_id": 7982605344961,
      "title": "Small / Blue",
      "price": "19.99",
      "sku": "TSHIRT-S-BLUE",
      "inventory_quantity": 50
    }
  ]
}
```

</details>

<details>
<summary>createProductVariant</summary>

Creates a new product variant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | `string` | Yes | The product ID. |
| `payload` | `CreateProductVariant` | Yes | The Product variant object to be created. |

Returns: `ProductVariantObject|error`

Sample code:

```ballerina
admin:ProductVariantObject variant = check shopify->createProductVariant("7982605344961", {
    variant: {
        option1: "Large",
        price: "24.99",
        sku: "TSHIRT-L-BLUE"
    }
});
```

Sample response:

```ballerina
{
  "variant": {
    "id": 43503271895300,
    "product_id": 7982605344961,
    "title": "Large",
    "price": "24.99",
    "sku": "TSHIRT-L-BLUE"
  }
}
```

</details>

<details>
<summary>getProductVariant</summary>

Retrieves a single product variant by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variantId` | `string` | Yes | The variant ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `ProductVariantObject|error`

Sample code:

```ballerina
admin:ProductVariantObject variant = check shopify->getProductVariant("43503271895233");
```

Sample response:

```ballerina
{
  "variant": {
    "id": 43503271895233,
    "product_id": 7982605344961,
    "title": "Small / Blue",
    "price": "19.99",
    "sku": "TSHIRT-S-BLUE"
  }
}
```

</details>

<details>
<summary>updateProductVariant</summary>

Updates an existing product variant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `variantId` | `string` | Yes | The variant ID. |
| `payload` | `UpdateProductVariant` | Yes | The Product variant object with updated fields. |

Returns: `ProductVariantObject|error`

Sample code:

```ballerina
admin:ProductVariantObject updated = check shopify->updateProductVariant("43503271895233", {
    variant: {
        price: "22.99"
    }
});
```

Sample response:

```ballerina
{
  "variant": {
    "id": 43503271895233,
    "price": "22.99",
    "sku": "TSHIRT-S-BLUE"
  }
}
```

</details>

#### Order management

<details>
<summary>getOrders</summary>

Retrieves a list of orders with optional filtering by status, financial status, fulfillment status, and date ranges.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ids` | `string?` | No | Comma-separated list of order IDs. |
| `'limit` | `int?` | No | Maximum results per page (default: 50, max: 250). |
| `status` | `string?` | No | Filter by order status: `open`, `closed`, `cancelled`, or `any` (default: `open`). |
| `financialStatus` | `string?` | No | Filter by financial status: `authorized`, `pending`, `paid`, `partially_paid`, `refunded`, `voided`, `partially_refunded`, `any`, or `unpaid`. |
| `fulfillmentStatus` | `string?` | No | Filter by fulfillment status: `shipped`, `partial`, `unshipped`, `any`, or `unfulfilled`. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `OrderList|error`

Sample code:

```ballerina
admin:OrderList orders = check shopify->getOrders(status = "open", 'limit = 10);
```

Sample response:

```ballerina
{
  "orders": [
    {
      "id": 5553109696705,
      "name": "#1001",
      "email": "steve.lastnameson@example.com",
      "total_price": "49.98",
      "financial_status": "paid",
      "fulfillment_status": null,
      "created_at": "2024-01-20T14:00:00-05:00"
    }
  ]
}
```

</details>

<details>
<summary>createOrder</summary>

Creates an order. By default, product inventory is not claimed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateOrder` | Yes | The Order object to be created. |

Returns: `OrderObject|error`

Sample code:

```ballerina
admin:OrderObject newOrder = check shopify->createOrder({
    'order: {
        line_items: [
            {
                variant_id: 43503271895233,
                quantity: 2
            }
        ],
        customer: {
            id: 6940095127745
        },
        financial_status: "pending"
    }
});
```

Sample response:

```ballerina
{
  "order": {
    "id": 5553109696705,
    "name": "#1001",
    "total_price": "39.98",
    "financial_status": "pending",
    "fulfillment_status": null,
    "line_items": [
      {
        "id": 12345678901234,
        "variant_id": 43503271895233,
        "title": "Classic T-Shirt",
        "quantity": 2,
        "price": "19.99"
      }
    ]
  }
}
```

</details>

<details>
<summary>getOrder</summary>

Retrieves a specific order by ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `OrderObject|error`

Sample code:

```ballerina
admin:OrderObject order = check shopify->getOrder("5553109696705");
```

Sample response:

```ballerina
{
  "order": {
    "id": 5553109696705,
    "name": "#1001",
    "email": "steve.lastnameson@example.com",
    "total_price": "49.98",
    "financial_status": "paid",
    "fulfillment_status": null
  }
}
```

</details>

<details>
<summary>updateOrder</summary>

Updates an existing order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `payload` | `UpdateOrder` | Yes | The Order object with updated fields. |

Returns: `OrderObject|error`

Sample code:

```ballerina
admin:OrderObject updated = check shopify->updateOrder("5553109696705", {
    'order: {
        note: "Customer requested gift wrapping",
        tags: "gift,priority"
    }
});
```

Sample response:

```ballerina
{
  "order": {
    "id": 5553109696705,
    "name": "#1001",
    "note": "Customer requested gift wrapping",
    "tags": "gift,priority"
  }
}
```

</details>

#### Fulfillments

<details>
<summary>getOrderFulfillments</summary>

Retrieves fulfillments associated with an order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `createdAtMin` | `string?` | No | Show fulfillments created after this date (ISO 8601). |
| `createdAtMax` | `string?` | No | Show fulfillments created before this date (ISO 8601). |
| `fields` | `string?` | No | Comma-separated list of fields to include. |
| `'limit` | `int?` | No | Maximum results (default: 50, max: 250). |

Returns: `OrderFulfillmentsList|error`

Sample code:

```ballerina
admin:OrderFulfillmentsList fulfillments = check shopify->getOrderFulfillments("5553109696705");
```

Sample response:

```ballerina
{
  "fulfillments": [
    {
      "id": 4521387524289,
      "order_id": 5553109696705,
      "status": "success",
      "tracking_company": "UPS",
      "tracking_numbers": ["1Z999AA10123456784"],
      "created_at": "2024-01-22T10:00:00-05:00"
    }
  ]
}
```

</details>

<details>
<summary>createOrderFulfillment</summary>

Creates a fulfillment for the specified order and line items. If no line item IDs are specified, all unfulfilled and partially fulfilled line items are fulfilled.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `payload` | `CreateOrderFulfillment` | Yes | The fulfillment object to be created. |

Returns: `OrderFulfillmentObject|error`

Sample code:

```ballerina
admin:OrderFulfillmentObject fulfillment = check shopify->createOrderFulfillment("5553109696705", {
    fulfillment: {
        tracking_company: "UPS",
        tracking_numbers: ["1Z999AA10123456784"],
        notify_customer: "true"
    }
});
```

Sample response:

```ballerina
{
  "fulfillment": {
    "id": 4521387524289,
    "order_id": 5553109696705,
    "status": "success",
    "tracking_company": "UPS",
    "tracking_numbers": ["1Z999AA10123456784"]
  }
}
```

</details>

#### Draft orders

<details>
<summary>createDraftOrder</summary>

Creates a draft order for deferred or manual order workflows.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateDraftOrder` | Yes | The Draft order object to be created. |
| `customerId` | `string?` | No | Used to load the customer and associate their email. |
| `useCustomerDefaultAddress` | `boolean?` | No | Load customer shipping information if `true`. |

Returns: `DraftOrderObject|error`

Sample code:

```ballerina
admin:DraftOrderObject draft = check shopify->createDraftOrder({
    draft_order: {
        line_items: [
            {
                title: "Custom Item",
                price: "29.99",
                quantity: 1
            }
        ],
        customer: {
            id: 6940095127745
        }
    }
});
```

Sample response:

```ballerina
{
  "draft_order": {
    "id": 1078505537729,
    "name": "#D1",
    "status": "open",
    "total_price": "29.99",
    "subtotal_price": "29.99",
    "customer": {
      "id": 6940095127745,
      "first_name": "Steve"
    }
  }
}
```

</details>

#### Transactions & refunds

<details>
<summary>createTransactionForOrder</summary>

Creates a transaction for an order (e.g., capture, sale, or external payment).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `payload` | `CreateTransaction` | Yes | The Transaction object to be created. |
| `'source` | `string?` | No | Set to `external` for cash transactions. |

Returns: `TransactionObject|error`

Sample code:

```ballerina
admin:TransactionObject txn = check shopify->createTransactionForOrder("5553109696705", {
    'transaction: {
        kind: "capture",
        amount: "49.98"
    }
});
```

Sample response:

```ballerina
{
  "transaction": {
    "id": 6981435809,
    "order_id": 5553109696705,
    "kind": "capture",
    "amount": "49.98",
    "status": "success",
    "created_at": "2024-01-22T11:00:00-05:00"
  }
}
```

</details>

<details>
<summary>createRefundForOrder</summary>

Creates a refund for an order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `payload` | `CreateRefund` | Yes | The Refund object to be created. |

Returns: `RefundObject|error`

Sample code:

```ballerina
admin:RefundObject refund = check shopify->createRefundForOrder("5553109696705", {
    refund: {
        note: "Customer returned item",
        shipping: {
            full_refund: true
        }
    }
});
```

Sample response:

```ballerina
{
  "refund": {
    "id": 929361237,
    "order_id": 5553109696705,
    "note": "Customer returned item",
    "created_at": "2024-01-25T09:00:00-05:00"
  }
}
```

</details>

#### Order risks

<details>
<summary>getOrderRisks</summary>

Retrieves a list of all order risks for an order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |

Returns: `OrderRiskList|error`

Sample code:

```ballerina
admin:OrderRiskList risks = check shopify->getOrderRisks("5553109696705");
```

Sample response:

```ballerina
{
  "risks": [
    {
      "id": 8723457891,
      "order_id": 5553109696705,
      "message": "This order was placed from a proxy IP",
      "recommendation": "investigate",
      "score": "0.8",
      "source": "External",
      "cause_cancel": false,
      "display": true
    }
  ]
}
```

</details>

<details>
<summary>createOrderRisk</summary>

Creates an order risk for an order.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `payload` | `CreateOrderRisk` | Yes | The order risk object to be created. |

Returns: `OrderRiskObject|error`

Sample code:

```ballerina
admin:OrderRiskObject risk = check shopify->createOrderRisk("5553109696705", {
    risk: {
        message: "This order came from an unusual location",
        recommendation: "investigate",
        score: "0.7",
        'source: "External",
        cause_cancel: false,
        display: true
    }
});
```

Sample response:

```ballerina
{
  "risk": {
    "id": 8723457892,
    "order_id": 5553109696705,
    "message": "This order came from an unusual location",
    "recommendation": "investigate",
    "score": "0.7",
    "source": "External"
  }
}
```

</details>

<details>
<summary>getOrderRisk</summary>

Retrieves a single order risk by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `riskId` | `string` | Yes | The order risk ID. |

Returns: `OrderRiskObject|error`

Sample code:

```ballerina
admin:OrderRiskObject risk = check shopify->getOrderRisk("5553109696705", "8723457891");
```

Sample response:

```ballerina
{
  "risk": {
    "id": 8723457891,
    "order_id": 5553109696705,
    "message": "This order was placed from a proxy IP",
    "recommendation": "investigate",
    "score": "0.8"
  }
}
```

</details>

<details>
<summary>updateOrderRisk</summary>

Updates an order risk.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `orderId` | `string` | Yes | The order ID. |
| `riskId` | `string` | Yes | The order risk ID. |
| `payload` | `UpdateOrderRisk` | Yes | The order risk object with updated fields. |

Returns: `OrderRiskObject|error`

Sample code:

```ballerina
admin:OrderRiskObject updated = check shopify->updateOrderRisk("5553109696705", "8723457891", {
    risk: {
        recommendation: "accept",
        score: "0.2"
    }
});
```

Sample response:

```ballerina
{
  "risk": {
    "id": 8723457891,
    "order_id": 5553109696705,
    "recommendation": "accept",
    "score": "0.2"
  }
}
```

</details>

#### Webhook management

<details>
<summary>getWebhooks</summary>

Retrieves a list of webhook subscriptions with optional filtering by address, topic, and date ranges.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `string?` | No | Filter by the URI that receives the POST request. |
| `topic` | `string?` | No | Filter by webhook topic (e.g., `orders/create`). |
| `'limit` | `int?` | No | Maximum results (default: 50, max: 250). |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `WebhookList|error`

Sample code:

```ballerina
admin:WebhookList webhooks = check shopify->getWebhooks(topic = "orders/create");
```

Sample response:

```ballerina
{
  "webhooks": [
    {
      "id": 1071340091,
      "address": "https://example.com/webhooks/orders",
      "topic": "orders/create",
      "format": "json",
      "created_at": "2024-01-10T08:00:00-05:00"
    }
  ]
}
```

</details>

<details>
<summary>createWebhook</summary>

Creates a new webhook subscription by specifying both an address and a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateWebhook` | Yes | The webhook subscription object to be created. |

Returns: `WebhookObject|error`

Sample code:

```ballerina
admin:WebhookObject webhook = check shopify->createWebhook({
    webhook: {
        topic: "orders/create",
        address: "https://example.com/webhooks/orders",
        format: "json"
    }
});
```

Sample response:

```ballerina
{
  "webhook": {
    "id": 1071340092,
    "address": "https://example.com/webhooks/orders",
    "topic": "orders/create",
    "format": "json",
    "created_at": "2024-01-28T12:00:00-05:00"
  }
}
```

</details>

<details>
<summary>getWebhook</summary>

Retrieves a single webhook subscription by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The webhook ID. |
| `fields` | `string?` | No | Comma-separated list of fields to include. |

Returns: `WebhookObject|error`

Sample code:

```ballerina
admin:WebhookObject webhook = check shopify->getWebhook("1071340091");
```

Sample response:

```ballerina
{
  "webhook": {
    "id": 1071340091,
    "address": "https://example.com/webhooks/orders",
    "topic": "orders/create",
    "format": "json"
  }
}
```

</details>

<details>
<summary>updateWebhook</summary>

Updates a webhook subscription's topic or address URI.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` | Yes | The webhook ID. |
| `payload` | `UpdateWebhook` | Yes | The webhook object with updated fields. |

Returns: `WebhookObject|error`

Sample code:

```ballerina
admin:WebhookObject updated = check shopify->updateWebhook("1071340091", {
    webhook: {
        address: "https://new-endpoint.example.com/webhooks/orders"
    }
});
```

Sample response:

```ballerina
{
  "webhook": {
    "id": 1071340091,
    "address": "https://new-endpoint.example.com/webhooks/orders",
    "topic": "orders/create"
  }
}
```

</details>

<details>
<summary>getWebhookCount</summary>

Retrieves a count of existing webhook subscriptions, optionally filtered by address or topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `address` | `string?` | No | Filter by the URI that receives the POST request. |
| `topic` | `string?` | No | Filter by webhook topic. |

Returns: `WebhookCountObject|error`

Sample code:

```ballerina
admin:WebhookCountObject count = check shopify->getWebhookCount();
```

Sample response:

```ballerina
{
  "count": 4
}
```

</details>
