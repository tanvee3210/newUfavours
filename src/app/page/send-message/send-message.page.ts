import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  sendMessage: any;
  id: any;
  otherDetails: any;
  message: any;
  constructor(private router: Router,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,
    private http: Http,
    // private camera: Camera,
    public api_service: ApiServiceService) { }



  onBack() {
    this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename: 'tab4', id: this.id } })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id = parseInt(params.id);
      }
    });
  }
  onSend() {
    this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);

    let sendData = {
      sender_id: this.api_service.user.data.id,
      receiver_id: this.id,
      message_type: 0,
      message: this.message
    }
    this.http.post(this.api_service.API_BASE + 'api/send_message', sendData, { headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.sendMessage = res;
        this.api_service.hideLoader();
        if (this.sendMessage) {
          this.message = ''
          const alert = await this.alertCtrl.create({
            message: "Send Message Successfully!.",
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

        error => {
          console.log('here error', error);
          this.api_service.hideLoader();
        }
      });
  }

}
