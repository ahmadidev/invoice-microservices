import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqController } from './rabbitmq/rabbitmq.controller';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    EmailSenderModule,
    RabbitmqModule
  ],
  providers: [RabbitmqController],
})
export class AppModule { }