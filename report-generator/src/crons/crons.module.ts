import { Module } from '@nestjs/common';
import { CronsService } from './crons.service';
import { InvoicesModule } from '../invoices/invoices.module';
import { RabbitmqModule } from '@/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    InvoicesModule,
    RabbitmqModule
  ],
  providers: [CronsService]
})
export class CronsModule {}