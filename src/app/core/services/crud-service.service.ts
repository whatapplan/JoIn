import { Injectable } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { Plan } from 'src/app/core/models/plan';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private ngFirestore: AngularFirestore, private plan : Plan) {
  }


  uploadPlan(plan : Plan){
    this.ngFirestore.collection('planes').add(Object.assign({},plan));
  }

  getPlanes() {
    //return getDocs(query(collection(db, 'planes'), where("category","==",category)))
    return this.ngFirestore.collection('planes').snapshotChanges();
  }
}


