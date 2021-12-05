import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evented } from 'leaflet';
import { pipe } from 'rxjs';
import { Listener } from 'selenium-webdriver';
import { Plan } from 'src/app/core/models/plan';
import { AuthService } from 'src/app/core/services/auth.service';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.page.html',
  styleUrls: ['./my-chats.page.scss'],
})
export class MyChatsPage implements OnInit {

  constructor(private route : ActivatedRoute, 
    private cs :CrudService, 
    private router : Router,
    private ui: UiHelper) {
      route.params.subscribe(()=>{
        this.$chats = []
        this.planes = []
        this.planesResult = []
        let aux = this.route.snapshot.queryParamMap.get('list');
        this.planes = JSON.parse(aux)
        this.handleChats().then(() =>{
          setTimeout(()=>{this.sortChats()},50)
        })
      })
    }
    
  planes : Plan[]
  planesResult : Plan[] = []
  ids : string[] = []
  query=''
  showAll = true
  showResults = false
  showNoResults = false
  $chats = []

    
  ngOnInit() {
      
  }

  sortChats(){
    // este metodo ordena los chats por la hora en la q se recibio el ultimo msg
    let withChat = this.planes.filter(plan => plan.last != 'Empieza a hablar')
    withChat.sort((a,b)=>{
      return a.lastTime - b.lastTime
    }).forEach(plan=>{
      let index = this.planes.indexOf(plan)
      if(index > -1){
        this.planes.splice(index,1)
        this.planes.push(plan)
      }
    })
    this.planes.reverse()
  }

    
  handleChats() {
    return new Promise((res,rej)=>{
      this.planes.map(plan=>{
        this.cs.getOnce(plan.id).subscribe((val)=>{
          setTimeout(()=>{res(this.planes)},100)
          let chat = val.data()
          if(chat === undefined || chat.messages.length == 0){
            if(chat!=undefined)this.$chats.push(chat)
            plan["last"] = 'Empieza a hablar'
            plan["lastTime"] = "" 
          }
          else{
            this.$chats.push(chat)
            plan["last"] = 
            `${chat.messages[chat.messages.length - 1].name}: ${chat.messages[chat.messages.length - 1].content}`
            plan["lastBy"] = chat.messages[chat.messages.length - 1].id
            plan["lastTime"] = chat.messages[chat.messages.length - 1].createdAt
          }
        })
        return plan
      })
    })
  }

  goBack(){
    this.router.navigate(['home/my-plans'])
  }

  typing(event){
    this.query = event.target.value 
    if(this.query == ''){
      this.showAllDiv()
    }
    else{
      this.planesResult = [] 
        this.planesResult = this.planes.filter((plan)=>{
          return plan.title.toLowerCase().includes(this.query.toLowerCase())
        })
      if(this.planesResult.length!=0){
        this.showResultsDiv()
      }else {
        this.showNoResultsDiv()
      }
    }
  }
  
  identify(index, item) {
    return item.last;
  }

  showResultsDiv() {
    this.showAll = false;
    this.showResults = true;
    this.showNoResults = false;
  }
  showAllDiv() {
    this.showAll = true;
    this.showResults = false;
    this.showNoResults = false;
  }
  showNoResultsDiv() {
    this.showAll = false;
    this.showResults = false;
    this.showNoResults = true;
  }

  goToChat(id, title){
    let idBuild = `${id}@${title}`
    if(this.$chats.find(xat=>xat.idSala == id)!=undefined){
      return this.router.navigate(['chat',idBuild])
    }
    else{
      return this.cs.create(idBuild)
    }
  }
}
