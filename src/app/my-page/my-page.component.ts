import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  nickName: string;
  gender: string;
  birth: Timestamp<any>;
  phoneNumber: string;
  private itemCollection: AngularFirestoreCollection<any>;
  collections = new Array();
  isClickUserProfile: boolean;
  isClickGetOut: boolean;
  userUid = localStorage.getItem('userUid');
  splitUserUid: any;

  constructor(
    public authService: AuthService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    if (localStorage.getItem('user')) {
      const split = this.userUid.split('"');
      this.splitUserUid = split[1];
      this.getItem('users').subscribe((res) => {
        this.collections = res;
      });
    } else {
      alert("로그인해주세요.");
      router.navigate(['/login']);
    }
  }

  getItem(db_name: string) {
    this.itemCollection = this.db.collection<any>(db_name, (ref: CollectionReference) => {
      return ref.where('uid', '==', this.splitUserUid);
    });
    return this.itemCollection.valueChanges();
  }


  async changeNickName() {
    const res = await this.db.collection('users').doc(this.splitUserUid).set({ nickName: this.nickName }, { merge: true });
  }
  async changeGender() {
    const res = await this.db.collection('users').doc(this.splitUserUid).set({ gender: this.gender }, { merge: true });
  }
  async changeBirth() {
    const res = await this.db.collection('users').doc(this.splitUserUid).set({ birth: this.birth }, { merge: true });
  }
  async changePhoneNumber() {
    const res = await this.db.collection('users').doc(this.splitUserUid).set({ phoneNumber: this.phoneNumber }, { merge: true });
  }

  clickMan() {
    this.gender = "남";
  }
  clickWoman() {
    this.gender = "여";
  }

  clickUserProfile() {
    this.isClickGetOut = false;
    this.isClickUserProfile = true;
  }
  clickGetOut() {
    this.isClickUserProfile = false;
    this.isClickGetOut = true;
  }

  // 유저 authentication 삭제
  async getOut() {
    const user = await this.afAuth.currentUser;
    user.delete().then(() => {
      console.log("유저 삭제");
      localStorage.removeItem('user');
      localStorage.removeItem('userUid');
      this.router.navigate(['/login']);
      location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {

  }

}
