import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './component/customers/customers.component';
import { OrdersComponent } from './component/orders/orders.component';
import { GridCustomersComponent } from './component/grid-customers/grid-customers.component';
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component';


const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'customers',
    component: GridCustomersComponent,
    outlet: 'gridCustomers'
  },
  {
    path: 'customers',
    component: EditCustomerComponent,
    outlet: 'editCustomer'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
