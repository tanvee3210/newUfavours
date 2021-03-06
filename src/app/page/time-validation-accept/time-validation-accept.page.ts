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
  acceptTimeData: any;
  disableFlag: boolean = false;
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
    this.router.navigate(['/', 'time-validation-request'], { queryParams: { pageName: 'accept', id: this.timeData.assign_from } })
  }

  async getRequestData() {
    debugger
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/request/' + this.id, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.timeData = res.data;
        if (this.timeData && this.timeData.read_status_to == 0) {
          let data = {
            task_id: parseInt(this.timeData.task_id),
            task_user: "to"
          }
           this.http.post(this.api_service.API_BASE + 'api/task_read' , data, { headers: headers })
            .map((response) => response.json())
            .subscribe(async (res) => {
              console.log(res);
            });
        }
        if (this.timeData && this.timeData.accept_reject == 2) {
          this.disableFlag = true
        }
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
    let acceptData = {
      senderid: this.timeData.assign_to,
      receiverid: this.timeData.assign_from,
      taskid: this.timeData.task_id
    }
    this.http.post(this.api_service.API_BASE + 'api/acceptRequest', acceptData, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.acceptTimeData = res;
        await this.api_service.hideLoader();
        if (this.acceptTimeData) {
          const alert = await this.alertCtrl.create({
            message: "Accept Request Successfully!.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.router.navigate(['/', 'tab4'])
                }
              }
            ]
          })
          await alert.present();

        }
      },
        error => {
          console.log('here error', error);
        });
  }
}
