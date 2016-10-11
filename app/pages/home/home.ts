import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../providers/location.service';
import { WeatherPage } from '../weather/weather';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  private zip: string = '33139';
  constructor(public navCtrl: NavController, public locationService: LocationService) {
    this.saveLocation();
  }

  checkWeather(): void {
    this.navCtrl.push(WeatherPage, { zip: this.zip });
  }

  saveLocation(): void {
    this.locationService.saveZip(this.zip);
  }
  getSavedLocation(): string {
    this.locationService.getStoredLocations().then(loc => {
      this.zip = loc;
    }).catch(error => this.handleError(error));
    return this.zip;
  }

  viewMap(): void {
    this.navCtrl.push(MapPage, { zip: this.zip });
  }

  private handleError(error: any) {
    console.log(error);
  }
}
