import { Product } from './../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'] // Исправлено на styleUrls
})
export class ProductPageComponent implements OnInit {
  product$?: Observable<Product>; // Наблюдаемый объект для продукта
  countProducts$!: Observable<number>; // Наблюдаемый объект для количества продуктов

  constructor(
    private productService: ProductService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Получаем продукт по ID из URL
    this.product$ = this.routes.params.pipe(
      switchMap(params => {
        const productId = params['id']; // Получаем ID из параметров маршрута
        return this.productService.getById(productId); // Получаем продукт по ID
      })
    );

    // Подписываемся на обновления количества товаров в корзине
    this.countProducts$ = this.productService.getCountProducts();
  }

  // Используем метод из ProductService
  addProduct(product: Product) {
    this.productService.addProduct(product); // Добавляем продукт в корзину
    console.log('Product added to cart:', product);
  }
}
