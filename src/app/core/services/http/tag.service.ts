import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { TagCategory } from '../../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient, private db: AngularFirestore) {}

  getTagsByCategory() {
    return this.db.collection('tagsCategory').valueChanges() as Observable<TagCategory[]>;
  }
}
