import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductService } from 'app/product.service';
// import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/products.model';
import { ProductService } from 'shared/services/product.service';
// import { Product } from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription =  this.productService.getAl().subscribe(products => {
      this.filteredProducts = this.products = products});
   }

   
  ngOnInit(): void {
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
  }



}
