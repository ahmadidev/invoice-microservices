import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { InvoicesService } from '../invoices/invoices.service';
import { RabbitmqService } from '@/rabbitmq/rabbitmq.service';
import { ReportSummaryDto } from './report-summary.dto';

@Injectable()
export class CronsService {
    private readonly logger = new Logger(CronsService.name);

    constructor(
        private readonly invoicesService: InvoicesService,
        private readonly rabbitmqService: RabbitmqService
    ) { }

    // Use interval to easily debug the cron job
    @Interval(10000)
    // @Cron('0 12 * * *')
    async salesReportCron() {
        try {
            this.logger.debug(`Running CronJob at ${new Date().toTimeString()}.`);

            const reportSummary: ReportSummaryDto = new ReportSummaryDto();
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0));
            const endOfDay = new Date(today.setHours(23, 59, 59, 999));

            const invoices = await this.invoicesService.findByDateRange(startOfDay, endOfDay);

            reportSummary.generatedAt = new Date();
            reportSummary.totalSales = invoices.reduce((acc, invoice) => acc + invoice.amount, 0);

            reportSummary.totalSkuQuantities = invoices.reduce((acc, invoice) => {
                invoice.items.forEach((item) => {
                    const sku = item.sku;
                    const existingItem = acc.find(i => i.sku === sku);
                    if (existingItem) {
                        existingItem.qt += item.qt;
                    } else {
                        acc.push({ sku, qt: item.qt });
                    }
                });
                return acc;
            }, []);

            await this.rabbitmqService
                .sendMessage('daily_sales_report', reportSummary)
                .catch((error) => { this.logger.error('Error sending message to queue:', error); });

            this.logger.debug('Report is pushed to daily_sales_report queue.', reportSummary);
        } catch (error) {
            this.logger.error('Error generating and publishing daily sales summary:', error);
        }
    }
}
