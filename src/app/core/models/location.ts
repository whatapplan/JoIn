export interface LatLng {
    lat: number;
    lng: number;
  }
  
  export interface Location {
    city: string;
    province: string;
    country: string;
    rawAddress: string;
    postalCode: string;
    state: string;
    number: string;
    street: string;
    coordinates: number[];
  }
  
  export interface HereMapReponse{
    Response: {
        MetaInfo: {
            Timestamp: Date
        },
        View: HereMapResponseView[]
    }
  }
  
  export interface HereMapResponseViewResult {
        Relevance: number,
        MatchLevel: string,
        MatchQuality: {
            City: string
        },
        Location: {
            LocationId: string,
            LocationType: string,
            DisplayPosition: HereMapCoords,
            NavigationPosition: HereMapCoords,
            MapView: {
                TopLeft: HereMapCoords,
                BottomRight: HereMapCoords
            },
            Address: HereMapAddress
        }
    
  }
  interface HereMapResponseView {
        _type: string,
        ViewId: number,
        Result: HereMapResponseViewResult[]
  }
  export interface HereMapLocation {
    Address: HereMapAddress;
    DisplayPosition: HereMapCoords;
  }
  interface HereMapAddress {
    City: string;
    Country: string;
    County: string;
    HouseNumber: string;
    Label: string;
    PostalCode: string;
    State: string;
    Street: string;
  }
  
  interface HereMapCoords {
    Latitude: number;
    Longitude: number;
  }
  
  export const getCoordsParamsFromLocation = ({coordinates}: Location) => {
    return { latitude: coordinates[0], longitude: coordinates[1]};
  }