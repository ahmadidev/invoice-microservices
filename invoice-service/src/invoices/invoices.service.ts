import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './schemas/invoice.schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(@InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>) { }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    this.logger.debug("Creating Invoice", createInvoiceDto);

    try {
      const createdInvoice = await this.invoiceModel.create(createInvoiceDto);
      return createdInvoice;
    } catch (error) {
      this.logger.error("Failed to create Invoice", createInvoiceDto, error);
    }
  }

  async findOne(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id).exec();
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }
  
  async findByDateRange(startDate: Date, endDate: Date): Promise<Invoice[]> {
    return this.invoiceModel.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).exec();
  }
}