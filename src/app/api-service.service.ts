import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  API_BASE = 'https://ufavours.sdssoftltd.co.uk/';
  user: any = {};
  loader = null;
  selectedChatUser: any = []
  selectedThread: any = null;
  loggedInuserLocations: any = { lat: 22.7777, lng: 78.783638 };
  loggedInuserLocations2: any = { lat: 0, lng: 0 };
  // _isLoggedIn: boolean;

  constructor(public alertCtrl: AlertController, public http: HttpClient, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
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

  async validateEmail(email: any) {
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  async showAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
  }

  async updateUser() {
    console.log('user', this.user);
    localStorage.setItem('userDetails', JSON.stringify(this.user));
  }


  // Loccation
  // getLocation() {
  //   let self = this;
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
  //     async result3 => {
  //       //console.log('Has Location permission?', result3.hasPermission);
  //       if (result3.hasPermission) {
  //         this.geolocation.getCurrentPosition().then((resp) => {
  //           // resp.coords.latitude
  //           // resp.coords.longitude
  //           if (resp) {
  //             self.loggedInuserLocations.lat = resp.coords.latitude;
  //             self.loggedInuserLocations.lng = resp.coords.longitude;
  //             self.loggedInuserLocations2.lat = resp.coords.latitude;
  //             self.loggedInuserLocations2.lng = resp.coords.longitude;
  //           }
  //           //console.log('A location 1', resp);

  //         }).catch((error) => {
  //           //console.log('Error getting location', error);
  //         });

  //         let watch = this.geolocation.watchPosition();
  //         watch.subscribe((data) => {
  //           if (data && data.coords && data.coords.latitude) {
  //             self.loggedInuserLocations.lat = data.coords.latitude;
  //             self.loggedInuserLocations.lng = data.coords.longitude;
  //             self.loggedInuserLocations2.lat = data.coords.latitude;
  //             self.loggedInuserLocations2.lng = data.coords.longitude;
  //           }
  //         });
  //       } else {
  //         this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION])
  //       }
  //     }
  //   );
  // };
}


