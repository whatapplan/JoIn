import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/core/services/http/crud-service.service';
import { Plan } from 'src/app/core/models/plan';
import { ModalController, NavController } from '@ionic/angular';
import { TagCategory } from 'src/app/core/models/tag';
import { FiltersPage } from 'src/app/core/components/filters/filters.page';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-plan',
  templateUrl: './search-plan.page.html',
  styleUrls: ['./search-plan.page.scss'],
})
export class SearchPlanPage implements OnInit {
  planes: Plan[] = [];
  planesResultado: Plan[];
  filtersSelected: string[] = [];
  titles: string[] = [];
  noResults = false;
  yesResults = true;
  content: string = '';
  tags: TagCategory[] = [];
  filters = {
    tags: {
      indexes: [],
      values: [],
      ptag: [],
    },
    day: '',
    time: '',
  };

  constructor(
    private crudService: CrudService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.crudService.getPlans().subscribe((res) => {
      res.map((t) => {
        let plan = {
          id: t.payload.doc.id,
          ...(t.payload.doc.data() as Plan),
        };
        this.titles.push(plan.title);
        this.planes.push(plan);
      });
    });
    // this.crudService.getTagCategories().subscribe((res) => {res.map((t)=>{
    //   this.tags.push(t.payload.doc.data() as TagCategory)
    //   })});

    this.planesResultado = this.planes;
  }

