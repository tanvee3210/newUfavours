import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TabsService } from 'src/app/tabs.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router, public tabs: TabsService) {
    //HERE
  }

  ionViewDidLoad() {
    this.tabs.hide();
  }

  ngOnInit() {
  }

  onStarted() {
    this.router.navigate(['/', 'login']);
  }

}