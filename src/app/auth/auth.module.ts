import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutes } from './auth.route';
import { MatIconModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSnackBarModule } from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthService} from '../service/auth.service'
@NgModule({
    declarations: [LoginComponent,SignupComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(AuthRoutes),
      MatCardModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers:[AuthService]
  })
  export class AuthModule { }