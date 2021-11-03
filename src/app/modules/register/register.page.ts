import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { User} from 'src/app/core/models/usuario';
import { AlertController } from '@ionic/angular';

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
  dateBirth: string = "";
  
  constructor(private crudService : CrudService, public alertController: AlertController) { }

  async registrarUsuario(){
    if(this.checkData() && this.leterFormat(this.name) && this.leterFormat(this.lastName) && this.leterFormat(this.city) && this.checkAge() && this.emailFormat(this.email) ){
      console.log('campos verificados');
      if(await this.checkEmail(this.email)){
          console.log('repetido');
      }else{
        this.createUser();
        this.presentAlert('Usuario creado', 'Confirmacion');
        console.log('usuario creado'); 
      }
    }else {console.log('incompleto');}
  }


  checkData(){
    if(this.name != null && this.lastName != null && this.password != null && this.email != null && this.dateBirth != null && this.city != null ){
      if(this.name.length > 1 && this.lastName.length > 1 && this.password.length > 1 && this.email.length > 1 && this.city.length > 1){
        return true ;
      }
      
    }
    this.presentAlert('Debe completar todos los campos', 'Error'); 
    return false ;
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
      this.presentAlert('Debe ser mayor de 18 años', 'Error');
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


  async checkEmail(email: string) {
    if(await this.crudService.checkEmail(email)){
      this.presentAlert('Este correo ya esta en uso: '+ email, 'Error');
      console.log(this.email + ' esta repetido');
      return true;
    }return false;
  }  

  emailFormat(email: string){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(email)) {
      console.log('valido');
      return true;
    } else {
      this.presentAlert('Correo no valido', 'Error');
      console.log('valido no');
      return false;
    }
  }
  leterFormat(cadena: string){
    let stringRegex = /^[a-zA-ZÀ-ÿ]+$/;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (stringRegex.test(cadena)) {
      console.log('valida');
      return true;
    } else {
      this.presentAlert('Solo puede introducir letras', 'Error');
      console.log('valida no');
      return false;
    }
  }

  async presentAlert(message: string, titulo:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: titulo,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }
    
}

