import { Invoice } from '../models/invoice';
import { MongoClient } from 'mongodb';

export class InvoiceService {
    private client: MongoClient;
    private dbName: string;

    constructor(mongoUri: string, dbName: string) {
        this.client = new MongoClient(mongoUri);
        this.dbName = dbName;
    }

    async connect() {
        await this.client.connect();
    }

    async getInvoicesForToday(): Promise<Invoice[]> {
        const db = this.client.db(this.dbName);
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        return db.collection<Invoice>('invoices').find({
            createdAt: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        }).toArray();
    }

    async close() {
        await this.client.close();
    }
}