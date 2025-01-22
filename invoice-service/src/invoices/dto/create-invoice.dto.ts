export class CreateInvoiceDto {
    customer: string;
    amount: number;
    reference: string;
    date: Date;
    items: {
        sku: string;
        qt: number;
    }[];
}