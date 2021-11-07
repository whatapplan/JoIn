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

 

  constructor(private crudService : CrudService, private gestureCtrl : GestureController, private platform: Platform) { 
    // this.crudService.getPlans().subscribe((res) => {res.map((t)=>{
    //   let plan = {
    //     id: t.payload.doc.id,
    //     ...t.payload.doc.data() as Plan
    //   }
    //   let pplan = t.payload.doc.data() as Plan;
    //   this.plans.push(plan);
    //   })});
    //    // this.filterPlansByCategory();
    //   this.recommendedPlans=this.plans;  // esto tengo que cambiarlo en un futuro
    this.plansf();
  }
  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>;
  async ngAfterViewInit(){
    this.plans=(await this.crudService.getAllPlans());
    this.recommendedPlans= this.plans;
    const cardArray = this.cards.toArray();
    console.log(cardArray.length);
    this.useSwipe(cardArray);
  }
  useSwipe(cardArray) {
    for(let i=0; i<cardArray.length; i++){
      const card = cardArray[i];
      console.log(card);
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        gesturePriority: 10,
        onStart: ev => {

        },
        onMove: ev => {
          console.log('ev: ', ev);
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
          this.setCardColor(ev.deltaX, card.nativeElement);
        },
        onEnd: ev => {
          if(ev.deltaX > 150 ){
            card.nativeElement.style.height = this.platform.height() + 'px';
            card.nativeElement.style.transform =  `translateX(${+ this.platform.width() * 2}px)`;
           
          }else if(ev.deltaX < -150){ 
            card.nativeElement.style.transform =  `translateX(${- this.platform.width() * 2}px)`;

          }else{
            card.nativeElement.style.transform = '';
          }
        }
      });
      console.log(gesture);
      gesture.enable(true);
    }
  }

 async plansf(){
  this.recommendedPlans=(await this.crudService.getAllPlans());
 }

  filters : string[]=["Cervezas","Pasear al perro","Béisbol",
  "Baloncesto","Fútbol","Tenis","Golf","Surf","Arte y exposiciones",
  "Cine","Teatro","Jam Session","Música en directo","Clubbing","Explora la ciudad"];
  
  setCardColor(x, element){
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16*16-abs, 16*16));
    const hexCode = this.decimalToHex(min,2);

    if (x < 0){
      color = '#FF' + hexCode + hexCode;
    }else{
      color = '#' + hexCode + 'FF' + hexCode;
    }
    element.style.backgroundColor = color;

  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof padding === 'undefined' || padding === null ? (padding = 2) : padding;

    while (hex.length < padding) {
      hex = '0' + hex;
    }
    return hex;
  }
  
  
}
