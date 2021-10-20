import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPreviewPageRoutingModule } from './plan-preview-routing.module';

import { PlanPreviewPage } from './plan-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPreviewPageRoutingModule
  ],
  declarations: [PlanPreviewPage],
  exports: [PlanPreviewPage]
})
export class PlanPreviewPageModule {}
