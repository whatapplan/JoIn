import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.ids = []
        let aux = this.route.snapshot.queryParamMap.get('list');
        this.planes = JSON.parse(aux)
        this.planes.forEach((plan)=>{
          this.ids.push(plan.id)
        })
        this.handleChats(this.ids)
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

  handleChats(ids : any[]){
    ids.forEach((elem, index) => {
      this.cs.getOnce(elem).subscribe((val)=>{
        let chat = val.data()
        if(chat === undefined || chat.messages.length == 0){
          this.planes[index]["last"] = 'Empieza a hablar'
          this.planes[index]["lastTime"] = ""
        }else{
          this.$chats.push(chat)
          let each = this.planes[index]
          this.planes[index]["last"] = 
          `${chat.messages[chat.messages.length - 1].name}: ${chat.messages[chat.messages.length - 1].content}`
          this.planes[index]["lastBy"] = chat.messages[chat.messages.length - 1].id
          this.planes[index]["lastTime"] = chat.messages[chat.messages.length - 1].createdAt
          this.planes=this.planes.sort(function(x,y){
            return x == each ? - 1 : y == each ? 1 : 0
          })
        }
      })
    });
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

  goToChat(id){
    if(this.$chats.find(xat=>xat.idSala == id)!=undefined){
      return this.router.navigate(['chat',id])
    }
    else{
      return this.cs.create(id)
    }
  }
}
