import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'shared/services/product.service';
 import { Product } from 'shared/models/products.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private productService: ProductService) {

   }

   fetchRecipe(){
    return this.http
    .get<Product[]>(
        'https://mk-bathrooms.firebaseio.com/products.json',
        ).pipe(
            map(recipes =>{//transforms the arrays
                return recipes.map(recipe => {
                    return {...recipe};
                });
            }),
            tap(recipes =>{
               // this.productService.setProducts(recipes);
            }));// waits for first observable to complete
                // take one value from observable
            
   }
}
