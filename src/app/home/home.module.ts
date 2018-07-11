import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.route';
import { MatCardModule, MatButtonModule,MatIconModule,MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from '../service/auth-gaurd';
import {AuthService} from '../service/auth.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers:[AuthGuard,AuthService]
})
export class HomeModule { }