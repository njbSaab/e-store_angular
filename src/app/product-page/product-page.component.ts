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
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  product$?: Observable<Product>; // Изменяем на Observable<Product>

  constructor(
    private productService: ProductService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.routes.params.pipe(
      switchMap(params => {
        console.log('Route params:', params); // Убедитесь, что выводится правильный id
        const productId = params['id']; // Получаем id из параметров маршрута
        return this.productService.getById(productId); // Используем правильный id
      })
    );
  }
}
