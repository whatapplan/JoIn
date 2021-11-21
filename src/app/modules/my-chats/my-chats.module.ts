import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyChatsPageRoutingModule } from './my-chats-routing.module';

import { MyChatsPage } from './my-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyChatsPageRoutingModule
  ],
  declarations: [MyChatsPage]
})
export class MyChatsPageModule {}
