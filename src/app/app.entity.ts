// export interface DataUserResp {
//     status: number;
//     data:   DataUser[];
// }

export interface DataUser {
    paymentDeadline: Date;
    age:             number;
    username:        string;
    name:            string;
    email:           string;
    basicSalary:     string;
    city:            string;
    province:        string;
    zipcode:         string;
    isChecked:       boolean;
    id?:              string;
}
