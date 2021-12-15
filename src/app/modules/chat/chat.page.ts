import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild, AfterViewInit,QueryList,ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, from} from 'rxjs';
import {filter} from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewInit {
  // Tasks : TODO[] = []
  @ViewChild('cont') cont;
  userId : string;
  fWord:string
  rWord:string
  title:string
  chat$: Observable<any>;
  newMsg : string;
  chat_key :string;
  user_id:string;
  chat_created :any
  dates = []
  msgByDate = []
  lastMsg : any

  constructor(private cs :CrudService, private route : ActivatedRoute,
    private auth : AuthService, private router : Router) {}

  
  ngOnInit() {
    this.userId = this.auth.loggedUser.id
    const chatRoute = this.route.snapshot.paramMap.get('id');
    const chatId = chatRoute.split('@')[0]
    this.title = chatRoute.split("@")[1]
    let allWords = this.title.split(' ')
    this.fWord = allWords.shift()
    this.rWord = allWords.join(' ')
    this.chat_key = chatId;
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
    this.user_id = this.auth.loggedUser.id
    this.getDatesMsg()
    console.log(this.dates)
    console.log(this.msgByDate)

    

  } 


  getDatesMsg(){
    let msgs : any
    this.chat$.subscribe(xat =>{
      msgs = xat.messages;
      msgs.forEach((msg) => {
        let date = new Date(msg.createdAt);
        let strDate = date.toLocaleDateString();
        if (this.dates.indexOf(strDate) < 0) {
          this.dates.push(strDate);
          this.msgByDate.push(
            msgs.filter(msg=>{
                let day = new Date(msg.createdAt)
                let strDay = day.toLocaleDateString();
                return strDate == strDay})) 
        }
      });
    })
  }
  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.lastMsg = document.querySelectorAll('.message')
      let msgLast = this.lastMsg[this.lastMsg.length-1]
      msgLast.scrollIntoView()
    },500)
  }
  
  submit(){
    if(!this.newMsg){
      return alert('you need to enter something');
    }
    let lastMsg = this.cs.sendMessage(this.chat_key, this.newMsg);
    this.newMsg = '';
    this.checkLastMessage(lastMsg)
  }

  checkLastMessage(msg){
    let date = new Date(msg.createdAt)
    let strDate = date.toLocaleDateString()
    let index = this.dates.indexOf(strDate)
    console.log(' mera cabron ',index)
    console.log(' mera cabron ',this.msgByDate[index])
    if (index < 0) {
      this.dates.push(strDate);
      this.msgByDate.push([msg])
    }else{
      this.msgByDate[index].push(msg)
    }
    setTimeout(()=>{
      this.lastMsg = document.querySelectorAll('.message')
      let msgLast = this.lastMsg[this.lastMsg.length-1]
      msgLast.scrollIntoView()
    },100)
  }

  trackByCreated (i,msg){
    return msg.createdAt;
  }

}

