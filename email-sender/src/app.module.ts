import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    EmailSenderModule,
    RabbitmqModule
  ],
  providers: [RabbitmqService],
})
export class AppModule { }