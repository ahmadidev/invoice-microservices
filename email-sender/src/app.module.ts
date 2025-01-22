import { Module } from '@nestjs/common';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [EmailSenderModule],
})
export class AppModule {}