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
    if(localStorage.getItem('user')){
      this.isLoggedin = true;
      console.log("app.component : 유저 있음");
    } else{
      this.isLoggedin = false;
      console.log("app.component : 유저 없음");
    }
  }
}

