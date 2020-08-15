import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillcategoryPage } from './skillcategory.page';

const routes: Routes = [
  {
    path: '',
    component: SkillcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillcategoryPageRoutingModule {}
