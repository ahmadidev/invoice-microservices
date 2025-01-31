import { Injectable, Logger } from '@nestjs/common';
import { ReportSummaryDto } from '../shared/report-summary.dto';

@Injectable()
export class EmailSenderService {
  private readonly logger = new Logger(EmailSenderService.name);

  async sendEmail(reportSummaryDto: ReportSummaryDto) {
    this.logger.debug("Sending email with content", reportSummaryDto, typeof reportSummaryDto.generatedAt);
    const emailContent = this.createEmailContent(reportSummaryDto);

    // In a real-world application, the recipient would be taken from the report object
    const recipient = "sales@payever.org"

    // Use the email provider to send the email
    // await this.emailProdiver.send({
    //   to: report.recipient,
    //   subject: 'Daily Sales Report',
    //   text: emailContent,
    // });

    this.logger.debug(`Email sent to ${recipient} with content: ${emailContent}`);
  }

  createEmailContent(reportSummaryDto: ReportSummaryDto): string {
    return `
          Subject: Daily Sales Report - ${reportSummaryDto.generatedAt.toString()}
          
          Dear Team,
          
          Here is the sales report for ${reportSummaryDto.generatedAt.toDateString()}:
          
          Total Sales: $${reportSummaryDto.totalSales}
          
          Total Quantity Sold by SKU:
          ${reportSummaryDto.totalSkuQuantities.map(item => `- SKU: ${item.sku}, Quantity: ${item.qt}`).join('\n\t\t')}
          
          Best regards,  
          Your Sales Team
      `;
  }
}