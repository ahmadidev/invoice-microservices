import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InvoicesService } from '../../invoices/invoices.service';
import { Invoice } from '../../invoices/schemas/invoice.schema';
import { Model } from 'mongoose';

const mockInvoiceModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn()
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  let model: jest.Mocked<Model<Invoice>>;

  const mockedInvoice = {
    id: "6793530f02663be2e6d48868",
    customer: 'Artur',
    amount: 20,
    reference: "BG10",
    date: new Date("2023/3/3"),
    items: [{ sku: 'IT3', qt: 2 }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockInvoiceModel,
        },
      ],
    }).compile();

    service = module.get(InvoicesService);
    model = module.get(getModelToken(Invoice.name));
    
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an invoice', async () => {
      model.create.mockResolvedValueOnce(mockedInvoice as any);
      
      const result = await service.create(mockedInvoice);

      expect(result).toEqual(mockedInvoice);
      expect(model.create).toHaveBeenCalledWith(mockedInvoice);
    });
  });

  describe('findOne', () => {
    it('should find an invoice by ID', async () => {
      model.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockedInvoice),
      } as any);

      const result = await service.findOne('6793530f02663be2e6d48868');

      expect(result).toEqual(mockedInvoice);
      expect(model.findById).toHaveBeenCalledWith('6793530f02663be2e6d48868');
    });

    it('should return null if invoice is not found', async () => {
      model.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const result = await service.findOne('000000000000000');

      expect(result).toBeNull();
      expect(model.findById).toHaveBeenCalledWith('000000000000000');
    });
  });

  describe('findAll', () => {
    it('should return all invoices', async () => {
      const mockInvoices = [mockedInvoice, { ...mockedInvoice, _id: '6793530f02663be2e6d48868' }];
      model.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockInvoices),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual(mockInvoices);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findByDateRange', () => {
    it('should return an array of invoices in specified date range', async () => {
      const mockInvoices = [mockedInvoice, { ...mockedInvoice, _id: '6793530f02663be2e6d48868' }];
      model.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockInvoices),
      } as any);

      const start = new Date("2023/5/4");
      const end = new Date("2023/5/6");

      const result = await service.findByDateRange(start, end);

      expect(result).toEqual(mockInvoices);
      expect(model.find).toHaveBeenCalledWith({
        date: {
          $gte: start,
          $lte: end,
        },
      });
    });
  });
});