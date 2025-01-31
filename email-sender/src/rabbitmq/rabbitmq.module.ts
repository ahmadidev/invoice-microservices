import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { EmailSenderModule } from '@/email-sender/email-sender.module';

@Module({
  imports: [EmailSenderModule],
  controllers: [RabbitmqController],
  providers: [RabbitmqController]
})
export class RabbitmqModule { }