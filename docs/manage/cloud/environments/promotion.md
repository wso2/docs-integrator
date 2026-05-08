---
title: Promote an integration
---

# Promote an integration

Promoting an integration moves it from one environment to the next in your pipeline, for example from Development to Production. Each promotion lets you supply environment-specific configuration values so the integration runs correctly in the target environment.

## Promote to the next environment

1. Open your integration from the project home.
2. On the integration overview page, locate the environment card you want to promote from.
3. Click **Promote** below that environment card.
4. If this is the first time you are promoting to the target environment, choose how to handle runtime configurations:

    | Option | When to use |
    |---|---|
    | **Use development configurations** | The target environment can share the same configuration values as the source environment. |
    | **Choose new configurations** | The target environment requires different values, such as a different database URL or credentials. |

5. Click **Next**.
6. If you selected **Choose new configurations**, enter the values for the target environment.
7. Click **Promote**.

The integration is deployed to the target environment. Once the deployment completes, the target environment card becomes active and displays the endpoint URLs for that environment.

After the first promotion, subsequent promotions to the same environment use the configuration values already set for that environment. You can update them at any time from the **Configure** button on the environment card.

## What's next

- [Promotion approvals](./promotion-approval.md) — Require approvals before an integration is promoted to a protected environment.
- [Runtime configurations](../configurations/runtime-configurations.md) — Update configuration values for a specific environment after promotion.
