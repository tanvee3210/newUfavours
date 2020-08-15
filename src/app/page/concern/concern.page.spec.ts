import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConcernPage } from './concern.page';

describe('ConcernPage', () => {
  let component: ConcernPage;
  let fixture: ComponentFixture<ConcernPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcernPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConcernPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
