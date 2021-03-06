import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-time-validation-request',
  templateUrl: './time-validation-request.page.html',
  styleUrls: ['./time-validation-request.page.scss'],
})
export class TimeValidationRequestPage implements OnInit {
  id: any;
  requestData: any;
  workingTime: any;
  pageName:any;
  constructor(private router: Router, public route: ActivatedRoute,
    public alertCtrl: AlertController,
    public api_service: ApiServiceService, public http: Http) { }

 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = JSON.parse(params.id);
        this.getRequestData();
      }
      if(params && params.pageName){
        this.pageName = params.pageName;
      }
    });
  }
  onBack() {
    if(this.pageName == 'accept'){
      this.router.navigate(['/', 'time-validation-accept'], { queryParams: { pagename:'tab4',id: this.id } })
    }
    if(this.pageName=='other'){
      this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename:'tab4',id: this.id } })
    }
  
  }
  
  async getRequestData() {
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/get_user/' + this.id, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.requestData = res.data;
        await this.api_service.hideLoader();
      },
        error => {
          console.log('here error', error);
          this.api_service.hideLoader();
        });
  }

  async onRequest() {
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    let data = {
      senderid : this.api_service.user.data.id,
      receiverid: this.requestData.id,
      worktime: this.workingTime
    }
    this.http.post(this.api_service.API_BASE + 'api/proposeNewTime', data, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.requestData = res;
        await this.api_service.hideLoader();
        if (this.requestData.message != 'You have already send new request.') {
          this.workingTime =""
          const alert = await this.alertCtrl.create({
            message: "Request Time Send Successfully!.",
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
        }else{
          this.workingTime =""
          const alert = await this.alertCtrl.create({
            message: "You have already send new request",
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
          this.api_service.hideLoader();
        });
  }
}
