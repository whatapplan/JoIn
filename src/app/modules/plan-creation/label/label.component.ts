import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jo-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input() size: 'big' | 'medium' = 'medium';
  @Input() normal;
  @Input() textColor: 'text-white' | 'text-pink' = 'text-pink';
  @Input() bolded;
  constructor() {}

  ngOnInit() {}
}
