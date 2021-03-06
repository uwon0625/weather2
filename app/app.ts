import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { Jsonp, JSONP_PROVIDERS } from '@angular/http';
import { ForecastService } from './providers/forecast.service';
import { LocationService } from './providers/location.service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Jsonp, JSONP_PROVIDERS, ForecastService, LocationService],
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [Jsonp, JSONP_PROVIDERS, ForecastService, LocationService], {});
