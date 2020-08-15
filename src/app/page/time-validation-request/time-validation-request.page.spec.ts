import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeValidationRequestPage } from './time-validation-request.page';

describe('TimeValidationRequestPage', () => {
  let component: TimeValidationRequestPage;
  let fixture: ComponentFixture<TimeValidationRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeValidationRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeValidationRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
