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

  customers: Customer[];
  nbCustomers: number;
  pageSize = 5;
  page = 1;
  pagedQuery: PagedQuery = { nbItems: 10, startIndex: 0, filters: [] };

  @Output() customerEmit = new EventEmitter<Customer>();

  constructor(
    public customersService: CustomersService,
    public router: Router
    ) { }

  ngOnInit() {
    this.loadCustomers();
    console.log(this.customers);
  }

  loadCustomers() {
    this.pagedQuery = { nbItems: this.pageSize, startIndex: (this.page - 1) * this.pageSize, filters: [] };
    return this.customersService.getCustomers(this.pagedQuery).subscribe(data => {
      this.customers = data.items;
      this.nbCustomers = data.itemsCount;
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
