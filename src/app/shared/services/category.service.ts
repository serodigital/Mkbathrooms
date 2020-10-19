import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', (ref) => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map((actions)  => {
      return actions.map((action) => ({
        key: action.key,
        val: action.payload.val(),
      }))
    })
    );
  }


  getAll() {
    return this.db.list('/categories').valueChanges();
  }
  getAll2() {
    return this.db.list('/categories').snapshotChanges();
  }
}
