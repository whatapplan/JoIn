import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HereMapLocation,
  HereMapReponse,
  HereMapResponseViewResult,
} from '../../models/location';

declare var H: any;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  platform;
  search;
  geocoder;

  private _appId = 'JHue2P3m3eGhcrqLmiW6';
  private _appKey = 'rj4uVZc0RvrGvgSptInxfPjC39aaIVP6BcB-7v86W1s';

  constructor() {
    this.platform = new H.service.Platform({
      apiKey: this._appKey,
    });
    this.geocoder = this.platform.getGeocodingService();
    // this.search = new H.places.Search(this.platform.getPlacesService());
  }

  searchByText(query: string): Observable<HereMapResponseViewResult[]> {
    return new Observable((observer) => {
      this.geocoder.geocode(
        { searchText: query },
        (result: HereMapReponse) => {
          if (result.Response.View.length > 0) {
            if (result.Response.View[0].Result.length > 0) {
              observer.next(result.Response.View[0].Result);
            } else {
              observer.error('no results found');
            }
          } else {
            observer.error('no results found');
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
