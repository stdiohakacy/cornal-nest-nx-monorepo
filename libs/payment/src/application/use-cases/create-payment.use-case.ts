// 📌 libs/payment/src/application/use-cases/create-payment.use-case.ts
import { v4 as uuid } from 'uuid';
import { PaymentAggregate } from '../../domain/aggregate-roots/payment.aggregate';
import { PaymentRepositoryInterface } from '../ports/payment.repository.interface';
import { PaymentEventPublisher } from '../ports/payment-event.publisher.interface';

export class CreatePaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepositoryInterface,
    private readonly eventPublisher: PaymentEventPublisher
  ) {}

  async execute(orderId: string, amount: number): Promise<PaymentAggregate> {
    const payment = new PaymentAggregate(uuid(), orderId, amount, 'PENDING');
    await this.paymentRepository.save(payment);
    await this.eventPublisher.publishPaymentCompleted(
      payment.id,
      payment.orderId,
      payment.amount
    );
    return payment;
  }
}
