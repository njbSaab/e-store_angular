import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { Product } from './../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  products$!: Observable<Product[]>;
  countProducts$!: Observable<number>;
  totalPrice = 0;
  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      payment: new FormControl(null, Validators.required),
    });
  }

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

  onSubmit(): void {
    console.log('AddedPageComponent: onSubmit called');

    if (this.form.invalid) {
      console.log('AddedPageComponent: Form is invalid');
      return;
    }

    this.submitted = true;

    const order = {
      name: this.form.get('name')?.value,
      phone: this.form.get('phone')?.value,
      adress: this.form.get('adress')?.value,
      payment: this.form.get('payment')?.value,
      orders: this.products$,
      price: this.totalPrice,
      date: new Date()
    };

    this.orderService.createOrder(order).subscribe(
      (res) => {
        console.log('AddedPageComponent: Product added', res);
        this.form.reset();  // Сброс формы после успешной отправки
        this.submitted = false;
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }
}
