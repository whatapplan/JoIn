import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  [x: string]: any;
  name: string = '';
  email: string = '';
  password: string = '';
  lastName: string = '';
  city: string = '';
  dateBirth: Date = new Date();
  //usuario: User=this.crudService.getUser("juan@gmail.com");
  usuarios: User[] = [];
  usuario: User;
  constructor(
    private crudService: CrudService,
    public alertController: AlertController  ) {
   
  }

  checkData() {
    if (
      this.name != null &&
      this.lastName != null &&
      this.password != null &&
      this.email != null &&
      this.dateBirth != null &&
      this.city != null
    ) {
      if (
        this.name.length > 1 &&
        this.lastName.length > 1 &&
        this.password.length > 1 &&
        this.email.length > 1 &&
        this.city.length > 1
      ) {
        return true;
      }
    }
    this.presentAlert('Debe completar todos los campos', 'Error');
    return false;
  }

  checkAge() {
    let dateToday = new Date();
    let milisec = dateToday.getTime();
    let dateTime = new Date(this.dateBirth);
    let milisecBirth = dateTime.getTime();
    let years = milisec - milisecBirth;
    let date = new Date(years);
    if (date.getFullYear() - 1970 >= 18) {
      return true;
    } else {
      this.presentAlert('Debe ser mayor de 18 años', 'Error');
      console.log('Menos de edad');
      return false;
    }
  }

  async presentAlert(message: string, titulo: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: titulo,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async ngOnInit() {
    (await this.crudService.getUser('juan@gmail.com')).subscribe((res) => {
      res.map((t) => {
        let user = {
          id: t.payload.doc.id,
          ...(t.payload.doc.data() as User),
        };
        this.usuarios.push(user);
        if (this.usuarios.length > 0) {
          this.usuario = this.usuarios[0];
          this.name = this.usuario.name;
          this.lastName = this.usuario.lastName;
          this.email = this.usuario.email;
          this.dateBirth = this.usuario.dateBirth;
          this.city = this.usuario.city;
          this.password = this.usuario.password;
        }
      });
    });
  }
  leterFormat(cadena: string) {
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
  emailFormat(email: string) {
    let emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
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

  async checkEmail(email: string) {
    if (await this.crudService.checkEmail(email)) {
      this.presentAlert('Este correo ya esta en uso: ' + email, 'Error');
      console.log(this.email + ' esta repetido');
      return true;
    }
    return false;
  }

  async actualizarUsuario() {
    this.usuario.name = this.name;
    this.usuario.lastName = this.lastName;
    this.usuario.email = this.email;
    this.usuario.dateBirth = this.dateBirth;
    this.usuario.city = this.city;
    this.usuario.password = this.password;
    if (
      this.checkData() &&
      this.leterFormat(this.usuario.name) &&
      this.leterFormat(this.usuario.lastName) &&
      this.leterFormat(this.usuario.city) &&
      this.emailFormat(this.usuario.email)
    ) {
      this.crudService.upgradeUser(this.usuario);
      this.presentAlert('Su usuario ha sido actualizado', '');
    }
  }
}
