import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  showGlobalTabs: any = false;
  hideTabBarPages = [
    '',
    '/',
    'login',
    'registration',
    'forgotpassword',
    'intro',
    '/login',
    '/registration',
    '/forgotpassword',
    '/intro'
  ];

  routeParamPages: string[] = [
    'product-details',
  ];
  hide: any;
  constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.navEvents();
    });
  }

  // A simple subscription that tells us what page we're currently navigating to.
  private navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      if (this.hideTabBarPages.includes(e.url)) {
        this.showGlobalTabs = false;
      } else {
        this.showGlobalTabs = true;
      }
    });
  }

}

