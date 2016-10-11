import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, JSONP_PROVIDERS } from '@angular/http';
import {Observable} from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {IForecast} from '../shared/IForecast';
import {IForecastInfo} from '../shared/IForecastInfo';

@Injectable()
export class ForecastService {
    // cors issue>> private requestUrl: string = `https://api.forecast.io/forecast/your_api_id/[lat],[lng]`;
    private requestUrl: string = `http://api.openweathermap.org/data/2.5/weather?zip=[zip]&units=imperial&APPID=your_api_id`;
    constructor(private http: Http, private jsonp: Jsonp) {
    }

    getForecastByCoords(lat: string, lng: string) {
        let forecastURL = this.requestUrl.replace('[lat]', lat).replace('[lng]', lng);
        return this.http.get(forecastURL).map(this.extractData).catch(this.handleError);
    }

    getForecast(zip: string) {
        let forecastURL = this.requestUrl.replace('[zip]', zip);
         return this.http.get(forecastURL).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response): IForecast {
        let forecast: IForecast = <any>{};
        let body = res.json();

        // https://api.forecast.io/forecast/
        // forecast.temperature = Math.floor(body.currently.temperature);
        // forecast.location = '';
        // forecast.summary = body.currently.summary;
        // forecast.windBearing = body.currently.windBearing;
        // forecast.windSpeed = body.currently.windSpeed;
		// forecast.windDirection = this.windBearing(forecast.windBearing);

        // http://api.openweathermap.org/data/2.5/weather
        forecast.temperature = Math.floor(body.main.temp);
        forecast.location = body.name;
        forecast.summary = body.weather[0].main;
        forecast.windBearing = body.wind.deg;
        forecast.windSpeed = body.wind.speed;
        forecast.windDirection = forecast.windBearing < 45 ? 'N' : forecast.windBearing < 135 ? 'E' : forecast.windBearing < 225 ? 'S' : forecast.windBearing < 315 ? 'W' : '';
        return forecast;
    }

    windBearing(deg: number): string {
        if (deg < 45) {
            return 'N';
        } else if (deg < 135) {
            return 'E';
        } else if (deg < 225) {
            return 'S';
        } else if (deg < 315) {
            return 'W';
        } else {
            return '';
        }
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error);
    }

}