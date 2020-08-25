import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-concern',
  templateUrl: './concern.page.html',
  styleUrls: ['./concern.page.scss'],
})
export class ConcernPage implements OnInit {
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
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = parseInt(params.id);
      }
    });
  }

  async onConcern() {
    debugger
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);

    let reviewData = {
      title: this.title,
      description: this.description,
    }
    this.http.post(this.api_service.API_BASE + 'api/concern', reviewData, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.report = res.data;
        this.getUserData(res);
        this.title = ""
        this.description = ""
      },
        error => {
          console.log('here error', error);
        });
  }

  async getUserData(u: any) {
    this.api_service.updateUser();
    const alert = await this.alertCtrl.create({
      message: "Concern is Reported Successfully!.",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
    this.router.navigate(['/', 'tab5'])
  }
}
