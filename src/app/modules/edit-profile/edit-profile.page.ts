import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/core/models/usuario';
import { ModalController } from '@ionic/angular';
import { Tag } from 'src/app/core/models/tag';
import { TagsModalComponent } from 'src/app/core/components/tags-modal/tags-modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { Router } from '@angular/router';

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
  user: User;
  tagsModal;
  selectedTags: Tag[] = [];
  
  constructor(
    private crudService: CrudService,
    public alertController: AlertController,
    private auth: AuthService,
    private modalController: ModalController,
    private ui: UiHelper,
    private router: Router
  ) {
    this.user = this.auth.loggedUser;
    this.name = this.user.name;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.dateBirth = this.user.dateBirth;
    this.city = this.user.city;
    this.password = this.user.password;
    this.selectedTags = this.user.favCategories;
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
      this.presentAlert('Debe ser mayor de 18 a??os', 'Error');
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
    // (await this.crudService.getUser('juan@gmail.com')).subscribe((res) => {
    //   res.map((t) => {
    //     let user = {
    //       id: t.payload.doc.id,
    //       ...(t.payload.doc.data() as User),
    //     };
    //     this.usuarios.push(user);
    //     if (this.usuarios.length > 0) {
    //       this.usuario = this.usuarios[0];
    //       this.name = this.usuario.name;
    //       this.lastName = this.usuario.lastName;
    //       this.email = this.usuario.email;
    //       this.dateBirth = this.usuario.dateBirth;
    //       this.city = this.usuario.city;
    //       this.password = this.usuario.password;
    //       this.selectedTags = this.usuario.favCategories;
    //     }
    //   });
    // });
  }
  leterFormat(cadena: string) {
    let stringRegex = /^[a-zA-Z??-??]+$/;
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

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter((item) => item != tag);
    this.user.favCategories = this.user.favCategories.filter(
      (item) => item != tag
    );
  }

  async openTagsModal() {
    let res;
    const modal = await this.modalController.create({
      component: TagsModalComponent,
      componentProps: { data: this.selectedTags },
    });
    modal.onWillDismiss().then(({ data }) => {
      this.selectedTags = data;
    });
    await modal.present();
  }

  async actualizarUsuario() {
    this.user.name = this.name;
    this.user.lastName = this.lastName;
    this.user.email = this.email;
    this.user.dateBirth = this.dateBirth;
    this.user.city = this.city;
    this.user.password = this.password;
    this.selectedTags.forEach((tag) => {
      let existe: Boolean = false;
      for (let i = 0; i < this.user.favCategories.length; i++) {
        if (this.user.favCategories[i] == tag) {
          existe = true;
        }
      }
      if (!existe) {
        this.user.favCategories.push(tag);
      }
    });

    if (
      this.checkData() &&
      this.leterFormat(this.user.name) &&
      this.leterFormat(this.user.lastName) &&
      this.leterFormat(this.user.city) &&
      this.emailFormat(this.user.email)
    ) {
      this.crudService.upgradeUser(this.user);
      this.auth.setLoggedUser(this.user);
      this.presentAlert('Su usuario ha sido actualizado', '');
    }
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