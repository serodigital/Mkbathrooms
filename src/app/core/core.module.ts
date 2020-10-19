import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    ContactUsComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports:[
    BsNavbarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
