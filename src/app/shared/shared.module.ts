import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicModule } from '@ionic/angular';
import { TagListComponent } from '../core/components/tag-list/tag-list.component';
import { TagComponent } from '../core/components/tag/tag.component';
import { DateTagComponent } from '../core/components/date-tag/date-tag.component';
import { UserSelectionModalComponent } from '../core/components/user-selection-modal/user-selection-modal.component';
import { MapModalComponent } from '../core/components/map-modal/map-modal.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryPipe } from '../core/pipes/country.pipe';
import { SafePipe } from '../core/pipes/safe.pipe';

@NgModule({
  declarations: [
    TagComponent,
    TagListComponent,
    DateTagComponent,
    UserSelectionModalComponent,
    CountryPipe,
    MapModalComponent,
    SafePipe
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
    SafePipe
  ],
  providers: [ImagePicker],
})
export class SharedModule {}
