import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators } from '@angular/forms';
import { LoginServiceService } from '../shared/login-service.service';
import { Router } from '@angular/router';
import { GobalserviceService } from '../shared/gobalservice.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  providers: [LoginServiceService]
})
export class LoginUserComponent implements OnInit {
  IsUserLogedIn: boolean = false;
  @Output()
  LoginEvent = new EventEmitter<boolean>();
  user: User = {
    $key: null,
    UserName: null,
    UserEmail: null
  };
  constructor(private loginService: LoginServiceService,
    private globalVariable: GobalserviceService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(newuser: User) {
    this.IsUserLogedIn = this.loginService.validateLoginUser(newuser);
    // console.log(this.IsUserLogedIn);
    this.globalVariable.setUserName(newuser.UserName);
    this.LoginEvent.emit(this.IsUserLogedIn);
  }
  // tslint:disable-next-line:no-trailing-whitespace

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      $key: '',
      UserName: '',
      UserEmail: ''
    };
  }
}
