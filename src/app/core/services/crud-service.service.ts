import { Injectable } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { collection, getDocs, query, where } from "firebase/firestore";
import { AngularFirestore, QueryFn} from '@angular/fire/compat/firestore';
import { Tag, TagCategory } from 'src/app/core/models/tag';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  // private itemsRef: AngularFirestoreCollection<Plan>;
  constructor(private ngFirestore: AngularFirestore, private plan : Plan) {
  }

  uploadPlan(plan : Plan){
    this.ngFirestore.collection('planes').add(Object.assign({},plan));
  }

  uploadCategory(tag : TagCategory){
    this.ngFirestore.collection('tagCategory').add(Object.assign({},tag));
  }


  getPlanes() {
    return this.ngFirestore.collection('planes').snapshotChanges();
    
    // return this.ngFirestore.collection('planes', (ref) =>{
    //   return ref.where('city','==','Madrid').
    //   where('category', '==', 'Golf');
    // }).snapshotChanges();

  }

  getTagCategories(){
    return this.ngFirestore.collection('tagCategory').snapshotChanges();
  }

  getRecommendedPlans(categories: string[]){
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
    const q = query(usuariosRef, where("email", "==", email));
    const querySnapshot =  await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let usuario = {
        id: doc.id,
        ...(doc.data() as User),
      };
      usuarios.push(usuario);
      console.log(doc.id, " => ", doc.data());
    });
   
    if(usuarios.length > 0){return true;}
    else return false;
  }
  uploadUser(user){
    this.ngFirestore.collection('usuario').add(Object.assign({}, user));
  }

  async checkUser(email: string, password: string){
    const usuarios: User[] = [];
    const usuariosRef = collection(this.ngFirestore.firestore, 'usuario');
    const q = query(usuariosRef, where("email", "==", email),where("password", "==", password) );
    const querySnapshot =  await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let usuario = {
        id: doc.id,
        ...(doc.data() as User),
      };
      usuarios.push(usuario);
      console.log(doc.id, " => ", doc.data());
    });
    if(usuarios.length > 0){return true;}
    else return false;
  }
}
