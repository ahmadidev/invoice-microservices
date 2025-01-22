import { Controller, Post, Body } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { EmailReport } from './email-sender.interface';

@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post('send-report')
  async sendReport(@Body() report: EmailReport) {
    return this.emailSenderService.sendEmail(report);
  }
}