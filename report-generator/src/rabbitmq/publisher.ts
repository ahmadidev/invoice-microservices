import amqp from 'amqplib';
import { DailySalesSummary } from '../cron/dailySalesSummary';

const QUEUE_NAME = 'daily_sales_report';

export const publishDailySalesReport = async (summary: DailySalesSummary) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        
        const message = {
            totalSalesAmount: summary.totalSalesAmount,
            perItemSalesSummary: summary.perItemSalesSummary,
        };

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });

        console.log('Daily sales report published:', message);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error publishing daily sales report:', error);
    }
};