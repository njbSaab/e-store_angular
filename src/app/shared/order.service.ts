import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(
    private http: HttpClient
  ) { }

    // Метод для создания нового продукта
    createOrder(order: any): Observable<Product> {
      const url = `${environment.fbDbUrl}/orders.json`;
      return this.http.post<{ name: string }>(url, order)
        .pipe(
          map(res => ({
            ...order,
            id: res.name, // добавляем ID из ответа
            date: order.date ? new Date(order.date) : new Date() // проверяем, что дата существует
          }))
        );
    }

    // // Метод для получения всех продуктов
    // getAllProducts(): Observable<Product[]> {
    //   const url = `${environment.fbDbUrl}/products.json`;
    //   return this.http.get<{ [key: string]: Product }>(url)
    //     .pipe(
    //       map(res => {
    //         // Если данных нет (например, база данных пуста), возвращаем пустой массив
    //         if (!res) {
    //           return [];
    //         }
    //         return Object.keys(res).map(key => ({
    //           ...res[key],
    //           id: key, // присваиваем ID из ключа
    //           date: res[key].date ? new Date(res[key].date) : new Date() // проверяем, что дата существует
    //         }));
    //       })
    //     );
    // }

    // // Метод для получения продукта по ID
    // getById(id: string): Observable<Product> {
    //   const url = `${environment.fbDbUrl}/products/${id}.json`;
    //   console.log('Fetching product from URL:', url); // Логируем URL

    //   return this.http.get<Product>(url).pipe(
    //     map(product => {
    //       console.log('Fetched product:', product); // Логируем полученный продукт

    //       // Если продукт не существует
    //       if (!product) {
    //         throw new Error(`Product with ID ${id} not found`);
    //       }

    //       return {
    //         ...product,
    //         id, // добавляем ID продукта
    //         date: product.date ? new Date(product.date) : new Date() // проверяем наличие даты
    //       };
    //     })
    //   );
    // }

    // remove(id: string): Observable<Product>{
    //   const url = `${environment.fbDbUrl}/products/${id}.json`;
    //   return this.http.delete<Product>(url)
    // }

    // addProduct(product: Product) {
    //   this.cartProducts.push(product);
    //   this.countProductsSubject.next(this.cartProducts.length);
    // }

}
