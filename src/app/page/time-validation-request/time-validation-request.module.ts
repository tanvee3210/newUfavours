import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeValidationRequestPageRoutingModule } from './time-validation-request-routing.module';

import { TimeValidationRequestPage } from './time-validation-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeValidationRequestPageRoutingModule
  ],
  declarations: [TimeValidationRequestPage]
})
export class TimeValidationRequestPageModule {}
