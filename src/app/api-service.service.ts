import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  API_BASE = 'https://ufavours.sdssoftltd.co.uk/';
  TERM_CONDITION = this.API_BASE + 'public/Termsandconditionsfinal.docx';
  user: any = {};
  loader = null;
  selectedChatUser: any = []
  selectedThread: any = null;
  loggedInuserLocations: any = { lat: 22.7777, lng: 78.783638 };
  loggedInuserLocations2: any = { lat: 0, lng: 0 };
  // _isLoggedIn: boolean;

  constructor(private nativeGeocoder: NativeGeocoder, public alertCtrl: AlertController, public http: Http, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    let userExist = localStorage.getItem('userDetails');
    // console.log('user', userExist);
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
    this.loader = await this.loader.dismiss();
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
    // this.getCurrentLocation();
  }

  async updateUser2(dataObj: any) {
    console.log('user', this.user);
    let token = this.user.Token.token;
    token = "Bearer " + token;
    console.log('Token', token);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token);
    let options: any = { headers: headers };

    this.http.post(this.API_BASE + 'api/update_profile', dataObj, options)
      .subscribe((data) => {
        console.log(data);
      },
        (error) => {
          console.log(error);
        });

    localStorage.setItem('userDetails', JSON.stringify(this.user));

  }

  getDecimals(n: any) {
    const parts = n.toLocaleString('en-US', { maximumSignificantDigits: 18 }).split('.')
    return parts.length > 1 ? Number('0.' + parts[1]) : 0;
  }

  getStarMarks(n1: any) {
    let n: any = n1;
    let decimals: any = this.getDecimals(n);
    let emptyStar = 0;
    let fullstar = n - decimals;
    let halfStar = 0;
    let starts = '';

    if (decimals > 0.5) {
      if (fullstar < 5) {
        fullstar = fullstar + 1;
      }
    }
    if (0 < decimals && decimals < 0.51) {
      halfStar = 1;
    }
    if (n > 4) {
      emptyStar = 0;
    } else {
      emptyStar = 5 - fullstar;
    }
    if (halfStar == 1) {
      emptyStar = emptyStar - 1;
    }

    if (fullstar > 0) {
      for (let i = 0; i < fullstar; i++) {
        starts += '<i class="fa fa-star checked"></i>';
      }
    }
    if (halfStar == 1) {
      starts += '<i class="fa fa-star-half-o checked"></i>';
    }
    if (emptyStar > 0) {
      for (let i = 0; i < emptyStar; i++) {
        starts += '<i class="fa fa-star-o"></i>';
      }
    }
    return starts;
  }

  getAddressByLatLng(lat: any, lng: any) {
    if (lat && lng) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
      };
      let self = this;

      this.nativeGeocoder.reverseGeocode(lat, lng, options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]));
          if (result && result[0] && result[0].countryName) {
            let address = result[0];
            let location = '';
            if (address.locality && address.locality != '') {
              location += address.locality;
            }
            if (address.administrativeArea && address.administrativeArea != '') {
              location += ', ' + address.administrativeArea;
            }
            if (address.countryName && address.countryName != '') {
              location += ', ' + address.countryName;
            }
            if (address.postalCode && address.postalCode != '') {
              location += ', ' + address.postalCode;
            }
            self.user.data.location = location;
            console.log('Current Location', location);
            let dataObj = {
              "location": location,
              "latitude": lat,
              "longitude": lng
            };
            self.updateUser2(dataObj);
          }
        })
        .catch((error: any) => console.log(error));

      this.nativeGeocoder.forwardGeocode('Berlin', options)
        .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
        .catch((error: any) => console.log(error));
    }
  }

  getCurrentLocation() {
    let self = this;
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      async res => {
        console.log('Has Location permission?', res.hasPermission);
        if (res.hasPermission) {
          await this.geolocation.getCurrentPosition().then(async (g: any) => {
            console.log('location 1', g);
            if (g && g.coords && g.coords.latitude) {
              self.user.data.latitude = g.coords.latitude;
              self.user.data.longitude = g.coords.longitude;
              self.getAddressByLatLng(g.coords.latitude, g.coords.longitude);
            }
          }).catch((error) => {
            console.log('Error getting location', error);
          });
        }
      });
  }

}


