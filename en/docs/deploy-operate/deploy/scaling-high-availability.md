---
sidebar_position: 6
title: Scaling & High Availability
description: Scale integrations horizontally and ensure high availability.
---

# Scaling & High Availability

Design and configure your WSO2 Integrator deployments for horizontal scaling, high availability, and resilience in production environments.

## Stateless design principles

Ballerina services in WSO2 Integrator are designed to be stateless, making them straightforward to scale horizontally. Follow these principles to ensure your integrations scale correctly:

- **Avoid in-memory state** -- Do not store session or request state in module-level variables. Use external stores (databases, Redis, or distributed caches) for shared state.
- **Externalize configuration** -- Use `Config.toml` and environment variables rather than hardcoded values.
- **Idempotent operations** -- Design resource functions to produce the same result when called multiple times, allowing safe retries behind a load balancer.

```ballerina
import ballerina/http;
import ballerina/cache;

// Use an external cache or database for shared state
configurable string redisHost = "localhost";
configurable int redisPort = 6379;

service /orders on new http:Listener(9090) {
    // Each request is self-contained -- no in-memory session state
    resource function get [string orderId]() returns json|error {
        // Fetch from external data store
        json order = check getOrderFromDatabase(orderId);
        return order;
    }
}
```

## Horizontal scaling configuration

### Cloud.toml auto-scaling

Configure auto-scaling directly in your project's `Cloud.toml`:

```toml
# Cloud.toml
[cloud.deployment.autoscaling]
min_replicas = 2
max_replicas = 10
cpu_threshold = 70
memory_threshold = 80
```

When deploying to Kubernetes, the `bal build --cloud=k8s` command uses these settings to generate HorizontalPodAutoscaler resources automatically. For manual scaling configuration, refer to the [Kubernetes HorizontalPodAutoscaler documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

## Load balancing

When multiple instances of your integration run behind a load balancer, ensure your services are stateless and idempotent. Ballerina HTTP services work seamlessly with standard load balancers (Kubernetes Service, NGINX, HAProxy, cloud load balancers).

For Kubernetes deployments, use a Service resource for internal load balancing and an Ingress for external traffic. Refer to the [Kubernetes Service documentation](https://kubernetes.io/docs/concepts/services-networking/service/) and [Ingress documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/) for configuration details.

## Health checks

Expose health check endpoints in your Ballerina services to enable load balancers and orchestrators to monitor instance health.

### Health endpoints

```ballerina
import ballerina/http;

service /orders on new http:Listener(9090) {

    // Health check endpoint for Kubernetes probes
    resource function get healthz() returns http:Ok {
        return http:OK;
    }

    // Readiness check -- verify external dependencies
    resource function get readyz() returns http:Ok|http:ServiceUnavailable {
        boolean dbHealthy = checkDatabaseConnection();
        if dbHealthy {
            return http:OK;
        }
        return http:SERVICE_UNAVAILABLE;
    }
}
```

Configure your orchestrator to call these endpoints for health monitoring. For Kubernetes, use liveness, readiness, and startup probes. Refer to the [Kubernetes Probes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) for configuration details.

## High availability strategies

### Multi-zone deployment

Deploy integration instances across multiple availability zones or data centers to survive zone failures. In Kubernetes, use topology spread constraints to distribute pods across zones. In cloud environments, use availability zone configuration in your load balancer or auto-scaling groups.

### Minimum instance count

Maintain at least 2 replicas in production to ensure availability during deployments and instance failures. For critical integrations, consider running 3+ replicas across multiple zones.

When using Kubernetes, configure PodDisruptionBudgets to prevent voluntary disruptions from taking down too many instances simultaneously during maintenance operations. Refer to the [Kubernetes PodDisruptionBudget documentation](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) for details.

## Graceful shutdown

Ballerina services handle graceful shutdown automatically. When a `SIGTERM` signal is received, the runtime:

1. Stops accepting new requests
2. Waits for in-flight requests to complete
3. Shuts down cleanly

Ensure your orchestrator allows sufficient time for graceful shutdown. In Kubernetes, set `terminationGracePeriodSeconds` to at least 60 seconds and use a `preStop` hook with a short delay to allow load balancers to deregister the instance before shutdown begins. Refer to the [Kubernetes Pod Lifecycle documentation](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination) for configuration details.

## What's next

- [Metrics](../observe/metrics-prometheus-grafana.md) -- Monitor scaling behavior with Prometheus
