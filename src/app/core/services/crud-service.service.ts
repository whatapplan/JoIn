import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private ngFirestore: AngularFirestore, private plan: Plan) {
    
  }

  uploadPlan(plan: Plan) {
    this.ngFirestore.collection('planes').add(Object.assign({}, plan));
  }

  getPlanes() {
    //return getDocs(query(collection(db, 'planes'), where("category","==",category)))
    return this.ngFirestore.collection('planes').snapshotChanges();
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


  checkEmail(email: string) {
    const usuarios: User[] = [];
    this.ngFirestore
      .collection('usuario', (ref) => {
        return ref.where('email', '==', email);
      }).snapshotChanges().subscribe((res) => {res.map((t) => {
          let usuario = {
            id: t.payload.doc.id,
            ...(t.payload.doc.data() as User),
          };
          usuarios.push(usuario);
        });
      });
     if (usuarios[0]!= null && usuarios[0].email == email){
        return false;
     } return true;
  }
  uploadUser(user){
    this.ngFirestore.collection('usuarios').add(Object.assign({}, user));
  }
}
