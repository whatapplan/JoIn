import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanViewPageRoutingModule } from './plan-view-routing.module';
import {PlanPreviewPageModule} from '../../core/components/plan-preview/plan-preview.module'

import { PlanViewPage } from './plan-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanViewPageRoutingModule,
    PlanPreviewPageModule
  ],
  declarations: [PlanViewPage]
})
export class PlanViewPageModule {}
