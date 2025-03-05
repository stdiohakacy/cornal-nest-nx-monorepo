export class PaymentAggregate {
  constructor(
    private readonly _id: string,
    private readonly _orderId: string,
    private readonly _amount: number,
    private _status: 'PENDING' | 'COMPLETED' | 'FAILED'
  ) {}

  get id(): string {
    return this._id;
  }

  get orderId(): string {
    return this._orderId;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): 'PENDING' | 'COMPLETED' | 'FAILED' {
    return this._status;
  }

  completePayment() {
    if (this._status !== 'PENDING') {
      throw new Error('Payment is not pending');
    }

    this._status = 'COMPLETED';
  }

  failPayment() {
    if (this._status !== 'PENDING') {
      throw new Error('Payment can only be failed if it is in PENDING state');
    }
    this._status = 'FAILED';
  }
}
