import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillcategoryPageRoutingModule } from './skillcategory-routing.module';

import { SkillcategoryPage } from './skillcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillcategoryPageRoutingModule
  ],
  declarations: [SkillcategoryPage]
})
export class SkillcategoryPageModule {}
