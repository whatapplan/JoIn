import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild, AfterViewInit,QueryList,ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  @ViewChild('contenedor') cont;

  chat$: Observable<any>;
  newMsg : string;
  chat_key :string;
  user_id:string;
  msg_days :string[] = []

  constructor(public cs :CrudService, private route : ActivatedRoute, private auth : AuthService) {}

  
  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    this.chat_key = chatId;
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
    this.user_id = this.auth.loggedUser.id
    this.chat$.subscribe(val =>{
      let msg = val.messages
      msg.forEach(el => {
        let date = new Date(el.createdAt)
        console.log(date.toDateString())
      });
      // let dates = msg.pipe(filter((w:any)=>w.createdAt))
      console.log(msg)
    })
  } 
  
  ngAfterViewInit(): void {
    setTimeout(()=>{this.cont.scrollToBottom()},1000)
  }
  
  isMyMsg(id){
    if(id == this.user_id)return 'rtl'
    return 'ltr'
  }

  submit(){
    if(!this.newMsg){
      return alert('you need to enter something');
    }
    this.cs.sendMessage(this.chat_key, this.newMsg);
    this.newMsg = '';
    setTimeout(()=>{this.cont.scrollToBottom()},500)
  }

  trackByCreated (i,msg){
    return msg.createdAt;
  }
  
  show(){
    // let mivar = {
    //   $key:'',
    //   title: this.mensaje.value, 
    //   description : 'Esto es una simple descripcion'
    // }
    // this.Tasks = [];
    // this.crud.create(mivar)
  }

}

