import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})


export class EditCustomerComponent implements OnInit {

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   country: new FormControl(''),
  // });

  @Input() customerData: Customer;
  @Output() updateEvent = new EventEmitter();

  constructor(
    private customersService: CustomersService,
    // private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  updateCustomer() {
    if (window.confirm('Update?')) {
      this.customersService.updateCustomer(this.customerData.Id, this.customerData)
      .subscribe(() => {
        // this.router.navigate(['/customers']);
        this.updateEvent.emit(null);
      });
    }
  }


}
