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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any
  password: any
  getLogin: any
  forloginuser: any
  hideicon = true;
  inputpassword = 'password';

  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    public api_service: ApiServiceService) { }

  ngOnInit() {
  }
  onSignup() {
    this.router.navigate(['/', 'registration'])
  }
  onForgots() {
    this.router.navigate(['/', 'forgotpassword'])
  }
  async onLogin() {
    if (this.email && this.password) {
      this.forloginuser = {
        email: this.email,
        password: this.password,
      }
      var param = this.forloginuser;
      this.http.post(this.api_service.API_BASE + 'api/login', param)
        .map((response) => response.json())
        .subscribe((data) => this.getloginuser(data),
          error => this.getusererror())

    }
    else {
      const alert = await this.alertCtrl.create({
        message: "Username and Password are required ",
        buttons: [
          {
            text: "OK"
          }
        ]
      })
      await alert.present();
    }
  }
  async getusererror() {
    const alert = await this.alertCtrl.create({
      message: "invalid username or password",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
  }


  async getloginuser(u: any) {
    this.api_service.user = u;
    console.log("here check", u);
    this.api_service.updateUser();
    this.router.navigate(['/', 'tab2'])
  }

  showicon() {
    this.hideicon = false
    this.inputpassword = 'text'
  }
  againhideicon() {
    this.hideicon = true

    this.inputpassword = 'password'

  }
}
