import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { Product } from '../shared/interfaces/product';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products$: Observable<Product[]> = of([]);  // Инициализация пустым Observable

  constructor(
    private productService: ProductService  // Инъекция сервиса для работы с продуктами
  ) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}
