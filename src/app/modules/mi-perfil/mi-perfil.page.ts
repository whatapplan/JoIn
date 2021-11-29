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
  }
 
    
  
}

