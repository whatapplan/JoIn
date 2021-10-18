import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud-service.service';
import { Plan } from 'src/app/core/models/plan';

@Component({
  selector: 'app-search-plan',
  templateUrl: './search-plan.page.html',
  styleUrls: ['./search-plan.page.scss'],
})
export class SearchPlanPage implements OnInit {
  planes : Plan[] = [];
  planesResultado : Plan[];
  // filters : string[] = ['🧭 Cervezas','🧭 Perro','Fiesta','Akuarela','Mya','Deporte','Fotografia'];
  filters : string[]=["Cervezas","Pasear al perro","Béisbol",
    "Baloncesto","Fútbol","Tenis","Golf","Surf","Arte y exposiciones",
    "Cine","Teatro","Jam Session","Música en directo","Clubbing","Explora la ciudad"];
  filtersSelected : string[] = [];
  searchBar : Element;
  titles : string[] = [];
  searchTerm : string;
  item:any;
  iconDefault : string;
  iconSelected : string;
  noResults = true;
  yesResults = false;
  content:string = "";
  currentPopover = null;

  @ViewChild('dateTime') date;

  constructor(private crudService : CrudService) {
    this.crudService.getPlanes().subscribe((res) => {res.map((t)=>{
      let plan = {
        id: t.payload.doc.id,
        ...t.payload.doc.data() as Plan
      }
      let pplan = t.payload.doc.data() as Plan;
      this.titles.push(pplan.title);
      this.planes.push(plan);
      })});
      this.iconDefault = 'icon-defecto';
      this.iconSelected = 'icon-seleccion';
      this.planesResultado = [];
   }
  

  ngOnInit() {
  }

  handleInput(event){
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.content = query;
  }
  searchPlan(q :string){
    console.log(this.planesResultado);
    console.log(q);
    if(this.planesResultado.length == 0 && this.filtersSelected.length == 0){
      this.planesResultado = this.planes.filter(plan => plan.title.toLowerCase().includes(q.toLowerCase()));
    }else{
      this.planesResultado = this.planesResultado.filter(plan => plan.title.toLowerCase().includes(q.toLowerCase()));
    }
    this.manageNoResults();
  }

  backupFilters(){
    // this.content = "";
    this.filtersSelected.forEach(filter => {
      this.planesResultado = this.planesResultado.concat(this.planes.filter(plan => plan.category == filter));
    });
    this.manageNoResults();
  }
  selectFilters(text){
    const index = this.filters.indexOf(text,0); 
      if (index > -1) {
        this.filters.splice(index, 1);
        this.filtersSelected.unshift(text);
      }
      this.showPlanes(text); 
  }
  unselectFilters(text){
    const index = this.filtersSelected.indexOf(text,0); 
      if (index > -1) {
        this.filtersSelected.splice(index, 1);
        this.filters.push(text);
      }
      this.hidePlanes(text); 
  }

  showPlanes(category){
    console.log(this.content);
    if(this.content.length > 0){
      var auxxPlanes = 
      this.planes.filter(plan => plan.category == category && plan.title.toLowerCase().includes(this.content.toLowerCase()));
      this.planesResultado = auxxPlanes.concat(this.planesResultado);
    }
    else{
      var auxxPlanes = this.planes.filter(plan => plan.category == category);
      this.planesResultado = auxxPlanes.concat(this.planesResultado);
    }
    this.manageNoResults();
  }

  hidePlanes(category){
    var auxPlanes = this.planesResultado.filter( plan => plan.category != category);
    this.planesResultado = auxPlanes;
    this.manageNoResults();
  }

  manageNoResults(){
    if(this.planesResultado.length > 0){this.noResults=false;this.yesResults=true}
    else {this.noResults=true;this.yesResults=false}
  }



  showCalendar(){
    this.date.open();
    //handle choosen date
  }
  
}




class direccion {
  street_name: string;
  street_address: string;
  city: string;
}

// const title : Array <string> = ['Juega conmigo', 'Vente a unas cerves',
//  'Este plan te va a molar', 'Vente anda, no tengo amigos','Texto de ejemplo para los titulos'];
// const description : string = "Este plan es muy chulo y además te va a encantar";
// const city : Array <string> = ["Valencia","Barcelona","Madrid"];
// const user : string[] = ['Alice', 'Bob', 'Daniel', 'David','Maria'];
// const category : string[] = ["Cervezas","Pasear al perro","Béisbol",
// "Baloncesto","Fútbol","Tenis","Golf","Surf","Arte y exposiciones",
// "Cine","Teatro","Jam Session","Música en directo","Clubbing","Explora la ciudad"];
// for(let i = 0; i < 50; i++){
  //   let plan = new Plan()
  //   plan.title = title[this.randomInt(0,title.length - 1)];
  //   plan.city = city[this.randomInt(0,2)];
  //   plan.user = user[this.randomInt(0,4)];
  //   plan.category = category[this.randomInt(0,category.length - 1)];
  //   plan.description = description;
  //   plan.address =  await this.getRandomAdress();
  //   plan.when = new Date().toString();
  //   this.crudService.uploadPlan(plan);
  //   console.log(plan);
  // }

  // 
  // randomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }
  // async getRandomAdress(){
  //   let res = await fetch('https://random-data-api.com/api/address/random_address')
  //   let ok = await res.json();
  //   let newTodo = Object.assign(new direccion(), ok);
  //   let cadena : string = newTodo.street_name + " " + newTodo.street_address +", "+
  //   newTodo.city;
  //   return cadena;
  // }