export interface DataUser {
    [x: string]: any;
    name: String;
    email:  String;
    phoneNumber: String;
    address?: Address;
    paymentDeadline: Date;
    status: boolean;
}

interface Address {
    zone?: number;
    zipcode?: number;
    city: string;
    province: string;
}