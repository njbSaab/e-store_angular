import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-added-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './added-page.component.html',
  styleUrls: ['./added-page.component.scss']
})
export class AddedPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private productService: ProductService
  ) {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),  
      info: new FormControl(null),
      price: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('AddedPageComponent: onSubmit called');

    if (this.form.invalid) {
      console.log('AddedPageComponent: Form is invalid');
      return;
    }

    this.submitted = true;

    const product = {
      type: this.form.get('type')?.value,
      title: this.form.get('title')?.value,
      photo: this.form.get('photo')?.value,
      info: this.form.get('info')?.value,
      price: this.form.get('price')?.value,
    };

    this.productService.createProduct(product).subscribe(
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
