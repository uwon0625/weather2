import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationService } from '../../providers/location.service';
import {ILocationInfo} from '../../shared/ILocationInfo';
declare var google: any;

@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  @Input() zip: string;
  @ViewChild('map') mapElement: ElementRef;
  // private map: any = {
  //   //'angular2-google-maps': 'node_modules/angular2-google-maps'
  //   'angular2-google-maps': 'https://npmcdn.com/angular2-google-maps@0.10.0'
  // };
  private map: any;
  private location: ILocationInfo = <ILocationInfo>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationService) {
    this.zip = navParams.get('zip');
  }

  ionViewLoaded() {
    if (!this.location.lat) {
      if (!this.zip)
        this.zip = this.locationService.getZip();
      this.getLatLng(this.zip);
    }
  }

  getLatLng(zip: string) {
    this.locationService.getLocationInfo(this.zip).subscribe((data: ILocationInfo) => {
      this.location = data;
      this.loadMap(this.location);
    });
  }

  loadMap(location: ILocationInfo) {
    let latLng = new google.maps.LatLng(+location.lat, +location.lng);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.map);
  }

  private handleError(error: any) {
    console.log(error);
  }  

}
