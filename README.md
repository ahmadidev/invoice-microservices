# Invoice Service

## TL;DR
```
docker compose up --build
```

## Project Overview

The Invoice Service is a microservice-based application designed to manage invoices. It is built using NestJS, and MongoDB as the database, and RabbitMQ to emit daily sale reports to be sent by Email. The project is containerized using Docker and orchestrated using Docker Compose.

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


#### Note on `report_generator` service
Due to the possibility of the invoice service crashing or the need to scale it as demanded, we decided to extract the `CronJob` role into this separate service.


## Development
### Docker Commands for Development
To keep consistency, it's prefered to run commands inside docker containers.

#### Running tests and installing packages
```
# cd to project root then run:
docker run -it --mount type=bind,src=./invoice-service,dst=/app node:23 bash
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
docker compose exec -it mongo mongosh
use invoice
db.invoices.find()
```

#### Operate on RabbitMQ
```
docker compose exec -it rabbitmq bash
rabbitmqctl list_queues
rabbitmqadmin get queue=daily_sales_report
```

### Reason behind bind-mounting node_modules folders
To speed up development and prevent downloading node modules each time the services run, we mounted local `node_modules` folder to the container.


### Testing email-sender service's CronJobs
Because CronJobs run once a day, to test salesReportCron, uncomment `@Interval` and comment [`@Cron`](./report-generator/src/crons/crons.service.ts#16).


## Production Considerations

- **Helm Charts**: Create Helm charts for each service to streamline deployment to Kubernetes infrastructure.
- **CI/CD Pipelines**: Leverage CI/CD pipelines to build, test, and deploy for rapid value delivery to customers.
- **Authentication and Authorization**: Set up authentication and authorization for the invoice service.
- **Input Validation**: Ensure input validation for the Invoice REST API.
- **MongoDB Authentication**: Enable authentication for MongoDB.
- **RabbitMQ Authentication**: Enable authentication for RabbitMQ.