import { Component, Input, OnInit } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.page.html',
  styleUrls: ['./plan-view.page.scss'],
})
export class PlanViewPage implements OnInit {
  @Input () plan: Plan;
  constructor() { }

  ngOnInit() {
  }

}