  ngOnInit() {}

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.content = query;
  }

  searchTitle() {
    return this.planes.filter((plan) =>
      plan.title.toLowerCase().includes(this.content.toLowerCase())
    );
  }

  navToDetail({ id }) {
    const route = `/plan/${id}`;
    this.router.navigate([route])
  }

  searchTags() {
    let plans: Plan[] = [];
    this.filters.tags.values.forEach((tag) => {
      let auxxPlanes = this.planes.filter((plan) =>
        plan.tags.map(({ name }) => name).includes(tag)
      );
      plans = plans.concat(auxxPlanes);
    });
    return plans;
  }

  searchDay() {
    let selected: string = this.filters.day;
    console.log(selected);
    let s_date: Date;
    if (selected.includes('-')) {
      let selec = selected.split('-');
      s_date = new Date(+selec[2], +selec[1] - 1, +selec[0]);
      s_date.setHours(0, 0, 0, 0);
    } else if (selected == 'Mañana') {
      s_date = new Date();
      s_date.setUTCDate(s_date.getUTCDate() + 1);
      s_date.setHours(0, 0, 0, 0);
    } else {
      s_date = new Date();
      s_date.setHours(0, 0, 0, 0);
    }
    return this.planes.filter((plan) => {
      let dplan = new Date(plan.when);
      dplan.setHours(0, 0, 0, 0);
      return +dplan == +s_date;
    });
  }
  searchTime() {
    return this.planes.filter(
      (plan) => plan.time == this.filters.time.toString()
    );
  }

  mergeResults(result, count) {
    let res: Plan[] = [];
    let groupBy: any[] = result.reduce(function (rv, x) {
      (rv[x['id']] = rv[x['id']] || []).push(x);
      return rv;
    }, {});
    let getIds: any[] = Object.values(groupBy).filter(
      (item) => item.length == count
    );
    getIds.forEach((item) => {
      res.push(item[0]);
    });
    return res;
  }

  handleFilters() {
    this.filtersSelected = [];
    let result: Plan[] = [];
    let count = 0;
    if (this.content != '') {
      result = result.concat(this.searchTitle());
      count++;
    }
    if (
      this.filters.tags != undefined &&
      this.filters.tags.values.length != 0
    ) {
      // if(this.h_tag != undefined && this.h_tag.length != 0){
      this.filtersSelected.push(...this.filters.tags.values);
      result = result.concat(this.searchTags());
      count++;
    }
    if (this.filters.day != '' && this.filters.day != 'todos') {
      // if(this.h_day!='' && this.h_day!='todos'){
      this.filtersSelected.push(this.filters.day);
      result = result.concat(this.searchDay());
      count++;
    }
    if (this.filters.time != '' && this.filters.time != 'toeldia') {
      // if(this.h_time!='' && this.h_time!='toeldia'){
      this.filtersSelected.push(this.filters.time);
      result = result.concat(this.searchTime());
      count++;
    }
    if (count == 0) {
      this.planesResultado = this.planes;
    } else this.planesResultado = this.mergeResults(result, count);
    this.manageNoResults();
  }

  manageNoResults() {
    if (this.planesResultado.length > 0) {
      console.log('hay resultados');
      this.noResults = false;
      this.yesResults = true;
    } else {
      console.log('NOOOOOOO HAY NADA hay resultados');
      this.noResults = true;
      this.yesResults = false;
    }
  }

  async showFiltering() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      componentProps: {
        filters: this.filters,
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data['data']);
      this.filters = data.data;
      this.handleFilters();
    });
    return await modal.present();
  }

  removeFilter(filter: string) {
    let index = this.filters.tags.values.indexOf(filter);
    if (index > -1) {
      this.filters.tags.values.splice(index, 1);
      this.filters.tags.indexes.splice(index, 1);
      this.filters.tags.ptag.splice(index, 1);
    } else if (this.filters.day == filter) {
      this.filters.day = 'todos';
    } else {
      this.filters.time = 'toeldia';
    }
    this.handleFilters();
  }

  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO
  // CODIGO PARA CREAR PLANES EN LA BD Y PODER BUSCAR ALGO

  // async showCalendar(ev:any){
  //   // this.date.open();
  //   // handle date and other things
  //   console.log('Hola manito');
  //   let date = this.planes[0].when;
  //   let diaDeHoy = new Date();
  //   let mañana = new Date();
  //   mañana.setDate(diaDeHoy.getUTCDate() + 1);
  //   let pasado = new Date();
  //   pasado.setUTCMonth(diaDeHoy.getUTCMonth() + 1)
  //   let dia = new Date('2021-10-27');
  //   dia.setHours(14);
  //   let dia1 = new Date('2021-10-27');
  //   dia1.setHours(3);
  //   let dia2 = new Date('2021-10-27');
  //   dia2.setHours(20);
  //   let comp = new Date(date);
  //   comp.setMonth(12);
  //   console.log(comp + ' desde objeto when');
  //   console.log(mañana + ' created');
  //   console.log('valeeee golfo');
  //   console.log(diaDeHoy + '-' + mañana +'-'+pasado);
  //   console.log(mañana.getUTCDate() == comp.getUTCDate());
  //   console.log(mañana.getUTCDate() == pasado.getUTCDate());
  //   console.log(pasado.getUTCDate() == comp.getUTCDate());
  //   console.log(mañana + ' created');
  //   console.log(diaDeHoy < comp);
  //   this.compareHours(dia)
  //   this.compareHours(dia1)
  //   this.compareHours(dia2)
  // }

  // compareHours(date : Date){
  //   if(date.getHours() >= 6 && date.getHours() < 14){
  //     console.log('Mañana');
  //     return 'mañana'
  //   }
  //   if(date.getHours() >= 14 && date.getHours() < 21){
  //     console.log('Tarde');
  //     return 'tarde'
  //   }
  //   if(date.getHours() >= 21 && date.getHours() < 24){
  //     console.log('Noche');
  //     return 'noche'
  //   }
  //   if(date.getHours() >= 0 && date.getHours() < 6){
  //     console.log('Noche');
  //     return 'noche'
  //   }
  // }

  // // show(str){
  // //   console.log(str);
  // // }

  // async show(str){
  //     // console.log(str);
  //   //manin

  //   const title : Array <string> = ['Juega conmigo', 'Vente a unas cerves',
  //   'Este plan te va a molar', 'Vente anda, no tengo amigos','Texto de ejemplo para los titulos'];
  //   const description : string = "Este plan es muy chulo y además te va a encantar";
  //   const city : Array <string> = ["Valencia","Barcelona","Madrid"];
  //   const user : string[] = ['Alice', 'Bob', 'Daniel', 'David','Maria'];
  //   const category : string[] = ["Cervezas","Pasear al perro","Béisbol",
  //   "Baloncesto","Fútbol","Tenis","Golf","Surf","Arte y exposiciones",
  //   "Cine","Teatro","Jam Session","Música en directo","Clubbing","Explora la ciudad"];
  //   let tagCategories = ["Social",'Deportes','Cultura','Música','Vida en la ciudad'];
  //   let tagsSocial = ['Cervezas','Pausas para el café', 'Pasear al perro','Intercambios de idiomas',
  //   'Pausa para comer', 'Vinos y comidas', 'Netflix & Chill'];
  //   let tagsDeportes = ['Badminton','Béisbol','Baloncesto','Bicicleta',
  //   'Bolos','Boxeo','Escalada','Cricket','Dardos','Golf','Gimnasia','Crossfit',
  //   'Senderismo','Hockey','Artes Marciales','Motociclismo','Padel','Ping Pong',
  //   'Equitación','Rugby','Running','Skateboard','Snowboard','Esquí','Fútbol','Surf',
  //   'Natación','Tenis','Waterpolo','Yoga'];

  //   let tagsCultura = ['Arte y Exposiciones','Cine','Literatura',
  //   'Museos y Galerías','Fotografía','Tecnología','Teatro','Videojuegos',
  //   'Workshops'];

  //   let tagsMusica = ['Clubbing', 'Jam Session', 'Música en directo', 'Conciertos','Festivales'];
  //   let tagsVida = ['Explora la ciudad','Amantes de la moda','Compras y mercados'];

  //   for(let i = 0; i < 100; i++){
  //     let plan = new Plan()
  //     let date = new Date();
  //     date.setDate(new Date().getUTCDate() + this.randomInt(0,4))
  //     date.setHours(this.randomInt(0,25))
  //     plan.title = title[this.randomInt(0,title.length - 1)];
  //     plan.city = city[this.randomInt(0,2)];
  //     plan.createdBy = user[this.randomInt(0,4)];
  //     plan.description = description;
  //     plan.when = date.toString();
  //     plan.tagCategory = this.tags[this.randomInt(0,this.tags.length-1)];
  //     plan.tag = plan.tagCategory.
  //     tags[this.randomInt(0,plan.tagCategory.tags.length-1)];
  //     plan.time = this.compareHours(date)
  //     plan.address =  await this.getRandomAdress();
  //     this.crudService.uploadPlan(plan);
  //     console.log(plan);
  //   }

  //   //
  // }
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async getRandomAdress() {
    let res = await fetch(
      'https://random-data-api.com/api/address/random_address'
    );
    let ok = await res.json();
    let newTodo = Object.assign(new direccion(), ok);
    let cadena: string =
      newTodo.street_name + ' ' + newTodo.street_address + ', ' + newTodo.city;
    return cadena;
  }
}

class direccion {
  street_name: string;
  street_address: string;
  city: string;
}
