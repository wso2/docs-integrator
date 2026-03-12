---
sidebar_position: 1
title: Capacity Planning
description: Capacity planning overview and sizing guidelines for WSO2 Integrator deployments.
---

# Capacity Planning

Proper capacity planning ensures your Ballerina integrations have sufficient resources to handle expected workloads while maintaining performance SLAs. This page provides sizing guidelines, resource estimation methods, and scaling recommendations.

## Key Metrics for Sizing

| Metric | Description | How to Measure |
|--------|-------------|----------------|
| Requests per second (RPS) | Expected peak throughput | Load testing with `bal test` or tools like k6, JMeter |
| Response latency (p95) | Target 95th percentile response time | Performance testing under load |
| Concurrent connections | Maximum simultaneous client connections | Connection pool configuration |
| Message size | Average request/response payload size | Log analysis or API analytics |
| Integration complexity | Number of downstream calls per request | Code analysis |

## Resource Estimation

### CPU

| Workload | vCPUs per Instance | Notes |
|----------|--------------------|-------|
| Simple passthrough (< 2 downstream calls) | 0.25 - 0.5 | Mostly I/O bound |
| Moderate transformation (2-5 downstream calls) | 0.5 - 1.0 | Some CPU for data mapping |
| Complex orchestration (5+ calls, heavy transformation) | 1.0 - 2.0 | CPU-intensive processing |
| AI/ML inference integration | 2.0 - 4.0 | Depends on model complexity |

### Memory

| Workload | Memory per Instance | Notes |
|----------|-------------------|-------|
| Lightweight service (JVM) | 256 - 512 MB | Minimal heap usage |
| Standard service (JVM) | 512 MB - 1 GB | Typical integration workload |
| High-throughput service (JVM) | 1 - 2 GB | Large payloads, many connections |
| GraalVM native image | 64 - 256 MB | Significantly lower footprint |

### Instance Count

Estimate the number of instances based on throughput requirements:

```
instances = ceil(peak_RPS / RPS_per_instance) + buffer_instances
```

**Example**: If each instance handles 500 RPS and your peak is 2000 RPS:

```
instances = ceil(2000 / 500) + 1 = 5 instances
```

Always add at least one buffer instance for rolling updates and failover.

## Sizing by Deployment Target

### Kubernetes

```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

Configure Horizontal Pod Autoscaler (HPA):

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### Virtual Machines

| Deployment Size | VM Spec | Instances | Handles |
|----------------|---------|-----------|---------|
| Small | 2 vCPU, 4 GB RAM | 2 | Up to 500 RPS |
| Medium | 4 vCPU, 8 GB RAM | 3-4 | Up to 2000 RPS |
| Large | 8 vCPU, 16 GB RAM | 4-8 | Up to 10,000 RPS |

### Serverless (AWS Lambda)

| Setting | Recommendation |
|---------|---------------|
| Memory | 512 MB - 1 GB (JVM), 256 MB (GraalVM native) |
| Timeout | 30 seconds (default), adjust per use case |
| Provisioned Concurrency | Set to expected minimum concurrent executions |
| Reserved Concurrency | Set to protect downstream systems |

## Connection Pool Sizing

### Database Connection Pools

```ballerina
final mysql:Client dbClient = check new ({
    host: "db.example.com",
    port: 3306,
    user: "svc_user",
    password: "password",
    database: "orders",
    connectionPool: {
        maxOpenConnections: 25,
        maxConnectionLifeTime: 1800,
        minIdleConnections: 5
    }
});
```

**Rule of thumb**: `maxOpenConnections = (number_of_instances * connections_per_instance) <= database_max_connections`

### HTTP Client Connection Pools

```ballerina
final http:Client apiClient = check new ("https://api.example.com", {
    httpVersion: http:HTTP_1_1,
    poolConfig: {
        maxActiveConnections: 50,
        maxIdleConnections: 10,
        waitTime: 30
    },
    timeout: 30
});
```

## Load Testing

Validate your capacity plan with load testing before going to production:

```bash
# Using k6
k6 run --vus 100 --duration 5m load-test.js

# Using Apache Bench
ab -n 10000 -c 100 http://localhost:9090/api/orders
```

### Key Results to Collect

| Metric | Target |
|--------|--------|
| Throughput (RPS) | Meets or exceeds peak estimate |
| p95 Latency | Under SLA threshold |
| Error Rate | Under 0.1% |
| CPU Utilization | Under 70% at peak |
| Memory Utilization | Under 80% at peak |

## Scaling Strategies

| Strategy | When to Use |
|----------|-------------|
| Vertical scaling | Single-instance workloads, quick fix |
| Horizontal scaling | Stateless services, high availability |
| Auto-scaling (HPA) | Variable traffic patterns |
| Event-driven scaling (KEDA) | Queue/event-driven workloads |

## What's Next

- [Performance Reports](performance-reports.md) -- Benchmark results per scenario
- [Scaling & High Availability](../deploy/scaling-ha.md) -- Configure horizontal scaling
- [GraalVM Native Images](../deploy/graalvm.md) -- Reduce resource requirements with native compilation
