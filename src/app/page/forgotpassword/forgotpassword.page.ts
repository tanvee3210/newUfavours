import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  email: any;

  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    private _ngZone: NgZone,
    public api_service: ApiServiceService
  ) { }

  ionViewDidEnter() {
    this.api_service.user.data
  }
  ngOnInit() {
  }

  async onUpdate() {
    let isValidEmail = this.api_service.validateEmail(this.email);
    if (isValidEmail) {
      let userObj = {
        email: this.email,
      }

      this.http.post(this.api_service.API_BASE + 'api/forget_password', userObj)
        .map((response) => response.json())
        .subscribe((data) => {
          this.getUserData(data);
        },
          (error) => {
            console.log(error);
            this.api_service.showAlert('Valid Email Id is Required!');
            //this.getusererror();
          })
    }
    else {
      this.api_service.showAlert('Valid Email Id is Required!');
    }

  }
  async getUserData(u: any) {
    this.api_service.user.data = u.data;
    console.log("here check", u.data);
    this.api_service.updateUser();
    const alert = await this.alertCtrl.create({
      message: " Password updated successfully, please check your email!.",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
  }
}
