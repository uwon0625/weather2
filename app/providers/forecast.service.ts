import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {IForecast} from '../shared/IForecast';
import {IForecastInfo} from '../shared/IForecastInfo';

@Injectable()
export class ForecastService {
    private requestURl: string;
    constructor(private http: Http) {
        this.requestURl = `https://api.darksky.net/forecast/YOUR_API_ID/[lat],[lng]`;
    }

    getForecast(lat: string, lng: string) {
        let forecastURL = this.requestURl.replace('[lat]', lat).replace('[lng]', lng);
        return this.http.get(forecastURL).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response): IForecast {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let forecast: IForecast = <any>{};
        let body = res.json();

        forecast.temperature = Math.floor(body.currently.temperature);
        forecast.location = '';
        forecast.summary = body.currently.summary;
        forecast.windBearing = body.currently.windBearing;
        forecast.windSpeed = body.currently.windSpeed;

        return forecast;
    }

    windBearing(windBearing: number): string {
        if (windBearing < 45) {
            return 'N';
        } else if (windBearing < 120) {
            return 'E';
        } else if (windBearing < 225) {
            return 'S';
        } else if (windBearing < 315) {
            return 'W';
        } else {
            return 'N';
        }
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error);
    }

}