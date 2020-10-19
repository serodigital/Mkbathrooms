import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/products.model';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { shoppingCartItem } from 'shared/models/shopping-cart-items';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) { }
  
  async getCart(): Promise<Observable<ShoppingCart>>
  {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
      map((x: any) => (x) ? new ShoppingCart(x.items) : new ShoppingCart(x)));
  }

  async addToCart(product: Product){
    this.updateItem(product, 1);
}

  async removeFromCart(product: Product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(cartId) {return cartId};
      let result = await this.create();
      
      localStorage.setItem('cartId', result.key);
      console.log(result.key);
      return result.key;
   } 

  
  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);
    item$.snapshotChanges().pipe(take(1)).subscribe(item =>{
      let quantity = ((item.payload.hasChild('quantity')) ? item.payload.val()['quantity'] + change : change);
      
      if(quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
    });
  });
  }

}
