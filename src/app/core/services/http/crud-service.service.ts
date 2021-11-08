import { Injectable } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TagCategory } from '../../models/tag';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  
  constructor(private ngFirestore: AngularFirestore) {}

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
        map((plan) => ({ ...plan, createdBy: 'Alicia' }))
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
