import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BathroomTableDataSource, BathroomTableItem } from './bathroom-table-datasource';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-bathroom-table',
  templateUrl: './bathroom-table.component.html',
  styleUrls: ['./bathroom-table.component.css']
})
export class BathroomTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BathroomTableItem>;
  products: any[];
  filteredProducts: any[];
  dataSource: BathroomTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'price','edit'];

  constructor(private productService: ProductService) {
  }
  
  ngOnInit() {
    this.dataSource = new BathroomTableDataSource(this.productService);
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filter(query:string){
    this.filteredProducts = (query) ? 
    // this.products.filter(p => p.payload.val()['title'].toLowerCase().includes(query.toLowerCase)) : 
    // this.products;
    this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
  }
}
