import {
  Component, OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { icon, latLng, Map, MapOptions, marker, LatLng, tileLayer } from 'leaflet';
import { forkJoin } from 'rxjs';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { IonSlides } from '@ionic/angular'; 


@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {


  
  layer;
  center: LatLng;
  firstTitleWord: string;
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
  user: User;
  buttonText: string;

  constructor(
    private _ac: ActivatedRoute,
    private crud: CrudService,
    private _auth: AuthService,
    private nav: NavController,
    private ui: UiHelper
  ) {
    this.user = this._auth.loggedUser;
  }

  hasUserAlreadyAcceptedPlan(user, plan) {
    return user?.acceptedPlans?.includes(plan.id)
  }

  ngOnInit() {
    this.plan = this._ac.snapshot.data?.plan;
    this.buttonText = !this.hasUserAlreadyAcceptedPlan(this.user, this.plan) ? 'Unirme' : 'Ya estas unido a este plan!'
    this.firstTitleWord = this.plan.title.split(' ')[0];
    this.plan = {
      ...this.plan,
      title: this.plan.title.split(' ').slice(1).join(' '),
    };
    this.updateCenter(this.plan);
  }

  updateCenter({ location: { coordinates } }: Plan) {
    const greenIcon = icon({
      //add this new icon
      iconUrl: './../../../assets/icon/ubi.svg',
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

  joinPlan() {
    if(this.hasUserAlreadyAcceptedPlan(this.user,this.plan)) return
    const participants = this.plan.participants
      ? [...this.plan.participants, this.user.id]
      : [this.user.id];
    const acceptedPlans = this.user.acceptedPlans
      ? [...this.user.acceptedPlans, this.plan.id]
      : [this.plan.id];

    const plan = {
      ...this.plan,
      title: this.firstTitleWord + ' ' + this.plan.title,
      participants,
    };
    const user = { ...this.user, acceptedPlans };
    localStorage.setItem('loggedUser',JSON.stringify(user))
    forkJoin([
      this.crud.añadirUsuarioAPlan(plan),
      this.crud.añadirPlanAUsuario(user),
    ]).subscribe(
      () => {
        this.ui.presentToast(`Te has unido al plan: ${this.plan.title}!`);
        this.nav.back();
      },
      () => {
        this.ui.presentToast(
          'Ops, algo ha ido mal, inténtalo de nuevo o más tarde :S'
        );
      }
    );
  }
}
