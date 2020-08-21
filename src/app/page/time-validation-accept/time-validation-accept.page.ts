import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-time-validation-accept',
  templateUrl: './time-validation-accept.page.html',
  styleUrls: ['./time-validation-accept.page.scss'],
})
export class TimeValidationAcceptPage implements OnInit {
  id: any;
  timeData: any;
  acceptTimeData: any
  constructor(private router: Router, public route: ActivatedRoute,
    public api_service: ApiServiceService, public alertCtrl: AlertController, public http: Http) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = JSON.parse(params.id);
        this.getRequestData();
      }
    });
  }
  onDecline() {
    this.router.navigate(['/', 'feedback'], { queryParams: { id: this.timeData.task_id } })
  }
  onTime() {
    this.router.navigate(['/', 'time-validation-request'], { queryParams: { pageName:'accept',id: this.timeData.task_id } })
  }

   async getRequestData() {
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/request/' + this.id, { headers: headers })
      .map((response) => response.json())
      .subscribe(async(res) => {
        console.log(res);
        this.timeData = res.data;
        await this.api_service.hideLoader();
      },
        error => {
          console.log('here error', error);
          this.api_service.hideLoader();
        });
  }
  
  async acceptTime() {
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    debugger
    let acceptData = {
      senderid: this.timeData.assign_to,
      receiverid: this.timeData.assign_from,
      taskid: this.timeData.task_id
    }
    this.http.post(this.api_service.API_BASE + 'api/acceptRequest', acceptData, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.acceptTimeData = res.data;
        await this.api_service.hideLoader();
        if (this.acceptTimeData) {
          const alert = await this.alertCtrl.create({
            message: "Review is updated Successfully!.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  // this.onBack()
                }
              }
            ]
          })
          await alert.present();
          this.router.navigate(['/', 'tab4'])
        }
      },
        error => {
          console.log('here error', error);
        });
  }
}
