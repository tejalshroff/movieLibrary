import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';

import {User} from '../shared/user.model';
@Injectable()
export class UserdetailsService {

  userList: AngularFireList<any>;

  constructor(private firebaseDB: AngularFireDatabase) { }

  GetAllUsers() {
this.userList=this.firebaseDB.list('UserDetails');
return this.userList;
  }

insertUserDetails(user: User) {
this.userList.push({
userName: user.UserName,
userEmail: user.UserEmail
});

}

}
