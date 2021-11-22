import { Injectable } from '@angular/core';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root', // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class User implements IUser {
  id: string;
  $key: string;
  name: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
  dateBirth: Date;
  favCategories: Tag[];
  acceptedPlans: string[];
  rejectedPlans: string[];
  maxPlanAge: number;
  minPlanAge: number;
  createdPlans: string[];
}

export interface IUser {
  id: string,
  $key?: string;
  name: string;
  lastName?: string;
  location?: Location;
  email?: string;
  password?: string;
  dateBirth?: Date;
  acceptedPlans?: string[];
  favCategories?: Tag[];
  rejectedPlans?: string[];
  createdPlans?: string[];
}