import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable()
export class ToasterService {

  constructor() {
    this.setting();
   }

  successMessage(title: string,message?:string) {
    toastr.success(title,message);
  }

  errorMessage(title: string,message?:string) {
    toastr.error(title,message);
  }

  setting() {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-center',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '3000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
}
