import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import {Plan} from '../../core/models/plan';
import { CrudService } from '../../core/services/http/crud-service.service';

@Component({
  selector: 'app-recommended-plans',
  templateUrl: './recommended-plans.page.html',
  styleUrls: ['./recommended-plans.page.scss'],
})
export class RecommendedPlansPage implements AfterViewInit {
  recommendedPlans : Plan[] = [];
  plans : Plan[] = [];
  planNumber: number = 0;
  
  // actualRecommendedPlan: Plan;
  // firstPlan: Plan = this.plans[0];
  constructor(private crudService : CrudService, private gestureCtrl : GestureController, private platform: Platform) { 
    
  }
  

  //Implementa el gesto y recibe los planes Reocmendados
  async ngAfterViewInit(){
    const planInfo = document.querySelector(".planInfo") as HTMLElement;
    const planTitle = document.querySelector(".planTitle") as HTMLElement;
    const planCreator = document.querySelector(".planCreator") as HTMLElement;
    const planLocation = document.querySelector(".planLocation") as HTMLElement;
    const planDetail = document.querySelector(".planDetail") as HTMLElement;

    this.plans=(await this.crudService.getAllPlans());
    this.recommendedPlans= this.plans;
    planTitle.innerHTML = this.plans[this.planNumber].title;
    this.useSwipe(planTitle,planCreator,planLocation,planDetail);
  }


  useSwipe(planTitle: HTMLElement,planLocation: HTMLElement,planCreator: HTMLElement,planDetail: HTMLElement) {
    const container = document.querySelector(".container");
    const door =  document.querySelector(".door") as HTMLElement;;
    
      // const card = cardArray[i];
      // console.log(card);
      const gesture: Gesture = this.gestureCtrl.create({
        el: container,
        gestureName: 'swipe',
        gesturePriority: 10,
        onStart: ev => {

        },
        onMove: ev => {
          console.log('ev: ', ev);
          door.style.transform = `rotateY(${-(ev.deltaX / 6) + 280}deg)`;
        },
        onEnd: ev => {
          if(ev.deltaX > 150 ){
            door.style.transform =  `rotateY(${180}deg)`;
            this.planNumber = this.planNumber + 1;
            setTimeout(() =>{
              this.actualizarPlanInfo(planTitle,planCreator,planLocation,planDetail);
            },1000);
          }else if(ev.deltaX < -150){ 
            door.style.transform =  `rotateY(${360}deg)`;
            this.planNumber = this.planNumber + 1;
            setTimeout(() =>{
              this.actualizarPlanInfo(planTitle,planCreator,planLocation,planDetail);
            },1000);
            
          }else{
            door.style.transform = `rotateY(${280}deg)`;
          }
        }
      });
      console.log(gesture);
      gesture.enable(true);
    
  }

  actualizarPlanInfo(planTitle: HTMLElement,planLocation: HTMLElement,planCreator: HTMLElement,planDetail: HTMLElement){
    planTitle.innerHTML = this.plans[this.planNumber].title;
    planCreator.innerHTML = this.plans[this.planNumber].createdBy;
    planLocation.innerHTML = this.plans[this.planNumber].location.toString();
  }

}
