import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';
import { Http, Response, Headers } from '@angular/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  requestDetails:any;
  id:any;
  feedbackResponse:any;
  message:any;
  constructor(private router: Router,public route:ActivatedRoute,
    public alertCtrl: AlertController,
    public api_service: ApiServiceService,public http:Http) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = JSON.parse(params.id);
        this.getRequestData();
      }
    });
  }

  onBack(){
    this.router.navigate(['/', 'time-validation-accept'], { queryParams: { id: this.id } })
    
  }
  getRequestData(){
    this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/request/'+this.id, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.requestDetails = res.data;
        this.api_service.hideLoader();
      },
        error => {
          console.log('here error', error);
          this.api_service.hideLoader();
        });
  }

  declineFeedback(){
    this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    let feedbackData={
      senderid:this.requestDetails.assign_to,
      receiverid:this.requestDetails.assign_from,
      text:this.message,
      taskid:this.requestDetails.task_id
    }
    this.http.post(this.api_service.API_BASE + 'api/decline_feedback', feedbackData,{ headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.feedbackResponse = res;
        this.api_service.hideLoader();
        if (this.feedbackResponse) {
          const alert = await this.alertCtrl.create({
            message: "Decline Feedback Successfully!.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.onBack()
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

