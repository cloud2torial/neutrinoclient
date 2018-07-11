import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import {routes} from './neutrino-routes';
import {AuthGuard} from './service/auth-gaurd';
import {HttpClientModule} from '@angular/common/http';
import {HomeService} from './service/home.service';
import {MatToolbarModule,MatBadgeModule,MatIconModule,MatButtonModule,MatMenuModule,MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard,HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
