import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Save logged in user data
  public userData: any;
  public userUid : string;
  public isLoggedin = false;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {
    afAuth.onAuthStateChanged(res => {  // Auth에 변화가 감지될 시에
      this.afAuth.currentUser.then(async user => {  // 지금 유저를 본다.
        if (user) { // 지금 유저가 있다?
          this.userData = user;
          this.userUid = this.userData.uid;
          this.isLoggedin = true;
          localStorage.setItem('user', JSON.stringify(this.userData));
          localStorage.setItem('userUid', JSON.stringify(this.userData.uid));
          JSON.parse(localStorage.getItem('user'));
          JSON.parse(localStorage.getItem('userUid'));
          console.log("service - user's email is : ", JSON.stringify(this.userData.email));
        } else {
          console.log("authService : 유저 없음");
        }
      })
    })

  }

  // 로그인 기능
  SignIn(email: string, password: string) {
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return this.afAuth.signInWithEmailAndPassword(email, password)
          .then((result) => {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('userUid', JSON.stringify(this.userUid));
            this.isLoggedin = true;
            console.log(this.userUid);
            alert("로그인했습니다.")
            this.router.navigate(['home']);
            this.SetUserData(result.user);
            location.reload();
          }).catch((error) => {
            window.alert(error.message)
          })
      })
  }

  // 이메일 회원가입 기능
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.isLoggedin = true;
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // 구글로 로그인 기능
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // 이메일로 확인 메일 보내는 기능
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  // 비밀번호 찾기
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {

        this.router.navigate(['home']);

        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  // 로그아웃
  SignOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userUid');
      console.log(localStorage.getItem('user'));
      alert("로그아웃했습니다.")
      location.reload();
      this.router.navigate(['login']);
    })
  }

}

