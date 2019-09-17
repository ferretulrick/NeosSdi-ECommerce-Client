import { Component, OnInit, ViewChild } from '@angular/core';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerSelect: Customer;


  constructor() { }

  ngOnInit() {
  }

  customerSelected(c: Customer) {
    this.customerSelect = {id: c.id, firstName: c.firstName, lastName: c.lastName, country: c.country};
  }

}
