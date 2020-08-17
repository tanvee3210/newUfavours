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
  review:any;
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

  onBack(){
    this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename: 'tab4' ,id: this.id} })
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
  sendReview() {
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);

    let reviewData = {
      toRating :this.api_service.user.data.id,
      rating :2.5,
      review :this.message 
    }
    this.http.post(this.api_service.API_BASE + 'api/sendReview',reviewData, { headers: headers})
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.review = res.data;
      },
        error => {
          console.log('here error', error);
        });
  }
}
