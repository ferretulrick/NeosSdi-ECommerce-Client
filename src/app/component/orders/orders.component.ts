import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { PagedQuery } from 'src/app/interfaces/paged-query';
import { CustomersService } from 'src/app/services/customers.service';
import { filter } from 'rxjs/operators';
import { Filter } from 'src/app/interfaces/filter';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  customers: Customer[];
  orders: Order[];
  nbOrders: number;
  idCustomerSelected = 0;
  filterId: Filter<number> = { name: 'Id', value: this.idCustomerSelected};

  pageSize = 5;
  page = 1;
  pagedQuery: PagedQuery = { nbItems: 10, startIndex: 0, filters: [] };

  constructor(
    public ordersService: OrdersService,
    public customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal
    ) {}

  ngOnInit() {
    this.loadIdCustomers();
    this.loadOrders();
  }

  loadOrders() {
    this.activatedRoute.queryParamMap.subscribe((data: any) => {
      this.idCustomerSelected = Number(data.get('customerId'));
    });
    // this.IdCustomerSelected = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.filterId = { name: 'Id', value: this.idCustomerSelected};
    this.pagedQuery = { nbItems: this.pageSize, startIndex: (this.page - 1) * this.pageSize, filters: [this.filterId] };
    return this.ordersService.getOrders(this.pagedQuery).subscribe(data => {
      this.orders = data.items;
      this.nbOrders = data.itemsCount;
    });
  }

  loadIdCustomers() {
    const pagedQueryCustomers = { nbItems: 2048, startIndex: 0, filters: []};
    return this.customersService.getCustomers(pagedQueryCustomers).subscribe(data => {
      this.customers = data.items;
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

  deleteOrder(order: Order, modal) {
    this.modalService.open(modal).result.then((result) => {
      console.log('yes');
      this.ordersService.deleteOrder(order.id)
      .subscribe(data => {
        this.router.navigate(['/orders'], { queryParams: { customerId: order.customer.id } }).then(() => {
          this.loadOrders();
        });
      });
    }, (reason) => {
      console.log('no');
    });
  }

}
