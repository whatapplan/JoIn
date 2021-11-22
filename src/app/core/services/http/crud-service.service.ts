import { Injectable } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TagCategory } from '../../models/tag';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import {arrayUnion} from 'firebase/firestore'

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  
  constructor(private ngFirestore: AngularFirestore, 
    private auth: AuthService, 
    private router : Router) {}

  uploadPlan(plan) {
    return this.ngFirestore.collection('planes').add(Object.assign({}, plan));
  }

  uploadNewPlan(plan) {
    return this.ngFirestore.collection('plans').add(plan);
  }

  uploadCategory(tag: TagCategory) {
    this.ngFirestore.collection('tagCategory').add(Object.assign({}, tag));
  }

  getPlans() {
    return this.ngFirestore.collection('plans').snapshotChanges();
  }

  getPlanById(id: string) {

    return this.ngFirestore
      .collection('plans')
      .doc(id)
      .get()
      .pipe(
        map((data: any) => data.data()),
        map((plan) => ({ ...plan, createdBy: 'Alicia' })),
      );
  }
  



  getTagCategories() {
    return this.ngFirestore.collection('tagCategory').snapshotChanges();
  }

  async getAllPlans() {
    const plans: Plan[] = [];
    const plansRef = collection(this.ngFirestore.firestore, 'plans');
    const q = query(plansRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let plan = {
        id: doc.id,
        ...(doc.data() as Plan),
      };
      plans.push(plan);
    });
    return plans;
  }



  async getMyPlans(idsPlan: string[]){
    const planes: Plan[] =[];

    for(let i=0;i<idsPlan.length;i++){
      if(idsPlan[i] != ""){
       await this.ngFirestore.collection('plans').doc(idsPlan[i]).get().forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let plan = {
          id: doc.id,
          ...(doc.data() as Plan),
        };
        planes.push(plan);
      });
      }
    }
    return planes;

  }


  // CHATS HANDLERS

  get(chatId){
    return this.ngFirestore
      .collection<any>('plans')
      .doc(chatId).collection('chat').doc('0')
      .snapshotChanges()
      .pipe(
        map(doc=>{
          return {
            id:doc.payload.id, ...doc.payload.data()
          };
        })
      );
  }
  async create(planId){
    const { id } = await this.auth.loggedUser;
    const data = {
      id,
      idSala : planId,
      createdAt: Date.now(),
      count : 0,
      messages:[]
    };
    await this.ngFirestore.collection('plans').doc(planId).collection('chat').doc('0').set(data);
    return this.router.navigate(['chat',planId]);
  }
  async sendMessage(chatId, content){
    const {id} = await this.auth.loggedUser;
    const {name} = await this.auth.loggedUser;
    const data = {
      id,
      name,
      content,
      createdAt : Date.now()
    };

    if(id){
      const ref = this.ngFirestore.collection('plans').doc(chatId).collection('chat').doc('0');
      return ref.update({messages:arrayUnion(data)})
    }
    //  FieldValue.arrayUnion(data)
  }

  joinUsers(chat$:Observable<any>){
    let chat;
    const joinKeys = {};
    return chat$.pipe(
      switchMap(c => {
        chat = c;
        const uids = Array.from (new Set(c.messages.map(v=> v.id)));
        const userDocs = uids.map(u =>
          this.ngFirestore.doc(`usuario/${u}`).valueChanges()
        );
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).id] = v));
        chat.messages = chat.messages.map(v=> {
          return {...v, user:joinKeys[v.id]};
        })
        return chat;
      }))
    }


  // CHATS HANDLERS

  getRecommendedPlans(categories: string[]) {
    // let fetchChats = async user_id => {
    //   let dbRef = this.ngFirestore.collection("planes")
    //   return dbRef;
    //   let response1 = await dbRef.where('uid', '==', user_id).get()
    //   let response2 = await dbRef.where('recipient_id', '==', user_id).get()
    //   let arr1 = response1.docChanges().map(element => element.doc.data())
    //   let arr2 = response2.docChanges().map(element => element.doc.data())
    //   let allChats = [...arr1, ...arr2]
    //   // make array unique by converting to an object
    //   let myplansObj = {}
    //   allChats.forEach(item => { myplansObj[item.chatid] = item })
    //   let myplans = Object.values(myplansObj)
    //   return myplans
  }

  async checkEmail(email: string) {
    const usuarios: User[] = [];
    const usuariosRef = collection(this.ngFirestore.firestore, 'usuario');
    const q = query(usuariosRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let usuario = {
        id: doc.id,
        ...(doc.data() as User),
      };
      usuarios.push(usuario);
    });

    if (usuarios.length > 0) {
      return true;
    } else return false;
  }
  uploadUser(user) {
    this.ngFirestore.collection('usuario').add(Object.assign({}, user));
  }

  upgradeUser(user) {
    this.ngFirestore.collection('usuario').doc(user.id).update({
      city: user.city,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      password: user.password,
      favCategories: user.favCategories,
    });
  }

  añadirUsuarioAPlan(plan) {
    this.ngFirestore.collection('plans').doc(plan.id).update({
      participants: plan.participants
    });
  }

  añadirPlanAUsuario(user) {
    this.ngFirestore.collection('usuario').doc(user.id).update({
      acceptedPlans: user.acceptedPlans,
    });
  }

  añadirPlanRechazado(user) {
    this.ngFirestore.collection('usuario').doc(user.id).update({
      rejectedPlans: user.rejectedPlans,
    });
  }
  async checkUser(email: string, password: string) {
    const usuarios: User[] = [];
    const usuariosRef = collection(this.ngFirestore.firestore, 'usuario');
    const q = query(
      usuariosRef,
      where('email', '==', email),
      where('password', '==', password)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let usuario = {
        id: doc.id,
        ...(doc.data() as User),
      };
      usuarios.push(usuario);
      console.log(doc.id, ' => ', doc.data());
    });
    if (usuarios.length > 0) {
      return true;
    } else return false;
  }

  async getUser(email: string) {
    return this.ngFirestore
      .collection('usuario', (ref) => {
        return ref.where('email', '==', email);
      })
      .snapshotChanges();
    // const usuarios: User[] = [];
    // const usuariosRef = collection(this.ngFirestore.firestore, 'usuario');
    // const q = query(
    //   usuariosRef,
    //   where('email', '==', email),

    // );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   let usuario = {
    //     id: doc.id,
    //     ...(doc.data() as User),
    //   };
    //   usuarios.push(usuario);
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // if (usuarios.length > 0) {
    //   return usuarios;
    // }
  }
}
