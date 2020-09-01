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
  searchData: any;
  skill: any;
  job: any; jobList: any = [];
  location: any;
  constructor(private router: Router,
    public alertCtrl: AlertController,
    private http: Http,
    private _ngZone: NgZone,
    public api_service: ApiServiceService) { }

  ionViewDidEnter() {
    this.userdetailes = JSON.parse(localStorage.getItem("userDetails"))
    console.log('userdetailes', this.userdetailes);
    this.api_service.getCurrentLocation();
    this.getSkilllist();
    // this.getJobTitle();
  }

  ngOnInit() {
  }
  onLists(value) {
    this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename: 'search' ,id:value.id} })
  }
  onBack() {
    this.router.navigate(['/', 'tab3'])
  }

  async getSkilllist() {
    this.searchData = [];
    this.job = "";
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
    this.http.get(this.api_service.API_BASE + 'api/job-by-skill', { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.jobTitleList = res.data;

      },
        error => {
          console.log('here error', error);
        });
  }

  getJobSkill() {
    let token = this.userdetailes.Token.token
    // console.log('token', token)
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    this.http.get(this.api_service.API_BASE + 'api/job/skill/' + this.skill.id, { headers: headers })
      .map((response) => response.json())
      .subscribe((res) => {
        console.log(res);
        this.jobList = res.data;
      },
        error => {
          console.log('here error', error);
        });

  }

  async search() {

    if (this.skill.skill_name && this.job.job_name) {
      //await this.api_service.showLoader()
      let token = this.userdetailes.Token.token
      // console.log('token', token)
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + token);
      console.log(headers);
      let find: any = {}
      find.skill = this.skill.skill_name
      find.job = this.job.job_name
      find.location = this.location
      find.keyword = ''

      this.http.post(this.api_service.API_BASE + 'api/search', find, { headers: headers, body: find })
        .map((response) => response.json())
        .subscribe(async (res) => {
          console.log(res);
          this.searchData = []
          this.searchData = res.data;
          //  await this.api_service.hideLoader();
        },
          error => {
            console.log('here error', error);
            this.api_service.hideLoader();
          });
    }
  }
}