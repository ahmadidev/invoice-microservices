import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('InvoicesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/invoices (POST)', () => {
    return request(app.getHttpServer())
      .post('/invoices')
      .send({
        customer: 'John Doe',
        amount: 100.0,
        reference: 'INV-001',
        date: new Date(),
        items: [{ sku: 'ITEM-001', qt: 2 }],
      })
      .expect(201);
  });

  it('/invoices/:id (GET)', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/invoices')
      .send({
        customer: 'Jane Doe',
        amount: 200.0,
        reference: 'INV-002',
        date: new Date(),
        items: [{ sku: 'ITEM-002', qt: 1 }],
      });

    const invoiceId = createResponse.body._id;

    return request(app.getHttpServer())
      .get(`/invoices/${invoiceId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('customer', 'Jane Doe');
        expect(res.body).toHaveProperty('amount', 200.0);
      });
  });

  it('/invoices (GET)', async () => {
    return request(app.getHttpServer())
      .get('/invoices')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});