import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'join-date-tag',
  templateUrl: './date-tag.component.html',
  styleUrls: ['./date-tag.component.scss'],
})
export class DateTagComponent implements OnInit {

  @Input() date: Date;
  constructor() { }

  ngOnInit() {}

}
