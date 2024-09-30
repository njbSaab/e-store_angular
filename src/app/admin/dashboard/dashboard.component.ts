import { Subscription } from 'rxjs';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Добавляем FormsModule для работы с ngModel
import { SearchPipe } from '../../shared/search.pipe'; // Импортируем ваш пайп


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products?: Product[] = []; // Явно указываем тип массива как Product[]
  pSub: Subscription | null = null; // Изменяем тип на Subscription
  rSub: Subscription | null = null;
  productName: string = ""; // Инициализируем как строку

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAllProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe(); // Отписываемся при уничтожении компонента
    }
    if (this.rSub){
      this.rSub.unsubscribe();
    }
  }

  remove(id: string | undefined): void {
    if (!id) {
      console.error('Product ID is undefined');
      return;
    }
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products?.filter(product => product.id !== id);
    });
  }
formatDate(date: Date | string | undefined): string {
  if (!date) {
    return 'No date available'; // Если дата отсутствует, возвращаем сообщение
  }

  // Если дата уже объект Date
  if (date instanceof Date) {
    return date.toString().substring(4, 24); // Возвращаем дату в формате "Sep 29 2024 20:56:22"
  }

  // Если дата строка
  const dateObj = new Date(date);
  return dateObj.toString().substring(4, 24); // Возвращаем дату в формате "Sep 29 2024 20:56:22"
}
}
