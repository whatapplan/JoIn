import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserSelectionModalComponent } from '../components/user-selection-modal/user-selection-modal.component';
import { AuthService } from '../services/auth.service';
import { UiHelper } from '../services/helpers/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  url = '';
  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.loggedUser) {
      return true;
    } else {
      this.url = state.url;
      this.selectUserModal();
    }
  }

  async selectUserModal() {
    const modal = await this.modalController.create({
      component: UserSelectionModalComponent,
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.auth.setLoggedUser(data);
        this.router.navigate([this.url]);
      }
    });

    await modal.present();
  }
}
