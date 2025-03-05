import { PaymentAggregate } from '../../domain/aggregate-roots/payment.aggregate';

export interface PaymentRepositoryInterface {
  findById(id: string): Promise<PaymentAggregate | null>;
  save(payment: PaymentAggregate): Promise<void>;
}
