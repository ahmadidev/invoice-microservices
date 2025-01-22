# Invoice Service

This project implements an Invoice Service that generates a daily sales summary report. The service reads invoices from a MongoDB database, calculates total sales and quantities sold per item, and publishes the summary report to a RabbitMQ queue.

## Project Structure

- `src/cron/dailySalesSummary.ts`: Implements the cron job that runs daily at 12:00 PM to generate the sales summary.
- `src/services/invoiceService.ts`: Contains the `InvoiceService` class for interacting with invoice data.
- `src/rabbitmq/publisher.ts`: Publishes the daily sales summary report to the RabbitMQ queue.
- `src/models/invoice.ts`: Defines the structure of an invoice document in MongoDB.
- `src/index.ts`: Entry point of the application, sets up the cron job and initializes services.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd invoice-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB and RabbitMQ connections in the environment variables or configuration files.

4. Run the application:
   ```
   npm start
   ```

## Usage

The service will automatically run the cron job every day at 12:00 PM, generating and publishing the daily sales summary report to the `daily_sales_report` queue in RabbitMQ.

## License

This project is licensed under the MIT License.