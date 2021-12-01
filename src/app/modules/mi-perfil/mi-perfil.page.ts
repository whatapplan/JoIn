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
  imagen: string;
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
  this.imagen = this.user.image;
  }

  sacaredad(){
   
    let dateToday = new Date() ;
    let año = dateToday.getFullYear();
    let mes = dateToday.getMonth();
    let dia = dateToday.getDay();
   console.log(año);
   console.log(mes);
   console.log(dia);
   let dateB = new Date(this.user.dateBirth);
   console.log(this.user.dateBirth);
    console.log(dateB);
    let añob = dateB.getFullYear();
    let mesb = dateB.getMonth();
    let diab = dateB.getDay();
    console.log(añob);
   console.log(mesb);
   console.log(diab);
   

    
    return (año-añob);
    
  }
 
    
  
}

