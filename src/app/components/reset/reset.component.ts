import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements OnInit{

onSubmit() {
throw new Error('Method not implemented.');
}
 
 
 
  resetPassWordForm!: FormGroup;
 constructor(private fb:FormBuilder) {
  
 }
 
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.resetPassWordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]

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

}
