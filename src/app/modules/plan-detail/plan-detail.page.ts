import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/core/models/plan';
import { LocationService } from 'src/app/core/services/http/location.service';

declare var H: any;

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  @ViewChild('map')
  public mapElement: ElementRef;

  plan: Plan;
  constructor(
    private _ac: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.plan = this._ac.snapshot.data?.plan;
  }

}
