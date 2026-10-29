---
title: Run Evaluations
---

# Run Evaluations

Once an evaluation is configured from a [template](create-evaluations-templates.md) or as a [custom evaluation](create-evaluations-custom.md), you can run it and review the results in the **Evaluation Report**. Run history is preserved so you can track quality over time and see exactly which code changes affected each run.

## Run an evaluation

In the **Test Explorer**, hover over the evaluation name and click the run icon next to it.

<ThemedImage
    alt="Test Explorer with the run icon highlighted next to the evaluateWeatherAgentToolTrajectory evaluation, with the evaluation flow visible on the canvas."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/run-evaluation-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/run-evaluation-v1.0.png'),
    }}
/>

You can also run evaluations from your agent. Open the agent, click **Evaluations**, and click the run icon next to an evaluation, or **Run All** to run every evaluation of that agent. The evaluation shows **Running** until the run finishes.

<ThemedImage
    alt="Evaluations dialog of weatherAgent with Run All and the run icon next to evaluateWeatherAgentToolTrajectory highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/run-from-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/run-from-agent-v1.0.png'),
    }}
/>

The evaluation iterates over every case in the selected [evalset](evalsets.md) and records the pass rate against the target threshold.

## Review the report

The **Evaluation Report** opens automatically after a run.

<ThemedImage
    alt="Evaluation Report with summary counters, an evaluation card showing a 100% pass rate against a 90% minimum pass rate, the per-case run list, and the Test Results panel below."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/evaluation-report-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/evaluation-report-v1.0.png'),
    }}
/>

| Section | What it shows |
|---|---|
| **Top counters** | Total tests, passed, and failed across every evaluation in the project. |
| **Evaluation card** | Per-evaluation stats: total runs, pass rate, minimum pass rate, and a Passed or Failed badge. |
| **Evaluation Runs** | The most recent run with each evalset case listed and its pass or fail status. |
| **Test Results panel** | The terminal-style log of the run, including paths to the JSON results file and the generated HTML report. |

## Fix a failing evaluation with Copilot

When an evaluation fails, its card in the **Evaluation Report** shows **Fix with Copilot** next to the pass rate. **Evaluation History** shows the same button while the evaluation's latest run is failing.

<ThemedImage
    alt="Evaluation Report for a failed run of evaluateWeatherAgentToolTrajectory with a 60% pass rate against 90%, and Fix with Copilot highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/fix-with-copilot-report-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/fix-with-copilot-report-v1.0.png'),
    }}
/>

Click **Fix with Copilot**. WSO2 Agent Builder Copilot opens a chat for that evaluation with its failed cases already attached. Copilot replays the failing turns with your agent and tells you why the evaluation fails, for example a missing tool or unclear instructions in the agent, or an expected result that asks for more than the agent's instructions require. Copilot makes small fixes itself and asks you before larger ones. It does not lower the minimum pass rate or remove cases to hide a mistake unless you agree. Run the evaluation again to confirm the fix, or ask Copilot to run it. Review the changes in the **Changes made** card, and click **Revert** if you don't want to keep them.

To replay the failing turns, Copilot runs your agent with its model and its real tools, once per turn. Make sure the agent's model provider is configured, and keep in mind that the tools really run.

<ThemedImage
    alt="Copilot beside the failed Evaluation Report, explaining the root cause, the fix it made to the agent, and the passing rerun, with a Changes made card."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/fix-with-copilot-chat-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/fix-with-copilot-chat-v1.0.png'),
    }}
/>

## Track runs over time

To compare runs across days or commits, open **Evaluation History**. There are two entry points: the **Evaluation History** button at the top right of the report, and the history icon next to **evaluations** in the **Test Explorer**.

<ThemedImage
    alt="Evaluation Report with the Evaluation History button highlighted at the top right and the history icon highlighted next to evaluations in the Test Explorer."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/open-evaluation-history-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/open-evaluation-history-v1.0.png'),
    }}
/>

Either entry point opens the **Evaluation History** view. You can also open it from your agent: click **Evaluations**, and then click **View History** to open the history filtered to that agent.

<ThemedImage
    alt="Evaluation History view with search and filters, summary counters, a pass-rate trend chart for evaluateWeatherAgentToolTrajectory, and a Run history table with status, code changes, and report actions."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/evaluation-history-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/evaluation-history-v1.0.png'),
    }}
/>

Use the search box to find evaluations by name, query, thread, or failure message. Use the filters to narrow the list by status, agent, and date range, and the sort menu to order it by latest run, lowest pass rate, most failed runs, or name.

The trend chart shows the pass rate over time. The **Run History** table lists every recorded run.

| Column | What it shows |
|---|---|
| **Date** | When the run was triggered. |
| **Pass Rate** | Observed pass rate against the target. |
| **Status** | Whether the run met the target (Passed or Failed). |
| **Code Changes** | Whether the project was committed or had local edits at the time of the run. **View changes** opens the diff against the current state. |
| **Outcomes** | Number of cases evaluated. |
| **Actions** | **Open report** opens the full report for that run. The delete icon removes the run from the history. |

### Inspect code changes for any run

Click **View changes** on any row to see what changed between that run and the current project state.

<ThemedImage
    alt="Code changes since this run dialog showing main.bal with a diff that changes the weather agent's instructions, and Restore to this state highlighted."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/evaluations/code-changes-diff-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/evaluations/code-changes-diff-v1.0.png'),
    }}
/>

This makes it easy to correlate a regression with a specific change. **Restore to this state** rolls the project back to the state at that run, replacing the current project files. The editor prompts for confirmation before restoring; commit or stash any work you want to keep first.

## What's next

- [Observability](../observability.md) — Trace a single failed case to see exactly what the agent did.
- [Create evalsets](evalsets.md) — Expand coverage by adding new cases.
- [Create evaluations from templates](create-evaluations-templates.md) — Add new checks or LLM-as-judge scoring from a template.
- [Create custom evaluations](create-evaluations-custom.md) — Build your own checks in the visual designer.
