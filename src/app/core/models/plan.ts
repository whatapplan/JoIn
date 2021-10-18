import { Injectable } from "@angular/core";

@Injectable({

    providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
  })
export class Plan {
    $key:string;
    address :string;
    category:string;
    city:string;
    description:string;
    user:string;
    title:string;
    when:string;
}