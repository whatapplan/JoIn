import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/core/models/plan';
import { User } from 'src/app/core/models/usuario';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.page.html',
  styleUrls: ['./my-plans.page.scss'],
})
export class MyPlansPage implements OnInit {
  user: User;
  idsPlan: string[] = [];
  planes: Plan[] = [];
  constructor(private auth: AuthService,private crud: CrudService) { 

  this.user = this.auth.loggedUser;
  this.idsPlan = this.user.acceptedPlans;
  }

  async ngOnInit() {

 for(let i=0;i<this.idsPlan.length;i++){

  this.planes.push(await this.crud.getMyPlans(this.idsPlan[i]));
   console.log(this.planes[i]);

 }

  }

}
