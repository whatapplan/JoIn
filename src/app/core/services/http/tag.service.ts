import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Tag, TagCategory } from '../../models/tag';
import { stringify } from 'querystring';

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
        ),
      ) as Observable<TagCategory[]>;
  }
}
