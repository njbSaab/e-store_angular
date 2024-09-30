import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AddedPageComponent } from './added-page/added-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutComponent,
    MaterialModule,
    DashboardComponent,
    EditPageComponent,
    AddedPageComponent,
    OrdersPageComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
          { path: 'added-page', component: AddedPageComponent, canActivate: [AuthGuard] },
          { path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
          { path: 'orders-page', component: OrdersPageComponent, canActivate: [AuthGuard] },
        ]
      },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [RouterModule]
})
export class AdminModule {}
