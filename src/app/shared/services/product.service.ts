import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/models/products.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // recipesChanged = new Subject<Recipe[]>();
  qS: Observable<any[]>;

  
  constructor(private db: AngularFireDatabase, private http: HttpClient) {

    
   }
 

   create(product){
      return this.db.list('/products').push(product);
    }

    getAll() {
      return this.db.list('/products').valueChanges();
    }
    getAl(): Observable<Product[]>{
      return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(map(changes => 
        changes.map(c => {
          const data = c.payload.val() as Product;
          const id = c.payload.key;
          return {id, ...data};
        })));
    }

    get(productId){
      console.log(productId);
      return this.db.object('/products/' + productId).snapshotChanges()
      .pipe(map(
        cateogries => {
          const value = cateogries.payload.val() as Product;
          const key = cateogries.payload.key;
          return {key, ...value};
        }
      ));  
    }

    update(productId, product){
      return this.db.object('/products/' + productId).update(product);
    }

    delete(productId)
    {
      return this.db.object('/products/' + productId).remove();
    }

    getProducts(): Observable<Product[]>
    {
        return this.http.get<Product[]>('https://mk-bathrooms.firebaseio.com/products')
    }

    
}
