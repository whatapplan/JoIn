import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
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
  imagen : string;
  descrip:string;
  ciudad:string;
  numplans:number;
  edadperf:number;
  dateBirth: Date;
  constructor(private auth: AuthService,
    private crud: CrudService,
    private alertController:AlertController,
    private router : Router,
    private nav: NavController,
    private aroute : ActivatedRoute) { 
      this.user = this.auth.loggedUser;
  }

  ngOnInit() {

  this.username = this.user.name;
  this.descrip=this.user.aboutMe;
  this.ciudad = this.user.city;
  this.numplans = this.user.createdPlans.length;
  this.edadperf = this.sacaredad();
  this.imagen = "https://thispersondoesnotexist.com/image";
  }

  sacaredad(){
   
    let dateToday = new Date() ;
    let milisec = dateToday.getTime();
    let dateTime = new Date(this.user.dateBirth);
    let milisecBirth = dateTime.getTime();
    let years = milisec - milisecBirth;
    let date = new Date(years);  
    return date.getFullYear()-1970;
    
  }
 
    
  
}

