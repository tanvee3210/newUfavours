import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
declare var google, map, infoWindow;
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  inboxList: any = [];

  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    public api_service: ApiServiceService) { }


  ionViewDidEnter() {
    this.getInboxList()

  }

  ngOnInit() {
    // this.getInboxList()
  }
  onMessage(thread: any) {
    this.api_service.selectedThread = thread;
    this.router.navigate(['/', 'message']);
  }

  async getInboxList() {
    var token = this.api_service.user.Token.token
    console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/msg_inbox', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.inboxList = res.data;
      },
        error => {
          console.log('here error', error);
        });
  }
}

