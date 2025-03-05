export interface PaymentEventPublisher {
  publishPaymentCompleted(
    paymentId: string,
    orderId: string,
    amount: number
  ): Promise<void>;
}
