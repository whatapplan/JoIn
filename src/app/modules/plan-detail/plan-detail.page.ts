import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/core/models/plan';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  plan: Plan;
  constructor(private _ac: ActivatedRoute) {}

  ngOnInit() {
    this.plan = this._ac.snapshot.data?.plan;
  }
}
