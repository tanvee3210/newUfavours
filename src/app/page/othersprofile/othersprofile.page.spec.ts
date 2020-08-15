import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthersprofilePage } from './othersprofile.page';

describe('OthersprofilePage', () => {
  let component: OthersprofilePage;
  let fixture: ComponentFixture<OthersprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthersprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
