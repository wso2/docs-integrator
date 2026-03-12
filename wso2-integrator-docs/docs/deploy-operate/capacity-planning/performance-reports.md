---
sidebar_position: 2
title: Performance Reports
description: Performance benchmark reports for common WSO2 Integrator scenarios.
---

# Performance Reports

This page presents performance benchmark results for common integration scenarios using WSO2 Integrator. Use these reports as a baseline for your own capacity planning.

## Test Environment

| Component | Specification |
|-----------|--------------|
| Machine | AWS EC2 c5.xlarge (4 vCPU, 8 GB RAM) |
| JDK | Eclipse Temurin JDK 17.0.9 |
| Ballerina | 2201.9.0 (Swan Lake Update 9) |
| OS | Ubuntu 22.04 LTS |
| Load Generator | Apache JMeter 5.6.3 running on a separate c5.2xlarge instance |
| Network | Same VPC, same availability zone |

### JVM Configuration

```bash
java -Xms512m -Xmx1024m -XX:+UseG1GC -jar integration.jar
```

## Scenario 1: HTTP Passthrough

A simple HTTP proxy that forwards requests to a backend service without transformation.

```ballerina
import ballerina/http;

configurable string backendUrl = "http://backend:8080";
final http:Client backend = check new (backendUrl);

service /api on new http:Listener(9090) {
    resource function post passthrough(http:Request req) returns http:Response|error {
        return backend->forward("/", req);
    }
}
```

### Results (1 KB Payload)

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 4,200 | 12 | 18 | 25 | 0.00% |
| 100 | 7,500 | 13 | 22 | 32 | 0.00% |
| 200 | 10,200 | 20 | 35 | 48 | 0.00% |
| 500 | 12,800 | 39 | 65 | 95 | 0.01% |
| 1000 | 13,500 | 74 | 120 | 180 | 0.05% |

### Results (10 KB Payload)

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 3,800 | 13 | 20 | 28 | 0.00% |
| 100 | 6,500 | 15 | 25 | 38 | 0.00% |
| 200 | 8,800 | 23 | 40 | 55 | 0.00% |
| 500 | 10,500 | 48 | 80 | 115 | 0.02% |

## Scenario 2: Content-Based Routing

Route requests to different backends based on payload content.

```ballerina
import ballerina/http;

final http:Client premiumBackend = check new ("http://premium-backend:8080");
final http:Client standardBackend = check new ("http://standard-backend:8080");

service /api on new http:Listener(9090) {
    resource function post route(json payload) returns json|error {
        string tier = check payload.customerTier;
        if tier == "premium" {
            return premiumBackend->post("/process", payload);
        }
        return standardBackend->post("/process", payload);
    }
}
```

### Results (1 KB Payload)

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 3,900 | 13 | 20 | 28 | 0.00% |
| 100 | 6,800 | 15 | 24 | 35 | 0.00% |
| 200 | 9,200 | 22 | 38 | 52 | 0.00% |
| 500 | 11,500 | 43 | 72 | 105 | 0.01% |

## Scenario 3: Scatter-Gather (3 Backends)

Call three backend services in parallel and aggregate the results.

```ballerina
import ballerina/http;

final http:Client inventoryClient = check new ("http://inventory:8080");
final http:Client pricingClient = check new ("http://pricing:8080");
final http:Client reviewsClient = check new ("http://reviews:8080");

service /api on new http:Listener(9090) {
    resource function get product/[string id]() returns json|error {
        fork {
            worker inventory returns json|error {
                return inventoryClient->get("/stock/" + id);
            }
            worker pricing returns json|error {
                return pricingClient->get("/price/" + id);
            }
            worker reviews returns json|error {
                return reviewsClient->get("/reviews/" + id);
            }
        }
        record {json|error inventory; json|error pricing; json|error reviews;} results = wait {inventory, pricing, reviews};

        return {
            stock: check results.inventory,
            price: check results.pricing,
            reviews: check results.reviews
        };
    }
}
```

### Results

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 2,800 | 18 | 28 | 40 | 0.00% |
| 100 | 4,500 | 22 | 35 | 50 | 0.00% |
| 200 | 6,200 | 32 | 55 | 78 | 0.01% |
| 500 | 7,800 | 64 | 105 | 150 | 0.03% |

## Scenario 4: JSON-to-JSON Transformation

Transform a JSON payload with data mapping.

### Results (5 KB Payload, 20 Fields Mapped)

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 5,500 | 9 | 14 | 20 | 0.00% |
| 100 | 9,200 | 11 | 17 | 24 | 0.00% |
| 200 | 12,500 | 16 | 28 | 40 | 0.00% |
| 500 | 14,800 | 34 | 58 | 85 | 0.01% |

## Scenario 5: Database CRUD

HTTP service with PostgreSQL database reads and writes.

### Results (Single Row Read)

| Concurrent Users | Throughput (RPS) | Avg Latency (ms) | p95 Latency (ms) | p99 Latency (ms) | Error Rate |
|-----------------|-----------------|-------------------|-------------------|-------------------|------------|
| 50 | 3,200 | 16 | 25 | 35 | 0.00% |
| 100 | 5,400 | 18 | 30 | 42 | 0.00% |
| 200 | 7,000 | 28 | 48 | 68 | 0.00% |
| 500 | 8,200 | 61 | 100 | 145 | 0.02% |

## GraalVM Native Image Comparison

Comparing JVM vs. GraalVM native image for the HTTP Passthrough scenario (100 concurrent users):

| Metric | JVM | GraalVM Native |
|--------|-----|----------------|
| Startup Time | 2.1s | 0.045s |
| Memory (RSS) | 280 MB | 65 MB |
| Throughput (RPS) | 7,500 | 6,800 |
| p95 Latency | 22 ms | 25 ms |
| p99 Latency | 32 ms | 38 ms |

GraalVM native images trade a small amount of peak throughput for dramatically lower startup time and memory usage.

## Methodology

All benchmarks follow this methodology:

1. **Warmup**: 60-second warmup period before measurement.
2. **Duration**: 5-minute sustained load per data point.
3. **Backend simulation**: Backend services respond in 5ms with a static JSON payload.
4. **Measurement**: Metrics collected from JMeter and JVM (via JMX).
5. **Repetition**: Each test repeated 3 times; median values reported.

## What's Next

- [Capacity Planning](index.md) -- Use these results for sizing your deployments
- [Scaling & High Availability](../deploy/scaling-ha.md) -- Scale based on throughput requirements
- [GraalVM Native Images](../deploy/graalvm.md) -- Build native images for lower resource usage
