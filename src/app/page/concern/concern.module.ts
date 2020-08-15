import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcernPageRoutingModule } from './concern-routing.module';

import { ConcernPage } from './concern.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcernPageRoutingModule
  ],
  declarations: [ConcernPage]
})
export class ConcernPageModule {}
