import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoggedin : boolean;

  constructor(
    router : Router,
  ) {
    if(localStorage.getItem('user')){
      console.log("HomeComponent : 유저 있음");
      this.isLoggedin = true;
    } else{
      alert("로그인해주세요.");
      router.navigate(['/login']);
      console.log("HomeComponent : 유저 없음");
    }
  }

  ngOnInit(): void {
  }

}
