import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillcategoryPage } from './skillcategory.page';

describe('SkillcategoryPage', () => {
  let component: SkillcategoryPage;
  let fixture: ComponentFixture<SkillcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillcategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
