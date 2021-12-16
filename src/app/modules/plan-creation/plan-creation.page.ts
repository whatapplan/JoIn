import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { icon, latLng, LatLng, Map, MapOptions, marker, tileLayer } from 'leaflet';
import { of } from 'rxjs';
import { catchError, throttleTime } from 'rxjs/operators';
import { Location } from 'src/app/core/models/location';
import { TagCategory } from 'src/app/core/models/tag';
import { IUser } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocationHelperService } from 'src/app/core/services/helpers/location-helper.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { TagService } from 'src/app/core/services/http/tag.service';

@Component({
  selector: 'app-plan-creation',
  templateUrl: './plan-creation.page.html',
  styleUrls: ['./plan-creation.page.scss'],
  providers: [ImagePicker],
})
export class PlanCreationPage implements OnInit {
  slideOpts = {
    allowTouchMode: false,
  };
  date = new Date();
  images: { data; url: string | ArrayBuffer; type: string }[] = [];
  tagsModal;
  maxPeopleAllowed: boolean = false;
  currentDate = new Date().toISOString();
  selectedTagsFromSelector: any[];
  selectedTags: any[];
  locationOptions: Location[];
  locationError: boolean;
  plan;
  user: IUser;
  planForm: FormGroup;

  tagsListOptions;
  showLocationsResults = false;
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

  filteredTagsCategories: TagCategory[];
  tagsCategories: TagCategory[];
  showTagsList = false;

  constructor(
    private ui: UiHelper,
    private crud: CrudService,
    private locationHelper: LocationHelperService,
    private router: Router,
    private auth: AuthService,
    private tagsService: TagService
  ) {
    this.user = this.auth.loggedUser;
    this.planForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      when: new FormControl(null, Validators.required),
      minPeople: new FormControl(2, Validators.min(2)),
      maxPeople: new FormControl(2, Validators.min(2)),
      createdBy: new FormControl(this.user.id),
      location: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.tagsService.getTagsByCategory().subscribe((data) => {
      this.tagsCategories = data;
      this.tagsListOptions = this.tagsCategories.map(({ name, tags }) => ({
        label: name,
        value: name,
        items: tags.map(({ name }) => ({ label: name, value: name })),
      }));
    });
  }

  onMapReady(map: Map) {
    setTimeout(() => {
      map?.invalidateSize();
    }, 0);
  }

  get selectedLocation() {
    const location = this.planForm.getRawValue()['location'] as Location;
    if (location) {
      this.updateCenter(location);
      return location;
    }
    return null;
  }

  updateCenter({coordinates}: Location) {
    const greenIcon = icon({
      iconUrl: './../../../assets/icon/ubi.svg',
    });

    this.center = latLng(coordinates[0], coordinates[1]);
    this.options = { ...this.options, center: this.center };
    this.layer = marker([coordinates[0], coordinates[1]], { icon: greenIcon });
  }

  async sendForm() {
    this.ui.presentLoading('plan-creation')
    const date = this.planForm.getRawValue()['when'] as Date;
    if (this.planForm.invalid || !this.selectedTags.length) {
      this.ui.presentToast(
        'Por favor rellene todos los campos correctamente'
      );
    } else {
      this.crud
        .uploadNewPlan({
          ...this.planForm.getRawValue(),
          tags: this.selectedTags,
          when: date.toISOString()
        })
        .then(async (res) => {
          await this.ui
            .presentToast('Anuncio creado satisfactoriamente! :D')
            .then(() => this.router.navigate(['plan', res.id]));
        })
        .catch(async () => {
          await this.ui.presentToast(
            'Ups! Algo ha salido mal al crear el anuncio'
          );
        })
        .finally(() => this.ui.dismissLoading('plan-creation'));
    }
  }

  setSelectedTags({ value }) {
    this.selectedTags = value.map(name => {
      const category = this.tagsCategories.find(({ tags }) =>
        tags.map(({name}) => name).includes(name)
      ).name;
      return {
        category,
        name,
        emoji: ''
      };
    });
  }
 
  searchLocation(event: any) {
    const query = event.srcElement.value.toLowerCase();
    if (!query.length || query === '' || !query) {
      this.locationOptions = [];
      this.locationError = false;
    } else {
      this.locationHelper
        .getLocationFrom(query)
        .pipe(
          throttleTime(1000),
          catchError(() => of([]))
        )
        .subscribe((res) => {
          this.locationOptions = res;
          this.showLocationsResults = true;
          this.locationError = !res?.length;
        });
    }
  }
}
