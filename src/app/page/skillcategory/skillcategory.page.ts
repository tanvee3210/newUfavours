import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skillcategory',
  templateUrl: './skillcategory.page.html',
  styleUrls: ['./skillcategory.page.scss'],
})
export class SkillcategoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onskillLists() {
    this.router.navigate(['/', 'othersprofile'], { queryParams: { pagename: 'skillcategory' } })
  }
}
