import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { PagedQuery } from 'src/app/interfaces/paged-query';
import { Customer } from 'src/app/interfaces/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-customers',
  templateUrl: './grid-customers.component.html',
  styleUrls: ['./grid-customers.component.scss']
})
export class GridCustomersComponent implements OnInit {

  Customers: Customer[];
  NbCustomers: number;
  pageSize = 5;
  page = 1;
  pagedQuery: PagedQuery = { NbItems: 10, StartIndex: 0, Filters: [] };

  @Output() customerEmit = new EventEmitter<Customer>();

  constructor(
    public customersService: CustomersService,
    public router: Router
    ) { }

  ngOnInit() {
    this.loadCustomers();
    console.log(this.Customers);
  }

  loadCustomers() {
    this.pagedQuery = { NbItems: this.pageSize, StartIndex: (this.page - 1) * this.pageSize, Filters: [] };
    return this.customersService.getCustomers(this.pagedQuery).subscribe(data => {
      this.Customers = data.Items;
      this.NbCustomers = data.ItemsCount;
    });
  }

  editCustomer(c: Customer) {
    this.customerEmit.emit(c);
    // this.router.navigate(['/customers']);
  }

  redirectOrder(id) {
    this.router.navigate(['/orders'], { queryParams: { customerId: id } });
  }
}
