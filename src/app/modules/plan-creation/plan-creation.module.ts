import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanCreationPageRoutingModule } from './plan-creation-routing.module';

import { PlanCreationPage } from './plan-creation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanCreationPageRoutingModule
  ],
  declarations: [PlanCreationPage]
})
export class PlanCreationPageModule {}
