import { CronJob } from 'cron';
import { InvoiceService } from '../services/invoiceService';
import { publishDailySalesReport } from '../rabbitmq/publisher';

const invoiceService = new InvoiceService();

const dailySalesSummaryJob = new CronJob('0 12 * * *', async () => {
    try {
        const invoices = await invoiceService.fetchInvoicesForToday();
        const totalSales = invoices.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
        
        const salesSummary = invoices.reduce((acc, invoice) => {
            const sku = invoice.sku;
            acc[sku] = (acc[sku] || 0) + invoice.quantity;
            return acc;
        }, {});

        const report = {
            totalSales,
            salesSummary,
        };

        await publishDailySalesReport(report);
    } catch (error) {
        console.error('Error generating daily sales summary:', error);
    }
});

dailySalesSummaryJob.start();