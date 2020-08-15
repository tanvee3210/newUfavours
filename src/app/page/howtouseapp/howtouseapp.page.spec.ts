import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HowtouseappPage } from './howtouseapp.page';

describe('HowtouseappPage', () => {
  let component: HowtouseappPage;
  let fixture: ComponentFixture<HowtouseappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtouseappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowtouseappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
