//
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../shared/interfaces/product';
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

}
