import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marker, latLng, MapOptions, tileLayer, Map, icon } from 'leaflet';
import { LatLng } from 'src/app/core/models/location';
import { Plan } from 'src/app/core/models/plan';
import { LocationService } from 'src/app/core/services/http/location.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  layer;
  center: LatLng;
  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }),
    ],
    zoom: 15,
    maxZoom: 18,
  };

  plan: Plan;
  constructor(
    private _ac: ActivatedRoute,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.plan = this._ac.snapshot.data?.plan;
    this.updateCenter(this.plan);
  }

  updateCenter({ location: { coordinates } }: Plan) {
    const greenIcon = icon({
      //add this new icon
      iconUrl:
        'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-location-ux-and-ui-flatart-icons-flat-flatarticons.png',
    });

    this.center = latLng(coordinates[0], coordinates[1]);
    this.options = { ...this.options, center: this.center };
    this.layer = marker([coordinates[0], coordinates[1]], { icon: greenIcon });
  }
  onMapReady(map: Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}
