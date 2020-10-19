import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  @ViewChild('test111') roundButtonOne: ElementRef;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService,private shoppingCartService: ShoppingCartService) { 
    
  }
  

  logout(){
      this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
  }

  closeNav(){
    this.roundButtonOne.nativeElement.setAttribute("aria-expanded","false");
  }

}
