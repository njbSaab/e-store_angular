import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Правильный импорт FormsModule и ReactiveFormsModule
import { AddedPageComponent } from '../added-page/added-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from './../../shared/product.service';
import { Product } from './../../shared/interfaces/product';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Используем FormsModule
    ReactiveFormsModule, // Используем ReactiveFormsModule
    AddedPageComponent, // Компонент
    MaterialModule, // Angular Material Module
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit {
  product?: Product;
  form: FormGroup;
  submitted = false; // Переменная submitted

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    // Инициализация формы
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      info: new FormControl(''),
      price: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // Получаем продукт по ID из параметров маршрута
    this.route.params.pipe(
      switchMap(params => this.productService.getById(params['id']))
    ).subscribe((product: Product) => {
      this.product = product;

      // Обновляем значения формы
      this.form.patchValue({
        type: product.type,
        title: product.title,
        photo: product.photo,
        info: product.info,
        price: product.price,
      });
    });
  }

  // Метод onSubmit для отправки формы
  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      const updatedProduct = {
        ...this.product,
        ...this.form.value
      };
      this.productService.update(updatedProduct).subscribe(() => {
        this.router.navigate(['/admin', 'dashboard']);
      });
    }
  }
}
