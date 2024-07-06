import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';

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


constructor(private fb:FormBuilder){}
  hideShowPass() {
   
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type="text": this.type="password";
  }

  onSignup() {
    // throw new Error('Method not implemented.');
    if (this.signupForm.valid)
    {
      console.log(typeof this.signupForm.value);

    }
    else {
      // throw error
      validateForm.validateAllFormFields( this.signupForm );

      console.log('invalid form');

    }
  }
  

 
}
