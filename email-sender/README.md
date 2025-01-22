# Email Sender Service

This project is a NestJS application that provides an email-sending service. It consumes messages from a queue named `daily_sales_report` and sends emails containing the sales summary report.

## Project Structure

```
email-sender
├── src
│   ├── app.module.ts          # Root module of the application
│   ├── email-sender
│   │   ├── email-sender.module.ts   # Module for email sending functionality
│   │   ├── email-sender.service.ts  # Service to handle email sending logic
│   │   ├── email-sender.controller.ts # Controller for handling email requests
│   │   └── email-sender.interface.ts  # Interfaces related to email functionality
│   ├── main.ts                # Entry point of the application
│   └── tests
│       ├── email-sender.service.spec.ts # Unit tests for the email sender service
│       └── email-sender.controller.spec.ts # Unit tests for the email sender controller
├── package.json               # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd email-sender
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm run start
   ```

2. The application will listen for messages on the `daily_sales_report` queue and send emails with the sales summary report.

## Testing

To run the unit tests, use the following command:
```
npm run test
```

## License

This project is licensed under the MIT License.