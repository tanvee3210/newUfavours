import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowtouseappPage } from './howtouseapp.page';

const routes: Routes = [
  {
    path: '',
    component: HowtouseappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowtouseappPageRoutingModule {}
