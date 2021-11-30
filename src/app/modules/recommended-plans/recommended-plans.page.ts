import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Gesture, GestureController, NavController, Platform } from '@ionic/angular';
import { IUser, User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { Plan } from '../../core/models/plan';
import { CrudService } from '../../core/services/http/crud-service.service';

@Component({
  selector: 'app-recommended-plans',
  templateUrl: './recommended-plans.page.html',
  styleUrls: ['./recommended-plans.page.scss'],
})
export class RecommendedPlansPage implements AfterViewInit {
  @ViewChild('door')
  private door: ElementRef;

  assistantsNumber : number = 0;
  calle:string = "";
  ciudad:string = "";
  recommendedPlans : Plan[] = [];
  plans : Plan[] = [];
  planNumber: number = 0;
  plan: Plan= new Plan();
  user: User= new User();
  userPlanC: User[] =[];
  userPlan: User;
  UsersPlan: string[] = [];
  planUserName:string = "";
  title:string= "";
  firstWordTitle:string="";

  // actualRecommendedPlan: Plan;
  // firstPlan: Plan = this.plans[0];
  constructor(private crudService : CrudService, private gestureCtrl : GestureController, private platform: Platform, private nav: NavController ,private auth: AuthService) { 
    this.user = this.auth.loggedUser;
  }
  
  ngOnInit() {}
  //Implementa el gesto y recibe los planes Reocmendados
  async ngAfterViewInit(){
    //this.añadirUser();
    const planInfo = document.querySelector(".planInfo") as HTMLElement;
    const planTitle = document.querySelector(".planTitle") as HTMLElement;
    const planCreator = document.querySelector(".planCreator") as HTMLElement;
    const planLocation = document.querySelector(".planLocation") as HTMLElement;
    const planDetail = document.querySelector(".planDetail") as HTMLElement;

    this.plans=(await this.crudService.getAllPlans(this.user.id,this.user.favCategories));
    this.recommendedPlans= this.plans;
    this.setPlan(planTitle,planCreator,planLocation,planDetail);
    //planTitle.innerHTML = this.plans[this.planNumber].title;
    this.useSwipe(planTitle,planCreator,planLocation,planDetail);
  }
  
  useSwipe(planTitle: HTMLElement,planLocation: HTMLElement,planCreator: HTMLElement,planDetail: HTMLElement) {
    const container = document.querySelector(".container");
    const door =  document.querySelector(".door") as HTMLElement;
    const planInfo = document.querySelector(".planInfo") as HTMLElement;
    let angulo: number = 0; 
      const gesture: Gesture = this.gestureCtrl.create({
        el: container,
        gestureName: 'swipe',
        gesturePriority: 10,
        onStart: ev => {

        },
        onMove: ev => {
          angulo=this.getRotationFromRotateY(this.door.nativeElement.style.transform);
          if(angulo < 361 && angulo > 179){
          door.style.transform = `rotateY(${-(ev.deltaX / 3) + 310}deg)`;
         }
         console.log(this.getRotationFromRotateY(this.door.nativeElement.style.transform));
          
        },
        onEnd: ev => {
          if(ev.deltaX > 100 ){
            door.style.transform =  `rotateY(${180}deg)`;
            //this.añadirmeAPlan(this.plan.id);
            const route = `/plan/${this.plan.id}`;
            this.nav.navigateForward(route);
            
            setTimeout(() =>{
              door.style.transform =  `rotateY(${310}deg)`;
              this.setPlan(planTitle,planCreator,planLocation,planDetail);
            },1000);
            //this.setPlan(planTitle,planCreator,planLocation,planDetail);
            // this.planNumber = this.planNumber + 1;
            // setTimeout(() =>{
            //   this.actualizarPlanInfo(planTitle,planCreator,planLocation,planDetail);
            // },1000);
            
          }else if(ev.deltaX < -150){ 
            door.style.transform =  `rotateY(${360}deg)`;
            planInfo.style.transform =`translateZ(${-20}px)`;
            this.rechazarPlan(this.plan.id);

            setTimeout(() =>{
              door.style.transform =  `rotateY(${310}deg)`;
              this.setPlan(planTitle,planCreator,planLocation,planDetail);
            },1000);
           //this.setPlan(planTitle,planCreator,planLocation,planDetail);
            // this.planNumber = this.planNumber + 1;
            // setTimeout(() =>{
            //   this.actualizarPlanInfo(planTitle,planCreator,planLocation,planDetail);
            // },1000);
          }else{
            door.style.transform = `rotateY(${310}deg)`;
          }
        }
      });
      gesture.enable(true);
    
  }
  
  getRotationFromRotateY(cadena: string){
    let regex = /\(([^)]+)\)/;
    let respuesta = 0;
    if(cadena != ""){
    respuesta = parseInt(regex.exec(cadena)[1]);
    // console.log(respuesta);
    }
    return respuesta;
  }

  actualizarPlanInfo(planTitle: HTMLElement,planLocation: HTMLElement,planCreator: HTMLElement,planDetail: HTMLElement){
    
  }
  async setPlan(planTitle: HTMLElement,planLocation: HTMLElement,planCreator: HTMLElement,planDetail: HTMLElement) {let aux: string[] = [];
    if(this.recommendedPlans.length > this.planNumber){
    this.plan = this.recommendedPlans[this.planNumber];
    let list= this.plan.participants;
    list.push(this.plan.createdBy);
    aux = (await this.crudService.getImagesFromUsers(list));
    aux.reverse();
    this.UsersPlan = aux;
    this.userPlanC = (await this.crudService.getUserById(this.plan.createdBy));
    this.userPlan =  this.userPlanC[0];
    this.plan.creationUser = this.userPlan;
    var stringArray = this.plan.creationUser.name.split(/(\s+)/);
    this.planUserName = stringArray[0];
    this.calle = this.plan.location.street;
    this.ciudad = this.plan.location.city;
    this.assistantsNumber = this.plan.participants.length;
    
    stringArray = this.plan.title.split(" ");
    this.firstWordTitle = stringArray[0];
    this.title = this.plan.title;
    this.title = this.title.replace(this.firstWordTitle,"");

    this.actualizarPlanInfo(planTitle,planLocation,planCreator,planDetail);
    this.planNumber++;
   } 
  }
 
  
  añadirmeAPlan(id: string) {
    this.user.acceptedPlans.push(id);
    this.plan.participants.push(this.user.id);
    this.crudService.añadirPlanAUsuario(this.user);
    this.crudService.añadirUsuarioAPlan(this.plan);
  }
  

  rechazarPlan(id: string) {
    this.user.rejectedPlans.push(id);
    this.crudService.añadirPlanRechazado(this.user);
  }

  

}


