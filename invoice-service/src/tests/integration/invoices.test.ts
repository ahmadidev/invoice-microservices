import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import * as request from 'supertest';
import { Invoice, InvoiceSchema } from '../../invoices/schemas/invoice.schema';
import { InvoicesService } from '../../invoices/invoices.service';
import { InvoicesController } from '../../invoices/invoices.controller';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';

jest.setTimeout(10000);

describe('invoices-integration', () => {
    let server;
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create({
            instance: {
                launchTimeout: 10000,
            },
            binary: {
                downloadDir: '/app/node_modules/mongodb-binaries/', // Cache MongoDB binary
            },
        });
        const mongoUri = mongoServer.getUri();

        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(mongoUri),
                MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])
            ],
            controllers: [InvoicesController],
            providers: [InvoicesService],
        }).compile();

        app = module.createNestApplication();
        server = app.getHttpServer();
        await app.init();
    });

    afterEach(async () => {
        // Clear collection before each test
        await mongoose.connect(mongoServer.getUri())
        await mongoose.connection.db.dropCollection('invoices');
    });

    afterAll(async () => {
        if (mongoose.connection.readyState === 1)
            await mongoose.connection.close();
        await mongoServer.stop();
        await app.close();
    });

    it(`should return created entity`, async () => {
        const invoice = {
            customer: 'Artur',
            amount: 20,
            reference: "BG10",
            date: new Date("2023/3/3"),
            items: [{ sku: 'IT3', qt: 2 }],
        };
        const response = await request(server)
            .post('/invoices')
            .send(invoice);

        expect(response.statusCode).toBe(201);
        expect(response.body.customer).toBe(invoice.customer);
    });

    it(`should return all created invoices`, async () => {
        const invoice1 = {
            customer: 'Artur',
            amount: 20,
            reference: 'BG10',
            date: new Date('2023/3/3'),
            items: [{ sku: 'IT3', qt: 2 }],
        };
        const invoice2 = {
            customer: 'Ahmad',
            amount: 10,
            reference: 'BG18',
            date: new Date('2023/6/7'),
            items: [{ sku: 'IT2', qt: 22 }],
        };

        await request(server).post('/invoices').send(invoice1);
        await request(server).post('/invoices').send(invoice2);

        const response = await request(server).get('/invoices');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
        // TODO: Compare all properties
        expect(response.body[0].customer).toBe(invoice1.customer);
        expect(response.body[1].customer).toBe(invoice2.customer);
    });

    it('should return invoices within the specified date range', async () => {
        const invoice1 = {
            customer: 'Artur',
            amount: 20,
            reference: 'BG10',
            date: new Date('2021/5/5'),
            items: [{ sku: 'IT3', qt: 2 }],
        };
        const invoice2 = {
            customer: 'Ahmad',
            amount: 10,
            reference: 'BG18',
            date: new Date('2021/6/7'),
            items: [{ sku: 'IT2', qt: 22 }],
        };
        const invoice3 = {
            customer: 'Bill',
            amount: 25,
            reference: 'BG50',
            date: new Date('2021/8/3'),
            items: [{ sku: 'IT3', qt: 23 }],
        };

        await request(server).post('/invoices').send(invoice1);
        await request(server).post('/invoices').send(invoice2);
        await request(server).post('/invoices').send(invoice3);

        const startDate = '2021-05-01';
        const endDate = '2021-06-31';

        const response = await request(server)
            .get('/invoices')
            .query({ startDate, endDate });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
        // TODO: Compare all properties
        expect(response.body[0].customer).toBe(invoice1.customer);
        expect(response.body[1].customer).toBe(invoice2.customer);
    });
});
