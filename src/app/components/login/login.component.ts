import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  

  loginForm!: FormGroup;


  constructor(public fb: FormBuilder) { }
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

  onSubmit() {
    // throw new Error('Method not implemented.');
    if (this.loginForm.valid)
    {
      //send to db
      console.log(this.loginForm.value);
    }
    else {
      //throw error using toaster
      console.log('this form is  invalid');
      validateForm.validateAllFormFields(this.loginForm);


    }
  }

  


}
