import { OrderLine } from './order-line';
import { Customer } from './customer';

export interface Order {
    Id: number;
    CreationDate: Date;
    TotalPrice: number;
    OrderLines: OrderLine[];
    Customer: Customer;
}
