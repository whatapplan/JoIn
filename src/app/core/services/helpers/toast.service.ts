import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiHelper {
  loading;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async presentLoading(opts?) {
    this.loading = await this.loadingController.create(opts);
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) await this.loading.dismiss();
  }

  async presentToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }
}
