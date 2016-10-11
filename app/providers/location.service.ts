import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Geolocation}  from 'ionic-native';
import { Events, LocalStorage, Storage } from 'ionic-angular';
import {ILocationInfo} from '../shared/ILocationInfo';

@Injectable()
export class LocationService {
    private current: ILocationInfo;
    private zip: string;
    private storage = new Storage(LocalStorage);
    constructor(private http: Http, public events: Events) {
        // this.current = <ILocationInfo>{};
    }

    getLogLat(): ILocationInfo {
        Geolocation.getCurrentPosition().then((value) => {
            this.current.lat = value.coords.latitude.toString();
            this.current.lng = value.coords.longitude.toString();
        }).catch((error) => this.handleError(error));
        return this.current;
    }

    getStoredLocations(): Promise<string> {
        return this.storage.get('locations').then(loc => this.zip = loc).catch((error) => this.handleError(error));
    }

    saveZip(zip: string): Promise<string> {
        this.zip = zip;
        this.getLocationInfo(zip).subscribe(data => {
            this.saveLocation(data).then(data => {
                return this.getStoredLocations();
            }).catch((error) => this.handleError(error));
        });
        return null;
    }
    saveLocation(location: ILocationInfo) {
        return this.storage.set('locations', location.zip).catch(error => this.handleError(error));
    }

    removeSavedLocatoin(): void {
        this.storage.remove('locations');
    }

    getLocationInfo(zip: string) {
        if (zip.indexOf(' ') >= 0) {
            let zipCountry: any[] = zip.replace(',', '').split(' ')
            zip = `${zipCountry[0]},country:${zipCountry[1]}`;
        }
        this.zip = zip;
        let safeZip = encodeURIComponent(zip);
        let googleApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=&components=postal_code:${safeZip}&sensor=false`;
        return this.http.get(googleApiUrl).map(this.extractData);
    }

    getZip(): string {
        if (!this.zip) {
            this.getStoredLocations().then(loc => { this.zip = loc; return this.zip;}).catch(error => this.handleError(error));
        }
        else 
            return this.zip;        
    }

    extractData(value: Response) {
        let result = value.json().results[0];
        let data: ILocationInfo = <ILocationInfo>{
            name: result.formatted_address.replace(', USA', ''),
            lat: result.geometry.bounds.northeast.lat,
            lng: result.geometry.bounds.northeast.lng,
            zip: result.address_components[0].short_name,
            default: false
        };
        return data;
    }

    private handleError(error: any) {
        console.error(error);
    }

}