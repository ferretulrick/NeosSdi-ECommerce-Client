import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from './component/customers/customers.component';
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component';
import { GridCustomersComponent } from './component/grid-customers/grid-customers.component';
import { OrdersComponent } from './component/orders/orders.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateComponent } from './component/validate/validate.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    EditCustomerComponent,
    GridCustomersComponent,
    OrdersComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
