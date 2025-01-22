import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderController } from '../email-sender/email-sender.controller';
import { EmailSenderService } from '../email-sender/email-sender.service';

describe('EmailSenderController', () => {
  let controller: EmailSenderController;
  let service: EmailSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSenderController],
      providers: [
        {
          provide: EmailSenderService,
          useValue: {
            sendEmail: jest.fn(),
            receiveReport: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmailSenderController>(EmailSenderController);
    service = module.get<EmailSenderService>(EmailSenderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call sendEmail method of EmailSenderService', async () => {
      const report = { subject: 'Daily Sales Report', body: 'Sales data...' };
      await controller.sendEmail(report);
      expect(service.sendEmail).toHaveBeenCalledWith(report);
    });
  });
});