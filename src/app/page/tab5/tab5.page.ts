import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import { AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  report: any;
  id: any;
  otherDetails: any;
  message: any;
  description: any;
  title: any;

  constructor(private router: Router,
    public route: ActivatedRoute,
    public http: Http,
    public api_service: ApiServiceService,
    public alertCtrl: AlertController,
    private iab: InAppBrowser) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = parseInt(params.id);
      }
    });
  }
  onSearch() {
    this.router.navigate(['/', 'search']);
  }
  onReport() {
    this.router.navigate(['/', 'report']);
  }
  onConcern() {
    this.router.navigate(['/', 'concern']);
  }
  onUses() {
    this.router.navigate(['/', 'howtouseapp']);
  }
  onFAQ() {
    this.router.navigate(['/', 'faq']);
  }


  async onDelete() {
    debugger
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);

    let reviewData = {
      userid: this.api_service.user.data.id,
    }
    this.http.post(this.api_service.API_BASE + 'api/deactivate_user', reviewData, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.report = res.data;
        this.deletAccount();
      },
        error => {
          console.log('here error', error);
        });
  }

  async deletAccount() {
    const alert = await this.alertCtrl.create({
      message: "Do you really want to Delete ?",
      buttons: [
        {
          text: "YES",
          handler: data => {
            localStorage.clear();
            this.api_service.user = null
            this.router.navigate(['/', 'login'])
            // this.api_service.toaster('logout successfully')
          }
        },
        {
          text: "NO"
        }
      ]
    });
    await alert.present();
  }

  // async getUserData(u: any) {
  //   this.api_service.updateUser();
  //   const alert = await this.alertCtrl.create({
  //     message: "Concern is Reported Successfully!.",
  //     buttons: [
  //       {
  //         text: "OK"
  //       }
  //     ]
  //   })
  //   await alert.present();
  //   this.router.navigate(['/', 'tab5'])
  // }

  onTermandConditions() {
    const browser = this.iab.create(this.api_service.TERM_CONDITION);


    browser.close();
  }
}
