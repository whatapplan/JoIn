import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlanPageRoutingModule } from './search-plan-routing.module';

import { SearchPlanPage } from './search-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlanPageRoutingModule
  ],
  declarations: [SearchPlanPage]
})
export class SearchPlanPageModule {}
