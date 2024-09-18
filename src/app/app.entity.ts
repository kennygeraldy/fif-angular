export interface DataUser {
    name: String;
    email:  String;
    phoneNumber: String;
    address?: Address;
}

interface Address {
    zone?: number;
    zipcode?: number;
    city: string;
    province: string;
}