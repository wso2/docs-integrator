## Manage and Observe

The concepts that apply once an integration is live and handling real traffic. These are covered in depth in [Manage](../../manage/manage.md) and [Observe](../../observe/observe.md).

### Integration Control Plane (ICP)

The Integration Control Plane (ICP) is the self-hosted control plane: a centralized server that handles deployment, management, and observability for self-hosted Choreo Integrator deployments, filling the role Choreo Cloud's SaaS control plane plays for cloud deployments (see [Control plane and data plane](#control-plane-and-data-plane)). It provides a web dashboard and APIs for real-time visibility into running integrations.

Alongside its deployment and operational controls, ICP surfaces health information, metrics, and aggregated logs, giving self-hosted teams a single place where centralized management and a first layer of observability data come together.

For deployments on Choreo Cloud, equivalent capabilities across all three actions are provided as part of the managed cloud experience.

### Observability

Observability is how you understand an integration's runtime behavior, using logs, metrics, and distributed traces.

With a single integration, reviewing a log file may be sufficient. As the number of integrations in production grows, this becomes impractical: failures can appear disconnected from their actual cause when information is spread across many systems.

Two distinct activities sit under this heading, and it is worth keeping them apart:

- **Monitoring** answers *"is it behaving as expected?"* It watches known indicators and alerts when they fall outside expected ranges. Useful for problems you anticipated.
- **Diagnosis** answers *"why is it behaving this way?"* It uses logs, metrics, and distributed traces to explain what is actually happening inside a distributed system. Useful for problems you did not anticipate.

Choreo Integration emits telemetry through OpenTelemetry and integrates with established observability stacks rather than requiring a separate one, including Prometheus and Grafana for metrics, Jaeger and Zipkin for distributed tracing, Elastic Stack (ELK), OpenSearch, and Grafana Loki for logging, and Datadog, New Relic, and Moesif as full-stack platforms.
