import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  catchError,
  finalize,
  map,
  mapTo,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { TagsModalComponent } from 'src/app/shared/tags-modal/tags-modal.component';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/core/models/tag';
import { forkJoin, of } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { LocationHelperService } from 'src/app/core/services/helpers/location-helper.service';
import { Location } from 'src/app/core/models/location';
import { ImageHelperService } from 'src/app/core/services/helpers/image-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-creation',
  templateUrl: './plan-creation.page.html',
  styleUrls: ['./plan-creation.page.scss'],
  providers: [ImagePicker],
})
export class PlanCreationPage {
  images: { data; url: string | ArrayBuffer; type: string }[] = [];
  tagsModal;
  maxPeopleAllowed: boolean = false;
  currentDate = new Date().toISOString();
  selectedTags: Tag[] = [];
  locationOptions: Location[];
  selectedLocation: Location;
  locationError: boolean;

  planForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    when: new FormControl(null, Validators.required),
    minPeople: new FormControl(2, Validators.min(2)),
    maxPeople: new FormControl(2, Validators.min(2)),
  });

  constructor(
    private ui: UiHelper,
    private modalController: ModalController,
    private crud: CrudService,
    private locationHelper: LocationHelperService,
    private imagesHelper: ImageHelperService,
    private router: Router
  ) {}

  async sendForm() {
    if (this.planForm.invalid || !this.selectedLocation || !this.selectedTags) {
      this.ui.presentToast(
        "Por favor rellene todos los campos con un '*' correctamente"
      );
    } else {
      await this.ui.presentLoading();
      const imagesUploadArray$ = this.imagesHelper.getImagesDownloadUrls$(
        this.images.map((img) => img.data)
      );

      forkJoin(imagesUploadArray$.map((file) => file.url$))
        .pipe(
          switchMap((images) => {
            return this.crud.uploadNewPlan({
              ...this.planForm.getRawValue(),
              images,
              tags: this.selectedTags,
              location: this.selectedLocation,
            });
          })
        )
        .subscribe(async (res) => {
          this.ui.dismissLoading();
          await this.ui
            .presentToast('Anuncio creado satisfactoriamente! :D')
            .then(() => this.router.navigate(['home/recommended-plans']));
        });
    }
  }

  async selectFile(event: any) {
    const files = event.target.files;

    if (!files[0] || files[0].length == 0) {
      return;
    }

    var mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.ui.presentToast('Solo se aceptan imágenes');
      return;
    }

    await this.ui.presentLoading();

    Object.values(files).forEach((file: Blob) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.images.push({
          data: file,
          url: reader.result,
          type: file.type,
        });
      };
    });
    this.ui.dismissLoading();
  }

  selectLocation(location: Location) {
    this.selectedLocation = location;
    this.locationOptions = [];
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
          this.locationError = !res?.length;
        });
    }
  }
  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter((item) => item != tag);
  }

  deleteImage(url: string | ArrayBuffer) {
    this.images = this.images.filter((image) => image.url !== url);
  }

  async openTagsModal() {
    let res;
    const modal = await this.modalController.create({
      component: TagsModalComponent,
      componentProps: { data: this.selectedTags },
    });
    modal.onWillDismiss().then(({ data }) => {
      this.selectedTags = data;
    });
    await modal.present();
  }

  setPeople(operation: 'remove' | 'add', type: 'min' | 'max' = 'min') {
    const selector = `${type}People`;
    if (
      type === 'max' &&
      !this.maxPeopleAllowed &&
      this.planForm.get('maxPeople').value ===
        this.planForm.get('minPeople').value
    ) {
      return;
    }
    const currentValue = this.planForm.get(selector).value;
    if (operation === 'add') {
      this.planForm.patchValue({ [selector]: currentValue + 1 });
      if (type === 'min') {
        if (
          this.planForm.get(selector).value >
            this.planForm.get('maxPeople').value ||
          !this.maxPeopleAllowed
        ) {
          this.planForm.patchValue({
            maxPeople: this.planForm.get(selector).value,
          });
        }
      }
    } else {
      if (currentValue > 2) {
        this.planForm.patchValue({ [selector]: currentValue - 1 });
        if (!this.maxPeopleAllowed) {
          this.planForm.patchValue({ maxPeople: currentValue - 1 });
        }
      }
    }
  }
}
