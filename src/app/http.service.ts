import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Candidate } from './Interfaces/candidate';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  getFirestore,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: 'AIzaSyAxoyK2wpDTiMfVfMXW1oq0StlWMqjyy9U',
  authDomain: 'student-registration-7b420.firebaseapp.com',
  projectId: 'student-registration-7b420',
  storageBucket: 'student-registration-7b420.appspot.com',
  messagingSenderId: '865445354329',
  appId: '1:865445354329:web:71541157a7654f57294a48',
});
const db = getFirestore(app);
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private firestore: AngularFirestore) {}

  getStudentDoc(id: any) {
    return this.firestore
      .collection('student-collection')
      .doc(id)
      .valueChanges();
  }
  getStudentList() {
    // const querySnapshot = await getDocs(collection(db, 'cities'));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // return querySnapshot;
    return this.firestore.collection('student-collection').snapshotChanges();
  }
  createStudent(student: any) {
    return new Promise<any>((reject, resolve) => {
      this.firestore
        .collection('student-collection')
        .add(student)
        .then(
          (res) => {
            console.log(res);
          },
          (err) => reject(err)
        );
    });
  }

  deleteStudent(id: any) {
    return this.firestore.collection('student-collection').doc(id).delete();
  }

  updateStudent(student: any, _id: any) {
    console.log(_id);
    return this.firestore
      .collection('student-collection')
      .doc(_id)
      .update(student);
  }
}
