import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { Observable, throwError } from 'rxjs';
import { PagedItems } from '../interfaces/paged-items';
import { PagedQuery } from '../interfaces/paged-query';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  constructor(private http: HttpClient) { }


  getCustomers(pagedQUery: PagedQuery): Observable<PagedItems<Customer>> {
    return this.http.get<PagedItems<Customer>>(environment.apiURL
      + '/Customers?StartIndex=' + pagedQUery.startIndex + '&NbItems=' + pagedQUery.nbItems);
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(environment.apiURL + '/Customers/' + id);
  }

  updateCustomer(id, customer: Customer): Observable<Customer> {
    const a = JSON.stringify(customer);
    return this.http.put<Customer>(environment.apiURL + '/Customers/' + id, customer);
  }



}
