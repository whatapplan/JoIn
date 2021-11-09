import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiHelper {

  isLoading = false;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}


  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }

  async presentLoading(id?: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      id
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading(id?: string) {
    this.isLoading = false;
    return await this.loadingController.dismiss(null, null, id).then(() => console.log('dismissed'));
  }
}
