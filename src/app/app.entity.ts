export interface DataUser {
    name: String;
    email:  String;
    phoneNumber: String;
    address?: Address;
}


interface Address {
    zipcode?: number;
    city: string;
    province: string;
}