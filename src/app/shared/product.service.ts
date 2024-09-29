//product service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Метод для создания нового продукта
  createProduct(product: any): Observable<Product> {
    const url = `${environment.fbDbUrl}/products.json`;
    return this.http.post<{ name: string }>(url, product)
      .pipe(
        map(res => ({
          ...product,
          id: res.name, // добавляем ID из ответа
          date: product.date ? new Date(product.date) : new Date() // проверяем, что дата существует
        }))
      );
  }

  // Метод для получения всех продуктов
  getAllProducts(): Observable<Product[]> {
    const url = `${environment.fbDbUrl}/products.json`;
    return this.http.get<{ [key: string]: Product }>(url)
      .pipe(
        map(res => {
          // Если данных нет (например, база данных пуста), возвращаем пустой массив
          if (!res) {
            return [];
          }
          return Object.keys(res).map(key => ({
            ...res[key],
            id: key, // присваиваем ID из ключа
            date: res[key].date ? new Date(res[key].date) : new Date() // проверяем, что дата существует
          }));
        })
      );
  }

  // Метод для получения продукта по ID
  getById(id: string): Observable<Product> {
    const url = `${environment.fbDbUrl}/products/${id}.json`;
    console.log('Fetching product from URL:', url); // Логируем URL

    return this.http.get<Product>(url).pipe(
      map(product => {
        console.log('Fetched product:', product); // Логируем полученный продукт

        // Если продукт не существует
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }

        return {
          ...product,
          id, // добавляем ID продукта
          date: product.date ? new Date(product.date) : new Date() // проверяем наличие даты
        };
      })
    );
  }


  // remove(id: string): Observable<Product>{
  //   const url = `${environment.fbDbUrl}/products/${id}.json`;
  //   return this.http.delete<Product>(url)
  // }

  // update(id: string): Observable<Product>{
  //   const url =  `${environment.fbDbUrl}/products/${product.id}.json`;

  //   return this.http.patch<Product>(url, product)

  // }
}
