import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'environments/environment';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AdminAuthGuardService as AdminAuthGuard } from './admin/components/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { BathroomTableComponent } from './bathroom-table/bathroom-table.component';
import { AboutComponent } from './core/components/about/about.component';
import { ContactUsComponent } from './core/components/contact-us/contact-us.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    BathroomTableComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path:'', component: ProductsComponent},
      { path:'login', component: LoginComponent},
      { path:'Contact', component: ContactUsComponent},
      { path:'about', component: AboutComponent},

    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [
    AdminAuthGuard


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
