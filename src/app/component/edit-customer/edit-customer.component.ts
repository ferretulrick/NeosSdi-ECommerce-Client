import { Component, OnInit, Input, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ValidateComponent } from '../validate/validate.component';



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit, OnChanges {


  @Input() customerData: Customer;
  @Output() updateEvent = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;

  constructor(
    private customersService: CustomersService,
    // private actRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required]
    });
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

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.customerData.firstChange) {
      this.formGroup.patchValue({
        firstName: changes.customerData.currentValue.FirstName,
        lastName: changes.customerData.currentValue.LastName,
        country: changes.customerData.currentValue.Country
      });
    }
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formGroup.invalid) {
        return;
    }

    this.customerData.FirstName = this.formGroup.value.firstName;
    this.customerData.LastName = this.formGroup.value.lastName;
    this.customerData.Country = this.formGroup.value.country;

    this.updateCustomer();
  }

  open(){
    this.modalService.open(ValidateComponent);
  }
}
