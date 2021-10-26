import { Component, Input, OnInit } from '@angular/core';
import { Plan } from '../../models/plan';
import { PopOverPage } from '../pop-over/pop-over.page';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-plan-preview',
  templateUrl: './plan-preview.page.html',
  styleUrls: ['./plan-preview.page.scss'],
})
export class PlanPreviewPage implements OnInit {
  @Input () plan: Plan;
  
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }

  async popoverDescription(ev: any,planDescription: string) {
    console.log(planDescription);
    const popover = await this.popoverController.create({
      component: PopOverPage,
      componentProps: {description: planDescription},
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: "ios",
    });
    await popover.present();
  }

}
