---
title: Evaluate Agent Behavior
---

# Evaluations

**Evaluations** are how you keep an AI agent's quality from regressing. Unlike unit tests with deterministic outputs, agent behaviour has to be judged across several dimensions: correctness, tool selection, groundedness, safety, and tone. Evaluations in WSO2 Agent Builder give you a structured way to measure those dimensions, see why a run regressed, and watch the trend across builds.

The feature is built around three stages.

| Stage | What it is | Page |
|---|---|---|
| **Evalsets** | A golden dataset of conversation traces, captured from real chats with your agent and refined in the **Evalset Viewer**. | [Create evalsets](evalsets.md) |
| **Evaluations** | Evaluation functions that score agent behaviour, created from a prebuilt template or built in the visual designer, with or without an evalset. | [Templates](create-evaluations-templates.md), [Custom](create-evaluations-custom.md) |
| **Runs and reports** | Run an evaluation on the current agent build and review the **Evaluation Report** and the **Evaluation History** trend across runs. | [Run evaluations](running-evaluations.md) |

## How the stages fit together

1. Chat with your agent and export the session traces into an **evalset**. Use the editor to edit messages, reorder or add turns, and update tool calls.
2. Create an **evaluation** from the **Evaluations** button on your agent, or from the **Test Explorer**. Start from a prebuilt template for common checks such as tool trajectory or LLM-as-judge scoring, or build custom checks in the visual designer. Pick the evalset to score against and set the minimum pass rate.
3. **Run** the evaluation. The report shows pass or fail per case, and the **Evaluation History** view tracks pass rate across runs so you can correlate regressions with the changes that caused them.

## Get help from Copilot

WSO2 Agent Builder Copilot can do much of this work for you:

- **Write an evalset**: In the evaluation form, select **Generate with Copilot** next to **Create Empty Evalset**. It appears when you have no evalset yet, or after you pick one. Copilot writes an evalset for your agent in a new chat, and the form selects it once it is ready.
- **Write test queries**: For templates that take queries instead of an evalset, select **Generate Queries** and Copilot suggests queries for your agent.
- **Fix a failing evaluation**: In the **Evaluation Report** or **Evaluation History**, select **Fix with Copilot** on a failed evaluation. Copilot replays the failing turns with your agent, tells you why the evaluation failed, and makes a small fix. It asks you before a larger change and before running the evaluation again.

You can also ask Copilot in the chat to add evaluations for your agent.

## When to use evaluations

| Use evaluations when... | Look elsewhere when... |
|---|---|
| You're about to change instructions, tools, or the model and want a regression check. | You need a single deterministic unit test for a pure function. |
| You want a baseline of agent quality you can track across runs and commits. | You're debugging one specific failed run. Use [Observability](../observability.md). |
| You need to verify safety and refusal behaviour before shipping. | You're still prototyping and haven't picked the agent's tools yet. |

## What's next

- [Create evalsets](evalsets.md) — Capture real chats and curate them into a golden dataset.
- [Create evaluations from templates](create-evaluations-templates.md) — Configure a prebuilt evaluation template in a form.
- [Create custom evaluations](create-evaluations-custom.md) — Build your own checks in the visual designer.
- [Run evaluations](running-evaluations.md) — Execute runs and review the report and history.
