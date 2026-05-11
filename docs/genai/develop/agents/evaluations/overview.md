---
title: Evaluations
---

# Evaluations

**Evaluations** are how you keep an AI agent's quality from regressing. Unlike unit tests with deterministic outputs, agent behaviour has to be judged across several dimensions: correctness, tool selection, groundedness, safety, and tone. Evaluations in WSO2 Integrator give you a structured way to measure those dimensions, see why a run regressed, and watch the trend across builds.

The feature is built around three stages.

| Stage | What it is | Page |
|---|---|---|
| **Evalsets** | A golden dataset of conversation traces, captured from real chats with your agent and refined in the **Evalset Viewer**. | [Create evalsets](evalsets.md) |
| **Evaluations** | Evaluation functions, configured in a form and assembled in the visual designer, that score agent behaviour against an evalset (or run standalone logic). | [Create evaluations](creating-evaluations.md) |
| **Runs and reports** | Run an evaluation on the current agent build and review the **Evaluation Report** and the **Evaluation History** trend across runs. | [Run evaluations](running-evaluations.md) |

## How the stages fit together

1. Chat with your agent and export the session traces into an **evalset**. Use the editor to edit messages, reorder or add turns, and update tool calls.
2. Create an **evaluation** from the **Test Explorer**. Pick the evalset to score against, set the target pass rate, then build the checks in the visual designer (including LLM-as-judge if you need subjective scoring).
3. **Run** the evaluation. The report shows pass or fail per case, and the **Evaluation History** view tracks pass rate across runs so you can correlate regressions with the changes that caused them.

## When to use evaluations

| Use evaluations when... | Look elsewhere when... |
|---|---|
| You're about to change instructions, tools, or the model and want a regression check. | You need a single deterministic unit test for a pure function. |
| You want a baseline of agent quality you can track across runs and commits. | You're debugging one specific failed run. Use [Observability](../observability.md). |
| You need to verify safety and refusal behaviour before shipping. | You're still prototyping and haven't picked the agent's tools yet. |

## What's next

- [Create evalsets](evalsets.md) — Capture real chats and curate them into a golden dataset.
- [Create evaluations](creating-evaluations.md) — Configure scoring and build the checks in the visual designer.
- [Run evaluations](running-evaluations.md) — Execute runs and review the report and history.
