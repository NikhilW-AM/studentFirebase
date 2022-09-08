import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {Auth ,GoogleAuthProvider } from '@angular/fire/auth';
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, getRedirectResult,signInWithPopup } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleAuth = getAuth();
  provider = new GoogleAuthProvider()
  constructor(private auth: Auth, private afa: AngularFireAuth,private router: Router) {
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password).then(userCredentials => {
      const user = userCredentials.user
      //console.log(user.accessToken)
      return { user: user,status:true}
    }).catch((error) => {

      const errorMessage = error.message;
      return { error: errorMessage }
    }))
  }

  signupUserWithEmailAndPassword(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return { user: user }
      })
      .catch((error) => {
        const errorMessage = error.message;
        return { error: errorMessage }
      }));
  }

  loginWithGoogle() {
    return from(signInWithPopup(this.googleAuth,this.provider)
    .then((result:any) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      return { user:user, token:token,status:true}
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      return { error:errorMessage, credential:credential}
    }))
    //return this.googleAuth(new GoogleAuthProvider());
    // return from(this.afa.signInWithPopup(new GoogleAuthProvider()).then((result:any) => {
    //   //This gives you a Google Access Token. You can use it to access Google APIs.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential?.accessToken;
    //   const user = result.user;
    //   console.log(token)
    //   if (token) {
    //     return { user: user,token: token}
    //   }
    //   return
    // }).catch((error: any) => {

    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   return  { errorCode:errorCode, errorMessage:errorMessage, credential:credential}
    // }))
  }
  logout() {
    localStorage.clear()
    return from(this.auth.signOut())
  }
}
