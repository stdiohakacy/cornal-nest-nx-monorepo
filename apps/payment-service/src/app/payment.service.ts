import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async processPayment(orderData: any) {
    console.log('Processing payment for order:', orderData);
    return { status: 'Payment processed', orderId: orderData.id };
  }
}
