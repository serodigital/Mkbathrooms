import { Component, OnInit } from '@angular/core';
// import { CategoryService } from 'src/app/category.service';
// import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { CategoryService } from 'app/category.service';
// import { ProductService } from 'app/product.service';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/products.model';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
// import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product:any = {};
  id;
 // editMode = false;
 // productForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) { 
      this.product = {} as Product;
    this.categories$ = categoryService.getCategories();

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.productService.get(this.id).pipe(take(1))
       .subscribe(p => this.product = p);
  }

  ngOnInit(): void {
    }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete()
  {
    if(!confirm('Are you sure you want to delete this product?')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products'])
    

  }

}
