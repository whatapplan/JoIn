import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagCategory } from '../../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient, private db: AngularFirestore) {}

  getTagsByCategory() {
    return this.db
      .collection('tagCategory')
      .valueChanges()
      .pipe(
        map((cats: TagCategory[]) =>
          cats.map((cat) => ({
            ...cat,
            tags: cat.tags.map((tag) => ({ ...tag, category: cat.name })),
          }))
        )
      ) as Observable<TagCategory[]>;
  }
}
