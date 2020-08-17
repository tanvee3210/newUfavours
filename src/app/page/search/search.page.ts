import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { from } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  Skilllist: any;
  usertoken: any;
  userdetailes: any;
  jobTitleList: any = [];
  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    private _ngZone: NgZone,
    public api_service: ApiServiceService) { }

  ionViewDidEnter() {
    this.userdetailes = JSON.parse(localStorage.getItem("userDetails"))
    console.log('userdetailes', this.userdetailes)
    this.getSkilllist();
    // this.getJobTitle();
  }

  ngOnInit() {
  }
  onLists() {
    this.router.navigate(['/', 'othersprofile'],{ queryParams: { pagename: 'search' }})
  }
  onBack() {
    this.router.navigate(['/', 'tab3'])
  }

  async getSkilllist() {
    let token = this.userdetailes.Token.token
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/skill_list', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.Skilllist = res.data;

      },
        error => {
          console.log('here error', error);
        });
  }

  getJobTitle() {
    let token = this.userdetailes.Token.token
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/job-by-skill/', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.jobTitleList = res.data;

      },
        error => {
          console.log('here error', error);
        });
  }
}
