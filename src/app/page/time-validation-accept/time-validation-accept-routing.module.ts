import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeValidationAcceptPage } from './time-validation-accept.page';

const routes: Routes = [
  {
    path: '',
    component: TimeValidationAcceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeValidationAcceptPageRoutingModule {}
