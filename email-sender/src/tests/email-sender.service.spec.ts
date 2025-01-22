import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { EmailReport } from '../email-sender/email-sender.interface';
import { EmailService } from '../email-sender/email.service'; // Assuming you have an EmailService for sending emails
import { getQueueToken } from '@nestjs/bull'; // If using Bull for queues
import { Queue } from 'bull';

describe('EmailSenderService', () => {
  let service: EmailSenderService;
  let emailService: EmailService;
  let queue: Queue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailSenderService,
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: getQueueToken('daily_sales_report'),
          useValue: {
            process: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailSenderService>(EmailSenderService);
    emailService = module.get<EmailService>(EmailService);
    queue = module.get<Queue>(getQueueToken('daily_sales_report'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('receiveReport', () => {
    it('should process the sales report and send an email', async () => {
      const report: EmailReport = { /* mock report data */ };
      jest.spyOn(emailService, 'sendEmail').mockResolvedValue(undefined);

      await service.receiveReport(report);

      expect(emailService.sendEmail).toHaveBeenCalledWith(report);
    });
  });

  describe('sendEmail', () => {
    it('should call the email service with the correct parameters', async () => {
      const report: EmailReport = { /* mock report data */ };
      await service.sendEmail(report);

      expect(emailService.sendEmail).toHaveBeenCalledWith(report);
    });
  });
});