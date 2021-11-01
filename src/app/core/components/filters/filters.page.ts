import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonChip, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  tagsSocial = ['Cervezas','Pausas para el café', 'Pasear al perro','Intercambios de idiomas',
    'Pausa para comer', 'Vinos y comidas', 'Netflix & Chill'];
  tagsDeportes = ['Badminton','Béisbol','Baloncesto','Bicicleta',
      'Bolos','Boxeo','Escalada','Cricket','Dardos','Golf','Gimnasia','Crossfit',
      'Senderismo','Hockey','Artes Marciales','Motociclismo','Padel','Ping Pong',
      'Equitación','Rugby','Running','Skateboard','Snowboard','Esquí','Fútbol','Surf',
      'Natación','Tenis','Waterpolo','Yoga'];
  tagsCultura = ['Arte y Exposiciones','Cine','Literatura',
        'Museos y Galerías','Fotografía','Tecnología','Teatro','Videojuegos',
        'Workshops'];

  tagsMusica = ['Clubbing', 'Jam Session', 'Música en directo', 'Conciertos','Festivales'];
  
  tagsVida = ['Explora la ciudad','Amantes de la moda','Compras y mercados'];

  tagsSelected = this.tagsSocial

  chooseDate:string = 'Elige un día'


  @ViewChild('daySelected') day;
  @ViewChild('timeSelected') time;
  @ViewChild('interes')categoryTab
  @ViewChild('dateTime')datePicker
  @ViewChild('dateText')dateText
  @ViewChildren('chips')chips

  // minDate = new Date().toISOString();
  minDate = ''

  @Input() filters = {
    tags : {
      indexes:[],
      values:[],
      ptag:[]
    },
    day : '',
    time : ''
  }

  constructor(private modalController:ModalController) { }
  
  ngOnInit() {
    setTimeout(()=>{this.saveState();},5)
  }
  
  saveState(){
    if(this.filters.tags.values.length != 0){
      this.color();
      this.getCategoriesSelectedCount();
    }
    if(this.filters.day != ''){
      if(this.filters.day.includes('-')){
        let selec = this.filters.day.split('-')
        let s_date = new Date(+selec[2],+selec[1]-1,+selec[0])
        this.datePicker.value = s_date.toISOString()
        this.dateText.value = this.filters.day
        this.chooseDate = this.filters.day
        setTimeout(()=>{
          let val :HTMLElement = document.getElementsByClassName('picker-button')[1] as HTMLElement
          val.click()
        },10) 
      }      
      this.day.value = this.filters.day
    }
    if(this.filters.time != ''){
      this.time.value = this.filters.time
    }
  }

  interChange(){
    const inter = this.categoryTab.value;
    if(inter == 'Social'){this.tagsSelected = this.tagsSocial}
    if(inter == 'Deportes')this.tagsSelected = this.tagsDeportes
    if(inter == 'Música')this.tagsSelected = this.tagsMusica
    if(inter == 'Cultura')this.tagsSelected = this.tagsCultura
    if(inter == 'Vida')this.tagsSelected = this.tagsVida
    setTimeout(()=>{this.color()},1)
  }
  color(){
    if(this.filters.tags.values.length > 0){
      this.filters.tags.values.forEach((val, index)=>{
        if(this.tagsSelected.includes(val)){
          const chip : IonChip = this.chips._results[this.filters.tags.indexes[index]];
          chip.color = 'warning'
        }
      })
    }
    else{
      const chips : IonChip[] = this.chips._results;
      chips.map((val)=>{val.color='normal'})
    }
  }

  select(index,cat:string,ev:any){
    const selection = ev.target 
    console.log(index);
    console.log(selection);
    console.log(cat);
    const chip : IonChip = this.chips._results[index];
    let search = this.filters.tags.values.indexOf(cat);
    if(search!=-1){
      this.filters.tags.values.splice(search,1)
      this.filters.tags.indexes.splice(search,1)
      this.filters.tags.ptag.splice(search,1)
      chip.color = 'normal'
    }else{
      this.filters.tags.indexes.push(index)
      this.filters.tags.values.push(cat)
      this.filters.tags.ptag.push(this.categoryTab.value)
      chip.color = 'warning'
    }
    console.log(this.filters.tags.values);
    this.getCategoriesSelectedCount()
  }
  countSocial : number
  countDeportes :number
  countCultura :number
  countMusic : number
  countVida :number

  getCategoriesSelectedCount(){
    this.countSocial = this.filters.tags.ptag.filter((tag)=>tag == 'Social').length || undefined
    this.countDeportes = this.filters.tags.ptag.filter((tag)=>tag == 'Deportes').length || undefined
    this.countCultura = this.filters.tags.ptag.filter((tag)=>tag == 'Cultura').length || undefined
    this.countMusic = this.filters.tags.ptag.filter((tag)=>tag == 'Música').length || undefined
    this.countVida = this.filters.tags.ptag.filter((tag)=>tag == 'Vida').length || undefined
  }  

  clearSelection(){
    this.filters.tags.indexes = []
    this.filters.tags.ptag = []
    this.filters.tags.values = []
    this.day.value = 'todos'
    this.time.value = 'toeldia'
    this.color();
    this.getCategoriesSelectedCount();
  }

  dismissModal() {
    this.modalController.dismiss(this.filters);
  }

  handleCategories(event:any){
    this.filters.tags = event.detail.value
  }
  handleDay(event:any){
    let val = this.day.value
    if (val.includes('-'))this.datePicker.open()
    else this.filters.day = val   
  }

  handleTime(event:any){
    console.log('SE METE POR AQUI TAMBN 3')
    this.filters.time = event.detail.value
  }

  dateArrow = new Date().toISOString();
  todayDate= new Date();
  moveDate(num){
    if(num==0){
      this.todayDate.setDate(this.todayDate.getDate()-1)
      this.dateArrow = this.todayDate.toString()
    }else {
      this.todayDate.setDate(this.todayDate.getDate()+1)
      this.dateArrow = this.todayDate.toString()
    }
  }
  
  getDate(){
    let date = new Date(this.datePicker.value)
    let cadena = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    date.setHours(0,0,0,0);
    this.dateText.value = cadena
    this.chooseDate = cadena
    this.day.value = cadena
    this.filters.day = cadena
  }
  getCancelDate(){
    this.day.value = 'todos'
  }

}
