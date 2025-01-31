import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { InvoicesController } from '../../invoices/invoices.controller';
import { InvoicesService } from '../../invoices/invoices.service';
import { CreateInvoiceDto } from '../../invoices/dto/create-invoice.dto';

describe('InvoicesController', () => {
    let controller: InvoicesController;
    let service: jest.Mocked<InvoicesService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [InvoicesController],
            providers: [
                {
                    provide: InvoicesService,
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        findAll: jest.fn(),
                        findByDateRange: jest.fn()
                    },
                },
            ],
        }).compile();

        controller = module.get(InvoicesController);
        service = module.get(InvoicesService);

        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new invoice', async () => {
            const mockedInvoice = {
                _id: new Types.ObjectId(),
                customer: 'Artur',
                amount: 20,
                reference: "BG10",
                date: new Date("2023/3/3"),
                items: [{ sku: 'IT3', qt: 2 }],
            };
            service.create.mockResolvedValueOnce(mockedInvoice);

            const createInvoiceDto: CreateInvoiceDto = {
                customer: 'Artur',
                amount: 20,
                reference: "BG10",
                date: new Date("2023/3/3"),
                items: [{ sku: 'IT3', qt: 2 }],
            };
            const result = await controller.create(createInvoiceDto);

            expect(result).toEqual(mockedInvoice);
            expect(service.create).toHaveBeenCalledWith(createInvoiceDto);
        });
    });

    describe('findOne', () => {
        it('should return a single invoice', async () => {
            const mockedInvoice = {
                _id: new Types.ObjectId(),
                customer: 'Artur',
                amount: 20,
                reference: "BG10",
                date: new Date("2023/3/3"),
                items: [{ sku: 'IT3', qt: 2 }],
            };
            service.findOne.mockResolvedValueOnce(mockedInvoice);

            const id = new Types.ObjectId().toString();
            const result = await controller.findOne(id);

            expect(result).toEqual(mockedInvoice);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('findAll', () => {
        it('should return an array of invoices', async () => {
            const mockedInvoices = [
                {
                    _id: new Types.ObjectId(),
                    customer: 'Artur',
                    amount: 20,
                    reference: "BG14",
                    date: new Date("2023/5/5"),
                    items: [{ sku: 'IT1', qt: 21 }],
                },
                {
                    _id: new Types.ObjectId(),
                    customer: 'Ahmad',
                    amount: 10,
                    reference: "BG18",
                    date: new Date("2023/7/7"),
                    items: [{ sku: 'IT2', qt: 22 }],
                },
                {
                    _id: new Types.ObjectId(),
                    customer: 'Bill',
                    amount: 25,
                    reference: "BG50",
                    date: new Date("2023/3/3"),
                    items: [{ sku: 'IT3', qt: 23 }],
                },
            ];
            service.findAll.mockResolvedValueOnce(mockedInvoices);

            const result = await controller.findAll();

            expect(result).toEqual(mockedInvoices);
            expect(service.findAll).toHaveBeenCalled();
        });
        
        it('should return an array of invoices in specified date range', async () => {
            const mockedInvoices = [
                {
                    _id: new Types.ObjectId(),
                    customer: 'Artur',
                    amount: 20,
                    reference: "BG14",
                    date: new Date("2023/5/5"),
                    items: [{ sku: 'IT1', qt: 21 }],
                },
                {
                    _id: new Types.ObjectId(),
                    customer: 'Ahmad',
                    amount: 10,
                    reference: "BG18",
                    date: new Date("2023/6/7"),
                    items: [{ sku: 'IT2', qt: 22 }],
                }
            ];
            const filteredInvoices = mockedInvoices.slice(0, 1);
            service.findByDateRange.mockResolvedValueOnce(filteredInvoices);

            const start = new Date("2023/5/4");
            const end = new Date("2023/5/6");
            const result = await controller.findAll(start, end);

            expect(result).toEqual(filteredInvoices);
            expect(service.findByDateRange).toHaveBeenCalled();
        });
    });
});
