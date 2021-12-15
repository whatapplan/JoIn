import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelComponent } from './label/label.component';
import { PlanCreationPageRoutingModule } from './plan-creation-routing.module';
import { PlanCreationPage } from './plan-creation.page';

@NgModule({
  imports: [PlanCreationPageRoutingModule, SharedModule],
  declarations: [PlanCreationPage, LabelComponent],
})
export class PlanCreationPageModule {}
