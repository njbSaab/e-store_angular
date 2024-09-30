import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { Product } from './../shared/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'] // Исправлено styleUrl на styleUrls
})
export class CartPageComponent implements OnInit {
  products$!: Observable<Product[]>;
  countProducts$!: Observable<number>;
  totalPrice = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    this.countProducts$ = this.productService.getCountProducts();

    this.products$.subscribe((products: Product[]) => {
      this.calculateTotalPrice(products);
    });
  }

  calculateTotalPrice(products: Product[]): void {
    this.totalPrice = products.reduce((sum, product) => sum + +(product.price || 0), 0);
  }
}
