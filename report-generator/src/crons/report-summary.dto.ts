
export class ReportSummaryDto {
    generatedAt: Date
    totalSales: number;
    totalSkuQuantities: { sku: string, qt: number }[];
}