export interface DataUser {
    username: string;
    name: string;
    email:  string;
    basicSalary: string;
    city: string;
    province: string;
    zipcode: string;
    isChecked: boolean;
    // age: number;
    id?: string;
    paymentDeadline: Date;
}