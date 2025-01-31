import { EmailSenderService } from '../email-sender/email-sender.service';
import { ReportSummaryDto } from '../shared/report-summary.dto';
import { Controller, Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
@Injectable()
export class RabbitmqController {
  private readonly logger = new Logger(RabbitmqController.name);

  constructor(private readonly emailSenderService: EmailSenderService) { }

  @EventPattern('daily_sales_report')
  async handleMessage(@Payload() data: ReportSummaryDto) {
    this.logger.debug('Received message:', data);

    try {
      data.generatedAt = new Date(data.generatedAt);
      this.emailSenderService.sendEmail(data);
    } catch (error) {
      this.logger.error('Error processing message:', data, error);
    }
  }
}