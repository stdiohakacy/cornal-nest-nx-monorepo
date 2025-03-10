export class OrderStatus {
  private static readonly ALLOWED_STATUSES = [
    'CREATED',
    'CONFIRMED',
    'CANCELED',
  ] as const;

  private readonly value: (typeof OrderStatus.ALLOWED_STATUSES)[number];

  constructor(status: string) {
    if (!OrderStatus.ALLOWED_STATUSES.includes(status as any)) {
      throw new Error(`Invalid order status: ${status}`);
    }
    this.value = status as (typeof OrderStatus.ALLOWED_STATUSES)[number];
  }

  getValue(): string {
    return this.value;
  }

  isCreated(): boolean {
    return this.value === 'CREATED';
  }

  isConfirmed(): boolean {
    return this.value === 'CONFIRMED';
  }

  isCanceled(): boolean {
    return this.value === 'CANCELED';
  }

  static isValidStatus(status: string): boolean {
    return OrderStatus.ALLOWED_STATUSES.includes(status as any);
  }
}
