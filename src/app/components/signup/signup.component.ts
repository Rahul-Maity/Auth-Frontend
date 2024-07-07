import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {


  signupForm!: FormGroup;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.signupForm = this.fb.group({
      firstName:['',Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  type: string = "password"; // to show or hide password
  // showPassword: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  isText: boolean = false;


constructor(private fb:FormBuilder,private auth:AuthService,private http:HttpClient,private router:Router){}
  hideShowPass() {
   
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type="text": this.type="password";
  }

  onSignup() {
    // throw new Error('Method not implemented.');
    if (this.signupForm.valid)
    {
      this.auth.signup(this.signupForm.value).subscribe(
        {
          next:(res)=>{
            console.log(res.message); // to show message
            this.signupForm.reset();
            this.router.navigate(['login']);
          }
          ,
          error: (err) => { 
            console.log(err?.err.message);
          }
        }
      )

    }
    else {
      // throw error
      validateForm.validateAllFormFields( this.signupForm );

      console.log('invalid form');

    }
  }
  

 
}
