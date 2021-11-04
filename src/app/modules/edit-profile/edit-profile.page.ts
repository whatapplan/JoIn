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
name: string="";
email: string= "";
password: string= "";
lastName:string="";
city:string="";
dateBirth:Date= new Date();
//usuario: User=this.crudService.getUser("juan@gmail.com");
usuarios : User[]=[];
usuario : User ;
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
  



  async ngOnInit() {
  (await this.crudService.getUser('juan@gmail.com')).subscribe((res) => {res.map((t)=>{
    let user = {
      id: t.payload.doc.id,
      ...t.payload.doc.data() as User
    }
    this.usuarios.push(user);
    if(this.usuarios.length > 0){
      this.usuario = this.usuarios[0];
      this.name = this.usuario.name;
      this.lastName = this.usuario.lastName;
      this.email = this.usuario.email;
      this.dateBirth = this.usuario.dateBirth;
      this.city = this.usuario.city;
      this.password = this.usuario.password;
    }
    })});
    
    
  }
  actualizarUsuario(){}

}
