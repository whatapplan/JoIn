import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ModalController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, throttleTime } from 'rxjs/operators';
import { TagsModalComponent } from 'src/app/core/components/tags-modal/tags-modal.component';
import { Location } from 'src/app/core/models/location';
import { Tag } from 'src/app/core/models/tag';
import { IUser, User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { ImageHelperService } from 'src/app/core/services/helpers/image-helper.service';
import { LocationHelperService } from 'src/app/core/services/helpers/location-helper.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

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
  plan;
  user: IUser;
  planForm: FormGroup;

  constructor(
    private ui: UiHelper,
    private modalController: ModalController,
    private crud: CrudService,
    private locationHelper: LocationHelperService,
    private imagesHelper: ImageHelperService,
    private router: Router,
    private auth: AuthService
  ) {
    this.user = this.auth.loggedUser;
    this.planForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      when: new FormControl(null, Validators.required),
      minPeople: new FormControl(2, Validators.min(2)),
      maxPeople: new FormControl(2, Validators.min(2)),
      createdBy: new FormControl(this.user.id),
    });
  }

  async sendForm() {
    if (this.planForm.invalid || !this.selectedLocation || !this.selectedTags) {
      this.ui.presentToast(
        "Por favor rellene todos los campos con un '*' correctamente"
      );
    } else {
      this.ui.presentLoading('plan-creation');
      const imagesUploadArray$ = this.imagesHelper.getImagesDownloadUrls$(
        this.images.map((img) => img.data)
      );

      forkJoin(
        imagesUploadArray$.map((file) =>
          file.url$.pipe(catchError(() => of({})))
        )
      )
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
        .subscribe(
          async () => {
            this.ui.dismissLoading('plan-creation');
            await this.ui
              .presentToast('Anuncio creado satisfactoriamente! :D')
              .then(() => this.router.navigate(['home/recommended-plans']));
          },
          async () => {
            this.ui.dismissLoading('plan-creation');
            await this.ui.presentToast(
              'Ups! Algo ha salido mal al crear el anuncio'
            );
          }
        );
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

    await this.ui.presentLoading('images-preview-plan-creation');

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
    this.ui.dismissLoading('images-preview-plan-creation');
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
