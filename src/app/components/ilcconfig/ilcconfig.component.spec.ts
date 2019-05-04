import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ILCConfigComponent} from './ilcconfig.component';

describe('ILCConfigComponent', () => {
  let component: ILCConfigComponent;
  let fixture: ComponentFixture<ILCConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ILCConfigComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ILCConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
