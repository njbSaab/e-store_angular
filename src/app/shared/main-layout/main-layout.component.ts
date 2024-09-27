import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'] // Исправлено styleUrl на styleUrls
})
export class MainLayoutComponent {}
