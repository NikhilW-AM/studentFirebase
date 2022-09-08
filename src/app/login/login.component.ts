import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private _fb:FormBuilder,public _auth:AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [''],
      password: ['']
    })
  }

  googleLogin() {
    this._auth.loginWithGoogle().subscribe((res: any) => {
      console.log(res)
      if (res.status) {
        localStorage.setItem('token',res.token)
      }
      this._router.navigate(['list'])
    })
  }
  submit() {
    let {email, password} = this.loginForm.value
    if (this.loginForm.valid) {
      this._auth.loginWithEmailAndPassword(email, password).subscribe((res: any) => {
        if (res.user) {
          localStorage.setItem('token',res.user.accessToken)
        }
//      console.log(res.user.accessToken)
        this._router.navigate(['list'])

      })
    }
  }

}
