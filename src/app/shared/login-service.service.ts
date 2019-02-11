import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserdetailsService } from '../shared/userdetails.service';
import { element } from 'protractor';

@Injectable()
export class LoginServiceService {
  loginUserFlag: boolean;
  userList: User[];
  newUser: User;
  constructor(private route: Router, private userService: UserdetailsService) { }

  validateLoginUser(userData: User): boolean {

    const x = this.userService.GetAllUsers();
    x.snapshotChanges().subscribe(item => {
      this.userList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        this.userList.push(y as User);

      });

      if (this.userList[0] === undefined || this.userList[0] === null) {
        this.loginUserFlag = true;
      } else {
        for (let i = 0; i < this.userList.length; i++) {
          const userSting = JSON.stringify(this.userList[i]);

          const SplitData = userSting.split(',');
          let userName = SplitData[1].replace('"userName":"', '');
          userName = userName.replace('"}', '');

          if (userName === userData.UserName) {
            console.log('Found User');
            this.loginUserFlag = false;
            break;
          } else {
            this.loginUserFlag = true;
          }
        }
      }

      if (this.loginUserFlag) {

        this.userService.insertUserDetails(userData);
      }
    });
    return true;
  }

  checkLoginNavigation(isLoginUser: boolean) {

    if (isLoginUser === true) {
      this.route.navigateByUrl('/moviesearch');
    } else {
      this.route.navigateByUrl('/login');
    }
  }
}
