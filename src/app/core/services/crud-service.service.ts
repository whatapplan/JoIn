import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Plan } from 'src/app/core/models/plan';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private ngFirestore: AngularFirestore, private plan: Plan) {}

  uploadPlan(plan: Plan) {
    this.ngFirestore.collection('planes').add(Object.assign({}, plan));
  }

  getPlanes() {
    //return getDocs(query(collection(db, 'planes'), where("category","==",category)))
    return this.ngFirestore.collection('planes').snapshotChanges();
  }

  checkEmail(email: string) {
    const usuarios: Usuario[] = [];
    this.ngFirestore
      .collection('usuario', (ref) => {
        return ref.where('email', '==', email);
      }).snapshotChanges().subscribe((res) => {res.map((t) => {
          let usuario = {
            id: t.payload.doc.id,
            ...(t.payload.doc.data() as Usuario),
          };
          usuarios.push(usuario);
        });
      });
     if (usuarios[0]!= null && usuarios[0].email == email){
        return false;
     } return true;
  }
}
