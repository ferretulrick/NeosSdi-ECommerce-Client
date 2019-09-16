import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { PagedQuery } from 'src/app/interfaces/paged-query';
import { CustomersService } from 'src/app/services/customers.service';
import { filter } from 'rxjs/operators';
import { Filter } from 'src/app/interfaces/filter';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  IdCustomers: number[];
  Orders: Order[];
  NbOrders: number;
  IdCustomerSelected = 0;
  filterId: Filter<number> = { Name: 'Id', Value: this.IdCustomerSelected};

  pageSize = 5;
  page = 1;
  pagedQuery: PagedQuery = { NbItems: 10, StartIndex: 0, Filters: [] };

  constructor(
    public ordersService: OrdersService,
    public customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    public router: Router
    ) {}

  ngOnInit() {
    this.loadIdCustomers();
    this.loadOrders();
  }

  loadOrders() {
    this.activatedRoute.queryParamMap.subscribe((data: any) => {
      this.IdCustomerSelected = Number(data.get('customerId'));
    });
    // this.IdCustomerSelected = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.filterId = { Name: 'Id', Value: this.IdCustomerSelected};
    this.pagedQuery = { NbItems: this.pageSize, StartIndex: (this.page - 1) * this.pageSize, Filters: [this.filterId] };
    return this.ordersService.getOrders(this.pagedQuery).subscribe(data => {
      this.Orders = data.Items;
      this.NbOrders = data.ItemsCount;
    });
  }

  loadIdCustomers() {
    const pagedQueryCustomers = { NbItems: 2048, StartIndex: 0, Filters: []};
    return this.customersService.getCustomers(pagedQueryCustomers).subscribe(data => {
      this.IdCustomers = data.Items.map(o => o.Id);
    });
  }

  changeId(id) {
    // this.IdCustomerSelected = Number($event);
    // this.filterId = { Name: "Id", Value:this.IdCustomerSelected};
    // this.page = 1;
    // this.loadOrders();
    if (id !== '0') {
      this.router.navigate(['/orders'], { queryParams: { customerId: id } }).then(() => {
        this.loadOrders();
      });
    } else {
      this.router.navigate(['/orders']).then(() => {
        this.loadOrders();
      });
    }
  }

  deleteOrder(order: Order) {
    if (window.confirm('Delete?')) {
      this.ordersService.deleteOrder(order.Id)
      .subscribe(data => {
        this.router.navigate(['/orders/' + this.IdCustomerSelected]).then(() => {
          this.loadOrders();
        });
      });
    }
  }

}
