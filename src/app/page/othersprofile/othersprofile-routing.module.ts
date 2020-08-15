import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersprofilePage } from './othersprofile.page';

const routes: Routes = [
  {
    path: '',
    component: OthersprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersprofilePageRoutingModule {}
