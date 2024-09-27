import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  type: string;
  title: string;
  photo: string;
  info: string;
  price: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: any): Observable<Product> {
    const url = `${environment.fbDbUrl}/products.json`;
    return this.http.post<{ name: string }>(url, product)
      .pipe(map(res => ({
        ...product,
        id: res.name,
        date: new Date(product.date)
      })));
  }

  getAllProducts(): Observable<Product[]> {
    const url = `${environment.fbDbUrl}/products.json`;
    return this.http.get<{ [key: string]: Product }>(url)
      .pipe(map(res => Object.keys(res).map(key => ({
        ...res[key],
        id: key,
        date: new Date(res[key].date)
      }))));
  }
}
