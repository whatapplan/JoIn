import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private crudService: CrudService,
    public alertController: AlertController,
    private auth: AuthService
  ) {}

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
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: titulo,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
