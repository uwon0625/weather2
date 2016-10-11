import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ForecastService } from '../../providers/forecast.service';
import { LocationService } from '../../providers/location.service';
import {IForecast} from '../../shared/IForecast';
import {ILocationInfo} from '../../shared/ILocationInfo';

@Component({
  templateUrl: 'build/pages/weather/weather.html',
})
export class WeatherPage {
  @Input() zip: string;
  private forecast: IForecast = <IForecast>{};
  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationService, public forecastService: ForecastService) {
    this.zip = navParams.get('zip');
    if (!this.zip)
        this.zip = this.locationService.getZip();
    this.getForecast(this.zip);
  }

  getForecast(zip: string): void {
    this.locationService.getLocationInfo(zip).subscribe((data: ILocationInfo) => {
      // this.forecastService.getForecast(data.lat, data.lng).subscribe((forecast: IForecast) => this.forecast = forecast)
      this.forecastService.getForecast(zip).subscribe((forecast: IForecast) => this.forecast = forecast)
    });
  }

  private handleError(error: any) {
    console.log(error);
  }  
}
