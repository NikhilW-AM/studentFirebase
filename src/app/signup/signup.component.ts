import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private _fb:FormBuilder, private _auth:AuthService,private _router:Router) { }

  signupForm!: FormGroup;
  ngOnInit(): void {
    this.signupForm = this._fb.group({
      email: [''],
      password: ['']
    })
  }


  submit() {
    let {email, password} = this.signupForm.value
    if (this.signupForm.valid) {
      this._auth.signupUserWithEmailAndPassword(email, password).subscribe((res:any) => {
        if (res.user) {
          this._router.navigate(['/login'])
        }
        else {
          console.log(res.error)
        }
      })
    }
  }
}
