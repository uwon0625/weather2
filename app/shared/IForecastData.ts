/// font icons can be made by prefixing  with  'wi-forecast-io-'
export interface IForecastData {
    time: number;
    summary: string;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    windSpeed: number;
    windBearing: number;
    visibility: number;
    cloudCover: number;
    pressure: number;
    ozone: number;
}
