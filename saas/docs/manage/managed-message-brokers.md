---
title: Managed Message Brokers
---

# Managed Message Brokers

WSO2 Cloud - Integration Platform lets you create managed Kafka services as a platform service, the same way you create managed databases and caches. A managed Kafka service gives your integrations a durable, ordered message stream to publish to and consume from, without you having to operate a Kafka cluster yourself.

:::info Availability and billing
- The capability to create managed message broker services is available only for paid WSO2 Cloud users.
- Billing for these services is included in your WSO2 Cloud subscription, the same way managed databases and caches are billed. See [Pricing and plans](billing/pricing-and-plans.md) for how usage translates into cost.

## Create a managed Kafka service

1. Sign in to the WSO2 Cloud Console at [https://console.devant.dev/](https://console.devant.dev/).
2. In the header, click the **Organization** list. This opens the organization home page.
3. In the left navigation menu, click **Dependencies**, then select the message broker service type.
4. Provide a display name, select a cloud provider and region, and choose a service plan.
5. Create the topics your integrations will publish to and consume from.

## Connect to your Kafka service

- Use any Kafka client library (depending on your programming language) to connect to the service.
- Connection parameters and credentials are available from the service's overview page in the WSO2 Cloud Console.
- As with managed databases and caches, you can restrict access to specific IP addresses and CIDR blocks under **Advanced Settings**.

## Use a managed Kafka service from an integration

Consume from or publish to a managed Kafka service the same way you would any Kafka broker, using the Kafka connector in your integration. See [Kafka](../develop-and-test/integration-artifacts/event-driven-integration/kafka.md) for building an event-driven integration against a Kafka broker.

## Add a message broker to the Marketplace

Like managed databases and caches, a managed Kafka service can be registered with credentials and added to the Marketplace, making it available for consumption through a connection across projects. See [Add a managed database or cache to the Marketplace](managed-databases-and-caches.md#add-a-managed-database-or-cache-to-the-marketplace) — the same flow applies to message broker services.

## What's next

- [Managed databases and caches](managed-databases-and-caches.md) — The other platform services available alongside managed message brokers.
- [Pricing and plans](billing/pricing-and-plans.md) — Understand how message broker usage is billed.
