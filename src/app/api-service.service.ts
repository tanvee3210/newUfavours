import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  API_BASE = 'https://ufavours.sdssoftltd.co.uk/';
  user: any = {};
  loader = null;
  selectedChatUser: any = []
  selectedThread: any = null;
  // _isLoggedIn: boolean;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    let userExist = localStorage.getItem('userDetails');
    //   console.log('user', userExist);
    if (userExist && userExist != 'undefined') {
      userExist = JSON.parse(userExist);
      this.user = userExist;
      console.log("userExist", userExist);
    }
  }



  async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    this.loader.present();
  }

  async toaster(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

  async hideLoader() {
    await this.loader.dismiss();
  }

  async updateUser() {
    console.log('user', this.user);
    localStorage.setItem('userDetails', JSON.stringify(this.user));
  }

  async userDetailsLocal(){
    localStorage.getItem('userDetails');
    console.log('user', this.user);
  }

  async clickLogin() {

  }
}


