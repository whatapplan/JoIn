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
  constructor(private auth: AuthService,
    private crud: CrudService,
    private alertController:AlertController,
    private router : Router,
    private nav: NavController,
    private aroute : ActivatedRoute,
    private ui : UiHelper) { 
      this.user = this.auth.loggedUser;
      let time= this.user.dateBirth as unknown as Timestamp;
      this.dateBirth = new Date(time.seconds*1000);
      this.edadperf = this.sacaredad();
      console.log(this.edadperf);
  }

  ngOnInit() {

  this.username = this.user.name;
  this.descrip=this.user.aboutMe;
  this.ciudad = this.user.city;
  this.numplans = this.user.createdPlans.length;
  // this.edadperf = 27;
  this.imagen = this.user.image;
  }

  sacaredad(){
    let timeDiff = Math.abs(Date.now() - <any>this.dateBirth);
        return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    
  }
  usuarioDesde(){

  let tiempo = this.user.userFrom;
 

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

