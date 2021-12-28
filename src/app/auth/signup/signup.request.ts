export class SignupRequest {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    city: string;
    street: string;
    postalCode: string;


    constructor(username: string, password: string, confirmPassword:
                string, firstName: string, lastName: string,
                email: string, accountNumber: string, city: string,
                street: string, postalCode: string) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.accountNumber = accountNumber;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
    }

}