// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  ///springbootrestapi/api
  apiGPSUrl: 'http://geoloc.groupe-sfbt.com/WS_ATSPRO_SFBT/LoadFKMService/Woojbdu8trkqYlDn7QhD/',
  GPSStartTime:"06:30",
  GPSEndtime:"16:00"
  /*apiUrl:'https://restapi.cfapps.us10-001.hana.ondemand.com/api'*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
