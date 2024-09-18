import { DataUser } from "./app.entity";

export const userDataPublic: Array<DataUser> = 
[{
      name: 'Kenny',
      email:  'Ken@gmail.com',
      phoneNumber: '081382913391',
      address:
        {
          zipcode: 14310,
          city: 'Tangerang',
          province: 'Cisauk',
          zone: 1,
        }
    },
    {
      name: 'James',
      email:  'James@gmail.com',
      phoneNumber: '081282913391',
      address:
        {
          zipcode: 1421,
          city: 'Bali',
          province: 'Denpasar',
          zone: 2,
        }
    }]