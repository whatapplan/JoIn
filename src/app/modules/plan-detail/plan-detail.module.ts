import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanDetailPageRoutingModule } from './plan-detail-routing.module';
import { PlanDetailPage } from './plan-detail.page';




@NgModule({
  imports: [SharedModule, PlanDetailPageRoutingModule],
  declarations: [PlanDetailPage],
})
export class PlanDetailPageModule {}
