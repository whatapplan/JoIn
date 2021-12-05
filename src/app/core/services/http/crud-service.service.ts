import { Injectable } from '@angular/core';
import { IPlan, Plan } from 'src/app/core/models/plan';
import { IUser, User } from 'src/app/core/models/usuario';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tag, TagCategory } from '../../models/tag';
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
    return this.ngFirestore
    .collection('plans', ref=>ref.orderBy('when','desc'))
    .snapshotChanges();
  }

  getPlanById(id: string) {

    return this.ngFirestore
      .collection('plans')
      .doc(id)
      .get()
      .pipe(
        map((data: any) => ({
          id: data.id,
          ...data.data()
        })),
      );
  }
  



  getTagCategories() {
    return this.ngFirestore.collection('tagCategory').snapshotChanges();
  }

  async getAllPlans(id: string, tags: Tag[]) {
    const plans: Plan[] = [];
    const plans2: Plan[] = [];
    if(tags.length > 10){
    tags = tags.slice(0,9);}

    const plansRef = collection(this.ngFirestore.firestore, 'plans');
    const q = query(plansRef, where("participants", 'array-contains', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc) => {
      // doc.data() is never undefined for query doc snapshots
      let plan = {
        id: doc.id,
        ...(doc.data() as Plan),
      };
      plans.push(plan);
    });
    const q2= query(plansRef, where("tags","array-contains-any",tags));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(async(doc) => {
      // doc.data() is never undefined for query doc snapshots
      let plan = {
        id: doc.id,
        ...(doc.data() as Plan),
      };
      plans2.push(plan);
    }); 
    //const result = plans2.filter(plan => plans.includes(plan));
    const result= this.comprobarPlan(plans2, plans);
    
    return result;
  }

  comprobarPlan(plans : Plan[], plans2: Plan[]){
    let bool= false;
    let result: Plan[]=[];
    for(let i=0; i < plans.length; i++ ){
      bool= false;
      for(let j=0; j < plans2.length; j++){
        if(plans[i].id == plans2[j].id){
          bool=true;
        }
      }
      if(!bool){result.push(plans[i]);}
    }
    return result;
  }

  async getPlansCreatedBy(id : string){
    const plans: Plan[] = [];
    const plansRef = collection(this.ngFirestore.firestore, 'plans');
    const q = query(plansRef,where('createdBy', '==', id));
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

  async getImagesFromUsers(participants: string[]){
    const images : string[] = [];
    for(let i=0;i<participants.length;i++){
      if(participants[i] != ""){
       await this.ngFirestore.collection('usuario').doc(participants[i]).get().forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let s: User = doc.data() as User;
        images.push(s.image);
      });
      }
    }
    return images;
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
      .valueChanges()
    // return this.ngFirestore
    // .collection('plans')
    // .doc(chatId)
    // .collection('chat')
    // .doc('0')
    // .get()
  }

  getOnce(chatId){
    return this.ngFirestore
    .collection('plans')
    .doc(chatId)
    .collection('chat')
    .doc('0')
    .get()
  }

  async create(idPlan : string){
    let planId = idPlan.split('@')[0]
    const { id } = await this.auth.loggedUser;
    const data = {
      id,
      idSala : planId,
      createdAt: Date.now(),
      count : 0,
      messages:[]
    };
    await this.ngFirestore.collection('plans').doc(planId).collection('chat').doc('0').set(data);
    return this.router.navigate(['chat',idPlan]);
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

  añadirUsuarioAPlan({id, participants}: IPlan) {
    return this.ngFirestore.collection('plans').doc(id).update({
      participants: participants
    });
  }

  añadirPlanAUsuario({id, acceptedPlans}: IUser) {
    return this.ngFirestore.collection('usuario').doc(id).update({
      acceptedPlans: acceptedPlans,
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

  }

  async getUserById(id: string){
    const usuarios: User[] = [];
    const usuariosRef = this.ngFirestore.collection('usuario');
    let users =  usuariosRef.doc(id).get();
    await users.forEach(async (doc) => {
      let user ={
        id: doc.id,
        ...(doc.data() as User)
      }
      console.log(user);
      usuarios.push(user);
    })
    return usuarios;
  }
}
