import { PaymentRepositoryInterface } from '../../application/ports/payment.repository.interface';
import { PaymentAggregate } from '../../domain/aggregate-roots/payment.aggregate';

export class PaymentRepositoryImpl implements PaymentRepositoryInterface {
  private payments: PaymentAggregate[] = [];

  async findById(id: string): Promise<PaymentAggregate | null> {
    return this.payments.find((p) => p.id === id) || null;
  }

  async save(payment: PaymentAggregate): Promise<void> {
    this.payments.push(payment);
  }
}
