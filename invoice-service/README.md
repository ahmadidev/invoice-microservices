# Invoice Creation Service

This project is a NestJS application that provides a RESTful API for managing invoices. It allows users to create, retrieve, and filter invoices stored in a MongoDB database.

## Features

- Create a new invoice
- Retrieve a specific invoice by ID
- Retrieve a list of all invoices with optional filters

## Project Structure

```
invoice-creation-service
├── src
│   ├── app.module.ts          # Root module of the application
│   ├── main.ts                # Entry point of the application
│   ├── invoices
│   │   ├── invoices.controller.ts  # REST API endpoints for invoices
│   │   ├── invoices.module.ts      # Invoices feature module
│   │   ├── invoices.service.ts     # Business logic for invoices
│   │   ├── schemas
│   │   │   └── invoice.schema.ts   # Mongoose schema for Invoice model
│   │   └── dto
│   │       ├── create-invoice.dto.ts  # DTO for creating invoices
│   │       └── update-invoice.dto.ts  # DTO for updating invoices
├── test
│   ├── invoices.e2e-spec.ts      # End-to-end tests for the invoice API
│   └── jest-e2e.json             # Jest configuration for end-to-end testing
├── package.json                   # npm configuration file
├── nest-cli.json                  # Nest CLI configuration file
├── tsconfig.json                  # TypeScript configuration file
└── README.md                      # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd invoice-creation-service
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application, run:
```
npm run start
```

The application will be available at `http://localhost:3000`.

### API Endpoints

- **POST /invoices**: Create a new invoice
- **GET /invoices/:id**: Retrieve a specific invoice by ID
- **GET /invoices**: Retrieve a list of all invoices

## Testing

To run the unit tests, use:
```
npm run test
```

To run the end-to-end tests, use:
```
npm run test:e2e
```

## License

This project is licensed under the MIT License.