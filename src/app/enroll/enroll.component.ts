import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Timestamp } from 'rxjs';

export class User {
  name !: string;
  birth !: Timestamp<any>;
  email !: string;
  password !: string;
  gender !: string;
}

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  name !: string;
  birth !: Timestamp<any>;
  email !: string;
  password !: string;
  gender !: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  public userForm !: FormGroup;

  constructor(
    private database : AngularFirestore,
    public formBuilder: FormBuilder,
    ) {this.userForm = this.formBuilder.group({
        name: [''],
        birth: [''],
        email: [''],
        password: [''],
        gender: ['']
      })
     }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) =>{
      this.database
        .collection("user")
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  clickEnroll(){
    this.createUser(this.userForm.value);
    console.log("success");
  }

  clickMan(){
    console.log("click man");
    this.gender = "man";
  }

  clickWoman(){
    console.log("click woman");
    this.gender = "woman";
  }
  ngOnInit(): void {
  }

}
