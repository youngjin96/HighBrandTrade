import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  name !: string;
  birth !: string;
  email !: string;
  password !: string;
  isFull = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  birthFormControl = new FormControl('', [
    Validators.maxLength(6),
    Validators.minLength(6),
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  
  constructor() { }

  clickEnroll(){
    console.log(this.name, this.birth, this.email, this.password);
    if(this.name === undefined || this.birth === undefined || this.email === undefined || this.password === undefined){
      console.log("fail");
      console.log(this.isFull);
    } 
    else{
      console.log("success");
      this.isFull = true;
      console.log(this.isFull);
    }
  }

  ngOnInit(): void {
  }

}
