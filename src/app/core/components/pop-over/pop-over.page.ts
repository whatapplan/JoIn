import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input("description") description: string;
}
