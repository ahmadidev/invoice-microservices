import { EmailSenderService } from '../email-sender/email-sender.service';
import { ReportSummaryDto } from '../shared/report-summary.dto';
import { Controller, Injectable, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
@Injectable()
export class RabbitmqService {
  constructor(private readonly emailSenderService: EmailSenderService) { }
  private readonly logger = new Logger(RabbitmqService.name);

  @EventPattern('daily_sales_report')
  async handleMessage(data: ReportSummaryDto) {
    this.logger.log('Received message:', data);
    
    data.generatedAt = new Date(data.generatedAt);
    
    this.emailSenderService.sendEmail(data);
  }
}