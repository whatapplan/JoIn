import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tag } from '../../models/tag';

@Component({
  selector: 'join-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnChanges {
  @Input() tags: Tag[];
  @Input() scrollable = true;
  constructor() {}

  tagsByCategory = [];

  aux = {};

  ngOnChanges({ tags, scrollable }: SimpleChanges) {
    this.tags = tags?.currentValue;
    this.scrollable = !!scrollable?.currentValue;
    this.tags?.forEach(({ category, name }) => {
      if (!Object.keys(this.aux).includes(category)) {
        this.aux = { ...this.aux, [category]: [name] };
      } else {
        const obj = this.aux[category];
        this.aux = { ...this.aux, [category]: [...obj, name] };
      }
    });
    this.tagsByCategory = Object.entries(this.aux).map(([category, tags]) => ({
      category,
      tags,
    }));
  }
}
