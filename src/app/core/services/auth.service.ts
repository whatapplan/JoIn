import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../models/usuario';
import { UiHelper } from './helpers/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setLoggedUser(user: IUser) {
    this.loginFireauth(user.email,user.password);
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.ui.presentToast('Bienvenido ' + user.name + ' :)');
  }
  eraseLoggedUser() {
    localStorage.removeItem('loggedUser');
    this.ui.presentToast('Has cerrado sesión');
  }
  get loggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  constructor(
    public auth: AngularFireAuth,
    private ngFirestore: AngularFirestore,
    private ui: UiHelper
  ) {}

  loginFireauth(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  getUsers() {
    return this.ngFirestore
      .collection('usuario')
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((planItem: any) => ({
            id: planItem.payload.doc.id,
            ...planItem.payload.doc.data(),
          }))
        )
      ) as Observable<IUser[]>;
  }

  getUserById(id: string) {
    return this.ngFirestore
    .collection('usuario')
    .doc(id)
    .get()
    .pipe(
      map((data: any) => data.data()),
    );
  }
}
