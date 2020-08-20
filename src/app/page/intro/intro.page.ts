import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TabsService } from 'src/app/tabs.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  constructor(private androidPermissions: AndroidPermissions, private router: Router, public tabs: TabsService) {
    //HERE
  }

  ionViewDidLoad() {
    this.tabs.hide();
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      async res => {
        console.log('Has Location permission?', res.hasPermission);
        if (res.hasPermission) {
          //here
        } else {
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
        }
      });
  }

  ngOnInit() {
  }

  onStarted() {
    this.router.navigate(['/', 'login']);
  }

}