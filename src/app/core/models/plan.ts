import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Injectable } from "@angular/core";
import { Tag, TagCategory } from "./tag";

@Injectable({
  providedIn: 'root',
})
export class Plan {
    $key:string;
    id:string;
    address :string;
    city:string;
    description:string;
    createdBy :string;
    title:string;
    date:string;
    when:string;
    tag : Tag;
    tagCategory: TagCategory;
    category:string;
    user:string;
    nParticipant :  number;
    time:string;
}
