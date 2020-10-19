import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/products.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { isNgTemplate } from '@angular/compiler';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions= true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  // removeFromCart(){
  //   this.cartService.removeFromCart(this.product);
  // }

  // getQuantity()
  // {
  //   if(!this.shoppingCart) return 0;

  //   let item = this.shoppingCart.itemsMap[this.product.id];
  //   return item ? item.quantity : 0;
  // }

}
