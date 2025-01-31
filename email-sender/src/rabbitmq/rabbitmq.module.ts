import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { EmailSenderModule } from '@/email-sender/email-sender.module';

@Module({
  imports: [EmailSenderModule],
  controllers: [RabbitmqService],
  providers: [RabbitmqService],
  exports: [RabbitmqService]
})
export class RabbitmqModule { }