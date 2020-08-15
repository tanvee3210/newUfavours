import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeValidationRequestPage } from './time-validation-request.page';

const routes: Routes = [
  {
    path: '',
    component: TimeValidationRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeValidationRequestPageRoutingModule {}
