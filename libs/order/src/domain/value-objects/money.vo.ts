export class Money {
  private static readonly ALLOWED_CURRENCIES = [
    'USD',
    'EUR',
    'VND',
    'JPY',
  ] as const;

  private readonly _amount: number;
  private readonly _currency: (typeof Money.ALLOWED_CURRENCIES)[number];

  constructor(amount: number, currency: string) {
    if (!Money.isValidCurrency(currency)) {
      throw new Error(`Invalid currency: ${currency}`);
    }
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }

    this._amount = amount;
    this._currency = currency as (typeof Money.ALLOWED_CURRENCIES)[number];
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  static isValidCurrency(currency: string): boolean {
    return Money.ALLOWED_CURRENCIES.includes(currency as any);
  }

  equals(other: Money): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }

  add(other: Money): Money {
    if (this._currency !== other._currency) {
      throw new Error('Cannot add amounts with different currencies');
    }
    return new Money(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    if (this._currency !== other._currency) {
      throw new Error('Cannot subtract amounts with different currencies');
    }
    if (this._amount < other._amount) {
      throw new Error('Resulting amount cannot be negative');
    }
    return new Money(this._amount - other._amount, this._currency);
  }

  isGreaterThan(other: Money): boolean {
    if (this._currency !== other._currency) {
      throw new Error('Cannot compare amounts with different currencies');
    }
    return this._amount > other._amount;
  }

  isLessThan(other: Money): boolean {
    if (this._currency !== other._currency) {
      throw new Error('Cannot compare amounts with different currencies');
    }
    return this._amount < other._amount;
  }
}
