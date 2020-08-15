import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcernPage } from './concern.page';

const routes: Routes = [
  {
    path: '',
    component: ConcernPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcernPageRoutingModule {}
