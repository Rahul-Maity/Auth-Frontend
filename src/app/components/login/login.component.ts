import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      this.validateAllFormFields(this.loginForm);


    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control?.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup)
      {
        this.validateAllFormFields(control);
        }

    });

  }


}
