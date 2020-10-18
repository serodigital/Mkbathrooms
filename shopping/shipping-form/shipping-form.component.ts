import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping :any = {};
  userSubscription: Subscription;
  userId: string;
 
  constructor(
    private router: Router,
    private authService: AuthService,
    private oderService: OrderService){

  }

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping,this.cart);
    let result = await this.oderService.placeOrder(order);
    this.router.navigate(['/payment', result.key]);
  }

  
}
