Ionic 2 Weather App<br/>

This is based on Angular 2.0.0-rc.4, requires Google Maps API(and key).<br/>

To run this app:<br/>
1) install npm, Ionic 2, Typescript;<br/>
2) cd project root folder, npm install;<br/>
3) obtain your own google maps and Dark Sky forcast API ID, update www/index.html and forecast.service.ts accordingly;<br/>
4) run command ionic platform add android(or ios, etc), ionic build android(or other platform);<br/>
5) ionic serve (or ionic run ...).<br/>

Note:<br/>
1. Some google maps packages (like angular2-google-maps) have problems with Angular 2.0.0-rc.4, we are using v0.10.0(not the latest).<br/>
2. Depend on your setup, your forecast API calls may run into: No 'Access-Control-Allow-Origin' header is present on the requested resource.<br/>
3. Tested on web browser and Android 5.1 phone.<br/>

Reference: <br/>
http://ionicframework.com/docs/v2/getting-started/tutorial/<br/>
