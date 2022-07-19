import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/usuario';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string = '';
  password: string = '';
  user: IUser;
  constructor(
    private crudService: CrudService,
    public alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private ui: UiHelper
  ) {
    this.user = this.auth.loggedUser;
  }

  async iniciarSesion() {
    if (await this.crudService.checkUser(this.email, this.password)) {
      this.presentAlert('Has iniciado sesion', 'Confirmacion');
    } else {
      this.presentAlert('Usuario o contraseña incorrectos', 'Error');
    }
  }

  iniciarSesionFire() {
    console.log('am logged in');
    try {
      this.auth.loginFireauth(this.email, this.password);
    } catch (err) {}
  }

  ngOnInit() {}

  async presentAlert(message: string, titulo: string) {
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: titulo,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  closeSession() {
    this.auth.eraseLoggedUser();
    this.ui.presentLoading('reloading')
    this.router.navigate(['/home']).finally(() => {
      window.location.reload();
      this.ui.dismissLoading('reloading');
    });
  }
}
