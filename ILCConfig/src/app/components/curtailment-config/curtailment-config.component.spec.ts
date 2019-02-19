import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtailmentConfigComponent } from './curtailment-config.component';

describe('CurtailmentConfigComponent', () => {
  let component: CurtailmentConfigComponent;
  let fixture: ComponentFixture<CurtailmentConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtailmentConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtailmentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
