import { Test, TestingModule } from '@nestjs/testing';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { RabbitmqController } from '../rabbitmq/rabbitmq.controller';
import { ReportSummaryDto } from '../shared/report-summary.dto';

describe('EmailSenderService', () => {
  let rabbitmqController: RabbitmqController;
  let emailSenderService: jest.Mocked<EmailSenderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitmqController,
        {
          provide: EmailSenderService,
          useValue: {
            sendEmail: jest.fn()
          }
        },
      ],
    }).compile();

    rabbitmqController = module.get(RabbitmqController);
    emailSenderService = module.get(EmailSenderService);
  });

  it('should be defined', () => {
    expect(rabbitmqController).toBeDefined();
    expect(emailSenderService).toBeDefined();
  });

  describe('receiveReport', () => {
    it('should call sendEmail method of EmailSenderService', async () => {
      const reportSummaryDto: ReportSummaryDto =
      {
        totalSales: 100,
        totalSkuQuantities: [{ sku: "DG1", qt: 2 }, { sku: "DG2", qt: 4 }],
        generatedAt: new Date()
      };

      await rabbitmqController.handleMessage(reportSummaryDto);

      expect(emailSenderService.sendEmail).toHaveBeenCalledWith(reportSummaryDto);
    });
  });
});