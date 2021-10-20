import { Injectable } from "@angular/core";

@Injectable({

    providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
  })
export class Usuario{
    $key:string;
    nombre :string;
    apellido:string;
    ciudad:string;
    email:string;
    contraseña:string;
}