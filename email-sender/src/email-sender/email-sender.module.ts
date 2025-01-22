import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { EmailSenderController } from './email-sender.controller';

@Module({
  imports: [],
  controllers: [EmailSenderController],
  providers: [EmailSenderService],
})
export class EmailSenderModule {}