import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
