import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OthersprofilePageRoutingModule } from './othersprofile-routing.module';

import { OthersprofilePage } from './othersprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OthersprofilePageRoutingModule
  ],
  declarations: [OthersprofilePage]
})
export class OthersprofilePageModule {}
