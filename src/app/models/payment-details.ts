export class PaymentDetails {
    totalPrice: number;
    paymentType: string;
    paymentStatus: string;
    paymentDate: string;

    constructor(totalPrice: number, paymentType: string,
                paymentStatus: string, paymentDate: string) {
        this.totalPrice = totalPrice;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
    }
}