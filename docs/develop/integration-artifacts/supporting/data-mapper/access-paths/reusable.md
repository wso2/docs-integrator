---
title: Reusable data mapper
---

# Reusable data mapper

Create a reusable data mapper from the **Artifacts** page or the left sidebar. Configure the inputs and the output type, then open the data mapper view.

1. Open the **Artifacts** page and select **Data Mapper** under **Other Artifacts**, or select **+** next to **Data Mappers** in the left sidebar.

   ![Artifacts page with the Data Mapper option highlighted under Other Artifacts](/img/develop/integration-artifacts/supporting/data-mapper/reusable-datamapper-selection.png)

2. Fill in the **Create New Data Mapper** form.

   ![Create New Data Mapper form with Name, Public, Inputs, and Output fields](/img/develop/integration-artifacts/supporting/data-mapper/reusable-datamapper-form.png)

   | Field | Description |
   |---|---|
   | **Data Mapper Name** | A unique name for the mapping function (for example, `transform`). |
   | **Public** | Select **Make visible across the project** to use this mapper from other integrations. |
   | **Inputs** | Select **+ Add Input** to define one or more source variables. Each input has a name and a type. |
   | **Output** | The target type that the mapper produces. |

3. Select **Create**. The data mapper canvas opens with input fields on the left and output fields on the right.

   ![Data mapper canvas with input record on the left and output record on the right](/img/develop/integration-artifacts/supporting/data-mapper/datamapper-view.png)

## What's next

- [Inline data mapper](./inline.md) — Open the data mapper from a **Declare Variable** or **Update Variable** node.
- [Mapping capabilities](../mapping-capabilities.md) — Connect fields, write expressions, and use AI-assisted mapping.
- [Array mappings](../array-mappings/array-mappings.md) — Map between arrays using iteration, joins, and aggregation.
