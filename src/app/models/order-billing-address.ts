export class OrderBillingAddress {
    fullName: string;
    email: string;
    city: string;
    street: string;
    postalCode: string;

    constructor(fullName: string, email: string, city: string,
        street: string, postalCode: string) {
        this.fullName = fullName;
        this.email = email;
        this.city = email;
        this.street = street;
        this.postalCode = postalCode;
    }
}