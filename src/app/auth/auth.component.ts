import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared'

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
      if(this.authType.length > 20){
        this.authType = 'email-verification';
      }
      console.log("the authType is "+this.authType);
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();
    let credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          if(this.authType == 'login'){
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
