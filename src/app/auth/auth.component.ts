import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared'
import {User} from "../shared/models/user.model";

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;
  message: String = '';
  errors: Errors = new Errors();
  user: User;
  token: String  = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': '',
      'password': ''
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      if(this.authType.length >= 20){
        this.authType = data[data.length - 2].path;
        this.token = data[data.length - 1].path;
      }
      console.log("the authType is "+this.authType);
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      switch (this.authType) {
        case 'login':
          this.title = 'Sign in';
          break;
        case 'register':
          this.title = 'Sign up';
          this.authForm.addControl('username', new FormControl());
          break;
        case 'email-verification':
          this.title = 'Email verify';
          break;
        case 'forgot':
          this.title = 'Reset password';
          this.message = 'Please enter the email address so we can send you the reset password email.';
          break;
        case 'reset':
          this.route.data.subscribe(
              (data: {user: User}) => {
                if (data.user) {
                  this.user = data.user;
                  console.log(this.user);
                }
              }
          );
          this.title = 'Reset password';
          this.message = 'Please enter the new password.';
          this.authForm.addControl('newPassword', new FormControl());
          this.authForm.addControl('confirmPassword', new FormControl());
          this.authForm.removeControl('password');
          this.authForm.removeControl('email');
        default:
          break;
      }

      // add form control for username if this is the register page
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    this.message = '';
    let credentials = this.authForm.value;

    if (this.authType == 'forgot'){
      this.userService.forgotPassword(credentials).subscribe(
          data => {
            this.message = data['info'];
          },
          err => {
            this.errors = err;
            this.isSubmitting = false;
            this.message = '';
          }
      );
    } else if(this.authType == 'reset'){
      console.log(credentials);
      if(credentials.confirmPassword !== credentials.newPassword){
        this.errors = {errors: {newPassword: "must be same with the confirmPassword"}};
        this.message = '';
        this.isSubmitting = false;
      } else {
        this.userService.resetPassword(this.token ,credentials.newPassword).subscribe(
            data => {
              console.log("finished");
              this.authType = 'resetConfirmed';
            },
            err => {
              this.errors = err;
              this.isSubmitting = false;
            }
        );;
      }
    } else {
      this.userService.attemptAuth(this.authType, credentials)
          .subscribe(
              data => {
                if(this.authType === 'login'){
                  this.router.navigateByUrl('/');
                }
                console.log(data);
                this.message = data['msg'];
              },
              err => {
                this.errors = err;
                console.log(this.errors);
                this.isSubmitting = false;
              }
          );
    }
  }
}
