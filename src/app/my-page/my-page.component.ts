import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Timestamp } from 'rxjs';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  nickName : string;
  gender : string;
  birth : Timestamp<any>;
  constructor(
    public authService: AuthService,
    private db: AngularFirestore,
  ) {}

  async changeNickName(){
    const res = await this.db.collection('users').doc(this.authService.userData.uid).set({displayName:this.nickName}, { merge: true });
  }
  async changeGender(){
    const res = await this.db.collection('users').doc(this.authService.userData.uid).set({gender:this.gender}, { merge: true });
  }
  async changeBirth(){
    const res = await this.db.collection('users').doc(this.authService.userData.uid).set({birth:this.birth}, { merge: true });
  }
  
  ngOnInit(): void {
  }

}
