import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string= "";
  password: string= "";
  nombre:string= "";
  apellidos:string= "";
  fechaNacimiento:Date;
  private crudService : CrudService;
  constructor() { }
  
  registrarUsuario(){
    if(this.nombre != null && this.apellidos != null && this.password != null && this.email != null && this.fechaNacimiento != null ){
      if(this.crudService.checkEmail(this.email)== false){}
    }
  }
  ngOnInit() {
  }

}
