import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/core/models/plan';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.page.html',
  styleUrls: ['./my-chats.page.scss'],
})
export class MyChatsPage implements OnInit {

  constructor(private route : ActivatedRoute, 
    private cs :CrudService, private router : Router) { }

  planes : Plan[]

  ngOnInit() {
    let aux = this.route.snapshot.queryParamMap.get('list');
    this.planes = JSON.parse(aux)
    console.log(this.planes)
  }

  goToChat(id){
    this.cs.get(id).subscribe(val=>{
      if(val.id == '0'){
        this.cs.create(id)
      }
      else {
        this.router.navigate(['chat',id])
      }
    });
  
  }

}
