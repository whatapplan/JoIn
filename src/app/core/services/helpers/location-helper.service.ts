import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  HereMapLocation,
  HereMapResponseViewResult,
} from '../../models/location';
import { LocationService } from '../http/location.service';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationHelperService {
  constructor(private _locationHttp: LocationService) {}

  getLocationFrom(locationSearchQuery: string) {
    return this._locationHttp
      .searchByText(locationSearchQuery)
      .pipe(map((res: any[]) => this.getLocationFromHereMapResponse(res)));
  }

  private getLocationFromHereMapResponse(
    results: HereMapResponseViewResult[]
  ): Location[] {
    return results.map((entry) => {
      const {
        Address: {
          City,
          County,
          State,
          HouseNumber,
          PostalCode,
          Country,
          Label,
        },
        DisplayPosition: { Latitude, Longitude },
      }: HereMapLocation = entry.Location;
      return {
        ...(City && { city: City }),
        ...(County && { province: County }),
        ...(State && { state: State }),
        ...(HouseNumber && { number: HouseNumber }),
        ...(PostalCode && { postalCode: PostalCode }),
        ...(Country && { country: Country }),
        ...(Label && { rawAddress: Label }),
        ...(State && { street: State }),
        ...(Latitude && Longitude && { coordinates: [Latitude, Longitude] }),
      };
    });
  }
}
