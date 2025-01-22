export class UpdateInvoiceDto {
  customer?: string;
  amount?: number;
  reference?: string;
  date?: Date;
  items?: Array<{
    sku: string;
    qt: number;
  }>;
}