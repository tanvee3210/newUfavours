import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TabsService } from './tabs.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  //hideTabs: any = true;
  user:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    public tabs: TabsService,
    public router:Router
  ) {
    this.initializeApp();
  }
  ionViewDidEnter() {
    console.log("View Enter", this.tabs.showGlobalTabs);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadUIDisplay();
      if (this.user) {
        this.router.navigate(['/', 'tab2'])
      } else {
        this.router.navigateByUrl("/login");
      }
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        async res => {
          console.log('Has Location permission?', res.hasPermission);
          if (res.hasPermission) {
            //here
          } else {
            this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION, this.androidPermissions.PERMISSION.CAMERA]);
          }
        });
    });
  }
  loadUIDisplay() {
    try {
      this.user = JSON.parse(localStorage.getItem("userDetails"));
    } catch (err) { }
  }


}
