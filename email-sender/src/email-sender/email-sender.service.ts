import { Injectable } from '@nestjs/common';
import { EmailReport } from './email-sender.interface';
import { QueueService } from './queue.service'; // Assuming you have a QueueService to handle message consumption
import { EmailService } from './email.service'; // Assuming you have an EmailService to handle email sending

@Injectable()
export class EmailSenderService {
  constructor(
    private readonly queueService: QueueService,
    private readonly emailService: EmailService,
  ) {
    this.queueService.onMessage(this.receiveReport.bind(this));
  }

  async receiveReport(report: EmailReport) {
    try {
      await this.sendEmail(report);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendEmail(report: EmailReport) {
    const emailContent = this.createEmailContent(report);
    await this.emailService.send({
      to: report.recipient,
      subject: 'Daily Sales Report',
      text: emailContent,
    });
  }

  private createEmailContent(report: EmailReport): string {
    return `Sales Summary Report:\n\n${report.summary}`;
  }
}