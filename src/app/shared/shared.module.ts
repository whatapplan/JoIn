import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicModule } from '@ionic/angular';
import { DateTagComponent } from '../core/components/date-tag/date-tag.component';
import { MapModalComponent } from '../core/components/map-modal/map-modal.component';
import { TagListComponent } from '../core/components/tag-list/tag-list.component';
import { TagComponent } from '../core/components/tag/tag.component';
import { UserSelectionModalComponent } from '../core/components/user-selection-modal/user-selection-modal.component';
import { NgLetDirective } from '../core/directives/ng-let.directive';
import { CountryPipe } from '../core/pipes/country.pipe';
import { SafePipe } from '../core/pipes/safe.pipe';
import { UserRetrievingPipe } from '../core/pipes/user-retrieving.pipe';

@NgModule({
  declarations: [
    TagComponent,
    TagListComponent,
    DateTagComponent,
    UserSelectionModalComponent,
    CountryPipe,
    MapModalComponent,
    SafePipe,
    UserRetrievingPipe,
    NgLetDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TagComponent,
    TagListComponent,
    DateTagComponent,
    LeafletModule,
    CountryPipe,
    SafePipe,
    UserRetrievingPipe,
    NgLetDirective
  ],
  providers: [ImagePicker],
})
export class SharedModule {}
