import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule, NgIf],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logOut();
    this.router.navigate(['/admin', 'login']);
  }
}
