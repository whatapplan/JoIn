import { Injectable } from "@angular/core";
import { Tag } from "./tag";
import { User } from "./usuario";
import { Location } from "./location";

export interface IPlan {
    id?: string;
    description:string;
    images: string[];
    location: Location;
    minPeople: number;
    maxPeople?: number;
    tags: Tag[];
    title: string;
    when: string;
    createdBy: string;
    creationUser: User;
    time?: string;
    participants: string[];
}


@Injectable({
  providedIn: 'root',
})
export class Plan implements IPlan {
    id?: string;
    description:string;
    images: string[];
    location: Location;
    minPeople: number;
    maxPeople?: number;
    tags: Tag[];
    title: string;
    when: string;
    createdBy: string;
    creationUser: User;
    time?: string;
    participants: string[];
}
