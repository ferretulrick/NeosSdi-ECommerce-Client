import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PagedItems } from '../interfaces/paged-items';
import { PagedQuery } from '../interfaces/paged-query';
import { Order } from '../interfaces/order';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(pagedQUery: PagedQuery): Observable<PagedItems<Order>> {
    const idFilter = pagedQUery.Filters[0].Value;
    return this.http.get<PagedItems<Order>>(environment.apiURL + '/Orders?StartIndex='
        + pagedQUery.StartIndex + '&NbItems=' + pagedQUery.NbItems + '&idFilter=' + idFilter);
  }

  deleteOrder(id) {
    return this.http.delete<Order>(environment.apiURL + '/Orders/' + id);
  }

}
