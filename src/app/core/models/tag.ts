import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Tag {
  emoji?: string;
  name: string;
  category: string;
}

export interface TagCategory {
  name: string;
  tags: Tag[];
}
