---
title: Observe
---

# Observe

Observability is how you understand an integration's runtime behavior, using logs, metrics, and alerts.

Two distinct activities sit under this heading, and it is worth keeping them apart:

- **Monitoring** answers *"is it behaving as expected?"* It watches known indicators and alerts when they fall outside expected ranges. Useful for problems you anticipated.
- **Diagnosis** answers *"why is it behaving this way?"* It uses logs and metrics to explain what is actually happening. Useful for problems you did not anticipate.

WSO2 Cloud - Integration Platform provides a built-in observability dashboard, so there's nothing to set up.

<PaletteCard icon="logging" href="/observe/runtime-logs">
  <h3 class="palette-card-title">Runtime Logs</h3>
  <ul class="palette-card-list">
    <li>Search runtime log output</li>
    <li>Filter and analyze</li>
  </ul>

<PaletteCard icon="metrics" href="/observe/metrics">
  <h3 class="palette-card-title">Metrics</h3>
  <ul class="palette-card-list">
    <li>Request throughput and latency</li>
    <li>Resource usage over time</li>
  </ul>

<PaletteCard icon="event" href="/observe/anomaly-detection-alerts">
  <h3 class="palette-card-title">Anomaly Detection and Alerts</h3>
  <ul class="palette-card-list">
    <li>Configure alerts on defined thresholds</li>
    <li>Get notified when metrics fall outside range</li>
  </ul>
