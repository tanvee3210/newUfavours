import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
declare var google, map, infoWindow;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  inputpassword = 'password'
  inputpassword1 = 'password'
  inputpassword2 = 'password'
  hideicon = true
  hideicon2 = true
  hideicon3 = true
  newuser = true
  termsFlag: boolean = true;
  email: any
  password: any
  newemail: any
  newpassword: any
  forloginuser: any
  confirmpassword: any
  data: any
  isnew = true
  map: any
  username: any
  deviceType: any
  devicetoken: any
  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    public api_service: ApiServiceService
  ) { }

  ngOnInit() {
  }
  onLogin() {
    this.router.navigate(['/', 'login'])
  }

  Newuser() {
    this.newuser = false
    var element = document.getElementById("newuser");
    element.classList.add("newuser-class");
    var element = document.getElementById("ortext");
    element.classList.add("ortextmargin");
    var element = document.getElementById("olduser");
    element.classList.remove("add-class");
  }
  async onSignup() {

    if (this.username && this.newemail && this.newpassword && this.confirmpassword) {
      this.ValidateEmail(this.newemail)
    } else {
      const alert = await this.alertCtrl.create({
        message: "All fields are mandatory.",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      await alert.present();
    }
  }

  async ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      //if (this.newpassword.toString().length == "6") {
      if (this.newpassword === this.confirmpassword) {
        this.data = {
          email: this.newemail,
          password: this.confirmpassword,
          is_new: this.isnew,
          device_type: 'ios',
          device_token: 'test',
        }
        var param = this.data;
        // await this.api_service.showLoader();
        this.http.post(this.api_service.API_BASE + 'api/register', param)
          .map((response) => response.json())
          .subscribe((data) => this.userregister(data),
            error => {
              this.texterror()
            })
      } else {
        const alert = await this.alertCtrl.create({
          message: "Both password are not same.",
          buttons: [
            {
              text: "OK"
            }
          ]
        })
        await alert.present();
      }

    } else {
      const alert = await this.alertCtrl.create({
        message: "Please enter valid email address",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      await alert.present();
    }
  }

  async texterror() {
    // await this.api_service.hideLoader();
    const alert = await this.alertCtrl.create({
      message: "This email id is already register",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();

  }

  async userregister(d1: any) {
    let u = {
      Token: { token: d1.data.token },
      data: d1.data
    };
    this.api_service.user = u;
    console.log("here check", u);
    this.api_service.updateUser();
    this.router.navigate(['/', 'tab2'])
  }

  showicon(data) {
    if (data == "1") {
      this.hideicon = false
      this.inputpassword = 'text'
    } else if (data == "2") {
      this.hideicon2 = false
      this.inputpassword1 = 'text'
    } else if (data == "3") {
      this.hideicon3 = false
      this.inputpassword2 = 'text'
    }
  }

  againhideicon(data) {
    if (data == '1') {
      this.hideicon = true
      this.inputpassword = 'password'
    } else if (data == "2") {
      this.hideicon2 = true
      this.inputpassword1 = 'password'
    } else if (data == "3") {
      this.hideicon3 = true
      this.inputpassword2 = 'password'
    }
  }

  checkTerms() {
    this.termsFlag = !this.termsFlag
  }
}
