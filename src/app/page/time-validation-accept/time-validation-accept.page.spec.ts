import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeValidationAcceptPage } from './time-validation-accept.page';

describe('TimeValidationAcceptPage', () => {
  let component: TimeValidationAcceptPage;
  let fixture: ComponentFixture<TimeValidationAcceptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeValidationAcceptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeValidationAcceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
