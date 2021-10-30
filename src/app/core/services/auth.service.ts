import { Injectable } from '@angular/core';
import {Auth} from 'firebase/auth';
import * as firebase  from '@firebase/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario : User= new User();
  constructor(public auth: AngularFireAuth){
        
  }

  loginFireauth(email:string , password:string){
          this.auth.signInWithEmailAndPassword(email, password).then(response =>{
            console.log(response)
            //this.usuario = response.
          }).catch(error =>{console.log(error)})        

  }
}
