import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedPlansPageRoutingModule } from './recommended-plans-routing.module';

import { RecommendedPlansPage } from './recommended-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedPlansPageRoutingModule
  ],
  declarations: [RecommendedPlansPage]
})
export class RecommendedPlansPageModule {}
