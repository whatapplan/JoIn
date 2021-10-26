import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanCreationPageRoutingModule } from './plan-creation-routing.module';
import { PlanCreationPage } from './plan-creation.page';


@NgModule({
  imports: [IonicModule, PlanCreationPageRoutingModule, SharedModule],
  declarations: [PlanCreationPage],
})
export class PlanCreationPageModule {}
