import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl1 = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  passwordFormControl2 = new FormControl('', [
    Validators.required,
  ]);

  constructor (public authService: AuthService) {}


  ngOnInit(): void {
  }

}
