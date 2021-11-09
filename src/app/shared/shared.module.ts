import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { IonicModule } from '@ionic/angular';
import { TagListComponent } from '../core/components/tag-list/tag-list.component';
import { TagComponent } from '../core/components/tag/tag.component';
import { DateTagComponent } from '../core/components/date-tag/date-tag.component';
import { UserSelectionModalComponent } from '../core/components/user-selection-modal/user-selection-modal.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [TagComponent, TagListComponent, DateTagComponent, UserSelectionModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TagComponent,
    TagListComponent,
    DateTagComponent,
    LeafletModule
  ],
  providers: [ImagePicker],
})
export class SharedModule {}
