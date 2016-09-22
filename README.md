Ionic 2 Weather App

This is based on Angular 2.0.0-rc.4, requires Google Maps API(and key).

To run this app:
1) install npm, Ionic 2, Typescript;
2) cd project root folder, npm install;
3) obtain your own google maps and Dark Sky forcast API ID, update www/index.html and forecast.service.ts accordingly;
4) run command ionic platform add android(or ios, etc), ionic build android(or other platform);
5) ionic serve (or ionic run ...).

Note:
1. Some google maps packages (like angular2-google-maps) have problems with Angular 2.0.0-rc.4, we are using v0.10.0(not the latest).
2. Depend on your setup, your forecast API calls may run into: No 'Access-Control-Allow-Origin' header is present on the requested resource.
3. Tested on web browser and Android 5.1 phone.

Reference: 
http://ionicframework.com/docs/v2/getting-started/tutorial/