---
title: Troubleshoot Your Integration
---

# Troubleshoot Your Integration

When something isn't behaving, start with the cheapest tool that could answer the question and escalate only if it doesn't. The four pages in this section are ordered the way you'd actually reach for them.

| Symptom | Reach for | What it tells you |
|---|---|---|
| You want a persistent record of what happened, across runs or in a deployed environment | **[Logging](logging.md)** | Structured, timestamped output you add to your own code ahead of time |
| The integration failed outright: a compile error, a runtime error, or a panic | **[Errors and Stack Traces](errors-and-stack-traces.md)** | How to read the diagnostic and trace it back to the failing line |
| It's stuck or unresponsive, not erroring | **[Strand Dump Analysis](strand-dump-analysis.md)** | A point-in-time snapshot of every strand, to spot deadlocks and blocked calls |
| It runs to completion but too slowly | **[Profiling](profiling.md)** | A flame graph of where execution time actually goes |

If logs and error output don't explain the problem, step through the code interactively instead: see [Debug Your Integration](../debugging/debugging.md).

## What's next

- [Debug Your Integration](../debugging/debugging.md) — set breakpoints and inspect state interactively
- [Test Your Integration](../test/test.md) — catch issues before they reach this stage
- [Troubleshoot Deployment](deployment.md) — issues that only appear once the integration ships
