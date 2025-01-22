export interface EmailReport {
    id: string;
    date: string;
    totalSales: number;
    itemsSold: Array<{
        itemId: string;
        quantity: number;
        price: number;
    }>;
    summary: string;
}