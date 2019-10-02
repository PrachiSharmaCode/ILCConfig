import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongFileAlertComponent } from './wrong-file-alert.component';

describe('WrongFileAlertComponent', () => {
  let component: WrongFileAlertComponent;
  let fixture: ComponentFixture<WrongFileAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongFileAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongFileAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
