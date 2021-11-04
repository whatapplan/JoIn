import { Injectable } from "@angular/core";
import { Tag } from "./tag";
import { User } from "./usuario";
import { Location } from "./location";

@Injectable({
  providedIn: 'root',
})
export class Plan {
    id?: string;
    images: string[];
    location: Location;
    minPeople: number;
    maxPeople?: number;
    tags: Tag[];
    title: string;
    when: string;
    createdBy: string;
    time?: string;
    participants: User[];
}
