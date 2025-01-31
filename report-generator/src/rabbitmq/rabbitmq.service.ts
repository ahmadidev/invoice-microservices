import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject('RABBITMQ_CLIENT') private client: ClientProxy,
  ) { }

  async sendMessage(pattern: string, payload: any) {
    this.logger.debug(`Emitting message to ${pattern}`);
    try {
      return this.client.emit(pattern, payload);
    } catch (error) {
      this.logger.error(`Failed to emit message to ${pattern}`), error;
    }
  }
}