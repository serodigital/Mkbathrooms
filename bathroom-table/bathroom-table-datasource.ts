import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ProductService } from 'shared/services/product.service';

// TODO: Replace this with your own data model type
export interface BathroomTableItem {
  title: string;
  price: number;
  edit: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: BathroomTableItem[] = [
  {title: 'Bath1', price: 200, edit: 'edit'},
  {title: 'Bath2', price: 300, edit: 'edit'}
];

/**
 * Data source for the BathroomTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BathroomTableDataSource extends DataSource<BathroomTableItem> {
  data: BathroomTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  products: any[];

  constructor(private productService: ProductService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BathroomTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   observableOf(this.data),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    // }));
    return this.productService.getProducts();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: BathroomTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BathroomTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.price, b.price, isAsc);
        case 'id': return compare(+a.title, +b.title, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
