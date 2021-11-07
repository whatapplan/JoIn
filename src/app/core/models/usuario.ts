import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class User {
  $key: string;
  name: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
  dateBirth: Date;
  favCategories: string[];
  acceptedPlans: string[];
  rejectedPlans: string[];
}
