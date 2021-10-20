import { Component, Input, OnInit } from '@angular/core';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plan-preview',
  templateUrl: './plan-preview.page.html',
  styleUrls: ['./plan-preview.page.scss'],
})
export class PlanPreviewPage implements OnInit {
  @Input () plan: Plan;
  
  constructor() { }

  ngOnInit() {
  }

}
