---
title: Run evaluations
---

# Run evaluations

Once an evaluation is [configured](creating-evaluations.md), you can run it and review the results in the **Evaluation Report**. Run history is preserved so you can track quality over time and see exactly which code changes affected each run.

## Run an evaluation

In the **Test Explorer**, hover over the evaluation name and click the run icon next to it.

![Test Explorer with the run icon highlighted next to the testToolTrajectory evaluation, with the evaluation flow visible on the canvas.](/img/genai/develop/agents/evaluations/run-evaluation.png)

The evaluation iterates over every case in the selected [evalset](evalsets.md) and records the pass rate against the target threshold.

## Review the report

The **Evaluation Report** opens automatically after a run.

![Evaluation Report with summary counters, an evaluation card showing 100% observed pass rate against an 80% target, the per-case run list, and the Test Results panel below.](/img/genai/develop/agents/evaluations/evaluation-report.png)

| Section | What it shows |
|---|---|
| **Top counters** | Total tests, passed, and failed across every evaluation in the project. |
| **Evaluation card** | Per-evaluation stats: total runs, target pass rate, observed pass rate, and a Passed or Failed badge. |
| **Evaluation Runs** | The most recent run with each evalset case listed and its pass or fail status. |
| **Test Results panel** | The terminal-style log of the run, including paths to the JSON results file and the generated HTML report. |

## Track runs over time

To compare runs across days or commits, open **Evaluation History**. There are two entry points: the **Evaluation History** button at the top right of the report, and the history icon next to **evaluations** in the **Test Explorer**.

![Evaluation Report with the Evaluation History button highlighted at the top right and the history icon highlighted next to evaluations in the Test Explorer.](/img/genai/develop/agents/evaluations/open-evaluation-history.png)

Either entry point opens the **Evaluation History** view.

![Evaluation History view with summary counters, a pass-rate trend chart for testToolTrajectory, and a Run History table with status, code changes, and report links.](/img/genai/develop/agents/evaluations/evaluation-history.png)

The trend chart shows the pass rate over time. The **Run History** table lists every recorded run.

| Column | What it shows |
|---|---|
| **Date** | When the run was triggered. |
| **Pass Rate** | Observed pass rate against the target. |
| **Status** | Whether the run met the target (Passed or Failed). |
| **Code Changes** | Whether the project was committed or had local edits at the time of the run. **View changes** opens the diff against the current state. |
| **Outcomes** | Number of cases evaluated. |
| **Report** | Opens the full report for that run. |

### Inspect code changes for any run

Click **View changes** on any row to see what changed between that run and the current project state.

![Code changes since this run dialog showing a single file with a diff that adds tools to the math tutor model.](/img/genai/develop/agents/evaluations/code-changes-diff.png)

This makes it easy to correlate a regression with a specific change. **Restore to this state** rolls the project back to the state at that run, replacing the current project files. The IDE prompts for confirmation before restoring; commit or stash any work you want to keep first.

## What's next

- [Observability](../observability.md) — Trace a single failed case to see exactly what the agent did.
- [Create evalsets](evalsets.md) — Expand coverage by adding new cases.
- [Create evaluations](creating-evaluations.md) — Add new checks or LLM-as-judge scoring.
