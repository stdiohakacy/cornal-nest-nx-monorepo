export interface OrderEventPublisherInterface {
  publishOrderCreatedEvent(
    order: string,
    items: { productId: string; quantity: number; price: number }[]
  ): void;
}
