import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    InvoicesModule,
  ],
})
export class AppModule {}