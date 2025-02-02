# Invoice Service

## TL;DR
```
docker compose up --build
```

#### Note on `report_generator` service
Due to the possibility of the invoice service crashing or the need to scale it as demanded, we decided to extract the `CronJob` role into this separate service.


## Project Overview

The Invoice Service is a microservice-based application designed to manage invoices. It is built using NestJS, MongoDB for data storage, and RabbitMQ for emitting daily sales reports via email. The project is containerized using Docker and orchestrated using Docker Compose.

#### Microservices
The project consists of the following microservices:

1. **Invoice Service**: REST API to manage invoices.
   - **Depends on**: MongoDB

2. **Report Generator**: Generates daily sales reports and pushes them to RabbitMQ.
   - **Depends on**: MongoDB, RabbitMQ

3. **Email Sender**: Subscribes to the `daily_sales_report` queue and sends emails.
   - **Depends on**: RabbitMQ, Email Provider

4. **MongoDB**: Storage for invoices.

5. **RabbitMQ**: Hosts the `daily_sales_report` queue.


## Development
### REST Api sample requests
Please refer to [requests.http](requests.http) to see possible API requests.


### Docker Commands for Development
Running commands locally is an option, but using Docker ensures consistency.

#### Running tests and installing packages
```
# cd to project root then run:
docker run -it --mount type=bind,src=./invoice-service,dst=/app node:23 bash

# Ensure you are inside the /app directory before running these commands:
cd /app

# To run all tests
npm test

# To run unit tests only
npm run test:unit

# To run integration tests only
npm run test:integration

# To install a specific package
npm install [package]
```

#### Operate on MongoDB
```
# To inspect inserted invoices
docker compose exec -it mongo mongosh
use invoice
db.invoices.find()
```

#### Operate on RabbitMQ
```
docker compose exec -it rabbitmq bash
# list active queues
rabbitmqctl list_queues

# list messages in a specific queue
rabbitmqadmin get queue=daily_sales_report
```

### Testing email-sender service's CronJobs
Because CronJobs run once a day, to test salesReportCron, uncomment `@Interval` and comment [`@Cron`](./report-generator/src/crons/crons.service.ts#16).

## Production Considerations

### **🔒 Security**
- **Authentication & Authorization**: Implement authentication and authorization for the Invoice Service.
- **MongoDB & RabbitMQ Authentication**: Enable authentication for MongoDB and RabbitMQ to prevent unauthorized access.
- **Input Validation**: Ensure strict validation for API inputs to prevent injection attacks and data corruption.

### **⚡ Scalability & Performance**
- **Helm Charts**: Create Helm charts for each service to simplify Kubernetes deployments.
- **CI/CD Pipelines**: Automate build, test, and deployment processes for faster iteration.
- **Load & Stress Testing**: Perform load and stress tests to ensure the system can handle expected traffic.
- **Optimize Dockerfiles**: Use multi-stage builds and prebuilt NestJS applications (`npm build`, `npm start:prod`) to improve container efficiency.

### **📊 Monitoring & Reliability**
- **Observability Tools**: Use Prometheus and Loki for monitoring resource usage, logs, and service health.
- **Message Acknowledgment**: Implement manual acknowledgment for RabbitMQ messages to prevent data loss.
- **Crash Recovery**: Ensure services restart automatically after crashes and handle failures gracefully.
