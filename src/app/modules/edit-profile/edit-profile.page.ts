import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { AlertController } from '@ionic/angular';
import { User} from 'src/app/core/models/usuario';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

email: string= "";
password: string= "";
name:string= "";
lastName:string="";
city:string="";
dateBirth:string= "";
//usuario: User=this.crudService.getUser("juan@gmail.com");

  constructor(private crudService : CrudService, public alertController: AlertController) { }

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
  

  //this.name = this.usuario.name;




  }
  actualizarUsuario(){}

}
