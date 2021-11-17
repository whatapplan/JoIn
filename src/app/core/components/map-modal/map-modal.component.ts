import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  icon,
  latLng,
  LatLng,
  MapOptions,
  marker,
  Map,
  tileLayer,
  featureGroup,
} from 'leaflet';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnChanges, OnInit {
  @Input() plans: Plan[];
  @Input() coords: LatLng;
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

  constructor(private modalController: ModalController) {
    // this.getLocation();
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  ngOnInit() {
    console.log(this.plans, this.coords)
    this.updateCenter(this.coords.lat,this.coords.lng)
  }
 
  getMarkersFromPlans(plans: Plan[], map: Map) {
    const greenIcon = icon({
      iconUrl:
        'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-location-ux-and-ui-flatart-icons-flat-flatarticons.png',
    });
    const markers = plans.map(({ location: { coordinates } }) =>
      marker([coordinates[0], coordinates[1]], { icon: greenIcon })
    );
    const group = featureGroup(markers);
    group.addTo(map);
    map.fitBounds(group.getBounds());
  }

  ngOnChanges({ plans, coords }: SimpleChanges) {
    this.plans = plans.currentValue;
    this.coords = coords.currentValue;
  }
  updateCenter(lat,lng) {
    this.center = latLng(lat, lng);
    this.options = { ...this.options, center: this.center };
  }
  onMapReady(map: Map) {
    this.getMarkersFromPlans(this.plans, map);
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}
