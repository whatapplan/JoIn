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
  city:string= "";
  dateBirth: string = new Date().toISOString();
  
  constructor(private crudService : CrudService) { }

  registrarUsuario(){
    this.checkAge();
    if(this.checkData() && this.checkAge() ){
      console.log('campos verificados');
      if(!this.checkEmail(this.email)){
          console.log(this.email + ' repetido');
      }else{
        this.createUser();
        console.log('usuario creado'); 
      }
    }else {console.log('incompleto');}
  }


  checkData(){
    if(this.name != null && this.lastName != null && this.password != null && this.email != null && this.dateBirth != null && this.city != null ){
      if(this.name.length > 1 && this.lastName.length > 1 && this.password.length > 1 && this.email.length > 1 && this.city.length > 1){
        return true ;
      }
    } return false ;
  }


  checkAge(){
    let dateToday = new Date() ;
    let milisec = dateToday.getTime();
    let dateTime = new Date(this.dateBirth);
    let milisecBirth = dateTime.getTime();
    let years = milisec - milisecBirth;
    let date = new Date(years);  
    if(date.getFullYear() -1970 >= 18 ){
      return true;
    }
    else{
        console.log('Menos de edad');
        return false;
    } 
  }


  createUser(){
    let newUser = new User() ;
    newUser.email = this.email;
    newUser.password = this.password;
    newUser.name = this.name;
    newUser.lastName= this.lastName;
    newUser.dateBirth = new Date(this.dateBirth);
    newUser.city = this.city;
    this.crudService.uploadUser(newUser);
  }

  checkEmail(email){
    if(this.crudService.checkEmail(email) == false){
      return true;
    }
    return false;
  }


  ngOnInit() {
  }

}

