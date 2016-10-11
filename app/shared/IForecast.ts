import {IForecastInfo} from './IForecastInfo';

export interface IForecast {
    location: string;
    temperature: number;
    summary: string;
    windBearing: number;
    windSpeed: number;
	windDirection: string;
}
