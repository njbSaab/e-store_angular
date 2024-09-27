import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  hidePassword = true;
  submitted = false;

  constructor(
    public auth: AuthService,
    private router: Router  // Внедряем Router через DI
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent: ngOnInit called');  // Лог при инициализации компонента
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    console.log('LoginComponent: onSubmit called');  // Лог при сабмите формы
    if (this.form.valid) {
      const user = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        returnSecureToken: true
      };

      console.log('LoginComponent: Form is valid, submitting', user);  // Лог, если форма валидна

      this.auth.login(user).subscribe(res => {
        console.log('LoginComponent: Login response', res);  // Лог ответа от сервера
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      });
    } else {
      console.log('LoginComponent: Form is invalid');  // Лог, если форма невалидна
      this.submitted = false;
    }
  }
}
