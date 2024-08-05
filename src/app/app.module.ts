import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProductsComponent } from './products/products.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { OrdersComponent } from './orders/orders.component';
@NgModule({
  declarations: [
    AppComponent,
    // OrdersComponent,
    // DashboardComponent,
    // ProductsComponent,
    // CategoriesComponent,
    // OrdersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
