import { OrderLine } from './order-line';
import { Customer } from './customer';

export interface Order {
    id: number;
    creationDate: Date;
    totalPrice: number;
    orderLines: OrderLine[];
    customer: Customer;
}
