import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeValidationAcceptPageRoutingModule } from './time-validation-accept-routing.module';

import { TimeValidationAcceptPage } from './time-validation-accept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeValidationAcceptPageRoutingModule
  ],
  declarations: [TimeValidationAcceptPage]
})
export class TimeValidationAcceptPageModule {}
