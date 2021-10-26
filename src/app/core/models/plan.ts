import { Injectable } from '@angular/core';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class Plan {
  $key: string;
  address: string;
  category: string;
  city: string;
  description: string;
  user: string;
  title: string;
  when: string;
  tags: Tag[];
}
