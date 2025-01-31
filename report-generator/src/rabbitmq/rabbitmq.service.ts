import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject(RabbitmqService.name) private client: ClientProxy,
  ) {}

  async sendMessage(pattern: string, payload: any) {
    this.logger.debug(`Emitting message to ${pattern}`);
    return this.client.emit(pattern, payload);
  }
}