---
sidebar_position: 0
title: Observe
description: Monitor and diagnose your integrations in production using Choreo Cloud's built-in runtime log dashboard and distributed tracing.
keywords: [choreo integrator, choreo cloud, observability, logs, traces, monitoring]
slug: /observe
hide_table_of_contents: true
wide_layout: true
---

# Observe

Observability is how you understand what an integration is actually doing in production, using its runtime logs and traces.

Runtime logs answer *"why is it behaving this way?"* They explain what is happening inside a deployed integration, which is what you need for problems you did not anticipate. Traces answer *"where did the time go?"* by showing the path a request took and how long each step took.

Choreo Integration provides a built-in observability dashboard, so there's nothing to set up.

<PaletteGrid>

<PaletteCard icon="logging" href="/observe/runtime-logs">
  <h3 class="palette-card-title">Runtime Logs</h3>
  <ul class="palette-card-list">
    <li>Search runtime log output</li>
    <li>Filter and analyze</li>
  </ul>
</PaletteCard>

<PaletteCard icon="metrics" href="/observe/traces">
  <h3 class="palette-card-title">Traces</h3>
  <ul class="palette-card-list">
    <li>Follow a request across spans</li>
    <li>Inspect span attributes</li>
  </ul>
</PaletteCard>

</PaletteGrid>
