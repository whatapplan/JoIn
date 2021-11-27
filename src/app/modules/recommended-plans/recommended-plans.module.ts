import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecommendedPlansPageRoutingModule } from './recommended-plans-routing.module';

import { RecommendedPlansPage } from './recommended-plans.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RecommendedPlansPageRoutingModule,
  ],
  declarations: [RecommendedPlansPage]
})
export class RecommendedPlansPageModule {}
