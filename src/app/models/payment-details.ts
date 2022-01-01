export class PaymentDetails {
    totalPrice: number;
    paymentType: string;
    paymentStatus: string;
    paymentDate: Date;

    constructor(totalPrice: number, paymentType: string,
                paymentStatus: string, paymentDate: Date) {
        this.totalPrice = totalPrice;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
    }
}