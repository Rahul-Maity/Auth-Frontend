import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from '../../services/user-store.service';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {



  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(public fb: FormBuilder, private auth: AuthService, private router: Router, private toast: ToastrService, private userStore: UserStoreService, private resetService: ResetPasswordService) { }
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
    if (this.loginForm.valid) {

      //send to db
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);

            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullnameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success('Success', res.message, {
              timeOut: 3000
            })

            console.log(res.message); // res.message is the message from the server
            this.loginForm.reset();

            this.router.navigate(['dashboard']); // redirect to dashboard

          },
          error: (err) => {
            this.toast.error('Failed', err.message, {
              timeOut: 3000
            })
            console.log(err?.err.message); // err.message is the message from the server

          }
        })

    }
    else {
      //throw error using toaster
      this.toast.error('Failed', 'this form is  invalid', {
        timeOut: 3000
      })
      console.log('this form is  invalid');
      validateForm.validateAllFormFields(this.loginForm);


    }
  }
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);

      //api call to be done
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe(
          {
            next: (res => {
              this.toast.error('success', 'Reset password link sent to your email', {

                timeOut: 3000
              })
              this.resetPasswordEmail = "";
              const buttonRef = document.getElementById('closeBtn');
              buttonRef?.click();
            }),
            error: (err => {
              this.toast.error('Failed', err.message, {
                timeOut: 3000
              })
            })
          }
        )
    }
  }

}
