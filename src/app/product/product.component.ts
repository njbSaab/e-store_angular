import { ProductService } from './../shared/product.service';
import { Product } from './../shared/interfaces/product';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Импортируем RouterModule

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product; // Добавляем декоратор @Input
  static countProducts = 0; // Статическая переменная

  constructor(
    private productService: ProductService
  ){

  }
  addProduct(product: Product) {
    console.log('Product added to cart:', product);
    this.productService.addProduct(product);
    ProductComponent.countProducts++;
    console.log(ProductComponent.getCountProducts()); // Вызов статического метода для отображения результата

  }

  static getCountProducts(): number {
    return ProductComponent.countProducts;
  }

}
