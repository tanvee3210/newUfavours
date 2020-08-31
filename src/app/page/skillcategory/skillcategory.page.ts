import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { ApiServiceService } from '../../api-service.service';

@Component({
  selector: 'app-skillcategory',
  templateUrl: './skillcategory.page.html',
  styleUrls: ['./skillcategory.page.scss'],
})
export class SkillcategoryPage implements OnInit {
  skill:any;
  skillsCatDetails:any;
  constructor(private router: Router,
    public route:ActivatedRoute,
    public api_service: ApiServiceService,
    private http: Http) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.skill) {
        this.skill = params.skill;
        this.getDetails();
      }
    });
  } 

  onskillLists(value) {
    this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename: 'skillcategory',id:value.id } })
  }

  async getDetails(){
    this.skillsCatDetails =[]
    await this.api_service.showLoader();
    let token = this.api_service.user.Token.token
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    console.log(headers);
    let skillData= {
      "skill":this.skill
      }
    this.http.post(this.api_service.API_BASE + 'api/skills_userList',skillData ,{ headers: headers })
      .map((response) => response.json())
      .subscribe(async (res) => {
        console.log(res);
        this.skillsCatDetails = res;
        await this.api_service.hideLoader();
      },
        error => {
          console.log('here error', error);
          this.api_service.hideLoader()
        });
  }
}
