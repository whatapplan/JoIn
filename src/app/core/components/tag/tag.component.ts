import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'join-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() isCategory: false;
  @Input() tagName: string;
  constructor() {}

  ngOnInit() {}
}
