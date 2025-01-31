import { Controller, Post, Get, Param, Body, Query, InternalServerErrorException, Logger } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  private readonly logger = new Logger(InvoicesService.name);
  
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      return this.invoicesService.create(createInvoiceDto);
    } catch (error) {
      this.logger.error("Failed to create Invoice", createInvoiceDto, error);
      throw new InternalServerErrorException('Error creating invoice');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Get()
  findAll(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date
  ) {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return this.invoicesService.findByDateRange(start, end);
    } else {
      return this.invoicesService.findAll();
    }
  }
}