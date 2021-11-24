import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/http/crud-service.service';

import { ChatPage } from './chat.page';

describe('ChatPage', () => {
  let component: ChatPage;
  let fixture: ComponentFixture<ChatPage>;
  let service : CrudService
  let route : ActivatedRoute
  let auth : AuthService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPage ],
      imports: [IonicModule.forRoot()],
      providers : [CrudService,
      {provide:ActivatedRoute, useValue: {
        snapshot: {
           paramMap: {
              get: (id: number) => {
                 id: 'Zdu5Z4JS53ajL5t13PyC'
              }
           }
        }
     }
    },
    {provide:AuthService}
  ]
      
    }).compileComponents();
    service = TestBed.inject(CrudService)
    route = TestBed.inject(ActivatedRoute)
    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should be able to', ()=>{
    component.chat$.subscribe((val)=>{
      expect(val.messages.length).toEqual(22);
    })
  });
});
