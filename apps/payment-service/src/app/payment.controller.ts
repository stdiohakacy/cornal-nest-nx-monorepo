import { Payload, MessagePattern } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { Controller } from '@nestjs/common';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() orderData: any) {
    return this.paymentService.processPayment(orderData);
  }
}
