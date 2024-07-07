import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  

  loginForm!: FormGroup;


  constructor(public fb: FormBuilder,private auth:AuthService,private router:Router) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  type: string = "password"; // to show or hide password
  // showPassword: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;
  hideShowPass() {

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    // throw new Error('Method not implemented.');  
    if (this.loginForm.valid)
    {
      //send to db
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res.message); // res.message is the message from the server
            this.loginForm.reset();
            this.router.navigate(['dashboard']); // redirect to dashboard

          },
          error: (err) => {
            console.log(err ?. err.message); // err.message is the message from the server

          }
        })
      
    }
    else {
      //throw error using toaster
      console.log('this form is  invalid');
      validateForm.validateAllFormFields(this.loginForm);


    }
  }

  


}
