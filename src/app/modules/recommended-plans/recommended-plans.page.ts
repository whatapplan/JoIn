import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-plans',
  templateUrl: './recommended-plans.page.html',
  styleUrls: ['./recommended-plans.page.scss'],
})
export class RecommendedPlansPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  filters : string[]=["Cervezas","Pasear al perro","Béisbol",
  "Baloncesto","Fútbol","Tenis","Golf","Surf","Arte y exposiciones",
  "Cine","Teatro","Jam Session","Música en directo","Clubbing","Explora la ciudad"];
  
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
}
