import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  report: any;
  id: any;
  otherDetails: any;
  message: any;
  description: any;
  title: any;

  constructor(private router: Router, public route: ActivatedRoute,
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
  async onReport() {
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
    this.http.post(this.api_service.API_BASE + 'api/reportProblem', reviewData, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.report = res.data;
        this.getUserData(res);
      },
        error => {
          console.log('here error', error);
        });
  }

  async getUserData(u: any) {
    this.api_service.updateUser();
    const alert = await this.alertCtrl.create({
      message: "Problem is Reported Successfully!.",
      buttons: [
        {
          text: "OK"
        }
      ]
    })
    await alert.present();
    this.router.navigate(['/', 'tab5c'])
  }
}

