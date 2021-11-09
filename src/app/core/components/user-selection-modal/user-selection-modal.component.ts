import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { IUser } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { UiHelper } from '../../services/helpers/toast.service';

@Component({
  selector: 'app-user-selection-modal',
  templateUrl: './user-selection-modal.component.html',
  styleUrls: ['./user-selection-modal.component.scss'],
})
export class UserSelectionModalComponent implements OnInit {
  users: IUser[] = [];
  constructor(
    private auth: AuthService,
    private ui: UiHelper,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.ui.presentLoading('getting-users');
    this.auth.getUsers().subscribe((users) => {
      this.users = users;
      this.ui.dismissLoading('getting-users');
    });
  }
  async selectUser(user: IUser) {
    this.auth.setLoggedUser(user);
    await this.modalController.dismiss(user);
  }
}
