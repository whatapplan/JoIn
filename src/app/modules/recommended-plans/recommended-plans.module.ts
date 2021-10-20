import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PlanPreviewPageModule} from '../../core/components/plan-preview/plan-preview.module'
import { IonicModule } from '@ionic/angular';

import { RecommendedPlansPageRoutingModule } from './recommended-plans-routing.module';

import { RecommendedPlansPage } from './recommended-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedPlansPageRoutingModule,
    PlanPreviewPageModule,
  ],
  declarations: [RecommendedPlansPage]
})
export class RecommendedPlansPageModule {}
