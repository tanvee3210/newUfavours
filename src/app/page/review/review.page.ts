import { Component, OnInit, NgZone } from '@angular/core';
import { Router ,ActivatedRoute} from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  feedback:any;
  id:any;
  otherDetails:any;
  message:any;
  constructor(private router: Router,
    public route:ActivatedRoute,
    public alertCtrl: AlertController,
    private http: Http,
    // private camera: Camera,
    private _ngZone: NgZone,
    public api_service: ApiServiceService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.id =parseInt(params.id);
        this.getDetails();
      }
    });
  } 

  getDetails(){
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/get_user/'+this.id, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.otherDetails = res.data;
      },
        error => {
          console.log('here error', error);
        });
  }
  sendFeedback() {
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    let feedBackData = {
      senderid :this.api_service.userDetailsLocal(),
      receiverid :this.id,
      text :this.message ,
      taskid:"" ,
    }
    this.http.post(this.api_service.API_BASE + 'api/decline_feedback', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.feedback = res.data;
      },
        error => {
          console.log('here error', error);
        });
  }
}
