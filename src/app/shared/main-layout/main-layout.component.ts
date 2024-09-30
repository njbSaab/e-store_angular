import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Импортируем CommonModule


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule,CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  countProducts$!: Observable<number>; // Observable для отображения количества продуктов

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Подписываемся на Observable, чтобы получать количество продуктов
    this.countProducts$ = this.productService.countProducts$;
  }
}
