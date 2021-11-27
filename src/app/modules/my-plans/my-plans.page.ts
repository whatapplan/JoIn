import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.page.html',
  styleUrls: ['./my-plans.page.scss'],
})
export class MyPlansPage implements OnInit {
  user_id :string;
  user: User;
  idCreados: string[];
  planesCreados: Plan[];
  plansCreados: Plan[];
  idsPlan: string[] = [];
  planes: Plan[] = [];
  plans: Plan[] =[];
 private slideOpt ={
   slidesPerView:2
 }
  constructor(private auth: AuthService,
    private crud: CrudService,
    private alertController:AlertController,
    private router : Router,
    private nav: NavController,
    private aroute : ActivatedRoute) { 
      this.user_id = this.auth.loggedUser.id
      aroute.params.subscribe(()=>{
        console.log(`hola mano ${new Date().getTime()}`)
        this.user = this.auth.loggedUser
        this.ngOnInit()
      })
  }

  async ngOnInit() {

    this.idsPlan = this.user.acceptedPlans;
    console.log(this.idsPlan)
    this.planes = await this.crud.getMyPlans(this.idsPlan);
    this.planes.reverse()
    this.plans = this.planes;
    this.idCreados = this.user.createdPlans;
    this.planesCreados = await this.crud.getPlansCreatedBy(this.user.id);
    this.plansCreados = this.planesCreados;
 }


 async showAlert(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Ten cuidado',
    message: 'No estás en nigún plan manito',
    buttons: ['OK']
  });
  await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
 }

  async goToMyChats(){
   if(this.planes.length == 0){
     this.showAlert()
   }else{
    return this.router.navigate(['my-chats'], {
      queryParams:{list:JSON.stringify(this.planes)}
    })
   }
 }

 identify(index, item){
  return item.title; 
}

 async openPlan({id}){
      // if(this.plans.length!=0){

      //   return this.router.navigate(['plan-detail'],{
      //     queryParams:{list:JSON.stringify(this.plans)}});
      //   }
        const route = `/plan/${id}`;
        this.nav.navigateForward(route);
      
}

}
