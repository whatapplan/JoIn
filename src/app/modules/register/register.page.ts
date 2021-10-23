import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { User} from 'src/app/core/models/usuario';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string= "";
  password: string= "";
  name:string= "";
  lastName:string= "";
  dateBirth:Date= null;
  
  constructor(private crudService : CrudService) { }

  registrarUsuario(){
    if(this.name != null && this.lastName != null && this.password != null && this.email != null && this.dateBirth != null ){
      console.log('verficar campos');
      if(this.crudService.checkEmail(this.email) == true){
          console.log(this.email + 'repetido');
      }else{
        if(this.formatoCorreo(this.email)){
          
        }

      }
    }else {console.log('incompleto');}
  }
  formatoCorreo(email: string) {return true;}
  addToDB(user:User){

  }
  ngOnInit() {
  }

}

