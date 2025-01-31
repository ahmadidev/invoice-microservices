import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';

@Injectable()
export class InvoicesService {
  constructor(@InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>) { }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Invoice[]> {
    return this.invoiceModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }
}