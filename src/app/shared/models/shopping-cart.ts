import { shoppingCartItem } from './shopping-cart-items';
import { Product } from './products.model';

export class ShoppingCart{
     items: shoppingCartItem[]= [];

    constructor(private itemsMap: {[productId: string] : shoppingCartItem}){
        this.itemsMap = itemsMap || {};
        if(!itemsMap) {return;}
        for(const productId of Object.keys(itemsMap))
        {
            if(itemsMap.hasOwnProperty(productId)){
                const item = itemsMap[productId];
                this.items.push(new shoppingCartItem({...item,id: productId}));

            }
        }

    }

     getQuantity(product: Product){      
         //console.log("product",product)      
         let item = this.itemsMap[product.id];
         return item ? item.quantity : 0;
       }
   
    get totalPrice(){
        let sum = 0;
        for (let productId in this.items)
        sum += this.items[productId].totalPrice;
        return sum;

        
    }

    get totalIemCount(){
        let count = 0;
      
      for(const productId in this.itemsMap)
          count+= this.itemsMap[productId].quantity;
          return count;
    }
}