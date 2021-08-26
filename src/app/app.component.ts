import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HBT';
  isLoggedin : boolean;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
  ) {
    //this.loginCheck();
    if(localStorage.getItem('user')){
      this.isLoggedin = true;
    } else{
      this.isLoggedin = false;
    }
    console.log("app.component, this.isLoggedin :",this.isLoggedin);
  }

  // async loginCheck(){
  //   await this.afAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.isLoggedin = true;
  //       console.log("onAuthStateChanged ", this.isLoggedin);
  //     } else {
  //       this.isLoggedin = false;
  //       console.log("onAuthStateChanged ", this.isLoggedin);
  //     }
  //   })
  // }
}

