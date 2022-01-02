export class OrderBillingAddress {
    fullName: string;
    email: string;
    city: string;
    street: string;
    postalCode: string;
    paymentType: string;

    constructor(fullName: string, email: string, city: string,
        street: string, postalCode: string, paymentType: string) {
        this.fullName = fullName;
        this.email = email;
        this.city = email;
        this.street = street;
        this.postalCode = postalCode;
        this.paymentType = paymentType;
    }
}