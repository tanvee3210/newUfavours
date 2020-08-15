import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowtouseappPageRoutingModule } from './howtouseapp-routing.module';

import { HowtouseappPage } from './howtouseapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowtouseappPageRoutingModule
  ],
  declarations: [HowtouseappPage]
})
export class HowtouseappPageModule {}
