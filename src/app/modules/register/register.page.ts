import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { Usuario } from 'src/app/core/models/usuario';


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
  fechaNacimiento:Date= null;
  private crudService : CrudService;
  constructor() { }

  registrarUsuario(){
    if(this.nombre != null && this.apellidos != null && this.password != null && this.email != null && this.fechaNacimiento != null ){
      console.log(this.email);
      if(this.crudService.checkEmail(this.email) == true){
          console.log(this.email);
      }
    }else {console.log('incompleto');}
  }
  ngOnInit() {
  }

}
