import { Component } from '@angular/core';
import {LoginServiceService} from './shared/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  LoginValue: boolean=false;

constructor(private loginService: LoginServiceService) {
}

  isloginValidate($event) {
    this.LoginValue=$event;
    this.loginService.checkLoginNavigation(this.LoginValue);
  }
}

