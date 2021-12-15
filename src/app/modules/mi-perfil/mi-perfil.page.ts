import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';

import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
 
  user : User;
  user_id: string;
  username: string;
  imagen: string;
  descrip:string;
  ciudad:string;
  numplans:number;
  edadperf:number;
  dateBirth : any;
  userFrom: any;
  año: number;
  usuariaDesde: String;
  constructor(private auth: AuthService,
    private crud: CrudService,
    private alertController:AlertController,
    private router : Router,
    private nav: NavController,
    private aroute : ActivatedRoute,
    private ui : UiHelper) { 
      this.user = this.auth.loggedUser;
      let time= this.user.dateBirth as unknown as Timestamp;
     let tiempoDesde = this.user.userFrom as unknown as Timestamp;
    this.userFrom = new Date(tiempoDesde.seconds*1000);
    
      this.dateBirth = new Date(time.seconds*1000);
      this.edadperf = this.sacaredad();
      console.log(this.edadperf);
      console.log(this.userFrom.getFullYear());
      
  }

  ngOnInit() {

  this.username = this.user.name;
  this.descrip=this.user.aboutMe;
  this.ciudad = this.user.city;
  this.numplans = this.user.createdPlans.length;
  // this.edadperf = 27;
  this.imagen = this.user.image;
 this.usuariaDesde = "Usuaria desde" + " " + this.sacarMes() + " "+ "de" + " " + this.userFrom.getFullYear();
  
  }

  sacaredad(){
    let timeDiff = Math.abs(Date.now() - <any>this.dateBirth);
        return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    
  }
  sacarMes(){
    if(this.userFrom.getMonth()==1){
      return "Enero"
    }
    if(this.userFrom.getMonth()==2){
      return "Febrero"
    }
    if(this.userFrom.getMonth()==3){
      return "Marzo"
    }
    if(this.userFrom.getMonth()==4){
      return "Abril"
    }
    if(this.userFrom.getMonth()==5){
      return "Mayo"
    }
    if(this.userFrom.getMonth()==6){
      return "Junio"
    }
    if(this.userFrom.getMonth()==7){
      return "Julio"
    }
    if(this.userFrom.getMonth()==8){
      return "Agosto"
    }
    if(this.userFrom.getMonth()==9){
      return "Septiembre"
    }
    if(this.userFrom.getMonth()==10){
      return "Octubre"
    }
    if(this.userFrom.getMonth()==11){
      return "Noviembre"
    }
    if(this.userFrom.getMonth()==12){
      return "Diciembre"
    }


 

  }
 
  closeSession() {
    this.auth.eraseLoggedUser();
    this.ui.presentLoading('reloading')
    this.router.navigate(['/home']).finally(() => {
      window.location.reload();
      this.ui.dismissLoading('reloading');
    });
  }
  
}

